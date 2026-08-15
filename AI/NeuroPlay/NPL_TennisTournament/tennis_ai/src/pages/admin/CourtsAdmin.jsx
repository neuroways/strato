import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function CourtsAdmin() {
  const [tournament, setTournament] = useState(null);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourtName, setNewCourtName] = useState('');
  const [editingId, setEditingId] = useState(null);
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

        const courtsList = await pb.collection('courts').getFullList({
          filter: `tournament_id = "${t.id}"`,
          sort: 'number'
        }).catch(() => []);
        setCourts(courtsList);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCourt = async (e) => {
    e.preventDefault();
    if (!tournament || !newCourtName) return;

    try {
      const courtNumber = courts.length + 1;
      await pb.collection('courts').create({
        tournament_id: tournament.id,
        name: newCourtName,
        number: courtNumber,
        active: true
      });
      setNewCourtName('');
      await loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Erstellen');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Platz löschen?')) {
      try {
        await pb.collection('courts').delete(id);
        await loadData();
      } catch (error) {
        console.error('Error:', error);
        alert('Fehler beim Löschen');
      }
    }
  };

  const handleEdit = (court) => {
    setEditingId(court.id);
    setEditData({ ...court });
  };

  const handleSave = async () => {
    try {
      await pb.collection('courts').update(editingId, editData);
      await loadData();
      setEditingId(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Speichern');
    }
  };

  if (loading) return <div className="text-center py-8">Laden...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Platzverwaltung</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Neuen Platz anlegen</h2>
        <form onSubmit={handleAddCourt} className="flex gap-4">
          <input
            type="text"
            placeholder="z.B. Platz 1"
            value={newCourtName}
            onChange={(e) => setNewCourtName(e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            + Hinzufügen
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courts.map(court => (
          <div key={court.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            {editingId === court.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.active}
                    onChange={(e) => setEditData({ ...editData, active: e.target.checked })}
                  />
                  <span>Aktiv</span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    Speichern
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4">{court.name}</h3>
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${court.active ? 'bg-green-100 text-green-900' : 'bg-gray-100 text-gray-900'}`}>
                    {court.active ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(court)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(court.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {courts.length === 0 && (
        <div className="text-center py-8 text-gray-600">Keine Plätze vorhanden</div>
      )}
    </div>
  );
}
