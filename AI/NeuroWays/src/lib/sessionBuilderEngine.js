/**
 * NW-BUILDER-002 — Session Builder Engine
 * Verwaltet den vollständigen Lebenszyklus einer NWObject-Session.
 * Keine Fachlogik, keine Texte, keine Farben, keine Bewertungsregeln im Builder.
 * Liest ausschließlich NWObjects: METHOD → QUESTION → ANSWER_OPTION → CONTENT → SCORING_RULE
 */
import { pb } from "./pb.js";
import {
  getNwoMethod,
  getQuestionsForNwoMethod,
  getAnswerOptionsForNwoQuestion,
  getScoringRulesForNwoMethod,
  resolveContentRefs,
} from "./methodBuilderEngine.js";

const BUILDER_VERSION = "0.1.0";

// ─── Session-Status ────────────────────────────────────────────────────────────
export const SESSION_STATUS = {
  CREATED:   "CREATED",
  STARTED:   "STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ARCHIVED:  "ARCHIVED",
  CANCELLED: "CANCELLED",
};

// ─── Session lesen ────────────────────────────────────────────────────────────
export async function getSession(id, signal) {
  return pb.collection("nwo_sessions").getOne(id, { signal });
}

export async function getSessionHistory(page = 1, perPage = 50, signal) {
  const userId = pb.authStore.record?.id;
  if (!userId) throw new Error("Nicht angemeldet.");
  return pb.collection("nwo_sessions").getList(page, perPage, {
    filter: `user_id = "${userId}"`,
    sort: "-created",
    signal,
  });
}

export async function getSessionAnswers(sessionId, signal) {
  return pb.collection("nwo_session_answers").getList(1, 200, {
    filter: `session_ref = "${sessionId}"`,
    sort: "sort_order",
    signal,
  });
}

export async function getSessionResult(sessionId, signal) {
  const res = await pb.collection("nwo_session_results").getList(1, 1, {
    filter: `session_ref = "${sessionId}"`,
    signal,
  });
  return res.items[0] || null;
}

export async function getSessionContext(sessionId, signal) {
  const res = await pb.collection("nwo_session_context").getList(1, 1, {
    filter: `session_ref = "${sessionId}"`,
    signal,
  });
  return res.items[0] || null;
}

export async function getSessionConsents(sessionId, signal) {
  return pb.collection("nwo_session_consents").getList(1, 20, {
    filter: `session_ref = "${sessionId}"`,
    sort: "-created",
    signal,
  });
}

export async function getSessionEvents(sessionId, signal) {
  return pb.collection("nwo_session_events").getList(1, 100, {
    filter: `session_ref = "${sessionId}"`,
    sort: "created",
    signal,
  });
}

// ─── Session-Lifecycle ─────────────────────────────────────────────────────────

/**
 * Schritt 1: Session erstellen und Versionen einfrieren.
 * Alle Versions-Snapshots werden beim Start gesetzt — unveränderlich.
 */
export async function createSession({ methodId, moduleId, executionMode }) {
  const userId = pb.authStore.record?.id;
  if (!userId) throw new Error("Nicht angemeldet.");

  const method = await getNwoMethod(methodId);
  const now = new Date().toISOString();
  const sessionCode = "SESSION_" + Date.now();

  // Versionen einfrieren
  const frozenVersions = {
    method_version:   method.version,
    content_version:  "1.0.0",   // CONTENT-Objekte v1.0.0 (aus MIG-001-P2)
    scoring_version:  method.version,
    module_version:   "1.1.0",   // ENERGY_NAVIGATOR v1.1.0
    builder_version:  BUILDER_VERSION,
    theme_ref:        "m9m3m4lrc5ucg2j",  // NEUROWAYS_LIGHT
  };

  const session = await pb.collection("nwo_sessions").create({
    object_type:        "SESSION",
    session_code:       sessionCode,
    user_id:            userId,
    module_ref:         moduleId || "ENERGY_NAVIGATOR",
    method_ref:         methodId,
    module_spec_ref:    "xncwhe4bie9sqcq",
    execution_mode:     executionMode || "APP",
    status:             SESSION_STATUS.CREATED,
    started_at:         now,
    session_date:       now.split("T")[0],
    source_collection:  "nwo_sessions",
    migration_version:  "NW-BUILDER-002",
    ...frozenVersions,
  });

  // Audit-Event
  await logSessionEvent(session.id, userId, "SESSION_CREATED", {
    method_ref: methodId,
    execution_mode: executionMode,
    frozen_versions: frozenVersions,
  });

  return session;
}

