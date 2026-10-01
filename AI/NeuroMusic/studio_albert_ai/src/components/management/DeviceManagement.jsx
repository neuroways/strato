import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, ChevronDown } from "lucide-react";
import { studioDataService } from "../../services/studio-data-service";

export default function DeviceManagement() {
  const [devices, setDevices] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = () => {
    const data = studioDataService.getData();
    setDevices(data.geräte);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Gerät "${name}" wirklich löschen?`)) {
      studioDataService.deleteGerät(id);
      loadDevices();
    }
  };

  const handleStatusChange = (id, newStatus) => {
    studioDataService.updateGerät(id, { status: newStatus });
    loadDevices();
  };

  const handleDocStatusChange = (id, newStatus) => {
    studioDataService.updateGerät(id, { dokumentationsStatus: newStatus });
    loadDevices();
  };

  const filteredDevices =
    filter === "all"
      ? devices
      : devices.filter((d) => d.dokumentationsStatus === filter);

  const statusLabels = {
    aktiv: "🟢 Aktiv",
    inaktiv: "⚪ Inaktiv",
    "zu-prüfen": "🟡 Zu prüfen",
    reparatur: "🔴 Reparatur",
    ausgeliehen: "📤 Ausgeliehen",
  };

  const docStatusLabels = {
    "vollständig": "✓ Vollständig",
    "teilweise-dokumentiert": "◐ Teilweise",
    "ungeklärt": "? Ungeklärt",
    "nicht-begonnen": "○ Nicht begonnen",
    "zu-prüfen": "⧉ Zu prüfen",
  };

  return (
    <div className="space-y-6">
      {/* Filter und Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {["all", "vollständig", "teilweise-dokumentiert", "ungeklärt"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? "bg-orange-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {status === "all" ? "Alle" : docStatusLabels[status]}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Neues Gerät
        </button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Neues Gerät</h3>
          <p className="text-gray-400 text-sm">Feature noch in Entwicklung</p>
        </div>
      )}

      {/* Device List */}
      <div className="space-y-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-gray-800/40 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
          >
            <button
              onClick={() => setExpandedId(expandedId === device.id ? null : device.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/20 transition-colors"
            >
              <div className="text-left flex-1">
                <h3 className="text-lg font-bold text-white">{device.name}</h3>
                <div className="flex gap-3 mt-2 flex-wrap">
                  <span className="text-sm px-2 py-1 bg-gray-700/50 rounded text-gray-300">
                    {device.geräteKategorie}
                  </span>
                  <span className="text-sm text-gray-400">{device.modell}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    device.dokumentationsStatus === "vollständig"
                      ? "bg-green-900/30 text-green-400"
                      : device.dokumentationsStatus === "ungeklärt"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-gray-700/30 text-gray-300"
                  }`}>
                    {docStatusLabels[device.dokumentationsStatus]}
                  </span>
                </div>
              </div>
              <ChevronDown
                size={24}
                className={`text-gray-400 transition-transform ${
                  expandedId === device.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanded Details */}
            {expandedId === device.id && (
              <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">
                      Kurzbeschreibung
                    </p>
                    <p className="text-white">{device.kurzbeschreibung}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">
                      Status
                    </p>
                    <select
                      value={device.status}
                      onChange={(e) =>
                        handleStatusChange(device.id, e.target.value)
                      }
                      className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-orange-500"
                    >
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">
                      Dokumentationsstatus
                    </p>
                    <select
                      value={device.dokumentationsStatus}
                      onChange={(e) =>
                        handleDocStatusChange(device.id, e.target.value)
                      }
                      className="px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-orange-500"
                    >
                      {Object.entries(docStatusLabels).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Edit2 size={16} />
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(device.id, device.name)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          Keine Geräte gefunden
        </div>
      )}

      <p className="text-gray-500 text-sm mt-8">
        Insgesamt: {devices.length} Geräte
      </p>
    </div>
  );
}
