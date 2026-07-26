
(function(){
 const data=(window.ROME_POI_DATA&&window.ROME_POI_DATA.pois)||[];
 const map=L.map('realMap',{zoomControl:true}).setView([41.9028,12.4964],13);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19,attribution:'&copy; OpenStreetMap contributors'
 }).addTo(map);
 const colors={attraction:'#8f3e35',food:'#c46e33',hotel:'#2f5f7e',toilet:'#6b5a90',water:'#2884a6',transport:'#3a7668',cafe:'#8d633a',gelato:'#c46b86'};
 const emoji={attraction:'🏛️',food:'🍝',hotel:'🏨',toilet:'🚻',water:'🚰',transport:'🚇',cafe:'☕',gelato:'🍦'};
 let layer=L.layerGroup().addTo(map),filter='all';
 function icon(p){
  const c=colors[p.category]||'#8f3e35',e=emoji[p.category]||'📍';
  return L.divIcon({className:'',html:`<div style="width:36px;height:36px;border-radius:13px;background:${c};display:grid;place-items:center;border:3px solid white;box-shadow:0 5px 12px rgba(0,0,0,.24);font-size:17px">${e}</div>`,iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-18]});
 }
 function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
 function draw(){
  layer.clearLayers();
  const rows=data.filter(p=>p.coordinates&&p.coordinates.lat&&p.coordinates.lon&&(filter==='all'||p.category===filter));
  rows.forEach(p=>{
   const local=p.links&&p.links.localPage?`<a href="${p.links.localPage}">Άνοιγμα σελίδας</a>`:'';
   const gm=p.links&&p.links.googleMaps?`<a target="_blank" rel="noopener" href="${p.links.googleMaps}">Google Maps</a>`:'';
   L.marker([p.coordinates.lat,p.coordinates.lon],{icon:icon(p)}).bindPopup(`<div class="map-popup"><h3>${esc(p.name)}</h3><p>${esc(p.category)}${p.day?' · '+p.day+' Ιουλίου':''}</p>${local} ${gm}</div>`).addTo(layer);
  });
 }
 document.querySelectorAll('[data-mapcat]').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('[data-mapcat]').forEach(x=>x.classList.toggle('active',x===b));filter=b.dataset.mapcat;draw();
 });
 document.querySelector('#locateBtn').onclick=()=>map.locate({setView:true,maxZoom:16});
 map.on('locationfound',e=>L.circleMarker(e.latlng,{radius:9}).addTo(map).bindPopup('Η θέση σου').openPopup());
 draw();
})();
