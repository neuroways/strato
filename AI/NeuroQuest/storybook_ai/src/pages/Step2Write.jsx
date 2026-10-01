import { Link } from "react-router";

export default function Step2Write({ day = 1, round = 1 }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header: Progress */}
        <div className="text-center mb-8">
          <p className="text-sm text-yellow-600 font-medium">Tag {day} · Runde {round}</p>
          <p className="text-xs text-yellow-500 mt-1">Schritt 2 von 4</p>
        </div>

        {/* Step Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-yellow-900 text-center">Schritt 2</h2>
          <p className="text-yellow-700 text-lg mt-2 text-center">Schreibe den Satz</p>
        </div>

        {/* Instruction Box */}
        <div className="mb-8 p-8 bg-white rounded-2xl border-4 border-yellow-200 text-center">
          <p className="text-xl text-yellow-900 leading-relaxed">
            Schreibe den Satz in dein Heft.
          </p>
          <p className="text-xl text-yellow-900 leading-relaxed mt-4">
            Schreibe NUR diesen einen Satz.
          </p>
          <p className="text-lg text-yellow-700 mt-6 font-semibold">
            Nicht mehr, nicht weniger.
          </p>
        </div>

        {/* Character Tip */}
        <div className="mb-8 p-6 bg-yellow-100 rounded-xl border-2 border-yellow-300">
          <p className="text-yellow-900 text-center italic">
            ✏️ Caspar sagt: »Nimm dir Zeit. Es geht nicht um Schnelligkeit.«
          </p>
        </div>

        {/* Next Button */}
        <Link
          to={`/day/${day}/round/${round}/step/3`}
          className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-yellow-800 text-center"
        >
          Ich habe den Satz geschrieben
        </Link>
      </div>
    </div>
  );
}
