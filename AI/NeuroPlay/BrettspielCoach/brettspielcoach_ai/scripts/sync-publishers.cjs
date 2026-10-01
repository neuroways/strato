/**
 * Sync Publishers Collection to PocketBase
 * 
 * This script:
 * 1. Reads publishers from Excel file (Verlage sheet)
 * 2. Generates deterministic stable IDs
 * 3. Creates/updates publishers collection in PocketBase
 * 4. Returns sync report with stats
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const crypto = require('crypto');

const EXCEL_FILE = process.argv[2] || path.join(__dirname, '../../../uploads/7ae5285e-514d-4aa6-89e0-04a81fcb0b7b-NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.5.0.xlsx');
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');

// Utility functions
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

async function syncPublishers() {
  const report = {
    timestamp: new Date().toISOString(),
    source_file: path.basename(EXCEL_FILE),
    publishers_processed: 0,
    publishers_created: 0,
    publishers_updated: 0,
    errors: [],
    warnings: [],
  };

  try {
    // Read Excel file
    if (!fs.existsSync(EXCEL_FILE)) {
      throw new Error(`Excel file not found: ${EXCEL_FILE}`);
    }

    const workbook = XLSX.readFile(EXCEL_FILE);
    const publishersData = {};

    // Process Publishers sheet
    if (!workbook.SheetNames.includes('Verlage')) {
      throw new Error('Sheet "Verlage" not found in Excel file');
    }

    const publishersSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Verlage']);
    console.log(`Processing ${publishersSheet.length} publishers...`);

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

        publishersData[id] = publisher;
        report.publishers_processed++;
      } catch (err) {
        report.errors.push(`Publisher-Fehler bei Zeile: ${err.message}`);
      }
    }

    // Save publishers to JSON
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const publishersArray = Object.values(publishersData).sort((a, b) => 
      a.priority !== null && b.priority !== null 
        ? a.priority - b.priority 
        : a.name.localeCompare(b.name, 'de')
    );

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'publishers.json'),
      JSON.stringify(publishersArray, null, 2)
    );

    report.publishers_created = publishersArray.length;

    // Save report
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'publishers-sync-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ Publishers synced successfully!');
    console.log(`📊 Report: ${publishersArray.length} publishers processed`);
    console.log(`📁 Saved to: ${path.join(OUTPUT_DIR, 'publishers.json')}`);
    
    return report;
  } catch (err) {
    console.error('❌ Error:', err.message);
    report.errors.push(`Fatal: ${err.message}`);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'publishers-sync-report.json'),
      JSON.stringify(report, null, 2)
    );
    throw err;
  }
}

// Run if executed directly
if (require.main === module) {
  syncPublishers()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { syncPublishers };
