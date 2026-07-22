
let step=0;
const screens=[...document.querySelectorAll('.screen')],speech=document.querySelector('#speech'),companion=document.querySelector('#companion'),lines=["Good, Ace. The first step is always the bravest.","Catch the leaves, Debojyoty! Do not let the wind win.","A very serious question of excellent taste.","Match Kazuha's favorite wind cards.","Wait for the glow, Ace. Then parry the wind.","One last riddle before the cake, traveler.","Now light the candles, birthday legend.","A message for Debojyoty - our Ace.","One more surprise before you go, Ace.","Now, a little about you, traveler.","The final challenge approaches.","One last note for the road, Ace."];
function next(){screens[step].classList.remove('active');
step++;
screens[step].classList.add('active');
[...document.querySelectorAll('.progress b')].forEach((b,i)=>b.classList.toggle('on',i<=step));
speech.innerHTML='<b>Wind Guide:</b> '+lines[step];
companion.classList.add('talking');
setTimeout(()=>companion.classList.remove('talking'),900);
if(step===4)setTimeout(armBlade,1300)}let caught=0,zone=document.querySelector('#leafZone'),score=document.querySelector('#score');
function makeLeaf(){if(caught>=7)return;
let l=document.createElement('button');
l.className='leaf';
l.textContent='🍃';
l.style.left=(15+Math.random()*92)+'%';
l.style.top=(-20-Math.random()*70)+'px';
l.style.animationDuration=(2.8+Math.random()*2)+'s';
l.onclick=()=>{caught++;
score.textContent=caught;
l.remove();
if(caught===7){document.querySelector('#leafNext').disabled=false;
speech.innerHTML='<b>Wind Guide:</b> Perfect, Ace! The wind itself is impressed.'}};
zone.appendChild(l);
setTimeout(()=>l.remove(),5200)}setInterval(makeLeaf,650);
document.querySelectorAll('#choices .choice').forEach(c=>c.onclick=()=>{if(c.dataset.good==='1'){c.classList.add('good');
document.querySelector('#quizNext').disabled=false;
speech.innerHTML="<b>Wind Guide:</b> Correct. Debojyoty's taste is beyond question."}else{c.classList.add('bad');
speech.innerHTML='<b>Wind Guide:</b> Hmm. We both know that is not it.'}});
document.querySelectorAll('#choices2 .choice').forEach(c=>c.onclick=()=>{if(c.dataset.good==='1'){c.classList.add('good');
document.querySelector('#triviaNext').disabled=false;
speech.innerHTML="<b>Wind Guide:</b> Correct, traveler. Kazuha would be proud."}else{c.classList.add('bad');
speech.innerHTML='<b>Wind Guide:</b> Not quite, Ace. Try another.'}});
let picked=[],matched=0,memoryLock=false;
document.querySelectorAll('.memory-card').forEach(card=>card.onclick=()=>{
if(memoryLock||card.classList.contains('open')||card.classList.contains('matched'))return;
card.classList.add('open');
picked.push(card);
if(picked.length!==2)return;
const [one,two]=picked;
if(one.dataset.symbol===two.dataset.symbol){
one.classList.remove('open');two.classList.remove('open');one.classList.add('matched');two.classList.add('matched');
matched+=2;picked=[];
if(matched===6){document.querySelector('#memoryNext').disabled=false;speech.innerHTML='<b>Wind Guide:</b> Perfect memory, Ace. You really are Kazuha main material.';companion.classList.add('talking');setTimeout(()=>companion.classList.remove('talking'),1200)}
}else{memoryLock=true;setTimeout(()=>{one.classList.remove('open');two.classList.remove('open');picked=[];memoryLock=false},650)}
});
const blade=document.querySelector('#blade'),bladeText=document.querySelector('#bladeCount'),bladeNext=document.querySelector('#bladeNext'),rhythmTrack=document.querySelector('#rhythmTrack'),rhythmZone=document.querySelector('#rhythmZone'),rhythmMarker=document.querySelector('#rhythmMarker');
let parries=0,rhythmSpeed=2.6,rhythmDuration=2.6;
function setZone(widthPct){
const w=Math.max(10,widthPct);
const left=Math.random()*(100-w);
rhythmZone.style.width=w+'%';
rhythmZone.style.left=left+'%'}
function runMarker(duration){
rhythmMarker.classList.remove('run');
void rhythmMarker.offsetWidth;
rhythmMarker.style.animationDuration=duration+'s';
rhythmMarker.classList.add('run')}
function armBlade(){blade.disabled=false;
parries=0;
bladeText.textContent='0';
setZone(34);
runMarker(rhythmDuration);
speech.innerHTML='<b>Wind Guide:</b> Strike when it glows, Ace!'}
blade.onclick=()=>{
const mr=rhythmMarker.getBoundingClientRect(),zr=rhythmZone.getBoundingClientRect();
const hit=mr.left<zr.right&&mr.right>zr.left;
if(hit){
parries++;
bladeText.textContent=parries;
for(let i=0;i<14;i++)spark();
if(parries>=3){
rhythmMarker.classList.remove('run');
blade.disabled=true;
speech.innerHTML='<b>Wind Guide:</b> Legendary timing, Debojyoty.';
bladeNext.disabled=false
}else{
rhythmSpeed=Math.max(1.1,rhythmSpeed-.5);
setZone(34-parries*8);
runMarker(rhythmSpeed);
speech.innerHTML='<b>Wind Guide:</b> Parry '+parries+'! Faster now, Ace.'
}
}else{
rhythmTrack.classList.remove('miss');
void rhythmTrack.offsetWidth;
rhythmTrack.classList.add('miss');
speech.innerHTML='<b>Wind Guide:</b> Missed the wind — try again!'
}
};
let candles=0;
document.querySelectorAll('.candle').forEach(c=>c.onclick=()=>{if(!c.classList.contains('lit')){c.classList.add('lit');
candles++;
if(candles===3){document.querySelector('#cakeNext').disabled=false;
speech.innerHTML='<b>Wind Guide:</b> Make your wish, Ace. The stars are listening.';
for(let i=0;
i<28;
i++)spark()}}});
let dodge=0,yes=document.querySelector('#yes'),no=document.querySelector('#no'),sub=document.querySelector('#finalSub'),result=document.querySelector('#result'),answerZone=document.querySelector('#answerZone'),chaseScore=document.querySelector('#chaseScore'),chaseCount=document.querySelector('#chaseCount');
function spark(){let x=document.createElement('i');
x.className='burst';
x.style.left=innerWidth/2+'px';
x.style.top=innerHeight/2+'px';
x.style.background=['#f5cf91','#d7655d','#a9d9ce'][Math.floor(Math.random()*3)];
x.style.setProperty('--x',((Math.random()-.5)*innerWidth*.9)+'px');
x.style.setProperty('--y',((Math.random()-.5)*innerHeight*.75)+'px');
document.body.appendChild(x);
setTimeout(()=>x.remove(),1100)}
function confettiRain(n){for(let i=0;i<n;i++){setTimeout(()=>{let c=document.createElement('i');
c.className='confetti-fall';
const w=6+Math.random()*8;
c.style.left=Math.random()*innerWidth+'px';
c.style.width=w+'px';
c.style.height=(w*1.6)+'px';
c.style.background=['#f5cf91','#d7655d','#a9d9ce','#fff9ee'][Math.floor(Math.random()*4)];
c.style.animationDuration=(2.2+Math.random()*1.8)+'s';
document.body.appendChild(c);
setTimeout(()=>c.remove(),4200)},i*35)}}
function fireworks(){let bursts=0;
const t=setInterval(()=>{for(let i=0;i<24;i++)spark();
bursts++;
if(bursts>=4)clearInterval(t)},350)}
function pop(){yes.style.display=no.style.display='none';
chaseScore.style.display='none';
sub.textContent='Answer successfully verified. The wind agrees.';
result.style.display='block';
fireworks();
confettiRain(80)}
yes.onclick=pop;
const taunts=['Hmm… try again, Ace.','This button is feeling shy.','Nice try, traveler.','The wind just blew it away.','Kazuha disagrees, Debojyoty.','Plot twist incoming…'];
no.onclick=()=>{dodge++;
if(dodge===1){chaseScore.style.display='block'}
chaseCount.textContent=Math.min(dodge,6);
if(dodge<6){
const zw=answerZone.clientWidth,zh=answerZone.clientHeight,bw=no.offsetWidth,bh=no.offsetHeight;
no.style.right='auto';
no.style.left=Math.max(4,Math.random()*(zw-bw-8))+'px';
no.style.top=Math.max(0,Math.random()*(zh-bh-8))+'px';
no.style.transform='rotate('+((Math.random()-.5)*26)+'deg) scale('+(1-dodge*.06)+')';
sub.textContent=taunts[(dodge-1)%taunts.length];
speech.innerHTML='<b>Wind Guide:</b> '+['It is running away!','Faster, Ace!','It cannot hide forever.'][dodge%3];
companion.classList.add('talking');
setTimeout(()=>companion.classList.remove('talking'),700)
}else{
no.textContent='Yes';
no.style.background='#d7655d';
no.style.color='white';
no.style.left='50%';
no.style.top='0px';
no.style.transform='translateX(-50%) scale(1)';
sub.textContent='The wind has spoken. The answer was always yes.';
chaseScore.style.display='none';
no.onclick=pop
}};

