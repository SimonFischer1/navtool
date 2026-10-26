(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const I={
 map:'<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
 navtext:'<path d="M12 13v8M8.5 21h7M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8"/><circle cx="12" cy="12" r="1.6"/>',
 colreg:'<circle cx="12" cy="5" r="2"/><path d="M12 7v14M7.5 11h9M5 15a7 7 0 0 0 14 0"/>',
 weather:'<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5 4 4 0 0 1 17.5 18z"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" stroke-width="2.4"/>',
 simulator:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1.8"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/>'};
const TOOLS=[
 {id:"simulator",name:"SIMULATOR",path:"/simulator/",d:"Steuern üben: Ruder, Kompass, Telegraf",full:true,isNew:true,note:"Komplett offline (am besten im Querformat)",kw:"simulator steuern ruder rudern telegraf kreiselkompass üben handrad rate of turn training"},
 {id:"map",name:"MAP",path:"/map/",d:"Karte, Routing & Seezeichen",full:false,note:"Besuchte Kartenausschnitte offline; Suche und neue Kacheln brauchen Internet",kw:"karte routing seekarte position tonnen osm"},
 {id:"navtext",name:"NAVTEXT",path:"/navtext/",d:"Stationen & Meldungen",full:true,note:"Komplett offline",kw:"navtex stationen meldungen funk warnung"},
 {id:"colreg",name:"COLREG",path:"/colreg/",d:"KVR, Schallsignale, Lichter, Tonnen",full:true,note:"Regeln, Signale und Situationsgrafiken offline",kw:"kvr regeln schallsignal signale lichter tonnen iala ausweichen kreuzen überholen"},
 {id:"weather",name:"WEATHER",path:"/weather/",d:"Wolkenatlas, Radar, Wind, Isobaren",full:false,note:"Wolkenatlas mit Bildern offline; Radar, Wind und Isobaren brauchen Internet",kw:"wetter wolken cumulus cirrus wind radar isobaren luftdruck fronten strömung"},
 {id:"calc",name:"CALC",path:"/calc/",d:"Navigation, Kompassfehler & Schiffstheorie",full:true,note:"Komplett offline",kw:"rechner rechenblatt navigation schiffstheorie kompass deviation schwerpunkt stabilität gyro"}];
const COL={simulator:"#ffb454",map:"#4fe08a",navtext:"#b393ff",colreg:"#f2f6f6",weather:"#ff7b7b",calc:"#5aa9ff"};
const TOPICS=[["Kompassfehler / Gyro Error","calc","gyro","kompasserror kompassfehler gyro kreiselfehler azimut sonne deviation missweisung"],["Backbord- und Steuerbordtonnen","colreg","buoys","backbord steuerbord tonne tonnen kardinal iala seezeichen"],["Lichterführung","colreg","lights","lichter positionslichter topplicht seitenlicht"],["Schallsignale","colreg","sounds","schallsignale nebelsignal nebelhorn"],["Was muss ich jetzt tun?","colreg","scenarios","ausweichen kreuzen überholen gegenkurs nebel situation"],["Knoten","colreg","knots","knoten palstek webleinenstek achtknoten"],["Wolken (Kumulus, Cirrus …)","weather","cloudPanel","wolken kumulus cumulus cirrus stratus wolkenatlas"],["Strömungen (Karibikstrom …)","weather","currentPanel","strömung karibikstrom golfstrom humboldt"],["Windberechnung","weather","wind","wind wahrer wind scheinbarer wind beaufort"],["Luftdruck & Isobaren","weather","pressure","luftdruck isobaren hoch tief"],["Karte & Route","map","","karte route routing"],["NAVTEXT Stationen","navtext","","navtex station"],["Simulator: Steuern üben","simulator","","simulator ruder telegraf steuern"]];
const L=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch(_){return null}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};
const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const by=id=>TOOLS.find(t=>t.id===id);
let ready=false,busy=false,cfg=L("nt-cfg"),view="home";
const offOn=t=>!cfg||!cfg.app||!cfg.app.offline||cfg.app.offline[t.id]!==false;
const mst=id=>{const m=cfg&&cfg.modules&&cfg.modules.find(x=>x.id===id);return !m?"aktiv":!m.enabled?"aus":m.status};
const user=()=>null,fkey=()=>"nt-fav";
const favs=()=>L(fkey())||[];
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,"0")).join("");
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2400)}
/* Ladebildschirm */
const sp=$("#splash"),secs=Math.min(1.1,cfg&&cfg.app&&cfg.app.splashSeconds!=null?cfg.app.splashSeconds:1.1);
if(sessionStorage.getItem("nt-splash")||secs<=0)sp.remove();else{sessionStorage.setItem("nt-splash","1");setTimeout(()=>{sp.classList.add("out");setTimeout(()=>sp.remove(),350)},secs*1000)}
/* Kacheln */
function tile(t){const b=document.createElement("div"),st=mst(t.id),on=favs().includes(t.id);b.className="tile"+(st!=="aktiv"?" off":"");b.tabIndex=0;b.style.setProperty("--c",COL[t.id]||"#55e5d1");
 b.innerHTML=`<button class="star${on?" on":""}" aria-label="Favorit" type="button">${on?"★":"☆"}</button><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${I[t.id]}</svg></span><b>${t.name}${t.isNew?'<em class="new">NEU</em>':""}</b><span class="d">${t.d}</span><span class="tag ${t.full?"":"part"}">${st!=="aktiv"?({aus:"Nicht verfügbar",wartung:"Wartung",planung:"In Planung",stoerung:"Störung"})[st]:t.full?"Voll offline":"Teilweise offline"}</span>`;
 b.querySelector(".star").onclick=e=>{e.stopPropagation();const f=favs(),i=f.indexOf(t.id);i<0?f.push(t.id):f.splice(i,1);S(fkey(),f);render();renderFav()};
 b.onclick=()=>{if(st==="aus"||st==="wartung"||st==="planung")return toast(t.name+" ist gerade nicht verfügbar.");openTool(t.id)};return b}
