/* =========================================
   PRATHAM BHANUSHALI — PORTFOLIO SCRIPT
   Space Theme Edition
   Starfield · Custom Cursor · Chatbot
========================================= */

/* =========================================
   0. CANVAS STARFIELD + SHOOTING STARS
========================================= */
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, stars = [], shooters = [], frame = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((W * H) / 6000);   // density scales with viewport
    for (let i = 0; i < count; i++) {
      stars.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0025 + 0.0008,
        hue:   Math.random() < 0.15 ? 200 : 210,  // mostly white-blue, few cyan
      });
    }
  }

  function spawnShooter() {
    if (Math.random() > 0.004) return;
    const angle = (Math.PI / 5) + (Math.random() - 0.5) * 0.4;
    shooters.push({
      x:     Math.random() * W,
      y:     Math.random() * H * 0.5,
      len:   80 + Math.random() * 100,
      spd:   7  + Math.random() * 6,
      angle,
      life:  0,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // ── Stars ──────────────────────────
    stars.forEach(s => {
      const alpha = 0.25 + 0.75 * Math.abs(Math.sin(s.phase + frame * s.speed));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 80%, 90%, ${alpha})`;
      ctx.fill();
    });

    // ── Shooting stars ─────────────────
    spawnShooter();
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.life += 0.025;
      s.x    += Math.cos(s.angle) * s.spd;
      s.y    += Math.sin(s.angle) * s.spd;
      const alpha = Math.max(0, 1 - s.life);
      if (alpha <= 0) { shooters.splice(i, 1); continue; }

      const x2 = s.x - Math.cos(s.angle) * s.len;
      const y2 = s.y - Math.sin(s.angle) * s.len;
      const g  = ctx.createLinearGradient(s.x, s.y, x2, y2);
      g.addColorStop(0,   `rgba(0,212,255,${alpha})`);
      g.addColorStop(0.5, `rgba(124,58,237,${alpha * 0.6})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = g;
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(x2,  y2);
      ctx.stroke();
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  // Inject floating nebula orbs
  ['orb-1','orb-2','orb-3'].forEach(cls => {
    const d = document.createElement('div');
    d.className = `orb ${cls}`;
    document.body.appendChild(d);
  });
})();

/* =========================================
   1. CUSTOM CURSOR
========================================= */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .suggestion, .tag, .project-card, .timeline-card, .community-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform   = 'translate(-50%,-50%) scale(2.2)';
    follower.style.width     = '54px';
    follower.style.height    = '54px';
    follower.style.opacity   = '0.45';
    follower.style.borderColor = 'rgba(0,212,255,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
    follower.style.width     = '32px';
    follower.style.height    = '32px';
    follower.style.opacity   = '1';
    follower.style.borderColor = 'rgba(0,212,255,0.45)';
  });
});

/* =========================================
   2. STICKY NAV
========================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(1,2,18,0.97)'
    : 'rgba(1,2,18,0.82)';
});

/* =========================================
   3. MOBILE HAMBURGER
========================================= */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  })
);

/* =========================================
   4. SCROLL REVEAL
========================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================
   5. ACTIVE NAV LINK
========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--amber)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

/* =========================================
   6. SMOOTH ANCHOR SCROLL
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' }); }
  });
});

/* =========================================
   7. BACK TO TOP
========================================= */
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 500);
  });
}

/* =========================================
   8. TAG STAGGER
========================================= */
document.querySelectorAll('.tag').forEach((t, i) => { t.style.transitionDelay = `${i * 0.04}s`; });

/* =========================================
   9. CHATBOT — Perfected Rule-Based Engine
========================================= */

