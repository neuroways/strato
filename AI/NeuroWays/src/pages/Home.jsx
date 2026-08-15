import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCheckinHistory, getResultRules, getActiveMethod, resolveResultRule } from "../lib/engine.js";
import ZoneCard from "../components/ZoneCard.jsx";
import ArrowRight from "icon:arrow-right";
import History from "icon:history";

export default function Home() {
  const [lastEntry, setLastEntry] = useState(null);
  const [lastRule, setLastRule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [method, historyRes] = await Promise.all([
          getActiveMethod(controller.signal),
          getCheckinHistory(1, 1, controller.signal),
        ]);

        if (historyRes.items.length > 0) {
          const entry = historyRes.items[0];
          const rules = await getResultRules(method.id, controller.signal);
          const rule = resolveResultRule(rules, entry.total_score);
          setLastEntry(entry);
          setLastRule(rule);
        }
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <main className="max-w-xl mx-auto px-5 pt-8 pb-28 md:pb-10">
      {/* Hero */}
      <div className="mb-10">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: "#e8f5f3" }}
        >
          <span className="text-2xl">🧭</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
          NeuroWays<br />
          <span style={{ color: "#2a9d8f" }}>Energy Navigator</span>
        </h1>
        <p className="text-gray-500 leading-relaxed text-base">
          Beobachte deinen aktuellen Energie- und Belastungszustand — klar, ruhig und ohne Bewertung.
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/checkin"
        className="flex items-center justify-between w-full rounded-2xl px-6 py-5 mb-8 group transition-all"
        style={{ backgroundColor: "#2a9d8f" }}
      >
        <div>
          <p className="text-white font-semibold text-lg leading-tight">Check-in starten</p>
          <p className="text-teal-100 text-sm mt-0.5">Kurze Fragen · ca. 2 Minuten</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <ArrowRight size={20} color="white" />
        </div>
      </Link>

      {/* Last result */}
      {!loading && lastEntry && lastRule && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Letztes Ergebnis
          </p>
          <Link to={`/result/${lastEntry.id}`} className="block rounded-3xl bg-gray-50 border border-gray-100 p-5 hover:border-gray-200 transition-colors">
            <p className="text-xs text-gray-400 mb-3">
              {new Date(lastEntry.created).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <ZoneCard rule={lastRule} compact />
          </Link>
        </div>
      )}

      {!loading && !lastEntry && (
        <div className="rounded-3xl bg-gray-50 border border-gray-100 p-6 mb-8 text-center">
          <p className="text-gray-400 text-sm leading-relaxed">
            Noch kein Eintrag vorhanden. Starte deinen ersten Check-in, um deinen aktuellen Bereich zu sehen.
          </p>
        </div>
      )}

      {/* History link */}
      <Link
        to="/history"
        className="flex items-center gap-3 w-full rounded-2xl px-5 py-4 bg-white border border-gray-200 hover:border-gray-300 transition-colors group"
      >
        <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
          <History size={18} color="#6b7280" />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-medium text-sm">Bisherigen Verlauf ansehen</p>
        </div>
        <ArrowRight size={16} color="#9ca3af" />
      </Link>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed mt-10 px-4">
        Diese App stellt keine medizinische Diagnose und gibt keine therapeutischen Empfehlungen.
        Sie dient ausschließlich der persönlichen Selbstbeobachtung.
      </p>
    </main>
  );
}
