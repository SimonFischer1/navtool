/* NAVTOOL · gemeinsames Gerüst: Header, Footer, Konfiguration, Status-Sperre, Besuchszähler */
(function(){
const NS='navtool.de',AB='https://abacus.jasoncameron.dev';
const path=location.pathname,seg=path.split('/').filter(Boolean)[0]||'home',inFrame=window.self!==window.top;
const bare=inFrame||path.startsWith('/app/start')||seg==='simulator';
const MODS=[['map','MAP','/map/'],['navtext','NAVTEXT','/navtext/'],['colreg','COLREG','/colreg/'],['weather','WEATHER','/weather/'],['calc','CALC','/calc/'],['sailingapp','SAILING','/sailingapp/'],['simulator','SIMULATOR','/simulator/'],['app','APP','/app/']];
/* ===== Sprache: de / en / fil in den Wörterbüchern, alle weiteren Sprachen per Übersetzungsdienst (Basis Englisch) ===== */
const BASE=['de','en','fil'];
let lang=localStorage.getItem('navtool-lang')||'de';
const ui=BASE.includes(lang)?lang:'en',de=ui==='de';
document.documentElement.lang=lang;
const T=o=>o[ui]||o.en||o.de;
const MORE=[['es','Español'],['fr','Français'],['it','Italiano'],['nl','Nederlands'],['pt','Português'],['pl','Polski'],['tr','Türkçe'],['ru','Русский'],['uk','Українська'],['el','Ελληνικά'],['hr','Hrvatski'],['da','Dansk'],['sv','Svenska'],['no','Norsk'],['fi','Suomi'],['cs','Čeština'],['hu','Magyar'],['ro','Română'],['bg','Български'],['sr','Srpski'],['lt','Lietuvių'],['lv','Latviešu'],['et','Eesti'],['ar','العربية'],['he','עברית'],['hi','हिन्दी'],['bn','বাংলা'],['ur','اردو'],['id','Bahasa Indonesia'],['ms','Bahasa Melayu'],['th','ไทย'],['vi','Tiếng Việt'],['zh-CN','中文 (简体)'],['zh-TW','中文 (繁體)'],['ja','日本語'],['ko','한국어'],['sw','Kiswahili'],['af','Afrikaans'],['ceb','Cebuano'],['ilo','Ilokano']];
/* Sprache setzen: eigene Sprachschalter von COLREG und WEATHER laufen mit */
function setLang(l){
 try{localStorage.setItem('navtool-lang',l);const b=l==='de'?'de':'en';localStorage.setItem('colreg-lang',b);localStorage.setItem('navtoolWeatherLang',b)}catch(_){}
 const host=location.hostname,exp='expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
 const clear=()=>{document.cookie='googtrans=;'+exp;document.cookie='googtrans=;'+exp+';domain='+host;document.cookie='googtrans=;'+exp+';domain=.'+host.replace(/^www\./,'')};
 clear();
 if(!BASE.includes(l)){document.cookie='googtrans=/en/'+l+';path=/';document.cookie='googtrans=/en/'+l+';path=/;domain=.'+host.replace(/^www\./,'')}
 location.reload();
}
/* Beim Start synchron halten, damit COLREG/WEATHER nie in einer anderen Sprache starten */
try{const b=lang==='de'?'de':'en';if(localStorage.getItem('colreg-lang')!==b)localStorage.setItem('colreg-lang',b);if(localStorage.getItem('navtoolWeatherLang')!==b)localStorage.setItem('navtoolWeatherLang',b)}catch(_){}
const tpl=()=>document.body.classList.add('nt-m-'+seg);
const LOGO=v=>'/pic/allgemein/logo.png'+(v?'?v='+v:'');
let C=null;try{C=JSON.parse(localStorage.getItem('nt-cfg'))}catch(_){}
const NT=window.NT={hit(k){try{fetch(AB+'/hit/'+NS+'/'+k,{mode:'cors',keepalive:true}).catch(()=>{})}catch(_){}},ready:null,lang:lang,ui:ui,T:T,setLang:setLang,langs:MORE};
function mod(id){return C&&C.modules&&C.modules.find(m=>m.id===id)}
function overall(){const ms=(C&&C.modules)||[];if(ms.some(m=>!m.enabled||m.status==='stoerung'))return'bad';if(ms.some(m=>m.status!=='aktiv'))return'warn';return'ok'}

/* ===== Menü: wenige Kategorien, Unterpunkte öffnen sich beim Darüberfahren ===== */
const MENU=[
 {id:'nav',t:{de:'Navigation',en:'Navigation',fil:'Nabigasyon'},items:[
  ['map','MAP','/map/',{de:'Karte, Routing & Seezeichen',en:'Chart, routing & marks',fil:'Mapa, ruta at mga marka'}],
  ['sailingapp','SEGELN','/sailingapp/',{de:'Routen, Logbuch, Ankerwache & Crew',en:'Routes, logbook, anchor watch & crew',fil:'Ruta, logbook, anchor watch at crew'}],
  ['navtext','NAVTEX STATIONEN','/navtext/navtext-stations.html',{de:'Sendestationen & Empfangsgebiete',en:'Transmitting stations & coverage',fil:'Mga istasyon at saklaw'}]]},
 {id:'calc',t:{de:'Kalkulation',en:'Calculation',fil:'Kalkulasyon'},items:[
  ['calc','CALC','/calc/',{de:'Kompassfehler, Rechner & Schiffstheorie',en:'Compass error, calculators & ship theory',fil:'Compass error, calculator at teorya ng barko'}]]},
 {id:'sim',t:{de:'Simulatoren',en:'Simulators',fil:'Mga simulator'},items:[
  ['simulator','STEERING','/simulator/',{de:'Ruder, Kreiselkompass & Telegraf',en:'Helm, gyro compass & telegraph',fil:'Timon, gyro compass at telegraph'}],
  ['radar','RADAR','/radar/',{de:'Furuno FAR-2228 NXT BB mit AIS & CPA',en:'Furuno FAR-2228 NXT BB with AIS & CPA',fil:'Furuno FAR-2228 NXT BB na may AIS at CPA'}],
  ['navtext','NAVTEX NX-700','/navtext/',{de:'Furuno NAVTEX-Empfänger',en:'Furuno NAVTEX receiver',fil:'Furuno NAVTEX receiver'}],
  ['inmarsat','INMARSAT-C','/inmarsat/',{de:'Furuno FELCOM 15',en:'Furuno FELCOM 15',fil:'Furuno FELCOM 15'}]]},
 {id:'weather',t:{de:'Wetter',en:'Weather',fil:'Panahon'},items:[
  ['weather','WEATHER','/weather/',{de:'Wolkenatlas, Radar, Wind & Strömungen',en:'Cloud atlas, radar, wind & currents',fil:'Cloud atlas, radar, hangin at agos'}]]},
 {id:'rules',t:{de:'Regeln & Seemannschaft',en:'Rules & seamanship',fil:'Mga tuntunin at seamanship'},items:[
  ['colreg','COLREG','/colreg/',{de:'KVR, Lichter, Schallsignale, Tonnen, Knoten',en:'Rules, lights, sound signals, buoys, knots',fil:'Mga patakaran, ilaw, tunog, boya, buhol'}]]}
];

const ICON={globe:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>',user:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>',menu:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',phone:'<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.4"/><path d="M10.5 18.5h3"/></svg>'};
const escH=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function langHTML(){
 const cur=MORE.find(m=>m[0]===lang);
 return `<div class="nt-lang" role="group" aria-label="${T({de:'Sprache',en:'Language',fil:'Wika'})}" translate="no"><button type="button" data-l="de" class="${lang==='de'?'on':''}" title="Deutsch">DE</button><button type="button" data-l="en" class="${lang==='en'?'on':''}" title="English">EN</button><button type="button" data-l="fil" class="${lang==='fil'?'on':''}" title="Filipino">FIL</button><button type="button" class="nt-more${cur?' on':''}" aria-haspopup="true" aria-expanded="false" title="${T({de:'Weitere Sprachen',en:'More languages',fil:'Iba pang wika'})}">${cur?escH(cur[0].split('-')[0].toUpperCase()):'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>'}</button><div class="nt-langpop" hidden><label class="nt-langsearch"><span class="nt-sr">${T({de:'Sprache suchen',en:'Search language',fil:'Maghanap ng wika'})}</span><input type="search" placeholder="${T({de:'Sprache suchen …',en:'Search language …',fil:'Maghanap ng wika …'})}" autocomplete="off"></label><div class="nt-langlist">${MORE.map(m=>`<button type="button" data-l="${m[0]}" class="${lang===m[0]?'on':''}">${escH(m[1])}</button>`).join('')}</div><small>${T({de:'Maschinelle Übersetzung, benötigt Internet. Deutsch, Englisch und Filipino sind komplett eingebaut und funktionieren auch offline.',en:'Machine translation, needs internet. German, English and Filipino are built in and work offline.',fil:'Awtomatikong salin, kailangan ng internet. Ang German, English at Filipino ay built-in at gumagana kahit offline.'})}</small></div></div>`;
}
function bindLang(root){
 root.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{if(b.dataset.l!==lang)setLang(b.dataset.l);else closePops()});
 const more=root.querySelector('.nt-more'),pop=root.querySelector('.nt-langpop'),inp=root.querySelector('.nt-langsearch input');
 if(!more)return;
 more.onclick=e=>{e.stopPropagation();const o=pop.hidden;closePops();pop.hidden=!o;more.setAttribute('aria-expanded',String(o));if(o)setTimeout(()=>inp.focus(),30)};
 pop.onclick=e=>e.stopPropagation();
 inp.oninput=()=>{const q=inp.value.trim().toLowerCase();pop.querySelectorAll('.nt-langlist button').forEach(b=>b.hidden=q&&!(b.textContent.toLowerCase().includes(q)||b.dataset.l.toLowerCase().startsWith(q)))};
}
function closePops(){document.querySelectorAll('.nt-langpop').forEach(p=>{p.hidden=true});document.querySelectorAll('.nt-more').forEach(b=>b.setAttribute('aria-expanded','false'))}
document.addEventListener('click',closePops);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePops();document.querySelectorAll('.nt-cat.open').forEach(c=>c.classList.remove('open'));document.body.classList.remove('nt-menu-open')}});
/* Übersetzungsdienst für weitere Sprachen laden (nur wenn eine solche Sprache gewählt ist) */
function loadMT(){
 if(BASE.includes(lang)||window.__ntMT)return;window.__ntMT=1;
 const d=document.createElement('div');d.id='nt-gt';d.style.display='none';d.setAttribute('translate','no');document.body.appendChild(d);
 window.ntGT=()=>{try{new google.translate.TranslateElement({pageLanguage:'en',autoDisplay:false},'nt-gt')}catch(_){}};
 const s=document.createElement('script');s.src='https://translate.google.com/translate_a/element.js?cb=ntGT';s.async=true;document.head.appendChild(s);
}
/* Cookie-Hinweis (nicht im Simulator, nicht in der App) */
const needConsent=!bare&&!matchMedia('(display-mode: standalone)').matches;
const getC=()=>{try{return localStorage.getItem('nt-consent')}catch(_){return null}};
NT.consent=()=>!needConsent||getC()==='yes';
NT.cookies=function(force){
 if(!needConsent)return;const old=document.getElementById('nt-cookie');if(old)old.remove();
 if(!force&&(getC()||sessionStorage.getItem('nt-cc-x')))return;
 const b=document.createElement('div');b.id='nt-cookie';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookies');
 b.innerHTML=`<button class="nt-cc-x" aria-label="${T({de:'Schließen',en:'Close',fil:'Isara'})}">✕</button><div class="nt-cc-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.1"/><circle cx="14.5" cy="9" r="1.1"/><circle cx="13" cy="14.5" r="1.1"/><circle cx="8.5" cy="14" r="1.1"/></svg></div><div class="nt-cc-tx"><b>${T({de:'Cookies & Besucherzähler',en:'Cookies & visitor counter',fil:'Cookies at bilang ng bisita'})}</b><p>${T({de:'NavTool speichert Einstellungen wie Sprache und Favoriten lokal auf deinem Gerät. Mit deiner Zustimmung zählen wir außerdem anonym, welche Bereiche genutzt werden.',en:'NavTool stores settings such as language and favourites locally on your device. With your consent we also count anonymously which sections are used.',fil:'Sine-save ng NavTool ang mga setting tulad ng wika at paborito sa iyong device. Kung papayag ka, binibilang din namin nang anonymous kung aling mga seksyon ang ginagamit.'})}</p></div><div class="nt-cc-btn"><button class="no">${T({de:'Ablehnen',en:'Decline',fil:'Tanggihan'})}</button><button class="yes">${T({de:'Akzeptieren',en:'Accept',fil:'Tanggapin'})}</button></div>`;
 const set=v=>{try{localStorage.setItem('nt-consent',v)}catch(_){}b.classList.remove('in');setTimeout(()=>b.remove(),380);if(v==='yes')track()};
 b.querySelector('.yes').onclick=()=>set('yes');b.querySelector('.no').onclick=()=>set('no');
 b.querySelector('.nt-cc-x').onclick=()=>{sessionStorage.setItem('nt-cc-x','1');b.classList.remove('in');setTimeout(()=>b.remove(),380)};
 document.body.appendChild(b);requestAnimationFrame(()=>requestAnimationFrame(()=>b.classList.add('in')));
};
const visible=m=>{const c=mod(m);return !c||c.enabled!==false};
function chrome(){
 if(inFrame||path.startsWith('/app/start'))return;
 if(seg==='simulator'){ /* Vollbild-Simulator: nur schwebende Sprachwahl und Konto */
  if(document.querySelector('.nt-float'))return;
  const f=document.createElement('div');f.className='nt-float';f.innerHTML=langHTML()+'<div class="nt-acc-slot"></div>';
  document.body.appendChild(f);bindLang(f);if(NT.mountAcc)NT.mountAcc();return}
 if(document.querySelector('.nt-header'))return;
 const v=C&&C.brand&&C.brand.logoVersion;
 const cats=MENU.map(c=>({c:c,items:c.items.filter(i=>visible(i[0]))})).filter(x=>x.items.length);
 const onCat=x=>x.items.some(i=>i[2].split('#')[0]===path||(i[2]==='/navtext/'&&path==='/navtext/index.html')||(seg===i[0]&&i[0]!=='navtext'));
 const h=document.createElement('header');h.className='nt-header';
 const drop=x=>x.items.map(i=>`<a href="${i[2]}" class="nt-di${i[2].split('#')[0]===path||(i[0]===seg&&i[0]!=='navtext')?' on':''}"><b>${i[1]}</b><small>${T(i[3])}</small></a>`).join('');
 h.innerHTML=`<div class="nt-hin"><a class="nt-logo" href="/" aria-label="NavTool"><img src="${LOGO(v)}" alt="NavTool"></a><nav class="nt-nav" aria-label="${T({de:'Hauptnavigation',en:'Main navigation',fil:'Pangunahing nabigasyon'})}">${cats.map(x=>`<div class="nt-cat${onCat(x)?' on':''}"><button type="button" class="nt-cat-b" aria-haspopup="true" aria-expanded="false">${T(x.c.t)}<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg></button><div class="nt-drop">${drop(x)}</div></div>`).join('')}</nav><div class="nt-right"><a class="nt-promo${seg==='app'?' on':''}" href="/app/">${T({de:'App laden',en:'Get the app',fil:'Kunin ang app'})}</a>${langHTML()}<div class="nt-acc-slot"></div><button type="button" class="nt-burger" aria-label="Menu" aria-expanded="false">${ICON.menu}</button></div></div><div class="nt-mob" hidden>${cats.map(x=>`<div class="nt-mg"><div class="nt-mgt">${T(x.c.t)}</div>${x.items.map(i=>`<a href="${i[2]}"><b>${i[1]}</b><small>${T(i[3])}</small></a>`).join('')}</div>`).join('')}<a class="nt-mob-app" href="/app/">${ICON.phone}<span><b>${T({de:'NavTool-App laden',en:'Get the NavTool app',fil:'Kunin ang NavTool app'})}</b><small>${T({de:'Mit SailingApp, komplett offline',en:'Includes SailingApp, fully offline',fil:'Kasama ang SailingApp, buong offline'})}</small></span></a></div>`;
 const cs=[...h.querySelectorAll('.nt-cat')],closeAll=()=>cs.forEach(c=>{c.classList.remove('open');c.querySelector('.nt-cat-b').setAttribute('aria-expanded','false')});
 const open=c=>{closeAll();c.classList.add('open');c.querySelector('.nt-cat-b').setAttribute('aria-expanded','true')};
 cs.forEach(c=>{let t;
  c.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches){clearTimeout(t);open(c)}});
  c.addEventListener('mouseleave',()=>{if(matchMedia('(hover:hover)').matches)t=setTimeout(()=>c.classList.remove('open'),140)});
  c.querySelector('.nt-cat-b').addEventListener('click',e=>{e.stopPropagation();c.classList.contains('open')?closeAll():open(c)});
  c.addEventListener('focusin',()=>open(c));
 });
 h.addEventListener('click',e=>e.stopPropagation());
 document.addEventListener('click',closeAll);
 const bg=h.querySelector('.nt-burger'),mob=h.querySelector('.nt-mob');
 bg.onclick=()=>{const o=mob.hidden;mob.hidden=!o;bg.setAttribute('aria-expanded',String(o));document.body.classList.toggle('nt-menu-open',o)};
 bindLang(h);
 document.body.prepend(h);
 document.querySelectorAll('footer:not(.nt-foot)').forEach(f=>f.remove());
 const f=document.createElement('footer');f.className='nt-foot';f.setAttribute('role','contentinfo');
 const txt=(C&&C.brand&&C.brand.footer)||'Maritime Navigation Workspace · navtool.de';
 const seen={},links=MENU.flatMap(c=>c.items).filter(i=>{const k=i[2];if(seen[k])return false;seen[k]=1;return visible(i[0])});
 f.innerHTML=`<a class="nt-appstrip" href="/app/"><span class="nt-appstrip-ic">${ICON.phone}</span><span class="nt-appstrip-tx"><b>${T({de:'NavTool als App, inklusive SailingApp',en:'NavTool as an app, including SailingApp',fil:'NavTool bilang app, kasama ang SailingApp'})}</b><small>${T({de:'Eine App, ein Konto, komplett offline · iPhone, iPad, Android',en:'One app, one account, fully offline · iPhone, iPad, Android',fil:'Isang app, isang account, buong offline · iPhone, iPad, Android'})}</small></span><span class="nt-appstrip-go">${T({de:'Jetzt laden',en:'Get it',fil:'Kunin ito'})} →</span></a><div class="nt-foot-in"><div><img src="${LOGO(v)}" alt="NavTool"><div class="nt-foot-copy"></div></div><div class="nt-foot-links">${links.map(i=>`<a href="${i[2]}">${i[1]}</a>`).join('')}<a href="/app/">APP</a><a href="#" id="nt-top">TOP ↑</a></div></div><div class="nt-foot-bar"><span>© NavTool</span><span><a href="#" id="nt-cc">Cookies</a> · <a href="/status/"><i class="nt-dot ${overall()==='ok'?'':overall()}"></i>Status</a> · <a href="/me/" id="nt-me">${T({de:'Ersteller',en:'Creator',fil:'Gumawa'})}</a></span></div>`;
 f.querySelector('.nt-foot-copy').textContent=txt;
 f.querySelector('#nt-cc').onclick=e=>{e.preventDefault();sessionStorage.removeItem('nt-cc-x');NT.cookies(true)};
 f.querySelector('#nt-top').onclick=e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'})};
 document.body.appendChild(f);
 if(NT.mountAcc)NT.mountAcc();
}
function gate(){
 const m=mod(seg);if(!m||seg==='app'&&path.startsWith('/app/start'))return;
 const admin=localStorage.getItem('nt-admin')==='1',txt={wartung:[T({de:'Wartungsarbeiten',en:'Maintenance',fil:'Maintenance'}),T({de:'Dieser Bereich wird gerade überarbeitet. Bitte später noch einmal vorbeischauen.',en:'This section is being reworked. Please check back later.',fil:'Inaayos pa ang seksyong ito. Subukan muli mamaya.'})],planung:[T({de:'In Planung',en:'Planned',fil:'Nakaplano'}),T({de:'Dieser Bereich ist noch in Planung und bald verfügbar.',en:'This section is planned and will be available soon.',fil:'Nakaplano pa ang seksyong ito at malapit nang magamit.'})],aus:[T({de:'Aktuell nicht verfügbar',en:'Currently unavailable',fil:'Hindi available ngayon'}),T({de:'Dieser Bereich ist vorübergehend abgeschaltet.',en:'This section is temporarily switched off.',fil:'Pansamantalang nakapatay ang seksyong ito.'})]};
 if(m.status==='stoerung'){const n=document.createElement('div');n.className='nt-note';n.textContent=T({de:'Störung: ',en:'Incident: ',fil:'Aberya: '})+(m.note||T({de:'Einzelne Funktionen sind eingeschränkt.',en:'Some features are limited.',fil:'May ilang tampok na limitado.'}));document.body.prepend(n)}
 const k=!m.enabled?'aus':(m.status==='wartung'||m.status==='planung')?m.status:null;if(!k)return;
 const o=document.createElement('div');o.className='nt-lock';
 o.innerHTML=`<div><img src="${LOGO()}" alt="NavTool"><h1>${txt[k][0]}</h1><p>${m.note||txt[k][1]}</p><a class="p" href="/">${T({de:'ZUR STARTSEITE',en:'HOME',fil:'HOME'})}</a><a href="/status/">STATUS</a>${admin?'<button id="nt-go">ADMIN: '+T({de:'TROTZDEM ÖFFNEN',en:'OPEN ANYWAY',fil:'BUKSAN PA RIN'})+'</button>':''}</div>`;
 document.body.appendChild(o);const b=o.querySelector('#nt-go');if(b)b.onclick=()=>o.remove();
}
function sections(){
 if(!C)return;const m=mod(seg);if(!m||!m.sections)return;
 m.sections.filter(s=>s.enabled===false).forEach(s=>{const e=document.getElementById(s.id);if(e)e.style.display='none';document.querySelectorAll('a[href="#'+s.id+'"]').forEach(a=>a.style.display='none')});
}
function brand(){
 const a=C&&C.brand&&C.brand.accent;if(!a)return;const s=document.createElement('style');
 s.textContent=`html body,html:root{--nt-acc:${a};--teal:${a};--green:${a};--t:${a}}`;document.head.appendChild(s);
}
function track(){
 if(!NT.consent())return;
 if(localStorage.getItem('nt-admin')==='1'||seg==='admin'||seg==='status')return;
 const id=seg==='home'?'home':path.startsWith('/app/start')?'appstart':seg,d=new Date(),Y=d.getUTCFullYear(),M=String(d.getUTCMonth()+1).padStart(2,'0'),D=String(d.getUTCDate()).padStart(2,'0');
 const sk='nt-seen-'+id+Y+M+D+(inFrame?'f':'');if(sessionStorage.getItem(sk))return;sessionStorage.setItem(sk,'1');
 let r='direct';try{const h=new URL(document.referrer).hostname;if(h&&h!==location.hostname){r=/google/.test(h)?'google':/bing/.test(h)?'bing':/duckduckgo/.test(h)?'duckduckgo':/instagram/.test(h)?'instagram':/facebook|fb\./.test(h)?'facebook':/whatsapp|wa\.me/.test(h)?'whatsapp':/youtube/.test(h)?'youtube':/github/.test(h)?'github':'other'}else if(h)r='intern'}catch(_){}
 if(inFrame||matchMedia('(display-mode: standalone)').matches)r='app';
 [`v.${id}.d${Y}${M}${D}`,`v.${id}.m${Y}${M}`,`v.${id}.y${Y}`,`r.${r}.m${Y}${M}`].forEach(NT.hit);
}
function boot(){tpl();chrome();loadMT();gate();sections();setTimeout(sections,1500);brand();track();setTimeout(()=>NT.cookies(),900)}
NT.ready=fetch('/data/config.json?'+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(j=>{C=j;try{localStorage.setItem('nt-cfg',JSON.stringify(j))}catch(_){}}).catch(()=>{});
const go=()=>{boot();NT.ready.then(()=>{document.querySelectorAll('.nt-header,.nt-foot,.nt-note,.nt-lock').forEach(e=>e.remove());boot()})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();


/* ===== Übersetzung der Seitentexte: Quelltext ist Deutsch, Wörterbuch /assets/i18n-dict.js (en, fil). Filipino fällt auf Englisch zurück. ===== */
(function(){
 const NT=window.NT,ui=NT.ui;
 if(ui==='de')return;
 const ATTR=['placeholder','title','aria-label','alt','value'];
 const SKIP=/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE|NOSCRIPT|SVG|CANVAS)$/;
 const miss=new Set(),dbg=/i18n=debug/.test(location.search);
 let D=null,busy=false;
 const norm=x=>x.replace(/\s+/g,' ').trim();
 const look=k=>{if(!k||!D)return null;const v=(D[ui]&&D[ui][k])||(ui==='fil'&&D.en&&D.en[k])||null;return v};
 function txt(n){
  const p=n.parentNode;if(!p||SKIP.test(p.nodeName)||(p.closest&&p.closest('[translate="no"],.nt-lang,.nt-langpop,#nt-gt')))return;
  const o=n.__o!==undefined?n.__o:n.nodeValue,k=norm(o);if(!k||!/[A-Za-zÄÖÜäöüß]/.test(k))return;
  const v=look(k);
  if(v!==null){if(n.__o===undefined)n.__o=o;const lead=o.match(/^\s*/)[0],tr=o.match(/\s*$/)[0],nv=lead+v+tr;if(n.nodeValue!==nv)n.nodeValue=nv}
  else if(dbg&&n.__o===undefined)miss.add(k);
 }
 function attrs(e){
  if(!e.getAttribute||e.closest&&e.closest('[translate="no"]'))return;
  ATTR.forEach(a=>{
   if(!e.hasAttribute(a))return;
   if(a==='value'&&!(e.nodeName==='INPUT'&&/^(button|submit|reset)$/.test(e.type)))return;
   const k='__a_'+a,o=e[k]!==undefined?e[k]:e.getAttribute(a),n=norm(o||'');if(!n)return;const v=look(n);
   if(v!==null){if(e[k]===undefined)e[k]=o;if(e.getAttribute(a)!==v)e.setAttribute(a,v)}else if(dbg&&e[k]===undefined)miss.add(n);
  });
 }
 function run(root){
  if(!D||!root)return;busy=true;
  try{
   if(root.nodeType===3){txt(root)}
   else if(root.nodeType===1||root.nodeType===9){
    const r=root.nodeType===9?root.body:root;if(!r)return;
    if(r.nodeType===1)attrs(r);
    r.querySelectorAll&&r.querySelectorAll('[placeholder],[title],[aria-label],[alt],input[type=button],input[type=submit]').forEach(attrs);
    const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))txt(n);
   }
  }finally{obs.takeRecords();busy=false}
 }
 const obs=new MutationObserver(ms=>{if(busy||!D)return;busy=true;try{ms.forEach(m=>{if(m.type==='childList')m.addedNodes.forEach(n=>{if(n.nodeType===1||n.nodeType===3)run(n)});else if(m.type==='characterData'){m.target.__o=undefined;txt(m.target)}else if(m.type==='attributes')attrs(m.target)})}finally{obs.takeRecords();busy=false}});
 function title(){const k=norm(document.title),v=look(k);if(v!==null)document.title=v;else{const m=k.match(/^(.*?)(\s*[·|–-]\s*NavTool.*)$/i);if(m){const w=look(norm(m[1]));if(w!==null)document.title=w+m[2]}}}
 function start(){
  run(document);title();
  obs.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','alt','value']});
  if(dbg)setTimeout(()=>console.info('[i18n] ohne Übersetzung ('+miss.size+'):',[...miss]),3000);
 }
 NT.tr=k=>look(norm(k))||k;
 NT.i18nRerun=()=>run(document);
 const sc=document.createElement('script');sc.src='/assets/i18n-dict.js';
 sc.onload=()=>{D=window.NT_DICT||null;if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()};
 document.head.appendChild(sc);
})();

