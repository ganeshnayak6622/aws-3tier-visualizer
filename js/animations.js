const PD=[];
const g=(s,h,c='',x='')=>`<g class="el ${c}" data-s="${s}" ${x}>${h}</g>`;
/* Packet moves along its own path only inside its time slot [a,b] of a cyc-second loop. */
function pk(id,d,em,a,b,cyc,s,o={}){
 PD.push(`<path id="p_${id}" d="${d}" fill="none"/>`);
 const e=Math.min(b,.99),kt=`0;${a};${a+.001};${e-.001};${e};1`;
 return g(s,`<g class="pkt" opacity="0" style="--c:${o.c||'#fb923c'}"><text text-anchor="middle" dy="6" font-size="19">${em}</text><animateMotion dur="${cyc}s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;0;1;1;1" keyTimes="${kt}"><mpath href="#p_${id}"/></animateMotion><animate attributeName="opacity" dur="${cyc}s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="${kt}"/></g>`,o.cls||'base',o.az?`data-az="${o.az}"`:'');
}
const Anim={
 apply(svg,n){svg.querySelectorAll('.el').forEach(e=>e.classList.toggle('on',+e.dataset.s<=n));},
 flow(svg,on){svg.classList.toggle('flowing',on);},
 fail(svg,on){svg.classList.toggle('fail',on);}
};
