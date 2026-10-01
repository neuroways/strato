/**
 * Catalog Repository
 * 
 * Loads all data directly from PocketBase collections.
 * All pages reference the same source.
 */

import { pb } from './pb';

/**
 * Load all games from PocketBase games collection.
 */
export async function loadCatalogGames() {
  try {
    return await pb.collection('games').getFullList({ sort: 'title' });
  } catch (error) {
    console.error('Fehler beim Laden von Spielen:', error);
    return [];
  }
}

/**
 * Get unique categories from PocketBase games.
 */
export async function getCatalogCategories() {
  try {
    const games = await pb.collection('games').getFullList({ sort: 'category_primary' });
    const categories = new Set(games.map(g => g.category_primary).filter(Boolean));
    return Array.from(categories).sort((a, b) => a.localeCompare(b, 'de'));
  } catch (error) {
    console.error('Fehler beim Laden von Kategorien:', error);
    return [];
  }
}

/**
 * Get unique publishers from PocketBase games.
 */
export async function getCatalogPublishers() {
  try {
    const games = await pb.collection('games').getFullList({ sort: 'publisher_original_id' });
    const publishers = new Set(games.map(g => g.publisher_original_id).filter(Boolean));
    return Array.from(publishers).sort((a, b) => a.localeCompare(b, 'de'));
  } catch (error) {
    console.error('Fehler beim Laden von Verlagen:', error);
    return [];
  }
}

/**
 * Verify catalog storage is available.
 */
export async function initializeCatalogStorage() {
  try {
    // Test if we can access games collection
    await pb.collection('games').getFullList({ limit: 1 });
    return true;
  } catch (error) {
    console.error('Katalog-Speicher nicht verfügbar:', error);
    return false;
  }
}
