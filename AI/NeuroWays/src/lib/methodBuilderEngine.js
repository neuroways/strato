/**
 * NW-CB-006 — Method Builder Engine
 * Liest und schreibt ausschließlich über NWObject-Collections.
 * Keine Direktfelder, keine Hardcodierung.
 */
import { pb } from "./pb.js";

// ─── Lesen ────────────────────────────────────────────────────────────────────

export async function getAllNwoMethods(signal) {
  return pb.collection("nwo_methods").getList(1, 100, { sort: "code", signal });
}

export async function getNwoMethod(id, signal) {
  return pb.collection("nwo_methods").getOne(id, { signal });
}

export async function getQuestionsForNwoMethod(methodId, signal) {
  return pb.collection("nwo_questions").getList(1, 100, {
    filter: `method_ref = "${methodId}"`,
    sort: "sort_order",
    signal,
  });
}

export async function getAnswerOptionsForNwoQuestion(questionId, signal) {
  return pb.collection("nwo_answer_options").getList(1, 50, {
    filter: `question_ref = "${questionId}"`,
    sort: "sort_order",
    signal,
  });
}

export async function getScoringRulesForNwoMethod(methodId, signal) {
  return pb.collection("nwo_scoring_rules").getList(1, 50, {
    filter: `method_ref = "${methodId}"`,
    sort: "sort_order",
    signal,
  });
}

export async function getExecutionModesForNwoMethod(methodId, signal) {
  return pb.collection("nwo_execution_modes").getList(1, 20, {
    filter: `method_ref = "${methodId}"`,
    sort: "code",
    signal,
  });
}

export async function getContentById(id, signal) {
  if (!id) return null;
  try { return await pb.collection("nwo_content").getOne(id, { signal }); }
  catch { return null; }
}

export async function resolveContentRefs(objects, fields) {
  const ids = new Set();
  objects.forEach(obj => fields.forEach(f => { if (obj[f]) ids.add(obj[f]); }));
  if (!ids.size) return {};
  const map = {};
  await Promise.all([...ids].map(async id => {
    try {
      const c = await pb.collection("nwo_content").getOne(id);
      map[id] = c.primary_text || "";
    } catch { map[id] = ""; }
  }));
  return map;
}

// ─── Schreiben — Fragen ───────────────────────────────────────────────────────

export async function createNwoQuestion(methodId, { code, dimensionCode, sortOrder, isRequired, questionText }) {
  // 1. CONTENT-Objekt anlegen
  const contentCode = "Q_" + code.toUpperCase() + "_TEXT";
  const content = await pb.collection("nwo_content").create({
    object_type: "CONTENT",
    code: contentCode,
    version: "1.0.0",
    status: "PUBLISHED",
    content_type: "TEXT",
    locale: "de",
    primary_text: questionText.trim(),
    source_collection: "nwo_questions",
    source_field: "question_text",
    parent_object_type: "QUESTION",
    parent_code: code,
    migration_version: "METHOD_BUILDER",
  });

  // 2. QUESTION-Objekt anlegen
  return pb.collection("nwo_questions").create({
    object_type: "QUESTION",
    code: code.toUpperCase(),
    version: "1.0.0",
    status: "PUBLISHED",
    method_ref: methodId,
    question_text_ref: content.id,
    dimension_code: dimensionCode || code.toLowerCase(),
    sort_order: sortOrder || 100,
    is_required: isRequired !== false,
    source_collection: "nwo_questions",
    migration_version: "METHOD_BUILDER",
  });
}

export async function updateNwoQuestionText(questionId, contentId, newText) {
  return pb.collection("nwo_content").update(contentId, { primary_text: newText });
}

export async function updateNwoQuestion(questionId, patch) {
  return pb.collection("nwo_questions").update(questionId, patch);
}

export async function deleteNwoQuestion(questionId) {
  // Lade Question zum Abrufen der Content-Ref
  const q = await pb.collection("nwo_questions").getOne(questionId);
  // Lade zugehörige Antwortoptionen
  const opts = await pb.collection("nwo_answer_options").getList(1, 100, {
    filter: `question_ref = "${questionId}"`,
  });
  // Lösche Antwortoptionen + deren Content-Refs
  for (const opt of opts.items) {
    if (opt.label_content_ref) {
      try { await pb.collection("nwo_content").delete(opt.label_content_ref); } catch {}
    }
    await pb.collection("nwo_answer_options").delete(opt.id);
  }
  // Lösche Question-Content
  if (q.question_text_ref) {
    try { await pb.collection("nwo_content").delete(q.question_text_ref); } catch {}
  }
  return pb.collection("nwo_questions").delete(questionId);
}

