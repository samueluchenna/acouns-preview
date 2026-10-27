document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',function(){
 var b=document.getElementById('moreBtn'),r=document.getElementById('revs');
 if(b&&r)b.addEventListener('click',function(){var o=r.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Show fewer reviews':b.getAttribute('data-more')});
 var H={0:null,1:[8,17],2:[8,17],3:[8,17],4:[8,17],5:[8,17],6:[9,17]};
 var el=document.getElementById('open');
 if(el){var now=new Date(Date.now()+3600000),d=now.getUTCDay(),h=now.getUTCHours()+now.getUTCMinutes()/60,t=H[d],tx=document.getElementById('openText');
  if(t&&h>=t[0]&&h<t[1]){tx.textContent='Open now, until 5pm today'}
  else{el.classList.add('shut');var n=(t&&h<t[0])?(d===6?'9am today':'8am today'):(d===5?'9am on Saturday':(d===6?'8am on Monday':(d===0?'8am on Monday':'8am tomorrow')));tx.textContent='Closed now, opens '+n}}
 var media=document.getElementById('media');
 if(!media)return;
 var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var c=navigator.connection||{};
 var lite=!!(calm||c.saveData);
 var more=[{"m": "assets/img/hero-doctor-m-480.webp 480w, assets/img/hero-doctor-m-960.webp 960w, assets/img/hero-doctor-m-1200.webp 1200w", "d": "assets/img/hero-doctor-d-960.webp 960w, assets/img/hero-doctor-d-1600.webp 1600w", "src": "assets/img/hero-doctor-m-960.webp", "alt": "A doctor writing notes on a clipboard", "tag": "Health checks"}, {"m": "assets/img/hero-scan-m-480.webp 480w, assets/img/hero-scan-m-960.webp 960w, assets/img/hero-scan-m-1200.webp 1200w", "d": "assets/img/hero-scan-d-960.webp 960w, assets/img/hero-scan-d-1600.webp 1600w", "src": "assets/img/hero-scan-m-960.webp", "alt": "Printed ultrasound scan pictures", "tag": "Ultrasound scans"}];
 function start(){
  more.forEach(function(s){var f=document.createElement('figure');f.className='slide alt';f.setAttribute('data-tag',s.tag);
   f.innerHTML='<picture><source media="(min-width:900px)" srcset="'+s.d+'" sizes="100vw"><img src="'+s.src+'" srcset="'+s.m+'" sizes="100vw" width="1200" height="900" alt="'+s.alt+'"></picture>';
   media.insertBefore(f,document.getElementById('mtag'))});
  var vids=[{src:'assets/vid/lab-equipment.mp4',tag:'Our equipment',alt:'The laboratory floor with testing machines',at:1},{src:'assets/vid/microscope.mp4',tag:'Careful testing',alt:'A lab scientist looking through a microscope',at:3},{src:'assets/vid/sample-test.mp4',tag:'Sample testing',alt:'A lab scientist checking a test tube',at:5}];
  if(!lite)vids.forEach(function(v){var f=document.createElement('figure');f.className='slide vid';f.setAttribute('data-tag',v.tag);
   f.innerHTML='<video muted loop playsinline preload="auto" width="960" height="720" aria-label="'+v.alt+'"><source src="'+v.src+'" type="video/mp4"></video>';
   var all=media.querySelectorAll('.slide');media.insertBefore(f,all[v.at]||document.getElementById('mtag'))});
  var sl=media.querySelectorAll('.slide'),i=0,tag=document.getElementById('mtag'),pb=document.getElementById('pause'),run=true;
  function vid(n){return sl[n].querySelector('video')}
  function show(n){var o=vid(i);sl[i].classList.remove('on');i=n;sl[i].classList.add('on');tag.textContent=sl[i].getAttribute('data-tag');
   var v=vid(i);if(v){try{v.currentTime=0;var p=v.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
   if(o)setTimeout(function(){o.pause()},1200)}
  media.classList.add('running');
  var timer=setInterval(function(){if(run)show((i+1)%sl.length)},6000);
  media.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.pausebtn'))return;show((i+1)%sl.length);});
  var x0=null;media.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});media.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){show(dx<0?(i+1)%sl.length:(i-1+sl.length)%sl.length)}},{passive:true});
  pb.addEventListener('click',function(){run=!run;pb.setAttribute('aria-pressed',!run);pb.lastChild.textContent=run?'Pause':'Play';var v=vid(i);if(v){if(run){v.play().catch(function(){})}else{v.pause()}}});
 }
 if(document.readyState==='complete'){start()}else{window.addEventListener('load',start)}
});