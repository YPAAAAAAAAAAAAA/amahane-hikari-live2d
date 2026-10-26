(() => {
'use strict';
const canvas=document.getElementById('canvas'),c=canvas.getContext('2d');
let w=390,h=844,dpr=1,scale=1,ox=0,oy=0,t=0,last=0,sent=false;
let targetX=0,targetY=0,gx=0,gy=0,mood='calm',night=false,hello=0,delight=0,down=false;
const sparks=[];
const P={ink:'#244353',hair:'#9fd8ca',light:'#d4efe0',shade:'#61a99f',skin:'#ffe2cc',shadow:'#efb5a5',gold:'#f1ce8c'};
function path(d,fill,stroke=P.ink,line=1.6){const p=new Path2D(d);if(fill){c.fillStyle=fill;c.fill(p)}if(stroke){c.strokeStyle=stroke;c.lineWidth=line;c.lineJoin='round';c.lineCap='round';c.stroke(p)}}
function ellipse(x,y,rx,ry,fill,stroke){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke()}}
function star(x,y,r,color,rot=0){c.save();c.translate(x,y);c.rotate(rot);path(`M0 ${-r} Q${r*.2} ${-r*.2} ${r} 0 Q${r*.2} ${r*.2} 0 ${r} Q${-r*.2} ${r*.2} ${-r} 0 Q${-r*.2} ${-r*.2} 0 ${-r}`,color,null);c.restore()}
function resize(){w=canvas.clientWidth;h=canvas.clientHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);scale=Math.min(w/390,h/510);ox=w/2;oy=h/2-235*scale;draw()}
function eye(x,blink){c.save();c.translate(x,181+gy*1.5);if(blink){path('M-22 0 Q0 14 22 -2',null,P.ink,3);path('M-22 0 L-26 -4',null,P.ink,2)}else{path('M-25 -3 Q-3 -22 23 -5 Q15 19 -4 19 Q-20 16 -25 -3','#fff7e9',null);c.save();c.beginPath();c.ellipse(gx*3,1,11,18,0,0,7);c.clip();const g=c.createLinearGradient(0,-18,0,20);g.addColorStop(0,'#174c63');g.addColorStop(.5,'#377f8d');g.addColorStop(1,'#d6bd72');c.fillStyle=g;c.fillRect(-20,-20,40,45);ellipse(gx*3,-2,4.5,10,'#153a50');ellipse(gx*3-4,-8,4,5,'#fffaf1');ellipse(gx*3+5,9,2,2,'#fffaf1');c.restore();path('M-25 -3 Q-3 -22 23 -5',null,P.ink,3.5);path('M-25 -3 L-29 -9 M-20 -8 L-23 -14',null,P.ink,2)}c.restore()}
function draw(){
c.setTransform(dpr,0,0,dpr,0,0);
const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,night?'#211f43':'#123b4e');bg.addColorStop(.6,night?'#3e3d64':'#316072');bg.addColorStop(1,night?'#8b6276':'#7d9f9d');c.fillStyle=bg;c.fillRect(0,0,w,h);
// A distant, original observatory and gently drifting motes.
c.strokeStyle='#dce9cb12';c.lineWidth=1;for(let i=0;i<5;i++){c.beginPath();c.arc(w/2,h*.44,(100+i*48)*scale,Math.PI,Math.PI*2);c.stroke()}
for(let i=0;i<42;i++){let x=((i*83.3+Math.sin(t*.2+i)*8)%390)/390*w,y=((i*137.1-t*(i%3+1)*2)%900+900)%900/900*h;star(x,y,(i%4===0?3:1)*scale,'#e6e6c7'+(i%3===0?'99':'44'),t*.05)}
c.save();c.translate(ox,oy);c.scale(scale,scale);
// Halo and hanging ornaments belong to the scene, not a HUD.
c.save();c.translate(0,170);c.rotate(-.25);c.strokeStyle='#e9d4a169';c.lineWidth=1;c.beginPath();c.ellipse(0,0,151,157,0,0,7);c.stroke();c.beginPath();c.ellipse(0,0,144,150,0,0,7);c.stroke();c.restore();
for(const side of [-1,1]){path(`M${side*151} 136 L${side*151} 295`,null,'#dacda05c',1);star(side*151,298,8,P.gold);ellipse(side*151,311,2,2,P.gold)}
ellipse(0,486,118,12,'#102d4038');
c.translate(Math.sin(t*.7)*3,Math.sin(t*1.8)*2);
// Long segmented locks sway independently from the face.
for(const s of [-1,1]){c.save();c.scale(s,1);c.rotate(Math.sin(t*1.3+s)*.025);path('M30 93 C111 58 134 153 116 231 C101 300 150 346 112 414 Q102 436 76 442 Q99 411 73 378 C54 340 55 285 65 238 L26 178Z',P.shade);path('M77 138 C124 194 76 271 104 345 Q122 386 97 414 Q105 367 85 340 C64 286 97 230 77 138',P.hair,null);path('M101 185 Q88 240 91 276',null,'#c8ebd5',2);c.restore()}
// Cape, pleated skirt, shoulders and embroidered bodice.
path('M-55 290 Q-108 305 -124 377 L-103 452 Q-51 479 0 466 Q59 478 111 451 L123 377 Q105 307 56 290Z','#254d60');
path('M-48 358 L-78 470 Q0 490 78 470 L48 358Z','#f1e7d6');
for(let i=-2;i<=2;i++)path(`M${i*17} 374 L${i*29} 476`,null,'#b9c1bb',1.5);
path('M-47 286 Q0 268 47 286 L61 359 Q0 388 -61 359Z','#f8efdd');
path('M-23 284 L0 326 L24 284 L43 361 Q0 380 -43 361Z','#345e6c');
path('M-53 286 L-88 308 L-105 394 Q-72 385 -47 355 L-20 294Z','#416f7c');path('M53 286 L88 308 L105 394 Q72 385 47 355 L20 294Z','#416f7c');
path('M-85 311 Q-64 334 -43 346 M85 311 Q64 334 43 346',null,P.gold,2);
for(const s of [-1,1]){star(s*75,354,8,P.gold);path(`M${s*108} 404 Q${s*74} 438 ${s*26} 445`,null,'#9fb8b0',1);star(s*86,426,4,P.gold)}
path('M-18 245 L-18 282 Q0 303 18 282 L18 245Z',P.skin);path('M-18 249 Q0 268 18 249 L18 267 Q0 280 -18 267Z',P.shadow,null);
path('M-28 279 L0 303 L-22 319 L-44 291Z','#f5eddc');path('M28 279 L0 303 L22 319 L44 291Z','#f5eddc');
ellipse(0,310,10,13,P.gold);ellipse(0,309,6,9,'#4caaa4');star(-2,305,3,'#fff9de');
// A sleeve and hand lift into a greeting.
c.save();c.translate(76,328);c.rotate(hello>0?-.8+Math.sin(t*12)*.17:.08+Math.sin(t)*.03);path('M-14 0 Q-4 -14 14 0 L26 60 Q3 74 -17 57Z','#416f7c');path('M-16 49 L24 49 L26 62 Q4 74 -18 60Z','#e8deca');path('M-11 63 L-11 79 Q-9 87 -4 80 L-4 69 L-2 87 Q2 94 5 85 L5 70 L9 84 Q15 88 15 78 L14 65 Q22 75 25 69 Q24 60 13 58Z',P.skin);c.restore();
// Head rig: tilt, gaze and layered bangs.
c.save();c.translate(gx*5,gy*3);c.translate(0,191);c.rotate(gx*.045+Math.sin(t*.9)*.018);c.translate(0,-191);
path('M-92 178 C-116 91 -60 52 0 56 C77 49 111 112 91 189 L78 229 L-78 228Z',P.hair);
ellipse(-78,198,13,22,P.skin,P.ink);ellipse(78,198,13,22,P.skin,P.ink);
path('M-75 132 Q0 89 75 132 L75 204 Q68 246 0 266 Q-68 246 -75 204Z',P.skin);
path('M-74 158 Q-63 129 0 127 Q50 128 74 160 L73 144 Q0 102 -74 141Z',P.shadow,null);
const blink=Math.sin(t*1.17)> .996;eye(-36,blink||mood==='joy'||delight>0);eye(36,blink||mood==='joy'||delight>0||mood==='wink');
for(const s of [-1,1]){path(`M${s*17} 153 Q${s*34} 145 ${s*53} 151`,null,'#568680',2);c.globalAlpha=.35;ellipse(s*52,216,16,7,'#ed8e93');c.globalAlpha=1;for(let j=0;j<3;j++)path(`M${s*48+j*4} 213 l-2 5`,null,'#df9c98',1)}
path('M0 199 l-3 11 l5 0',null,'#d9a393',1.3);
if(mood==='joy'||delight>0)path('M-11 231 Q0 237 11 231 Q6 251 -4 245Z','#914c56');else path('M-10 233 Q0 242 10 232',null,'#a86665',1.8);
// Sculpted fringe with a central feather-like curl.
path('M-92 171 C-102 104 -60 58 0 64 C63 53 102 115 88 177 Q65 166 49 122 Q51 162 69 179 Q28 170 12 124 Q19 153 32 166 Q-13 154 -23 116 Q-28 153 -61 178 L-59 137 Q-69 169 -92 189Z',P.hair);
path('M-78 132 Q-64 83 -16 81 M4 79 Q55 71 79 127',null,P.light,5);
path('M-22 116 Q-30 91 -9 75 Q-19 96 12 124 M49 122 Q38 91 20 85',null,P.shade,1.5);
path('M-83 170 Q-61 193 -76 244 Q-57 223 -60 187',P.hair);path('M84 163 Q64 197 79 242 Q59 222 62 184',P.hair);
path('M-3 65 Q-30 38 -8 32 Q6 34 2 54 Q13 35 29 44',null,P.hair,5);
// Original crescent hair clip and dangling star earrings.
c.save();c.translate(72,134);c.rotate(.35);path('M0 -21 C-29 -13 -25 20 0 22 C-14 10 -14 -9 0 -21',P.gold);star(4,2,9,'#fff1ba');c.restore();
for(const s of [-1,1]){path(`M${s*82} 218 L${s*83} 245`,null,P.gold,2);star(s*83,250,6,P.gold,Math.sin(t)*.1)}
c.restore();c.restore();
for(const p of sparks){c.globalAlpha=Math.max(0,p.life);star(p.x,p.y,p.r*(1.3-p.life*.3),P.gold,p.life*3);c.globalAlpha=1}
}
function frame(ms){let dt=Math.min((ms-last)/1000,.05);last=ms;t+=dt;gx+=(targetX-gx)*.07;gy+=(targetY-gy)*.07;hello=Math.max(0,hello-dt);delight=Math.max(0,delight-dt);for(let i=sparks.length-1;i>=0;i--){let p=sparks[i];p.life-=dt*.65;p.y-=dt*28;p.x+=p.v*dt;if(p.life<=0)sparks.splice(i,1)}draw();if(!sent&&window.__gbSandbox){window.__gbSandbox.ready();sent=true}requestAnimationFrame(frame)}
function follow(e){const r=canvas.getBoundingClientRect();targetX=Math.max(-1,Math.min(1,(e.clientX-r.left-w/2)/(w*.4)));targetY=Math.max(-1,Math.min(1,(e.clientY-r.top-h/2)/(h*.4)))}
canvas.addEventListener('pointerdown',e=>{down=true;canvas.setPointerCapture(e.pointerId);follow(e);delight=1.4;for(let i=0;i<9;i++)sparks.push({x:e.offsetX+(Math.random()-.5)*55,y:e.offsetY+(Math.random()-.5)*35,r:3+Math.random()*6,v:(Math.random()-.5)*45,life:1});if(sparks.length>90)sparks.splice(0,sparks.length-90)});
canvas.addEventListener('pointermove',follow);canvas.addEventListener('pointerup',()=>{down=false;targetX=targetY=0});canvas.addEventListener('pointercancel',()=>{down=false;targetX=targetY=0});canvas.addEventListener('pointerleave',()=>{if(!down)targetX=targetY=0});
const toggle=document.getElementById('toggle'),panel=document.getElementById('panel'),status=document.getElementById('status');
for(const el of [toggle,panel])for(const ev of ['pointerdown','pointermove','pointerup','click'])el.addEventListener(ev,e=>e.stopPropagation());
toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));toggle.setAttribute('aria-label',panel.hidden?'Open character controls':'Close character controls')});
function select(m){mood=m;document.querySelectorAll('[data-mood]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mood===m)))}
document.querySelectorAll('[data-mood]').forEach(b=>b.addEventListener('click',()=>{select(b.dataset.mood);status.textContent={calm:'A quiet moment among the stars.',joy:'You made her day.',wink:'Our little constellation.'}[mood]}));
document.getElementById('wave').onclick=()=>{hello=3;status.textContent='Hello, stargazer!'};
document.getElementById('palette').onclick=e=>{night=!night;e.target.textContent=night?'Daybreak':'Twilight';status.textContent=night?'The violet hour.':'Back to the blue hour.'};
document.getElementById('reset').onclick=()=>{select('calm');night=false;hello=delight=0;targetX=targetY=0;sparks.length=0;document.getElementById('palette').textContent='Twilight';status.textContent='Make yourself at home.'};
window.addEventListener('resize',resize);resize();requestAnimationFrame(frame);
})();
