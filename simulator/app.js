const $=id=>document.getElementById(id),R=Math.PI/180;
const TG=[["Volle Fahrt voraus",12],["Halbe Fahrt voraus",8],["Langsam voraus",5],["Ganz langsam voraus",3],["Stopp",0],["Ganz langsam achteraus",-2],["Langsam achteraus",-3.5],["Halbe Fahrt achteraus",-5],["Volle Fahrt achteraus",-7]];
const S={hdg:Math.random()*360,rot:0,ord:0,act:0,spd:8,tg:1,task:null,hold:0,done:0};
const pad=n=>String(Math.round(n)%360).padStart(3,"0");
const dif=(a,b)=>((a-b+540)%360)-180;
// Telegraf
TG.forEach((t,i)=>{const b=document.createElement("button");b.textContent=t[0];b.onclick=()=>setTg(i);$("tg").appendChild(b)});
function setTg(i){S.tg=Math.max(0,Math.min(TG.length-1,i));[...$("tg").children].forEach((b,j)=>b.classList.toggle("on",j==S.tg))}
setTg(1);
// Handrad
const tk=$("tk");
for(let v=-40;v<=40;v+=5){const a=v*2,big=v%10==0,c=v>0?"#3fbf6f":v<0?"#e8453c":"#fff";
 tk.insertAdjacentHTML("beforeend",`<g transform="rotate(${a})"><path d="M0-94v${big?16:9}" stroke="${c}" stroke-width="2"/>${big?`<text transform="translate(0 -62) rotate(${-a})" text-anchor="middle" dominant-baseline="middle" font-size="17" font-weight="700" fill="${c}">${Math.abs(v)}</text>`:""}</g>`)}
function setRud(v){S.ord=Math.max(-40,Math.min(40,Math.round(v*2)/2))}
let drag=null;
$("wh").addEventListener("pointerdown",e=>{$("wh").setPointerCapture(e.pointerId);drag={a:ang(e),o:S.ord}});
$("wh").addEventListener("pointermove",e=>{if(!drag)return;const a=ang(e);drag.o=Math.max(-40,Math.min(40,drag.o+dif(a,drag.a)/2));drag.a=a;setRud(drag.o)});
["pointerup","pointercancel"].forEach(t=>$("wh").addEventListener(t,()=>drag=null));
function ang(e){const r=$("wh").getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))/R}
$("mid").onclick=()=>setRud(0);
// Tastatur
addEventListener("keydown",e=>{const k=e.key;
 if(k=="ArrowLeft")setRud(S.ord-1);else if(k=="ArrowRight")setRud(S.ord+1);
 else if(k=="ArrowUp")setTg(S.tg-1);else if(k=="ArrowDown")setTg(S.tg+1);
 else if(k==" "||k=="m")setRud(0);else return;e.preventDefault()});
// Üben
$("pr").onclick=()=>{const on=!S.task&&!$("pr").classList.contains("on");$("pr").classList.toggle("on",on);$("opts").hidden=!on;on?gen():(S.task=null,$("cmd").textContent="Freie Fahrt",$("cmd").className="",$("stat").textContent="")};
$("focus").onchange=$("lvl").onchange=()=>{S.done=0;gen()};
function gen(){const f=$("focus").value,t={},rnd=n=>Math.floor(Math.random()*n);
 if(f!="tele"){if(Math.random()<.25){t.rud=Math.random()<.15?0:(Math.random()<.5?-1:1)*(1+rnd(40))}else{do t.crs=rnd(361)%360;while(Math.abs(dif(t.crs,S.hdg))<15)}}
 if(f!="steer"){do t.tg=rnd(TG.length);while(t.tg==S.tg)}
 S.task=t;S.hold=0}
