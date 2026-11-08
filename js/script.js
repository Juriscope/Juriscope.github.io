// Edit nav links and footer contact info here once; they appear on every page.
const pages=[["index.html","Home"],["research.html","Browse Research"],["guide.html","Beginner's Guide"],["submit.html","Submit"],["about.html","About Us"]];
const current=document.body.dataset.page;

document.getElementById("site-header").outerHTML=`
<header class="site-header"><div class="wrap">
  <a class="logo" href="index.html" aria-label="Juriscope home"><img src="assets/logo-icon.png" alt=""><span>Juriscope</span></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
  <nav class="nav" id="nav" aria-label="Main">
    ${pages.map(([h,t])=>`<a href="${h}" class="${h===current?"active":""}" ${h===current?'aria-current="page"':""}>${t}</a>`).join("")}
  </nav>
</div></header>`;

document.getElementById("site-footer").outerHTML=`
<footer class="site-footer"><div class="wrap">
  <div><strong>Juriscope</strong><p>Student-reviewed research and essays.</p></div>
  <div><p>Email: <a href="mailto:juriscopejournal@gmail.com">juriscopejournal@gmail.com</a></p>
       <p>Instagram: <a href="#">@yourhandle</a></p></div>
  <div><p>&copy; 2026 Juriscope. All work belongs to its authors.</p></div>
</div></footer>`;

const btn=document.querySelector(".menu-btn"),nav=document.getElementById("nav");
btn.addEventListener("click",()=>{const o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});

// Topic filter on the research page
const fb=document.querySelectorAll(".filters button");
fb.forEach(b=>b.addEventListener("click",()=>{
  fb.forEach(x=>x.classList.remove("on"));b.classList.add("on");
  let shown=0;
  document.querySelectorAll(".essay").forEach(e=>{e.hidden=b.dataset.topic!=="all"&&e.dataset.topic!==b.dataset.topic;if(!e.hidden)shown++});
  document.querySelector(".empty").hidden=shown>0;
}));

// ---- Motion (all of it switches off for visitors who prefer reduced motion) ----
const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!calm){
  // Fade content in when it scrolls into view
  const targets=document.querySelectorAll(".cols > div,.band .wrap,.essay,.steps li,.section .wrap > h2,.section .wrap > p,.form-box");
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
  targets.forEach((t,i)=>{t.classList.add("reveal");io.observe(t)});
  // Fade the page out before moving to another page of the site
  document.addEventListener("click",e=>{
    const a=e.target.closest("a");
    if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey)return;
    const u=new URL(a.href,location.href);
    if(u.origin!==location.origin||u.pathname===location.pathname)return;
    e.preventDefault();document.body.classList.add("leaving");
    setTimeout(()=>location.href=a.href,280);
  });
  addEventListener("pageshow",e=>{if(e.persisted)document.body.classList.remove("leaving")});
}
