import { Link } from 'react-router';
import seedData from '../data/seedData.json';

export default function HomePage() {
  const totalGames = seedData.games.length;
  const gamesWithRules = seedData.games.filter(g => g.has_rules).length;
  const totalPublishers = seedData.publishers.length;
  const inCollection = seedData.collection.filter(c => c.status === 'VORHANDEN').length;

  return (
    <main>
      <header className="hero">
        <div className="hero-content">
          <h1>NeuroPlay – Brettspielcoach</h1>
          <p className="hero-subtitle">Verstehe Spiele. Entdecke Mechan iken. Spielen neu denken.</p>
          <p className="hero-description">
            NeuroPlay hilft dir, Brettspiele strukturiert zu verstehen. Mit unserem Regelcoach lernst du die Mechaniken, 
            Phasen und Regeln – belegt durch offizielle Quellen.
          </p>
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalGames}</div>
            <div className="stat-label">Spiele im Katalog</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{gamesWithRules}</div>
            <div className="stat-label">Mit Regelwissen</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalPublishers}</div>
            <div className="stat-label">Priorisierte Verlage</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{inCollection}</div>
            <div className="stat-label">In deinem Bestand</div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Was NeuroPlay für dich tut</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎲</div>
            <h3>Spielekatalog</h3>
            <p>Durchsuche und filtere über 1.700 Spiele. Finde schnell, was du suchst – nach Verlag, Kategorie, Spielerzahl oder Dauer.</p>
            <Link to="/games" className="feature-link">Zum Katalog →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Regelcoach</h3>
            <p>Verstehe jedes Spiel strukturiert: Ziel, Kernschleife, Phasen, Regeln – alles belegt durch offizielle Quellen.</p>
            <Link to="/coach" className="feature-link">Zum Coach →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Dein Bestand</h3>
            <p>Verwalte deine Spielesammlung. Sehe, welche Spiele du hast, welche du hinzufügen möchtest.</p>
            <Link to="/collection" className="feature-link">Zum Bestand →</Link>
          </div>
        </div>
      </section>

      <section className="example-games">
        <h2>Beispiele: Spiele mit Regelwissen</h2>
        <div className="games-preview">
          {seedData.games.filter(g => g.has_rules).slice(0, 3).map(game => (
            <div key={game.id} className="game-preview-card">
              <h4>{game.title}</h4>
              <p className="game-meta">
                {game.min_players}–{game.max_players} Spieler · {game.min_age}+ Jahre
              </p>
              <p className="game-category">{game.category}</p>
              <Link to={`/games/${game.id}`} className="btn btn-primary">
                Zum Spiel
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Bereit zu spielen?</h2>
        <p>Entdecke neue Spiele oder vertiefe dein Wissen über deine Lieblingsspiele.</p>
        <Link to="/games" className="btn btn-primary btn-large">
          Spielekatalog erkunden
        </Link>
      </section>
    </main>
  );
}
