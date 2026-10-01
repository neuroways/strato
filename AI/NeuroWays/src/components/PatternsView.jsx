/**
 * ENM-JOURNEY-003 — Persönliche Muster & Zusammenhänge
 * Beobachtend, nicht bewertend. Keine Kausalität. Keine Empfehlungen.
 *
 * Mindestmengen (konfigurierbar):
 *   MIN_ENTRIES_FOR_OBSERVATION = 3  — ab wann ein Mustersatz erscheint
 *   MIN_ENTRIES_FOR_PHRASE      = 3  — ab wann "häufiger"/"überwiegend" verwendet wird
 */
import { ACTIVITIES, parseJourneyData } from "./JourneyEntry.jsx";
import BarChart2 from "icon:bar-chart-2";
import Tag from "icon:tag";
import Grid from "icon:grid";

// ─── Konfiguration ────────────────────────────────────────────────────────────
const MIN_OBS = 3;      // Mindesteinträge für Mustersatz
const MIN_PHRASE = 3;   // Mindesteinträge für "häufiger" / "überwiegend"
const MAX_TAGS_SHOWN = 8;

// ─── Hilfsfunktionen ──────────────────────────────────────────────────────────

/** Gibt den Prozentanteil von n an total zurück (0–100). */
function pct(n, total) { return total > 0 ? Math.round((n / total) * 100) : 0; }

/** Bestimmt die häufigste Zone aus einem Zähler-Objekt. */
function dominantZone(zoneCounts, rules) {
  const max = Math.max(...Object.values(zoneCounts));
  if (max === 0) return null;
  const code = Object.entries(zoneCounts).find(([, v]) => v === max)?.[0];
  return rules.find(r => r.result_code === code) || null;
}

/** Erzeugt einen beobachtenden Satz (keine Kausalität). */
function observationPhrase(label, zoneRule, count, kind = "activity") {
  if (count < MIN_PHRASE) return null;
  const zone = zoneRule?.result_label || "einer Zone";
  const word = kind === "activity"
    ? `In deinen bisherigen Einträgen mit „${label}" trat die Zone ${zone} häufiger auf.`
    : `Der Tag „${label}" kam in deinen Einträgen häufiger zusammen mit ${zone} vor.`;
  return word;
}

/** Berechnet die Zonenverteilung für eine Menge von Einträgen. */
function zoneDistribution(entries, rules) {
  const counts = {};
  rules.forEach(r => { counts[r.result_code] = 0; });
  entries.forEach(e => {
    const code = e.rule?.result_code;
    if (code && counts[code] !== undefined) counts[code]++;
  });
  return counts;
}

// ─── Subkomponenten ───────────────────────────────────────────────────────────

