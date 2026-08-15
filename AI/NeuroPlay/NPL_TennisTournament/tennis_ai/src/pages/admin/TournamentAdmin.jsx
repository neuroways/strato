import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function TournamentAdmin() {
  const [tournament, setTournament] = useState(null);
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [infoSections, setInfoSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadTournamentData();
  }, []);

  async function loadTournamentData() {
    try {
      const tournaments = await pb.collection('tournaments').getFullList();
      if (tournaments.length > 0) {
        const t = tournaments[0];
        setTournament(t);
        setEditing('tournament');
        setEditData({ ...t });

        const locs = await pb.collection('locations').getFullList({
          filter: `tournament_id = "${t.id}"`
        }).catch(() => []);
        if (locs.length > 0) {
          setLocation(locs[0]);
        }

        const conts = await pb.collection('contacts').getFullList({
          filter: `tournament_id = "${t.id}"`
        }).catch(() => []);
        setContacts(conts);

        const info = await pb.collection('info_sections').getFullList({
          filter: `tournament_id = "${t.id}"`
        }).catch(() => []);
        setInfoSections(info);
      }
    } catch (error) {
      console.error('Error loading tournament data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveTournament = async () => {
    try {
      await pb.collection('tournaments').update(tournament.id, editData);
      setTournament(editData);
      setEditing(null);
      alert('Turnier aktualisiert');
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Speichern');
    }
  };

  if (loading) return <div className="text-center py-8">Laden...</div>;

  if (!tournament) {
    return <div className="text-center py-8 text-gray-600">Kein Turnier konfiguriert</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Turnierverwaltung</h1>

      {/* Turnier Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Turnierdaten</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Titel</label>
              <input
                type="text"
                value={editData.title || ''}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Untertitel</label>
              <input
                type="text"
                value={editData.subtitle || ''}
                onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Beschreibung</label>
            <textarea
              value={editData.description || ''}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Datum</label>
              <input
                type="date"
                value={editData.event_date || ''}
                onChange={(e) => setEditData({ ...editData, event_date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Startzeit</label>
              <input
                type="time"
                value={editData.start_time || ''}
                onChange={(e) => setEditData({ ...editData, start_time: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              value={editData.status || 'Planung'}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            >
              <option value="Planung">Planung</option>
              <option value="Anmeldung">Anmeldung</option>
              <option value="Auslosung">Auslosung</option>
              <option value="läuft">läuft</option>
              <option value="beendet">beendet</option>
            </select>
          </div>

          <button
            onClick={handleSaveTournament}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Turnier speichern
          </button>
        </div>
      </div>

      {/* Veranstaltungsort */}
      {location && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Veranstaltungsort</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Ortsname"
              defaultValue={location.name}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Straße"
              defaultValue={location.street}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="PLZ"
                defaultValue={location.zip}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Stadt"
                defaultValue={location.city}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <textarea
              placeholder="Parkinginformationen"
              defaultValue={location.parking_information || ''}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Anfahrtsinformationen"
              defaultValue={location.arrival_information || ''}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Kontakte */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Kontaktpersonen ({contacts.length})</h2>
        <div className="space-y-4">
          {contacts.map(c => (
            <div key={c.id} className="border border-gray-200 rounded-lg p-4">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-600">{c.email}</div>
              {c.phone && <div className="text-sm text-gray-600">{c.phone}</div>}
            </div>
          ))}
          {contacts.length === 0 && <p className="text-gray-500">Keine Kontaktpersonen</p>}
        </div>
      </div>

      {/* Informationsbereiche */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Informationsbereiche ({infoSections.length})</h2>
        <div className="space-y-4">
          {infoSections.map(info => (
            <div key={info.id} className="border border-gray-200 rounded-lg p-4">
              <div className="font-semibold mb-2">{info.title}</div>
              <div className="text-sm text-gray-700">{info.content}</div>
            </div>
          ))}
          {infoSections.length === 0 && <p className="text-gray-500">Keine Informationsbereiche</p>}
        </div>
      </div>
    </div>
  );
}
