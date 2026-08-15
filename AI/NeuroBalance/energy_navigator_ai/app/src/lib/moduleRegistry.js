/**
 * NW-MODULE-001 — Modul-Registry
 * Zentrale Datenquelle für alle registrierten Module.
 * Die Basis-App kennt keine konkreten Module — sie liest nur aus dieser Registry.
 */
import { pb } from "./pb.js";

export const MODULE_STATUS = {
  ENTWICKLUNG:  "ENTWICKLUNG",
  TEST:         "TEST",
  FREIGEGEBEN:  "FREIGEGEBEN",
  INSTALLIERT:  "INSTALLIERT",
  AKTIV:        "AKTIV",
  DEAKTIVIERT:  "DEAKTIVIERT",
  VERALTET:     "VERALTET",
  ARCHIVIERT:   "ARCHIVIERT",
};

export const STATUS_LABELS = {
  ENTWICKLUNG: "Entwicklung",
  TEST:        "Test",
  FREIGEGEBEN: "Freigegeben",
  INSTALLIERT: "Installiert",
  AKTIV:       "Aktiv",
  DEAKTIVIERT: "Deaktiviert",
  VERALTET:    "Veraltet",
  ARCHIVIERT:  "Archiviert",
};

export const STATUS_COLORS = {
  ENTWICKLUNG:  { bg: "#f0f9ff", text: "#0369a1", border: "#7dd3fc" },
  TEST:         { bg: "#fdf4ff", text: "#a21caf", border: "#e879f9" },
  FREIGEGEBEN:  { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  INSTALLIERT:  { bg: "#eff6ff", text: "#1d4ed8", border: "#93c5fd" },
  AKTIV:        { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  DEAKTIVIERT:  { bg: "#f8fafc", text: "#64748b", border: "#cbd5e1" },
  VERALTET:     { bg: "#fffbeb", text: "#92400e", border: "#fcd34d" },
  ARCHIVIERT:   { bg: "#fafafa", text: "#9ca3af", border: "#e5e7eb" },
};

export async function getAllModules(signal) {
  const res = await pb.collection("pkg_modules").getList(1, 200, {
    sort: "install_order,name",
    signal,
  });
  return res.items;
}

export async function getActiveModules(signal) {
  const res = await pb.collection("pkg_modules").getList(1, 200, {
    filter: `status = "${MODULE_STATUS.AKTIV}"`,
    sort: "install_order",
    signal,
  });
  return res.items;
}

export async function getModuleByCode(code, signal) {
  const res = await pb.collection("pkg_modules").getList(1, 1, {
    filter: `module_code = "${code}"`,
    signal,
  });
  return res.items[0] || null;
}

export async function registerModule(data) {
  return pb.collection("pkg_modules").create({
    ...data,
    status: data.status || MODULE_STATUS.ENTWICKLUNG,
    installed_at: new Date().toISOString().split("T")[0],
    install_order: data.install_order || 100,
  });
}

export async function setModuleStatus(id, status) {
  const patch = { status };
  if (status === MODULE_STATUS.AKTIV) patch.activated_at = new Date().toISOString().split("T")[0];
  return pb.collection("pkg_modules").update(id, patch);
}

export async function updateModule(id, data) {
  return pb.collection("pkg_modules").update(id, data);
}

export function checkDependencies(module, allModules) {
  const problems = [];
  let deps = [];
  try { deps = JSON.parse(module.dependencies || "[]"); } catch {}

  for (const dep of deps) {
    const found = allModules.find(m => m.module_code === dep);
    if (!found) problems.push(`Abhängigkeit nicht gefunden: ${dep}`);
    else if (found.status !== MODULE_STATUS.AKTIV) problems.push(`Abhängigkeit nicht aktiv: ${dep} (${found.status})`);
  }
  return problems;
}

export function parseModuleJson(value, fallback = []) {
  try { return JSON.parse(value || "[]"); } catch { return fallback; }
}
