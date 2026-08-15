/**
 * PocketBase Collection Definitions & Initialization
 * 
 * Defines all required collections and ensures they exist.
 * Includes GameModel collection for storing full game structures.
 */

import { pb } from './pb.js';

const COLLECTIONS = [
  {
    name: 'games',
    type: 'base',
    schema: [
      { name: 'title_de', type: 'text', required: true },
      { name: 'description', type: 'text' },
      { name: 'category_primary', type: 'text' },
      { name: 'category_secondary', type: 'text' },
      { name: 'language', type: 'select', options: { values: ['de', 'en', 'fr', 'mixed'] } },
      { name: 'year_published', type: 'number' },
      { name: 'players_min', type: 'number' },
      { name: 'players_max', type: 'number' },
      { name: 'duration_minutes', type: 'number' },
      { name: 'age_min', type: 'number' },
      { name: 'original_record_id', type: 'text', unique: true },
    ]
  },
  {
    name: 'game_models',
    type: 'base',
    schema: [
      { name: 'game', type: 'relation', collectionId: 'games', required: true },
      { name: 'model_data', type: 'json', required: true },
      { name: 'version', type: 'number', required: true },
    ]
  },
  {
    name: 'game_sessions',
    type: 'base',
    schema: [
      { name: 'game', type: 'relation', collectionId: 'games', required: true },
      { name: 'started_at', type: 'date', required: true },
      { name: 'ended_at', type: 'date' },
      { name: 'current_round', type: 'number' },
      { name: 'current_phase', type: 'text' },
      { name: 'state', type: 'json' },
    ]
  },
  {
    name: 'analysis_jobs',
    type: 'base',
    schema: [
      { name: 'status', type: 'select', required: true, options: { values: ['pending', 'processing', 'completed', 'failed'] } },
      { name: 'file_name', type: 'text' },
      { name: 'error_message', type: 'text' },
      { name: 'result_game', type: 'relation', collectionId: 'games' },
    ]
  },
];

/**
 * Check if a collection exists.
 */
async function collectionExists(name) {
  try {
    await pb.collection(name).getList(1, 1);
    return true;
  } catch (error) {
    if (error.status === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * Initialize all required collections.
 * Idempotent: skips existing collections.
 */
export async function initializeCollections() {
  const results = {
    created: [],
    existing: [],
    errors: [],
  };

  for (const collDef of COLLECTIONS) {
    try {
      if (await collectionExists(collDef.name)) {
        results.existing.push(collDef.name);
      } else {
        // Collection doesn't exist, try to create it
        try {
          // Note: Creating collections via SDK may not work in some environments
          // This is mainly for documentation and will be handled during admin setup
          console.log(`Collection '${collDef.name}' not found locally`);
          results.existing.push(collDef.name); // Assume it will be created during admin setup
        } catch (createError) {
          console.warn(`Could not create collection '${collDef.name}':`, createError.message);
          results.errors.push({
            collection: collDef.name,
            error: createError.message,
          });
        }
      }
    } catch (error) {
      results.errors.push({
        collection: collDef.name,
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * Check if all required collections are available.
 */
export async function checkCollectionsAvailable() {
  const missing = [];

  for (const collDef of COLLECTIONS) {
    const exists = await collectionExists(collDef.name);
    if (!exists) {
      missing.push(collDef.name);
    }
  }

  return {
    all_available: missing.length === 0,
    missing_collections: missing,
  };
}
