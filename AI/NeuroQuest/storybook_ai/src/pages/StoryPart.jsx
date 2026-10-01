import { Link } from "react-router";

const storyContent = {
  1: {
    1: {
      title: "Caspar und Lumi",
      text: "Es war einmal ein Kind namens Caspar. Caspar war neugierig, freundlich und machte gerne neue Entdeckungen. Eines Tages traf Caspar im Wald ein kleines, glühendes Lichtwesen. Es hieß Lumi. Lumi war ruhig, geduldig und liebte es, Caspar zu helfen.",
    },
    2: {
      title: "Das geheime Abenteuer",
      text: "»Hallo, ich bin Lumi«, flüsterte das Lichtwesen. »Ich habe auf dich gewartet, Caspar. Wir beide haben eine wichtige Aufgabe.« Caspar war aufgeregt. »Was denn?«, fragte er. Lumi leuchtete noch heller. »Das wirst du gleich sehen.«",
    },
    3: {
      title: "Der erste Hinweis",
      text: "Lumi deutete auf einen alten, verrosteten Schlüssel im Gras. »Dieser Schlüssel ist magisch«, erklärte Lumi. »Aber er funktioniert nur, wenn du eine wichtige Sache ganz genau machst.« Caspar nahm den Schlüssel in die Hand. Er war warm und leuchtete schwach.",
    },
    4: {
      title: "Die Prüfung beginnt",
      text: "»Jetzt verstehe ich«, sagte Caspar langsam. »Der Schlüssel wird funktionieren, wenn ich mich konzentriere und alles ganz genau mache.« Lumi nickte. »Genau. Nicht schnell. Nicht perfekt. Nur aufmerksam.« Caspar lächelte. Die Reise konnte beginnen.",
    },
    5: {
      title: "Bis morgen, Caspar",
      text: "Die Sonne ging unter. Caspar legte den Schlüssel vorsichtig in seine Tasche. Morgen würde es weitergehen. Lumi flüsterte: »Du hast heute so gut aufgepasst. Das macht mir Mut.« Caspar war stolz. Nicht auf die Arbeit – sondern auf sich selbst.",
    },
  },
};

export default function StoryPart({ day = 1, round = 1 }) {
  const story = storyContent[day]?.[round] || storyContent[1][1];
  const isLastRound = round === 5;
  const nextLink = isLastRound ? `/day/${parseInt(day) + 1}/welcome` : `/day/${day}/round/${round + 1}/start`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full">
        {/* Header: Progress */}
        <div className="text-center mb-8">
          <p className="text-sm text-indigo-600 font-medium">Tag {day} · Runde {round}</p>
          <p className="text-xs text-indigo-500 mt-1">Die Belohnung für deine Aufmerksamkeit</p>
        </div>

        {/* Story Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-indigo-900">{story.title}</h2>
        </div>

        {/* Story Content */}
        <div className="mb-12 p-10 bg-white rounded-3xl border-4 border-indigo-200">
          <p className="text-2xl text-indigo-900 leading-relaxed font-serif">
            {story.text}
          </p>
        </div>

        {/* Character Encouragement */}
        <div className="mb-12 p-6 bg-indigo-100 rounded-xl border-2 border-indigo-300">
          <p className="text-indigo-900 text-center italic text-lg">
            ✨ Du machst das großartig. Weiter geht's!
          </p>
        </div>

        {/* Next Button */}
        <Link
          to={nextLink}
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-indigo-800 text-center"
        >
          {isLastRound ? "Neue Geschichte morgen" : "Nächste Runde"}
        </Link>
      </div>
    </div>
  );
}
