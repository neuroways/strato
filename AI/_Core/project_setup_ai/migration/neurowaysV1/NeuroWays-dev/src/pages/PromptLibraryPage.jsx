/**
 * NW-DEV-001 — Prompt Library
 * Internal admin view — not visible to end users.
 */
import { useState, useEffect, useCallback } from "react";
import { pb } from "../lib/pb.js";
import Search from "icon:search";
import FileText from "icon:file-text";
import ChevronRight from "icon:chevron-right";
import ChevronLeft from "icon:chevron-left";
import X from "icon:x";
import GitBranch from "icon:git-branch";
import Clock from "icon:clock";
import Tag from "icon:tag";

// ─── Status badges ────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  COMPLETED:   { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  PUBLISHED:   { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  IN_PROGRESS: { bg: "#fffbeb", text: "#92400e", border: "#fcd34d" },
  DRAFT:       { bg: "#f8fafc", text: "#64748b", border: "#cbd5e1" },
  PLANNED:     { bg: "#f0f9ff", text: "#075985", border: "#7dd3fc" },
  REJECTED:    { bg: "#fef2f2", text: "#991b1b", border: "#fca5a5" },
};

const TYPE_COLORS = {
  FEATURE:       { bg: "#eff6ff", text: "#1d4ed8" },
  BUGFIX:        { bg: "#fef2f2", text: "#b91c1c" },
  REFACTORING:   { bg: "#faf5ff", text: "#7e22ce" },
  STANDARD:      { bg: "#f0fdf4", text: "#166534" },
  SPECIFICATION: { bg: "#fff7ed", text: "#c2410c" },
  ARCHITECTURE:  { bg: "#f0f9ff", text: "#0369a1" },
  POC:           { bg: "#fdf4ff", text: "#a21caf" },
  OPERATIONS:    { bg: "#f8fafc", text: "#475569" },
};

