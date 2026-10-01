import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Camera, HelpCircle, Trash2 } from "lucide-react";
import { verificationService } from "../services/verification-service";

export default function Verification() {
  const [activeTab, setActiveTab] = useState("photos");
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadStats();
    loadTasks();
  }, []);

  const loadStats = () => {
    const stats = verificationService.calculateVerificationStats();
    setStats(stats);
  };

  const loadTasks = () => {
    const tasks = verificationService.getOffenePrüfaufgaben();
    setTasks(tasks);
  };

  const handleCompleteTask = (taskId, result) => {
    verificationService.completePrüfaufgabe(taskId, result);
    loadTasks();
    loadStats();
  };

  const priorityColors = {
    niedrig: "bg-blue-900/30 text-blue-400",
    mittel: "bg-yellow-900/30 text-yellow-400",
    hoch: "bg-orange-900/30 text-orange-400",
    kritisch: "bg-red-900/30 text-red-400",
  };

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
            <Camera size={40} />
            Mein Fortschritt
          </h1>
          <p className="text-lg text-gray-400">
            Qualitätssicherung für alle technischen Angaben
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm font-medium mb-2">Fotos</p>
              <p className="text-4xl font-bold text-white">{stats.gesamtFotos}</p>
              <p className="text-gray-500 text-sm mt-1">
                {stats.ausgewertete} ausgewertet
              </p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm font-medium mb-2">Ableitungen</p>
              <p className="text-4xl font-bold text-white">
                {stats.gesamtAbleitungen}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {stats.unbestätigtAbleitungen} unbestätigt
              </p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm font-medium mb-2">Bestätigt</p>
              <p className="text-4xl font-bold text-green-400">
                {stats.bestätigteAbleitungen}
              </p>
              <p className="text-gray-500 text-sm mt-1">durch Nutzer/Test</p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm font-medium mb-2">Aufgaben</p>
              <p className="text-4xl font-bold text-orange-400">
                {stats.offeneAufgaben}
              </p>
              <p className="text-gray-500 text-sm mt-1">offen</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-700 flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "tasks"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            📋 Prüfaufgaben
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "photos"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            📸 Fotos
          </button>
          <button
            onClick={() => setActiveTab("deductions")}
            className={`px-4 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "deductions"
                ? "border-orange-600 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            🔍 Ableitungen
          </button>
        </div>

        {/* Tab Content */}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-8 text-center">
                <CheckCircle className="inline-block text-green-400 mb-2" size={32} />
                <p className="text-gray-400">Keine offenen Prüfaufgaben</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-6 ${
                    priorityColors[task.priorität]
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {task.titel}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {task.beschreibung}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      priorityColors[task.priorität]
                    }`}>
                      {task.priorität}
                    </span>
                  </div>

                  {task.notizen && (
                    <p className="text-sm text-gray-300 mb-4 p-3 bg-black/30 rounded">
                      💡 {task.notizen}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const result = prompt("Prüfergebnis eingeben:");
                        if (result !== null) {
                          handleCompleteTask(task.id, result);
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      ✓ Erledigt
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      ⟳ In Prüfung
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-8 text-center">
            <Camera className="inline-block text-gray-400 mb-2" size={32} />
            <p className="text-gray-400">Foto-Upload-Feature wird entwickelt</p>
          </div>
        )}

        {/* Deductions Tab */}
        {activeTab === "deductions" && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-8 text-center">
            <HelpCircle className="inline-block text-gray-400 mb-2" size={32} />
            <p className="text-gray-400">Ableitungs-Review wird entwickelt</p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/50 rounded-lg p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Verifikationssystem-Erklärung
          </h2>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              <span className="font-semibold">✓ Durch Nutzer bestätigt:</span> Technische Angabe wurde von einer Person überprüft und freigegeben
            </p>
            <p>
              <span className="font-semibold">🔧 Technisch getestet:</span> Verbin dung oder Funktionalität wurde praktisch getestet
            </p>
            <p>
              <span className="font-semibold">📸 Durch Foto sichtbar:</span> Information direkt auf einem Foto erkennbar
            </p>
            <p>
              <span className="font-semibold">❓ Zu prüfen:</span> Basierend auf Fotos abgeleitet, aber noch nicht bestätigt
            </p>
            <p>
              <span className="font-semibold">⚠ Unbestätigt:</span> Nur vermuted oder noch nicht überprüft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
