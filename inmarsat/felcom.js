(()=>{
const D=SimData,F=Furuno,P2=n=>String(n).padStart(2,'0');
const S={on:1,mode:'home',boot:1,msgs:[],cur:0,li:0,mi:0,gi:0,ri:0,page:0,pos:0,reg:0,ser:D.I(1200,1800),log:[],over:null,test:0,
 egc:{NAV:1,MET:1,FCST:1,SAR:1,PIR:1}};
const EG=[['NAV','NAV WARNINGS (NAVAREA)'],['MET','MET WARNINGS'],['FCST','MET FORECASTS'],['SAR','SAR / DISTRESS RELAY','L'],['PIR','PIRACY / ASAM']];
const REG=['AOR-E','AOR-W','POR','IOR'],MENU=['INBOX (EGC)','EGC SETUP','TERMINAL STATUS','LOG','SELF TEST','OCEAN REGION'],MODES=['inbox','egc','status','log','test','region'];
const W=()=>dev.cols(),LP=8,pad=(s,n)=>String(s).padEnd(n),pos=()=>D.positions[S.pos];
const hd=(a,b)=>`<div class="hd"><span>${a}</span><span>${b}</span></div>`;
const sk=a=>`<div class="sk">${a.map(x=>`<span>${x||'&nbsp;'}</span>`).join('')}</div>`;
const clock=()=>{const d=new Date();return `${P2(d.getUTCDate())}/${P2(d.getUTCMonth()+1)} ${P2(d.getUTCHours())}:${P2(d.getUTCMinutes())} UTC`};
const prc=p=>p=='DISTRESS'||p=='URGENCY'?'al':p=='SAFETY'?'wn':'';
const dev=F.mount(document.getElementById('dev'),{img:'/pic/inmarsat/furuno-felcom15.png',alt:'Furuno FELCOM 15 Inmarsat-C',w:1536,h:1024,screen:[311,183,840,550],
 keys:{F1:[186,232,76,50],F2:[186,302,76,50],F3:[186,373,76,50],F4:[186,444,76,50],F5:[186,514,76,50],F6:[186,585,76,50],UP:[1324,175,44,44],DOWN:[1324,305,44,44],LEFT:[1257,240,44,44],RIGHT:[1391,240,44,44],ENT:[1324,240,70,70],
 '1':[1250,390,64,56],'2':[1323,390,64,56],'3':[1396,390,64,56],'4':[1250,464,64,56],'5':[1323,464,64,56],'6':[1396,464,64,56],'7':[1250,538,64,56],'8':[1323,538,64,56],'9':[1396,538,64,56],'*':[1250,612,64,56],'0':[1323,612,64,56],'#':[1396,612,64,56],
 CLR:[1265,693,90,56],BS:[1383,693,90,56],DISTRESS:[767,855,125,92],PRINT:[930,850,70,72],LOG:[1027,850,70,72],MENU:[1124,850,70,72],POWER:[1352,850,92,88]},
 leds:{alarm:[140,663,'red'],rx:[140,697,'grn']},onKey:key});
const add=e=>{const d=new Date();S.log.unshift(`${P2(d.getUTCDate())} ${P2(d.getUTCHours())}:${P2(d.getUTCMinutes())} ${e}`);S.log.length=Math.min(S.log.length,60)};
const unread=()=>S.msgs.filter(m=>!m.read).length;
function r(){let h='';const m=S.msgs[S.cur];
 if(!S.on){dev.render('');return}
 if(S.boot)h=`<div class="c big" style="margin-top:6cqh">FURUNO</div><div class="c">FELCOM 15 INMARSAT-C IC-215</div><div class="c dim">PROGRAM 0550234-01.00 (SIM)</div><div class="c ok" style="margin-top:3cqh">ROM OK  RAM OK  GNSS OK</div><div class="c ok">LOGIN ${REG[S.reg]} ... OK</div>`;
 else if(S.mode=='home')h=hd('INMARSAT-C',clock())+[
  `<span class="dim">OCEAN REGION </span>${REG[S.reg]}  <b class="ok">LOGGED IN</b>`,
  `<span class="dim">EGC          </span><b class="ok">RECEIVING</b>`,
  `<span class="dim">POSITION     </span>${D.fmt(pos().lat,pos().lon)} (GNSS)`,
  `<span class="dim">AREA         </span>${pos().n}`,
  `<span class="dim">SIGNAL       </span>${'#'.repeat(6+Math.floor(Math.random()*3)).padEnd(10,'.')}`,
  ``,`<span class="dim">EGC MESSAGES </span>${S.msgs.length}   <span class="dim">UNREAD </span>${unread()?`<b class="wn">${unread()}</b>`:0}`,
  m?`<span class="dim">LAST         </span>${F.esc(m.hdr.slice(0,34))}`:`<span class="dim">LAST         </span>-`].map(x=>`<div>${x}</div>`).join('')+sk(['INBOX','EGC','STATUS','LOG','TEST','REGION'])
 else if(S.mode=='inbox'){const st=Math.max(0,Math.min(S.li-3,S.msgs.length-LP));
  h=hd('EGC INBOX',S.msgs.length+' MSG')+(S.msgs.length?S.msgs.slice(st,st+LP).map((x,i)=>{const j=st+i;return `<div class="${j==S.li?'sel':prc(x.prio)}">${x.read?' ':'*'}${P2(j+1)} ${pad(x.prio,8)} ${pad(x.cls,4)} ${x.hm} ${F.esc(x.hdr.slice(0,18))}</div>`}).join(''):'<div class="dim">NO MESSAGES</div>')+sk(['','','PRINT','DELETE','','BACK'])}
 else if(S.mode=='view'&&m){const L=F.wrap(`SAFETYNET  ${m.hdr}\nPRIORITY: ${m.prio}   NO. ${m.no}   ${m.hm} UTC\n${m.text}`,W()),pg=Math.ceil(L.length/LP);S.page=Math.min(S.page,pg-1);
  h=hd(`EGC ${S.cur+1}/${S.msgs.length}  <b class="${prc(m.prio)||'ok'}">${m.prio}</b>`,`PAGE ${S.page+1}/${pg}`)+L.slice(S.page*LP,S.page*LP+LP).map(x=>`<div>${F.esc(x)||' '}</div>`).join('')+sk(['PREV','NEXT','PRINT','DELETE','PAGE','BACK'])}
 else if(S.mode=='menu')h=hd('MAIN MENU',clock())+MENU.map((x,i)=>`<div class="${i==S.mi?'sel':''}">${i+1}. ${x}</div>`).join('')+sk(['','','','','','BACK'])
 else if(S.mode=='egc')h=hd('EGC SETUP','SAFETYNET')+EG.map((x,i)=>`<div class="${i==S.gi?'sel':''}">${S.egc[x[0]]?'[X]':'[ ]'} ${x[1]}${x[2]?'  (ALWAYS ON)':''}</div>`).join('')+`<div class="dim" style="margin-top:1cqh">AREA: ${pos().n} (AUTO)</div><div class="dim">DISTRESS / URGENCY CANNOT BE REJECTED</div>`+sk(['','','','','','BACK'])
 else if(S.mode=='status')h=hd('TERMINAL STATUS',clock())+[`TERMINAL      FELCOM 15 / IC-215`,`OCEAN REGION  ${REG[S.reg]}   LOGGED IN`,`POSITION      ${D.fmt(pos().lat,pos().lon)}`,`GNSS          3D FIX  HDOP 0.9`,`EGC RECEIVED  ${S.msgs.length}   UNREAD ${unread()}`,`PRINTER       READY`,`ALERT UNIT    ${S.alarm?'ACTIVE':'OK'}`].map(x=>`<div>${x}</div>`).join('')+sk(['','','','','','BACK'])
 else if(S.mode=='log')h=hd('LOG',S.log.length+' ENTRIES')+(S.log.slice(0,9).map(x=>`<div>${F.esc(x)}</div>`).join('')||'<div class="dim">EMPTY</div>')+sk(['','','','','','BACK'])
 else if(S.mode=='test'){const T=['ROM','RAM','LCD','KEYBOARD','GNSS RECEIVER','TRANSCEIVER','EGC RECEIVER','PRINTER'];h=hd('SELF TEST','')+T.slice(0,S.test).map(x=>`<div>${pad(x,16)}<b class="ok">OK</b></div>`).join('')+(S.test>=T.length?`<div class="ok" style="margin-top:2cqh">TEST COMPLETE</div>`:'')+sk(['','','','','','BACK'])}
 else if(S.mode=='region')h=hd('OCEAN REGION','')+REG.map((x,i)=>`<div class="${i==S.ri?'sel':''}">${i==S.reg?'*':' '} ${x}</div>`).join('')+sk(['','','','','','BACK'])
 if(S.over)h+=`<div class="ov ${S.over.red?'red':''}">${S.over.t}</div>`;
 dev.render(h)}
function open(i){S.cur=i;S.page=0;S.mode='view';const m=S.msgs[i];if(m){m.read=true;S.alarm=false;dev.led.alarm(0);add('READ '+m.hdr)}}
function note(t,ms=1500,red){S.over={t,red};setTimeout(()=>{if(S.over&&S.over.t==t){S.over=null;r()}},ms)}
function del(){S.msgs.splice(S.cur,1);S.cur=Math.max(0,Math.min(S.cur,S.msgs.length-1));S.li=S.cur;S.mode='inbox'}
function print(){const m=S.msgs[S.cur];if(m&&(S.mode=='view'||S.mode=='inbox')){note('PRINTING ...',2000);add('PRINT '+m.hdr)}}
function runTest(){S.test=0;S.mode='test';const t=setInterval(()=>{S.test++;r();if(S.test>=8)clearInterval(t)},450)}
function key(k){
 if(k=='POWER'){S.on=!S.on;dev.power(S.on);if(!S.on){dev.led.alarm(0);dev.led.rx(0)}else{S.boot=1;S.mode='home';setTimeout(()=>{S.boot=0;r()},2400)}return r()}
 if(!S.on||S.boot)return;
 if(S.over&&S.over.red){if(k=='CLR')S.over=null;return r()}
 const dn={UP:-1,DOWN:1}[k]||0,m=S.msgs[S.cur],md=S.mode;
 if(k=='DISTRESS'){S.over={t:'DISTRESS ALERT<br>SIMULATION - NOTHING IS TRANSMITTED<br>CLR: CANCEL',red:1};add('DISTRESS KEY (SIM)');F.beep(3,2400)}
 else if(k=='MENU'){S.mode=md=='menu'?'home':'menu';S.mi=0}
 else if(k=='LOG')S.mode='log';
 else if(k=='PRINT')print();
 else if(k=='CLR'){S.mode=md=='view'?'inbox':'home'}
 else if(md=='home'){const f={F1:'inbox',F2:'egc',F3:'status',F4:'log',F6:'region'}[k];if(f)S.mode=f;else if(k=='F5')runTest()}
 else if(md=='menu'){if(dn)S.mi=(S.mi+dn+6)%6;else if(k=='ENT'||/^[1-6]$/.test(k)){const i=k=='ENT'?S.mi:k-1;MODES[i]=='test'?runTest():S.mode=MODES[i]}else if(k=='F6')S.mode='home'}
 else if(md=='inbox'){if(dn)S.li=Math.max(0,Math.min(S.msgs.length-1,S.li+dn));else if(k=='ENT'&&S.msgs.length)open(S.li);else if(k=='F3'){S.cur=S.li;print()}else if(k=='F4'&&S.msgs.length){S.cur=S.li;del()}else if(k=='F6')S.mode='home'}
 else if(md=='view'){if(k=='F1'||k=='LEFT')open(Math.min(S.msgs.length-1,S.cur+1));else if(k=='F2'||k=='RIGHT')open(Math.max(0,S.cur-1));else if(k=='F3')print();else if(k=='F4')del();else if(k=='F5'||dn==1)S.page++;else if(dn==-1)S.page=Math.max(0,S.page-1);else if(k=='F6'||k=='ENT')S.mode='inbox'}
 else if(md=='egc'){if(dn)S.gi=(S.gi+dn+EG.length)%EG.length;else if(k=='ENT'){const e=EG[S.gi];if(e[2])note('ALWAYS ON');else S.egc[e[0]]=!S.egc[e[0]]}else if(k=='F6')S.mode='home'}
 else if(md=='region'){if(dn)S.ri=(S.ri+dn+4)%4;else if(k=='ENT'){S.reg=S.ri;add('OCEAN REGION '+REG[S.reg]);note('LOGIN '+REG[S.reg]+' ... OK')}else if(k=='F6')S.mode='home'}
 else if(k=='F6')S.mode='home';
 r()}
function receive(force){
 const pool=['NAV','NAV','MET','MET','FCST','PIR','SAR'].filter(c=>S.egc[c]||c=='SAR');
 const e=D.egc(D.R(pool)),d=new Date();Object.assign(e,{no:++S.ser,hm:`${P2(d.getUTCDate())} ${P2(d.getUTCHours())}:${P2(d.getUTCMinutes())}`,read:false});
 S.msgs.unshift(e);S.cur++;S.li++;add('EGC '+e.prio+' '+e.hdr);
 if(!S.on)return;dev.led.rx(1,1);setTimeout(()=>dev.led.rx(0),3500);
 if(e.prio=='DISTRESS'||e.prio=='URGENCY'){S.alarm=true;dev.led.alarm(1,1);F.beep(5,2200)}else F.beep(2,1500);r()}
const sel=document.getElementById('pos');D.positions.forEach((p,i)=>sel.add(new Option(p.n,i)));
sel.onchange=()=>{S.pos=+sel.value;r()};document.getElementById('test').onclick=()=>receive(true);
(function sched(){setTimeout(()=>{receive();sched()},D.I(15000,35000))})();
setTimeout(()=>receive(true),7000);setTimeout(()=>{S.boot=0;r()},2600);setInterval(()=>{if(S.on&&!S.boot&&['home','status'].includes(S.mode)&&!S.over)r()},1500);r();document.fonts&&document.fonts.ready.then(r);
})();
