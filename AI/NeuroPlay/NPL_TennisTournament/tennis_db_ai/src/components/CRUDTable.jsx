import { useState, useEffect } from 'react';
import TrashIcon from 'icon:trash-2';
import EditIcon from 'icon:edit-2';
import PlusIcon from 'icon:plus';

/**
 * Generic CRUD Table Component
 * Receives a service function for data fetching and deletion
 */
export default function CRUDTable({
  collectionName, // Still used by EditModal
  columns,
  title,
  onEdit,
  onAdd,
  refreshKey,
  onLoadRecords, // Service function: async (signal) => ServiceResult<Record[]>
  onDeleteRecord  // Service function: async (id) => ServiceResult<void>
}) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadRecords() {
      const controller = new AbortController();
      setLoading(true);
      setError('');

      try {
        // Call service function instead of direct API
        const result = await onLoadRecords(controller.signal);
        
        if (result.success) {
          setRecords(result.data);
        } else {
          setError(result.error || 'Fehler beim Laden der Daten');
        }
      } catch (err) {
        if (!err?.isAbort) {
          setError('Fehler beim Laden der Daten');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    }

    loadRecords();
  }, [collectionName, refreshKey, onLoadRecords]);

  async function handleDelete(id) {
    if (!window.confirm('Datensatz wirklich löschen?')) return;

    try {
      // Call service function instead of direct API
      const result = await onDeleteRecord(id);
      
      if (result.success) {
        setRecords(records.filter(r => r.id !== id));
      } else {
        setError(result.error || 'Fehler beim Löschen');
      }
    } catch (err) {
      setError('Fehler beim Löschen');
      console.error(err);
    }
  }

  const filteredRecords = records.filter(record =>
    Object.values(record).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <PlusIcon className="w-4 h-4" />
          Hinzufügen
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />

        {loading ? (
          <p className="text-gray-500 py-8 text-center">Lädt...</p>
        ) : filteredRecords.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">Keine Daten gefunden</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {columns.map(col => (
                    <th key={col.key} className="text-left px-4 py-3 font-semibold text-gray-700">
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-semibold text-gray-700">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-gray-900">
                        {col.render ? col.render(record[col.key], record) : record[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(record)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="Bearbeiten"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          title="Löschen"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
