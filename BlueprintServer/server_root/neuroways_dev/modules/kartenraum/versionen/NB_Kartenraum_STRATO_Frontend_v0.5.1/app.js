(() => {
  "use strict";

  const API_BASE = "../NB_Kartenraum_Backend_v0.5.0/api";
  const CARD_ASSET_BASE = "../cards/";
  const FRAME_ASSET = "assets/ui/frame.svg";
  const MISSING_ASSET = "assets/ui/missing.svg";
  const STORAGE_KEY = "nb_kartenraum_frontend_v034";

  const state = loadState();
  let cards = [];
  let currentCard = null;
  let currentText = null;
  let currentKnowledge = null;
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


  async function apiPost(path, payload, authRequired=false) {
    const headers={"Content-Type":"application/json","Accept":"application/json"};
    if (authRequired && state.session_token) {
      headers["Authorization"]=`Bearer ${state.session_token}`;
    }
    const response=await fetch(`${API_BASE}/${path}`,{
      method:"POST",headers,body:JSON.stringify(payload)
    });
    const data=await response.json().catch(()=>({}));
    if (!response.ok || data.status!=="ok") {
      throw new Error(data.message || data.error || `API error ${response.status}`);
    }
    return data;
  }

  async function apiAuthGet(path) {
    const response=await fetch(`${API_BASE}/${path}`,{
      headers:{
        "Accept":"application/json",
        "Authorization":`Bearer ${state.session_token || ""}`
      }
    });
    const data=await response.json().catch(()=>({}));
    if (!response.ok || data.status!=="ok") throw new Error(data.message || data.error || "AUTH_FAILED");
    return data;
  }

  function showGate() {
    document.getElementById("profileGate").hidden=false;
    document.getElementById("appRoot").hidden=true;
  }

  function showApp() {
    document.getElementById("profileGate").hidden=true;
    document.getElementById("appRoot").hidden=false;
    document.getElementById("profileName").textContent=state.username || "";
  }

  async function createProfile() {
    const username=document.getElementById("newUsername").value.trim();
    const aud=document.querySelector('input[name="newAudience"]:checked')?.value || "ADULT";
    const btn=document.getElementById("createProfile");
    btn.disabled=true;
    try {
      const result=await apiPost("profile-create.php",{username,audience_code:aud});
      const p=result.profile;
      state.username=p.username;
      state.audience=p.audience_code;
      state.session_token=p.session_token;
      state.profile_id=p.profile_id;
      saveState();

      document.getElementById("createdUsername").textContent=p.username;
      document.getElementById("createdCode").textContent=p.access_code;
      document.getElementById("accessPackage").value=`Nutzername: ${p.username}\nCode: ${p.access_code}`;
      document.getElementById("profileCreateForm").hidden=true;
      document.getElementById("accessSaveStep").hidden=false;
    } catch(e) {
      document.getElementById("profileError").textContent =
        e.message==="USERNAME_UNAVAILABLE" ? "Dieser Nutzername ist bereits vergeben." :
        "Das Profil konnte nicht erstellt werden.";
    } finally { btn.disabled=false; }
  }

  async function loginProfile() {
    const username=document.getElementById("loginUsername").value.trim();
    const code=document.getElementById("loginCode").value.trim();
    try {
      const result=await apiPost("login.php",{username,access_code:code});
      const p=result.profile;
      state.username=p.username;
      state.audience=p.audience_code;
      state.session_token=p.session_token;
      state.profile_id=p.profile_id;
      saveState();
      audience=state.audience;
      showApp();
      await switchAudience(audience);
      await loadCards();
    } catch(e) {
      document.getElementById("loginError").textContent =
        e.message || "Name oder Code passen nicht zusammen.";
    }
  }

  async function copyAccess() {
    const value=document.getElementById("accessPackage").value;
    try {
      await navigator.clipboard.writeText(value);
      document.getElementById("copyMsg").textContent="Zugang kopiert.";
    } catch {
      document.getElementById("accessPackage").select();
      document.execCommand("copy");
      document.getElementById("copyMsg").textContent="Zugang kopiert.";
    }
  }

  async function confirmSavedAccess() {
    if (!document.getElementById("accessSavedCheck").checked) {
      document.getElementById("copyMsg").textContent="Bitte bestätige zuerst, dass du deinen Zugang gespeichert hast.";
      return;
    }
    audience=state.audience;
    showApp();
    await switchAudience(audience);
    await loadCards();
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

  async function loadKnowledge(cardId) {
    const result = await api(
      `knowledge.php?id=${encodeURIComponent(cardId)}&audience=${encodeURIComponent(audience)}&language=de`
    );
    currentKnowledge = result.knowledge;
    return currentKnowledge;
  }

  async function selectCard(cardId) {
    const card = cards.find(c => c.card_id === cardId);
    if (!card) return;

    currentCard = card;
    currentText = null;
    currentKnowledge = null;
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
    document.getElementById("knowledgePanel").hidden = true;
    document.getElementById("knowledgeContent").innerHTML = "";
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

  async function savePerception() {
    if (!currentCard || !state.current_draw_id) return;
    const value=document.getElementById("perception").value.trim();
    if (!value) return;
    try {
      await apiPost("perception-save.php",{
        draw_id:state.current_draw_id,
        perception_text:value
      },true);
      document.getElementById("saveMsg").textContent="Wahrnehmung im persönlichen Kartenraum gespeichert.";
    } catch(e) {
      document.getElementById("saveMsg").textContent="Speichern nicht möglich: "+e.message;
    }
  }

  async function openCardRoom() {
    if (!currentCard) return;

    const button = document.getElementById("openRoom");
    const panel = document.getElementById("interpretationPanel");
    const content = document.getElementById("interpretationContent");

    button.disabled = true;
    button.textContent = "Kartenraum lädt …";
    panel.hidden = false;
    content.innerHTML = '<div class="status">Kartentext wird aus der Datenbank geladen …</div>';

    try {
      await loadText(currentCard.card_id);
      renderInterpretation();
      panel.hidden = false;
      panel.classList.add("is-visible");

      requestAnimationFrame(() => {
        panel.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });
      });
    } catch (e) {
      panel.hidden = false;
      content.innerHTML =
        `<div class="notice">Der Kartentext konnte nicht geladen werden: ${esc(e.message)}</div>`;
    } finally {
      button.disabled = false;
      button.textContent = "Kartenraum öffnen";
    }
  }

  async function openKnowledge() {
    if (!currentCard) return;

    const button = document.getElementById("openKnowledge");
    const panel = document.getElementById("knowledgePanel");
    const content = document.getElementById("knowledgeContent");

    button.disabled = true;
    button.textContent = "Kartenwissen lädt …";
    panel.hidden = false;
    content.innerHTML = '<div class="status">Kartenwissen wird aus der Datenbank geladen …</div>';

    try {
      await loadKnowledge(currentCard.card_id);
      renderKnowledge();
      panel.hidden = false;
      panel.classList.add("is-visible");
      panel.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    } catch (e) {
      content.innerHTML = `<div class="notice">Das Kartenwissen konnte nicht geladen werden: ${esc(e.message)}</div>`;
    } finally {
      button.disabled = false;
      button.textContent = "Mehr über diese Karte erfahren";
    }
  }

  function renderKnowledge() {
    if (!currentKnowledge) return;

    const keywords = (currentKnowledge.keywords || [])
      .map(k => `<span class="keyword-chip">${esc(k)}</span>`).join("");

    document.getElementById("knowledgeContent").innerHTML = `
      <div class="eyebrow">Kartenwissen · ${audience === "CHILD" ? "Kinder" : "Erwachsene"}</div>
      <h2>${esc(currentKnowledge.theme || currentCard?.title_de || "")}</h2>
      ${keywords ? `<div class="keyword-list">${keywords}</div>` : ""}
      <section class="text-section">
        <h3>${audience === "CHILD" ? "Worum geht es bei dieser Karte?" : "Bedeutung der Karte"}</h3>
        <p>${esc(currentKnowledge.meaning_text || "")}</p>
      </section>
      ${currentKnowledge.symbolism_text ? `
      <section class="text-section">
        <h3>Symbolik und Bildsprache</h3>
        <p>${esc(currentKnowledge.symbolism_text)}</p>
      </section>` : ""}
      <section class="text-section">
        <h3>Andere Blickrichtung</h3>
        <p>${esc(currentKnowledge.other_direction_text || "")}</p>
      </section>
    `;
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
    if (!document.getElementById("knowledgePanel").hidden && currentCard) {
      await openKnowledge();
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
    if (!pool.length || !state.session_token) return;

    const card = pool[Math.floor(Math.random() * pool.length)];
    const orientation = Math.random() < 0.5 ? "UPRIGHT" : "REVERSED";

    const result = await apiPost("draw-create.php",{
      card_id:card.card_id,
      orientation_code:orientation
    },true);

    state.current_draw_id=result.draw.draw_id;
    state.current_orientation=orientation;
    saveState();

    await selectCard(card.card_id);
    state.current_draw_id=result.draw.draw_id;
    state.current_orientation=orientation;
    saveState();
    applyOrientation();
  }

  function applyOrientation() {
    const front=document.getElementById("frontCrop");
    const label=document.getElementById("orientationNotice");
    const turnBtn=document.getElementById("turnForViewing");

    if (state.current_orientation==="REVERSED") {
      front.classList.add("drawn-reversed");
      label.hidden=false;
      label.textContent="Diese Karte wurde umgekehrt gezogen.";
      turnBtn.hidden=false;
    } else {
      front.classList.remove("drawn-reversed");
      label.hidden=true;
      turnBtn.hidden=true;
    }
  }

  function turnForViewing() {
    const front=document.getElementById("frontCrop");
    front.classList.toggle("view-upright");
    document.getElementById("orientationNotice").textContent =
      "Umgekehrt gezogen · nur zur Betrachtung gedreht.";
  }

  function bind() {
    document.getElementById("draw").addEventListener("click", drawRandom);
    document.getElementById("createProfile").addEventListener("click", createProfile);
    document.getElementById("loginProfile").addEventListener("click", loginProfile);
    document.getElementById("copyAccess").addEventListener("click", copyAccess);
    document.getElementById("confirmSavedAccess").addEventListener("click", confirmSavedAccess);
    document.getElementById("turnForViewing").addEventListener("click", turnForViewing);
    document.getElementById("showCreate").addEventListener("click",()=>{
      document.getElementById("profileCreateForm").hidden=false;
      document.getElementById("profileLoginForm").hidden=true;
    });
    document.getElementById("showLogin").addEventListener("click",()=>{
      document.getElementById("profileLoginForm").hidden=false;
      document.getElementById("profileCreateForm").hidden=true;
    });
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
    document.getElementById("openKnowledge").addEventListener("click", openKnowledge);

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
    if (!state.session_token) {
      showGate();
      return;
    }
    showApp();
    audience=state.audience || "ADULT";
    await switchAudience(audience);
    try {
      await loadCards();
    } catch (e) {
      state.session_token=null;
      saveState();
      showGate();
    }
  }

  init();
})();
