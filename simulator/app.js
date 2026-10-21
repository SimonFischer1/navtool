const $=id=>document.getElementById(id),R=Math.PI/180;
/* [Kommando, Sollfahrt kn, Kurzname am Hebel, Richtung] */
const TG=[["Volle Fahrt voraus",12,"Volle Fahrt","ah"],["Halbe Fahrt voraus",8,"Halbe Fahrt","ah"],["Langsam voraus",5,"Langsam","ah"],["Ganz langsam voraus",3,"Ganz langsam","ah"],["Stopp",0,"STOPP","z"],["Ganz langsam achteraus",-2,"Ganz langsam","as"],["Langsam achteraus",-3.5,"Langsam","as"],["Halbe Fahrt achteraus",-5,"Halbe Fahrt","as"],["Volle Fahrt achteraus",-7,"Volle Fahrt","as"]];
const N=TG.length-1;
const S={hdg:Math.random()*360,rot:0,ord:0,act:0,spd:8,tg:1,task:null,hold:0,done:0,focus:"both",lvl:1,prac:false};
const pad=n=>String(Math.round(n)%360).padStart(3,"0");
const dif=(a,b)=>((a-b+540)%360)-180;
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(_){}};

/* ===== Maschinentelegraf als Hebel ===== */
const tin=$("tin"),lev=$("tlev"),tn=$("tn");
TG.forEach((t,i)=>{
 tn.insertAdjacentHTML("beforeend",`<i class="nt ${t[3]=="ah"?"ah":t[3]=="as"?"as":"z"}" style="--i:${i}"></i><div class="lb ${t[3]}" data-i="${i}" style="--i:${i}">${t[2]}</div>`)});
const lbs=[...tn.querySelectorAll(".lb")];
let tdrag=false;
function setTg(i,silent){i=Math.max(0,Math.min(N,i));if(i!==S.tg&&!silent)buzz(8);S.tg=i;paintTg(!tdrag)}
function paintTg(snap,p){
 const pos=p!=null?p:S.tg/N;
 lev.classList.toggle("snap",!!snap);lev.style.setProperty("--p",pos);
 lbs.forEach((b,j)=>b.classList.toggle("on",j===S.tg));
 const t=TG[S.tg],pl=$("tplate");$("tpn").textContent=t[0];pl.className=t[3]=="as"?"astern":t[3]=="z"?"stop":"";
 const f=$("rfill"),h=tin.clientHeight||1,ext=12;// Schiene reicht 12px über die Skala hinaus
 const mid=.5,top=Math.min(mid,pos),bot=Math.max(mid,pos);
 f.style.top=(ext+top*h)+"px";f.style.height=((bot-top)*h)+"px";f.style.bottom="auto";
 f.classList.toggle("astern",pos>mid);
 lev.querySelector("b").className=t[3];
}
function pY(e){const r=tin.getBoundingClientRect();return Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))}
$("tbox").addEventListener("pointerdown",e=>{$("tbox").setPointerCapture(e.pointerId);tdrag=true;move(e)});
$("tbox").addEventListener("pointermove",e=>{if(tdrag)move(e)});
["pointerup","pointercancel"].forEach(t=>$("tbox").addEventListener(t,()=>{if(!tdrag)return;tdrag=false;paintTg(true)}));
function move(e){const p=pY(e),i=Math.round(p*N);if(i!==S.tg){buzz(8);S.tg=i}
 paintTg(false,p+(i/N-p)*.35)}
window.addEventListener("resize",()=>paintTg(true));
setTg(1,true);

/* ===== Handrad ===== */
const tk=$("tk");
for(let v=-40;v<=40;v+=5){const a=v*2,big=v%10==0,c=v>0?"#3fbf6f":v<0?"#e8453c":"#fff";
 tk.insertAdjacentHTML("beforeend",`<g transform="rotate(${a})"><path d="M0-98v${big?16:9}" stroke="${c}" stroke-width="2"/>${big?`<text transform="translate(0 -66) rotate(${-a})" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="700" fill="${c}">${Math.abs(v)}</text>`:""}</g>`)}
