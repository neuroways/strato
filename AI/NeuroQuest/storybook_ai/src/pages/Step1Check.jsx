import { Link } from "react-router";

const stepContent = {
  1: {
    1: "Prüfe das Satzende: Punkt, Fragezeichen oder Ausrufezeichen?",
    2: "Prüfe das Satzende: Punkt, Fragezeichen oder Ausrufezeichen?",
    3: "Prüfe das Satzende: Punkt, Fragezeichen oder Ausrufezeichen?",
    4: "Prüfe das Satzende: Punkt, Fragezeichen oder Ausrufezeichen?",
    5: "Prüfe das Satzende: Punkt, Fragezeichen oder Ausrufezeichen?",
  },
};

export default function Step1Check({ day = 1, round = 1 }) {
  const instruction = stepContent[day]?.[round] || stepContent[1][1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header: Progress */}
        <div className="text-center mb-8">
          <p className="text-sm text-green-600 font-medium">Tag {day} · Runde {round}</p>
          <p className="text-xs text-green-500 mt-1">Schritt 1 von 4</p>
        </div>

        {/* Step Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-900 text-center">Schritt 1</h2>
          <p className="text-green-700 text-lg mt-2 text-center">Prüfe das Satzende</p>
        </div>

        {/* Instruction Box */}
        <div className="mb-8 p-8 bg-white rounded-2xl border-4 border-green-200 text-center">
          <p className="text-xl text-green-900 leading-relaxed">
            Schau in dein Schulbuch oder auf deinen Arbeitsblatt.
          </p>
          <p className="text-xl text-green-900 leading-relaxed mt-4">
            Welcher Satz ist dran?
          </p>
          <p className="text-lg text-green-700 mt-6 font-semibold">
            Hat er einen Punkt, ein Fragezeichen oder ein Ausrufezeichen?
          </p>
        </div>

        {/* Character Tip */}
        <div className="mb-8 p-6 bg-green-100 rounded-xl border-2 border-green-300">
          <p className="text-green-900 text-center italic">
            💡 Lumi flüstert: »Achte auf das letzte Zeichen!«
          </p>
        </div>

        {/* Next Button */}
        <Link
          to={`/day/${day}/round/${round}/step/2`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-green-800 text-center"
        >
          Ich habe das Satzende geprüft
        </Link>
      </div>
    </div>
  );
}
