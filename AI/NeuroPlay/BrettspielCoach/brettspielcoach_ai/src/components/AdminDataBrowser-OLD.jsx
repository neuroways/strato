import React, { useState, useEffect } from 'react';
import { Trash2, X, Edit2, Search } from 'lucide-react';
import { pb } from '../lib/pb';

export function AdminDataBrowser() {
  const [collection, setCollection] = useState('games');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' oder 'desc'

  // Field labels for display
  const fieldLabels = {
    title: 'Spieltitel',
    title_de: 'Spieltitel',
    name: 'Name',
    name_de: 'Name',
    email: 'E-Mail',
    original_id: 'Originalkennung',
    publisher_original_id: 'Verlag',
    category_primary: 'Kategorie',
    language: 'Sprache',
    year_published: 'Erscheinungsjahr',
    players_min: 'Spieler mindestens',
    players_max: 'Spieler maximal',
    min_age: 'Mindestalter',
    duration_min: 'Spieldauer von',
    duration_max: 'Spieldauer bis',
    status: 'Status',
    bgg_rank: 'BoardGameGeek-Rang',
    bgg_id: 'BoardGameGeek-ID',
    notes: 'Notizen',
    verification_status: 'Prüfstatus',
    rule_url: 'Link zu Regel-PDF',
    product_url: 'Link zur Produktseite',
    verified_date: 'Geprüft am'
  };

  // Load available collections
  useEffect(() => {
    const availableCollections = [
      { name: 'games', label: 'Spiele' },
      { name: 'game_editions', label: 'Spieleditionen' },
      { name: 'publishers', label: 'Verlage' },
      { name: 'rule_sources', label: 'Regelquellen' },
      { name: 'import_batches', label: 'Import-Batches' },
      { name: 'source_verification_history', label: 'Prüfhistorie' },
    ];
    setCollections(availableCollections);
    setCollection('games');
  }, []);

  // Load records for selected collection
  useEffect(() => {
    loadRecords();
  }, [collection]);

  const loadRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await pb.collection(collection).getFullList({
        sort: '-created',
      });
      setRecords(result || []);
    } catch (err) {
      if (err.status === 401) {
        setError('Anmeldung erforderlich – öffne PocketBase Admin unter /.sfs-be/');
      } else if (err.status === 404) {
        setError(`Collection „${collection}" nicht gefunden – stelle sicher, dass das Schema importiert wurde`);
      } else {
        setError(`Fehler beim Laden: ${err.message}`);
      }
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    if (!confirm('Datensatz wirklich löschen?')) return;
    try {
      await pb.collection(collection).delete(id);
      setRecords(records.filter(r => r.id !== id));
    } catch (err) {
      if (err.status === 401) {
        setError('Anmeldung erforderlich');
      } else {
        setError(`Fehler beim Löschen: ${err.message}`);
      }
    }
  };

  const startEdit = (record) => {
    setEditingId(record.id);
    setEditData({ ...record });
  };

  const saveEdit = async () => {
    try {
      const updated = await pb.collection(collection).update(editingId, editData);
      setRecords(records.map(r => r.id === editingId ? updated : r));
      setEditingId(null);
    } catch (err) {
      if (err.status === 401) {
        setError('Anmeldung erforderlich');
      } else {
        setError(`Fehler beim Speichern: ${err.message}`);
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // Get unique categories for filter
  const categories = collection === 'games' ? Array.from(
    new Set(records.map(r => r.category_primary).filter(Boolean))
  ).sort() : [];

  // Filter records based on search and category
  const filteredRecords = records.filter(record => {
    const matchesSearch = !searchTerm || 
      (record.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (record.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (record.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || 
      record.category_primary === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const titleA = (a.title || a.name || '').toLowerCase();
    const titleB = (b.title || b.name || '').toLowerCase();
    
    if (sortOrder === 'asc') {
      return titleA.localeCompare(titleB, 'de');
    } else {
      return titleB.localeCompare(titleA, 'de');
    }
  });

  return (
    <div className="space-y-6">
      {/* Collection Selector */}
      <div className="flex gap-4 items-center flex-wrap">
        <label className="font-semibold text-slate-300">Tabelle:</label>
        <select
          value={collection}
          onChange={(e) => { setCollection(e.target.value); setSearchTerm(''); setSelectedCategory('all'); }}
          className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
        >
          {collections.map(c => (
            <option key={c.name} value={c.name}>{c.label}</option>
          ))}
        </select>
        <span className="text-slate-400">{filteredRecords.length} von {records.length}</span>
        <button
          onClick={loadRecords}
          className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors"
        >
          Aktualisieren
        </button>
      </div>

      {/* Search & Filter (für Spiele-Collection) */}
      {collection === 'games' && (
        <div className="space-y-4 bg-slate-800/30 border border-slate-700 rounded-lg p-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Nach Titel suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 pl-10 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Nach Kategorie filtern:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="all">Alle Kategorien ({categories.length})</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Sortierung:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded p-4">
          <p className="text-red-300 font-semibold mb-2">Fehler</p>
          <p className="text-red-200 text-sm mb-3">{error}</p>
          {error.includes('PocketBase') && (
            <p className="text-red-200 text-xs mb-3">
              Öffne <a href="/.sfs-be/" target="_blank" rel="noopener noreferrer" className="underline">PocketBase Admin</a> und melde dich an, dann versuche es erneut.
            </p>
          )}
          <button
            onClick={loadRecords}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && <div className="text-slate-400">Wird geladen…</div>}

      {/* Records Table */}
      {!loading && filteredRecords.length > 0 && (
        <div className="overflow-x-auto border border-slate-700 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Titel / Name</th>
                {collection === 'games' && (
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Kategorie</th>
                )}
                <th className="text-right py-3 px-4 font-semibold text-slate-300">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-400 font-mono text-xs break-all">{record.id.slice(0, 8)}…</td>
                  <td className="py-3 px-4">
                    {record.title_de || record.name_de || record.title || record['Spiel'] || '—'}
                  </td>
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                    {new Date(record.created).toLocaleDateString('de-DE')}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => startEdit(record)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit2 className="w-3 h-3" />
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => deleteRecord(record.id)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                      title="Löschen"
                    >
                      <Trash2 className="w-3 h-3" />
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && records.length === 0 && !error && (
        <div className="text-center py-12 text-slate-400">
          <p className="mb-2">Diese Tabelle ist leer.</p>
          <p className="text-sm text-slate-500">Lade Spiele hoch oder importiere den Katalog, um Einträge zu sehen.</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Datensatz bearbeiten</h2>
              <button
                onClick={cancelEdit}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {Object.entries(editData).map(([key, value]) => {
                if (key === 'id' || key === 'created' || key === 'updated') return null;
                
                const isJson = typeof value === 'object';

                return (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {key}
                    </label>
                    {isJson ? (
                      <textarea
                        value={JSON.stringify(value, null, 2)}
                        onChange={(e) => {
                          try {
                            setEditData({
                              ...editData,
                              [key]: JSON.parse(e.target.value)
                            });
                          } catch {
                            // Keep on parse error
                          }
                        }}
                        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white font-mono text-sm"
                        rows={4}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => setEditData({
                          ...editData,
                          [key]: e.target.value || null
                        })}
                        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex gap-3 pt-6 border-t border-slate-700">
                <button
                  onClick={saveEdit}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors"
                >
                  Speichern
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-semibold transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
