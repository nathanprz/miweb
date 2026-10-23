const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const links=$('links'),dd=$('dd');
$('burger').onclick=()=>links.classList.toggle('open');
$('ddb').onclick=e=>{e.stopPropagation();dd.classList.toggle('open')};
document.addEventListener('click',()=>dd.classList.remove('open'));
links.addEventListener('click',e=>{if(e.target.tagName==='A')links.classList.remove('open')});

// Frases del inicio (cámbialas)
const fr=['Visionario','Respetuoso','Le gusta la literatura feminista','Voz grave','Escucha Taylor Swift','Pro derechos de las mujeres'];
let fi=0,ci=0,del=false;const t=$('typing');
(function type(){const f=fr[fi];t.textContent=f.slice(0,ci);
  if(!del&&ci++===f.length){del=true;return setTimeout(type,1600)}
  if(del&&--ci<0){del=false;ci=0;fi=(fi+1)%fr.length}setTimeout(type,del?25:65)})();

// Carrusel infinito: cada clic pasa a la siguiente foto
const fotos=Array.from({length:9},(_,i)=>`img/foto${i+1}.jpg`); // foto1 a foto9, en ese orden
const sl=$('slides'),dots=$('dots');let cur=0;
fotos.forEach((f,i)=>{sl.insertAdjacentHTML('beforeend',`<div class="sl"><img alt="Foto ${i+1} de Nathan" src="${f}"></div>`);dots.insertAdjacentHTML('beforeend','<i></i>')});
function go(n){const s=sl.children,d=dots.children;
  [...s].forEach(x=>x.classList.remove('out'));s[cur].classList.remove('on');s[cur].classList.add('out');d[cur].classList.remove('on');
  cur=(n+s.length)%s.length;s[cur].classList.add('on');d[cur].classList.add('on')}
go(0);$('stack').onclick=()=>go(cur+1);

// Regla de altura y cinta de cine
const rl=$('ruler');for(let i=0;i<=10;i++){const s=document.createElement('span');s.textContent=200-i*10;s.style.top=(i*9.5)+'%';rl.appendChild(s)}
const tr=$('track');tr.innerHTML+=tr.innerHTML;

// Lista de compras
const IC={
 ok:'<svg class="ic" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#172A46"/><path d="M8 15l5 5 9-10" fill="none" stroke="#D6A56D" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 no:'<svg class="ic" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#B9D8E8"/><path d="M10 10l10 10M20 10L10 20" stroke="#172A46" stroke-width="3.5" stroke-linecap="round"/></svg>',
 mid:'<svg class="ic" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#B9D8E8"/><path d="M15 1a14 14 0 0 1 0 28z" fill="#172A46"/></svg>'};
const feats=[['Detallista','ok'],['Nerd','ok'],['Caballeroso','ok'],['Con huevos','ok'],['Celoso','mid'],['Tóxico','no']];
const serv=['Tomo buenas fotos para tu Instagram','Cargo tu bolsa y tu chamarra','Escucho Taylor Swift contigo, álbum completo','Te leo en voz grave','Cocino chilaquiles cuando quieras','Resuelvo lo que se descomponga','Te aviso cuando llegue y te pregunto si llegaste bien'];
const row=(x,k,i)=>`<li style="--d:${i*.07}s">${IC[k]}<span>${x}</span>${k==='mid'?'<em>50/50</em>':''}</li>`;
$('cartBody').innerHTML=`<h4>Características</h4><ul>${feats.map((f,i)=>row(f[0],f[1],i)).join('')}</ul><h4>Servicios incluidos</h4><ul>${serv.map((s,i)=>row(s,'ok',i+feats.length)).join('')}</ul><div class="tot"><span>Costo total</span><b>Tú</b></div>`;

