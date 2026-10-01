import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, HelpCircle, Eye, AlertCircle } from 'lucide-react';

const ACTIVITY_DETAILS = {
  haekeln: {
    name: 'Häkeln',
    type: 'kreativ',
    duration: '20–45 Min',
    minPeople: 1,
    maxPeople: 1,
    description: 'Das Umwandeln von Garn in Maschen mit einem Häkelhaken. Eine rhythmische, beruhigende Aktivität mit klarem Anfang und Ende.',
    image: '🧶',
    
    overview: {
      materials: ['Häkelhaken (Größe 3–5)', 'Garn in gewählter Farbe'],
      difficulty: 'variabel: von einfach (Luftmaschenkette) bis komplex (mehrfarbige Muster)',
      ageRange: 'ab ca. 8 Jahren',
      learningCurve: 'erste Grundmaschen: 10–20 Min, dann stetig verfügbar'
    },

    passTome: {
      intro: 'Diese Aktivität passt zu deiner aktuellen Situation, wenn:',
      fits: [
        'du wenig Energie hast und eine beruhigende, strukturierte Tätigkeit brauchst',
        'du allein sein möchtest und dabei aktiv sein kannst',
        'du Fokus auf einen kleinen, wiederholten Bewegungsablauf brauchst',
        'du schnell ein visuelles Ergebnis sehen möchtest'
      ],
      challenges: [
        'erfordert etwas manuelle Feinmotorik und Konzentration',
        'kann frustrierend sein, wenn Maschen herausfallen (löst sich aber)',
        'braucht Material zum Einstieg'
      ]
    },

    learn: {
      currentKnowledge: 'Grundmaschen (Luftmasche, Kettmasche)',
      openTopics: ['Feste Maschen', 'Stäbchen-Varianten', 'Zunahmen und Abnahmen'],
      nextStep: 'Feste Maschen üben in einer einfachen Übungskette'
    },

    procedure: {
      preparation: ['Garn und Häkelhaken bereitlegen', 'eine flache, stabile Arbeitsfläche wählen'],
      coreLoop: [
        'Luftmaschen-Kette zur Ausgangslänge häkeln',
        'in die 2. Masche von vorne einstechen',
        'dieselbe Maschenart wiederholen über die gesamte Kette',
        'am Ende die Fadenenden vernähen'
      ],
      variants: [
        'Schnelle Übung: einfache Luftmaschenkette, 10 Min',
        'Projekt: ein einfaches Tuch oder Band, 30–120 Min',
        'Muster: Farbwechsel, Musterrapporte'
      ]
    },

    effects: {
      possible: [
        { effect: 'Entspannung und Stressabbau', certainty: 'häufig beobachtet' },
        { effect: 'verbesserte Handkoordination', certainty: 'wechselnd' },
        { effect: 'ein Gefühl von Fortschritt und Erfüllung', certainty: 'wenn Maschen gelingen' }
      ],
      basedOnYou: 'du hast diese Aktivität in 3 ähnlichen Situationen als angenehm beschrieben'
    },

    sources: {
      reference: 'Yoga for Crafts: Therapeutic Fiber Arts',
      status: 'validiert',
      uncertainties: ['genaue Lernkurve hängt vom Material und Händigkeit ab']
    }
  },

  dorfromantik: {
    name: 'Dorfromantik',
    type: 'Brettspiel',
    duration: '30–45 Min',
    minPeople: 1,
    maxPeople: 4,
    description: 'Ein kooperatives Spiel, bei dem ihr gemeinsam ein Dorf aufbaut. Wenig Konflikt, klare Abläufe, reizarm.',
    image: '🏘️',
    
    overview: {
      materials: ['Spielbrett', 'Landschaftskarten', '100 Dorfplättchen', 'Wertungsblock'],
      difficulty: 'einfach bis mittelmäßig: 1–2 Runden zum Lernen, dann fließend',
      ageRange: 'ab ca. 8 Jahren',
      learningCurve: 'Regeln verstanden: 5 Min, Strategie: 2–3 Runden'
    },

    passTome: {
      intro: 'Passt zu deiner Situation, wenn:',
      fits: [
        'du mittlere bis niedrige Energie hast',
        'du gemeinsam spielen möchtest, ohne hohen Druck',
        'du klare, wiederholte Abläufe magst',
        'du mit Familie oder Freunden zusammen sein willst'
      ],
      challenges: [
        'benötigt einen flachen, stabilen Tisch',
        'braucht Platz für Spielbrett und Kartenstapel',
        'kann monoton wirken, wenn die Strategie zu vorhersehbar ist'
      ]
    },

    learn: {
      currentKnowledge: 'Grund- und Erweiterungsregeln',
      openTopics: ['Strategische Platzierung', 'Wertungsoptimierung'],
      nextStep: 'Eine Runde spielen und dabei auf Musterplatzierung achten'
    },

    procedure: {
      preparation: ['Spielbrett aufbauen', 'Kartenstapel mischen', '1–2 Min'],
      coreLoop: [
        '1. Die nächste Karte aufdecken',
        '2. Gemeinsam beschließen, wo die Karte passt',
        '3. Karte platzieren, ggf. Dorfplättchen setzen',
        '4. Nächste Person oder nächste Runde'
      ],
      variants: [
        'Solo: gegen die Hälfte der Kartenstapel spielen',
        'Kooperativ: gegen einen Kartenstapel spielen',
        'Versuch: Rekord-Wertung erreichen'
      ]
    },

    effects: {
      possible: [
        { effect: 'Gemeinschaftliches Erfolgserlebnis', certainty: 'wenn die Gruppe zusammenhält' },
        { effect: 'entspannte Zeit gemeinsam', certainty: 'sehr häufig beobachtet' },
        { effect: 'sanfte Strategieschärfung', certainty: 'auf lange Sicht' }
      ],
      basedOnYou: 'du hast dieses Spiel zuletzt als angenehm beschrieben'
    },

    sources: {
      reference: 'Pegasus Spiele, Dorfromantik – Originalanleitung',
      status: 'validiert',
      uncertainties: []
    }
  }
};

