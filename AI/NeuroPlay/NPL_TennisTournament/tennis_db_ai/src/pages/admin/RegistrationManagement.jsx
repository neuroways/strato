import { useState, useEffect } from 'react';
import { RegistrationService, TournamentService, PlayerService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function RegistrationManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadLists() {
      const [tournResult, playerResult] = await Promise.all([
        TournamentService.getAllTournaments(),
        PlayerService.getAllPlayers()
      ]);
      if (tournResult.success) setTournaments(tournResult.data);
      if (playerResult.success) setPlayers(playerResult.data);
    }
    loadLists();
  }, []);

  const columns = [
    {
      key: 'tournament_id',
      label: 'Turnier',
      render: (value) => tournaments.find(t => t.id === value)?.name || value
    },
    {
      key: 'player_id',
      label: 'Spieler',
      render: (value) => {
        const p = players.find(pl => pl.id === value);
        return p ? `${p.first_name} ${p.last_name}` : value;
      }
    },
    { key: 'registration_date', label: 'Anmeldedatum' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const labels = {
          registered: 'Angemeldet',
          confirmed: 'Bestätigt',
          waitlist: 'Warteliste',
          cancelled: 'Storniert'
        };
        return labels[value] || value;
      }
    }
  ];

  const fields = [
    {
      name: 'tournament_id',
      label: 'Turnier',
      type: 'select',
      required: true,
      options: tournaments.map(t => ({ value: t.id, label: t.name }))
    },
    {
      name: 'player_id',
      label: 'Spieler',
      type: 'select',
      required: true,
      options: players.map(p => ({ value: p.id, label: `${p.first_name} ${p.last_name}` }))
    },
    { name: 'registration_date', label: 'Anmeldedatum', type: 'date', required: true },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'registered', label: 'Angemeldet' },
        { value: 'confirmed', label: 'Bestätigt' },
        { value: 'waitlist', label: 'Warteliste' },
        { value: 'cancelled', label: 'Storniert' }
      ]
    },
    { name: 'notes', label: 'Bemerkungen', type: 'textarea', rows: 3 }
  ];

  function handleEdit(record) {
    setEditingRecord(record);
    setShowModal(true);
  }

  function handleAdd() {
    setEditingRecord(null);
    setShowModal(true);
  }

  function handleSuccess() {
    setRefreshKey(k => k + 1);
  }

  async function loadRegistrations(signal) {
    return RegistrationService.getAllRegistrations(undefined, signal);
  }

  async function deleteRegistration(id) {
    return RegistrationService.deleteRegistration(id);
  }

  async function saveRegistration(data, recordId) {
    if (recordId) {
      return RegistrationService.updateRegistrationStatus(recordId, data.status);
    } else {
      return RegistrationService.registerPlayer(data.tournament_id, data.player_id, data.registration_date);
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Anmeldungen"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadRegistrations}
        onDeleteRecord={deleteRegistration}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Anmeldung bearbeiten' : 'Anmeldung hinzufügen'}
        onSaveRecord={saveRegistration}
      />
    </>
  );
}
