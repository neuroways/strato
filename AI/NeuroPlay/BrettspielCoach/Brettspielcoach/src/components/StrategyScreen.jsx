import { Zap, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function StrategyScreen({ game, onBack }) {
  const [activeTab, setActiveTab] = useState('strategies');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 mb-4"
        >
          ← Zurück
        </button>
        <h1 className="text-2xl font-bold">Strategie</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('strategies')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'strategies'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Strategien
          </button>
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'mistakes'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Anfängerfehler
          </button>
        </div>

        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-4">
            {game.strategies.map((strategy, idx) => (
              <div
                key={idx}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{strategy.name}</h3>
                    <p className="text-slate-300 leading-relaxed">
                      {strategy.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mistakes Tab */}
        {activeTab === 'mistakes' && (
          <div className="space-y-4">
            {game.beginnerMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6"
              >
                <div className="mb-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-semibold">{mistake.mistake}</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-400 mb-1">Warum ist das ein Fehler?</p>
                    <p className="text-slate-300 bg-slate-700/30 p-3 rounded-lg">
                      {mistake.why}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400 mb-1">So machst du es besser:</p>
                    <p className="text-slate-300 bg-slate-700/30 p-3 rounded-lg">
                      {mistake.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
