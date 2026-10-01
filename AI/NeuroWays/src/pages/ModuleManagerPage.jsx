/**
 * NW-MODULE-001 — Modulverwaltung
 * Unter: Einstellungen → Entwicklung → Module
 * Zeigt alle registrierten Module, ermöglicht Registrierung, Aktivierung, Deaktivierung.
 */
import { useState, useEffect, useCallback } from "react";
import {
  getAllModules,
  registerModule,
  setModuleStatus,
  updateModule,
  checkDependencies,
  parseModuleJson,
  MODULE_STATUS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../lib/moduleRegistry.js";
import Plus      from "icon:plus";
import Settings  from "icon:settings";
import Waves     from "icon:waves";
import Grid      from "icon:grid";
import Edit2     from "icon:edit-2";
import Check     from "icon:check";
import X         from "icon:x";
import ChevronDown from "icon:chevron-down";
import ChevronUp   from "icon:chevron-up";
import AlertCircle from "icon:alert-circle";

// Kategorie-Farben
const CAT_COLORS = {
  "Gesundheit":     { bg: "#e0f7fa", text: "#006064" },
  "Produktivität":  { bg: "#e8f5e9", text: "#1b5e20" },
  "Lernen":         { bg: "#fff3e0", text: "#e65100" },
  "Wohlbefinden":   { bg: "#fce4ec", text: "#880e4f" },
  "Spiel":          { bg: "#ede7f6", text: "#311b92" },
  "System":         { bg: "#f5f5f5", text: "#424242" },
};

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.ENTWICKLUNG;
  return (
    <span style={{
      padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      letterSpacing: "0.04em",
    }}>{STATUS_LABELS[status] || status}</span>
  );
}

function ModuleIcon({ icon }) {
  // Simple icon mapping for module icons
  const icons = { waves: "🌊", grid: "⊞", settings: "⚙️", heart: "💚", star: "⭐", book: "📚", game: "🎮", sun: "☀️", moon: "🌙" };
  return <span style={{ fontSize: 20 }}>{icons[icon] || "📦"}</span>;
}

