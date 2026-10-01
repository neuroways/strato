/**
 * NW-CB-006 — Method Builder
 * Vollständig datengetrieben über NWObject-Collections.
 * Keine Hardcodierung von Texten, Farben oder Grenzen.
 */
import { useState, useEffect, useCallback } from "react";
import {
  getAllNwoMethods,
  getNwoMethod,
  getQuestionsForNwoMethod,
  getAnswerOptionsForNwoQuestion,
  getScoringRulesForNwoMethod,
  getExecutionModesForNwoMethod,
  resolveContentRefs,
  createNwoQuestion,
  updateNwoQuestionText,
  updateNwoQuestion,
  deleteNwoQuestion,
  createNwoAnswerOption,
  updateNwoAnswerOptionLabel,
  deleteNwoAnswerOption,
  updateNwoScoringRuleBounds,
  validateNwoMethod,
} from "../lib/methodBuilderEngine.js";

import Plus         from "icon:plus";
import Edit2        from "icon:edit-2";
import Trash2       from "icon:trash-2";
import Check        from "icon:check";
import X            from "icon:x";
import ChevronDown  from "icon:chevron-down";
import ChevronUp    from "icon:chevron-up";
import AlertCircle  from "icon:alert-circle";
import CheckCircle  from "icon:check-circle";
import Settings     from "icon:settings";
import BookOpen     from "icon:book-open";

// ─── Stile ────────────────────────────────────────────────────────────────────
const FONT = "'DM Sans', sans-serif";
const NAVY = "#0A1F44";
const TEAL = "#008CA8";
const INP = {
  width: "100%", boxSizing: "border-box", padding: "9px 13px",
  border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14,
  color: NAVY, background: "#fafafa", outline: "none", fontFamily: FONT,
};
const LBL = {
  fontSize: 11, fontWeight: 700, color: "#9ca3af",
  textTransform: "uppercase", letterSpacing: "0.07em",
  display: "block", marginBottom: 5,
};

