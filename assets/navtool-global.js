(function(){
  const lang=localStorage.getItem('navtool-lang')||'de';
  const path=location.pathname;
  const last=path.split('/').filter(Boolean).pop()||'';
  const moduleName={map:'MAP',weather:'WEATHER',calc:'CALCULATION',colreg:'COLREG',navtext:'NAVTEXT'}[last]||'NAVTOOL';
  const labels=lang==='en'?{home:'← BACK TO NAVTOOL',de:'DE',en:'EN'}:{home:'← ZURÜCK ZU NAVTOOL',de:'DE',en:'EN'};
  const hasOwnHeader=!!document.querySelector('header');
  const hasWeatherControls=!!document.querySelector('.lang') && !!document.querySelector('a[href="https://navtool.de/"]');
  const hasColregLang=!!document.querySelector('.lang-toggle');
  function controls(){
    const box=document.createElement('div'); box.className='nt-inline-actions';
    box.innerHTML=`<a class="nt-home" href="https://navtool.de/">${labels.home}</a><button class="nt-lang ${lang==='de'?'active':''}" data-lang="de">DE</button><button class="nt-lang ${lang==='en'?'active':''}" data-lang="en">EN</button>`;
    box.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('navtool-lang',b.dataset.lang);location.reload();}));
    return box;
  }
  if(hasOwnHeader && !hasWeatherControls){
    const header=document.querySelector('header');
    if(!header.querySelector('.nt-inline-actions')){
      const box=controls();
      if(hasColregLang){
        const existing=header.querySelector('.header-actions');
        if(existing){ existing.insertBefore(box.querySelector('.nt-home'),existing.firstChild); existing.classList.add('nt-existing-actions'); box.querySelectorAll('.nt-lang').forEach(b=>b.remove()); }
        else header.appendChild(box);
      } else {
        header.appendChild(box);
      }
    }
    document.documentElement.lang=lang;
    return;
  }
  if(!hasOwnHeader){
    const h=document.createElement('header'); h.className='nt-standalone-header';
    h.innerHTML=`<div class="nt-standalone-inner"><a class="nt-global-brand" href="https://navtool.de/"><span class="nt-global-mark">NT</span><span>NAVTOOL · ${moduleName}</span></a></div>`;
    h.querySelector('.nt-standalone-inner').appendChild(controls());
    document.body.prepend(h);
  }
  document.documentElement.lang=lang;
})();

/* NAVTOOL Fußzeile (wie im Hub) */
(function(){
  if(window.self!==window.top||document.querySelector('.nt-foot'))return;
  const css=`.nt-foot{margin-top:40px;border-top:1px solid rgba(85,229,209,.13);background:#030708;font-family:Inter,     ui-sans-serif,     system-ui,     -apple-system,     BlinkMacSystemFont,     "Segoe UI",     sans-serif;color:#ecfbf9}
.nt-foot-in{width:min(100% - 48px,1280px);min-height:125px;margin:0 auto;padding:26px 0 calc(26px + env(safe-area-inset-bottom,0px));display:flex;align-items:center;justify-content:space-between;gap:30px}
.nt-foot-brand{color:#55e5d1;font-size:13px;font-weight:900;letter-spacing:.16em}
.nt-foot-copy{margin-top:7px;color:#587071;font-size:10px}
.nt-foot-links{display:flex;flex-wrap:wrap;gap:15px}
.nt-foot-links a{color:#71898a;font-size:10px;font-weight:900;letter-spacing:.08em;text-decoration:none;padding:6px 0}
.nt-foot-links a:hover{color:#55e5d1}
@media(max-width:760px){.nt-foot-in{flex-direction:column;align-items:flex-start;gap:18px}.nt-foot-links{gap:12px}}`;
  function add(){
    const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    const f=document.createElement('div');f.className='nt-foot';f.setAttribute('role','contentinfo');
    f.innerHTML='<div class="nt-foot-in"><div><div class="nt-foot-brand">NAVTOOL</div><div class="nt-foot-copy">Maritime Navigation Workspace \u00b7 navtool.de</div></div><div class="nt-foot-links"><a href="/map/">MAP</a><a href="/navtext/">NAVTEXT</a><a href="/colreg/">COLREG</a><a href="/weather/">WEATHER</a><a href="/calc/">CALC</a><a href="#" id="nt-top">TOP \u2191</a></div></div>';
    document.body.appendChild(f);
    document.getElementById('nt-top').addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add();
})();
