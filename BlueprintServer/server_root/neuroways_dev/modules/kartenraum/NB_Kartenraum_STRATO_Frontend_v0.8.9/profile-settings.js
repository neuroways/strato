(() => {
"use strict";

/*
 * Room of Cards v0.8.8
 * Profile settings are deliberately isolated from app.js.
 * They use the same persisted session token, but have their own API client.
 */
const STORAGE_KEY = "nb_kartenraum_frontend_v070";
const API_BASE = "../NB_Kartenraum_Backend_v0.6.3/api";

const defaults = {
  card_audience_code: "ADULT",
  ui_language_mode: "DETAILED",
  visual_mode: "NIGHT"
};

let preferences = {...defaults};

function byId(id){ return document.getElementById(id); }

function sessionToken(){
  try {
    const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return state.session_token || "";
  } catch {
    return "";
  }
}

async function api(path, options = {}){
  const token = sessionToken();
  if(!token) throw new Error("AUTH_REQUIRED");

  const headers = {
    "Accept":"application/json",
    ...(options.body ? {"Content-Type":"application/json"} : {}),
    "Authorization":`Bearer ${token}`,
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}/${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if(!response.ok || data.status !== "ok"){
    throw new Error(data.error || data.message || `API_${response.status}`);
  }
  return data;
}

const COPY = {
  DETAILED:{
    lead:"Was möchtest du gerade tun?",
    subtitle:"Dein Raum für Karten, Gedanken und Reflexion.",
    principle:"Reflexion statt Vorhersage.",
    drawHint:"Was du darin siehst, entscheidest zuerst du.",
    homeIntro:"Du kannst eine Karte ziehen, Gedanken festhalten oder etwas wieder ansehen."
  },
  CLEAR:{
    lead:"Was möchtest du heute entdecken?",
    subtitle:"Dein Raum für Karten, Gedanken und Entdeckungen.",
    principle:"Die Karte kennt nicht deine Antwort. Du entscheidest, was dir auffällt.",
    drawHint:"Schau erst einmal selbst: Was fällt dir auf?",
    homeIntro:"Du kannst eine Karte ziehen, etwas aufschreiben oder frühere Karten anschauen."
  }
};

function apply(){
  document.body.dataset.visualMode = preferences.visual_mode || "NIGHT";
  document.body.dataset.languageMode = preferences.ui_language_mode || "DETAILED";

  document.querySelectorAll(".segmented[data-pref]").forEach(group => {
    const key = group.dataset.pref;
    group.querySelectorAll("button[data-value]").forEach(btn => {
      const active = btn.dataset.value === preferences[key];
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  });

  const copy = COPY[preferences.ui_language_mode] || COPY.DETAILED;
  document.querySelectorAll("[data-roc-copy]").forEach(node => {
    const key = node.dataset.rocCopy;
    if(copy[key]) node.textContent = copy[key];
  });
}

function setStatus(message, kind=""){
  const node = byId("preferencesMsg");
  if(!node) return;
  node.textContent = message;
  node.dataset.state = kind;
}

async function load(){
  setStatus("Einstellungen werden geladen …");
  const result = await api("profile-preferences.php");
  preferences = {...defaults, ...(result.preferences || {})};
  apply();
  setStatus("");
}

async function save(key, value){
  const previous = {...preferences};
  preferences[key] = value;
  apply();
  setStatus("Wird gespeichert …");

  try {
    const result = await api("profile-preferences.php", {
      method:"POST",
      body:JSON.stringify({
        card_audience_code: preferences.card_audience_code,
        ui_language_mode: preferences.ui_language_mode,
        visual_mode: preferences.visual_mode
      })
    });

    preferences = {...preferences, ...(result.preferences || {})};
    apply();
    setStatus("Im Profil gespeichert.", "ok");

    // Mirror current card-audience into the legacy state so existing
    // knowledge/text calls can immediately follow the selected card set.
    if(key === "card_audience_code"){
      try {
        const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        state.audience = preferences.card_audience_code;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }
  } catch(error) {
    preferences = previous;
    apply();

    const code = String(error?.message || "");
    setStatus(
      code === "AUTH_REQUIRED"
        ? "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an."
        : `Speichern nicht möglich: ${code}`,
      "error"
    );
  }
}

async function open(){
  const viewer = byId("profileSettingsViewer");
  if(!viewer) return;

  viewer.hidden = false;
  viewer.setAttribute("aria-hidden","false");
  document.body.classList.add("profile-settings-open");

  try {
    await load();
  } catch(error) {
    const code = String(error?.message || "");
    setStatus(
      code === "AUTH_REQUIRED"
        ? "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an."
        : `Einstellungen konnten nicht geladen werden: ${code}`,
      "error"
    );
  }
}

function close(){
  const viewer = byId("profileSettingsViewer");
  if(!viewer) return;
  viewer.hidden = true;
  viewer.setAttribute("aria-hidden","true");
  document.body.classList.remove("profile-settings-open");
}

/*
 * Capture phase is intentional:
 * older app.js versions contain experimental settings listeners.
 * This controller owns the settings interaction now.
 */
document.addEventListener("click", async event => {
  const openButton = event.target.closest("#profileSettingsButton");
  if(openButton){
    event.preventDefault();
    event.stopImmediatePropagation();
    await open();
    return;
  }

  if(
    event.target.closest("#profileSettingsClose") ||
    event.target.closest("#profileSettingsDone") ||
    event.target.id === "profileSettingsBackdrop"
  ){
    event.preventDefault();
    event.stopImmediatePropagation();
    close();
    return;
  }

  const choice = event.target.closest(".segmented[data-pref] button[data-value]");
  if(choice){
    event.preventDefault();
    event.stopImmediatePropagation();
    const group = choice.closest(".segmented[data-pref]");
    if(group) await save(group.dataset.pref, choice.dataset.value);
  }
}, true);

document.addEventListener("keydown", event => {
  if(event.key === "Escape"){
    const viewer = byId("profileSettingsViewer");
    if(viewer && !viewer.hidden) close();
  }
}, true);

/* Apply safe defaults immediately; server values load when settings are opened. */
apply();

})();