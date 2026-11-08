(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const I={
 map:'<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
 navtext:'<path d="M12 13v8M8.5 21h7M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8"/><circle cx="12" cy="12" r="1.6"/>',
 colreg:'<circle cx="12" cy="5" r="2"/><path d="M12 7v14M7.5 11h9M5 15a7 7 0 0 0 14 0"/>',
 weather:'<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5 4 4 0 0 1 17.5 18z"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" stroke-width="2.4"/>',
 sailingapp:'<path d="M12 3v14M12 4c4 2 6 6 6 11h-6M12 7c-3 1.5-4.500 4.500-4.500 8H12M4 19h16l-2 2H6z"/>',
 radar:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12l6-6"/><circle cx="16" cy="9" r="1"/>',
 inmarsat:'<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4M12 14.500v2"/>',
 simulator:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1.8"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/>'};
const TOOLS=[
 {id:"simulator",name:"SIMULATOR",path:"/simulator/",d:"Steuern üben: Ruder, Kompass, Telegraf",full:true,isNew:true,note:"Komplett offline (am besten im Querformat)",kw:"simulator steuern ruder rudern telegraf kreiselkompass üben handrad rate of turn training"},
 {id:"map",name:"MAP",path:"/map/",d:"Karte, Routing & Seezeichen",full:false,note:"Besuchte Kartenausschnitte offline; Suche und neue Kacheln brauchen Internet",kw:"karte routing seekarte position tonnen osm"},
 {id:"sailingapp",name:"SEGELN",path:"/sailingapp/",d:"Routen, Logbuch, Ankerwache & Crew",full:false,isNew:true,note:"Routen, Logbuch, Checklisten und Excel-Sicherung offline; neue Kartenkacheln brauchen Internet",kw:"segeln sailing routenplanung route tour logbuch anker ankerwache crew checkliste proviant wartung excel reise bordapotheke"},
 {id:"navtext",name:"NAVTEXT",path:"/navtext/",d:"Furuno NX-700 Simulator & Stationen",full:true,note:"Komplett offline",kw:"navtex nx-700 simulator stationen meldungen funk warnung furuno"},
 {id:"inmarsat",name:"INMARSAT-C",path:"/inmarsat/",d:"Furuno FELCOM 15 Simulator",full:true,note:"Komplett offline",kw:"inmarsat felcom furuno satellit seenotruf telex simulator"},
 {id:"radar",name:"RADAR",path:"/radar/",d:"Furuno FAR-2228 NXT BB Simulator mit AIS",full:true,isNew:true,note:"Komplett offline",kw:"radar ppi ais cpa tcpa ebl vrm parallel index furuno far ziele tonnen"},
 {id:"colreg",name:"COLREG",path:"/colreg/",d:"KVR, Schallsignale, Lichter, Tonnen",full:true,note:"Regeln, Signale und Situationsgrafiken offline",kw:"kvr regeln schallsignal signale lichter tonnen iala ausweichen kreuzen überholen"},
 {id:"weather",name:"WEATHER",path:"/weather/",d:"Wolkenatlas, Radar, Wind, Isobaren",full:false,note:"Wolkenatlas mit Bildern offline; Radar, Wind und Isobaren brauchen Internet",kw:"wetter wolken cumulus cirrus wind radar isobaren luftdruck fronten strömung"},
 {id:"calc",name:"CALC",path:"/calc/",d:"Navigation, Kompassfehler & Schiffstheorie",full:true,note:"Komplett offline",kw:"rechner rechenblatt navigation schiffstheorie kompass deviation schwerpunkt stabilität gyro"}];
const COL={radar:"#30b350",sailingapp:"#32ade6",inmarsat:"#e8476a",simulator:"#ff9f0a",map:"#34c759",navtext:"#9b59d6",colreg:"#7d8c97",weather:"#ff5a4f",calc:"#0a84ff"};
const DN={simulator:"Steering",map:"Karte & Route",sailingapp:"Segeln",navtext:"NAVTEX",inmarsat:"Inmarsat-C",radar:"Radar",colreg:"COLREG",weather:"Wetter",calc:"Rechner"};
const CATS=[{t:{de:"Navigation",en:"Navigation",fil:"Nabigasyon"},ids:["map","sailingapp"]},{t:{de:"Kalkulation",en:"Calculation",fil:"Kalkulasyon"},ids:["calc"]},{t:{de:"Simulatoren",en:"Simulators",fil:"Mga Simulator"},ids:["simulator","radar","navtext","inmarsat"]},{t:{de:"Wetter",en:"Weather",fil:"Panahon"},ids:["weather"]},{t:{de:"Regeln & Seemannschaft",en:"Rules & seamanship",fil:"Mga Alituntunin"},ids:["colreg"]}];
const TOPICS=[["Routenplanung & Reise","sailingapp","","route reise tour planen wegpunkt segeln"],["Logbuch","sailingapp","","logbuch position eintragen track"],["Ankerwache","sailingapp","","anker ankeralarm ankerwache alarm"],["Kompassfehler / Gyro Error","calc","gyro","kompasserror kompassfehler gyro kreiselfehler azimut sonne deviation missweisung"],["Backbord- und Steuerbordtonnen","colreg","buoys","backbord steuerbord tonne tonnen kardinal iala seezeichen"],["Lichterführung","colreg","lights","lichter positionslichter topplicht seitenlicht"],["Schallsignale","colreg","sounds","schallsignale nebelsignal nebelhorn"],["Was muss ich jetzt tun?","colreg","scenarios","ausweichen kreuzen überholen gegenkurs nebel situation"],["Knoten","colreg","knots","knoten palstek webleinenstek achtknoten"],["Wolken (Kumulus, Cirrus …)","weather","cloudPanel","wolken kumulus cumulus cirrus stratus wolkenatlas"],["Strömungen (Karibikstrom …)","weather","currentPanel","strömung karibikstrom golfstrom humboldt"],["Windberechnung","weather","wind","wind wahrer wind scheinbarer wind beaufort"],["Luftdruck & Isobaren","weather","pressure","luftdruck isobaren hoch tief"],["Karte & Route","map","","karte route routing"],["NAVTEXT Stationen","navtext","","navtex station"],["Simulator: Steuern üben","simulator","","simulator ruder telegraf steuern"]];
const L=k=>{try{return JSON.parse(localStorage.getItem(k)||"null")}catch(_){return null}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};
const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const by=id=>TOOLS.find(t=>t.id===id);
let ready=false,busy=false,cfg=L("nt-cfg"),view="home";const BUILD="2026-11-v17",CH='<svg class="chev" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
const offOn=t=>!cfg||!cfg.app||!cfg.app.offline||cfg.app.offline[t.id]!==false;
const mst=id=>{const m=cfg&&cfg.modules&&cfg.modules.find(x=>x.id===id);return !m?"aktiv":!m.enabled?"aus":m.status};
const user=()=>{const u=window.NT&&NT.user&&NT.user();return u?((u.user_metadata&&u.user_metadata.name)||String(u.email||"").split("@")[0]):null},fkey=()=>"nt-fav";
const TT=o=>(window.NT&&NT.T)?NT.T(o):o.de,esc=x=>String(x==null?"":x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const favs=()=>L(fkey())||[];
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,"0")).join("");
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2400)}
/* Ladebildschirm */
const sp=$("#splash"),secs=Math.min(1.1,cfg&&cfg.app&&cfg.app.splashSeconds!=null?cfg.app.splashSeconds:1.1);
if(sessionStorage.getItem("nt-splash")||secs<=0)sp.remove();else{sessionStorage.setItem("nt-splash","1");setTimeout(()=>{sp.classList.add("out");setTimeout(()=>sp.remove(),350)},secs*1000)}
/* Zeilen (iOS-Liste) */
function row(t){const b=document.createElement("div"),st=mst(t.id),on=favs().includes(t.id),bad=st!=="aktiv";b.className="rw"+(bad?" off":"");b.tabIndex=0;b.style.setProperty("--c",COL[t.id]||"#55e5d1");
 const tag=bad?`<span class="ob na">${({aus:"Nicht verfügbar",wartung:"Wartung",planung:"In Planung",stoerung:"Störung"})[st]||""}</span>`:`<span class="ob${t.full?"":" part"}">${t.full?"Offline":"Teils offline"}</span>`;
 b.innerHTML=`<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${I[t.id]}</svg></span><span class="rt"><b>${DN[t.id]||t.name}${t.isNew?'<em class="new">NEU</em>':""}</b><small>${t.d}</small>${tag}</span><button class="star${on?" on":""}" aria-label="Favorit" type="button">${on?"★":"☆"}</button>${CH}`;
 b.querySelector(".star").onclick=e=>{e.stopPropagation();buzz();const f=favs(),i=f.indexOf(t.id);i<0?f.push(t.id):f.splice(i,1);S(fkey(),f);render();renderFav()};
 b.onclick=()=>{if(bad&&st!=="stoerung")return toast((DN[t.id]||t.name)+" ist gerade nicht verfügbar.");buzz();openTool(t.id)};return b}
