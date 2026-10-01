import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function GameFlowScreen({ game, onBack }) {
  const [expandedPhase, setExpandedPhase] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
        >
          ← Zurück
        </button>
        <h1 className="text-2xl font-bold mt-3">Spielablauf</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-slate-400 mb-8">
          So funktioniert eine typische Runde in {game.title}.
        </p>

        {/* Phases */}
        <div className="space-y-3 mb-8">
          {game.roundStructure.phases.map((phase, idx) => (
            <div
              key={idx}
              className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedPhase(expandedPhase === idx ? -1 : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{phase.name}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    expandedPhase === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedPhase === idx && (
                <div className="px-6 py-4 bg-slate-700/30 border-t border-slate-700">
                  <p className="text-slate-300 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loop Explanation */}
        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-700 rounded-lg p-6">
          <h3 className="font-semibold mb-3">♻️ Der Spielablauf wiederholt sich</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Nach Phase 3 ist der nächste Spieler im Uhrzeigersinn an der Reihe. Das Spiel geht reihum, bis entweder jemand den Leuchtturm erreicht oder 6 Runden vorbei sind.
          </p>
          <p className="text-sm text-slate-400">
            💡 Tipp: Mit der Zeit wirst du schneller durch die Phasen, da du weißt, was zu tun ist.
          </p>
        </div>
      </div>
    </div>
  );
}
