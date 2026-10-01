(() => {
"use strict";
const API_BASE="../NB_Kartenraum_Backend_v0.5.0/api";
const CARD_BASE="../cards/";
const STORAGE_KEY="nb_kartenraum_frontend_v052";
let cards=[], currentCard=null, currentText=null, currentKnowledge=null, currentDrawId=null, currentOrientation=null, audience="ADULT", filter="all", revealed=false;
let state=loadState();
const gateStart=document.getElementById("gateStart");
const profileCreateForm=document.getElementById("profileCreateForm");
const profileLoginForm=document.getElementById("profileLoginForm");
const accessSaveStep=document.getElementById("accessSaveStep");
const profileGate=document.getElementById("profileGate");
const appRoot=document.getElementById("appRoot");
const appHeader=document.getElementById("appHeader");
const profileName=document.getElementById("profileName");
const newUsername=document.getElementById("newUsername");
const profileError=document.getElementById("profileError");
const createdUsername=document.getElementById("createdUsername");
const createdCode=document.getElementById("createdCode");
const accessPackage=document.getElementById("accessPackage");
const loginUsername=document.getElementById("loginUsername");
const loginCode=document.getElementById("loginCode");
const loginError=document.getElementById("loginError");
const copyMsg=document.getElementById("copyMsg");
const accessSavedCheck=document.getElementById("accessSavedCheck");
const frontCrop=document.getElementById("frontCrop");
const backCrop=document.getElementById("backCrop");
const cardTitle=document.getElementById("cardTitle");
const cardTech=document.getElementById("cardTech");
const perception=document.getElementById("perception");
const perceptionPanel=document.getElementById("perceptionPanel");
const interpretationPanel=document.getElementById("interpretationPanel");
const knowledgePanel=document.getElementById("knowledgePanel");
const flip=document.getElementById("flip");
const orientationNotice=document.getElementById("orientationNotice");
const turnForViewing=document.getElementById("turnForViewing");
const saveMsg=document.getElementById("saveMsg");
const interpretationContent=document.getElementById("interpretationContent");
const knowledgeContent=document.getElementById("knowledgeContent");

function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{}}catch{return{}}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function bgPos(pos){const i=Number(pos)-1;return `${(i%3)*50}% ${Math.floor(i/3)*100}%`}
function setCrop(el,sheet,pos){el.style.backgroundImage=`url("${CARD_BASE}${sheet}")`;el.style.backgroundSize="300% 200%";el.style.backgroundPosition=bgPos(pos)}
async function get(path){const r=await fetch(`${API_BASE}/${path}`,{headers:{Accept:"application/json"}});const d=await r.json();if(!r.ok||d.status!=="ok")throw new Error(d.message||d.error);return d}
async function post(path,payload,auth=false){const headers={"Content-Type":"application/json",Accept:"application/json"};if(auth)headers.Authorization=`Bearer ${state.session_token||""}`;const r=await fetch(`${API_BASE}/${path}`,{method:"POST",headers,body:JSON.stringify(payload)});const d=await r.json().catch(()=>({}));if(!r.ok||d.status!=="ok")throw new Error(d.message||d.error||`API ${r.status}`);return d}

function resetGate(){gateStart.hidden=false;profileCreateForm.hidden=true;profileLoginForm.hidden=true;accessSaveStep.hidden=true}
function showGate(){profileGate.hidden=false;appRoot.hidden=true;appHeader.hidden=true;resetGate()}
function showApp(){profileGate.hidden=true;appRoot.hidden=false;appHeader.hidden=false;profileName.textContent=state.username||""}

async function handleCreateProfile(){
 const username=newUsername.value.trim(), aud=document.querySelector('input[name="newAudience"]:checked')?.value||"ADULT";
 try{const r=await post("profile-create.php",{username,audience_code:aud});const p=r.profile;Object.assign(state,{username:p.username,audience:p.audience_code,profile_id:p.profile_id,session_token:p.session_token});saveState();createdUsername.textContent=p.username;createdCode.textContent=p.access_code;accessPackage.value=`Nutzername: ${p.username}\nCode: ${p.access_code}`;profileCreateForm.hidden=true;accessSaveStep.hidden=false;profileError.textContent=""}
 catch(e){profileError.textContent=e.message==="USERNAME_UNAVAILABLE"?"Dieser Nutzername ist bereits vergeben.":"Das Profil konnte nicht erstellt werden."}
}
async function handleLoginProfile(){
 try{const r=await post("login.php",{username:loginUsername.value.trim(),access_code:loginCode.value.trim()});const p=r.profile;Object.assign(state,{username:p.username,audience:p.audience_code,profile_id:p.profile_id,session_token:p.session_token});saveState();audience=p.audience_code;showApp();await loadCards()}
 catch(e){loginError.textContent=e.message||"Name oder Code passen nicht zusammen."}
}
async function handleCopyAccess(){try{await navigator.clipboard.writeText(accessPackage.value)}catch{accessPackage.select();document.execCommand("copy")}copyMsg.textContent="Zugang kopiert."}
async function handleConfirmSaved(){if(!accessSavedCheck.checked){copyMsg.textContent="Bitte bestätige zuerst, dass du deinen Zugang gespeichert hast.";return}audience=state.audience||"ADULT";showApp();await loadCards()}

async function loadCards(){const r=await get("cards.php");cards=r.cards||[]}
function pool(){if(filter==="all")return cards;if(filter==="major")return cards.filter(c=>c.arcana_code==="major");return cards.filter(c=>c.suit_code===filter)}
async function selectCard(id){currentCard=cards.find(c=>c.card_id===id);if(!currentCard)return;currentText=currentKnowledge=null;revealed=false;flip.classList.remove("revealed");setCrop(frontCrop,currentCard.sheet_name,currentCard.sheet_position);setCrop(backCrop,"SheetR.png",5);cardTitle.textContent=currentCard.title_de;cardTech.textContent="";perception.value="";perceptionPanel.hidden=true;interpretationPanel.hidden=true;knowledgePanel.hidden=true;frontCrop.classList.remove("drawn-reversed","view-upright")}
async function handleDrawRandom(){const p=pool();if(!p.length)return;const card=p[Math.floor(Math.random()*p.length)];currentOrientation=Math.random()<.5?"UPRIGHT":"REVERSED";const r=await post("draw-create.php",{card_id:card.card_id,orientation_code:currentOrientation},true);currentDrawId=r.draw.draw_id;await selectCard(card.card_id);applyOrientation()}
function applyOrientation(){frontCrop.classList.remove("drawn-reversed","view-upright");if(currentOrientation==="REVERSED"){frontCrop.classList.add("drawn-reversed");orientationNotice.hidden=false;orientationNotice.textContent="Diese Karte wurde umgekehrt gezogen.";turnForViewing.hidden=false}else{orientationNotice.hidden=true;turnForViewing.hidden=true}}
function handleRevealCard(){if(!currentCard||revealed)return;revealed=true;flip.classList.add("revealed");setTimeout(()=>perceptionPanel.hidden=false,700)}
function handleTurnView(){frontCrop.classList.toggle("view-upright");orientationNotice.textContent="Umgekehrt gezogen · nur zur Betrachtung gedreht."}
async function handleSavePerception(){const v=perception.value.trim();if(!v||!currentDrawId)return;try{await post("perception-save.php",{draw_id:currentDrawId,perception_text:v},true);saveMsg.textContent="Wahrnehmung gespeichert."}catch(e){saveMsg.textContent="Speichern nicht möglich: "+e.message}}
async function handleOpenRoom(){if(!currentCard)return;const r=await get(`text.php?id=${encodeURIComponent(currentCard.card_id)}&audience=${audience}&language=de`);currentText=r.text;interpretationContent.innerHTML=renderText(currentText);interpretationPanel.hidden=false}
function renderText(t){const qs=(t.context_questions||[]).map(q=>`<li>${esc(q)}</li>`).join("");return `<div class="eyebrow">${audience==="CHILD"?"Kinder":"Erwachsene"} · Deutsch</div><h2>${esc(t.title)}</h2>${t.subtitle?`<p class="lead">${esc(t.subtitle)}</p>`:""}<section class="text-section"><h3>${audience==="CHILD"?"Was entdeckst du?":"Was siehst du?"}</h3><p>${esc(t.what_do_you_see)}</p></section><section class="text-section"><h3>Der Raum der Karte</h3><p>${esc(t.card_room)}</p></section><section class="text-section"><h3>${audience==="CHILD"?"Was helfen könnte":"Was dich tragen könnte"}</h3><p>${esc(t.helpful_side)}</p></section><section class="text-section"><h3>${audience==="CHILD"?"Was schwierig sein könnte":"Was gerade schwierig sein könnte"}</h3><p>${esc(t.difficult_side)}</p></section><section class="text-section"><h3>Dein Kontext</h3><ul>${qs}</ul></section><section class="text-section"><h3>Deine Kartensprache</h3><p>${esc(t.own_card_language)}</p></section><section class="text-section"><h3>Ein möglicher nächster Schritt</h3><p>${esc(t.possible_next_step)}</p></section>`}
async function handleOpenKnowledge(){const r=await get(`knowledge.php?id=${encodeURIComponent(currentCard.card_id)}&audience=${audience}&language=de`);currentKnowledge=r.knowledge;const chips=(currentKnowledge.keywords||[]).map(k=>`<span class="keyword-chip">${esc(k)}</span>`).join("");knowledgeContent.innerHTML=`<div class="eyebrow">Kartenwissen</div><h2>${esc(currentKnowledge.theme||currentCard.title_de)}</h2><div class="keyword-list">${chips}</div><section class="text-section"><h3>Bedeutung der Karte</h3><p>${esc(currentKnowledge.meaning_text)}</p></section><section class="text-section"><h3>Andere Blickrichtung</h3><p>${esc(currentKnowledge.other_direction_text||"")}</p></section>`;knowledgePanel.hidden=false}

const el = id => document.getElementById(id);

el("showCreate").addEventListener("click", () => {
  el("gateStart").hidden = true;
  el("profileCreateForm").hidden = false;
});
el("showLogin").addEventListener("click", () => {
  el("gateStart").hidden = true;
  el("profileLoginForm").hidden = false;
});
el("backFromCreate").addEventListener("click", resetGate);
el("backFromLogin").addEventListener("click", resetGate);
el("createProfile").addEventListener("click", handleCreateProfile);
el("loginProfile").addEventListener("click", handleLoginProfile);
el("copyAccess").addEventListener("click", handleCopyAccess);
el("confirmSavedAccess").addEventListener("click", handleConfirmSaved);

el("draw").addEventListener("click", handleDrawRandom);
el("reveal").addEventListener("click", handleRevealCard);
el("flip").addEventListener("click", handleRevealCard);
el("turnForViewing").addEventListener("click", handleTurnView);
el("savePerception").addEventListener("click", handleSavePerception);
el("openRoom").addEventListener("click", handleOpenRoom);
el("openKnowledge").addEventListener("click", handleOpenKnowledge);
el("filter").addEventListener("change", e => { filter = e.target.value; });


(async()=>{if(!state.session_token){showGate();return}audience=state.audience||"ADULT";showApp();try{await loadCards()}catch{state.session_token=null;saveState();showGate()}})();
})();