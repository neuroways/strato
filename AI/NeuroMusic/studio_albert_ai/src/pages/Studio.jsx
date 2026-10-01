import { useState, useMemo } from "react";
import { ChevronDown, Info, Zap } from "lucide-react";
import devices from "../data/devices.json";
import connections from "../data/connections.json";
import DeviceCard from "../components/DeviceCard";
import ConnectionLine from "../components/ConnectionLine";

export default function Studio() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);
  const [showLegend, setShowLegend] = useState(true);

  const connectionTypes = useMemo(
    () => ({
      audio: { color: "#22c55e", label: "Audio", icon: "🔊" },
      midi: { color: "#06b6d4", label: "MIDI", icon: "⚡" },
      usb: { color: "#f97316", label: "USB", icon: "🔌" },
      network: { color: "#a855f7", label: "Netzwerk", icon: "🌐" },
    }),
    []
  );

  const getDeviceColor = (type) => {
    const colors = {
      keyboard: "from-blue-500 to-blue-600",
      "sound-module": "from-purple-500 to-purple-600",
      mixer: "from-red-500 to-red-600",
      computer: "from-green-500 to-green-600",
      speaker: "from-yellow-500 to-yellow-600",
    };
    return colors[type] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Studio-Übersicht
          </h1>
          <p className="text-lg text-gray-400">
            Interaktive Darstellung aller Geräte und Verbindungen
          </p>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="mb-8 bg-gray-800/40 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Signaltypen</h2>
              <button
                onClick={() => setShowLegend(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(connectionTypes).map(([key, { color, label, icon }]) => (
                <div key={key} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-gray-300 text-sm">
                    {icon} {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Studio Layout */}
        <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-lg overflow-hidden min-h-[600px] p-8 mb-8">
          {/* SVG for Connections */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ minHeight: "600px" }}
          >
            <defs>
              <marker
                id="arrowhead-green"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
              </marker>
              <marker
                id="arrowhead-cyan"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
              </marker>
              <marker
                id="arrowhead-orange"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#f97316" />
              </marker>
            </defs>

            {connections.map((conn) => {
              const source = devices.find((d) => d.id === conn.source);
              const target = devices.find((d) => d.id === conn.target);

              if (!source || !target) return null;

              const color = connectionTypes[conn.type]?.color || "#666";
              const strokeWidth = hoveredConnection === conn.id ? 3 : 2;

              return (
                <g
                  key={conn.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    hoveredConnection === conn.id ? "opacity-100" : "opacity-70"
                  }`}
                  onMouseEnter={() => setHoveredConnection(conn.id)}
                  onMouseLeave={() => setHoveredConnection(null)}
                  style={{ pointerEvents: "auto" }}
                >
                  <line
                    x1={source.position.x + 120}
                    y1={source.position.y + 60}
                    x2={target.position.x + 120}
                    y2={target.position.y + 60}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    markerEnd={`url(#arrowhead-${
                      connectionTypes[conn.type]?.color === "#22c55e"
                        ? "green"
                        : connectionTypes[conn.type]?.color === "#06b6d4"
                          ? "cyan"
                          : "orange"
                    })`}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* Device Cards */}
          <div className="relative z-10">
            {devices.map((device) => (
              <div
                key={device.id}
                className="absolute transition-all duration-200"
                style={{
                  left: `${device.position.x}px`,
                  top: `${device.position.y}px`,
                }}
              >
                <button
                  onClick={() =>
                    setSelectedDevice(selectedDevice === device.id ? null : device.id)
                  }
                  className={`w-64 bg-gradient-to-br ${getDeviceColor(device.category)} rounded-lg p-4 text-white cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 ${
                    selectedDevice === device.id
                      ? "border-white shadow-2xl scale-105"
                      : "border-transparent"
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{device.name}</div>
                  <div className="text-sm opacity-90 mb-3">{device.manufacturer}</div>
                  <div className="text-xs opacity-75 bg-black/30 rounded px-2 py-1 inline-block">
                    {device.type}
                  </div>
                </button>

                {/* Device Info Popup */}
                {selectedDevice === device.id && (
                  <div className="absolute top-full left-0 mt-4 w-96 bg-gray-800 border border-gray-700 rounded-lg p-6 z-50 shadow-2xl">
                    <button
                      onClick={() => setSelectedDevice(null)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                    <h3 className="text-xl font-bold text-white mb-4">{device.name}</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Hersteller</p>
                        <p className="text-white">{device.manufacturer}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Typ</p>
                        <p className="text-white">{device.type}</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Beschreibung</p>
                        <p className="text-white text-sm">{device.description}</p>
                      </div>

                      {device.inputs?.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm font-medium mb-2">Eingänge</p>
                          <div className="space-y-1">
                            {device.inputs.map((input) => (
                              <div key={input.id} className="text-sm text-gray-300">
                                • {input.name} ({input.type})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {device.outputs?.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm font-medium mb-2">Ausgänge</p>
                          <div className="space-y-1">
                            {device.outputs.map((output) => (
                              <div key={output.id} className="text-sm text-gray-300">
                                • {output.name} ({output.type})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Connection Details */}
        {hoveredConnection && (
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
            {(() => {
              const conn = connections.find((c) => c.id === hoveredConnection);
              if (!conn) return null;
              const source = devices.find((d) => d.id === conn.source);
              const target = devices.find((d) => d.id === conn.target);

              return (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap size={20} /> Verbindungsdetails
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Quelle</p>
                      <p className="text-white font-medium">{source?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Ziel</p>
                      <p className="text-white font-medium">{target?.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Signaltyp</p>
                      <p className="text-white font-medium capitalize">
                        {connectionTypes[conn.type]?.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Kabeltyp</p>
                      <p className="text-white font-medium">{conn.cableType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Beschreibung</p>
                    <p className="text-gray-300">{conn.description}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
