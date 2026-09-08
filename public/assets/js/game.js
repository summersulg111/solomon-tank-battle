(() => {
'use strict';
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const W=1280,H=720,LEVEL=window.SOLOMON_LEVEL||1;
const scoreEl=document.getElementById('score'),coinsEl=document.getElementById('coins'),deathsEl=document.getElementById('deaths'),timerEl=document.getElementById('timer');
const overlay=document.getElementById('overlay'),titleEl=document.getElementById('overlayTitle'),textEl=document.getElementById('overlayText');
let data=null,last=0,running=true,dead=false,won=false,paused=false,elapsed=0,score=0,coins=0,deaths=0,cameraX=0,checkpoint=null;
const keys=new Set();
addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp',' ','a','d','w','Escape'].includes(e.key))e.preventDefault();keys.add(e.key.toLowerCase());if(e.key==='Escape')togglePause();});
addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
document.querySelectorAll('.touch button').forEach(b=>{const k=b.dataset.key;b.addEventListener('touchstart',e=>{e.preventDefault();keys.add(k)});b.addEventListener('touchend',e=>{e.preventDefault();keys.delete(k)});});
document.getElementById('pause').onclick=togglePause;document.getElementById('restart').onclick=restart;
const player={x:0,y:0,w:34,h:48,vx:0,vy:0,grounded:false};
function rects(a,b){return a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y}
function resetPlayer(){player.x=checkpoint?.x??data.spawn.x;player.y=checkpoint?.y??data.spawn.y;player.vx=0;player.vy=0;dead=false}
function restart(){if(!data)return;elapsed=score=coins=deaths=0;checkpoint=null;won=false;paused=false;running=true;overlay.classList.add('hidden');resetPlayer();data.collectibles.forEach(c=>c.collected=false);requestAnimationFrame(loop)}
function die(){if(dead||won)return;dead=true;deaths++;deathsEl.textContent=deaths;setTimeout(()=>{resetPlayer()},350)}
function togglePause(){if(dead||won)return;paused=!paused;overlay.classList.toggle('hidden',!paused);titleEl.textContent='PAUSED';textEl.textContent='Take a breath. The level will still be here.';running=!paused;if(!paused)requestAnimationFrame(loop)}
async function load(){const r=await fetch(`../game/levels/level-0${LEVEL}.json`);if(!r.ok)throw new Error('Level unavailable');data=await r.json();resetPlayer();requestAnimationFrame(loop)}
function update(dt){
 if(dead){return} elapsed+=dt;timerEl.textContent=elapsed.toFixed(1);
 const left=keys.has('arrowleft')||keys.has('a')||keys.has('left'),right=keys.has('arrowright')||keys.has('d')||keys.has('right');
 const jump=keys.has('arrowup')||keys.has('w')||keys.has(' ')||keys.has('jump');
 const accel=1900,max=290; if(left)player.vx-=accel*dt;if(right)player.vx+=accel*dt;if(!left&&!right)player.vx*=Math.pow(.0005,dt);player.vx=Math.max(-max,Math.min(max,player.vx));
 if(jump&&player.grounded){player.vy=-650;player.grounded=false;keys.delete(' ');keys.delete('jump')}
 player.vy+=1800*dt;const oldY=player.y;player.x+=player.vx*dt;player.y+=player.vy*dt;player.grounded=false;
 for(const p of data.platforms){if(rects(player,p)&&oldY+player.h<=p.y+10&&player.vy>=0){player.y=p.y-player.h;player.vy=0;player.grounded=true}}
 for(const t of data.traps)if(rects(player,t))die();
 for(const c of data.collectibles)if(!c.collected&&rects(player,{x:c.x-12,y:c.y-12,width:24,height:24})){c.collected=true;coins++;score+=100;coinsEl.textContent=coins;scoreEl.textContent=score}
 for(const cp of data.checkpoints)if(player.x>cp.x){checkpoint={x:cp.x,y:cp.y-player.h}}
 if(player.y>H+200)die();
 if(rects(player,data.goal))finish();
 cameraX=Math.max(0,Math.min(data.world.width-W,player.x-W*.35));
}
function finish(){if(won)return;won=true;running=false;score+=Math.max(0,Math.floor((120-elapsed)*20));score+=coins*100;score=Math.max(100,score-deaths*150);scoreEl.textContent=score;overlay.classList.remove('hidden');titleEl.textContent='LEVEL COMPLETE';textEl.textContent=`Score ${score} · Time ${elapsed.toFixed(1)}s · Coins ${coins} · Deaths ${deaths}`;document.getElementById('restart').textContent='REPLAY'}
function draw(){ctx.clearRect(0,0,W,H);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0b0b0f');g.addColorStop(1,'#210b0b');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.save();ctx.translate(-cameraX,0);
 for(let i=0;i<data.world.width;i+=160) {ctx.fillStyle=i%320===0?'#101017':'#0d0d13';ctx.fillRect(i,0,2,H)}
 for(const p of data.platforms){ctx.fillStyle='#24242d';ctx.fillRect(p.x,p.y,p.width,p.height);ctx.fillStyle='#ff6b35';ctx.fillRect(p.x,p.y,p.width,4)}
 for(const t of data.traps){ctx.fillStyle='#e53935';for(let x=t.x;x<t.x+t.width;x+=18){ctx.beginPath();ctx.moveTo(x,t.y+t.height);ctx.lineTo(x+9,t.y);ctx.lineTo(x+18,t.y+t.height);ctx.fill()}}
 for(const c of data.collectibles)if(!c.collected){ctx.fillStyle='#ffd54f';ctx.beginPath();ctx.arc(c.x,c.y,10,0,Math.PI*2);ctx.fill()}
 for(const cp of data.checkpoints){ctx.fillStyle='#ff6b35';ctx.fillRect(cp.x,cp.y-60,5,60);ctx.fillRect(cp.x+5,cp.y-60,32,18)}
 ctx.fillStyle='#43a047';ctx.fillRect(data.goal.x,data.goal.y,data.goal.width,data.goal.height);ctx.fillStyle='#fff';ctx.fillText('EXIT',data.goal.x+10,data.goal.y+30);
 ctx.fillStyle='#fff';ctx.fillRect(player.x,player.y,player.w,player.h);ctx.fillStyle='#e53935';ctx.fillRect(player.x+7,player.y+8,20,7);ctx.fillStyle='#111';ctx.fillRect(player.x+7,player.y+25,20,5);
 ctx.restore();
}
function loop(ts){if(!running)return;if(!last)last=ts;const dt=Math.min(.033,(ts-last)/1000);last=ts;update(dt);draw();if(running)requestAnimationFrame(loop)}
load().catch(err=>{overlay.classList.remove('hidden');titleEl.textContent='LOAD ERROR';textEl.textContent=err.message;});
})();
