const CACHE='roma-2026-final-v4-1';
const CORE=["./", "./index.html", "./walk.html", "./map.html", "./practical-verified.html", "./restaurants.html", "./assets/app-v2.css", "./assets/app-v2.js", "./assets/app-v21.css", "./assets/app-v21.js", "./assets/app-v4.css", "./assets/app-v4.js", "./assets/map-v4.js", "./assets/portable-data.js", "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./manifest.webmanifest"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.origin!==location.origin)return;
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(res=>{
   const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;
 }).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):undefined)));
});