function render(){const q=$("#q").value.trim().toLowerCase(),box=$("#cats");box.innerHTML="";
 if(q){const hits=TOOLS.filter(t=>(t.name+" "+(DN[t.id]||"")+" "+t.d+" "+t.kw).toLowerCase().includes(q)),gl=document.createElement("div");gl.className="gl";hits.forEach(t=>gl.append(row(t)));if(hits.length)box.append(gl)}
 else CATS.forEach(c=>{const ts=c.ids.map(by).filter(Boolean);if(!ts.length)return;const s=document.createElement("section"),gl=document.createElement("div");s.className="sx";gl.className="gl";s.innerHTML=`<h2>${TT(c.t)}</h2>`;ts.forEach(t=>gl.append(row(t)));s.append(gl);box.append(s)});
 const tp=q?TOPICS.filter(x=>(x[0]+" "+x[3]).toLowerCase().includes(q)).slice(0,5):[],nh=q?TOOLS.filter(t=>(t.name+" "+(DN[t.id]||"")+" "+t.d+" "+t.kw).toLowerCase().includes(q)).length:1;
 $("#topics").innerHTML=tp.map((x,i)=>`<button class="topic" data-i="${i}" type="button"><b>${x[0]}</b><small>${DN[x[1]]||by(x[1]).name}</small></button>`).join("");
 $$("#topics .topic").forEach((b,i)=>b.onclick=()=>openTool(tp[i][1],false,tp[i][2]));
 $("#none").hidden=nh>0||tp.length>0;$("#chips").hidden=!!q;chips();resume(q)}
