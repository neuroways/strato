import { useState, useEffect } from 'react';
import { TournamentService } from '../../services';

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTournaments() {
      const result = await TournamentService.getAllTournaments(undefined, undefined);
      if (result.success) {
        setTournaments(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden');
      }
      setLoading(false);
    }

    loadTournaments();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      open: { label: 'Offen', color: 'bg-red-100 text-red-800' },
      in_progress: { label: 'Laufend', color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Abgeschlossen', color: 'bg-green-100 text-green-800' }
    };
    const badge = badges[status];
    return badge ? <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>{badge.label}</span> : null;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Turniere</h1>

      {tournaments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Keine Turniere vorhanden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map(tournament => (
            <div
              key={tournament.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">
                    {tournament.name}
                  </h3>
                  {getStatusBadge(tournament.status)}
                </div>

                {tournament.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tournament.description}
                  </p>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turnierdatum:</span>
                    <span className="font-semibold text-gray-900">
                      {tournament.tournament_date
                        ? new Date(tournament.tournament_date).toLocaleDateString('de-DE')
                        : '–'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Anmeldeschluss:</span>
                    <span className="font-semibold text-gray-900">
                      {tournament.anmeldeschluss
                        ? new Date(tournament.anmeldeschluss).toLocaleDateString('de-DE')
                        : '–'}
                    </span>
                  </div>

                  {tournament.location_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ort:</span>
                      <span className="font-semibold text-gray-900">Vereinsheim</span>
                    </div>
                  )}
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Details anzeigen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
