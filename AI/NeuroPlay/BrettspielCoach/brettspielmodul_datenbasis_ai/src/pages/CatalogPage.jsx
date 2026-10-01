import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import seedData from '../data/seedData.json';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    publisher: '',
    category: '',
    minPlayers: '',
    hasRules: 'all'
  });
  const [sortBy, setSortBy] = useState('title');

  // Get unique categories and publishers
  const categories = [...new Set(seedData.games.map(g => g.category))].sort();
  const publishers = seedData.publishers.sort((a, b) => a.name.localeCompare(b.name));

  // Filter games
  const filteredGames = useMemo(() => {
    let result = seedData.games;

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(g =>
        g.title.toLowerCase().includes(term) ||
        g.original_title?.toLowerCase().includes(term) ||
        g.description?.toLowerCase().includes(term)
      );
    }

    // Publisher filter
    if (filters.publisher) {
      result = result.filter(g => g.publisher_id === filters.publisher);
    }

    // Category filter
    if (filters.category) {
      result = result.filter(g => g.category === filters.category);
    }

    // Min players filter
    if (filters.minPlayers) {
      const minP = parseInt(filters.minPlayers);
      result = result.filter(g => g.max_players >= minP);
    }

    // Has rules filter
    if (filters.hasRules === 'yes') {
      result = result.filter(g => g.has_rules);
    } else if (filters.hasRules === 'no') {
      result = result.filter(g => !g.has_rules);
    }

    return result;
  }, [searchTerm, filters]);

  // Sort games
  const sortedGames = useMemo(() => {
    let result = [...filteredGames];

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'players') {
      result.sort((a, b) => (b.max_players - b.min_players) - (a.max_players - a.min_players));
    } else if (sortBy === 'age') {
      result.sort((a, b) => a.min_age - b.min_age);
    }

    return result;
  }, [filteredGames, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setFilters({
      publisher: '',
      category: '',
      minPlayers: '',
      hasRules: 'all'
    });
    setSortBy('title');
  };

  return (
    <main>
      <h1>Spielekatalog</h1>
      <p className="subtitle">Durchsuche und filtere {seedData.games.length} Spiele</p>

      <div className="catalog-controls">
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Spiel suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="form-group">
            <label className="form-label">Verlag</label>
            <select
              className="form-select"
              value={filters.publisher}
              onChange={(e) => setFilters({...filters, publisher: e.target.value})}
            >
              <option value="">Alle Verlage</option>
              {publishers.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Kategorie</label>
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">Alle Kategorien</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Min. Spieler</label>
            <select
              className="form-select"
              value={filters.minPlayers}
              onChange={(e) => setFilters({...filters, minPlayers: e.target.value})}
            >
              <option value="">Egal</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Regelwissen</label>
            <select
              className="form-select"
              value={filters.hasRules}
              onChange={(e) => setFilters({...filters, hasRules: e.target.value})}
            >
              <option value="all">Alle</option>
              <option value="yes">Mit Regelwissen</option>
              <option value="no">Ohne Regelwissen</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sortieren</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Nach Titel</option>
              <option value="players">Nach Spielerzahl</option>
              <option value="age">Nach Alter</option>
            </select>
          </div>

          <button className="btn btn-secondary" onClick={handleReset}>
            Zurücksetzen
          </button>
        </div>
      </div>

      <div className="results-info">
        <p>{sortedGames.length} von {seedData.games.length} Spielen</p>
      </div>

      {sortedGames.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎲</div>
          <h3>Keine Spiele gefunden</h3>
          <p>Versuche andere Filter oder Suchbegriffe</p>
        </div>
      ) : (
        <div className="games-grid">
          {sortedGames.map(game => {
            const publisher = seedData.publishers.find(p => p.id === game.publisher_id);
            return (
              <Link key={game.id} to={`/games/${game.id}`} className="game-card-link">
                <div className="game-card card">
                  <div className="game-card-header">
                    <h3>{game.title}</h3>
                    {game.has_rules && (
                      <span className="badge badge-knowledge-yes">Wissen</span>
                    )}
                  </div>

                  {game.original_title && game.original_title !== game.title && (
                    <p className="game-original">{game.original_title}</p>
                  )}

                  <p className="game-description">{game.description}</p>

                  <div className="game-meta-grid">
                    <div className="meta-item">
                      <span className="meta-label">Spieler</span>
                      <span className="meta-value">{game.min_players}–{game.max_players}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Dauer</span>
                      <span className="meta-value">{game.min_duration}–{game.max_duration}min</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Alter</span>
                      <span className="meta-value">{game.min_age}+</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Schwierigkeit</span>
                      <span className="meta-value">{game.complexity}</span>
                    </div>
                  </div>

                  <div className="game-footer">
                    <p className="game-publisher">{publisher?.name}</p>
                    <span className="game-category-badge">{game.category}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
