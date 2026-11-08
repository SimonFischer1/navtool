/* NavTool Radar-Simulator (nachempfunden dem Furuno FAR-2228 NXT BB): PPI, AIS, Parallel Index, EBL/VRM, CPA/TCPA */
(()=>{
const $=s=>document.querySelector(s),R=Math.random,rad=Math.PI/180,TAU=Math.PI*2,F=window.Furuno,p3=n=>String(Math.round(n)%360).padStart(3,'0');
const RG=[.25,.5,.75,1.5,3,6,12,24],RI=[.05,.1,.25,.25,.5,1,2,4];
const PAL=[{bg:'#02080b',ring:'rgba(60,180,190,.40)',echo:'255,214,80',tx:'#9fe7ff',ais:'#5dffb0',hl:'#fff',ebl:'#ffe27a',pi:'#7ad7ff'},{bg:'#06080a',ring:'rgba(120,150,150,.35)',echo:'240,200,120',tx:'#c8d6d6',ais:'#9fe3c3',hl:'#e8e8e8',ebl:'#ffd89a',pi:'#a5c8d8'},{bg:'#050202',ring:'rgba(140,70,30,.45)',echo:'255,140,50',tx:'#d98a4a',ais:'#d9a05a',hl:'#e09a5a',ebl:'#ff9a3c',pi:'#c9783a'}];
const NM=['NORDSTERN','HANSE TRADER','ANNA MARIE','SEA FALCON','OCEAN PRIDE','LADY JANE','BALTIC SPIRIT','ELBE EXPRESS','FRISIA 9','WESER STAR','NORDLICHT','PETRA K','ATLANTIC DAWN','GRETA','EMDEN CARRIER','HELGOLAND','ALSTER','STENA NOVA','MERCATOR','TIDE RUNNER'];
const TY=[['Cargo',10,180],['Tanker',9,230],['Container',12,300],['Fishing',6,28],['Ferry',16,120],['Tug',5,30],['Sailing',4,12],['Pilot',14,15]];
const S={tx:1,ri:5,mode:'N',cu:45,gain:62,sea:30,rain:10,pal:0,bri:90,hdg:45,set:45,sog:12,ts:1,x:0,y:0,sw:0,fs:true,fb:true,fl:true,nS:8,nB:10,ais:true,al:'name',pi:false,pib:45,vect:true,ebl:30,eblOn:true,vrm:2,vrmOn:true,sel:null,cpaL:.5,tcpaL:12,ack:false,alOn:false,alt:null,menu:false,mi:0,cur:null};
let T=[],LD=[],W=600,Rp=270,c=300,dpr=1,lastBeep=0;
const cv=$('#ppi'),ctx=cv.getContext('2d'),ph=document.createElement('canvas'),px=ph.getContext('2d');
const rot=()=>S.mode=='N'?0:S.mode=='H'?S.hdg:S.cu,K=()=>Rp/RG[S.ri],P=()=>PAL[S.pal];
function gen(){T=[];LD=[];let id=1;
 for(let i=0;i<S.nS;i++){const ty=TY[Math.floor(R()*TY.length)],d=1.5+R()*10,b=R()*TAU;let g=R()*360;if(R()<.35)g=(b/rad+180+(R()-.5)*40+720)%360;
  T.push({id:id++,k:'ship',name:NM[i%NM.length]+(i>=NM.length?' '+(i+1):''),mmsi:211000000+Math.floor(R()*899999),type:ty[0],len:Math.round(ty[2]*(.8+R()*.4)),x:S.x+Math.sin(b)*d,y:S.y+Math.cos(b)*d,cog:g,sog:Math.max(1,ty[1]*(.6+R()*.8)),dest:R()<.5?'HAMBURG':'ROTTERDAM'})}
 const kd=[['Rote Tonne','R'],['Grüne Tonne','G'],['Nordtonne','N'],['Osttonne','E'],['Südtonne','S'],['Westtonne','W']];let bx=S.x+(R()-.5)*8,by=S.y+(R()-.5)*8,dir=R()*TAU;
 for(let j=0;j<S.nB;j++){if(j%2==0){bx+=Math.sin(dir)*.8;by+=Math.cos(dir)*.8;dir+=(R()-.5)*.3}const sp=R()<.2,k=sp?kd[2+Math.floor(R()*4)]:kd[j%2],o=(j%2?-1:1)*.25;
  T.push({id:id++,k:'buoy',name:k[1]+(j+1),type:k[0],len:6,x:bx+Math.cos(dir)*o,y:by-Math.sin(dir)*o,cog:0,sog:0})}
 const line=(a,b)=>{const n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.045);for(let k=0;k<n;k++){const x=a[0]+(b[0]-a[0])*k/n,y=a[1]+(b[1]-a[1])*k/n;LD.push({x,y});for(let m=0;m<2;m++)LD.push({x:x+R()*1.4,y:y+(R()-.5)*.3})}};
 let prev=null;for(let y=-16;y<=16;y+=.6){const pt=[S.x+5.5+2.5*Math.sin(y*.35)+R()*.5,S.y+y];if(prev)line(prev,pt);prev=pt}
 for(let i=0;i<2;i++){const cx=S.x+(R()-.5)*14,cy=S.y+(R()-.5)*14,r=.3+R()*.4;if(Math.hypot(cx-S.x,cy-S.y)<2+r)continue;for(let a=0;a<TAU;a+=.05)LD.push({x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r})}
 S.sel=null;px.clearRect(0,0,W,W)}
function resize(){dpr=Math.min(devicePixelRatio||1,2);const w=cv.clientWidth;cv.width=ph.width=cv.height=ph.height=Math.max(200,Math.round(w*dpr));W=cv.width;c=W/2;Rp=W/2*.875;px.clearRect(0,0,W,W)}
function pos(x,y,rt){const dx=x-S.x,dy=y-S.y,r=Math.hypot(dx,dy),b=Math.atan2(dx,dy)/rad,a=((b-rt)%360+360)%360,k=K();return{r,b:(b+360)%360,a,x:c+Math.sin(a*rad)*r*k,y:c-Math.cos(a*rad)*r*k}}
const seaR=()=>(100-S.sea)/100*1.1*(RG[S.ri]>3?1:.6);
const vis=(len,r)=>!(r<seaR()&&len<80)&&len/100*(S.gain/50)*32/Math.pow(Math.max(r,.05),1.5)>1;
const inArc=(a,p,q)=>q>=p?a>=p&&a<q:a>=p||a<q;
function echo(x,y,len,a){const k=K(),pl=P(),rr=Math.max(1.5*dpr,Math.min(26*dpr,len/1852*k*.35))+(len?Math.min(3,Math.log10(len+1))*.9*dpr:0);px.fillStyle=`rgba(${pl.echo},${a})`;px.beginPath();px.arc(x,y,rr,0,TAU);px.fill()}
function paint(p,q,rt){
 for(const t of T){if(t.k=='ship'?!S.fs:!S.fb)continue;const o=pos(t.x,t.y,rt);if(o.r>RG[S.ri]*1.02||!inArc(o.a,p,q)||!vis(t.len,o.r))continue;echo(o.x,o.y,t.len,1)}
 if(S.fl)for(const l of LD){const o=pos(l.x,l.y,rt);if(o.r>RG[S.ri]||!inArc(o.a,p,q))continue;px.fillStyle=`rgba(${P().echo},.75)`;px.fillRect(o.x-dpr,o.y-dpr,2*dpr,2*dpr)}
 const f=((q-p+360)%360)/360,n=Math.round((Math.pow(S.gain/100,2)*150*(1-S.rain/140)+(100-S.sea)/100*100)*f);
 for(let i=0;i<n;i++){const a=(p+R()*((q-p+360)%360))*rad,r=i%2?R()*Rp:Math.pow(R(),2)*seaR()*K();px.fillStyle=`rgba(${P().echo},${.25+R()*.45})`;px.fillRect(c+Math.sin(a)*r,c-Math.cos(a)*r,1.3*dpr,1.3*dpr)}}
function sim(dt){const h=dt*S.ts/3600,d=((S.set-S.hdg+540)%360)-180;S.hdg=(S.hdg+Math.sign(d)*Math.min(Math.abs(d),3*dt*S.ts)+360)%360;
 const ox=Math.sin(S.hdg*rad)*S.sog,oy=Math.cos(S.hdg*rad)*S.sog;S.x+=ox*h;S.y+=oy*h;let al=null;
 for(const t of T){if(t.k=='ship'){t.x+=Math.sin(t.cog*rad)*t.sog*h;t.y+=Math.cos(t.cog*rad)*t.sog*h;if(Math.hypot(t.x-S.x,t.y-S.y)>30){const b=R()*TAU;t.x=S.x+Math.sin(b)*22;t.y=S.y+Math.cos(b)*22;t.cog=(b/rad+180+(R()-.5)*60+720)%360}}
  const dx=t.x-S.x,dy=t.y-S.y,vx=Math.sin(t.cog*rad)*t.sog-ox,vy=Math.cos(t.cog*rad)*t.sog-oy,v2=vx*vx+vy*vy,tc=v2>1e-6?-(dx*vx+dy*vy)/v2:0;
  t.rng=Math.hypot(dx,dy);t.brg=(Math.atan2(dx,dy)/rad+360)%360;t.tcpa=tc*60;t.cpa=tc>0?Math.hypot(dx+vx*tc,dy+vy*tc):t.rng;
  if(t.k=='ship'&&((S.ais&&S.fs)||t.acq)&&tc>0&&t.cpa<S.cpaL&&t.tcpa<S.tcpaL&&t.rng<12)al=al||t}
 S.alt=al;if(al&&!S.alOn){S.alOn=true;S.ack=false}if(!al){S.alOn=false;S.ack=false}
 if(S.alOn&&!S.ack&&performance.now()-lastBeep>3000){lastBeep=performance.now();F.beep(3,1900)}}
function draw(dt){
 const pl=P(),rt=rot(),k=K(),d=dpr;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=pl.bg;ctx.fillRect(0,0,W,W);
 if(S.tx){const p=S.sw;S.sw=(S.sw+dt*120)%360;paint(p,S.sw,rt)}
 px.globalCompositeOperation='destination-out';px.fillStyle=`rgba(0,0,0,${Math.min(1,dt/(S.tx?2.4:.5))})`;px.fillRect(0,0,W,W);px.globalCompositeOperation='source-over';
 ctx.save();ctx.beginPath();ctx.arc(c,c,Rp,0,TAU);ctx.clip();ctx.drawImage(ph,0,0);
 ctx.strokeStyle=pl.ring;ctx.lineWidth=d;ctx.fillStyle=pl.tx;ctx.font=`${14*d}px VT323,monospace`;
 for(let i=1;i*RI[S.ri]*k<=Rp+1;i++){const r=i*RI[S.ri]*k;ctx.beginPath();ctx.arc(c,c,r,0,TAU);ctx.stroke();ctx.fillText(+(i*RI[S.ri]).toFixed(2),c+Math.sin(.4)*r+3*d,c-Math.cos(.4)*r)}
 if(S.tx){const g=ctx.createConicGradient?ctx.createConicGradient((S.sw-90-35)*rad,c,c):null;if(g){g.addColorStop(0,'rgba(80,255,160,0)');g.addColorStop(35/360,'rgba(80,255,160,.22)');g.addColorStop(1,'rgba(80,255,160,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(c,c);ctx.arc(c,c,Rp,(S.sw-90-35)*rad,(S.sw-90)*rad);ctx.fill()}
  ctx.strokeStyle='rgba(120,255,180,.8)';ctx.lineWidth=1.4*d;ctx.beginPath();ctx.moveTo(c,c);ctx.lineTo(c+Math.sin(S.sw*rad)*Rp,c-Math.cos(S.sw*rad)*Rp);ctx.stroke()}
 /* Parallel Index */
 if(S.pi){ctx.strokeStyle=pl.pi;ctx.lineWidth=1.1*d;ctx.setLineDash([9*d,6*d]);for(let j=-3;j<=3;j++){const off=j*RI[S.ri]*k;if(Math.abs(off)>=Rp)continue;const hl=Math.sqrt(Rp*Rp-off*off);ctx.save();ctx.translate(c,c);ctx.rotate((S.pib-rt)*rad);ctx.beginPath();ctx.moveTo(off,-hl);ctx.lineTo(off,hl);ctx.stroke();ctx.restore()}ctx.setLineDash([])}
 /* EBL / VRM */
 ctx.strokeStyle=pl.ebl;ctx.lineWidth=1.4*d;ctx.setLineDash([10*d,6*d]);
 if(S.eblOn){const a=(S.ebl-rt)*rad;ctx.beginPath();ctx.moveTo(c,c);ctx.lineTo(c+Math.sin(a)*Rp,c-Math.cos(a)*Rp);ctx.stroke()}
 if(S.vrmOn&&S.vrm*k<Rp){ctx.beginPath();ctx.arc(c,c,S.vrm*k,0,TAU);ctx.stroke()}ctx.setLineDash([]);
 /* Heading line */
 const ah=(S.hdg-rt)*rad;ctx.strokeStyle=pl.hl;ctx.lineWidth=1.6*d;ctx.beginPath();ctx.moveTo(c,c);ctx.lineTo(c+Math.sin(ah)*Rp,c-Math.cos(ah)*Rp);ctx.stroke();
 ctx.beginPath();ctx.arc(c,c,4*d,0,TAU);ctx.stroke();
 /* Ziele */
 const sel=T.find(t=>t.id==S.sel);ctx.font=`${15*d}px VT323,monospace`;ctx.textBaseline='alphabetic';
 for(const t of T){if(t.k=='ship'?!S.fs:!S.fb)continue;const o=pos(t.x,t.y,rt);if(o.r>RG[S.ri]*1.05)continue;const isAis=t.k=='ship'&&S.ais,warn=S.alOn&&S.alt===t&&!S.ack;
  const col=warn&&Math.floor(performance.now()/350)%2?'#ff4a3d':isAis?pl.ais:pl.tx;
  if(S.vect&&(isAis||t.acq)&&t.sog>0){const e=pos(t.x+Math.sin(t.cog*rad)*t.sog*.1,t.y+Math.cos(t.cog*rad)*t.sog*.1,rt);ctx.strokeStyle=col;ctx.lineWidth=1.2*d;ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.lineTo(e.x,e.y);ctx.stroke()}
  ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=1.4*d;
  if(isAis){ctx.save();ctx.translate(o.x,o.y);ctx.rotate((t.cog-rt)*rad);ctx.beginPath();ctx.moveTo(0,-8*d);ctx.lineTo(5.5*d,6*d);ctx.lineTo(-5.5*d,6*d);ctx.closePath();ctx.stroke();ctx.restore();
   const l1=S.al=='name'?t.name:`${p3(t.brg)}° ${t.rng.toFixed(2)} NM`,l2=S.al=='name'?`${t.sog.toFixed(1)} kn  ${p3(t.cog)}°`:'';ctx.fillText(l1,o.x+10*d,o.y-4*d);if(l2)ctx.fillText(l2,o.x+10*d,o.y+8*d)}
  else if(t.acq){ctx.beginPath();ctx.arc(o.x,o.y,8*d,0,TAU);ctx.stroke();ctx.fillText(String(t.id),o.x+10*d,o.y-4*d)}
  if(t===sel){const s=14*d;ctx.strokeStyle='#fff';ctx.lineWidth=1.6*d;ctx.beginPath();for(const[sx,sy]of[[-1,-1],[1,-1],[1,1],[-1,1]]){ctx.moveTo(o.x+sx*s,o.y+sy*s*.4);ctx.lineTo(o.x+sx*s,o.y+sy*s);ctx.lineTo(o.x+sx*s*.4,o.y+sy*s)}ctx.stroke()}}
 /* Cursor */
 if(S.cur){ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=d;ctx.beginPath();ctx.moveTo(S.cur.x-9*d,S.cur.y);ctx.lineTo(S.cur.x+9*d,S.cur.y);ctx.moveTo(S.cur.x,S.cur.y-9*d);ctx.lineTo(S.cur.x,S.cur.y+9*d);ctx.stroke()}
 ctx.restore();
 /* Peilskala */
 ctx.strokeStyle=pl.tx;ctx.fillStyle=pl.tx;ctx.lineWidth=d;ctx.beginPath();ctx.arc(c,c,Rp,0,TAU);ctx.stroke();ctx.font=`${15*d}px VT323,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
 for(let a=0;a<360;a+=5){const an=a*rad,l=a%10?4*d:8*d;ctx.beginPath();ctx.moveTo(c+Math.sin(an)*Rp,c-Math.cos(an)*Rp);ctx.lineTo(c+Math.sin(an)*(Rp+l),c-Math.cos(an)*(Rp+l));ctx.stroke();
  if(a%30==0){const v=S.mode=='H'?a:(a+rt)%360;ctx.fillText(p3(v),c+Math.sin(an)*(Rp+20*d),c-Math.cos(an)*(Rp+20*d))}}
 ctx.textAlign='left';ctx.textBaseline='alphabetic';
 if(!S.tx){ctx.fillStyle='#ffd24a';ctx.font=`${34*d}px VT323,monospace`;ctx.textAlign='center';ctx.fillText('STBY',c,c-Rp*.45);ctx.textAlign='left'}
 cv.style.filter=`brightness(${.35+S.bri/100*.65})`}
/* ---- Seitenfeld ---- */
const MENU=[['SHIPS',()=>S.fs?'ON':'OFF',()=>S.fs=!S.fs],['BUOYS',()=>S.fb?'ON':'OFF',()=>S.fb=!S.fb],['LAND',()=>S.fl?'ON':'OFF',()=>S.fl=!S.fl],['AIS',()=>S.ais?'ON':'OFF',()=>S.ais=!S.ais],['AIS LABEL',()=>S.al=='name'?'NAME':'BRG/RNG',()=>S.al=S.al=='name'?'br':'name'],['PARALLEL INDEX',()=>S.pi?'ON':'OFF',()=>S.pi=!S.pi],['PI BEARING',()=>p3(S.pib)+'°',d=>S.pib=(S.pib+d*5+360)%360],['VECTORS',()=>S.vect?'ON':'OFF',()=>S.vect=!S.vect],['CPA LIMIT',()=>S.cpaL.toFixed(1)+' NM',d=>S.cpaL=Math.max(.1,Math.min(3,+(S.cpaL+d*.1).toFixed(1)))],['TCPA LIMIT',()=>S.tcpaL+' MIN',d=>S.tcpaL=Math.max(1,Math.min(30,S.tcpaL+d))],['PALETTE',()=>['DAY','DUSK','NIGHT'][S.pal],d=>S.pal=(S.pal+d+3)%3],['RANDOMIZE',()=>'ENT',()=>gen()]];
const row=(a,b)=>`<div class="r"><span>${a}</span><b>${b}</b></div>`,bx=(h,b,cl)=>`<div class="bx ${cl||''}"><h4>${h}</h4>${b}</div>`;
function fmtPos(){const la=54+S.y/60,lo=7.5+S.x/60/Math.cos(la*rad),f=(v,n,h)=>`${String(Math.floor(Math.abs(v))).padStart(n,'0')}°${((Math.abs(v)%1)*60).toFixed(2).padStart(5,'0')}${h}`;return f(la,2,la<0?'S':'N')+' '+f(lo,3,lo<0?'W':'E')}
function side(){const rt=rot(),sel=T.find(t=>t.id==S.sel),now=performance.now();let h='';
 const tg=(t,on)=>`<i class="${on?'on':''}">${t}</i>`;
 h+=`<div class="tg">${tg(S.tx?'TX':'STBY',S.tx)}${tg(S.mode+'-UP',1)}${tg('AIS',S.ais)}${tg('PI',S.pi)}${tg('VECT',S.vect)}</div>`;
 if(S.alOn&&!S.ack&&S.alt)h+=`<div class="bx al">CPA/TCPA ALARM<br>${S.ais?S.alt.name:'TGT '+S.alt.id} · ${S.alt.cpa.toFixed(2)} NM / ${S.alt.tcpa.toFixed(1)} MIN</div>`;
 if(S.menu)h+=bx('MENU',`<div class="mn">${MENU.map((m,i)=>`<div class="r ${i==S.mi?'s':''}"><span>${m[0]}</span><b>${m[1]()}</b></div>`).join('')}</div>`);
 else{h+=bx('RADAR',row('RANGE',RG[S.ri]+' NM')+row('RINGS',RI[S.ri]+' NM')+row('GAIN / SEA / RAIN',`${S.gain|0} ${S.sea|0} ${S.rain|0}`));
  h+=bx('OWN SHIP',row('HDG',p3(S.hdg)+'°')+row('SOG',S.sog.toFixed(1)+' kn')+`<div style="font-size:2.9cqh;color:#d9f4ff">${fmtPos()}</div>`);
  h+=bx('EBL1 / VRM1',row('EBL',S.eblOn?p3(S.ebl)+'° T / '+p3(S.ebl-S.hdg+360)+'° R':'OFF')+row('VRM',S.vrmOn?S.vrm.toFixed(2)+' NM':'OFF'))}
 if(S.cur){const dx=S.cur.x-c,dy=c-S.cur.y,r=Math.hypot(dx,dy)/K();h+=bx('CURSOR',row('BRG',r<=RG[S.ri]*1.02?p3((Math.atan2(dx,dy)/rad+rt+360)%360)+'° T':'---')+row('RNG',r<=RG[S.ri]*1.02?r.toFixed(2)+' NM':'---'))}
 if(sel){const ais=sel.k=='ship'&&S.ais,fin=ais||sel.k=='buoy'||now-sel.acq>4000;
  h+=bx('TARGET DATA',(ais?`<div class="nm">${sel.name}</div>`+row('MMSI',sel.mmsi)+row('TYPE',sel.type+' · '+sel.len+' m')+row('DEST',sel.dest):`<div class="nm">${sel.k=='buoy'?sel.name+' · '+sel.type:'TGT '+sel.id}</div>`)+row('BRG',p3(sel.brg)+'° T / '+p3(sel.brg-S.hdg+360)+'° R')+row('RNG',sel.rng.toFixed(2)+' NM')+
   (fin?row('COG / SOG',`${p3(sel.cog)}° / ${sel.sog.toFixed(1)} kn`)+row('CPA',sel.cpa.toFixed(2)+' NM')+row('TCPA',sel.tcpa>0?sel.tcpa.toFixed(1)+' MIN':'PASSED'):`<div class="r"><span style="color:#ffd24a">ACQUIRING …</span></div>`))}
 $('#side').innerHTML=h}
/* ---- Bedienung ---- */
function cyc(){S.mode=S.mode=='N'?'H':S.mode=='H'?'C':'N';if(S.mode=='C')S.cu=Math.round(S.hdg);px.clearRect(0,0,W,W)}
function acquire(t){if(t&&!t.acq)t.acq=performance.now()}
function press(k){
 if(S.menu){if(k=='up')S.mi=(S.mi+MENU.length-1)%MENU.length;else if(k=='down')S.mi=(S.mi+1)%MENU.length;else if(k=='left')MENU[S.mi][2](-1);else if(k=='right'||k=='ent')MENU[S.mi][2](1);else if(k=='menu'||k=='esc')S.menu=false;else if(k=='ack')S.ack=true;sync();return}
 const a=k=>{S.ri=Math.max(0,Math.min(RG.length-1,S.ri+k));S.vrm=Math.min(S.vrm,RG[S.ri]);px.clearRect(0,0,W,W)};
 switch(k){case'tx':S.tx=!S.tx;break;case'mode':cyc();break;case'rd':a(-1);break;case'ru':a(1);break;case'acq':case'ent':{const t=T.find(t=>t.id==S.sel);if(t)acquire(t);else{const v=T.filter(t=>t.k=='ship').sort((x,y)=>x.rng-y.rng)[0];if(v){S.sel=v.id;acquire(v)}}break}
  case'can':{const t=T.find(t=>t.id==S.sel);if(t)t.acq=0;S.sel=null;break}case'ack':S.ack=true;break;case'menu':S.menu=true;S.mi=0;break;case'ais':S.ais=!S.ais;break;case'pi':S.pi=!S.pi;break;case'vect':S.vect=!S.vect;break;case'ev':S.eblOn=S.vrmOn=!(S.eblOn&&S.vrmOn);break;case'tab':{const l=T.filter(t=>(t.k=='ship'?S.fs:S.fb)&&t.rng<=RG[S.ri]).sort((x,y)=>x.rng-y.rng);if(l.length){const i=l.findIndex(t=>t.id==S.sel);S.sel=l[(i+1)%l.length].id}break}
  case'left':S.ebl=(S.ebl+359)%360;S.eblOn=true;break;case'right':S.ebl=(S.ebl+1)%360;S.eblOn=true;break;case'up':S.vrm=Math.min(RG[S.ri],S.vrm+RG[S.ri]/80);S.vrmOn=true;break;case'down':S.vrm=Math.max(0,S.vrm-RG[S.ri]/80);S.vrmOn=true;break;
  case'pib-':S.pib=(S.pib+355)%360;break;case'pib+':S.pib=(S.pib+5)%360;break;case'gain+':S.gain=Math.min(100,S.gain+3);break;case'gain-':S.gain=Math.max(0,S.gain-3);break;case'sea+':S.sea=Math.min(100,S.sea+3);break;case'sea-':S.sea=Math.max(0,S.sea-3);break;case'rain+':S.rain=Math.min(100,S.rain+3);break;case'rain-':S.rain=Math.max(0,S.rain-3);break}
 sync()}
const KEYS=[['STBY/TX','tx'],['MODE','mode'],['RANGE ▼','rd'],['RANGE ▲','ru'],['ACQ','acq'],['CANCEL','can'],['ALARM ACK','ack'],['MENU','menu'],['AIS','ais'],['PI','pi'],['VECT','vect'],['EBL/VRM','ev']];
$('#k1').innerHTML=KEYS.map(k=>`<button class="kk" data-k="${k[1]}" type="button">${k[0]}</button>`).join('');
$('#ar').innerHTML=[['','' ],['▲','up'],['',''],['◄','left'],['ENT','ent'],['►','right'],['',''],['▼','down'],['','']].map(k=>k[1]?`<button class="kk" data-k="${k[1]}" type="button">${k[0]}</button>`:'<i></i>').join('');
document.querySelectorAll('.kk').forEach(b=>b.onpointerdown=e=>{e.preventDefault();b.classList.add('dn');press(b.dataset.k);const k=b.dataset.k;let t=0;if(/^(up|down|left|right)$/.test(k)){t=setInterval(()=>press(k),90)}const u=()=>{b.classList.remove('dn');clearInterval(t);removeEventListener('pointerup',u)};addEventListener('pointerup',u)});
const KN=[['GAIN','gain',100],['A/C SEA','sea',100],['A/C RAIN','rain',100],['BRILL','bri',100],['EBL','ebl',360],['VRM','vrm',0]];
$('#knobs').innerHTML=KN.map(k=>`<div class="kn" data-k="${k[1]}"><div class="kb"><i></i></div><span>${k[0]}</span><output></output></div>`).join('');
function adj(k,dl){if(k=='ebl'){S.ebl=(S.ebl+dl*.6+360)%360;S.eblOn=true}else if(k=='vrm'){S.vrm=Math.max(0,Math.min(RG[S.ri],S.vrm+dl*RG[S.ri]/120));S.vrmOn=true}else S[k]=Math.max(k=='bri'?15:0,Math.min(100,S[k]+dl));sync()}
document.querySelectorAll('.kn').forEach(n=>{const k=n.dataset.k,kb=n.querySelector('.kb');let g=null;kb.onpointerdown=e=>{kb.setPointerCapture(e.pointerId);g={x:e.clientX,y:e.clientY}};kb.onpointermove=e=>{if(!g)return;adj(k,(e.clientX-g.x-(e.clientY-g.y))*.6);g={x:e.clientX,y:e.clientY}};kb.onpointerup=kb.onpointercancel=()=>g=null;n.addEventListener('wheel',e=>{e.preventDefault();adj(k,-Math.sign(e.deltaY)*3)},{passive:false})});
/* Tastatur */
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey)return;const k=e.key,sh=e.shiftKey;
 const m={'+':'ru','=':'ru','-':'rd','_':'rd',PageUp:'ru',PageDown:'rd',m:'mode',M:'mode',a:'ais',A:'ais',p:'pi',P:'pi',v:'vect',V:'vect',e:'ev',E:'ev',h:'tx',H:'tx',' ':'ack',Enter:'ent',Delete:'can',Backspace:'can',Tab:'tab',Escape:'esc','[':'pib-',']':'pib+',ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',g:'gain+',G:'gain-',s:'sea+',S:'sea-',r:'rain+',R:'rain-',Menu:'menu',F10:'menu'}[k];
 if(!m)return;e.preventDefault();press(m)});
/* Zeiger: Cursor und Zielwahl (Maus oder Finger) */
const cp=e=>{const r=cv.getBoundingClientRect(),f=cv.width/r.width;return{x:(e.clientX-r.left)*f,y:(e.clientY-r.top)*f}};
cv.addEventListener('pointermove',e=>{S.cur=cp(e)});cv.addEventListener('pointerleave',e=>{if(e.pointerType=='mouse')S.cur=null});
cv.addEventListener('pointerup',e=>{S.cur=cp(e);const rt=rot();let b=null,bd=26*dpr;for(const t of T){if(t.k=='ship'?!S.fs:!S.fb)continue;const o=pos(t.x,t.y,rt),d=Math.hypot(o.x-S.cur.x,o.y-S.cur.y);if(o.r<=RG[S.ri]*1.02&&d<bd){bd=d;b=t}}
 if(b){S.sel=b.id;acquire(b)}else{S.sel=null;const dx=S.cur.x-c,dy=c-S.cur.y;if(e.shiftKey){S.ebl=(Math.atan2(dx,dy)/rad+rot()+360)%360;S.vrm=Math.min(RG[S.ri],Math.hypot(dx,dy)/K());S.eblOn=S.vrmOn=true}}sync()});
/* Einstellleiste oben */
const bind=(id,fn,ev)=>{const e=$(id);e.addEventListener(ev||'input',()=>{fn(e);sync()})};
bind('#nS',e=>{S.nS=+e.value;gen()});bind('#nB',e=>{S.nB=+e.value;gen()});$('#roll').onclick=()=>{gen();sync()};
bind('#cS',e=>S.fs=e.checked,'change');bind('#cB',e=>S.fb=e.checked,'change');bind('#cL',e=>S.fl=e.checked,'change');bind('#cA',e=>S.ais=e.checked,'change');bind('#aL',e=>S.al=e.value,'change');bind('#cP',e=>S.pi=e.checked,'change');
bind('#oC',e=>S.set=+e.value);bind('#oV',e=>S.sog=+e.value);bind('#ts',e=>S.ts=+e.value,'change');
const nv=(i,x)=>{const e=$(i);if(e&&document.activeElement!==e&&e.value!=x)e.value=x};
const cl=(v,a,b)=>Math.max(a,Math.min(b,Math.round(+v||0)));
bind('#vS',e=>{S.nS=cl(e.value,0,25);gen()},'change');bind('#vB',e=>{S.nB=cl(e.value,0,25);gen()},'change');bind('#vC',e=>S.set=cl(e.value,0,359),'change');bind('#vV',e=>S.sog=cl(e.value,0,30),'change');
function sync(){const v=(i,x)=>{const e=$(i);if(e&&e.value!=x)e.value=x},ck=(i,x)=>{const e=$(i);if(e)e.checked=!!x};
 v('#nS',S.nS);v('#nB',S.nB);nv('#vS',S.nS);nv('#vB',S.nB);ck('#cS',S.fs);ck('#cB',S.fb);ck('#cL',S.fl);ck('#cA',S.ais);v('#aL',S.al);ck('#cP',S.pi);v('#oC',S.set);v('#oV',S.sog);nv('#vC',Math.round(S.set));nv('#vV',Math.round(S.sog));
 const on={tx:S.tx,mode:1,ais:S.ais,pi:S.pi,vect:S.vect,ev:S.eblOn&&S.vrmOn,menu:S.menu};document.querySelectorAll('.kk').forEach(b=>b.classList.toggle('ac',!!on[b.dataset.k]));
 document.querySelectorAll('.kn').forEach(n=>{const k=n.dataset.k,val=S[k],o=n.querySelector('output');n.querySelector('.kb').style.transform=`rotate(${k=='ebl'?val:k=='vrm'?val/RG[S.ri]*270-135:val*2.7-135}deg)`;o.textContent=k=='ebl'?p3(val)+'°':k=='vrm'?val.toFixed(2)+' NM':Math.round(val)})}
new ResizeObserver(resize).observe(cv);resize();gen();sync();
let last=performance.now();(function f(n){const dt=Math.min(.1,(n-last)/1000);last=n;sim(dt);draw(dt);requestAnimationFrame(f)})(last);
setInterval(side,200);side();setInterval(sync,500);
window.RADAR={S,gen,press};
})();