/** Horizontaler Zonenbalken für eine Aktivität oder ein Tag */
function ZoneBar({ label, emoji, entries, allEntries, rules }) {
  const total = entries.length;
  if (total === 0) return null;
  const dist = zoneDistribution(entries, rules);
  const domRule = dominantZone(dist, rules);
  const phrase = observationPhrase(label, domRule, total, "tag");

  return (
    <div style={{
      padding: "14px 16px", background: "#fff",
      borderRadius: 14, border: "1px solid #eaeaea", marginBottom: 12,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0A1F44" }}>
          {emoji ? `${emoji} ` : ""}{label}
        </span>
        <span style={{ fontSize: 11, color: "#b0b8c4" }}>{total} Eintrag{total !== 1 ? "e" : ""}</span>
      </div>

      {/* Zone bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rules.map(r => {
          const n = dist[r.result_code] || 0;
          const width = pct(n, total);
          return (
            <div key={r.result_code} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 60, fontSize: 11, color: "#9ca3af", flexShrink: 0, textAlign: "right" }}>
                {r.result_label}
              </div>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#f0f0f0", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${width}%`, borderRadius: 4,
                  background: r.color || "#2a9d8f",
                  transition: "width 0.4s ease",
                  minWidth: n > 0 ? 4 : 0,
                }} />
              </div>
              <div style={{ width: 22, fontSize: 11, color: "#6b7280", textAlign: "right", flexShrink: 0 }}>
                {n > 0 ? n : ""}
              </div>
            </div>
          );
        })}
      </div>

      {phrase && (
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10, lineHeight: 1.6, fontStyle: "italic" }}>
          {phrase}
        </p>
      )}
    </div>
  );
}

/** Häufige Kombinationen aus Aktivität + Tag */
function CombinationsCard({ entries, rules }) {
  // Finde alle Paare (activity, tag) mit count >= 2
  const pairs = {};
  entries.forEach(e => {
    const jd = parseJourneyData(e);
    const actLabels = jd.activities.map(id => ACTIVITIES.find(a => a.id === id)?.label).filter(Boolean);
    jd.tags.forEach(tag => {
      actLabels.forEach(act => {
        const key = `${act}|||${tag}`;
        if (!pairs[key]) pairs[key] = { act, tag, entries: [] };
        pairs[key].entries.push(e);
      });
    });
  });

  const combos = Object.values(pairs)
    .filter(p => p.entries.length >= 2)
    .sort((a, b) => b.entries.length - a.entries.length)
    .slice(0, 5);

  if (combos.length === 0) return null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Grid size={15} color="#0A1F44" />
        <span style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Häufige Kombinationen
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {combos.map(({ act, tag, entries: es }) => {
          const dist = zoneDistribution(es, rules);
          const domRule = dominantZone(dist, rules);
          return (
            <div key={`${act}|${tag}`} style={{
              padding: "12px 16px", background: "#fff",
              borderRadius: 14, border: "1px solid #eaeaea",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0A1F44" }}>{act}</span>
                <span style={{ fontSize: 11, color: "#b0b8c4" }}>+</span>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{"#"}{tag}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#b0b8c4" }}>{es.length}×</span>
              </div>
              {domRule && es.length >= MIN_PHRASE && (
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  Bei {es.length} dieser Einträge trat die Zone{" "}
                  <span style={{ fontWeight: 600, color: domRule.color }}>{domRule.result_label}</span>{" "}
                  häufiger auf.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Hauptkomponente ──────────────────────────────────────────────────────────
export default function PatternsView({ entries, rules }) {
  if (!entries || entries.length === 0) {
    return (
      <div style={{
        padding: "32px 20px", textAlign: "center",
        background: "#f8fafc", borderRadius: 20, border: "1px solid #eaeaea",
      }}>
        <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.7, margin: 0 }}>
          Für verlässliche Beobachtungen brauchst du noch einige weitere Reiseeinträge.
          Jeder Check-in erweitert deine persönliche Landkarte.
        </p>
      </div>
    );
  }

  // Berechne Aktivitäts-Auswertung
  const actMap = {};
  entries.forEach(e => {
    const jd = parseJourneyData(e);
    jd.activities.forEach(id => {
      if (!actMap[id]) actMap[id] = [];
      actMap[id].push(e);
    });
  });

  const actEntries = Object.entries(actMap)
    .sort((a, b) => b[1].length - a[1].length)
    .filter(([, es]) => es.length >= 1);

  // Berechne Tag-Auswertung
  const tagMap = {};
  entries.forEach(e => {
    const jd = parseJourneyData(e);
    jd.tags.forEach(tag => {
      const key = tag.toLowerCase();
      if (!tagMap[key]) tagMap[key] = { label: tag, entries: [] };
      tagMap[key].entries.push(e);
    });
  });

  const tagEntries = Object.values(tagMap)
    .sort((a, b) => b.entries.length - a.entries.length)
    .slice(0, MAX_TAGS_SHOWN)
    .filter(t => t.entries.length >= 1);

  const hasActivities = actEntries.length > 0;
  const hasTags       = tagEntries.length > 0;
  const hasCombos     = entries.some(e => {
    const jd = parseJourneyData(e);
    return jd.activities.length > 0 && jd.tags.length > 0;
  });

  // Einträge mit Reisedaten (für Grundlage)
  const withData = entries.filter(e => {
    const jd = parseJourneyData(e);
    return jd.activities.length > 0 || jd.tags.length > 0;
  });

  const dataNotice = withData.length < MIN_OBS
    ? `Grundlage: ${entries.length} Reisepunkt${entries.length !== 1 ? "e" : ""} (${withData.length} mit Reiseeintrag). Weitere Einträge ermöglichen tiefere Beobachtungen.`
    : `Grundlage: ${entries.length} Reisepunkt${entries.length !== 1 ? "e" : ""}, davon ${withData.length} mit Reiseeintrag.`;

  if (!hasActivities && !hasTags) {
    return (
      <div style={{
        padding: "24px 20px", background: "#f8fafc",
        borderRadius: 20, border: "1px solid #eaeaea",
      }}>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: "0 0 10px" }}>
          {entries.length >= 1
            ? "Ergänze in deinen nächsten Check-ins Aktivitäten oder Tags, damit persönliche Muster sichtbar werden."
            : "Für verlässliche Beobachtungen brauchst du noch einige weitere Reiseeinträge."}
        </p>
        <p style={{ fontSize: 11, color: "#b0b8c4", margin: 0 }}>{dataNotice}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Datengrundlage */}
      <div style={{
        padding: "10px 14px", background: "#f6f4f1", borderRadius: 10,
        marginBottom: 24, fontSize: 12, color: "#6b7280",
      }}>
        {dataNotice}
      </div>

      {/* Aktivitäten */}
      {hasActivities && (
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <BarChart2 size={15} color="#0A1F44" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Aktivitäten nach Energiezone
            </span>
          </div>
          {actEntries.map(([id, es]) => {
            const act = ACTIVITIES.find(a => a.id === id);
            return (
              <ZoneBar
                key={id}
                label={act?.label || id}
                emoji={act?.emoji}
                entries={es}
                allEntries={entries}
                rules={rules}
              />
            );
          })}
        </section>
      )}

      {/* Tags */}
      {hasTags && (
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Tag size={15} color="#0A1F44" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0A1F44", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Tags nach Energiezone
            </span>
          </div>
          {tagEntries.map(({ label, entries: es }) => (
            <ZoneBar
              key={label}
              label={label}
              entries={es}
              allEntries={entries}
              rules={rules}
            />
          ))}
        </section>
      )}

      {/* Kombinationen */}
      {hasCombos && (
        <section style={{ marginBottom: 24 }}>
          <CombinationsCard entries={entries} rules={rules} />
        </section>
      )}

      {/* Hinweis */}
      <p style={{ fontSize: 11, color: "#c0c8d4", lineHeight: 1.6, textAlign: "center" }}>
        Diese Beobachtungen beschreiben gemeinsame Vorkommen in deinen eigenen Daten.
        Sie stellen keine Ursache dar und enthalten keine Bewertung.
      </p>
    </div>
  );
}