function chips(){const c=$("#chips");if(c.dataset.on)return;c.dataset.on=1;c.innerHTML=TOPICS.slice(0,9).map((x,i)=>`<button type="button" class="chip" data-i="${i}">${x[0].replace(/ \(.*\)/,"")}</button>`).join("");$$("#chips .chip").forEach(b=>b.onclick=()=>{const x=TOPICS[+b.dataset.i];buzz();openTool(x[1],false,x[2])})}
function resume(q){const id=L("nt-last"),t=id&&by(id),b=$("#resume");if(!t||q||mst(id)!=="aktiv"){b.hidden=true;return}b.hidden=false;$("#resName").textContent=(DN[t.id]||t.name)+" · "+t.d;$("#resIc").innerHTML=I[t.id];b.style.setProperty("--c",COL[t.id]);b.onclick=()=>{buzz();openTool(t.id)}}
function buzz(){try{navigator.vibrate&&navigator.vibrate(7)}catch(_){}}
function renderFav(){const f=favs(),g=$("#favgrid");g.innerHTML="";const ts=TOOLS.filter(t=>f.includes(t.id));if(ts.length){const gl=document.createElement("div");gl.className="gl";ts.forEach(t=>gl.append(row(t)));g.append(gl)}$("#favnone").hidden=ts.length>0}
$("#q").addEventListener("input",render);
$("#q").addEventListener("keydown",e=>{if(e.key!=="Enter")return;const q=$("#q").value.trim().toLowerCase(),tp=TOPICS.filter(x=>(x[0]+" "+x[3]).toLowerCase().includes(q)),h=TOOLS.filter(t=>(t.name+" "+(DN[t.id]||"")+" "+t.d+" "+t.kw).toLowerCase().includes(q));e.target.blur();if(tp.length)openTool(tp[0][1],false,tp[0][2]);else if(h.length)openTool(h[0].id)});
/* Viewer */
const frame=$("#frame");
function openTool(id,pushed,hash){const t=by(id);if(!t)return;S("nt-last",id);if(id==="simulator"&&document.documentElement.dataset.dev==="phone"&&innerHeight>innerWidth)toast("Tipp: Für den Simulator das Gerät quer drehen");$("#vtitle").textContent=DN[id]||t.name;frame.src=t.path+(hash?"#"+hash:"");$("#viewer").hidden=false;if(!pushed)history.pushState({tool:id},"","#"+id)}
function closeTool(fromPop){$("#viewer").hidden=true;frame.src="about:blank";setTimeout(()=>{hello();render();if(view==="me")acct()},60);if(!fromPop&&history.state&&history.state.tool)history.back()}
$("#back").onclick=()=>closeTool(false);
$("#reload").onclick=()=>{try{frame.contentWindow.location.reload()}catch(_){frame.src=frame.src}};
addEventListener("popstate",e=>{if(e.state&&e.state.tool&&by(e.state.tool))openTool(e.state.tool,true);else closeTool(true)});
function openPage(title,path){$("#vtitle").textContent=title;frame.src=path;$("#viewer").hidden=false;history.pushState({tool:"page"},"","#konto")}
addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#viewer").hidden)closeTool(false)});
/* Wischen vom linken Rand = zurück (wie iOS) */
{let sx=null;const ed=$("#edge");ed.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});ed.addEventListener("touchmove",e=>{if(sx!==null&&e.touches[0].clientX-sx>70){sx=null;closeTool(false)}},{passive:true});ed.addEventListener("touchend",()=>sx=null)}
/* Tab-Leiste */
const tbar=$("#tabbar");
const tabs=()=>$$("#tabbar button").filter(b=>!b.hidden);
function show(v){view=v;$$(".view").forEach(x=>x.hidden=x.id!=="v-"+v);tabs().forEach(b=>b.classList.toggle("on",b.dataset.v===v));if(v==="fav")renderFav();if(v==="me"){acct();info()}scrollTo({top:0})}
$$("#tabbar button").forEach(b=>b.onclick=()=>{if(b.dataset.v===view)return scrollTo({top:0,behavior:"smooth"});buzz();show(b.dataset.v)});
function dev(){const w=innerWidth,h=innerHeight,land=w>h,coarse=matchMedia("(pointer:coarse)").matches,sm=Math.min(screen.width,screen.height),m=coarse&&sm<700?sm:Math.min(w,h),d=m<600?"phone":coarse?"tablet":"desktop",r=document.documentElement;r.dataset.dev=d;r.dataset.orient=land?"land":"port";r.dataset.app=standalone?"1":"0"}
function hello(){const h=new Date().getHours(),G={n:{de:"Gute Nacht",en:"Good night",fil:"Magandang gabi"},m:{de:"Moin",en:"Good morning",fil:"Magandang umaga"},t:{de:"Guten Tag",en:"Good day",fil:"Magandang araw"},a:{de:"Guten Abend",en:"Good evening",fil:"Magandang gabi"}},g=TT(h<5?G.n:h<11?G.m:h<17?G.t:h<22?G.a:G.n),u=user();$("#hi").textContent=g+(u?", "+u:"")}
addEventListener("resize",dev);addEventListener("orientationchange",()=>setTimeout(dev,250));