// ─── Knowledge Base ────────────────────────────────────────────
const KB = [
  // ── Greetings ────────────────────────────────────────────────
  {
    id: 'greeting',
    patterns: ['hello','hi','hey','sup','yo','howdy','hola','good morning','good evening','what\'s up','wassup','hiya'],
    response: `Hey! 👋 I'm Pratham's portfolio assistant — I know everything about him.\n\nAsk me about his <strong>experience</strong>, <strong>skills</strong>, <strong>projects</strong>, <strong>research</strong>, or how to <strong>get in touch</strong>.`
  },

  // ── Identity ─────────────────────────────────────────────────
  {
    id: 'bot-identity',
    patterns: ['who are you','what are you','what is this','about this bot','are you ai','are you a bot','chatbot'],
    response: `I'm a smart portfolio assistant built for Pratham Bhanushali's site. I'm fully rule-based — no API, no backend, just fast local knowledge about him. 🚀\n\nI can answer questions about his work, skills, education, projects, and more.`
  },

  // ── About Pratham ────────────────────────────────────────────
  {
    id: 'about',
    patterns: ['who is pratham','tell me about pratham','about pratham','introduce','introduction','overview'],
    response: `<strong>Pratham Bhanushali</strong> is a Data Analyst at <strong>NYU Stern School of Business</strong>, currently pursuing an <strong>MS in Management of Technology</strong> at NYU Tandon (2025–2027).\n\nHe has 2+ years of combined DA/SWE experience across NYC and Mumbai, a <strong>published ML research paper</strong>, and is actively targeting roles in Data Analytics, BI, and Business Analysis.`
  },

  // ── Current Role ─────────────────────────────────────────────
  {
    id: 'current-role',
    patterns: ['current job','current role','nyu stern','where does he work','where does pratham work','what does he do','stern','data analyst role'],
    response: `Pratham is currently a <strong>Data Analyst at NYU Stern School of Business</strong> (Nov 2025–Present).\n\nKey achievements so far:\n• Automated ELT pipelines → reduced manual data prep by <strong>25%</strong>\n• Tableau KPI dashboards → improved decision speed for stakeholders by <strong>15%</strong>\n• Advanced SQL on institutional datasets for enrollment & resource planning\n• Prompt-engineered Python scripts for statistical modeling`
  },

  // ── Education ────────────────────────────────────────────────
  {
    id: 'education',
    patterns: ['education','degree','university','nyu','tandon','ms','masters','graduate','undergrad','college','mumbai','bachelor','be in'],
    response: `📚 <strong>Education</strong>\n\n🎓 <strong>MS – Management of Technology</strong>\nNYU Tandon School of Engineering · 2025–2027 · New York\n\n🎓 <strong>BE – Information Technology</strong>\nUniversity of Mumbai · 2020–2024 · Mumbai, India`
  },

  // ── All Skills ───────────────────────────────────────────────
  {
    id: 'skills',
    patterns: ['skills','technologies','tech stack','tools','what can he do','what does he know','capabilities','technical skills'],
    response: `🛠️ <strong>Pratham's Tech Stack</strong>\n\n<strong>Data & Analytics</strong>\nSQL (PostgreSQL, MySQL) · Python (Pandas, NumPy) · Tableau · Power BI · Advanced Excel\n\n<strong>Engineering & DevOps</strong>\nApache Airflow · Docker · Kubernetes · Git/GitHub Actions · CI/CD · Linux\n\n<strong>Databases</strong>\nPostgreSQL · MySQL · MongoDB · Redis · Cassandra\n\n<strong>AI & ML</strong>\nDeep Learning (CNN/RNN) · NLP · scikit-learn · spaCy · Prompt Engineering\n\n<strong>Frontend</strong>\nReact · Redux · REST APIs · JavaScript`
  },

  // ── SQL ──────────────────────────────────────────────────────
  {
    id: 'sql',
    patterns: ['sql','database','postgresql','mysql','mongodb','queries','database skills'],
    response: `SQL is one of Pratham's core strengths. At NYU Stern he writes advanced queries — <strong>CTEs, window functions, aggregations</strong> — on massive institutional datasets for enrollment planning and reporting.\n\nDatabases he's proficient in: <strong>PostgreSQL, MySQL, MongoDB, Redis, Cassandra</strong>.`
  },

  // ── Python ───────────────────────────────────────────────────
  {
    id: 'python',
    patterns: ['python','pandas','numpy','scripting','python skills'],
    response: `Python is central to Pratham's analytics work — he uses it for:\n\n• <strong>ELT pipelines</strong> (Airflow + Python at NYU Stern)\n• <strong>Data wrangling</strong> (Pandas, NumPy)\n• <strong>ML/NLP</strong> (scikit-learn, spaCy, CNN/RNN models)\n• <strong>App development</strong> (Streamlit, Flask, Django)\n• <strong>Prompt engineering</strong> for LLM-assisted analysis`
  },

  // ── Tableau / BI ─────────────────────────────────────────────
  {
    id: 'bi',
    patterns: ['tableau','power bi','dashboards','business intelligence','visualization','reporting','excel','kpi'],
    response: `Pratham builds production dashboards in both <strong>Tableau Desktop/Prep</strong> and <strong>Power BI</strong>.\n\n• At <strong>NYU Stern</strong>: KPI dashboards → improved stakeholder decision speed by 15%\n• At <strong>Web Work</strong>: Tableau dashboards → improved reporting efficiency by 20%\n\nHe also does advanced Excel modeling (financial models, KPI frameworks).`
  },

  // ── All Work Experience ──────────────────────────────────────
  {
    id: 'experience',
    patterns: ['experience','work history','jobs','worked','previous roles','career','work experience','employment'],
    response: `💼 <strong>Work History</strong>\n\n1. <strong>Data Analyst</strong> — NYU Stern School of Business\n   Nov 2025–Present · New York, NY\n\n2. <strong>Software Engineer</strong> — SpeedBox\n   Apr 2024–Jun 2025 · Mumbai, India\n\n3. <strong>Web Developer Intern</strong> — V S Sahil\n   Apr 2023–Dec 2023 · Mumbai, India\n\n4. <strong>Data Analyst Intern</strong> — Web Work\n   Dec 2022–Mar 2023 · Mumbai, India\n\nPlus a <strong>published ML research paper</strong> — real peer-reviewed work.`
  },

  // ── NYU Stern DA Role ────────────────────────────────────────
  {
    id: 'stern-detail',
    patterns: ['nyu stern detail','what did he do at stern','stern responsibilities'],
    response: `At <strong>NYU Stern</strong>, Pratham:\n• Conducted in-depth industry analysis & statistical modeling for peer benchmarking\n• Ran advanced SQL on massive institutional datasets → enrollment & resource planning\n• Automated ELT pipelines in Python → cut manual prep time by <strong>25%</strong>\n• Built Tableau KPI dashboards → <strong>15%</strong> faster stakeholder decisions\n• Used AI/LLM prompt engineering to optimize Python scripts`
  },

  // ── SpeedBox ─────────────────────────────────────────────────
  {
    id: 'speedbox',
    patterns: ['speedbox','software engineer','swe','saas','software developer'],
    response: `At <strong>SpeedBox</strong> (Apr 2024–Jun 2025), Pratham was a Software Engineer building white-labelled SaaS platforms:\n\n• Integrated RESTful APIs with React, Redux, JS → <strong>15% faster</strong> data retrieval\n• Optimized front-end code → <strong>20% better</strong> application performance\n• Pre-processed MongoDB data with indexing & query optimization\n• Built responsive UIs → improved user engagement by <strong>18%</strong>\n• Managed state with Redux across large-scale distributed apps`
  },

  // ── Web Work ─────────────────────────────────────────────────
  {
    id: 'webwork',
    patterns: ['web work','data analyst intern','first job','analyst internship','internship experience'],
    response: `At <strong>Web Work</strong> (Dec 2022–Mar 2023), Pratham interned as a Data Analyst:\n\n• Cleaned large datasets with Python (Pandas, NumPy), Excel & SQL → reporting efficiency up <strong>20%</strong>\n• Deployed interactive Tableau dashboards for real-time KPI visibility\n• Designed & optimized data models with PostgreSQL & MongoDB → ops efficiency up <strong>15%</strong>\n• Worked Agile/Scrum across cross-functional teams`
  },

  // ── V S Sahil ────────────────────────────────────────────────
  {
    id: 'vssahil',
    patterns: ['v s sahil','sahil','web developer intern','web dev intern'],
    response: `At <strong>V S Sahil</strong> (Apr–Dec 2023), Pratham was a Web Developer Intern:\n\n• Built RESTful APIs with React, Redux, JS & Spring Boot → data fetch latency down <strong>25%</strong>\n• Pre-processed data in MongoDB & PostgreSQL for optimized front-end rendering\n• Built responsive UIs applying OOP & low-level design principles`
  },

  // ── Projects ─────────────────────────────────────────────────
  {
    id: 'projects',
    patterns: ['projects','what has he built','side projects','github projects','portfolio projects','his projects'],
    response: `🚀 <strong>Projects</strong>\n\n<strong>1. AI Resume Screener</strong>\nPython/Streamlit · TF-IDF + cosine similarity · spaCy NLP\nAutomatically ranks candidates vs job descriptions.\n→ <a href="https://github.com/pratham2888/AI-Resume-Screener" target="_blank">View on GitHub ↗</a>\n\n<strong>2. C Chatbot</strong>\nCommand-line chatbot in C — string matching, file I/O, conditional logic.\n→ <a href="https://github.com/pratham2888/C-Chatbot" target="_blank">View on GitHub ↗</a>\n\n<strong>3. State-Wide Hackathon Organizer</strong>\nOrganized & judged state-level hackathons across Maharashtra.\n\n<strong>4. Code-a-mania Hackathon</strong>\nRapid prototyping under time pressure, end-to-end problem solving.`
  },

  // ── AI Resume Screener ───────────────────────────────────────
  {
    id: 'resume-screener',
    patterns: ['resume screener','ai resume','streamlit','tfidf','cosine','nlp project','spacy'],
    response: `The <strong>AI Resume Screener</strong> is Pratham's flagship project:\n\n• Parses resumes from PDF/DOCX using PyPDF2 & python-docx\n• Applies <strong>spaCy NLP</strong> + <strong>TF-IDF vectorization</strong> + <strong>cosine similarity</strong> to rank candidates vs job descriptions\n• Interactive <strong>Streamlit</strong> web UI — no backend needed\n\n→ <a href="https://github.com/pratham2888/AI-Resume-Screener" target="_blank">github.com/pratham2888/AI-Resume-Screener ↗</a>`
  },

  // ── Research ─────────────────────────────────────────────────
  {
    id: 'research',
    patterns: ['research','paper','published','music','cnn','deep learning','ml paper','machine learning','music information','mfcc','spectrogram','rnn'],
    response: `📄 <strong>Published Research</strong>\n\n<strong>"Music Information Retrieval System using Deep Learning"</strong>\n\n• Built CNN/RNN models to classify music by genre, tempo, and rhythm\n• Applied MFCC & spectrogram feature extraction on large audio datasets\n• Outperformed traditional ML approaches in retrieval accuracy\n• Applications: recommendation engines, intelligent audio search\n\nThis is peer-reviewed, published research — not just a class project.`
  },

  // ── Job Search ───────────────────────────────────────────────
  {
    id: 'job-search',
    patterns: ['looking for','open to','job search','hiring','available','internship 2026','summer 2026','full time','full-time','seeking','opportunities','roles'],
    response: `Pratham is actively looking for:\n\n📌 <strong>Roles</strong>: Data Analytics · Business Intelligence · Business Analysis · Data Engineering\n📍 <strong>Location</strong>: New York City or Remote\n⏰ <strong>Timeline</strong>: Summer 2026 internships + full-time\n🏢 <strong>Industries</strong>: Finance · Tech · Consulting\n\nBest way to reach him: <strong>pb3225@nyu.edu</strong> or <a href="https://linkedin.com/in/pratham96328" target="_blank">LinkedIn ↗</a>`
  },

  // ── Contact ──────────────────────────────────────────────────
  {
    id: 'contact',
    patterns: ['contact','reach','email','linkedin','get in touch','hire','reach out','connect','phone','number'],
    response: `📬 <strong>Contact Pratham</strong>\n\n📧 <a href="mailto:pb3225@nyu.edu">pb3225@nyu.edu</a> (preferred)\n📧 <a href="mailto:pb3225@stern.nyu.edu">pb3225@stern.nyu.edu</a>\n📞 +1 (646) 361-7216\n💼 <a href="https://linkedin.com/in/pratham96328" target="_blank">linkedin.com/in/pratham96328 ↗</a>\n🐙 <a href="https://github.com/pratham2888" target="_blank">github.com/pratham2888 ↗</a>\n\nHe's responsive and open to DA/BA/BI conversations!`
  },

  // ── Resume ───────────────────────────────────────────────────
  {
    id: 'resume',
    patterns: ['resume','cv','download resume','view resume','curriculum vitae'],
    response: `📄 View Pratham's full resume here:\n\n→ <a href="Resume.html" target="_blank">Open Resume Page ↗</a>\n\nOr click the <strong>"Resume ↗"</strong> button in the top navigation bar.`
  },

  // ── Location ─────────────────────────────────────────────────
  {
    id: 'location',
    patterns: ['location','where is he','where does he live','new york','nyc','based','city'],
    response: `📍 Pratham is based in <strong>New York City, NY</strong>. He's studying at NYU Tandon (Brooklyn) and working at NYU Stern (Manhattan).\n\nHe's open to in-person NYC roles and fully remote positions.`
  },

  // ── Strengths ────────────────────────────────────────────────
  {
    id: 'strengths',
    patterns: ['strengths','best at','specializes','expertise','good at','unique value','differentiator','what makes him'],
    response: `💡 <strong>Pratham's Core Strengths</strong>\n\n• <strong>End-to-end analytics</strong> — pipeline → dashboard → business insight\n• <strong>SQL mastery</strong> — complex analytical queries on large datasets\n• <strong>Stakeholder communication</strong> — translates data into decisions\n• <strong>ML depth</strong> — published research in CNN/RNN/NLP\n• <strong>Full-stack awareness</strong> — understands both data layer and product layer\n\nHe's the rare analyst who can build the pipeline AND present findings to a VP.`
  },

  // ── Airflow / Engineering ────────────────────────────────────
  {
    id: 'airflow',
    patterns: ['airflow','docker','kubernetes','pipeline','etl','elt','data engineering','devops','ci/cd','linux'],
    response: `Pratham's data engineering toolkit:\n\n• <strong>Apache Airflow</strong> — orchestrating ELT pipelines at NYU Stern\n• <strong>Docker & Kubernetes</strong> — containerization & orchestration\n• <strong>GitHub Actions & CI/CD</strong> — automated deployment workflows\n• <strong>Linux</strong> — comfortable in Unix environments\n\nHe built automated ELT pipelines that reduced manual data prep time by <strong>25%</strong>.`
  },

  // ── React / Frontend ─────────────────────────────────────────
  {
    id: 'frontend',
    patterns: ['react','frontend','javascript','redux','web dev','web development','ui','spring boot'],
    response: `Pratham has solid frontend/fullstack experience from SpeedBox and V S Sahil:\n\n• <strong>React + Redux</strong> for SaaS UI development\n• <strong>REST API integration</strong> (reduced latency by 25% at V S Sahil)\n• <strong>Spring Boot</strong> backend experience\n• <strong>Responsive UI design</strong> — cross-platform compatible\n\nHis primary focus is analytics, but he can collaborate fluently with engineering teams.`
  },

  // ── Cloud / AWS ──────────────────────────────────────────────
  {
    id: 'cloud',
    patterns: ['aws','cloud','azure','gcp','cloud computing'],
    response: `Pratham has hands-on cloud experience:\n\n• <strong>AWS</strong> usage from his internship at Web Work\n• Cloud-adjacent work through Docker, Kubernetes & CI/CD at SpeedBox\n• Familiar with cloud data pipelines and infrastructure concepts\n\nPrimarily analytics-focused, but comfortable deploying to cloud environments.`
  },

  // ── Community / Leadership ───────────────────────────────────
  {
    id: 'community',
    patterns: ['community','leadership','volunteer','club','mun','model un','hackathon organizer','abit','soch','event'],
    response: `🌍 <strong>Community & Leadership</strong>\n\n• <strong>Event Management Secretary</strong> — ABIT (2024–2025)\n  Led cross-functional event coordination for college-wide functions\n\n• <strong>RGIT Model United Nations</strong> — Delegate (2022–2023)\n  Represented countries, drafted resolutions, built diplomacy skills\n\n• <strong>Soch Committee — RGIT</strong> — Volunteer\n  Beach cleanups, food drives, sustainability initiatives`
  },

  // ── GPA / Academic ───────────────────────────────────────────
  {
    id: 'academic',
    patterns: ['gpa','grades','academic performance','cgpa','academic record'],
    response: `Pratham's academic background includes a BE in IT from the University of Mumbai (2020–2024) and an ongoing MS in Management of Technology at NYU Tandon (2025–2027).\n\nFor specific GPA or transcript details, reach out directly: <a href="mailto:pb3225@nyu.edu">pb3225@nyu.edu</a>`
  },

  // ── GitHub ───────────────────────────────────────────────────
  {
    id: 'github',
    patterns: ['github','code','repositories','repos','open source'],
    response: `Pratham's GitHub: <a href="https://github.com/pratham2888" target="_blank">github.com/pratham2888 ↗</a>\n\nNotable repos:\n• <strong>AI-Resume-Screener</strong> — Python + NLP\n• <strong>C-Chatbot</strong> — Systems programming\n\nHe's actively building — check it out!`
  },

  // ── Portfolio Site ───────────────────────────────────────────
  {
    id: 'portfolio',
    patterns: ['portfolio','this website','this site','how was this built','website','built with'],
    response: `This portfolio was built from scratch with:\n\n• <strong>HTML5 + Vanilla CSS</strong> (custom design system)\n• <strong>Vanilla JavaScript</strong> — no frameworks\n• <strong>Canvas API</strong> — live starfield background\n• <strong>Rule-based chatbot</strong> (that's me! 🤖)\n\nNo React, no WordPress — pure hand-coded.`
  },

  // ── Prompt Engineering / AI ──────────────────────────────────
  {
    id: 'ai-skills',
    patterns: ['prompt engineering','llm','ai skills','agentic','generative ai','chatgpt','openai','anthropic'],
    response: `Pratham actively applies <strong>AI & LLM tooling</strong> in his work:\n\n• <strong>Prompt Engineering</strong> — optimizes Python scripts & analyses using LLMs at NYU Stern\n• <strong>Agentic AI</strong> — listed in his skills section\n• <strong>ML depth</strong> — published CNN/RNN research\n\nHe's an analyst who embraces AI as a productivity multiplier.`
  },

  // ── Thanks ───────────────────────────────────────────────────
  {
    id: 'thanks',
    patterns: ['thanks','thank you','ty','appreciate','helpful','great answer','perfect','awesome','nice','cool','good'],
    response: `You're welcome! 🚀 Anything else you'd like to know about Pratham? I can go deep on skills, projects, or how to reach him.`
  },

  // ── Negative / Not hiring ────────────────────────────────────
  {
    id: 'not-interested',
    patterns: ['not interested','no thanks','bye','goodbye','take care','cya','ttyl'],
    response: `No worries! Feel free to come back anytime. Pratham would love to connect if you change your mind → <a href="mailto:pb3225@nyu.edu">pb3225@nyu.edu</a> 👋`
  },
];

