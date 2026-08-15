import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function SetupScreen({ game, onBack }) {
  const [expandedStep, setExpandedStep] = useState(0);

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
        <h1 className="text-2xl font-bold mt-3">Spielaufbau</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-slate-400 mb-8">
          Folge diesen Schritten, um das Spiel aufzubauen.
        </p>

        {/* Material Overview */}
        <div className="mb-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="font-semibold mb-4 text-lg">Spielmaterial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.material.map((mat, idx) => (
              <div key={idx} className="bg-slate-700/50 p-3 rounded-lg">
                <p className="font-semibold text-sm">{mat.name}</p>
                <p className="text-xs text-slate-400 mt-1">{mat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-3">
          {game.setup.steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <span className="font-semibold">{step.substring(0, 50)}...</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    expandedStep === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedStep === idx && (
                <div className="px-6 py-4 bg-slate-700/30 border-t border-slate-700">
                  <p className="text-slate-300 leading-relaxed">{step}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700 rounded-lg">
          <p className="text-sm">
            💡 <span className="text-slate-300">Wenn du alles aufgebaut hast, kannst du mit der Partie starten.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
