(() => {
"use strict";

const API_BASE="../NB_Kartenraum_Backend_v0.5.0/api";
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
  ["homeScreen","appRoot","journalScreen"].forEach(id=>el(id).hidden=true);
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
    audience=p.audience_code;saveState();await loadCards();el("loginError").textContent="";showHome();
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

async function drawRandom(){
  if(drawInProgress)return;
  const p=pool();
  if(!p.length)return;
  drawInProgress=true;
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
      return `<article class="journal-item" ${focusLatest&&i===0?'data-latest="true"':""}>
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
    if(focusLatest)list.querySelector('[data-latest="true"]')?.scrollIntoView({behavior:"smooth",block:"center"});
  }catch(e){
    list.innerHTML='<p class="status">Das Journal konnte gerade nicht geladen werden.</p>';
  }
}

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
el("homeDraw").onclick=showFlow;el("roomDraw").onclick=showFlow;
el("roomJournal").onclick=()=>showJournal(false);
el("roomReview").onclick=()=>showJournal(true);
el("flowBackHome").onclick=showHome;
el("journalBackHome").onclick=showHome;

el("drawMagic").onclick=drawRandom;
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
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!el("cardViewer").hidden)closeCardViewer()});

setGreetings();
(async()=>{
  showIntro();
  if(!state.session_token)return;
  audience=state.audience||"ADULT";
  try{await loadCards()}catch{state.session_token=null;saveState()}
})();
})();