function setRud(v){S.ord=Math.max(-40,Math.min(40,Math.round(v*2)/2))}
let drag=null;
$("wh").addEventListener("pointerdown",e=>{$("wh").setPointerCapture(e.pointerId);drag={a:ang(e),o:S.ord}});
$("wh").addEventListener("pointermove",e=>{if(!drag)return;const a=ang(e);drag.o=Math.max(-40,Math.min(40,drag.o+dif(a,drag.a)/2));drag.a=a;setRud(drag.o)});
["pointerup","pointercancel"].forEach(t=>$("wh").addEventListener(t,()=>drag=null));
function ang(e){const r=$("wh").getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))/R}
$("mid").onclick=()=>setRud(0);
addEventListener("keydown",e=>{const k=e.key;
 if(k=="ArrowLeft")setRud(S.ord-1);else if(k=="ArrowRight")setRud(S.ord+1);
 else if(k=="ArrowUp")setTg(S.tg-1);else if(k=="ArrowDown")setTg(S.tg+1);
 else if(k==" "||k=="m")setRud(0);else return;e.preventDefault()});

/* ===== Üben ===== */
const seg=(id,cb)=>{const el=$(id);[...el.children].forEach(b=>b.onclick=()=>{[...el.children].forEach(x=>x.classList.toggle("on",x===b));cb(b.dataset.v)})};
seg("focus",v=>{S.focus=v;S.done=0;$("sc").textContent=0;gen()});
seg("lvl",v=>{S.lvl=+v;S.done=0;$("sc").textContent=0;gen()});
function mode(prac){
 S.prac=prac;$("mode").classList.toggle("prac",prac);$("mFree").classList.toggle("on",!prac);$("mPrac").classList.toggle("on",prac);
 $("opts").hidden=!prac;$("stat").hidden=!prac;
 const cb=$("cbox");cb.classList.toggle("free",!prac);cb.classList.toggle("prac",prac);
 if(prac){S.done=0;$("sc").textContent=0;gen()}
 else{S.task=null;$("cmd").textContent="Freie Fahrt";$("clab").textContent="Modus";$("csec").textContent="";cb.classList.remove("ok");$("cbar").firstElementChild.style.width="0"}
 dispatchEvent(new Event("resize"))}
$("mFree").onclick=()=>mode(false);$("mPrac").onclick=()=>mode(true);
$("cbox").classList.add("free");
function gen(){const f=S.focus,t={},rnd=n=>Math.floor(Math.random()*n);
 if(f!="tele"){if(Math.random()<.25){t.rud=Math.random()<.15?0:(Math.random()<.5?-1:1)*(1+rnd(40))}else{do t.crs=rnd(361)%360;while(Math.abs(dif(t.crs,S.hdg))<15)}}
 if(f!="steer"){do t.tg=rnd(TG.length);while(t.tg==S.tg)}
 S.task=t;S.hold=0}
function txt(t){const p=[];if(t.crs!=null)p.push("Kurs "+pad(t.crs)+"°");
 if(t.rud!=null)p.push(t.rud==0?"Ruder mittschiffs":"Ruder "+(t.rud>0?"Steuerbord ":"Backbord ")+Math.abs(t.rud)+"°");
 if(t.tg!=null)p.push(TG[t.tg][0]);return p.join(" · ")}
function check(dt){const t=S.task,tol=S.lvl;if(!t)return;
 const ok=(t.crs==null||Math.abs(dif(S.hdg,t.crs))<=tol)&&(t.rud==null||Math.abs(S.act-t.rud)<=Math.max(1,tol))&&(t.tg==null||S.tg==t.tg);
 S.hold=ok?S.hold+dt:0;
 $("clab").textContent="Kommando";$("cmd").textContent=txt(t);
 $("csec").textContent=S.hold>0?"✓ "+Math.max(0,5-S.hold).toFixed(1)+" s":"";
 $("cbar").firstElementChild.style.width=Math.min(100,S.hold/5*100)+"%";
 $("cbox").classList.toggle("ok",ok);
 if(S.hold>=5){S.done++;$("sc").textContent=S.done;
  const c=$("cbox");c.classList.remove("done");void c.offsetWidth;c.classList.add("done");
  const s=$("stat");s.classList.remove("pop");void s.offsetWidth;s.classList.add("pop");buzz([20,40,20]);gen()}}

/* ===== Physik ===== */
function step(dt){
 const d=S.ord-S.act;S.act+=Math.sign(d)*Math.min(Math.abs(d),3*dt);
 S.spd+=Math.sign(TG[S.tg][1]-S.spd)*Math.min(Math.abs(TG[S.tg][1]-S.spd),.7*dt);
 const target=S.act*2.8*Math.max(-.8,Math.min(1.25,S.spd/8));
 S.rot+=(target-S.rot)*dt/3;S.hdg=(S.hdg+S.rot/60*dt+360)%360}

