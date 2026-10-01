import { Link } from "react-router";

export default function RoundStart({ day = 1, round = 1 }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header: Progress */}
        <div className="text-center mb-12">
          <p className="text-lg text-blue-600 font-medium">Tag {day}</p>
          <p className="text-sm text-blue-500 mt-1">Runde {round} von 5</p>
        </div>

        {/* Welcome */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">Bereit?</h1>
          <p className="text-2xl text-blue-700 leading-relaxed">
            Heute wartet eine neue Geschichte auf dich.
          </p>
          <p className="text-2xl text-blue-700 leading-relaxed mt-4">
            Aber zuerst eine kleine Aufgabe.
          </p>
        </div>

        {/* Character Greeting */}
        <div className="mb-12 p-8 bg-blue-100 rounded-2xl border-2 border-blue-300">
          <p className="text-blue-900 text-center text-xl italic">
            👋 Lumi sagt: »Hallo! Lass uns anfangen.«
          </p>
        </div>

        {/* Start Button */}
        <Link
          to={`/day/${day}/round/${round}/step/1`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-blue-800 text-center mb-4"
        >
          Los geht's!
        </Link>

        {/* Back Link */}
        <Link
          to={`/day/${day}/welcome`}
          className="block w-full text-center text-blue-600 hover:text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors"
        >
          ← Zurück
        </Link>
      </div>
    </div>
  );
}
