
(function(){
 const root=()=>/\/(?:attractions|chapters)\//.test(location.pathname)?'../':'';
 const current=()=>{const f=(location.pathname.split('/').pop()||'index.html').toLowerCase();if(f==='map.html')return'map';if(f==='walk.html'||/^(27|28|29|30)\.html$/.test(f))return'days';if(f==='restaurants.html')return'food';if(f==='practical.html'||f==='practical-verified.html'||f==='shopping.html'||f==='pois.html'||f==='library.html')return'more';return'home'};
 function nav(){
  if(document.querySelector('.v4-bottom-nav'))return;
  const r=root(),c=current();
  document.body.insertAdjacentHTML('beforeend',`<nav class="v4-bottom-nav">
   <a class="${c==='home'?'active':''}" href="${r}index.html"><span>⌂</span>Αρχική</a>
   <a class="${c==='days'?'active':''}" href="${r}walk.html"><span>🚶</span>Διαδρομή</a>
   <a class="${c==='map'?'active':''}" href="${r}map.html"><span>🗺️</span>Χάρτης</a>
   <a class="${c==='food'?'active':''}" href="${r}restaurants.html"><span>🍝</span>Φαγητό</a>
   <a class="${c==='more'?'active':''}" href="${r}practical-verified.html"><span>⋯</span>Χρήσιμα</a>
  </nav>`);
 }
 function pwa(){
  if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register(root()+'sw.js').catch(()=>{});
  let deferred;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;showInstall()});
  function showInstall(){
   if(document.querySelector('.v4-install')||sessionStorage.getItem('installDismissed'))return;
   document.body.insertAdjacentHTML('beforeend',`<div class="v4-install show"><img src="${root()}assets/icons/icon-192.png"><div><h4>Εγκατάσταση Roma 2026</h4><p>Άνοιγμα σαν κανονική εφαρμογή και χρήση offline.</p></div><button class="install">Εγκατάσταση</button><button class="close">×</button></div>`);
   const box=document.querySelector('.v4-install');
   box.querySelector('.close').onclick=()=>{box.remove();sessionStorage.setItem('installDismissed','1')};
   box.querySelector('.install').onclick=async()=>{if(deferred){deferred.prompt();await deferred.userChoice;deferred=null;box.remove()}else alert('Στο iPhone: Safari → Κοινοποίηση → Προσθήκη στην οθόνη Αφετηρίας.')};
  }
  if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!navigator.standalone)setTimeout(showInstall,1800);
 }
 document.addEventListener('DOMContentLoaded',()=>{nav();pwa()});
})();
