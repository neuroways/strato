/**
 * API Handler for Import & Sync
 * Called by the Admin UI to import Excel and sync to PocketBase
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const crypto = require('crypto');
const http = require('http');

const PROJECT_DIR = process.env.PROJECT_DIRECTORY || '/home/www/aibuilder-514nc';
const OUTPUT_DIR = path.join(PROJECT_DIR, 'app/src/data/generated');

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

function parseNumber(value) {
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}

async function importFromExcel(excelPath) {
  const workbook = XLSX.readFile(excelPath);
  
  const result = {
    publishers: [],
    games: [],
    ruleSources: [],
    report: {
      timestamp: new Date().toISOString(),
      file: path.basename(excelPath),
      publishers_processed: 0,
      games_processed: 0,
      rule_sources_created: 0,
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
        language: normalize(row['Sprache']) || 'de',
        language_dependence: normalize(row['Sprachabhängigkeit']),
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
      }
    });
  }

  return result;
}

async function uploadToCollections(collections, token) {
  async function uploadRecord(collectionName, record) {
    return new Promise((resolve) => {
      const {id, collectionId, collectionName: _, ...data} = record;
      const postData = JSON.stringify(data);
      
      const options = {
        socketPath: '/run/cm4all/http/tie.socket',
        path: `/.sfs-bd/api/collections/${collectionName}/records`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
    if (records.length === 0) return {created: 0};
    
    let created = 0;
    for (let i = 0; i < records.length; i++) {
      const result = await uploadRecord(name, records[i]);
      if (result.success) created++;
    }
    
    return {created};
  }

  const results = {
    publishers: await syncCollection('publishers', collections.publishers),
    games: await syncCollection('games', collections.games),
    ruleSources: await syncCollection('rule_sources', collections.ruleSources),
  };

  return results;
}

async function handleImportSync(filePath, token) {
  try {
    const imported = await importFromExcel(filePath);
    
    // Save JSON for local access
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(OUTPUT_DIR, 'publishers.json'), JSON.stringify(imported.publishers, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'games.json'), JSON.stringify(imported.games, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'rule-sources.json'), JSON.stringify(imported.ruleSources, null, 2));

    // Upload to PocketBase if token provided
    let syncResults = {publishers: {created: 0}, games: {created: 0}, ruleSources: {created: 0}};
    if (token) {
      syncResults = await uploadToCollections(imported, token);
    }

    return {
      success: true,
      data: {
        report: imported.report,
        synced: {
          publishers: syncResults.publishers.created,
          games: syncResults.games.created,
          ruleSources: syncResults.ruleSources.created,
        }
      }
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

module.exports = { handleImportSync };
