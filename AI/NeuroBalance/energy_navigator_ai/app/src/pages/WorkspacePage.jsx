/**
 * NW-HOME-001 — Personal Workspace
 * Persönlicher Einstiegspunkt. Modular aufgebaut.
 * Module registrieren ihre eigenen Dashboard-Karten über WORKSPACE_CARDS.
 */
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../lib/authContext.jsx";
import {
  getCheckinHistory,
  getResultRules,
  getActiveMethod,
  resolveResultRule,
} from "../lib/engine.js";
import { parseJourneyData, ACTIVITIES } from "../components/JourneyEntry.jsx";
import ZoneIcon from "../components/ZoneIcon.jsx";
import ArrowRight  from "icon:arrow-right";
import Waves       from "icon:waves";
import Map         from "icon:map";
import TrendingUp  from "icon:trending-up";
import ClipboardList from "icon:clipboard-list";
import LogOut      from "icon:log-out";
import Plus        from "icon:plus";

// ─── Modulares Karten-Register ────────────────────────────────────────────────
// Zukünftige Module registrieren hier eigene Dashboard-Karten.
// Die Workspace-Seite selbst kennt die Module nicht direkt.
const WORKSPACE_CARDS = [
  // Wird von Modulen befüllt — Energy Navigator registriert sich über die Engine
];

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────────
function greeting(hour) {
  if (hour < 5)  return "Gute Nacht";
  if (hour < 12) return "Guten Morgen";
  if (hour < 17) return "Hallo";
  if (hour < 22) return "Guten Abend";
  return "Gute Nacht";
}

function formatDate() {
  return new Date().toLocaleDateString("de-DE", {
    weekday: "long", day: "numeric", month: "long"
  });
}

function timeSince(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (h < 1)  return "Gerade eben";
  if (h < 24) return `Vor ${h} Stunde${h !== 1 ? "n" : ""}`;
  if (d === 1) return "Gestern";
  if (d < 7)  return `Vor ${d} Tagen`;
  return new Date(isoString).toLocaleDateString("de-DE", { day: "numeric", month: "short" });
}

function isToday(isoString) {
  if (!isoString) return false;
  const d = new Date(isoString);
  const n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
}

// ─── Subkomponenten ───────────────────────────────────────────────────────────

function QuickAction({ icon: Icon, label, sub, to, color = "#0A1F44", bg = "#f0f4fa" }) {
  return (
    <Link to={to} style={{
      display: "flex", flexDirection: "column", gap: 10,
      padding: "18px 18px", borderRadius: 18,
      background: color === "#0A1F44" ? color : "#fff",
      border: color === "#0A1F44" ? "none" : "1px solid #eaeaea",
      textDecoration: "none", transition: "transform 0.15s, box-shadow 0.15s",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 12, background: color === "#0A1F44" ? "rgba(255,255,255,0.15)" : bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color === "#0A1F44" ? "#fff" : color} />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: color === "#0A1F44" ? "#fff" : "#0A1F44", marginBottom: 2 }}>{label}</p>
        {sub && <p style={{ fontSize: 12, color: color === "#0A1F44" ? "rgba(255,255,255,0.6)" : "#9ca3af" }}>{sub}</p>}
      </div>
    </Link>
  );
}

