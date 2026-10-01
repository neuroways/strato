import { Dice5, Users, RotateCcw, X, HelpCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function GameModeScreen({ game, onBack, onCoachClick, onRulesClick }) {
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState('Vorbereitung');
  const [playerTurn, setPlayerTurn] = useState(1);
  const [players] = useState([
    { id: 1, name: 'Du', points: 0 },
    { id: 2, name: 'Spieler 2', points: 0 },
  ]);

  const currentActions = [
    '🎲 Würfeln und bewegen',
    '📚 Wissenskarte ziehen',
    '💧 Ressource nutzen',
    '🤝 Anderen helfen',
  ];

  const handleNextPhase = () => {
    const phases = ['Vorbereitung', 'Bewegung', 'Aktion', 'Beendigung'];
    const currentIdx = phases.indexOf(phase);
    const nextIdx = (currentIdx + 1) % phases.length;
    setPhase(phases[nextIdx]);

    if (nextIdx === 0) {
      // New round
      setPlayerTurn(playerTurn % players.length + 1);
      if (playerTurn === 1) {
        setRound(round + 1);
      }
    }
  };

  const handleEndGame = () => {
    if (window.confirm('Partie beenden?')) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-700 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{game.title}</h1>
          <p className="text-sm text-slate-400">Runde {round} von 6</p>
        </div>
        <button
          onClick={handleEndGame}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Play Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 lg:border-r lg:border-slate-700">
          {/* Current Phase */}
          <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Dice5 className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-xs text-blue-400 uppercase font-semibold">Aktuelle Phase</p>
                <h2 className="text-2xl font-bold mt-1">{phase}</h2>
                <p className="text-sm text-slate-300 mt-2">
                  {phase === 'Bewegung' && 'Würfle und bewege deine Figur.'}
                  {phase === 'Aktion' && 'Wähle eine Aktion aus.'}
                  {phase === 'Beendigung' && 'Dein Zug ist beendet. Nächster Spieler ist dran.'}
                  {phase === 'Vorbereitung' && 'Bereite dich auf deine erste Phase vor.'}
                </p>
              </div>
            </div>
          </div>

          {/* Current Player */}
          <div className="mb-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Aktueller Spieler</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center font-bold">
                P{playerTurn}
              </div>
              <div>
                <p className="font-semibold text-lg">{players[playerTurn - 1]?.name}</p>
                <p className="text-sm text-slate-400">
                  {players[playerTurn - 1]?.points} Punkte
                </p>
              </div>
            </div>
          </div>

          {/* Possible Actions */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-4">Mögliche Aktionen</p>
            <div className="space-y-2">
              {currentActions.map((action, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-700 p-4 flex flex-col gap-4">
          {/* Scoreboard */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Spieler
            </h3>
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg transition-colors ${
                    player.id === playerTurn
                      ? 'bg-blue-600/30 border border-blue-600'
                      : 'bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{player.name}</span>
                    <span className="text-lg font-bold text-yellow-400">
                      {player.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Info */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Info</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p>🔴 Runde: <span className="font-semibold">{round}/6</span></p>
              <p>📍 Phase: <span className="font-semibold">{phase}</span></p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mt-auto">
            <button
              onClick={onCoachClick}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              Coach fragen
            </button>
            <button
              onClick={onRulesClick}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Regeln
            </button>
            <button
              onClick={handleNextPhase}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Nächste Phase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
