import { useState } from 'react';
import { Calendar, TrendingUp, Lightbulb } from 'lucide-react';

const MOCK_OBSERVATIONS = [
  {
    date: '2025-01-23',
    activity: 'Häkeln',
    context: 'tagsüber, allein',
    observation: 'angenehm und fokussierend',
    energy: 2,
    notes: 'Finger wurden etwas müde'
  },
  {
    date: '2025-01-22',
    activity: 'Spaziergang',
    context: 'abends, allein',
    observation: 'erfrischend und klar',
    energy: 2,
    notes: 'war überraschend hilfreich'
  },
  {
    date: '2025-01-20',
    activity: 'Dorfromantik',
    context: 'mit Partner',
    observation: 'entspannt und verbindend',
    energy: 3,
    notes: ''
  }
];

const MOCK_PATTERNS = [
  {
    id: 1,
    description: 'Aktivitäten mit wenig Zeitdruck wurden in 4 von 5 dokumentierten Situationen mit niedriger Energie als angenehm beschrieben.',
    dataPoints: 5,
    confidence: '80%',
    actions: ['trifft zu', 'trifft teilweise zu', 'trifft nicht zu']
  },
  {
    id: 2,
    description: 'Nach kooperativen Spielen beschreibst du dich häufiger als "verbunden" als nach Solo-Aktivitäten.',
    dataPoints: 8,
    confidence: '65%',
    actions: ['trifft zu', 'trifft teilweise zu', 'trifft nicht zu']
  }
];

export default function EntwicklungPage() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedPattern, setSelectedPattern] = useState(null);

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-deep-navy mb-2">Entwicklung</h1>
          <p className="text-anthrazit">deine Beobachtungen und erkannten Muster, ohne Bewertung</p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 border-b border-border-light pb-3">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 font-medium text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'border-deep-navy text-deep-navy'
                : 'border-transparent text-gray-500 hover:text-anthrazit'
            }`}
          >
            <Calendar size={18} />
            Zeitstrahl
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 font-medium text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === 'patterns'
                ? 'border-deep-navy text-deep-navy'
                : 'border-transparent text-gray-500 hover:text-anthrazit'
            }`}
          >
            <TrendingUp size={18} />
            Muster
          </button>
        </div>

        {/* Timeline view */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {MOCK_OBSERVATIONS.length === 0 ? (
              <div className="neuroplay-card p-8 text-center">
                <p className="text-anthrazit font-medium mb-1">Noch keine Beobachtungen</p>
                <p className="text-sm text-gray-500">Führe Aktivitäten durch und notiere deine Beobachtungen.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {MOCK_OBSERVATIONS.map((obs, i) => (
                  <div key={i} className="neuroplay-card p-4 relative">
                    <div className="absolute left-4 top-4 w-3 h-3 bg-gold rounded-full" />
                    <div className="ml-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-anthrazit">{obs.activity}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(obs.date).toLocaleDateString('de-DE', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })} · {obs.context}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="inline-block px-3 py-1 bg-light-gray rounded text-xs font-medium text-anthrazit">
                            Energie {obs.energy}/5
                          </div>
                        </div>
                      </div>

                      <p className="text-anthrazit font-medium my-2">„{obs.observation}"</p>

                      {obs.notes && (
                        <p className="text-sm text-gray-600 border-l-2 border-petrol pl-3 py-1 mt-3">
                          {obs.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Patterns view */}
        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {MOCK_PATTERNS.length === 0 ? (
              <div className="neuroplay-card p-8 text-center">
                <p className="text-anthrazit font-medium mb-1">Noch nicht genug Beobachtungen</p>
                <p className="text-sm text-gray-500">Nutze mehr Aktivitäten, um Muster zu erkennen.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {MOCK_PATTERNS.map(pattern => (
                  <div key={pattern.id} className="neuroplay-card p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb size={20} className="text-gold flex-shrink-0 mt-0.5" />
                      <p className="text-anthrazit leading-relaxed flex-1">{pattern.description}</p>
                    </div>

                    <div className="flex gap-4 text-xs text-gray-500 border-t border-border-light pt-3">
                      <span>basierend auf {pattern.dataPoints} Beobachtungen</span>
                      <span>Sicherheit: {pattern.confidence}</span>
                    </div>

                    <div className="space-y-2 border-t border-border-light pt-3">
                      <p className="text-sm font-medium text-anthrazit">Trifft das zu?</p>
                      <div className="flex gap-2 flex-wrap">
                        {pattern.actions.map(action => (
                          <button
                            key={action}
                            onClick={() => setSelectedPattern(pattern.id)}
                            className="px-3 py-2 bg-light-gray hover:bg-gold hover:text-white text-anthrazit text-xs font-medium rounded transition"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reflection section */}
        <div className="border-t border-border-light pt-6 mt-8">
          <h2 className="text-lg font-bold text-deep-navy mb-3">Deine Beobachtungen hinzufügen</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-anthrazit mb-2">
                Was hast du gerade getan?
              </label>
              <input
                type="text"
                placeholder="z.B. Häkeln, Lesen, Spaziergang..."
                className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-anthrazit mb-2">
                Wie war deine Erfahrung?
              </label>
              <textarea
                placeholder="z.B. angenehm, fokussierend, erfrischend, anstrengend..."
                className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:border-gold text-sm h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-anthrazit mb-2">
                Weitere Notizen (optional)
              </label>
              <textarea
                placeholder="z.B. wer war dabei, wie lange gedauert, besonderheiten..."
                className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:border-gold text-sm h-16 resize-none"
              />
            </div>

            <button className="w-full neuroplay-btn-primary py-2 rounded-lg font-semibold">
              Beobachtung speichern
            </button>
          </div>
        </div>

        {/* Important note */}
        <div className="neuroplay-warning flex gap-2">
          <span className="text-xl">📌</span>
          <p className="text-sm text-anthrazit">
            Diese Seite zeigt, was du beobachtet hast – keine Diagnose, keine Bewertung. Muster können sinnvolle Hinweise geben, aber Menschen sind vielfältig und veränderlich.
          </p>
        </div>
      </div>
    </div>
  );
}
