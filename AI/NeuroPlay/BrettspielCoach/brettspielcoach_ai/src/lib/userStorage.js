import { pb } from './pb';

/**
 * User Storage Service
 * Handles persistent storage of user's game collection, favorites, and tags in PocketBase
 */

export async function syncCollectionToDB(userId, gameId) {
  try {
    const existing = await pb
      .collection('user_game_collection')
      .getFirstListItem(`game_id = "${gameId}" && user_id = "${userId}"`)
      .catch(() => null);

    if (!existing) {
      await pb.collection('user_game_collection').create({
        user_id: userId,
        game_id: gameId,
        is_favorite: false,
      });
    }
  } catch (error) {
    console.warn('Fehler beim Speichern der Sammlung:', error);
  }
}

export async function removeFromCollectionDB(userId, gameId) {
  try {
    const record = await pb
      .collection('user_game_collection')
      .getFirstListItem(`game_id = "${gameId}" && user_id = "${userId}"`)
      .catch(() => null);

    if (record) {
      await pb.collection('user_game_collection').delete(record.id);
    }
  } catch (error) {
    console.warn('Fehler beim Löschen aus der Sammlung:', error);
  }
}

export async function toggleFavoriteDB(userId, gameId, isFavorite) {
  try {
    const record = await pb
      .collection('user_game_collection')
      .getFirstListItem(`game_id = "${gameId}" && user_id = "${userId}"`)
      .catch(() => null);

    if (record) {
      await pb.collection('user_game_collection').update(record.id, {
        is_favorite: isFavorite,
      });
    } else {
      await pb.collection('user_game_collection').create({
        user_id: userId,
        game_id: gameId,
        is_favorite: isFavorite,
      });
    }
  } catch (error) {
    console.warn('Fehler beim Speichern des Favorits:', error);
  }
}

export async function loadUserCollectionDB(userId) {
  try {
    const records = await pb
      .collection('user_game_collection')
      .getFullList({
        filter: `user_id = "${userId}"`,
      });
    return records.map(r => r.game_id);
  } catch (error) {
    console.warn('Fehler beim Laden der Sammlung:', error);
    return [];
  }
}

export async function loadUserFavoritesDB(userId) {
  try {
    const records = await pb
      .collection('user_game_collection')
      .getFullList({
        filter: `user_id = "${userId}" && is_favorite = true`,
      });
    return records.map(r => r.game_id);
  } catch (error) {
    console.warn('Fehler beim Laden der Favoriten:', error);
    return [];
  }
}

export async function syncTagsToDB(userId, gameId, tags) {
  try {
    const existing = await pb
      .collection('user_game_tags')
      .getFirstListItem(`game_id = "${gameId}" && user_id = "${userId}"`)
      .catch(() => null);

    if (tags.length > 0) {
      if (existing) {
        await pb.collection('user_game_tags').update(existing.id, {
          tags,
        });
      } else {
        await pb.collection('user_game_tags').create({
          user_id: userId,
          game_id: gameId,
          tags,
        });
      }
    } else if (existing) {
      await pb.collection('user_game_tags').delete(existing.id);
    }
  } catch (error) {
    console.warn('Fehler beim Speichern der Tags:', error);
  }
}

export async function loadUserTagsDB(userId) {
  try {
    const records = await pb
      .collection('user_game_tags')
      .getFullList({
        filter: `user_id = "${userId}"`,
      });

    const tags = {};
    records.forEach(r => {
      if (r.tags && Array.isArray(r.tags)) {
        tags[r.game_id] = r.tags;
      }
    });
    return tags;
  } catch (error) {
    console.warn('Fehler beim Laden der Tags:', error);
    return {};
  }
}

export function getCurrentUser() {
  return {
    id: localStorage.getItem('neuroplay_user_id'),
    email: localStorage.getItem('neuroplay_user_email'),
    token: localStorage.getItem('neuroplay_auth_token'),
  };
}

export function logout() {
  localStorage.removeItem('neuroplay_user_id');
  localStorage.removeItem('neuroplay_user_email');
  localStorage.removeItem('neuroplay_auth_token');
  localStorage.removeItem('neuroplay_my_collection');
  localStorage.removeItem('neuroplay_my_favorites');
  localStorage.removeItem('neuroplay_my_tags');
}
