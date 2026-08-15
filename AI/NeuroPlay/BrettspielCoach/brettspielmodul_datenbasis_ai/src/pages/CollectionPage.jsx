import { useState } from 'react';
import { Link } from 'react-router';
import seedData from '../data/seedData.json';

export default function CollectionPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredItems = filterStatus === 'all'
    ? seedData.collection
    : seedData.collection.filter(c => c.status === filterStatus);

  const owned = seedData.collection.filter(c => c.status === 'VORHANDEN').length;
  const toAdd = seedData.collection.filter(c => c.status === 'HINZUFÜGEN').length;
  const toReview = seedData.collection.filter(c => c.status === 'ZU PRÜFEN').length;

  return (
    <main>
      <h1>Mein Spielebestand</h1>
      <p className="subtitle">Verwalte deine Spielesammlung</p>

      <div className="collection-stats">
        <div className="stat-card">
          <div className="stat-number">{owned}</div>
          <div className="stat-label">Vorhanden</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{toAdd}</div>
          <div className="stat-label">Hinzufügen</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{toReview}</div>
          <div className="stat-label">Zu prüfen</div>
        </div>
      </div>

      <div className="collection-filters">
        <button
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Alle ({seedData.collection.length})
        </button>
        <button
          className={`filter-btn ${filterStatus === 'VORHANDEN' ? 'active' : ''}`}
          onClick={() => setFilterStatus('VORHANDEN')}
        >
          Vorhanden ({owned})
        </button>
        <button
          className={`filter-btn ${filterStatus === 'HINZUFÜGEN' ? 'active' : ''}`}
          onClick={() => setFilterStatus('HINZUFÜGEN')}
        >
          Hinzufügen ({toAdd})
        </button>
        <button
          className={`filter-btn ${filterStatus === 'ZU PRÜFEN' ? 'active' : ''}`}
          onClick={() => setFilterStatus('ZU PRÜFEN')}
        >
          Zu prüfen ({toReview})
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>Keine Einträge</h3>
          <p>Es gibt keine Spiele mit diesem Status.</p>
        </div>
      ) : (
        <div className="collection-list">
          {filteredItems.map(item => {
            const game = item.game_id ? seedData.games.find(g => g.id === item.game_id) : null;
            const publisher = item.publisher_id ? seedData.publishers.find(p => p.id === item.publisher_id) : null;

            return (
              <div key={item.id} className="collection-item card">
                <div className="collection-item-header">
                  <div className="collection-item-title">
                    <h3>{item.title || game?.title || 'Unbekanntes Spiel'}</h3>
                    {publisher && <p className="collection-publisher">{publisher.name}</p>}
                  </div>
                  <div className="collection-item-status">
                    <span className={`badge ${
                      item.status === 'VORHANDEN' ? 'badge-status-available' : 
                      item.status === 'HINZUFÜGEN' ? 'badge-knowledge-no' : 
                      'badge-status-unknown'
                    }`}>
                      {item.status === 'VORHANDEN' ? '✓ Vorhanden' :
                       item.status === 'HINZUFÜGEN' ? '+ Hinzufügen' :
                       '? Zu prüfen'}
                    </span>
                  </div>
                </div>

                {game && (
                  <div className="collection-item-info">
                    <p className="game-info">
                      {game.min_players}–{game.max_players} Spieler · {game.min_age}+ Jahre · {game.complexity}
                    </p>
                    {game.has_rules && (
                      <div className="game-rules-note">
                        <span className="badge badge-knowledge-yes">Regelwissen vorhanden</span>
                      </div>
                    )}
                  </div>
                )}

                {item.notes && (
                  <p className="collection-notes">
                    <strong>Notizen:</strong> {item.notes}
                  </p>
                )}

                <div className="collection-item-actions">
                  {game && (
                    <Link to={`/games/${game.id}`} className="link">
                      Zum Spiel →
                    </Link>
                  )}
                  {game && game.has_rules && (
                    <Link to="/coach" className="link">
                      Im Coach ansehen →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <section className="collection-info">
        <h2>Über deinen Bestand</h2>
        <p>
          Dieser Bestand wurde aus dem Import vom <strong>25. Juli 2024</strong> erstellt. 
          Die Spiele sind in drei Kategorien eingeteilt:
        </p>
        <ul className="info-list">
          <li><strong>Vorhanden:</strong> Spiele, die du bereits besitzt.</li>
          <li><strong>Hinzufügen:</strong> Spiele, die du noch kaufen möchtest.</li>
          <li><strong>Zu prüfen:</strong> Spiele, deren Status noch überprüft werden muss.</li>
        </ul>
        <p>
          Wenn du Details aktualisieren möchtest, kannst du die Spielseiten besuchen oder den Coach nutzen.
        </p>
      </section>
    </main>
  );
}
