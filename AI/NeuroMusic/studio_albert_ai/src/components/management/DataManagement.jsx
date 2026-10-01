import { useState, useRef } from "react";
import { Download, Upload, RotateCcw, AlertTriangle } from "lucide-react";
import { studioDataService } from "../../services/studio-data-service";

export default function DataManagement() {
  const [importPreview, setImportPreview] = useState(null);
  const [importStrategy, setImportStrategy] = useState("merge");
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const data = studioDataService.getData();
    const json = studioDataService.exportData(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `studio-albert-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content !== "string") return;

      const result = studioDataService.importData(content);
      if (result.success) {
        setImportPreview({
          data: result.data,
          preview: result.preview,
        });
      } else {
        alert(`Import-Fehler: ${result.error}`);
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    if (!importPreview?.data) return;
    const strategy = importStrategy === "merge" ? "merge" : "overwrite";
    studioDataService.mergeImportedData(importPreview.data, strategy);
    setImportPreview(null);
    alert("Daten erfolgreich importiert!");
  };

  const handleReset = () => {
    if (confirm("Alle Daten wirklich auf den Ausgangszustand zurücksetzen?")) {
      studioDataService.resetToDefaults();
      alert("Daten zurückgesetzt!");
      setImportPreview(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export */}
      <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Download size={20} />
          Daten exportieren
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Speichere alle Studio-Daten als JSON-Datei auf deinem Computer
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          JSON exportieren
        </button>
      </div>

      {/* Import */}
      <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Upload size={20} />
          Daten importieren
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Importiere eine zuvor exportierte JSON-Datei
        </p>

        {!importPreview ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={handleImportClick}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Datei wählen und importieren
            </button>
          </>
        ) : (
          <div className="bg-gray-900/50 rounded p-4 mb-4">
            <h4 className="text-white font-semibold mb-3">Import-Vorschau</h4>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>📦 Neue Geräte: {importPreview.preview?.neueGeräte || 0}</p>
              <p>✏️ Geänderte Geräte: {importPreview.preview?.geändertGeräte || 0}</p>
              <p>📄 Weitere Datensätze: {importPreview.preview?.neueDatensätze || 0}</p>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-sm block mb-2">
                Importstrategie:
              </label>
              <select
                value={importStrategy}
                onChange={(e) => setImportStrategy(e.target.value)}
                className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600"
              >
                <option value="merge">
                  Zusammenführen (neue und veränderte Datensätze)
                </option>
                <option value="overwrite">
                  Komplett ersetzen (alle aktuellen Daten werden gelöscht)
                </option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmImport}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Importieren
              </button>
              <button
                onClick={() => setImportPreview(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <RotateCcw size={20} />
          Auf Ausgangszustand zurücksetzen
        </h3>
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="text-red-400 flex-shrink-0 mt-1" size={20} />
          <p className="text-gray-400 text-sm">
            Dies löscht alle lokalen Änderungen und stellt die ursprünglichen Demo-Daten wieder her.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Auf Standardwerte zurücksetzen
        </button>
      </div>

      {/* Info */}
      <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3">Speicherinformationen</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>✓ Alle Änderungen werden automatisch im Browser gespeichert</li>
          <li>✓ Speicherlocation: Browser localStorage</li>
          <li>✓ Verfügbarer Speicher: ~5-10 MB</li>
          <li>✓ Daten bleiben erhalten bis zum Löschen oder Browser-Reset</li>
          <li>→ Für permanente Speicherung: Regelmäßig exportieren</li>
        </ul>
      </div>
    </div>
  );
}
