// assets/stations.js
// Demo station areas for navtext (invented demo data)
// - Many demo stations added across a simplified North Atlantic / NW Europe map
// - Language toggle (en/de), storm warnings, and a 'Start Demo' automated showcase

const stations = [
  { id: 'UK_SOUTH', center:{x:0.27,y:0.65}, radius:0.12, name:{en:'United Kingdom (South)',de:'Vereinigtes Königreich (Süd)'}, messages:{en:'Routine Navtex area for southern UK coasts.',de:'Regulärer Navtex-Bereich für südliche britische Küsten.'}, stormWarning:false },
  { id: 'UK_NORTH', center:{x:0.38,y:0.27}, radius:0.08, name:{en:'United Kingdom (North)',de:'Vereinigtes Königreich (Nord)'}, messages:{en:'Covers northern approaches and shipping lanes.',de:'Deckt nördliche Anfahrten und Schifffahrtsrouten ab.'}, stormWarning:false },
  { id: 'ICELAND', center:{x:0.22,y:0.16}, radius:0.10, name:{en:'Iceland Navtex',de:'Island Navtex'}, messages:{en:'Iceland coastal and offshore alerts.',de:'Island Küsten- und Offshore-Warnungen.'}, stormWarning:false },
  { id: 'ICELAND_N', center:{x:0.18,y:0.10}, radius:0.06, name:{en:'Iceland North',de:'Island Nord'}, messages:{en:'Northern island waters; cold weather warnings common.',de:'Nördliche Inselgewässer; häufig Kältewarnungen.'}, stormWarning:false },
  { id: 'IRELAND', center:{x:0.18,y:0.52}, radius:0.10, name:{en:'Ireland Navtex',de:'Irland Navtex'}, messages:{en:'Covers Irish coastal zones and nearby offshore areas.',de:'Deckt irische Küstenzonen und nahegelegene Offshore-Gebiete.'}, stormWarning:false },
  { id: 'FR_ATL', center:{x:0.38,y:0.58}, radius:0.09, name:{en:'France Atlantic',de:'Frankreich Atlantik'}, messages:{en:'Atlantic coastline and fisheries alerts.',de:'Atlantikküste und Fischereiwarnungen.'}, stormWarning:false },
  { id: 'NETHERLANDS', center:{x:0.47,y:0.40}, radius:0.07, name:{en:'Netherlands Navtex',de:'Niederlande Navtex'}, messages:{en:'Coastal North Sea broadcasts.',de:'Küsten-Nordsee-Sendungen.'}, stormWarning:false },
  { id: 'BALTIC', center:{x:0.64,y:0.47}, radius:0.08, name:{en:'Baltic Area',de:'Ostsee-Bereich'}, messages:{en:'Covers southern Nordic and Baltic approaches.',de:'Deckt südliche nordische und Ostsee-Anfahrten ab.'}, stormWarning:false },
  { id: 'NOR_NORTH', center:{x:0.62,y:0.14}, radius:0.12, name:{en:'Norway (North)',de:'Norwegen (Nord)'}, messages:{en:'Arctic approaches; frequent weather hazards.',de:'Arktische Anfahrten; häufig Wettergefahren.'}, stormWarning:true },
  { id: 'NOR_SOUTH', center:{x:0.82,y:0.55}, radius:0.10, name:{en:'Norway (South)',de:'Norwegen (Süd)'}, messages:{en:'Southern Norwegian coastal waters.',de:'Südliche norwegische Küstengewässer.'}, stormWarning:false },
  { id: 'SPAIN_N', center:{x:0.10,y:0.70}, radius:0.09, name:{en:'Spain (North)',de:'Spanien (Norden)'}, messages:{en:'Bay of Biscay coverage (demo).',de:'Biskaya-Abdeckung (Demo).'}, stormWarning:false }
];

let lang = 'en';
let showStorms = false;
let demoRunning = false;
let demoTimer = null;

const mapImg = document.getElementById('map-img');
const overlay = document.getElementById('overlay');
const infoContent = document.getElementById('info-content');
const titleEl = document.getElementById('title');
const infoTitle = document.getElementById('info-title');
const warningBanner = document.getElementById('warning-banner');
const btnDemo = document.getElementById('btn-demo');

function resizeCanvas(){
  const rect = mapImg.getBoundingClientRect();
  overlay.width = rect.width;
  overlay.height = rect.height;
  overlay.style.left = `${rect.left + window.scrollX}px`;
  overlay.style.top = `${rect.top + window.scrollY}px`;
  draw();
}

function draw(){
  if(!mapImg.complete) return;
  const ctx = overlay.getContext('2d');
  ctx.clearRect(0,0,overlay.width, overlay.height);
  const size = Math.min(overlay.width, overlay.height);

  stations.forEach(s => {
    const cx = s.center.x * overlay.width;
    const cy = s.center.y * overlay.height;
    const r = s.radius * size;

    // fill
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(43,124,255,0.06)';
    ctx.fill();

    // stroke
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(43,124,255,0.6)';
    ctx.stroke();

    // label
    ctx.font = '600 12px system-ui,Arial';
    ctx.fillStyle = '#0b2b4a';
    ctx.textAlign = 'center';
    // draw a short label above the circle
    ctx.fillText(s.name[lang], cx, cy - r - 8);

    // storm highlight
    if(showStorms && s.stormWarning){
      ctx.beginPath();
      ctx.arc(cx, cy, r+10, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(217,83,79,0.95)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // small storm icon (triangle) center
      ctx.beginPath();
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx - 6, cy + 6);
      ctx.lineTo(cx + 6, cy + 6);
      ctx.closePath();
      ctx.fillStyle = '#d9534f';
      ctx.fill();
    }
  });
}

