/**
 * ENM-JOURNEY-002 — JourneyEntry
 * Optional journey entry form: note, activities, tags.
 * Used after CheckIn result, and rendered inline in Result.jsx for editing.
 *
 * Props:
 *   checkinId    string   — the checkin record to update
 *   initialData  object   — { note, activities, tags } from existing record
 *   onSave       fn(data) — called after successful save
 *   onSkip       fn       — called when user skips
 *   existingTags string[] — tags from prior check-ins for autocomplete
 */
import { useState } from "react";
import { pb } from "../lib/pb.js";
import Check from "icon:check";
import X from "icon:x";
import Plus from "icon:plus";

// ─── Activity catalogue ────────────────────────────────────────────────────────
export const ACTIVITIES = [
  { id: "walk",      emoji: "🚶", label: "Spaziergang" },
  { id: "swim",      emoji: "🏊", label: "Schwimmen" },
  { id: "sport",     emoji: "🏃", label: "Sport" },
  { id: "music",     emoji: "🎵", label: "Musik" },
  { id: "learn",     emoji: "📚", label: "Lernen" },
  { id: "work",      emoji: "💼", label: "Arbeit" },
  { id: "home",      emoji: "🏠", label: "Haushalt" },
  { id: "family",    emoji: "👨‍👩‍👧", label: "Familie" },
  { id: "friends",   emoji: "👥", label: "Freunde" },
  { id: "nature",    emoji: "🌳", label: "Natur" },
  { id: "meditate",  emoji: "🧘", label: "Meditation" },
  { id: "rest",      emoji: "😴", label: "Erholung" },
];

export async function saveJourneyEntry(checkinId, { note, activities, tags }) {
  return pb.collection("checkins").update(checkinId, {
    note: (note || "").trim(),
    activities: JSON.stringify(activities || []),
    tags: JSON.stringify((tags || []).map(t => t.trim()).filter(Boolean)),
  });
}

export function parseJourneyData(record) {
  let activities = [];
  let tags = [];
  try { activities = JSON.parse(record.activities || "[]"); } catch {}
  try { tags = JSON.parse(record.tags || "[]"); } catch {}
  return { note: record.note || "", activities, tags };
}

// ─── Activity chip ────────────────────────────────────────────────────────────
function ActivityChip({ activity, selected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(activity.id)}
      aria-pressed={selected}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 14px", borderRadius: 20,
        border: `1.5px solid ${selected ? "#0A1F44" : "#e5e7eb"}`,
        background: selected ? "#0A1F44" : "#fff",
        color: selected ? "#fff" : "#374151",
        fontSize: 13, fontWeight: selected ? 600 : 400,
        cursor: "pointer", transition: "all 0.15s",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span role="img" aria-label={activity.label}>{activity.emoji}</span>
      {activity.label}
    </button>
  );
}

// ─── Tag input ─────────────────────────────────────────────────────────────────
function TagInput({ tags, onChange, suggestions }) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  function addTag(raw) {
    const t = raw.trim();
    if (!t) return;
    if (tags.some(existing => existing.toLowerCase() === t.toLowerCase())) return;
    onChange([...tags, t]);
    setInput("");
    setShowSuggestions(false);
  }

  function removeTag(idx) {
    onChange(tags.filter((_, i) => i !== idx));
  }

  const filtered = suggestions.filter(s =>
    !tags.some(t => t.toLowerCase() === s.toLowerCase()) &&
    s.toLowerCase().includes(input.toLowerCase()) &&
    input.length > 0
  );

  return (
    <div>
      {/* Existing tags */}
      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "4px 10px 4px 12px", borderRadius: 20,
              background: "#f0f4fa", border: "1px solid #c7d2e7",
              fontSize: 13, color: "#0A1F44", fontWeight: 500,
            }}>
              #{tag}
              <button onClick={() => removeTag(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
                <X size={12} color="#9ca3af" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => { setInput(e.target.value); setShowSuggestions(true); }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(input); }
              if (e.key === "Backspace" && !input && tags.length) removeTag(tags.length - 1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Tag hinzufügen …"
            style={{
              flex: 1, padding: "10px 14px", border: "1.5px solid #e5e7eb",
              borderRadius: 10, fontSize: 14, color: "#0A1F44",
              background: "#fafafa", outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          {input && (
            <button onClick={() => addTag(input)} style={{
              padding: "10px 14px", background: "#0A1F44", color: "#fff",
              border: "none", borderRadius: 10, cursor: "pointer",
              display: "flex", alignItems: "center",
            }}>
              <Plus size={16} />
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filtered.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 10,
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)", overflow: "hidden",
          }}>
            {filtered.map((s, i) => (
              <button key={i} onMouseDown={() => addTag(s)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 14px", border: "none", background: "none",
                cursor: "pointer", fontSize: 13, color: "#0A1F44",
                fontFamily: "'DM Sans', sans-serif",
                borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none",
              }}>
                #{s}
              </button>
            ))}
          </div>
        )}
      </div>
      <p style={{ fontSize: 11, color: "#b0b8c4", marginTop: 6 }}>Enter oder Komma zum Hinzufügen</p>
    </div>
  );
}

