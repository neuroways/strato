import { useState } from 'react';
import { TournamentService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function TournamentManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    { key: 'name', label: 'Turniername' },
    { key: 'tournament_date', label: 'Datum' },
    { key: 'registration_deadline', label: 'Anmeldeschluss' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badges = {
          planned: 'bg-gray-100 text-gray-800',
          open: 'bg-green-100 text-green-800',
          running: 'bg-blue-100 text-blue-800',
          completed: 'bg-purple-100 text-purple-800',
          cancelled: 'bg-red-100 text-red-800'
        };
        const labels = {
          planned: 'Geplant',
          open: 'Offen',
          running: 'Läuft',
          completed: 'Abgeschlossen',
          cancelled: 'Abgesagt'
        };
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${badges[value]}`}>
          {labels[value]}
        </span>;
      }
    }
  ];

  const fields = [
    { name: 'name', label: 'Turniername', type: 'text', required: true },
    { name: 'subtitle', label: 'Untertitel', type: 'text' },
    { name: 'description', label: 'Beschreibung', type: 'textarea', rows: 4 },
    { name: 'tournament_date', label: 'Turnierdatum', type: 'date', required: true },
    { name: 'registration_deadline', label: 'Anmeldeschluss', type: 'date', required: true },
    { name: 'start_time', label: 'Startzeit', type: 'time' },
    { name: 'end_time', label: 'Endzeit', type: 'time' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'planned', label: 'Geplant' },
        { value: 'open', label: 'Offen' },
        { value: 'running', label: 'Läuft' },
        { value: 'completed', label: 'Abgeschlossen' },
        { value: 'cancelled', label: 'Abgesagt' }
      ]
    },
    { name: 'max_participants', label: 'Max. Teilnehmer', type: 'number' }
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

  async function loadTournaments(signal) {
    return TournamentService.getAllTournaments(undefined, signal);
  }

  async function deleteTournament(id) {
    return TournamentService.deleteTournament(id);
  }

  async function saveTournament(data, recordId) {
    if (recordId) {
      return TournamentService.updateTournament(recordId, data);
    } else {
      return TournamentService.createTournament(data);
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Turnierverwaltung"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadTournaments}
        onDeleteRecord={deleteTournament}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Turnier bearbeiten' : 'Turnier hinzufügen'}
        onSaveRecord={saveTournament}
      />
    </>
  );
}
