import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, ExternalLink, MapPin, Globe } from 'lucide-react';
import { loadCatalogGames, getCatalogCategories, getCatalogPublishers, initializeCatalogStorage } from '../lib/catalogRepository';

export function GamesCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublisher, setSelectedPublisher] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load catalog from storage on mount
  useEffect(() => {
    async function loadCatalog() {
      try {
        await initializeCatalogStorage();
        const loadedGames = await loadCatalogGames();
        const cats = await getCatalogCategories();
        const pubs = await getCatalogPublishers();
        
        setGames(loadedGames);
        setCategories(cats);
        setPublishers(pubs);
      } catch (error) {
        console.error('Fehler beim Laden des Katalogs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, []);

  // Filter games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch =
        !searchTerm ||
        (game.title_de?.toLowerCase() || game['Spiel']?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (game.publisher?.toLowerCase() || game['Verlag / Marke']?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (game.category?.toLowerCase() || game['Kategorie']?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || (game.category || game['Kategorie']) === selectedCategory;

      const matchesPublisher =
        selectedPublisher === 'all' || (game.publisher || game['Verlag / Marke']) === selectedPublisher;

      return matchesSearch && matchesCategory && matchesPublisher;
    });
  }, [searchTerm, selectedCategory, selectedPublisher, games]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPublisher('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Spielekatalog</h1>
          <p className="text-slate-400">
            {games.length} Spiele mit Regelquellen
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
                placeholder="Nach Spieltitel, Verlag oder Kategorie suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Kategorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
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
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="all">Alle Verlage</option>
                {publishers.map((pub) => (
                  <option key={pub} value={pub}>
                    {pub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Button */}
          {(searchTerm || selectedCategory !== 'all' || selectedPublisher !== 'all') && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Filter zurücksetzen
            </button>
          )}
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
            {filteredGames.map((game) => (
              <div
                key={game['Datensatz-ID']}
                onClick={() => setSelectedGame(game)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                {/* Badge */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                    {game['Kategorie'] || 'Ohne Kategorie'}
                  </span>
                  {game['Prüfstatus']?.includes('geprüft') && (
                    <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-2 py-1 rounded">
                      Geprüft
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {game['Spiel']}
                </h3>

                {/* Publisher */}
                <p className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {game['Verlag / Marke'] || 'Verlag unbekannt'}
                </p>

                {/* Links Section */}
                {(game['Anleitung / Regelquelle'] || game['Produkt- oder Katalogseite']) && (
                  <div className="space-y-2 pt-4 border-t border-slate-700">
                    {game['Anleitung / Regelquelle'] && (
                      <a
                        href={game['Anleitung / Regelquelle']}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Regel ansehen
                      </a>
                    )}
                    {game['Produkt- oder Katalogseite'] && (
                      <a
                        href={game['Produkt- oder Katalogseite']}
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
        ) : (
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
                  {selectedGame['Spiel']}
                </h2>
                <p className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedGame['Verlag / Marke']}
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
              {/* Kategorie */}
              {selectedGame['Kategorie'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Kategorie</h3>
                  <p className="text-white">{selectedGame['Kategorie']}</p>
                </div>
              )}

              {/* Sprache */}
              {selectedGame['Sprache'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Sprache</h3>
                  <p className="text-white">{selectedGame['Sprache']}</p>
                </div>
              )}

              {/* Regelquelle */}
              {selectedGame['Anleitung / Regelquelle'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Regelquelle</h3>
                  <p className="text-sm text-slate-400 mb-2">
                    {selectedGame['Linktyp'] || 'Link'}
                  </p>
                  <a
                    href={selectedGame['Anleitung / Regelquelle']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {selectedGame['Anleitung / Regelquelle']}
                  </a>
                </div>
              )}

              {/* Produktseite */}
              {selectedGame['Produkt- oder Katalogseite'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">
                    Produkt- oder Katalogseite
                  </h3>
                  <a
                    href={selectedGame['Produkt- oder Katalogseite']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {selectedGame['Produkt- oder Katalogseite']}
                  </a>
                </div>
              )}

              {/* Artikelnummer / EAN */}
              {selectedGame['Artikelnummer / EAN'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">
                    Artikelnummer / EAN
                  </h3>
                  <p className="text-white font-mono">{selectedGame['Artikelnummer / EAN']}</p>
                </div>
              )}

              {/* Prüfstatus */}
              {selectedGame['Prüfstatus'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Prüfstatus</h3>
                  <p className="text-white">{selectedGame['Prüfstatus']}</p>
                </div>
              )}

              {/* Geprüft am */}
              {selectedGame['Geprüft am'] && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Geprüft am</h3>
                  <p className="text-white">{selectedGame['Geprüft am']}</p>
                </div>
              )}

              {/* Hinweis */}
              {selectedGame['Hinweis'] && (
                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-amber-300 mb-2">Hinweis</h3>
                  <p className="text-amber-100">{selectedGame['Hinweis']}</p>
                </div>
              )}

              {/* Datensatz-ID */}
              <div className="text-xs text-slate-500 pt-4 border-t border-slate-700">
                Datensatz-ID: {selectedGame['Datensatz-ID']}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
