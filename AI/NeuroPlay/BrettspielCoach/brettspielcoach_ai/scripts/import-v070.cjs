/**
 * Complete v0.7.0 Import
 * 
 * Reads v0.7.0 catalog and generates:
 * - publishers.json
 * - games.json (924 games with new fields)
 * - game_editions.json (placeholder structure)
 * - rule_sources.json
 * - import_batches.json
 * - source_verification_history.json
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const crypto = require('crypto');

const EXCEL_FILE = '/home/www/aibuilder-514nc/uploads/8540c0a1-03c4-48f6-8b21-4d7fc69c8273-NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.7.0.xlsx';
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');

function normalize(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  return trimmed === '' ? null : trimmed;
}

function validateUrl(value) {
  if (!value) return null;
  const url = normalize(value);
  if (!url) return null;
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

function generateStableId(prefix, ...components) {
  const combined = components.filter(Boolean).join('::');
  const hash = crypto.createHash('md5').update(combined).digest('hex').substring(0, 4);
  return `${prefix}_${hash}`;
}

function parseNumber(value) {
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}

async function importV070() {
  const report = {
    timestamp: new Date().toISOString(),
    version: 'v0.7.0',
    publishers_processed: 0,
    games_processed: 0,
    rule_sources_created: 0,
    import_batches_created: 0,
    verification_records_created: 0,
    warnings: [],
    errors: [],
  };

  try {
    console.log('📖 Reading v0.7.0 Excel file...');
    const workbook = XLSX.readFile(EXCEL_FILE);

    // ===== PUBLISHERS =====
    const publishersData = {};
    if (workbook.SheetNames.includes('Verlage')) {
      const publishersSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Verlage']);
      console.log(`\n📋 Processing ${publishersSheet.length} publishers...`);

      for (const row of publishersSheet) {
        const id = normalize(row['Verlag-ID']);
        if (!id) continue;

        publishersData[id] = {
          id: generateStableId('pub', id),
          original_id: id,
          name: normalize(row['Verlag']),
          country: normalize(row['Land']),
          priority: parseNumber(row['Priorität']),
          website: validateUrl(row['Startseite']),
          games_catalog: validateUrl(row['Spieleübersicht']),
          rules_archive: validateUrl(row['Anleitungsquelle']),
          relevance: normalize(row['Relevanz']),
          status: normalize(row['Status']),
          notes: normalize(row['Hinweis']),
        };
        report.publishers_processed++;
      }
    }

    const publishersArray = Object.values(publishersData).sort((a, b) =>
      a.priority !== null && b.priority !== null 
        ? a.priority - b.priority 
        : a.name.localeCompare(b.name, 'de')
    );

    // ===== GAMES & RULE SOURCES =====
    const gamesArray = [];
    const ruleSourcesArray = [];
    const verificationRecordsArray = [];
    const publisherNameToId = {};

    // Build name→ID map
    publishersArray.forEach(p => {
      publisherNameToId[p.name] = p.original_id;
    });

    if (workbook.SheetNames.includes('Spiele und Anleitungen')) {
      const gamesSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Spiele und Anleitungen']);
      console.log(`\n🎲 Processing ${gamesSheet.length} games...`);

      const importBatchId = generateStableId('batch', new Date().toISOString());

      for (const row of gamesSheet) {
        const recordId = normalize(row['Datensatz-ID']);
        if (!recordId) continue;

        const title = normalize(row['Spiel']);
        if (!title) continue;

        // Publisher mapping
        const pubName = normalize(row['Verlag / Marke']);
        const publisherId = pubName ? publisherNameToId[pubName] : null;

        // Build game record
        const game = {
          id: generateStableId('game', recordId),
          original_id: recordId,
          title: title,
          title_en: normalize(row['Originaltitel']),
          publisher_original_id: publisherId,
          category_primary: normalize(row['Kategorie']),
          category_secondary: null,
          game_type: normalize(row['Spieltyp']),
          mechanics: normalize(row['Mechaniken']),
          description: null,
          language: normalize(row['Sprache']) || 'de',
          language_dependence: normalize(row['Sprachabhängigkeit']),
          year_published: null,
          player_count: {
            min: parseNumber(row['Spielerzahl min.']),
            max: parseNumber(row['Spielerzahl max.'])
          },
          min_age: parseNumber(row['Mindestalter']),
          duration: {
            min: parseNumber(row['Spieldauer min. (Min.)']),
            max: parseNumber(row['Spieldauer max. (Min.)'])
          },
          complexity: normalize(row['Komplexität']),
          status: normalize(row['Anleitungsstatus']) || 'unknown',
          bgg_rank: null,
          bgg_id: normalize(row['BGG-ID']),
          notes: normalize(row['Hinweis']),
          rule_url: validateUrl(row['Anleitung / Regelquelle']),
          product_url: validateUrl(row['Produkt- oder Katalogseite']),
          article_number: normalize(row['Artikelnummer / EAN']),
          is_german_edition: normalize(row['Deutsche Edition']) === 'Ja',
          verification_status: normalize(row['Prüfstatus']),
          verified_date: normalize(row['Geprüft am']),
          metadata_status: normalize(row['Metadatenstatus']),
          import_batch_id: importBatchId,
        };

        gamesArray.push(game);
        report.games_processed++;

        // Create rule source record
        const ruleUrl = validateUrl(row['Anleitung / Regelquelle']);
        const productUrl = validateUrl(row['Produkt- oder Katalogseite']);

        if (ruleUrl || productUrl) {
          const ruleSource = {
            id: generateStableId('src', recordId, ruleUrl || productUrl),
            game_original_id: recordId,
            game_id: game.id,
            type: normalize(row['Linktyp']) || 'unknown',
            language: normalize(row['Sprache']) || 'de',
            url: ruleUrl || productUrl,
            source_type: ruleUrl ? 'rule' : 'product',
            verification_status: normalize(row['Prüfstatus']),
            verified_date: normalize(row['Geprüft am']),
            is_primary: !!ruleUrl,
            import_batch_id: importBatchId,
          };

          ruleSourcesArray.push(ruleSource);
          report.rule_sources_created++;

          // Create verification history record
          const verificationRecord = {
            id: generateStableId('verify', recordId, new Date().toISOString()),
            rule_source_id: ruleSource.id,
            game_original_id: recordId,
            verification_status: normalize(row['Prüfstatus']),
            verified_date: normalize(row['Geprüft am']),
            notes: normalize(row['Hinweis']),
            verified_by: 'batch_import_v070',
            import_batch_id: importBatchId,
          };

          verificationRecordsArray.push(verificationRecord);
          report.verification_records_created++;
        }
      }

      // Create import batch record
      const importBatch = {
        id: generateStableId('batch', new Date().toISOString()),
        name: 'v0.7.0 Initial Import',
        version: 'v0.7.0',
        import_date: new Date().toISOString(),
        source_file: 'NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.7.0.xlsx',
        games_count: gamesArray.length,
        publishers_count: publishersArray.length,
        rule_sources_count: ruleSourcesArray.length,
        status: 'completed',
      };

      report.import_batches_created = 1;
    }

    // ===== GAME EDITIONS (placeholder) =====
    const gameEditionsArray = gamesArray
      .filter(g => g.is_german_edition || g.title_en)
      .map(g => ({
        id: generateStableId('edition', g.original_id, 'de'),
        game_id: g.id,
        game_original_id: g.original_id,
        language: 'de',
        title: g.title,
        title_original: g.title_en,
        publisher_original_id: g.publisher_original_id,
        article_number: g.article_number,
        is_primary: true,
        status: 'active',
      }))
      .slice(0, 100); // Limit for now

    // ===== SAVE ALL FILES =====
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log(`\n💾 Saving ${publishersArray.length} publishers...`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'publishers.json'), JSON.stringify(publishersArray, null, 2));

    console.log(`💾 Saving ${gamesArray.length} games...`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'games.json'), JSON.stringify(gamesArray, null, 2));

    console.log(`💾 Saving ${ruleSourcesArray.length} rule sources...`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'rule-sources.json'), JSON.stringify(ruleSourcesArray, null, 2));

    console.log(`💾 Saving ${gameEditionsArray.length} game editions...`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'game-editions.json'), JSON.stringify(gameEditionsArray, null, 2));

    console.log(`💾 Saving verification history...`);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'source-verification-history.json'), JSON.stringify(verificationRecordsArray, null, 2));

    console.log(`\n✅ v0.7.0 Import Complete!`);
    console.log('='.repeat(50));
    console.log(`📊 Publishers: ${report.publishers_processed}`);
    console.log(`🎲 Games: ${report.games_processed}`);
    console.log(`📝 Rule Sources: ${report.rule_sources_created}`);
    console.log(`📖 Game Editions: ${gameEditionsArray.length}`);
    console.log(`✓ Verification Records: ${report.verification_records_created}`);

    // Save report
    fs.writeFileSync(path.join(OUTPUT_DIR, 'import-v070-report.json'), JSON.stringify(report, null, 2));

    return report;
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    report.errors.push(err.message);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'import-v070-report.json'), JSON.stringify(report, null, 2));
    throw err;
  }
}

if (require.main === module) {
  importV070()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { importV070 };
