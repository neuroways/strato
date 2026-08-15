import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Trash2, Heart } from 'lucide-react';
import { pb } from '../lib/pb';

export function MyGamesScreen({ onBack, currentUser }) {
  const [myCollection, setMyCollection] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'favorites'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' or category name
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        if (!currentUser?.id) {
          setLoading(false);
          return;
        }

        // Load from PocketBase: user_game_collection
        const userGames = await pb.collection('user_game_collection').getFullList({
          filter: `user_id = "${currentUser.id}"`,
          sort: '-created',
        });

        const collectionIds = [];
        const favoriteIds = [];
        
        userGames.forEach(item => {
          if (item.game_id) {
            collectionIds.push(item.game_id);
            if (item.is_favorite) {
              favoriteIds.push(item.game_id);
            }
          }
        });

        setMyCollection(collectionIds);
        setMyFavorites(favoriteIds);

        // Load all games from games collection
        const games = await pb.collection('games').getFullList({ sort: 'title' });
        setAllGames(games);

      } catch (e) {
        console.warn('Fehler beim Laden der Daten:', e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentUser?.id]);

  const getGameDetails = (gameId) => {
    return allGames.find(g => g.original_id === gameId);
  };

  const getSortedGames = (gameIds) => {
    return gameIds
      .map(id => ({ id, game: getGameDetails(id) }))
      .filter(item => item.game)
      .sort((a, b) => {
        const aIsFav = myFavorites.includes(a.id);
        const bIsFav = myFavorites.includes(b.id);
        
        // Favoriten zuerst
        if (aIsFav && !bIsFav) return -1;
        if (!aIsFav && bIsFav) return 1;
        
        // Dann alphabetisch nach Titel
        return (a.game.title || '').localeCompare((b.game.title || ''), 'de');
      })
      .map(item => item.id);
  };

  const getUniqueCategoriesInCollection = useMemo(() => {
    const categories = new Set();
    myCollection.forEach(id => {
      const game = getGameDetails(id);
      if (game?.category_primary) {
        categories.add(game.category_primary);
      }
    });
    return Array.from(categories).sort((a, b) => a.localeCompare(b, 'de'));
  }, [myCollection, allGames]);

  const filteredGames = useMemo(() => {
    let gameIds = filter === 'favorites'
      ? myFavorites.filter(id => getGameDetails(id))
      : myCollection.filter(id => getGameDetails(id));

    // Kategorie-Filter anwenden
    if (categoryFilter !== 'all') {
      gameIds = gameIds.filter(id => {
        const game = getGameDetails(id);
        return game?.category_primary === categoryFilter;
      });
    }

    return getSortedGames(gameIds);
  }, [filter, categoryFilter, myCollection, myFavorites, allGames]);

  const removeFromCollection = async (gameId) => {
    try {
      if (!currentUser?.id) return;

      // Find and delete the record from PocketBase
      const records = await pb.collection('user_game_collection').getFullList({
        filter: `user_id = "${currentUser.id}" && game_id = "${gameId}"`,
      });

      for (const record of records) {
        await pb.collection('user_game_collection').delete(record.id);
      }

      setMyCollection(myCollection.filter(id => id !== gameId));
    } catch (err) {
      console.error('Fehler beim Entfernen aus Sammlung:', err);
    }
  };

  const toggleFavorite = async (gameId) => {
    try {
      if (!currentUser?.id) return;

      const isFavorite = myFavorites.includes(gameId);
      
      // Find existing record
      const records = await pb.collection('user_game_collection').getFullList({
        filter: `user_id = "${currentUser.id}" && game_id = "${gameId}"`,
      });

      if (records.length > 0) {
        // Update existing record
        await pb.collection('user_game_collection').update(records[0].id, {
          is_favorite: !isFavorite,
        });
      } else {
        // Create new record if it doesn't exist
        await pb.collection('user_game_collection').create({
          user_id: currentUser.id,
          game_id: gameId,
          is_favorite: !isFavorite,
        });
      }

      const updated = isFavorite
        ? myFavorites.filter(id => id !== gameId)
        : [...myFavorites, gameId];
      setMyFavorites(updated);
    } catch (err) {
      console.error('Fehler beim Markieren als Favorit:', err);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--nw-bg-primary)' }}>
      <div style={{ color: 'var(--nw-text-primary)' }} className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--nw-primary)' }}>
                Meine Spiele
              </h1>
              <p style={{ color: 'var(--nw-text-secondary)' }}>
                {myCollection.length} Spiel{myCollection.length !== 1 ? 'e' : ''} in Ihrer Sammlung
              </p>
            </div>
            <button
              onClick={onBack}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--nw-primary-light)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--nw-primary)'}
              className="nw-btn-primary flex items-center gap-2"
              style={{ backgroundColor: 'var(--nw-primary)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
          </div>

          {/* Filter */}
          {myCollection.length > 0 && (
            <div className="mb-6 space-y-4">
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  onMouseEnter={(e) => {
                    if (filter === 'all') return;
                    e.currentTarget.style.backgroundColor = 'var(--nw-primary-light)';
                  }}
                  onMouseLeave={(e) => {
                    if (filter === 'all') return;
                    e.currentTarget.style.backgroundColor = 'var(--nw-secondary)';
                  }}
                  style={{
                    backgroundColor: filter === 'all' ? 'var(--nw-primary)' : 'var(--nw-secondary)',
                    color: 'white'
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-colors min-h-[44px] flex items-center"
                >
                  Alle ({myCollection.length})
                </button>
                {myFavorites.length > 0 && (
                  <button
                    onClick={() => setFilter('favorites')}
                    onMouseEnter={(e) => {
                      if (filter === 'favorites') return;
                      e.currentTarget.style.backgroundColor = 'var(--nw-secondary-dark)';
                    }}
                    onMouseLeave={(e) => {
                      if (filter === 'favorites') return;
                      e.currentTarget.style.backgroundColor = 'var(--nw-accent)';
                    }}
                    style={{
                      backgroundColor: filter === 'favorites' ? 'var(--nw-accent)' : 'var(--nw-accent)',
                      color: 'white'
                    }}
                    className="px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 min-h-[44px]"
                  >
                    <Heart className="w-4 h-4" />
                    Favoriten ({myFavorites.length})
                  </button>
                )}
              </div>

              {/* Kategorie-Filter */}
              {getUniqueCategoriesInCollection.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    onMouseEnter={(e) => {
                      if (categoryFilter === 'all') return;
                      e.currentTarget.style.borderColor = 'var(--nw-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      if (categoryFilter === 'all') return;
                      e.currentTarget.style.borderColor = 'var(--nw-border)';
                    }}
                    style={{
                      backgroundColor: categoryFilter === 'all' ? 'var(--nw-primary)' : 'transparent',
                      color: categoryFilter === 'all' ? 'white' : 'var(--nw-primary)',
                      borderColor: 'var(--nw-primary)',
                      borderWidth: '2px'
                    }}
                    className="px-4 py-2 rounded-lg font-semibold text-sm min-h-[44px] flex items-center transition-colors"
                  >
                    Alle Kategorien
                  </button>
                  {getUniqueCategoriesInCollection.map(category => (
                    <button
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                      onMouseEnter={(e) => {
                        if (categoryFilter === category) return;
                        e.currentTarget.style.borderColor = 'var(--nw-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        if (categoryFilter === category) return;
                        e.currentTarget.style.borderColor = 'var(--nw-border)';
                      }}
                      style={{
                        backgroundColor: categoryFilter === category ? 'var(--nw-primary)' : 'transparent',
                        color: categoryFilter === category ? 'white' : 'var(--nw-primary)',
                        borderColor: 'var(--nw-primary)',
                        borderWidth: '2px'
                      }}
                      className="px-4 py-2 rounded-lg font-semibold text-sm min-h-[44px] flex items-center transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="text-center py-12">
              <p style={{ color: 'var(--nw-text-secondary)' }}>Deine Sammlung wird geladen...</p>
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(gameId => {
                const game = getGameDetails(gameId);
                if (!game) return null;

                return (
                  <div
                    key={gameId}
                    className="nw-card"
                    style={{ backgroundColor: 'var(--nw-surface)', borderColor: 'var(--nw-border)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--nw-secondary)';
                      e.currentTarget.style.boxShadow = 'var(--nw-shadow-lg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--nw-border)';
                      e.currentTarget.style.boxShadow = 'var(--nw-shadow-sm)';
                    }}
                  >
                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--nw-primary)' }}>
                      {game.title}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2 text-sm mb-4" style={{ color: 'var(--nw-text-secondary)' }}>
                      {game.category_primary && (
                        <p>
                          <span className="font-semibold" style={{ color: 'var(--nw-primary)' }}>Kategorie:</span> {game.category_primary}
                        </p>
                      )}
                      {game.min_age && (
                        <p>
                          <span className="font-semibold" style={{ color: 'var(--nw-primary)' }}>Ab:</span> {game.min_age} Jahren
                        </p>
                      )}
                      {game.player_count && (
                        <p>
                          <span className="font-semibold" style={{ color: 'var(--nw-primary)' }}>Spieler:</span>{' '}
                          {game.player_count.min}
                          {game.player_count.max && game.player_count.min !== game.player_count.max
                            ? `–${game.player_count.max}`
                            : ''}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4" style={{ borderTopColor: 'var(--nw-border)', borderTopWidth: '1px' }}>
                      <button
                        onClick={() => toggleFavorite(gameId)}
                        onMouseEnter={(e) => {
                          if (myFavorites.includes(gameId)) return;
                          e.currentTarget.style.backgroundColor = 'var(--nw-secondary)';
                        }}
                        onMouseLeave={(e) => {
                          if (myFavorites.includes(gameId)) return;
                          e.currentTarget.style.backgroundColor = 'var(--nw-accent)';
                        }}
                        style={{
                          flex: 1,
                          backgroundColor: myFavorites.includes(gameId) ? 'var(--nw-highlight)' : 'var(--nw-accent)',
                          color: myFavorites.includes(gameId) ? 'var(--nw-primary)' : 'white'
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-colors min-h-[44px]"
                      >
                        <Heart className="w-4 h-4" />
                        {myFavorites.includes(gameId) ? 'Favorit' : 'Favorit?'}
                      </button>
                      <button
                        onClick={() => removeFromCollection(gameId)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--nw-secondary-dark)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--nw-secondary)'}
                        style={{
                          backgroundColor: 'var(--nw-secondary)',
                          color: 'white'
                        }}
                        className="px-3 py-2 rounded text-sm font-semibold transition-colors min-h-[44px] flex items-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p style={{ color: 'var(--nw-text-secondary)' }} className="text-lg mb-4">Noch keine Spiele in deiner Sammlung</p>
              <p style={{ color: 'var(--nw-text-tertiary)' }} className="text-sm">
                Gehe zum Katalog und füge Spiele mit dem Button „Zu Sammlung" hinzu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
