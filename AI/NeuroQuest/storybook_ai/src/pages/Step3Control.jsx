import { Link } from "react-router";

export default function Step3Control({ day = 1, round = 1 }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header: Progress */}
        <div className="text-center mb-8">
          <p className="text-sm text-purple-600 font-medium">Tag {day} · Runde {round}</p>
          <p className="text-xs text-purple-500 mt-1">Schritt 3 von 4</p>
        </div>

        {/* Step Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-purple-900 text-center">Schritt 3</h2>
          <p className="text-purple-700 text-lg mt-2 text-center">Kontrolliere jeden Buchstaben</p>
        </div>

        {/* Instruction Box */}
        <div className="mb-8 p-8 bg-white rounded-2xl border-4 border-purple-200 text-center">
          <p className="text-xl text-purple-900 leading-relaxed">
            Vergleiche dein Geschriebenes mit dem Original.
          </p>
          <p className="text-xl text-purple-900 leading-relaxed mt-4">
            Wort für Wort. Buchstabe für Buchstabe.
          </p>
          <p className="text-lg text-purple-700 mt-6 font-semibold">
            Auch das Satzende!
          </p>
        </div>

        {/* Character Tip */}
        <div className="mb-8 p-6 bg-purple-100 rounded-xl border-2 border-purple-300">
          <p className="text-purple-900 text-center italic">
            🔍 Lumi flüstert: »Achte auf jeden winzigen Unterschied.«
          </p>
        </div>

        {/* Next Button */}
        <Link
          to={`/day/${day}/round/${round}/step/4`}
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-purple-800 text-center"
        >
          Ich habe alles kontrolliert
        </Link>
      </div>
    </div>
  );
}
