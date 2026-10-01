import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo / Title */}
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-bold text-amber-900 mb-4">NeuroQuest</h1>
          <p className="text-xl text-amber-700">Die Geschichte, die dich erwartet</p>
        </div>

        {/* Introduction */}
        <div className="mb-12 p-8 bg-white rounded-2xl border-4 border-amber-200">
          <p className="text-xl text-amber-900 leading-relaxed">
            Hallo! Willkommen zu NeuroQuest.
          </p>
          <p className="text-xl text-amber-900 leading-relaxed mt-4">
            Hier erlebt du die Abenteuer von Caspar und Lumi.
          </p>
          <p className="text-lg text-amber-700 mt-6 font-semibold">
            Jeden Tag: eine kleine Aufgabe, eine große Geschichte.
          </p>
        </div>

        {/* Character Introduction */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-amber-100 rounded-xl border-2 border-amber-300">
            <p className="text-2xl mb-2">👦</p>
            <h3 className="text-lg font-bold text-amber-900 mb-2">Caspar</h3>
            <p className="text-amber-700">
              Ein neugieriges Kind. Freundlich. Macht Fehler und versucht es nochmal.
            </p>
          </div>
          <div className="p-6 bg-amber-100 rounded-xl border-2 border-amber-300">
            <p className="text-2xl mb-2">✨</p>
            <h3 className="text-lg font-bold text-amber-900 mb-2">Lumi</h3>
            <p className="text-amber-700">
              Ein kleines Lichtwesen. Ruhig. Geduldig. Immer an deiner Seite.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 p-8 bg-amber-50 rounded-2xl border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Die 5er-Regel:</h2>
          <ul className="space-y-3 text-amber-900 text-lg">
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">5 Tage</span>
              <span>—</span>
              <span>deine erste Geschichte</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">5 Runden</span>
              <span>—</span>
              <span>pro Tag</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">4 Schritte</span>
              <span>—</span>
              <span>pro Runde</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">1 Geschichte</span>
              <span>—</span>
              <span>deine tägliche Belohnung</span>
            </li>
          </ul>
        </div>

        {/* Important Message */}
        <div className="mb-12 p-8 bg-amber-100 rounded-2xl border-3 border-amber-300">
          <p className="text-amber-900 text-center text-lg italic">
            »Es geht nicht um Perfektion. Es geht darum, aufzupassen.«
          </p>
          <p className="text-amber-900 text-center text-lg italic mt-3">
            — Lumi
          </p>
        </div>

        {/* Start Button */}
        <Link
          to="/day/1/welcome"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-amber-800 text-center"
        >
          Lass die Geschichte beginnen
        </Link>
      </div>
    </div>
  );
}