// Sorted suggestions shown after first bot message
const SUGGESTIONS = [
  { label: 'What does he do?',     q: 'what does he do' },
  { label: 'His skills',            q: 'skills' },
  { label: 'Work experience',       q: 'experience' },
  { label: 'Contact info',          q: 'contact' },
];

// Fallback array
const FALLBACK = [
  `I'm not sure about that one! Try asking about Pratham's <strong>experience</strong>, <strong>skills</strong>, <strong>projects</strong>, or <strong>how to reach him</strong>. 🌌`,
  `That's outside my knowledge base — but Pratham can answer! Email him at <a href="mailto:pb3225@nyu.edu">pb3225@nyu.edu</a> 📧`,
  `Hmm, I don't have that info. Ask me about his tech stack, work history, or research — I'm great at those!`,
  `Good question, but beyond what I know! You can always reach Pratham directly on <a href="https://linkedin.com/in/pratham96328" target="_blank">LinkedIn ↗</a>`,
];

function getResponse(input) {
  const q = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some(p => q.includes(p))) return entry.response;
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

// ─── Chat DOM Refs ──────────────────────────────────────────────
const chatWidget   = document.getElementById('chatWidget');
const chatToggle   = document.getElementById('chatToggle');
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const suggestionsEl= document.getElementById('suggestions');

