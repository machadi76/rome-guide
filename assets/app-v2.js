
const RG={
  key:"romeGuideV32",
  root(){
    const p=(location.pathname||"").replace(/\\/g,"/");
    return /\/(?:attractions|chapters)\//.test(p) ? "../" : "";
  },
  state(){
    try{
      return JSON.parse(localStorage.getItem(this.key))||{favorites:[],theme:"light"};
    }catch(e){return{favorites:[],theme:"light"}}
  },
  save(s){try{localStorage.setItem(this.key,JSON.stringify(s))}catch(e){}},
  init(){
    const s=this.state();
    document.documentElement.dataset.theme=s.theme||"light";
    this.bindTheme();this.bindSearch();this.bindFavorite();this.network();
  },
  bindTheme(){
    document.querySelectorAll("[data-theme-toggle]").forEach(b=>b.onclick=()=>{
      const s=this.state();s.theme=s.theme==="dark"?"light":"dark";this.save(s);
      document.documentElement.dataset.theme=s.theme;
    });
  },
  bindSearch(){
    const sheet=document.querySelector("#searchSheet"),
          input=document.querySelector("#globalSearch"),
          out=document.querySelector("#searchResults");
    document.querySelectorAll("[data-search-open]").forEach(b=>b.onclick=()=>{
      sheet?.classList.add("open");setTimeout(()=>input?.focus(),100)
    });
    document.querySelectorAll("[data-search-close]").forEach(b=>b.onclick=()=>sheet?.classList.remove("open"));
    if(!input||!out)return;
    const data=window.ROME_SEARCH_DATA||[];
    const render=()=>{
      const q=input.value.trim().toLocaleLowerCase("el");
      const rows=(q?data.filter(x=>(x.title+" "+(x.desc||"")+" "+(x.type||"")).toLocaleLowerCase("el").includes(q)):data.slice(0,12));
      out.innerHTML=rows.map(x=>{
        const external=/^(?:https?:|mailto:|tel:)/i.test(x.url||"");
        const href=external?x.url:this.root()+(x.url||"");
        return `<a class="result" href="${href}" ${external?'target="_blank" rel="noopener"':""}><small>${x.type||x.date||"Σελίδα"}</small><h3>${x.title}</h3><p>${x.desc||""}</p></a>`;
      }).join("");
    };
    input.addEventListener("input",render);render();
  },
  bindFavorite(){
    const btn=document.querySelector("[data-favorite-page]");if(!btn)return;
    const path=(location.pathname||"").replace(/\\/g,"/").split("/").slice(-2).join("/"),s=this.state();
    const paint=()=>btn.textContent=s.favorites.includes(path)?"♥":"♡";
    paint();
    btn.onclick=()=>{
      const i=s.favorites.indexOf(path);
      i>=0?s.favorites.splice(i,1):s.favorites.push(path);
      this.save(s);paint();
    };
  },
  network(){
    const set=()=>document.body.classList.toggle("offline",navigator.onLine===false);
    addEventListener("online",set);addEventListener("offline",set);set();
  }
};
addEventListener("DOMContentLoaded",()=>RG.init());
