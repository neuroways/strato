import { Upload, Gamepad2, BookOpen } from 'lucide-react';

export function StartScreen({ onUpload, onExampleGame, onLibrary }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          NeuroPlay
        </h1>
        <p className="text-lg md:text-xl text-slate-300">
          Dein Brettspiel. Verständlich erklärt.
        </p>
      </div>

      {/* Main Actions */}
      <div className="w-full max-w-md space-y-4 mb-8">
        {/* Upload Button */}
        <button
          onClick={onUpload}
          className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <Upload className="w-5 h-5" />
            <span className="text-base font-semibold">Spielanleitung hochladen</span>
          </div>
        </button>

        {/* Example Game Button */}
        <button
          onClick={onExampleGame}
          className="w-full group relative px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <Gamepad2 className="w-5 h-5" />
            <span className="text-base font-semibold">Beispielspiel testen</span>
          </div>
        </button>

        {/* Library Button */}
        <button
          onClick={onLibrary}
          className="w-full group relative px-6 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5" />
            <span className="text-base font-semibold">Meine Spiele</span>
          </div>
        </button>
      </div>

      {/* Info Section */}
      <div className="w-full max-w-md mt-12 pt-8 border-t border-slate-700">
        <p className="text-sm text-slate-400 text-center">
          NeuroPlay hilft dir, Brettspiele wirklich zu verstehen — nicht nur Regeln auswendig zu lernen.
        </p>
      </div>
    </div>
  );
}
