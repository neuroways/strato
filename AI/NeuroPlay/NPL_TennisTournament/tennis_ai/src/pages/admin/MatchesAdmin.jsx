import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function MatchesAdmin() {
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [courts, setCourts] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tournament_id: '',
    round_id: '',
    court_id: '',
    start_time: '',
    end_time: '',
    status: 'geplant'
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const tournaments = await pb.collection('tournaments').getFullList();
      if (tournaments.length > 0) {
        const t = tournaments[0];
        setTournament(t);
        setFormData(prev => ({ ...prev, tournament_id: t.id }));

        const [matchList, roundList, courtList, playerList] = await Promise.all([
          pb.collection('matches').getFullList({
            filter: `tournament_id = "${t.id}"`,
            sort: 'start_time'
          }).catch(() => []),
          pb.collection('rounds').getFullList({
            filter: `tournament_id = "${t.id}"`
          }).catch(() => []),
          pb.collection('courts').getFullList({
            filter: `tournament_id = "${t.id}"`
          }).catch(() => []),
          pb.collection('players').getFullList().catch(() => [])
        ]);

        setMatches(matchList);
        setRounds(roundList);
        setCourts(courtList);
        setPlayers(playerList);

        if (roundList.length > 0) {
          setFormData(prev => ({ ...prev, round_id: roundList[0].id }));
        }
        if (courtList.length > 0) {
          setFormData(prev => ({ ...prev, court_id: courtList[0].id }));
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('matches').create(formData);
      setFormData({
        tournament_id: tournament.id,
        round_id: rounds[0]?.id || '',
        court_id: courts[0]?.id || '',
        start_time: '',
        end_time: '',
        status: 'geplant'
      });
      setShowForm(false);
      await loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Erstellen');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Match löschen?')) {
      try {
        await pb.collection('matches').delete(id);
        await loadData();
      } catch (error) {
        console.error('Error:', error);
        alert('Fehler beim Löschen');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Laden...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Matchverwaltung</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Abbrechen' : '+ Match erstellen'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Neues Match</h2>
          <form onSubmit={handleAddMatch} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Runde</label>
                <select
                  value={formData.round_id}
                  onChange={(e) => setFormData({ ...formData, round_id: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {rounds.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Platz</label>
                <select
                  value={formData.court_id}
                  onChange={(e) => setFormData({ ...formData, court_id: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {courts.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Startzeit</label>
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Endzeit (optional)</label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Match erstellen
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {matches.map(match => {
          const round = rounds.find(r => r.id === match.round_id);
          const court = courts.find(c => c.id === match.court_id);
          const statusColor = match.status === 'beendet' ? 'bg-green-100 text-green-900' : 
                            match.status === 'läuft' ? 'bg-yellow-100 text-yellow-900' : 
                            'bg-blue-100 text-blue-900';

          return (
            <div key={match.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Runde</div>
                  <div className="font-semibold">{round?.name || '–'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Platz</div>
                  <div className="font-semibold">{court?.name || '–'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Zeit</div>
                  <div className="font-semibold">{match.start_time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${statusColor}`}>
                    {match.status === 'beendet' ? 'Beendet' : 
                     match.status === 'läuft' ? 'Läuft' : 'Geplant'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(match.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Löschen
              </button>
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
