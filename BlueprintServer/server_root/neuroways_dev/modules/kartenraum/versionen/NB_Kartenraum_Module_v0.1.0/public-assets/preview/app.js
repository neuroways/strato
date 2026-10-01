(() => {
  "use strict";

  const DEV_CARDS = [
    {id:"dev_card_01", title:"Testkarte I", text:"Ein ruhiger Platzhalter für die technische Kartenaufdeckung.", image:"../assets/card-placeholder-1.svg"},
    {id:"dev_card_02", title:"Testkarte II", text:"Diese Karte enthält bewusst keinen finalen NeuroBalance-Inhalt.", image:"../assets/card-placeholder-2.svg"},
    {id:"dev_card_03", title:"Testkarte III", text:"Sie prüft ausschließlich Ziehung, Wahrnehmung, Rückblick und Journal.", image:"../assets/card-placeholder-3.svg"}
  ];

  const KEY = "nb_kartenraum_dev_v010";
  const state = load();
  let view = routeToView(location.hash.replace(/^#/, "") || "/");

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {draws:{}, journal:[], reflections:[]};
    } catch {
      return {draws:{}, journal:[], reflections:[]};
    }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
  function today() { return new Date().toISOString().slice(0,10); }
  function routeToView(path) {
    const map = {"/":"room","/ziehung":"draw","/rueckblick":"review","/journal":"journal","/verbindungen":"connections","/decks":"decks"};
    return map[path] || "room";
  }
  function navigate(path) {
    location.hash = path;
  }
  window.addEventListener("hashchange", () => {
    view = routeToView(location.hash.replace(/^#/, "") || "/");
    render();
  });

  function currentDraw() { return state.draws[today()] || null; }
  function ensureDraw() {
    const date = today();
    if (!state.draws[date]) {
      const idx = Math.floor(Math.random() * DEV_CARDS.length);
      state.draws[date] = {date, card:DEV_CARDS[idx], revealed:false, perception:"", reflection:""};
      save();
    }
    return state.draws[date];
  }

  function shell(content) {
    return `
      <div class="shell">
        <header class="topbar">
          <div class="topbar-inner">
            <div class="brand">
              <img class="brand-mark" src="../assets/neurobalance-mark.svg" alt="">
              <div><strong>NeuroBalance</strong><span>Kartenraum</span></div>
            </div>
            <button class="icon-btn" data-nav="/" aria-label="Zum Kartenraum">✦</button>
          </div>
        </header>
        <main class="page">${content}</main>
      </div>`;
  }

  function room() {
    const hasDraw = !!currentDraw();
    return shell(`
      <section class="hero">
        <div>
          <div class="eyebrow">Dein persönlicher Kartenraum</div>
          <h1>Guten Morgen.<br>Was siehst du?</h1>
          <p class="lead">Ein ruhiger Raum für Karten, erste Gedanken und spätere Verbindungen. Keine Vorhersage. Keine richtige Deutung. Deine Wahrnehmung bleibt deine.</p>
          <div class="actions">
            <button class="primary" data-nav="/ziehung">${hasDraw ? "Morgenkarte ansehen" : "Morgenkarte ziehen"}</button>
            <button class="secondary" data-nav="/journal">Journal öffnen</button>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <img class="cat-sigil" src="../assets/cat-sigil.svg" alt="">
        </div>
      </section>
      <section class="room-grid" aria-label="Räume">
        ${roomButton("01","Morgenkarte","Ein stiller Moment für heute.","/ziehung")}
        ${roomButton("02","Rückblick","Später noch einmal hinschauen.","/rueckblick")}
        ${roomButton("03","Journal","Deine Worte bleiben erhalten.","/journal")}
        ${roomButton("04","Verbindungen","Wiederkehrende Motive entdecken.","/verbindungen")}
        ${roomButton("05","Meine Decks","Deine Kartensammlungen.","/decks")}
      </section>
      <p class="footer-note">Reflexion statt Vorhersage. Deine Deutung bleibt deine.</p>
    `);
  }
  function roomButton(no,title,desc,path) {
    return `<button class="room" data-nav="${path}"><small>${no}</small><strong>${title}</strong><span>${desc}</span></button>`;
  }

  function drawView() {
    const draw = ensureDraw();
    return shell(`
      <div class="view-header"><button class="back" data-nav="/">← Kartenraum</button></div>
      <section class="panel center">
        <div class="eyebrow">Morgenkarte · ${escapeHtml(draw.date)}</div>
        <h2>Welche Karte begleitet dich heute?</h2>
        <p class="lead" style="margin-left:auto;margin-right:auto">Du musst noch nichts wissen. Schau erst. Worte können später kommen.</p>
        <div class="card-stage">
          <div class="tarot-card ${draw.revealed ? "revealed":""}" id="card" role="button" tabindex="0" aria-label="Karte ${draw.revealed ? "geöffnet":"aufdecken"}">
            <div class="card-face card-back"><img src="../assets/cat-sigil.svg" alt=""></div>
            <div class="card-face card-front"><img src="${draw.card.image}" alt="${escapeHtml(draw.card.title)}"></div>
          </div>
        </div>
        <button class="primary" id="reveal">${draw.revealed ? "Karte ist geöffnet" : "Karte sanft aufdecken"}</button>
        ${draw.revealed ? `
          <div class="card-caption">
            <h3>${escapeHtml(draw.card.title)}</h3>
            <p>${escapeHtml(draw.card.text)}</p>
          </div>
          <div class="input-group" style="text-align:left">
            <label for="perception">Was fällt dir als Erstes auf?</label>
            <textarea id="perception" placeholder="Deine erste Wahrnehmung …">${escapeHtml(draw.perception || "")}</textarea>
            <div class="actions"><button class="secondary" id="save-perception">Wahrnehmung bewahren</button><button class="secondary" data-nav="/rueckblick">Zum Rückblick</button></div>
            <div class="notice">Diese erste Wahrnehmung wird separat behandelt. Ein späterer Kartentext oder eine Begleitung soll sie nicht überschreiben oder bewerten.</div>
          </div>` : ``}
      </section>
    `);
  }

  function reviewView() {
    const draw = currentDraw();
    if (!draw) return shell(emptyWithBack("Noch keine Morgenkarte","Ziehe zuerst eine Karte, bevor du später zurückblickst.","/ziehung","Morgenkarte ziehen"));
    return shell(`
      <div class="view-header"><button class="back" data-nav="/">← Kartenraum</button></div>
      <section class="panel">
        <div class="eyebrow">Rückblick · ${escapeHtml(draw.date)}</div>
        <h2>Noch einmal hinschauen</h2>
        <p class="lead">Was ist von deiner ersten Wahrnehmung geblieben? Was sieht jetzt anders aus?</p>
        <div class="entries">
          <div class="entry"><time>Deine erste Wahrnehmung</time><p>${escapeHtml(draw.perception || "Noch keine Wahrnehmung gespeichert.")}</p></div>
        </div>
        <div class="input-group">
          <label for="reflection">Was bemerkst du jetzt?</label>
          <textarea id="reflection" placeholder="Dein Rückblick …">${escapeHtml(draw.reflection || "")}</textarea>
        </div>
        <div class="actions"><button class="primary" id="save-reflection">Rückblick speichern</button><button class="secondary" data-nav="/journal">Zum Journal</button></div>
      </section>
    `);
  }

  function journalView() {
    return shell(`
      <div class="view-header"><button class="back" data-nav="/">← Kartenraum</button></div>
      <section class="panel">
        <div class="eyebrow">Journal</div>
        <h2>Deine Kartenmomente</h2>
        <p class="lead">Hier bleiben deine eigenen Worte. Die DEV-Vorschau speichert sie nur in diesem Browser.</p>
        <div class="input-group">
          <label for="journal-text">Neuer Eintrag</label>
          <textarea id="journal-text" placeholder="Was möchtest du bewahren?"></textarea>
        </div>
        <div class="actions"><button class="primary" id="save-journal">Eintrag speichern</button></div>
        <div class="entries">
          ${state.journal.length ? state.journal.slice().reverse().map(e => `<div class="entry"><time>${escapeHtml(e.date)}</time><p>${escapeHtml(e.text)}</p></div>`).join("") : `<div class="empty">Noch keine Journaleinträge.</div>`}
        </div>
      </section>
    `);
  }

  function connectionsView() {
    const draws = Object.values(state.draws);
    const counts = {};
    draws.forEach(d => counts[d.card.id] = (counts[d.card.id] || 0) + 1);
    const repeated = Object.entries(counts).filter(([,n]) => n > 1);
    return shell(`
      <div class="view-header"><button class="back" data-nav="/">← Kartenraum</button></div>
      <section class="panel">
        <div class="eyebrow">Verbindungen</div>
        <h2>Was kehrt wieder?</h2>
        <p class="lead">Später können hier Karten, Kombinationen und Motive als persönliche Landkarte sichtbar werden.</p>
        <div class="entries">
          ${draws.length ? `<div class="entry"><time>DEV-Beobachtung</time><p>${draws.length} gespeicherter Kartenmoment${draws.length === 1 ? "" : "e"} in diesem Browser.</p></div>` : `<div class="empty">Noch keine Kartenmomente.</div>`}
          ${repeated.map(([id,n]) => `<div class="entry"><time>Wiederkehrende DEV-Karte</time><p>${escapeHtml(id)} · ${n}×</p></div>`).join("")}
        </div>
        <div class="notice">Die fachliche Musterlogik ist noch nicht freigegeben. Diese Ansicht zeigt nur, dass der spätere Bereich technisch vorgesehen ist.</div>
      </section>
    `);
  }

  function decksView() {
    return shell(`
      <div class="view-header"><button class="back" data-nav="/">← Kartenraum</button></div>
      <section class="panel">
        <div class="eyebrow">Meine Decks</div>
        <h2>Kartensammlungen</h2>
        <p class="lead">Produktiv können hier Tarot-, Orakel-, Selbstliebe- und weitere Decks verwaltet werden.</p>
        <div class="entries">
          <div class="entry"><time>DEV · technisch</time><p><strong style="color:var(--nb-text)">DEV Deck</strong><br>3 technische Platzhalterkarten. Kein finaler NeuroBalance-Inhalt.</p></div>
        </div>
      </section>
    `);
  }

  function emptyWithBack(title,text,path,label) {
    return `<div class="view-header"><button class="back" data-nav="/">← Kartenraum</button></div><section class="panel center"><h2>${title}</h2><p class="lead" style="margin-left:auto;margin-right:auto">${text}</p><div class="actions" style="justify-content:center"><button class="primary" data-nav="${path}">${label}</button></div></section>`;
  }

  function render() {
    const app = document.getElementById("app");
    const views = {room, draw:drawView, review:reviewView, journal:journalView, connections:connectionsView, decks:decksView};
    app.innerHTML = views[view]();
    bind();
  }

  function bind() {
    document.querySelectorAll("[data-nav]").forEach(el => el.addEventListener("click", () => navigate(el.dataset.nav)));

    const reveal = document.getElementById("reveal");
    const card = document.getElementById("card");
    const doReveal = () => {
      const d = ensureDraw(); d.revealed = true; save(); render();
    };
    if (reveal && !ensureDraw().revealed) reveal.addEventListener("click", doReveal);
    if (card && !ensureDraw().revealed) {
      card.addEventListener("click", doReveal);
      card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") doReveal(); });
    }

    const savePerception = document.getElementById("save-perception");
    if (savePerception) savePerception.addEventListener("click", () => {
      const d = ensureDraw();
      d.perception = document.getElementById("perception").value.trim();
      save(); savePerception.textContent = "Gespeichert";
    });

    const saveReflection = document.getElementById("save-reflection");
    if (saveReflection) saveReflection.addEventListener("click", () => {
      const d = ensureDraw();
      d.reflection = document.getElementById("reflection").value.trim();
      state.reflections.push({date:new Date().toISOString(), drawDate:d.date, text:d.reflection});
      save(); saveReflection.textContent = "Gespeichert";
    });

    const saveJournal = document.getElementById("save-journal");
    if (saveJournal) saveJournal.addEventListener("click", () => {
      const box = document.getElementById("journal-text");
      const text = box.value.trim();
      if (!text) return;
      state.journal.push({id:crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), date:new Date().toLocaleString("de-DE"), text});
      save(); render();
    });
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  }

  render();
})();
