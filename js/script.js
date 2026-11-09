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
const fb=document.querySelectorAll(".filters:not(#idea-filters) button");
fb.forEach(b=>b.addEventListener("click",()=>{
  fb.forEach(x=>x.classList.remove("on"));b.classList.add("on");
  let shown=0;
  document.querySelectorAll(".essay").forEach(e=>{e.hidden=b.dataset.topic!=="all"&&e.dataset.topic!==b.dataset.topic;if(!e.hidden)shown++});
  document.querySelector(".empty").hidden=shown>0;
}));

// ---- Motion (all of it switches off for visitors who prefer reduced motion) ----

  // Fade the page out before moving to another page of the site
 const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!calm){
  // Fade content in when it scrolls into view
 const targets=document.querySelectorAll(".cols > div,.band .wrap,.essay,.steps li,.section .wrap > h2,.section .wrap > p,.section .wrap > ul,.form-box");
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
  targets.forEach((t,i)=>{t.classList.add("reveal");io.observe(t)});

}// Topic idea generator
const ideaBtn=document.getElementById("idea-btn");
if(ideaBtn){
  const ideas={
    law:["Should minors be tried as adults for serious crimes?","Does the First Amendment protect students' speech at school?","Should juries be allowed to see a defendant's criminal record?","Is the death penalty compatible with a fair justice system?","Should AI-generated art be protected by copyright?"],
    ethics:["Is it ever ethical to lie to protect someone?","Do we have moral duties to future generations?","Should social media companies be responsible for what users post?","Is it fair to judge historical figures by today's standards?","Do animals have rights?"],
    philosophy:["Do we have free will?","What makes a person the same person over time?","Can a society be just if it is not equal?","Is knowledge possible without certainty?","Does morality depend on culture?"],
    psychology:["Why do people follow rules even when they disagree with them?","How does social media affect teenagers' identity?","Can eyewitness memory be trusted in court?","What makes people conform to a group?","Does punishment or reward change behavior more?"]
  };
  const all=Object.values(ideas).flat();
  let topic="all",last="";
  const q=document.getElementById("idea-q");
  const chips=document.querySelectorAll("#idea-filters button");
  chips.forEach(b=>b.addEventListener("click",()=>{
    chips.forEach(x=>x.classList.remove("on"));b.classList.add("on");topic=b.dataset.topic;
  }));
  ideaBtn.addEventListener("click",()=>{
    const pool=(topic==="all"?all:ideas[topic]).filter(i=>i!==last);
    last=pool[Math.floor(Math.random()*pool.length)];
    q.textContent=last;
  });
}
