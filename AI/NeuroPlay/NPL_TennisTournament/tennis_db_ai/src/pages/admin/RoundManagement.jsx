import { useState, useEffect } from 'react';
import { RoundService, TournamentService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function RoundManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function loadTournaments() {
      const result = await TournamentService.getAllTournaments();
      if (result.success) setTournaments(result.data);
    }
    loadTournaments();
  }, []);

  const columns = [
    {
      key: 'tournament_id',
      label: 'Turnier',
      render: (value) => tournaments.find(t => t.id === value)?.name || value
    },
    { key: 'round_number', label: 'Rundennummer' },
    { key: 'name', label: 'Rundenname' },
    { key: 'start_date', label: 'Startdatum' },
    { key: 'end_date', label: 'Enddatum' }
  ];

  const fields = [
    {
      name: 'tournament_id',
      label: 'Turnier',
      type: 'select',
      required: true,
      options: tournaments.map(t => ({ value: t.id, label: t.name }))
    },
    { name: 'round_number', label: 'Rundennummer', type: 'number', required: true },
    { name: 'name', label: 'Rundenname', type: 'text', required: true, placeholder: 'z.B. Vorrunde, Halbfinale' },
    { name: 'start_date', label: 'Startdatum', type: 'date' },
    { name: 'end_date', label: 'Enddatum', type: 'date' }
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

  async function loadRounds(signal) {
    return RoundService.getAllRounds(undefined, signal);
  }

  async function deleteRound(id) {
    return RoundService.deleteRound(id);
  }

  async function saveRound(data, recordId) {
    if (recordId) {
      return RoundService.updateRound(recordId, data);
    } else {
      return RoundService.createRound(data);
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Spielrunden"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadRounds}
        onDeleteRecord={deleteRound}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Runde bearbeiten' : 'Runde hinzufügen'}
        onSaveRecord={saveRound}
      />
    </>
  );
}