// ─── Toggle Panel ───────────────────────────────────────────────
chatToggle.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
  if (chatWidget.classList.contains('open')) {
    setTimeout(() => chatInput.focus(), 420);
  }
});

// ─── Time helper ────────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ─── Append message ─────────────────────────────────────────────
function appendMessage(html, role) {
  const wrap   = document.createElement('div');
  wrap.className = 'msg ' + role;

  const inner  = document.createElement('div');
  inner.className = 'msg-wrap';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  const time   = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = getTime();

  if (role === 'user') {
    bubble.textContent = html;    // user input: plain text (safe)
  } else {
    bubble.innerHTML = html.replace(/\n/g, '<br>');
  }

  inner.appendChild(bubble);
  inner.appendChild(time);
  wrap.appendChild(inner);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

// ─── Typewriter effect for bot ──────────────────────────────────
function typeResponse(html, bubble) {
  // Convert <br> back to \n for typing, then re-insert
  const lines = html.replace(/<br>/g, '\n').split('\n');
  let lineIdx = 0, charIdx = 0;
  bubble.innerHTML = '';

  function tick() {
    if (lineIdx >= lines.length) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      charIdx++;
      const preview = lines.slice(0, lineIdx).join('<br>') +
                      (lineIdx > 0 ? '<br>' : '') +
                      line.substring(0, charIdx);
      bubble.innerHTML = preview;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(tick, 12);
    } else {
      lineIdx++; charIdx = 0;
      setTimeout(tick, 20);
    }
  }
  tick();
}

