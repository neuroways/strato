import { ArrowRight, HelpCircle, Play, Zap, BookOpen, Users, Clock, Gauge } from 'lucide-react';

export function GameOverview({ game, onNavigate }) {
  const sections = [
    { id: 'quickstart', icon: Zap, label: 'Schnellstart', color: 'from-yellow-600 to-yellow-700' },
    { id: 'setup', icon: BookOpen, label: 'Spielaufbau', color: 'from-blue-600 to-blue-700' },
    { id: 'rules', icon: BookOpen, label: 'Regeln', color: 'from-purple-600 to-purple-700' },
    { id: 'gameflow', icon: Play, label: 'Spielablauf', color: 'from-green-600 to-green-700' },
    { id: 'strategy', icon: Zap, label: 'Strategie', color: 'from-red-600 to-red-700' },
    { id: 'coach', icon: HelpCircle, label: 'Coach fragen', color: 'from-indigo-600 to-indigo-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <button
          onClick={() => onNavigate('start')}
          className="text-slate-400 hover:text-white transition-colors text-sm"
        >
          ← Startseite
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">{game.title}</h1>
          <p className="text-slate-300 text-lg">{game.description}</p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800 rounded-lg p-4">
              <Users className="w-5 h-5 text-blue-400 mb-2" />
              <p className="text-xs text-slate-400">Spieler</p>
              <p className="font-semibold">{game.basics.playerCount.min}–{game.basics.playerCount.max}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <Clock className="w-5 h-5 text-yellow-400 mb-2" />
              <p className="text-xs text-slate-400">Dauer</p>
              <p className="font-semibold">{game.basics.duration.min}–{game.basics.duration.max} Min.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <Gauge className="w-5 h-5 text-purple-400 mb-2" />
              <p className="text-xs text-slate-400">Komplexität</p>
              <p className="font-semibold capitalize">{game.basics.complexity}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-xs text-slate-400">Alter</p>
              <p className="font-semibold">{game.basics.age}</p>
            </div>
          </div>
        </div>

        {/* Goal Box */}
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">🎯 Spielziel</h2>
          <p className="text-slate-300">{game.goal}</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`group relative px-6 py-6 bg-gradient-to-r ${section.color} hover:shadow-lg rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-left`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Icon className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{section.label}</p>
                      <p className="text-sm opacity-90 mt-1">
                        {section.id === 'quickstart' && 'Das Wichtigste in 5 Schritten'}
                        {section.id === 'setup' && 'Schritt für Schritt aufgebaut'}
                        {section.id === 'rules' && 'Alle Regeln durchsuchen'}
                        {section.id === 'gameflow' && 'Wie ein Zug funktioniert'}
                        {section.id === 'strategy' && 'Tipps zum Gewinnen'}
                        {section.id === 'coach' && 'Frag den Coach'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Start Game Button */}
        <button
          onClick={() => onNavigate('gamemode')}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          ▶ Partie starten
        </button>
      </div>
    </div>
  );
}
