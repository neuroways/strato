/**
 * Sync v0.7.0 Data to PocketBase
 * 
 * Reads all JSON files and syncs to collections:
 * - publishers
 * - games
 * - game_editions
 * - rule_sources
 * - source_verification_history
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// STRATO Platform URLs – nutze relative Pfade
const PB_URL = process.env.PB_URL || 'http://localhost:8090';
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@test.com';
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin12345';

// Bei STRATO: URL ist relativ (/.sfs-bd oder /.sfs-be)
const isSTRATO = !PB_URL.includes('localhost') && !PB_URL.includes('127.0.0.1');
const pbBaseUrl = isSTRATO && PB_URL.startsWith('http') 
  ? PB_URL 
  : PB_URL;
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');

let adminAuthToken = null;

function pbRequest(method, pathname, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(PB_URL + pathname);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(adminAuthToken && { Authorization: `Admin ${adminAuthToken}` }),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 400) {
            reject(new Error(`${res.statusCode}: ${parsed.message || body}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Invalid JSON: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function authenticate() {
  console.log('🔐 Authentifizierung...\n');
  try {
    const result = await pbRequest('POST', '/api/admins/auth-with-password', {
      identity: PB_ADMIN_EMAIL,
      password: PB_ADMIN_PASSWORD,
    });
    adminAuthToken = result.token;
    console.log('✅ Angemeldet\n');
  } catch (err) {
    console.error('❌ Authentifizierung fehlgeschlagen:', err.message);
    throw err;
  }
}

async function upsertRecords(collectionName, records) {
  console.log(`📤 Synchronisiere ${records.length} Datensätze zu „${collectionName}"...`);
  
  let created = 0;
  let updated = 0;
  let errors = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    try {
      // Look for existing record by original_id or id
      const searchId = record.original_id || record.id;
      let existingRecord = null;

      if (searchId) {
        try {
          const list = await pbRequest('GET', 
            `/api/collections/${collectionName}/records?filter=(original_id="${searchId}")`
          );
          if (list.items && list.items.length > 0) {
            existingRecord = list.items[0];
          }
        } catch (e) {
          // Filter failed, try next approach
        }
      }

      if (existingRecord) {
        // Update
        await pbRequest('PATCH', 
          `/api/collections/${collectionName}/records/${existingRecord.id}`,
          record
        );
        updated++;
      } else {
        // Create
        await pbRequest('POST', 
          `/api/collections/${collectionName}/records`,
          record
        );
        created++;
      }

      if ((i + 1) % 100 === 0) {
        process.stdout.write(`\r   Fortschritt: ${i + 1}/${records.length}`);
      }
    } catch (err) {
      errors.push(`${record.original_id || record.id}: ${err.message}`);
    }
  }

  console.log(`\n   ✅ ${created} erstellt, ${updated} aktualisiert`);
  
  if (errors.length > 0) {
    console.log(`   ⚠️  ${errors.length} Fehler`);
    errors.slice(0, 3).forEach(e => console.log(`      - ${e}`));
  }

  return { created, updated, errors: errors.length };
}

async function syncToPocketBase() {
  try {
    await authenticate();

    // Load data files
    console.log('📂 Lade Datendateien...\n');
    
    const publishers = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'publishers.json')));
    const games = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'games.json')));
    const ruleSources = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'rule-sources.json')));
    const gameEditions = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'game-editions.json')));
    const verificationHistory = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'source-verification-history.json')));

    console.log(`✅ ${publishers.length} Verlage`);
    console.log(`✅ ${games.length} Spiele`);
    console.log(`✅ ${ruleSources.length} Regelquellen`);
    console.log(`✅ ${gameEditions.length} Spieleditionen`);
    console.log(`✅ ${verificationHistory.length} Prüfeinträge\n`);

    // Sync all collections
    const results = {};

    console.log('Synchronisiere Sammlungen...\n');
    results.publishers = await upsertRecords('publishers', publishers);
    console.log();
    
    results.games = await upsertRecords('games', games);
    console.log();
    
    results.ruleSources = await upsertRecords('rule_sources', ruleSources);
    console.log();
    
    results.gameEditions = await upsertRecords('game_editions', gameEditions);
    console.log();
    
    results.verificationHistory = await upsertRecords('source_verification_history', verificationHistory);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ Synchronisierung abgeschlossen!');
    console.log('='.repeat(60));
    console.log(`\n👥 Verlage:           ${results.publishers.created} erstellt, ${results.publishers.updated} aktualisiert`);
    console.log(`🎲 Spiele:            ${results.games.created} erstellt, ${results.games.updated} aktualisiert`);
    console.log(`📝 Regelquellen:      ${results.ruleSources.created} erstellt, ${results.ruleSources.updated} aktualisiert`);
    console.log(`📖 Spieleditionen:    ${results.gameEditions.created} erstellt, ${results.gameEditions.updated} aktualisiert`);
    console.log(`✓ Prüfhistorie:       ${results.verificationHistory.created} erstellt, ${results.verificationHistory.updated} aktualisiert`);

  } catch (err) {
    console.error('\n❌ Fehler:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  syncToPocketBase();
}

module.exports = { syncToPocketBase };