/* ===== Zeichnen ===== */
const g=$("gy").getContext("2d"),rd=$("rd").getContext("2d");
function drawGyro(){const W=600,c=W/2;g.clearRect(0,0,W,W);g.save();g.translate(c,c);
 const bg=g.createRadialGradient(0,-60,40,0,0,296);bg.addColorStop(0,"#161e24");bg.addColorStop(1,"#0a0e12");
 g.fillStyle=bg;g.beginPath();g.arc(0,0,290,0,7);g.fill();g.strokeStyle="#34424b";g.lineWidth=4;g.stroke();
 g.save();g.rotate(-S.hdg*R);g.textAlign="center";g.textBaseline="middle";
 for(let a=0;a<360;a+=5){g.save();g.rotate(a*R);const m=a%10==0;g.strokeStyle="#d5d9dd";g.lineWidth=m?3:1.5;g.beginPath();g.moveTo(0,-286);g.lineTo(0,-286+(m?24:14));g.stroke();
  if(m){g.translate(0,-240);g.font="bold 17px system-ui";g.fillStyle=a%90==0?"#e8453c":"#d5d9dd";g.fillText(a==0?"360":String(a).padStart(3,"0"),0,0)}g.restore()}
 const t=S.task&&S.task.crs;if(t!=null){g.save();g.rotate(t*R);g.fillStyle="#f0b13c";g.shadowColor="#f0b13c";g.shadowBlur=14;g.beginPath();g.moveTo(0,-292);g.lineTo(-14,-318);g.lineTo(14,-318);g.fill();g.restore()}
 g.restore();
 g.fillStyle="#e8453c";g.beginPath();g.moveTo(0,-262);g.lineTo(-12,-300);g.lineTo(12,-300);g.fill();
 g.fillStyle="#12181d";g.beginPath();g.arc(0,0,170,0,7);g.fill();g.strokeStyle="rgba(85,229,209,.16)";g.lineWidth=2;g.stroke();
 g.fillStyle="#fff";g.font="bold 78px ui-monospace,Menlo,monospace";g.textAlign="center";g.textBaseline="middle";g.fillText(S.hdg.toFixed(1)+"°",0,-10);
 g.fillStyle="#8b939c";g.font="22px system-ui";g.fillText("Kreiselkompass",0,60);g.restore()}
function drawRud(){const W=440,H=120,c=W/2,k=185/40;rd.clearRect(0,0,W,H);
 rd.fillStyle="#0c1216";rd.fillRect(0,0,W,H);rd.font="bold 15px system-ui";rd.textAlign="center";
 for(let v=-40;v<=40;v+=5){const x=c+v*k;rd.strokeStyle=v<0?"#e8453c":v>0?"#3fbf6f":"#fff";rd.lineWidth=v%10?1.5:3;rd.beginPath();rd.moveTo(x,28);rd.lineTo(x,v%10?42:52);rd.stroke();
  if(v%10==0&&v){rd.fillStyle=rd.strokeStyle;rd.fillText(Math.abs(v),x,70)}}
 rd.fillStyle="#e8453c";rd.fillText("BB",24,20);rd.fillStyle="#3fbf6f";rd.fillText("StB",W-26,20);
 rd.fillStyle="#f0b13c";const o=c+S.ord*k;rd.beginPath();rd.moveTo(o,24);rd.lineTo(o-8,10);rd.lineTo(o+8,10);rd.fill();
 rd.strokeStyle="#fff";rd.lineWidth=4;rd.beginPath();rd.moveTo(c+S.act*k,22);rd.lineTo(c+S.act*k,56);rd.stroke();
 rd.fillStyle="#fff";rd.font="bold 24px ui-monospace,Menlo,monospace";const a=Math.round(S.act*10)/10;
 rd.fillText(Math.abs(a)<.05?"Mittschiffs":(a>0?"StB ":"BB ")+Math.abs(a).toFixed(1)+"°",c,105)}
let last=performance.now();
(function loop(n){const dt=Math.min(.1,(n-last)/1000);last=n;step(dt);check(dt);
 $("wg").setAttribute("transform","rotate("+S.ord*2+")");
 $("rot").textContent=S.rot.toFixed(1);$("rot").style.color=Math.abs(S.rot)<.5?"":S.rot>0?"#3fbf6f":"#e8453c";
 $("spd").textContent=S.spd.toFixed(1);
 lbs.forEach((b,j)=>b.classList.toggle("cmd",!!S.task&&S.task.tg===j));
 drawGyro();drawRud();requestAnimationFrame(loop)})(last);
