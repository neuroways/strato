/**
 * Create PocketBase Collections
 * 
 * Creates all required collections in PocketBase:
 * - publishers
 * - games
 * - game_editions
 * - rule_sources
 * - source_verification_history
 * - import_batches
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

// STRATO Platform URLs
const isProduction = process.env.NODE_ENV === 'production';
const PB_URL = process.env.PB_URL || (isProduction ? 'https://yoursite.de/.sfs-be' : 'https://yoursite.de/.sfs-bd');
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@test.com';
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin12345';

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
  console.log('🔐 Authentifizierung...');
  try {
    const result = await pbRequest('POST', '/api/admins/auth-with-password', {
      identity: PB_ADMIN_EMAIL,
      password: PB_ADMIN_PASSWORD,
    });
    adminAuthToken = result.token;
    console.log('✅ Angemeldet\n');
  } catch (err) {
    console.error('❌ Authentifizierung fehlgeschlagen:', err.message);
    console.error(`   PocketBase läuft unter ${PB_URL}? Admin-Passwort korrekt?`);
    throw err;
  }
}

async function ensureCollection(name, fields, options = {}) {
  console.log(`📋 Sammlung „${name}"...`);
  
  try {
    await pbRequest('GET', `/api/collections/${name}`);
    console.log(`   ✅ Existiert bereits\n`);
    return;
  } catch (err) {
    if (!err.message.includes('404')) throw err;
  }

  console.log(`   📝 Erstelle Sammlung...`);
  try {
    await pbRequest('POST', '/api/collections', {
      name,
      type: 'base',
      fields: fields,
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      ...options,
    });
    console.log(`   ✅ Erstellt\n`);
  } catch (err) {
    console.error(`   ❌ Fehler: ${err.message}\n`);
    throw err;
  }
}

async function createCollections() {
  try {
    await authenticate();

    // Publishers
    await ensureCollection('publishers', [
      { name: 'original_id', type: 'text', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'country', type: 'text' },
      { name: 'priority', type: 'number' },
      { name: 'website', type: 'url' },
      { name: 'games_catalog', type: 'url' },
      { name: 'rules_archive', type: 'url' },
      { name: 'relevance', type: 'text' },
      { name: 'status', type: 'text' },
      { name: 'notes', type: 'text' },
    ]);

    // Games
    await ensureCollection('games', [
      { name: 'original_id', type: 'text', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'title_en', type: 'text' },
      { name: 'publisher_original_id', type: 'text' },
      { name: 'category_primary', type: 'text' },
      { name: 'category_secondary', type: 'text' },
      { name: 'game_type', type: 'text' },
      { name: 'mechanics', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'language', type: 'text' },
      { name: 'language_dependence', type: 'text' },
      { name: 'year_published', type: 'number' },
      { name: 'player_count', type: 'json' },
      { name: 'min_age', type: 'number' },
      { name: 'duration', type: 'json' },
      { name: 'complexity', type: 'text' },
      { name: 'status', type: 'text' },
      { name: 'bgg_rank', type: 'number' },
      { name: 'bgg_id', type: 'text' },
      { name: 'notes', type: 'text' },
      { name: 'rule_url', type: 'url' },
      { name: 'product_url', type: 'url' },
      { name: 'article_number', type: 'text' },
      { name: 'is_german_edition', type: 'bool' },
      { name: 'verification_status', type: 'text' },
      { name: 'verified_date', type: 'date' },
      { name: 'metadata_status', type: 'text' },
      { name: 'import_batch_id', type: 'text' },
    ]);

    // Rule Sources
    await ensureCollection('rule_sources', [
      { name: 'game_original_id', type: 'text', required: true },
      { name: 'game_id', type: 'text' },
      { name: 'type', type: 'text' },
      { name: 'language', type: 'text' },
      { name: 'url', type: 'url', required: true },
      { name: 'source_type', type: 'text' },
      { name: 'verification_status', type: 'text' },
      { name: 'verified_date', type: 'date' },
      { name: 'is_primary', type: 'bool' },
      { name: 'import_batch_id', type: 'text' },
    ]);

    // Game Editions
    await ensureCollection('game_editions', [
      { name: 'game_id', type: 'text', required: true },
      { name: 'game_original_id', type: 'text' },
      { name: 'language', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'title_original', type: 'text' },
      { name: 'publisher_original_id', type: 'text' },
      { name: 'article_number', type: 'text' },
      { name: 'is_primary', type: 'bool' },
      { name: 'status', type: 'text' },
    ]);

    // Source Verification History
    await ensureCollection('source_verification_history', [
      { name: 'rule_source_id', type: 'text' },
      { name: 'game_original_id', type: 'text', required: true },
      { name: 'verification_status', type: 'text' },
      { name: 'verified_date', type: 'date' },
      { name: 'notes', type: 'text' },
      { name: 'verified_by', type: 'text' },
      { name: 'import_batch_id', type: 'text' },
    ]);

    // Import Batches
    await ensureCollection('import_batches', [
      { name: 'name', type: 'text', required: true },
      { name: 'version', type: 'text' },
      { name: 'import_date', type: 'date' },
      { name: 'source_file', type: 'text' },
      { name: 'games_count', type: 'number' },
      { name: 'publishers_count', type: 'number' },
      { name: 'rule_sources_count', type: 'number' },
      { name: 'status', type: 'text' },
    ]);

    console.log('='.repeat(50));
    console.log('✅ Alle Sammlungen erfolgreich erstellt!');
    console.log('='.repeat(50));
    console.log('\nNächster Schritt: Daten synchronisieren mit:');
    console.log('  npm run sync-data\n');

  } catch (err) {
    console.error('\n❌ Fehler:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  createCollections();
}

module.exports = { createCollections };
