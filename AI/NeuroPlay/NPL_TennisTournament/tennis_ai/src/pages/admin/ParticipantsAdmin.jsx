import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function ParticipantsAdmin() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    firstname: '',
    lastname: '',
    age: '',
    experience: 'Freizeit',
    club: '',
    email: '',
    note: ''
  });

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {
    try {
      const players = await pb.collection('players').getFullList({ sort: 'lastname,firstname' });
      setParticipants(players);
      setFilteredParticipants(players);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredParticipants(participants);
    } else {
      const filtered = participants.filter(p =>
        p.firstname.toLowerCase().includes(query.toLowerCase()) ||
        p.lastname.toLowerCase().includes(query.toLowerCase()) ||
        p.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredParticipants(filtered);
    }
  };

  const handleEdit = (player) => {
    setEditingId(player.id);
    setEditData({ ...player });
  };

  const handleSave = async () => {
    try {
      await pb.collection('players').update(editingId, editData);
      await loadParticipants();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating player:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Spieler wirklich löschen?')) {
      try {
        await pb.collection('players').delete(id);
        await loadParticipants();
      } catch (error) {
        console.error('Error deleting player:', error);
        alert('Fehler beim Löschen');
      }
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('players').create(newPlayer);
      setNewPlayer({
        firstname: '',
        lastname: '',
        age: '',
        experience: 'Freizeit',
        club: '',
        email: '',
        note: ''
      });
      setShowForm(false);
      await loadParticipants();
    } catch (error) {
      console.error('Error creating player:', error);
      alert('Fehler beim Erstellen');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Teilnehmerverwaltung</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? 'Abbrechen' : '+ Spieler hinzufügen'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Neuer Spieler</h2>
          <form onSubmit={handleAddPlayer} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Vorname"
                value={newPlayer.firstname}
                onChange={(e) => setNewPlayer({ ...newPlayer, firstname: e.target.value })}
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
              <input
                type="text"
                placeholder="Nachname"
                value={newPlayer.lastname}
                onChange={(e) => setNewPlayer({ ...newPlayer, lastname: e.target.value })}
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Alter"
                value={newPlayer.age}
                onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
              <input
                type="email"
                placeholder="E-Mail"
                value={newPlayer.email}
                onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
            <select
              value={newPlayer.experience}
              onChange={(e) => setNewPlayer({ ...newPlayer, experience: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            >
              <option value="Anfänger">Anfänger</option>
              <option value="Freizeit">Freizeit</option>
              <option value="Fortgeschritten">Fortgeschritten</option>
              <option value="Mannschaft">Mannschaft</option>
              <option value="Turnier">Turnier</option>
            </select>
            <input
              type="text"
              placeholder="Verein"
              value={newPlayer.club}
              onChange={(e) => setNewPlayer({ ...newPlayer, club: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Spieler erstellen
            </button>
          </form>
        </div>
      )}

      <input
        type="text"
        placeholder="Spieler suchen..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
      />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">E-Mail</th>
              <th className="px-6 py-3 text-left font-semibold">Alter</th>
              <th className="px-6 py-3 text-left font-semibold">Erfahrung</th>
              <th className="px-6 py-3 text-left font-semibold">Verein</th>
              <th className="px-6 py-3 text-center font-semibold">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredParticipants.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                {editingId === p.id ? (
                  <>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={editData.firstname}
                        onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        value={editData.age || ''}
                        onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={editData.experience}
                        onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded"
                      >
                        <option value="Anfänger">Anfänger</option>
                        <option value="Freizeit">Freizeit</option>
                        <option value="Fortgeschritten">Fortgeschritten</option>
                        <option value="Mannschaft">Mannschaft</option>
                        <option value="Turnier">Turnier</option>
                      </select>
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={editData.club || ''}
                        onChange={(e) => setEditData({ ...editData, club: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      >
                        ✕
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-3">{p.firstname} {p.lastname}</td>
                    <td className="px-6 py-3">{p.email}</td>
                    <td className="px-6 py-3">{p.age || '–'}</td>
                    <td className="px-6 py-3">{p.experience}</td>
                    <td className="px-6 py-3">{p.club || '–'}</td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredParticipants.length === 0 && (
        <div className="text-center py-8 text-gray-600">Keine Spieler gefunden</div>
      )}
    </div>
  );
}
