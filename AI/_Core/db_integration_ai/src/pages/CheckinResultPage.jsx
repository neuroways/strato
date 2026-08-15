import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Home, Search, LayoutDashboard, Trash2 } from 'lucide-react';
import { pb } from '../lib/pb';

export default function CheckinResultPage() {
  const navigate = useNavigate();
  const isLoggedIn = pb.authStore.isValid;
  const [guestCheckin, setGuestCheckin] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      // Gast: Lokale Daten auslesen
      const stored = sessionStorage.getItem('neuroplay.guest.currentCheckin');
      if (stored) {
        try {
          setGuestCheckin(JSON.parse(stored));
        } catch (err) {
          console.error('Failed to parse guest checkin:', err);
        }
      }

      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  const clearGuestData = () => {
    const keys = Object.keys(sessionStorage).filter(key => key.startsWith('neuroplay.guest.'));
    keys.forEach(key => sessionStorage.removeItem(key));
    setGuestCheckin(null);
    console.log('Guest data cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full mb-6">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>

          <h1 className="text-4xl font-bold mb-3">Deine Situation wurde gespeichert</h1>
          <p className="text-slate-300 text-lg">
            NeuroPlay kann jetzt Aktivitäten anhand deiner Angaben vergleichen.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/recommendations')}
            className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition flex items-center justify-center gap-3"
          >
            <Search size={20} />
            Passende Aktivitäten anzeigen
          </button>

          <button
            onClick={() => navigate('/discover')}
            className="w-full px-6 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 hover:border-emerald-400 transition flex items-center justify-center gap-3"
          >
            <Search size={20} />
            Aktivitätskatalog öffnen
          </button>

          {isLoggedIn && (
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 transition flex items-center justify-center gap-3"
            >
              <LayoutDashboard size={20} />
              Zum Dashboard
            </button>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 transition flex items-center justify-center gap-3"
          >
            <Home size={20} />
            Zur Startseite
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          {!isLoggedIn && guestCheckin ? (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong>Gast-Modus:</strong> Deine Angaben sind nur in diesem Browser gespeichert und werden nicht auf unseren Servern gespeichert.
              </p>
              <div className="bg-slate-900/50 rounded p-3 text-sm text-slate-300 max-h-40 overflow-y-auto border border-slate-600">
                <p className="font-semibold mb-2">Deine aktuelle Situation:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Bedürfnisse: {guestCheckin.needs.map(n => n.name).join(', ')}</li>
                  <li>• Energie: {guestCheckin.situation.energyLevel}/5</li>
                  <li>• Zeit: {guestCheckin.situation.availableTimeMinutes} Minuten</li>
                  <li>• Personen: {guestCheckin.situation.socialContext}</li>
                  <li>• Intensität: {guestCheckin.situation.desiredIntensity}/5</li>
                  <li>• Erfasst: {new Date(guestCheckin.createdAt).toLocaleString('de-DE')}</li>
                </ul>
              </div>
              <button
                onClick={clearGuestData}
                className="w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 rounded hover:bg-red-500/10 transition flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Gastdaten auf diesem Gerät löschen
              </button>
            </div>
          ) : (
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong>Hinweis:</strong> Die Empfehlungsfunktion wird aktuell aufgebaut. Deine Situation wurde jedoch bereits erfasst und gespeichert. Sobald NeuroPlay alle Aktivitäten analysiert hat, können dir personalisierte Vorschläge gemacht werden.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
