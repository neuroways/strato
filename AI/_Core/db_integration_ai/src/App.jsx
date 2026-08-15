import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import { Menu, X, ArrowRight, Zap, Shield, Rocket, Users, Lightbulb, Check } from 'lucide-react';
import { pb } from './lib/pb';
import CheckinPage from './pages/CheckinPage';
import CheckinResultPage from './pages/CheckinResultPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';

function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);

  useEffect(() => {
    setIsLoggedIn(pb.authStore.isValid);
    pb.authStore.onChange(() => setIsLoggedIn(pb.authStore.isValid));

    // Load activity types for the diversity section
    pb.collection('npl_activity_types')
      .getList(1, 50)
      .then(result => setActivityTypes(result.items))
      .catch(() => {});
  }, []);

  const activityCategoryMap = {
    'board_games': '🎲 Brettspiele',
    'video_games': '🎮 Videospiele',
    'music': '🎵 Musik',
    'creative': '🎨 Kreativität',
    'crafts': '🧶 Handarbeit',
    'movement': '🚶 Bewegung',
    'learning': '📚 Lernen',
    'relaxation': '🌿 Entspannung',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-900">
                N
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                NeuroPlay
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#entdecken" className="text-sm text-slate-300 hover:text-emerald-400 transition">
                Entdecken
              </a>
              <a href="#funktionsweise" className="text-sm text-slate-300 hover:text-emerald-400 transition">
                So funktioniert es
              </a>
              <a href="#coach" className="text-sm text-slate-300 hover:text-emerald-400 transition">
                Brettspielcoach
              </a>
              <a href="#about" className="text-sm text-slate-300 hover:text-emerald-400 transition">
                Über NeuroPlay
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate('/settings')}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                  >
                    Einstellungen
                  </button>
                  <button
                    onClick={() => {
                      pb.authStore.clear();
                      navigate('/');
                    }}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
                  Anmelden
                </button>
              )}
              <button onClick={() => navigate(isLoggedIn ? '/settings' : '/register')} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition">
                {isLoggedIn ? 'Konto' : 'Jetzt starten'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-700 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-slate-700 pt-4">
              <a href="#entdecken" className="block text-sm text-slate-300 hover:text-emerald-400 transition">
                Entdecken
              </a>
              <a href="#funktionsweise" className="block text-sm text-slate-300 hover:text-emerald-400 transition">
                So funktioniert es
              </a>
              <a href="#coach" className="block text-sm text-slate-300 hover:text-emerald-400 transition">
                Brettspielcoach
              </a>
              <a href="#about" className="block text-sm text-slate-300 hover:text-emerald-400 transition">
                Über NeuroPlay
              </a>
              <div className="flex flex-col gap-2 pt-2">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate('/settings')}
                      className="text-center px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:border-slate-400 transition"
                    >
                      Einstellungen
                    </button>
                    <button
                      onClick={() => {
                        pb.authStore.clear();
                        navigate('/');
                      }}
                      className="text-center px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:border-slate-400 transition"
                    >
                      Abmelden
                    </button>
                  </>
                ) : (
                  <button onClick={() => navigate('/login')} className="text-center px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:border-slate-400 transition">
                    Anmelden
                  </button>
                )}
                <button onClick={() => navigate(isLoggedIn ? '/settings' : '/register')} className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition">
                  {isLoggedIn ? 'Konto' : 'Jetzt starten'}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Welcome Banner for Logged-In Users */}
      {isLoggedIn && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-center py-3">
          <p className="text-sm text-emerald-300">
            Willkommen zurück. <a href="/dashboard" className="font-semibold hover:text-emerald-200">Zu deinem Dashboard</a>
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Finde die Aktivität,</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    die gerade zu dir passt.
                  </span>
                </span>
              </h1>

              <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 backdrop-blur">
                <p className="text-center text-lg font-semibold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  Mensch + Aktivität + Situation = Wirkung
                </p>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed">
                NeuroPlay verbindet deine aktuelle Situation mit den Anforderungen und möglichen Wirkungen von Aktivitäten. So findest du leichter heraus, was dir jetzt guttun, Freude machen oder dich unterstützen könnte.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a href="/check-in" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition flex items-center justify-center gap-2">
                  Passende Aktivität finden
                  <ArrowRight size={18} />
                </a>
                <button className="px-6 py-3 border border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 hover:border-emerald-400 transition">
                  NeuroPlay kennenlernen
                </button>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/static/stock_hero-neurplay-activities-8acfe5-0.jpg"
                alt="Menschen umgeben von verschiedenen Aktivitäten"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Message Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Nicht jede gute Aktivität passt in jede Situation.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Manchmal steht nur wenig Zeit zur Verfügung. Manchmal ist viel Energie vorhanden und eine Herausforderung genau richtig. An anderen Tagen braucht es Ruhe, klare Abläufe oder etwas, das ohne große Vorbereitung begonnen werden kann.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mt-4">
            NeuroPlay betrachtet deshalb nicht nur die Aktivität. Es verbindet:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8 text-slate-200">
            <div>✓ aktuelle Bedürfnisse</div>
            <div>✓ verfügbare Energie</div>
            <div>✓ verfügbare Zeit</div>
            <div>✓ soziale Situation</div>
            <div>✓ persönliche Erfahrungen</div>
            <div>✓ Anforderungen der Aktivität</div>
          </div>
        </div>
      </section>

      {/* Three Use Cases */}
      <section id="entdecken" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Drei zentrale Anwendungswege
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Was passt gerade?</h3>
              <p className="text-slate-300 mb-6">
                Gib kurz an, was du brauchst, wie viel Zeit du hast und ob du allein oder gemeinsam etwas machen möchtest. NeuroPlay zeigt passende Aktivitäten und erklärt, warum sie zu deiner Situation passen könnten.
              </p>
              <a href="/check-in" className="text-emerald-400 font-semibold hover:text-emerald-300 transition flex items-center gap-2">
                Empfehlung erhalten
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Wie funktioniert das?</h3>
              <p className="text-slate-300 mb-6">
                NeuroPlay erklärt Aktivitäten nicht nur als Sammlung von Einzelschritten. Es zeigt Ziel, Grundidee, benötigtes Material, Vorbereitung, Kernschleife, wichtige Regeln und typische Schwierigkeiten.
              </p>
              <button className="text-cyan-400 font-semibold hover:text-cyan-300 transition flex items-center gap-2">
                Aktivität entdecken
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Gemeinsam beginnen</h3>
              <p className="text-slate-300 mb-6">
                Der NeuroPlay-Coach kann beim Lernen, Vorbereiten und Durchführen einer Aktivität begleiten. Bei Brettspielen beispielsweise: den Aufbau erklären, Regeln beantworten, die erste Partie begleiten.
              </p>
              <button className="text-blue-400 font-semibold hover:text-blue-300 transition flex items-center gap-2">
                Coach ansehen
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="funktionsweise" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Von der Situation zur passenden Aktivität
          </h2>

          <div className="grid md:grid-cols-6 gap-4">
            {[
              { num: '1', label: 'Situation\nwahrnehmen' },
              { num: '2', label: 'Bedürfnis\nauswählen' },
              { num: '3', label: 'Aktivitäten\nvergleichen' },
              { num: '4', label: 'Empfehlung\nverstehen' },
              { num: '5', label: 'Aktivität\nbeginnen' },
              { num: '6', label: 'Erfahrung\nreflektieren' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-slate-900 mb-2">
                  {step.num}
                </div>
                <p className="text-center text-sm whitespace-pre-line text-slate-300">{step.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h4 className="font-bold text-emerald-400 mb-3">Situation erfassen</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Wie viel Zeit steht zur Verfügung?</li>
                <li>• Wie viel Energie ist vorhanden?</li>
                <li>• Allein oder gemeinsam?</li>
                <li>• Ruhig oder herausfordernd?</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h4 className="font-bold text-cyan-400 mb-3">Activity DNA</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Konzentrationsbedarf</li>
                <li>• Planungsaufwand</li>
                <li>• Kooperation & Wettbewerb</li>
                <li>• Bewegungs- & Energiebedarf</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h4 className="font-bold text-blue-400 mb-3">Nachvollziehbare Empfehlung</h4>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Was dafür spricht</li>
                <li>• Was dagegen könnte sprechen</li>
                <li>• Mögliche Anpassungen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Diversity */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            NeuroPlay beginnt bei Spielen und denkt Aktivitäten weiter.
          </h2>
          <p className="text-center text-slate-300 mb-12 text-lg">
            Jede Aktivität besitzt andere Anforderungen und kann in unterschiedlichen Situationen anders wirken.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {activityTypes.length > 0 ? (
              activityTypes.slice(0, 8).map((type) => (
                <div
                  key={type.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center hover:border-emerald-500/50 hover:bg-slate-800/80 transition"
                >
                  <p className="text-3xl mb-2">
                    {activityCategoryMap[type.name] || '🎯'}
                  </p>
                  <p className="text-sm text-slate-300">{type.display_name || type.name}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🎲</p>
                  <p className="text-sm text-slate-300">Brettspiele</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🎮</p>
                  <p className="text-sm text-slate-300">Videospiele</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🎵</p>
                  <p className="text-sm text-slate-300">Musik</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🎨</p>
                  <p className="text-sm text-slate-300">Kreativität</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🧶</p>
                  <p className="text-sm text-slate-300">Handarbeit</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🚶</p>
                  <p className="text-sm text-slate-300">Bewegung</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">📚</p>
                  <p className="text-sm text-slate-300">Lernen</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-3xl mb-2">🌿</p>
                  <p className="text-sm text-slate-300">Entspannung</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Board Game Coach */}
      <section id="coach" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Spielanleitungen verstehen, ohne sich allein durchzukämpfen.
              </h2>

              <p className="text-slate-300 text-lg">
                Der Brettspielcoach analysiert Spielanleitungen und übersetzt sie in einen verständlichen Lern- und Spielablauf.
              </p>

              <div className="space-y-4">
                {[
                  'Spielüberblick erstellen',
                  'Ziel und Grundidee erklären',
                  'Material und Aufbau beschreiben',
                  'Kernschleife sichtbar machen',
                  'Regeln nach ihrem Zweck erklären',
                  'Partie Schritt für Schritt begleiten',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="px-6 py-3 border border-emerald-400 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-400/10 transition">
                  Coach kennenlernen
                </button>
                <button className="px-6 py-3 border border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 transition">
                  Spielanleitung analysieren
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🎲</div>
              <p className="text-slate-400">Brettspielcoach – Spielanleitungen verständlich gemacht</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            NeuroPlay soll unterstützen, nicht bewerten.
          </h2>
          <p className="text-center text-slate-300 text-lg mb-16">
            Sechs Prinzipien leiten unsere Arbeit
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Entwicklung statt Bewertung',
                desc: 'Es geht nicht darum, Menschen miteinander zu vergleichen.',
                icon: '📈',
              },
              {
                title: 'Beobachtung statt Diagnose',
                desc: 'NeuroPlay dokumentiert Situationen und Erfahrungen, nicht medizinische Einschätzungen.',
                icon: '👁️',
              },
              {
                title: 'Bedürfnisse statt Defizite',
                desc: 'Die Frage lautet nicht: „Was kannst du nicht?" sondern: „Was brauchst du gerade?"',
                icon: '💡',
              },
              {
                title: 'Kontext statt Schubladen',
                desc: 'Dieselbe Aktivität kann in unterschiedlichen Situationen völlig anders passen.',
                icon: '🎯',
              },
              {
                title: 'Erklärbare Empfehlungen',
                desc: 'Jede Empfehlung zeigt ihre Grundlage – nichts bleibt eine Black Box.',
                icon: '🔍',
              },
              {
                title: 'Datenschutz als Ausgangspunkt',
                desc: 'Persönliche Daten bleiben geschützt und werden nur für freigegebene Zwecke verwendet.',
                icon: '🔐',
              },
            ].map((principle, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="text-3xl mb-3">{principle.icon}</div>
                <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
                <p className="text-slate-300 text-sm">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entry Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Wie möchtest du beginnen?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 text-center">
              <p className="text-slate-300 mb-6">
                Ich weiß noch nicht, was gerade passt.
              </p>
              <a href="/check-in" className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition inline-block">
                Kurzen Check-in starten
              </a>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 text-center">
              <p className="text-slate-300 mb-6">
                Ich suche bereits nach etwas Bestimmtem.
              </p>
              <button className="w-full px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400/10 transition">
                Aktivitäten entdecken
              </button>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 text-center">
              <p className="text-slate-300 mb-6">
                Ich möchte ein Brettspiel verstehen oder spielen.
              </p>
              <button className="w-full px-6 py-3 border-2 border-blue-400 text-blue-400 font-bold rounded-lg hover:bg-blue-400/10 transition">
                Brettspielcoach starten
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-2xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Dein Einstieg in NeuroPlay
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Erstelle ein Konto, um deine Aktivitäten, Empfehlungen und Erfahrungen sicher zu speichern.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 text-lg font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition">
              Kostenlos starten
            </button>
            <button className="px-8 py-3 border-2 border-slate-400 text-slate-300 text-lg font-bold rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition">
              Anmelden
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Aktivitäten müssen nicht allgemein gut sein.
            <br />
            Sie müssen zur Situation passen.
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            NeuroPlay hilft dabei, diese Passung sichtbar und verständlich zu machen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 text-lg font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition flex items-center justify-center gap-2">
              Jetzt NeuroPlay starten
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 border-2 border-slate-400 text-slate-300 text-lg font-bold rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition">
              Mehr über die Idee erfahren
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-slate-900">
                  N
                </div>
                NeuroPlay
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Über NeuroPlay</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">So funktioniert es</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Brettspielcoach</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Aktivitäten entdecken</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Hilfe</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Hilfe und Einführung</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Häufige Fragen</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Kontakt</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Barrierefreiheit</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Impressum</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Nutzungsbedingungen</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Cookie-Einstellungen</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">NeuroWays</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Über NeuroWays</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Weitere Module</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Grundprinzipien</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 NeuroPlay. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const basename = new URL(document.baseURI).pathname.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check-in" element={<CheckinPage />} />
        <Route path="/checkin/result" element={<CheckinResultPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
