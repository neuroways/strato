import { useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import devices from "../data/devices.json";

export default function Devices() {
  const [expandedDevice, setExpandedDevice] = useState(null);

  const categoryLabels = {
    keyboard: "Keyboards",
    "sound-module": "Sound Module",
    mixer: "Mischpult",
    computer: "Computer",
    speaker: "Monitore",
  };

  const categoryColors = {
    keyboard: "from-blue-500 to-blue-600",
    "sound-module": "from-purple-500 to-purple-600",
    mixer: "from-red-500 to-red-600",
    computer: "from-green-500 to-green-600",
    speaker: "from-yellow-500 to-yellow-600",
  };

  const groupedDevices = devices.reduce((acc, device) => {
    if (!acc[device.category]) {
      acc[device.category] = [];
    }
    acc[device.category].push(device);
    return acc;
  }, {});

  return (
    <div className="min-h-screen py-12 pb-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Gerätewelten
          </h1>
          <p className="text-lg text-gray-400">
            Erkunde die {devices.length} Geräte des ASG Klangwerks und ihre Rollen
          </p>
        </div>

        {/* Device Groups */}
        <div className="space-y-8">
          {Object.entries(groupedDevices).map(([category, categoryDevices]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[category]}`}></div>
                {categoryLabels[category]}
              </h2>

              <div className="space-y-4">
                {categoryDevices.map((device) => (
                  <div
                    key={device.id}
                    className="bg-gray-800/40 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
                  >
                    <button
                      onClick={() =>
                        setExpandedDevice(expandedDevice === device.id ? null : device.id)
                      }
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/20 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left flex-1">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center flex-shrink-0`}>
                          <Package className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{device.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {device.manufacturer} • {device.type} • {device.year}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`text-gray-400 transition-transform ${
                          expandedDevice === device.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded Details */}
                    {expandedDevice === device.id && (
                      <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <div>
                              <p className="text-gray-400 text-sm font-medium mb-2">Beschreibung</p>
                              <p className="text-gray-300">{device.description}</p>
                            </div>

                            {device.specs && (
                              <div>
                                <p className="text-gray-400 text-sm font-medium mb-2">Spezifikationen</p>
                                <div className="space-y-1 text-sm">
                                  {Object.entries(device.specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="text-gray-400 capitalize">{key}:</span>
                                      <span className="text-white font-medium">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4">
                            {device.inputs?.length > 0 && (
                              <div>
                                <p className="text-gray-400 text-sm font-medium mb-2">Eingänge</p>
                                <div className="space-y-2">
                                  {device.inputs.map((input) => (
                                    <div
                                      key={input.id}
                                      className="px-3 py-2 bg-gray-700/50 rounded text-sm"
                                    >
                                      <p className="text-white font-medium">{input.name}</p>
                                      <p className="text-gray-400 text-xs mt-1">{input.type}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {device.outputs?.length > 0 && (
                              <div>
                                <p className="text-gray-400 text-sm font-medium mb-2">Ausgänge</p>
                                <div className="space-y-2">
                                  {device.outputs.map((output) => (
                                    <div
                                      key={output.id}
                                      className="px-3 py-2 bg-gray-700/50 rounded text-sm"
                                    >
                                      <p className="text-white font-medium">{output.name}</p>
                                      <p className="text-gray-400 text-xs mt-1">{output.type}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
