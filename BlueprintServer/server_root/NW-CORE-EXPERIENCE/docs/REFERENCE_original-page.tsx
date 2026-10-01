"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "standard"|"ruhe"|"nacht"|"neugier"|"aktivierung"|"reduziert";
type View = "start"|"checkin"|"location"|"choose"|"observe"|"deeper"|"path"|"placeholder";
const modes:{id:Mode;label:string;hint:string}[]=[
 {id:"standard",label:"Standard",hint:"ausgewogen"},{id:"ruhe",label:"Ruhe",hint:"weich & warm"},
 {id:"nacht",label:"Nacht",hint:"geschützt"},{id:"neugier",label:"Neugier",hint:"offen"},
 {id:"aktivierung",label:"Aktivierung",hint:"in Bewegung"},{id:"reduziert",label:"Reduziert",hint:"gerade weniger"}
];
const questions=[
 {title:"Wie ist deine Energie gerade?",sub:"Wähle das, was sich für diesen Moment am stimmigsten anfühlt.",options:["Sehr niedrig","Niedrig","Mittel","Hoch","Sehr hoch"]},
 {title:"Wie viel kommt gerade bei dir an?",sub:"Es geht nicht um richtig oder falsch – nur um jetzt.",options:["Fast nichts","Eher wenig","Mehreres","Sehr vieles"]},
 {title:"Wie leicht ist der nächste Schritt zu sehen?",sub:"Du musst ihn noch nicht gehen.",options:["Noch gar nicht","Nur undeutlich","Ein wenig","Ziemlich klar"]},
 {title:"Wie fühlt sich ein Wechsel gerade an?",sub:"Zum Beispiel anfangen, aufhören oder von einem Ort zum anderen gehen.",options:["Ich möchte bleiben","Braucht Zeit","Ist möglich","Fühlt sich leicht an"]}
];
const navIcons:Record<string,string>={"Start":"⌂","Mein Weg":"∿","Projekte":"◇","Wissen":"▤","Entwicklung":"✦"};

function Brand({compact=false}:{compact?:boolean}){return <div className="brand"><span className="brand-wave">≋</span>{!compact&&<span><b>NeuroWays</b><small>Erkennt Wege. Stärkt Menschen.</small></span>}</div>}
function World(){return <div className="world" aria-hidden="true"><div className="sun"/><div className="ridge back-ridge"/><div className="ridge mid-ridge"/><div className="river"/><div className="ridge front-ridge"/><div className="wayline"><span className="point"/></div></div>}

