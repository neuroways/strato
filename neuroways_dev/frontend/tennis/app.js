const API="https://api.tennis.flowisaurus.de/api/v1/tournaments/";
const c=document.getElementById("content");
const a=document.getElementById("api");
function esc(x){return String(x??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function d(x){return new Intl.DateTimeFormat("de-DE").format(new Date(x))}
fetch(API).then(r=>r.json()).then(j=>{
a.textContent="API online";
c.innerHTML=j.data.map(t=>`
<article class="card">
<div class="status">${esc(t.status)}</div>
<h2>${esc(t.name)}</h2>
<p>📅 ${d(t.eventDate)}</p>
<p>📍 ${esc(t.location.name)}</p>
<h3>🎾 Plätze</h3>
<div class="courts"><span>Platz 1</span><span>Platz 2</span><span>Platz 3</span></div>
<p class="hint">Teilnehmer und Spielplan folgen.</p>
</article>`).join("");
}).catch(e=>{a.textContent="API Fehler";c.innerHTML="<div class='card'>Keine Verbindung</div>"});
