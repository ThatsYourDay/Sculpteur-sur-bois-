/* Sculpteur sur bois — interactions */
(function(){
  "use strict";
  const WA_NUMBER = "212688123869";
  let lang = localStorage.getItem("sb-lang") || "en";

  const CAT_LABEL = {
    animals:    {en:"Animals",     fr:"Animaux"},
    instruments:{en:"Instruments", fr:"Instruments"},
    decor:      {en:"Décor",       fr:"Décoration"},
    souvenirs:  {en:"Souvenirs",   fr:"Souvenirs"}
  };
  const FEATURED_IDS = ["003","049","077","054","079","084","038","060"];

  /* ---------- i18n ---------- */
  function applyLang(){
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-en]").forEach(el=>{
      const v = el.getAttribute("data-"+lang);
      if(v !== null) el.textContent = v;
    });
    document.getElementById("lang-en").classList.toggle("active", lang==="en");
    document.getElementById("lang-fr").classList.toggle("active", lang==="fr");
    renderFeatured(); renderGallery(currentFilter);
    if(lightboxProduct) fillLightbox(lightboxProduct);
  }
  document.getElementById("lang-en").addEventListener("click",()=>{lang="en";localStorage.setItem("sb-lang",lang);applyLang();});
  document.getElementById("lang-fr").addEventListener("click",()=>{lang="fr";localStorage.setItem("sb-lang",lang);applyLang();});

  const nameOf = p => p[lang] || p.en;
  const catOf  = c => (CAT_LABEL[c]||{en:c,fr:c})[lang];
  const waLink = p => {
    const msg = lang==="fr"
      ? `Bonjour ! J'ai vu "${nameOf(p)}" sur votre site et cela m'intéresse. Est-il disponible ?`
      : `Hello! I saw the "${nameOf(p)}" on your website and I'm interested. Is it available?`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  /* ---------- featured ---------- */
  function renderFeatured(){
    const track = document.getElementById("featured-track");
    track.innerHTML = "";
    FEATURED_IDS.forEach(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      if(!p) return;
      const card = document.createElement("article");
      card.className = "featured-card";
      card.innerHTML = `
        <div class="featured-img"><img src="${p.img}" alt="${nameOf(p)}" loading="lazy"></div>
        <div class="featured-info">
          <span class="cat">${catOf(p.cat)}</span>
          <h3>${nameOf(p)}</h3>
          <a class="btn btn-whatsapp btn-sm" href="${waLink(p)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-.9c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.3z"/></svg>
            ${lang==="fr"?"Commander":"Order"}
          </a>
        </div>`;
      card.querySelector(".featured-img").addEventListener("click",()=>openLightbox(p));
      track.appendChild(card);
    });
  }

  /* ---------- gallery ---------- */
  let currentFilter = "all";
  function renderGallery(filter){
    currentFilter = filter;
    const grid = document.getElementById("gallery-grid");
    grid.innerHTML = "";
    PRODUCTS.filter(p=>filter==="all"||p.cat===filter).forEach((p,i)=>{
      const card = document.createElement("article");
      card.className = "product-card";
      card.style.animationDelay = Math.min(i*30,600)+"ms";
      card.innerHTML = `
        <div class="product-img"><img src="${p.img}" alt="${nameOf(p)}" loading="lazy"></div>
        <div class="product-info"><span class="cat">${catOf(p.cat)}</span><h3>${nameOf(p)}</h3></div>`;
      card.addEventListener("click",()=>openLightbox(p));
      grid.appendChild(card);
    });
  }
  document.getElementById("filters").addEventListener("click",e=>{
    const btn = e.target.closest(".filter-btn");
    if(!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });

  /* ---------- lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  let lightboxProduct = null;
  function fillLightbox(p){
    document.getElementById("lightbox-img").src = p.img;
    document.getElementById("lightbox-img").alt = nameOf(p);
    document.getElementById("lightbox-cat").textContent = catOf(p.cat);
    document.getElementById("lightbox-name").textContent = nameOf(p);
    document.getElementById("lightbox-wa").href = waLink(p);
  }
  function openLightbox(p){
    lightboxProduct = p;
    fillLightbox(p);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    lightboxProduct = null;
  }
  document.getElementById("lightbox-close").addEventListener("click",closeLightbox);
  document.getElementById("lightbox-backdrop").addEventListener("click",closeLightbox);
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeLightbox(); });

  /* ---------- header / menu / reveal ---------- */
  const header = document.getElementById("site-header");
  addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>30),{passive:true});
  const menuBtn = document.getElementById("menu-btn"), nav = document.getElementById("main-nav");
  menuBtn.addEventListener("click",()=>{
    nav.classList.toggle("open"); menuBtn.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open"); menuBtn.classList.remove("open");
  }));
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  applyLang();
})();
