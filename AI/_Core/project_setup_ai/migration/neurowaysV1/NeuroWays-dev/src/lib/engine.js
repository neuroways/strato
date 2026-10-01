/**
 * NeuroWays Method Engine
 * All data fetched from the backend — no hardcoded questions, options, or rules.
 */
import { pb } from "./pb.js";

// ─── Methods ─────────────────────────────────────────────────────────────────

export async function getActiveMethod(signal) {
  const res = await pb.collection("methods").getList(1, 1, {
    filter: 'is_active = true && status = "active"',
    sort: "sort_order",
    signal,
  });
  if (res.items.length === 0) throw new Error("Keine aktive Methode gefunden.");
  return res.items[0];
}

// ─── Questions ───────────────────────────────────────────────────────────────

export async function getQuestionsForMethod(methodId, signal) {
  const res = await pb.collection("questions").getList(1, 200, {
    filter: `method_id = "${methodId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

// ─── Answer options ──────────────────────────────────────────────────────────

export async function getAnswerOptions(questionId, signal) {
  const res = await pb.collection("answer_options").getList(1, 200, {
    filter: `question_id = "${questionId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

/** Load all options for an array of question IDs in one query. */
export async function getAllAnswerOptionsForQuestions(questionIds, signal) {
  if (!questionIds.length) return [];
  const filter = questionIds.map((id) => `question_id = "${id}"`).join(" || ");
  const res = await pb.collection("answer_options").getList(1, 1000, {
    filter: `(${filter}) && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

// ─── Result rules ─────────────────────────────────────────────────────────────

export async function getResultRules(methodId, signal) {
  const res = await pb.collection("result_rules").getList(1, 100, {
    filter: `method_id = "${methodId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

export function resolveResultRule(rules, score) {
  return rules.find((r) => score >= r.min_score && score <= r.max_score) || rules[rules.length - 1];
}

// ─── Scale-range warning ──────────────────────────────────────────────────────

/**
 * Checks whether the active result_rules cover the full achievable score range.
 * Emits console warnings if there are gaps, mismatches, or uncovered values.
 * Never modifies any data — purely diagnostic.
 *
 * @param {object[]} questions  — active questions for the method
 * @param {object[]} allOptions — all active answer_options for those questions
 * @param {object[]} rules      — active result_rules for the method
 */
export function warnIfScaleOutOfSync(questions, allOptions, rules) {
  if (!questions.length || !rules.length) return;

  // Compute achievable score range from options
  const byQuestion = {};
  for (const o of allOptions) {
    if (!byQuestion[o.question_id]) byQuestion[o.question_id] = [];
    byQuestion[o.question_id].push(o.numeric_value);
  }

  const requiredQuestions = questions.filter((q) => q.is_required);
  const allHaveOptions = requiredQuestions.every((q) => (byQuestion[q.id] || []).length > 0);
  if (!allHaveOptions) return; // validateMethodReadiness handles this separately

  const scoreMin = requiredQuestions.reduce(
    (sum, q) => sum + Math.min(...(byQuestion[q.id] || [0])),
    0
  );
  const scoreMax = requiredQuestions.reduce(
    (sum, q) => sum + Math.max(...(byQuestion[q.id] || [0])),
    0
  );

  const ruleMin = Math.min(...rules.map((r) => r.min_score));
  const ruleMax = Math.max(...rules.map((r) => r.max_score));

  const mismatch = ruleMin !== scoreMin || ruleMax !== scoreMax;
  if (mismatch) {
    console.warn(
      `[NeuroWays] Skalendiskrepanz: Erreichbare Gesamtpunktzahl ${scoreMin}–${scoreMax}, ` +
        `aber result_rules decken nur ${ruleMin}–${ruleMax} ab.`
    );
  }

  // Check for gaps in rule coverage
  const sortedRules = [...rules].sort((a, b) => a.min_score - b.min_score);
  let cursor = ruleMin;
  const gaps = [];
  for (const r of sortedRules) {
    if (r.min_score > cursor) gaps.push(`${cursor}–${r.min_score - 1}`);
    cursor = r.max_score + 1;
  }
  if (gaps.length > 0) {
    console.warn(`[NeuroWays] Lücken in result_rules: ${gaps.join(", ")}`);
  }

  // Warn about scores outside any rule
  const uncovered = [];
  for (let v = scoreMin; v <= scoreMax; v++) {
    if (!rules.some((r) => v >= r.min_score && v <= r.max_score)) uncovered.push(v);
  }
  if (uncovered.length > 0) {
    console.warn(
      `[NeuroWays] Nicht abgedeckte Punktwerte: ${uncovered.join(", ")}`
    );
  }

  if (!mismatch && gaps.length === 0 && uncovered.length === 0) {
    console.info(
      `[NeuroWays] Skalierung OK: Erreichbare Punkte ${scoreMin}–${scoreMax}, ` +
        `result_rules lückenlos ${ruleMin}–${ruleMax}.`
    );
  }
}

// ─── Pre-flight validation ────────────────────────────────────────────────────

/**
 * Validates that a method is fully configured before a check-in can start.
 * Returns { valid: true } or { valid: false, reason: string }
 *
 * Rules:
 * - Method must exist and be active
 * - At least one active question must exist
 * - Every required active question must have at least one active answer option
 * - At least one active result rule must exist
 */
export async function validateMethodReadiness(method, questions, optionsByQuestion, rules) {
  if (!method) {
    return { valid: false, reason: "Keine aktive Methode gefunden." };
  }

  if (questions.length === 0) {
    return { valid: false, reason: "Diese Methode enthält noch keine aktiven Fragen." };
  }

  if (rules.length === 0) {
    return { valid: false, reason: "Diese Methode enthält noch keine Ergebnisregeln." };
  }

  const requiredWithoutOptions = questions.filter(
    (q) => q.is_required && (optionsByQuestion[q.id] || []).length === 0
  );

  if (requiredWithoutOptions.length > 0) {
    const codes = requiredWithoutOptions.map((q) => q.code || q.id).join(", ");
    console.warn(
      `[NeuroWays] Validierung: Pflichtfrage(n) ohne aktive Antwortoptionen: ${codes}`
    );
    return {
      valid: false,
      reason:
        "Diese Methode ist derzeit noch nicht vollständig eingerichtet. Bitte versuche es später erneut.",
    };
  }

  return { valid: true };
}

/**
 * During a running check-in, filter questions to only those that can be answered:
 * - Required questions without options → returned in blockers[]
 * - Optional questions without options → silently skipped (returned in skipped[])
 * - Questions with options → returned in answerable[]
 */
export function partitionQuestions(questions, optionsByQuestion) {
  const answerable = [];
  const skipped = [];
  const blockers = [];

  for (const q of questions) {
    const opts = optionsByQuestion[q.id] || [];
    if (opts.length > 0) {
      answerable.push(q);
    } else if (q.is_required) {
      blockers.push(q);
    } else {
      skipped.push(q);
    }
  }

  return { answerable, skipped, blockers };
}

// ─── Check-in save ───────────────────────────────────────────────────────────

/**
 * Save a completed check-in.
 * @param {object} params
 * @param {string} params.methodId
 * @param {string} params.methodVersion
 * @param {Array<{questionId, answerId, dimensionCode, numericValue}>} params.answers
 * @param {object} params.rule  — the resolved result_rule record
 * @returns {string} the new checkin id
 */
export async function saveCheckin({ methodId, methodVersion, answers, rule }) {
  const totalScore = answers.reduce((s, a) => s + (a.numericValue || 0), 0);
  const today = new Date().toISOString().split("T")[0];
  // user_id from the authenticated session — never from client input
  const userId = pb.authStore.record?.id || "";

  const checkin = await pb.collection("checkins").create({
    user_id: userId,
    method_id: methodId,
    method_version: methodVersion || "",
    session_date: today,
    total_score: totalScore,
    result_code: rule.result_code,
    result_label: rule.result_label,
  });

  // Sequential saves: concurrent requests drop silently in this environment.
  for (const a of answers) {
    await pb.collection("checkin_answers").create({
      user_id: userId,
      checkin_id: checkin.id,
      question_id: a.questionId,
      answer_option_id: a.answerId,
      dimension_code: a.dimensionCode,
      numeric_value: a.numericValue,
    });
  }

  return checkin.id;
}

// ─── History ──────────────────────────────────────────────────────────────────

export async function getCheckinHistory(page = 1, perPage = 100, signal) {
  return pb.collection("checkins").getList(page, perPage, {
    sort: "-created",
    signal,
  });
}

export async function getCheckinById(id, signal) {
  return pb.collection("checkins").getOne(id, { signal });
}

export async function getAnswersForCheckin(checkinId, signal) {
  const res = await pb.collection("checkin_answers").getList(1, 200, {
    filter: `checkin_id = "${checkinId}"`,
    sort: "created",
    signal,
  });
  return res.items;
}

export async function deleteCheckin(id) {
  const answers = await pb.collection("checkin_answers").getList(1, 500, {
    filter: `checkin_id = "${id}"`,
  });
  await Promise.all(answers.items.map((a) => pb.collection("checkin_answers").delete(a.id)));
  await pb.collection("checkins").delete(id);
}

export async function deleteAllCheckins() {
  const res = await pb.collection("checkins").getList(1, 500);
  await Promise.all(res.items.map((c) => deleteCheckin(c.id)));
}

export async function exportAllData() {
  const checkins = await pb.collection("checkins").getList(1, 500, { sort: "-created" });
  const answers = await pb.collection("checkin_answers").getList(1, 5000);
  return { checkins: checkins.items, answers: answers.items };
}
