/**
 * Direct Server-Side Import Script
 * Run this from the admin environment to execute the catalog import directly
 * 
 * Usage: node direct-import.js
 */

import { parseCSV } from './parse-csv.js';
import PocketBase from 'pocketbase';
import fs from 'fs';

const pb = new PocketBase('http://localhost:8090');

// Helper functions (same as in catalog-import.js)
function normalize(text) {
  if (!text) return null;
  return text.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[^a-z0-9 ]/g, '');
}

function extractArticleNumber(identifier) {
  if (!identifier || !identifier.trim()) return null;
  if (identifier.includes('/')) return null;
  if (/^\d{8}$|^\d{13}$/.test(identifier.trim())) return null;
  return identifier.trim();
}

function extractEAN(identifier) {
  if (!identifier || !identifier.trim()) return null;
  const clean = identifier.trim();
  if (/^\d{8}$|^\d{13}$/.test(clean)) {
    return clean;
  }
  return null;
}

function getIdentificationStatus(identifier) {
  if (!identifier || !identifier.trim()) {
    return 'incomplete';
  }
  if (identifier.includes('/')) {
    return 'needs_review';
  }
  return 'complete';
}

function mapSourceType(linkType) {
  const mapping = {
    'Direkt-PDF': 'official_rule_pdf',
    'Produktseite mit PDF': 'official_product_page',
    'Regelkatalog-Eintrag': 'official_rule_archive',
    'Produktseite mit Regel': 'official_product_page'
  };
  return mapping[linkType] || 'unknown';
}

async function getInitialCounts() {
  const counts = {
    publishers: 0,
    games: 0,
    game_editions: 0,
    rule_sources: 0,
    source_verification_history: 0,
    import_batches: 0
  };

  const collections = ['publishers', 'games', 'game_editions', 'rule_sources', 'source_verification_history', 'import_batches'];
  
  for (const col of collections) {
    try {
      const result = await pb.collection(col).getList(1, 1);
      counts[col] = result.totalItems;
    } catch (e) {
      counts[col] = 0;
    }
  }

  return counts;
}