export default function Home(){
 const [mode,setMode]=useState<Mode>("standard"),[view,setView]=useState<View>("start"),[q,setQ]=useState(0),[answers,setAnswers]=useState<number[]>([]),[reduce,setReduce]=useState(false),[menu,setMenu]=useState(false);
 useEffect(()=>setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches),[]);
 const location=useMemo(()=>{const n=answers.reduce((a,b)=>a+b,0);return n<=4?{name:"an der stillen Küste",text:"Im Moment wirkt dein Ort eher nah, ruhig und geschützt."}:n>=10?{name:"am offenen Horizont",text:"Im Moment wirkt dein Ort eher weit, lebendig und offen."}:{name:"zwischen Küste und Weite",text:"Im Moment scheint beides da zu sein: ein wenig Schutz und ein wenig Raum."}},[answers]);
 const begin=()=>{setQ(0);setAnswers([]);setView("checkin")};
 const answer=(i:number)=>{const a=[...answers,i];setAnswers(a);if(q<3)setQ(q+1);else{const n=a.reduce((x,y)=>x+y,0);setMode(n<=4?"ruhe":n>=10?"neugier":"standard");setView("location")}};
 const go=(label:string)=>{if(label==="Start")setView("start");else if(label==="Mein Weg")setView("path");else if(label==="Check-in")begin();else setView("placeholder")};
 return <main className={`app mode-${mode} ${reduce?"motion-reduced":""}`}>
  <aside className="sidebar"><Brand/><nav>{["Start","Mein Weg","Projekte","Wissen","Entwicklung"].map(x=><button key={x} className={(x==="Start"&&view==="start")||(x==="Mein Weg"&&view==="path")?"active":""} onClick={()=>go(x)}><span>{navIcons[x]}</span>{x}</button>)}</nav><div className="spacer"/><button className="privacy" onClick={()=>setView("path")}><span>♧</span><span><b>Dein Weg gehört dir.</b><small>Privat in dieser Demo</small></span></button><button className="profile"><span className="avatar">S</span><span><b>Svenja</b><small>Dein Raum</small></span><span>⌄</span></button></aside>
  <section className="shell">
   <header className="topbar"><Brand compact/><div className="welcome"><b>Willkommen zurück, Svenja. <span>{mode==="nacht"?"☾":"☀"}</span></b><small>Wohin darf dein Weg heute führen?</small></div><div className="controls"><button className="motion-toggle" aria-pressed={reduce} onClick={()=>setReduce(!reduce)}>{reduce?"Bewegung ruhig":"Bewegung reduzieren"}</button><div className="mode-wrap"><button className="mode-button" aria-expanded={menu} onClick={()=>setMenu(!menu)}><i/>{modes.find(x=>x.id===mode)?.label}<span>⌄</span></button>{menu&&<div className="mode-menu">{modes.map(x=><button key={x.id} className={mode===x.id?"selected":""} onClick={()=>{setMode(x.id);setMenu(false)}}><i className={`swatch ${x.id}`}/><span><b>{x.label}</b><small>{x.hint}</small></span></button>)}</div>}</div></div></header>
   <div className="experience"><World/><section className="content-card" aria-live="polite">
    {view==="start"&&<Start begin={begin} choose={()=>setView("choose")}/>}
    {view==="checkin"&&<Checkin q={q} answer={answer} back={()=>q?setQ(q-1):setView("start")}/>}
    {view==="location"&&<Location location={location} next={()=>setView("choose")}/>}
    {view==="choose"&&<Choose begin={begin} choose={setView}/>}
    {view==="observe"&&<Observe home={()=>setView("start")}/>}
    {view==="deeper"&&<Deeper/>}{view==="path"&&<Path/>}
    {view==="placeholder"&&<Placeholder home={()=>setView("start")}/>}
   </section>{["start","choose","location"].includes(view)&&<aside className="moment-card"><span>∿</span><div><small>Dein Moment</small><b>{mode==="ruhe"?"Ruhe":mode==="neugier"?"Neugier":mode==="aktivierung"?"Aufbruch":mode==="reduziert"?"Weniger":"Ankommen"}</b></div><button onClick={()=>setMenu(true)}>ändern</button></aside>}</div>
   <footer><span>Dein Weg ist privat.</span><span>Du bestimmst, was etwas für dich bedeutet.</span><span>Lokaler Demo-Zustand · nichts wird gespeichert</span></footer>
  </section>
  <nav className="mobile-nav">{["Start","Mein Weg","Check-in","Wissen","Mehr"].map(x=><button key={x} onClick={()=>go(x)} className={x==="Check-in"?"center":""}><span>{x==="Start"?"⌂":x==="Mein Weg"?"∿":x==="Check-in"?"●":x==="Wissen"?"▤":"•••"}</span><small>{x}</small></button>)}</nav>
 </main>
}
function Start({begin,choose}:{begin:()=>void;choose:()=>void}){return <div className="view start-view"><p className="eyebrow">Ein Ort, der mit dir geht.</p><h1>Vielleicht brauchst du<br/>keinen besseren Weg.<br/>Sondern <em>deinen.</em></h1><p className="lead">Lass uns gemeinsam hinschauen.</p><p>Du musst noch keine Antwort haben.</p><div className="actions"><button className="primary" onClick={begin}>∿ &nbsp;Check-in beginnen</button><button className="quiet-link" onClick={choose}>Ich weiß gerade nicht, wo ich anfangen soll.</button></div></div>}
function Checkin({q,answer,back}:{q:number;answer:(n:number)=>void;back:()=>void}){const x=questions[q];return <div className="view checkin"><button className="back" onClick={back}>← Zurück</button><p className="eyebrow">Frage {q+1} von 4</p><h2>{x.title}</h2><p>{x.sub}</p><div className="answers">{x.options.map((o,i)=><button key={o} onClick={()=>answer(i)}><i/>{o}<span>›</span></button>)}</div><small className="private-line">♧ Deine Antworten bleiben nur in dieser Demo.</small></div>}
function Location({location,next}:{location:{name:string;text:string};next:()=>void}){return <div className="view"><p className="eyebrow">Deine Verortung · nur für jetzt</p><h2>Du bist gerade<br/><em>{location.name}.</em></h2><p className="big-copy">{location.text}</p><div className="chips"><span>stimmig</span><span>momentan</span><span>ohne Bewertung</span></div><div className="pause"><b>Du musst daraus gerade nichts machen.</b><small>Dieser Ort kann sich ändern – und das ist okay.</small></div><button className="primary" onClick={next}>Was wäre jetzt hilfreich? &nbsp;→</button></div>}
function Choose({begin,choose}:{begin:()=>void;choose:(v:View)=>void}){return <div className="view choose"><span className="view-icon">∿</span><p className="eyebrow">Du darfst erst einmal ankommen.</p><h2>Das ist okay.</h2><p className="big-copy">Wir können einfach dort anfangen,<br/>wo du gerade bist.</p><div className="choices"><button onClick={()=>choose("observe")}><b>○ &nbsp;Nur anschauen</b><small>In Ruhe stöbern und inspirieren lassen</small></button><button onClick={()=>choose("observe")}><b>≋ &nbsp;Etwas Entlastung finden</b><small>Ein wenig weniger für diesen Moment</small></button><button onClick={()=>choose("deeper")}><b>◌ &nbsp;Etwas erzählen</b><small>Gedanken ordnen und in Worte fassen</small></button><button onClick={()=>choose("deeper")}><b>◎ &nbsp;Gemeinsam genauer hinschauen</b><small>Perspektiven öffnen – nur mit deiner Zustimmung</small></button></div><button className="quiet-link" onClick={begin}>Oder mit dem kurzen Check-in beginnen</button></div>}
function Observe({home}:{home:()=>void}){return <div className="view centered"><span className="view-icon">○</span><h2>Du musst heute nichts daraus machen.</h2><p className="big-copy">Manchmal reicht es, etwas gesehen zu haben.</p><button className="quiet-link" onClick={home}>Zurück in deinen Raum</button></div>}
function Deeper(){return <div className="view"><p className="eyebrow">Du entscheidest die Tiefe.</p><h2>Welche Perspektive möchtest du öffnen?</h2><p>Das sind Blickwinkel, keine Erklärungen über dich.</p><div className="perspectives">{["Energie","Umgebung","Erwartungen","Menschen","Zeitpunkt","Übergänge"].map((x,i)=><button key={x}><span>{["◌","⌁","◇","◎","◷","↝"][i]}</span><b>{x}</b><small>anschauen</small></button>)}</div></div>}
function Path(){return <div className="view"><p className="eyebrow">Mein Weg</p><h2>Das hast du bisher gesehen.</h2><p>Keine Zusammenfassung darüber, wer du bist. Nur Momente, deren Bedeutung dir gehört.</p><div className="timeline"><article><i/><time>Heute</time><div><b>Küste</b><span>„Viel gleichzeitig.“</span></div></article><article><i/><time>Vor einigen Tagen</time><div><b>Festland</b><span>„Ideen kamen leicht.“</span></div></article></div><div className="private-panel"><b>♧ Dein Weg ist privat.</b><small>Du bestimmst, was diese Beobachtungen für dich bedeuten.</small></div></div>}
function Placeholder({home}:{home:()=>void}){return <div className="view centered"><span className="view-icon">◇</span><p className="eyebrow">Dieser Raum wächst später.</p><h2>Für diesen Prototyp bleibt es hier bewusst ruhig.</h2><p className="big-copy">Heute geht es um Ankommen, Verorten und selbstbestimmte Tiefe.</p><button className="quiet-link" onClick={home}>Zurück zum Start</button></div>}
