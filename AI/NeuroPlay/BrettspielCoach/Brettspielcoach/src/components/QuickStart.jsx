import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function QuickStart({ game, onBack }) {
  const [expandedStep, setExpandedStep] = useState(0);

  const steps = [
    {
      title: 'Worum geht es?',
      content: game.goal
    },
    {
      title: 'Wie gewinnt man?',
      content: game.winConditions.join('\n')
    },
    {
      title: 'Wie wird aufgebaut?',
      content: game.setup.steps.slice(0, 3).join('\n')
    },
    {
      title: 'Was passiert in einem Zug?',
      content: game.roundStructure.phases.map(p => `${p.name}\n${p.description}`).join('\n\n')
    },
    {
      title: 'Wann endet das Spiel?',
      content: `Das Spiel endet nach 6 Runden oder wenn ein Spieler den Leuchtturm erreicht. Der Spieler mit den meisten Wissenspunkten gewinnt.`
    }
  ];

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
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Schnellstart</h1>
        <p className="text-slate-400 mb-8">Verstehe {game.title} in 5 Minuten</p>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
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
                  <span className="font-semibold text-lg">{step.title}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    expandedStep === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedStep === idx && (
                <div className="px-6 py-4 bg-slate-700/30 border-t border-slate-700">
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {step.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Step */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700 rounded-lg">
          <p className="text-sm text-slate-400 mb-4">Bereit zum Spielen?</p>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-semibold"
          >
            <span>Zurück zur Übersicht</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