/**
 * Schritt 2: Session starten — Status auf IN_PROGRESS setzen.
 * Keine Änderungen an Versionen mehr möglich.
 */
export async function startSession(sessionId) {
  const session = await pb.collection("nwo_sessions").update(sessionId, {
    status: SESSION_STATUS.IN_PROGRESS,
  });
  await logSessionEvent(sessionId, pb.authStore.record?.id, "SESSION_STARTED", {});
  return session;
}

/**
 * Schritt 3: Antworten speichern (einzeln, sequenziell).
 */
export async function saveSessionAnswer(sessionId, { questionRef, questionCode, questionVersion, answerOptionRef, answerCode, numericValue, dimensionCode, sortOrder }) {
  return pb.collection("nwo_session_answers").create({
    session_ref:      sessionId,
    question_ref:     questionRef,
    question_code:    questionCode,
    question_version: questionVersion || "1.1.0",
    answer_option_ref: answerOptionRef,
    answer_code:      answerCode,
    numeric_value:    numericValue,
    dimension_code:   dimensionCode,
    sort_order:       sortOrder || 0,
  });
}

/**
 * Schritt 4: Bewertung berechnen — ausschließlich über SCORING_RULES.
 * Keine Bewertungslogik im Builder: Builder liest Regeln und delegiert.
 */
export async function computeSessionResult(sessionId, methodId, answers) {
  const rules = await getScoringRulesForNwoMethod(methodId);
  const totalScore = answers.reduce((sum, a) => sum + (a.numeric_value || 0), 0);

  // Zone bestimmen — ausschließlich über SCORING_RULE min/max
  const matchingRule = rules.find(r =>
    totalScore >= r.min_score && totalScore <= r.max_score
  );

  const resultData = {
    session_ref:      sessionId,
    scoring_rule_ref: matchingRule?.id || null,
    result_code:      matchingRule?.result_code || "unknown",
    total_score:      totalScore,
    min_score:        matchingRule?.min_score ?? null,
    max_score:        matchingRule?.max_score ?? null,
    scoring_version:  "1.1.0",
    computed_at:      new Date().toISOString(),
  };

  const result = await pb.collection("nwo_session_results").create(resultData);
  await logSessionEvent(sessionId, pb.authStore.record?.id, "SESSION_RESULT_COMPUTED", {
    result_code: matchingRule?.result_code,
    total_score: totalScore,
    scoring_rule_ref: matchingRule?.id,
  });
  return { result, rule: matchingRule, totalScore };
}

/**
 * Schritt 5: Session abschließen — STATUS = COMPLETED, unveränderlich.
 */
export async function completeSession(sessionId) {
  const session = await pb.collection("nwo_sessions").update(sessionId, {
    status:       SESSION_STATUS.COMPLETED,
    completed_at: new Date().toISOString(),
  });
  await logSessionEvent(sessionId, pb.authStore.record?.id, "SESSION_COMPLETED", {});
  return session;
}

/**
 * Schritt 6 (optional): Kontext speichern (Notiz, Aktivitäten, Tags).
 * Kontext ist änderbar — Kernergebnis bleibt unveränderlich.
 */
export async function saveSessionContext(sessionId, { note, activities, tags, extraFields }) {
  const existing = await pb.collection("nwo_session_context").getList(1, 1, {
    filter: `session_ref = "${sessionId}"`,
  });

  const data = {
    session_ref:  sessionId,
    note:         note || "",
    activities:   Array.isArray(activities) ? JSON.stringify(activities) : (activities || "[]"),
    tags:         Array.isArray(tags) ? JSON.stringify(tags) : (tags || "[]"),
    extra_fields: extraFields ? JSON.stringify(extraFields) : "{}",
  };

  if (existing.totalItems > 0) {
    return pb.collection("nwo_session_context").update(existing.items[0].id, data);
  }
  return pb.collection("nwo_session_context").create(data);
}

/**
 * Schritt 7 (optional): Freigabe verwalten.
 * Standard: keine Freigabe. Benutzer entscheidet.
 */
export async function grantConsent(sessionId, { granteeType, granteeRef, scope }) {
  const userId = pb.authStore.record?.id;
  const consent = await pb.collection("nwo_session_consents").create({
    session_ref:   sessionId,
    grantor_id:    userId,
    grantee_type:  granteeType,   // TEAM | ENTERPRISE | NEUROWAYS
    grantee_ref:   granteeRef || null,
    scope:         scope || "RESULT",
    status:        "ACTIVE",
    granted_at:    new Date().toISOString(),
  });
  await logSessionEvent(sessionId, userId, "CONSENT_GRANTED", {
    grantee_type: granteeType,
    scope,
  });
  return consent;
}

