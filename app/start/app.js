(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const TOOLS=[
 {id:"map",name:"Map",ic:"⌖",path:"/map/",d:"Karte, Routing und Seezeichen",full:false,note:"Karte nur für bereits angesehene Ausschnitte; Suche und Live-Daten brauchen Internet",kw:"karte routing seekarte position tonnen osm"},
 {id:"colreg",name:"COLREG",ic:"⚓",path:"/colreg/",d:"KVR, Schallsignale, Lichter, Tonnen",full:true,note:"Alle Regeln und Signaltöne offline; Bilder nach dem Offline-Paket",kw:"kvr regeln schallsignal signal lichter tonnen iala ausweichen seeschstro"},
 {id:"calc",name:"Rechenblatt",ic:"∑",path:"/calc/",d:"Navigation und Schiffstheorie",full:true,note:"Komplett offline",kw:"rechner navigation schiffstheorie kompass deviation schwerpunkt stabilität"},
 {id:"weather",name:"Wetter",ic:"≋",path:"/weather/",d:"Wolkenatlas, Radar, Wind, Isobaren",full:false,note:"Wolkenatlas offline; Radar, Wind und Isobaren brauchen Internet",kw:"wetter wolken cumulus cirrus wind radar isobaren luftdruck"},
 {id:"navtext",name:"NAVTEXT",ic:"✉",path:"/navtext/",d:"Stationen und Meldungen",full:true,note:"Komplett offline",kw:"navtex stationen meldungen funk warnung"},
 {id:"crew",name:"Crew",ic:"☰",path:"/crew/crew/",d:"Crew, Aufträge und Bordbuch",full:false,note:"Daten liegen lokal im Gerät; Karte und AIS brauchen Internet",kw:"crew mannschaft jobs aufträge bordbuch kapitän portal"}
];
const L=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch(_){return null}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};
let fav=L("nt-fav")||[],last=L("nt-last");
const toolBy=id=>TOOLS.find(t=>t.id===id);

/* Karten */
function card(t,compact){
 const b=document.createElement("div");b.className="card";b.tabIndex=0;b.setAttribute("role","button");
 b.innerHTML=`<span class="ic">${t.ic}</span><b>${t.name}</b><span class="d">${t.d}</span><span class="tag ${t.full?"":"part"}">${t.full?"Voll offline":"Teilweise offline"}</span><button class="star ${fav.includes(t.id)?"on":""}" aria-label="Favorit" type="button">${fav.includes(t.id)?"★":"☆"}</button>`;
 b.addEventListener("click",e=>{if(e.target.closest(".star")){toggleFav(t.id);return}openTool(t.id)});
 b.addEventListener("keydown",e=>{if(e.key==="Enter")openTool(t.id)});
 return b}
function toggleFav(id){fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];S("nt-fav",fav);renderHome()}
function renderHome(){
 const g=$("#grid");g.innerHTML="";
 [...TOOLS].sort((a,b)=>fav.includes(b.id)-fav.includes(a.id)).forEach(t=>g.append(card(t)));
 const r=$("#resume");r.innerHTML="";
 const lt=last&&toolBy(last);
 if(lt){const b=document.createElement("button");b.className="resume";b.type="button";b.innerHTML=`<span class="ic">${lt.ic}</span><div><small>Weitermachen</small><b>${lt.name}</b></div><span class="go">›</span>`;b.onclick=()=>openTool(lt.id);r.append(b)}
}
/* Suche */
function search(){
 const q=$("#q").value.trim().toLowerCase(),box=$("#results");box.innerHTML="";
 const hits=TOOLS.filter(t=>!q||(t.name+" "+t.d+" "+t.kw).toLowerCase().includes(q));
 if(!hits.length){box.innerHTML='<p class="mute">Nichts gefunden. Versuche „KVR“, „Wolken“ oder „Rechner“.</p>';return}
 hits.forEach(t=>box.append(card(t)))}
