/* NavTool Konto: Anmelden-Button im Kopf, Sitzung aus localStorage (teilen sich alle Apps auf navtool.de), Favoriten, Kalkulationen */
(function(){
const C=window.NT_SB||{},KEY='sb-'+String(C.url||'').replace(/^https?:\/\//,'').split('.')[0]+'-auth-token',de=(localStorage.getItem('navtool-lang')||'de')!=='en';
const NT=window.NT=window.NT||{};
const sess=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}};
const user=()=>{const s=sess();return s&&s.user||null};
const nm=u=>u&&((u.user_metadata&&u.user_metadata.name)||String(u.email||'').split('@')[0]);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function token(){const s=sess();if(!s)return null;if(s.expires_at*1000-Date.now()>60000)return s.access_token;
 try{const r=await fetch(C.url+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:C.key,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:s.refresh_token})});if(!r.ok)return null;const n=await r.json();localStorage.setItem(KEY,JSON.stringify(Object.assign({},s,n,{user:n.user||s.user})));return n.access_token}catch(e){return null}}
async function rest(path,opt){opt=opt||{};const t=await token();if(!t)throw new Error('login');const r=await fetch(C.url+'/rest/v1/'+path,Object.assign({},opt,{headers:Object.assign({apikey:C.key,Authorization:'Bearer '+t,'Content-Type':'application/json',Prefer:'return=minimal'},opt.headers||{})}));if(!r.ok)throw new Error(await r.text());return r}
NT.user=user;
NT.saveFav=async(titel,url)=>{await rest('favoriten',{method:'POST',body:JSON.stringify({app:'navtool',titel:titel||document.title,url:url||location.pathname})})};
NT.saveCalc=async(app,titel,daten)=>{await rest('kalkulationen',{method:'POST',body:JSON.stringify({app:app,titel:titel,daten:daten})})};
function logout(){const t=sess();try{if(t)fetch(C.url+'/auth/v1/logout',{method:'POST',headers:{apikey:C.key,Authorization:'Bearer '+t.access_token}})}catch(e){}localStorage.removeItem(KEY);location.reload()}
function mount(){const hin=document.querySelector('.nt-hin');if(!hin||hin.querySelector('.nt-acc'))return false;
 const u=user(),a=document.createElement('div');a.className='nt-acc';
 a.innerHTML='<button class="nt-login" type="button" aria-haspopup="true" aria-expanded="false">'+(u?esc(nm(u)):(de?'Anmelden':'Sign in'))+'</button><div class="nt-pop" hidden></div>';
 const pop=a.querySelector('.nt-pop'),b=a.querySelector('.nt-login'),next=encodeURIComponent(location.pathname);
 pop.innerHTML=u?'<b>'+(de?'Hallo ':'Hello ')+esc(nm(u))+'</b><small>'+esc(u.email)+'</small><a class="pri" href="/konto/">Dashboard</a><button type="button" id="nt-fav">★ '+(de?'Diese Seite merken':'Save this page')+'</button><button type="button" id="nt-out">'+(de?'Abmelden':'Sign out')+'</button>'
  :'<b>'+(de?'Willkommen an Bord':'Welcome aboard')+'</b><small>'+(de?'Ein Konto für alle NavTool-Apps. Möchtest du dich anmelden oder registrieren?':'One account for all NavTool apps. Sign in or register?')+'</small><a class="pri" href="/konto/?m=login&next='+next+'">'+(de?'Anmelden':'Sign in')+'</a><a href="/konto/?m=register&next='+next+'">'+(de?'Registrieren':'Register')+'</a>';
 b.onclick=e=>{e.stopPropagation();const o=pop.hidden;pop.hidden=!o;b.setAttribute('aria-expanded',o)};
 document.addEventListener('click',e=>{if(!a.contains(e.target)){pop.hidden=true;b.setAttribute('aria-expanded','false')}});
 const o=pop.querySelector('#nt-out');if(o)o.onclick=logout;
 const f=pop.querySelector('#nt-fav');if(f)f.onclick=async()=>{f.textContent='…';try{await NT.saveFav(document.title.replace(/\s*[·|–-]\s*NavTool.*$/i,'')||document.title,location.pathname);f.textContent='✓ '+(de?'Gemerkt':'Saved')}catch(e){f.textContent=de?'Fehler, bitte neu anmelden':'Error, sign in again'}};
 hin.insertBefore(a,hin.querySelector('.nt-lang')||null);return true}
let n=0;const t=setInterval(()=>{if(mount()||++n>40)clearInterval(t)},100);
})();
