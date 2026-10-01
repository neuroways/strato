(() => {
  "use strict";

  const questions = [
    { id:"time", eyebrow:"Zeit", title:"Wie viel Zeit hast du gerade?", hint:"Es gibt kein richtiges Zeitfenster.", options:["5 Minuten","10 Minuten","20 Minuten","30 Minuten","Ich weiß es nicht"] },
    { id:"state", eyebrow:"Du", title:"Wie geht es dir gerade?", hint:"Wähle das, was heute am ehesten passt.", options:["sehr erschöpft","unruhig","blockiert","okay","handlungsfähig"] },
    { id:"home", eyebrow:"Dein Zuhause", title:"Wie fühlt sich dein Zuhause gerade an?", hint:"Nicht bewerten – nur kurz verorten.", options:["überall steht etwas","ein Raum kippt gerade","benutzbar, aber unruhig","ich finde Dinge nicht","ich brauche einen sichtbaren Erfolg"] },
    { id:"problem", eyebrow:"Im Blick", title:"Was stört dich am meisten?", hint:"Wir nehmen nur einen Orientierungspunkt.", options:["Müll","Geschirr","Wäsche","volle Flächen","Sachen ohne Platz","ich weiß es nicht"] }
  ];

  const methods = {
    "Rapid Reset": { icon:"spark", text:"Ein kurzer, klarer Durchgang für das, was gerade sofort leichter werden darf.", reason:"Du hast wenig Zeit – deshalb zählt jetzt nur schnelle Entlastung.", steps:[
      ["Wähle deinen kleinen Bereich","Nimm nur das, was du gerade von deinem Platz aus gut sehen und erreichen kannst."],
      ["Entferne das Offensichtliche","Nimm Müll, leere Verpackungen oder Dinge, die direkt wegkönnen. Alles andere bleibt noch liegen."],
      ["Bring fünf Dinge zurück","Nur Dinge mit einem klaren Platz. Nach fünf darfst du aufhören."],
      ["Lass den Blick ruhen","Schau kurz auf die veränderte Stelle. Du musst jetzt nichts mehr verbessern."]
    ]},
    "Insel-Methode": { icon:"island", text:"Du schaffst eine einzige ruhige Fläche. Der Rest darf für heute bleiben.", reason:"Eine sichtbare Ruheinsel gibt Orientierung, ohne den ganzen Raum lösen zu müssen.", steps:[
      ["Wähle eine Ruheinsel","Entscheide dich für genau eine kleine Fläche – zum Beispiel einen Sitzplatz, Nachttisch oder Teil des Tisches."],
      ["Nimm alles von der Insel","Lege die Dinge direkt daneben oder in einen Behälter. Noch nichts sortieren."],
      ["Hol nur das Nötige zurück","Auf die Insel kommen nur Dinge, die dort wirklich gebraucht werden oder dir guttun."],
      ["Nutze deine Insel","Setz dich hin, stell ein Getränk ab oder atme einmal bewusst. Diese Fläche ist jetzt für dich da."]
    ]},
    "Jagd-Modus": { icon:"focus", text:"Du suchst immer nur eine Art von Dingen und blendest alles andere aus.", reason:"Ein klares Suchziel nimmt Entscheidungen aus dem nächsten Schritt.", steps:[
      ["Lege dein Suchziel fest","Suche nur nach einer Art von Dingen. Alles andere ist gerade unsichtbar."],
      ["Sammle eine Runde","Gehe ruhig durch den sichtbaren Bereich und sammle nur dein Suchziel ein."],
      ["Bring die Beute ans Ziel","Müll kommt zum Müll, Geschirr zur Küche, Wäsche zum Wäscheplatz. Noch nicht weiter bearbeiten."],
      ["Beende die Suche","Schau, was weniger geworden ist. Eine weitere Runde ist möglich, aber nicht nötig."]
    ]},
    "Parkplatz-Methode": { icon:"park", text:"Dinge ohne klaren Platz bekommen vorübergehend einen sicheren Sammelort.", reason:"Du musst jetzt keine dauerhaften Plätze erfinden, um weiterzukommen.", steps:[
      ["Bestimme einen Parkplatz","Nimm einen Korb, Karton oder eine freie Ecke als vorübergehenden Sammelort."],
      ["Sammle Dinge ohne Platz","Lege nur Dinge hinein, bei denen du gerade nicht weißt, wohin sie gehören."],
      ["Parke statt zu entscheiden","Du musst heute keine neuen Ordnungsregeln erfinden. Der Parkplatz ist eine gültige Zwischenlösung."],
      ["Mach den Parkplatz sichtbar","Stell ihn so ab, dass er nicht stört und später wiedergefunden wird. Damit ist der Schritt abgeschlossen."]
    ]},
    "Raum-Reset": { icon:"home", text:"Wir bringen einen Raum schrittweise zurück in einen benutzbaren Zustand.", reason:"Ein Raum braucht gerade Halt – wir richten den Blick nur dorthin.", steps:[
      ["Erinnere dich an den Raum","Wofür soll dieser Raum zuerst wieder benutzbar sein? Wähle nur eine Funktion."],
      ["Öffne den Weg","Entferne nur das, was den Laufweg oder die gewählte Nutzung direkt blockiert."],
      ["Sammle klare Kategorien","Nimm Müll, Geschirr oder Wäsche mit. Dinge mit unklarem Platz dürfen gesammelt liegen bleiben."],
      ["Stelle die Funktion her","Mach genau den Platz nutzbar, den du brauchst. Der Raum muss nicht fertig aussehen."]
    ]},
    "Sichtbarer Erfolg": { icon:"light", text:"Du veränderst eine Stelle, deren Wirkung du sofort sehen und spüren kannst.", reason:"Ein deutliches Vorher und Nachher kann den Einstieg heute leichter machen.", steps:[
      ["Wähle eine gut sichtbare Stelle","Nimm eine kleine Fläche, die dir häufig ins Auge fällt. Begrenze sie klar."],
      ["Räume die Fläche frei","Alles darf zunächst direkt daneben oder in einen Sammelbehälter. Noch nicht sortieren."],
      ["Gib der Fläche Ruhe","Stelle höchstens ein bis drei nützliche oder schöne Dinge zurück."],
      ["Nimm die Veränderung wahr","Schau aus etwas Abstand hin. Die sichtbare Wirkung zählt – nicht, was noch offen ist."]
    ]}
  };

  const state = { screen:"welcome", question:0, answers:{}, step:0, completed:0, round:0, effect:"", paused:false };
  const app = document.querySelector("#app");
  let lastReset = null;
  try { lastReset = JSON.parse(localStorage.getItem("neurohome-reset:last-success") || "null"); } catch (_) {}

  const esc = value => String(value).replace(/[&<>"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  function icon(kind="home", size=30) {
    const base = `width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" aria-hidden="true"`;
    if (["spark","light"].includes(kind)) return `<svg ${base}><path d="M16 3.8c.5 5.8 3.2 8.5 8.9 9.1-5.7.6-8.4 3.3-8.9 9.2-.5-5.9-3.2-8.6-8.9-9.2 5.7-.6 8.4-3.3 8.9-9.1Z" stroke="currentColor" stroke-width="1.8"/><circle cx="25" cy="23" r="2.2" fill="currentColor"/></svg>`;
    if (kind === "island") return `<svg ${base}><path d="M5 21c5-2.4 17-2.4 22 0M9 17.2c1.8-4.3 12.2-4.3 14 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="11" r="2.4" fill="currentColor"/></svg>`;
    if (kind === "focus") return `<svg ${base}><circle cx="16" cy="16" r="9.5" stroke="currentColor" stroke-width="1.8"/><circle cx="16" cy="16" r="3" fill="currentColor"/><path d="M16 2v4M30 16h-4M16 30v-4M2 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
    if (kind === "park") return `<svg ${base}><path d="M8 25V7h8.2a6 6 0 0 1 0 12H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 11v4h4a2 2 0 1 0 0-4h-4Z" fill="currentColor"/></svg>`;
    return `<svg ${base}><path d="M5.5 15.2 16 6l10.5 9.2v10.3H19v-6.8h-6v6.8H5.5V15.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M23.8 8.2v4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  }
  function pathLine(progress=0) { return `<div class="path-line" aria-hidden="true"><svg viewBox="0 0 360 38" preserveAspectRatio="none"><path d="M3 25C48 5 75 34 119 20s72-10 109 1 82 8 129-8"/></svg><span class="path-dot" style="left:${Math.max(7,Math.min(93,8+progress*21))}%"></span></div>`; }
  function methodName() {
    const a = state.answers;
    if (a.home === "ich brauche einen sichtbaren Erfolg") return "Sichtbarer Erfolg";
    if (a.problem === "Sachen ohne Platz" || a.home === "ich finde Dinge nicht") return "Parkplatz-Methode";
    if (["Müll","Geschirr","Wäsche"].includes(a.problem)) return "Jagd-Modus";
    if (a.home === "ein Raum kippt gerade" && a.state !== "sehr erschöpft") return "Raum-Reset";
    if (a.problem === "volle Flächen" || a.state === "blockiert") return "Insel-Methode";
    return "Rapid Reset";
  }
  function header() { return `<header class="brand-bar"><button class="brand" data-action="reset" aria-label="Zur Startseite"><span class="brand-mark">${icon("home",22)}</span><span>NeuroHome <b>Reset</b></span></button>${state.screen !== "welcome" ? '<span class="quiet-label">Ein Schritt nach dem anderen</span>' : ""}</header>`; }
  function welcome() { return `<div class="screen welcome-screen"><div class="hero-symbol" aria-hidden="true"><span class="house-halo">${icon("home",52)}</span><span class="mini-spark">${icon("spark",25)}</span></div><div class="welcome-copy"><p class="eyebrow">Dein Zuhause. Dein Tempo.</p><h1>NeuroHome<br><em>Reset</em></h1><p class="subtitle">Ordnung. Orientierung.<br>Neue Leichtigkeit.</p></div>${pathLine(0)}<div class="welcome-action"><p>Du musst nicht wissen, wo du anfangen sollst.<br>Wir finden gemeinsam einen kleinen Einstieg.</p><button class="primary-button" data-action="start">Reset starten <span aria-hidden="true">→</span></button><span class="no-pressure">Keine Bewertung · Kein Zeitdruck</span>${lastReset ? `<span class="last-reset">Zuletzt geschafft: ${esc(lastReset.method)} · ${lastReset.steps} ${lastReset.steps===1?"Schritt":"Schritte"}</span>` : ""}</div></div>`; }
  function checkin() { const q=questions[state.question]; return `<div class="screen checkin-screen"><div class="progress-row"><button class="back-button" data-action="back" aria-label="Zurück">←</button><span>${state.question+1} von ${questions.length}</span><span class="progress-track"><i style="width:${((state.question+1)/questions.length)*100}%"></i></span></div><div class="question-copy"><p class="eyebrow">${q.eyebrow}</p><h2>${q.title}</h2><p>${q.hint}</p></div><div class="option-list" role="radiogroup" aria-label="${q.title}">${q.options.map(option=>`<button class="option-card ${state.answers[q.id]===option?"selected":""}" data-answer="${esc(option)}" role="radio" aria-checked="${state.answers[q.id]===option}"><span>${option}</span><i aria-hidden="true"></i></button>`).join("")}</div><p class="skip-note">Du darfst „Ich weiß es nicht“ wählen.</p></div>`; }
  function result() { const name=methodName(), m=methods[name]; return `<div class="screen result-screen"><p class="eyebrow">Dein nächster guter Schritt</p><div class="result-icon">${icon(m.icon,42)}</div><div class="result-copy"><span>Für jetzt passend</span><h2>${name}</h2><p>${m.text}</p></div><div class="reason-card"><span class="reason-spark">${icon("spark",22)}</span><p><b>Warum diese Methode?</b>${m.reason}</p></div>${pathLine(4)}<button class="primary-button" data-action="guide">Begleitung starten <span aria-hidden="true">→</span></button><button class="text-button" data-action="redo">Check-in neu machen</button></div>`; }
  function guide() { const name=methodName(), m=methods[name], current=m.steps[state.step]; return `<div class="screen guide-screen"><div class="guide-meta"><span>${name}</span><span>Schritt ${state.step+1} von ${m.steps.length}</span></div><div class="guide-progress"><i style="width:${((state.step+1)/m.steps.length)*100}%"></i></div><div class="step-symbol">${icon(state.step===m.steps.length-1?"spark":m.icon,46)}</div><div class="step-copy"><p class="eyebrow">Nur das hier</p><h2>${current[0]}</h2><p>${current[1]}</p></div><div class="permission-card">${icon("light",21)}<span>Du darfst nach diesem Schritt aufhören.</span></div><div class="guide-actions"><button class="primary-button" data-action="done">Fertig <span aria-hidden="true">✓</span></button><button class="secondary-button" data-action="round">Noch eine Runde <span aria-hidden="true">↻</span></button><button class="pause-button" data-action="pause">Pause</button></div>${state.paused?`<div class="pause-overlay" role="dialog" aria-modal="true" aria-labelledby="pause-title"><div class="pause-card"><div class="pause-icon">Ⅱ</div><p class="eyebrow">Pause ist Teil des Weges</p><h2 id="pause-title">Kurz anhalten</h2><p>Der aktuelle Schritt bleibt hier. Du entscheidest, ob und wann es weitergeht.</p><button class="primary-button" data-action="resume">Weiter, wenn es passt</button><button class="text-button" data-action="finish">Für heute abschließen</button></div></div>`:""}</div>`; }
  function complete() { const name=methodName(); return `<div class="screen complete-screen"><div class="completion-spark">${icon("spark",48)}</div><p class="eyebrow">Für heute geschafft</p><h2>Etwas ist jetzt<br><em>leichter als vorher.</em></h2><p class="complete-note">Nicht alles musste fertig werden. Du hast einen Weg begonnen und ${state.completed} ${state.completed===1?"Schritt":"Schritte"} geschafft.</p><div class="success-summary"><div><span>Methode</span><b>${name}</b></div><div><span>Geschaffte Schritte</span><b>${state.completed}</b></div></div><fieldset class="effect-field"><legend>Wie wirkt es gerade?</legend><div class="effect-options">${["leichter","ruhiger","klarer","noch gleich"].map(value=>`<button type="button" class="${state.effect===value?"active":""}" data-effect="${value}">${value}</button>`).join("")}</div></fieldset>${state.effect?'<p class="saved-note"><span>✓</span> Für dich auf diesem Gerät gespeichert</p>':'<p class="save-hint">Ein kurzer Eindruck reicht. Du musst nichts erklären.</p>'}<button class="primary-button" data-action="reset">Zurück nach Hause <span aria-hidden="true">⌂</span></button></div>`; }
  function render() { app.innerHTML=header()+({welcome,checkin,result,guide,complete}[state.screen]()); }
  function reset() { Object.assign(state,{screen:"welcome",question:0,answers:{},step:0,completed:0,round:0,effect:"",paused:false}); render(); }

  app.addEventListener("click", event => {
    const answer=event.target.closest("[data-answer]");
    if (answer) { const q=questions[state.question]; state.answers[q.id]=answer.dataset.answer; render(); setTimeout(()=>{ if(state.question<questions.length-1) state.question++; else state.screen="result"; render(); },120); return; }
    const effect=event.target.closest("[data-effect]");
    if (effect) { state.effect=effect.dataset.effect; lastReset={method:methodName(),steps:state.completed,effect:state.effect,savedAt:new Date().toISOString()}; try{localStorage.setItem("neurohome-reset:last-success",JSON.stringify(lastReset));}catch(_){} render(); return; }
    const button=event.target.closest("[data-action]"); if(!button) return;
    const action=button.dataset.action;
    if(action==="reset") reset();
    if(action==="start") { state.screen="checkin"; render(); }
    if(action==="back") { if(state.question>0) state.question--; else state.screen="welcome"; render(); }
    if(action==="redo") { state.question=0; state.screen="checkin"; render(); }
    if(action==="guide") { state.step=0; state.completed=0; state.screen="guide"; render(); }
    if(action==="done") { state.completed++; const count=methods[methodName()].steps.length; if(state.step<count-1) state.step++; else state.screen="complete"; render(); }
    if(action==="round") { state.completed++; state.round++; render(); }
    if(action==="pause") { state.paused=true; render(); }
    if(action==="resume") { state.paused=false; render(); }
    if(action==="finish") { state.paused=false; state.screen="complete"; render(); }
  });
  render();
})();
