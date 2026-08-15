import { useState, useEffect } from 'react';
import { Zap, Gamepad2, BookOpen, Sparkles, Users } from 'lucide-react';
import { loadCatalogGames } from '../lib/catalogRepository';

export function StartScreen({ currentUser }) {
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      try {
        const games = await loadCatalogGames();
        setGameCount(games.length);
      } catch (err) {
        setGameCount(924); // fallback
      }
    }
    loadCount();
  }, []);

  const handleNavigation = (screen) => {
    window.dispatchEvent(new CustomEvent('appNavigate', { detail: screen }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Brettspiele
            <br />
            <span className="bg-gradient-to-r from-nw-primary to-nw-primary-dark bg-clip-text text-transparent">
              verstehen
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
            Lerne neue Spiele schneller, verstehe die Regeln intuitiver, und spiele besser — mit persönlicher Hilfe für jedes Spiel.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Catalog Card */}
          <button
            onClick={() => handleNavigation('catalog')}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-nw-primary p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-nw-primary/20 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-nw-primary/0 to-nw-primary/0 group-hover:from-nw-primary/10 group-hover:to-nw-primary/5 transition-colors" />
            <div className="relative">
              <div className="mb-4 inline-flex p-3 bg-nw-primary/20 rounded-xl group-hover:bg-nw-primary/30 transition-colors">
                <Zap className="w-6 h-6 text-nw-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Spielekatalog</h2>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                Entdecke {gameCount} Spiele mit Regeln, Tipps und persönlicher Anleitung — alle an einem Ort.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-nw-primary group-hover:gap-3 transition-all">
                <span className="font-semibold">Durchstöbern</span>
                <span>→</span>
              </div>
            </div>
          </button>

          {/* Example Game Card */}
          <button
            onClick={() => handleNavigation('overview')}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-nw-warning p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-nw-warning/20 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-nw-warning/0 to-nw-warning/0 group-hover:from-nw-warning/10 group-hover:to-nw-warning/5 transition-colors" />
            <div className="relative">
              <div className="mb-4 inline-flex p-3 bg-nw-warning/20 rounded-xl group-hover:bg-nw-warning/30 transition-colors">
                <Gamepad2 className="w-6 h-6 text-nw-warning" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Beispielspiel</h2>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                Probiere NeuroPlay mit unserem Demo-Spiel aus und erlebe alle Funktionen.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-nw-warning group-hover:gap-3 transition-all">
                <span className="font-semibold">Spielen</span>
                <span>→</span>
              </div>
            </div>
          </button>

          {/* My Collection Card */}
          {currentUser && (
            <>
              <button
                onClick={() => handleNavigation('mygames')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-nw-success p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-nw-success/20 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-nw-success/0 to-nw-success/0 group-hover:from-nw-success/10 group-hover:to-nw-success/5 transition-colors" />
                <div className="relative">
                  <div className="mb-4 inline-flex p-3 bg-nw-success/20 rounded-xl group-hover:bg-nw-success/30 transition-colors">
                    <BookOpen className="w-6 h-6 text-nw-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Meine Sammlung</h2>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    Verwalte deine Lieblingsspiele, markiere Favoriten und füge Notizen hinzu.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-nw-success group-hover:gap-3 transition-all">
                    <span className="font-semibold">Ansehen</span>
                    <span>→</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('household')}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-nw-info p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-nw-info/20 text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-nw-info/0 to-nw-info/0 group-hover:from-nw-info/10 group-hover:to-nw-info/5 transition-colors" />
                <div className="relative">
                  <div className="mb-4 inline-flex p-3 bg-nw-info/20 rounded-xl group-hover:bg-nw-info/30 transition-colors">
                    <Users className="w-6 h-6 text-nw-info" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Haushalt</h2>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    Verwalte deinen Spielerhaushalt und lade Mitglieder ein.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-nw-info group-hover:gap-3 transition-all">
                    <span className="font-semibold">Verwalten</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 md:p-12">
          <div className="flex gap-4 mb-6">
            <Sparkles className="w-6 h-6 text-nw-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-3">Warum NeuroPlay?</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex gap-2">
                  <span className="text-nw-primary">✓</span>
                  <span>Schneller lernen: Verstehe komplexe Regeln in Minuten, nicht Stunden</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-nw-primary">✓</span>
                  <span>Immer parat: Deine Spielesammlung mit allen wichtigen Infos an einem Ort</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-nw-primary">✓</span>
                  <span>Besser spielen: Strategietipps und häufige Fehler helfen dir zu gewinnen</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-nw-primary">✓</span>
                  <span>Gemeinsam: Teile deine Sammlung mit Freunden und Familie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
