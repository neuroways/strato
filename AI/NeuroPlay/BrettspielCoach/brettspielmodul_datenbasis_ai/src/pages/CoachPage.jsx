import { useState } from 'react';
import { Link } from 'react-router';
import seedData from '../data/seedData.json';

export default function CoachPage() {
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const gamesWithRules = seedData.games.filter(g => g.has_rules);

  const filteredGames = searchTerm
    ? gamesWithRules.filter(g =>
        g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.original_title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : gamesWithRules;

  const selectedGame = selectedGameId ? seedData.games.find(g => g.id === selectedGameId) : null;
  const knowledge = selectedGame ? seedData.game_knowledge.filter(k => k.game_id === selectedGame.id) : [];
  const phases = selectedGame ? seedData.phases.filter(p => p.game_id === selectedGame.id) : [];
  const rules = selectedGame ? seedData.rules.filter(r => r.game_id === selectedGame.id) : [];

  return (
    <main>
      <h1>Regelcoach</h1>
      <p className="subtitle">Verstehe jedes Spiel strukturiert. Belegt durch offizielle Quellen.</p>

      <div className="coach-layout">
        <div className="coach-sidebar">
          <div className="form-group">
            <label className="form-label">Spiel auswählen</label>
            <input
              type="text"
              className="form-input"
              placeholder="Spiel suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="games-list">
            <div className="games-list-header">
              {filteredGames.length} Spiel{filteredGames.length !== 1 ? 'e' : ''} mit Regelwissen
            </div>
            {filteredGames.map(game => (
              <button
                key={game.id}
                className={`game-list-item ${selectedGameId === game.id ? 'active' : ''}`}
                onClick={() => setSelectedGameId(game.id)}
              >
                <div className="list-item-title">{game.title}</div>
                <div className="list-item-meta">{game.category}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="coach-content">
          {!selectedGame ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎲</div>
              <h2>Wähle ein Spiel</h2>
              <p>Wähle links ein Spiel aus, um den Regelcoach zu nutzen.</p>
            </div>
          ) : (
            <>
              <div className="coach-header">
                <h2>{selectedGame.title}</h2>
                <p className="coach-subtitle">{selectedGame.category}</p>
              </div>

              {knowledge.length > 0 && (
                <section className="coach-section">
                  <h3>🎯 Spielwissen</h3>
                  <div className="knowledge-cards">
                    {knowledge.map(k => (
                      <div key={k.id} className="knowledge-card card">
                        <div className="knowledge-type">
                          {k.type === 'objective' ? 'Das Ziel' : 'Die Kernschleife'}
                        </div>
                        <p>{k.content}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {phases.length > 0 && (
                <section className="coach-section">
                  <h3>📋 Spielablauf</h3>
                  <div className="phases-timeline">
                    {phases.map((p, idx) => (
                      <div key={p.id} className="timeline-item">
                        <div className="timeline-marker">{idx + 1}</div>
                        <div className="timeline-content">
                          <h4>{p.name}</h4>
                          <p>{p.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {rules.length > 0 && (
                <section className="coach-section">
                  <h3>📖 Regeln</h3>
                  <div className="rules-accordion">
                    {rules.map(r => (
                      <details key={r.id} className="rule-detail">
                        <summary className="rule-summary">
                          <strong>{r.title}</strong>
                          <span className="source-badge">{r.source}</span>
                        </summary>
                        <div className="rule-detail-content">
                          <p>{r.content}</p>
                          <div className="rule-meta-line">
                            <small>Status: {r.quality_status === 'verified' ? '✓ Überprüft' : 'Noch zu prüfen'}</small>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <div className="coach-footer">
                <p className="info-text">
                  💡 Tipp: Alle Informationen sind belegt durch offizielle Quellen und Spielanleitungen.
                </p>
                <Link to={`/games/${selectedGame.id}`} className="btn btn-secondary">
                  Zur Spielseite →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
