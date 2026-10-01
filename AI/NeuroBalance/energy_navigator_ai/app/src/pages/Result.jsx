/**
 * Result.jsx — ENM-JOURNEY-002 extended
 * Shows check-in result + optional journey entry form.
 * Journey entry can also be edited after first save.
 */
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  getCheckinById,
  getAnswersForCheckin,
  getResultRules,
  resolveResultRule,
} from "../lib/engine.js";
import { pb } from "../lib/pb.js";
import ZoneCard from "../components/ZoneCard.jsx";
import JourneyEntry, { parseJourneyData, ACTIVITIES } from "../components/JourneyEntry.jsx";
import ChevronLeft from "icon:chevron-left";
import Map from "icon:map";
import RefreshCw from "icon:refresh-cw";
import Edit2 from "icon:edit-2";

// Fetch all existing tags from user's checkins for autocomplete
async function fetchExistingTags(signal) {
  try {
    const res = await pb.collection("checkins").getList(1, 200, { fields: "tags", signal });
    const all = new Set();
    res.items.forEach(r => {
      try { JSON.parse(r.tags || "[]").forEach(t => all.add(t)); } catch {}
    });
    return [...all];
  } catch { return []; }
}

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [checkin, setCheckin]               = useState(null);
  const [rule, setRule]                     = useState(null);
  const [answersDisplay, setAnswersDisplay] = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(false);

  // Journey entry state
  const [journeyData, setJourneyData]       = useState(null);  // null = not yet loaded
  const [showEntry, setShowEntry]           = useState(false); // show the form
  const [entryDone, setEntryDone]           = useState(false); // after first save/skip
  const [existingTags, setExistingTags]     = useState([]);
  const [editing, setEditing]               = useState(false);

  // fromCheckin = came directly from CheckIn flow (show entry immediately)
  const [fromCheckin, setFromCheckin]       = useState(false);

  useEffect(() => {
    // Detect if navigated from CheckIn (state.fromCheckin)
    const nav = window.history.state;
    if (nav?.usr?.fromCheckin) setFromCheckin(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const entry = await getCheckinById(id, controller.signal);
        const rules = await getResultRules(entry.method_id, controller.signal);
        const resolved = resolveResultRule(rules, entry.total_score);
        const answers = await getAnswersForCheckin(id, controller.signal);
        const enriched = await Promise.all(
          answers.map(async a => {
            try {
              const [q, opt] = await Promise.all([
                pb.collection("questions").getOne(a.question_id, { signal: controller.signal }),
                pb.collection("answer_options").getOne(a.answer_option_id, { signal: controller.signal }),
              ]);
              return { question: q.question_text, answer: opt.label };
            } catch { return { question: "–", answer: "–" }; }
          })
        );
        const tags = await fetchExistingTags(controller.signal);
        const jd = parseJourneyData(entry);

        setCheckin(entry);
        setRule(resolved);
        setAnswersDisplay(enriched);
        setJourneyData(jd);
        setExistingTags(tags);
        setEntryDone(jd.note || jd.activities.length > 0 || jd.tags.length > 0);

        // Show entry form immediately if coming from check-in and no entry yet
        if (window.history.state?.usr?.fromCheckin && !(jd.note || jd.activities.length > 0 || jd.tags.length > 0)) {
          setShowEntry(true);
        }

        setLoading(false);
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      }
    })();
    return () => controller.abort();
  }, [id]);

  function handleEntrySaved(data) {
    setJourneyData(data);
    setEntryDone(true);
    setShowEntry(false);
    setEditing(false);
  }

  function handleSkip() {
    setShowEntry(false);
    setEntryDone(false);
  }

  if (loading) return (
    <main className="max-w-xl mx-auto px-5 pt-20 flex justify-center">
      <p className="text-gray-400">Wird geladen …</p>
    </main>
  );

  if (error || !checkin || !rule) return (
    <main className="max-w-xl mx-auto px-5 pt-20 text-center">
      <p className="text-gray-500 mb-4">Eintrag nicht gefunden.</p>
      <Link to="/" className="text-teal-600 underline">Zur Startseite</Link>
    </main>
  );

  const activityLabels = (journeyData?.activities || []).map(id =>
    ACTIVITIES.find(a => a.id === id)
  ).filter(Boolean);

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      {/* Back */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/history" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} color="#374151" />
        </Link>
        <p className="text-sm font-medium text-gray-500">Dein Ergebnis</p>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        {new Date(checkin.created).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        {" · "}
        {new Date(checkin.created).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
      </p>

      {/* Zone card */}
      <div className="mb-8">
        <ZoneCard rule={rule} />
      </div>

      {/* Answers */}
      {answersDisplay.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Deine Antworten</p>
          <div className="flex flex-col gap-3">
            {answersDisplay.map((a, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{a.question}</p>
                <p className="text-sm font-medium text-gray-700">{a.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Journey Entry section ── */}
      {showEntry || editing ? (
        <div style={{
          background: "#f8fafc", borderRadius: 20, padding: "24px 20px",
          border: "1px solid #e5e7eb", marginBottom: 24,
        }}>
          <JourneyEntry
            checkinId={id}
            initialData={journeyData || {}}
            onSave={handleEntrySaved}
            onSkip={editing ? () => setEditing(false) : handleSkip}
            existingTags={existingTags}
          />
        </div>
      ) : (
        <div style={{ marginBottom: 24 }}>
          {entryDone && journeyData ? (
            /* Show saved journey data */
            <div style={{ background: "#f8fafc", borderRadius: 20, padding: "20px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Map size={16} color="#0A1F44" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44" }}>Reiseeintrag</span>
                </div>
                <button onClick={() => setEditing(true)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <Edit2 size={13} /> Bearbeiten
                </button>
              </div>

              {journeyData.note && (
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Notiz</p>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{journeyData.note}</p>
                </div>
              )}

              {activityLabels.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Aktivitäten</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {activityLabels.map(a => (
                      <span key={a.id} style={{ padding: "4px 10px", borderRadius: 20, background: "#e8f0fa", fontSize: 13, color: "#0A1F44" }}>
                        {a.emoji} {a.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {journeyData.tags.length > 0 && (
                <div>
                  <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Tags</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {journeyData.tags.map((t, i) => (
                      <span key={i} style={{ padding: "4px 10px", borderRadius: 20, background: "#f0f4fa", border: "1px solid #c7d2e7", fontSize: 13, color: "#0A1F44" }}>
                        {"#"}{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Invite to add entry */
            <button onClick={() => setShowEntry(true)} style={{
              width: "100%", padding: "16px 20px", borderRadius: 16,
              border: "1.5px dashed #c7d2e7", background: "#fafbff",
              cursor: "pointer", textAlign: "left", display: "flex",
              alignItems: "center", gap: 12, marginBottom: 0,
              fontFamily: "'DM Sans', sans-serif",
              transition: "border-color 0.15s, background 0.15s",
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#e8f0fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Map size={17} color="#0A1F44" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#0A1F44", margin: 0 }}>Reiseeintrag ergänzen</p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>Notiz, Aktivitäten oder Tags hinzufügen</p>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link to="/checkin" className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors text-sm">
          <RefreshCw size={16} />
          Neuer Check-in
        </Link>
        <Link to="/history" className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 text-white font-medium text-sm transition-opacity hover:opacity-90" style={{ backgroundColor: "#0A1F44" }}>
          <Map size={16} />
          Zur Reise
        </Link>
      </div>
    </main>
  );
}
