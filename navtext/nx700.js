(()=>{
const D=SimData,F=Furuno,P2=n=>String(n).padStart(2,'0');
const S={mode:'msg',cur:0,page:0,li:0,mi:0,si:0,ti:0,pos:0,dim:3,msgs:[],sel:new Set(['L','K','T']),types:new Set(['A','B','D','E','L']),ser:{},over:null,boot:1};
const TY=[['A','NAV WARNING',1],['B','MET WARNING',1],['C','ICE REPORT'],['D','SAR / PIRACY',1],['E','MET FORECAST'],['F','PILOT SERVICE'],['G','AIS'],['J','SATNAV'],['K','OTHER NAVAID'],['L','NAV WARNING 2',1]];
const MENU=['MESSAGE DISPLAY','MESSAGE LIST','STATION SELECT','MESSAGE TYPE SELECT','COVERAGE AREA','RECEIVER STATUS'],MODES=['msg','list','stations','types','cov','stat'];
const W=()=>dev.cols(),LP=9,pos=()=>D.positions[S.pos],inr=s=>D.dist(pos(),s)<=s.range;
const hd=(a,b)=>`<div class="hd"><span>${a}</span><span>${b}</span></div>`,ft=t=>`<div class="ft">${t}</div>`;
const clock=()=>{const d=new Date();return `${P2(d.getUTCDate())}/${P2(d.getUTCMonth()+1)} ${P2(d.getUTCHours())}:${P2(d.getUTCMinutes())}:${P2(d.getUTCSeconds())} UTC`};
const dev=F.mount(document.getElementById('dev'),{img:'/pic/navtext/furuno-nx700.png',alt:'Furuno NAVTEX NX-700',w:1536,h:1024,screen:[261,210,894,481],
 keys:{FUNC:[143,362,100,58],MODE:[143,449,100,58],PRINT:[143,536,100,58],DIM:[143,623,100,58],UP:[1363,196,44,44],DOWN:[1363,324,44,44],LEFT:[1301,260,44,44],RIGHT:[1425,260,44,44],ENT:[1363,260,70,70],
 '1':[1288,404,64,58],'2':[1362,404,64,58],'3':[1437,404,64,58],'4':[1288,483,64,58],'5':[1362,483,64,58],'6':[1437,483,64,58],'7':[1288,561,64,58],'8':[1362,561,64,58],'9':[1437,561,64,58],'*':[1288,640,64,58],'0':[1362,640,64,58],'#':[1437,640,64,58],
 DISTRESS:[807,823,125,92],MENU:[950,823,76,86],PAGE:[1051,823,76,86],ACK:[1152,823,76,86],KNOB:[1361,818,100,100]},
 leds:{alarm:[104,274,'red']},onKey:key});
function r(){let h='';const m=S.msgs[S.cur];
 if(S.boot)h=`<div class="c big" style="margin-top:8cqh">FURUNO</div><div class="c">NAVTEX RECEIVER NX-700</div><div class="c dim">PROGRAM 0550123-01.00 (SIM)</div><div class="c ok" style="margin-top:4cqh">SELF TEST ... OK</div>`;
 else if(S.mode=='msg'){
  if(!m)h=hd('MESSAGE DISPLAY',clock())+`<div class="c dim" style="margin-top:18cqh">NO MESSAGES</div>`+ft('MENU');
  else{const L=F.wrap(m.raw,W()),pg=Math.ceil(L.length/LP);S.page=Math.min(S.page,pg-1);
   h=hd(`MSG ${S.cur+1}/${S.msgs.length}  ${m.id}${m.read?'':'  <b class="wn">NEW</b>'}${m.prt?'  PRT':''}`,`PAGE ${S.page+1}/${pg}`)+L.slice(S.page*LP,S.page*LP+LP).map(x=>`<div>${F.esc(x)||' '}</div>`).join('')+ft('&lt;/&gt;:MSG PAGE ACK PRINT MENU')}}
 else if(S.mode=='list'){const st=Math.max(0,Math.min(S.li-4,S.msgs.length-LP));
  h=hd('MESSAGE LIST',S.msgs.length+' MSG')+(S.msgs.length?S.msgs.slice(st,st+LP).map((x,i)=>{const j=st+i;return `<div class="${j==S.li?'sel':''}">${x.read?' ':'*'}${P2(j+1)} ${x.id} ${x.hm} ${F.esc(x.text.slice(0,30))}</div>`}).join(''):'<div class="dim">EMPTY</div>')+ft('UP/DOWN  ENT:READ  MENU')}
 else if(S.mode=='menu')h=hd('MAIN MENU',clock())+MENU.map((x,i)=>`<div class="${i==S.mi?'sel':''}">${i+1}. ${x}</div>`).join('')+ft('UP/DOWN  ENT  1-6')
 else if(S.mode=='stations')h=hd('STATION SELECT','B1 NAME      FREQ    RX')+D.stations.map((s,i)=>`<div class="${i==S.si?'sel':''}">${S.sel.has(s.id)?'[X]':'[ ]'} ${s.id}  ${s.name.padEnd(12)}${s.f}  ${inr(s)?'IN RANGE':'OUT'}</div>`).join('')+ft('ENT:ON/OFF  MENU:BACK')
 else if(S.mode=='types')h=hd('MESSAGE TYPE SELECT','B2')+TY.map((t,i)=>`<div class="${i==S.ti?'sel':''}">${S.types.has(t[0])?'[X]':'[ ]'} ${t[0]}  ${t[1].padEnd(16)}${t[2]?'LOCKED':''}</div>`).join('')+ft('ENT:ON/OFF  MENU:BACK')
 else if(S.mode=='cov'){const p=pos(),k=.22,cs=Math.cos(p.lat*Math.PI/180);
  const sv=`<svg viewBox="-230 -92 460 184" preserveAspectRatio="xMidYMid meet" style="flex:1;min-height:0;width:100%;font-family:inherit"><g fill="none" stroke="#2a5a7a" stroke-dasharray="3 3">${[100,200,300].map(n=>`<circle r="${n*k}"/>`).join('')}</g>`+
  D.stations.map(s=>{const x=(s.lon-p.lon)*cs*60*k,y=-(s.lat-p.lat)*60*k,on=S.sel.has(s.id);return `<circle cx="${x}" cy="${y}" r="${s.range*k}" fill="${on?'rgba(93,255,160,.12)':'none'}" stroke="${on?'#5dffa0':'#4b7894'}"/><circle cx="${x}" cy="${y}" r="2.5" fill="#fff"/><text x="${x+5}" y="${y-4}" fill="#ffd24a" font-size="12">${s.id}</text>`}).join('')+`<path d="M0-7L5 5H-5Z" fill="#ff6b5e"/></svg>`;
  h=hd('COVERAGE AREA','RINGS 100/200/300 NM')+sv+ft(`OWN ${D.fmt(p.lat,p.lon)}  ${p.n}`)}
 else if(S.mode=='stat'){const n=[...S.sel].filter(id=>inr(D.stations.find(s=>s.id==id))).length;
  h=hd('RECEIVER STATUS',clock())+[`RX FREQUENCY     518 kHz / 490 kHz`,`STATIONS SELECTED ${S.sel.size}   IN RANGE ${n}`,`MESSAGES STORED   ${S.msgs.length}   UNREAD ${S.msgs.filter(x=>!x.read).length}`,`SIGNAL            ${'#'.repeat(n?3+Math.floor(Math.random()*4):0).padEnd(8,'.')}`,`POSITION          ${D.fmt(pos().lat,pos().lon)}`,`AREA              ${pos().n}`,`PRINTER           READY`,`BRIGHTNESS        ${S.dim+1}/4`].map(x=>`<div>${x}</div>`).join('')+ft('MENU:BACK')}
 if(S.over)h+=`<div class="ov">${S.over.t}</div>`;
 dev.render(h)}
function ack(){S.alarm=false;dev.led.alarm(0);const m=S.msgs[S.cur];if(m)m.read=true}
function note(t,ms=1500){S.over={t};setTimeout(()=>{if(S.over&&S.over.t==t){S.over=null;r()}},ms)}
function key(k){
 if(S.boot)return;
 if(S.over&&S.over.del){if(k=='ENT'){S.msgs.splice(S.cur,1);S.cur=Math.max(0,Math.min(S.cur,S.msgs.length-1));S.over=null}else if(k=='MENU'||k=='ACK')S.over=null;return r()}
 const m=S.msgs[S.cur],dn={UP:-1,DOWN:1}[k]||0,lr={LEFT:1,RIGHT:-1}[k]||0;
 if(k=='MENU'){S.mode=S.mode=='menu'?'msg':'menu';S.mi=0}
 else if(k=='MODE')S.mode={msg:'list',list:'cov',cov:'msg'}[S.mode]||'msg';
 else if(k=='ACK')ack();
 else if(k=='DIM'||k=='KNOB'){S.dim=(S.dim+1)%4;dev.setDim(S.dim);note('BRIGHTNESS '+(S.dim+1)+'/4',900)}
 else if(k=='PRINT'){if(m){m.prt=1;note('PRINTING ...<br>'+m.id,2200)}}
 else if(k=='FUNC'){if(m&&S.mode=='msg')S.over={t:'DELETE MESSAGE '+m.id+'?<br>ENT:YES  MENU:NO',del:1}}
 else if(k=='PAGE'){if(m){m.read=true;const pg=Math.ceil(F.wrap(m.raw,W()).length/LP);S.page=(S.page+1)%pg}}
 else if(k=='DISTRESS')note('NAVTEX HAS NO DISTRESS FUNCTION<br>(SIMULATION)',1800);
 else if(S.mode=='msg'){if(lr&&S.msgs.length){S.cur=Math.max(0,Math.min(S.msgs.length-1,S.cur+lr));S.page=0;if(m)m.read=true}else if(dn){S.page=Math.max(0,S.page+dn)}else if(k=='ENT'){S.mode='list';S.li=S.cur}}
 else if(S.mode=='list'){if(dn)S.li=Math.max(0,Math.min(S.msgs.length-1,S.li+dn));else if(k=='ENT'&&S.msgs.length){S.cur=S.li;S.page=0;S.mode='msg'}}
 else if(S.mode=='menu'){if(dn)S.mi=(S.mi+dn+6)%6;else if(k=='ENT')S.mode=MODES[S.mi];else if(/^[1-6]$/.test(k))S.mode=MODES[k-1]}
 else if(S.mode=='stations'){if(dn)S.si=(S.si+dn+D.stations.length)%D.stations.length;else if(k=='ENT'){const id=D.stations[S.si].id;S.sel.has(id)?S.sel.delete(id):S.sel.add(id)}}
 else if(S.mode=='types'){if(dn)S.ti=(S.ti+dn+TY.length)%TY.length;else if(k=='ENT'){const t=TY[S.ti];if(t[2])note('THIS TYPE CANNOT BE REJECTED');else S.types.has(t[0])?S.types.delete(t[0]):S.types.add(t[0])}}
 r()}
function receive(force){
 const c=D.stations.filter(s=>S.sel.has(s.id)&&(force||inr(s)));if(!c.length)return;
 const s=D.R(c),pool=['A','A','A','B','B','D','E','E','L'].filter(t=>S.types.has(t)),t=D.R(pool.length?pool:['A']);
 S.ser[s.id]=((S.ser[s.id]||D.I(0,60))+1)%100;const id=s.id+t+P2(S.ser[s.id]),text=D.nx(t,pos()),d=new Date();
 S.msgs.unshift({id,t,text,hm:`${P2(d.getUTCDate())} ${P2(d.getUTCHours())}:${P2(d.getUTCMinutes())}`,raw:`ZCZC ${id}\n${D.ts()}\n${text}\nNNNN`,read:false});
 if(S.mode=='msg'){S.cur=0;S.page=0}else{S.cur++;S.li++}
 if('ABD'.includes(t)){S.alarm=true;dev.led.alarm(1,1);F.beep(4,1800)}else F.beep(1,1300);r()}
const sel=document.getElementById('pos');D.positions.forEach((p,i)=>sel.add(new Option(p.n,i)));
sel.onchange=()=>{S.pos=+sel.value;r()};document.getElementById('test').onclick=()=>receive(true);
(function sched(){setTimeout(()=>{receive();sched()},D.I(20000,40000))})();
setTimeout(()=>receive(true),6500);setTimeout(()=>{S.boot=0;r()},2200);setInterval(()=>{if(!S.boot&&['msg','list','stat','menu'].includes(S.mode)&&!S.over)r()},1000);r();document.fonts&&document.fonts.ready.then(r);
})();