export async function revokeConsent(consentId, sessionId) {
  const userId = pb.authStore.record?.id;
  const result = await pb.collection("nwo_session_consents").update(consentId, {
    status:     "REVOKED",
    revoked_at: new Date().toISOString(),
  });
  await logSessionEvent(sessionId, userId, "CONSENT_REVOKED", { consent_id: consentId });
  return result;
}

// ─── Audit-Logging ─────────────────────────────────────────────────────────────
export async function logSessionEvent(sessionId, userId, eventType, eventData) {
  try {
    return pb.collection("nwo_session_events").create({
      session_ref:     sessionId,
      user_id:         userId || "",
      event_type:      eventType,
      event_data:      JSON.stringify(eventData || {}),
      builder_version: BUILDER_VERSION,
      occurred_at:     new Date().toISOString(),
    });
  } catch { /* Audit-Fehler sind non-blocking */ }
}

// ─── Vollständige Session laden (mit allen Teilobjekten) ──────────────────────
export async function loadFullSession(sessionId, signal) {
  const [session, answers, result, context, consents, events] = await Promise.all([
    getSession(sessionId, signal),
    getSessionAnswers(sessionId, signal),
    getSessionResult(sessionId, signal),
    getSessionContext(sessionId, signal),
    getSessionConsents(sessionId, signal),
    getSessionEvents(sessionId, signal),
  ]);
  return { session, answers: answers.items, result, context, consents: consents.items, events: events.items };
}

// ─── Validierung ───────────────────────────────────────────────────────────────
export async function validateSession(sessionId) {
  const { session, answers, result } = await loadFullSession(sessionId);
  const errors = [];
  const warnings = [];

  if (!session) errors.push("Session nicht gefunden.");
  if (session?.status !== SESSION_STATUS.COMPLETED) warnings.push("Session noch nicht abgeschlossen.");
  if (!answers.length) errors.push("Keine Antworten gespeichert.");
  if (!result) errors.push("Kein Ergebnis berechnet.");
  if (!session?.method_version) errors.push("Methoden-Version nicht eingefroren.");
  if (!session?.scoring_version) errors.push("Scoring-Version nicht eingefroren.");
  if (answers.some(a => !a.question_version)) warnings.push("Nicht alle Antworten haben Fragen-Versionsreferenz.");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    session,
    answerCount: answers.length,
    hasResult: !!result,
    hasContext: false,  // wird separat geprüft
    versionsFrozen: !!(session?.method_version && session?.scoring_version && session?.builder_version),
  };
}

// ─── Session aus legacy checkins migrieren ─────────────────────────────────────
export async function migrateCheckinToSession(checkin, methodId) {
  const userId = pb.authStore.record?.id || checkin.user_id;
  const sessionCode = "MIGRATED_" + checkin.id;

  // Prüfen ob bereits migriert
  const existing = await pb.collection("nwo_sessions").getList(1, 1, {
    filter: `legacy_checkin_id = "${checkin.id}"`,
  });
  if (existing.totalItems > 0) return existing.items[0];

  const session = await pb.collection("nwo_sessions").create({
    object_type:       "SESSION",
    session_code:      sessionCode,
    user_id:           userId,
    module_ref:        "ENERGY_NAVIGATOR",
    module_version:    checkin.method_version || "1.0.0",
    method_ref:        methodId,
    method_version:    checkin.method_version || "1.1.0",
    execution_mode:    "APP",
    content_version:   "1.0.0",
    scoring_version:   "1.1.0",
    builder_version:   "MIGRATED",
    theme_ref:         "m9m3m4lrc5ucg2j",
    status:            SESSION_STATUS.COMPLETED,
    started_at:        checkin.created,
    completed_at:      checkin.created,
    session_date:      checkin.session_date || checkin.created?.split("T")[0],
    legacy_checkin_id: checkin.id,
    source_collection: "checkins",
    migration_version: "NW-BUILDER-002",
  });

  // Ergebnis migrieren
  await pb.collection("nwo_session_results").create({
    session_ref:      session.id,
    result_code:      checkin.result_code,
    total_score:      checkin.total_score,
    scoring_version:  checkin.method_version || "1.1.0",
    computed_at:      checkin.created,
  });

  // Kontext migrieren (falls vorhanden)
  if (checkin.note || checkin.activities || checkin.tags) {
    await pb.collection("nwo_session_context").create({
      session_ref: session.id,
      note:        checkin.note || "",
      activities:  checkin.activities || "[]",
      tags:        checkin.tags || "[]",
    });
  }

  return session;
}

export { BUILDER_VERSION };
