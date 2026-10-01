import { useState } from 'react';
import { PlayerService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function PlayerManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    {
      key: 'first_name',
      label: 'Vorname'
    },
    {
      key: 'last_name',
      label: 'Nachname'
    },
    {
      key: 'email',
      label: 'E-Mail'
    },
    {
      key: 'skill_level',
      label: 'Spielstärke',
      render: (value) => PlayerService.getSkillLevelLabel(value)
    }
  ];

  const fields = [
    { name: 'first_name', label: 'Vorname', type: 'text', required: true },
    { name: 'last_name', label: 'Nachname', type: 'text', required: true },
    { name: 'birth_date', label: 'Geburtsdatum', type: 'date' },
    {
      name: 'skill_level',
      label: 'Spielstärke',
      type: 'select',
      options: [
        { value: 'beginner', label: 'Anfänger' },
        { value: 'intermediate', label: 'Fortgeschritten' },
        { value: 'advanced', label: 'Fortgeschritten+' },
        { value: 'professional', label: 'Professionell' }
      ]
    },
    { name: 'email', label: 'E-Mail', type: 'email' },
    { name: 'phone', label: 'Telefon', type: 'tel' },
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

  // Service function for loading data
  async function loadPlayers(signal) {
    return PlayerService.getAllPlayers(signal);
  }

  // Service function for deleting
  async function deletePlayer(id) {
    return PlayerService.deletePlayer(id);
  }

  // Service function for saving
  async function savePlayers(data, recordId) {
    if (recordId) {
      return PlayerService.updatePlayer(recordId, data);
    } else {
      return PlayerService.createPlayer(data);
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Spielerverwaltung"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadPlayers}
        onDeleteRecord={deletePlayer}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Spieler bearbeiten' : 'Spieler hinzufügen'}
        onSaveRecord={savePlayers}
      />
    </>
  );
}
