#!/usr/bin/env node

/**
 * Sync v0.7.0 Data to PocketBase (STRATO Unix Socket)
 * Removes generated IDs to let PocketBase create its own
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const TOKEN = process.env.TOKEN || '';
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');

async function uploadRecord(collectionName, record) {
  return new Promise((resolve) => {
    // Remove generated id - let PocketBase create it
    const {id, collectionId, collectionName: _, ...data} = record;
    
    const postData = JSON.stringify(data);
    const options = {
      socketPath: '/run/cm4all/http/tie.socket',
      hostname: 'localhost',
      path: `/.sfs-bd/api/collections/${collectionName}/records`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          success: res.statusCode === 200
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({
        status: 0,
        success: false,
        error: err.message
      });
    });
    
    req.write(postData);
    req.end();
  });
}

async function syncCollection(collectionName, records) {
  console.log(`\n📤 ${collectionName} (${records.length} Datensätze)...`);
  
  let created = 0;
  let failed = 0;
  
  for (let i = 0; i < records.length; i++) {
    const result = await uploadRecord(collectionName, records[i]);
    if (result.success) {
      created++;
    } else {
      failed++;
    }
    
    if ((i + 1) % 100 === 0) {
      process.stdout.write(`\r   ${created}/${i + 1}`);
    }
  }
  
  console.log(`\n   ✅ ${created} erstellt`);
}

async function main() {
  if (!TOKEN) {
    console.error('❌ TOKEN erforderlich: TOKEN=<token> node sync-collections.cjs');
    process.exit(1);
  }
  
  try {
    console.log('📂 Laden...');
    const publishers = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'publishers.json')));
    const games = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'games.json')));
    const ruleSources = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'rule-sources.json')));
    const gameEditions = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'game-editions.json')));
    const verificationHistory = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'source-verification-history.json')));
    
    console.log(`\n✅ ${publishers.length} Verlage`);
    console.log(`✅ ${games.length} Spiele`);
    console.log(`✅ ${ruleSources.length} Regelquellen`);
    console.log(`✅ ${gameEditions.length} Spieleditionen`);
    console.log(`✅ ${verificationHistory.length} Prüfeinträge`);
    
    console.log('\n' + '='.repeat(60));
    
    await syncCollection('publishers', publishers);
    await syncCollection('games', games);
    await syncCollection('rule_sources', ruleSources);
    await syncCollection('game_editions', gameEditions);
    await syncCollection('source_verification_history', verificationHistory);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Synchronisierung abgeschlossen!');
    
  } catch (err) {
    console.error('❌ Fehler:', err.message);
    process.exit(1);
  }
}

main();
