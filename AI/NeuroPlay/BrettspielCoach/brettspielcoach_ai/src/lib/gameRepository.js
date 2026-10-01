/**
 * Game Repository
 * 
 * Provides persistent storage for game data via PocketBase.
 * Implements idempotent load/save with migration support.
 */

import { pb } from './pb.js';
import { EXAMPLE_GAME } from './gameService.js';

/**
 * Ensure the games collection exists and is initialized
 * with demo data if empty.
 */
export async function initializeGameStorage() {
  try {
    // Check if games collection exists and has data
    const result = await pb.collection('games').getList(1, 1);
    if (result.totalItems === 0) {
      // No games exist, migrate EXAMPLE_GAME
      await migrateExampleGame();
    }
  } catch (error) {
    if (error.status === 404 || error.message?.includes('collection')) {
      throw new Error(
        'Spieledatenbank nicht vorhanden. Bitte richten Sie PocketBase ein.'
      );
    }
    throw error;
  }
}

/**
 * Load all games from persistent storage.
 */
export async function loadGames() {
  try {
    const result = await pb.collection('games').getFullList({
      sort: '-created',
    });
    return result || [];
  } catch (error) {
    console.error('Fehler beim Laden der Spiele:', error);
    throw error;
  }
}

/**
 * Load a single game by ID.
 */
export async function loadGameById(gameId) {
  try {
    return await pb.collection('games').getOne(gameId);
  } catch (error) {
    console.error(`Fehler beim Laden von Spiel ${gameId}:`, error);
    throw error;
  }
}

/**
 * Save a new game to persistent storage.
 */
export async function saveGame(gameData) {
  try {
    const record = await pb.collection('games').create({
      title_de: gameData.title,
      description: gameData.description,
      category_primary: gameData.category || 'Familienspiel',
      language: 'de',
      year_published: new Date().getFullYear(),
      players_min: gameData.basics?.playerCount?.min || 2,
      players_max: gameData.basics?.playerCount?.max || 4,
      duration_minutes: gameData.basics?.duration?.min || 45,
      age_min: parseInt(gameData.basics?.age || '6'),
      // Store full game structure as hidden fields for now
      original_record_id: gameData.id || `game_${Date.now()}`,
    });
    
    // Also store in GameModel collection for complex data
    const modelRecord = await pb.collection('game_models').create({
      game: record.id,
      model_data: JSON.stringify(gameData),
      version: 1,
    }).catch(err => {
      // If game_models collection doesn't exist, continue without it
      console.warn('Game Models collection nicht verfügbar');
      return null;
    });

    return record;
  } catch (error) {
    console.error('Fehler beim Speichern des Spiels:', error);
    throw error;
  }
}

/**
 * Update an existing game.
 */
export async function updateGame(gameId, gameData) {
  try {
    const updated = await pb.collection('games').update(gameId, {
      title_de: gameData.title,
      description: gameData.description,
      category_primary: gameData.category || 'Familienspiel',
      players_min: gameData.basics?.playerCount?.min || 2,
      players_max: gameData.basics?.playerCount?.max || 4,
      duration_minutes: gameData.basics?.duration?.min || 45,
      age_min: parseInt(gameData.basics?.age || '6'),
    });

    // Update GameModel if available
    await pb.collection('game_models').getFirstListItem(`game="${gameId}"`).then(
      model => pb.collection('game_models').update(model.id, {
        model_data: JSON.stringify(gameData),
        version: (model.version || 0) + 1,
      })
    ).catch(() => {
      // game_models collection may not exist
    });

    return updated;
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Spiels:', error);
    throw error;
  }
}

/**
 * Delete a game from storage.
 */
export async function deleteGame(gameId) {
  try {
    // Delete associated game model first
    try {
      const model = await pb.collection('game_models').getFirstListItem(`game="${gameId}"`);
      await pb.collection('game_models').delete(model.id);
    } catch {
      // No model to delete
    }

    return await pb.collection('games').delete(gameId);
  } catch (error) {
    console.error('Fehler beim Löschen des Spiels:', error);
    throw error;
  }
}

/**
 * Migrate the example game to persistent storage.
 * Idempotent: checks for existing migration by original_record_id.
 */
async function migrateExampleGame() {
  try {
    // Check if already migrated
    const existing = await pb.collection('games').getFirstListItem(
      `original_record_id="${EXAMPLE_GAME.id}"`
    ).catch(() => null);

    if (existing) {
      console.log('Beispielspiel bereits migriert');
      return existing;
    }

    // Migrate the example game
    const record = await pb.collection('games').create({
      title_de: EXAMPLE_GAME.title,
      description: EXAMPLE_GAME.description,
      category_primary: 'Familienspiel',
      language: 'de',
      year_published: 2024,
      players_min: EXAMPLE_GAME.basics.playerCount.min,
      players_max: EXAMPLE_GAME.basics.playerCount.max,
      duration_minutes: EXAMPLE_GAME.basics.duration.min,
      age_min: parseInt(EXAMPLE_GAME.basics.age),
      original_record_id: EXAMPLE_GAME.id,
    });

    // Store full model in game_models
    try {
      await pb.collection('game_models').create({
        game: record.id,
        model_data: JSON.stringify(EXAMPLE_GAME),
        version: 1,
      });
    } catch {
      // game_models collection may not exist yet
      console.warn('Konnte Spielmodell nicht speichern (Collection nicht vorhanden)');
    }

    console.log('Beispielspiel erfolgreich migriert:', record.id);
    return record;
  } catch (error) {
    console.error('Fehler beim Migrieren des Beispielspiels:', error);
    throw error;
  }
}

/**
 * Load game model data (full structure with all nested fields).
 * Falls back to basic data from games collection if model not available.
 */
export async function loadGameModel(gameId) {
  try {
    // Try to load from game_models first
    try {
      const model = await pb.collection('game_models').getFirstListItem(`game="${gameId}"`);
      return JSON.parse(model.model_data);
    } catch {
      // Fall back to basic data from games collection
    }

    // Load basic data
    const game = await loadGameById(gameId);
    return {
      id: game.id,
      title: game.title_de,
      description: game.description,
      category: game.category_primary,
      language: game.language,
      basics: {
        playerCount: {
          min: game.players_min || 2,
          max: game.players_max || 4,
        },
        duration: {
          min: game.duration_minutes || 45,
          max: game.duration_minutes || 60,
        },
        complexity: 'mittel',
        age: `${game.age_min || 6}+`,
      },
    };
  } catch (error) {
    console.error(`Fehler beim Laden des Spielmodells ${gameId}:`, error);
    throw error;
  }
}
