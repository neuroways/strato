import React, { useState, useEffect } from 'react';
import { Trash2, X, Edit2, Search, ArrowUpDown, ChevronRight } from 'lucide-react';
import { pb } from '../lib/pb';
import { getApiEndpoint } from '../lib/config';

export function AdminDataBrowser() {
  const [collection, setCollection] = useState('games');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fullTextSearch, setFullTextSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublisher, setSelectedPublisher] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [ruleStatus, setRuleStatus] = useState('all');
  const [expandedPublisher, setExpandedPublisher] = useState(null);
  const [publisherGames, setPublisherGames] = useState({});
  const [showAddGameModal, setShowAddGameModal] = useState(null);
  const [newGameData, setNewGameData] = useState({});

  // Load imported data from localStorage if available
  const getGamesData = () => {
    try {
      const imported = localStorage.getItem('neuroplay_games_import');
      return imported ? JSON.parse(imported) : gamesData;
    } catch {
      return gamesData;
    }
  };

  const getPublishersData = () => {
    try {
      const imported = localStorage.getItem('neuroplay_publishers_import');
      return imported ? JSON.parse(imported) : publishersData;
    } catch {
      return publishersData;
    }
  };

  const getRuleSourcesData = () => {
    try {
      const imported = localStorage.getItem('neuroplay_rulesources_import');
      return imported ? JSON.parse(imported) : ruleSourcesData;
    } catch {
      return ruleSourcesData;
    }
  };

  // Helper to get publisher name from ID
  const getPublisherName = (publisherId) => {
    if (!publisherId) return '-';
    const publishersDataToUse = getPublishersData();
    const publisher = publishersDataToUse.find(p => p.original_id === publisherId);
    return publisher?.name || publisherId;
  };

  const fieldLabels = {
    title: 'Spieltitel',
    title_de: 'Spieltitel',
    name: 'Name',
    name_de: 'Name',
    email: 'E-Mail',
    original_id: 'Originalkennung',
    game_original_id: 'Spiel-ID',
    publisher_original_id: 'Verlag-ID',
    category_primary: 'Kategorie',
    language: 'Sprache',
    language_dependence: 'Sprachabhängigkeit',
    year_published: 'Erscheinungsjahr',
    players_min: 'Spieler mindestens',
    players_max: 'Spieler maximal',
    player_count: 'Spielerzahl',
    min_age: 'Mindestalter',
    duration_min: 'Spieldauer von',
    duration_max: 'Spieldauer bis',
    duration: 'Spieldauer',
    complexity: 'Komplexität',
    game_type: 'Spieltyp',
    mechanics: 'Mechaniken',
    status: 'Status',
    bgg_rank: 'BoardGameGeek-Rang',
    bgg_id: 'BoardGameGeek-ID',
    notes: 'Notizen',
    verification_status: 'Prüfstatus',
    rule_url: 'Link zu Regel-PDF',
    product_url: 'Link zur Produktseite',
    verified_date: 'Geprüft am',
    metadata_status: 'Metadaten-Status',
    article_number: 'Artikelnummer',
    is_german_edition: 'Deutsche Edition',
    url: 'URL',
    type: 'Typ',
    source_type: 'Quellentyp',
    is_primary: 'Primär',
    import_batch_id: 'Import-Batch',
    verified_by: 'Geprüft durch'
  };

  useEffect(() => {
    const availableCollections = [
      { name: 'games', label: 'Spiele' },
      { name: 'publishers', label: 'Verlage' },
      { name: 'rule_sources', label: 'Regelquellen' },
      { name: 'game_editions', label: 'Spieleditionen' },
      { name: 'source_verification_history', label: 'Prüfhistorie' },
      { name: 'import_batches', label: 'Import-Batches' },
    ];
    setCollections(availableCollections);
    setCollection('games');
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadRecords(controller.signal);
    return () => controller.abort();
  }, [collection]);

  const loadRecords = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      let result = [];
      
      if (collection === 'games') {
        result = await pb.collection('games').getFullList({ sort: 'title' });
      } else if (collection === 'publishers') {
        result = await pb.collection('publishers').getFullList({ sort: 'name' });
        
        // Calculate game counts for each publisher
        const games = await pb.collection('games').getFullList();
        const counts = {};
        games.forEach(game => {
          const pubId = game.publisher_original_id;
          counts[pubId] = (counts[pubId] || 0) + 1;
        });
        
        // Add count to each publisher
        result = result.map(pub => ({
          ...pub,
          game_count: counts[pub.original_id] || 0
        })).filter(pub => pub.game_count > 0);
      } else if (collection === 'rule_sources') {
        result = await pb.collection('rule_sources').getFullList();
      } else if (collection === 'game_editions') {
        result = await pb.collection('game_editions').getFullList();
      } else if (collection === 'source_verification_history') {
        result = await pb.collection('source_verification_history').getFullList();
      } else if (collection === 'users' || collection === 'roles') {
        // These are system collections - load via REST API instead of SDK
        const apiUrl = getApiEndpoint();
        const response = await fetch(`${apiUrl}/collections/${collection}/records`, {
          headers: {
            'Authorization': `Bearer ${pb.authStore.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          result = data.items || [];
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } else if (collection === 'import_batches') {
        result = [];
      }
      
      setRecords(result);
    } catch (err) {
      if (err?.isAbort || err?.name === 'AbortError') {
        return;
      }
      setError(`Fehler beim Laden: ${err.message}`);
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
      // Always save to PocketBase first
      const apiUrl = getApiEndpoint();
      const url = `${apiUrl}/collections/${collection}/records/${editingId}`;
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${pb.authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updated = await response.json();
        setRecords(records.map(r => r.id === editingId ? updated : r));
        
        // Also update localStorage as backup
        if (collection === 'games') {
          const gamesDataToUse = getGamesData();
          const updatedGames = gamesDataToUse.map(g => g.id === editingId || g.original_id === editingId ? updated : g);
          localStorage.setItem('neuroplay_games_import', JSON.stringify(updatedGames));
        } else if (collection === 'publishers') {
          const publishersDataToUse = getPublishersData();
          const updatedPubs = publishersDataToUse.map(p => p.id === editingId || p.original_id === editingId ? updated : p);
          localStorage.setItem('neuroplay_publishers_import', JSON.stringify(updatedPubs));
        }
        
        setEditingId(null);
        return;
      } else {
        // If PocketBase fails, fall back to localStorage only
        setRecords(records.map(r => r.id === editingId ? editData : r));
        
        if (collection === 'games') {
          const gamesDataToUse = getGamesData();
          const updated = gamesDataToUse.map(g => g.id === editingId || g.original_id === editingId ? editData : g);
          localStorage.setItem('neuroplay_games_import', JSON.stringify(updated));
        } else if (collection === 'publishers') {
          const publishersDataToUse = getPublishersData();
          const updated = publishersDataToUse.map(p => p.id === editingId || p.original_id === editingId ? editData : p);
          localStorage.setItem('neuroplay_publishers_import', JSON.stringify(updated));
        }
        
        setEditingId(null);
      }
    } catch (err) {
      setError(`Fehler beim Speichern: ${err.message}`);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const categories = collection === 'games' ? Array.from(
    new Set(records.map(r => r.category_primary).filter(Boolean))
  ).sort() : [];

  const publishers = (collection === 'games' || collection === 'publishers') ? Array.from(
    new Set(records.map(r => r.publisher_original_id || r.original_id).filter(Boolean))
  ).sort() : [];

  const getCompletionStatus = (record) => {
    if (!record.rule_url) return 'red';
    const hasTitle = !!record.title;
    const hasCategory = !!record.category_primary;
    const hasPublisher = !!record.publisher_original_id;
    const hasYear = !!record.year_published;
    
    if (hasTitle && hasCategory && hasPublisher && hasYear) {
      return 'green';
    }
    return 'yellow';
  };

  const togglePublisherGames = (pubId) => {
    if (expandedPublisher === pubId) {
      setExpandedPublisher(null);
    } else {
      setExpandedPublisher(pubId);
      if (!publisherGames[pubId]) {
        const games = records.filter(g => g.publisher_original_id === pubId);
        setPublisherGames({...publisherGames, [pubId]: games});
      }
    }
  };

  const openAddGameModal = (publisher) => {
    setShowAddGameModal(publisher);
    setNewGameData({
      publisher_original_id: publisher.original_id,
      language: 'de',
    });
  };

  const saveNewGame = async () => {
    try {
      await pb.collection('games').create(newGameData);
      // Reload games for this publisher
      const pubId = newGameData.publisher_original_id;
      const games = gamesData.filter(g => g.publisher_original_id === pubId);
      setPublisherGames({...publisherGames, [pubId]: games});
      setShowAddGameModal(null);
      setNewGameData({});
    } catch (err) {
      setError(`Fehler beim Erstellen: ${err.message}`);
    }
  };

  const filteredRecords = records.filter(record => {
    const titleOrName = record.title?.toLowerCase() || record.name?.toLowerCase() || '';
    const firstLetter = titleOrName.charAt(0).toUpperCase();
    
    const fullTextLower = fullTextSearch.toLowerCase();
    const matchesFullText = !fullTextSearch || 
      (record.title?.toLowerCase() || '').includes(fullTextLower) ||
      (record.name?.toLowerCase() || '').includes(fullTextLower) ||
      (record.category_primary?.toLowerCase() || '').includes(fullTextLower) ||
      (record.publisher_original_id?.toLowerCase() || '').includes(fullTextLower) ||
      (record.title_en?.toLowerCase() || '').includes(fullTextLower) ||
      (record.notes?.toLowerCase() || '').includes(fullTextLower);
    
    const matchesLetter = collection !== 'games' || !searchTerm || firstLetter === searchTerm.toUpperCase();
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || 
      record.category_primary === selectedCategory;
    
    const matchesPublisher = !selectedPublisher || selectedPublisher === 'all' || 
      record.publisher_original_id === selectedPublisher;
    
    const matchesRuleStatus = ruleStatus === 'all' ||
      (ruleStatus === 'with' && !!record.rule_url) ||
      (ruleStatus === 'without' && !record.rule_url);
    
    return matchesFullText && matchesLetter && matchesCategory && matchesPublisher && matchesRuleStatus;
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
      <div className="flex gap-4 items-center flex-wrap">
        <label className="font-semibold text-slate-300">Tabelle:</label>
        <select
          value={collection}
          onChange={(e) => { setCollection(e.target.value); setSearchTerm(''); setSelectedCategory('all'); setFullTextSearch(''); setExpandedPublisher(null); }}
          className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
        >
          {collections.map(c => (
            <option key={c.name} value={c.name}>{c.label}</option>
          ))}
        </select>
        <span className="text-slate-400">{filteredRecords.length} von {records.length}</span>
        <button
          onClick={() => loadRecords()}
          className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors"
        >
          Aktualisieren
        </button>
      </div>

      <div className="space-y-4 bg-slate-800/30 border border-slate-700 rounded-lg p-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Volltextsuche:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Titel, Kategorie, Verlag, Anmerkungen durchsuchen..."
              value={fullTextSearch}
              onChange={(e) => setFullTextSearch(e.target.value)}
              className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {fullTextSearch && (
              <button
                onClick={() => setFullTextSearch('')}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {collection === 'games' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Nach Anfangsbuchstaben filtern:</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-13 gap-1">
                <button
                  onClick={() => setSearchTerm('')}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                    !searchTerm ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  Alle
                </button>
                {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
                  <button
                    key={letter}
                    onClick={() => setSearchTerm(letter)}
                    className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                      searchTerm === letter ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kategorie:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="all">Alle ({categories.length})</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {publishers.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Verlag:</label>
                  <select
                    value={selectedPublisher}
                    onChange={(e) => setSelectedPublisher(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="all">Alle ({publishers.length})</option>
                    {publishers.map(pub => (
                      <option key={pub} value={pub}>{getPublisherName(pub)}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Anleitung:</label>
                <select
                  value={ruleStatus}
                  onChange={(e) => setRuleStatus(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="all">Alle</option>
                  <option value="with">Mit Anleitung</option>
                  <option value="without">Ohne Anleitung</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sortierung:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded p-4">
          <p className="text-red-300 font-semibold mb-2">Fehler</p>
          <p className="text-red-200 text-sm">{error}</p>
          <button
            onClick={() => loadRecords()}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-slate-400">Lädt...</div>
      ) : collection === 'publishers' ? (
        <div className="space-y-2">
          {filteredRecords.filter(record => (record.game_count || 0) > 0).map(record => (
            <div key={record.id || record.original_id}>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                style={{
                  borderLeft: `4px solid ${record.website ? '#16a34a' : '#dc2626'}`
                }}
              >
                <div 
                  className="flex-1 cursor-pointer flex items-center gap-3"
                  onClick={() => togglePublisherGames(record.original_id)}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: record.website ? '#16a34a' : '#dc2626'
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-white">{record.name}</h3>
                    <p className="text-sm text-slate-400">
                      {record.game_count || 0} Spiele · {record.country || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-300 bg-slate-700 px-3 py-1 rounded">
                    {record.game_count || 0}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(record);
                    }}
                    className="p-2 hover:bg-slate-700 rounded transition-colors text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100"
                    title="Bearbeiten"
                  >
                    <Edit2 size={16} />
                  </button>
                  <ChevronRight 
                    size={20} 
                    className={`text-slate-400 transition-transform cursor-pointer hover:text-slate-200`}
                    onClick={() => togglePublisherGames(record.original_id)}
                    style={{transform: expandedPublisher === record.original_id ? 'rotate(90deg)' : ''}}
                  />
                </div>
              </div>

              {expandedPublisher === record.original_id && publisherGames[record.original_id] && (
                <div className="ml-4 mt-2 space-y-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                  {publisherGames[record.original_id].length === 0 ? (
                    <p className="text-slate-400 text-sm py-2">Keine Spiele gefunden</p>
                  ) : (
                    publisherGames[record.original_id]
                      .sort((a, b) => (a.title || '').localeCompare(b.title || '', 'de'))
                      .map(game => (
                      <div key={game.original_id} className="flex items-center gap-2 py-2 px-2 hover:bg-slate-800/50 rounded text-sm">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: game.rule_url ? '#16a34a' : '#dc2626'
                          }}
                        />
                        <span className="text-slate-300 flex-1">{game.title}</span>
                        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">{game.category_primary || '—'}</span>
                        {game.rule_url && <span className="text-xs text-green-400">✓</span>}
                      </div>
                    ))
                  )}
                  <div className="mt-3 pt-3 border-t border-slate-600">
                    <button
                      onClick={() => openAddGameModal(record)}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white font-semibold transition-colors"
                    >
                      + Spiel hinzufügen
                    </button>
                    {record.games_catalog && (
                      <a
                        href={record.games_catalog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-slate-300 text-center transition-colors"
                      >
                        → Spielekatalog öffnen
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="text-center py-8 text-slate-400">Keine Datensätze gefunden</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 font-semibold text-slate-300 w-12"></th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">
                  {collection === 'games' ? 'Spieltitel' : 'Name'}
                </th>
                {collection === 'games' && (
                  <>
                    <th className="text-left py-3 px-4 font-semibold text-slate-300">Verlag</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-300">Kategorie</th>
                  </>
                )}
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr
                  key={record.id}
                  className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${
                    editingId === record.id ? 'bg-slate-800/50' : ''
                  }`}
                  style={{
                    borderLeft: collection === 'games' ? `4px solid ${
                      getCompletionStatus(record) === 'green' ? '#16a34a' :
                      getCompletionStatus(record) === 'yellow' ? '#eab308' :
                      '#dc2626'
                    }` : 'none'
                  }}
                >
                  <td className="py-3 px-4">
                    <div
                      className={`w-3 h-3 rounded-full`}
                      style={{
                        backgroundColor:
                          collection === 'games' ?
                            (getCompletionStatus(record) === 'green' ? '#16a34a' :
                              getCompletionStatus(record) === 'yellow' ? '#eab308' :
                              '#dc2626')
                            : '#64748b'
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-white font-medium">
                    {record.title || record.name}
                  </td>
                  {collection === 'games' && (
                    <>
                      <td className="py-3 px-4 text-slate-400 text-xs">{getPublisherName(record.publisher_original_id)}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{record.category_primary || '-'}</td>
                    </>
                  )}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(record)}
                        className="p-2 hover:bg-slate-700 rounded transition-colors text-blue-400 hover:text-blue-300"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="p-2 hover:bg-slate-700 rounded transition-colors text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddGameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Spiel hinzufügen zu {showAddGameModal.name}</h2>
            
            {showAddGameModal.games_catalog && (
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-300 mb-2">Spielekatalog dieses Verlags:</p>
                <a
                  href={showAddGameModal.games_catalog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm underline break-all"
                >
                  {showAddGameModal.games_catalog}
                </a>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Spieltitel *</label>
                <input
                  type="text"
                  placeholder="z.B. Kniffel"
                  value={newGameData.title || ''}
                  onChange={(e) => setNewGameData({...newGameData, title: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Kategorie</label>
                <input
                  type="text"
                  placeholder="z.B. Familienspiel"
                  value={newGameData.category_primary || ''}
                  onChange={(e) => setNewGameData({...newGameData, category_primary: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Regel-PDF Link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newGameData.rule_url || ''}
                  onChange={(e) => setNewGameData({...newGameData, rule_url: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Produktseite</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newGameData.product_url || ''}
                  onChange={(e) => setNewGameData({...newGameData, product_url: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Originalsprache</label>
                <input
                  type="text"
                  placeholder="z.B. Deutsch"
                  value={newGameData.language || ''}
                  onChange={(e) => setNewGameData({...newGameData, language: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowAddGameModal(null);
                  setNewGameData({});
                }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={saveNewGame}
                disabled={!newGameData.title}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded text-white font-semibold transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Datensatz bearbeiten</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(editData).map(([key, value]) => {
                if (['id', 'created', 'updated', 'collectionId', 'collectionName'].includes(key)) {
                  return null;
                }
                
                const label = fieldLabels[key] || key;
                
                return (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-slate-300 mb-1">{label}:</label>
                    {typeof value === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setEditData({ ...editData, [key]: e.target.checked })}
                        className="rounded"
                      />
                    ) : (
                      <textarea
                        value={value || ''}
                        onChange={(e) => setEditData({ ...editData, [key]: e.target.value || null })}
                        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                        rows={typeof value === 'object' ? 3 : 1}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
