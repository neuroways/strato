import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ExternalLink, RotateCcw } from 'lucide-react';
import catalogData from '../data/generated/catalog.json';

export function BoardGameCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPublisherId, setSelectedPublisherId] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);

  const { games = [], publishers = [] } = catalogData.metadata ? catalogData : { games: catalogData.games || [], publishers: catalogData.publishers || [] };

  // Build publisher map
  const publisherMap = useMemo(() => {
    const map = {};
    publishers.forEach(p => {
      map[p.original_id] = p;
    });
    return map;
  }, [publishers]);

  // Get unique publishers that have games
  const publisherOptions = useMemo(() => {
    const withGames = new Set();
    games.forEach(g => {
      if (g.publisher_original_id) {
        withGames.add(g.publisher_original_id);
      }
    });
    return Array.from(withGames).sort().map(id => publisherMap[id]).filter(Boolean);
  }, [games, publisherMap]);

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch =
        !searchTerm ||
        (game.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (game.title_en?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchesPublisher =
        selectedPublisherId === 'all' || game.publisher_original_id === selectedPublisherId;

      return matchesSearch && matchesPublisher;
    });
  }, [games, searchTerm, selectedPublisherId]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedPublisherId('all');
  };

  const getPublisherName = (publisherId) => {
    const pub = publisherMap[publisherId];
    return pub ? pub.name : 'Verlag unbekannt';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Spielekatalog</h1>
          <p className="text-slate-400">
            {games.length} Brettspiele mit Anleitungen
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Nach Spieltitel suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Verlag
              </label>
              <select
                value={selectedPublisherId}
                onChange={(e) => setSelectedPublisherId(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="all">Alle Verlage ({publisherOptions.length})</option>
                {publisherOptions.map(pub => (
                  <option key={pub.original_id} value={pub.original_id}>
                    {pub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            {(searchTerm || selectedPublisherId !== 'all') && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Zurücksetzen
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-slate-400 mb-6">
          {filteredGames.length === games.length
            ? `Alle ${games.length} Spiele angezeigt`
            : `${filteredGames.length} von ${games.length} Spielen gefunden`}
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {game.title}
                </h3>

                {/* Publisher */}
                <p className="text-sm text-slate-400 mb-4">
                  {getPublisherName(game.publisher_original_id)}
                </p>

                {/* Metadata */}
                <div className="space-y-1 text-xs text-slate-500 mb-4">
                  {game.year_published && (
                    <p>📅 {game.year_published}</p>
                  )}
                  {game.player_count && (
                    <p>👥 {game.player_count.min}–{game.player_count.max} Spieler</p>
                  )}
                  {game.duration && (
                    <p>⏱ {game.duration.min}–{game.duration.max} Min.</p>
                  )}
                  {game.min_age && (
                    <p>🎂 Ab {game.min_age} Jahren</p>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {game.status && (
                    <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-1 rounded">
                      ✓ {game.status}
                    </span>
                  )}
                </div>

                {/* Click Hint */}
                <p className="text-xs text-slate-600 mt-3">Klicke zum Öffnen</p>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-4">Keine Spiele gefunden</p>
            <p className="text-slate-500 text-sm mb-6">
              Versuche andere Such- oder Filterbegriffe.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
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
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedGame.title}
                </h2>
                {selectedGame.title_en && (
                  <p className="text-slate-400">{selectedGame.title_en}</p>
                )}
                <p className="text-slate-400 text-sm mt-2">
                  {getPublisherName(selectedGame.publisher_original_id)}
                </p>
              </div>
              <button
                onClick={() => setSelectedGame(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Core Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedGame.year_published && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">Erscheinungsjahr</p>
                    <p className="text-lg font-bold">{selectedGame.year_published}</p>
                  </div>
                )}
                {selectedGame.player_count && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">Spieler</p>
                    <p className="text-lg font-bold">{selectedGame.player_count.min}–{selectedGame.player_count.max}</p>
                  </div>
                )}
                {selectedGame.duration && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">Dauer</p>
                    <p className="text-lg font-bold">{selectedGame.duration.min}–{selectedGame.duration.max}m</p>
                  </div>
                )}
                {selectedGame.min_age && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">Mindestalter</p>
                    <p className="text-lg font-bold">{selectedGame.min_age}+</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedGame.description && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Beschreibung</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedGame.description}</p>
                </div>
              )}

              {/* Language */}
              {selectedGame.language && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Sprache</h3>
                  <p className="text-slate-300">{selectedGame.language}</p>
                </div>
              )}

              {/* Status & Notes */}
              {selectedGame.status && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Anleitung</h3>
                  <p className="text-slate-300">{selectedGame.status}</p>
                </div>
              )}

              {selectedGame.notes && (
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">Anmerkung</h3>
                  <p className="text-blue-100 text-sm">{selectedGame.notes}</p>
                </div>
              )}

              {/* BGG Link */}
              {selectedGame.bgg_id && (
                <div>
                  <a
                    href={`https://boardgamegeek.com/boardgame/${selectedGame.bgg_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    BoardGameGeek
                  </a>
                </div>
              )}

              {/* Record ID */}
              <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
                ID: {selectedGame.original_id}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
