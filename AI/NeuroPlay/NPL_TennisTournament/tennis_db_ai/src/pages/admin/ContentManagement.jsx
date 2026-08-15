import { useState } from 'react';
import { InfoSectionService, AnnouncementService } from '../../services';
import CRUDTable from '../../components/CRUDTable';
import EditModal from '../../components/EditModal';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('info');
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Info Sections
  const infoColumns = [
    { key: 'section_key', label: 'Schlüssel' },
    { key: 'title', label: 'Titel' },
    {
      key: 'visible',
      label: 'Sichtbar',
      render: (value) => <span className={value ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
        {value ? 'Ja' : 'Nein'}
      </span>
    }
  ];

  const infoFields = [
    { name: 'section_key', label: 'Schlüssel', type: 'text', required: true, placeholder: 'z.B. welcome, rules' },
    { name: 'title', label: 'Titel', type: 'text' },
    { name: 'content', label: 'Inhalt', type: 'textarea', rows: 6 },
    { name: 'order', label: 'Sortiernummer', type: 'number' },
    { name: 'visible', label: 'Sichtbar', type: 'checkbox' }
  ];

  // Announcements
  const announcementColumns = [
    { key: 'title', label: 'Titel' },
    { key: 'published_date', label: 'Veröffentlicht' },
    {
      key: 'visible',
      label: 'Sichtbar',
      render: (value) => <span className={value ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
        {value ? 'Ja' : 'Nein'}
      </span>
    }
  ];

  const announcementFields = [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    { name: 'content', label: 'Inhalt', type: 'textarea', rows: 6 },
    { name: 'published_date', label: 'Veröffentlichungsdatum', type: 'date', required: true },
    { name: 'visible', label: 'Sichtbar', type: 'checkbox' }
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

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'info'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Info-Bereiche
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'announcements'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Ankündigungen
        </button>
      </div>

      {activeTab === 'info' && (
        <>
          <CRUDTable
            columns={infoColumns}
            title="Info-Bereiche"
            onEdit={handleEdit}
            onAdd={handleAdd}
            refreshKey={refreshKey}
            onLoadRecords={(signal) => InfoSectionService.getAllSections(signal)}
            onDeleteRecord={(id) => InfoSectionService.deleteSection(id)}
          />

          <EditModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            record={editingRecord}
            fields={infoFields}
            onSuccess={handleSuccess}
            title={editingRecord ? 'Info-Bereich bearbeiten' : 'Info-Bereich hinzufügen'}
            onSaveRecord={(data, recordId) =>
              recordId
                ? InfoSectionService.updateSection(recordId, data)
                : InfoSectionService.createSection(data)
            }
          />
        </>
      )}

      {activeTab === 'announcements' && (
        <>
          <CRUDTable
            columns={announcementColumns}
            title="Ankündigungen"
            onEdit={handleEdit}
            onAdd={handleAdd}
            refreshKey={refreshKey}
            onLoadRecords={(signal) => AnnouncementService.getAllAnnouncements(undefined, signal)}
            onDeleteRecord={(id) => AnnouncementService.deleteAnnouncement(id)}
          />

          <EditModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            record={editingRecord}
            fields={announcementFields}
            onSuccess={handleSuccess}
            title={editingRecord ? 'Ankündigung bearbeiten' : 'Ankündigung hinzufügen'}
            onSaveRecord={(data, recordId) =>
              recordId
                ? AnnouncementService.updateAnnouncement(recordId, data)
                : AnnouncementService.createAnnouncement(data)
            }
          />
        </>
      )}
    </div>
  );
}
