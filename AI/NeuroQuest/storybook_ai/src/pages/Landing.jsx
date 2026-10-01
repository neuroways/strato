import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        {/* Logo/Title Area */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-amber-900 mb-2">NeuroQuest</h1>
          <p className="text-lg text-amber-700">Ein interaktives Abenteuer</p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mb-8 aspect-square bg-amber-100 rounded-2xl flex items-center justify-center border-4 border-amber-200">
          <span className="text-amber-600 text-sm">Illustration kommt hier</span>
        </div>

        {/* Welcome Text */}
        <div className="mb-8 space-y-4">
          <p className="text-amber-900 text-lg leading-relaxed">
            Hallo! Ich bin <span className="font-semibold">Caspar</span> und das ist meine Freundin <span className="font-semibold">Lumi</span>.
          </p>
          <p className="text-amber-900 text-base leading-relaxed">
            Wir haben eine großartige Geschichte für dich. Aber um sie zu lesen, müssen wir ein paar Sätze zusammen üben.
          </p>
          <p className="text-amber-700 text-sm leading-relaxed">
            Keine Sorge – es ist ganz einfach. Und nach jedem Schritt wartet ein neues Kapitel auf dich.
          </p>
        </div>

        {/* Start Button */}
        <Link
          to="/day/1/round/1/story-intro"
          className="inline-block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-amber-800"
        >
          Los geht's!
        </Link>
      </div>
    </div>
  );
}
