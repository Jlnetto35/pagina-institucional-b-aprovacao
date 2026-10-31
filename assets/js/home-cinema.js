(function(){
document.documentElement.classList.add('js');
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
var calmo=matchMedia('(prefers-reduced-motion:reduce)').matches,celular=innerWidth<=860;

/* Abertura */
var preEl=$('#pre'),pcEl=$('#pc'),t0=performance.now(),durPre=calmo?1:1300;
function abre(){preEl.classList.add('go');$('#home').classList.add('live');$$('#home .rv').forEach(function(e){e.classList.add('in')})}
(function conta(){var p=Math.min((performance.now()-t0)/durPre,1);pcEl.textContent=String(Math.round(p*100)).padStart(3,'0');if(p<1)requestAnimationFrame(conta);else setTimeout(abre,120)})();

/* Menu */
var mb=$('#mbtn'),menu=$('#menu'),nav=$('#nav');
function menuAb(a){menu.hidden=!a;mb.setAttribute('aria-expanded',a);mb.textContent=a?'Fechar':'Menu';nav.classList.toggle('open',a);if(lenis){a?lenis.stop():lenis.start()}}
mb.addEventListener('click',function(){menuAb(menu.hidden)});
addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)menuAb(false)});
menu.addEventListener('click',function(e){if(e.target.closest('a'))menuAb(false)});

/* Revelações */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -7% 0px'});
$$('.rv').forEach(function(e){if(!e.closest('#home'))io.observe(e)});

/* Manifesto palavra a palavra */
var m=$('#mtxt'),douradas=/^(securitizar|estruturar|conectar|capital)$/;
m.innerHTML=m.textContent.split(' ').map(function(w){return '<span class="'+(douradas.test(w)?'au':'')+'">'+w+'</span>'}).join(' ');
var words=$$('#mtxt span');

/* Fitas do portfólio */
var nomes=['Home Equity','CGI','HomeCash','Sale Leaseback','CRI','FIDC','FINIMP','ACC','ACE','CPR Agro','Cash Collateral','Exporte-se','M&A','Câmbio Pronto','Fundo Construção'];
function fita(a){var s=a.map(function(n){return n.replace('&','&amp;')+'<i>◆</i>'}).join('');return s+s+s}
$('#t1').innerHTML=fita(nomes);$('#t2').innerHTML=fita(nomes.slice().reverse());

/* Curva da rolagem */
(function(){var y=24,d='M0 '+y,seed=7;for(var i=1;i<=60;i++){seed=(seed*9301+49297)%233280;y=Math.max(2,y-.38+(seed/233280-.5)*3.2);d+=' L'+(i/60*1000).toFixed(0)+' '+y.toFixed(1)}$('#sb').setAttribute('d',d);$('#sf').setAttribute('d',d)})();

