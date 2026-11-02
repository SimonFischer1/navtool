/* NavTool Admin: Anmeldung mit dem normalen NavTool-Konto, Zugriff nur für Konten in der Tabelle "admins" (Prüfung in der Datenbank). */
(function(){
'use strict';
const $=id=>document.getElementById(id),CFG=window.NT_SB||{};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let sb=null,USERS=[],ME=null,CUR=null;
const fmt=s=>s?new Date(s).toLocaleString((window.NT&&NT.ui==='de')?'de-DE':'en-GB',{dateStyle:'short',timeStyle:'short'}):'–';
const TT=o=>window.NT&&NT.T?NT.T(o):o.de;

/* ---------- Anmeldung ---------- */
function show(ok){$('dashboardView').classList.toggle('active',ok);$('loginView').style.display=ok?'none':'block'}
function setMsg(t){$('loginMessage').textContent=t||''}
async function check(){
  const {data:{session}}=await sb.auth.getSession();
  if(!session){show(false);return}
  const {data,error}=await sb.rpc('is_admin');
  if(error||data!==true){
    setMsg(TT({de:'Dieses Konto hat keinen Admin-Zugriff.',en:'This account has no admin access.',fil:'Walang admin access ang account na ito.'}));
    try{localStorage.removeItem('nt-admin')}catch(_){}
    show(false);return}
  ME=session.user;try{localStorage.setItem('nt-admin','1')}catch(_){}
  $('whoami').textContent=(ME.user_metadata&&ME.user_metadata.name)||ME.email;
  show(true);loadUsers();initSite();
}
$('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();setMsg('');
  const em=$('em').value.trim(),pw=$('pw').value;
  if(!em||!pw)return setMsg(TT({de:'Bitte E-Mail und Passwort eingeben.',en:'Please enter email and password.',fil:'Ilagay ang email at password.'}));
  const b=$('loginBtn');b.disabled=true;
  const {error}=await sb.auth.signInWithPassword({email:em,password:pw});
  b.disabled=false;
  if(error)return setMsg(/Invalid login/i.test(error.message)?TT({de:'E-Mail oder Passwort stimmt nicht.',en:'Email or password is wrong.',fil:'Mali ang email o password.'}):error.message);
  $('pw').value='';check();
});
$('logoutBtn').addEventListener('click',async()=>{try{localStorage.removeItem('nt-admin')}catch(_){}await sb.auth.signOut();USERS=[];show(false)});

/* ---------- Nutzer ---------- */
async function loadUsers(){
  $('ubody').innerHTML='<tr><td colspan="7" class="empty">'+esc(TT({de:'Lade Nutzer …',en:'Loading users …',fil:'Nilo-load ang mga user …'}))+'</td></tr>';
  const {data,error}=await sb.rpc('admin_list_users');
  if(error){$('ubody').innerHTML='<tr><td colspan="7" class="empty">'+esc(error.message)+'<br>'+esc(TT({de:'Falls die Funktionen fehlen: supabase/admin.sql im SQL Editor ausführen.',en:'If the functions are missing, run supabase/admin.sql in the SQL editor.',fil:'Kung wala ang mga function, patakbuhin ang supabase/admin.sql sa SQL editor.'}))+'</td></tr>';return}
  USERS=data||[];renderUsers();
}
function summary(){
  const now=Date.now(),d7=now-7*864e5,total=USERS.length,
    neu=USERS.filter(u=>new Date(u.created_at).getTime()>d7).length,
    aktiv=USERS.filter(u=>u.last_sign_in_at&&new Date(u.last_sign_in_at).getTime()>d7).length,
    offen=USERS.filter(u=>!u.confirmed).length;
  const cards=[[TT({de:'Registriert',en:'Registered',fil:'Nakarehistro'}),total],[TT({de:'Neu (7 Tage)',en:'New (7 days)',fil:'Bago (7 araw)'}),neu],[TT({de:'Angemeldet (7 Tage)',en:'Signed in (7 days)',fil:'Nag-sign in (7 araw)'}),aktiv],[TT({de:'E-Mail unbestätigt',en:'Email unconfirmed',fil:'Hindi pa kumpirmado'}),offen]];
  $('userSummary').innerHTML=cards.map(c=>'<div class="summary-card"><div class="label">'+esc(c[0])+'</div><div class="value">'+c[1]+'</div></div>').join('');
  const days=[],c={};for(let i=29;i>=0;i--){const d=new Date(now-i*864e5),k=d.toISOString().slice(0,10);days.push(k);c[k]=0}
  USERS.forEach(u=>{const k=String(u.created_at).slice(0,10);if(k in c)c[k]++});
  const mx=Math.max(1,...days.map(k=>c[k]));
  $('spark').innerHTML=days.map(k=>'<i class="'+(c[k]?'':'z')+'" style="height:'+(c[k]?Math.max(10,c[k]/mx*100):6)+'%" title="'+k+': '+c[k]+'"></i>').join('');
  $('sparkLabel').textContent=days[0]+'  →  '+days[29]+'   ('+days.reduce((a,k)=>a+c[k],0)+' '+TT({de:'neue Konten',en:'new accounts',fil:'bagong account'})+')';
}
function renderUsers(){
  summary();
  const q=$('uq').value.trim().toLowerCase(),rows=USERS.filter(u=>!q||(String(u.name)+' '+String(u.email)).toLowerCase().includes(q));
  if(!rows.length){$('ubody').innerHTML='<tr><td colspan="7" class="empty">'+esc(TT({de:'Keine Nutzer gefunden.',en:'No users found.',fil:'Walang nahanap na user.'}))+'</td></tr>';return}
  $('ubody').innerHTML=rows.map(u=>'<tr data-id="'+esc(u.id)+'"><td>'+esc(u.name)+'</td><td class="mail">'+esc(u.email)+'</td><td>'+esc(fmt(u.created_at))+'</td><td>'+esc(fmt(u.last_sign_in_at))+'</td><td>'+Number(u.reisen||0)+'</td><td>'+(u.is_admin?'<span class="tag">Admin</span> ':'')+(u.confirmed?'':'<span class="tag w">'+esc(TT({de:'unbestätigt',en:'unconfirmed',fil:'hindi pa kumpirmado'}))+'</span>')+'</td><td class="act"><button class="btn2" data-a="edit">'+esc(TT({de:'Bearbeiten',en:'Edit',fil:'I-edit'}))+'</button><button class="btn2" data-a="pass">'+esc(TT({de:'Passwort',en:'Password',fil:'Password'}))+'</button><button class="btn2 bad" data-a="del">'+esc(TT({de:'Löschen',en:'Delete',fil:'Burahin'}))+'</button></td></tr>').join('');
}
$('uq').addEventListener('input',renderUsers);
$('reload').addEventListener('click',loadUsers);
$('csv').addEventListener('click',()=>{
  const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"',
    t=['Name;E-Mail;Registriert;Letzte Anmeldung;Reisen;Bestätigt;Admin'].concat(USERS.map(u=>[u.name,u.email,u.created_at,u.last_sign_in_at||'',u.reisen,u.confirmed?'ja':'nein',u.is_admin?'ja':'nein'].map(q).join(';'))).join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+t],{type:'text/csv;charset=utf-8'}));a.download='navtool-nutzer-'+new Date().toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
});
document.querySelectorAll('dialog [data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('ubody').addEventListener('click',e=>{
  const b=e.target.closest('button[data-a]');if(!b)return;
  CUR=USERS.find(u=>u.id===b.closest('tr').dataset.id);if(!CUR)return;
  if(b.dataset.a==='edit'){$('eName').value=CUR.name||'';$('eMail').value=CUR.email||'';$('eMsg').textContent='';$('dEdit').showModal()}
  if(b.dataset.a==='pass'){$('pWho').textContent=CUR.name+' · '+CUR.email;$('pNew').value='';$('pMsg').textContent='';$('pMsg').className='dmsg';$('dPass').showModal()}
  if(b.dataset.a==='del'){$('dWho').textContent=CUR.name+' · '+CUR.email;$('dMsg').textContent='';$('dDel').showModal()}
});
$('eSave').addEventListener('click',async()=>{
  const n=$('eName').value.trim(),m=$('eMail').value.trim().toLowerCase();
  if(!n||!m)return $('eMsg').textContent=TT({de:'Name und E-Mail dürfen nicht leer sein.',en:'Name and email must not be empty.',fil:'Hindi puwedeng walang laman ang pangalan at email.'});
  const {error}=await sb.rpc('admin_update_user',{uid:CUR.id,new_name:n!==CUR.name?n:null,new_email:m!==String(CUR.email).toLowerCase()?m:null});
  if(error)return $('eMsg').textContent=error.message;
  $('dEdit').close();loadUsers();
});
$('pSave').addEventListener('click',async()=>{
  const p=$('pNew').value;
  if(p.length<8){$('pMsg').className='dmsg';return $('pMsg').textContent=TT({de:'Mindestens 8 Zeichen.',en:'At least 8 characters.',fil:'Hindi bababa sa 8 character.'})}
  const {error}=await sb.rpc('admin_set_password',{uid:CUR.id,new_password:p});
  if(error){$('pMsg').className='dmsg';return $('pMsg').textContent=error.message}
  $('pMsg').className='dmsg ok';$('pMsg').textContent=TT({de:'Passwort gesetzt. Nenne es dem Nutzer jetzt, danach ist es nirgends mehr sichtbar.',en:'Password set. Tell it to the user now; it is not shown anywhere afterwards.',fil:'Naitakda ang password. Sabihin ito sa user ngayon; hindi na ito makikita pagkatapos.'});
  $('pNew').value='';
});
$('dGo').addEventListener('click',async()=>{
  const {error}=await sb.rpc('admin_delete_user',{uid:CUR.id});
  if(error)return $('dMsg').textContent=error.message;
  $('dDel').close();loadUsers();
});

