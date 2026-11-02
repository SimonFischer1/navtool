/* NavTool Konto: Anmelden-Button oben rechts, Sitzung aus localStorage (gilt für alle Seiten und die App auf navtool.de), Favoriten, Kalkulationen */
(function(){
const C=window.NT_SB||{},KEY='sb-'+String(C.url||'').replace(/^https?:\/\//,'').split('.')[0]+'-auth-token';
const NT=window.NT=window.NT||{};
const T=NT.T||(o=>o.de);
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
/* Admin-Prüfung: nur die Datenbank entscheidet (Funktion is_admin), der Browser nur zeigt es an */
NT.isAdmin=async function(){const u=user();if(!u)return false;const k='nt-isadmin-'+u.id,c=sessionStorage.getItem(k);if(c!==null)return c==='1';
 try{const t=await token();if(!t)return false;const r=await fetch(C.url+'/rest/v1/rpc/is_admin',{method:'POST',headers:{apikey:C.key,Authorization:'Bearer '+t,'Content-Type':'application/json'},body:'{}'});const v=r.ok&&(await r.json())===true;sessionStorage.setItem(k,v?'1':'0');return v}catch(e){return false}};
function logout(){const t=sess();try{if(t)fetch(C.url+'/auth/v1/logout',{method:'POST',headers:{apikey:C.key,Authorization:'Bearer '+t.access_token}})}catch(e){}localStorage.removeItem(KEY);localStorage.removeItem('nt-admin');try{Object.keys(sessionStorage).filter(k=>k.indexOf('nt-isadmin-')===0).forEach(k=>sessionStorage.removeItem(k))}catch(e){}location.reload()}
const ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>';
function mount(){const slot=document.querySelector('.nt-acc-slot');if(!slot||slot.querySelector('.nt-acc'))return false;
 const u=user(),a=document.createElement('div');a.className='nt-acc';
 const label=u?esc(nm(u)):T({de:'Anmelden',en:'Sign in',fil:'Mag-sign in'});
 a.innerHTML='<button class="nt-login'+(u?' in':'')+'" type="button" aria-haspopup="true" aria-expanded="false" aria-label="'+T({de:'Konto',en:'Account',fil:'Account'})+'">'+ICON+'<span>'+label+'</span></button><div class="nt-pop" hidden></div>';
 const pop=a.querySelector('.nt-pop'),b=a.querySelector('.nt-login'),next=encodeURIComponent(location.pathname);
 pop.innerHTML=u?'<b>'+T({de:'Hallo ',en:'Hello ',fil:'Kumusta '})+esc(nm(u))+'</b><small>'+esc(u.email)+'</small><a class="pri" href="/konto/">'+T({de:'Dashboard',en:'Dashboard',fil:'Dashboard'})+'</a><button type="button" id="nt-fav">★ '+T({de:'Diese Seite merken',en:'Save this page',fil:'I-save ang pahinang ito'})+'</button><button type="button" id="nt-out">'+T({de:'Abmelden',en:'Sign out',fil:'Mag-sign out'})+'</button>'
  :'<b>'+T({de:'Willkommen an Bord',en:'Welcome aboard',fil:'Maligayang pagdating'})+'</b><small>'+T({de:'Ein Konto für alle NavTool-Apps. Möchtest du dich anmelden oder registrieren?',en:'One account for all NavTool apps. Sign in or register?',fil:'Isang account para sa lahat ng NavTool app. Mag-sign in o magparehistro?'})+'</small><a class="pri" href="/konto/?m=login&next='+next+'">'+T({de:'Anmelden',en:'Sign in',fil:'Mag-sign in'})+'</a><a href="/konto/?m=register&next='+next+'">'+T({de:'Registrieren',en:'Register',fil:'Magparehistro'})+'</a>';
 b.onclick=e=>{e.stopPropagation();const o=pop.hidden;document.querySelectorAll('.nt-langpop').forEach(p=>p.hidden=true);pop.hidden=!o;b.setAttribute('aria-expanded',String(o))};
 pop.addEventListener('click',e=>e.stopPropagation());
 document.addEventListener('click',()=>{pop.hidden=true;b.setAttribute('aria-expanded','false')});
 const o=pop.querySelector('#nt-out');if(o)o.onclick=logout;
 const f=pop.querySelector('#nt-fav');if(f)f.onclick=async()=>{f.textContent='…';try{await NT.saveFav(document.title.replace(/\s*[·|–-]\s*NavTool.*$/i,'')||document.title,location.pathname);f.textContent='✓ '+T({de:'Gemerkt',en:'Saved',fil:'Na-save'})}catch(e){f.textContent=T({de:'Fehler, bitte neu anmelden',en:'Error, please sign in again',fil:'May error, mag-sign in muli'})}};
 slot.appendChild(a);
 if(u)NT.isAdmin().then(ok=>{try{ok?localStorage.setItem('nt-admin','1'):localStorage.removeItem('nt-admin')}catch(e){}
  if(ok&&!pop.querySelector('.adm')){const l=document.createElement('a');l.className='adm';l.href='/admin/';l.textContent='Admin';pop.insertBefore(l,pop.querySelector('#nt-fav'))}});
 return true}
NT.mountAcc=mount;
let n=0;const t=setInterval(()=>{if(mount()||++n>40)clearInterval(t)},100);
})();
