/**
 * NW-BUILDER-002 — Session Builder
 * Vollständig NWObject-basiert. Keine Fachlogik, Texte, Farben oder Bewertungsregeln im Builder.
 * Liest ausschließlich: MODULE → METHOD → QUESTION → ANSWER_OPTION → CONTENT → SCORING_RULE
 */
import { useState, useEffect, useCallback } from "react";
import {
  createSession, startSession, saveSessionAnswer, computeSessionResult,
  completeSession, saveSessionContext, grantConsent, revokeConsent,
  getSessionHistory, loadFullSession, validateSession,
  migrateCheckinToSession, SESSION_STATUS, BUILDER_VERSION,
  getSessionConsents,
} from "../lib/sessionBuilderEngine.js";
import {
  getAllNwoMethods, getNwoMethod,
  getQuestionsForNwoMethod, getAnswerOptionsForNwoQuestion,
  getScoringRulesForNwoMethod, resolveContentRefs,
} from "../lib/methodBuilderEngine.js";
import { getCheckinHistory } from "../lib/engine.js";

import BookOpen    from "icon:book-open";
import Play        from "icon:play";
import Check       from "icon:check";
import ChevronRight from "icon:chevron-right";
import ChevronLeft  from "icon:chevron-left";
import History      from "icon:history";
import Shield       from "icon:shield";
import AlertCircle  from "icon:alert-circle";
import CheckCircle  from "icon:check-circle";
import Clock        from "icon:clock";
import Users        from "icon:users";
import Archive      from "icon:archive";

const FONT = "'DM Sans', sans-serif";
const NAVY = "#0A1F44";
const TEAL = "#008CA8";
const INP = { width: "100%", boxSizing: "border-box", padding: "9px 13px", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: NAVY, background: "#fafafa", outline: "none", fontFamily: FONT };
const LBL = { fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 5 };