// ─── Inline-Editor ────────────────────────────────────────────────────────────
function InlineEditor({ value, onSave, onCancel, multiline }) {
  const [draft, setDraft] = useState(value);
  const El = multiline ? "textarea" : "input";
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
      <El value={draft} onChange={e => setDraft(e.target.value)}
        style={{ ...INP, flex: 1, resize: multiline ? "vertical" : "none", minHeight: multiline ? 72 : undefined }}
        autoFocus rows={multiline ? 3 : undefined} />
      <button onClick={() => onSave(draft)} style={{ padding: "8px 10px", borderRadius: 8, border: "none", background: NAVY, cursor: "pointer" }}>
        <Check size={14} color="#fff" />
      </button>
      <button onClick={onCancel} style={{ padding: "8px 10px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>
        <X size={14} color="#6b7280" />
      </button>
    </div>
  );
}

// ─── Antwortoption ────────────────────────────────────────────────────────────
function AnswerOptionRow({ opt, texts, onDelete, onLabelSave }) {
  const [editing, setEditing] = useState(false);
  const label = texts[opt.label_content_ref] || opt.code;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "#f8fafc", border: "1px solid #eaeaea" }}>
      <span style={{ width: 24, height: 24, borderRadius: 7, background: NAVY, color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {opt.numeric_value}
      </span>
      {editing ? (
        <InlineEditor value={label} onSave={async v => { await onLabelSave(opt.id, opt.label_content_ref, v); setEditing(false); }} onCancel={() => setEditing(false)} />
      ) : (
        <>
          <span style={{ flex: 1, fontSize: 13, color: NAVY }}>{label}</span>
          <button onClick={() => setEditing(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit2 size={13} color="#9ca3af" /></button>
          <button onClick={() => onDelete(opt.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={13} color="#ef4444" /></button>
        </>
      )}
    </div>
  );
}

// ─── Frage-Karte ─────────────────────────────────────────────────────────────
function QuestionCard({ question, methodId, texts, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [editingText, setEditingText] = useState(false);
  const [opts, setOpts] = useState([]);
  const [optsLoaded, setOptsLoaded] = useState(false);
  const [addingOpt, setAddingOpt] = useState(false);
  const [newOptLabel, setNewOptLabel] = useState("");
  const [working, setWorking] = useState(false);

  const qText = texts[question.question_text_ref] || question.code;

  const loadOpts = useCallback(async () => {
    const res = await getAnswerOptionsForNwoQuestion(question.id);
    setOpts(res.items);
    setOptsLoaded(true);
  }, [question.id]);

  useEffect(() => { if (open && !optsLoaded) loadOpts(); }, [open, optsLoaded, loadOpts]);

  async function handleDeleteQuestion() {
    if (!confirm("Frage und alle Antwortoptionen löschen?")) return;
    setWorking(true);
    await deleteNwoQuestion(question.id);
    onRefresh();
  }

  async function handleSaveText(newText) {
    await updateNwoQuestionText(question.id, question.question_text_ref, newText);
    setEditingText(false);
    onRefresh();
  }

  async function handleAddOption() {
    if (!newOptLabel.trim()) return;
    setWorking(true);
    const nextVal = opts.length > 0 ? Math.max(...opts.map(o => o.numeric_value)) + 1 : 1;
    await createNwoAnswerOption(question.id, question.code, {
      label: newOptLabel,
      numericValue: nextVal,
      sortOrder: nextVal * 10,
    });
    setNewOptLabel("");
    setAddingOpt(false);
    setWorking(false);
    loadOpts();
  }

  async function handleDeleteOpt(optId) {
    await deleteNwoAnswerOption(optId);
    loadOpts();
  }

  async function handleLabelSave(optId, contentId, newLabel) {
    await updateNwoAnswerOptionLabel(optId, contentId, newLabel);
    loadOpts();
  }

  // Lade opts-Texte
  const [optTexts, setOptTexts] = useState({});
  useEffect(() => {
    if (opts.length) {
      resolveContentRefs(opts, ["label_content_ref"]).then(setOptTexts);
    }
  }, [opts]);

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eaeaea", overflow: "hidden", marginBottom: 10 }}>
      {/* Header */}
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{question.sort_order / 10}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {editingText ? (
            <InlineEditor value={qText} onSave={handleSaveText} onCancel={() => setEditingText(false)} multiline />
          ) : (
            <p style={{ fontSize: 14, fontWeight: 600, color: NAVY, margin: 0, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {qText}
            </p>
          )}
          <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>
            {question.code} · {question.dimension_code} · {question.is_required ? "Pflichtfrage" : "Optional"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {!editingText && (
            <button onClick={() => setEditingText(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit2 size={15} color="#9ca3af" /></button>
          )}
          <button onClick={handleDeleteQuestion} disabled={working} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={15} color="#ef4444" /></button>
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            {open ? <ChevronUp size={16} color="#9ca3af" /> : <ChevronDown size={16} color="#9ca3af" />}
          </button>
        </div>
      </div>

      {/* Antwortoptionen */}
      {open && (
        <div style={{ padding: "0 18px 16px", borderTop: "1px solid #f5f5f5" }}>
          <p style={{ ...LBL, marginTop: 12, marginBottom: 8 }}>
            Antwortoptionen ({opts.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
            {opts.map(opt => (
              <AnswerOptionRow key={opt.id} opt={opt} texts={optTexts} onDelete={handleDeleteOpt} onLabelSave={handleLabelSave} />
            ))}
          </div>
          {addingOpt ? (
            <div style={{ display: "flex", gap: 6 }}>
              <input value={newOptLabel} onChange={e => setNewOptLabel(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddOption()}
                placeholder="Antworttext …" style={{ ...INP, flex: 1 }} autoFocus />
              <button onClick={handleAddOption} disabled={working} style={{ padding: "8px 14px", borderRadius: 10, border: "none", background: NAVY, color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: FONT, fontWeight: 700 }}>
                Hinzufügen
              </button>
              <button onClick={() => setAddingOpt(false)} style={{ padding: "8px 10px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>
                <X size={14} color="#6b7280" />
              </button>
            </div>
          ) : (
            <button onClick={() => setAddingOpt(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 10, border: "1.5px dashed #d4dce8", background: "transparent", cursor: "pointer", fontSize: 13, color: TEAL, fontFamily: FONT, fontWeight: 600 }}>
              <Plus size={13} /> Antwortoption hinzufügen
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Bewertungsregel-Editor ───────────────────────────────────────────────────
function ScoringRuleRow({ rule, texts, onSave }) {
  const [editing, setEditing] = useState(false);
  const [min, setMin] = useState(rule.min_score);
  const [max, setMax] = useState(rule.max_score);
  const label = texts[rule.label_content_ref] || rule.result_code;
  const desc  = texts[rule.description_content_ref] || "";

  return (
    <div style={{ padding: "12px 16px", background: "#fff", borderRadius: 14, border: "1px solid #eaeaea", marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2a9d8f", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>{label}</p>
          {desc && <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0", lineHeight: 1.5 }}>{desc.slice(0, 80)}{desc.length > 80 ? "…" : ""}</p>}
        </div>
        {editing ? (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input type="number" value={min} onChange={e => setMin(+e.target.value)} style={{ ...INP, width: 70 }} />
            <span style={{ fontSize: 12, color: "#6b7280" }}>–</span>
            <input type="number" value={max} onChange={e => setMax(+e.target.value)} style={{ ...INP, width: 70 }} />
            <button onClick={async () => { await onSave(rule.id, min, max); setEditing(false); }} style={{ padding: "7px 10px", borderRadius: 8, border: "none", background: NAVY, cursor: "pointer" }}>
              <Check size={13} color="#fff" />
            </button>
            <button onClick={() => { setMin(rule.min_score); setMax(rule.max_score); setEditing(false); }} style={{ padding: "7px 10px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>
              <X size={13} color="#6b7280" />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: NAVY, fontFamily: "monospace" }}>{rule.min_score}–{rule.max_score}</span>
            <button onClick={() => setEditing(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit2 size={13} color="#9ca3af" /></button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function MethodBuilderPage() {
  const [methods, setMethods]     = useState([]);
  const [selectedId, setSelected] = useState(null);
  const [method, setMethod]       = useState(null);
  const [questions, setQuestions] = useState([]);
  const [rules, setRules]         = useState([]);
  const [execModes, setExecModes] = useState([]);
  const [texts, setTexts]         = useState({});
  const [loading, setLoading]     = useState(true);
  const [view, setView]           = useState("questions"); // questions | scoring | modes | validate
  const [addingQ, setAddingQ]     = useState(false);
  const [newQ, setNewQ]           = useState({ code: "", text: "", dim: "", sort: "" });
  const [validation, setValidation] = useState(null);
  const [validating, setValidating] = useState(false);

  const loadMethods = useCallback(async () => {
    const res = await getAllNwoMethods();
    setMethods(res.items);
    if (!selectedId && res.items.length) setSelected(res.items[0].id);
    setLoading(false);
  }, [selectedId]);

  useEffect(() => { loadMethods(); }, []);

  const loadMethod = useCallback(async () => {
    if (!selectedId) return;
    const [m, q, r, e] = await Promise.all([
      getNwoMethod(selectedId),
      getQuestionsForNwoMethod(selectedId),
      getScoringRulesForNwoMethod(selectedId),
      getExecutionModesForNwoMethod(selectedId),
    ]);
    setMethod(m);
    setQuestions(q.items);
    setRules(r.items);
    setExecModes(e.items);
    // Alle Content-Refs auflösen
    const allObjs = [m, ...q.items, ...r.items];
    const allFields = ["name_content_ref","description_content_ref","question_text_ref","label_content_ref","description_content_ref"];
    const resolved = await resolveContentRefs(allObjs, allFields);
    setTexts(resolved);
    setValidation(null);
  }, [selectedId]);

  useEffect(() => { loadMethod(); }, [loadMethod]);

  async function handleAddQuestion() {
    if (!newQ.code || !newQ.text) return;
    await createNwoQuestion(selectedId, {
      code: newQ.code,
      dimensionCode: newQ.dim || newQ.code.toLowerCase(),
      sortOrder: newQ.sort ? +newQ.sort : (questions.length + 1) * 10,
      isRequired: true,
      questionText: newQ.text,
    });
    setNewQ({ code: "", text: "", dim: "", sort: "" });
    setAddingQ(false);
    loadMethod();
  }

  async function handleValidate() {
    setValidating(true);
    const v = await validateNwoMethod(selectedId);
    setValidation(v);
    setValidating(false);
  }

  const methodName = texts[method?.name_content_ref] || method?.code || "–";

  const tabBtn = (key, label) => (
    <button key={key} onClick={() => setView(key)} style={{
      padding: "7px 14px", borderRadius: 9, fontSize: 13, fontWeight: 600,
      background: view === key ? NAVY : "#f6f4f1",
      color: view === key ? "#fff" : "#6b7280",
      border: "none", cursor: "pointer", fontFamily: FONT,
      transition: "all 0.15s",
    }}>{label}</button>
  );

  return (
    <main style={{ maxWidth: 740, margin: "0 auto", padding: "28px 20px 100px", fontFamily: FONT }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BookOpen size={19} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: 0 }}>Method Builder</h1>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-CB-006 · Methoden über NWObjects pflegen</p>
        </div>
      </div>

      {/* Methodenauswahl */}
      {methods.length > 1 && (
        <div style={{ marginBottom: 20 }}>
          <label style={LBL}>Methode</label>
          <select value={selectedId || ""} onChange={e => setSelected(e.target.value)} style={INP}>
            {methods.map(m => <option key={m.id} value={m.id}>{texts[m.name_content_ref] || m.code}</option>)}
          </select>
        </div>
      )}

      {method && (
        <div style={{ background: "linear-gradient(135deg,#0A1F44,#1a3560)", borderRadius: 18, padding: "18px 22px", marginBottom: 24, color: "#fff" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Aktive Methode</p>
          <p style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>{methodName}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            <span>v{method.version}</span>
            <span>{method.scoring_type}</span>
            <span>Score {method.min_score}–{method.max_score}</span>
            <span>{method.estimated_duration_minutes} Min.</span>
            <span>{questions.length} Fragen</span>
          </div>
        </div>
      )}

      {/* Tab-Navigation */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
        {tabBtn("questions", `Fragen (${questions.length})`)}
        {tabBtn("scoring", `Zonen (${rules.length})`)}
        {tabBtn("modes", `Ausführung (${execModes.length})`)}
        {tabBtn("validate", "Prüfung")}
      </div>

      {loading && <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Lädt …</p>}

      {/* ── Fragen ── */}
      {!loading && view === "questions" && (
        <div>
          {questions.map(q => (
            <QuestionCard key={q.id} question={q} methodId={selectedId} texts={texts} onRefresh={loadMethod} />
          ))}

          {addingQ ? (
            <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #0A1F44", padding: "18px 18px", marginTop: 10 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 14 }}>Neue Frage</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <label><span style={LBL}>Code *</span><input value={newQ.code} onChange={e => setNewQ(q => ({...q, code: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g,"")}))} placeholder="ENERGY_Q_NEW" style={INP} /></label>
                <label><span style={LBL}>Dimension</span><input value={newQ.dim} onChange={e => setNewQ(q => ({...q, dim: e.target.value.toLowerCase()}))} placeholder="energy" style={INP} /></label>
              </div>
              <label style={{ display: "block", marginBottom: 12 }}>
                <span style={LBL}>Fragetext *</span>
                <textarea value={newQ.text} onChange={e => setNewQ(q => ({...q, text: e.target.value}))} rows={2} placeholder="Wie …?" style={{ ...INP, resize: "vertical" }} />
              </label>
              <label style={{ display: "block", marginBottom: 14 }}>
                <span style={LBL}>Reihenfolge</span>
                <input type="number" value={newQ.sort} onChange={e => setNewQ(q => ({...q, sort: e.target.value}))} placeholder={(questions.length + 1) * 10} style={{ ...INP, width: 120 }} />
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setAddingQ(false)} style={{ padding: "9px 18px", borderRadius: 11, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: FONT }}>Abbrechen</button>
                <button onClick={handleAddQuestion} disabled={!newQ.code || !newQ.text} style={{ flex: 1, padding: "9px 18px", borderRadius: 11, border: "none", background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, cursor: (!newQ.code || !newQ.text) ? "not-allowed" : "pointer", opacity: (!newQ.code || !newQ.text) ? 0.5 : 1, fontFamily: FONT }}>Frage anlegen</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingQ(true)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "13px 18px", borderRadius: 14, border: "1.5px dashed #c7d2e7", background: "transparent", cursor: "pointer", fontSize: 14, color: TEAL, fontFamily: FONT, fontWeight: 600, justifyContent: "center", marginTop: 6 }}>
              <Plus size={16} /> Neue Frage hinzufügen
            </button>
          )}
        </div>
      )}

      {/* ── Bewertungszonen ── */}
      {!loading && view === "scoring" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>
            Passe die Punktgrenzen der Ergebniszonen an. Achte darauf, dass alle Bereiche lückenlos von {method?.min_score} bis {method?.max_score} abgedeckt sind.
          </p>
          {rules.map(r => (
            <ScoringRuleRow key={r.id} rule={r} texts={texts} onSave={async (id, min, max) => { await updateNwoScoringRuleBounds(id, min, max); loadMethod(); }} />
          ))}
        </div>
      )}

      {/* ── Ausführungsformen ── */}
      {!loading && view === "modes" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 18, lineHeight: 1.6 }}>
            Die Ausführungsformen beschreiben, in welchen Kontexten diese Methode verwendet werden kann. Fachlogik bleibt bei allen Formen identisch.
          </p>
          {execModes.map(em => (
            <div key={em.id} style={{ padding: "14px 18px", background: "#fff", borderRadius: 14, border: "1px solid #eaeaea", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>{em.code}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: "3px 0 0" }}>Typ: {em.mode_type}</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {em.supports_analog && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "#fef3c7", color: "#92400e", fontWeight: 700 }}>Analog</span>}
                  {em.supports_ai && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "#ede9fe", color: "#5b21b6", fontWeight: 700 }}>KI</span>}
                  {em.facilitator_required && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "#dbeafe", color: "#1e40af", fontWeight: 700 }}>Moderation</span>}
                  <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: "#f0fdf4", color: "#166534", border: "1px solid #86efac", fontWeight: 700 }}>{em.status}</span>
                </div>
              </div>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#b0b8c4", textAlign: "center", marginTop: 16 }}>
            Ausführungsformen werden über NWO-Migrationsskripte gepflegt — Bearbeitungsfunktion folgt in v1.1.
          </p>
        </div>
      )}

      {/* ── Prüfung ── */}
      {!loading && view === "validate" && (
        <div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
            Prüfe die vollständige Methodenkonfiguration — Pflichtfragen, Antwortoptionen und Zonengrenzen.
          </p>
          <button onClick={handleValidate} disabled={validating} style={{ width: "100%", padding: "14px 20px", borderRadius: 14, border: "none", background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, cursor: validating ? "not-allowed" : "pointer", opacity: validating ? 0.7 : 1, fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Settings size={16} />
            {validating ? "Prüfung läuft …" : "Methode jetzt prüfen"}
          </button>

          {validation && (
            <div style={{ marginTop: 20 }}>
              <div style={{ padding: "16px 20px", borderRadius: 14, background: validation.valid ? "#f0fdf4" : "#fef2f2", border: `1px solid ${validation.valid ? "#86efac" : "#fca5a5"}`, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  {validation.valid ? <CheckCircle size={18} color="#166534" /> : <AlertCircle size={18} color="#b91c1c" />}
                  <span style={{ fontSize: 15, fontWeight: 800, color: validation.valid ? "#166534" : "#b91c1c" }}>
                    {validation.valid ? "Methode ist vollständig konfiguriert" : `${validation.errors.length} Fehler gefunden`}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: validation.valid ? "#166534" : "#b91c1c", margin: 0, opacity: 0.8 }}>
                  {validation.questions.length} Fragen · {validation.rules.length} Zonen · Score {method?.min_score}–{method?.max_score}
                </p>
              </div>

              {validation.errors.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  {validation.errors.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "10px 14px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, marginBottom: 8, fontSize: 13, color: "#b91c1c" }}>
                      <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />{e}
                    </div>
                  ))}
                </div>
              )}

              {validation.warnings.length > 0 && (
                <div>
                  {validation.warnings.map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "10px 14px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, marginBottom: 8, fontSize: 13, color: "#92400e" }}>
                      <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />{w}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
