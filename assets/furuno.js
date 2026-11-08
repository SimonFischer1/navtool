/* Furuno-Geräte-Engine: Gerätebild + klickbare Tasten + LCD-Bildschirm */
window.Furuno=(()=>{
let ac;
const beep=(n=3,f=1800)=>{try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();for(let i=0;i<n;i++){const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+i*.22;o.frequency.value=f;o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.15,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.16);o.start(t);o.stop(t+.18)}}catch(e){}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const wrap=(t,w)=>{const o=[];t.split('\n').forEach(p=>{let l='';p.split(' ').forEach(x=>{if((l+' '+x).trim().length>w){o.push(l);l=x}else l=(l+' '+x).trim()});o.push(l)});return o};
const KM={ArrowUp:'UP',ArrowDown:'DOWN',ArrowLeft:'LEFT',ArrowRight:'RIGHT',Enter:'ENT',Escape:'CLR',Backspace:'BS',m:'MENU',p:'PRINT'};
function mount(el,c){
 el.className='fdev';el.style.aspectRatio=c.w+'/'+c.h;
 el.innerHTML=`<img src="${c.img}" alt="${c.alt}" draggable="false"><div class="fscr"><div class="fin"></div></div>`;
 const pc=(v,t)=>(v/t*100).toFixed(3)+'%',s=el.querySelector('.fscr'),fin=el.querySelector('.fin'),btn={};
 Object.assign(s.style,{left:pc(c.screen[0],c.w),top:pc(c.screen[1],c.h),width:pc(c.screen[2],c.w),height:pc(c.screen[3],c.h)});
 const api={led:{},render:h=>{fin.innerHTML=h},setDim:n=>{s.style.filter='brightness('+[.35,.55,.78,1][n]+')'},power:on=>s.classList.toggle('off',!on),cols(){const t=document.createElement('span');t.style.cssText='position:absolute;visibility:hidden;white-space:pre';t.textContent='0'.repeat(40);fin.appendChild(t);const w=t.getBoundingClientRect().width/40;t.remove();return Math.max(28,Math.floor(s.clientWidth*.955/w))}};
 for(const[k,[x,y,w,h]]of Object.entries(c.keys)){const b=document.createElement('button');b.className='fk'+(k=='DISTRESS'?' dis':'');b.type='button';b.setAttribute('aria-label',k);btn[k]=b;
  Object.assign(b.style,{left:pc(x-w/2,c.w),top:pc(y-h/2,c.h),width:pc(w,c.w),height:pc(h,c.h)});
  b.onpointerdown=e=>{e.preventDefault();b.classList.add('dn');c.onKey(k)};['pointerup','pointerleave','pointercancel'].forEach(t=>b['on'+t]=()=>b.classList.remove('dn'));el.appendChild(b)}
 for(const[k,[x,y,col]]of Object.entries(c.leds||{})){const d=document.createElement('i');d.className='fled '+col;Object.assign(d.style,{left:pc(x,c.w),top:pc(y,c.h)});el.appendChild(d);api.led[k]=(on,bl)=>{d.classList.toggle('on',!!on);d.classList.toggle('bl',!!bl)}}
 addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;let m=KM[e.key]||(/^[0-9*#]$/.test(e.key)||/^F[1-6]$/.test(e.key)?e.key:null);if(m&&btn[m]){e.preventDefault();btn[m].classList.add('dn');setTimeout(()=>btn[m].classList.remove('dn'),110);c.onKey(m)}});
 return api}
return{mount,beep,esc,wrap}})();
