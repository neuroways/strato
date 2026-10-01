import { BookOpen, Clock, Users, Gauge, Plus } from 'lucide-react';

export function LibraryScreen({ games, onSelectGame, onUpload, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 mb-4"
        >
          ← Startseite
        </button>
        <h1 className="text-3xl font-bold">Meine Spiele</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {games.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-300 mb-2">
              Noch keine Spiele
            </h2>
            <p className="text-slate-400 mb-6">
              Lade eine Spielanleitung hoch, um zu beginnen.
            </p>
            <button
              onClick={onUpload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Spiel hinzufügen
            </button>
          </div>
        ) : (
          // Game Grid
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-400">
                {games.length} Spiel{games.length !== 1 ? 'e' : ''}
              </p>
              <button
                onClick={onUpload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Hinzufügen
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => onSelectGame(game.id)}
                  className="group text-left bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-600 hover:bg-slate-700/50 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{game.basics.playerCount.min}–{game.basics.playerCount.max} Spieler</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{game.basics.duration.min}–{game.basics.duration.max} Min.</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Gauge className="w-4 h-4" />
                      <span className="capitalize">{game.basics.complexity}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-4 border-t border-slate-700">
                    <span className="inline-block px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-full font-semibold">
                      ✓ Analysiert
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
