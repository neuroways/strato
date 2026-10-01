import { useState } from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';

const COACH_OPTIONS = [
  { id: 'learn', label: 'Aktivität kennenlernen', icon: '📖', color: 'bg-violet' },
  { id: 'prepare', label: 'vorbereiten', icon: '🎯', color: 'bg-petrol' },
  { id: 'start', label: 'starten', icon: '▶️', color: 'bg-gold' },
  { id: 'rule', label: 'Regel nachschlagen', icon: '❓', color: 'bg-deep-navy' },
  { id: 'continue', label: 'fortsetzen', icon: '🔄', color: 'bg-gold' },
  { id: 'strategy', label: 'Strategie verstehen', icon: '💡', color: 'bg-petrol' }
];

const COACH_FLOWS = {
  learn: {
    title: 'Aktivität kennenlernen',
    steps: [
      {
        type: 'info',
        title: 'Was ist diese Aktivität?',
        content: 'Häkeln ist das Verwandeln von Garn in Maschen mit einem Häkelhaken. Rhythmisch, beruhigend, mit klarem Anfang und Ende.',
        level: 'Was passiert jetzt?'
      },
      {
        type: 'info',
        title: 'Warum könnte es für dich passen?',
        content: 'Du brauchst Ruhe und wenig Zeitdruck. Häkeln gibt dir eine wiederholte, sichere Bewegung, bei der du schnell ein Ergebnis siehst.',
        level: 'Warum passiert das?'
      },
      {
        type: 'question',
        title: 'Magst du mit Materialien arbeiten?',
        options: ['ja, gerne', 'neutral', 'eher nicht'],
        level: 'Welche Möglichkeit könnte sinnvoll sein?'
      },
      {
        type: 'suggestion',
        title: 'Suggestion',
        content: 'Wenn du gerne mit Materialien arbeitest und Struktur magst, könnte Häkeln genau das Richtige sein. Die Lernkurve ist mild: erste Maschen in 10 Min, dann stetig verfügbar.',
        cta: 'Material checken und vorbereiten'
      }
    ]
  },

  prepare: {
    title: 'Aktivität vorbereiten',
    steps: [
      {
        type: 'checklist',
        title: 'Was du brauchst',
        items: [
          { label: 'Häkelhaken (Größe 3–5)', checked: false },
          { label: 'Garn in gewählter Farbe', checked: false },
          { label: 'flache, stabile Arbeitsfläche', checked: false }
        ],
        level: 'Was passiert jetzt?'
      },
      {
        type: 'info',
        title: 'Erste Schritte',
        content: 'Leg dein Material bereit. Fang mit einfachen Luftmaschen an – das ist die Grundlage für alles andere.',
        level: 'Warum passiert das?'
      },
      {
        type: 'suggestion',
        title: 'Bereit zu starten?',
        content: 'Wenn alles da ist, kannst du anfangen. Plane etwa 10 Min für die ersten Maschen ein.',
        cta: 'Jetzt starten'
      }
    ]
  },

  rule: {
    title: 'Regel oder Frage',
    steps: [
      {
        type: 'question',
        title: 'Welche Regel brauchst du?',
        options: [
          'Wie mache ich eine Luftmasche?',
          'Wie mache ich eine feste Masche?',
          'Wie beginne ich eine neue Reihe?',
          'Wie beende ich ordnungsgemäß?',
          'etwas anderes'
        ],
        level: 'Was passiert jetzt?'
      }
    ]
  }
};

export default function CoachPage() {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  if (!selectedFlow) {
    return (
      <div className="flex-1 md:flex-none pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-deep-navy mb-2">Coach</h1>
            <p className="text-anthrazit">Lass dich durch die Aktivität führen.</p>
          </div>

          {/* Coach options */}
          <div className="space-y-3">
            {COACH_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedFlow(option.id);
                  setCurrentStep(0);
                }}
                className="w-full neuroplay-card p-4 flex items-center gap-4 hover:shadow-md transition group"
              >
                <div className={`text-3xl ${option.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  {option.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-anthrazit group-hover:text-deep-navy transition">
                    {option.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Schritt-für-Schritt-Anleitung</p>
                </div>
                <ChevronRight className="text-gold group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          {/* Freetext option */}
          <div className="neuroplay-card p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="text-2xl">💬</div>
              <div className="flex-1">
                <p className="font-medium text-anthrazit">Freie Frage</p>
                <p className="text-xs text-gray-500">Wenn eine der obigen Optionen nicht passt</p>
              </div>
            </label>
            <input
              type="text"
              placeholder="Schreib deine Frage..."
              className="w-full mt-3 px-3 py-2 border border-border-light rounded-lg text-sm focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>
    );
  }

  const flow = COACH_FLOWS[selectedFlow];
  if (!flow) return null;

  const step = flow.steps[currentStep];

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Back button */}
        <button
          onClick={() => {
            setSelectedFlow(null);
            setCurrentStep(0);
          }}
          className="text-petrol hover:text-deep-navy transition font-medium flex items-center gap-1 text-sm"
        >
          ← Zurück zu den Optionen
        </button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-deep-navy mb-2">{flow.title}</h1>
          <p className="text-anthrazit text-sm">
            Schritt {currentStep + 1} von {flow.steps.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-light-gray rounded-full h-2">
          <div
            className="bg-gold h-2 rounded-full transition-all"
            style={{
              width: `${((currentStep + 1) / flow.steps.length) * 100}%`
            }}
          />
        </div>

        {/* Step content */}
        <div className="space-y-4">
          {step.type === 'info' && (
            <>
              <div className="neuroplay-card p-4 bg-light-gray border-l-4 border-gold">
                <p className="text-xs font-bold text-gold uppercase">{step.level}</p>
                <h2 className="text-lg font-bold text-anthrazit mt-2 mb-2">{step.title}</h2>
                <p className="text-anthrazit leading-relaxed">{step.content}</p>
              </div>
            </>
          )}

          {step.type === 'question' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-anthrazit">{step.title}</h2>
              <p className="text-xs font-bold text-petrol uppercase">{step.level}</p>
              <div className="space-y-2">
                {step.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (currentStep < flow.steps.length - 1) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                    className="w-full neuroplay-card p-4 text-left hover:shadow-md transition hover:bg-light-gray font-medium text-anthrazit"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step.type === 'checklist' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-anthrazit">{step.title}</h2>
              <p className="text-xs font-bold text-petrol uppercase">{step.level}</p>
              <div className="space-y-2">
                {step.items.map((item, i) => (
                  <label key={i} className="neuroplay-card p-4 flex items-center gap-3 cursor-pointer hover:bg-light-gray transition">
                    <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 rounded" />
                    <span className="font-medium text-anthrazit">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step.type === 'suggestion' && (
            <>
              <div className="neuroplay-card p-4 bg-petrol/10 border-l-4 border-petrol">
                <h2 className="text-lg font-bold text-anthrazit mb-2">{step.title}</h2>
                <p className="text-anthrazit leading-relaxed">{step.content}</p>
              </div>
              <button className="w-full neuroplay-btn-primary py-3 rounded-lg font-semibold">
                {step.cta}
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 neuroplay-btn-secondary py-2 rounded-lg font-medium"
            >
              Zurück
            </button>
          )}
          {currentStep < flow.steps.length - 1 && step.type !== 'question' && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex-1 neuroplay-btn-primary py-2 rounded-lg font-medium"
            >
              Weiter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
