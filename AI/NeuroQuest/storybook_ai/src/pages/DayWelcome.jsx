import { Link } from "react-router";

export default function DayWelcome({ day = 1 }) {
  const isFirstDay = day === 1;
  const greeting = isFirstDay
    ? "Willkommen zu NeuroQuest!"
    : `Tag ${day} wartet auf dich`;

  const subtext = isFirstDay
    ? "Eine Geschichte, 5 Aufgaben, eine Belohnung pro Tag."
    : `Du machst großartige Fortschritte, Caspar.`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Main Greeting */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-green-900 mb-4">{greeting}</h1>
          <p className="text-2xl text-green-700 leading-relaxed">{subtext}</p>
        </div>

        {/* Explanation Box */}
        <div className="mb-12 p-8 bg-white rounded-2xl border-4 border-green-200">
          <h2 className="text-2xl font-bold text-green-900 mb-6">So funktioniert dein Tag:</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-green-600 flex-shrink-0">1.</div>
              <div>
                <p className="text-lg font-semibold text-green-900">Prüfe das Satzende</p>
                <p className="text-green-700">Punkt? Fragezeichen? Ausrufezeichen?</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-green-600 flex-shrink-0">2.</div>
              <div>
                <p className="text-lg font-semibold text-green-900">Schreibe nur diesen Satz</p>
                <p className="text-green-700">In dein Heft. Genau wie im Buch.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-green-600 flex-shrink-0">3.</div>
              <div>
                <p className="text-lg font-semibold text-green-900">Kontrolliere jedes Wort</p>
                <p className="text-green-700">Vergleiche es mit dem Original.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-green-600 flex-shrink-0">4.</div>
              <div>
                <p className="text-lg font-semibold text-green-900">Unterstreiche den Satz</p>
                <p className="text-green-700">Mit einem Lineal. Fertig!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-green-600 flex-shrink-0">5.</div>
              <div>
                <p className="text-lg font-semibold text-green-900">Die Geschichte</p>
                <p className="text-green-700">Deine Belohnung. Nur für dich.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Character Box */}
        <div className="mb-12 p-8 bg-green-100 rounded-2xl border-2 border-green-300">
          <p className="text-green-900 text-center text-xl italic">
            💡 Lumi flüstert: »Es geht nicht um Geschwindigkeit oder Perfektion. Es geht um Aufmerksamkeit.«
          </p>
        </div>

        {/* Start Button */}
        <Link
          to={`/day/${day}/round/1/start`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-green-800 text-center"
        >
          Lass uns anfangen!
        </Link>

        {/* Optional: Home Link */}
        {!isFirstDay && (
          <Link
            to="/"
            className="block w-full text-center text-green-600 hover:text-green-700 font-semibold py-3 mt-4 rounded-xl hover:bg-green-50 transition-colors"
          >
            ← Zur Startseite
          </Link>
        )}
      </div>
    </div>
  );
}
