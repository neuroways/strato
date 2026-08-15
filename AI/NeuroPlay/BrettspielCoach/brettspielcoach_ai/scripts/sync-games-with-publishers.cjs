/**
 * Sync Games with Publisher Mapping
 * 
 * This script:
 * 1. Reads game data from Excel
 * 2. Maps "Verlag / Marke" names to publisher original_ids
 * 3. Updates games.json with correct publisher_original_id
 * 4. Creates reverse lookup for future use
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const EXCEL_FILE = process.argv[2] || path.join(__dirname, '../../../uploads/7ae5285e-514d-4aa6-89e0-04a81fcb0b7b-NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.5.0.xlsx');
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');

function normalize(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  return trimmed === '' ? null : trimmed;
}

async function syncGamesWithPublishers() {
  const report = {
    timestamp: new Date().toISOString(),
    games_processed: 0,
    games_with_publisher: 0,
    publisher_name_to_id_mapping: {},
    unmapped_publishers: new Set(),
    errors: [],
    warnings: [],
  };

  try {
    console.log('Reading Excel file...');
    const workbook = XLSX.readFile(EXCEL_FILE);
    const publishersSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Verlage']);
    const gamesSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Spiele und Anleitungen']);

    // Build mapping: publisher name → original_id
    const publisherNameToId = {};
    for (const pub of publishersSheet) {
      const name = normalize(pub['Verlag']);
      const id = normalize(pub['Verlag-ID']);
      if (name && id) {
        publisherNameToId[name] = id;
      }
    }

    console.log(`Found ${Object.keys(publisherNameToId).length} publishers`);
    console.log(`Processing ${gamesSheet.length} games...`);

    // Build games with publisher mapping
    const gamesList = [];
    for (const row of gamesSheet) {
      const recordId = normalize(row['Datensatz-ID']);
      if (!recordId) continue;

      // Get publisher name from Excel
      const publisherName = normalize(row['Verlag / Marke']);
      const publisherId = publisherName ? publisherNameToId[publisherName] : null;

      // Map to existing game structure (from import script)
      const game = {
        original_id: recordId,
        title: normalize(row['Spiel']),
        title_en: null, // Not in current Excel
        publisher_original_id: publisherId, // Now mapped!
        category_primary: normalize(row['Kategorie']),
        category_secondary: null, // Not in current Excel
        description: null,
        language: normalize(row['Sprache']) || 'de',
        year_published: null, // Not in current Excel
        player_count: null,
        min_age: null,
        duration: null,
        status: normalize(row['Anleitungsstatus']) || 'unknown',
        bgg_rank: null,
        bgg_id: null,
        notes: normalize(row['Hinweis']),
        rule_url: normalize(row['Anleitung / Regelquelle']),
        product_url: normalize(row['Produkt- oder Katalogseite']),
        verification_status: normalize(row['Prüfstatus']),
        verified_date: normalize(row['Geprüft am']),
      };

      gamesList.push(game);
      report.games_processed++;
      if (publisherId) report.games_with_publisher++;
      if (publisherName && !publisherId) {
        report.unmapped_publishers.add(publisherName);
      }
    }

    // Sort by title
    gamesList.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'de'));

    // Save updated games
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'games.json'),
      JSON.stringify(gamesList, null, 2)
    );

    report.publisher_name_to_id_mapping = publisherNameToId;
    report.unmapped_publishers = Array.from(report.unmapped_publishers);

    // Save report
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'games-publisher-sync-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ Games synced with publishers!');
    console.log(`📊 ${report.games_with_publisher} of ${report.games_processed} games have publisher mapping`);
    console.log(`⚠️  ${report.unmapped_publishers.length} unmapped publisher names`);
    if (report.unmapped_publishers.length > 0) {
      console.log(`   Unmapped: ${report.unmapped_publishers.slice(0, 5).join(', ')}${report.unmapped_publishers.length > 5 ? '...' : ''}`);
    }

    return report;
  } catch (err) {
    console.error('❌ Error:', err.message);
    report.errors.push(`Fatal: ${err.message}`);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'games-publisher-sync-report.json'),
      JSON.stringify(report, null, 2)
    );
    throw err;
  }
}

if (require.main === module) {
  syncGamesWithPublishers()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { syncGamesWithPublishers };