function Badge({ label, colors }) {
  if (!colors) colors = { bg: "#f1f5f9", text: "#64748b" };
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
      background: colors.bg, color: colors.text,
      border: `1px solid ${colors.border || colors.bg}`,
      letterSpacing: "0.04em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

// ─── Prompt detail panel ───────────────────────────────────────────────────
function PromptDetail({ prompt, onClose }) {
  const fullText = (prompt.prompt_text || "") + (prompt.prompt_text_b || "") + (prompt.prompt_text_c || "");
  
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(10,31,68,0.55)", display: "flex",
      alignItems: "flex-start", justifyContent: "flex-end",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: "min(680px, 100vw)", height: "100vh", overflowY: "auto",
        background: "#fff", borderLeft: "1px solid #e5e7eb",
        padding: "32px 32px 64px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <Badge label={prompt.prompt_code} colors={{ bg: "#0A1F44", text: "#fff", border: "#0A1F44" }} />
              <Badge label={prompt.status} colors={STATUS_COLORS[prompt.status]} />
              <Badge label={prompt.prompt_type} colors={TYPE_COLORS[prompt.prompt_type]} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", lineHeight: 1.3, margin: 0 }}>{prompt.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#6b7280" }}>
            <X size={20} />
          </button>
        </div>

        {/* Meta */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28, padding: "16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e5e7eb" }}>
          {[
            ["Bereich", prompt.area],
            ["Modul", prompt.module],
            ["Feature", prompt.feature],
            ["Version", prompt.version],
            ["NeuroWays-Version", prompt.neuroways_version],
            ["Ersteller", prompt.author],
          ].map(([k, v]) => v ? (
            <div key={k}>
              <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{k}</p>
              <p style={{ fontSize: 14, color: "#0A1F44", fontWeight: 500 }}>{v}</p>
            </div>
          ) : null)}
        </div>

        {/* Predecessor / Successor */}
        {(prompt.predecessor_code || prompt.successor_code) && (
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {prompt.predecessor_code && (
              <div style={{ flex: 1, padding: "10px 14px", background: "#f0f9ff", borderRadius: 10, border: "1px solid #7dd3fc" }}>
                <p style={{ fontSize: 11, color: "#0369a1", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Vorgänger</p>
                <p style={{ fontSize: 13, color: "#0369a1", fontWeight: 600 }}>{prompt.predecessor_code}</p>
              </div>
            )}
            {prompt.successor_code && (
              <div style={{ flex: 1, padding: "10px 14px", background: "#f0fdf4", borderRadius: 10, border: "1px solid #86efac" }}>
                <p style={{ fontSize: 11, color: "#166534", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Nachfolger</p>
                <p style={{ fontSize: 13, color: "#166534", fontWeight: 600 }}>{prompt.successor_code}</p>
              </div>
            )}
          </div>
        )}

        {/* Prompt text */}
        {fullText && (
          <section style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Prompt</h3>
            <div style={{
              background: "#0A1F44", borderRadius: 12, padding: "20px 20px",
              fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.75,
              whiteSpace: "pre-wrap", fontFamily: "monospace",
            }}>
              {fullText}
            </div>
          </section>
        )}

        {/* Response summary */}
        {prompt.response_summary && (
          <section style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Ergebnis / Umsetzung</h3>
            <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "16px", fontSize: 14, color: "#166534", lineHeight: 1.7, border: "1px solid #86efac" }}>
              {prompt.response_summary}
            </div>
          </section>
        )}

        {/* Implementation notes */}
        {prompt.implementation_notes && (
          <section style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Technische Notizen</h3>
            <div style={{ background: "#fafafa", borderRadius: 10, padding: "16px", fontSize: 13, color: "#374151", lineHeight: 1.7, border: "1px solid #e5e7eb" }}>
              {prompt.implementation_notes}
            </div>
          </section>
        )}

        {/* Timestamps */}
        <div style={{ display: "flex", gap: 16, marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af" }}>
            <Clock size={13} />
            Erstellt: {new Date(prompt.created).toLocaleDateString("de-DE")}
          </div>
          {prompt.updated !== prompt.created && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af" }}>
              <Clock size={13} />
              Geändert: {new Date(prompt.updated).toLocaleDateString("de-DE")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Prompt card ──────────────────────────────────────────────────────────────
function PromptCard({ prompt, onClick }) {
  const sc = STATUS_COLORS[prompt.status] || STATUS_COLORS.DRAFT;
  const tc = TYPE_COLORS[prompt.prompt_type] || { bg: "#f1f5f9", text: "#64748b" };
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", gap: 10,
      width: "100%", textAlign: "left", padding: "18px 20px",
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      cursor: "pointer", transition: "box-shadow 0.15s, border-color 0.15s",
      fontFamily: "'DM Sans', sans-serif",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,31,68,0.08)"; e.currentTarget.style.borderColor = "#c7d2de"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#0A1F44", letterSpacing: "0.04em", fontFamily: "monospace" }}>
              {prompt.prompt_code}
            </span>
            <Badge label={prompt.status} colors={sc} />
            <Badge label={prompt.prompt_type} colors={tc} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#0A1F44", margin: 0, lineHeight: 1.35 }}>{prompt.title}</p>
        </div>
        <ChevronRight size={18} color="#9ca3af" style={{ flexShrink: 0, marginTop: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {prompt.area && <span style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}><Tag size={11} />{prompt.area}</span>}
        {prompt.module && <span style={{ fontSize: 12, color: "#6b7280" }}>{prompt.module}</span>}
        {prompt.neuroways_version && <span style={{ fontSize: 12, color: "#9ca3af" }}>v{prompt.neuroways_version}</span>}
        {prompt.predecessor_code && (
          <span style={{ fontSize: 12, color: "#008CA8", display: "flex", alignItems: "center", gap: 4 }}>
            <GitBranch size={11} />{prompt.predecessor_code}
          </span>
        )}
      </div>
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PromptLibraryPage() {
  const [prompts, setPrompts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterArea, setFilterArea] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const controller = new AbortController();
    try {
      const res = await pb.collection("dev_prompts").getList(1, 200, {
        sort: "-created",
        signal: controller.signal,
      });
      setPrompts(res.items);
      setFiltered(res.items);
    } catch (e) {
      if (!e?.isAbort && e?.name !== "AbortError") console.error(e);
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    let out = prompts;
    if (search) out = out.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt_code?.toLowerCase().includes(search.toLowerCase()) ||
      p.area?.toLowerCase().includes(search.toLowerCase()) ||
      p.module?.toLowerCase().includes(search.toLowerCase())
    );
    if (filterType !== "ALL") out = out.filter(p => p.prompt_type === filterType);
    if (filterStatus !== "ALL") out = out.filter(p => p.status === filterStatus);
    if (filterArea !== "ALL") out = out.filter(p => p.area === filterArea);
    setFiltered(out);
  }, [search, filterType, filterStatus, filterArea, prompts]);

  const areas  = ["ALL", ...new Set(prompts.map(p => p.area).filter(Boolean))];
  const types  = ["ALL", ...new Set(prompts.map(p => p.prompt_type).filter(Boolean))];
  const statuses = ["ALL", ...new Set(prompts.map(p => p.status).filter(Boolean))];

  const selStyle = { padding: "6px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A1F44", margin: 0 }}>Prompt Library</h1>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-DEV-001 · Interner Entwicklungsbereich</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 12, lineHeight: 1.6 }}>
          Versionierte Wissensbasis aller NeuroWays-Entwicklungsaufträge.
          Jeder Prompt ist unveränderlich gespeichert — neue Versionen erzeugen neue Einträge.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Prompts gesamt",   value: prompts.length },
          { label: "Abgeschlossen",    value: prompts.filter(p => p.status === "COMPLETED" || p.status === "PUBLISHED").length },
          { label: "In Arbeit",        value: prompts.filter(p => p.status === "IN_PROGRESS").length },
          { label: "Bereiche",         value: new Set(prompts.map(p => p.area).filter(Boolean)).size },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: "14px 16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#0A1F44", margin: "0 0 4px" }}>{value}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={15} color="#9ca3af" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Suche nach Titel, Code, Bereich …"
            style={{ ...selStyle, width: "100%", boxSizing: "border-box", paddingLeft: 36 }}
          />
        </div>
        <select value={filterArea}   onChange={e => setFilterArea(e.target.value)}   style={selStyle}>
          {areas.map(a => <option key={a} value={a}>{a === "ALL" ? "Alle Bereiche" : a}</option>)}
        </select>
        <select value={filterType}   onChange={e => setFilterType(e.target.value)}   style={selStyle}>
          {types.map(t => <option key={t} value={t}>{t === "ALL" ? "Alle Typen" : t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selStyle}>
          {statuses.map(s => <option key={s} value={s}>{s === "ALL" ? "Alle Status" : s}</option>)}
        </select>
      </div>

      {/* Count */}
      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
        {filtered.length === prompts.length
          ? `${prompts.length} Prompts`
          : `${filtered.length} von ${prompts.length} Prompts`}
      </p>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>Wird geladen …</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>Keine Prompts gefunden.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(p => (
            <PromptCard key={p.id} prompt={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && <PromptDetail prompt={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
