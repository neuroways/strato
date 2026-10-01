const appVersion = '0.0.1-dev';

export default function App() {
  return (
    <main className="app-shell">
      <section className="foundation-card" aria-labelledby="app-title">
        <p className="eyebrow">NeuroPlay · Development</p>
        <h1 id="app-title">Tennisturnier Neindorf</h1>
        <p>React/Vite Foundation ist aktiv.</p>
        <dl>
          <div><dt>Frontend</dt><dd>React + TypeScript + Vite</dd></div>
          <div><dt>Version</dt><dd>{appVersion}</dd></div>
        </dl>
      </section>
    </main>
  );
}