// Reseñas (167): las de pocas estrellas se quejan de que Nathan es demasiado respetuoso
const S1=['Siempre llega a tiempo y escucha de verdad.','Me tomó fotos para mi Instagram y quedé como modelo.','Los chilaquiles que cocina son un 10 de 10.','Muy respetuoso, cero comentarios fuera de lugar.','Me hizo reír toda la tarde.','Caballeroso sin ser exagerado.','Me prestó su chamarra y cargó mi bolsa.','Me arregló la computadora en la primera cita.','Detallista: se acordó de todo lo que le conté.','Muy creativo con los planes, nada de cines aburridos.','Me recomendó un libro de literatura feminista y ya lo había leído.','Súper atento, siempre pregunta cómo estás.','Me avisó que llegó bien y me preguntó si yo también.','Buen conversador, se me pasó el tiempo volando.','Respeta tus decisiones y tus tiempos.','Sabe de tecnología y lo explica sin hacerte sentir menos.','Me hizo un truco de magia y quedé impresionada.','Habla de sus metas con muchas ganas, se nota que es visionario.','Jugamos básquet y me dejó ganar (creo).','Defendió una opinión feminista en la mesa sin que yo se lo pidiera.','Muy amable con todos, hasta con el mesero.','Cero toxicidad, cero dramas.','Me trató como igual, así de simple.','Me escuchó con atención cuando tuve un mal día.','Me preguntó cómo quería que me tratara en lugar de asumirlo.'];
const S2=['Lo recomiendo al 100%.','Producto de primera.','Lo volvería a pedir sin dudarlo.','Compraría otra vez.','Garantía de buena cita.','Ojalá hubiera más como él.','Se ganó mi confianza rápido.','Una excelente persona, de verdad.','Volvería a salir con él mañana.','Mis amigas ya me preguntan por él.','Mi mamá también lo aprobaría.','Entrega rápida de buenas vibras.','De lo mejor que me ha pasado.','Lo que ves en su página es lo que hay.'];
const C4=['Le falta ganar en el baile.','Habla mucho de programación, pero con pasión.','Tarda en responder cuando está programando.','Sus chistes necesitan mejorar.','Todavía no habla inglés.','Me ganó en básquet.','Se emociona de más hablando de computación.','Se distrae con el celular a veces.','Come más chilaquiles que yo.','Siempre quiere elegir la música.'];
const LOW=["No me gustó la experiencia porque a mí me gusta que me traten mal y él fue muy amable.", "Mi tipo es el que no responde mensajes. Este contestó en cinco minutos.", "Me abrió la puerta, me jaló la silla y me preguntó cómo estaba. Yo buscaba drama.", "Cero red flags. Revisé todo y no encontré ninguna, así que no es para mí.", "Llegó puntual. A mí me gusta esperar una hora y sentirme ignorada.", "Me escuchó sin interrumpirme ni una vez. No estoy acostumbrada y no me gustó.", "Me trató con respeto desde el primer minuto. Yo vengo de otra escuela.", "Me dijo que lo que yo decidiera estaba bien. Yo quería pelear por el restaurante.", "Muy atento, muy amable, muy detallista. Obviamente no es mi tipo.", "Me preguntó si estaba cómoda. Qué persona tan considerada, así no me emociono.", "No me dejó pagar y tampoco me lo echó en cara. Esto no es lo que yo conocía.", "Se acordó de mi cumpleaños. Mis ex nunca, así que me sentí fuera de lugar.", "Demasiado caballeroso, no tuve de qué quejarme.", "Me cuidó tanto durante la cita que me quedé sin emoción. Dos estrellas por los chilaquiles.", "Muy respetuoso, pero yo estoy acostumbrada a que me traten mal y me costó adaptarme.", "Me hizo reír, me escuchó y no me dejó sola ni un segundo. Dos estrellas por falta de drama.", "Cocinó rico, pero extrañé que me dejaran esperando.", "Demasiado amable para mi gusto, pero reconozco que cocina rico.", "Me tomó fotos hermosas, pero ni una queja de cómo salí. Falta de drama.", "Con él todo fue tan tranquilo que mi ansiedad no supo qué hacer.", "Buena cita, pero tanta amabilidad me desacostumbra a lo mío.", "Todo bien, pero me faltó un poquito de maltrato para sentirme en casa.", "Muy lindo detalle recordar lo que me gusta, aunque yo prefiero que se les olvide.", "Buen conversador, pero demasiado respetuoso para mi costumbre.", "Me hizo sentir segura. Tres estrellas porque yo vivo para el caos.", "Me arregló la computadora en la cita. Qué raro que alguien ayude sin pedir nada a cambio.", "Puntual, atento y sin juegos. Yo vivo para los juegos mentales, por eso tres estrellas.", "Me trató como igual. Interesante experiencia, pero me falta el hábito.", "Le sobra educación y le falta mala actitud, según mi experiencia anterior.", "Simpático y muy respetuoso. Para mí fue demasiado bien."];
const items=[];
for(let i=0;i<112;i++)items.push([5,S1[i%25]+' '+S2[(i*3)%14]]);
for(let i=0;i<25;i++)items.push([4,C4[i%10]+' '+S2[(i*5+1)%14]]);
LOW.forEach((t,i)=>items.push([i<12?1:i<20?2:3,t]));
const R=items.map((_,i)=>items[(i*37+11)%items.length]);
const NM=['Andrea','Sofía','Valeria','Camila','Daniela','Fernanda','Mariana','Paola','Regina','Ximena','Karen','Jimena','Renata','Luisa','Alejandra','Ivanna','Mónica','Natalia','Brenda','Citlali','Dulce','Frida','Ariadna','Lupita','Itzel','Nayeli','Montserrat','Abril','Miranda'];
const RO=['Amiga','Compañera de clase','Prima','Vecina','Compañera de trabajo','Cita anterior','Amiga de un amigo','Conocida de un viaje'];
$('revbox').innerHTML=R.map((r,i)=>{const n=NM[i%29]+' '+'ABCDEFGHIJKLMNOPRSTV'[i%20]+'.';
 return `<div class="review"><div class="who"><span class="av">${n[0]}</span><div>${n}<small>${RO[(i*3)%8]}</small></div><span class="stars" style="margin-left:auto">${'★'.repeat(r[0])+'☆'.repeat(5-r[0])}</span></div><p>“${r[1]}”</p></div>`}).join('');
