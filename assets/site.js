document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',function(){
 var b=document.getElementById('moreBtn'),r=document.getElementById('revs');
 if(b&&r)b.addEventListener('click',function(){var o=r.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?'Show fewer reviews':b.getAttribute('data-more')});
 var H={0:null,1:[8,17],2:[8,17],3:[8,17],4:[8,17],5:[8,17],6:[9,17]};
 var el=document.getElementById('open');
 if(el){var now=new Date(Date.now()+3600000),d=now.getUTCDay(),h=now.getUTCHours()+now.getUTCMinutes()/60,t=H[d],tx=document.getElementById('openText');
  if(t&&h>=t[0]&&h<t[1]){tx.textContent='Open now, until 5pm today'}
  else{el.classList.add('shut');var n=(t&&h<t[0])?(d===6?'9am today':'8am today'):(d===5?'9am on Saturday':(d===6?'8am on Monday':(d===0?'8am on Monday':'8am tomorrow')));tx.textContent='Closed now, opens '+n}}
 var fm=document.getElementById('form'),bl=document.getElementById('barlink');
 if(fm&&bl){var bx=fm.querySelectorAll('input[type=checkbox]'),bt=document.getElementById('barlabel'),b0=bl.getAttribute('href'),t0=bt.textContent;
  function upd(){var q=[].filter.call(bx,function(b){return b.checked}).map(function(b){return b.getAttribute('data-q')});
   if(!q.length){bl.setAttribute('href',b0);bt.textContent=t0;return}
   var l=q.length>1?q.slice(0,-1).join(', ')+' and '+q[q.length-1]:q[0];
   bl.setAttribute('href','https://wa.me/'+bl.getAttribute('data-wa')+'?text='+encodeURIComponent('Hello Acouns, please what is the price of '+l+'?'));
   bt.textContent='Ask the price for '+q.length+(q.length===1?' test':' tests')}
  [].forEach.call(bx,function(b){b.addEventListener('change',upd)});upd()}
 var media=document.getElementById('media');
 if(!media)return;
 var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var c=navigator.connection||{},errs=[],dbg=null;
 if(/[?&]debug=1/.test(location.search)){window.addEventListener('error',function(e){errs.push(e.message)});dbg=document.createElement('pre');dbg.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99;margin:0;padding:8px;background:rgba(0,0,0,.88);color:#9f9;font:11px/1.35 monospace;white-space:pre-wrap;max-height:45vh;overflow:auto';dbg.textContent='debug: waiting for page load';document.body.appendChild(dbg)}
 var more=[{"m": "assets/img/hero-lab-p-480.webp 480w, assets/img/hero-lab-p-800.webp 800w", "d": "assets/img/hero-lab-d-960.webp 960w, assets/img/hero-lab-d-1600.webp 1600w", "src": "assets/img/hero-lab-p-480.webp", "alt": "A lab scientist checking samples at a microscope", "tag": "Lab tests"}, {"m": "assets/img/hero-scan-p-480.webp 480w, assets/img/hero-scan-p-640.webp 640w", "d": "assets/img/hero-scan-d-960.webp 960w, assets/img/hero-scan-d-1600.webp 1600w", "src": "assets/img/hero-scan-p-480.webp", "alt": "Printed ultrasound scan pictures", "tag": "Ultrasound scans"}];
 function start(){
  more.forEach(function(s){var f=document.createElement('figure');f.className='slide alt';f.setAttribute('data-tag',s.tag);
   f.innerHTML='<picture><source media="(min-width:900px)" srcset="'+s.d+'" sizes="100vw"><img src="'+s.src+'" srcset="'+s.m+'" sizes="100vw" width="1200" height="900" alt="'+s.alt+'"></picture>';
   media.insertBefore(f,document.getElementById('mtag'))});
  var vids=[{src:'assets/vid/lab-equipment.mp4',poster:'assets/img/poster-lab-equipment.webp',tag:'Our equipment',alt:'The laboratory floor with testing machines',at:1},{src:'assets/vid/microscope.mp4',poster:'assets/img/poster-microscope.webp',tag:'Careful testing',alt:'A lab scientist looking through a microscope',at:3},{src:'assets/vid/sample-test.mp4',poster:'assets/img/poster-sample-test.webp',tag:'Sample testing',alt:'A lab scientist checking a test tube',at:5}];
  vids.forEach(function(v){var f=document.createElement('figure');f.className='slide vid';f.setAttribute('data-tag',v.tag);
   f.innerHTML='<video muted loop playsinline preload="'+(c.saveData?'metadata':'auto')+'" poster="'+v.poster+'" width="960" height="720" aria-label="'+v.alt+'"><source src="'+v.src+'" type="video/mp4"></video>';
   var e=f.firstChild;e.muted=true;e.defaultMuted=true;e.playsInline=true;e.setAttribute('webkit-playsinline','');
   var all=media.querySelectorAll('.slide');media.insertBefore(f,all[v.at]||document.getElementById('mtag'))});
  var sl=media.querySelectorAll('.slide'),i=0,tag=document.getElementById('mtag'),pb=document.getElementById('pause'),run=true;
  function vid(n){return sl[n].querySelector('video')}
  function go(v){if(!v||!run)return;try{var p=v.play();if(p&&p.catch)p.catch(function(e){v.pe=e&&e.name})}catch(e){v.pe='throw'}}
  function show(n){var o=vid(i);sl[i].classList.remove('on');i=n;sl[i].classList.add('on');tag.textContent=sl[i].getAttribute('data-tag');
   var v=vid(i);if(v){try{v.currentTime=0}catch(e){}go(v)}
   if(o)setTimeout(function(){if(o!==vid(i))o.pause()},1200)}
  [].forEach.call(media.querySelectorAll('video'),function(v){v.addEventListener('canplay',function(){if(vid(i)===v)go(v)})});
  ['touchend','click','keydown'].forEach(function(t){document.addEventListener(t,function(){go(vid(i))},{passive:true})});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)go(vid(i))});
  media.classList.add('running');
  var timer=setInterval(function(){if(run)show((i+1)%sl.length)},6000);
  media.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.pausebtn'))return;show((i+1)%sl.length);});
  var x0=null;media.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});media.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40){show(dx<0?(i+1)%sl.length:(i-1+sl.length)%sl.length)}},{passive:true});
  pb.addEventListener('click',function(){run=!run;pb.setAttribute('aria-pressed',!run);pb.lastChild.textContent=run?'Pause':'Play';var v=vid(i);if(v){if(run){go(v)}else{v.pause()}}});
  if(dbg){var dump=function(){var vs=media.querySelectorAll('video');dbg.textContent=['calm='+calm,'saveData='+!!c.saveData,'net='+c.effectiveType,'h264='+document.createElement('video').canPlayType('video/mp4; codecs="avc1.64001F"'),'slides='+sl.length+' videos='+vs.length+' on='+i+' run='+run,'errors='+errs.join('|')].concat([].map.call(vs,function(v,k){return 'v'+k+' rs='+v.readyState+' net='+v.networkState+' paused='+v.paused+' t='+v.currentTime.toFixed(1)+' err='+(v.error?v.error.code:'-')+' play='+(v.pe||'-')})).join('\n')};dump();setInterval(dump,1000)}
 }
 function ready(){if(document.documentElement.classList.contains('intro')){window.addEventListener('introdone',start,{once:true})}else{start()}}
 if(document.readyState==='complete'){ready()}else{window.addEventListener('load',ready)}
});