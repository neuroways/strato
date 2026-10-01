import { useState, useEffect } from 'react';
import { TournamentService } from '../../services';
import { Link } from 'react-router';

export default function Home() {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      // Get most recent tournament
      const result = await TournamentService.getAllTournaments('', undefined);
      if (result.success && result.data?.length > 0) {
        setTournament(result.data[0]);
      } else {
        setError('Keine Turniere gefunden');
      }
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tennis Turnier 2026
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Willkommen zur Plattform für aktuelle Turniere, Spielpläne und Ergebnisse
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/tournaments"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Zu den Turnieren
            </Link>
            <Link
              to="/schedule"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Spielplan ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Current Tournament Info */}
      {tournament && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {tournament.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-gray-600 text-sm">Turnierdatum</p>
                <p className="text-xl font-semibold text-gray-900">
                  {tournament.tournament_date 
                    ? new Date(tournament.tournament_date).toLocaleDateString('de-DE')
                    : 'TBD'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-gray-600 text-sm">Anmeldeschluss</p>
                <p className="text-xl font-semibold text-gray-900">
                  {tournament.anmeldeschluss
                    ? new Date(tournament.anmeldeschluss).toLocaleDateString('de-DE')
                    : 'TBD'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-xl font-semibold text-gray-900">
                  {tournament.status === 'open' && '🔴 Offen'}
                  {tournament.status === 'in_progress' && '🟡 Laufend'}
                  {tournament.status === 'completed' && '🟢 Abgeschlossen'}
                  {!tournament.status && 'Unbekannt'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-gray-600 text-sm">Ort</p>
                <p className="text-xl font-semibold text-gray-900">
                  {tournament.location_id ? 'Vereinsheim' : '–'}
                </p>
              </div>
            </div>

            {tournament.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Beschreibung</h3>
                <p className="text-gray-700 leading-relaxed">
                  {tournament.description}
                </p>
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              <Link
                to="/tournaments"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Turnierdetails
              </Link>
              <Link
                to="/players"
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
              >
                Teilnehmer anzeigen
              </Link>
              <Link
                to="/schedule"
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
              >
                Spielplan
              </Link>
            </div>
          </div>
        </section>
      )}

      {error && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Weitere Informationen?</h2>
          <p className="text-gray-300 mb-8">
            Erkunden Sie unsere Seite für Spielpläne, Ergebnisse und Teilnehmerlisten.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  );
}
