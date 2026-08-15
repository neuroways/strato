import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import {
  getActiveMethod,
  getQuestionsForMethod,
  getAllAnswerOptionsForQuestions,
  getResultRules,
  validateMethodReadiness,
  warnIfScaleOutOfSync,
  partitionQuestions,
  resolveResultRule,
  saveCheckin,
} from "../lib/engine.js";
import ChevronLeft from "icon:chevron-left";
import CheckCircle from "icon:check-circle";
import AlertCircle from "icon:alert-circle";
import Home from "icon:home";
import AnswerCard, { ENERGY_ICON_PRESETS } from "../components/AnswerCard.jsx";

export default function CheckIn() {
  const navigate = useNavigate();

  // ─── Loading state ───────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null); // pre-flight validation failure

  // ─── Method data ─────────────────────────────────────────────────────────
  const [method, setMethod] = useState(null);
  const [questions, setQuestions] = useState([]); // only answerable questions
  const [optionsByQuestion, setOptionsByQuestion] = useState({});
  const [rules, setRules] = useState([]);

  // ─── Check-in progress ───────────────────────────────────────────────────
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]); // [{questionId, answerId, dimensionCode, numericValue}]

  // ─── Runtime question error (options disappeared mid-session) ────────────
  const [runtimeError, setRuntimeError] = useState(null);

  // ─── Saving ──────────────────────────────────────────────────────────────
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false); // guards against double-fire in StrictMode
  const [saveError, setSaveError] = useState(null); // only shown when the actual write failed

  // ─── Load everything on mount ────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const m = await getActiveMethod(controller.signal);
        const qs = await getQuestionsForMethod(m.id, controller.signal);
        const allOpts = await getAllAnswerOptionsForQuestions(
          qs.map((q) => q.id),
          controller.signal
        );
        const rs = await getResultRules(m.id, controller.signal);

        // Group options by question id
        const grouped = {};
        for (const opt of allOpts) {
          if (!grouped[opt.question_id]) grouped[opt.question_id] = [];
          grouped[opt.question_id].push(opt);
        }

        // Scale-range diagnostic (non-blocking, console only)
        warnIfScaleOutOfSync(qs, allOpts, rs);

        // Pre-flight validation
        const check = await validateMethodReadiness(m, qs, grouped, rs);
        if (!check.valid) {
          setLoadError(check.reason);
          setLoading(false);
          return;
        }

        // Partition: skip optional questions without options, block on required ones
        // (validateMethodReadiness already ensures no required questions are missing options,
        //  but partitionQuestions handles the runtime case gracefully too)
        const { answerable, skipped } = partitionQuestions(qs, grouped);

        if (skipped.length > 0) {
          console.info(
            `[NeuroWays] Optionale Frage(n) ohne Antwortoptionen übersprungen: ${skipped.map((q) => q.code).join(", ")}`
          );
        }

        setMethod(m);
        setQuestions(answerable);
        setOptionsByQuestion(grouped);
        setRules(rs);
        setLoading(false);
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") {
          setLoadError("Die Fragen konnten nicht geladen werden. Bitte versuche es erneut.");
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // ─── Derived ─────────────────────────────────────────────────────────────
  const question = questions[step];
  const options = question ? (optionsByQuestion[question.id] || []) : [];
  const totalSteps = questions.length;

  // Runtime guard: if current question has no options (data changed after load)
  useEffect(() => {
    if (!loading && !loadError && question && options.length === 0) {
      if (question.is_required) {
        console.warn(
          `[NeuroWays] Laufzeitfehler: Pflichtfrage "${question.code}" hat keine Antwortoptionen.`
        );
        setRuntimeError(
          "Für diese Frage sind derzeit keine Antwortmöglichkeiten verfügbar. Der Check-in kann deshalb nicht abgeschlossen werden."
        );
      } else {
        // Optional — skip silently
        console.info(`[NeuroWays] Optionale Frage "${question.code}" ohne Optionen → übersprungen.`);
        if (step < totalSteps - 1) {
          setStep((s) => s + 1);
        }
      }
    }
  }, [question, options, loading, loadError, step, totalSteps]);

  // ─── Handlers ────────────────────────────────────────────────────────────
  function handleAnswer(opt) {
    const newAnswers = answers.filter((a) => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      answerId: opt.id,
      dimensionCode: question.dimension_code || question.code,
      numericValue: opt.numeric_value,
    });

    if (step < totalSteps - 1) {
      setAnswers(newAnswers);
      setStep((s) => s + 1);
    } else {
      handleSave(newAnswers);
    }
  }

  function handleBack() {
    if (runtimeError) {
      setRuntimeError(null);
      return;
    }
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      navigate("/");
    }
  }

  async function handleSave(finalAnswers) {
    // Guard: prevent double-save (StrictMode double-invocation or rapid clicks)
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError(null);

    let checkinId = null;
    try {
      const totalScore = finalAnswers.reduce((s, a) => s + (a.numericValue || 0), 0);
      const rule = resolveResultRule(rules, totalScore);
      // This is the only step that must succeed — if it throws, nothing was written
      checkinId = await saveCheckin({
        methodId: method.id,
        methodVersion: method.version,
        answers: finalAnswers,
        rule,
      });
    } catch (err) {
      // The write itself failed — show the error, allow retry
      console.error("[NeuroWays] Speichern fehlgeschlagen:", err);
      setSaveError("Das Ergebnis konnte nicht gespeichert werden. Bitte versuche es erneut.");
      setSaving(false);
      savingRef.current = false;
      return;
    }

    // Write succeeded — navigate; any navigation error is separate from the save
    try {
      navigate(`/result/${checkinId}`, { state: { fromCheckin: true } });
    } catch (err) {
      console.error("[NeuroWays] Navigation fehlgeschlagen:", err);
      // Navigate failed but data is saved — go to history as fallback
      navigate("/history");
    }
  }

  // ─── Render states ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-full border-2 border-teal-200 border-t-teal-600 animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Fragen werden geladen …</p>
      </main>
    );
  }

  if (saving) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#e8f5f3" }}
        >
          <CheckCircle size={32} color="#2a9d8f" />
        </div>
        <p className="text-gray-600 font-medium">Ergebnis wird berechnet …</p>
      </main>
    );
  }

  // Save-specific error (write failed, user can retry)
  if (saveError) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle size={28} color="#ef4444" />
        </div>
        <p className="text-gray-700 text-center leading-relaxed mb-2 max-w-sm font-medium">
          {saveError}
        </p>
        <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
          <button
            onClick={() => {
              setSaveError(null);
              savingRef.current = false;
            }}
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white text-sm font-medium"
            style={{ backgroundColor: "#2a9d8f" }}
          >
            Erneut versuchen
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 border-2 border-gray-200 text-gray-600 text-sm font-medium"
          >
            <Home size={16} />
            Zurück zum Start
          </Link>
        </div>
      </main>
    );
  }

  // Pre-flight or config failure
  if (loadError) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <AlertCircle size={28} color="#f59e0b" />
        </div>
        <p className="text-gray-700 text-center leading-relaxed mb-2 max-w-sm font-medium">
          {loadError}
        </p>
        <p className="text-gray-400 text-sm text-center mb-6 max-w-sm">
          Der Check-in kann derzeit nicht gestartet werden.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl px-6 py-3 text-white text-sm font-medium"
          style={{ backgroundColor: "#2a9d8f" }}
        >
          <Home size={16} />
          Zurück zum Start
        </Link>
      </main>
    );
  }

  // Runtime error mid-session (required question lost its options)
  if (runtimeError) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle size={28} color="#ef4444" />
        </div>
        <p className="text-gray-700 text-center leading-relaxed mb-2 max-w-sm font-medium">
          {runtimeError}
        </p>
        <p className="text-gray-400 text-sm text-center mb-6 max-w-sm">
          Dieser Check-in wird nicht gespeichert.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl px-6 py-3 text-white text-sm font-medium"
          style={{ backgroundColor: "#2a9d8f" }}
        >
          <Home size={16} />
          Zurück zum Start
        </Link>
      </main>
    );
  }

  if (totalSteps === 0) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 text-center">
        <p className="text-gray-500">Keine Fragen vorhanden.</p>
        <Link to="/" className="mt-4 inline-block text-teal-600 underline text-sm">
          Zurück zum Start
        </Link>
      </main>
    );
  }

  // Get previously selected answer for current question (for back-navigation highlight)
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      {/* Header with progress */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Zurück"
        >
          <ChevronLeft size={20} color="#374151" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium mb-1">
            Frage {step + 1} von {totalSteps}
          </p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((step + 1) / totalSteps) * 100}%`,
                backgroundColor: "#2a9d8f",
              }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 leading-snug mb-2">
          {question.question_text}
        </h2>
        {question.help_text ? (
          <p className="text-sm text-gray-400">{question.help_text}</p>
        ) : (
          <p className="text-sm text-gray-400">Wähle die Antwort, die am besten passt.</p>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const selected = currentAnswer?.answerId === opt.id;
          // Map numeric_value (1–5) to icon preset; fall back to a neutral style
          const preset = ENERGY_ICON_PRESETS[opt.numeric_value] || {
            icon: "waves",
            accentColor: "#2a9d8f",
            backgroundColor: "#e8f5f3",
          };
          return (
            <AnswerCard
              key={opt.id}
              icon={preset.icon}
              accentColor={preset.accentColor}
              backgroundColor={preset.backgroundColor}
              label={opt.label}
              selected={selected}
              onClick={() => handleAnswer(opt)}
            />
          );
        })}
      </div>
    </main>
  );
}
