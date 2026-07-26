
const DataStore={
  data:null,
  async load(){
    if(!this.data)this.data=window.ROME_GUIDE_DATA||{points:[],routes:[],days:{}};
    return this.data;
  }
};
function cleanName(n){return (n||"").replace(/^\d+\.\s*/,"")}
function categoryEmoji(c){return c==="hotel"?"🏨":c==="food"?"🍝":"🏛️"}
function haversine(a,b){
 const R=6371000,p=Math.PI/180,d1=(b.lat-a.lat)*p,d2=(b.lon-a.lon)*p;
 const x=Math.sin(d1/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(d2/2)**2;
 return 2*R*Math.asin(Math.sqrt(x));
}
const RomeMap={
 async init(){
  const data=await DataStore.load(),pts=data.points||[];
  const svg=document.querySelector("#mapSvg"),list=document.querySelector("#mapList");
  if(!svg||!list||!pts.length)return;
  const minLat=Math.min(...pts.map(p=>p.lat)),maxLat=Math.max(...pts.map(p=>p.lat));
  const minLon=Math.min(...pts.map(p=>p.lon)),maxLon=Math.max(...pts.map(p=>p.lon));
  const project=p=>({x:55+(p.lon-minLon)/(maxLon-minLon)*890,y:710-(p.lat-minLat)/(maxLat-minLat)*660});
  const draw=(filter="all")=>{
    const shown=pts.filter(p=>filter==="all"||p.category===filter);
    let s=`<defs><filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity=".25"/></filter></defs>
    <path d="M0 470 C190 420 280 520 465 462 S760 350 1000 390" fill="none" stroke="#88a9bf" stroke-width="24" opacity=".68"/>
    <text x="735" y="345" font-size="24" fill="#557b93">Tevere</text>`;
    (data.routes||[]).forEach(r=>{
      if(!r.coords?.length)return;
      const d=r.coords.map((p,j)=>`${j?"L":"M"}${project(p).x.toFixed(1)},${project(p).y.toFixed(1)}`).join(" ");
      s+=`<path d="${d}" fill="none" stroke="rgba(155,63,49,.28)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    });
    shown.forEach(p=>{
      const q=project(p),e=categoryEmoji(p.category);
      s+=`<g class="map-pin" filter="url(#shadow)"><circle cx="${q.x}" cy="${q.y}" r="18" fill="${p.category==="hotel"?"#284e70":p.category==="food"?"#d0782d":"#9b3f31"}"/><text x="${q.x}" y="${q.y+7}" text-anchor="middle" font-size="18">${e}</text></g>`;
    });
    svg.innerHTML=s;
    list.innerHTML=shown.map(p=>`<div class="map-place"><div>${categoryEmoji(p.category)}</div><div><b>${cleanName(p.name)}</b><small>${p.day?`${p.day} Ιουλίου`:"Χρήσιμο σημείο"}</small></div><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}">Χάρτης</a></div>`).join("");
  };
  document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{
    document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");draw(b.dataset.filter);
  });
  draw();
 }
};
const WalkingMode={
 day:27,index:0,data:null,
 async init(){
   this.data=await DataStore.load();
   try{const saved=JSON.parse(localStorage.getItem("romeWalk")||"{}");this.day=saved.day||27;this.index=saved.index||0}catch(e){}
   document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{this.day=+b.dataset.day;this.index=0;this.render()});
   document.querySelector("#prevStop").onclick=()=>{this.index=Math.max(0,this.index-1);this.render()};
   document.querySelector("#nextStop").onclick=()=>{this.index=Math.min(this.stops().length-1,this.index+1);this.render()};
   document.querySelector("#locateMe").onclick=()=>this.locate();
   this.render();
 },
 stops(){return this.data.days?.[String(this.day)]||[]},
 render(){
   const stops=this.stops();if(!stops.length)return;
   if(this.index>=stops.length)this.index=0;const p=stops[this.index];
   try{localStorage.setItem("romeWalk",JSON.stringify({day:this.day,index:this.index}))}catch(e){}
   document.querySelectorAll("[data-day]").forEach(b=>b.classList.toggle("active",+b.dataset.day===this.day));
   document.querySelector("#walkTitle").textContent=`${this.day} Ιουλίου`;
   document.querySelector("#walkStop").textContent=cleanName(p.name);
   document.querySelector("#walkEmoji").textContent=categoryEmoji(p.category);
   document.querySelector("#progressText").textContent=`Στάση ${this.index+1} από ${stops.length}`;
   document.querySelector("#progressBar").style.width=`${(this.index+1)/stops.length*100}%`;
   document.querySelector("#walkNavigate").href=`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}&travelmode=walking`;
   const read=document.querySelector("#walkRead");
   read.href=p.page||`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}`;
   read.target=p.page?"":"_blank";
   document.querySelector("#walkDistance").textContent="Πατήστε «Εντοπισμός» για απόσταση από τη θέση σας.";
   document.querySelector("#walkStops").innerHTML=stops.map((s,i)=>`<div class="walk-stop ${i===this.index?"current":""}" data-stop="${i}"><div class="num">${i+1}</div><div><b>${cleanName(s.name)}</b><br><small>${s.page?"Υπάρχει πλήρες κεφάλαιο":"Στάση διαδρομής"}</small></div></div>`).join("");
   document.querySelectorAll("[data-stop]").forEach(x=>x.onclick=()=>{this.index=+x.dataset.stop;this.render();scrollTo({top:0,behavior:"smooth"})});
 },
 locate(){
   const out=document.querySelector("#walkDistance");
   if(!navigator.geolocation){out.textContent="Η συσκευή δεν υποστηρίζει εντοπισμό.";return}
   out.textContent="Εντοπισμός…";
   navigator.geolocation.getCurrentPosition(pos=>{
     const p=this.stops()[this.index],m=haversine({lat:pos.coords.latitude,lon:pos.coords.longitude},p);
     out.textContent=m<1000?`Περίπου ${Math.round(m)} μέτρα από τη θέση σας.`:`Περίπου ${(m/1000).toFixed(1)} χλμ. από τη θέση σας.`;
   },()=>out.textContent="Δεν δόθηκε άδεια τοποθεσίας. Χρησιμοποίησε το κουμπί Πλοήγηση.");
 }
};
const FavoritesPage={
 async init(){
   const data=await DataStore.load(),state=RG.state(),box=document.querySelector("#favoriteList");
   const all=(data.points||[]).filter(p=>p.page).map(p=>({url:p.page,title:cleanName(p.name)}));
   const rows=all.filter(x=>state.favorites.some(f=>f.endsWith(x.url)));
   box.innerHTML=rows.length?rows.map(x=>`<a class="result" href="${x.url}"><small>ΑΓΑΠΗΜΕΝΟ</small><h3>${x.title}</h3><p>Άνοιγμα πλήρους κεφαλαίου</p></a>`).join(""):`<div class="empty-card"><div style="font-size:44px">♡</div><h2>Δεν έχεις αγαπημένα ακόμη</h2><p>Άνοιξε ένα αξιοθέατο και πάτησε την καρδιά.</p></div>`;
 }
};