const avg=R.reduce((a,r)=>a+r[0],0)/R.length;
$('avg').textContent=avg.toFixed(1);$('avgStars').textContent='★'.repeat(Math.round(avg))+'☆'.repeat(5-Math.round(avg));$('cnt').textContent=R.length+' reseñas';
$('dist').innerHTML=[5,4,3,2,1].map(s=>{const c=R.filter(r=>r[0]===s).length;return `<div>${s}★ <i style="width:${c/R.length*160}px"></i> ${c}</div>`}).join('');

// Metas
const metas=[['Big Tech','Quiero trabajar en las empresas tecnológicas más grandes del mundo, construir productos que usen millones de personas y aprender de los mejores.'],['Mi empresa','Quiero crear mi propia empresa desarrolladora de software, con un equipo que disfrute lo que hace y productos que resuelvan problemas reales.'],['Familia','Quiero formar una familia, con alguien que me elija y a quien yo elija todos los días.'],['Viajar','Quiero recorrer todo México y conocer España, Roma y Japón.'],['Hackatones','Quiero participar en hackatones, construir rápido y aprender de otros equipos.'],['Contenido','Quiero crear contenido para compartir lo que aprendo y lo que vivo.']];
const tt=$('tabtxt'),tabs=$('tabs');
tabs.innerHTML=metas.map((m,i)=>`<button class="${i?'':'on'}" data-t="${i}">${m[0]}</button>`).join('');tt.textContent=metas[0][1];
tabs.onclick=e=>{const b=e.target.closest('button');if(!b)return;tabs.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');tt.textContent=metas[b.dataset.t][1]};

// Música (cambia los nombres por tus artistas)
const arts=['Natanael Cano','Junior H','Bad Bunny','Daddy Yankee','J Balvin','Karol G','Feid','Ozuna','Rauw Alejandro','Anuel AA','Don Omar','Wisin y Yandel','Maluma','Myke Towers'];
$('names').innerHTML=arts.map(a=>`<span class="name">${a}</span>`).join('')+'<span class="name star">José José</span>';
$('eq').innerHTML=Array.from({length:22},()=>`<i style="animation-duration:${(.5+Math.random()).toFixed(2)}s;animation-delay:-${Math.random().toFixed(2)}s"></i>`).join('');

// Chilaquiles: los totopos forman un corazón
const N=26,heart=[];for(let i=0;i<N;i++){const a=Math.PI+i/N*2*Math.PI;
  const x=16*Math.sin(a)**3,y=13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a);heart.push([50+x*2.1,50-(y+2.5)*2.1])}
