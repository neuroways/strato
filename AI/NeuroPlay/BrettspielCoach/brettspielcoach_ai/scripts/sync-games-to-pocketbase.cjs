#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load games from localStorage simulation (from imported data)
const gamesPath = path.join(__dirname, '../src/data/generated/games.json');

if (!fs.existsSync(gamesPath)) {
  console.error('❌ games.json nicht gefunden');
  process.exit(1);
}

const games = JSON.parse(fs.readFileSync(gamesPath, 'utf-8'));
console.log(`📊 ${games.length} Spiele zum Hochladen gefunden`);

// PocketBase configuration
const PB_URL = process.env.PB_URL || 'http://localhost/.sfs-bd';
const PB_TOKEN = process.env.PB_TOKEN || process.env.TOKEN || '';

if (!PB_TOKEN) {
  console.error('❌ PB_TOKEN oder TOKEN Umgebungsvariable erforderlich');
  process.exit(1);
}

// Sync function
async function syncGames() {
  let created = 0;
  let updated = 0;
  let errors = 0;

  console.log(`\n🔄 Synchronisiere mit PocketBase (${PB_URL})...\n`);

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    
    try {
      // Generate ID from original_id if not present
      const gameId = game.id || game.original_id;
      if (!gameId) {
        console.warn(`⚠️  Spiel ohne ID übersprungen: ${game.title}`);
        continue;
      }

      // Prepare payload
      const payload = {
        ...game,
        id: gameId,
      };

      // Try to update first
      const updateUrl = `${PB_URL}/api/collections/games/records/${gameId}`;
      let updateResponse;
      try {
        updateResponse = await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${PB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        updateResponse = { ok: false, status: 0 };
      }

      if (updateResponse.ok) {
        updated++;
      } else if (updateResponse.status === 404) {
        // Create new record if not found
        const createUrl = `${PB_URL}/api/collections/games/records`;
        const createResponse = await fetch(createUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${PB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (createResponse.ok) {
          created++;
        } else {
          const error = await createResponse.json();
          console.error(`❌ Fehler bei ${game.title}:`, error.message);
          errors++;
        }
      } else {
        const error = await updateResponse.json();
        console.error(`❌ Fehler bei ${game.title}:`, error.message);
        errors++;
      }

      // Progress indicator
      if ((i + 1) % 100 === 0) {
        console.log(`  ✓ ${i + 1}/${games.length} verarbeitet...`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 5));
    } catch (err) {
      console.error(`❌ Fehler bei ${game.title}:`, err.message);
      errors++;
    }
  }

  console.log(`\n✅ Synchronisierung abgeschlossen:`);
  console.log(`   Erstellt: ${created}`);
  console.log(`   Aktualisiert: ${updated}`);
  console.log(`   Fehler: ${errors}`);
  console.log(`   Gesamt: ${created + updated + errors}/${games.length}`);
}

// Run
syncGames().catch(err => {
  console.error('❌ Fehler:', err);
  process.exit(1);
});
