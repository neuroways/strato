import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';
import '../styles/AdminDatabase.css';

export default function AdminDatabase() {
  const [registeredCollections, setRegisteredCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(false);

  useEffect(() => {
    loadRegistry();
  }, []);

  const loadRegistry = async () => {
    try {
      setLoading(true);
      const collections = await pb
        .collection('nw_collection_registry')
        .getFullList({
          sort: '+display_order'
        })
        .catch(() => {
          // Registry Collection might not exist yet; return empty
          return [];
        });
      
      setRegisteredCollections(collections);
      setError('');
    } catch (err) {
      console.error('Error loading registry:', err);
      setError('Fehler beim Laden der Collection-Registry.');
    } finally {
      setLoading(false);
    }
  };

  const loadCollectionRecords = async (collection) => {
    try {
      setRecordsLoading(true);
      const records = await pb
        .collection(collection.collection_name)
        .getFullList({
          sort: collection.default_sort || '+id'
        })
        .catch(() => {
          return [];
        });
      
      setRecords(records);
      setSelectedCollection(collection);
    } catch (err) {
      console.error('Error loading records:', err);
      setError(`Fehler beim Laden der Datensätze aus ${collection.display_name}.`);
    } finally {
      setRecordsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-database-container">
        <div className="admin-loading">Lade Datenbank-Registry...</div>
      </div>
    );
  }

  if (!selectedCollection) {
    return (
      <div className="admin-database-container">
        <div className="admin-header">
          <h1>Datenbankmanager</h1>
          <p className="admin-subtitle">Verwalte fachliche Datensammlungen</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        {registeredCollections.length === 0 ? (
          <div className="admin-empty">
            <p>Keine Collections registriert.</p>
            <p className="admin-hint">
              Bitte erstellen Sie eine Collection-Registry, um Datensätze zu verwalten.
            </p>
          </div>
        ) : (
          <div className="admin-collections-grid">
            {registeredCollections.map((col) => (
              <div
                key={col.id}
                className="admin-collection-card"
                onClick={() => loadCollectionRecords(col)}
              >
                <h3>{col.display_name}</h3>
                <p>{col.description}</p>
                <div className="admin-collection-meta">
                  <span className="admin-meta-label">Collection:</span>
                  <span className="admin-meta-value">{col.collection_name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-database-container">
      <div className="admin-header">
        <button
          className="admin-back-button"
          onClick={() => {
            setSelectedCollection(null);
            setRecords([]);
          }}
        >
          ← Zurück
        </button>
        <div className="admin-header-content">
          <h1>{selectedCollection.display_name}</h1>
          <p className="admin-subtitle">{selectedCollection.description}</p>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {recordsLoading ? (
        <div className="admin-loading">Lade Datensätze...</div>
      ) : (
        <div className="admin-records-view">
          <div className="admin-records-info">
            <span>{records.length} Datensätze</span>
          </div>

          {records.length === 0 ? (
            <div className="admin-empty">
              <p>Keine Datensätze in {selectedCollection.display_name}.</p>
            </div>
          ) : (
            <div className="admin-records-table">
              <table>
                <thead>
                  <tr>
                    {selectedCollection.default_columns &&
                      selectedCollection.default_columns.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    <th className="admin-actions-header">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      {selectedCollection.default_columns &&
                        selectedCollection.default_columns.map((col) => (
                          <td key={`${record.id}-${col}`}>
                            {String(record[col] || '—').substring(0, 50)}
                          </td>
                        ))}
                      <td className="admin-actions">
                        <button className="admin-btn-small admin-btn-view">
                          Anzeigen
                        </button>
                        {selectedCollection.allow_update && (
                          <button className="admin-btn-small admin-btn-edit">
                            Bearbeiten
                          </button>
                        )}
                        {selectedCollection.allow_delete && (
                          <button className="admin-btn-small admin-btn-delete">
                            Löschen
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
