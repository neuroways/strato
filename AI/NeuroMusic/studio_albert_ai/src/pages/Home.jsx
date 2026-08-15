import { useState } from "react";
import { ChevronRight, Music, Zap, Radio, Disc3, Lightbulb, Trophy } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  const features = [
    {
      icon: <Music size={32} />,
      title: "Gerätewelten",
      desc: "Erkunde Keyboards, Synthesizer, Sampler, Mischpulte und Mikrofone des Studios.",
      cta: "Erkundung starten",
      path: "/devices",
    },
    {
      icon: <Zap size={32} />,
      title: "Verbindungscheck",
      desc: "Wähle zwei Geräte und finde heraus, wie sie zusammenpassen und was passiert.",
      cta: "Verbindung testen",
      path: "/cabling",
    },
    {
      icon: <Radio size={32} />,
      title: "Signalwege",
      desc: "Verfolge, wie Musik vom Keyboard bis zu den Lautsprechern fließt.",
      cta: "Wege erkunden",
      path: "/signal-flow",
    },
    {
      icon: <Disc3 size={32} />,
      title: "Studio-Missionen",
      desc: "Praktische Aufgaben: Baue deine erste Aufnahme auf, verbinde Synthesizer, produziere einen Song.",
      cta: "Missionen starten",
      path: "/learning",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Klang-Challenges",
      desc: "Rätsel über Musik, Technik und Studio. Jede Lösung erklärt den Hintergrund.",
      cta: "Challenge annehmen",
      path: "/quiz",
    },
    {
      icon: <Trophy size={32} />,
      title: "Mein Fortschritt",
      desc: "Verfolge deine Entdeckungen und sehe, welche Geräte und Verbindungen du schon beherrschst.",
      cta: "Fortschritt ansehen",
      path: "/verification",
    },
  ];

  const sections = [
    {
      title: "Klangwissen",
      desc: "Audio, MIDI, Routing, Synthesizer & Sampler – verstehe die Grundlagen.",
      path: "/knowledge",
    },
    {
      title: "Studio-Notfall",
      desc: "Warum kommt kein Ton? Das Mikrofon ist zu leise? Lösungen findest du hier.",
      path: "/errors",
    },
    {
      title: "Musikgeschichte",
      desc: "Die legendären Geräte der Musikproduktion und ihre besten Produktionen.",
      path: "/knowledge",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="relative pt-12 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo / Title */}
          <div className="mb-8">
            <img
              src="/static/asg-klangwerk-logo.png"
              alt="ASG Klangwerk"
              className="h-24 md:h-32 mx-auto mb-6 object-contain"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              ASG Klangwerk
            </h1>
            <p className="text-2xl md:text-3xl text-orange-500 font-semibold mb-6">
              Entdecken. Verbinden. Produzieren.
            </p>
          </div>

          {/* Hero Description */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Erkunde das Tonstudio des ASG auf völlig neue Weise. Verbinde Instrumente, Synthesizer, Mikrofone und Mischpult miteinander und finde heraus, was dabei passiert. Teste Signalwege, entdecke legendäre Klänge und werde Schritt für Schritt selbst zum Studio-Profi.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/devices"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
            >
              Studio erkunden
              <ChevronRight size={20} />
            </Link>
            <Link
              to="/cabling"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 text-lg border border-gray-700"
            >
              Verbindung testen
              <ChevronRight size={20} />
            </Link>
            <Link
              to="/quiz"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 text-lg border border-gray-700"
            >
              Challenge starten
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent opacity-30" />
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Link
              key={i}
              to={feature.path}
              className="group bg-gray-900/60 border border-gray-800 rounded-xl p-8 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {feature.desc}
              </p>
              <div className="flex items-center text-orange-500 font-semibold group-hover:gap-3 transition-all gap-2">
                {feature.cta}
                <ChevronRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Secondary Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Mehr Entdeckungen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <Link
              key={i}
              to={section.path}
              className="bg-gray-900/60 border border-gray-800 rounded-lg p-6 hover:border-orange-500/50 transition-all group"
            >
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {section.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-700/50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Was ist das ASG Klangwerk?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Das ASG Klangwerk ist mehr als eine Dokumentation. Es ist ein Ort zum Entdecken und Ausprobieren. Hier kannst du das Tonstudio des ASG erkunden, Instrumente und Geräte kennenlernen, Verbindungen verstehen und selbst kleine Aufnahmen planen.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Das Lernen geschieht spielerisch durch Ausprobieren. Du wirst nicht abgefragt – du wirst neugierig. Jede Seite beantwortet eine Frage: „Was passiert, wenn ich das mache?" Genau das macht dich Schritt für Schritt zum Studio-Profi.
          </p>
        </div>
      </div>

      {/* Footer Teaser */}
      <div className="border-t border-gray-800 mt-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Bist du bereit zu entdecken, was in einem professionellen Tonstudio alles möglich ist?
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Dann starte deine Reise jetzt – dein erstes Abenteuer wartet.
          </p>
        </div>
      </div>
    </div>
  );
}
