
const PoiApp={
 data:null,cat:"all",day:"all",query:"",
 emoji:{attraction:"🏛️",food:"🍝",cafe:"☕",gelato:"🍦",water:"🚰",toilet:"🚻",transport:"🚇",hotel:"🏨"},
 labels:{attraction:"Αξιοθέατο",food:"Φαγητό",cafe:"Καφέ",gelato:"Gelato",water:"Βρύση",toilet:"Τουαλέτα",transport:"Μετακίνηση",hotel:"Ξενοδοχείο"},
 async init(){
  this.data=window.ROME_POI_DATA||{pois:[]};
  document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{this.cat=b.dataset.cat;document.querySelectorAll("[data-cat]").forEach(x=>x.classList.toggle("active",x===b));this.render()});
  document.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{this.day=b.dataset.day;document.querySelectorAll("[data-day]").forEach(x=>x.classList.toggle("active",x===b));this.render()});
  document.querySelector("#poiQuery").oninput=e=>{this.query=e.target.value.toLocaleLowerCase("el").trim();this.render()};
  this.render();
 },
 render(){
  const all=this.data.pois||[],counts={};
  all.forEach(p=>counts[p.category]=(counts[p.category]||0)+1);
  document.querySelector("#poiStats").innerHTML=`<span>📍 ${all.length} εγγραφές</span><span>🏛️ ${counts.attraction||0} αξιοθέατα</span><span>🍝 ${counts.food||0} φαγητό</span><span>🧭 ${all.filter(p=>p.coordinates?.lat).length} με συντεταγμένες</span>`;
  const rows=all.filter(p=>(this.cat==="all"||p.category===this.cat)&&(this.day==="all"||String(p.day)===this.day)&&(!this.query||(p.name+" "+(p.tags||[]).join(" ")).toLocaleLowerCase("el").includes(this.query)));
  document.querySelector("#poiList").innerHTML=rows.length?rows.map(p=>{
   const pending=p.verification?.practicalDataStatus!=="pending_web_verification",links=[];
   if(p.links?.googleMaps)links.push(`<a target="_blank" rel="noopener" href="${p.links.googleMaps}">📍 Google Maps</a>`);
   if(p.links?.localPage)links.push(`<a href="${p.links.localPage}">📖 Κεφάλαιο</a>`);
   const st=p.verification?.practicalDataStatus||"";
   if(st.startsWith("verified")) links.push(`<span class="verified-label">✅ Επαληθεύτηκε 26/7/2026</span>`);
   else links.push(`<span class="pending-label">${st==="pending_web_verification"?"⏳ Πρακτικά στοιχεία: εκκρεμούν":"⚠️ Εκκρεμεί επαλήθευση σημείου"}</span>`);
   if(p.practical?.openingHours) links.push(`<span>🕒 ${p.practical.openingHours}</span>`);
   if(p.practical?.ticket) links.push(`<span>🎟️ ${p.practical.ticket}</span>`);
   if(p.practical?.visitDuration) links.push(`<span>⏱️ ${p.practical.visitDuration}</span>`);
   if(p.links?.official) links.push(`<a target="_blank" rel="noopener" href="${p.links.official}">🏛️ Επίσημη πηγή</a>`);
   return `<article class="poi-card ${pending?"pending":""}"><div class="poi-icon">${this.emoji[p.category]||"📍"}</div><div><h3>${p.name}</h3><div class="poi-meta">${this.labels[p.category]||p.category}${p.day?" · "+p.day+" Ιουλίου":""}</div><div class="poi-actions">${links.join("")}</div></div></article>`;
  }).join(""):`<div class="empty-card">Δεν βρέθηκαν σημεία.</div>`;
 }
};PoiApp.init();
