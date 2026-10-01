import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import {
  getCheckinHistory,
  getResultRules,
  getActiveMethod,
  resolveResultRule,
  deleteCheckin,
} from "../lib/engine.js";
import ZoneIcon from "../components/ZoneIcon.jsx";
import Trash2 from "icon:trash-2";
import ChevronRight from "icon:chevron-right";
import BarChart2 from "icon:bar-chart-2";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(() => {
    const controller = new AbortController();

    async function fetch() {
      try {
        const method = await getActiveMethod(controller.signal);
        const [historyRes, rs] = await Promise.all([
          getCheckinHistory(1, 100, controller.signal),
          getResultRules(method.id, controller.signal),
        ]);
        setRules(rs);
        setEntries(
          historyRes.items.map((item) => ({
            ...item,
            rule: resolveResultRule(rs, item.total_score),
          }))
        );
        setLoading(false);
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") setLoading(false);
      }
    }

    fetch();
    return controller;
  }, []);

  useEffect(() => {
    const ctrl = load();
    return () => ctrl.abort();
  }, [load]);

  async function handleDelete(id) {
    if (!confirm("Diesen Eintrag löschen?")) return;
    setDeletingId(id);
    try {
      await deleteCheckin(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  }

  // Mini chart — last 10 scores
  const chartEntries = [...entries].reverse().slice(-10);
  const maxScore = Math.max(...(chartEntries.map((e) => e.total_score || 1)), 1);

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <BarChart2 size={20} color="#2a9d8f" />
          <h1 className="text-xl font-bold text-gray-800">Verlauf</h1>
        </div>
        <p className="text-sm text-gray-400">
          {entries.length === 0
            ? "Noch keine Einträge."
            : `${entries.length} Check-in${entries.length !== 1 ? "s" : ""} gespeichert`}
        </p>
      </div>

      {/* Mini chart */}
      {chartEntries.length > 1 && (
        <div className="mb-8 bg-gray-50 rounded-3xl p-5 border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Verlauf (letzte {chartEntries.length} Einträge)
          </p>
          <div className="flex items-end gap-2 h-20">
            {chartEntries.map((e) => {
              const heightPct = (e.total_score / maxScore) * 100;
              return (
                <div key={e.id} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-lg relative" style={{ height: "64px" }}>
                    <div
                      className="absolute bottom-0 w-full rounded-lg"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: e.rule?.color || "#2a9d8f",
                        opacity: 0.7,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Zone legend */}
          {rules.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {rules.map((r) => (
                <div key={r.id} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-xs text-gray-400">{r.result_label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Entries list */}
      {loading ? (
        <p className="text-gray-400 text-sm text-center py-10">Wird geladen …</p>
      ) : entries.length === 0 ? (
        <div className="rounded-3xl bg-gray-50 border border-gray-100 p-8 text-center">
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Noch keine Einträge vorhanden. Starte deinen ersten Check-in.
          </p>
          <Link
            to="/checkin"
            className="inline-block rounded-2xl px-5 py-3 text-white text-sm font-medium"
            style={{ backgroundColor: "#2a9d8f" }}
          >
            Check-in starten
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => {
            const rule = entry.rule;
            return (
              <div
                key={entry.id}
                className="rounded-2xl bg-white border border-gray-100 px-5 py-4 flex items-center gap-4"
                style={{ borderLeft: `4px solid ${rule?.color || "#2a9d8f"}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: rule?.bg_color || "#e8f5f3" }}
                >
                  <ZoneIcon icon={rule?.icon} color={rule?.color || "#2a9d8f"} size={20} />
                </div>
                <Link to={`/result/${entry.id}`} className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {rule?.result_label || entry.result_label || "–"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.created).toLocaleDateString("de-DE", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" · "}
                    {new Date(entry.created).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} Uhr
                  </p>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/result/${entry.id}`}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={16} color="#6b7280" />
                  </Link>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deletingId === entry.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors disabled:opacity-40"
                    aria-label="Eintrag löschen"
                  >
                    <Trash2 size={15} color="#ef4444" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
