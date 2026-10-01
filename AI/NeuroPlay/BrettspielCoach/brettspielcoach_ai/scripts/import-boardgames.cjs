#!/usr/bin/env node

/**
 * NeuroPlay Board Game Catalog Import
 * 
 * Imports board game data from Excel files and generates normalized JSON
 * for the React application.
 * 
 * Usage: node scripts/import-boardgames.js [excel-file] [output-dir]
 * Default: imports latest v0.5.0 Excel file to src/data/generated/
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');
const REPORT_FILE = path.join(OUTPUT_DIR, 'import-report.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Generate stable deterministic ID
 */
function generateStableId(prefix, ...components) {
  const combined = components.filter(c => c && String(c).trim()).join('|');
  const hash = combined.split('').reduce((h, c) => {
    return ((h << 5) - h) + c.charCodeAt(0);
  }, 0);
  return `${prefix}_${Math.abs(hash).toString(36)}`;
}

/**
 * Normalize text values
 */
function normalize(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  return trimmed === '' ? null : trimmed;
}

/**
 * Validate URL
 */
function validateUrl(url) {
  if (!url) return null;
  const trimmed = normalize(url);
  if (!trimmed) return null;
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return null;
  }
}

/**
 * Parse year with fallback
 */
function parseYear(value) {
  if (!value) return null;
  const parsed = parseInt(value);
  if (isNaN(parsed) || parsed < 1950 || parsed > new Date().getFullYear() + 5) {
    return null;
  }
  return parsed;
}

/**
 * Parse integer range (e.g., "2-4" → {min: 2, max: 4})
 */
function parseRange(value) {
  if (!value) return null;
  const str = String(value).trim();
  const parts = str.split(/[–—-]/);
  if (parts.length === 1) {
    const num = parseInt(parts[0]);
    return isNaN(num) ? null : { min: num, max: num };
  }
  const min = parseInt(parts[0]);
  const max = parseInt(parts[parts.length - 1]);
  if (isNaN(min) || isNaN(max)) return null;
  return { min, max };
}

/**
 * Main import function
 */
