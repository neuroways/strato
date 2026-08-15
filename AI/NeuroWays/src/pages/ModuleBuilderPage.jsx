/**
 * NW-BUILDER-001 — Module Builder
 * Geführter 9-Schritt-Prozess zur Erstellung eines NeuroWays Packages (.nwp).
 * Keine Datenbankkenntnis — nur NeuroWays-Objekte.
 */
import { useState, useEffect, useCallback } from "react";
import {
  saveDraft, getDrafts, getDraft, deleteDraft,
  generatePackage, getPackages, downloadPackage,
  validateDraft, buildManifest,
} from "../lib/builderEngine.js";
import { getAllModules } from "../lib/moduleRegistry.js";
import { useAuth } from "../lib/authContext.jsx";
import Plus       from "icon:plus";
import Package    from "icon:package";
import Check      from "icon:check";
import Download   from "icon:download";
import Trash2     from "icon:trash-2";
import ChevronRight from "icon:chevron-right";
import ChevronLeft  from "icon:chevron-left";
import AlertCircle  from "icon:alert-circle";
import CheckCircle  from "icon:check-circle";
import Edit2        from "icon:edit-2";
import ArrowRight   from "icon:arrow-right";
import X            from "icon:x";

// ─── Konfiguration ─────────────────────────────────────────────────────────────

const CATEGORIES = ["Gesundheit","Produktivität","Lernen","Wohlbefinden","Spiel","Kommunikation","System"];
const ICONS = ["waves","grid","heart","star","book","gamepad","sun","moon","settings","compass","map","zap","activity","users","bell","award"];
const LICENSE_TYPES = ["CORE","OPEN_SOURCE","COMMUNITY","ENTERPRISE","PAID","BETA"];
const PERMISSION_ROLES = ["USER","MANAGER","TEAM_LEAD","ENTERPRISE","ADMIN"];

const ALL_FEATURES = [
  { id: "dashboard_card",   label: "Dashboard-Karte",      desc: "Karte im Personal Workspace" },
  { id: "quick_action",     label: "Schnellaktion",         desc: "Button auf dem Dashboard" },
  { id: "own_pages",        label: "Eigene Seiten",         desc: "Eigene Ansichten mit Navigation" },
  { id: "settings",         label: "Eigene Einstellungen",  desc: "Konfigurationsbereich im Modul" },
  { id: "notifications",    label: "Benachrichtigungen",    desc: "Push-Hinweise an Benutzer" },
  { id: "reminders",        label: "Erinnerungen",          desc: "Zeitgesteuerte Hinweise" },
  { id: "methods",          label: "Methoden",              desc: "Strukturierte Frage-Antwort-Abläufe" },
  { id: "evaluations",      label: "Auswertungen",          desc: "Auswertung gespeicherter Daten" },
  { id: "charts",           label: "Diagramme",             desc: "Visualisierungen und Grafiken" },
  { id: "assistants",       label: "Assistenten",           desc: "Geführte Workflows" },
  { id: "game_elements",    label: "Spielelemente",         desc: "Gamification-Funktionen" },
  { id: "assets",           label: "Assets",                desc: "Bilder, Icons, Animationen" },
  { id: "translations",     label: "Übersetzungen",         desc: "Mehrsprachigkeitsunterstützung" },
];

const DATA_OBJECT_PRESETS = [
  "Benutzer","Methode","Frage","Antwort","Bewertung","Spiel","Karte","Aufgabe","Figur","Belohnung","Eintrag","Session","Profil","Team","Ergebnis"
];

