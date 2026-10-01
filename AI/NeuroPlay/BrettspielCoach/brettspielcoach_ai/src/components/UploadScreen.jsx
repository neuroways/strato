import { Upload, X } from 'lucide-react';
import { useRef } from 'react';

export function UploadScreen({ onBack, onFileSelected }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelected(file);
    } else {
      alert('Bitte wähle eine PDF-Datei aus.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
          <span>Zurück</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Spielanleitung hochladen
        </h2>
        <p className="text-slate-400 text-center mb-12 max-w-md">
          Wähle eine PDF-Datei mit der Spielanleitung aus. NeuroPlay analysiert diese und erklärt dir das Spiel.
        </p>

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-md p-8 border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-800/50"
        >
          <div className="flex flex-col items-center gap-4">
            <Upload className="w-12 h-12 text-blue-500" />
            <div className="text-center">
              <p className="font-semibold">PDF-Datei wählen</p>
              <p className="text-sm text-slate-400 mt-2">Klick hier oder ziehe eine Datei</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <p className="text-xs text-slate-500 mt-8">
          Unterstützte Formate: PDF
        </p>
      </div>
    </div>
  );
}
