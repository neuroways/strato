(() => {
"use strict";

const API_BASE="../NB_Kartenraum_Backend_v0.6.3/api";
const CARD_BASE="/modules/kartenraum/cards/";
const STORAGE_KEY="nb_kartenraum_frontend_v070";

let state=loadState();
let cards=[];
let currentCard=null;
let currentText=null;
let currentKnowledge=null;
let currentDrawId=null;
let currentOrientation=null;
let audience=state.audience||"ADULT";
let filter="all";
let drawInProgress=false;
let viewerRotatedForReading=false;
let currentView="intro";
let diaryItem=null;
let diaryCard=null;
let noteDepthCode=null;
let noteDepthLabel=null;
let noteEntryType="THOUGHT";
let editingJournalEntry=null;
let editingEntryType=null;

const el=id=>document.getElementById(id);

function loadState(){
  try{
    // migrate prior frontend login state if v0.7.0 state doesn't exist
    const own=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
    if(own)return own;
    const old=JSON.parse(localStorage.getItem("nb_kartenraum_frontend_v060")||"null");
    return old||{};
  }catch{return{}}
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function bgPos(pos){const i=Number(pos)-1;return `${(i%3)*50}% ${Math.floor(i/3)*100}%`}
function setCrop(node,sheet,pos){
  if(!node||!sheet||!pos)return;
  node.style.backgroundImage=`url("${CARD_BASE}${sheet}")`;
  node.style.backgroundSize="300% 200%";
  node.style.backgroundPosition=bgPos(pos);
}
function orientationLabel(value=currentOrientation){return value==="REVERSED"?"Umgekehrt gezogen":"Aufrecht gezogen"}
function setMiniCrop(node,card,orientation){
  if(!node||!card)return;
  setCrop(node,card.sheet_name,card.sheet_position);
  node.style.transform=orientation==="REVERSED"?"rotate(180deg)":"rotate(0deg)";
}
function greeting(){
  const h=new Date().getHours();
  return h<11?"Guten Morgen.":h<18?"Guten Tag.":"Guten Abend.";
}
function setGreetings(){
  el("landingGreeting").textContent=greeting();
  el("homeGreeting").textContent=greeting();
}

async function get(path,auth=false){
  const headers={Accept:"application/json"};
  if(auth&&state.session_token)headers.Authorization=`Bearer ${state.session_token}`;
  const r=await fetch(`${API_BASE}/${path}`,{headers});
  const d=await r.json().catch(()=>({}));
  if(!r.ok||d.status!=="ok")throw new Error(d.message||d.error||`API ${r.status}`);
  return d;
}
async function post(path,payload,auth=false){
  const headers={"Content-Type":"application/json",Accept:"application/json"};
  if(auth&&state.session_token)headers.Authorization=`Bearer ${state.session_token}`;
  const r=await fetch(`${API_BASE}/${path}`,{method:"POST",headers,body:JSON.stringify(payload)});
  const d=await r.json().catch(()=>({}));
  if(!r.ok||d.status!=="ok")throw new Error(d.message||d.error||`API ${r.status}`);
  return d;
}

function hidePrivate(){
  ["homeScreen","appRoot","reviewScreen","journalScreen"].forEach(id=>el(id).hidden=true);
}
function showIntro(){
  currentView="intro";
  el("introScreen").hidden=false;el("accessScreen").hidden=true;el("profileGate").hidden=true;el("appHeader").hidden=true;hidePrivate();
  scrollTo(0,0);
}
function showAccess(){
  currentView="access";
  el("introScreen").hidden=true;el("accessScreen").hidden=false;el("profileGate").hidden=true;el("appHeader").hidden=true;hidePrivate();
  scrollTo(0,0);
}
function showGate(mode){
  currentView="gate";
  el("introScreen").hidden=true;el("accessScreen").hidden=true;el("profileGate").hidden=false;el("appHeader").hidden=true;hidePrivate();
  el("profileCreateForm").hidden=mode!=="create";
  el("profileLoginForm").hidden=mode!=="login";
  el("accessSaveStep").hidden=true;
  scrollTo(0,0);
}
function showPrivate(view){
  currentView=view;
  el("introScreen").hidden=true;el("accessScreen").hidden=true;el("profileGate").hidden=true;el("appHeader").hidden=false;hidePrivate();
  el("profileName").textContent=state.username||"";
  if(view==="home")el("homeScreen").hidden=false;
  if(view==="flow")el("appRoot").hidden=false;
  if(view==="review")el("reviewScreen").hidden=false;
  if(view==="journal")el("journalScreen").hidden=false;
  scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
}
function showHome(){showPrivate("home")}
function showFlow(){
  showPrivate("flow");
  setFlowStep("draw");
  showIdleCardBack();
}
function setFlowStep(step){
  ["draw","perception","meaning"].forEach(key=>el("step"+key[0].toUpperCase()+key.slice(1)).hidden=key!==step);
  document.querySelectorAll("[data-step-indicator]").forEach(n=>n.classList.toggle("active",n.dataset.stepIndicator===step));
  scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
function showIdleCardBack(){
  setCrop(el("backCrop"),"SheetR.png",5);
  el("frontCrop").style.backgroundImage="none";
  el("flip").classList.remove("revealed");
  el("frontCrop").classList.remove("drawn-reversed","view-upright");
  el("orientationNotice").hidden=true;
  el("turnForViewing").hidden=true;
  el("cardTitle").textContent="Die Rückseite wartet auf dich.";
  el("cardTech").textContent="";
  el("cardTouchTarget").classList.remove("has-drawn","touching","reveal-lift");
  el("touchLabel").textContent="✦ Berühre die Karte";
}

async function createProfile(){
  const username=el("newUsername").value.trim();
  const aud=document.querySelector('input[name="newAudience"]:checked')?.value||"ADULT";
  try{
    const r=await post("profile-create.php",{username,audience_code:aud});
    const p=r.profile;
    Object.assign(state,{username:p.username,audience:p.audience_code,profile_id:p.profile_id,session_token:p.session_token});
    audience=p.audience_code;saveState();
    el("createdUsername").textContent=p.username;
    el("createdCode").textContent=p.access_code;
    el("accessPackage").value=`NeuroBalance Kartenraum\nNutzername: ${p.username}\nCode: ${p.access_code}`;
    el("profileCreateForm").hidden=true;el("accessSaveStep").hidden=false;el("profileError").textContent="";
  }catch(e){
    el("profileError").textContent=e.message==="USERNAME_UNAVAILABLE"?"Dieser Nutzername ist bereits vergeben.":"Der Kartenraum konnte nicht angelegt werden.";
  }
}
async function loginProfile(){
  try{
    const r=await post("login.php",{username:el("loginUsername").value.trim(),access_code:el("loginCode").value.trim()});
    const p=r.profile;
    Object.assign(state,{username:p.username,audience:p.audience_code,profile_id:p.profile_id,session_token:p.session_token});
    audience=p.audience_code;saveState();await loadRoomPreferences();
    await loadCards();el("loginError").textContent="";showHome();
  }catch(e){el("loginError").textContent="Nutzername und Code konnten nicht geöffnet werden."}
}
async function copyAccess(){
  try{await navigator.clipboard.writeText(el("accessPackage").value)}
  catch{el("accessPackage").select();document.execCommand("copy")}
  el("copyMsg").textContent="Zugang kopiert.";
}
async function confirmSaved(){
  if(!el("accessSavedCheck").checked){el("copyMsg").textContent="Bitte bestätige zuerst, dass du den Zugang gespeichert hast.";return}
  audience=state.audience||"ADULT";await loadCards();showHome();
}

async function loadCards(){
  const r=await get("cards.php");
  cards=r.cards||[];
}
function pool(){
  if(filter==="all")return cards;
  if(filter==="major")return cards.filter(c=>c.arcana_code==="major");
  return cards.filter(c=>c.suit_code===filter);
}
function findCard(id){return cards.find(c=>c.card_id===id)||null}


function showTouchRipple(clientX,clientY){
  const target=el("cardTouchTarget");
  const ripple=el("touchRipple");
  const rect=target.getBoundingClientRect();
  const x=(clientX ?? (rect.left+rect.width/2))-rect.left;
  const y=(clientY ?? (rect.top+rect.height/2))-rect.top;
  ripple.style.left=`${x}px`;
  ripple.style.top=`${y}px`;
  ripple.classList.remove("active");
  void ripple.offsetWidth;
  ripple.classList.add("active");
}
function pressCard(clientX,clientY){
  if(drawInProgress)return;
  el("cardTouchTarget").classList.add("touching");
  showTouchRipple(clientX,clientY);
}
function releaseCard(clientX,clientY){
  if(drawInProgress)return;
  el("cardTouchTarget").classList.remove("touching");
  el("cardTouchTarget").classList.add("reveal-lift");
  setTimeout(()=>el("cardTouchTarget").classList.remove("reveal-lift"),650);
  drawRandom();
}

async function drawRandom(){
  if(drawInProgress)return;
  const p=pool();
  if(!p.length)return;
  drawInProgress=true;
  el("cardTouchTarget").classList.add("has-drawn");
  currentCard=p[Math.floor(Math.random()*p.length)];
  currentOrientation=Math.random()<.5?"UPRIGHT":"REVERSED";
  currentText=null;currentKnowledge=null;
  try{
    const r=await post("draw-create.php",{card_id:currentCard.card_id,orientation_code:currentOrientation},true);
    currentDrawId=r.draw.draw_id;
    setCrop(el("frontCrop"),currentCard.sheet_name,currentCard.sheet_position);
    el("flip").classList.remove("revealed");
    el("cardTitle").textContent="Deine Karte wird gezogen …";
    el("magicOverlay").hidden=false;el("magicOverlay").classList.remove("active");void el("magicOverlay").offsetWidth;el("magicOverlay").classList.add("active");

    const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
    await new Promise(r=>setTimeout(r,reduce?90:1150));

    el("frontCrop").classList.remove("drawn-reversed","view-upright");
    if(currentOrientation==="REVERSED")el("frontCrop").classList.add("drawn-reversed");
    el("flip").classList.add("revealed");
    el("cardTitle").textContent=currentCard.title_de;
    if(currentOrientation==="REVERSED"){
      el("orientationNotice").hidden=false;el("orientationNotice").textContent="Umgekehrt gezogen";
      el("turnForViewing").hidden=false;
    }

    await new Promise(r=>setTimeout(r,reduce?40:1100));
    setMiniCrop(el("perceptionMiniCrop"),currentCard,currentOrientation);
    el("perceptionCardTitle").textContent=currentCard.title_de;
    el("perceptionOrientation").textContent=orientationLabel();
    el("perception").value="";el("saveMsg").textContent="";
    el("magicOverlay").classList.remove("active");el("magicOverlay").hidden=true;
    setFlowStep("perception");
  }catch(e){
    el("cardTitle").textContent="Die Karte konnte nicht gezogen werden.";
  }finally{drawInProgress=false}
}
function turnForViewing(){
  el("frontCrop").classList.toggle("view-upright");
  el("orientationNotice").textContent="Umgekehrt gezogen · zur Betrachtung gedreht";
}

async function savePerception(){
  const value=el("perception").value.trim();
  if(!value){el("saveMsg").textContent="Halte zuerst einen Gedanken zur Karte fest.";return}
  try{
    el("saveMsg").textContent="Wird gespeichert …";
    await post("perception-save.php",{draw_id:currentDrawId,perception_text:value},true);
    el("saveMsg").textContent="Gespeichert.";
    await prepareMeaning();
    setFlowStep("meaning");
  }catch(e){el("saveMsg").textContent="Speichern nicht möglich: "+e.message}
}

async function prepareMeaning(){
  setMiniCrop(el("meaningMiniCrop"),currentCard,currentOrientation);
  el("meaningCardTitle").textContent=currentCard.title_de;
  el("meaningOrientation").textContent=orientationLabel();

  // Both data sources are intentionally kept separate:
  // nb_card_text = reflective room; nb_card_knowledge = layered tarot knowledge.
  const [textRes,knowledgeRes]=await Promise.allSettled([
    get(`text.php?id=${encodeURIComponent(currentCard.card_id)}&audience=${audience}&language=de`),
    get(`knowledge.php?id=${encodeURIComponent(currentCard.card_id)}&audience=${audience}&language=de`)
  ]);

  currentText=textRes.status==="fulfilled"?textRes.value.text:null;
  currentKnowledge=knowledgeRes.status==="fulfilled"?knowledgeRes.value.knowledge:null;

  const q=currentKnowledge?.reflection_question || currentText?.own_card_language || "Welche Frage öffnet diese Karte für dich?";
  const m=currentKnowledge?.everyday_moment || currentText?.possible_next_step || "Vielleicht bemerkst du heute einen Moment, in dem dieses Thema auftaucht.";
  el("knowledgeQuestion").textContent=q;
  el("knowledgeMoment").textContent=m;

  el("interpretationContent").innerHTML=currentText?renderReflectiveText(currentText):renderKnowledgeMeaning(currentKnowledge);
  el("knowledgeContent").innerHTML=renderKnowledgeDetail(currentKnowledge,currentOrientation);
  collapseDepths();
}
function renderReflectiveText(t){
  return `<div class="text-section"><h3>${esc(t.subtitle||t.title||"Mehr erfahren")}</h3><p>${esc(t.card_room||t.meaning_text||"")}</p></div>
  ${t.helpful_side?`<div class="text-section"><h3>Was tragen könnte</h3><p>${esc(t.helpful_side)}</p></div>`:""}
  ${t.difficult_side?`<div class="text-section"><h3>Was schwierig sein könnte</h3><p>${esc(t.difficult_side)}</p></div>`:""}`;
}
function renderKnowledgeMeaning(k){
  if(!k)return `<p class="status">Für diese Karte konnte gerade kein weiterer Text geladen werden.</p>`;
  return `<div class="text-section"><h3>${esc(k.theme||"Bedeutung")}</h3><p>${esc(k.meaning_text||"")}</p></div>`;
}
function renderKnowledgeDetail(k,orientation){
  if(!k)return `<p class="status">Detailwissen konnte gerade nicht geladen werden.</p>`;
  const chips=(k.keywords||[]).map(x=>`<span class="keyword-chip">${esc(x)}</span>`).join("");
  const reverse=orientation==="REVERSED"&&k.other_direction_text
    ? `<div class="text-section"><h3>Deine andere Blickrichtung</h3><p>${esc(k.other_direction_text)}</p></div>`
    : k.other_direction_text?`<div class="text-section"><h3>Andere Blickrichtung</h3><p>${esc(k.other_direction_text)}</p></div>`:"";
  return `${chips?`<div class="keyword-list">${chips}</div>`:""}
    ${k.meaning_text?`<div class="text-section"><h3>Bedeutung</h3><p>${esc(k.meaning_text)}</p></div>`:""}
    ${k.symbolism_text?`<div class="text-section"><h3>Symbolik</h3><p>${esc(k.symbolism_text)}</p></div>`:""}
    ${reverse}`;
}
function collapseDepths(){
  ["meaningDepth","detailDepth"].forEach(id=>el(id).hidden=true);
  ["toggleMeaning","toggleDetail"].forEach(id=>{el(id).setAttribute("aria-expanded","false");el(id).querySelector("i").textContent="＋"});
}
function toggleDepth(buttonId,panelId){
  const panel=el(panelId),btn=el(buttonId),open=panel.hidden;
  panel.hidden=!open;btn.setAttribute("aria-expanded",String(open));btn.querySelector("i").textContent=open?"−":"＋";
}
function newDraw(){
  currentCard=currentText=currentKnowledge=null;currentDrawId=currentOrientation=null;
  el("perception").value="";
  setFlowStep("draw");showIdleCardBack();
}


/* review */
async function showReview(){
  showPrivate("review");
  const box=el("reviewContent");
  box.innerHTML='<p class="status">Letzte Ziehung wird geladen …</p>';
  try{
    const r=await get("journal.php",true);
    const item=(r.items||[])[0];
    if(!item){
      box.innerHTML=`<div class="review-perception"><small>Noch kein Rückblick möglich</small><p>Zieh zuerst eine Karte und speichere deine Wahrnehmung.</p></div>`;
      return;
    }
    const card=findCard(item.card_id);
    const date=new Date(String(item.drawn_at).replace(" ","T"));
    const dateText=Number.isNaN(date.getTime())
      ? esc(item.drawn_at)
      : new Intl.DateTimeFormat("de-DE",{dateStyle:"long",timeStyle:"short"}).format(date);

    box.innerHTML=`
      <article class="review-card">
        <button class="review-card-visual card-preview-button" id="reviewCardOpen" aria-label="Karte groß ansehen">
          <div class="mini-crop" id="reviewCardCrop"></div>
          <span class="zoom-badge">⤢</span>
        </button>
        <div class="review-card-copy">
          <div class="eyebrow">DEINE LETZTE KARTE</div>
          <h2>${esc(item.title_de)}</h2>
          <div class="review-meta">
            <span class="review-chip">${dateText}</span>
            <span class="review-chip">${orientationLabel(item.orientation_code)}</span>
          </div>
          <div class="review-perception">
            <small>Was du damals zuerst wahrgenommen hast</small>
            <p>${item.perception_text?esc(item.perception_text):"Zu dieser Ziehung wurde noch keine Wahrnehmung gespeichert."}</p>
          </div>
          <div class="review-actions">
            <button class="secondary full" id="reviewOpenJournal">Im Journal öffnen</button>
            <button class="primary full" id="reviewNewDraw">Neue Karte ziehen</button>
          </div>
        </div>
      </article>`;
    if(card){
      setMiniCrop(el("reviewCardCrop"),card,item.orientation_code);
      el("reviewCardOpen").onclick=()=>{
        currentCard=card;
        currentOrientation=item.orientation_code;
        openCardViewer();
      };
    }
    el("reviewOpenJournal").onclick=()=>showJournal(true);
    el("reviewNewDraw").onclick=showFlow;
  }catch(e){
    box.innerHTML='<p class="status">Der Rückblick konnte gerade nicht geladen werden.</p>';
  }
}

/* journal */
async function showJournal(focusLatest=false){
  showPrivate("journal");
  const list=el("journalList");
  list.innerHTML='<p class="status">Journal wird geladen …</p>';
  try{
    const r=await get("journal.php",true);
    const items=r.items||[];
    if(!items.length){list.innerHTML='<div class="journal-item"><div></div><div><h3>Noch keine Ziehung gespeichert</h3><p class="journal-perception">Deine erste gespeicherte Wahrnehmung erscheint später hier.</p></div></div>';return}
    list.innerHTML=items.map((item,i)=>{
      const card=findCard(item.card_id);
      const date=new Date(String(item.drawn_at).replace(" ","T"));
      const dateText=Number.isNaN(date.getTime())?esc(item.drawn_at):new Intl.DateTimeFormat("de-DE",{dateStyle:"medium",timeStyle:"short"}).format(date);
      return `<article class="journal-item" role="button" tabindex="0" data-journal-index="${i}" ${focusLatest&&i===0?'data-latest="true"':""}>
        <div class="journal-mini"><div class="mini-crop" data-sheet="${esc(card?.sheet_name||"")}" data-pos="${esc(card?.sheet_position||"")}" data-orientation="${esc(item.orientation_code)}"></div></div>
        <div><time>${dateText}</time><h3>${esc(item.title_de)}</h3><span class="journal-orientation">${orientationLabel(item.orientation_code)}</span>
        <p class="journal-perception">${item.perception_text?esc(item.perception_text):"Noch keine Wahrnehmung gespeichert."}</p></div><i>◌</i>
      </article>`;
    }).join("");
    list.querySelectorAll(".mini-crop[data-sheet]").forEach(node=>{
      if(node.dataset.sheet&&node.dataset.pos){
        setCrop(node,node.dataset.sheet,node.dataset.pos);
        if(node.dataset.orientation==="REVERSED")node.style.transform="rotate(180deg)";
      }
    });
    list.querySelectorAll("[data-journal-index]").forEach(node=>{
      const open=()=>openDiary(items[Number(node.dataset.journalIndex)]);
      node.addEventListener("click",open);
      node.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
    });
    if(focusLatest)list.querySelector('[data-latest="true"]')?.scrollIntoView({behavior:"smooth",block:"center"});
  }catch(e){
    list.innerHTML='<p class="status">Das Journal konnte gerade nicht geladen werden.</p>';
  }
}



/* journal note from current depth */
function depthSourceText(depthCode){
  if(depthCode==="QUESTION")return el("knowledgeQuestion").textContent.trim();
  if(depthCode==="MOMENT")return el("knowledgeMoment").textContent.trim();
  if(depthCode==="MEANING"){
    const node=el("interpretationContent");
    return node?.innerText?.trim().slice(0,700)||"Mehr erfahren";
  }
  if(depthCode==="SYMBOLISM"){
    const k=currentKnowledge;
    return k?.symbolism_text||"Symbolik dieser Karte";
  }
  if(depthCode==="OTHER_DIRECTION"){
    const k=currentKnowledge;
    return k?.other_direction_text||"Andere Blickrichtung dieser Karte";
  }
  return currentCard?.title_de||"Diese Ziehung";
}
function openDepthNote(depthCode,depthLabel){
  if(!currentDrawId||!currentCard)return;
  noteDepthCode=depthCode;
  noteDepthLabel=depthLabel;
  noteEntryType="THOUGHT";
  el("noteTitle").textContent="Gedanken festhalten";
  el("noteCardName").textContent=`${currentCard.title_de} · ${orientationLabel()}`;
  el("noteDepthLabel").textContent=depthLabel;
  el("noteSourceText").textContent=depthSourceText(depthCode);
  el("noteText").value="";
  el("noteSaveMsg").textContent="";
  document.querySelectorAll(".entry-type").forEach(b=>b.classList.toggle("active",b.dataset.entryType==="THOUGHT"));
  el("noteViewer").hidden=false;
  document.body.classList.add("note-open");
}
function closeDepthNote(){
  el("noteViewer").hidden=true;
  document.body.classList.remove("note-open");
  noteDepthCode=null;
  noteDepthLabel=null;
}
async function saveDepthNote(){
  if(!currentDrawId)return;
  const text=el("noteText").value.trim();
  if(!text){
    el("noteSaveMsg").textContent="Schreib zuerst etwas auf.";
    return;
  }
  const btn=el("noteSave");
  const old=btn.textContent;
  btn.disabled=true;
  btn.textContent="Wird gespeichert …";
  el("noteSaveMsg").textContent="";
  try{
    await post("journal-entry-save.php",{
      draw_id:currentDrawId,
      entry_type:noteEntryType,
      depth_code:noteDepthCode,
      entry_text:text
    },true);
    el("noteSaveMsg").textContent="Im Journal gespeichert.";
    setTimeout(closeDepthNote,450);
  }catch(e){
    const code=String(e.message||"");
    el("noteSaveMsg").textContent=
      code==="JOURNAL_ENTRY_EMPTY"?"Der Eintrag ist leer.":
      code==="JOURNAL_ENTRY_TOO_LONG"?"Der Eintrag ist zu lang.":
      code==="DRAW_NOT_FOUND"?"Diese Ziehung gehört nicht zu deinem Kartenraum.":
      code==="AUTH_REQUIRED"?"Deine Sitzung ist abgelaufen.":
      "Der Eintrag konnte gerade nicht gespeichert werden.";
  }finally{
    btn.disabled=false;
    btn.textContent=old;
  }
}

/* living diary per draw · server-persistent via Backend v0.6.0 */
function formatDiaryDate(raw){
  const d=new Date(String(raw||"").replace(" ","T"));
  return Number.isNaN(d.getTime())
    ? String(raw||"")
    : new Intl.DateTimeFormat("de-DE",{dateStyle:"long",timeStyle:"short"}).format(d);
}

async function fetchDiaryEntries(drawId){
  const r=await get(`journal-entry-list.php?draw_id=${encodeURIComponent(drawId)}`,true);
  return r.items||[];
}

function entryTypeLabel(v){
  return ({THOUGHT:"Gedanke",INSIGHT:"Erkenntnis",QUESTION:"Frage",GOAL:"Ziel",EXPERIENCE:"Erfahrung"})[v]||v;
}
function depthLabel(v){
  return ({QUESTION:"Eine Frage",MOMENT:"Ein Moment",MEANING:"Mehr erfahren",SYMBOLISM:"Symbolik",OTHER_DIRECTION:"Andere Blickrichtung"})[v]||v;
}
async function renderDiaryEntries(){
  if(!diaryItem)return;
  const box=el("diaryEntries");
  box.innerHTML='<p class="status">Erkenntnisse werden geladen …</p>';
  try{
    const entries=await fetchDiaryEntries(diaryItem.draw_id);
    if(!entries.length){
      box.innerHTML='<div class="diary-empty">Noch keine spätere Erkenntnis. Dieser Bereich wächst erst, wenn du zu einem späteren Zeitpunkt etwas zu dieser Ziehung ergänzen möchtest.</div>';
      return;
    }
    box._journalEntries=entries;
    box.innerHTML=entries.map(e=>`
      <article class="diary-entry" data-entry-id="${esc(e.journal_entry_id)}">
        <div class="diary-entry-actions">
          <button class="diary-entry-action edit" data-edit-entry="${esc(e.journal_entry_id)}" title="Bearbeiten" aria-label="Eintrag bearbeiten">✎</button>
          <button class="diary-entry-action delete" data-delete-entry="${esc(e.journal_entry_id)}" title="Löschen" aria-label="Eintrag löschen">×</button>
        </div>
        <time>${esc(formatDiaryDate(e.created_at))}</time>
        <div class="diary-entry-label">${esc(entryTypeLabel(e.entry_type))}${e.depth_code?` · ${esc(depthLabel(e.depth_code))}`:""}</div>
        <p>${esc(e.entry_text)}</p>
      </article>
    `).join("");
    box.querySelectorAll("[data-edit-entry]").forEach(btn=>{
      btn.onclick=()=>openEditJournalEntry(Number(btn.dataset.editEntry));
    });
    box.querySelectorAll("[data-delete-entry]").forEach(btn=>{
      btn.onclick=()=>deleteJournalEntry(Number(btn.dataset.deleteEntry));
    });
  }catch(e){
    box.innerHTML='<p class="status">Die späteren Erkenntnisse konnten gerade nicht geladen werden.</p>';
  }
}

async function openDiary(item){
  diaryItem=item;
  diaryCard=findCard(item.card_id);
  el("diaryTitle").textContent=item.title_de||diaryCard?.title_de||"Deine Karte";
  el("diaryDate").textContent=formatDiaryDate(item.drawn_at);
  el("diaryOrientation").textContent=orientationLabel(item.orientation_code);
  el("diaryPerception").textContent=item.perception_text||"Zu dieser Ziehung wurde keine erste Wahrnehmung gespeichert.";
  if(diaryCard)setMiniCrop(el("diaryCardCrop"),diaryCard,item.orientation_code);
  el("diaryNewText").value="";
  el("diarySaveMsg").textContent="";
  el("diaryViewer").hidden=false;
  document.body.classList.add("diary-open");
  await renderDiaryEntries();
}

function closeDiary(){
  el("diaryViewer").hidden=true;
  document.body.classList.remove("diary-open");
  diaryItem=null;
  diaryCard=null;
}

async function saveDiaryEntry(){
  if(!diaryItem)return;
  const text=el("diaryNewText").value.trim();
  if(!text){
    el("diarySaveMsg").textContent="Schreib zuerst deine neue Erkenntnis auf.";
    return;
  }

  const button=el("diarySave");
  const oldText=button.textContent;
  button.disabled=true;
  button.textContent="Wird gespeichert …";
  el("diarySaveMsg").textContent="";

  try{
    await post("journal-entry-save.php",{
      draw_id:diaryItem.draw_id,
      entry_type:"EXPERIENCE",
      depth_code:null,
      entry_text:text
    },true);

    el("diaryNewText").value="";
    el("diarySaveMsg").textContent="Eintrag in deinem Kartenraum gespeichert.";
    await renderDiaryEntries();
  }catch(e){
    const code=String(e.message||"");
    const msg=
      code==="EXPERIENCE_EMPTY" ? "Der Eintrag ist noch leer." :
      code==="EXPERIENCE_TOO_LONG" ? "Der Eintrag ist zu lang." :
      code==="DRAW_NOT_FOUND" ? "Diese Ziehung gehört nicht zu deinem aktuellen Kartenraum." :
      code==="AUTH_REQUIRED" ? "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an." :
      "Der Eintrag konnte gerade nicht gespeichert werden.";
    el("diarySaveMsg").textContent=msg;
  }finally{
    button.disabled=false;
    button.textContent=oldText;
  }
}

function openDiaryCard(){
  if(!diaryCard||!diaryItem)return;
  currentCard=diaryCard;
  currentOrientation=diaryItem.orientation_code;
  openCardViewer();
}


/* edit/delete journal ownership */
function currentDiaryEntries(){
  return el("diaryEntries")._journalEntries||[];
}
function openEditJournalEntry(id){
  const entry=currentDiaryEntries().find(x=>Number(x.journal_entry_id)===Number(id));
  if(!entry)return;
  editingJournalEntry=entry;
  editingEntryType=entry.entry_type;
  el("editEntryText").value=entry.entry_text||"";
  el("editEntryMsg").textContent="";
  document.querySelectorAll("[data-edit-type]").forEach(b=>b.classList.toggle("active",b.dataset.editType===editingEntryType));
  el("editEntryViewer").hidden=false;
  document.body.classList.add("note-open");
}
function closeEditJournalEntry(){
  el("editEntryViewer").hidden=true;
  document.body.classList.remove("note-open");
  editingJournalEntry=null;editingEntryType=null;
}
async function saveEditedJournalEntry(){
  if(!editingJournalEntry)return;
  const text=el("editEntryText").value.trim();
  if(!text){el("editEntryMsg").textContent="Der Eintrag darf nicht leer sein.";return}
  const btn=el("editEntrySave"),old=btn.textContent;btn.disabled=true;btn.textContent="Wird gespeichert …";
  try{
    await post("journal-entry-update.php",{
      journal_entry_id:editingJournalEntry.journal_entry_id,
      entry_type:editingEntryType,
      depth_code:editingJournalEntry.depth_code,
      entry_text:text
    },true);
    closeEditJournalEntry();
    await renderDiaryEntries();
  }catch(e){el("editEntryMsg").textContent="Die Änderung konnte gerade nicht gespeichert werden."}
  finally{btn.disabled=false;btn.textContent=old}
}
async function deleteJournalEntry(id){
  const entry=currentDiaryEntries().find(x=>Number(x.journal_entry_id)===Number(id));
  if(!entry)return;
  if(!confirm("Diesen Journaleintrag wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."))return;
  try{
    await post("journal-entry-delete.php",{journal_entry_id:id},true);
    await renderDiaryEntries();
  }catch(e){alert("Der Eintrag konnte gerade nicht gelöscht werden.")}
}
async function logout(){
  const token=state.session_token;
  try{
    if(token)await post("logout.php",{},true);
  }catch(e){
    // Lokale Abmeldung wird trotzdem durchgeführt.
  }
  state={};
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("nb_kartenraum_frontend_v060");
  audience="ADULT";
  cards=[];currentCard=null;currentText=null;currentKnowledge=null;currentDrawId=null;currentOrientation=null;
  el("loginUsername").value="";
  el("loginCode").value="";
  showIntro();
}

let roomPreferences={card_audience_code:"ADULT",ui_language_mode:"DETAILED",visual_mode:"NIGHT"};
function applyRoomPreferences(){document.body.dataset.visualMode=roomPreferences.visual_mode;document.body.dataset.languageMode=roomPreferences.ui_language_mode;audience=roomPreferences.card_audience_code;document.querySelectorAll(".segmented[data-pref]").forEach(g=>g.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.value===roomPreferences[g.dataset.pref])));}
async function loadRoomPreferences(){try{const r=await get("profile-preferences.php",true);roomPreferences={...roomPreferences,...r.preferences};applyRoomPreferences()}catch(e){}}
async function setRoomPreference(k,v){const old={...roomPreferences};roomPreferences[k]=v;applyRoomPreferences();el("preferencesMsg").textContent="Wird gespeichert …";try{const r=await post("profile-preferences.php",roomPreferences,true);roomPreferences={...roomPreferences,...r.preferences};applyRoomPreferences();el("preferencesMsg").textContent="Im Profil gespeichert."}catch(e){roomPreferences=old;applyRoomPreferences();el("preferencesMsg").textContent="Konnte nicht gespeichert werden.";}}
document.querySelectorAll(".segmented[data-pref] button").forEach(b=>b.onclick=()=>setRoomPreference(b.closest(".segmented").dataset.pref,b.dataset.value));

/* viewer */
function openCardViewer(){
  if(!currentCard)return;
  el("viewerCardTitle").textContent=currentCard.title_de;
  el("viewerOrientation").textContent=orientationLabel();
  setCrop(el("viewerCardCrop"),currentCard.sheet_name,currentCard.sheet_position);
  viewerRotatedForReading=false;
  el("viewerCardCrop").style.transform=currentOrientation==="REVERSED"?"rotate(180deg)":"rotate(0deg)";
  el("viewerTurn").hidden=currentOrientation!=="REVERSED";
  el("cardViewer").hidden=false;document.body.classList.add("viewer-open");resetPhysicalCard();
}
function closeCardViewer(){el("cardViewer").hidden=true;document.body.classList.remove("viewer-open");resetPhysicalCard()}
function viewerTurnForReading(){
  if(currentOrientation!=="REVERSED")return;
  viewerRotatedForReading=!viewerRotatedForReading;
  el("viewerCardCrop").style.transform=viewerRotatedForReading?"rotate(0deg)":"rotate(180deg)";
  el("viewerOrientation").textContent=viewerRotatedForReading?"Umgekehrt gezogen · zur Betrachtung gedreht":"Umgekehrt gezogen";
}
function resetPhysicalCard(){
  const c=el("physicalCard"),g=c.querySelector(".physical-card-gloss");
  c.style.transform="rotateX(0deg) rotateY(0deg)";g.style.transform="translateX(-45%)";
}
function movePhysicalCard(x,y){
  const s=el("physicalCardStage"),r=s.getBoundingClientRect(),nx=(x-r.left)/r.width,ny=(y-r.top)/r.height;
  const ry=(nx-.5)*12,rx=(.5-ny)*12,gx=-55+nx*70;
  el("physicalCard").style.transform=`rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  el("physicalCard").querySelector(".physical-card-gloss").style.transform=`translateX(${gx.toFixed(1)}%)`;
}

/* bindings */
el("enterCardRoom").onclick=async()=>{
  if(state.session_token){
    audience=state.audience||"ADULT";
    try{if(!cards.length)await loadCards();showHome()}catch{state.session_token=null;saveState();showAccess()}
  }else showAccess();
};
el("backToIntro").onclick=showIntro;
el("chooseNewProfile").onclick=()=>showGate("create");
el("chooseExistingProfile").onclick=()=>showGate("login");
el("backFromGate").onclick=showAccess;
el("createProfile").onclick=createProfile;
el("loginProfile").onclick=loginProfile;
el("fillAdultTestLogin").onclick=()=>{
  el("loginUsername").value="Test_E";
  el("loginCode").value="SP6K-95GK";
  el("loginError").textContent="";
  el("loginUsername").focus();
};
el("copyAccess").onclick=copyAccess;
el("confirmSavedAccess").onclick=confirmSaved;

el("goHome").onclick=showHome;
el("homeDraw").onclick=showFlow;
el("roomJournal").onclick=()=>showJournal(false);
el("roomReview").onclick=showReview;
el("flowBackHome").onclick=showHome;
el("journalBackHome").onclick=showHome;
el("reviewBackHome").onclick=showHome;
el("diaryClose").onclick=closeDiary;
el("diaryBackdrop").onclick=closeDiary;
el("diarySave").onclick=saveDiaryEntry;
el("diaryOpenCard").onclick=openDiaryCard;
document.querySelectorAll(".depth-journal-action").forEach(btn=>{
  btn.addEventListener("click",()=>openDepthNote(btn.dataset.depthCode,btn.dataset.depthLabel));
});
document.querySelectorAll(".entry-type").forEach(btn=>{
  btn.addEventListener("click",()=>{
    noteEntryType=btn.dataset.entryType;
    document.querySelectorAll(".entry-type").forEach(x=>x.classList.toggle("active",x===btn));
  });
});
el("noteClose").onclick=closeDepthNote;
el("noteBackdrop").onclick=closeDepthNote;
el("noteSave").onclick=saveDepthNote;
el("logoutButton").onclick=logout;
el("editEntryClose").onclick=closeEditJournalEntry;
el("editEntryBackdrop").onclick=closeEditJournalEntry;
el("editEntrySave").onclick=saveEditedJournalEntry;
document.querySelectorAll("[data-edit-type]").forEach(btn=>{
  btn.onclick=()=>{
    editingEntryType=btn.dataset.editType;
    document.querySelectorAll("[data-edit-type]").forEach(x=>x.classList.toggle("active",x===btn));
  };
});

el("drawMagic").onclick=()=>{
  const r=el("cardTouchTarget").getBoundingClientRect();
  showTouchRipple(r.left+r.width/2,r.top+r.height/2);
  el("cardTouchTarget").classList.add("reveal-lift");
  setTimeout(()=>el("cardTouchTarget").classList.remove("reveal-lift"),650);
  drawRandom();
};

el("cardTouchTarget").addEventListener("pointerdown",e=>{
  if(e.button!==undefined && e.button!==0)return;
  pressCard(e.clientX,e.clientY);
});
el("cardTouchTarget").addEventListener("pointerup",e=>{
  if(e.button!==undefined && e.button!==0)return;
  releaseCard(e.clientX,e.clientY);
});
el("cardTouchTarget").addEventListener("pointercancel",()=>{
  el("cardTouchTarget").classList.remove("touching");
});
el("cardTouchTarget").addEventListener("pointerleave",e=>{
  if(e.pointerType==="mouse")el("cardTouchTarget").classList.remove("touching");
});
el("cardTouchTarget").addEventListener("keydown",e=>{
  if((e.key==="Enter"||e.key===" ")&&!drawInProgress){
    e.preventDefault();
    const r=el("cardTouchTarget").getBoundingClientRect();
    pressCard(r.left+r.width/2,r.top+r.height/2);
    setTimeout(()=>releaseCard(r.left+r.width/2,r.top+r.height/2),120);
  }
});
el("turnForViewing").onclick=turnForViewing;
el("savePerception").onclick=savePerception;
el("backToDraw").onclick=()=>setFlowStep("draw");
el("backToPerception").onclick=()=>setFlowStep("perception");
el("drawAnother").onclick=newDraw;
el("finishToHome").onclick=showHome;
el("filter").onchange=e=>filter=e.target.value;
el("toggleMeaning").onclick=()=>toggleDepth("toggleMeaning","meaningDepth");
el("toggleDetail").onclick=()=>toggleDepth("toggleDetail","detailDepth");

["openPerceptionCard","openPerceptionCardText","openMeaningCard","openMeaningCardText"].forEach(id=>el(id).onclick=openCardViewer);
el("closeCardViewer").onclick=closeCardViewer;
el("cardViewerBackdrop").onclick=closeCardViewer;
el("viewerTurn").onclick=viewerTurnForReading;
el("physicalCardStage").addEventListener("pointermove",e=>{if(e.pointerType==="mouse"||e.buttons===1)movePhysicalCard(e.clientX,e.clientY)});
el("physicalCardStage").addEventListener("pointerdown",e=>{el("physicalCardStage").setPointerCapture?.(e.pointerId);movePhysicalCard(e.clientX,e.clientY)});
el("physicalCardStage").addEventListener("pointerup",resetPhysicalCard);
el("physicalCardStage").addEventListener("pointercancel",resetPhysicalCard);
el("physicalCardStage").addEventListener("pointerleave",e=>{if(e.pointerType==="mouse")resetPhysicalCard()});
document.addEventListener("keydown",e=>{
  if(e.key!=="Escape")return;
  if(!el("cardViewer").hidden){closeCardViewer();return}
  if(!el("editEntryViewer").hidden){closeEditJournalEntry();return}
  if(!el("noteViewer").hidden){closeDepthNote();return}
  if(!el("diaryViewer").hidden)closeDiary();
});

setGreetings();
(async()=>{
  showIntro();
  if(!state.session_token)return;
  audience=state.audience||"ADULT";
  try{await loadCards()}catch{state.session_token=null;saveState()}
})();
})();