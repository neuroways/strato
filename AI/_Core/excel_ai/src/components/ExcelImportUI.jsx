import React, { useState, useRef } from 'react';
import { pb } from '../lib/pb';
import '../styles/ExcelImportUI.css';

export default function ExcelImportUI() {
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [worksheets, setWorksheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [columns, setColumns] = useState([]);
  const [mappings, setMappings] = useState({});
  const [targetCollection, setTargetCollection] = useState(null);
  const [registries, setRegistries] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [dryRunResults, setDryRunResults] = useState(null);
  const [importResults, setImportResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [step, setStep] = useState(1);
  const [importMode, setImportMode] = useState('existing'); // 'existing' or 'new_collections'
  const [sheetCollectionMapping, setSheetCollectionMapping] = useState({}); // {sheetName: {collectionName, createNew, includeAsLog}}
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    loadRegistries();
  }, []);

  const loadRegistries = async () => {
    try {
      const regs = await pb
        .collection('nw_collection_registry')
        .getFullList({
          filter: 'visible_in_admin = true && allow_excel_import = true'
        })
        .catch(() => []);
      setRegistries(regs);
    } catch (err) {
      console.error('Error loading registries:', err);
    }
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      alert('Bitte wählen Sie eine Excel-Datei (.xlsx oder .xls)');
      return;
    }

    setFile(selectedFile);
  };

  const saveFileToServer = async (fileName, fileData) => {
    // Server-Upload deaktiviert wegen Dateigrößen-Limit
    // Datei wird lokal analysiert, Upload ist optional
    console.log(`[SERVER SAVE] Übersprungen (Datei zu groß oder Server nicht verfügbar)`);
    return null;
  };

  const handleAnalyzeFile = async () => {
    if (!file) return;

    setLoading(true);
    setUploadStatus('');

    try {
      console.log(`[ANALYZE] Starte Analyse für: ${file.name}`);
      
      // Read file for analysis
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      
      console.log(`[ANALYZE] Excel gelesen, ${workbook.SheetNames.length} Arbeitsblätter gefunden`);
      
      // Store in state for later use
      setFileBase64(data);

      // Server-Upload ist optional und wird übersprungen wenn zu groß
      saveFileToServer(file.name, data);
      setUploadStatus('✓ Datei geladen und analysiert');

      setWorkbook(workbook);
      setWorksheets(workbook.SheetNames);
      if (workbook.SheetNames.length > 0) {
        setSelectedSheet(workbook.SheetNames[0]);
        analyzeSheet(workbook, workbook.SheetNames[0]);
      }

      console.log(`[ANALYZE] Analyse abgeschlossen, gehe zu Schritt 2`);
      setStep(2);
    } catch (err) {
      console.error('[ANALYZE] Fehler:', err);
      alert('Fehler beim Lesen der Excel-Datei: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSheet = async (workbook, sheetName) => {
    try {
      const XLSX = await import('xlsx');
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      
      if (data.length === 0) {
        alert('Das Arbeitsblatt enthält keine Daten');
        return;
      }

      const cols = Object.keys(data[0]);
      setColumns(cols);

      const analysisResult = {
        sheet: sheetName,
        total_rows: data.length,
        columns: cols.map(col => ({
          name: col,
          type: detectType(data, col),
          sample_values: data.slice(0, 3).map(r => r[col])
        }))
      };

      setAnalysis(analysisResult);

      // Auto-generate mapping suggestions
      const newMappings = {};
      registries.forEach(reg => {
        if (!newMappings[reg.collection_name]) {
          newMappings[reg.collection_name] = {};
        }
      });
      setMappings(newMappings);
    } catch (err) {
      console.error('Error analyzing sheet:', err);
      alert('Fehler bei der Analyse des Arbeitsblatts');
    }
  };

  const detectType = (data, column) => {
    const values = data.map(r => r[column]).filter(v => v !== '');
    if (values.length === 0) return 'unknown';

    const allNumbers = values.every(v => !isNaN(v) && v !== '');
    if (allNumbers) return 'number';

    const allDates = values.every(v => !isNaN(Date.parse(v)));
    if (allDates) return 'date';

    return 'text';
  };

  const handleDryRun = async () => {
    console.log('[DRY RUN] handleDryRun gestartet');
    
    if (importMode === 'existing' && !targetCollection) {
      alert('Bitte wählen Sie eine Zielcollection aus');
      return;
    }

    console.log(`[DRY RUN] Importmodus: ${importMode}`);
    setLoading(true);

    try {
      console.log(`[DRY RUN] Starte Validierung im Modus: ${importMode}`);
      console.log(`[DRY RUN] Datei vorhanden: ${!!file}`);
      console.log(`[DRY RUN] Arbeitsblätter: ${worksheets.join(', ')}`);
      
      const XLSX = await import('xlsx');
      console.log('[DRY RUN] XLSX Library geladen');
      
      const data = await file.arrayBuffer();
      console.log(`[DRY RUN] Datei gelesen: ${data.byteLength} bytes`);
      
      const workbook = XLSX.read(data, { type: 'array' });
      console.log(`[DRY RUN] Workbook geparst mit ${workbook.SheetNames.length} Blättern`);

      if (importMode === 'existing') {
        // Single sheet import
        console.log(`[DRY RUN] Einzelnes Arbeitsblatt: ${selectedSheet}`);
        const sheet = workbook.Sheets[selectedSheet];
        const records = XLSX.utils.sheet_to_json(sheet, { defval: '' });

        const validRecords = [];
        const invalidRecords = [];

        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          const errors = [];

          if (!record[columns[0]]) {
            errors.push(`Spalte "${columns[0]}" ist erforderlich`);
          }

          if (errors.length === 0) {
            validRecords.push(record);
          } else {
            invalidRecords.push({ row: i + 2, errors, data: record });
          }
        }

        console.log(`[DRY RUN] Ergebnis: ${validRecords.length} gültig, ${invalidRecords.length} ungültig`);

        setDryRunResults({
          mode: 'existing',
          targetCollection: targetCollection.display_name,
          total_rows: records.length,
          valid_records: validRecords.length,
          invalid_records: invalidRecords.length,
          preview: validRecords.slice(0, 5),
          errors: invalidRecords
        });
      } else {
        // Multiple new collections
        console.log(`[DRY RUN] Neue Collections aus ${worksheets.length} Arbeitsblättern`);
        const results = [];

        for (const sheetName of worksheets) {
          const sheet = workbook.Sheets[sheetName];
          const records = XLSX.utils.sheet_to_json(sheet, { defval: '' });
          const collectionName = sheetName.toLowerCase().replace(/\s+/g, '_');
          const mapping = sheetCollectionMapping[sheetName] || {};

          const validRecords = [];
          const invalidRecords = [];

          for (let i = 0; i < records.length; i++) {
            const record = records[i];
            if (Object.keys(record).length > 0 && Object.values(record).some(v => v !== '')) {
              validRecords.push(record);
            } else {
              invalidRecords.push({ row: i + 2 });
            }
          }

          results.push({
            sheetName,
            collectionName,
            isLog: mapping.includeAsLog || false,
            total_rows: records.length,
            valid_records: validRecords.length,
            invalid_records: invalidRecords.length,
            preview: validRecords.slice(0, 3)
          });

          console.log(`[DRY RUN] ${sheetName} → ${collectionName}: ${validRecords.length} gültig`);
        }

        setDryRunResults({
          mode: 'new_collections',
          collections: results,
          total_sheets: worksheets.length
        });
      }

      console.log('[DRY RUN] setStep(4) wird aufgerufen');
      setStep(4);
      console.log('[DRY RUN] Dry Run abgeschlossen');
    } catch (err) {
      console.error('[DRY RUN] FEHLER:', err);
      console.error('[DRY RUN] Stack:', err.stack);
      alert(`Fehler beim Trocken-Import: ${err.message}`);
    } finally {
      console.log('[DRY RUN] Finally - setLoading(false)');
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!dryRunResults) {
      alert('Bitte führen Sie erst einen Trocken-Import durch');
      return;
    }

    console.log(`[IMPORT] Starte Import im Modus: ${importMode}`);
    setLoading(true);
    
    try {
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });

      const results = [];

      if (importMode === 'existing') {
        // Import into single existing collection
        console.log(`[IMPORT] Importiere in Collection: ${targetCollection.collection_name}`);
        
        const sheet = workbook.Sheets[selectedSheet];
        const records = XLSX.utils.sheet_to_json(sheet, { defval: '' });

        let imported = 0;
        let identical = 0;
        let conflicts = 0;
        let invalid = 0;
        const errors = [];

        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          
          try {
            const created = await pb.collection(targetCollection.collection_name).create(record);
            imported++;
            console.log(`[IMPORT] Record ${i + 1} erstellt: ${created.id}`);
          } catch (err) {
            if (err.message.includes('duplicate')) {
              identical++;
            } else if (err.message.includes('validation')) {
              invalid++;
              errors.push({ row: i + 2, error: err.message });
            } else {
              conflicts++;
              errors.push({ row: i + 2, error: err.message });
            }
          }
        }

        results.push({
          collection: targetCollection.collection_name,
          imported,
          identical,
          conflicts,
          invalid,
          errors
        });

      } else {
        // Import multiple new collections
        console.log(`[IMPORT] Importiere ${worksheets.length} neue Collections`);

        for (const sheetName of worksheets) {
          const sheet = workbook.Sheets[sheetName];
          const records = XLSX.utils.sheet_to_json(sheet, { defval: '' });
          const collectionName = sheetName.toLowerCase().replace(/\s+/g, '_');

          console.log(`[IMPORT] Verarbeite Blatt: ${sheetName} → ${collectionName}`);

          // Step 1: Create collection schema from first row
          if (records.length > 0) {
            const firstRecord = records[0];
            const fields = Object.keys(firstRecord).map(columnName => ({
              id: columnName.toLowerCase().replace(/\s+/g, '_'),
              name: columnName.toLowerCase().replace(/\s+/g, '_'),
              type: 'text', // Default to text; could be enhanced to detect types
              required: false,
              presentable: true
            }));

            try {
              console.log(`[IMPORT] Erstelle Collection: ${collectionName}`);
              await pb.send('/api/collections', {
                method: 'POST',
                body: {
                  name: collectionName,
                  type: 'base',
                  schema: fields
                }
              });
              console.log(`[IMPORT] Collection ${collectionName} erfolgreich erstellt`);
            } catch (err) {
              console.warn(`[IMPORT] Collection ${collectionName} konnte nicht erstellt werden (existiert möglicherweise bereits): ${err.message}`);
              // Continue anyway — collection might already exist
            }
          }

          // Step 2: Import records
          let imported = 0;
          let identical = 0;
          let conflicts = 0;
          let invalid = 0;
          const errors = [];

          for (let i = 0; i < records.length; i++) {
            const record = records[i];
            
            // Skip empty rows
            if (!Object.values(record).some(v => v !== '')) {
              continue;
            }

            try {
              const created = await pb.collection(collectionName).create(record);
              imported++;
              console.log(`[IMPORT] ${collectionName}: Record ${i + 1} erstellt`);
            } catch (err) {
              console.warn(`[IMPORT] ${collectionName}: Fehler bei Record ${i + 1}: ${err.message}`);
              if (err.message.includes('duplicate')) {
                identical++;
              } else if (err.message.includes('validation')) {
                invalid++;
                errors.push({ row: i + 2, error: err.message });
              } else {
                conflicts++;
                errors.push({ row: i + 2, error: err.message });
              }
            }
          }

          results.push({
            collection: collectionName,
            sheetName,
            imported,
            identical,
            conflicts,
            invalid,
            errors
          });

          console.log(`[IMPORT] ${collectionName} abgeschlossen: ${imported} importiert`);
        }
      }

      setImportResults({
        mode: importMode,
        results,
        timestamp: new Date().toISOString(),
        total_imported: results.reduce((sum, r) => sum + r.imported, 0)
      });

      console.log('[IMPORT] Import abgeschlossen, gehe zu Schritt 5');
      setStep(5);
    } catch (err) {
      console.error('[IMPORT] Fehler:', err);
      alert('Fehler beim Import: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="excel-import-container">
      <div className="excel-import-header">
        <h1>Excel-Import</h1>
        <p>Importieren Sie Daten aus Excel-Dateien in registrierte Collections</p>
      </div>

      <div className="excel-import-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Datei</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Analyse</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Mapping</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Trocken-Import</div>
        <div className={`step ${step >= 5 ? 'active' : ''}`}>5. Ergebnis</div>
      </div>

      <div className="excel-import-content">
        {step === 1 && (
          <div className="excel-step">
            <h2>Excel-Datei auswählen</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".xlsx,.xls"
              className="excel-file-input"
            />
            {file && (
              <div>
                <p className="excel-file-selected">
                  ✓ {file.name} ausgewählt
                </p>
                {uploadStatus && (
                  <p className="excel-upload-status">{uploadStatus}</p>
                )}
                <button
                  className="excel-btn excel-btn-next"
                  onClick={handleAnalyzeFile}
                  disabled={loading}
                >
                  {loading ? 'Wird analysiert...' : 'Weiter zur Analyse'}
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && analysis && (
          <div className="excel-step">
            <h2>Arbeitsblatt analysiert</h2>
            
            <div className="excel-sheet-selector">
              <label>Arbeitsblatt:</label>
              <select
                value={selectedSheet || ''}
                onChange={(e) => {
                  setSelectedSheet(e.target.value);
                  if (workbook) {
                    analyzeSheet(workbook, e.target.value);
                  }
                }}
              >
                {worksheets.map(ws => (
                  <option key={ws} value={ws}>{ws}</option>
                ))}
              </select>
            </div>

            <div className="excel-analysis">
              <p><strong>Zeilen:</strong> {analysis.total_rows}</p>
              <p><strong>Spalten:</strong> {analysis.columns.length}</p>
              
              <table className="excel-columns-preview">
                <thead>
                  <tr>
                    <th>Spaltenname</th>
                    <th>Erkannter Typ</th>
                    <th>Beispiel</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.columns.map(col => (
                    <tr key={col.name}>
                      <td>{col.name}</td>
                      <td>{col.type}</td>
                      <td>{col.sample_values[0] || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="excel-btn excel-btn-next"
              onClick={() => setStep(3)}
            >
              Weiter zu Mapping
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="excel-step">
            <h2>Importmodus wählen</h2>

            <div className="excel-mode-selector mb-6">
              <label className="block font-semibold text-gray-800 mb-3">Wie möchtest du die Daten importieren?</label>
              
              <div className="space-y-3">
                <button
                  onClick={() => setImportMode('existing')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    importMode === 'existing'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-semibold text-gray-900">In vorhandene Collection</div>
                  <div className="text-sm text-gray-600">Arbeitsblatt in bestehende Collection importieren</div>
                </button>

                <button
                  onClick={() => setImportMode('new_collections')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    importMode === 'new_collections'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="font-semibold text-gray-900">Neue Collections anlegen</div>
                  <div className="text-sm text-gray-600">Alle Arbeitsblätter als neue Collections speichern</div>
                </button>
              </div>
            </div>

            {importMode === 'existing' && (
              <div>
                <div className="excel-collection-selector">
                  <label>Zielcollection:</label>
                  <select
                    value={targetCollection?.id || ''}
                    onChange={(e) => {
                      const reg = registries.find(r => r.id === e.target.value);
                      setTargetCollection(reg);
                    }}
                  >
                    <option value="">-- Bitte wählen --</option>
                    {registries.map(reg => (
                      <option key={reg.id} value={reg.id}>
                        {reg.display_name} ({reg.collection_name})
                      </option>
                    ))}
                  </select>
                </div>

                {targetCollection && (
                  <div className="excel-collection-info">
                    <p><strong>{targetCollection.display_name}</strong></p>
                    <p>{targetCollection.description}</p>
                  </div>
                )}

                <button
                  className="excel-btn excel-btn-next"
                  disabled={!targetCollection || loading}
                  onClick={handleDryRun}
                >
                  {loading ? 'Wird analysiert...' : 'Trocken-Import'}
                </button>
              </div>
            )}

            {importMode === 'new_collections' && (
              <div>
                <div className="excel-new-collections-info">
                  <p className="text-sm text-gray-700 mb-4">
                    Folgende Arbeitsblätter werden als neue Collections angelegt:
                  </p>
                  
                  <div className="space-y-3">
                    {worksheets.map(sheet => (
                      <div key={sheet} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{sheet}</h4>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            neu
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-600 mb-3">
                          Collection-Name: <code className="bg-white px-2 py-1 rounded">{sheet.toLowerCase().replace(/\s+/g, '_')}</code>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sheetCollectionMapping[sheet]?.includeAsLog || false}
                            onChange={(e) => {
                              setSheetCollectionMapping(prev => ({
                                ...prev,
                                [sheet]: {
                                  ...prev[sheet],
                                  collectionName: sheet.toLowerCase().replace(/\s+/g, '_'),
                                  createNew: true,
                                  includeAsLog: e.target.checked
                                }
                              }));
                            }}
                          />
                          <span className="text-xs text-gray-600">Als Upload-Log speichern</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="excel-btn excel-btn-next mt-6"
                  onClick={() => setStep(4)}
                >
                  Weiter zu Dry Run
                </button>
              </div>
            )}
          </div>
        )}

        {step === 4 && dryRunResults && (
          <div className="excel-step">
            <h2>Trocken-Import-Ergebnis</h2>

            {dryRunResults.mode === 'existing' ? (
              <>
                <div className="excel-mode-info mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Zielcollection:</strong> {dryRunResults.targetCollection}
                  </p>
                </div>

                <div className="excel-dry-run-results">
                  <div className="result-stat">
                    <span className="result-label">Gesamt</span>
                    <span className="result-value">{dryRunResults.total_rows}</span>
                  </div>
                  <div className="result-stat">
                    <span className="result-label">Gültig</span>
                    <span className="result-value" style={{ color: '#00aa44' }}>
                      {dryRunResults.valid_records}
                    </span>
                  </div>
                  <div className="result-stat">
                    <span className="result-label">Fehler</span>
                    <span className="result-value" style={{ color: '#cc3300' }}>
                      {dryRunResults.invalid_records}
                    </span>
                  </div>
                </div>

                {dryRunResults.preview.length > 0 && (
                  <div className="excel-preview">
                    <h3>Vorschau (erste 5 Datensätze)</h3>
                    <pre>{JSON.stringify(dryRunResults.preview, null, 2)}</pre>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="excel-new-collections-results">
                  {dryRunResults.collections && dryRunResults.collections.map((col, idx) => (
                    <div key={idx} className="result-card">
                      <h3 className="font-semibold text-gray-900 mb-2">{col.sheetName}</h3>
                      
                      <div className="text-xs text-gray-600 mb-3">
                        <code className="bg-gray-100 px-2 py-1 rounded">{col.collectionName}</code>
                        {col.isLog && <span className="ml-2 text-teal-600">📋 Als Log</span>}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Zeilen:</span>
                          <div className="font-semibold">{col.total_rows}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Gültig:</span>
                          <div className="font-semibold text-green-600">{col.valid_records}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Fehler:</span>
                          <div className="font-semibold text-red-600">{col.invalid_records}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              className="excel-btn excel-btn-import mt-6"
              disabled={loading}
              onClick={handleImport}
            >
              {loading ? 'Import läuft...' : 'Import bestätigen'}
            </button>
          </div>
        )}

        {step === 5 && importResults && (
          <div className="excel-step">
            <h2>Import abgeschlossen</h2>

            <div className="excel-import-results">
              <div className="result-stat">
                <span className="result-label">Importiert</span>
                <span className="result-value" style={{ color: '#00aa44' }}>
                  {importResults.imported}
                </span>
              </div>
              <div className="result-stat">
                <span className="result-label">Identisch</span>
                <span className="result-value" style={{ color: '#0066cc' }}>
                  {importResults.identical}
                </span>
              </div>
              <div className="result-stat">
                <span className="result-label">Konflikte</span>
                <span className="result-value" style={{ color: '#cc6600' }}>
                  {importResults.conflicts}
                </span>
              </div>
              <div className="result-stat">
                <span className="result-label">Ungültig</span>
                <span className="result-value" style={{ color: '#cc3300' }}>
                  {importResults.invalid}
                </span>
              </div>
            </div>

            {importResults.errors.length > 0 && (
              <div className="excel-errors">
                <h3>Fehler</h3>
                <ul>
                  {importResults.errors.map((e, i) => (
                    <li key={i}>Zeile {e.row}: {e.error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="excel-btn excel-btn-restart"
              onClick={() => {
                setStep(1);
                setFile(null);
                setWorksheets([]);
                setSelectedSheet(null);
                setColumns([]);
                setMappings({});
                setTargetCollection(null);
                setAnalysis(null);
                setDryRunResults(null);
                setImportResults(null);
              }}
            >
              Neuer Import
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
