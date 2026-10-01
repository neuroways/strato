/**
 * ENM-JOURNEY-001 — Meine Reise
 * Ersetzt die bisherige Verlaufsansicht vollständig.
 * Wiederverwendet: getCheckinHistory, getResultRules, getActiveMethod,
 *                  resolveResultRule, deleteCheckin, ZoneIcon
 */
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
import { parseJourneyData, ACTIVITIES } from "../components/JourneyEntry.jsx";
import Trash2      from "icon:trash-2";
import ChevronRight from "icon:chevron-right";
import ChevronLeft  from "icon:chevron-left";
import Map          from "icon:map";
import ClipboardList from "icon:clipboard-list";
import TrendingUp    from "icon:trending-up";
import PatternsView  from "../components/PatternsView.jsx";

// ─── Zeitraum-Definitionen ────────────────────────────────────────────────────
const PERIODS = [
  { key: "today",  label: "Heute",          days: 0 },
  { key: "week",   label: "Diese Woche",    days: 7 },
  { key: "month",  label: "Dieser Monat",   days: 30 },
  { key: "year",   label: "Dieses Jahr",    days: 365 },
  { key: "all",    label: "Gesamte Reise",  days: null },
];

function startOfPeriod(key, offset = 0) {
  const now = new Date();
  if (key === "today") {
    const d = new Date(now);
    d.setDate(d.getDate() - offset);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (key === "week") {
    const d = new Date(now);
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - (day - 1) - offset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (key === "month") {
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    return d;
  }
  if (key === "year") {
    return new Date(now.getFullYear() - offset, 0, 1);
  }
  return null;
}

function endOfPeriod(key, offset = 0) {
  if (key === "today") {
    const d = startOfPeriod(key, offset);
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (key === "week") {
    const start = startOfPeriod(key, offset);
    const d = new Date(start);
    d.setDate(d.getDate() + 6);
    d.setHours(23, 59, 59, 999);
    return d;
  }
  if (key === "month") {
    const d = startOfPeriod(key, offset);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
  }
  if (key === "year") {
    return new Date(startOfPeriod(key, offset).getFullYear(), 11, 31, 23, 59, 59, 999);
  }
  return null;
}

function periodLabel(key, offset) {
  if (offset === 0) return PERIODS.find(p => p.key === key)?.label || "";
  const s = startOfPeriod(key, offset);
  if (!s) return "";
  const opts = key === "today"
    ? { weekday: "long", day: "numeric", month: "long" }
    : key === "week"
    ? { day: "numeric", month: "short" }
    : key === "month"
    ? { month: "long", year: "numeric" }
    : { year: "numeric" };
  return s.toLocaleDateString("de-DE", opts);
}

// ─── Beobachtungs-Texte ────────────────────────────────────────────────────────
function journeyObservation(entries, rules) {
  if (!entries.length) return null;
  if (entries.length === 1) return "Du hast in diesem Zeitraum einen Check-in abgeschlossen.";

  const scores = entries.map(e => e.total_score);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const spread = maxScore - minScore;

  // Zone-Häufigkeit
  const zoneCounts = {};
  entries.forEach(e => {
    const code = e.rule?.result_code || "unbekannt";
    zoneCounts[code] = (zoneCounts[code] || 0) + 1;
  });
  const dominantZone = Object.entries(zoneCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const dominantRule = rules.find(r => r.result_code === dominantZone);
  const dominantLabel = dominantRule?.result_label || dominantZone;

  // Richtungswechsel zählen
  let changes = 0;
  for (let i = 1; i < scores.length; i++) {
    if (Math.abs(scores[i] - scores[i - 1]) >= 4) changes++;
  }

  // Trend
  const first = scores[scores.length - 1]; // ältester (sortiert absteigend)
  const last  = scores[0];
  const trend = last - first;

  const sentences = [];

  if (entries.length >= 3 && spread < 5) {
    sentences.push(`Deine Reise verlief in diesem Zeitraum überwiegend gleichmäßig.`);
  } else if (changes >= Math.ceil(entries.length / 2)) {
    sentences.push(`In diesem Zeitraum gab es mehrere Richtungswechsel.`);
  }

  if (dominantLabel) {
    sentences.push(`Deine Energie bewegte sich am häufigsten im Bereich „${dominantLabel}".`);
  }

  if (trend > 4) {
    sentences.push(`Zuletzt zeigte sich eine Bewegung Richtung Festland.`);
  } else if (trend < -4) {
    sentences.push(`Zuletzt zeigte sich eine Bewegung Richtung Insel.`);
  }

  if (!sentences.length) {
    sentences.push(`${entries.length} Momente wurden auf dieser Reise festgehalten.`);
  }

  return sentences.join(" ");
}

// ─── Reisepunkt (einzelner Check-in) ─────────────────────────────────────────
function JourneyPoint({ entry, onDelete, deletingId, isLast }) {
  const rule = entry.rule;
  const color = rule?.color || "#2a9d8f";
  const bgColor = rule?.bg_color || "#e8f5f3";
  const time = new Date(entry.created);

  return (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      {/* Timeline column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
        {/* Dot */}
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          background: color, border: "3px solid #fff",
          boxShadow: `0 0 0 2px ${color}40`,
          flexShrink: 0, marginTop: 16, zIndex: 1,
          transition: "transform 0.2s, box-shadow 0.2s",
        }} />
        {/* Connector line */}
        {!isLast && (
          <div style={{
            width: 2, flex: 1, minHeight: 24,
            background: `linear-gradient(to bottom, ${color}60, ${color}20)`,
            margin: "4px 0",
          }} />
        )}
      </div>

      {/* Content card */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16, paddingLeft: 12 }}>
        <div style={{
          background: "#fff", border: `1px solid #eaeaea`,
          borderLeft: `3px solid ${color}`,
          borderRadius: 14, padding: "14px 16px",
          display: "flex", alignItems: "center", gap: 12,
          transition: "box-shadow 0.15s",
        }}>
          {/* Zone icon */}
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: bgColor, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ZoneIcon icon={rule?.icon} color={color} size={20} />
          </div>

          {/* Info */}
          <Link to={`/result/${entry.id}`} style={{ flex: 1, minWidth: 0, textDecoration: "none" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0A1F44", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {rule?.result_label || entry.result_label || "–"}
            </p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>
              {time.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" })}
              {" · "}
              {time.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
            </p>
          </Link>

          {/* Actions */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <Link to={`/result/${entry.id}`} style={{
              width: 32, height: 32, borderRadius: 10,
              background: "#f6f4f1", display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none",
            }}>
              <ChevronRight size={15} color="#6b7280" />
            </Link>
            <button
              onClick={() => onDelete(entry.id)}
              disabled={deletingId === entry.id}
              aria-label="Eintrag löschen"
              style={{
                width: 32, height: 32, borderRadius: 10,
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: deletingId === entry.id ? 0.4 : 1,
              }}
            >
              <Trash2 size={14} color="#ef4444" />
            </button>
          </div>
        </div>

        {/* Journey entry preview — note, activities, tags */}
        {(() => {
          const jd = parseJourneyData(entry);
          if (!jd.note && jd.activities.length === 0 && jd.tags.length === 0) return null;
          const acts = jd.activities.map(id => ACTIVITIES.find(a => a.id === id)).filter(Boolean);
          return (
            <div style={{ paddingTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {jd.note && (
                <p style={{ width: "100%", fontSize: 12, color: "#6b7280", lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
                  {jd.note}
                </p>
              )}
              {acts.map(a => (
                <span key={a.id} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "#e8f0fa", color: "#0A1F44" }}>
                  {a.emoji} {a.label}
                </span>
              ))}
              {jd.tags.map((t, i) => (
                <span key={i} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "#f0f4fa", border: "1px solid #c7d2e7", color: "#0A1F44" }}>
                  {"#"}{t}
                </span>
              ))}
            </div>
          );
        })()}

      </div>
    </div>
  );
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function Journey() {
  const [allEntries, setAllEntries]   = useState([]);
  const [rules, setRules]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [deletingId, setDeletingId]   = useState(null);
  const [period, setPeriod]           = useState("week");
  const [offset, setOffset]           = useState(0);
  const [view, setView]               = useState("journey"); // "journey" | "patterns"

  const load = useCallback(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const method = await getActiveMethod(controller.signal);
        const [historyRes, rs] = await Promise.all([
          getCheckinHistory(1, 500, controller.signal),
          getResultRules(method.id, controller.signal),
        ]);
        setRules(rs);
        setAllEntries(
          historyRes.items.map(item => ({
            ...item,
            rule: resolveResultRule(rs, item.total_score),
          }))
        );
      } catch (e) {
        if (!e?.isAbort && e?.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return controller;
  }, []);

  useEffect(() => { const c = load(); return () => c.abort(); }, [load]);
  useEffect(() => { setOffset(0); }, [period]);

  // Filter entries by period
  const filtered = period === "all" ? [...allEntries] : allEntries.filter(e => {
    const d = new Date(e.created);
    const start = startOfPeriod(period, offset);
    const end   = endOfPeriod(period, offset);
    return d >= start && d <= end;
  });

  // Chronological order (oldest first for journey display)
  const journey = [...filtered].sort((a, b) => new Date(a.created) - new Date(b.created));

  const canGoForward = offset > 0;
  const canGoBack    = period !== "all" && allEntries.some(e => {
    const d = new Date(e.created);
    const start = startOfPeriod(period, offset + 1);
    return start && d >= start;
  });

  async function handleDelete(id) {
    if (!confirm("Diesen Reisepunkt löschen?")) return;
    setDeletingId(id);
    try {
      await deleteCheckin(id);
      setAllEntries(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  }

  const observation = journeyObservation(filtered, rules);

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "28px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Map size={18} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A1F44", margin: 0 }}>Meine Reise</h1>
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: 0, paddingLeft: 46 }}>
          {allEntries.length === 0
            ? "Noch keine Reisepunkte."
            : `${allEntries.length} Reisepunkt${allEntries.length !== 1 ? "e" : ""} insgesamt`}
        </p>
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "#f6f4f1", borderRadius: 12, padding: 4 }}>
        {[
          { key: "journey",  label: "Reiseverlauf", Icon: Map },
          { key: "patterns", label: "Meine Muster",  Icon: TrendingUp },
        ].map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setView(key)} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            background: view === key ? "#fff" : "transparent",
            color: view === key ? "#0A1F44" : "#9ca3af",
            border: "none", cursor: "pointer",
            boxShadow: view === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
          }}>
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Zeitraum-Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {PERIODS.map(p => (
          <button key={p.key} onClick={() => setPeriod(p.key)} style={{
            padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
            background: period === p.key ? "#0A1F44" : "#f6f4f1",
            color: period === p.key ? "#fff" : "#6b7280",
            border: "none", cursor: "pointer", flexShrink: 0,
            transition: "background 0.15s, color 0.15s",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Period navigation */}
      {period !== "all" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "10px 14px", background: "#f6f4f1", borderRadius: 12 }}>
          <button
            onClick={() => setOffset(o => o + 1)}
            disabled={!canGoBack}
            style={{ background: "none", border: "none", cursor: canGoBack ? "pointer" : "default", opacity: canGoBack ? 1 : 0.3, padding: 4 }}
          >
            <ChevronLeft size={18} color="#0A1F44" />
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#0A1F44" }}>
            {periodLabel(period, offset)}
          </span>
          <button
            onClick={() => setOffset(o => Math.max(0, o - 1))}
            disabled={!canGoForward}
            style={{ background: "none", border: "none", cursor: canGoForward ? "pointer" : "default", opacity: canGoForward ? 1 : 0.3, padding: 4 }}
          >
            <ChevronRight size={18} color="#0A1F44" />
          </button>
        </div>
      )}

      {view === "journey" && (<>{/* Journey timeline */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, padding: "60px 0" }}>Reise wird geladen …</p>
      ) : journey.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 24px", background: "#f6f4f1", borderRadius: 20 }}>
          <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
            {allEntries.length === 0
              ? "Deine Reise beginnt mit deinem ersten Check-in."
              : "In diesem Zeitraum gibt es keine Reisepunkte."}
          </p>
          {allEntries.length === 0 && (
            <Link to="/checkin" style={{
              display: "inline-block", padding: "11px 24px",
              background: "#0A1F44", color: "#fff", borderRadius: 12,
              textDecoration: "none", fontSize: 14, fontWeight: 600,
            }}>
              Erste Etappe starten
            </Link>
          )}
        </div>
      ) : (
        <div style={{ marginBottom: 28 }}>
          {/* Zone legend strip */}
          {rules.length > 0 && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              {rules.map(r => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color }} />
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{r.result_label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Score path — mini sparkline */}
          {journey.length >= 2 && (
            <div style={{ marginBottom: 20, padding: "14px 16px", background: "#fff", borderRadius: 14, border: "1px solid #eaeaea" }}>
              <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                Verlauf der Energie
              </p>
              <svg viewBox={`0 0 ${journey.length * 40} 48`} style={{ width: "100%", height: 48, display: "block", overflow: "visible" }} preserveAspectRatio="none">
                {/* Gradient fill under line */}
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0A1F44" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#008CA8" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#7B4BA2" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#E2A83B" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {(() => {
                  const W = journey.length * 40;
                  const H = 48;
                  const minS = 6, maxS = 30;
                  const pts = journey.map((e, i) => {
                    const x = i === 0 ? 8 : (i / (journey.length - 1)) * (W - 16) + 8;
                    const y = H - 4 - ((e.total_score - minS) / (maxS - minS)) * (H - 12);
                    return `${x},${y}`;
                  });
                  const d = `M ${pts.join(" L ")}`;
                  return (
                    <>
                      <polyline points={pts.join(" ")} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {journey.map((e, i) => {
                        const [x, y] = pts[i].split(",").map(Number);
                        return <circle key={e.id} cx={x} cy={y} r="3.5" fill={e.rule?.color || "#2a9d8f"} stroke="#fff" strokeWidth="1.5" />;
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          )}

          {/* Journey points */}
          <div>
            {journey.map((entry, i) => (
              <JourneyPoint
                key={entry.id}
                entry={entry}
                onDelete={handleDelete}
                deletingId={deletingId}
                isLast={i === journey.length - 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Beobachtungs-Text */}
      {observation && journey.length > 0 && (
        <div style={{
          padding: "16px 20px", borderRadius: 16,
          background: "linear-gradient(135deg, #f6f4f1 0%, #fff 100%)",
          border: "1px solid #eaeaea",
          borderLeft: "3px solid #0A1F44",
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            Beobachtung
          </p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
            {observation}
          </p>
          <p style={{ fontSize: 11, color: "#b0b8c4", marginTop: 10 }}>
            Diese Beschreibung bewertet nicht und stellt keine Diagnose.
          </p>
        </div>
      )}

      </>)}

      {/* Patterns view */}
      {view === "patterns" && (
        <PatternsView entries={filtered} rules={rules} />
      )}

      {/* New check-in CTA */}
      {!loading && (
        <Link to="/checkin" style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "16px 20px", borderRadius: 16,
          background: "#0A1F44", textDecoration: "none",
          marginTop: 20,
        }}>
          <ClipboardList size={18} color="rgba(255,255,255,0.7)" />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", flex: 1 }}>Neue Etappe hinzufügen</span>
          <ChevronRight size={16} color="rgba(255,255,255,0.5)" />
        </Link>
      )}
    </main>
  );
}
