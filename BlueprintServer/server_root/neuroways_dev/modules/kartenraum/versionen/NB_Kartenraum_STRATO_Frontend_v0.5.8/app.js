(() => {
"use strict";
const API_BASE="../NB_Kartenraum_Backend_v0.5.0/api";
const CARD_BASE="/modules/kartenraum/cards/";
const STORAGE_KEY="nb_kartenraum_frontend_v057";
let state=loadState();
let cards=[],currentCard=null,currentText=null,currentKnowledge=null,currentDrawId=null,currentOrientation=null,audience="ADULT",filter="all",drawInProgress=false;

const el=id=>document.getElementById(id);

function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{}}catch{return{}}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function bgPos(pos){const i=Number(pos)-1;return `${(i%3)*50}% ${Math.floor(i/3)*100}%`}
function setCrop(node,sheet,pos){node.style.backgroundImage=`url("${CARD_BASE}${sheet}")`;node.style.backgroundSize="300% 200%";node.style.backgroundPosition=bgPos(pos)}
function setMiniCrop(node,card,orientation){setCrop(node,card.sheet_name,card.sheet_position);node.style.transform=orientation==="REVERSED"?"rotate(180deg)":"rotate(0deg)"}
function orientationLabel(){return currentOrientation==="REVERSED"?"Umgekehrt gezogen":"Aufrecht gezogen"}

async function get(path){const r=await fetch(`${API_BASE}/${path}`,{headers:{Accept:"application/json"}});const d=await r.json().catch(()=>({}));if(!r.ok||d.status!=="ok")throw new Error(d.message||d.error);return d}
async function post(path,payload,auth=false){const h={"Content-Type":"application/json",Accept:"application/json"};if(auth)h.Authorization=`Bearer ${state.session_token||""}`;const r=await fetch(`${API_BASE}/${path}`,{method:"POST",headers:h,body:JSON.stringify(payload)});const d=await r.json().catch(()=>({}));if(!r.ok||d.status!=="ok")throw new Error(d.message||d.error||`API ${r.status}`);return d}

function resetGate(){el("gateStart").hidden=false;el("profileCreateForm").hidden=true;el("profileLoginForm").hidden=true;el("accessSaveStep").hidden=true}
function showGate(){el("profileGate").hidden=false;el("appRoot").hidden=true;el("appHeader").hidden=true;resetGate()}
function showApp(){el("profileGate").hidden=true;el("appRoot").hidden=false;el("appHeader").hidden=false;el("profileName").textContent=state.username||"";setFlowStep("draw");showIdleCardBack()}
function setFlowStep(step){
 ["draw","perception","meaning"].forEach(key=>el("step"+key[0].toUpperCase()+key.slice(1)).hidden=key!==step);
 document.querySelectorAll("[data-step-indicator]").forEach(n=>n.classList.toggle("active",n.dataset.stepIndicator===step));
 window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
function showIdleCardBack(){setCrop(el("backCrop"),"SheetR.png",5);el("frontCrop").style.backgroundImage="none";el("flip").classList.remove("revealed");el("frontCrop").classList.remove("drawn-reversed","view-upright");el("orientationNotice").hidden=true;el("turnForViewing").hidden=true;el("cardTitle").textContent="Noch keine Karte gezogen";el("cardTech").textContent=""}

async function createProfile(){
 const username=el("newUsername").value.trim(),aud=document.querySelector('input[name="newAudience"]:checked')?.value||"ADULT";
 try{const r=await post("profile-create.php",{username,audience_code:aud});const p=r.profile;Object.assign(state,{username:p.username,audience:p.audience_code,profile_id:p.profile_id,session_token:p.session_token});saveState();el("createdUsername").textContent=p.username;el("createdCode").textContent=p.access_code;el("accessPackage").value=`Nutzername: ${p.username}\nCode: ${p.access_code}`;el("profileCreateForm").hidden=true;el("accessSaveStep").hidden=false;el("profileError").textContent=""}
 catch(e){el("profileError").textContent=e.message==="USERNAME_UNAVAILABLE"?"Dieser Nutzername ist bereits vergeben.":"Das Profil konnte nicht erstellt werden."}
}
async function loginProfile(){
 try{const r=await post("login.php",{username:el("loginUsername").value.trim(),access_code:el("loginCode").value.trim()});const p=r.profile;Object.assign(state,{username:p.username,audience:p.audience_code,profile_id:p.profile_id,session_token:p.session_token});saveState();audience=p.audience_code;await loadCards();showApp()}
 catch(e){el("loginError").textContent=e.message||"Name oder Code passen nicht zusammen."}
}
async function copyAccess(){try{await navigator.clipboard.writeText(el("accessPackage").value)}catch{el("accessPackage").select();document.execCommand("copy")}el("copyMsg").textContent="Zugang kopiert."}
async function confirmSaved(){if(!el("accessSavedCheck").checked){el("copyMsg").textContent="Bitte bestätige zuerst, dass du deinen Zugang gespeichert hast.";return}audience=state.audience||"ADULT";await loadCards();showApp()}

async function loadCards(){const r=await get("cards.php");cards=r.cards||[]}
function pool(){if(filter==="all")return cards;if(filter==="major")return cards.filter(c=>c.arcana_code==="major");return cards.filter(c=>c.suit_code===filter)}

async function drawRandom(){
 if(drawInProgress)return;
 const p=pool();if(!p.length)return;
 drawInProgress=true;
 const card=p[Math.floor(Math.random()*p.length)];
 currentOrientation=Math.random()<.5?"UPRIGHT":"REVERSED";
 try{
  const r=await post("draw-create.php",{card_id:card.card_id,orientation_code:currentOrientation},true);
  currentDrawId=r.draw.draw_id;currentCard=card;currentText=currentKnowledge=null;
  setCrop(el("frontCrop"),card.sheet_name,card.sheet_position);
  el("flip").classList.remove("revealed");
  el("cardTitle").textContent="Deine Karte wird gezogen …";
  el("magicOverlay").hidden=false;el("magicOverlay").classList.add("active");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  await new Promise(r=>setTimeout(r,reduce?100:1200));
  el("frontCrop").classList.remove("drawn-reversed","view-upright");
  if(currentOrientation==="REVERSED")el("frontCrop").classList.add("drawn-reversed");
  el("flip").classList.add("revealed");
  el("cardTitle").textContent=card.title_de;
  if(currentOrientation==="REVERSED"){el("orientationNotice").hidden=false;el("orientationNotice").textContent="Umgekehrt gezogen";el("turnForViewing").hidden=false}
  await new Promise(r=>setTimeout(r,reduce?50:1200));
  setMiniCrop(el("perceptionMiniCrop"),card,currentOrientation);
  el("perceptionCardTitle").textContent=card.title_de;
  el("perceptionOrientation").textContent=orientationLabel();
  el("magicOverlay").classList.remove("active");el("magicOverlay").hidden=true;
  setFlowStep("perception");
 }catch(e){el("cardTitle").textContent="Die Karte konnte nicht gezogen werden."}
 finally{drawInProgress=false}
}

function turnForViewing(){el("frontCrop").classList.toggle("view-upright");el("orientationNotice").textContent="Umgekehrt gezogen · zur Betrachtung gedreht"}

async function savePerception(){
 const value=el("perception").value.trim();
 if(!value){el("saveMsg").textContent="Bitte halte zuerst einen Gedanken zur Karte fest.";return}
 try{
  el("saveMsg").textContent="Wird gespeichert …";
  await post("perception-save.php",{draw_id:currentDrawId,perception_text:value},true);
  el("saveMsg").textContent="Gespeichert.";
  setMiniCrop(el("meaningMiniCrop"),currentCard,currentOrientation);
  el("meaningCardTitle").textContent=currentCard.title_de;
  el("meaningOrientation").textContent=orientationLabel();
  el("interpretationContent").innerHTML='<div class="status">Kartenraum wird geladen …</div>';
  el("knowledgePanel").hidden=true;
  setFlowStep("meaning");
  const r=await get(`text.php?id=${encodeURIComponent(currentCard.card_id)}&audience=${audience}&language=de`);
  currentText=r.text;
  el("interpretationContent").innerHTML=renderText(currentText);
 }catch(e){el("saveMsg").textContent="Speichern nicht möglich: "+e.message}
}

function renderText(t){
 const qs=(t.context_questions||[]).map(q=>`<li>${esc(q)}</li>`).join("");
 return `<div class="eyebrow">${audience==="CHILD"?"Kinder":"Erwachsene"} · Deutsch</div><h2>${esc(t.title)}</h2>${t.subtitle?`<p class="lead">${esc(t.subtitle)}</p>`:""}<section class="text-section"><h3>${audience==="CHILD"?"Was entdeckst du?":"Was siehst du?"}</h3><p>${esc(t.what_do_you_see)}</p></section><section class="text-section"><h3>Der Raum der Karte</h3><p>${esc(t.card_room)}</p></section><section class="text-section"><h3>${audience==="CHILD"?"Was helfen könnte":"Was dich tragen könnte"}</h3><p>${esc(t.helpful_side)}</p></section><section class="text-section"><h3>${audience==="CHILD"?"Was schwierig sein könnte":"Was gerade schwierig sein könnte"}</h3><p>${esc(t.difficult_side)}</p></section><section class="text-section"><h3>Dein Kontext</h3><ul>${qs}</ul></section><section class="text-section"><h3>Deine Kartensprache</h3><p>${esc(t.own_card_language)}</p></section><section class="text-section"><h3>Ein möglicher nächster Schritt</h3><p>${esc(t.possible_next_step)}</p></section>`;
}

async function openKnowledge(){
 const r=await get(`knowledge.php?id=${encodeURIComponent(currentCard.card_id)}&audience=${audience}&language=de`);
 currentKnowledge=r.knowledge;
 const chips=(currentKnowledge.keywords||[]).map(k=>`<span class="keyword-chip">${esc(k)}</span>`).join("");
 el("knowledgeContent").innerHTML=`<div class="eyebrow">Kartenwissen</div><h2>${esc(currentKnowledge.theme||currentCard.title_de)}</h2><div class="keyword-list">${chips}</div><section class="text-section"><h3>Bedeutung der Karte</h3><p>${esc(currentKnowledge.meaning_text)}</p></section><section class="text-section"><h3>Andere Blickrichtung</h3><p>${esc(currentKnowledge.other_direction_text||"")}</p></section>`;
 el("knowledgePanel").hidden=false;
}


let viewerRotatedForReading=false;

function openCardViewer(){
  if(!currentCard)return;

  el("viewerCardTitle").textContent=currentCard.title_de;
  el("viewerOrientation").textContent=orientationLabel();
  setCrop(el("viewerCardCrop"),currentCard.sheet_name,currentCard.sheet_position);

  viewerRotatedForReading=false;
  el("viewerCardCrop").style.transform=
    currentOrientation==="REVERSED" ? "rotate(180deg)" : "rotate(0deg)";

  el("viewerTurn").hidden=currentOrientation!=="REVERSED";
  el("cardViewer").hidden=false;
  document.body.classList.add("viewer-open");

  resetPhysicalCard();
}

function closeCardViewer(){
  el("cardViewer").hidden=true;
  document.body.classList.remove("viewer-open");
  resetPhysicalCard();
}

function viewerTurnForReading(){
  if(currentOrientation!=="REVERSED")return;
  viewerRotatedForReading=!viewerRotatedForReading;
  el("viewerCardCrop").style.transform=
    viewerRotatedForReading ? "rotate(0deg)" : "rotate(180deg)";
  el("viewerOrientation").textContent=
    viewerRotatedForReading
      ? "Umgekehrt gezogen · zur Betrachtung gedreht"
      : "Umgekehrt gezogen";
}

function resetPhysicalCard(){
  const card=el("physicalCard");
  const gloss=card.querySelector(".physical-card-gloss");
  card.style.transform="rotateX(0deg) rotateY(0deg)";
  gloss.style.transform="translateX(-38%) rotate(3deg)";
}

function movePhysicalCard(clientX,clientY){
  const stage=el("physicalCardStage");
  const rect=stage.getBoundingClientRect();
  const x=(clientX-rect.left)/rect.width;
  const y=(clientY-rect.top)/rect.height;

  const rotateY=(x-.5)*12;
  const rotateX=(.5-y)*12;
  const glossX=-55+(x*70);

  const card=el("physicalCard");
  const gloss=card.querySelector(".physical-card-gloss");
  card.style.transform=`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  gloss.style.transform=`translateX(${glossX.toFixed(1)}%) rotate(3deg)`;
}

function newDraw(){
 currentCard=currentText=currentKnowledge=null;currentDrawId=currentOrientation=null;el("perception").value="";el("knowledgePanel").hidden=true;showIdleCardBack();setFlowStep("draw");
}

el("showCreate").onclick=()=>{el("gateStart").hidden=true;el("profileCreateForm").hidden=false}
el("showLogin").onclick=()=>{el("gateStart").hidden=true;el("profileLoginForm").hidden=false}
el("backFromCreate").onclick=resetGate;el("backFromLogin").onclick=resetGate;
el("createProfile").onclick=createProfile;el("loginProfile").onclick=loginProfile;el("copyAccess").onclick=copyAccess;el("confirmSavedAccess").onclick=confirmSaved;
el("drawMagic").onclick=drawRandom;el("turnForViewing").onclick=turnForViewing;el("savePerception").onclick=savePerception;el("openKnowledge").onclick=openKnowledge;
el("backToDraw").onclick=()=>setFlowStep("draw");el("backToPerception").onclick=()=>setFlowStep("perception");el("drawAnother").onclick=newDraw;
el("filter").onchange=e=>filter=e.target.value;

el("openPerceptionCard").onclick=openCardViewer;
el("openPerceptionCardText").onclick=openCardViewer;
el("openMeaningCard").onclick=openCardViewer;
el("openMeaningCardText").onclick=openCardViewer;
el("closeCardViewer").onclick=closeCardViewer;
el("cardViewerBackdrop").onclick=closeCardViewer;
el("viewerTurn").onclick=viewerTurnForReading;

el("physicalCardStage").addEventListener("pointermove",e=>{
  if(e.pointerType==="mouse" || e.buttons===1){
    movePhysicalCard(e.clientX,e.clientY);
  }
});
el("physicalCardStage").addEventListener("pointerdown",e=>{
  el("physicalCardStage").setPointerCapture?.(e.pointerId);
  movePhysicalCard(e.clientX,e.clientY);
});
el("physicalCardStage").addEventListener("pointerup",resetPhysicalCard);
el("physicalCardStage").addEventListener("pointercancel",resetPhysicalCard);
el("physicalCardStage").addEventListener("pointerleave",e=>{
  if(e.pointerType==="mouse")resetPhysicalCard();
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape" && !el("cardViewer").hidden)closeCardViewer();
});


(async()=>{if(!state.session_token){showGate();return}audience=state.audience||"ADULT";try{await loadCards();showApp()}catch{state.session_token=null;saveState();showGate()}})();
})();