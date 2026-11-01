/* Architecture definition: all coordinates live on the 1400x850 viewBox. */
const K={blue:'#4f9dff',teal:'#2dd4bf',gold:'#f5b82e',purple:'#a78bfa',db:'#7c8cff',orange:'#fb923c',green:'#34d399',red:'#f87171',gray:'#94a3b8'};
const R=(x,y,w,h,st,fi,o='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" stroke="${st}" fill="${fi}" ${o}/>`;
const T=(x,y,t,z=11,f='#e2e8f0',a='start',w=600)=>`<text x="${x}" y="${y}" font-size="${z}" fill="${f}" text-anchor="${a}" font-weight="${w}">${t}</text>`;
const svc=(x,y,w,h,c,a,b)=>R(x,y,w,h,c,c+'26','stroke-width="1.5"')+`<rect x="${x+6}" y="${y+10}" width="4" height="${h-20}" rx="2" fill="${c}"/>`+T(x+w/2+3,y+19,a,11.5,'#fff','middle',700)+T(x+w/2+3,y+33,b,9.5,'#b6c2d6','middle',400);
const AZS=[{n:'1a',y:75,h:330,sy:105,sh:285,iy:170,ny:300,rt:380,c:'azA',cd:[1,2,3]},{n:'1b',y:485,h:320,sy:515,sh:280,iy:580,ny:700,rt:785,c:'',cd:[4,5,6]}];
const COLS=[{x:330,w:210,k:'gold',nm:'Public Web Subnet',rt:'RT: 0.0.0.0/0 → IGW'},{x:675,w:210,k:'purple',nm:'Private App Subnet',rt:'RT: 0.0.0.0/0 → NAT'},{x:910,w:210,k:'db',nm:'Private DB Subnet',rt:'RT: local only'}];
/* Wires: [path, colour, step, dashed] — also the lanes packets travel on. */
const WIRES=[
['M80 465 L105 465','orange',4],['M165 465 L225 465','orange',4],
['M265 420 L265 200 L360 200','orange',5],['M265 480 L265 610 L360 610','orange',5],
['M510 200 L595 200 L595 420','orange',6],['M510 610 L595 610 L595 480','orange',6],
['M635 420 L635 200 L705 200','orange',6],['M635 480 L635 610 L705 610','orange',6],
['M865 200 L935 200','db',6],['M865 610 L935 610','db',6],['M1065 235 L1065 580','green',6,1],
['M865 215 L897 215 L897 450 L1175 450','gray',6],['M865 605 L897 605 L897 450','gray',6],
['M730 230 L730 350 L490 350','orange',7,1],['M380 350 L135 350 L135 420','orange',7,1],
['M730 640 L730 750 L490 750','orange',7,1],['M380 750 L135 750 L135 480','orange',7,1],
['M45 480 L45 650 L322 650','red',8,1],
['M1300 122 L1250 122','green',9,1],['M1175 122 L1150 122','green',9,1],['M1300 740 L1150 740','teal',9,1]];
function build(){
 PD.length=0;let w='',b='',p='';
 WIRES.forEach(([d,c,s,dash])=>{w+=g(s,`<path d="${d}" fill="none" stroke="${K[c]}" stroke-width="2.2" ${dash?'stroke-dasharray="7 5"':''} marker-end="url(#ar)" opacity=".85"/>`);});
 b+=g(1,R(175,15,1095,820,K.blue,K.blue+'10','stroke-width="2"')+T(190,36,'AWS Region (the city)',13,K.blue,'start',700)
  +R(195,45,955,775,K.teal,K.teal+'10','stroke-width="2.5"')+T(210,65,'VPC 10.0.0.0/16 (fenced campus)',13,K.teal,'start',700));
 AZS.forEach(a=>{
  b+=g(2,R(215,a.y,915,a.h,K.blue,K.blue+'14','stroke-dasharray="8 4" stroke-width="1.5"')+T(228,a.y+21,'Availability Zone '+a.n+' (building)',12.5,K.blue,'start',700),a.c);
  COLS.forEach((c,i)=>{const col=K[c.k],cidr=`10.0.${a.cd[i]}.0/24`;
   b+=g(3,R(c.x,a.sy,c.w,a.sh,col,col+'1c','stroke-width="1.5"')+T(c.x+12,a.sy+20,c.nm,12,col,'start',700)+T(c.x+12,a.sy+36,cidr,11,'#cbd5e1','start',400),a.c);
   b+=g(4,T(c.x+12,a.rt,c.rt,10,'#9fb0c9','start',400),a.c);
   b+=g(8,R(c.x+c.w-54,a.sy+8,46,16,K.orange,'none','stroke-dasharray="3 2" rx="4"')+T(c.x+c.w-31,a.sy+20,'NACL',9,K.orange,'middle',700),a.c);});
  const tg=(x,y)=>g(8,R(x,y,30,14,K.green,K.green+'30','rx="4"')+T(x+15,y+11,'SG',9,K.green,'middle',700),a.c);
  b+=g(5,R(350,a.iy-10,170,80,K.orange,'none','stroke-dasharray="5 4" rx="8"')+T(365,a.iy+ (a.n=='1a'?84:84),'Web Auto Scaling Group',10,K.orange,'start',600),a.c);
  b+=g(5,svc(360,a.iy,150,60,K.gold,'Web Server','EC2 · '+a.n)+T(435,a.iy+49,'✓ healthy',10,K.green,'middle',600),a.c)+tg(480,a.iy-7);
  b+=g(6,R(695,a.iy-10,180,80,K.orange,'none','stroke-dasharray="5 4" rx="8"')+T(868,a.iy+84,'App Auto Scaling Group',10,K.orange,'end',600),a.c);
  b+=g(6,svc(705,a.iy,160,60,K.purple,'App Server','EC2 · '+a.n),a.c)+tg(835,a.iy-7);
  b+=g(6,svc(935,a.iy,160,65,K.db,a.n=='1a'?'RDS Writer':'RDS Reader',a.n=='1a'?'reads + writes':'read replica'),a.c)+tg(1065,a.iy-7);
  b+=g(6,R(765,a.ny+40,110,22,K.purple,K.purple+'30','rx="6"')+T(820,a.ny+55,'IAM Role',10.5,'#fff','middle',600),a.c);
  b+=g(7,svc(380,a.ny,110,65,K.orange,'NAT Gateway',a.n)+'',a.c);
 });
 b+=g(4,svc(10,420,70,60,K.gray,'Internet','')+svc(105,420,60,60,K.orange,'Internet','Gateway')+svc(225,420,80,60,K.orange,'External','ALB'));
 b+=g(6,svc(575,420,80,60,K.orange,'Internal','ALB')+svc(1175,425,80,50,K.gray,'S3','Bucket')+T(920,435,'DB Subnet Group (1a + 1b)',10.5,K.db,'start',600)
  +R(905,100,220,695,K.db,'none','stroke-dasharray="4 4" rx="12" opacity=".7"'));
 b+=g(6,T(1048,420,'replication',10,K.green,'end',600));
 b+=g(8,T(142,668,'Blocked by Network ACL / SG',10.5,K.red,'start',700)+T(335,655,'❌',20,K.red,'middle'));
 b+=g(9,svc(1175,100,75,45,K.green,'VPN GW','')+svc(1300,95,90,55,K.gray,'Ravi’s Office','On-premises')+svc(1300,700,90,80,K.teal,'Partner VPC','10.1.0.0/16')+T(1225,170,'IPsec tunnel',10,K.green,'middle',600)+T(1225,735,'VPC Peering',10.5,K.teal,'middle',600));
 b+=`<g class="failov"><rect x="215" y="75" width="915" height="330" rx="10" fill="${K.red}" fill-opacity=".16" stroke="${K.red}" stroke-width="2"/>`+T(600,96,'⚠ AZ 1a unavailable · traffic uses AZ 1b',12.5,K.red,'middle',700)+`</g>`;
 /* Packets: request chain (7s loop), data, replication, NAT, intruder, VPN, peering. */
 const C=7;
 p+=pk('r1','M80 465 L105 465','✉️',.02,.1,C,4)+pk('r2','M165 465 L225 465','✉️',.1,.2,C,4);
 p+=pk('r3a','M265 420 L265 200 L360 200','✉️',.2,.4,C,5,{az:'a'})+pk('r3b','M265 480 L265 610 L360 610','✉️',.45,.65,C,5);
 p+=pk('r4a','M510 200 L595 200 L595 420','✉️',.4,.55,C,6,{az:'a'});
 p+=pk('r4b','M510 610 L595 610 L595 480','✉️',.65,.8,C,6)+pk('r5b','M635 480 L635 610 L705 610','✉️',.8,.95,C,6);
 p+=pk('r5a','M635 420 L635 200 L705 200','✉️',.55,.7,C,6,{az:'a'})+pk('d1','M865 200 L935 200','💾',.7,.8,C,6,{c:'#7c8cff',az:'a'})+pk('d2','M865 610 L935 610','💾',.95,.99,C,6,{c:'#7c8cff'});
 p+=pk('rep','M1065 235 L1065 580','🔁',.05,.95,4,6,{c:'#34d399',az:'a'});
 p+=pk('s3a','M865 215 L897 215 L897 450 L1175 450','💾',.1,.9,5,6,{c:'#94a3b8',az:'a'})+pk('s3b','M865 605 L897 605 L897 450 L1175 450','💾',.1,.9,5,6,{c:'#94a3b8'});
 p+=pk('n1','M730 230 L730 350 L490 350','📦',.02,.3,6,7,{az:'a'})+pk('n2','M380 350 L135 350 L135 420','📦',.32,.65,6,7,{az:'a'})+pk('n3','M105 465 L80 465','📦',.67,.8,6,7)+pk('n4','M730 640 L730 750 L490 750','📦',.02,.3,6,7)+pk('n5','M380 750 L135 750 L135 480','📦',.32,.65,6,7);
 p+=pk('x1','M45 480 L45 650 L322 650','😈',.05,.9,5,8,{c:'#f87171'});
 p+=pk('v1','M1300 122 L1250 122','🔒',.05,.45,4,9,{c:'#34d399'})+pk('v2','M1175 122 L1150 122','🔒',.5,.95,4,9,{c:'#34d399'});
 p+=pk('c1','M1300 740 L1150 740','🤝',.05,.5,4,9,{c:'#2dd4bf'})+pk('c2','M1150 740 L1300 740','🤝',.52,.95,4,9,{c:'#2dd4bf'});
 /* Full journey: out and back, one hop at a time so packets stay on the wires. */
 const F=[['M80 465 L105 465','✉️'],['M165 465 L225 465','✉️'],['M265 420 L265 200 L360 200','✉️'],['M510 200 L595 200 L595 420','✉️'],['M635 420 L635 200 L705 200','✉️'],['M865 200 L935 200','💾'],['M935 215 L865 215','💾'],['M705 200 L635 200 L635 420','💾'],['M595 420 L595 200 L510 200','💾'],['M360 200 L265 200 L265 420','💾'],['M225 465 L165 465','💾'],['M105 465 L80 465','💾']];
 F.forEach(([d,e],i)=>{p+=pk('f'+i,d,e,i/12+.005,(i+1)/12-.005,12,6,{cls:'fl',c:'#fbbf24'});});
 const defs=`<defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2c3f66"/></pattern><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1a33"/><stop offset="1" stop-color="#060d1d"/></linearGradient><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker>${PD.join('')}</defs>`;
 return `<svg id="svg" viewBox="0 0 1400 850" xmlns="http://www.w3.org/2000/svg" font-family="'Bricolage Grotesque',system-ui,sans-serif">${defs}<rect width="1400" height="850" fill="url(#bg)"/><rect width="1400" height="850" fill="url(#dots)"/>${w}${b}${p}</svg>`;
}