function hitTest(x,y){
  const size = Math.min(overlay.width, overlay.height);
  return stations.find(s => {
    const cx = s.center.x * overlay.width;
    const cy = s.center.y * overlay.height;
    const r = s.radius * size;
    const dx = x - cx;
    const dy = y - cy;
    return dx*dx + dy*dy <= r*r;
  });
}

overlay.addEventListener('click', (ev)=>{
  const rect = overlay.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;
  const s = hitTest(x,y);
  if(s){
    showStationInfo(s);
  }
});

function showStationInfo(s){
  const html = `
    <div class="station-label">${s.name[lang]}</div>
    <div class="station-id">${s.id}</div>
    <div class="station-msg">${s.messages[lang]}</div>
    <div class="station-storm">${s.stormWarning ? (lang==='en'? '<strong>Storm warning active</strong>' : '<strong>Sturmwarnung aktiv</strong>') : (lang==='en'? 'No active storm warning' : 'Keine aktive Sturmwarnung')}</div>
  `;
  infoContent.innerHTML = html;
}

// language toggles
document.getElementById('btn-en').addEventListener('click', ()=>{ setLang('en'); });
document.getElementById('btn-de').addEventListener('click', ()=>{ setLang('de'); });

function setLang(l){
  lang = l;
  document.getElementById('btn-en').classList.toggle('active', l==='en');
  document.getElementById('btn-de').classList.toggle('active', l==='de');

  // update UI strings
  titleEl.textContent = (lang==='en') ? 'Navtext — Stations (Demo)' : 'Navtext — Stationen (Demo)';
  infoTitle.textContent = (lang==='en') ? 'Station info' : 'Stations-Information';
  document.getElementById('btn-storm').textContent = showStorms ? ((lang==='en')? 'Hide Storm Warnings' : 'Sturmwarnungen verbergen') : ((lang==='en')? 'Show Storm Warnings' : 'Sturmwarnungen anzeigen');
  btnDemo.textContent = demoRunning ? ((lang==='en') ? 'Stop Demo' : 'Demo stoppen') : ((lang==='en') ? 'Start Demo' : 'Demo starten');
  draw();
}

// storm toggle
const btnStorm = document.getElementById('btn-storm');
btnStorm.addEventListener('click', ()=>{
  showStorms = !showStorms;
  btnStorm.textContent = showStorms ? ((lang==='en')? 'Hide Storm Warnings' : 'Sturmwarnungen verbergen') : ((lang==='en')? 'Show Storm Warnings' : 'Sturmwarnungen anzeigen');
  updateWarnings();
  draw();
});

function updateWarnings(){
  const anyStorm = stations.some(s => s.stormWarning);
  if(showStorms && anyStorm){
    warningBanner.classList.remove('hidden');
    warningBanner.textContent = (lang==='en') ? 'Warning: Active storm warnings in some Navtex areas — exercise caution!' : 'Achtung: In einigen Navtex-Bereichen gibt es aktive Sturmwarnungen — Vorsicht!';
    overlay.classList.add('pulse');
  } else {
    warningBanner.classList.add('hidden');
    warningBanner.textContent = '';
    overlay.classList.remove('pulse');
  }
}

// Demo automation: cycles language, toggles storms and randomly assigns warnings
function randomizeStorms(){
  stations.forEach(s => {
    // give coastal northern stations higher chance
    const base = (s.id.includes('NOR')||s.id.includes('ICELAND')) ? 0.35 : 0.12;
    s.stormWarning = Math.random() < base;
  });
}

function startDemo(){
  if(demoRunning) return stopDemo();
  demoRunning = true;
  btnDemo.textContent = (lang==='en') ? 'Stop Demo' : 'Demo stoppen';
  // every 2s: randomize storms and toggle language occasionally
  demoTimer = setInterval(()=>{
    randomizeStorms();
    // toggle showStorms to highlight
    showStorms = !showStorms;
    document.getElementById('btn-storm').textContent = showStorms ? ((lang==='en')? 'Hide Storm Warnings' : 'Sturmwarnungen verbergen') : ((lang==='en')? 'Show Storm Warnings' : 'Sturmwarnungen anzeigen');
    // occasionally switch language
    if(Math.random() < 0.25){
      setLang((lang==='en')?'de':'en');
    }
    updateWarnings();
    draw();
  }, 2000);
}

function stopDemo(){
  demoRunning = false;
  btnDemo.textContent = (lang==='en') ? 'Start Demo' : 'Demo starten';
  if(demoTimer){ clearInterval(demoTimer); demoTimer = null; }
  // restore no random storm except the predefined ones
  stations.forEach(s => { if(s.id==='NOR_NORTH') s.stormWarning = true; else s.stormWarning = false; });
  showStorms = false;
  updateWarnings();
  draw();
}

btnDemo.addEventListener('click', ()=>{ if(demoRunning) stopDemo(); else startDemo(); });

// image load and resize handling
mapImg.addEventListener('load', ()=>{ resizeCanvas(); });
window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', resizeCanvas);

// initial language and state
setLang('en');
// preset: Norway north has a demo storm
stations.forEach(s=>{ if(s.id==='NOR_NORTH') s.stormWarning = true; });
updateWarnings();

// expose demo utilities for debugging
window.navtextStations = {stations, setLang, startDemo, stopDemo, randomizeStorms, showStationInfo};
