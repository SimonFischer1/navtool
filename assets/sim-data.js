/* NavTool Simulatoren – gemeinsame Daten & Meldungs-Generatoren (alle Daten simuliert; B1-Kennungen frei gewählt) */
(function(){
const R=a=>a[Math.floor(Math.random()*a.length)],I=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),P=(n,l)=>String(n).padStart(l,'0');
const MON=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],DIR=['N','NE','E','SE','S','SW','W','NW'];
const stations=[
{id:'L',name:'Pinneberg',lat:53.65,lon:9.80,f:'518 kHz',range:280},
{id:'K',name:'Den Helder',lat:52.95,lon:4.80,f:'518 kHz',range:250},
{id:'T',name:'Oostende',lat:51.23,lon:2.92,f:'518 kHz',range:250},
{id:'E',name:'Niton',lat:50.58,lon:-1.30,f:'518 kHz',range:300},
{id:'C',name:'Cullercoats',lat:55.04,lon:-1.45,f:'518 kHz',range:280},
{id:'F',name:'Rogaland',lat:58.62,lon:5.60,f:'518 kHz',range:300},
{id:'R',name:'Skagen',lat:57.72,lon:10.59,f:'518 kHz',range:250},
{id:'M',name:'Torshavn',lat:62.01,lon:-6.77,f:'518 kHz',range:300}];
const positions=[
{n:'DEUTSCHE BUCHT',lat:54.0,lon:7.5,areas:['GERMAN BIGHT','HELGOLAND','EAST FRISIAN COAST'],rcc:'MRCC BREMEN'},
{n:'ENGLISH CHANNEL',lat:50.2,lon:0.5,areas:['DOVER STRAIT','WIGHT','PLYMOUTH'],rcc:'MRCC DOVER'},
{n:'SKAGERRAK',lat:57.6,lon:9.0,areas:['SKAGERRAK','KATTEGAT','JUTLAND WEST'],rcc:'MRCC AARHUS'},
{n:'NORTHERN NORTH SEA',lat:58.5,lon:2.0,areas:['VIKING','FORTIES','FAIR ISLE'],rcc:'MRCC STAVANGER'}];
const fmt=(lat,lon)=>{const a=Math.abs(lat),o=Math.abs(lon);return P(Math.floor(a),2)+'-'+P(Math.round((a%1)*60)%60,2)+(lat<0?'S':'N')+' '+P(Math.floor(o),3)+'-'+P(Math.round((o%1)*60)%60,2)+(lon<0?'W':'E')};
const dist=(a,b)=>{const r=Math.PI/180,x=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2;return 6880.13*Math.asin(Math.sqrt(x))};
const rp=(c,s=1.2)=>fmt(c.lat+(Math.random()-.5)*2*s,c.lon+(Math.random()-.5)*2*s*1.6);
const ts=()=>{const d=new Date();return P(d.getUTCDate(),2)+P(d.getUTCHours(),2)+P(d.getUTCMinutes(),2)+' UTC '+MON[d.getUTCMonth()]+' '+String(d.getUTCFullYear()).slice(2)};
const VES=['ANNA MARIE','NORDSTERN','SEA FALCON','LADY JANE','OCEAN PRIDE','HANSE TRADER'];
function nx(t,p){
 const area=R(p.areas),pos=rp(p),dir=R(DIR),hh=P(I(0,23),2),day=P(I(1,28),2)+' '+MON[new Date().getUTCMonth()],n=I(100,999),v=R(VES);
 const T={
 A:[`NAVAREA I WARNING ${n}. ${area}. LIGHT BUOY ${R(['TG 5','HELGOLAND 3','BORKUM 2','E3'])} UNLIT. NAVIGATE WITH CAUTION.`,
    `${area}. WRECK REPORTED IN POSITION ${pos}. DANGEROUS TO NAVIGATION. KEEP CLEAR 2 CABLES.`,
    `DRIFTING CONTAINER IN POSITION ${pos}. ALL VESSELS KEEP SHARP LOOKOUT.`,
    `GUNNERY EXERCISES WITHIN 5 NM OF ${pos} ON ${day} BETWEEN 0800 AND 1600 UTC. KEEP CLEAR.`,
    `CABLE LAYING IN PROGRESS NEAR ${pos}. CABLE SHIP RESTRICTED IN ABILITY TO MANOEUVRE. GIVE WIDE BERTH.`],
 B:[`GALE WARNING. ${area}. WIND ${dir} ${R(['7 TO 8','8 TO 9','9'])} BEAUFORT. SEA ROUGH TO VERY ROUGH. VALID ${hh}00 UTC.`,
    `STORM WARNING. ${area}. WIND ${dir} 10 BEAUFORT, GUSTS 11. WAVES UP TO 6 M. FROM ${hh}00 UTC.`,
    `FOG WARNING. ${area}. VISIBILITY LESS THAN 1 NM UNTIL ${hh}00 UTC.`,
    `THUNDERSTORM WARNING. ${area}. SQUALLS UP TO BEAUFORT 9 POSSIBLE.`],
 D:[`SAR. FISHING VESSEL ${v} REPORTED SINKING IN POSITION ${pos}. ALL SHIPS IN VICINITY KEEP SHARP LOOKOUT AND REPORT TO ${p.rcc}.`,
    `SAR. PERSON OVERBOARD FROM YACHT ${v}, POSITION ${pos}. VESSELS IN AREA REQUESTED TO ASSIST AND REPORT TO ${p.rcc}.`,
    `SAR. EPIRB ACTIVATION IN POSITION ${pos}. VESSELS NEARBY PLEASE ASSIST AND REPORT TO ${p.rcc}.`],
 E:[`WEATHER FORECAST ${area} VALID 24 HRS. WIND ${dir} ${I(3,6)} BEAUFORT. SEA SLIGHT TO MODERATE. VISIBILITY GOOD, OCCASIONALLY MODERATE IN RAIN.`,
    `FORECAST ${area}. WIND ${dir} ${I(4,7)} BEAUFORT BACKING ${R(DIR)} LATER. SEA MODERATE. SHOWERS.`]};
 T.L=T.A;return R(T[t]||T.A)}
