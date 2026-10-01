const modes = [
  ["standard", "Standard", "ausgewogen"], ["ruhe", "Ruhe", "weich & warm"],
  ["nacht", "Nacht", "geschützt"], ["neugier", "Neugier", "offen"],
  ["aktivierung", "Aktivierung", "in Bewegung"], ["reduziert", "Reduziert", "gerade weniger"]
];
const questions = [
  ["Wie ist deine Energie gerade?", "Wähle das, was sich für diesen Moment am stimmigsten anfühlt.", ["Sehr niedrig", "Niedrig", "Mittel", "Hoch", "Sehr hoch"]],
  ["Wie viel kommt gerade bei dir an?", "Es geht nicht um richtig oder falsch – nur um jetzt.", ["Fast nichts", "Eher wenig", "Mehreres", "Sehr vieles"]],
  ["Wie leicht ist der nächste Schritt zu sehen?", "Du musst ihn noch nicht gehen.", ["Noch gar nicht", "Nur undeutlich", "Ein wenig", "Ziemlich klar"]],
  ["Wie fühlt sich ein Wechsel gerade an?", "Zum Beispiel anfangen, aufhören oder von einem Ort zum anderen gehen.", ["Ich möchte bleiben", "Braucht Zeit", "Ist möglich", "Fühlt sich leicht an"]]
];
const state = { mode: "standard", view: "start", question: 0, answers: [], reduced: matchMedia("(prefers-reduced-motion: reduce)").matches };
const app = document.querySelector("#app");
const card = document.querySelector("#content-card");
const menu = document.querySelector("#mode-menu");
const modeButton = document.querySelector("#mode-button");
const icons = { Start: "⌂", "Mein Weg": "∿", Projekte: "◇", Wissen: "▤", Entwicklung: "✦", "Check-in": "●", Mehr: "•••" };

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
}
function locationResult() {
  const sum = state.answers.reduce((a, b) => a + b, 0);
  if (sum <= 4) return ["an der stillen Küste", "Im Moment wirkt dein Ort eher nah, ruhig und geschützt."];
  if (sum >= 10) return ["am offenen Horizont", "Im Moment wirkt dein Ort eher weit, lebendig und offen."];
  return ["zwischen Küste und Weite", "Im Moment scheint beides da zu sein: ein wenig Schutz und ein wenig Raum."];
}
function setMode(mode) {
  state.mode = mode;
  app.className = `app mode-${mode}${state.reduced ? " motion-reduced" : ""}`;
  document.querySelector("#mode-label").textContent = modes.find(item => item[0] === mode)[1];
  document.querySelector("#day-icon").textContent = mode === "nacht" ? "☾" : "☀";
  document.querySelector("#moment-label").textContent = ({ruhe:"Ruhe",neugier:"Neugier",aktivierung:"Aufbruch",reduziert:"Weniger"})[mode] || "Ankommen";
  renderModes();
}
function setView(view) { state.view = view; render(); }
function begin() { state.question = 0; state.answers = []; setView("checkin"); }
function answer(index) {
  state.answers = [...state.answers, index];
  if (state.question < questions.length - 1) state.question += 1;
  else {
    const sum = state.answers.reduce((a, b) => a + b, 0);
    setMode(sum <= 4 ? "ruhe" : sum >= 10 ? "neugier" : "standard");
    state.view = "location";
  }
  render();
}
function go(label) {
  if (label === "Start") setView("start");
  else if (label === "Mein Weg") setView("path");
  else if (label === "Check-in") begin();
  else setView("placeholder");
}
function renderNavigation() {
  const make = label => `<button type="button" data-nav="${escapeHtml(label)}"><span>${icons[label]}</span><small>${escapeHtml(label)}</small></button>`;
  document.querySelector("#desktop-nav").innerHTML = ["Start","Mein Weg","Projekte","Wissen","Entwicklung"].map(make).join("");
  document.querySelector("#mobile-nav").innerHTML = ["Start","Mein Weg","Check-in","Wissen","Mehr"].map(make).join("");
  document.querySelectorAll("[data-nav]").forEach(button => button.addEventListener("click", () => go(button.dataset.nav)));
}
function renderModes() {
  menu.innerHTML = modes.map(([id,label,hint]) => `<button type="button" data-mode="${id}" class="${state.mode === id ? "selected" : ""}"><i class="swatch ${id}"></i><span><b>${label}</b><small>${hint}</small></span></button>`).join("");
  menu.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => { setMode(button.dataset.mode); toggleMenu(false); }));
}
function toggleMenu(open = menu.hidden) { menu.hidden = !open; modeButton.setAttribute("aria-expanded", String(open)); }
function startView() { return `<div class="view start-view"><p class="eyebrow">Ein Ort, der mit dir geht.</p><h1>Vielleicht brauchst du<br>keinen besseren Weg.<br>Sondern <em>deinen.</em></h1><p class="lead">Lass uns gemeinsam hinschauen.</p><p>Du musst noch keine Antwort haben.</p><div class="actions"><button class="primary" data-action="begin">∿ &nbsp;Check-in beginnen</button><button class="quiet-link" data-view="choose">Ich weiß gerade nicht, wo ich anfangen soll.</button></div></div>`; }
function checkinView() {
  const [title, subtitle, options] = questions[state.question];
  return `<div class="view checkin"><button class="back" data-action="back">← Zurück</button><p class="eyebrow">Frage ${state.question + 1} von 4</p><h2>${title}</h2><p>${subtitle}</p><div class="answers">${options.map((option,index) => `<button data-answer="${index}"><i></i>${option}<span>›</span></button>`).join("")}</div><small class="private-line">♧ Deine Antworten bleiben nur in diesem Piloten.</small></div>`;
}
function locationView() { const [name,text] = locationResult(); return `<div class="view"><p class="eyebrow">Deine Verortung · nur für jetzt</p><h2>Du bist gerade<br><em>${name}.</em></h2><p class="big-copy">${text}</p><div class="chips"><span>stimmig</span><span>momentan</span><span>ohne Bewertung</span></div><div class="pause"><b>Du musst daraus gerade nichts machen.</b><small>Dieser Ort kann sich ändern – und das ist okay.</small></div><button class="primary" data-view="choose">Was wäre jetzt hilfreich? &nbsp;→</button></div>`; }
function chooseView() { return `<div class="view choose"><span class="view-icon">∿</span><p class="eyebrow">Du darfst erst einmal ankommen.</p><h2>Das ist okay.</h2><p class="big-copy">Wir können einfach dort anfangen,<br>wo du gerade bist.</p><div class="choices"><button data-view="observe"><b>○ &nbsp;Nur anschauen</b><small>In Ruhe stöbern und inspirieren lassen</small></button><button data-view="observe"><b>≋ &nbsp;Etwas Entlastung finden</b><small>Ein wenig weniger für diesen Moment</small></button><button data-view="deeper"><b>◌ &nbsp;Etwas erzählen</b><small>Gedanken ordnen und in Worte fassen</small></button><button data-view="deeper"><b>◎ &nbsp;Gemeinsam genauer hinschauen</b><small>Perspektiven öffnen – nur mit deiner Zustimmung</small></button></div><button class="quiet-link" data-action="begin">Oder mit dem kurzen Check-in beginnen</button></div>`; }
function deeperView() { return `<div class="view"><p class="eyebrow">Du entscheidest die Tiefe.</p><h2>Welche Perspektive möchtest du öffnen?</h2><p>Das sind Blickwinkel, keine Erklärungen über dich.</p><div class="perspectives">${["Energie","Umgebung","Erwartungen","Menschen","Zeitpunkt","Übergänge"].map(x => `<button><span>◌</span><b>${x}</b><small>anschauen</small></button>`).join("")}</div></div>`; }
function pathView() { return `<div class="view"><p class="eyebrow">Mein Weg</p><h2>Das hast du bisher gesehen.</h2><p>Keine Zusammenfassung darüber, wer du bist. Nur Momente, deren Bedeutung dir gehört.</p><div class="timeline"><article><i></i><time>Heute</time><div><b>Küste</b><span>„Viel gleichzeitig.“</span></div></article><article><i></i><time>Vor einigen Tagen</time><div><b>Festland</b><span>„Ideen kamen leicht.“</span></div></article></div><div class="private-panel"><b>♧ Dein Weg ist privat.</b><small>Du bestimmst, was diese Beobachtungen für dich bedeuten.</small></div></div>`; }
function render() {
  const views = { start:startView, checkin:checkinView, location:locationView, choose:chooseView, deeper:deeperView, path:pathView,
    observe: () => `<div class="view centered"><span class="view-icon">○</span><h2>Du musst heute nichts daraus machen.</h2><p class="big-copy">Manchmal reicht es, etwas gesehen zu haben.</p><button class="quiet-link" data-view="start">Zurück in deinen Raum</button></div>`,
    placeholder: () => `<div class="view centered"><span class="view-icon">◇</span><p class="eyebrow">Dieser Raum wächst später.</p><h2>Für diesen Piloten bleibt es hier bewusst ruhig.</h2><p class="big-copy">Heute geht es um Ankommen, Verorten und selbstbestimmte Tiefe.</p><button class="quiet-link" data-view="start">Zurück zum Start</button></div>`
  };
  card.innerHTML = views[state.view]();
  document.querySelector("#moment-card").hidden = !["start","choose","location"].includes(state.view);
  card.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
  card.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => answer(Number(button.dataset.answer))));
  card.querySelectorAll('[data-action="begin"]').forEach(button => button.addEventListener("click", begin));
  card.querySelectorAll('[data-action="back"]').forEach(button => button.addEventListener("click", () => { if (state.question > 0) { state.question -= 1; state.answers.pop(); render(); } else setView("start"); }));
}
document.querySelector("#motion-toggle").addEventListener("click", event => { state.reduced = !state.reduced; event.currentTarget.textContent = state.reduced ? "Bewegung ruhig" : "Bewegung reduzieren"; event.currentTarget.setAttribute("aria-pressed", String(state.reduced)); setMode(state.mode); });
modeButton.addEventListener("click", () => toggleMenu());
document.querySelector("#moment-change").addEventListener("click", () => toggleMenu(true));
document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
renderNavigation(); renderModes(); setMode("standard"); render();
