/**
 * Import to PocketBase
 * 
 * This script:
 * 1. Initializes PocketBase connection
 * 2. Creates publishers collection if needed
 * 3. Syncs all 32 publishers
 * 4. Updates all 844 games with publisher references
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');
const PB_URL = process.env.PB_URL || 'http://localhost:8090';
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@test.com';
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || 'admin12345';

let adminAuthToken = null;

/**
 * Make HTTP request to PocketBase
 */
function pbRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(PB_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 400) {
            reject(new Error(`PocketBase ${res.statusCode}: ${parsed.message || body}`));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Invalid JSON response: ${body}`));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

/**
 * Authenticate with PocketBase
 */
async function authenticate() {
  console.log('🔐 Authenticating with PocketBase...');
  try {
    const result = await pbRequest('POST', '/api/admins/auth-with-password', {
      identity: PB_ADMIN_EMAIL,
      password: PB_ADMIN_PASSWORD,
    });
    adminAuthToken = result.token;
    console.log('✅ Authentication successful');
  } catch (err) {
    console.error('❌ Authentication failed:', err.message);
    console.error('   Make sure PocketBase is running at', PB_URL);
    throw err;
  }
}

/**
 * Create collection if it doesn't exist
 */
async function ensureCollection(name, fields) {
  console.log(`📋 Checking collection: ${name}...`);
  try {
    await pbRequest('GET', `/api/collections/${name}`, null, {
      Authorization: `Admin ${adminAuthToken}`,
    });
    console.log(`   ✅ Collection exists`);
    return;
  } catch (err) {
    if (err.message.includes('404')) {
      console.log(`   📝 Creating collection...`);
      await pbRequest('POST', '/api/collections', {
        name,
        type: 'base',
        fields: fields,
        listRule: '@request.auth.id != ""', // Public read
        viewRule: '@request.auth.id != ""',
        createRule: '@request.auth.id != ""', // Public write (for demo)
        updateRule: '@request.auth.id != ""',
        deleteRule: '@request.auth.id != ""',
      }, {
        Authorization: `Admin ${adminAuthToken}`,
      });
      console.log(`   ✅ Collection created`);
    } else {
      throw err;
    }
  }
}

/**
 * Upsert records in collection
 */
async function upsertRecords(collectionName, records) {
  console.log(`📤 Syncing ${records.length} records to ${collectionName}...`);
  let created = 0;
  let updated = 0;
  let errors = [];

  for (const record of records) {
    try {
      // Try to find by original_id
      const existing = await pbRequest(
        'GET',
        `/api/collections/${collectionName}/records?filter=(original_id="${record.original_id}")`,
        null,
        { Authorization: `Admin ${adminAuthToken}` }
      ).catch(() => null);

      if (existing?.items?.length > 0) {
        // Update
        const id = existing.items[0].id;
        await pbRequest(
          'PATCH',
          `/api/collections/${collectionName}/records/${id}`,
          record,
          { Authorization: `Admin ${adminAuthToken}` }
        );
        updated++;
      } else {
        // Create
        await pbRequest(
          'POST',
          `/api/collections/${collectionName}/records`,
          record,
          { Authorization: `Admin ${adminAuthToken}` }
        );
        created++;
      }

      if ((created + updated) % 100 === 0) {
        process.stdout.write(`\r   Progress: ${created + updated}/${records.length}`);
      }
    } catch (err) {
      errors.push(`${record.original_id}: ${err.message}`);
    }
  }

  console.log(`\n   ✅ ${created} created, ${updated} updated`);
  if (errors.length > 0) {
    console.log(`   ⚠️  ${errors.length} errors`);
    errors.slice(0, 5).forEach(e => console.log(`      - ${e}`));
  }

  return { created, updated, errors };
}

/**
 * Main import process
 */
async function importToPocketBase() {
  try {
    // Authenticate
    await authenticate();

    // Read data
    console.log('\n📂 Loading data files...');
    const publishers = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'publishers.json')));
    const games = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'games.json')));

    console.log(`   ✅ Loaded ${publishers.length} publishers and ${games.length} games`);

    // Define collection schemas
    const publishersFields = [
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
    ];

    const gamesFields = [
      { name: 'original_id', type: 'text', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'title_en', type: 'text' },
      { name: 'publisher_original_id', type: 'text' },
      { name: 'category_primary', type: 'text' },
      { name: 'category_secondary', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'language', type: 'text' },
      { name: 'year_published', type: 'number' },
      { name: 'player_count', type: 'json' },
      { name: 'min_age', type: 'number' },
      { name: 'duration', type: 'json' },
      { name: 'status', type: 'text' },
      { name: 'bgg_rank', type: 'number' },
      { name: 'bgg_id', type: 'text' },
      { name: 'notes', type: 'text' },
      { name: 'rule_url', type: 'url' },
      { name: 'product_url', type: 'url' },
      { name: 'verification_status', type: 'text' },
      { name: 'verified_date', type: 'date' },
    ];

    // Ensure collections exist
    console.log('\n📚 Checking collections...');
    await ensureCollection('publishers', publishersFields);
    await ensureCollection('games', gamesFields);

    // Sync publishers
    console.log('\n👥 Syncing publishers...');
    const pubResult = await upsertRecords('publishers', publishers);

    // Sync games
    console.log('\n🎲 Syncing games...');
    const gameResult = await upsertRecords('games', games);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ Import Complete!');
    console.log('='.repeat(50));
    console.log(`Publishers: ${pubResult.created} created, ${pubResult.updated} updated`);
    console.log(`Games: ${gameResult.created} created, ${gameResult.updated} updated`);
    console.log(`\nAccess admin at: ${PB_URL}/_/`);

  } catch (err) {
    console.error('\n❌ Import failed:', err.message);
    process.exit(1);
  }
}

// Run
importToPocketBase();
