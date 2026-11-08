(function(){
  var d=document,h=d.documentElement,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var btn=d.createElement('button');btn.type='button';btn.className='fl-top';btn.setAttribute('aria-label','Наверх');btn.textContent='↑';
  btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:rm?'auto':'smooth'});});
  function pad(){var n=d.querySelector('.fl-nav');if(n&&n.parentElement){n.parentElement.style.paddingTop=n.offsetHeight+'px';}}
  function upd(){var y=window.scrollY||h.scrollTop||0;h.classList.toggle('fl-scrolled',y>40);btn.classList.toggle('on',y>700);}
  var io=null,seen=new WeakSet(),EZ='cubic-bezier(.2,.6,.2,1)';
  if(!rm&&'IntersectionObserver' in window&&Element.prototype.animate){io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);e.target.animate([{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'none'}],{duration:900,easing:EZ,fill:'backwards'});}});},{threshold:0,rootMargin:'0px 0px -4% 0px'});}
  function mark(){if(!io)return;var vh=innerHeight;d.querySelectorAll('section, footer').forEach(function(s){if(seen.has(s))return;seen.add(s);var r=s.getBoundingClientRect();if(r.top<vh*0.96)return;io.observe(s);});}
  function init(){if(!btn.isConnected)d.body.appendChild(btn);pad();upd();mark();}
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',pad);
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',function(){init();setTimeout(init,600);});
  if('MutationObserver' in window){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){pad();mark();},120);}).observe(d.documentElement,{childList:true,subtree:true});}
})();