/* Konto (gemeinsame Anmeldung für ganz navtool.de) und Sprache */
function acct(){
 const box=$("#acc"),lb=$("#langcard");if(!box)return;
 const u=window.NT&&NT.user&&NT.user(),n=user();
 box.innerHTML=u?`<h3>${TT({de:"Angemeldet",en:"Signed in",fil:"Naka-sign in"})}</h3><p class="mu"><b>${esc(n)}</b><br>${esc(u.email)}</p><p class="mu">${TT({de:"Reisen, Crew, Favoriten und Kalkulationen sind auf jedem Gerät da.",en:"Trips, crew, favourites and calculations are available on every device.",fil:"Nasa bawat device ang mga biyahe, crew, paborito at kalkulasyon."})}</p><div class="acrow"><button class="bt pri" id="a-dash" type="button">Dashboard</button><button class="bt" id="a-out" type="button">${TT({de:"Abmelden",en:"Sign out",fil:"Mag-sign out"})}</button></div>`
  :`<h3>${TT({de:"Anmelden",en:"Sign in",fil:"Mag-sign in"})}</h3><p class="mu">${TT({de:"Mit deinem NavTool-Konto sind Reisen der SailingApp, Crew, Favoriten und Kalkulationen auf allen Geräten verfügbar.",en:"With your NavTool account, SailingApp trips, crew, favourites and calculations are available on all devices.",fil:"Sa iyong NavTool account, magagamit sa lahat ng device ang mga biyahe ng SailingApp, crew, paborito at kalkulasyon."})}</p><div class="acrow"><button class="bt pri" id="a-in" type="button">${TT({de:"Anmelden",en:"Sign in",fil:"Mag-sign in"})}</button><button class="bt" id="a-reg" type="button">${TT({de:"Registrieren",en:"Register",fil:"Magparehistro"})}</button></div>`;
 const g=id=>box.querySelector(id);
 if(u){g("#a-dash").onclick=()=>openPage(TT({de:"KONTO",en:"ACCOUNT",fil:"ACCOUNT"}),"/konto/");g("#a-out").onclick=()=>{try{const k=Object.keys(localStorage).find(x=>/^sb-.*-auth-token$/.test(x));const s=k&&JSON.parse(localStorage.getItem(k));if(s&&window.NT_SB)fetch(NT_SB.url+"/auth/v1/logout",{method:"POST",headers:{apikey:NT_SB.key,Authorization:"Bearer "+s.access_token}}).catch(()=>{});if(k)localStorage.removeItem(k);localStorage.removeItem("nt-admin")}catch(_){}hello();acct()}}
 else{g("#a-in").onclick=()=>openPage(TT({de:"ANMELDEN",en:"SIGN IN",fil:"MAG-SIGN IN"}),"/konto/?m=login");g("#a-reg").onclick=()=>openPage(TT({de:"REGISTRIEREN",en:"REGISTER",fil:"MAGPAREHISTRO"}),"/konto/?m=register")}
 const cur=(window.NT&&NT.lang)||"de",more=((window.NT&&NT.langs)||[]);
 lb.innerHTML=`<h3>${TT({de:"Sprache",en:"Language",fil:"Wika"})}</h3><div class="acrow" translate="no">${[["de","Deutsch"],["en","English"],["fil","Filipino"]].map(x=>`<button type="button" class="bt lg${cur===x[0]?" sel":""}" data-l="${x[0]}">${x[1]}</button>`).join("")}</div><label class="mu lsel" translate="no">${TT({de:"Weitere Sprachen",en:"More languages",fil:"Iba pang wika"})}<select id="a-more"><option value="">…</option>${more.map(m=>`<option value="${m[0]}"${cur===m[0]?" selected":""}>${m[1]}</option>`).join("")}</select></label><p class="mu">${TT({de:"Weitere Sprachen werden maschinell übersetzt und brauchen Internet. Deutsch, Englisch und Filipino laufen auch offline.",en:"Other languages are machine-translated and need internet. German, English and Filipino also work offline.",fil:"Awtomatikong isinasalin ang iba pang wika at kailangan ng internet. Gumagana rin offline ang German, English at Filipino."})}</p>`;
 lb.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{if(b.dataset.l!==cur)NT.setLang(b.dataset.l)});
 const sel=lb.querySelector("#a-more");sel.onchange=()=>{if(sel.value)NT.setLang(sel.value)};
}
const lc=$("#lchip");if(lc){lc.querySelector("span").textContent=String(((window.NT&&NT.lang)||"de").split("-")[0]).toUpperCase();lc.onclick=()=>{show("me");setTimeout(()=>$("#langcard").scrollIntoView({behavior:"smooth"}),60)}}