async function importBoardgames(excelPath) {
  const report = {
    timestamp: new Date().toISOString(),
    source_file: path.basename(excelPath),
    sheets_processed: [],
    games_imported: 0,
    publishers_imported: 0,
    categories_imported: 0,
    rule_sources_imported: 0,
    duplicates_found: 0,
    errors: [],
    warnings: [],
  };

  try {
    // Read Excel file
    if (!fs.existsSync(excelPath)) {
      throw new Error(`Excel file not found: ${excelPath}`);
    }

    const workbook = XLSX.readFile(excelPath);
    const publisherData = {};
    const gameData = {};
    const categorySet = new Set();
    const ruleSourceData = [];

    // Process Publishers sheet
    if (workbook.SheetNames.includes('Verlage')) {
      const publishersSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Verlage']);
      report.sheets_processed.push('Verlage');

      for (const row of publishersSheet) {
        try {
          const id = normalize(row['Verlag-ID']);
          if (!id) {
            report.warnings.push('Publisher ohne Verlag-ID übersprungen');
            continue;
          }

          const publisher = {
            id: generateStableId('pub', id),
            original_id: id,
            name: normalize(row['Verlag']),
            country: normalize(row['Land']),
            priority: parseInt(row['Priorität']) || null,
            website: validateUrl(row['Startseite']),
            games_catalog: validateUrl(row['Spieleübersicht']),
            rules_archive: validateUrl(row['Anleitungsquelle']),
            relevance: normalize(row['Relevanz']),
            status: normalize(row['Status']),
            notes: normalize(row['Hinweis']),
          };

          if (!publisher.name) {
            report.warnings.push(`Publisher ${id} hat keinen Namen`);
            continue;
          }

          publisherData[id] = publisher;
          report.publishers_imported++;
        } catch (err) {
          report.errors.push(`Publisher-Fehler Zeile ${publishersSheet.indexOf(row)}: ${err.message}`);
        }
      }
    }

    // Process Games sheet
    if (workbook.SheetNames.includes('Spiele und Anleitungen')) {
      const gamesSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Spiele und Anleitungen']);
      report.sheets_processed.push('Spiele und Anleitungen');

      for (const row of gamesSheet) {
        try {
          const recordId = normalize(row['Datensatz-ID']);
          if (!recordId) continue;

          // Check for duplicates
          if (gameData[recordId]) {
            report.duplicates_found++;
            report.warnings.push(`Duplikat gefunden: ${recordId}`);
            continue;
          }

          const publisherId = normalize(row['Verlag-ID']);
          const title = normalize(row['Spiel']);
          if (!title) {
            report.warnings.push(`Spiel ${recordId} hat keinen Titel`);
            continue;
          }

          // Parse categories (note: Excel has "Kategorie primär" and "Kategorie sekundär" OR just "Kategorie")
          const catPrimary = normalize(row['Kategorie primär']) || normalize(row['Kategorie']);
          const catSecondary = normalize(row['Kategorie sekundär']);
          if (catPrimary) categorySet.add(catPrimary);
          if (catSecondary) categorySet.add(catSecondary);

          const game = {
            id: generateStableId('game', recordId),
            original_id: recordId,
            title: title,
            title_en: normalize(row['Englischer Titel']),
            publisher_original_id: publisherId,
            category_primary: catPrimary,
            category_secondary: catSecondary,
            description: normalize(row['Kurzbeschreibung']),
            language: normalize(row['Sprache']) || 'de',
            year_published: parseYear(row['Erscheinungsjahr']),
            player_count: parseRange(row['Spielerzahl']),
            min_age: parseInt(row['Mindestalter']) || null,
            duration: parseRange(row['Spieldauer']),
            status: normalize(row['Anleitungsstatus']) || 'unknown',
            bgg_rank: parseInt(row['BGG Ranking']) || null,
            bgg_id: normalize(row['BGG ID']),
            notes: normalize(row['Hinweis']),
          };

          gameData[recordId] = game;
          report.games_imported++;

          // Add rule source if available
          const ruleUrl = validateUrl(row['Anleitung / Regelquelle']);
          const productUrl = validateUrl(row['Produkt- oder Katalogseite']);

          if (ruleUrl || productUrl) {
            ruleSourceData.push({
              id: generateStableId('src', recordId, ruleUrl || productUrl),
              game_original_id: recordId,
              type: normalize(row['Linktyp']) || 'unknown',
              language: game.language,
              rule_url: ruleUrl,
              product_url: productUrl,
              verification_status: normalize(row['Prüfstatus']) || 'unverified',
              verified_date: normalize(row['Geprüft am']),
            });
            report.rule_sources_imported++;
          }
        } catch (err) {
          report.errors.push(`Spiel-Fehler Zeile ${gamesSheet.indexOf(row)}: ${err.message}`);
        }
      }
    }

    // Build category list
    const categories = Array.from(categorySet).sort().map(name => ({
      id: generateStableId('cat', name),
      name: name,
    }));
    report.categories_imported = categories.length;

    // Write output files
    const output = {
      metadata: {
        version: '1.0',
        generated_at: report.timestamp,
        import_source: report.source_file,
      },
      publishers: Object.values(publisherData),
      games: Object.values(gameData),
      categories: categories,
      rule_sources: ruleSourceData,
    };

    // Save combined data
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'catalog.json'),
      JSON.stringify(output, null, 2)
    );

    // Save individual files for flexibility
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'publishers.json'),
      JSON.stringify(output.publishers, null, 2)
    );
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'games.json'),
      JSON.stringify(output.games, null, 2)
    );
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'categories.json'),
      JSON.stringify(output.categories, null, 2)
    );
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'rule-sources.json'),
      JSON.stringify(output.rule_sources, null, 2)
    );

    // Save report
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

    console.log('\n✅ Import erfolgreich abgeschlossen\n');
    console.log(`   📊 ${report.publishers_imported} Verlage`);
    console.log(`   🎲 ${report.games_imported} Spiele`);
    console.log(`   📁 ${report.categories_imported} Kategorien`);
    console.log(`   📋 ${report.rule_sources_imported} Regelquellen`);
    
    if (report.duplicates_found > 0) {
      console.log(`   ⚠️  ${report.duplicates_found} Duplikate übersprungen`);
    }
    if (report.warnings.length > 0) {
      console.log(`   ⚠️  ${report.warnings.length} Warnungen`);
    }
    if (report.errors.length > 0) {
      console.log(`   ❌ ${report.errors.length} Fehler\n`);
      report.errors.slice(0, 5).forEach(e => console.log(`      - ${e}`));
      if (report.errors.length > 5) {
        console.log(`      ... und ${report.errors.length - 5} weitere`);
      }
    }
    
    console.log(`\n   📁 Ausgabe: ${OUTPUT_DIR}`);
    console.log(`   📄 Report: ${REPORT_FILE}\n`);

    return report;
  } catch (error) {
    report.errors.push(`Fataler Fehler: ${error.message}`);
    console.error('\n❌ Import fehlgeschlagen:', error.message);
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const excelFile = process.argv[2] || 
    '/home/www/aibuilder-514nc/uploads/7ae5285e-514d-4aa6-89e0-04a81fcb0b7b-NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.5.0.xlsx';
  
  importBoardgames(excelFile);
}

module.exports = { importBoardgames, generateStableId, normalize, validateUrl };
