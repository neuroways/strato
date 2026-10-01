import { useState } from 'react';
import { CourtService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function CourtManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    { key: 'name', label: 'Platzname' },
    {
      key: 'surface',
      label: 'Belag',
      render: (value) => CourtService.getSurfaceLabel(value)
    },
    {
      key: 'available',
      label: 'Verfügbar',
      render: (value) => <span className={value ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
        {value ? 'Ja' : 'Nein'}
      </span>
    }
  ];

  const fields = [
    { name: 'name', label: 'Platzname', type: 'text', required: true },
    {
      name: 'surface',
      label: 'Belag',
      type: 'select',
      options: [
        { value: 'clay', label: 'Asche' },
        { value: 'hard', label: 'Hart' },
        { value: 'grass', label: 'Gras' },
        { value: 'other', label: 'Sonstig' }
      ]
    },
    { name: 'available', label: 'Verfügbar', type: 'checkbox' },
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

  async function loadCourts(signal) {
    return CourtService.getAllCourts(signal);
  }

  async function deleteCourt(id) {
    return CourtService.deleteCourt(id);
  }

  async function saveCourt(data, recordId) {
    if (recordId) {
      return CourtService.updateCourt(recordId, data);
    } else {
      return CourtService.createCourt(data);
    }
  }

  return (
    <>
      <CRUDTable
        columns={columns}
        title="Plätze"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
        onLoadRecords={loadCourts}
        onDeleteRecord={deleteCourt}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Platz bearbeiten' : 'Platz hinzufügen'}
        onSaveRecord={saveCourt}
      />
    </>
  );
}
