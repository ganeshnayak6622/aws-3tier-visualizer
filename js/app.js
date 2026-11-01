const $=s=>document.querySelector(s);
const S={step:1,mode:'beginner',timer:null,flowT:null,fail:false};
const dia=$('#dia');dia.innerHTML=build();const svg=$('#svg');
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#steps').innerHTML=STEPS.map((s,i)=>`<button class="st" data-i="${i+1}"><b class="n">${i+1}</b><span>${s.t}<small>${s.s}</small></span></button>`).join('');
$('#sum').innerHTML=[['2','Availability Zones'],['6','Subnets'],['3','Application tiers'],['2','Load balancers'],['2','Auto Scaling Groups'],['1 + 1','Writer + Reader DB']].map(x=>`<div><b>${x[0]}</b>${x[1]}</div>`).join('');
function card(){const s=STEPS[S.step-1];
 $('#card').dataset.mode=S.mode;
 $('#card').innerHTML=`<h2>Step ${S.step}: ${s.t}</h2><div class="plain"><h3>In Plain Words</h3><p>${s.plain}</p></div><div class="tech"><h3>Technical Explanation</h3><p>${s.tech}</p></div><div><h3>Watch the Picture</h3><p>${rm?'Animations are off (reduced motion): follow the arrows. ':''}${s.watch}</p></div>${S.fail?`<div><h3>Failure simulation</h3><p>${FAILNOTE}</p></div>`:''}`;}
function setStep(n){S.step=n;Anim.apply(svg,n); document.querySelectorAll('.st').forEach(b=>{if(+b.dataset.i===n)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 $('#prog').textContent=n+'/9';card();}
function stop(){clearInterval(S.timer);S.timer=null;}
function setFlow(on){clearInterval(S.flowT);Anim.flow(svg,on);$('#flowCap').textContent='';
 if(on){let i=0;const t=()=>{$('#flowCap').textContent=`${i%8+1}/8 · ${FLOW[i%8]}`;i++;};t();S.flowT=setInterval(t,1500);}}
function setFail(on){S.fail=on;Anim.fail(svg,on);$('#fail').setAttribute('aria-pressed',on);card();}
document.querySelectorAll('.st').forEach(b=>b.onclick=()=>{stop();setStep(+b.dataset.i);});
$('#play').onclick=()=>{stop();if(S.step>=9)setStep(1);S.timer=setInterval(()=>{if(S.step>=9)stop();else setStep(S.step+1);},5000);};
$('#pause').onclick=stop;
$('#reset').onclick=()=>{stop();setFlow(false);setFail(false);setStep(1);};
$('#flow').onclick=()=>{stop();setFail(false);setStep(6);setFlow(!svg.classList.contains('flowing'));};
$('#fail').onclick=()=>{if(!S.fail){setFlow(false);if(S.step<6)setStep(6);}setFail(!S.fail);};
[['mB','beginner'],['mT','technical']].forEach(([id,m])=>$('#'+id).onclick=()=>{S.mode=m;$('#mB').setAttribute('aria-pressed',m==='beginner');$('#mT').setAttribute('aria-pressed',m==='technical');card();});
$('#theme').onclick=()=>{const h=document.documentElement;h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';};
function gloss(q=''){q=q.toLowerCase();$('#gl').innerHTML=GLOSS.filter(g=>g.join(' ').toLowerCase().includes(q)).map(g=>`<article><h4>${g[0]}</h4><p><b>Analogy:</b> ${g[1]}</p><p><b>Role:</b> ${g[2]}</p><p><b>Definition:</b> ${g[3]}</p></article>`).join('')||'<p>No matching term.</p>';}
$('#q').oninput=e=>gloss(e.target.value);gloss();setStep(1);