const reg=[{n:'NAVAREA I',m:'METAREA I',lat:54,lon:5,a:'NORTH SEA'},{n:'NAVAREA II',m:'METAREA II',lat:46,lon:-6,a:'BAY OF BISCAY'},{n:'NAVAREA III',m:'METAREA III',lat:37,lon:5,a:'WESTERN MEDITERRANEAN'},{n:'NAVAREA IV',m:'METAREA IV',lat:38,lon:-65,a:'NORTH ATLANTIC'},{n:'NAVAREA VIII',m:'METAREA VIII',lat:12,lon:68,a:'ARABIAN SEA'}];
const pir=[{a:'GULF OF ADEN',lat:12.5,lon:47},{a:'SINGAPORE STRAIT',lat:1.2,lon:104},{a:'GULF OF GUINEA',lat:3.5,lon:2.5},{a:'SOMALI BASIN',lat:5,lon:55}];
function egc(cls){
 const g=R(reg),v=R(VES),n=I(100,999),pos=rp(g,2),hh=P(I(0,23),2);
 if(cls=='NAV')return{cls,prio:'SAFETY',hdr:g.n+' WARNING '+n,text:R([`${g.a}. LIGHT BUOY IN POSITION ${pos} UNLIT. NAVIGATE WITH CAUTION.`,`${g.a}. DRIFTING CONTAINER IN POSITION ${pos}. KEEP SHARP LOOKOUT.`,`${g.a}. SUBMARINE CABLE OPERATIONS NEAR ${pos}. GIVE WIDE BERTH.`])};
 if(cls=='MET'){const s=Math.random()<.5;return{cls,prio:s?'URGENCY':'SAFETY',hdr:g.m+' WEATHER WARNING',text:`${g.a}. ${s?'STORM':'GALE'} WARNING. WIND ${R(DIR)} ${s?'10 TO 11':'8 TO 9'} BEAUFORT. SEAS UP TO ${s?8:5} M. VALID FROM ${hh}00 UTC.`}}
 if(cls=='FCST')return{cls,prio:'ROUTINE',hdr:g.m+' FORECAST',text:`${g.a}. 24 HR FORECAST. WIND ${R(DIR)} ${I(3,6)} BEAUFORT. SEA MODERATE. VISIBILITY GOOD.`};
 if(cls=='PIR'){const q=R(pir),pp=rp(q,1);return{cls,prio:'URGENCY',hdr:'ANTI-SHIPPING ACTIVITY (PIRACY)',text:`${q.a}. PIRACY ATTACK REPORTED IN POSITION ${pp}. ARMED PERSONS IN SMALL BOAT APPROACHED A BULK CARRIER. ATTACKERS ABORTED. ALL SHIPS IN AREA MAINTAIN HEIGHTENED VIGILANCE AND REPORT SUSPICIOUS ACTIVITY.`}}
 const d=Math.random()<.4;return{cls:'SAR',prio:d?'DISTRESS':'URGENCY',hdr:d?'DISTRESS ALERT RELAY':'SAR COORDINATION',text:d?`MAYDAY RELAY. VESSEL ${v} REPORTS FIRE ON BOARD IN POSITION ${pos}. 14 PERSONS. ALL SHIPS IN VICINITY PROCEED TO ASSIST AND REPORT TO MRCC.`:`SAR. ${v} REPORTED MISSING SINCE ${hh}00 UTC. LAST KNOWN POSITION ${pos}. SHIPS IN AREA KEEP LOOKOUT AND REPORT TO MRCC.`}}
window.SimData={stations,positions,fmt,dist,ts,nx,egc,R,I,P};
})();
