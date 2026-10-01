import { useState, useEffect } from 'react';
import { ResultService, MatchService, PlayerService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function ResultManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [matchResult, playerResult] = await Promise.all([
        MatchService.getAllMatches(),
        PlayerService.getAllPlayers()
      ]);
      if (matchResult.success) setMatches(matchResult.data);
      if (playerResult.success) setPlayers(playerResult.data);
    }
    loadData();
  }, []);

  const columns = [
    {
      key: 'match_id',
      label: 'Spiel',
      render: (value) => matches.find(m => m.id === value)?.id?.substring(0, 8) || value
    },
    {
      key: 'winner_id',
      label: 'Gewinner',
      render: (value) => {
        const p = players.find(pl => pl.id === value);
        return p ? `${p.first_name} ${p.last_name}` : '-';
      }
    },
    {
      key: 'loser_id',
      label: 'Verlierer',
      render: (value) => {
        const p = players.find(pl => pl.id === value);
        return p ? `${p.first_name} ${p.last_name}` : '-';
      }
    },
    { key: 'score', label: 'Ergebnis' },
    { key: 'recorded_at', label: 'Erfasst am' }
  ];

  const fields = [
    {
      name: 'match_id',
      label: 'Spiel',
      type: 'select',
      required: true,
      options: matches.map(m => ({
        value: m.id,
        label: `Match ${m.id.substring(0, 8)} (${m.match_date})`
      }))
    },
    {
      name: 'winner_id',
      label: 'Gewinner',
      type: 'select',
      options: [{ value: '', label: '-- Keine --' }, ...players.map(p => ({
        value: p.id,
        label: `${p.first_name} ${p.last_name}`
      }))]
    },
    {
      name: 'loser_id',
      label: 'Verlierer',
      type: 'select',
      options: [{ value: '', label: '-- Keine --' }, ...players.map(p => ({
        value: p.id,
        label: `${p.first_name} ${p.last_name}`
      }))]
    },
    { name: 'score', label: 'Ergebnis', type: 'text', placeholder: '6:4, 7:5' },
    { name: 'match_notes', label: 'Spielnotizen', type: 'textarea', rows: 3 },
    { name: 'recorded_at', label: 'Erfassungsdatum', type: 'date' }
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

  async function loadResults(signal) {
    return ResultService.getAllResults(undefined, signal);
  }

  async function deleteResult(id) {
    return ResultService.deleteResult(id);
  }

  async function saveResult(data, recordId) {
    if (recordId) {
      return ResultService.updateResult(recordId, data);
    } else {
      return ResultService.recordResult(
        data.match_id,
        data.winner_id || null,
        data.loser_id || null,
        data.score,
        data.recorded_at
      );
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Ergebnisse"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadResults}
        onDeleteRecord={deleteResult}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Ergebnis bearbeiten' : 'Ergebnis hinzufügen'}
        onSaveRecord={saveResult}
      />
    </>
  );
}
