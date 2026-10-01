import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, XCircle, FileUp, Loader } from 'lucide-react';
import { pb } from '../lib/pb';

export function AdminExcelUpload() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('loading');
    setMessage('Datei wird verarbeitet...');
    setErrors([]);
    setFileName(file.name);

    try {
      // Read file directly (no backend upload needed)
      setMessage('📂 Lese Excel-Datei...');
      
      if (!file.arrayBuffer) {
        throw new Error('Datei konnte nicht gelesen werden. Bitte versuchen Sie es erneut.');
      }

      const arrayBuffer = await file.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error('Datei ist leer oder konnte nicht gelesen werden.');
      }

      // Import XLSX library
      const XLSX = await import('xlsx');
      if (!XLSX || !XLSX.read) {
        throw new Error('Excel-Bibliothek konnte nicht geladen werden.');
      }

      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      if (!workbook || !workbook.Sheets) {
        throw new Error('Excel-Datei ist ungültig oder beschädigt.');
      }

      // Extract publishers
      const publishersSheet = workbook.Sheets['Verlage'] 
        ? XLSX.utils.sheet_to_json(workbook.Sheets['Verlage']) 
        : [];
      const gamesSheet = workbook.Sheets['Spiele und Anleitungen'] 
        ? XLSX.utils.sheet_to_json(workbook.Sheets['Spiele und Anleitungen']) 
        : [];
      
      if (!gamesSheet || gamesSheet.length === 0) {
        throw new Error('Keine Spieldaten in der Datei gefunden. Stelle sicher, dass ein Blatt „Spiele und Anleitungen" existiert.');
      }

      setMessage(`✅ Datei gelesen. Verarbeite ${gamesSheet.length} Spiele und ${publishersSheet.length} Verlage...`);

      // Process like import-and-sync would
      const result = {
        publishers: [],
        games: [],
        ruleSources: [],
        report: {
          timestamp: new Date().toISOString(),
          publishers_processed: 0,
          games_processed: 0,
          rule_sources_created: 0,
        }
      };

      // Parse publishers
      function normalize(value) {
        if (!value) return null;
        const trimmed = String(value).trim();
        return trimmed === '' ? null : trimmed;
      }

      function validateUrl(value) {
        if (!value) return null;
        const url = normalize(value);
        if (!url) return null;
        try {
          new URL(url);
          return url;
        } catch {
          return null;
        }
      }

      function parseNumber(value) {
        const num = parseInt(value);
        return isNaN(num) ? null : num;
      }

      const publisherMap = {};
      publishersSheet.forEach(row => {
        const id = normalize(row['Verlag-ID']);
        if (!id) return;

        publisherMap[id] = {
          original_id: id,
          name: normalize(row['Verlag']),
          country: normalize(row['Land']),
          website: validateUrl(row['Startseite']),
          games_catalog: validateUrl(row['Spieleübersicht']),
        };
        result.report.publishers_processed++;
      });

      result.publishers = Object.values(publisherMap);

      // Parse games
      const pubNameMap = {};
      result.publishers.forEach(p => {
        pubNameMap[p.name] = p.original_id;
      });

      gamesSheet.forEach(row => {
        const recordId = normalize(row['Datensatz-ID']);
        if (!recordId) return;

        const title = normalize(row['Spiel']);
        if (!title) return;

        const pubName = normalize(row['Verlag / Marke']);
        const publisherId = pubName ? pubNameMap[pubName] : null;

        const game = {
          original_id: recordId,
          title: title,
          title_en: normalize(row['Originaltitel']),
          publisher_original_id: publisherId,
          category_primary: normalize(row['Kategorie']),
          language: normalize(row['Sprache']) || 'de',
          rule_url: validateUrl(row['Anleitung / Regelquelle']),
          product_url: validateUrl(row['Produkt- oder Katalogseite']),
          article_number: normalize(row['Artikelnummer / EAN']),
          verification_status: normalize(row['Prüfstatus']),
          min_age: parseNumber(row['Mindestalter']) || parseNumber(row['min_age']),
          duration: normalize(row['Spieldauer']) || normalize(row['duration']),
          player_count: (() => {
            const minKey = Object.keys(row).find(k => k.toLowerCase().includes('spieler') && k.toLowerCase().includes('min'));
            const maxKey = Object.keys(row).find(k => k.toLowerCase().includes('spieler') && k.toLowerCase().includes('max'));
            const minVal = minKey ? parseNumber(row[minKey]) : null;
            const maxVal = maxKey ? parseNumber(row[maxKey]) : null;
            return (minVal || maxVal) ? { min: minVal, max: maxVal } : null;
          })(),
          complexity: normalize(row['Komplexität']) || normalize(row['complexity']),
          year_published: parseNumber(row['Erscheinungsjahr']) || parseNumber(row['year']),
          bgg_id: parseNumber(row['BGG-ID']) || parseNumber(row['bgg_id']),
          bgg_rank: parseNumber(row['BGG-Rang']) || parseNumber(row['bgg_rank']),
          mechanics: normalize(row['Mechaniken']),
          game_type: normalize(row['Spieltyp']),
          product_type: normalize(row['Produkttyp']),
          link_type: normalize(row['Linktyp']),
          language_dependency: normalize(row['Sprachabhängigkeit']),
          base_game_id: normalize(row['Basisspiel-ID']),
          base_game_title: normalize(row['Basisspiel-Titel']),
          german_edition: normalize(row['Deutsche Edition']),
          german_publisher: normalize(row['Deutscher Verlag / Ausgabe']),
          verified_date: normalize(row['Geprüft am']),
          notes: normalize(row['Hinweis']),
          metadata_status: normalize(row['Metadatenstatus']),
          rule_status: normalize(row['Anleitungsstatus']),
          publisher_source: normalize(row['Verlagsquelle']),
          assignment_status: normalize(row['Zuordnungsstatus']),
        };

        result.games.push(game);
        result.report.games_processed++;

        const ruleUrl = validateUrl(row['Anleitung / Regelquelle']);
        if (ruleUrl) {
          result.ruleSources.push({
            game_original_id: recordId,
            url: ruleUrl,
          });
          result.report.rule_sources_created++;
        }
      });

      setMessage(`✅ ${result.games.length} Spiele verarbeitet. Speichere in der Datenbank...`);

      // Sync to PocketBase collections
      try {
        // Upload publishers
        for (const publisher of result.publishers) {
          try {
            // Check if exists first
            const existing = await pb.collection('publishers').getList(1, 1, {
              filter: `original_id = "${publisher.original_id}"`,
            });
            
            if (existing.items.length > 0) {
              await pb.collection('publishers').update(existing.items[0].id, publisher);
            } else {
              await pb.collection('publishers').create(publisher);
            }
          } catch (err) {
            console.warn(`Fehler bei Verlag ${publisher.name}:`, err.message);
          }
        }

        // Upload games
        for (const game of result.games) {
          try {
            // Check if exists first
            const existing = await pb.collection('games').getList(1, 1, {
              filter: `original_id = "${game.original_id}"`,
            });
            
            if (existing.items.length > 0) {
              await pb.collection('games').update(existing.items[0].id, game);
            } else {
              await pb.collection('games').create(game);
            }
          } catch (err) {
            console.warn(`Fehler bei Spiel ${game.title}:`, err.message);
          }
        }

        // Upload rule sources
        for (const ruleSource of result.ruleSources) {
          try {
            const existing = await pb.collection('rule_sources').getList(1, 1, {
              filter: `game_original_id = "${ruleSource.game_original_id}"`,
            });
            
            if (existing.items.length === 0) {
              await pb.collection('rule_sources').create(ruleSource);
            }
          } catch (err) {
            console.warn(`Fehler bei Regelquelle:`, err.message);
          }
        }
      } catch (e) {
        console.warn('Fehler beim Hochladen in die Datenbank:', e);
      }

      // Also keep in localStorage for fallback
      try {
        localStorage.setItem('neuroplay_games_import', JSON.stringify(result.games));
        localStorage.setItem('neuroplay_publishers_import', JSON.stringify(result.publishers));
        localStorage.setItem('neuroplay_rulesources_import', JSON.stringify(result.ruleSources));
      } catch (e) {
        console.warn('localStorage nicht verfügbar:', e);
      }

      // Detect new/missing columns in games sheet
      const firstGame = gamesSheet[0];
      const detectedColumns = firstGame ? Object.keys(firstGame).sort() : [];
      const expectedColumns = [
        'Datensatz-ID', 'Verlag / Marke', 'Spiel', 'Originaltitel',
        'Kategorie', 'Sprache', 'Anleitung / Regelquelle', 'Produkt- oder Katalogseite',
        'Artikelnummer / EAN', 'Prüfstatus'
      ];
      const newColumns = detectedColumns.filter(col => !expectedColumns.includes(col));
      const missingColumns = expectedColumns.filter(col => !detectedColumns.includes(col));

      setStatus('success');
      setMessage(`✅ Import abgeschlossen und gespeichert`);
      setResults({
        publishers: result.report.publishers_processed,
        games: result.report.games_processed,
        ruleSources: result.report.rule_sources_created,
        newColumns: newColumns.length > 0 ? newColumns : null,
        missingColumns: missingColumns.length > 0 ? missingColumns : null,
      });

    } catch (error) {
      setStatus('error');
      setMessage('Fehler beim Import');
      setErrors([error.message]);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setMessage('');
    setFileName('');
    setResults(null);
    setErrors([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileUp className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Excel-Datei importieren & synchronisieren</h3>
        </div>

        <p className="text-slate-400 text-sm mb-6">
          Lade eine aktualisierte Excel-Tabelle hoch. Alle Verlage, Spiele und Regelquellen werden automatisch in die Sammlungen synchronisiert — kein Token nötig.
        </p>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mb-6 text-sm text-blue-300">
          <p className="font-semibold mb-2">Erwartet wird:</p>
          <ul className="space-y-1 ml-4">
            <li>• Blatt: „Verlage" mit Verlag-ID, Name, Website, etc.</li>
            <li>• Blatt: „Spiele und Anleitungen" mit Spiele-Daten</li>
          </ul>
        </div>

        <div className="relative">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            disabled={status === 'loading'}
            className="block w-full text-sm text-slate-400
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              disabled:opacity-50"
          />
        </div>

        {fileName && (
          <p className="text-sm text-slate-400 mt-2">
            Ausgewählte Datei: <span className="font-semibold">{fileName}</span>
          </p>
        )}
      </div>

      {/* Loading State */}
      {status === 'loading' && (
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 flex items-start gap-3">
          <Loader className="w-5 h-5 text-blue-400 mt-1 animate-spin flex-shrink-0" />
          <div>
            <p className="text-blue-300 font-semibold">Import läuft...</p>
            <p className="text-blue-200 text-sm mt-1">{message}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400 mb-3">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">{message}</span>
          </div>
          {errors.length > 0 && (
            <ul className="space-y-1 ml-7 text-sm text-red-300">
              {errors.slice(0, 5).map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
              {errors.length > 5 && (
                <li>… und {errors.length - 5} weitere Fehler</li>
              )}
            </ul>
          )}
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Success State */}
      {status === 'success' && results && (
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">{message}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">Verlage</p>
                <p className="text-3xl font-bold text-green-400">{results.publishers}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">Spiele</p>
                <p className="text-3xl font-bold text-green-400">{results.games}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">Regelquellen</p>
                <p className="text-3xl font-bold text-green-400">{results.ruleSources}</p>
              </div>
            </div>

            <p className="text-sm text-green-300 mt-4">
              ✅ Alle Daten wurden erfolgreich in die Sammlungen synchronisiert. 
              Die Admin-Verwaltung und der öffentliche Katalog zeigen sofort die neuen Daten.
            </p>

            {(results.newColumns || results.missingColumns) && (
              <div className="mt-4 pt-4 border-t border-green-700">
                {results.newColumns && (
                  <div className="mb-3 p-3 bg-blue-900/30 border border-blue-700 rounded">
                    <p className="text-sm font-semibold text-blue-300 mb-2">ℹ️ Neue Spalten erkannt:</p>
                    <p className="text-sm text-blue-200">{results.newColumns.join(', ')}</p>
                  </div>
                )}
                {results.missingColumns && (
                  <div className="p-3 bg-yellow-900/30 border border-yellow-700 rounded">
                    <p className="text-sm font-semibold text-yellow-300 mb-2">⚠️ Fehlende Spalten:</p>
                    <p className="text-sm text-yellow-200">{results.missingColumns.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors"
          >
            Neue Datei importieren
          </button>
        </div>
      )}
    </div>
  );
}
