import { useState, useEffect } from 'react';
import { MatchService, RoundService } from '../../services';

export default function Schedule() {
  const [rounds, setRounds] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRound, setSelectedRound] = useState(null);

  useEffect(() => {
    async function loadData() {
      // In a real app, we'd filter by current tournament
      // For now, load all rounds and matches
      const roundsResult = await RoundService.getAllRounds(undefined, undefined);
      const matchesResult = await MatchService.getAllMatches(undefined, undefined);

      if (roundsResult.success) {
        setRounds(roundsResult.data);
        if (roundsResult.data.length > 0) {
          setSelectedRound(roundsResult.data[0].id);
        }
      } else if (roundsResult.error) {
        setError(roundsResult.error);
      }

      if (matchesResult.success) {
        setMatches(matchesResult.data);
      } else if (matchesResult.error) {
        setError(matchesResult.error);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const selectedRoundMatches = selectedRound
    ? matches.filter(m => m.round_id === selectedRound)
    : [];

  const selectedRoundData = rounds.find(r => r.id === selectedRound);

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Spielplan</h1>

      {rounds.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Kein Spielplan verfügbar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Runden-Navigation */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Runden</h2>
            <div className="space-y-2">
              {rounds.map(round => (
                <button
                  key={round.id}
                  onClick={() => setSelectedRound(round.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedRound === round.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <p className="font-semibold">{round.round_number}. Runde</p>
                  {round.scheduled_date && (
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(round.scheduled_date).toLocaleDateString('de-DE')}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Spiele der Runde */}
          <div className="lg:col-span-3">
            {selectedRoundData && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedRoundData.round_number}. Runde
                </h2>
                {selectedRoundData.scheduled_date && (
                  <p className="text-gray-600">
                    {new Date(selectedRoundData.scheduled_date).toLocaleDateString('de-DE')}
                  </p>
                )}
              </div>
            )}

            {selectedRoundMatches.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Keine Spiele in dieser Runde</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedRoundMatches.map(match => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-2">
                          Platz: {match.court_id || '–'} | Uhrzeit: {match.scheduled_time || '–'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(match.status)}`}>
                        {match.status === 'scheduled' && 'Geplant'}
                        {match.status === 'in_progress' && 'Läuft'}
                        {match.status === 'completed' && 'Abgeschlossen'}
                      </span>
                    </div>

                    <div className="text-center py-4">
                      <p className="text-gray-600 text-sm mb-2">vs.</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {match.match_players?.length > 0
                          ? `${match.match_players.length} Spieler`
                          : 'Spieler TBA'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
