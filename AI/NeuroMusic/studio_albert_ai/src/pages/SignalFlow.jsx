import { useState } from "react";
import devices from "../data/devices.json";
import connections from "../data/connections.json";

export default function SignalFlow() {
  const [selectedPath, setSelectedPath] = useState(null);

  const signalFlows = [
    {
      id: "kawai-to-monitors",
      title: "Kawai ES920 → Monitore",
      description: "Spielen auf dem Kawai und Abhören über die Studio Monitore",
      steps: [
        "Kawai ES920 (Audio Out L/R)",
        "↓ XLR Stereo Kabel",
        "Behringer X32 (Kanal 1-2)",
        "↓ Mischpult",
        "X32 Main L/R",
        "↓ XLR Stereo Kabel",
        "PreSonus Eris (Monitore)",
      ],
      devices: ["kawai-es920", "behringer-x32", "presonus-eris"],
    },
    {
      id: "kawai-daw",
      title: "Kawai ES920 → MacBook (DAW)",
      description: "MIDI vom Kawai zu Cubase auf dem MacBook",
      steps: [
        "Kawai ES920 (MIDI Out)",
        "↓ USB 2.0 Kabel",
        "MacBook Pro (USB-C)",
        "↓ Cubase MIDI In",
        "Virtual Instruments in Cubase",
      ],
      devices: ["kawai-es920", "macbook-pro"],
    },
    {
      id: "jv1010-full",
      title: "MacBook → JV1010 → Monitore",
      description: "Kompletter Signal-Flow für den Roland JV-1010",
      steps: [
        "MacBook Pro (MIDI Out)",
        "↓ 5-Pin DIN MIDI",
        "Roland JV-1010 (MIDI In)",
        "↓ Sound Generation",
        "JV-1010 Audio Out L/R",
        "↓ XLR Stereo Kabel",
        "Behringer X32 (Kanal 3-4)",
        "↓ Mischpult",
        "X32 Main L/R",
        "↓ XLR Stereo Kabel",
        "PreSonus Eris (Monitore)",
      ],
      devices: ["macbook-pro", "jv1010", "behringer-x32", "presonus-eris"],
    },
    {
      id: "tg500-full",
      title: "MacBook → TG500 → Monitore",
      description: "Signal-Flow für den Yamaha TG500",
      steps: [
        "MacBook Pro (MIDI Out)",
        "↓ 5-Pin DIN MIDI",
        "Yamaha TG500 (MIDI In)",
        "↓ FM Synthesis",
        "TG500 Audio Out L/R",
        "↓ XLR Stereo Kabel",
        "Behringer X32 (Kanal 5-6)",
        "↓ Mischpult",
        "X32 Main L/R",
        "↓ XLR Stereo Kabel",
        "PreSonus Eris (Monitore)",
      ],
      devices: ["macbook-pro", "yamaha-tg500", "behringer-x32", "presonus-eris"],
    },
    {
      id: "daw-usb",
      title: "MacBook → X32 (USB Audio)",
      description: "Multitrack Audio von der DAW zu Cubase via X32",
      steps: [
        "MacBook Pro (USB Audio Out)",
        "↓ USB 2.0 Kabel",
        "Behringer X32 (USB Port)",
        "↓ 32 Kanäle Audio Interface",
        "X32 Digital Mixer",
        "↓ Mix Down",
        "X32 Main L/R",
        "↓ XLR Stereo Kabel",
        "PreSonus Eris (Monitore)",
      ],
      devices: ["macbook-pro", "behringer-x32", "presonus-eris"],
    },
  ];

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Signalwege
          </h1>
          <p className="text-lg text-gray-400">
            Visualisierung aller Signalwege im Studio Albert
          </p>
        </div>

        {/* Signal Paths Grid */}
        <div className="space-y-6">
          {signalFlows.map((flow) => (
            <div
              key={flow.id}
              className={`border rounded-lg overflow-hidden transition-all cursor-pointer ${
                selectedPath === flow.id
                  ? "bg-gray-800/60 border-orange-600"
                  : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
              }`}
              onClick={() => setSelectedPath(selectedPath === flow.id ? null : flow.id)}
            >
              {/* Header */}
              <div className="px-6 py-6">
                <h3 className="text-xl font-bold text-white mb-2">{flow.title}</h3>
                <p className="text-gray-400 text-sm">{flow.description}</p>

                {/* Device badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {flow.devices.map((deviceId) => {
                    const device = devices.find((d) => d.id === deviceId);
                    return (
                      <span
                        key={deviceId}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                      >
                        {device?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Signal Flow Steps */}
              {selectedPath === flow.id && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                  <div className="space-y-3">
                    {flow.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        {/* Step indicator */}
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {step === "↓" ? "→" : idx + 1}
                          </span>
                        </div>

                        {/* Step text */}
                        <div className="flex-1">
                          {step === "↓" ? (
                            <div className="text-orange-400 text-2xl">↓</div>
                          ) : step.includes("→") ? (
                            <div className="text-orange-400 text-2xl flex items-center">
                              <span className="text-sm text-gray-400 ml-2">{step}</span>
                            </div>
                          ) : (
                            <div>
                              <p className="text-white font-medium text-lg">{step}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Details Box */}
                  <div className="mt-8 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Details dieses Signal-Flows:</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Alle Geräte müssen in dieser Reihenfolge verbunden sein</li>
                      <li>• Pegel sollten im grünen Bereich (-12dB bis -6dB) sein</li>
                      <li>• Monitoring über die Eris Monitore erfolgt latenzfrei</li>
                      <li>• Bei Problemen: Fehlerdatenbank konsultieren</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* General Signal Flow Principles */}
        <div className="mt-12 bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Grundprinzipien des Signal-Flows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-white font-semibold mb-2">Audio-Signal:</h3>
              <p className="text-sm">
                Audio-Signale fließen von Instrumenten über Mischer zu Monitoren. 
                Der Pegel sollte nie in den Rot-Bereich gehen (Clipping).
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">MIDI-Signal:</h3>
              <p className="text-sm">
                MIDI trägt keine Ton-Informationen, sondern nur Noten und Steuerdaten. 
                Mehrere MIDI-Geräte können an einem Ausgang angeschlossen sein.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">USB-Verbindung:</h3>
              <p className="text-sm">
                USB überträgt sowohl Audio als auch MIDI plus Stromversorgung. 
                Ideal für moderne Studios mit integrierten Geräten.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Master/Slave:</h3>
              <p className="text-sm">
                Alle Geräte sollten auf die gleiche Clock synchonisiert sein. 
                Typischerweise ist die DAW der Master.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