export default function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const activity = ACTIVITY_DETAILS[id] || ACTIVITY_DETAILS.haekeln;

  const tabs = [
    { id: 'overview', label: 'Überblick' },
    { id: 'passTome', label: 'Passt zu mir' },
    { id: 'learn', label: 'Lernen' },
    { id: 'procedure', label: 'Ablauf' },
    { id: 'effects', label: 'Wirkung' },
    { id: 'sources', label: 'Quellen' }
  ];

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="sticky top-0 bg-white border-b border-border-light p-4 md:p-6 flex items-center gap-3 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-light-gray rounded-lg transition text-deep-navy"
            aria-label="Zurück"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-deep-navy">{activity.name}</h1>
            <p className="text-sm text-gray-500">{activity.type} · {activity.duration}</p>
          </div>
        </div>

        {/* Hero image/emoji */}
        <div className="bg-light-gray p-8 md:p-12 text-center text-6xl md:text-8xl">
          {activity.image}
        </div>

        {/* Description */}
        <div className="p-4 md:p-6 border-b border-border-light">
          <p className="text-anthrazit leading-relaxed">{activity.description}</p>
        </div>

        {/* Tab navigation */}
        <div className="border-b border-border-light overflow-x-auto">
          <div className="flex gap-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-deep-navy text-deep-navy'
                    : 'border-transparent text-gray-500 hover:text-anthrazit'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Überblick */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-deep-navy mb-3">Grundinformationen</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="neuroplay-card p-3">
                    <p className="text-xs text-gray-500 uppercase">Dauer</p>
                    <p className="font-medium text-anthrazit">{activity.duration}</p>
                  </div>
                  <div className="neuroplay-card p-3">
                    <p className="text-xs text-gray-500 uppercase">Personen</p>
                    <p className="font-medium text-anthrazit">
                      {activity.minPeople}–{activity.maxPeople}
                    </p>
                  </div>
                  <div className="neuroplay-card p-3">
                    <p className="text-xs text-gray-500 uppercase">Alter</p>
                    <p className="font-medium text-anthrazit">{activity.overview.ageRange}</p>
                  </div>
                  <div className="neuroplay-card p-3">
                    <p className="text-xs text-gray-500 uppercase">Schwierigkeit</p>
                    <p className="font-medium text-anthrazit">variabel</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-2">Was du brauchst</h3>
                <ul className="space-y-2">
                  {activity.overview.materials.map((mat, i) => (
                    <li key={i} className="flex gap-2 text-anthrazit">
                      <span className="text-gold">•</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-2">Lernaufwand</h3>
                <p className="text-anthrazit">{activity.overview.learningCurve}</p>
              </div>
            </div>
          )}

          {/* Passt zu mir */}
          {activeTab === 'passTome' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-deep-navy mb-3">{activity.passTome.intro}</h2>
                <ul className="space-y-2">
                  {activity.passTome.fits.map((fit, i) => (
                    <li key={i} className="flex gap-2 text-anthrazit">
                      <span className="text-petrol">✓</span>
                      <span>{fit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-3">Das könnte anstrengend sein</h3>
                <ul className="space-y-2">
                  {activity.passTome.challenges.map((challenge, i) => (
                    <li key={i} className="flex gap-2 text-anthrazit">
                      <span className="text-violet">◆</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="neuroplay-explanation">
                <p className="font-medium text-anthrazit mb-1">Diese Einschätzung basiert auf:</p>
                <p className="text-anthrazit">deinen aktuellen Angaben (niedrige Energie, 20–45 Min, allein)</p>
              </div>
            </div>
          )}

          {/* Lernen */}
          {activeTab === 'learn' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-2">Was du bereits weißt</h3>
                <p className="text-anthrazit">{activity.learn.currentKnowledge}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-3">Offene Themen</h3>
                <ul className="space-y-2">
                  {activity.learn.openTopics.map((topic, i) => (
                    <li key={i} className="neuroplay-card p-3">
                      <p className="font-medium text-anthrazit">{topic}</p>
                      <p className="text-xs text-gray-500 mt-1">nächster Schritt im Lernpfad</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="neuroplay-card p-4 bg-violet/10 border-l-4 border-violet">
                <p className="font-medium text-violet mb-1">Nächster Schritt</p>
                <p className="text-anthrazit">{activity.learn.nextStep}</p>
              </div>
            </div>
          )}

          {/* Ablauf */}
          {activeTab === 'procedure' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-3">Vorbereitung</h3>
                <ol className="space-y-2">
                  {activity.procedure.preparation.map((step, i) => (
                    <li key={i} className="flex gap-3 text-anthrazit">
                      <span className="font-bold text-deep-navy min-w-fit">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-3">Kernschleife</h3>
                <ol className="space-y-2">
                  {activity.procedure.coreLoop.map((step, i) => (
                    <li key={i} className="flex gap-3 text-anthrazit">
                      <span className="font-bold text-petrol min-w-fit">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-3">Varianten</h3>
                <ul className="space-y-2">
                  {activity.procedure.variants.map((variant, i) => (
                    <li key={i} className="neuroplay-card p-3">
                      <p className="font-medium text-anthrazit">{variant}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Wirkung */}
          {activeTab === 'effects' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-deep-navy mb-3">Mögliche Wirkungen</h2>
                <p className="text-sm text-gray-600 mb-3">basierend auf Beobachtungen anderer:</p>
                <ul className="space-y-2">
                  {activity.effects.possible.map((eff, i) => (
                    <li key={i} className="neuroplay-card p-3">
                      <p className="font-medium text-anthrazit">{eff.effect}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Status: {eff.certainty}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="neuroplay-explanation">
                <p className="font-medium text-anthrazit mb-1">Basierend auf deinen Beobachtungen:</p>
                <p className="text-anthrazit">{activity.effects.basedOnYou}</p>
              </div>

              <div className="neuroplay-warning flex gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Wirkungen sind persönlich und hängen von vielen Bedingungen ab. Dies sind keine medizinischen Aussagen.
                </p>
              </div>
            </div>
          )}

          {/* Quellen */}
          {activeTab === 'sources' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-2">Quelle</h3>
                <p className="text-anthrazit">{activity.sources.reference}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-deep-navy mb-2">Prüfstatus</h3>
                <p className="text-anthrazit">{activity.sources.status}</p>
              </div>

              {activity.sources.uncertainties.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-deep-navy mb-2">Bekannte Unsicherheiten</h3>
                  <ul className="space-y-1">
                    {activity.sources.uncertainties.map((unc, i) => (
                      <li key={i} className="flex gap-2 text-anthrazit text-sm">
                        <span className="text-gold">⚠</span>
                        <span>{unc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="p-4 md:p-6 border-t border-border-light space-y-2">
          <button className="w-full neuroplay-btn-primary py-3 rounded-lg font-semibold">
            Aktivität starten
          </button>
          <button className="w-full neuroplay-btn-secondary py-2 rounded-lg font-medium">
            Zu Favoriten hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
}
