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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--nw-bg-primary)', color: 'var(--nw-text-primary)' }}>
      {/* Header */}
      <div className="border-b p-4" style={{ borderColor: 'var(--nw-border)' }}>
        <button
          onClick={onBack}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nw-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--nw-secondary)'}
          className="transition-colors text-sm flex items-center gap-2"
          style={{ color: 'var(--nw-secondary)' }}
        >
          ← Zurück
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--nw-primary)' }}>Schnellstart</h1>
        <p className="mb-8" style={{ color: 'var(--nw-text-secondary)' }}>Verstehe {game.title} in 5 Minuten</p>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: 'var(--nw-surface)',
                borderColor: 'var(--nw-border)',
                borderWidth: '1px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--nw-secondary)';
                e.currentTarget.style.boxShadow = 'var(--nw-shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--nw-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
                onMouseEnter={(e) => {
                  const bg = e.currentTarget.closest('div');
                  bg.style.backgroundColor = 'rgba(0, 140, 168, 0.05)';
                }}
                onMouseLeave={(e) => {
                  const bg = e.currentTarget.closest('div');
                  bg.style.backgroundColor = 'var(--nw-surface)';
                }}
                className="w-full px-6 py-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm text-white" style={{ backgroundColor: 'var(--nw-primary)' }}>
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-lg" style={{ color: 'var(--nw-primary)' }}>{step.title}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedStep === idx ? 'rotate-180' : ''
                  }`}
                  style={{ color: 'var(--nw-text-secondary)' }}
                />
              </button>

              {expandedStep === idx && (
                <div className="px-6 py-4 border-t" style={{ backgroundColor: 'rgba(0, 140, 168, 0.05)', borderColor: 'var(--nw-border)' }}>
                  <p className="whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--nw-text-secondary)' }}>
                    {step.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Step */}
        <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: 'rgba(0, 140, 168, 0.08)', borderColor: 'var(--nw-secondary)', borderWidth: '1px' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--nw-text-secondary)' }}>Bereit zum Spielen?</p>
          <button
            onClick={onBack}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nw-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--nw-secondary)'}
            className="flex items-center gap-2 transition-colors font-semibold"
            style={{ color: 'var(--nw-secondary)' }}
          >
            <span>Zurück zur Übersicht</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
