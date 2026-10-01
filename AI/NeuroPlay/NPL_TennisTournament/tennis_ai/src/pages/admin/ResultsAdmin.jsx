import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function ResultsAdmin() {
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchPlayers, setMatchPlayers] = useState({});
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingMatchId, setEditingMatchId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const tournaments = await pb.collection('tournaments').getFullList();
      if (tournaments.length > 0) {
        const t = tournaments[0];
        setTournament(t);

        const matchList = await pb.collection('matches').getFullList({
          filter: `tournament_id = "${t.id}"`,
          sort: 'start_time'
        }).catch(() => []);
        setMatches(matchList);

        // Load all match players
        const allMatchPlayers = await pb.collection('match_players').getFullList().catch(() => []);
        const mpByMatch = {};
        allMatchPlayers.forEach(mp => {
          if (!mpByMatch[mp.match_id]) mpByMatch[mp.match_id] = [];
          mpByMatch[mp.match_id].push(mp);
        });
        setMatchPlayers(mpByMatch);

        // Load all results
        const allResults = await pb.collection('results').getFullList().catch(() => []);
        const resultsByMatch = {};
        allResults.forEach(r => {
          resultsByMatch[r.match_id] = r;
        });
        setResults(resultsByMatch);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveResult = async () => {
    try {
      const existingResult = results[editingMatchId];
      if (existingResult) {
        await pb.collection('results').update(existingResult.id, editData);
      } else {
        await pb.collection('results').create({
          match_id: editingMatchId,
          ...editData
        });
      }
      setEditingMatchId(null);
      await loadData();
      alert('Ergebnis gespeichert');
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDeleteResult = async (matchId) => {
    if (confirm('Ergebnis löschen?')) {
      try {
        const result = results[matchId];
        if (result) {
          await pb.collection('results').delete(result.id);
          await loadData();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Fehler beim Löschen');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Laden...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Ergebnisverwaltung</h1>

      <div className="space-y-4">
        {matches.map(match => {
          const result = results[match.id];
          const players = matchPlayers[match.id] || [];

          return (
            <div key={match.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  {match.start_time} Uhr
                </div>
                <div className="font-semibold mb-4">
                  {players.filter(p => p.side === 'A').length > 0 ? 
                    `${players.find(p => p.side === 'A')?.player_id || 'Spieler A'}` : 'Spieler A'} 
                  vs 
                  {players.filter(p => p.side === 'B').length > 0 ? 
                    `${players.find(p => p.side === 'B')?.player_id || 'Spieler B'}` : 'Spieler B'}
                </div>
              </div>

              {editingMatchId === match.id ? (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Ergebnis (z.B. 6:4)</label>
                    <input
                      type="text"
                      placeholder="6:4"
                      value={editData.score || ''}
                      onChange={(e) => setEditData({ ...editData, score: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Sieger (Player ID)</label>
                    <input
                      type="text"
                      placeholder="Player ID"
                      value={editData.winner_player_id || ''}
                      onChange={(e) => setEditData({ ...editData, winner_player_id: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Notizen</label>
                    <textarea
                      placeholder="Notizen zum Match"
                      value={editData.notes || ''}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveResult}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                    >
                      Speichern
                    </button>
                    <button
                      onClick={() => setEditingMatchId(null)}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-semibold"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {result ? (
                    <div className="mb-4">
                      <div className="text-2xl font-black text-red-600 mb-2">{result.score}</div>
                      <div className="text-sm text-gray-600 mb-2">Sieger: {result.winner_player_id}</div>
                      {result.notes && <div className="text-sm text-gray-600">Notizen: {result.notes}</div>}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 mb-4">Noch kein Ergebnis</div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingMatchId(match.id);
                        setEditData(result ? { ...result } : {});
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm"
                    >
                      {result ? 'Bearbeiten' : 'Ergebnis eintragen'}
                    </button>
                    {result && (
                      <button
                        onClick={() => handleDeleteResult(match.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
                      >
                        Löschen
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-8 text-gray-600">Keine Matches vorhanden</div>
      )}
    </div>
  );
}