// ─── Schreiben — Antwortoptionen ──────────────────────────────────────────────

export async function createNwoAnswerOption(questionId, questionCode, { label, numericValue, sortOrder }) {
  const aoCode = questionCode.toUpperCase() + "_AO" + sortOrder;
  const content = await pb.collection("nwo_content").create({
    object_type: "CONTENT",
    code: "AO_" + aoCode + "_LABEL",
    version: "1.0.0",
    status: "PUBLISHED",
    content_type: "TEXT",
    locale: "de",
    primary_text: label.trim(),
    source_collection: "nwo_answer_options",
    source_field: "label",
    parent_object_type: "ANSWER_OPTION",
    parent_code: aoCode,
    migration_version: "METHOD_BUILDER",
  });
  return pb.collection("nwo_answer_options").create({
    object_type: "ANSWER_OPTION",
    code: aoCode,
    version: "1.0.0",
    status: "PUBLISHED",
    question_ref: questionId,
    label_content_ref: content.id,
    numeric_value: numericValue,
    sort_order: sortOrder,
    source_collection: "nwo_answer_options",
    migration_version: "METHOD_BUILDER",
  });
}

export async function updateNwoAnswerOptionLabel(optionId, contentId, newLabel) {
  return pb.collection("nwo_content").update(contentId, { primary_text: newLabel });
}

export async function deleteNwoAnswerOption(optionId) {
  const opt = await pb.collection("nwo_answer_options").getOne(optionId);
  if (opt.label_content_ref) {
    try { await pb.collection("nwo_content").delete(opt.label_content_ref); } catch {}
  }
  return pb.collection("nwo_answer_options").delete(optionId);
}

// ─── Schreiben — Bewertungsregeln ─────────────────────────────────────────────

export async function updateNwoScoringRuleBounds(ruleId, minScore, maxScore) {
  return pb.collection("nwo_scoring_rules").update(ruleId, {
    min_score: minScore,
    max_score: maxScore,
  });
}

// ─── Validierung ──────────────────────────────────────────────────────────────

export async function validateNwoMethod(methodId) {
  const [method, questions, rules] = await Promise.all([
    pb.collection("nwo_methods").getOne(methodId),
    pb.collection("nwo_questions").getList(1, 100, { filter: `method_ref = "${methodId}"`, sort: "sort_order" }),
    pb.collection("nwo_scoring_rules").getList(1, 50, { filter: `method_ref = "${methodId}"`, sort: "sort_order" }),
  ]);

  const errors = [];
  const warnings = [];

  if (!questions.totalItems) errors.push("Keine Fragen vorhanden.");

  // Antwortoptionen prüfen
  for (const q of questions.items) {
    const opts = await pb.collection("nwo_answer_options").getList(1, 1, {
      filter: `question_ref = "${q.id}"`,
    });
    if (opts.totalItems === 0) {
      if (q.is_required) errors.push(`Pflichtfrage „${q.code}" hat keine Antwortoptionen.`);
      else warnings.push(`Optionale Frage „${q.code}" hat keine Antwortoptionen.`);
    }
  }

  // Zonengrenzen prüfen
  if (!rules.totalItems) {
    errors.push("Keine Bewertungsregeln vorhanden.");
  } else {
    const sorted = [...rules.items].sort((a, b) => a.min_score - b.min_score);
    const minPossible = questions.totalItems * 1;
    const maxPossible = questions.totalItems * 5;
    if (sorted[0].min_score !== minPossible) warnings.push(`Untergrenze ${sorted[0].min_score} ≠ erreichbares Minimum ${minPossible}.`);
    if (sorted[sorted.length - 1].max_score !== maxPossible) warnings.push(`Obergrenze ${sorted[sorted.length - 1].max_score} ≠ erreichbares Maximum ${maxPossible}.`);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].min_score !== sorted[i - 1].max_score + 1) {
        errors.push(`Lücke zwischen ${sorted[i-1].result_code} (max ${sorted[i-1].max_score}) und ${sorted[i].result_code} (min ${sorted[i].min_score}).`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings, method, questions: questions.items, rules: rules.items };
}
