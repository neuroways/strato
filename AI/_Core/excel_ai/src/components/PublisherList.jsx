import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';
import '../styles/PublisherList.css';

export default function PublisherList({ publishers: initialPublishers, loading }) {
  const [publishers, setPublishers] = useState(initialPublishers);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRelevance, setFilterRelevance] = useState('');
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    loadPublishers();
  }, [currentPage, searchQuery, filterRelevance]);

  const loadPublishers = async () => {
    try {
      setIsLoading(true);
      let filter = '';
      
      if (searchQuery) {
        filter = `name ~ "${searchQuery}"`;
      }
      
      if (filterRelevance) {
        const relevanceFilter = `relevance = "${filterRelevance}"`;
        filter = filter ? `${filter} && ${relevanceFilter}` : relevanceFilter;
      }

      const result = await pb.collection('publishers').getList(currentPage, itemsPerPage, {
        filter: filter || undefined,
        sort: 'priority'
      });

      setPublishers(result.items);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error('Error loading publishers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="publishers-container">
      <div className="publishers-header">
        <h2 className="publishers-title">Verlage</h2>
        <p className="publishers-count">{totalItems} Verlage</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Verlag durchsuchen..."
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
          value={filterRelevance}
          onChange={(e) => {
            setFilterRelevance(e.target.value);
            setCurrentPage(1);
          }}
          className="relevance-select"
        >
          <option value="">Alle Relevanzklassen</option>
          <option value="Sehr hoch">Sehr hoch</option>
          <option value="Hoch">Hoch</option>
          <option value="Mittel">Mittel</option>
          <option value="Niedrig">Niedrig</option>
        </select>
      </div>

      {isLoading ? (
        <div className="loading">⏳ Wird geladen...</div>
      ) : publishers.length === 0 ? (
        <div className="no-results">
          <p>Keine Verlage gefunden</p>
        </div>
      ) : (
        <>
          <div className="publishers-list">
            {publishers.map(pub => (
              <div key={pub.id} className="publisher-card">
                <div className="publisher-header">
                  <div>
                    <h3 className="publisher-name">{pub.name}</h3>
                    <p className="publisher-id">{pub.publisher_id}</p>
                  </div>
                  <span className={`relevance-badge relevance-${pub.relevance?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`}>
                    {pub.relevance || 'Unbekannt'}
                  </span>
                </div>

                <div className="publisher-info">
                  {pub.country && (
                    <div className="info-item">
                      <span className="info-label">Land:</span>
                      <span className="info-value">{pub.country}</span>
                    </div>
                  )}
                  {pub.priority && (
                    <div className="info-item">
                      <span className="info-label">Priorität:</span>
                      <span className="info-value priority-value">#{pub.priority}</span>
                    </div>
                  )}
                  {pub.status && (
                    <div className="info-item">
                      <span className="info-label">Status:</span>
                      <span className={`status-value ${pub.status.toLowerCase()}`}>{pub.status}</span>
                    </div>
                  )}
                </div>

                <div className="publisher-links">
                  {pub.website && (
                    <a href={pub.website} target="_blank" rel="noopener noreferrer" className="publisher-link">
                      🌐 Website
                    </a>
                  )}
                  {pub.games_overview_url && (
                    <a href={pub.games_overview_url} target="_blank" rel="noopener noreferrer" className="publisher-link">
                      🎮 Spiele
                    </a>
                  )}
                </div>

                {pub.note && (
                  <p className="publisher-note">📌 {pub.note}</p>
                )}

                {pub.rules_source && (
                  <p className="publisher-source">Quelle: {pub.rules_source}</p>
                )}
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
