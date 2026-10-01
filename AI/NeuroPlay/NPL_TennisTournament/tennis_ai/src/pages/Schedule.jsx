import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';

export default function Schedule() {
  const [matches, setMatches] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterCourt, setFilterCourt] = useState('');
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        // Get tournament
        const tournaments = await pb.collection('tournaments').getFullList();
        if (tournaments.length > 0) {
          const t = tournaments[0];
          setTournament(t);

          // Get matches
          const allMatches = await pb.collection('matches').getFullList({
            filter: `tournament_id = "${t.id}"`,
            sort: 'start_time'
          });
          setMatches(allMatches);

          // Get courts
          const courtList = await pb.collection('courts').getFullList({
            filter: `tournament_id = "${t.id}"`,
            sort: 'number'
          });
          setCourts(courtList);
        }
      } catch (error) {
        console.error('Error loading schedule:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredMatches = filterCourt
    ? matches.filter(m => m.court_id === filterCourt)
    : matches;

  const getStatusColor = (status) => {
    switch (status) {
      case 'geplant': return 'bg-blue-100 text-blue-900';
      case 'läuft': return 'bg-yellow-100 text-yellow-900';
      case 'beendet': return 'bg-green-100 text-green-900';
      default: return 'bg-gray-100 text-gray-900';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'geplant': return 'Geplant';
      case 'läuft': return 'Läuft';
      case 'beendet': return 'Beendet';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-green-600">Spielplan wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">Spielplan</h1>

        {/* Filter */}
        {courts.length > 0 && (
          <div className="mb-8">
            <label className="block text-green-900 font-semibold mb-2">Platz filtern:</label>
            <select
              value={filterCourt}
              onChange={(e) => setFilterCourt(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
            >
              <option value="">Alle Plätze</option>
              {courts.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}

        {filteredMatches.length > 0 ? (
          <div className="space-y-4">
            {filteredMatches.map(match => (
              <div key={match.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Time */}
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-black text-green-600">
                      {match.start_time}
                    </div>
                    <div className="text-sm text-gray-600">Uhr</div>
                  </div>

                  {/* Court */}
                  <div className="text-center md:text-left">
                    <div className="font-semibold text-gray-900">
                      {match.court_id ? courts.find(c => c.id === match.court_id)?.name : 'TBD'}
                    </div>
                    <div className="text-sm text-gray-600">Platz</div>
                  </div>

                  {/* Match Info */}
                  <div className="text-center md:col-span-1">
                    <div className="text-sm font-medium text-green-900 mb-2">
                      Match
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(match.status)}`}>
                      {getStatusLabel(match.status)}
                    </span>
                  </div>

                  {/* Info Button */}
                  <div className="text-right text-sm text-gray-600">
                    {match.ai_generated && (
                      <span className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded inline-block">
                        KI-generiert
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              {filterCourt ? 'Keine Spiele auf diesem Platz' : 'Noch keine Spiele geplant'}
            </p>
          </div>
        )}

        {/* Info Box */}
        {matches.length === 0 && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-600 text-green-900 p-6 rounded">
            <p className="font-semibold mb-2">Spielplan wird in Kürze verfügbar</p>
            <p className="text-sm">
              Der Spielplan wird nach der Anmeldephase generiert. Schauen Sie später wieder vorbei!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
