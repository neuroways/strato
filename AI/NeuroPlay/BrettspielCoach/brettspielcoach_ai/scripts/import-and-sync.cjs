#!/usr/bin/env node

/**
 * Import Excel & Sync to PocketBase
 * 
 * Reads latest Excel file from uploads/, parses it, and syncs to PocketBase collections:
 * - publishers
 * - games
 * - rule_sources
 * - game_editions
 * - source_verification_history
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const crypto = require('crypto');
const http = require('http');

const PROJECT_DIR = '/home/www/aibuilder-514nc';
const UPLOADS_DIR = path.join(PROJECT_DIR, 'uploads');
const OUTPUT_DIR = path.join(PROJECT_DIR, 'app/src/data/generated');
const TOKEN = process.env.TOKEN || '';

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

function findLatestExcel() {
  const files = fs.readdirSync(UPLOADS_DIR).filter(f => f.endsWith('.xlsx'));
  if (files.length === 0) throw new Error('Keine Excel-Datei in uploads/ gefunden');
  
  files.sort((a, b) => {
    const statA = fs.statSync(path.join(UPLOADS_DIR, a));
    const statB = fs.statSync(path.join(UPLOADS_DIR, b));
    return statB.mtime - statA.mtime;
  });
  
  return path.join(UPLOADS_DIR, files[0]);
}

async function importFromExcel(excelPath) {
  console.log(`📖 Lese Excel-Datei: ${path.basename(excelPath)}`);
  
  const workbook = XLSX.readFile(excelPath);
  
  const result = {
    publishers: [],
    games: [],
    ruleSources: [],
    gameEditions: [],
    verificationHistory: [],
    report: {
      timestamp: new Date().toISOString(),
      file: path.basename(excelPath),
      publishers_processed: 0,
      games_processed: 0,
      rule_sources_created: 0,
      verification_records_created: 0,
    }
  };

  // Publishers
  if (workbook.SheetNames.includes('Verlage')) {
    const publishersSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Verlage']);
    const publisherMap = {};

    publishersSheet.forEach(row => {
      const id = normalize(row['Verlag-ID']);
      if (!id) return;

      publisherMap[id] = {
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
      result.report.publishers_processed++;
    });

    result.publishers = Object.values(publisherMap).sort((a, b) =>
      a.priority !== null && b.priority !== null 
        ? a.priority - b.priority 
        : a.name.localeCompare(b.name, 'de')
    );
  }

  // Games & Rule Sources
  if (workbook.SheetNames.includes('Spiele und Anleitungen')) {
    const gamesSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Spiele und Anleitungen']);
    const publisherMap = {};
    result.publishers.forEach(p => {
      publisherMap[p.name] = p.original_id;
    });

    gamesSheet.forEach(row => {
      const recordId = normalize(row['Datensatz-ID']);
      if (!recordId) return;

      const title = normalize(row['Spiel']);
      if (!title) return;

      const pubName = normalize(row['Verlag / Marke']);
      const publisherId = pubName ? publisherMap[pubName] : null;

      const game = {
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
      };

      result.games.push(game);
      result.report.games_processed++;

      // Rule source
      const ruleUrl = validateUrl(row['Anleitung / Regelquelle']);
      const productUrl = validateUrl(row['Produkt- oder Katalogseite']);

      if (ruleUrl || productUrl) {
        const ruleSource = {
          game_original_id: recordId,
          type: normalize(row['Linktyp']) || 'unknown',
          language: normalize(row['Sprache']) || 'de',
          url: ruleUrl || productUrl,
          source_type: ruleUrl ? 'rule' : 'product',
          verification_status: normalize(row['Prüfstatus']),
          verified_date: normalize(row['Geprüft am']),
          is_primary: !!ruleUrl,
        };

        result.ruleSources.push(ruleSource);
        result.report.rule_sources_created++;

        // Verification history
        const verificationRecord = {
          game_original_id: recordId,
          rule_source_id: ruleSource.url,
          verification_status: normalize(row['Prüfstatus']),
          verified_date: normalize(row['Geprüft am']),
          notes: normalize(row['Hinweis']),
          verified_by: 'excel_import',
        };

        result.verificationHistory.push(verificationRecord);
        result.report.verification_records_created++;
      }
    });
  }

  return result;
}

async function uploadToCollections(collections) {
  console.log('\n' + '='.repeat(60));
  console.log('Synchronisiere zu PocketBase...');
  console.log('='.repeat(60));

  if (!TOKEN) {
    console.error('❌ TOKEN erforderlich: TOKEN=<token> npm run import-sync');
    process.exit(1);
  }

  async function uploadRecord(collectionName, record) {
    return new Promise((resolve) => {
      const {id, collectionId, collectionName: _, ...data} = record;
      const postData = JSON.stringify(data);
      
      const options = {
        socketPath: '/run/cm4all/http/tie.socket',
        path: `/.sfs-bd/api/collections/${collectionName}/records`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        }
      };
      
      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({status: res.statusCode, success: res.statusCode === 200});
        });
      });
      
      req.on('error', () => resolve({status: 0, success: false}));
      req.write(postData);
      req.end();
    });
  }

  async function syncCollection(name, records) {
    if (records.length === 0) return {created: 0, failed: 0};
    
    console.log(`\n📤 ${name} (${records.length} Datensätze)...`);
    let created = 0, failed = 0;
    
    for (let i = 0; i < records.length; i++) {
      const result = await uploadRecord(name, records[i]);
      if (result.success) created++;
      else failed++;
      
      if ((i + 1) % 100 === 0) {
        process.stdout.write(`\r   ${created}/${i + 1}`);
      }
    }
    
    console.log(`\n   ✅ ${created} erstellt`);
    return {created, failed};
  }

  const results = {
    publishers: await syncCollection('publishers', collections.publishers),
    games: await syncCollection('games', collections.games),
    ruleSources: await syncCollection('rule_sources', collections.ruleSources),
  };

  return results;
}

async function main() {
  try {
    // Find & import Excel
    const excelPath = findLatestExcel();
    const imported = await importFromExcel(excelPath);
    
    console.log(`\n✅ ${imported.report.publishers_processed} Verlage`);
    console.log(`✅ ${imported.report.games_processed} Spiele`);
    console.log(`✅ ${imported.report.rule_sources_created} Regelquellen`);

    // Save JSON
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(OUTPUT_DIR, 'publishers.json'), JSON.stringify(imported.publishers, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'games.json'), JSON.stringify(imported.games, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'rule-sources.json'), JSON.stringify(imported.ruleSources, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'import-latest-report.json'), JSON.stringify(imported.report, null, 2));

    // Upload to PocketBase
    const syncResults = await uploadToCollections(imported);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Synchronisierung abgeschlossen!');
    console.log('='.repeat(60));
    console.log(`\n👥 Verlage:    ${syncResults.publishers.created} hochgeladen`);
    console.log(`🎲 Spiele:     ${syncResults.games.created} hochgeladen`);
    console.log(`📝 Regelquellen: ${syncResults.ruleSources.created} hochgeladen\n`);

  } catch (err) {
    console.error('\n❌ Fehler:', err.message);
    process.exit(1);
  }
}

main();
