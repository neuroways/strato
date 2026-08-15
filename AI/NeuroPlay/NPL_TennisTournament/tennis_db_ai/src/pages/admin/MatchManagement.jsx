import { useState, useEffect } from 'react';
import { MatchService, RoundService, CourtService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function MatchManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [rounds, setRounds] = useState([]);
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [roundResult, courtResult] = await Promise.all([
        RoundService.getAllRounds(),
        CourtService.getAllCourts()
      ]);
      if (roundResult.success) setRounds(roundResult.data);
      if (courtResult.success) setCourts(courtResult.data);
    }
    loadData();
  }, []);

  const columns = [
    {
      key: 'round_id',
      label: 'Runde',
      render: (value) => rounds.find(r => r.id === value)?.name || value
    },
    {
      key: 'court_id',
      label: 'Platz',
      render: (value) => courts.find(c => c.id === value)?.name || value || '-'
    },
    { key: 'match_date', label: 'Datum' },
    { key: 'match_time', label: 'Uhrzeit' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const labels = {
          scheduled: 'Geplant',
          live: 'Läuft',
          completed: 'Abgeschlossen',
          cancelled: 'Abgesagt'
        };
        return labels[value] || value;
      }
    }
  ];

  const fields = [
    {
      name: 'round_id',
      label: 'Runde',
      type: 'select',
      required: true,
      options: rounds.map(r => ({ value: r.id, label: r.name }))
    },
    {
      name: 'court_id',
      label: 'Platz',
      type: 'select',
      options: [{ value: '', label: '-- Keine --' }, ...courts.map(c => ({ value: c.id, label: c.name }))]
    },
    { name: 'match_date', label: 'Spieldatum', type: 'date' },
    { name: 'match_time', label: 'Spielzeit', type: 'time' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'scheduled', label: 'Geplant' },
        { value: 'live', label: 'Läuft' },
        { value: 'completed', label: 'Abgeschlossen' },
        { value: 'cancelled', label: 'Abgesagt' }
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

  async function loadMatches(signal) {
    return MatchService.getAllMatches(undefined, signal);
  }

  async function deleteMatch(id) {
    return MatchService.deleteMatch(id);
  }

  async function saveMatch(data, recordId) {
    if (recordId) {
      return MatchService.updateMatch(recordId, data);
    } else {
      return MatchService.createMatch(data);
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Spiele"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadMatches}
        onDeleteRecord={deleteMatch}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Spiel bearbeiten' : 'Spiel hinzufügen'}
        onSaveRecord={saveMatch}
      />
    </>
  );
}
