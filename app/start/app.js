(()=>{
const $=s=>document.querySelector(s);
const I={
 map:'<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
 navtext:'<path d="M12 13v8M8.5 21h7M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.6 4.6a10.500 10.500 0 0 0 0 14.800M19.4 4.6a10.500 10.500 0 0 1 0 14.800"/><circle cx="12" cy="12" r="1.600"/>',
 colreg:'<circle cx="12" cy="5" r="2"/><path d="M12 7v14M7.500 11h9M5 15a7 7 0 0 0 14 0"/>',
 weather:'<path d="M7 18a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17 8.500 4 4 0 0 1 17.500 18z"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.500 12h.01M12 12h.01M15.500 12h.01M8.500 16h.01M12 16h.01M15.500 16h.01" stroke-width="2.400"/>'};
const TOOLS=[
 {id:"map",name:"MAP",path:"/map/",d:"Karte, Routing & Seezeichen",full:false,note:"Besuchte Kartenausschnitte offline; Suche und neue Kacheln brauchen Internet",kw:"karte routing seekarte position tonnen osm"},
 {id:"navtext",name:"NAVTEXT",path:"/navtext/",d:"Stationen & Meldungen",full:true,note:"Komplett offline",kw:"navtex stationen meldungen funk warnung simulator"},
 {id:"colreg",name:"COLREG",path:"/colreg/",d:"KVR, Schallsignale, Lichter, Tonnen",full:true,note:"Regeln und Signale offline; Bilder nach dem Offline-Paket",kw:"kvr regeln schallsignal signale lichter tonnen iala ausweichen"},
 {id:"weather",name:"WEATHER",path:"/weather/",d:"Wolkenatlas, Radar, Wind, Isobaren",full:false,note:"Wolkenatlas mit Bildern offline; Radar, Wind und Isobaren brauchen Internet",kw:"wetter wolken cumulus cirrus wind radar isobaren luftdruck fronten strömung"},
 {id:"calc",name:"CALC",path:"/calc/",d:"Navigation & Schiffstheorie",full:true,note:"Komplett offline",kw:"rechner rechenblatt navigation schiffstheorie kompass deviation schwerpunkt stabilität"}];
const L=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch(_){return null}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};
const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const by=id=>TOOLS.find(t=>t.id===id);
let ready=false,busy=false;

/* Kacheln + Suche */
function render(){
 const q=$("#q").value.trim().toLowerCase(),g=$("#grid");g.innerHTML="";
 const hits=TOOLS.filter(t=>!q||(t.name+" "+t.d+" "+t.kw).toLowerCase().includes(q));
 hits.forEach(t=>{const b=document.createElement("button");b.type="button";b.className="tile";
  b.innerHTML=`<span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${I[t.id]}</svg></span><b>${t.name}</b><span class="d">${t.d}</span><span class="tag ${t.full?"":"part"}">${t.full?"Voll offline":"Teilweise offline"}</span>`;
  b.onclick=()=>openTool(t.id);g.append(b)});
 $("#none").hidden=hits.length>0}
$("#q").addEventListener("input",render);
$("#q").addEventListener("keydown",e=>{if(e.key==="Enter"){const h=TOOLS.filter(t=>(t.name+" "+t.d+" "+t.kw).toLowerCase().includes($("#q").value.trim().toLowerCase()));if(h.length===1){e.target.blur();openTool(h[0].id)}}});

/* Viewer */
const frame=$("#frame");
function openTool(id,pushed){const t=by(id);if(!t)return;$("#vtitle").textContent=t.name;frame.src=t.path;$("#viewer").hidden=false;if(!pushed)history.pushState({tool:id},"","#"+id)}
function closeTool(fromPop){$("#viewer").hidden=true;frame.src="about:blank";if(!fromPop&&history.state&&history.state.tool)history.back()}
frame.addEventListener("load",()=>{try{const d=frame.contentDocument;if(!d||!d.head||frame.src==="about:blank")return;const s=d.createElement("style");s.textContent=".nt-home{display:none!important}";d.head.append(s)}catch(_){}});
$("#back").onclick=()=>closeTool(false);
$("#reload").onclick=()=>{try{frame.contentWindow.location.reload()}catch(_){frame.src=frame.src}};
addEventListener("popstate",e=>{if(e.state&&e.state.tool)openTool(e.state.tool,true);else closeTool(true)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#viewer").hidden)closeTool(false)});

/* Offline-Status */
function net(){const p=$("#net"),on=navigator.onLine;p.className="pill "+(!on?"off":ready?"ok":"");p.querySelector("span").textContent=!on?"Offline":ready?"Offline bereit":"Nicht geladen"}
addEventListener("online",net);addEventListener("offline",net);
async function count(){try{let n=0;for(const k of await caches.keys())n+=(await(await caches.open(k)).keys()).length;return n}catch(_){return 0}}
async function info(){
 const n=await count(),sw=("serviceWorker"in navigator)&&!!navigator.serviceWorker.controller,t=L("nt-updated");
 ready=n>40&&sw;net();
 const st=$("#state");st.textContent=ready?"Bereit":"Fehlt";st.className="state "+(ready?"ok":"no");
 $("#offText").textContent=ready?`${n} Dateien gespeichert – NAVTOOL läuft auch ohne Netz.`:"Lade das Offline-Paket einmal mit Internet, dann funktioniert alles auch unterwegs.";
 if(!busy){$("#bar").style.width=ready?"100%":"0%";const b=$("#prep");b.textContent=ready?"Aktualisieren":"Offline-Paket laden";b.classList.toggle("again",ready)}
 $("#stamp").textContent=t?"Zuletzt aktualisiert: "+new Intl.DateTimeFormat("de-DE",{dateStyle:"medium",timeStyle:"short"}).format(new Date(t)):"";
 const ol=$("#offList");ol.innerHTML="";TOOLS.forEach(x=>{const li=document.createElement("li");li.innerHTML=`<span>${x.name}</span><em>${x.note}</em>`;ol.append(li)});
 $("#inst").hidden=standalone}
const bar=p=>{$("#bar").style.width=Math.round(p)+"%"};
$("#prep").onclick=async()=>{
 const b=$("#prep");
 if(!navigator.onLine){$("#offText").textContent="Du bist offline. Verbinde dich mit dem Internet, um zu laden oder zu aktualisieren.";return}
 busy=true;b.disabled=true;b.textContent="Lade …";bar(2);
 try{
  const reg=await navigator.serviceWorker.register("/sw.js");await reg.update().catch(()=>{});
  const sw=(await navigator.serviceWorker.ready).active;
  /* 1) alle Dateien neu laden (Seiten, Skripte, Wolkenbilder …) */
  await new Promise(res=>{const h=e=>{const d=e.data||{};if(d.type==="progress")bar(d.done/d.total*70);if(d.type==="done"){navigator.serviceWorker.removeEventListener("message",h);res()}};
   navigator.serviceWorker.addEventListener("message",h);(navigator.serviceWorker.controller||sw).postMessage({type:"refresh"});setTimeout(res,90000)});
  /* 2) jedes Werkzeug einmal unsichtbar öffnen: Schriften, Karten-Bibliothek, COLREG-Bilder landen im Speicher */
  let i=0;
  for(const t of TOOLS){await new Promise(r=>{const f=document.createElement("iframe");f.style.cssText="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none";f.src=t.path;f.onload=()=>setTimeout(()=>{f.remove();r()},1800);setTimeout(()=>{f.remove();r()},10000);document.body.append(f)});bar(70+ ++i/TOOLS.length*30)}
  S("nt-updated",Date.now())
 }catch(_){$("#offText").textContent="Das hat nicht geklappt. Prüfe deine Verbindung und versuche es noch einmal."}
 busy=false;b.disabled=false;info()};
$("#net").onclick=()=>$("#off").scrollIntoView({behavior:"smooth"});
$(".off").id="off";
if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").then(()=>navigator.serviceWorker.ready).then(()=>setTimeout(info,1500)).catch(()=>{});
render();net();info();
if(location.hash.length>1&&by(location.hash.slice(1)))openTool(location.hash.slice(1),true);
})();