// ─── Main form ─────────────────────────────────────────────────────────────────
export default function JourneyEntry({ checkinId, initialData = {}, onSave, onSkip, existingTags = [] }) {
  const [note, setNote] = useState(initialData.note || "");
  const [activities, setActivities] = useState(initialData.activities || []);
  const [tags, setTags] = useState(initialData.tags || []);
  const [saving, setSaving] = useState(false);

  function toggleActivity(id) {
    setActivities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveJourneyEntry(checkinId, { note, activities, tags });
      onSave?.({ note, activities, tags });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  const hasContent = note.trim() || activities.length > 0 || tags.length > 0;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Intro */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", marginBottom: 6 }}>
          Reiseeintrag
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
          Ergänze optional, was diese Etappe für dich besonders gemacht hat. Alle Felder sind freiwillig.
        </p>
      </div>

      {/* Note */}
      <section style={{ marginBottom: 28 }}>
        <label style={{ display: "block" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", marginBottom: 8 }}>Persönliche Notiz</p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Gibt es etwas, das du für dein zukünftiges Ich festhalten möchtest?"
            rows={3}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "12px 14px", border: "1.5px solid #e5e7eb", borderRadius: 12,
              fontSize: 14, color: "#0A1F44", background: "#fafafa",
              resize: "vertical", outline: "none", lineHeight: 1.6,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        </label>
      </section>

      {/* Activities */}
      <section style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", marginBottom: 10 }}>Aktivitäten</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ACTIVITIES.map(a => (
            <ActivityChip
              key={a.id}
              activity={a}
              selected={activities.includes(a.id)}
              onToggle={toggleActivity}
            />
          ))}
        </div>
      </section>

      {/* Tags */}
      <section style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", marginBottom: 10 }}>Tags</p>
        <TagInput tags={tags} onChange={setTags} suggestions={existingTags} />
      </section>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        {onSkip && (
          <button onClick={onSkip} style={{
            flex: 1, padding: "13px 20px", borderRadius: 12,
            border: "1.5px solid #e5e7eb", background: "#fff",
            fontSize: 14, fontWeight: 600, color: "#6b7280",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>
            Überspringen
          </button>
        )}
        <button onClick={handleSave} disabled={saving} style={{
          flex: 2, padding: "13px 20px", borderRadius: 12,
          border: "none", background: hasContent ? "#0A1F44" : "#e5e7eb",
          fontSize: 14, fontWeight: 700,
          color: hasContent ? "#fff" : "#9ca3af",
          cursor: saving ? "not-allowed" : "pointer",
          opacity: saving ? 0.7 : 1,
          transition: "background 0.2s",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {saving ? "Wird gespeichert …" : (
            <><Check size={15} />{hasContent ? "Reiseeintrag speichern" : "Weiter ohne Eintrag"}</>
          )}
        </button>
      </div>
    </div>
  );
}
