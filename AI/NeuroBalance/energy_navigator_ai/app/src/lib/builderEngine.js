/**
 * NW-BUILDER-001 — Builder Engine
 * Erzeugt, speichert und validiert NeuroWays Packages (.nwp).
 * Keine technische Datenbankkenntnis — nur NeuroWays-Objekte.
 */
import { pb } from "./pb.js";

const crypto = typeof window !== "undefined"
  ? { subtle: window.crypto?.subtle }
  : null;

// ─── NWP-Manifest-Format v1.0 ──────────────────────────────────────────────────
export function buildManifest(draft) {
  return {
    nwp_version: "1.0",
    created_at: new Date().toISOString(),
    module: {
      code:         draft.module_code,
      name:         draft.name,
      description:  draft.description || "",
      category:     draft.category || "",
      icon:         draft.icon || "grid",
      version:      draft.version || "0.1.0",
      developer:    draft.developer || "",
      license_type: draft.license_type || "CORE",
    },
    features:      safeJson(draft.features, []),
    data_objects:  safeJson(draft.data_objects, []),
    navigation: safeJson(draft.nav_config, {}),
    dashboard_cards: safeJson(draft.dashboard_cards, []),
    permissions: safeJson(draft.permissions, ["USER"]),
    assets:        safeJson(draft.assets, []),
    dependencies:  safeJson(draft.dependencies, []),
    installation: {
      platform_targets: ["pocketbase", "oracle_apex", "postgres"],
      auto_register_nav: true,
      auto_register_dashboard: true,
    },
  };
}

function safeJson(v, fallback) {
  if (!v) return fallback;
  try { return JSON.parse(v); } catch { return fallback; }
}

/** SHA-256-Prüfsumme (Browser-kompatibel) */
async function checksum(text) {
  try {
    const buf = new TextEncoder().encode(text);
    const hash = await window.crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,"0")).join("");
  } catch {
    // Fallback: einfache String-Hashfunktion
    let h = 0;
    for (let i = 0; i < text.length; i++) { h = ((h << 5) - h) + text.charCodeAt(i); h |= 0; }
    return Math.abs(h).toString(16).padStart(8,"0");
  }
}

// ─── Validierung ───────────────────────────────────────────────────────────────
export function validateDraft(draft, allModules) {
  const errors = [];
  const warnings = [];

  if (!draft.module_code?.trim())   errors.push("Modulcode ist erforderlich.");
  if (!draft.name?.trim())          errors.push("Modulname ist erforderlich.");
  if (!draft.description?.trim())   warnings.push("Beschreibung fehlt – empfohlen für die Moduldokumentation.");
  if (!draft.category?.trim())      warnings.push("Kategorie fehlt.");
  if (!draft.version?.trim())       warnings.push("Version fehlt – 0.1.0 wird verwendet.");
  if (!draft.developer?.trim())     warnings.push("Entwickler nicht angegeben.");

  const conflict = allModules.find(m =>
    m.module_code === draft.module_code?.toUpperCase() && m.id !== draft.existingModuleId
  );
  if (conflict) errors.push(`Modulcode „${draft.module_code}" ist bereits vergeben.`);

  const deps = safeJson(draft.dependencies, []);
  for (const dep of deps) {
    const found = allModules.find(m => m.module_code === dep);
    if (!found) errors.push(`Abhängigkeit nicht gefunden: ${dep}`);
  }

  const features = safeJson(draft.features, []);
  if (features.length === 0) warnings.push("Keine Funktionen ausgewählt – Modul wird nur registriert.");

  return { valid: errors.length === 0, errors, warnings };
}

export async function saveDraft(draftData) {
  const userId = pb.authStore.record?.id || "";
  const payload = { ...draftData, user_id: userId, status: "DRAFT" };

  if (draftData.id) {
    return pb.collection("nwp_drafts").update(draftData.id, payload);
  }
  return pb.collection("nwp_drafts").create(payload);
}

export async function getDrafts(signal) {
  return pb.collection("nwp_drafts").getList(1, 100, { sort: "-updated", signal });
}

export async function getDraft(id, signal) {
  return pb.collection("nwp_drafts").getOne(id, { signal });
}

export async function deleteDraft(id) {
  return pb.collection("nwp_drafts").delete(id);
}

export async function generatePackage(draft, allModules) {
  const validation = validateDraft(draft, allModules);
  if (!validation.valid) throw new Error(validation.errors.join(" | "));

  const manifest = buildManifest(draft);
  const json = JSON.stringify(manifest, null, 2);
  const size = new TextEncoder().encode(json).length;
  const cs   = await checksum(json);
  const userId = pb.authStore.record?.id || "";

  const pkg = await pb.collection("nwp_packages").create({
    user_id:          userId,
    draft_id:         draft.id || "",
    module_code:      manifest.module.code,
    name:             manifest.module.name,
    version:          manifest.module.version,
    release_version:  "0.8.0",
    status:           "BEREIT",
    file_size:        size,
    checksum:         cs,
    manifest:         json.slice(0, 4500),
    manifest_b:       json.slice(4500, 9000),
    validation_result: JSON.stringify(validation),
  });

  return { pkg, manifest, checksum: cs, size };
}

export async function getPackages(signal) {
  return pb.collection("nwp_packages").getList(1, 100, { sort: "-created", signal });
}

export function downloadPackage(pkg) {
  const manifest = (pkg.manifest || "") + (pkg.manifest_b || "");
  const blob = new Blob([manifest], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `${pkg.module_code}_v${pkg.version}.nwp`;
  a.click();
  URL.revokeObjectURL(url);
}