async function runImport() {
  console.log('=== NeuroPlay Catalog Import ===\n');

  const stats = {
    publishersCreated: 0,
    gamesCreated: 0,
    editionsCreated: 0,
    ruleSourcesCreated: 0,
    errors: [],
    warnings: []
  };

  // Get initial counts
  const initialCounts = await getInitialCounts();
  console.log('Initial counts:', initialCounts);

  // Load CSV
  const publishersText = fs.readFileSync('./public/verlage.csv', 'utf-8');
  const gamesText = fs.readFileSync('./public/spiele_anleitungen.csv', 'utf-8');

  const publishersData = parseCSV(publishersText).rows;
  const gamesData = parseCSV(gamesText).rows;

  console.log(`\nCSV Data: ${publishersData.length} publishers, ${gamesData.length} games\n`);

  // Create import batch
  let batchId = null;
  try {
    const batch = await pb.collection('import_batches').create({
      import_name: 'NeuroPlay Brettspielanleitungen Quellenkatalog',
      source_file_name: 'NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.1.0.xlsx',
      source_version: '0.1.0',
      started_at: new Date().toISOString(),
      status: 'running',
      publisher_rows_found: publishersData.length,
      publisher_rows_created: 0,
      game_source_rows_found: gamesData.length,
      games_created: 0,
      editions_created: 0,
      rule_sources_created: 0,
      records_skipped: 0,
      records_with_warnings: 0,
      records_with_errors: 0,
      error_log: '[]',
      mapping_version: '0.1.0'
    });
    batchId = batch.id;
    console.log('✓ Import batch created:', batchId);
  } catch (error) {
    console.error('✗ Failed to create import batch:', error.message);
    return;
  }

  // Import publishers
  const publisherMap = {};
  for (const row of publishersData) {
    try {
      const publisherCode = row['Verlag-ID'];
      const publisherData = {
        publisher_code: publisherCode,
        name: row['Verlag'],
        normalized_name: normalize(row['Verlag']),
        country: row['Land'],
        priority: parseInt(row['Priorität']) || null,
        relevance: row['Relevanz'],
        website_url: row['Startseite'],
        games_catalog_url: row['Spieleübersicht'],
        rules_archive_url: row['Anleitungsquelle'],
        catalog_status: row['Status'],
        notes: row['Hinweis'],
        source_import_id: batchId
      };

      // Check for existing
      let existing = null;
      try {
        const list = await pb.collection('publishers').getList(1, 1, {
          filter: `publisher_code = "${publisherCode}"`
        });
        if (list.items.length > 0) {
          existing = list.items[0];
        }
      } catch (err) {
        // collection doesn't exist yet
      }

      if (existing) {
        publisherMap[publisherCode] = existing.id;
      } else {
        const created = await pb.collection('publishers').create(publisherData);
        publisherMap[publisherCode] = created.id;
        stats.publishersCreated++;
      }
    } catch (error) {
      stats.errors.push(`Publisher: ${error.message}`);
    }
  }

  console.log(`✓ Publishers: ${stats.publishersCreated} created`);

  // Import games
  const gameMap = {};
  for (const row of gamesData) {
    try {
      const gameTitle = row['Spiel'];
      const gameLookupKey = normalize(gameTitle);

      // Check for existing game
      let gameId = null;
      try {
        const list = await pb.collection('games').getList(1, 1, {
          filter: `normalized_title = "${gameLookupKey}"`
        });
        if (list.items.length > 0) {
          gameId = list.items[0].id;
        }
      } catch (err) {
        // doesn't exist
      }

      if (!gameId) {
        const created = await pb.collection('games').create({
          title: gameTitle,
          normalized_title: gameLookupKey,
          category: row['Kategorie'],
          status: 'cataloged',
          notes: null,
          source_import_id: batchId
        });
        gameId = created.id;
        stats.gamesCreated++;
      }

      gameMap[gameLookupKey] = gameId;

      // Get publisher
      const publisherMarks = row['Verlag / Marke'];
      const publisherCode = publisherMarks ? publisherMarks.split(' / ')[0].trim() : null;
      const publisherId = publisherCode ? publisherMap[publisherCode] : null;

      // Create edition
      const editionData = {
        game_id: gameId,
        publisher_id: publisherId || null,
        language: row['Sprache'],
        article_number: extractArticleNumber(row['Artikelnummer / EAN']),
        ean: extractEAN(row['Artikelnummer / EAN']),
        identifier_raw: row['Artikelnummer / EAN'],
        product_page_url: row['Produkt- oder Katalogseite'],
        identification_status: getIdentificationStatus(row['Artikelnummer / EAN']),
        notes: null,
        source_import_id: batchId
      };

      const edition = await pb.collection('game_editions').create(editionData);

      // Create rule source
      await pb.collection('rule_sources').create({
        edition_id: edition.id,
        source_type: mapSourceType(row['Linktyp']),
        source_url: row['Anleitung / Regelquelle'],
        product_page_url: row['Produkt- oder Katalogseite'],
        language: row['Sprache'],
        link_type: row['Linktyp'],
        official_status: row['Prüfstatus'].includes('offiziell') || row['Prüfstatus'].includes('geprüft'),
        verification_status: row['Prüfstatus'],
        verified_at: row['Geprüft am'] ? new Date(row['Geprüft am']).toISOString() : null,
        availability_status: 'unknown',
        usage_mode: 'transient_analysis',
        document_version: null,
        checksum: null,
        rights_notes: null,
        notes: row['Hinweis'],
        original_record_id: row['Datensatz-ID'],
        source_import_id: batchId
      });

      stats.ruleSourcesCreated++;
    } catch (error) {
      stats.errors.push(`Game: ${error.message}`);
    }
  }

  console.log(`✓ Games/Sources: ${stats.gamesCreated} games, ${stats.ruleSourcesCreated} rule sources`);

  // Finalize batch
  try {
    await pb.collection('import_batches').update(batchId, {
      completed_at: new Date().toISOString(),
      status: stats.errors.length > 0 ? 'completed_with_errors' : 'completed',
      publisher_rows_created: stats.publishersCreated,
      games_created: stats.gamesCreated,
      editions_created: stats.ruleSourcesCreated,
      rule_sources_created: stats.ruleSourcesCreated,
      records_with_errors: stats.errors.length,
      error_log: JSON.stringify(stats.errors)
    });
    console.log('✓ Import batch finalized\n');
  } catch (error) {
    console.error('✗ Failed to finalize batch:', error.message);
  }

  // Get final counts
  const finalCounts = await getInitialCounts();
  console.log('Final counts:', finalCounts);
  
  console.log('\n=== IMPORT SUMMARY ===');
  console.log(`Publishers created: ${stats.publishersCreated}`);
  console.log(`Games created: ${stats.gamesCreated}`);
  console.log(`Rule sources created: ${stats.ruleSourcesCreated}`);
  console.log(`Errors: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(e => console.log(`  - ${e}`));
  }
}

await runImport().catch(error => {
  console.error('Import failed:', error.message);
  process.exit(1);
});