// ─── Registrierungsformular ───────────────────────────────────────────────────
function RegisterForm({ allModules, onSave, onCancel }) {
  const [form, setForm] = useState({
    module_code: "", name: "", description: "", category: "Gesundheit",
    icon: "grid", version: "0.1.0", developer: "NeuroWays Core",
    license_type: "CORE", status: MODULE_STATUS.ENTWICKLUNG,
    compatible_core_version: "0.7.0", nav_path: "", nav_label: "", nav_icon: "",
    is_paid: false, is_beta: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const field = (key, val) => setForm(f => ({ ...f, [key]: val }));

  async function handleSave() {
    if (!form.module_code || !form.name) { setError("Modulcode und Name sind Pflicht."); return; }
    const codeExists = allModules.some(m => m.module_code === form.module_code.toUpperCase());
    if (codeExists) { setError("Dieser Modulcode ist bereits vergeben."); return; }
    setSaving(true);
    try {
      await registerModule({ ...form, module_code: form.module_code.toUpperCase() });
      onSave();
    } catch (e) { setError("Fehler beim Speichern: " + e.message); }
    finally { setSaving(false); }
  }

  const inp = { width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: "#0A1F44", background: "#fafafa", outline: "none", fontFamily: "'DM Sans', sans-serif" };
  const lbl = { fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 5 };

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 20, padding: "24px 22px", marginBottom: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0A1F44", marginBottom: 20 }}>Neues Modul registrieren</h3>
      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#b91c1c", display: "flex", gap: 8 }}>
          <AlertCircle size={15} color="#b91c1c" style={{ flexShrink: 0, marginTop: 1 }} />{error}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <label><span style={lbl}>Modulcode *</span>
          <input value={form.module_code} onChange={e => field("module_code", e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g,""))} placeholder="MEIN_MODUL" style={inp} />
        </label>
        <label><span style={lbl}>Name *</span>
          <input value={form.name} onChange={e => field("name", e.target.value)} placeholder="Mein Modul" style={inp} />
        </label>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label><span style={lbl}>Beschreibung</span>
          <textarea value={form.description} onChange={e => field("description", e.target.value)} placeholder="Was macht dieses Modul?" rows={2} style={{ ...inp, resize: "vertical" }} />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
        <label><span style={lbl}>Kategorie</span>
          <select value={form.category} onChange={e => field("category", e.target.value)} style={inp}>
            {["Gesundheit","Produktivität","Lernen","Wohlbefinden","Spiel","System"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label><span style={lbl}>Symbol</span>
          <select value={form.icon} onChange={e => field("icon", e.target.value)} style={inp}>
            {["waves","grid","settings","heart","star","book","game","sun","moon"].map(ic => <option key={ic} value={ic}>{ic}</option>)}
          </select>
        </label>
        <label><span style={lbl}>Version</span>
          <input value={form.version} onChange={e => field("version", e.target.value)} placeholder="0.1.0" style={inp} />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <label><span style={lbl}>Entwickler</span>
          <input value={form.developer} onChange={e => field("developer", e.target.value)} style={inp} />
        </label>
        <label><span style={lbl}>Lizenztyp</span>
          <select value={form.license_type} onChange={e => field("license_type", e.target.value)} style={inp}>
            {["CORE","OPEN_SOURCE","COMMUNITY","ENTERPRISE","PAID"].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        <label><span style={lbl}>Navigations-Pfad</span>
          <input value={form.nav_path} onChange={e => field("nav_path", e.target.value)} placeholder="/mein-modul" style={inp} />
        </label>
        <label><span style={lbl}>Nav-Label</span>
          <input value={form.nav_label} onChange={e => field("nav_label", e.target.value)} placeholder="Mein Modul" style={inp} />
        </label>
        <label><span style={lbl}>Anfangsstatus</span>
          <select value={form.status} onChange={e => field("status", e.target.value)} style={inp}>
            {Object.entries(STATUS_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onCancel} style={{ flex: 1, padding: "11px 20px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Abbrechen</button>
        <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: "11px 20px", borderRadius: 12, border: "none", background: "#0A1F44", color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, fontFamily: "'DM Sans', sans-serif" }}>
          {saving ? "Wird gespeichert …" : "Modul registrieren"}
        </button>
      </div>
    </div>
  );
}

// ─── Modul-Karte ──────────────────────────────────────────────────────────────
function ModuleCard({ module: m, allModules, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [working, setWorking]   = useState(false);
  const cats = CAT_COLORS[m.category] || CAT_COLORS["System"];
  const deps = checkDependencies(m, allModules);
  const isActive = m.status === MODULE_STATUS.AKTIV;
  const canActivate = [MODULE_STATUS.INSTALLIERT, MODULE_STATUS.FREIGEGEBEN, MODULE_STATUS.DEAKTIVIERT].includes(m.status);

  async function handleToggle() {
    setWorking(true);
    try {
      const next = isActive ? MODULE_STATUS.DEAKTIVIERT : MODULE_STATUS.AKTIV;
      await setModuleStatus(m.id, next);
      onRefresh();
    } finally { setWorking(false); }
  }

  async function handleInstall() {
    setWorking(true);
    try { await setModuleStatus(m.id, MODULE_STATUS.INSTALLIERT); onRefresh(); }
    finally { setWorking(false); }
  }

  return (
    <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${isActive ? "#86efac" : "#eaeaea"}`, overflow: "hidden", marginBottom: 12 }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: cats.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ModuleIcon icon={m.icon} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#0A1F44" }}>{m.name}</span>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#9ca3af" }}>{m.module_code}</span>
            {m.version && <span style={{ fontSize: 11, color: "#9ca3af" }}>v{m.version}</span>}
            {m.is_beta && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 8, background: "#fdf4ff", color: "#a21caf", fontWeight: 700 }}>BETA</span>}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <StatusBadge status={m.status} />
            {m.category && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: cats.bg, color: cats.text, fontWeight: 600 }}>{m.category}</span>}
          </div>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#9ca3af" }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: "0 20px 16px", borderTop: "1px solid #f5f5f5" }}>
          {m.description && <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginTop: 14, marginBottom: 14 }}>{m.description}</p>}

          {/* Metadata grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              ["Entwickler", m.developer],
              ["Lizenz", m.license_type],
              ["Core-Version", m.compatible_core_version],
              ["Installiert", m.installed_at],
              ["Aktiviert", m.activated_at],
              ["Navigation", m.nav_path],
            ].filter(([,v]) => v).map(([k,v]) => (
              <div key={k} style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 12px" }}>
                <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{k}</p>
                <p style={{ fontSize: 13, color: "#0A1F44", fontWeight: 500 }}>{v}</p>
              </div>
            ))}
          </div>

          {/* Dependency warnings */}
          {deps.length > 0 && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
              {deps.map((d, i) => <p key={i} style={{ fontSize: 12, color: "#b91c1c", margin: 0 }}>⚠️ {d}</p>)}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {m.status === MODULE_STATUS.FREIGEGEBEN && (
              <button onClick={handleInstall} disabled={working} style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "#0A1F44", color: "#fff", fontSize: 13, fontWeight: 700, cursor: working ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Installieren
              </button>
            )}
            {(isActive || canActivate) && (
              <button onClick={handleToggle} disabled={working || deps.length > 0} style={{
                padding: "8px 16px", borderRadius: 10, border: "1.5px solid", fontSize: 13, fontWeight: 700, cursor: working ? "not-allowed" : "pointer",
                background: isActive ? "#fef2f2" : "#f0fdf4", borderColor: isActive ? "#fca5a5" : "#86efac",
                color: isActive ? "#b91c1c" : "#166534", fontFamily: "'DM Sans', sans-serif",
              }}>
                {isActive ? "Deaktivieren" : "Aktivieren"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function ModuleManagerPage() {
  const [modules, setModules]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [filterStatus, setFilter] = useState("ALL");

  const load = useCallback(() => {
    const controller = new AbortController();
    getAllModules(controller.signal)
      .then(mods => { setModules(mods); setLoading(false); })
      .catch(e => { if (!e?.isAbort && e?.name !== "AbortError") setLoading(false); });
    return controller;
  }, []);

  useEffect(() => { const c = load(); return () => c.abort(); }, [load]);

  const filtered = filterStatus === "ALL" ? modules : modules.filter(m => m.status === filterStatus);
  const selStyle = { padding: "6px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };

  const stats = {
    aktiv:      modules.filter(m => m.status === MODULE_STATUS.AKTIV).length,
    deaktiviert:modules.filter(m => m.status === MODULE_STATUS.DEAKTIVIERT).length,
    gesamt:     modules.length,
  };

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Grid size={19} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", margin: 0 }}>Modulverwaltung</h1>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-MODULE-001 · Einstellungen → Entwicklung</p>
          </div>
        </div>
        <button onClick={() => setShowForm(s => !s)} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "9px 16px", borderRadius: 12, border: "none",
          background: showForm ? "#f0f4fa" : "#0A1F44",
          color: showForm ? "#0A1F44" : "#fff",
          fontSize: 13, fontWeight: 700, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? "Abbrechen" : "Modul registrieren"}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Gesamt",      value: stats.gesamt,      color: "#0A1F44" },
          { label: "Aktiv",       value: stats.aktiv,       color: "#166534" },
          { label: "Deaktiviert", value: stats.deaktiviert, color: "#6b7280" },
        ].map(s => (
          <div key={s.label} style={{ padding: "14px 16px", background: "#fff", borderRadius: 14, border: "1px solid #eaeaea" }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: "0 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Registration form */}
      {showForm && (
        <RegisterForm
          allModules={modules}
          onSave={() => { setShowForm(false); load(); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <select value={filterStatus} onChange={e => setFilter(e.target.value)} style={selStyle}>
          <option value="ALL">Alle Status</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <span style={{ fontSize: 13, color: "#9ca3af", alignSelf: "center" }}>
          {filtered.length} {filtered.length !== modules.length ? `von ${modules.length}` : ""} Modul{filtered.length !== 1 ? "e" : ""}
        </span>
      </div>

      {/* Module list */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Wird geladen …</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Keine Module gefunden.</p>
      ) : (
        <div>
          {filtered.map(m => (
            <ModuleCard key={m.id} module={m} allModules={modules} onRefresh={load} />
          ))}
        </div>
      )}

      {/* Lifecycle-Legende */}
      <div style={{ marginTop: 28, padding: "16px 20px", background: "#f8fafc", borderRadius: 16, border: "1px solid #eaeaea" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Modul-Lebenszyklus</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(STATUS_LABELS).map(([k, v]) => {
            const s = STATUS_COLORS[k];
            return (
              <span key={k} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: s.bg, color: s.text, border: `1px solid ${s.border}`, fontWeight: 600 }}>
                {v}
              </span>
            );
          })}
        </div>
        <p style={{ fontSize: 11, color: "#b0b8c4", marginTop: 10, lineHeight: 1.5 }}>
          Entwicklung → Test → Freigegeben → Installiert → Aktiv ⇄ Deaktiviert → Veraltet → Archiviert
        </p>
      </div>
    </main>
  );
}