const cookieBtns=[...document.querySelectorAll('#cookieRow .cookie')],cookieNext=document.querySelector('#cookieNext'),cookieCount=document.querySelector('#cookieCount'),fortuneList=document.querySelector('#fortuneList');
const fortunes=["This year brings you luck rarer than a five-star pull.","Somewhere, a wind spirit is rooting for you, Ace.","Great birthdays are followed by even greater years.","Debojyoty, the odds are finally in your favor.","A legendary year awaits the level 20 traveler.","Perez is thinking about you right now, Ace.","Kazuha would approve of your birthday energy.","This year, chase every wind that calls your name."];
let cookiesCracked=0,usedFortunes=[];
function pickFortune(){let f;
do{f=fortunes[Math.floor(Math.random()*fortunes.length)]}while(usedFortunes.includes(f)&&usedFortunes.length<fortunes.length);
usedFortunes.push(f);
return f}
cookieBtns.forEach(c=>c.onclick=()=>{
c.disabled=true;
c.classList.add('cracked');
c.textContent='🥠💥';
cookiesCracked++;
cookieCount.textContent=cookiesCracked;
const li=document.createElement('li');
li.textContent=pickFortune();
fortuneList.appendChild(li);
speech.innerHTML='<b>Wind Guide:</b> '+['The cookie never lies, Ace.','Another secret revealed.','The wind whispers back.'][cookiesCracked-1];
for(let i=0;i<12;i++)spark();
if(cookiesCracked===3){cookieNext.disabled=false;
speech.innerHTML='<b>Wind Guide:</b> All three fortunes are yours now, Ace.'}
});