function txt(t){const p=[];if(t.crs!=null)p.push("Kurs "+pad(t.crs)+"°");
 if(t.rud!=null)p.push(t.rud==0?"Ruder mittschiffs":"Ruder "+(t.rud>0?"Steuerbord ":"Backbord ")+Math.abs(t.rud)+"°");
 if(t.tg!=null)p.push(TG[t.tg][0]);return p.join(" · ")}
function check(dt){const t=S.task,tol=+$("lvl").value;if(!t)return;
 const ok=(t.crs==null||Math.abs(dif(S.hdg,t.crs))<=tol)&&(t.rud==null||Math.abs(S.act-t.rud)<=Math.max(1,tol))&&(t.tg==null||S.tg==t.tg);
 S.hold=ok?S.hold+dt:0;
 $("cmd").textContent=txt(t)+(S.hold>0?"  ✓ "+Math.max(0,5-S.hold).toFixed(1)+" s":"");
 $("cmd").className=ok?"ok":"";$("stat").textContent="✓ "+S.done;
 if(S.hold>=5){S.done++;gen()}}
// Physik
function step(dt){
 const d=S.ord-S.act;S.act+=Math.sign(d)*Math.min(Math.abs(d),3*dt);
 S.spd+=Math.sign(TG[S.tg][1]-S.spd)*Math.min(Math.abs(TG[S.tg][1]-S.spd),.7*dt);
 const target=S.act*2.8*Math.max(-.8,Math.min(1.25,S.spd/8));
 S.rot+=(target-S.rot)*dt/3;S.hdg=(S.hdg+S.rot/60*dt+360)%360}
// Zeichnen
const g=$("gy").getContext("2d"),rd=$("rd").getContext("2d");
function drawGyro(){const W=600,c=W/2;g.clearRect(0,0,W,W);g.save();g.translate(c,c);
 g.fillStyle="#0f1114";g.beginPath();g.arc(0,0,290,0,7);g.fill();g.strokeStyle="#3a4048";g.lineWidth=4;g.stroke();
 g.save();g.rotate(-S.hdg*R);g.textAlign="center";g.textBaseline="middle";
 for(let a=0;a<360;a+=5){g.save();g.rotate(a*R);const m=a%10==0;g.strokeStyle="#d5d9dd";g.lineWidth=m?3:1.5;g.beginPath();g.moveTo(0,-286);g.lineTo(0,-286+(m?24:14));g.stroke();
  if(m){g.translate(0,-240);g.font="bold 17px system-ui";g.fillStyle=a%90==0?"#e8453c":"#d5d9dd";g.fillText(a==0?"360":String(a).padStart(3,"0"),0,0)}g.restore()}
 const t=S.task&&S.task.crs;if(t!=null){g.save();g.rotate(t*R);g.fillStyle="#f0b13c";g.beginPath();g.moveTo(0,-292);g.lineTo(-14,-318);g.lineTo(14,-318);g.fill();g.restore()}
 g.restore();
 g.fillStyle="#e8453c";g.beginPath();g.moveTo(0,-262);g.lineTo(-12,-300);g.lineTo(12,-300);g.fill();
 g.fillStyle="#1b1f24";g.beginPath();g.arc(0,0,170,0,7);g.fill();
 g.fillStyle="#fff";g.font="bold 78px ui-monospace,Menlo,monospace";g.textAlign="center";g.textBaseline="middle";g.fillText(S.hdg.toFixed(1)+"°",0,-10);
 g.fillStyle="#8b939c";g.font="22px system-ui";g.fillText("Kreiselkompass",0,60);g.restore()}
function drawRud(){const W=440,H=120,c=W/2,k=185/40;rd.clearRect(0,0,W,H);
 rd.fillStyle="#0f1114";rd.fillRect(0,0,W,H);rd.font="bold 15px system-ui";rd.textAlign="center";
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
 [...$("tg").children].forEach((b,j)=>b.classList.toggle("cmd",!!S.task&&S.task.tg===j));
 drawGyro();drawRud();requestAnimationFrame(loop)})(last);
