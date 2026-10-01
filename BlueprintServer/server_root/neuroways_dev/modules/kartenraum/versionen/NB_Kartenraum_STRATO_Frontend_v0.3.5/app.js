(() => {
  "use strict";

  const API_BASE = "../NB_Kartenraum_Backend_v0.3.3/api";
  const CARD_ASSET_BASE = "../cards/";
  const FRAME_ASSET = "assets/ui/frame.svg";
  const MISSING_ASSET = "assets/ui/missing.svg";
  const STORAGE_KEY = "nb_kartenraum_frontend_v034";

  const state = loadState();
  let cards = [];
  let currentCard = null;
  let currentText = null;
  let audience = state.audience || "ADULT";
  let filter = "all";
  let revealed = false;

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        audience: "ADULT",
        perceptions: {}
      };
    } catch {
      return { audience: "ADULT", perceptions: {} };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[c]));
  }

  function coords(position) {
    const i = Number(position) - 1;
    return { column: i % 3, row: Math.floor(i / 3) };
  }

  function backgroundPosition(position) {
    const { column, row } = coords(position);
    return `${column * 50}% ${row * 100}%`;
  }

  function setCrop(el, sheet, position) {
    el.dataset.asset = "checking";
    el.style.backgroundImage = `url("${CARD_ASSET_BASE}${sheet}")`;
    el.style.backgroundSize = "300% 200%";
    el.style.backgroundPosition = backgroundPosition(position);

    const probe = new Image();
    probe.onload = () => {
      el.dataset.asset = "ok";
      updateAssetStatus();
    };
    probe.onerror = () => {
      el.dataset.asset = "missing";
      el.style.backgroundImage = `url("${MISSING_ASSET}")`;
      el.style.backgroundSize = "100% 100%";
      el.style.backgroundPosition = "center";
      updateAssetStatus();
    };
    probe.src = CARD_ASSET_BASE + sheet;
  }

  async function api(path) {
    const response = await fetch(`${API_BASE}/${path}`, {
      headers: { "Accept": "application/json" }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.status !== "ok") {
      throw new Error(data.message || data.error || `API error ${response.status}`);
    }
    return data;
  }

  async function loadCards() {
    setStatus("Lade Karten aus der Datenbank …");
    const result = await api("cards.php");
    cards = result.cards || [];
    setStatus(`${cards.length} Karten aus MariaDB geladen.`);
    renderCatalog();
    if (!currentCard && cards.length) {
      await selectCard(cards[0].card_id);
    }
  }

  async function loadText(cardId) {
    const result = await api(
      `text.php?id=${encodeURIComponent(cardId)}&audience=${encodeURIComponent(audience)}&language=de`
    );
    currentText = result.text;
    return currentText;
  }

  async function selectCard(cardId) {
    const card = cards.find(c => c.card_id === cardId);
    if (!card) return;

    currentCard = card;
    currentText = null;
    revealed = false;

    document.getElementById("flip").classList.remove("revealed");
    setCrop(document.getElementById("frontCrop"), card.sheet_name, card.sheet_position);
    setCrop(document.getElementById("backCrop"), "SheetR.png", 5);

    document.getElementById("cardTitle").textContent = card.title_de;
    document.getElementById("cardTech").textContent =
      `${card.card_id} · ${card.sheet_name} · Position ${card.sheet_position}`;

    document.getElementById("perceptionPanel").hidden = true;
    document.getElementById("interpretationPanel").hidden = true;
    document.getElementById("interpretationContent").innerHTML = "";
    document.getElementById("perception").value =
      state.perceptions[card.card_id] || "";

    document.getElementById("reveal").textContent = "Karte sanft aufdecken";
  }

  function revealCard() {
    if (!currentCard || revealed) return;
    revealed = true;
    document.getElementById("flip").classList.add("revealed");
    document.getElementById("reveal").textContent = "Karte ist geöffnet";

    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 10 : 850;
    setTimeout(() => {
      document.getElementById("perceptionPanel").hidden = false;
    }, delay);
  }

  function savePerception() {
    if (!currentCard) return;
    const value = document.getElementById("perception").value.trim();
    state.perceptions[currentCard.card_id] = value;
    saveState();
    document.getElementById("saveMsg").textContent =
      "Gespeichert – im Preview weiterhin nur in diesem Browser.";
  }

  async function openCardRoom() {
    if (!currentCard) return;

    const button = document.getElementById("openRoom");
    button.disabled = true;
    button.textContent = "Kartenraum lädt …";

    try {
      await loadText(currentCard.card_id);
      renderInterpretation();
      document.getElementById("interpretationPanel").hidden = false;
      document.getElementById("interpretationPanel").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    } catch (e) {
      document.getElementById("interpretationPanel").hidden = false;
      document.getElementById("interpretationContent").innerHTML =
        `<div class="notice">Der Kartentext konnte nicht geladen werden: ${esc(e.message)}</div>`;
    } finally {
      button.disabled = false;
      button.textContent = "Kartenraum öffnen";
    }
  }

  function renderInterpretation() {
    if (!currentText) return;

    const labels = audience === "CHILD" ? {
      what: "Was entdeckst du?",
      room: "Der Raum der Karte",
      helpful: "Was helfen könnte",
      difficult: "Was schwierig sein könnte",
      context: "Kennst du so einen Moment?",
      own: "Deine Kartensprache",
      step: "Ein kleiner möglicher Schritt"
    } : {
      what: "Was siehst du?",
      room: "Der Raum der Karte",
      helpful: "Was dich tragen könnte",
      difficult: "Was gerade schwierig sein könnte",
      context: "Dein Kontext",
      own: "Deine Kartensprache",
      step: "Ein möglicher nächster Schritt"
    };

    const questions = (currentText.context_questions || [])
      .map(q => `<li>${esc(q)}</li>`).join("");

    document.getElementById("interpretationContent").innerHTML = `
      <div class="eyebrow">${audience === "CHILD" ? "Kinder" : "Erwachsene"} · Deutsch</div>
      <h2>${esc(currentText.title)}</h2>
      ${currentText.subtitle ? `<p class="subtitle">${esc(currentText.subtitle)}</p>` : ""}
      <section class="text-section">
        <h3>${labels.what}</h3><p>${esc(currentText.what_do_you_see)}</p>
      </section>
      <section class="text-section">
        <h3>${labels.room}</h3><p>${esc(currentText.card_room)}</p>
      </section>
      <section class="text-section">
        <h3>${labels.helpful}</h3><p>${esc(currentText.helpful_side)}</p>
      </section>
      <section class="text-section">
        <h3>${labels.difficult}</h3><p>${esc(currentText.difficult_side)}</p>
      </section>
      <section class="text-section">
        <h3>${labels.context}</h3><ul>${questions}</ul>
      </section>
      <section class="text-section">
        <h3>${labels.own}</h3><p>${esc(currentText.own_card_language)}</p>
      </section>
      <section class="text-section">
        <h3>${labels.step}</h3><p>${esc(currentText.possible_next_step)}</p>
      </section>
    `;
  }

  async function switchAudience(next) {
    if (!["ADULT","CHILD"].includes(next)) return;
    audience = next;
    state.audience = audience;
    saveState();

    document.querySelectorAll("[data-audience]").forEach(btn => {
      const active = btn.dataset.audience === audience;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (!document.getElementById("interpretationPanel").hidden && currentCard) {
      await openCardRoom();
    }
  }

  function filteredCards() {
    if (filter === "all") return cards;
    if (filter === "major") return cards.filter(c => c.arcana_code === "major");
    return cards.filter(c => c.suit_code === filter);
  }

  function renderCatalog() {
    const list = filteredCards();
    document.getElementById("catalog").innerHTML = list.map(c => `
      <button class="card-row ${currentCard?.card_id === c.card_id ? "selected" : ""}" data-id="${esc(c.card_id)}">
        ${esc(c.title_de)}
        <small>${esc(c.sheet_name)} · ${esc(c.sheet_position)}</small>
      </button>
    `).join("");

    document.querySelectorAll(".card-row").forEach(btn => {
      btn.addEventListener("click", () => selectCard(btn.dataset.id));
    });
  }

  function updateAssetStatus() {
    const front = document.getElementById("frontCrop");
    const back = document.getElementById("backCrop");
    const missing = [front, back].filter(el => el.dataset.asset === "missing").length;
    const el = document.getElementById("assetStatus");
    if (missing) {
      el.innerHTML = `<b>${missing} verwendetes Asset fehlt.</b> Gemeinsamer Pfad: <code>/modules/kartenraum/cards/</code>`;
    } else if ([front, back].every(el => el.dataset.asset === "ok")) {
      el.innerHTML = `<b>Verwendete Kartenassets gefunden.</b>`;
    }
  }

  function setStatus(message) {
    document.getElementById("apiStatus").textContent = message;
  }

  async function drawRandom() {
    const pool = filteredCards();
    if (!pool.length) return;
    const card = pool[Math.floor(Math.random() * pool.length)];
    await selectCard(card.card_id);
  }

  function bind() {
    document.getElementById("draw").addEventListener("click", drawRandom);
    document.getElementById("reveal").addEventListener("click", revealCard);
    document.getElementById("flip").addEventListener("click", revealCard);
    document.getElementById("flip").addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        revealCard();
      }
    });
    document.getElementById("savePerception").addEventListener("click", savePerception);
    document.getElementById("openRoom").addEventListener("click", openCardRoom);

    document.getElementById("filter").addEventListener("change", e => {
      filter = e.target.value;
      renderCatalog();
    });

    document.querySelectorAll("[data-audience]").forEach(btn => {
      btn.addEventListener("click", () => switchAudience(btn.dataset.audience));
    });
  }

  async function init() {
    bind();
    switchAudience(audience);
    try {
      await loadCards();
    } catch (e) {
      setStatus(`API-Fehler: ${e.message}`);
      document.getElementById("catalog").innerHTML =
        `<div class="notice">Die Karten konnten nicht aus dem Backend geladen werden.</div>`;
    }
  }

  init();
})();
