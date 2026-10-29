/* NAVTOOL · gemeinsames Gerüst: Header, Footer, Konfiguration, Status-Sperre, Besuchszähler */
(function(){
const NS='navtool.de',AB='https://abacus.jasoncameron.dev';
const path=location.pathname,seg=path.split('/').filter(Boolean)[0]||'home',inFrame=window.self!==window.top;
const bare=inFrame||path.startsWith('/app/start')||seg==='simulator';
const MODS=[['map','MAP','/map/'],['navtext','NAVTEXT','/navtext/'],['colreg','COLREG','/colreg/'],['weather','WEATHER','/weather/'],['calc','CALC','/calc/'],['sailingapp','SAILING','/sailingapp/'],['simulator','SIMULATOR','/simulator/'],['app','APP','/app/']];
const lang=localStorage.getItem('navtool-lang')||'de',de=lang!=='en';
document.documentElement.lang=lang;
const tpl=()=>document.body.classList.add('nt-m-'+seg);
const LOGO=v=>'/pic/allgemein/logo.png'+(v?'?v='+v:'');
let C=null;try{C=JSON.parse(localStorage.getItem('nt-cfg'))}catch(_){}
const NT=window.NT={hit(k){try{fetch(AB+'/hit/'+NS+'/'+k,{mode:'cors',keepalive:true}).catch(()=>{})}catch(_){}},ready:null};
function mod(id){return C&&C.modules&&C.modules.find(m=>m.id===id)}
function overall(){const ms=(C&&C.modules)||[];if(ms.some(m=>!m.enabled||m.status==='stoerung'))return'bad';if(ms.some(m=>m.status!=='aktiv'))return'warn';return'ok'}

/* Cookie-Hinweis (nicht im Simulator, nicht in der App) */
const needConsent=!bare&&!matchMedia('(display-mode: standalone)').matches;
const getC=()=>{try{return localStorage.getItem('nt-consent')}catch(_){return null}};
NT.consent=()=>!needConsent||getC()==='yes';
NT.cookies=function(force){
 if(!needConsent)return;const old=document.getElementById('nt-cookie');if(old)old.remove();
 if(!force&&(getC()||sessionStorage.getItem('nt-cc-x')))return;
 const b=document.createElement('div');b.id='nt-cookie';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookies');
 b.innerHTML=`<button class=\"nt-cc-x\" aria-label=\"${de?'Schließen':'Close'}\">✕</button><div class=\"nt-cc-ic\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"9\" cy=\"10\" r=\"1.1\"/><circle cx=\"14.5\" cy=\"9\" r=\"1.1\"/><circle cx=\"13\" cy=\"14.5\" r=\"1.1\"/><circle cx=\"8.5\" cy=\"14\" r=\"1.1\"/></svg></div><div class=\"nt-cc-tx\"><b>${de?'Cookies & Besucherzähler':'Cookies & visitor counter'}</b><p>${de?'NavTool speichert Einstellungen wie Sprache und Favoriten lokal auf deinem Gerät. Mit deiner Zustimmung zählen wir außerdem anonym, welche Bereiche genutzt werden.':'NavTool stores settings such as language and favourites locally on your device. With your consent we also count anonymously which sections are used.'}</p></div><div class=\"nt-cc-btn\"><button class=\"no\">${de?'Ablehnen':'Decline'}</button><button class=\"yes\">${de?'Akzeptieren':'Accept'}</button></div>`;
 const set=v=>{try{localStorage.setItem('nt-consent',v)}catch(_){}b.classList.remove('in');setTimeout(()=>b.remove(),380);if(v==='yes')track()};
 b.querySelector('.yes').onclick=()=>set('yes');b.querySelector('.no').onclick=()=>set('no');
 b.querySelector('.nt-cc-x').onclick=()=>{sessionStorage.setItem('nt-cc-x','1');b.classList.remove('in');setTimeout(()=>b.remove(),380)};
 document.body.appendChild(b);requestAnimationFrame(()=>requestAnimationFrame(()=>b.classList.add('in')));
};
function chrome(){
 if(bare||document.querySelector('.nt-header'))return;
 const v=C&&C.brand&&C.brand.logoVersion,mods=MODS.filter(m=>{const c=mod(m[0]);return !c||c.enabled!==false||m[0]==='app'});
 const h=document.createElement('header');h.className='nt-header';
 h.innerHTML=`<div class="nt-hin"><a class="nt-logo" href="/" aria-label="NavTool Start"><img src="${LOGO(v)}" alt="NavTool"></a><nav class="nt-nav">${mods.map(m=>m[0]==='app'?`<a href="${m[2]}" class="nt-promo${seg==='app'?' on':''}">${de?'App laden':'Get the app'}</a>`:`<a href="${m[2]}" class="${seg===m[0]?'on':''}${m[0]==='simulator'?' new':''}">${m[1]}</a>`).join('')}</nav><div class="nt-lang"><button data-l="de" class="${de?'on':''}">DE</button><button data-l="en" class="${de?'':'on'}">EN</button></div></div>`;
 h.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{localStorage.setItem('navtool-lang',b.dataset.l);location.reload()});
 document.body.prepend(h);
 document.querySelectorAll('footer:not(.nt-foot)').forEach(f=>f.remove());
 const f=document.createElement('footer');f.className='nt-foot';f.setAttribute('role','contentinfo');
 const txt=(C&&C.brand&&C.brand.footer)||'Maritime Navigation Workspace · navtool.de';
 f.innerHTML=`<a class="nt-appstrip" href="/app/"><span class="nt-appstrip-ic"><svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.4"/><path d="M10.5 18.5h3"/></svg></span><span class="nt-appstrip-tx"><b>${de?'NavTool als App':'NavTool as an app'}</b><small>${de?'Komplett offline · iPhone, iPad, Android':'Fully offline · iPhone, iPad, Android'}</small></span><span class="nt-appstrip-go">${de?'Jetzt laden':'Get it'} →</span></a><div class="nt-foot-in"><div><img src="${LOGO(v)}" alt="NavTool"><div class="nt-foot-copy"></div></div><div class="nt-foot-links">${MODS.map(m=>`<a href="${m[2]}">${m[1]}</a>`).join('')}<a href="#" id="nt-top">TOP ↑</a></div></div><div class="nt-foot-bar"><span>© NavTool</span><span><a href="#" id="nt-cc">Cookies</a> · <a href="/status/"><i class="nt-dot ${overall()==='ok'?'':overall()}"></i>Status</a> · <a href="/me/" id="nt-me">${de?'Ersteller':'Creator'}</a></span></div>`;
 f.querySelector('.nt-foot-copy').textContent=txt;
 f.querySelector('#nt-cc').onclick=e=>{e.preventDefault();sessionStorage.removeItem('nt-cc-x');NT.cookies(true)};
 f.querySelector('#nt-top').onclick=e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'})};
 document.body.appendChild(f);
}
function gate(){
 const m=mod(seg);if(!m||seg==='app'&&path.startsWith('/app/start'))return;
 const admin=localStorage.getItem('nt-admin')==='1',txt={wartung:['Wartungsarbeiten','Dieser Bereich wird gerade überarbeitet. Bitte später noch einmal vorbeischauen.'],planung:['In Planung','Dieser Bereich ist noch in Planung und bald verfügbar.'],aus:['Aktuell nicht verfügbar','Dieser Bereich ist vorübergehend abgeschaltet.']};
 if(m.status==='stoerung'){const n=document.createElement('div');n.className='nt-note';n.textContent=(de?'Störung: ':'Incident: ')+(m.note||(de?'Einzelne Funktionen sind eingeschränkt.':'Some features are limited.'));document.body.prepend(n)}
 const k=!m.enabled?'aus':(m.status==='wartung'||m.status==='planung')?m.status:null;if(!k)return;
 const o=document.createElement('div');o.className='nt-lock';
 o.innerHTML=`<div><img src="${LOGO()}" alt="NavTool"><h1>${txt[k][0]}</h1><p>${m.note||txt[k][1]}</p><a class="p" href="/">${de?'ZUR STARTSEITE':'HOME'}</a><a href="/status/">STATUS</a>${admin?'<button id="nt-go">ADMIN: TROTZDEM ÖFFNEN</button>':''}</div>`;
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
function boot(){tpl();chrome();gate();sections();setTimeout(sections,1500);brand();track();setTimeout(()=>NT.cookies(),900)}
NT.ready=fetch('/data/config.json?'+Date.now(),{cache:'no-store'}).then(r=>r.json()).then(j=>{C=j;try{localStorage.setItem('nt-cfg',JSON.stringify(j))}catch(_){}}).catch(()=>{});
const go=()=>{boot();NT.ready.then(()=>{document.querySelectorAll('.nt-header,.nt-foot,.nt-note,.nt-lock').forEach(e=>e.remove());boot()})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();

/* Konto: Konfiguration und Anmelde-Button laden */
(function(){const l=s=>new Promise(r=>{const e=document.createElement('script');e.src=s;e.onload=e.onerror=r;document.head.appendChild(e)});l('/assets/supabase-config.js').then(()=>l('/assets/navtool-auth.js'))})();
