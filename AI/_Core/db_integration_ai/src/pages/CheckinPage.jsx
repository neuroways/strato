import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router';
import { pb } from '../lib/pb';

const STEPS = [
  { id: 'needs', label: 'Bedürfnis' },
  { id: 'energy', label: 'Energie' },
  { id: 'time', label: 'Zeit' },
  { id: 'social', label: 'Personen' },
  { id: 'intensity', label: 'Intensität' },
  { id: 'conditions', label: 'Bedingungen' },
  { id: 'summary', label: 'Übersicht' },
];

export default function CheckinPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [needs, setNeeds] = useState([]);
  const [formData, setFormData] = useState({
    selectedNeeds: [],
    energy: null,
    time: null,
    social: null,
    intensity: null,
    location: null,
    noise: null,
    screen: null,
    materials: null,
    context: '',
  });

  useEffect(() => {
    setIsLoggedIn(pb.authStore.isValid);
    fetchNeeds();
  }, []);

  const fetchNeeds = async () => {
    // Fallback-Daten mit echten IDs aus der Datenbank
    const fallbackNeeds = [
      { id: '7lntjce2xvpfyry', name: 'Ruhe', description: 'Erholung und Entspannung', icon: '🌿', sort_order: 1, is_active: true },
      { id: 'zdwdejv40qsccfx', name: 'Fokus', description: 'Konzentration und Klarheit', icon: '🎯', sort_order: 2, is_active: true },
      { id: 'twnw6e8zzi3rti0', name: 'Aktivierung', description: 'Energie und Bewegung', icon: '⚡', sort_order: 3, is_active: true },
      { id: '32laishlq1tp3gn', name: 'Verbindung', description: 'Sozialer Kontakt und Nähe', icon: '🤝', sort_order: 4, is_active: true },
      { id: 'qmgesqmkwe67jd7', name: 'Kreativität', description: 'Schöpferischer Ausdruck', icon: '🎨', sort_order: 5, is_active: true },
      { id: '8uxryzv26u5iylx', name: 'Bewegung', description: 'Körperliche Aktivität', icon: '🚶', sort_order: 6, is_active: true },
      { id: 't5eo87s75lbn4z4', name: 'Struktur', description: 'Klare Abläufe und Ordnung', icon: '📋', sort_order: 7, is_active: true },
      { id: 'r52afbkxm0m5t2d', name: 'Herausforderung', description: 'Neues lernen und wachsen', icon: '🎪', sort_order: 8, is_active: true },
      { id: 'w9dt97o6ncsoq3h', name: 'Rückzug', description: 'Zeit für sich selbst', icon: '🏠', sort_order: 9, is_active: true },
      { id: '2zxlnv9t0ksnwhm', name: 'Selbstwirksamkeit', description: 'Kompetenz und Erfolg', icon: '💪', sort_order: 10, is_active: true },
    ];

    try {
      const result = await pb.collection('npl_need_definitions').getList(1, 50, {
        sort: '+sort_order',
      });
      if (result.items && result.items.length > 0) {
        setNeeds(result.items);
        setError(null);
      } else {
        setNeeds(fallbackNeeds);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch needs:', err);
      // Stille das Laden mit echten IDs – kein sichtbarer Fehler
      setNeeds(fallbackNeeds);
      setError(null);
    }
  };

  const handleNeedToggle = (needId) => {
    setFormData(prev => ({
      ...prev,
      selectedNeeds: prev.selectedNeeds.includes(needId)
        ? prev.selectedNeeds.filter(id => id !== needId)
        : [...prev.selectedNeeds, needId],
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuickFinish = async () => {
    if (validateQuick()) {
      await saveSituation('QUICK');
    }
  };

  const validateQuick = () => {
    if (formData.selectedNeeds.length === 0) {
      setError('Bitte wähle mindestens ein Bedürfnis');
      return false;
    }
    if (formData.energy === null) {
      setError('Bitte gib deine verfügbare Energie an');
      return false;
    }
    if (formData.time === null) {
      setError('Bitte gib deine verfügbare Zeit an');
      return false;
    }
    if (formData.social === null) {
      setError('Bitte wähle deine soziale Situation');
      return false;
    }
    return true;
  };

  const validateFull = () => {
    if (!validateQuick()) return false;
    if (formData.intensity === null) {
      setError('Bitte gib die gewünschte Intensität an');
      return false;
    }
    return true;
  };

  const saveGuestCheckin = (type) => {
    try {
      if (formData.selectedNeeds.length === 0) {
        setError('Bitte wähle mindestens ein Bedürfnis aus.');
        return;
      }

      const guestCheckin = {
        version: '0.1.0',
        createdAt: new Date().toISOString(),
        checkinType: type,
        situation: {
          availableTimeMinutes: formData.time || 0,
          energyLevel: formData.energy || 3,
          desiredIntensity: formData.intensity || 3,
          participantCount: formData.social === 'alone' ? 1 : formData.social === 'two' ? 2 : 3,
          socialContext: formData.social || 'alone',
          locationType: formData.location || 'home',
          noiseLevel: formData.noise || 'normal',
          screenAllowed: formData.screen || 'any',
          availableMaterialNote: formData.materials || '',
          contextNote: formData.context || '',
        },
        needs: formData.selectedNeeds.map((needId, index) => {
          const need = needs.find(n => n.id === needId);
          return {
            needDefinitionId: needId,
            code: need?.code || null,
            name: need?.name || 'Unbekannt',
            icon: need?.icon || '?',
            priorityOrder: index + 1,
          };
        }),
        status: 'COMPLETED',
      };

      sessionStorage.setItem('neuroplay.guest.currentCheckin', JSON.stringify(guestCheckin));
      console.log('Guest checkin saved to sessionStorage:', guestCheckin);
      setError(null);
      navigate('/checkin/result');
    } catch (err) {
      console.error('Failed to save guest checkin to localStorage:', err);
      setError('Dein Browser unterstützt Datenspeicherung nicht. Versuche einen anderen Browser.');
    }
  };

  const saveSituation = async (type) => {
    setLoading(true);
    setError(null);

    // Gast: nur lokal speichern, keine API-Requests
    if (!isLoggedIn) {
      saveGuestCheckin(type);
      setLoading(false);
      return;
    }

    // Angemeldeter Benutzer: serverseitig speichern
    try {
      if (formData.selectedNeeds.length === 0) {
        setError('Bitte wähle mindestens ein Bedürfnis aus.');
        setLoading(false);
        return;
      }

      const situationData = {
        available_time_minutes: formData.time || 0,
        energy_level: formData.energy || 3,
        desired_intensity: formData.intensity || 3,
        participant_count: formData.social === 'alone' ? 1 : formData.social === 'two' ? 2 : 3,
        social_context: formData.social || 'alone',
        location_type: formData.location || 'home',
        noise_level: formData.noise || 'normal',
        screen_allowed: formData.screen || 'any',
        available_material_note: formData.materials || '',
        context_note: formData.context || '',
        user_id: pb.authStore.record.id,
      };

      console.log('Creating situation with data:', situationData);
      const situation = await pb.collection('npl_situations').create(situationData);
      console.log('Situation created:', situation.id);

      // Save situation needs
      for (let i = 0; i < formData.selectedNeeds.length; i++) {
        const needId = formData.selectedNeeds[i];
        console.log(`Creating need link ${i + 1}/${formData.selectedNeeds.length}:`, needId);
        await pb.collection('npl_situation_needs').create({
          situation_id: situation.id,
          need_definition_id: needId,
          priority_order: i + 1,
        });
      }

      // Create checkin record
      const checkinData = {
        situation_id: situation.id,
        checkin_type: type,
        status: 'COMPLETED',
        user_id: pb.authStore.record.id,
      };

      console.log('Creating checkin with data:', checkinData);
      await pb.collection('npl_checkins').create(checkinData);
      console.log('Checkin created successfully');

      navigate('/checkin/result');
    } catch (err) {
      console.error('Failed to save situation - Full error:', err);
      console.error('Error details:', err.data || err.message);

      if (err.status >= 500) {
        setError('Server-Fehler: Dein Check-in konnte nicht gespeichert werden. Versuche es später erneut.');
      } else {
        setError(`Fehler beim Speichern: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const step = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition mb-6"
        >
          <Home size={18} />
          <span className="text-sm">Zur Startseite</span>
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Deine aktuelle Situation</h1>
        <p className="text-slate-300 text-lg">
          Lass NeuroPlay verstehen, was gerade zu dir passt – kein Richtig, kein Falsch.
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-400">
            Schritt {currentStep + 1} von {STEPS.length}
          </span>
          <span className="text-sm font-semibold text-emerald-400">
            {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>

        {/* Step indicators */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${
                i === currentStep
                  ? 'bg-emerald-500 text-slate-900 font-semibold'
                  : i < currentStep
                  ? 'bg-slate-700 text-slate-300'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Step: Needs */}
        {step.id === 'needs' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Was brauchst du gerade?</h2>
              <p className="text-slate-300">
                Wähle, was im Moment am besten zu deiner Situation passt. Mehrere Antworten sind möglich.
              </p>
            </div>

            {needs.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p>Bedürfnisse werden geladen...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {needs.map(need => (
                  <button
                    key={need.id}
                    onClick={() => handleNeedToggle(need.id)}
                    className={`p-3 rounded-lg border-2 transition text-center flex flex-col items-center justify-center h-24 ${
                      formData.selectedNeeds.includes(need.id)
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{need.icon}</div>
                    <h3 className="font-bold text-xs leading-tight">{need.name}</h3>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step: Energy */}
        {step.id === 'energy' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Wie viel Energie steht dir gerade zur Verfügung?</h2>
              <p className="text-slate-300 text-sm">
                Es gibt keine richtige oder falsche Antwort. Die Angabe hilft nur dabei, die Anforderungen einer Aktivität einzuschätzen.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { value: 1, label: 'sehr wenig' },
                { value: 2, label: 'wenig' },
                { value: 3, label: 'mittel' },
                { value: 4, label: 'viel' },
                { value: 5, label: 'sehr viel' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, energy: option.value })}
                  className={`p-4 rounded-lg border-2 transition text-center ${
                    formData.energy === option.value
                      ? 'border-cyan-500 bg-cyan-500/10 font-bold'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {option.value === 1 ? '😴' : option.value === 2 ? '😐' : option.value === 3 ? '😌' : option.value === 4 ? '😊' : '⚡'}
                  </div>
                  <div className="text-sm">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Time */}
        {step.id === 'time' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Wie viel Zeit möchtest du verwenden?</h2>
            </div>

            <div className="space-y-3">
              {[
                { value: 5, label: 'unter 10 Minuten' },
                { value: 15, label: '10 bis 20 Minuten' },
                { value: 30, label: '20 bis 45 Minuten' },
                { value: 60, label: '45 bis 90 Minuten' },
                { value: 120, label: 'mehr als 90 Minuten' },
                { value: 0, label: 'offen' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, time: option.value })}
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    formData.time === option.value
                      ? 'border-blue-500 bg-blue-500/10 font-bold'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Social Context */}
        {step.id === 'social' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Mit wem möchtest du etwas machen?</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { value: 'alone', label: 'allein', emoji: '🧍' },
                { value: 'two', label: 'zu zweit', emoji: '👥' },
                { value: 'family', label: 'Familie', emoji: '👨‍👩‍👧' },
                { value: 'friends', label: 'Freunde', emoji: '👫' },
                { value: 'group', label: 'Gruppe', emoji: '👯' },
                { value: 'online', label: 'online', emoji: '💻' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, social: option.value })}
                  className={`p-4 rounded-lg border-2 transition text-center ${
                    formData.social === option.value
                      ? 'border-purple-500 bg-purple-500/10 font-bold'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.emoji}</div>
                  <div className="text-sm">{option.label}</div>
                </button>
              ))}
            </div>

            {currentStep === 3 && (
              <div className="flex gap-3 pt-6 border-t border-slate-700">
                <button
                  onClick={handleQuickFinish}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50"
                >
                  {loading ? 'Wird gespeichert...' : 'Jetzt Empfehlung vorbereiten'}
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 px-4 py-3 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 transition flex items-center justify-center gap-2"
                >
                  Genauer machen <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step: Intensity */}
        {step.id === 'intensity' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Wie intensiv darf es heute sein?</h2>
              <p className="text-slate-300 text-sm">
                NeuroPlay berücksichtigt Konzentration, Kommunikation, Wettbewerb, Reizintensität und Zeitdruck.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: 1, label: 'sehr ruhig' },
                { value: 2, label: 'ruhig' },
                { value: 3, label: 'ausgeglichen' },
                { value: 4, label: 'lebendig' },
                { value: 5, label: 'herausfordernd' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, intensity: option.value })}
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    formData.intensity === option.value
                      ? 'border-indigo-500 bg-indigo-500/10 font-bold'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Conditions */}
        {step.id === 'conditions' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Was soll zusätzlich berücksichtigt werden?</h2>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Ort</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { value: 'home', label: 'zu Hause' },
                  { value: 'outdoor', label: 'draußen' },
                  { value: 'mobile', label: 'unterwegs' },
                  { value: 'online', label: 'online' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, location: option.value })}
                    className={`p-3 rounded-lg border transition text-sm text-left ${
                      formData.location === option.value
                        ? 'border-emerald-500 bg-emerald-500/10 font-semibold'
                        : 'border-slate-600 bg-slate-700/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Geräusch- und Reizniveau</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { value: 'quiet', label: 'möglichst ruhig' },
                  { value: 'normal', label: 'normales Umfeld' },
                  { value: 'lively', label: 'lebendig ist okay' },
                  { value: 'any', label: 'egal' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, noise: option.value })}
                    className={`p-3 rounded-lg border transition text-sm text-left ${
                      formData.noise === option.value
                        ? 'border-cyan-500 bg-cyan-500/10 font-semibold'
                        : 'border-slate-600 bg-slate-700/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Bildschirm</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { value: 'no', label: 'ohne Bildschirm' },
                  { value: 'possible', label: 'Bildschirm ist möglich' },
                  { value: 'preferred', label: 'Bildschirm bevorzugt' },
                  { value: 'any', label: 'egal' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, screen: option.value })}
                    className={`p-3 rounded-lg border transition text-sm text-left ${
                      formData.screen === option.value
                        ? 'border-blue-500 bg-blue-500/10 font-semibold'
                        : 'border-slate-600 bg-slate-700/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Materialien</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { value: 'only_existing', label: 'nur vorhandene Sammlung' },
                  { value: 'no_prep', label: 'ohne Vorbereitung' },
                  { value: 'little', label: 'wenig Material' },
                  { value: 'any', label: 'egal' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, materials: option.value })}
                    className={`p-3 rounded-lg border transition text-sm text-left ${
                      formData.materials === option.value
                        ? 'border-pink-500 bg-pink-500/10 font-semibold'
                        : 'border-slate-600 bg-slate-700/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Zusätzliche Anmerkung</h3>
              <textarea
                value={formData.context}
                onChange={e => setFormData({ ...formData, context: e.target.value })}
                placeholder="Gibt es noch etwas, das heute wichtig ist? (optional)"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 resize-none"
                rows={4}
                maxLength={200}
              ></textarea>
              <p className="text-xs text-slate-400 mt-2">{formData.context.length}/200</p>
            </div>
          </div>
        )}

        {/* Step: Summary */}
        {step.id === 'summary' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold">Deine aktuelle Situation</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-emerald-400 mb-2">Bedürfnisse</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedNeeds.map(needId => {
                    const need = needs.find(n => n.id === needId);
                    return need ? (
                      <span key={needId} className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-sm">
                        {need.icon} {need.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">Energie</h3>
                <p className="text-slate-300">
                  {formData.energy === 1 ? 'sehr wenig' : formData.energy === 2 ? 'wenig' : formData.energy === 3 ? 'mittel' : formData.energy === 4 ? 'viel' : 'sehr viel'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">Zeit</h3>
                <p className="text-slate-300">
                  {formData.time === 0 ? 'offen' : formData.time === 5 ? 'unter 10 Minuten' : formData.time === 15 ? '10 bis 20 Minuten' : formData.time === 30 ? '20 bis 45 Minuten' : formData.time === 60 ? '45 bis 90 Minuten' : 'mehr als 90 Minuten'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400 mb-2">Personen</h3>
                <p className="text-slate-300">
                  {formData.social === 'alone' ? 'allein' : formData.social === 'two' ? 'zu zweit' : formData.social === 'family' ? 'Familie' : formData.social === 'friends' ? 'Freunde' : formData.social === 'group' ? 'Gruppe' : 'online'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-indigo-400 mb-2">Intensität</h3>
                <p className="text-slate-300">
                  {formData.intensity === 1 ? 'sehr ruhig' : formData.intensity === 2 ? 'ruhig' : formData.intensity === 3 ? 'ausgeglichen' : formData.intensity === 4 ? 'lebendig' : 'herausfordernd'}
                </p>
              </div>

              {(formData.location || formData.noise || formData.screen || formData.materials || formData.context) && (
                <div>
                  <h3 className="font-semibold text-slate-300 mb-2">Zusätzliche Bedingungen</h3>
                  <ul className="text-slate-300 text-sm space-y-1">
                    {formData.location && <li>• Ort: {formData.location}</li>}
                    {formData.noise && <li>• Geräusch: {formData.noise}</li>}
                    {formData.screen && <li>• Bildschirm: {formData.screen}</li>}
                    {formData.materials && <li>• Materialien: {formData.materials}</li>}
                    {formData.context && <li>• Anmerkung: {formData.context}</li>}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 text-sm text-slate-300">
              <p>
                <strong>Datenschutz:</strong> Deine Angaben beschreiben nur deine aktuelle Situation. Sie werden nicht als feste Eigenschaft oder Diagnose verwendet.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              Zurück
            </button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Weiter <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => saveSituation('FULL')}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50"
            >
              {loading ? 'Wird gespeichert...' : 'Situation speichern'}
            </button>
          )}
        </div>

        {currentStep < 4 && (
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 px-4 py-2 text-slate-400 hover:text-slate-300 transition text-sm"
          >
            Abbrechen
          </button>
        )}
      </div>
    </div>
  );
}