function render(){const q=$("#q").value.trim().toLowerCase(),g=$("#grid");g.innerHTML="";
 const hits=TOOLS.filter(t=>!q||(t.name+" "+t.d+" "+t.kw).toLowerCase().includes(q));hits.forEach(t=>g.append(tile(t)));
 const tp=q?TOPICS.filter(x=>(x[0]+" "+x[3]).toLowerCase().includes(q)).slice(0,5):[];
 $("#topics").innerHTML=tp.map((x,i)=>`<button class="topic" data-i="${i}" type="button"><b>${x[0]}</b><small>${by(x[1]).name} →</small></button>`).join("");
 $$("#topics .topic").forEach((b,i)=>b.onclick=()=>openTool(tp[i][1],false,tp[i][2]));
 $("#none").hidden=hits.length>0||tp.length>0;$("#feat").hidden=!!q;$("#chips").hidden=!!q;chips();resume(q)}
function chips(){const c=$("#chips");if(c.dataset.on)return;c.dataset.on=1;c.innerHTML=TOPICS.slice(0,9).map((x,i)=>`<button type="button" class="chip" data-i="${i}" style="--c:${COL[x[1]]||"#55e5d1"}">${x[0].replace(/ \(.*\)/,"")}</button>`).join("");$$("#chips .chip").forEach(b=>b.onclick=()=>{const x=TOPICS[+b.dataset.i];buzz();openTool(x[1],false,x[2])})}
function resume(q){const id=L("nt-last"),t=id&&by(id),b=$("#resume");if(!t||q||mst(id)!=="aktiv"){b.hidden=true;return}b.hidden=false;$("#resName").textContent=t.name+" · "+t.d;$("#resIc").innerHTML=I[t.id];b.style.setProperty("--c",COL[t.id]);b.onclick=()=>{buzz();openTool(t.id)}}
function buzz(){try{navigator.vibrate&&navigator.vibrate(7)}catch(_){}}
function renderFav(){const f=favs(),g=$("#favgrid");g.innerHTML="";TOOLS.filter(t=>f.includes(t.id)).forEach(t=>g.append(tile(t)));$("#favnone").hidden=f.length>0}
$("#q").addEventListener("input",render);
$("#q").addEventListener("keydown",e=>{if(e.key!=="Enter")return;const q=$("#q").value.trim().toLowerCase(),tp=TOPICS.filter(x=>(x[0]+" "+x[3]).toLowerCase().includes(q)),h=TOOLS.filter(t=>(t.name+" "+t.d+" "+t.kw).toLowerCase().includes(q));e.target.blur();if(tp.length)openTool(tp[0][1],false,tp[0][2]);else if(h.length)openTool(h[0].id)});
$("#feat").onclick=()=>openTool("simulator");
/* Viewer */
const frame=$("#frame");
function openTool(id,pushed,hash){const t=by(id);if(!t)return;S("nt-last",id);if(id==="simulator"&&document.documentElement.dataset.dev==="phone"&&innerHeight>innerWidth)toast("Tipp: Für den Simulator das Gerät quer drehen");$("#vtitle").textContent=t.name;frame.src=t.path+(hash?"#"+hash:"");$("#viewer").hidden=false;if(!pushed)history.pushState({tool:id},"","#"+id)}
function closeTool(fromPop){$("#viewer").hidden=true;frame.src="about:blank";if(!fromPop&&history.state&&history.state.tool)history.back()}
$("#back").onclick=()=>closeTool(false);
$("#reload").onclick=()=>{try{frame.contentWindow.location.reload()}catch(_){frame.src=frame.src}};
addEventListener("popstate",e=>{if(e.state&&e.state.tool)openTool(e.state.tool,true);else closeTool(true)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#viewer").hidden)closeTool(false)});
/* Tab-Leiste (Liquid-Glass-Blase: antippen oder schieben) */
const tbar=$("#tabbar"),bub=$("#bub");let drag=null;
const tabs=()=>$$("#tabbar button").filter(b=>!b.hidden);
function place(i,live){const v=tbar.classList.contains("v"),n=tabs().length,w=((v?tbar.clientHeight:tbar.clientWidth)-12)/n;if(v){bub.style.height=w+"px";bub.style.width="auto"}else{bub.style.width=w+"px";bub.style.height=""}bub.style.transition=live!==undefined?"none":"";const o=live!==undefined&&live!==true?live:i*w;bub.style.transform=`translate${v?"Y":"X"}(${o}px)`+(live!==undefined?" scale(1.08)":"")}
const ax=e=>tbar.classList.contains("v")?e.clientY:e.clientX;
function show(v){view=v;$$(".view").forEach(x=>x.hidden=x.id!=="v-"+v);const ts=tabs();ts.forEach(b=>b.classList.toggle("on",b.dataset.v===v));place(Math.max(0,ts.findIndex(b=>b.dataset.v===v)));if(v==="fav")renderFav();if(v==="me"){acct();info()}scrollTo({top:0})}
tbar.addEventListener("pointerdown",e=>{drag={x:ax(e),moved:false};tbar.setPointerCapture(e.pointerId)});
tbar.addEventListener("pointermove",e=>{if(!drag)return;if(Math.abs(ax(e)-drag.x)>6)drag.moved=true;if(drag.moved){const v=tbar.classList.contains("v"),r=tbar.getBoundingClientRect(),n=tabs().length,len=(v?r.height:r.width)-12,w=len/n;place(0,Math.max(0,Math.min(len-w,ax(e)-(v?r.top:r.left)-6-w/2)))}});
tbar.addEventListener("pointerup",e=>{if(!drag)return;const v=tbar.classList.contains("v"),r=tbar.getBoundingClientRect(),ts=tabs(),w=((v?r.height:r.width)-12)/ts.length,i=Math.max(0,Math.min(ts.length-1,Math.floor((ax(e)-(v?r.top:r.left)-6)/w)));drag=null;buzz();show(ts[i].dataset.v)});
function dev(){const w=innerWidth,h=innerHeight,land=w>h,coarse=matchMedia("(pointer:coarse)").matches,sm=Math.min(screen.width,screen.height),m=coarse&&sm<700?sm:Math.min(w,h),d=m<600?"phone":coarse?"tablet":"desktop",r=document.documentElement;
 r.dataset.dev=d;r.dataset.orient=land?"land":"port";r.dataset.app=standalone?"1":"0";tbar.classList.toggle("v",d==="phone"&&land)}
function hello(){const h=new Date().getHours(),g=h<5?"Gute Nacht":h<11?"Moin":h<17?"Guten Tag":h<22?"Guten Abend":"Gute Nacht",u=user();$("#hi").textContent=g+(u?", "+u:"")}
addEventListener("resize",()=>{dev();show(view)});addEventListener("orientationchange",()=>setTimeout(()=>{dev();show(view)},250));
/* Konto (lokal auf diesem Gerät) */
/* Konfiguration aus dem Admin-Tool */
function applyCfg(){const a=cfg&&cfg.app;if(!a)return;$$("#tabbar button").forEach(b=>b.hidden=a.tabs&&a.tabs[b.dataset.v==="me"?"profile":b.dataset.v==="fav"?"favorites":"home"]===false);
 if(tabs().length&&!tabs().some(b=>b.dataset.v===view))view=tabs()[0].dataset.v;$("#ver").textContent=a.version||"1.0";$("#anote").textContent=a.note||"Keine neuen Hinweise.";render();show(view)}
fetch("/data/config.json?"+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(j=>{cfg=j;S("nt-cfg",j);applyCfg()}).catch(()=>{});
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
  for(const t of TOOLS.filter(offOn)){await new Promise(r=>{const f=document.createElement("iframe");f.style.cssText="position:fixed;width:1px;height:1px;opacity:0;pointer-events:none";f.src=t.path;f.onload=()=>setTimeout(()=>{f.remove();r()},1800);setTimeout(()=>{f.remove();r()},10000);document.body.append(f)});bar(70+ ++i/TOOLS.length*30)}
  S("nt-updated",Date.now())
 }catch(_){$("#offText").textContent="Das hat nicht geklappt. Prüfe deine Verbindung und versuche es noch einmal."}
 busy=false;b.disabled=false;info()};
$("#net").onclick=()=>$("#off").scrollIntoView({behavior:"smooth"});
$(".off").id="off";
if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").then(()=>navigator.serviceWorker.ready).then(()=>setTimeout(info,1500)).catch(()=>{});
dev();hello();applyCfg();render();net();info();show("home");
if(location.hash.length>1&&by(location.hash.slice(1)))openTool(location.hash.slice(1),true);
})();
