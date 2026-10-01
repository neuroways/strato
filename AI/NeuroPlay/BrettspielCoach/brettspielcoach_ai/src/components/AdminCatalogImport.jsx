import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { parseCSV } from '../lib/parse-csv';
import { CatalogImporter } from '../lib/catalog-import.js';
import { checkCollections, getSchemaSetupInstructions } from '../lib/collection-check.js';

export function AdminCatalogImport() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleImport = async () => {
    setStatus('loading');
    setMessage('Checking database schema...');
    setErrors([]);

    try {
      // Check if collections exist
      const collectionCheck = await checkCollections();
      
      if (collectionCheck.missing.length > 0) {
        setStatus('error');
        setErrors([getSchemaSetupInstructions()]);
        setMessage('Schema-Setup erforderlich');
        return;
      }

      setMessage('Schema gefunden. CSV-Dateien werden geladen...');

      // Load CSV files
      const [publishersResponse, gamesResponse] = await Promise.all([
        fetch('/verlage.csv'),
        fetch('/spiele_anleitungen.csv')
      ]);

      if (!publishersResponse.ok || !gamesResponse.ok) {
        throw new Error('CSV files not found');
      }

      const publishersText = await publishersResponse.text();
      const gamesText = await gamesResponse.text();

      // Parse CSV
      const { rows: publishersData } = parseCSV(publishersText);
      const { rows: gamesData } = parseCSV(gamesText);

      setMessage(`Processing ${publishersData.length} publishers and ${gamesData.length} games...`);

      // Run import
      const importer = new CatalogImporter();
      const result = await importer.run(publishersData, gamesData);

      if (result.success) {
        setStatus('success');
        setMessage(`Import completed! Batch ID: ${result.batchId}`);
        setStats(result.stats);
      } else {
        setStatus('error');
        setMessage(`Import failed: ${result.error}`);
        setErrors(result.stats.errors);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Game Catalog Import</h1>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
          <p className="text-slate-300 mb-4">
            Import the board game source catalog (12 publishers, 52 games).
          </p>

          <button
            onClick={handleImport}
            disabled={status === 'loading'}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Upload className="w-5 h-5" />
            {status === 'loading' ? 'Importing...' : 'Start Import'}
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-slate-800 border border-slate-700 rounded-lg">
            <p className="text-slate-300">{message}</p>
          </div>
        )}

        {status === 'success' && stats && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Import successful</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400">Publishers</p>
                <p className="text-xl font-bold text-green-400">
                  {stats.publishersCreated + stats.publishersUpdated}
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400">Games</p>
                <p className="text-xl font-bold text-green-400">
                  {stats.gamesCreated + stats.gamesUpdated}
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400">Editions</p>
                <p className="text-xl font-bold text-green-400">
                  {stats.editionsCreated + stats.editionsUpdated}
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400">Rule Sources</p>
                <p className="text-xl font-bold text-green-400">
                  {stats.ruleSourcesCreated + stats.ruleSourcesUpdated}
                </p>
              </div>
            </div>

            {stats.warnings.length > 0 && (
              <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{stats.warnings.length} Warnings</span>
                </div>
                <ul className="text-sm text-yellow-300 space-y-1">
                  {stats.warnings.slice(0, 5).map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                  {stats.warnings.length > 5 && (
                    <li>... and {stats.warnings.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>Fehler</span>
            </div>

            {errors.length > 0 && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 space-y-3">
                {errors.map((e, i) => (
                  <div key={i} className="text-sm text-red-200">
                    <p className="whitespace-pre-wrap font-mono text-xs">{e}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