let n=0;const plate=$('plate'),sv=$('serve');
sv.onclick=()=>{
  if(n>=N){plate.innerHTML='';plate.classList.remove('done');n=0}
  const p=heart[n];plate.insertAdjacentHTML('beforeend',`<img class="chip" alt="" src="img/totopo.png" style="left:${p[0]}%;top:${p[1]}%;--r:${Math.round(Math.random()*80-40)}deg">`);
  n++;$('count').textContent=n<N?`Totopos servidos: ${n} de ${N}`:'Corazón de chilaquiles completo.';
  if(n===N){plate.classList.add('done');sv.textContent='Servir otro'}else sv.textContent='Servir chilaquiles'};

// Compatibilidad + compilación
const prof=`const nathan = {
  edad: 20,
  estudia: "Ingeniería en Computación",
  signo: "Libra",
  gustos: ["fotografía", "magia", "básquetbol"],
  respeto: Infinity
};`;
let started=false;
async function typeCode(){if(started)return;started=true;for(let i=0;i<=prof.length;i++){$('code').textContent=prof.slice(0,i);await sleep(35)}}
new IntersectionObserver((x,o)=>{if(x[0].isIntersecting){typeCode();o.disconnect()}},{threshold:.3}).observe($('code'));
$('go').onclick=async()=>{
  const name=$('nm').value.trim();if(!name){$('nm').focus();return}
  const go=$('go'),out=$('out');go.disabled=true;out.textContent='';$('verdict').textContent='';$('pct').textContent='0%';$('pair').textContent='NATHAN + '+name.toUpperCase();
  for(const l of ['> compilando perfil de '+name+'...','> comparando gustos ........ ok','> comparando valores ....... ok','> comparando humor ......... ok','> errores: 0   advertencias: 0','> compatibilidad = 100%']){out.textContent+=l+'\n';await sleep(600)}
  for(let i=0;i<=100;i+=2){$('pct').textContent=i+'%';await sleep(18)}
  $('verdict').textContent='Compilado sin errores. Los astros de Libra lo confirman.';go.disabled=false};

// Ruleta: siempre cae en SÍ
const wg=$('wg'),K=8,pt=(a,r)=>[150+r*Math.sin(a*Math.PI/180),150-r*Math.cos(a*Math.PI/180)];
for(let k=0;k<K;k++){const p0=pt(k*45,140),p1=pt(k*45+45,140),yes=k%2===0;
  wg.insertAdjacentHTML('beforeend',`<path d="M150 150L${p0[0]} ${p0[1]}A140 140 0 0 1 ${p1[0]} ${p1[1]}Z" fill="${yes?'#D6A56D':'#507CA5'}" stroke="#F7FAFC" stroke-width="2"/><text x="150" y="68" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="700" font-size="22" fill="${yes?'#172A46':'#F7FAFC'}" transform="rotate(${k*45+22.5} 150 150)">${yes?'SÍ':'NO'}</text>`)}
let rot=0,spinning=false;
$('spin').onclick=()=>{if(spinning)return;spinning=true;$('res').textContent='';
  const a=2*(Math.random()*4|0)*45+22.5+(Math.random()*20-10),base=rot+1800,d=(360-((base+a)%360))%360;
  rot=base+d;wg.style.transform=`rotate(${rot}deg)`;
  setTimeout(()=>{spinning=false;$('res').textContent='SÍ. Mándame mensaje.';$('igBtn').style.display='inline-block'},4700)};

// Entrada progresiva al bajar
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.classList.add('in');
  el.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');
  if(el.classList.contains('meter'))el.querySelector('.mark').classList.add('in');io.unobserve(el)}}),{threshold:.2});
document.querySelectorAll('.l,.r,.u').forEach(el=>io.observe(el));
