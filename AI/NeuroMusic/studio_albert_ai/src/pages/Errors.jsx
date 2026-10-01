import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import errors from "../data/errors.json";
import devices from "../data/devices.json";

export default function Errors() {
  const [expandedError, setExpandedError] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState("alle");

  const severities = ["alle", "critical", "high", "medium"];
  const severityColors = {
    critical: "bg-red-900/30 text-red-400 border-red-800",
    high: "bg-orange-900/30 text-orange-400 border-orange-800",
    medium: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
  };

  const severityLabels = {
    critical: "Kritisch",
    high: "Hoch",
    medium: "Mittel",
  };

  const filteredErrors =
    selectedSeverity === "alle"
      ? errors
      : errors.filter((e) => e.severity === selectedSeverity);

  const getDeviceName = (id) => {
    return devices.find((d) => d.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Studio-Notfall
          </h1>
          <p className="text-lg text-gray-400">
            Schnelle Lösungen für häufige Probleme im Studio
          </p>
        </div>

        {/* Severity Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {severities.map((severity) => (
            <button
              key={severity}
              onClick={() => setSelectedSeverity(severity)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                selectedSeverity === severity
                  ? "bg-orange-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              {severity === "alle"
                ? "Alle Fehler"
                : `${severityLabels[severity]} (${errors.filter((e) => e.severity === severity).length})`}
            </button>
          ))}
        </div>

        {/* Errors List */}
        <div className="space-y-4">
          {filteredErrors.map((error) => (
            <div
              key={error.id}
              className={`border rounded-lg overflow-hidden hover:border-opacity-70 transition-colors ${
                selectedSeverity !== "alle"
                  ? severityColors[error.severity]
                  : "bg-gray-800/40 border-gray-700"
              }`}
            >
              <button
                onClick={() =>
                  setExpandedError(expandedError === error.id ? null : error.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/20 transition-colors"
              >
                <div className="flex items-center gap-4 text-left flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{error.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{error.symptom}</p>
                  </div>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-gray-400 transition-transform flex-shrink-0 ${
                    expandedError === error.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expandedError === error.id && (
                <div className="px-6 pb-6 border-t border-gray-700/50 pt-6 bg-black/20">
                  {/* Causes */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Mögliche Ursachen:</h4>
                    <ul className="space-y-2">
                      {error.causes.map((cause, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-300">
                          <span className="text-orange-400 font-bold mt-0.5">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution Steps */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Lösungsschritte:</h4>
                    <ol className="space-y-3">
                      {error.solution.map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-gray-300">
                          <span className="text-blue-400 font-bold mt-0.5 flex-shrink-0">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Affected Devices */}
                  {error.affectedDevices?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Betroffene Geräte:</h4>
                      <div className="flex flex-wrap gap-2">
                        {error.affectedDevices.map((deviceId) => (
                          <span
                            key={deviceId}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
                          >
                            {getDeviceName(deviceId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Errors */}
                  {error.relatedErrors?.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3">Verwandte Fehler:</h4>
                      <div className="flex flex-wrap gap-2">
                        {error.relatedErrors.map((relatedId) => {
                          const relatedError = errors.find((e) => e.id === relatedId);
                          return (
                            <button
                              key={relatedId}
                              onClick={() => {
                                setExpandedError(relatedId);
                              }}
                              className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm hover:bg-blue-900/50 transition-colors"
                            >
                              {relatedError?.title || relatedId}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Keine Fehler in dieser Kategorie gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
}
