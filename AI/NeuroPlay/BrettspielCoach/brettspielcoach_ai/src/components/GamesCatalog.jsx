import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, ExternalLink, MapPin, Globe, Heart, Bookmark, Tag } from 'lucide-react';
import { pb } from '../lib/pb';

export function GamesCatalog({ onBack, currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublisher, setSelectedPublisher] = useState('all');
  const [minAge, setMinAge] = useState('');
  const [playerCount, setPlayerCount] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCollection, setUserCollection] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'collection', 'favorites'

  // Load catalog and user data from PocketBase
  useEffect(() => {
    async function loadCatalog() {
      try {
        // Load games from PocketBase
        const loadedGames = await pb.collection('games').getFullList({ sort: 'title' });
        setGames(loadedGames);

        // Extract unique categories and publishers
        const uniqueCategories = Array.from(new Set(loadedGames.map(g => g.category_primary).filter(Boolean)));
        const uniquePublishers = Array.from(new Set(loadedGames.map(g => g.publisher_original_id).filter(Boolean)));
        
        setCategories(uniqueCategories.sort());
        setPublishers(uniquePublishers.sort());

        // Load user data from PocketBase if logged in
        if (currentUser?.id) {
          const userGames = await pb.collection('user_game_collection').getFullList({
            filter: `user_id = "${currentUser.id}"`,
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

          setUserCollection(collectionIds);
          setUserFavorites(favoriteIds);
        }
      } catch (error) {
        console.error('Fehler beim Laden des Katalogs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, [currentUser?.id]);

  // Helper to get publisher name from ID
  const getPublisherName = (publisherId) => {
    if (!publisherId) return '-';
    const pub = publishers.find(p => p.id === publisherId);
    return pub?.name || publisherId;
  };

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch =
        !searchTerm ||
        (game.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (game.publisher_original_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (game.category_primary?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || game.category_primary === selectedCategory;

      const matchesPublisher =
        selectedPublisher === 'all' || game.publisher_original_id === selectedPublisher;

      const gameMinAge = game.min_age || 0;
      const matchesAge = !minAge || gameMinAge <= parseInt(minAge);

      const gamePlayerMin = game.player_count?.min || 0;
      const gamePlayerMax = game.player_count?.max || 99;
      const playerNum = parseInt(playerCount) || 0;
      const matchesPlayers = !playerCount || (playerNum >= gamePlayerMin && playerNum <= gamePlayerMax);

      let matchesFilter = true;
      if (filterMode === 'collection') {
        matchesFilter = isInCollection(game.original_id);
      } else if (filterMode === 'favorites') {
        matchesFilter = isFavorite(game.original_id);
      }

      return matchesSearch && matchesCategory && matchesPublisher && matchesAge && matchesPlayers && matchesFilter;
    });
  }, [searchTerm, selectedCategory, selectedPublisher, minAge, playerCount, games, publishers, filterMode, userCollection, userFavorites]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPublisher('all');
    setMinAge('');
    setPlayerCount('');
  };

  // Game management functions
  const isInCollection = (gameId) => userCollection.includes(gameId);
  const isFavorite = (gameId) => userFavorites.includes(gameId);

  const toggleCollection = async (gameId) => {
    if (!currentUser?.id) {
      alert('Bitte melde dich an, um die Sammlung zu verwalten');
      return;
    }

    try {
      const records = await pb.collection('user_game_collection').getFullList({
        filter: `user_id = "${currentUser.id}" && game_id = "${gameId}"`,
      });

      if (records.length > 0) {
        await pb.collection('user_game_collection').delete(records[0].id);
        setUserCollection(userCollection.filter(id => id !== gameId));
      } else {
        const newRecord = await pb.collection('user_game_collection').create({
          user_id: currentUser.id,
          game_id: gameId,
          is_favorite: false,
        });
        setUserCollection([...userCollection, gameId]);
      }
    } catch (err) {
      console.error('Fehler beim Ändern der Sammlung:', err);
      alert('Fehler beim Speichern: ' + (err.message || 'Unbekannter Fehler'));
    }
  };

  const toggleFavorite = async (gameId) => {
    if (!currentUser?.id) {
      alert('Bitte melde dich an, um Favoriten zu markieren');
      return;
    }

    try {
      const records = await pb.collection('user_game_collection').getFullList({
        filter: `user_id = "${currentUser.id}" && game_id = "${gameId}"`,
      });

      if (records.length > 0) {
        const isFav = isFavorite(gameId);
        await pb.collection('user_game_collection').update(records[0].id, {
          is_favorite: !isFav,
        });
        
        const updated = isFav
          ? userFavorites.filter(id => id !== gameId)
          : [...userFavorites, gameId];
        setUserFavorites(updated);
      } else {
        await pb.collection('user_game_collection').create({
          user_id: currentUser.id,
          game_id: gameId,
          is_favorite: true,
        });
        setUserFavorites([...userFavorites, gameId]);
      }
    } catch (err) {
      console.error('Fehler beim Markieren als Favorit:', err);
      alert('Fehler beim Speichern: ' + (err.message || 'Unbekannter Fehler'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Spielekatalog</h1>
            <p className="text-slate-400">
              {games.length} Spiele mit Regelquellen
            </p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
            >
              ← Zurück
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Nach Spieltitel, Verlag oder Kategorie suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          {/* Collection / Favorites Filter Buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterMode === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Alle Spiele
            </button>
            <button
              onClick={() => setFilterMode('collection')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterMode === 'collection'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Meine Sammlung ({userCollection.length})
            </button>
            <button
              onClick={() => setFilterMode('favorites')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                filterMode === 'favorites'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Heart className="w-4 h-4" />
              Favoriten ({userFavorites.length})
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Kategorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                <option value="all">Alle Kategorien</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Publisher Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Verlag
              </label>
              <select
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                <option value="all">Alle Verlage</option>
                {publishers.map((pub) => (
                  <option key={pub.id} value={pub.id}>
                    {pub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Age Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Alter von
              </label>
              <input
                type="number"
                min="0"
                max="18"
                placeholder="z.B. 8"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                disabled={loading}
              />
            </div>

            {/* Player Count Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Spieler
              </label>
              <input
                type="number"
                min="1"
                max="12"
                placeholder="z.B. 4"
                value={playerCount}
                onChange={(e) => setPlayerCount(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
                disabled={loading}
              />
            </div>
          </div>

          {/* Reset Button */}
          {(searchTerm || selectedCategory !== 'all' || selectedPublisher !== 'all' || minAge || playerCount) && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-400">Katalog wird geladen...</p>
          </div>
        )}

        {/* Results Summary */}
        {!loading && (
          <div className="text-sm text-slate-400 mb-6">
            {filteredGames.length === games.length
              ? `Alle ${games.length} Spiele angezeigt`
              : `${filteredGames.length} von ${games.length} Spielen gefunden`}
          </div>
        )}

        {/* Games Grid */}
        {!loading && filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.original_record_id || game['Datensatz-ID']}
                onClick={() => setSelectedGame(game)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                {/* Badge */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                    {game.category_primary || 'Ohne Kategorie'}
                  </span>
                  <div className="flex gap-1">
                    {isInCollection(game.original_id) && (
                      <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-2 py-1 rounded flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        In Sammlung
                      </span>
                    )}
                    {isFavorite(game.original_id) && (
                      <span className="text-xs font-semibold text-red-400 bg-red-900/30 px-2 py-1 rounded flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        Favorit
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {game.title}
                </h3>

                {/* Publisher */}
                <p className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {getPublisherName(game.publisher_original_id)}
                </p>

                {/* Age & Players */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-slate-700/50 rounded px-2 py-1">
                    <span className="text-slate-400">Ab </span>
                    <span className="text-white font-semibold">{game.min_age || '–'} Jahren</span>
                  </div>
                  <div className="bg-slate-700/50 rounded px-2 py-1">
                    <span className="text-slate-400">Spieler: </span>
                    <span className="text-white font-semibold">
                      {game.player_count?.min || '–'}
                      {game.player_count?.max && game.player_count.min !== game.player_count.max ? `–${game.player_count.max}` : ''}
                    </span>
                  </div>
                </div>

                {/* Links Section */}
                {((game.rule_url || game['Anleitung / Regelquelle']) || (game.product_url || game['Produkt- oder Katalogseite'])) && (
                  <div className="space-y-2 pt-4 border-t border-slate-700">
                    {(game.rule_url || game['Anleitung / Regelquelle']) && (
                      <a
                        href={game.rule_url || game['Anleitung / Regelquelle']}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Regel ansehen
                      </a>
                    )}
                    {(game.product_url || game['Produkt- oder Katalogseite']) && (
                      <a
                        href={game.product_url || game['Produkt- oder Katalogseite']}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1 transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        Produktseite
                      </a>
                    )}
                  </div>
                )}

                {/* Click hint */}
                <p className="text-xs text-slate-500 mt-3">Zum Öffnen klicken</p>
              </div>
            ))}
          </div>
        ) : !loading ? (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-4">Keine Spiele gefunden</p>
            <p className="text-slate-500 text-sm mb-6">
              Versuchen Sie, Ihre Such- oder Filterkriterien anzupassen.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : null}
      </div>

      {/* Detail Modal */}
      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedGame.title}
                  </h2>
                  <p className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {getPublisherName(selectedGame.publisher_original_id)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-slate-400 hover:text-white transition-colors ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => toggleCollection(selectedGame.original_id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-colors ${
                    isInCollection(selectedGame.original_id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {isInCollection(selectedGame.original_id) ? 'In Sammlung' : 'Zu Sammlung'}
                </button>

                <button
                  onClick={() => toggleFavorite(selectedGame.original_id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition-colors ${
                    isFavorite(selectedGame.original_id)
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  {isFavorite(selectedGame.original_id) ? 'Favorit' : 'Favorit?'}
                </button>

                <button
                  onClick={() => setShowTagInput(!showTagInput)}
                  className="flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  Tags
                </button>
              </div>

              {/* Tag Input */}
              {showTagInput && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Tag eingeben..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(selectedGame.original_id, newTag);
                      }
                    }}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => addTag(selectedGame.original_id, newTag)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold text-white transition-colors"
                  >
                    + Hinzufügen
                  </button>
                </div>
              )}

              {/* Display Tags */}
              {(userTags[selectedGame.original_id] || []).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(userTags[selectedGame.original_id] || []).map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-purple-900/30 border border-purple-700 text-purple-300 px-2 py-1 rounded text-xs font-semibold"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(selectedGame.original_id, tag)}
                        className="hover:text-purple-200 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Kategorie */}
              {(selectedGame.category || selectedGame['Kategorie']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Kategorie</h3>
                  <p className="text-white">{selectedGame.category || selectedGame['Kategorie']}</p>
                </div>
              )}

              {/* Sprache */}
              {(selectedGame.language || selectedGame['Sprache']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Sprache</h3>
                  <p className="text-white">{selectedGame.language || selectedGame['Sprache']}</p>
                </div>
              )}

              {/* Regelquelle */}
              {(selectedGame.rule_url || selectedGame['Anleitung / Regelquelle']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Regelquelle</h3>
                  <p className="text-sm text-slate-400 mb-2">
                    {selectedGame.link_type || selectedGame['Linktyp'] || 'Link'}
                  </p>
                  <a
                    href={selectedGame.rule_url || selectedGame['Anleitung / Regelquelle']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {selectedGame.rule_url || selectedGame['Anleitung / Regelquelle']}
                  </a>
                </div>
              )}

              {/* Produktseite */}
              {(selectedGame.product_url || selectedGame['Produkt- oder Katalogseite']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">
                    Produkt- oder Katalogseite
                  </h3>
                  <a
                    href={selectedGame.product_url || selectedGame['Produkt- oder Katalogseite']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {selectedGame.product_url || selectedGame['Produkt- oder Katalogseite']}
                  </a>
                </div>
              )}

              {/* Artikelnummer / EAN */}
              {(selectedGame.article_number || selectedGame['Artikelnummer / EAN']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">
                    Artikelnummer / EAN
                  </h3>
                  <p className="text-white font-mono">{selectedGame.article_number || selectedGame['Artikelnummer / EAN']}</p>
                </div>
              )}

              {/* Prüfstatus */}
              {(selectedGame.verification_status || selectedGame['Prüfstatus']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Prüfstatus</h3>
                  <p className="text-white">{selectedGame.verification_status || selectedGame['Prüfstatus']}</p>
                </div>
              )}

              {/* Geprüft am */}
              {(selectedGame.verified_date || selectedGame['Geprüft am']) && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Geprüft am</h3>
                  <p className="text-white">{selectedGame.verified_date || selectedGame['Geprüft am']}</p>
                </div>
              )}

              {/* Hinweis */}
              {(selectedGame.notes || selectedGame['Hinweis']) && (
                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-amber-300 mb-2">Hinweis</h3>
                  <p className="text-amber-100">{selectedGame.notes || selectedGame['Hinweis']}</p>
                </div>
              )}

              {/* Datensatz-ID */}
              <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
                Datensatz-ID: {selectedGame.original_record_id || selectedGame['Datensatz-ID']}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