/* Konto: Konfiguration und Anmelde-Button laden */
(function(){const l=s=>new Promise(r=>{const e=document.createElement('script');e.src=s;e.onload=e.onerror=r;document.head.appendChild(e)});l('/assets/supabase-config.js').then(()=>l('/assets/navtool-auth.js'))})();

/* V15 · Apple-Gefühl: Kopfleiste, Parallax, Einblenden beim Scrollen */
(function(){
if(window.self!==window.top)return;
const d=document,r=d.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let tk=false,h=null;
function frame(){const y=scrollY;h=h||d.querySelector('.nt-header');if(h)h.classList.toggle('scrolled',y>6);if(!rm)r.style.setProperty('--py',Math.min(y,700));tk=false}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(frame)}},{passive:true});
function init(){
frame();
d.addEventListener('click',e=>{const c=e.target.closest('.tool-card');if(c&&!e.target.closest('a')){const a=c.querySelector('a');if(a)a.click()}});
if(rm||!('IntersectionObserver'in window))return;
const els=[...d.querySelectorAll('.section-head,.cat,.tool-card,.status-item')];if(!els.length)return;
r.classList.add('rv-on');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.05});
els.forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%3)*70+'ms';io.observe(el)});
}
d.readyState==='loading'?d.addEventListener('DOMContentLoaded',init):init();
})();