$("#q").addEventListener("input",search);
/* Tabs */
function show(v){$$(".view").forEach(x=>x.classList.toggle("on",x.id==="v-"+v));$$(".tabs button").forEach(b=>b.classList.toggle("on",b.dataset.v===v));if(v==="search"){search();}if(v==="offline")offlineInfo()}
$$(".tabs button").forEach(b=>b.onclick=()=>show(b.dataset.v));
/* Viewer */
const frame=$("#frame");
function openTool(id,pushed){
 const t=toolBy(id);if(!t)return;last=id;S("nt-last",id);
 $("#vtitle").textContent=t.name.toUpperCase();frame.src=t.path;$("#viewer").hidden=false;
 if(!pushed)history.pushState({tool:id},"","#"+id)}
function closeTool(fromPop){
 $("#viewer").hidden=true;frame.src="about:blank";renderHome();
 if(!fromPop&&history.state&&history.state.tool)history.back()}
frame.addEventListener("load",()=>{try{const d=frame.contentDocument;if(!d||!d.head)return;const s=d.createElement("style");s.textContent=".nt-home{display:none!important}";d.head.append(s)}catch(_){}});
$("#back").onclick=()=>closeTool(false);
$("#reload").onclick=()=>{try{frame.contentWindow.location.reload()}catch(_){frame.src=frame.src}};
addEventListener("popstate",e=>{if(e.state&&e.state.tool)openTool(e.state.tool,true);else closeTool(true)});
/* Netzstatus */
function net(){const p=$("#net");const on=navigator.onLine;p.className="pill "+(ready?"ok":on?"":"off");p.querySelector("span").textContent=!on?"Offline":ready?"Offline bereit":"Wird vorbereitet…"}
addEventListener("online",net);addEventListener("offline",net);
let ready=false;
/* Offline-Paket */
async function cacheCount(){try{const ks=await caches.keys();let n=0;for(const k of ks){n+=(await (await caches.open(k)).keys()).length}return n}catch(_){return 0}}
async function offlineInfo(){
 const n=await cacheCount(),sw=("serviceWorker"in navigator)&&!!navigator.serviceWorker.controller;
 ready=n>40&&sw;net();
 $("#offTitle").textContent=ready?"Offline bereit":"Noch nicht vollständig";
 $("#offText").textContent=ready?`${n} Dateien sind auf diesem Gerät gespeichert. Die App läuft auch ohne Netz.`:"Öffne die App einmal mit Internet und tippe auf „Offline-Paket laden“.";
 $("#meterBar").style.width=ready?"100%":Math.min(90,n)+"%";
 const ol=$("#offList");ol.innerHTML="";TOOLS.forEach(t=>{const li=document.createElement("li");li.innerHTML=`<span>${t.ic} ${t.name}</span><em>${t.note}</em>`;ol.append(li)})}
$("#prep").onclick=async()=>{
 const b=$("#prep");b.disabled=true;b.textContent="Lade…";
 if(!navigator.onLine){$("#offText").textContent="Du bist offline. Verbinde dich, um das Paket zu laden.";b.disabled=false;b.textContent="Offline-Paket laden";return}
 try{const reg=await navigator.serviceWorker.register("/sw.js");await reg.update();await navigator.serviceWorker.ready}catch(_){}
 let i=0;
 for(const t of TOOLS){ /* jedes Werkzeug einmal unsichtbar laden, damit Schriften, Karten-Bibliothek und Bilder im Zwischenspeicher landen */
  await new Promise(r=>{const f=document.createElement("iframe");f.style.cssText="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none";f.src=t.path;f.onload=()=>setTimeout(()=>{f.remove();r()},1500);setTimeout(()=>{f.remove();r()},9000);document.body.append(f)});
  $("#meterBar").style.width=Math.round(++i/TOOLS.length*100)+"%"}
 b.disabled=false;b.textContent="Offline-Paket aktualisieren";offlineInfo()};
$("#net").onclick=()=>show("offline");
/* Start */
if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").then(()=>navigator.serviceWorker.ready).then(()=>setTimeout(offlineInfo,1500)).catch(()=>{});
renderHome();net();offlineInfo();
if(location.hash.length>1&&toolBy(location.hash.slice(1)))openTool(location.hash.slice(1),true);
})();
