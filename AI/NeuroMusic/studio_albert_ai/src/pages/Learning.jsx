import { useState, useEffect } from "react";
import { BookOpen, Play, Award, Brain } from "lucide-react";

export default function Learning() {
  const [activeTab, setActiveTab] = useState("kategorien");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const deviceRoles = [
    {
      id: "eingabegeräte",
      name: "Eingabegeräte",
      symbol: "⌨️",
      erklärung: "Geräte, mit denen Menschen Noten oder Steuerbefehle eingeben.",
      beispiele: ["Kawai ES920", "Launchpad Pro"],
      signalart: "MIDI",
      alltagsvergleich: "Ein Inputgerät ist wie ein Telefonhörer – du sprichst hinein und die Botschaft wird gesendet.",
    },
    {
      id: "klangerzeuger",
      name: "Klangerzeuger",
      symbol: "🎵",
      erklärung: "Geräte, die aus MIDI-Befehlen hörbaren Klang erzeugen.",
      beispiele: ["Roland JV-1010", "Yamaha TG500", "Roland Sound Canvas"],
      signalart: "MIDI In → Audio Out",
      alltagsvergleich: "Ein Klangerzeuger ist wie eine Stimme ohne Musiker. Er braucht Spielanweisungen, bevor er spielt.",
    },
    {
      id: "sampler",
      name: "Sampler",
      symbol: "📝",
      erklärung: "Geräte, die aufgenommene Klänge speichern und abspielen.",
      beispiele: ["Yamaha SU700", "Akai S2000"],
      signalart: "MIDI + Audio",
      alltagsvergleich: "Ein Sampler ist wie ein Tonbandgerät, das die Klänge merkt und bei Bedarf wiedergibt.",
    },
    {
      id: "misch-routing",
      name: "Mischpult",
      symbol: "🎚️",
      erklärung: "Geräte, die Signale sammeln und verteilen.",
      beispiele: ["Behringer X32"],
      signalart: "Audio",
      alltagsvergleich: "Das X32 ist wie eine Verkehrszentrale – alle Signale kommen rein, werden sortiert und zu ihrem Ziel weitergeleitet.",
    },
    {
      id: "aufnahme",
      name: "Aufnahmesysteme",
      symbol: "💾",
      erklärung: "Computer und Software für Aufnahme und Bearbeitung.",
      beispiele: ["MacBook mit Cubase", "X32 als Interface"],
      signalart: "Audio + MIDI",
      alltagsvergleich: "Die DAW ist ein digitales Aufnahmestudio im Computer.",
    },
    {
      id: "mikrofone",
      name: "Mikrofone",
      symbol: "🎤",
      erklärung: "Geräte, die Schall in elektrische Signale umwandeln.",
      beispiele: ["Neumann KMS 104", "Audio-Technica AT4035"],
      signalart: "Audio",
      alltagsvergleich: "Ein Mikrofon ist wie dein Ohr – es hört Schall und sendet die Information weiter.",
    },
    {
      id: "wiedergabe",
      name: "Lautsprecher",
      symbol: "🔊",
      erklärung: "Geräte, die Audio hörbar machen.",
      beispiele: ["PreSonus Eris E5", "Kopfhörer"],
      signalart: "Audio",
      alltagsvergleich: "Ein Lautsprecher ist wie dein Mund – er gibt aus, was die Elektronik sagt.",
    },
  ];

  const lernModule = [
    {
      id: "audio",
      titel: "Was ist Audio?",
      beschreibung: "Lerne, was Audio ist und wie es sich von MIDI unterscheidet.",
      zielklasse: 8,
      kapitel: 2,
    },
    {
      id: "midi",
      titel: "Was ist MIDI?",
      beschreibung: "MIDI überträgt keine Musik, sondern Spielanweisungen.",
      zielklasse: 8,
      kapitel: 2,
    },
    {
      id: "x32",
      titel: "Das Behringer X32",
      beschreibung: "Verstehe das Mischpult des Studios Schritt für Schritt.",
      zielklasse: 9,
      kapitel: 5,
    },
    {
      id: "aufnahme",
      titel: "Audio vs MIDI aufnehmen",
      beschreibung: "Was ist der Unterschied und wann benutzt du welche?",
      zielklasse: 9,
      kapitel: 3,
    },
  ];

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
            <Brain size={40} className="text-orange-500" />
            Studio-Missionen
          </h1>
          <p className="text-lg text-gray-400">
            Praktische Aufgaben: Baue deine erste Aufnahme auf, entdecke Synthesizer, produziere einen Song
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-700 flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("kategorien")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "kategorien"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            📦 Gerätekategorien
          </button>
          <button
            onClick={() => setActiveTab("module")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "module"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            📚 Lernmodule
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "quiz"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            ❓ Quiz
          </button>
          <button
            onClick={() => setActiveTab("verbindungen")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "verbindungen"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            🔌 Verbindungsmatrix
          </button>
        </div>

        {/* Kategorien Tab */}
        {activeTab === "kategorien" && (
          <div className="space-y-6">
            <p className="text-gray-300 mb-8">
              Jedes Gerät im Studio erfüllt eine bestimmte Aufgabe. Wähle eine Kategorie und lerne, welche Geräte darin gehören.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deviceRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedCategory(selectedCategory === role.id ? null : role.id)}
                  className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 hover:border-orange-600 transition-colors text-left"
                >
                  <div className="text-4xl mb-3">{role.symbol}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{role.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{role.erklärung}</p>
                  <p className="text-xs text-orange-400 font-medium">Signal: {role.signalart}</p>

                  {selectedCategory === role.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-300 mb-3">
                        <span className="font-semibold">💡 Vergleich:</span> {role.alltagsvergleich}
                      </p>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 mb-2">Geräte im Studio Albert:</p>
                        <ul className="space-y-1">
                          {role.beispiele.map((beispiel, idx) => (
                            <li key={idx} className="text-sm text-gray-300">
                              • {beispiel}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Module Tab */}
        {activeTab === "module" && (
          <div className="space-y-6">
            <p className="text-gray-300 mb-8">
              Wähle ein Modul und lerne Schritt für Schritt. Jedes Modul erklärt ein Thema ausführlich.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lernModule.map((modul) => (
                <div
                  key={modul.id}
                  className="bg-gray-800/40 border border-gray-700 rounded-lg p-6 hover:border-orange-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{modul.titel}</h3>
                      <p className="text-sm text-gray-400">{modul.beschreibung}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded">
                      Klasse {modul.zielklasse}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700">
                    <span>📖 {modul.kapitel} Kapitel</span>
                    <button className="text-orange-400 hover:text-orange-300 font-medium">
                      Starten →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/50 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <Award className="text-blue-400 flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Studio-Quiz</h3>
                  <p className="text-gray-400 mb-4">
                    Teste dein Wissen in 4 Schwierigkeitsstufen. Das Quiz erklärt jede Antwort.
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><span className="font-semibold">Stufe 1 – Entdecken:</span> Einfache Kategorisierung und Audio vs MIDI</p>
                    <p><span className="font-semibold">Stufe 2 – Anwenden:</span> Kabel wählen und Signalwege verstehen</p>
                    <p><span className="font-semibold">Stufe 3 – Verstehen:</span> Fehler erklären und Routing nachvollziehen</p>
                    <p><span className="font-semibold">Stufe 4 – Profi:</span> Komplexe Aufnahmeketten planen</p>
                  </div>
                  <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium">
                    Quiz starten
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verbindungsmatrix Tab */}
        {activeTab === "verbindungen" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Was kann ich womit verbinden?</h3>
              <p className="text-gray-400 mb-6">
                Wähle zwei Geräte und erfahre, ob und wie sie zusammenarbeiten können.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Startgerät</label>
                  <select className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-orange-500 focus:outline-none">
                    <option>Wähle ein Gerät</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-2">Zielgerät</label>
                  <select className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-orange-500 focus:outline-none">
                    <option>Wähle ein Gerät</option>
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-400 italic">
                Feature wird gerade entwickelt – hier entsteht eine interaktive Matrix mit Ampelsystem (grün ✓ / gelb ⚠ / rot ✗).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
