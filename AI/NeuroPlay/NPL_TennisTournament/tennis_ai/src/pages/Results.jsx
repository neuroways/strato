import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';

export default function Results() {
  const [results, setResults] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Get tournament
        const tournaments = await pb.collection('tournaments').getFullList();
        if (tournaments.length > 0) {
          const t = tournaments[0];
          setTournament(t);

          // Get all results
          const allResults = await pb.collection('results').getFullList({
            sort: '-entered_at'
          });
          setResults(allResults);
        }
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-green-600">Ergebnisse werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">Ergebnisse</h1>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map(result => (
              <div key={result.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Left Player / Score / Right Player */}
                  <div className="text-center">
                    <div className="font-semibold text-green-900 mb-2">Spieler A</div>
                    <div className="text-sm text-gray-600">-</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-black text-green-600 mb-2">
                      {result.score || '-:-'}
                    </div>
                    <div className="text-sm text-gray-600">Ergebnis</div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-green-900 mb-2">Spieler B</div>
                    <div className="text-sm text-gray-600">-</div>
                  </div>
                </div>

                {result.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Notizen:</span> {result.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              Noch keine Ergebnisse verfügbar
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Die Ergebnisse werden nach Abschluss der Spiele hier angezeigt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
