import { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import EnergyScale from '../components/EnergyScale';

const NEEDS = [
  'Ruhe', 'Fokus', 'Verbindung', 'Kreativität',
  'Bewegung', 'Herausforderung', 'Struktur', 'Abwechslung'
];

const TIME_OPTIONS = [
  'unter 10 Min', '10–20 Min', '20–45 Min', '45–90 Min', 'über 90 Min', 'offen'
];

const SOCIAL_OPTIONS = [
  'allein', 'zu zweit', 'Familie', 'Freunde', 'Gruppe', 'offen'
];

const MOCK_ACTIVITIES = {
  low_energy_short: {
    id: 'haekeln',
    name: 'Häkeln',
    type: 'kreativ',
    duration: '20–45 Min',
    vibe: 'ruhig · kreativ · allein',
    why: [
      'du Ruhe ausgewählt hast',
      'wenig Zeitdruck entsteht',
      'keine Regeln oder Ausreden nötig',
      'bekannte, einfache Abläufe'
    ],
    fit: 85
  },
  low_energy_medium: {
    id: 'dorfromantik',
    name: 'Dorfromantik',
    type: 'Brettspiel',
    duration: '30–45 Min',
    vibe: 'ruhig · kooperativ · wenig Zeitdruck',
    why: [
      'du Ruhe ausgewählt hast',
      'wenig Wettbewerbsdruck entsteht',
      'überschaubare Schritte',
      'angenehm erlebt in letzter Zeit'
    ],
    fit: 78
  }
};

const ALTERNATIVES = [
  { id: '1', name: 'Puzzle', type: 'kreativ', duration: '30–120 Min' },
  { id: '2', name: 'Spaziergang', type: 'Bewegung', duration: 'offen' },
  { id: '3', name: 'Lesen', type: 'Ruhe', duration: 'offen' }
];

const RECENT_ACTIVITY = {
  name: 'Café del Gatto',
  duration: 'gestern 20 Min',
  status: 'abgeschlossen',
  next: 'Getränke servieren lernen'
};

export default function HeutePage() {
  const [selectedNeeds, setSelectedNeeds] = useState(['Ruhe']);
  const [energy, setEnergy] = useState(2);
  const [time, setTime] = useState('20–45 Min');
  const [social, setSocial] = useState('allein');
  const [checkinComplete, setCheckinComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const toggleNeed = (need) => {
    setSelectedNeeds(prev =>
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  const getRecommendation = () => {
    if (energy <= 2 && time.includes('45')) {
      return MOCK_ACTIVITIES.low_energy_medium;
    }
    return MOCK_ACTIVITIES.low_energy_short;
  };

  const recommendation = getRecommendation();

  if (!checkinComplete) {
    return (
      <div className="flex-1 md:flex-none pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-navy">Guten Morgen</h1>
            <p className="text-anthrazit mt-1">Lass uns schauen, was gerade zu dir passt.</p>
          </div>

          {/* Skip option */}
          <div className="flex gap-2">
            <button
              onClick={() => setCheckinComplete(true)}
              className="text-sm text-petrol underline hover:text-deep-navy transition"
            >
              Check-in überspringen
            </button>
          </div>

          {/* Needs selection */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-deep-navy">
              Was brauchst du gerade?
            </label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {NEEDS.map(need => (
                <button
                  key={need}
                  onClick={() => toggleNeed(need)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedNeeds.includes(need)
                      ? 'bg-deep-navy text-white'
                      : 'bg-light-gray text-anthrazit hover:bg-gold hover:text-white'
                  }`}
                >
                  {need}
                </button>
              ))}
            </div>
          </div>

          {/* Energy level */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-deep-navy">
              Wie viel Energie hast du gerade?
            </label>
            <EnergyScale value={energy} onChange={setEnergy} />
          </div>

          {/* Time available */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-deep-navy">
              Wie viel Zeit hast du?
            </label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {TIME_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setTime(opt)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    time === opt
                      ? 'bg-petrol text-white'
                      : 'bg-light-gray text-anthrazit hover:bg-border-light'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Social situation */}
          <div className="space-y-3">
            <label className="block text-lg font-medium text-deep-navy">
              Allein oder mit anderen?
            </label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {SOCIAL_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSocial(opt)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    social === opt
                      ? 'bg-violet text-white'
                      : 'bg-light-gray text-anthrazit hover:bg-border-light'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={() => setCheckinComplete(true)}
            className="w-full neuroplay-btn-primary py-3 text-lg font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-petrol"
          >
            Zur Empfehlung
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 md:flex-none pb-20 md:pb-0 ${focusMode ? 'focus-mode' : ''}`}>
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header with focus mode toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-navy">Empfehlung</h1>
            <p className="text-anthrazit text-sm mt-1">basiert auf deinen Angaben</p>
          </div>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`px-3 py-1 rounded text-xs font-medium transition ${
              focusMode
                ? 'bg-deep-navy text-white'
                : 'bg-light-gray text-anthrazit hover:bg-border-light'
            }`}
          >
            {focusMode ? 'Fokus aus' : 'Fokus'}
          </button>
        </div>

        {/* Main recommendation */}
        <RecommendationCard activity={recommendation} />

        {/* Explanation toggle */}
        <div>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-petrol font-medium hover:text-deep-navy transition text-sm"
          >
            <HelpCircle size={18} />
            {showExplanation ? 'Begründung ausblenden' : 'Warum diese Empfehlung?'}
          </button>
          {showExplanation && (
            <div className="neuroplay-explanation mt-3">
              <p className="font-medium text-anthrazit mb-2">Diese Aktivität könnte passen, weil:</p>
              <ul className="space-y-1 text-anthrazit">
                {recommendation.why.map((reason, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Alternatives */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-deep-navy">Alternativen</h2>
          <div className="space-y-2">
            {ALTERNATIVES.map(alt => (
              <div
                key={alt.id}
                className="neuroplay-card p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              >
                <div>
                  <p className="font-medium text-anthrazit">{alt.name}</p>
                  <p className="text-xs text-gray-500">{alt.type} · {alt.duration}</p>
                </div>
                <ChevronRight size={20} className="text-gold" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="neuroplay-card p-4 bg-petrol/10 border-l-4 border-petrol">
          <p className="text-sm font-medium text-petrol mb-1">Zuletzt angefangen</p>
          <p className="font-medium text-anthrazit">{RECENT_ACTIVITY.name}</p>
          <p className="text-xs text-gray-500 mt-1">{RECENT_ACTIVITY.duration}</p>
          <button className="mt-2 text-sm font-medium text-petrol hover:text-deep-navy transition">
            Fortsetzen: {RECENT_ACTIVITY.next} →
          </button>
        </div>

        {/* Reflection prompt */}
        <div className="neuroplay-card p-4 bg-violet/10 border-l-4 border-violet">
          <p className="text-sm font-medium text-violet mb-2">Schnelle Reflexion</p>
          <p className="text-anthrazit text-sm">Wie hast du die letzte Aktivität erlebt?</p>
          <button className="mt-2 text-sm font-medium text-violet hover:text-deep-navy transition">
            Kurze Notiz eintragen →
          </button>
        </div>

        {/* Check-in edit */}
        <button
          onClick={() => setCheckinComplete(false)}
          className="w-full neuroplay-btn-secondary py-2 text-sm rounded-lg"
        >
          Check-in ändern
        </button>
      </div>
    </div>
  );
}
