(function(){
  const lang=localStorage.getItem('navtool-lang')||'de';
  const path=location.pathname;
  const last=path.split('/').filter(Boolean).pop()||'';
  const moduleName={map:'MAP',weather:'WEATHER',calc:'CALCULATION',colreg:'COLREG',navtext:'NAVTEXT',crew:'CREW'}[last]||'NAVTOOL';
  const labels=lang==='en'?{home:'← BACK TO NAVTOOL',de:'DE',en:'EN'}:{home:'← ZURÜCK ZU NAVTOOL',de:'DE',en:'EN'};
  const isCrew=path.includes('/crew/');
  const hasOwnHeader=!!document.querySelector('header');
  const hasWeatherControls=!!document.querySelector('.lang') && !!document.querySelector('a[href="https://navtool.de/"]');
  const hasColregLang=!!document.querySelector('.lang-toggle');
  function controls(){
    const box=document.createElement('div'); box.className='nt-inline-actions';
    box.innerHTML=`<a class="nt-home" href="https://navtool.de/">${labels.home}</a><button class="nt-lang ${lang==='de'?'active':''}" data-lang="de">DE</button><button class="nt-lang ${lang==='en'?'active':''}" data-lang="en">EN</button>`;
    box.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('navtool-lang',b.dataset.lang);location.reload();}));
    return box;
  }
  if(isCrew){
    if(!document.querySelector('.nt-standalone-header')){
      const h=document.createElement('header'); h.className='nt-standalone-header';
      h.innerHTML=`<div class="nt-standalone-inner"><a class="nt-global-brand" href="https://navtool.de/"><span class="nt-global-mark">NT</span><span>NAVTOOL · CREW</span></a></div>`;
      h.querySelector('.nt-standalone-inner').appendChild(controls());
      document.body.prepend(h);
    }
    document.documentElement.lang=lang;
    return;
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
