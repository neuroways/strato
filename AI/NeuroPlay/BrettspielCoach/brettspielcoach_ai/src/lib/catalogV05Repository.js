/**
 * Catalog v0.5.0 Repository
 * 
 * Provides access to the complete NeuroPlay board game catalog
 * from the v0.5.0 Excel export (844 games, 32 publishers).
 */

import { pb } from './pb.js';
import catalogData from '../data/catalog-v0.5.0.json';

/**
 * Get publishers from v0.5.0 catalog
 */
export function getPublishersV05() {
  const publishersSheet = catalogData.sheets?.find(s => s.name === 'Verlage');
  if (!publishersSheet) return [];
  return publishersSheet.data || [];
}

/**
 * Get all games from v0.5.0 catalog
 */
export function getGamesV05() {
  const gamesSheet = catalogData.sheets?.find(s => s.name === 'Spiele und Anleitungen');
  if (!gamesSheet) return [];
  return gamesSheet.data || [];
}

/**
 * Get BGG top 200 comparison
 */
export function getTop200V05() {
  const top200Sheet = catalogData.sheets?.find(s => s.name === 'Top 200 Abgleich');
  if (!top200Sheet) return [];
  return top200Sheet.data || [];
}

/**
 * Initialize catalog storage from v0.5.0 data
 * Syncs all publishers and games to PocketBase
 */
export async function initializeCatalogV05() {
  try {
    // Check if already synced
    const gameCount = await pb.collection('catalog_games').getList(1, 1);
    if (gameCount.totalItems > 0) {
      console.log('Katalog bereits synchronisiert');
      return { synced: false, reason: 'already_imported' };
    }
  } catch (err) {
    // Collection may not exist yet
    if (err.status === 404) {
      throw new Error('catalog_games Collection nicht vorhanden');
    }
  }

  const results = {
    publishersImported: 0,
    gamesImported: 0,
    publishersFailed: 0,
    gamesFailed: 0,
    errors: [],
  };

  // Import publishers first
  const publishers = getPublishersV05();
  for (const pub of publishers) {
    try {
      // Check if exists
      const existing = await pb.collection('publishers').getFirstListItem(
        `original_record_id="${pub['ID']}"`.replace(/"/g, '\\"')
      ).catch(() => null);

      if (existing) continue;

      await pb.collection('publishers').create({
        original_record_id: pub['ID'],
        name_de: pub['Verlag'] || 'Unbekannt',
        country: pub['Land'] || null,
        priority: parseInt(pub['Priorität']) || null,
        website: pub['Startseite'] || null,
        notes: pub['Hinweis'] || null,
      });
      results.publishersImported++;
    } catch (err) {
      results.publishersFailed++;
      results.errors.push(`Publisher ${pub['Verlag']}: ${err.message}`);
    }
  }

  // Import games
  const games = getGamesV05();
  const publisherMap = {};

  // Build publisher ID map
  try {
    const allPubs = await pb.collection('publishers').getFullList();
    allPubs.forEach(p => {
      if (p.original_record_id) {
        publisherMap[p.original_record_id] = p.id;
      }
    });
  } catch {
    // Continue without full map
  }

  for (const game of games) {
    try {
      // Check if exists
      const existing = await pb.collection('catalog_games').getFirstListItem(
        `original_record_id="${game['Datensatz-ID']}"`.replace(/"/g, '\\"')
      ).catch(() => null);

      if (existing) continue;

      const publisherId = publisherMap[game['ID Verlag']] || null;

      await pb.collection('catalog_games').create({
        original_record_id: game['Datensatz-ID'],
        title_de: game['Spiel'] || 'Unbekannt',
        publisher: publisherId,
        category: game['Kategorie primär'] || null,
        category_secondary: game['Kategorie sekundär'] || null,
        language: game['Sprache'] || 'de',
        link_type: game['Linktyp'] || null,
        rule_url: game['Anleitung / Regelquelle'] || null,
        product_url: game['Produkt- oder Katalogseite'] || null,
        article_number: game['Artikelnummer / EAN'] || null,
        verification_status: game['Prüfstatus'] || null,
        verified_date: game['Geprüft am'] || null,
        notes: game['Hinweis'] || null,
        bgg_rank: parseInt(game['BGG Ranking']) || null,
        bgg_id: game['BGG ID'] || null,
      });
      results.gamesImported++;
    } catch (err) {
      results.gamesFailed++;
      if (results.errors.length < 20) {
        results.errors.push(`Game ${game['Spiel']}: ${err.message}`);
      }
    }
  }

  return results;
}

/**
 * Search games v0.5.0
 */
export function searchGamesV05(term) {
  const games = getGamesV05();
  if (!term) return games;

  const lower = term.toLowerCase();
  return games.filter(g =>
    (g['Spiel']?.toLowerCase().includes(lower)) ||
    (g['Verlag']?.toLowerCase().includes(lower)) ||
    (g['Kategorie primär']?.toLowerCase().includes(lower))
  );
}

/**
 * Get unique values for a field
 */
export function getUniqueValuesV05(field) {
  const games = getGamesV05();
  const values = new Set(games.map(g => g[field]).filter(v => v && v.trim()));
  return Array.from(values).sort();
}