const STEPS = [
  { id: 1, label: "Grundinformationen",  short: "Basis" },
  { id: 2, label: "Funktionen",          short: "Features" },
  { id: 3, label: "Datenobjekte",        short: "Daten" },
  { id: 4, label: "Navigation",          short: "Nav" },
  { id: 5, label: "Dashboard",           short: "Dashboard" },
  { id: 6, label: "Berechtigungen",      short: "Rollen" },
  { id: 7, label: "Assets",              short: "Assets" },
  { id: 8, label: "Abhängigkeiten",      short: "Deps" },
  { id: 9, label: "Validierung & Build", short: "Build" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function safeJson(v, fb = []) { try { return JSON.parse(v || "[]"); } catch { return fb; } }
function toJson(v) { return JSON.stringify(v); }

function Badge({ label, color = "#e8f0fa", textColor = "#0A1F44" }) {
  return <span style={{ padding: "2px 8px", borderRadius: 10, background: color, color: textColor, fontSize: 11, fontWeight: 600 }}>{label}</span>;
}

function ErrorBox({ errors, warnings }) {
  if (!errors.length && !warnings.length) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      {errors.map((e, i) => (
        <div key={i} style={{ display: "flex", gap: 8, padding: "10px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, marginBottom: 8, fontSize: 13, color: "#b91c1c" }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{e}
        </div>
      ))}
      {warnings.map((w, i) => (
        <div key={i} style={{ display: "flex", gap: 8, padding: "10px 14px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, marginBottom: 8, fontSize: 13, color: "#92400e" }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{w}
        </div>
      ))}
    </div>
  );
}

const INP = { width: "100%", boxSizing: "border-box", padding: "10px 13px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: "#0A1F44", background: "#fafafa", outline: "none", fontFamily: "'DM Sans', sans-serif" };
const LBL = { fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 5 };

// ─── Schritt-Komponenten ────────────────────────────────────────────────────────

function Step1({ draft, setDraft }) {
  const f = (k, v) => setDraft(d => ({ ...d, [k]: v }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label>
          <span style={LBL}>Modulname *</span>
          <input value={draft.name || ""} onChange={e => f("name", e.target.value)} placeholder="Mein Modul" style={INP} />
        </label>
        <label>
          <span style={LBL}>Modulcode *</span>
          <input value={draft.module_code || ""} onChange={e => f("module_code", e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g,""))} placeholder="MEIN_MODUL" style={{ ...INP, fontFamily: "monospace" }} />
        </label>
      </div>
      <label>
        <span style={LBL}>Beschreibung</span>
        <textarea value={draft.description || ""} onChange={e => f("description", e.target.value)} placeholder="Was macht dieses Modul?" rows={3} style={{ ...INP, resize: "vertical" }} />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <label>
          <span style={LBL}>Kategorie</span>
          <select value={draft.category || "Gesundheit"} onChange={e => f("category", e.target.value)} style={INP}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span style={LBL}>Symbol</span>
          <select value={draft.icon || "grid"} onChange={e => f("icon", e.target.value)} style={INP}>
            {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </label>
        <label>
          <span style={LBL}>Version</span>
          <input value={draft.version || "0.1.0"} onChange={e => f("version", e.target.value)} placeholder="0.1.0" style={INP} />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label>
          <span style={LBL}>Entwickler</span>
          <input value={draft.developer || ""} onChange={e => f("developer", e.target.value)} placeholder="NeuroWays Core" style={INP} />
        </label>
        <label>
          <span style={LBL}>Lizenztyp</span>
          <select value={draft.license_type || "CORE"} onChange={e => f("license_type", e.target.value)} style={INP}>
            {LICENSE_TYPES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

function Step2({ draft, setDraft }) {
  const features = safeJson(draft.features);
  const toggle = id => {
    const next = features.includes(id) ? features.filter(f => f !== id) : [...features, id];
    setDraft(d => ({ ...d, features: toJson(next) }));
  };
  return (
    <div>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>Wähle alle Fähigkeiten, die dieses Modul besitzen soll. Der Builder erstellt daraus automatisch die passende Struktur.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {ALL_FEATURES.map(f => {
          const sel = features.includes(f.id);
          return (
            <button key={f.id} onClick={() => toggle(f.id)} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px",
              borderRadius: 14, border: `1.5px solid ${sel ? "#0A1F44" : "#e5e7eb"}`,
              background: sel ? "#f0f4fa" : "#fff", cursor: "pointer", textAlign: "left",
              transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: sel ? "#0A1F44" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                {sel && <Check size={13} color="#fff" />}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", marginBottom: 2 }}>{f.label}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{f.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3({ draft, setDraft }) {
  const objs = safeJson(draft.data_objects);
  const [custom, setCustom] = useState("");
  const toggle = name => {
    const next = objs.includes(name) ? objs.filter(o => o !== name) : [...objs, name];
    setDraft(d => ({ ...d, data_objects: toJson(next) }));
  };
  const addCustom = () => {
    const t = custom.trim();
    if (!t || objs.includes(t)) return;
    setDraft(d => ({ ...d, data_objects: toJson([...objs, t]) }));
    setCustom("");
  };
  return (
    <div>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>Beschreibe, welche <strong>Objekte</strong> dein Modul benötigt. Der Core entscheidet später, wie sie gespeichert werden.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {DATA_OBJECT_PRESETS.map(name => {
          const sel = objs.includes(name);
          return (
            <button key={name} onClick={() => toggle(name)} style={{
              padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${sel ? "#0A1F44" : "#e5e7eb"}`,
              background: sel ? "#0A1F44" : "#fff", color: sel ? "#fff" : "#0A1F44",
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>{name}</button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input value={custom} onChange={e => setCustom(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addCustom()}
          placeholder="Eigenes Objekt hinzufügen …" style={{ ...INP, flex: 1 }} />
        <button onClick={addCustom} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "#0A1F44", color: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>+</button>
      </div>
      {objs.filter(o => !DATA_OBJECT_PRESETS.includes(o)).length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {objs.filter(o => !DATA_OBJECT_PRESETS.includes(o)).map(o => (
            <span key={o} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "#e8f0fa", color: "#0A1F44", fontSize: 13, fontWeight: 600 }}>
              {o}
              <button onClick={() => toggle(o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><X size={12} color="#6b7280" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Step4({ draft, setDraft }) {
  const nav = safeJson(draft.nav_config, {});
  const f = (k, v) => setDraft(d => ({ ...d, nav_config: toJson({ ...nav, [k]: v }) }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 4, lineHeight: 1.6 }}>Definiere, wie das Modul in der Navigation erscheint.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label><span style={LBL}>Menüpunkt-Bezeichnung</span>
          <input value={nav.label || ""} onChange={e => f("label", e.target.value)} placeholder="Mein Modul" style={INP} /></label>
        <label><span style={LBL}>Pfad (URL)</span>
          <input value={nav.path || ""} onChange={e => f("path", e.target.value)} placeholder="/mein-modul" style={INP} /></label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label><span style={LBL}>Symbol</span>
          <select value={nav.icon || "grid"} onChange={e => f("icon", e.target.value)} style={INP}>
            {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </label>
        <label><span style={LBL}>Reihenfolge</span>
          <input type="number" value={nav.order || 100} onChange={e => f("order", Number(e.target.value))} style={INP} /></label>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={nav.visible !== false} onChange={e => f("visible", e.target.checked)} />
          <span style={{ fontSize: 14, color: "#0A1F44", fontWeight: 500 }}>In Navigation anzeigen</span>
        </label>
      </div>
    </div>
  );
}

function Step5({ draft, setDraft }) {
  const cards = safeJson(draft.dashboard_cards);
  const CARD_OPTIONS = [
    { id: "today_card",    label: "Heute-Karte",    desc: "Aktueller Status für den Benutzer" },
    { id: "quick_action",  label: "Schnellaktion",  desc: "Direkter Button auf dem Dashboard" },
    { id: "stats_card",    label: "Statistik",      desc: "Kompakte Zahlen und Auswertungen" },
    { id: "reminder",      label: "Erinnerung",     desc: "Hinweis für offene Aktionen" },
    { id: "progress",      label: "Fortschritt",    desc: "Visualisierung des Nutzerverlaufs" },
  ];
  const toggle = id => {
    const next = cards.includes(id) ? cards.filter(c => c !== id) : [...cards, id];
    setDraft(d => ({ ...d, dashboard_cards: toJson(next) }));
  };
  return (
    <div>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>Das Modul kann eigene Karten auf dem Personal Workspace registrieren. Der Workspace lädt sie automatisch.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CARD_OPTIONS.map(c => {
          const sel = cards.includes(c.id);
          return (
            <button key={c.id} onClick={() => toggle(c.id)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
              borderRadius: 14, border: `1.5px solid ${sel ? "#0A1F44" : "#e5e7eb"}`,
              background: sel ? "#f0f4fa" : "#fff", cursor: "pointer", textAlign: "left",
              transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
            }}>
              <div style={{ width: 24, height: 24, borderRadius: 7, background: sel ? "#0A1F44" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {sel && <Check size={13} color="#fff" />}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0A1F44", marginBottom: 1 }}>{c.label}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{c.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step6({ draft, setDraft }) {
  const perms = safeJson(draft.permissions);
  const toggle = role => {
    const next = perms.includes(role) ? perms.filter(r => r !== role) : [...perms, role];
    setDraft(d => ({ ...d, permissions: toJson(next) }));
  };
  const roleDescs = { USER: "Alle angemeldeten Benutzer", MANAGER: "Manager und höher", TEAM_LEAD: "Teamleiter und höher", ENTERPRISE: "Unternehmenszugang", ADMIN: "Administratoren" };
  return (
    <div>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>Lege fest, welche Rollen das Modul nutzen dürfen.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PERMISSION_ROLES.map(role => {
          const sel = perms.includes(role);
          return (
            <button key={role} onClick={() => toggle(role)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 18px",
              borderRadius: 14, border: `1.5px solid ${sel ? "#0A1F44" : "#e5e7eb"}`,
              background: sel ? "#f0f4fa" : "#fff", cursor: "pointer", textAlign: "left",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: sel ? "#0A1F44" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {sel && <Check size={12} color="#fff" />}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", margin: 0 }}>{role}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{roleDescs[role]}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step7({ draft, setDraft }) {
  const assets = safeJson(draft.assets);
  const ASSET_TYPES = [
    { id: "images",    label: "Bilder",      emoji: "🖼" },
    { id: "icons",     label: "Icons",       emoji: "🎨" },
    { id: "audio",     label: "Audio",       emoji: "🔊" },
    { id: "videos",    label: "Videos",      emoji: "🎬" },
    { id: "animations",label: "Animationen", emoji: "✨" },
    { id: "documents", label: "Dokumente",   emoji: "📄" },
  ];
  const toggle = id => {
    const next = assets.includes(id) ? assets.filter(a => a !== id) : [...assets, id];
    setDraft(d => ({ ...d, assets: toJson(next) }));
  };
  return (
    <div>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>Welche Asset-Typen benötigt das Modul? Alle Assets werden Teil des Packages.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {ASSET_TYPES.map(a => {
          const sel = assets.includes(a.id);
          return (
            <button key={a.id} onClick={() => toggle(a.id)} style={{
              padding: "14px 12px", borderRadius: 14,
              border: `1.5px solid ${sel ? "#0A1F44" : "#e5e7eb"}`,
              background: sel ? "#f0f4fa" : "#fff", cursor: "pointer",
              textAlign: "center", fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s",
            }}>
              <p style={{ fontSize: 24, marginBottom: 6 }}>{a.emoji}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", margin: 0 }}>{a.label}</p>
              {sel && <p style={{ fontSize: 11, color: "#008CA8", marginTop: 4 }}>✓ Ausgewählt</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step8({ draft, setDraft, allModules }) {
  const deps = safeJson(draft.dependencies);
  const toggle = code => {
    const next = deps.includes(code) ? deps.filter(d => d !== code) : [...deps, code];
    setDraft(d => ({ ...d, dependencies: toJson(next) }));
  };
  return (
    <div>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>Falls dieses Modul andere Module benötigt, wähle sie hier aus.</p>
      {allModules.length === 0 && <p style={{ color: "#9ca3af", fontSize: 13 }}>Keine anderen Module verfügbar.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {allModules.filter(m => m.module_code !== draft.module_code).map(m => {
          const sel = deps.includes(m.module_code);
          return (
            <button key={m.id} onClick={() => toggle(m.module_code)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
              borderRadius: 14, border: `1.5px solid ${sel ? "#0A1F44" : "#e5e7eb"}`,
              background: sel ? "#f0f4fa" : "#fff", cursor: "pointer", textAlign: "left",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: sel ? "#0A1F44" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {sel && <Check size={12} color="#fff" />}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", margin: 0 }}>{m.name}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{m.module_code} · v{m.version || "–"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step9({ draft, allModules, onGenerate, generating, generated }) {
  const v = validateDraft(draft, allModules);
  const manifest = buildManifest(draft);

  if (generated) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle size={30} color="#166534" />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", marginBottom: 8 }}>Package erfolgreich erstellt!</h3>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>{generated.pkg.module_code} · v{generated.pkg.version}</p>
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 24 }}>
          Größe: {(generated.size / 1024).toFixed(1)} KB · Prüfsumme: {generated.checksum.slice(0,16)}…
        </p>
        <button onClick={() => downloadPackage(generated.pkg)} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "12px 24px", background: "#0A1F44", color: "#fff",
          borderRadius: 14, border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
        }}>
          <Download size={16} /> Package herunterladen (.nwp)
        </button>
      </div>
    );
  }

  return (
    <div>
      <ErrorBox errors={v.errors} warnings={v.warnings} />

      {v.valid && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 16, padding: "16px 20px", marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#166534", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircle size={15} /> Bereit zum Erstellen
          </p>
          <p style={{ fontSize: 13, color: "#166534" }}>
            {draft.name} · v{draft.version || "0.1.0"} · {draft.category}
          </p>
        </div>
      )}

      <div style={{ background: "#f8fafc", borderRadius: 16, padding: "16px 20px", marginBottom: 24, fontFamily: "monospace", fontSize: 12, color: "#374151", maxHeight: 220, overflowY: "auto" }}>
        <p style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>Vorschau des Manifests:</p>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(manifest, null, 2).slice(0, 1200)}{JSON.stringify(manifest, null, 2).length > 1200 ? "\n…" : ""}</pre>
      </div>

      <button onClick={onGenerate} disabled={!v.valid || generating} style={{
        width: "100%", padding: "15px 24px", borderRadius: 16, border: "none",
        background: v.valid ? "#0A1F44" : "#e5e5e5",
        color: v.valid ? "#fff" : "#9ca3af",
        fontSize: 15, fontWeight: 800, cursor: v.valid && !generating ? "pointer" : "not-allowed",
        fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        <Package size={18} />
        {generating ? "Package wird erstellt …" : "📦 NeuroWays Package erstellen (.nwp)"}
      </button>
    </div>
  );
}

// ─── Builder-Wizard ────────────────────────────────────────────────────────────
function BuilderWizard({ draftId, allModules, onBack, onFinish }) {
  const [step, setStep]       = useState(1);
  const [draft, setDraft]     = useState({ features: "[]", data_objects: "[]", nav_config: "{}", dashboard_cards: "[]", permissions: "[\"USER\"]", assets: "[]", dependencies: "[]" });
  const [saving, setSaving]   = useState(false);
  const [generating, setGen]  = useState(false);
  const [generated, setGenDone] = useState(null);
  const [loadedId, setLoadedId] = useState(null);

  useEffect(() => {
    if (draftId && draftId !== loadedId) {
      getDraft(draftId).then(d => { setDraft(d); setStep(d.current_step || 1); setLoadedId(draftId); }).catch(() => {});
    }
  }, [draftId]);

  async function handleSave() {
    setSaving(true);
    try { const saved = await saveDraft({ ...draft, current_step: step }); setDraft(d => ({ ...d, id: saved.id })); }
    finally { setSaving(false); }
  }

  async function handleGenerate() {
    setGen(true);
    try {
      const result = await generatePackage(draft, allModules);
      setGenDone(result);
      onFinish?.();
    } catch (e) { alert("Fehler: " + e.message); }
    finally { setGen(false); }
  }

  const stepProps = { draft, setDraft, allModules };

  return (
    <div>
      {/* Step progress */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => draft.id && setStep(s.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 10px",
              background: "none", border: "none", cursor: draft.id ? "pointer" : "default",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800,
                background: step > s.id ? "#0A1F44" : step === s.id ? "#008CA8" : "#e5e7eb",
                color: step >= s.id ? "#fff" : "#9ca3af",
              }}>
                {step > s.id ? <Check size={13} /> : s.id}
              </div>
              <span style={{ fontSize: 10, color: step === s.id ? "#008CA8" : "#9ca3af", fontWeight: step === s.id ? 700 : 400, whiteSpace: "nowrap" }}>{s.short}</span>
            </button>
            {i < STEPS.length - 1 && <div style={{ width: 16, height: 2, background: step > s.id ? "#0A1F44" : "#e5e7eb", flexShrink: 0 }} />}
          </div>
        ))}
      </div>

      {/* Step header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Schritt {step} von {STEPS.length}</p>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", margin: 0 }}>{STEPS[step-1].label}</h2>
      </div>

      {/* Step content */}
      <div style={{ marginBottom: 28 }}>
        {step === 1 && <Step1 {...stepProps} />}
        {step === 2 && <Step2 {...stepProps} />}
        {step === 3 && <Step3 {...stepProps} />}
        {step === 4 && <Step4 {...stepProps} />}
        {step === 5 && <Step5 {...stepProps} />}
        {step === 6 && <Step6 {...stepProps} />}
        {step === 7 && <Step7 {...stepProps} />}
        {step === 8 && <Step8 {...stepProps} />}
        {step === 9 && <Step9 {...stepProps} onGenerate={handleGenerate} generating={generating} generated={generated} />}
      </div>

      {/* Navigation */}
      {step < 9 && (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={step === 1 ? onBack : () => setStep(s => s - 1)} style={{ padding: "11px 20px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={15} /> {step === 1 ? "Abbrechen" : "Zurück"}
          </button>
          <button onClick={handleSave} disabled={saving} style={{ padding: "11px 20px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 14, fontWeight: 600, color: "#0A1F44", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {saving ? "Gespeichert" : "Speichern"}
          </button>
          <button onClick={() => { handleSave(); setStep(s => Math.min(9, s + 1)); }} style={{ flex: 1, padding: "11px 20px", borderRadius: 12, border: "none", background: "#0A1F44", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            Weiter <ChevronRight size={15} />
          </button>
        </div>
      )}
      {step === 9 && !generated && (
        <button onClick={() => setStep(8)} style={{ padding: "11px 20px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronLeft size={15} /> Zurück
        </button>
      )}
    </div>
  );
}

// ─── Package-Archiv ────────────────────────────────────────────────────────────
function PackageArchive() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const load = useCallback(() => {
    const c = new AbortController();
    getPackages(c.signal).then(r => { setPackages(r.items); setLoading(false); }).catch(() => setLoading(false));
    return c;
  }, []);
  useEffect(() => { const c = load(); return () => c.abort(); }, [load]);

  if (loading) return <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: "24px 0" }}>Laden …</p>;
  if (!packages.length) return <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: "24px 0" }}>Noch keine Packages erstellt.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {packages.map(pkg => (
        <div key={pkg.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#fff", borderRadius: 16, border: "1px solid #eaeaea" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f0f4fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Package size={18} color="#0A1F44" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0A1F44", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pkg.name}</p>
            <p style={{ fontSize: 11, color: "#9ca3af" }}>
              {pkg.module_code} · v{pkg.version} · {(pkg.file_size/1024).toFixed(1)} KB · {new Date(pkg.created).toLocaleDateString("de-DE")}
            </p>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: "#f0fdf4", color: "#166534", border: "1px solid #86efac" }}>{pkg.status}</span>
          <button onClick={() => downloadPackage(pkg)} style={{ width: 36, height: 36, borderRadius: 10, background: "#f0f4fa", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Download size={16} color="#0A1F44" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Hauptseite ────────────────────────────────────────────────────────────────
export default function ModuleBuilderPage() {
  const [view, setView]         = useState("list");   // list | wizard | archive
  const [drafts, setDrafts]     = useState([]);
  const [allModules, setModules] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editDraftId, setEditDraftId] = useState(null);
  const [refresh, setRefresh]   = useState(0);

  const load = useCallback(() => {
    const c = new AbortController();
    Promise.all([getDrafts(c.signal), getAllModules(c.signal)])
      .then(([dr, mods]) => { setDrafts(dr.items); setModules(mods); setLoading(false); })
      .catch(() => setLoading(false));
    return c;
  }, []);
  useEffect(() => { const c = load(); return () => c.abort(); }, [load, refresh]);

  function startNew() { setEditDraftId(null); setView("wizard"); }
  function editDraft(id) { setEditDraftId(id); setView("wizard"); }
  async function handleDeleteDraft(id) {
    if (!confirm("Entwurf löschen?")) return;
    await deleteDraft(id); setRefresh(r => r + 1);
  }

  if (view === "wizard") {
    return (
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Package size={19} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", margin: 0 }}>Module Builder</h1>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-BUILDER-001 · Neues Modul erstellen</p>
          </div>
        </div>
        <BuilderWizard
          draftId={editDraftId}
          allModules={allModules}
          onBack={() => { setView("list"); setRefresh(r => r + 1); }}
          onFinish={() => setRefresh(r => r + 1)}
        />
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Package size={19} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", margin: 0 }}>Module Builder</h1>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-BUILDER-001 · Entwicklungsumgebung</p>
          </div>
        </div>
        <button onClick={startNew} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 12, border: "none", background: "#0A1F44", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          <Plus size={15} /> Neues Modul
        </button>
      </div>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "#f6f4f1", borderRadius: 12, padding: 4 }}>
        {[["list","Meine Entwürfe"],["archive","Package-Archiv"]].map(([k,l]) => (
          <button key={k} onClick={() => setView(k)} style={{
            flex: 1, padding: "8px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            background: view === k ? "#fff" : "transparent",
            color: view === k ? "#0A1F44" : "#9ca3af",
            border: "none", cursor: "pointer",
            boxShadow: view === k ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            fontFamily: "'DM Sans', sans-serif",
          }}>{l}</button>
        ))}
      </div>

      {view === "archive" ? (
        <PackageArchive />
      ) : loading ? (
        <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Laden …</p>
      ) : drafts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 24px", background: "#f8fafc", borderRadius: 20, border: "1px solid #eaeaea" }}>
          <p style={{ fontSize: 22, marginBottom: 16 }}>📦</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#0A1F44", marginBottom: 8 }}>Noch keine Entwürfe</p>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Erstelle dein erstes NeuroWays-Modul — ohne eine einzige Zeile Code.</p>
          <button onClick={startNew} style={{ padding: "12px 28px", background: "#0A1F44", color: "#fff", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            Erstes Modul erstellen
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {drafts.map(d => (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "#fff", borderRadius: 18, border: "1px solid #eaeaea" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "#f0f4fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Package size={20} color="#0A1F44" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0A1F44", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name || "Unbenannt"}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>
                  {d.module_code || "–"} · Schritt {d.current_step || 1}/9 · {new Date(d.updated).toLocaleDateString("de-DE")}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => editDraft(d.id)} style={{ width: 36, height: 36, borderRadius: 10, background: "#f0f4fa", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Edit2 size={15} color="#0A1F44" />
                </button>
                <button onClick={() => handleDeleteDraft(d.id)} style={{ width: 36, height: 36, borderRadius: 10, background: "#fef2f2", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trash2 size={14} color="#ef4444" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
