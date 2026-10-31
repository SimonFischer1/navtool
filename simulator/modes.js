/* Steering Simulator: Modusschalter HAND / NFU / AUTO, NFU-Tiller, Autopilot, Schiffsansicht */
(()=>{
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
S.mode='hand';S.lev=0;S.apTgt=Math.round(S.hdg)%360;S.lim=20;
const bar=document.createElement('div');bar.id='ctl';
bar.innerHTML=`<div class="grp"><span>Steuerstand</span><div class="seg" id="ap"><button data-v="hand" class="on" type="button">HAND</button><button data-v="nfu" type="button">NFU</button><button data-v="auto" type="button">AUTO</button></div></div>
<div class="pn" id="p-hand"><small>Handrad ziehen oder ←/→ · Ruder folgt dem Handrad (Follow-up)</small></div>
<div class="pn" id="p-nfu" hidden><button id="nP" class="hold" type="button">◄ BB</button>
 <div id="tl"><i id="tk2"></i></div><button id="nS" class="hold" type="button">StB ►</button><small>NFU-Tiller: Hebel ziehen, Ruder läuft solange; loslassen = Ruder bleibt liegen</small></div>
<div class="pn" id="p-auto" hidden><span class="lab">Sollkurs</span><button class="st2" data-d="-10" type="button">−10</button><button class="st2" data-d="-1" type="button">−1</button>
 <input id="apv" inputmode="numeric" maxlength="3" value="000"><button class="st2" data-d="1" type="button">+1</button><button class="st2" data-d="10" type="button">+10</button>
 <button id="apset" type="button">SET</button><span class="lab">Limit</span><div class="seg" id="lim"><button data-v="10" type="button">10°</button><button data-v="20" class="on" type="button">20°</button><button data-v="30" type="button">30°</button></div><b id="apst"></b></div>`;
document.getElementById('top').after(bar);
const setTgt=v=>{S.apTgt=((Math.round(v)%360)+360)%360;$('apv').value=pad(S.apTgt)};
function setMode(m){if(S.prac&&m!='hand')return;S.mode=m;S.lev=0;paintLev();
 [...$('ap').children].forEach(b=>b.classList.toggle('on',b.dataset.v==m));
 ['hand','nfu','auto'].forEach(x=>$('p-'+x).hidden=x!=m);document.body.dataset.m=m;
 if(m=='auto')setTgt(S.hdg);if(m=='hand')S.ord=Math.round(S.act*2)/2;dispatchEvent(new Event('resize'))}
[...$('ap').children].forEach(b=>b.onclick=()=>setMode(b.dataset.v));
[...$('lim').children].forEach(b=>b.onclick=()=>{S.lim=+b.dataset.v;[...$('lim').children].forEach(x=>x.classList.toggle('on',x===b))});
bar.querySelectorAll('.st2').forEach(b=>b.onclick=()=>setTgt(S.apTgt+ +b.dataset.d));
$('apset').onclick=()=>setTgt(+$('apv').value||0);$('apv').onkeydown=e=>{e.stopPropagation();if(e.key=='Enter')setTgt(+$('apv').value||0)};
$('apv').onfocus=e=>e.target.select();
/* NFU-Tiller (Feder-Rückstellung) */
const tl=$('tl'),tk=$('tk2');let td=false;
function paintLev(){tk.style.left=(50+S.lev*44)+'%'}
function lv(e){const r=tl.getBoundingClientRect();S.lev=clamp(((e.clientX-r.left)/r.width-.5)*2/.88,-1,1)}
tl.onpointerdown=e=>{if(S.mode!='nfu')return;tl.setPointerCapture(e.pointerId);td=true;lv(e);paintLev()};
tl.onpointermove=e=>{if(td){lv(e);paintLev()}};['pointerup','pointercancel'].forEach(t=>tl['on'+t]=()=>{td=false;S.lev=0;paintLev()});
[['nP',-1],['nS',1]].forEach(([id,v])=>{const b=$(id);b.onpointerdown=e=>{if(S.mode=='nfu'){b.setPointerCapture(e.pointerId);S.lev=v;paintLev()}};['pointerup','pointercancel'].forEach(t=>b['on'+t]=()=>{S.lev=0;paintLev()})});
paintLev();
/* Tastatur: im NFU Hebel, im AUTO Sollkurs ±1 (Shift ±10) */
addEventListener('keydown',e=>{const k=e.key;if(S.mode=='hand'||(k!='ArrowLeft'&&k!='ArrowRight'))return;const s=k=='ArrowLeft'?-1:1;
 if(S.mode=='nfu'){S.lev=s;paintLev()}else setTgt(S.apTgt+s*(e.shiftKey?10:1));e.preventDefault();e.stopImmediatePropagation()},true);
addEventListener('keyup',e=>{if(S.mode=='nfu'&&(e.key=='ArrowLeft'||e.key=='ArrowRight')){S.lev=0;paintLev()}});
$('wh').addEventListener('pointerdown',e=>{if(S.mode!='hand')e.stopImmediatePropagation()},true);
/* Üben nur im Handbetrieb */
const _mode=mode;mode=function(p){_mode(p);if(p)setMode('hand');$('ap').classList.toggle('lock',!!p)};
/* Regler / NFU in der Physik */
const _step=step;step=function(dt){
 if(S.mode=='auto'){const e=dif(S.apTgt,S.hdg),f=Math.max(.35,Math.abs(S.spd)/8);S.ord=clamp((1.5*e-2*S.rot/60*8)/f,-S.lim,S.lim)*(S.spd<-.5?-1:1)}
 else if(S.mode=='nfu')S.ord=clamp(S.act+S.lev*8,-40,40);
 _step(dt);
 const st=$('apst');if(S.mode=='auto'){const e=dif(S.apTgt,S.hdg);st.textContent=Math.abs(e)<.6?'KURS ANLIEGEND':'KURSÄNDERUNG '+(e>0?'StB ':'BB ')+Math.abs(e).toFixed(0)+'°';st.className=Math.abs(e)<.6?'ok':''}};
/* Schiffsansicht in der Kompassmitte: Bug, Heck, Ruderblatt, Kielwasser, Fahrtrichtung */
const _dg=drawGyro;drawGyro=function(){_dg();
 g.save();g.translate(300,300);g.scale(.88,.88);
 if(S.mode=='auto'){g.save();g.rotate((S.apTgt-S.hdg)*R);g.shadowColor='#55e5d1';g.shadowBlur=20;g.fillStyle='#55e5d1';g.strokeStyle='#04211d';g.lineWidth=4;g.beginPath();g.moveTo(0,-288);g.lineTo(-24,-334);g.lineTo(24,-334);g.closePath();g.stroke();g.fill();g.restore()}
 g.fillStyle='#12181d';g.beginPath();g.arc(0,0,170,0,7);g.fill();g.strokeStyle='rgba(85,229,209,.16)';g.lineWidth=2;g.stroke();
 g.fillStyle='#fff';g.font='bold 54px ui-monospace,Menlo,monospace';g.textAlign='center';g.textBaseline='middle';g.fillText(S.hdg.toFixed(1)+'°',0,-112);
 g.fillStyle=S.mode=='auto'?'#55e5d1':'#8b939c';g.font='bold 18px system-ui';g.fillText(S.mode=='auto'?'AUTOPILOT '+pad(S.apTgt)+'°':S.mode=='nfu'?'NFU':'HAND',0,-72);
 g.translate(0,28);const a=S.act*R;
 g.strokeStyle='rgba(120,200,255,.35)';g.lineWidth=7;g.lineCap='round';for(const s of[-9,9]){g.beginPath();g.moveTo(s,66);g.quadraticCurveTo(s-S.rot*.5,95,s-S.rot*1.7,128);g.stroke()}
 const hg=g.createLinearGradient(-24,0,24,0);hg.addColorStop(0,'#27363f');hg.addColorStop(.5,'#9db0bb');hg.addColorStop(1,'#27363f');
 g.shadowColor='rgba(0,0,0,.7)';g.shadowBlur=14;g.shadowOffsetY=6;g.fillStyle=hg;g.strokeStyle='#e6eef2';g.lineWidth=2.2;g.beginPath();g.moveTo(0,-72);g.bezierCurveTo(26,-42,26,0,24,62);g.lineTo(-24,62);g.bezierCurveTo(-26,0,-26,-42,0,-72);g.closePath();g.fill();g.stroke();g.shadowColor='transparent';
 g.fillStyle='#d8e2e8';g.fillRect(-15,22,30,30);g.fillStyle='#3d5560';g.fillRect(-15,22,30,7);g.fillStyle='#c0392b';g.fillRect(-9,-26,18,8);g.fillRect(-9,-8,18,8);
 g.strokeStyle='#ffc24d';g.lineWidth=5;g.beginPath();g.moveTo(0,62);g.lineTo(Math.sin(a)*24,62+Math.cos(a)*24);g.stroke();
 const L=clamp(Math.abs(S.spd)*4,0,48),d=S.spd>=0?-1:1,y0=d<0?-76:66;g.strokeStyle='#55e5d1';g.fillStyle='#55e5d1';g.lineWidth=4;
 if(L>3){g.beginPath();g.moveTo(0,y0);g.lineTo(0,y0+d*L);g.stroke();g.beginPath();g.moveTo(0,y0+d*(L+9));g.lineTo(-7,y0+d*L);g.lineTo(7,y0+d*L);g.fill()}
 g.restore()};
})();