/* Mapa rolagem -> foto: cada seção abre sua foto ao entrar na tela */
var plEl=$$('.plate'),secs=$$('[data-ph]'),caps=secs.map(function(s){return s.dataset.cap}),stops=[],H=1,vh=innerHeight,FOTOS=window.V3_FOTOS||[];
function topo(e){return e.getBoundingClientRect().top+scrollY}
function mede(){
  vh=innerHeight;celular=innerWidth<=860;H=Math.max(1,document.documentElement.scrollHeight-vh);stops=[{y:0,s:0}];
  var v=$('#verticais'),tv=topo(v),hv=v.offsetHeight-vh;
  secs.forEach(function(el,k){if(!k)return;var y1;
    if(!celular&&el.classList.contains('panel')){var i=secs.filter(function(e){return e.classList.contains('panel')}).indexOf(el);
      if(i>0){y1=tv+hv*(i/3);stops.push({y:y1-hv/3*.72,s:k-1});stops.push({y:y1-hv/3*.08,s:k});return}y1=tv}
    else y1=topo(el)-vh*.1;
    stops.push({y:y1-vh*.8,s:k-1});stops.push({y:y1,s:k})});
  for(var j=1;j<stops.length;j++)if(stops[j].y<stops[j-1].y)stops[j].y=stops[j-1].y+1;
}
function ss(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x)}
function cenaEm(y){
  for(var i=0;i<stops.length-1;i++){var a=stops[i],b=stops[i+1];if(y<=b.y)return a.s===b.s?a.s:a.s+(b.s-a.s)*Math.max(0,Math.min(1,(y-a.y)/Math.max(1,b.y-a.y)))}
  return stops[stops.length-1].s;
}
function fotoDe(k){var e=plEl[k];if(e&&!e.dataset.ok&&FOTOS[k]){e.style.backgroundImage='url("'+FOTOS[k]+'")';e.dataset.ok=1}}
function placas(sc){
  var a=Math.min(Math.floor(sc),plEl.length-1),b=Math.min(a+1,plEl.length-1),f=Math.min(Math.max(sc-a,0),1);
  fotoDe(a);fotoDe(b);fotoDe(Math.min(b+1,plEl.length-1));
  plEl.forEach(function(e,k){var on=k===a||k===b;e.style.visibility=on?'visible':'hidden';e.style.zIndex=k===b&&b!==a?2:1;if(!on)e.style.clipPath='none'});
  plEl[a].style.clipPath='none';
  if(!calmo)plEl[a].style.transform='scale('+(1.02+.1*(1-f)).toFixed(4)+') translate3d(0,'+(-f*2).toFixed(2)+'%,0)';
  if(b!==a){plEl[b].style.clipPath='circle('+(ss(.02,.98,f)*125).toFixed(1)+'% at 50% 50%)';if(!calmo)plEl[b].style.transform='scale('+(1.18-.06*f).toFixed(4)+') translate3d(0,'+((1-f)*2).toFixed(2)+'%,0)'}
}

/* Rolagem suave */
var lenis=null;
if(!calmo&&!celular&&window.Lenis){lenis=new Lenis({lerp:.085,wheelMultiplier:.9});$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(ev){var alvo=$(a.getAttribute('href'));if(!alvo)return;ev.preventDefault();menuAb(false);lenis.scrollTo(alvo,{duration:2,offset:-80})})})}

/* Laço único */
var sceneNow=0,railEl=$('#rail'),vert=$('#verticais'),man=$('#manifesto'),barT=$('.bar.t'),barB=$('.bar.b'),t1=$('#t1'),t2=$('#t2'),port=$('#portfolio'),sf=$('#sf'),cap=$('#cap'),lastCap=-1;
function prog(el){var r=el.getBoundingClientRect(),h=el.offsetHeight-vh;return h<=0?0:Math.max(0,Math.min(1,-r.top/h))}
function loop(now){
  if(lenis)lenis.raf(now);
  var y=scrollY,alvo=cenaEm(y);
  sceneNow=calmo?alvo:sceneNow+(alvo-sceneNow)*.11;
  placas(sceneNow);
  var b=Math.min(y/(vh*.5),1);barT.style.transform='translateY('+(-b*100)+'%)';barB.style.transform='translateY('+(b*100)+'%)';
  nav.classList.toggle('on',y>vh*.5);
  sf.setAttribute('stroke-dashoffset',(1-y/H).toFixed(4));
  var ci=Math.round(sceneNow);if(ci!==lastCap){cap.textContent=caps[ci]||'';lastCap=ci}
  var lit=Math.floor(ss(.05,.9,prog(man))*words.length+.0001);for(var i=0;i<words.length;i++)words[i].classList.toggle('on',i<lit);
  if(!celular)railEl.style.transform='translate3d('+(-prog(vert)*75)+'%,0,0)';
  var pr=port.getBoundingClientRect();if(pr.top<vh&&pr.bottom>0&&!calmo){var off=(vh-pr.top)*.26;t1.style.transform='translate3d('+(-off)+'px,0,0)';t2.style.transform='translate3d('+(off-900)+'px,0,0)'}
  requestAnimationFrame(loop);
}
mede();addEventListener('resize',mede);addEventListener('load',mede);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(mede);
$$('details').forEach(function(d){d.addEventListener('toggle',function(){setTimeout(mede,60)})});
if(location.hash){var ini=$(location.hash);if(ini)setTimeout(function(){ini.scrollIntoView();mede()},60)}
requestAnimationFrame(loop);
})();