function StatusCard({ lastCheckin, rule, lastEntry }) {
  if (!lastCheckin) return null;
  const color = rule?.color || "#2a9d8f";
  const jd = parseJourneyData(lastCheckin);
  const acts = jd.activities.map(id => ACTIVITIES.find(a => a.id === id)).filter(Boolean);

  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #eaeaea", overflow: "hidden" }}>
      {/* Zone strip */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: rule?.bg_color || "#e8f5f3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ZoneIcon icon={rule?.icon} color={color} size={22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Letzter Reiseabschnitt</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#0A1F44" }}>{rule?.result_label || "–"}</p>
        </div>
        <p style={{ fontSize: 12, color: "#b0b8c4", flexShrink: 0 }}>{timeSince(lastCheckin.created)}</p>
      </div>

      {/* Activities / tags preview */}
      {(acts.length > 0 || jd.tags.length > 0) && (
        <div style={{ padding: "12px 20px", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {acts.slice(0,4).map(a => (
            <span key={a.id} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: "#e8f0fa", color: "#0A1F44" }}>{a.emoji} {a.label}</span>
          ))}
          {jd.tags.slice(0,3).map((t, i) => (
            <span key={i} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: "#f0f4fa", border: "1px solid #c7d2e7", color: "#0A1F44" }}>{"#"}{t}</span>
          ))}
        </div>
      )}

      <div style={{ padding: "10px 20px 16px", display: "flex" }}>
        <Link to={`/result/${lastCheckin.id}`} style={{ fontSize: 13, color: "#008CA8", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          Details öffnen <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

function TodayCard({ hasCheckinToday }) {
  return (
    <div style={{
      background: hasCheckinToday ? "#f0fdf4" : "#0A1F44",
      borderRadius: 20,
      padding: "20px 24px",
      border: hasCheckinToday ? "1px solid #86efac" : "none",
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, color: hasCheckinToday ? "#166534" : "rgba(255,255,255,0.6)" }}>
        Heute
      </p>
      {hasCheckinToday ? (
        <div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#166534", marginBottom: 4 }}>✓ Energie bereits erfasst</p>
          <p style={{ fontSize: 13, color: "#166534", opacity: 0.8 }}>Du hast heute schon eingecheckt. Gut gemacht.</p>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Energie noch nicht erfasst</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Wie ist dein Energiezustand gerade?</p>
          </div>
          <Link to="/checkin" style={{
            width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0,
          }}>
            <Plus size={20} color="#fff" />
          </Link>
        </div>
      )}
    </div>
  );
}

function ActivityFeed({ entries }) {
  if (!entries || entries.length === 0) return null;
  return (
    <div>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Zuletzt aktiv</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.slice(0, 5).map((entry, i) => {
          const jd = parseJourneyData(entry);
          const hasJourney = jd.note || jd.activities.length > 0 || jd.tags.length > 0;
          return (
            <Link key={entry.id} to={`/result/${entry.id}`} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
              background: "#fff", borderRadius: 14, border: "1px solid #eaeaea",
              textDecoration: "none", transition: "border-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#c7d2e7"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#eaeaea"}
            >
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: entry.rule?.color || "#2a9d8f", flexShrink: 0,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0A1F44", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  Energie erfasst — {entry.rule?.result_label || "–"}
                  {hasJourney && <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>+ Reiseeintrag</span>}
                </p>
              </div>
              <p style={{ fontSize: 11, color: "#b0b8c4", flexShrink: 0 }}>{timeSince(entry.created)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ModuleCard({ icon: Icon, label, status = "Aktiv", lastUsed, to, color = "#0A1F44", bg = "#f0f4fa" }) {
  return (
    <Link to={to} style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 16px", background: "#fff", borderRadius: 16,
      border: "1px solid #eaeaea", textDecoration: "none",
      transition: "border-color 0.15s",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "#c7d2e7"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "#eaeaea"}
    >
      <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0A1F44", marginBottom: 1 }}>{label}</p>
        {lastUsed && <p style={{ fontSize: 11, color: "#9ca3af" }}>Zuletzt: {lastUsed}</p>}
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 8, background: bg, color }}>
        {status}
      </span>
    </Link>
  );
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function WorkspacePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [entries, setEntries]     = useState([]);
  const [rules, setRules]         = useState([]);
  const [loading, setLoading]     = useState(true);

  const displayName = user?.display_name || user?.email?.split("@")[0] || "Benutzer";
  const now = new Date();
  const hour = now.getHours();

  const load = useCallback(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const method = await getActiveMethod(controller.signal);
        const [histRes, rs] = await Promise.all([
          getCheckinHistory(1, 10, controller.signal),
          getResultRules(method.id, controller.signal),
        ]);
        setRules(rs);
        setEntries(histRes.items.map(e => ({ ...e, rule: resolveResultRule(rs, e.total_score) })));
      } catch (e) {
        if (!e?.isAbort && e?.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return controller;
  }, []);

  useEffect(() => { const c = load(); return () => c.abort(); }, [load]);

  const lastCheckin = entries[0] || null;
  const hasCheckinToday = isToday(lastCheckin?.created);

  async function handleLogout() { await logout(); navigate("/login", { replace: true }); }

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "28px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Persönliche Begrüßung ── */}
      <div style={{ marginBottom: 28 }}>
        {/* Brand wave */}
        <svg viewBox="0 0 200 18" fill="none" style={{ width: 160, display: "block", marginBottom: 16 }}>
          <defs>
            <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A1F44"/><stop offset="30%" stopColor="#008CA8"/>
              <stop offset="65%" stopColor="#7B4BA2"/><stop offset="90%" stopColor="#E2A83B"/>
            </linearGradient>
          </defs>
          <path d="M2 12 Q22 3 42 12 Q62 21 82 12 Q102 3 122 12 Q142 21 164 10" stroke="url(#wg)" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="172" cy="9.5" r="3" fill="#E2A83B"/>
          <line x1="178" y1="9.5" x2="196" y2="9.5" stroke="#E2A83B" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 13, color: "#008CA8", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
              {greeting(hour)},
            </p>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0A1F44", marginBottom: 4, lineHeight: 1.1 }}>
              {displayName}
            </h1>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>{formatDate()}</p>
          </div>
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
            background: "#f6f4f1", border: "1px solid #eaeaea",
            borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 500,
            color: "#9ca3af", fontFamily: "'DM Sans', sans-serif",
          }}>
            <LogOut size={13} />
            Abmelden
          </button>
        </div>
      </div>

      {/* ── Heute ── */}
      <section style={{ marginBottom: 28 }}>
        <TodayCard hasCheckinToday={hasCheckinToday} />
      </section>

      {/* ── Schnellaktionen ── */}
      <section style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
          Schnellaktionen
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <QuickAction icon={Waves}        label="Energie erfassen" sub="Check-in starten"     to="/checkin"            color="#0A1F44" />
          <QuickAction icon={Map}          label="Meine Reise"      sub="Reiseverlauf öffnen"  to="/history"            color="#008CA8" bg="#e0f7fa" />
          <QuickAction icon={TrendingUp}   label="Meine Muster"     sub="Zusammenhänge sehen"  to="/history"            color="#7B4BA2" bg="#f5f0fa" />
          <QuickAction icon={ClipboardList} label="Letztes Ergebnis" sub={lastCheckin ? timeSince(lastCheckin.created) : "Noch kein Check-in"} to={lastCheckin ? `/result/${lastCheckin.id}` : "/checkin"} color="#E2A83B" bg="#fff8e6" />
        </div>
      </section>

      {/* ── Persönlicher Status ── */}
      {!loading && lastCheckin && (
        <section style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
            Persönlicher Status
          </p>
          <StatusCard lastCheckin={lastCheckin} rule={lastCheckin?.rule} />
        </section>
      )}

      {/* ── Aktuelle Aktivitäten ── */}
      {!loading && entries.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <ActivityFeed entries={entries} />
        </section>
      )}

      {/* ── Erinnerungen (Platzhalter für Module) ── */}
      <section style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
          Erinnerungen
        </p>
        <div style={{ padding: "16px 20px", background: "#f8fafc", borderRadius: 16, border: "1px dashed #d4dce8" }}>
          <p style={{ fontSize: 13, color: "#b0b8c4", textAlign: "center" }}>
            Module können hier eigene Hinweise bereitstellen.
          </p>
        </div>
      </section>

      {/* ── Meine Module ── */}
      <section style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
          Meine Module
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <ModuleCard
            icon={Waves}
            label="Energy Navigator"
            status="Aktiv"
            lastUsed={lastCheckin ? timeSince(lastCheckin.created) : undefined}
            to="/checkin"
            color="#008CA8"
            bg="#e0f7fa"
          />
          {/* Zukünftige Module registrieren hier */}
          {WORKSPACE_CARDS.map((Card, i) => <Card key={i} />)}
        </div>
      </section>

      {/* Leer-Zustand nach erstem Login */}
      {!loading && entries.length === 0 && (
        <div style={{
          textAlign: "center", padding: "32px 24px",
          background: "linear-gradient(135deg, #f8fafc, #fff)",
          borderRadius: 20, border: "1px solid #eaeaea", marginBottom: 28,
        }}>
          <p style={{ fontSize: 22 }}>🌊</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#0A1F44", marginBottom: 8 }}>
            Deine Reise beginnt hier
          </p>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 20 }}>
            Starte deinen ersten Check-in, um deinen persönlichen Workspace zu befüllen.
          </p>
          <Link to="/checkin" style={{
            display: "inline-block", padding: "12px 28px",
            background: "#0A1F44", color: "#fff", borderRadius: 14,
            textDecoration: "none", fontSize: 14, fontWeight: 700,
          }}>
            Ersten Check-in starten
          </Link>
        </div>
      )}

    </main>
  );
}
