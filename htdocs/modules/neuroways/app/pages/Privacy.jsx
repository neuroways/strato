import { useState } from "react";
import { exportAllData, deleteAllCheckins } from "../lib/engine.js";
import Shield from "icon:shield";
import Download from "icon:download";
import Trash2 from "icon:trash-2";
import CheckCircle from "icon:check-circle";

export default function Privacy() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    setStatus(null);
    try {
      const data = await exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `neuroways-verlauf-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("exported");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAll() {
    if (!confirm("Alle Daten unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.")) return;
    setLoading(true);
    setStatus(null);
    try {
      await deleteAllCheckins();
      setStatus("deleted");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#e8f5f3" }}
        >
          <Shield size={20} color="#2a9d8f" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Datenschutz</h1>
          <p className="text-sm text-gray-400">Deine Daten, deine Kontrolle</p>
        </div>
      </div>

      {/* Info blocks */}
      <div className="flex flex-col gap-4 mb-8">
        {[
          {
            title: "Deine Daten gehören dir",
            text: "Alle Einträge werden ausschließlich für dich gespeichert. Es findet keine Weitergabe an Dritte statt.",
          },
          {
            title: "Keine Weitergabe",
            text: "Deine Check-in-Daten werden nicht veröffentlicht und ohne deine ausdrückliche Zustimmung nicht geteilt.",
          },
          {
            title: "Standardmäßig privat",
            text: "Alle Einstellungen sind standardmäßig auf maximale Privatsphäre gesetzt. Es findet keine automatische Freigabe statt.",
          },
          {
            title: "Keine Diagnose",
            text: "Diese App wertet deine Daten nicht medizinisch aus und gibt keine therapeutischen Empfehlungen. Sie dient ausschließlich der persönlichen Selbstbeobachtung.",
          },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4">
            <p className="font-semibold text-gray-800 text-sm mb-1">{item.title}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Status messages */}
      {status === "exported" && (
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-5 bg-teal-50 border border-teal-100">
          <CheckCircle size={18} color="#2a9d8f" />
          <p className="text-sm text-teal-700 font-medium">Daten wurden erfolgreich exportiert.</p>
        </div>
      )}
      {status === "deleted" && (
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-5 bg-green-50 border border-green-100">
          <CheckCircle size={18} color="#059669" />
          <p className="text-sm text-green-700 font-medium">Alle Daten wurden gelöscht.</p>
        </div>
      )}
      {status === "error" && (
        <div className="rounded-2xl px-5 py-4 mb-5 bg-red-50 border border-red-100">
          <p className="text-sm text-red-700 font-medium">Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleExport}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors text-sm disabled:opacity-50"
        >
          <Download size={16} />
          Alle Daten exportieren
        </button>
        <button
          onClick={handleDeleteAll}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 bg-red-50 border-2 border-red-100 text-red-600 font-medium hover:bg-red-100 transition-colors text-sm disabled:opacity-50"
        >
          <Trash2 size={16} />
          Alle Daten löschen
        </button>
      </div>
    </main>
  );
}
