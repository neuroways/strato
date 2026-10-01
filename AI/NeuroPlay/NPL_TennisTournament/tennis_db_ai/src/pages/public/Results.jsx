import { useState, useEffect } from 'react';
import { ResultService, MatchService } from '../../services';

export default function Results() {
  const [results, setResults] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      const matchesResult = await MatchService.getAllMatches('status = "completed"', undefined);
      
      if (matchesResult.success) {
        setMatches(matchesResult.data);
        
        // Load results for each match
        const resultsData = [];
        for (const match of matchesResult.data) {
          const resultResult = await ResultService.getMatchResult(match.id);
          if (resultResult.success && resultResult.data) {
            resultsData.push({
              match,
              result: resultResult.data
            });
          }
        }
        setResults(resultsData);
      } else {
        setError(matchesResult.error || 'Fehler beim Laden');
      }
      
      setLoading(false);
    }

    loadData();
  }, []);

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
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Ergebnisse</h1>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Keine Ergebnisse verfügbar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(({ match, result }) => (
            <div
              key={result.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Runde: {match.round_id || '–'} | {match.scheduled_time || '–'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Abgeschlossen
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4">
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Spieler 1</p>
                  <p className="text-lg font-bold text-gray-900">Player A</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {result.score || '–'}
                  </p>
                </div>

                <div className="text-left">
                  <p className="text-gray-600 text-sm">Spieler 2</p>
                  <p className="text-lg font-bold text-gray-900">Player B</p>
                </div>
              </div>

              {result.winner_id && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
                  <span className="text-sm font-semibold text-green-600">
                    ✓ Gewinner: {result.winner_id}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
