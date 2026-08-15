import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';
import '../styles/GamesList.css';

export default function GamesList({ games: initialGames, loading }) {
  const [games, setGames] = useState(initialGames);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    loadGames();
    loadCategories();
  }, [currentPage, searchQuery, filterCategory]);

  const loadGames = async () => {
    try {
      setIsLoading(true);
      let filter = '';
      
      if (searchQuery) {
        filter = `title ~ "${searchQuery}"`;
      }
      
      if (filterCategory) {
        const categoryFilter = `category = "${filterCategory}"`;
        filter = filter ? `${filter} && ${categoryFilter}` : categoryFilter;
      }

      const result = await pb.collection('games').getList(currentPage, itemsPerPage, {
        filter: filter || undefined,
        sort: '-updated'
      });

      setGames(result.items);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await pb.collection('games').getList(1, 1000);
      const uniqueCategories = [...new Set(result.items
        .map(g => g.category)
        .filter(c => c)
      )].sort();
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="games-container">
      <div className="games-header">
        <h2 className="games-title">Spiele</h2>
        <p className="games-count">{totalItems.toLocaleString('de-DE')} Spiele gefunden</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Spiel durchsuchen..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => {
            setFilterCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="category-select"
        >
          <option value="">Alle Kategorien</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="loading">⏳ Wird geladen...</div>
      ) : games.length === 0 ? (
        <div className="no-results">
          <p>Keine Spiele gefunden</p>
        </div>
      ) : (
        <>
          <div className="games-grid">
            {games.map(game => (
              <div key={game.id} className="game-card">
                <div className="game-header">
                  <h3 className="game-title">{game.title}</h3>
                  <span className="game-id">{game.dataset_id}</span>
                </div>
                
                <div className="game-meta">
                  <span className="meta-item">
                    <span className="meta-label">Verlag:</span>
                    <span className="meta-value">{game.publisher}</span>
                  </span>
                  {game.category && (
                    <span className="meta-item">
                      <span className="meta-label">Kategorie:</span>
                      <span className="meta-value">{game.category}</span>
                    </span>
                  )}
                  {game.language && (
                    <span className="meta-item">
                      <span className="meta-label">Sprache:</span>
                      <span className="meta-value">{game.language}</span>
                    </span>
                  )}
                </div>

                <div className="game-details">
                  {game.rules_url && (
                    <a href={game.rules_url} target="_blank" rel="noopener noreferrer" className="rules-link">
                      📋 Anleitung
                    </a>
                  )}
                  {game.product_page_url && (
                    <a href={game.product_page_url} target="_blank" rel="noopener noreferrer" className="product-link">
                      🔗 Produktseite
                    </a>
                  )}
                </div>

                <div className="game-stats">
                  {game.min_players && game.max_players && (
                    <span className="stat">👥 {game.min_players}-{game.max_players} Spieler</span>
                  )}
                  {game.min_duration_min && (
                    <span className="stat">⏱️ {game.min_duration_min} Min</span>
                  )}
                  {game.min_age && (
                    <span className="stat">📍 Ab {game.min_age} J.</span>
                  )}
                </div>

                <div className="game-status">
                  <span className={`status-badge ${game.rules_status?.includes('vorhanden') ? 'available' : 'pending'}`}>
                    {game.rules_status || 'Status unbekannt'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                ← Vorherige
              </button>
              <span className="pagination-info">
                Seite {currentPage} von {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Nächste →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