// ─── Show typing indicator ──────────────────────────────────────
function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot typing';
  wrap.innerHTML = '<div class="msg-bubble"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return wrap;
}

// ─── Send message ────────────────────────────────────────────────
let firstSend = true;

function sendMessage(text) {
  text = text.trim();
  if (!text) return;

  if (firstSend) {
    if (suggestionsEl) suggestionsEl.style.display = 'none';
    firstSend = false;
  }

  appendMessage(text, 'user');
  chatInput.value = '';
  chatInput.focus();

  const typing = showTyping();
  const delay  = 500 + Math.random() * 500;

  setTimeout(() => {
    typing.remove();
    const response = getResponse(text);
    const bubble   = appendMessage(response, 'bot');
    typeResponse(response.replace(/\n/g, '<br>'), bubble);
  }, delay);
}

chatSend.addEventListener('click', () => sendMessage(chatInput.value));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(chatInput.value); });

// ─── Quick suggestion buttons ────────────────────────────────────
document.querySelectorAll('.suggestion').forEach(btn => {
  btn.addEventListener('click', () => sendMessage(btn.getAttribute('data-q')));
});

// ─── Character counter (optional UX polish) ─────────────────────
chatInput.addEventListener('input', () => {
  chatSend.style.opacity = chatInput.value.trim() ? '1' : '0.6';
});
chatSend.style.opacity = '0.6';