/* ---------- Tabs ---------- */
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',p.id==='p-'+b.dataset.p));
}));

/* ---------- Website-Status und Einstellungen (lokal, Export als config.json) ---------- */
const STORAGE={cfg:'nt-cfg'};
function loadConfig(){try{const s=localStorage.getItem(STORAGE.cfg);if(s)return JSON.parse(s)}catch(_){}return {updated:new Date().toISOString(),brand:{accent:'#55e5d1',footer:'Maritime Navigation Workspace · navtool.de',logoVersion:1},modules:[]}}
function saveConfig(c){localStorage.setItem(STORAGE.cfg,JSON.stringify(c))}
function renderSummary(cfg){
  const m=cfg.modules||[],a=m.filter(x=>x.enabled&&x.status==='aktiv').length,w=m.filter(x=>x.enabled&&(x.status==='wartung'||x.status==='planung')).length,d=m.filter(x=>!x.enabled||x.status==='aus').length;
  $('summaryGrid').innerHTML=[['Aktiv',a],['Wartung',w],['Ausgeschaltet',d],['Gesamt',m.length]].map(c=>'<div class="summary-card"><div class="label">'+c[0]+'</div><div class="value">'+c[1]+'</div></div>').join('');
}
function renderModules(cfg){
  $('moduleList').innerHTML=(cfg.modules||[]).map(m=>'<div class="module-row"><div><strong>'+esc(m.name||m.id)+'</strong><div style="font-size:12px;color:var(--nt-muted);margin-top:5px;">'+esc(m.path||'/')+'</div></div><div class="toggle-row"><label class="switch" aria-label="Modul aktiv"><input type="checkbox" '+(m.enabled!==false?'checked':'')+' data-module-id="'+esc(m.id)+'"><span class="slider"></span></label><select class="status-select" data-status-id="'+esc(m.id)+'">'+['aktiv','wartung','planung','stoerung','aus'].map(s=>'<option value="'+s+'"'+(m.status===s?' selected':'')+'>'+({aktiv:'Aktiv',wartung:'Wartung',planung:'Planung',stoerung:'Störung',aus:'Aus'})[s]+'</option>').join('')+'</select></div></div>').join('');
}
function applyBrand(){const c=loadConfig(),b=c.brand||{};$('brandColor').value=b.accent||'#55e5d1';$('brandFooter').value=b.footer||'Maritime Navigation Workspace · navtool.de'}
function collect(){
  const cfg=loadConfig();
  document.querySelectorAll('[data-module-id]').forEach(t=>{const m=(cfg.modules||[]).find(x=>x.id===t.dataset.moduleId);if(m)m.enabled=t.checked});
  document.querySelectorAll('[data-status-id]').forEach(s=>{const m=(cfg.modules||[]).find(x=>x.id===s.dataset.statusId);if(m)m.status=s.value});
  cfg.updated=new Date().toISOString();return cfg;
}
let siteReady=false;
async function initSite(){
  if(siteReady)return;siteReady=true;
  let cfg=null;try{cfg=await (await fetch('/data/config.json?'+Date.now(),{cache:'no-store'})).json()}catch(_){}
  if(cfg){try{const loc=JSON.parse(localStorage.getItem(STORAGE.cfg)||'null');if(!loc)saveConfig(cfg)}catch(_){saveConfig(cfg)}}
  const c=loadConfig();renderSummary(c);renderModules(c);applyBrand();
}
$('saveModules').addEventListener('click',()=>{const c=collect();saveConfig(c);renderSummary(c);renderModules(c)});
$('exportCfg').addEventListener('click',()=>{const c=collect();const b=loadConfig();c.brand=b.brand;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(c,null,1)],{type:'application/json'}));a.download='config.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
$('saveBrand').addEventListener('click',()=>{const c=loadConfig();c.brand=c.brand||{};c.brand.accent=$('brandColor').value;c.brand.footer=$('brandFooter').value.trim()||'Maritime Navigation Workspace · navtool.de';c.updated=new Date().toISOString();saveConfig(c);document.documentElement.style.setProperty('--nt-teal',c.brand.accent)});

/* ---------- Start ---------- */
if(!window.supabase||!CFG.url||!CFG.key||/DEIN_/.test(CFG.key)){show(false);setMsg('Supabase ist noch nicht eingerichtet (assets/supabase-config.js).')}
else{sb=window.supabase.createClient(CFG.url,CFG.key);check()}
})();
