import AppShell from './components/AppShell';

const appName = 'Tennisturnier Neindorf';
const appVersion = '0.0.1-dev';

export default function App() {
  return (
    <AppShell appName={appName} version={appVersion}>
      <section className="hero-card" aria-labelledby="welcome-title">
        <p className="section-kicker">Foundation</p>
        <h2 id="welcome-title">Ein Tag für alle.</h2>
        <p>
          Die React-Anwendung ist bereit für Routing, API-Anbindung und
          die nächsten Tennisturnier-Module.
        </p>

        <div className="status-grid" aria-label="Technischer Foundation-Status">
          <article><strong>Frontend</strong><span>React + TypeScript + Vite</span></article>
          <article><strong>Backend</strong><span>PHP + PDO + MariaDB</span></article>
          <article><strong>Status</strong><span>Foundation aktiv</span></article>
        </div>
      </section>
    </AppShell>
  );
}