/* Konfiguration aus dem Admin-Tool */
function applyCfg(){const a=cfg&&cfg.app;if(!a)return;$$("#tabbar button").forEach(b=>b.hidden=a.tabs&&a.tabs[b.dataset.v==="me"?"profile":b.dataset.v==="fav"?"favorites":"home"]===false);
 if(tabs().length&&!tabs().some(b=>b.dataset.v===view))view=tabs()[0].dataset.v;$("#ver").textContent=a.version||"1.0";$("#anote").textContent=a.note||"Keine neuen Hinweise.";render();show(view)}
fetch("/data/config.json?"+Date.now(),{cache:"no-store"}).then(r=>r.json()).then(j=>{cfg=j;S("nt-cfg",j);applyCfg()}).catch(()=>{});
/* Offline-Status */
function net(){const p=$("#net"),on=navigator.onLine;p.className="cap "+(!on?"off":ready?"ok":"");p.querySelector("span").textContent=!on?"Offline":ready?"Offline bereit":"Nicht geladen"}
addEventListener("online",net);addEventListener("offline",net);
async function count(){try{let n=0;for(const k of await caches.keys())n+=(await(await caches.open(k)).keys()).length;return n}catch(_){return 0}}
async function info(){
 const n=await count(),sw=("serviceWorker"in navigator)&&!!navigator.serviceWorker.controller,t=L("nt-updated");
 ready=n>40&&sw;net();
 const st=$("#state");st.textContent=ready?"Bereit":"Fehlt";st.className="state "+(ready?"ok":"no");
 $("#offText").textContent=ready?`${n} Dateien gespeichert – NAVTOOL läuft auch ohne Netz.`:"Lade das Offline-Paket einmal mit Internet, dann funktioniert alles auch unterwegs.";
 if(!busy){$("#bar").style.width=ready?"100%":"0%";const b=$("#prep");b.textContent=ready?"Inhalte aktualisieren":"Alle Inhalte laden"}
 $("#stamp").textContent=t?"Zuletzt aktualisiert: "+new Intl.DateTimeFormat("de-DE",{dateStyle:"medium",timeStyle:"short"}).format(new Date(t)):"";
 const ol=$("#offList");ol.innerHTML="";TOOLS.forEach(x=>{const li=document.createElement("li");li.innerHTML=`<span>${DN[x.id]||x.name}</span><em>${x.note}</em>`;ol.append(li)});
 $("#inst").hidden=standalone}
const bar=p=>{$("#bar").style.width=Math.round(p)+"%"};
async function prep(silent){
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
  S("nt-updated",Date.now());S("nt-build",BUILD);if(silent)toast("Alle Inhalte sind jetzt offline verfügbar")
 }catch(_){$("#offText").textContent="Das hat nicht geklappt. Prüfe deine Verbindung und versuche es noch einmal."}
 busy=false;b.disabled=false;info()}
$("#prep").onclick=()=>prep(false);
$("#net").onclick=()=>{show("me");setTimeout(()=>$("#off").scrollIntoView({behavior:"smooth"}),60)};
$(".off").id="off";
if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").then(()=>navigator.serviceWorker.ready).then(()=>setTimeout(()=>{info();if(navigator.onLine&&L("nt-build")!==BUILD&&!busy){toast("Neue Inhalte werden geladen …");prep(true)}},2500)).catch(()=>{});
dev();hello();applyCfg();render();net();info();show("home");
if(location.hash.length>1&&by(location.hash.slice(1)))openTool(location.hash.slice(1),true);
})();
