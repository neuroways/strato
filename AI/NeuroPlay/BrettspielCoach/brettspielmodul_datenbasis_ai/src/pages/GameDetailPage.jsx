import { useParams, Link } from 'react-router';
import seedData from '../data/seedData.json';

export default function GameDetailPage() {
  const { id } = useParams();
  const game = seedData.games.find(g => g.id === id);
  const publisher = game ? seedData.publishers.find(p => p.id === game.publisher_id) : null;
  const knowledge = game ? seedData.game_knowledge.filter(k => k.game_id === game.id) : [];
  const phases = game ? seedData.phases.filter(p => p.game_id === game.id) : [];
  const rules = game ? seedData.rules.filter(r => r.game_id === game.id) : [];

  if (!game) {
    return (
      <main>
        <div className="empty-state">
          <h2>Spiel nicht gefunden</h2>
          <p>Das gesuchte Spiel existiert nicht in unserem Katalog.</p>
          <Link to="/games" className="btn btn-primary">Zurück zum Katalog</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="game-detail-header">
        <div className="game-detail-info">
          <h1>{game.title}</h1>
          {game.original_title && game.original_title !== game.title && (
            <p className="original-title">{game.original_title}</p>
          )}
          <div className="game-badges">
            {game.has_rules && <span className="badge badge-knowledge-yes">✓ Regelwissen vorhanden</span>}
            {!game.has_rules && <span className="badge badge-knowledge-no">Regelwissen fehlt</span>}
          </div>
        </div>
        <div className="game-quick-stats">
          <div className="quick-stat">
            <div className="quick-stat-label">Spieler</div>
            <div className="quick-stat-value">{game.min_players}–{game.max_players}</div>
          </div>
          <div className="quick-stat">
            <div className="quick-stat-label">Dauer</div>
            <div className="quick-stat-value">{game.min_duration}–{game.max_duration}min</div>
          </div>
          <div className="quick-stat">
            <div className="quick-stat-label">Alter</div>
            <div className="quick-stat-value">{game.min_age}+</div>
          </div>
          <div className="quick-stat">
            <div className="quick-stat-label">Schwierigkeit</div>
            <div className="quick-stat-value">{game.complexity}</div>
          </div>
        </div>
      </div>

      <div className="game-detail-tabs">
        <section>
          <h2>Überblick</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <h3>Beschreibung</h3>
              <p>{game.description}</p>
            </div>
            <div className="detail-item">
              <h3>Verlag</h3>
              <p>{publisher?.name}</p>
              {publisher?.website && (
                <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="link">
                  Webseite besuchen →
                </a>
              )}
            </div>
            <div className="detail-item">
              <h3>Kategorie</h3>
              <p>{game.category}</p>
            </div>
            <div className="detail-item">
              <h3>Spieltyp</h3>
              <p>{game.game_type}</p>
            </div>
            <div className="detail-item">
              <h3>Jahr</h3>
              <p>{game.year_published}</p>
            </div>
          </div>
        </section>

        {game.has_rules && (
          <>
            {knowledge.length > 0 && (
              <section>
                <h2>Spielwissen</h2>
                <div className="knowledge-cards">
                  {knowledge.map(k => (
                    <div key={k.id} className="knowledge-card card">
                      <h3>{k.type === 'objective' ? '🎯 Ziel' : '🔄 Kernschleife'}</h3>
                      <p>{k.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {phases.length > 0 && (
              <section>
                <h2>Spielablauf (Phasen)</h2>
                <div className="phases-list">
                  {phases.map((p, idx) => (
                    <div key={p.id} className="phase-item">
                      <div className="phase-number">{idx + 1}</div>
                      <div className="phase-content">
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {rules.length > 0 && (
              <section>
                <h2>Regeln</h2>
                <div className="rules-list">
                  {rules.map(r => (
                    <div key={r.id} className="rule-item card">
                      <div className="rule-header">
                        <h3>{r.title}</h3>
                        <span className="badge badge-status-available">Aktiv</span>
                      </div>
                      <p className="rule-content">{r.content}</p>
                      <div className="rule-meta">
                        <small>📍 {r.source}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {!game.has_rules && (
          <section>
            <div className="empty-state">
              <div className="empty-state-icon">📖</div>
              <h3>Regelwissen noch nicht verfügbar</h3>
              <p>Für dieses Spiel wurde das Regelwissen noch nicht extrahiert. Bitte nutze die offizielle Spielanleitung.</p>
              {publisher?.website && (
                <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Zur Verlagswebseite
                </a>
              )}
            </div>
          </section>
        )}
      </div>

      <div className="game-detail-footer">
        <Link to="/games" className="btn btn-secondary">← Zurück zum Katalog</Link>
        <Link to="/coach" className="btn btn-primary">Zum Regelcoach</Link>
      </div>
    </main>
  );
}