// ─── Schritt 1: Session konfigurieren ─────────────────────────────────────────
function SessionSetup({ methods, onStart }) {
  const [methodId, setMethodId] = useState(methods[0]?.id || "");
  const [execMode, setExecMode] = useState("APP");
  const [starting, setStarting] = useState(false);

  async function handleStart() {
    if (!methodId) return;
    setStarting(true);
    try {
      const session = await createSession({ methodId, executionMode: execMode });
      await startSession(session.id);
      onStart(session, methodId);
    } finally { setStarting(false); }
  }

  const modes = ["APP","SEMINAR","WORKSHOP","COACHING","ANALOG","NEUROPLAY"];

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#0A1F44,#1a3560)", borderRadius: 18, padding: "20px 24px", marginBottom: 24, color: "#fff" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Session Builder v{BUILDER_VERSION}</p>
        <p style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>Neue Session</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Methode auswählen und Session starten</p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label><span style={LBL}>Methode</span>
          <select value={methodId} onChange={e => setMethodId(e.target.value)} style={INP}>
            {methods.map(m => <option key={m.id} value={m.id}>{m.code} v{m.version}</option>)}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label><span style={LBL}>Ausführungsform</span>
          <select value={execMode} onChange={e => setExecMode(e.target.value)} style={INP}>
            {modes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
      </div>

      <div style={{ padding: "14px 18px", background: "#f8fafc", borderRadius: 14, border: "1px solid #eaeaea", marginBottom: 24, fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 6 }}>Versionssicherung beim Start:</p>
        Beim Start werden Methoden-, Inhalts-, Scoring- und Builder-Version eingefroren.
        Historische Sessions bleiben dauerhaft unveränderlich.
      </div>

      <button onClick={handleStart} disabled={starting || !methodId} style={{ width: "100%", padding: "14px 20px", borderRadius: 14, border: "none", background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, cursor: starting ? "not-allowed" : "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Play size={16} />
        {starting ? "Session wird erstellt …" : "Session starten"}
      </button>
    </div>
  );
}

// ─── Schritt 2: Fragen durchführen ─────────────────────────────────────────────
function SessionConduct({ session, methodId, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [texts, setTexts] = useState({});
  const [optionTexts, setOptionTexts] = useState({});
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [options, setOptions] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const q = await getQuestionsForNwoMethod(methodId);
      setQuestions(q.items);
      const qt = await resolveContentRefs(q.items, ["question_text_ref"]);
      setTexts(qt);
      // Antwortoptionen für alle Fragen laden
      const allOpts = {};
      for (const qi of q.items) {
        const opts = await getAnswerOptionsForNwoQuestion(qi.id);
        allOpts[qi.id] = opts.items;
        const ot = await resolveContentRefs(opts.items, ["label_content_ref"]);
        setOptionTexts(prev => ({ ...prev, ...ot }));
      }
      setOptions(allOpts);
      setLoading(false);
    })();
  }, [methodId]);

  const q = questions[current];
  const qOpts = q ? (options[q.id] || []) : [];
  const progress = Math.round(((current + 1) / (questions.length || 1)) * 100);

  async function handleSelect(opt) {
    setAnswers(prev => ({ ...prev, [q.id]: opt }));
  }

  async function handleNext() {
    const answer = answers[q.id];
    if (!answer) return;
    setSaving(true);
    try {
      await saveSessionAnswer(session.id, {
        questionRef:     q.id,
        questionCode:    q.code,
        questionVersion: q.version || "1.1.0",
        answerOptionRef: answer.id,
        answerCode:      answer.code,
        numericValue:    answer.numeric_value,
        dimensionCode:   q.dimension_code,
        sortOrder:       q.sort_order,
      });
    } finally { setSaving(false); }

    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      // Alle Antworten zusammenstellen und Ergebnis berechnen
      const allAnswers = Object.entries(answers).map(([qId, opt]) => ({
        question_ref: qId,
        numeric_value: opt.numeric_value,
      }));
      // letzte Antwort muss noch gespeichert worden sein (oben)
      await onComplete(allAnswers);
    }
  }

  if (loading) return <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Fragen werden geladen …</p>;

  return (
    <div>
      {/* Fortschritt */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>Frage {current + 1} von {questions.length}</span>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{progress}%</span>
        </div>
        <div style={{ height: 4, background: "#f0f0f0", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", background: NAVY, width: progress + "%", borderRadius: 99, transition: "width 0.3s ease" }} />
        </div>
      </div>

      {/* Fragetext — kommt aus CONTENT-Referenz, kein Text im Builder */}
      <div style={{ padding: "20px 20px", background: "#f8fafc", borderRadius: 16, marginBottom: 20 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: NAVY, lineHeight: 1.6, margin: 0 }}>
          {q ? (texts[q.question_text_ref] || q.code) : "–"}
        </p>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
          {q?.code} · {q?.dimension_code} · v{q?.version || "1.1.0"}
        </p>
      </div>

      {/* Antwortoptionen — Labels aus CONTENT-Referenzen */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {qOpts.map(opt => {
          const selected = answers[q?.id]?.id === opt.id;
          const label = optionTexts[opt.label_content_ref] || opt.code;
          return (
            <button key={opt.id} onClick={() => handleSelect(opt)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
              borderRadius: 14, border: `1.5px solid ${selected ? NAVY : "#e5e7eb"}`,
              background: selected ? "#f0f4fa" : "#fff", cursor: "pointer",
              textAlign: "left", fontFamily: FONT, transition: "all 0.15s",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: selected ? NAVY : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {selected ? <Check size={14} color="#fff" /> : <span style={{ fontSize: 12, fontWeight: 800, color: "#9ca3af" }}>{opt.numeric_value}</span>}
              </div>
              <span style={{ fontSize: 14, fontWeight: selected ? 700 : 400, color: NAVY }}>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 10 }}>
        {current > 0 && (
          <button onClick={() => setCurrent(c => c - 1)} style={{ padding: "11px 20px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={15} /> Zurück
          </button>
        )}
        <button onClick={handleNext} disabled={!answers[q?.id] || saving} style={{ flex: 1, padding: "11px 20px", borderRadius: 12, border: "none", background: answers[q?.id] ? NAVY : "#e5e7eb", color: answers[q?.id] ? "#fff" : "#9ca3af", fontSize: 14, fontWeight: 700, cursor: (answers[q?.id] && !saving) ? "pointer" : "not-allowed", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {saving ? "Speichert …" : current < questions.length - 1 ? <><ChevronRight size={15} /> Weiter</> : <><Check size={15} /> Abschließen</>}
        </button>
      </div>
    </div>
  );
}

// ─── Schritt 3: Ergebnis und Freigaben ─────────────────────────────────────────
function SessionResult({ session, result, rule, texts, onContextSave }) {
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState({ TEAM: false, ENTERPRISE: false, NEUROWAYS: false });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const resultLabel = texts[rule?.label_content_ref] || rule?.result_code || "–";
  const resultDesc  = texts[rule?.description_content_ref] || "";

  async function handleSave() {
    setSaving(true);
    try {
      await saveSessionContext(session.id, { note, activities: [], tags: [] });
      for (const [type, granted] of Object.entries(consent)) {
        if (granted) await grantConsent(session.id, { granteeType: type, scope: "RESULT" });
      }
      setSaved(true);
      if (onContextSave) onContextSave();
    } finally { setSaving(false); }
  }

  return (
    <div>
      <div style={{ padding: "20px 22px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 18, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <CheckCircle size={22} color="#166534" />
          <p style={{ fontSize: 16, fontWeight: 800, color: "#166534", margin: 0 }}>Session abgeschlossen</p>
        </div>
        <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{resultLabel}</p>
        {resultDesc && <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>{resultDesc}</p>}
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
          Score: {result?.total_score} · Zone: {result?.result_code} · Scoring v{result?.scoring_version}
        </p>
      </div>

      {/* Versions-Audit */}
      <div style={{ padding: "14px 18px", background: "#f8fafc", borderRadius: 14, border: "1px solid #eaeaea", marginBottom: 20, fontSize: 12 }}>
        <p style={{ fontWeight: 700, color: NAVY, marginBottom: 8 }}>Eingefrorene Versionen</p>
        {[["Methode", session.method_version], ["Scoring", session.scoring_version], ["Inhalte", session.content_version], ["Builder", session.builder_version]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: "#6b7280" }}>{k}</span>
            <span style={{ fontFamily: "monospace", color: NAVY }}>v{v}</span>
          </div>
        ))}
      </div>

      {/* Persönliche Notiz */}
      <div style={{ marginBottom: 16 }}>
        <label><span style={LBL}>Persönliche Notiz (optional)</span>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Für dein zukünftiges Ich …" style={{ ...INP, resize: "vertical" }} />
        </label>
      </div>

      {/* Freigaben — Standard: keine */}
      <div style={{ marginBottom: 24 }}>
        <p style={LBL}>Freigaben (Standard: keine)</p>
        {[["TEAM","Teamleitung"], ["ENTERPRISE","Unternehmen"], ["NEUROWAYS","NeuroWays"]].map(([type, label]) => (
          <label key={type} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={consent[type]} onChange={e => setConsent(c => ({ ...c, [type]: e.target.checked }))} />
            <span style={{ fontSize: 14, color: NAVY }}>{label}</span>
          </label>
        ))}
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>Freigaben können jederzeit widerrufen werden.</p>
      </div>

      {saved ? (
        <div style={{ padding: "12px 18px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, fontSize: 13, color: "#166534", textAlign: "center" }}>
          ✓ Gespeichert
        </div>
      ) : (
        <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "13px 20px", borderRadius: 14, border: "none", background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: FONT }}>
          {saving ? "Wird gespeichert …" : "Abschließen und speichern"}
        </button>
      )}
    </div>
  );
}

// ─── Session-Verlauf ──────────────────────────────────────────────────────────
function SessionHistory({ methodId, onMigrate }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);

  const load = useCallback(async () => {
    const res = await getSessionHistory(1, 20);
    setSessions(res.items);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleMigrateAll() {
    setMigrating(true);
    try {
      const checkins = await getCheckinHistory(1, 100);
      for (const c of checkins.items) {
        await migrateCheckinToSession(c, methodId);
      }
      load();
    } finally { setMigrating(false); }
  }

  if (loading) return <p style={{ textAlign: "center", color: "#9ca3af", padding: "20px 0" }}>Laden …</p>;

  return (
    <div>
      {sessions.length === 0 ? (
        <div style={{ padding: "24px", background: "#f8fafc", borderRadius: 16, textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 12 }}>Noch keine NWObject-Sessions vorhanden.</p>
          <button onClick={handleMigrateAll} disabled={migrating} style={{ padding: "9px 18px", borderRadius: 11, border: "none", background: NAVY, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
            {migrating ? "Migriert …" : "Bestehende Check-ins als Sessions übernehmen"}
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button onClick={handleMigrateAll} disabled={migrating} style={{ padding: "7px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", fontSize: 12, fontWeight: 600, color: "#6b7280", cursor: "pointer", fontFamily: FONT }}>
              {migrating ? "Migriert …" : "Check-ins übernehmen"}
            </button>
          </div>
          {sessions.map(s => (
            <div key={s.id} style={{ padding: "14px 18px", background: "#fff", borderRadius: 14, border: "1px solid #eaeaea", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: 0 }}>{s.session_date || s.created?.split("T")[0]}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: "3px 0 0" }}>
                    {s.execution_mode} · Methode v{s.method_version} · Builder v{s.builder_version}
                    {s.legacy_checkin_id && " · migriert"}
                  </p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: s.status === "COMPLETED" ? "#f0fdf4" : "#fef9c3", color: s.status === "COMPLETED" ? "#166534" : "#92400e", border: `1px solid ${s.status === "COMPLETED" ? "#86efac" : "#fcd34d"}` }}>
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── Validierungsbericht ──────────────────────────────────────────────────────
function ValidationReport({ sessionId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    const r = await validateSession(sessionId);
    setReport(r);
    setLoading(false);
  }

  return (
    <div>
      <button onClick={run} disabled={loading} style={{ width: "100%", padding: "12px 20px", borderRadius: 14, border: "none", background: NAVY, color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: FONT, marginBottom: 16 }}>
        {loading ? "Prüft …" : "Session validieren"}
      </button>
      {report && (
        <div>
          <div style={{ padding: "14px 18px", borderRadius: 14, background: report.valid ? "#f0fdf4" : "#fef2f2", border: `1px solid ${report.valid ? "#86efac" : "#fca5a5"}`, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {report.valid ? <CheckCircle size={16} color="#166534" /> : <AlertCircle size={16} color="#b91c1c" />}
              <span style={{ fontSize: 14, fontWeight: 700, color: report.valid ? "#166534" : "#b91c1c" }}>
                {report.valid ? "Validierung bestanden" : report.errors.length + " Fehler"}
              </span>
            </div>
          </div>
          {[...report.errors.map(e => ["❌",e,"#b91c1c"]), ...report.warnings.map(w => ["⚠️",w,"#92400e"])].map(([icon,msg,col],i) => (
            <div key={i} style={{ padding: "8px 14px", borderRadius: 10, background: "#f9fafb", border: "1px solid #eaeaea", marginBottom: 6, fontSize: 13, color: col, display: "flex", gap: 8 }}>
              <span>{icon}</span>{msg}
            </div>
          ))}
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
            {report.answerCount} Antworten · {report.hasResult ? "Ergebnis vorhanden" : "Kein Ergebnis"} · Versionen eingefroren: {report.versionsFrozen ? "Ja" : "Nein"}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Hauptseite ───────────────────────────────────────────────────────────────
export default function SessionBuilderPage() {
  const [view, setView] = useState("setup"); // setup | conduct | result | history | validate
  const [methods, setMethods] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [activeMethodId, setActiveMethodId] = useState(null);
  const [sessionResult, setSessionResult] = useState(null);
  const [sessionRule, setSessionRule] = useState(null);
  const [resultTexts, setResultTexts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNwoMethods().then(res => { setMethods(res.items); setLoading(false); });
  }, []);

  async function handleSessionStart(session, methodId) {
    setActiveSession(session);
    setActiveMethodId(methodId);
    setView("conduct");
  }

  async function handleSessionComplete(allAnswers) {
    if (!activeSession || !activeMethodId) return;
    const { result, rule } = await computeSessionResult(activeSession.id, activeMethodId, allAnswers);
    await completeSession(activeSession.id);
    // Texte für Ergebniszone aus CONTENT-Refs laden
    if (rule) {
      const resolved = rule ? await resolveContentRefs([rule], ["label_content_ref", "description_content_ref"]) : {};
      setResultTexts(resolved);
    }
    setSessionResult(result);
    setSessionRule(rule);
    setView("result");
  }

  const tabs = [
    { key: "setup",    label: "Neue Session", icon: Play },
    { key: "history",  label: "Verlauf",      icon: History },
    { key: "validate", label: "Prüfung",      icon: Shield },
  ];

  const tabBtn = (key, label, Icon) => (
    <button key={key} onClick={() => setView(key)} style={{
      display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
      borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: FONT,
      background: view === key ? NAVY : "#f6f4f1",
      color: view === key ? "#fff" : "#6b7280",
      border: "none", cursor: "pointer", transition: "all 0.15s",
    }}>
      <Icon size={14} />{label}
    </button>
  );

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 100px", fontFamily: FONT }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BookOpen size={19} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: 0 }}>Session Builder</h1>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-BUILDER-002 · Vollständig NWObject-basiert · v{BUILDER_VERSION}</p>
        </div>
      </div>

      {view !== "conduct" && view !== "result" && (
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {tabs.map(t => tabBtn(t.key, t.label, t.icon))}
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: "center", color: "#9ca3af", padding: "40px 0" }}>Lädt …</p>
      ) : view === "setup" ? (
        <SessionSetup methods={methods} onStart={handleSessionStart} />
      ) : view === "conduct" && activeSession ? (
        <SessionConduct session={activeSession} methodId={activeMethodId} onComplete={handleSessionComplete} />
      ) : view === "result" ? (
        <SessionResult session={activeSession} result={sessionResult} rule={sessionRule} texts={resultTexts} onContextSave={() => setView("history")} />
      ) : view === "history" ? (
        <SessionHistory methodId={activeMethodId || methods[0]?.id} onMigrate={() => {}} />
      ) : view === "validate" ? (
        activeSession ? (
          <ValidationReport sessionId={activeSession.id} />
        ) : (
          <p style={{ color: "#9ca3af", fontSize: 14, textAlign: "center" }}>Starte zuerst eine Session, um sie zu validieren.</p>
        )
      ) : null}
    </main>
  );
}
