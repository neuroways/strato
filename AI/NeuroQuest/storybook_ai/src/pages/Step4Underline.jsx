import { Link } from "react-router";

export default function Step4Underline({ day = 1, round = 1 }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header: Progress */}
        <div className="text-center mb-8">
          <p className="text-sm text-orange-600 font-medium">Tag {day} · Runde {round}</p>
          <p className="text-xs text-orange-500 mt-1">Schritt 4 von 4</p>
        </div>

        {/* Step Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-orange-900 text-center">Schritt 4</h2>
          <p className="text-orange-700 text-lg mt-2 text-center">Unterstreiche den Satz</p>
        </div>

        {/* Instruction Box */}
        <div className="mb-8 p-8 bg-white rounded-2xl border-4 border-orange-200 text-center">
          <p className="text-xl text-orange-900 leading-relaxed">
            Der Satz ist fertig.
          </p>
          <p className="text-xl text-orange-900 leading-relaxed mt-4">
            Unterstreiche ihn mit einem Lineal.
          </p>
          <p className="text-lg text-orange-700 mt-6 font-semibold">
            Von Anfang bis Ende.
          </p>
        </div>

        {/* Character Tip */}
        <div className="mb-8 p-6 bg-orange-100 rounded-xl border-2 border-orange-300">
          <p className="text-orange-900 text-center italic">
            ⭐ Caspar jubelt: »Du hast es geschafft! Jetzt kommt das Beste.«
          </p>
        </div>

        {/* Next Button */}
        <Link
          to={`/day/${day}/round/${round}/story`}
          className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-orange-800 text-center"
        >
          Fertig – Die Geschichte wartet!
        </Link>
      </div>
    </div>
  );
}
