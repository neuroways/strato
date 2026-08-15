import { useState } from "react";
import { Cable, ChevronDown } from "lucide-react";
import cables from "../data/cables.json";
import devices from "../data/devices.json";

export default function Cabling() {
  const [expandedCable, setExpandedCable] = useState(null);
  const [selectedType, setSelectedType] = useState("alle");

  const cableTypes = ["alle", ...new Set(cables.map((c) => c.type))];

  const filteredCables =
    selectedType === "alle" ? cables : cables.filter((c) => c.type === selectedType);

  const statusColors = {
    active: "bg-green-900/30 text-green-400",
    inactive: "bg-gray-900/30 text-gray-400",
    damaged: "bg-red-900/30 text-red-400",
  };

  const signalTypeColors = {
    midi: "text-cyan-400",
    "audio-left": "text-green-400",
    "audio-right": "text-green-400",
    "usb-audio": "text-orange-400",
  };

  const getDeviceName = (id) => {
    return devices.find((d) => d.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Verbindungscheck
          </h1>
          <p className="text-lg text-gray-400">
            Alle Kabel im Studio und wie Geräte zusammenpassen
          </p>
        </div>

        {/* Cable Type Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {cableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === type
                  ? "bg-orange-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              {type === "alle"
                ? "Alle Kabel"
                : `${type} (${cables.filter((c) => c.type === type).length})`}
            </button>
          ))}
        </div>

        {/* Cables Grid */}
        <div className="space-y-4">
          {filteredCables.map((cable) => (
            <div
              key={cable.id}
              className="bg-gray-800/40 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
            >
              <button
                onClick={() =>
                  setExpandedCable(expandedCable === cable.id ? null : cable.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center gap-4 text-left flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Cable className="text-white" size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-white truncate">{cable.type}</h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-gray-400 text-sm">{cable.subtype}</span>
                      <span className="text-gray-400 text-sm">• {cable.length}m</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          statusColors[cable.status]
                        }`}
                      >
                        {cable.status === "active" && "Aktiv"}
                        {cable.status === "inactive" && "Inaktiv"}
                        {cable.status === "damaged" && "Beschädigt"}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-gray-400 transition-transform flex-shrink-0 ${
                    expandedCable === cable.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded Details */}
              {expandedCable === cable.id && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Specifications */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Kabeltyp</p>
                        <p className="text-white font-medium">{cable.type}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Variante</p>
                        <p className="text-white font-medium">{cable.subtype}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Länge</p>
                        <p className="text-white font-medium">{cable.length} Meter</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Farbe</p>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded border border-gray-600"
                            style={{
                              backgroundColor:
                                {
                                  black: "#000000",
                                  white: "#ffffff",
                                  gray: "#808080",
                                  blue: "#0000ff",
                                  red: "#ff0000",
                                  green: "#00aa00",
                                }[cable.color] || "#cccccc",
                            }}
                          ></div>
                          <p className="text-white font-medium capitalize">{cable.color}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Status</p>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            statusColors[cable.status]
                          }`}
                        >
                          {cable.status === "active" && "Aktiv"}
                          {cable.status === "inactive" && "Inaktiv"}
                          {cable.status === "damaged" && "Beschädigt"}
                        </span>
                      </div>
                    </div>

                    {/* Connection Info */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Quelle</p>
                        <p className="text-white font-medium">{getDeviceName(cable.source)}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Ziel</p>
                        <p className="text-white font-medium">{getDeviceName(cable.target)}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2">Signaltyp</p>
                        <p
                          className={`font-medium ${
                            signalTypeColors[cable.signalType] || "text-gray-300"
                          }`}
                        >
                          {cable.signalType
                            .replace(/-/g, " ")
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </p>
                      </div>

                      {cable.notes && (
                        <div>
                          <p className="text-gray-400 text-sm font-medium mb-2">Notizen</p>
                          <p className="text-gray-300">{cable.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCables.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Keine Kabel in dieser Kategorie gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
}
