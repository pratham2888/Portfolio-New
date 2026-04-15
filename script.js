/* =========================================
   PRATHAM BHANUSHALI — PORTFOLIO SCRIPT
   Static, no external API dependencies.
   Rule-based chatbot with hardcoded knowledge.
========================================= */

/* =========================================
   1. CUSTOM CURSOR
========================================= */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Expand cursor on interactive elements
document.querySelectorAll('a, button, .suggestion, .tag, .project-card, .timeline-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.width = '32px';
    follower.style.height = '32px';
    follower.style.opacity = '1';
  });
});

/* =========================================
   2. STICKY NAV — scroll shadow
========================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(7,9,15,0.95)';
  } else {
    nav.style.background = 'rgba(7,9,15,0.8)';
  }
});

/* =========================================
   3. MOBILE HAMBURGER
========================================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* =========================================
   4. SCROLL REVEAL
========================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================
   5. ACTIVE NAV LINK on scroll
========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--amber)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* =========================================
   6. SMOOTH ANCHOR SCROLL
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
    }
  });
});

/* =========================================
   7. CHATBOT — Rule-based, no API
========================================= */
const KB = [
  // Identity
  {
    patterns: ['who are you', 'what is this', 'what are you', 'bot', 'chatbot', 'about this bot'],
    response: "I'm a portfolio assistant for Pratham Bhanushali. Ask me about his experience, skills, education, projects, or how to get in touch — I know everything about him! 😊"
  },
  // Name
  {
    patterns: ['who is pratham', 'tell me about pratham', 'about pratham', 'introduce', 'introduction'],
    response: "Pratham Bhanushali is a Data Analyst at NYU Stern School of Business, currently pursuing an MS in Management of Technology at NYU Tandon (2025–2027). He has 1+ years of real-world DA/SWE experience, a published ML research paper, and is actively seeking Summer 2026 internship and full-time roles in Data Analytics, BI, and Business Analysis."
  },
  // Current role
  {
    patterns: ['current job', 'current role', 'nyu stern', 'where does he work', 'where does pratham work', 'what does he do', 'what does pratham do'],
    response: "Pratham is currently a Data Analyst at NYU Stern School of Business. He builds ELT pipelines, KPI dashboards, and stakeholder reports on real institutional data. It's a production environment with real accountability — not just coursework."
  },
  // Education
  {
    patterns: ['education', 'degree', 'university', 'nyu', 'tandon', 'ms', 'masters', 'undergrad', 'college', 'mumbai'],
    response: "Pratham holds a BE in Information Technology from the University of Mumbai, and is currently pursuing his MS in Management of Technology at NYU Tandon School of Engineering (2025–2027)."
  },
  // Skills — general
  {
    patterns: ['skills', 'technologies', 'tech stack', 'tools', 'what can he do', 'what does he know'],
    response: "Pratham's core stack: \n\n• SQL, Python (Pandas, NumPy)\n• Tableau, Power BI, Excel\n• PostgreSQL, MongoDB\n• React, REST APIs\n• Docker, Git, Airflow\n• Deep Learning (CNN/RNN), NLP, scikit-learn\n\nHe's strongest in the analytics/BI layer — pipelines to dashboards."
  },
  // SQL
  {
    patterns: ['sql', 'database', 'postgresql', 'mongodb', 'queries'],
    response: "SQL is one of Pratham's strongest skills. He works with PostgreSQL and MongoDB in his current Data Analyst role at NYU Stern, writing queries for data pipelines and reporting. He's also comfortable with analytical SQL patterns — window functions, CTEs, aggregations."
  },
  // Python
  {
    patterns: ['python', 'pandas', 'numpy', 'scripting'],
    response: "Pratham uses Python (Pandas, NumPy) extensively — both for data cleaning/analysis in his DA roles and for ML research (CNNs, NLP, scikit-learn). He built his AI Resume Screener project in Python with spaCy and Streamlit."
  },
  // Tableau / BI
  {
    patterns: ['tableau', 'power bi', 'dashboards', 'bi', 'business intelligence', 'visualization'],
    response: "Pratham builds interactive dashboards in both Tableau and Power BI. At NYU Stern, he creates KPI dashboards for stakeholder reporting. At his DA internship at Web Work, his dashboards contributed to a 15% improvement in operational efficiency."
  },
  // Work experience
  {
    patterns: ['experience', 'work history', 'jobs', 'worked', 'previous roles', 'internship'],
    response: "Here's Pratham's work history:\n\n1. Data Analyst — NYU Stern School of Business (Jun 2025–Present)\n2. Software Developer — Speedbox (Apr 2024–Jun 2025)\n3. Data Analyst Intern — Web Work (Apr 2023–Dec 2023)\n\nHe also has a published ML research paper on top of this."
  },
  // Speedbox
  {
    patterns: ['speedbox', 'software developer', 'saas'],
    response: "At Speedbox, Pratham worked as a Software Developer (Apr 2024–Jun 2025) building white-labelled SaaS platforms. He improved backend infrastructure, optimized performance across services, and shipped features in Agile sprints using React, REST APIs, and Docker."
  },
  // Web Work
  {
    patterns: ['web work', 'internship', 'first job', 'analyst intern'],
    response: "At Web Work (Apr–Dec 2023), Pratham interned as a Data Analyst. He cleaned large datasets with Python and Excel, built Tableau dashboards to visualize key metrics, and contributed to data models that improved operational efficiency by 15%."
  },
  // Projects
  {
    patterns: ['projects', 'what has he built', 'portfolio', 'side projects', 'github'],
    response: "Pratham's notable projects:\n\n1. AI Resume Screener — Python/Streamlit app using TF-IDF + cosine similarity to match resumes to JDs\n2. Music Information Retrieval System — CNN-based deep learning (published research)\n3. IoT Smart Blink Walking Street — sensor-driven smart city lighting\n4. C Chatbot — command-line chatbot in C\n\nGitHub: github.com/pratham2888"
  },
  // AI Resume Screener
  {
    patterns: ['resume screener', 'ai resume', 'streamlit', 'tfidf', 'cosine'],
    response: "The AI Resume Screener is a Python/Streamlit web app that lets recruiters upload resumes and a job description, then uses spaCy NLP, TF-IDF vectorization, and cosine similarity to calculate match percentages. It's live on GitHub at github.com/pratham2888/AI-Resume-Screener"
  },
  // Research
  {
    patterns: ['research', 'paper', 'published', 'music', 'cnn', 'deep learning', 'ml', 'machine learning'],
    response: "Pratham has a published research paper on 'Music Information Retrieval System using Deep Learning'. He built a CNN-based system using spectrogram analysis to extract music features for automated genre classification, mood detection, and song recommendation. This is real peer-reviewed work, not just a class project."
  },
  // Job search
  {
    patterns: ['looking for', 'open to', 'job search', 'hiring', 'available', 'internship 2026', 'summer 2026'],
    response: "Pratham is actively seeking Summer 2026 internships and full-time roles in:\n\n• Data Analytics\n• Business Intelligence\n• Business Analysis\n• Software/Data Engineering (analyst-facing)\n\nTarget industries: finance, tech, consulting. Location: NYC or remote. Reach him at pb3225@nyu.edu"
  },
  // Contact
  {
    patterns: ['contact', 'reach', 'email', 'linkedin', 'how to get in touch', 'hire'],
    response: "You can reach Pratham at:\n\n📧 pb3225@nyu.edu\n💼 linkedin.com/in/pratham96328\n🐙 github.com/pratham2888\n\nHe's responsive and open to conversations about DA/BA/BI opportunities."
  },
  // Resume
  {
    patterns: ['resume', 'cv', 'download resume'],
    response: "You can view and download Pratham's resume here: https://drive.google.com/file/d/1Xzu3MZQym4DV-BEwbqrBFr-jGh66lBX3/view — or hit the 'Resume' button in the top nav!"
  },
  // Location
  {
    patterns: ['location', 'where is he', 'where does he live', 'new york', 'nyc', 'based'],
    response: "Pratham is based in New York City, NY. He's at NYU Tandon in Brooklyn. He's open to NYC-based roles as well as remote opportunities."
  },
  // Strengths
  {
    patterns: ['strengths', 'best at', 'specializes', 'expertise', 'good at'],
    response: "Pratham's core strengths are at the intersection of data engineering and business communication — he can build the pipeline AND explain what it means to stakeholders. Specific strengths:\n\n• SQL + Python for data wrangling\n• Dashboard design (Tableau/Power BI)\n• ELT pipeline development\n• Translating data into business decisions"
  },
  // Airflow / Docker
  {
    patterns: ['airflow', 'docker', 'pipeline', 'etl', 'elt', 'engineering'],
    response: "Pratham works with Apache Airflow for pipeline orchestration and Docker for containerization, both in his current role at NYU Stern. He's comfortable building end-to-end ELT workflows from data ingestion to dashboard delivery."
  },
  // Greeting
  {
    patterns: ['hello', 'hi', 'hey', 'sup', 'good morning', 'good evening', 'howdy', 'hola', 'yo'],
    response: "Hey there! 👋 I'm Pratham's portfolio bot. I can tell you about his experience, skills, projects, research, or how to contact him. What would you like to know?"
  },
  // Thanks
  {
    patterns: ['thanks', 'thank you', 'ty', 'appreciate', 'great', 'awesome', 'helpful', 'nice'],
    response: "Happy to help! Feel free to ask anything else about Pratham, or reach out to him directly at pb3225@nyu.edu 🚀"
  },
  // GPA / grades
  {
    patterns: ['gpa', 'grades', 'academic'],
    response: "Pratham's academic background includes a BE in Information Technology from the University of Mumbai and an ongoing MS in Management of Technology at NYU Tandon (2025–2027). For specific academic details, feel free to reach out to him directly at pb3225@nyu.edu."
  },
  // React / frontend
  {
    patterns: ['react', 'frontend', 'javascript', 'web dev', 'web development'],
    response: "Pratham has frontend experience with React and REST APIs from his Software Developer role at Speedbox, where he built SaaS platform UIs. His main focus is analytics/data engineering, but he can work across the full stack when needed."
  },
  // AWS / Cloud
  {
    patterns: ['aws', 'cloud', 'azure', 'gcp'],
    response: "Pratham has worked with AWS in his Data Analyst internship at Web Work and has exposure to cloud infrastructure concepts through his SWE role at Speedbox. He's primarily analytics-focused but has hands-on cloud experience."
  }
];

// Fallback responses
const FALLBACK = [
  "That's a bit outside what I know! Try asking about Pratham's experience, skills, projects, or how to contact him. 😊",
  "Hmm, not sure about that one. Ask me about his work history, tech stack, or research — I'm good at those!",
  "I don't have that info, but Pratham would! Email him at pb3225@nyu.edu for anything specific.",
  "Good question, but beyond my knowledge base! Feel free to contact Pratham directly at pb3225@nyu.edu or LinkedIn (pratham96328)."
];

function getBotResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some(p => input.includes(p))) {
      return entry.response;
    }
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

// Chat state
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const suggestions = document.getElementById('suggestions');

chatToggle.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
  if (chatWidget.classList.contains('open')) {
    setTimeout(() => chatInput.focus(), 400);
  }
});

function appendMessage(text, role) {
  const msg = document.createElement('div');
  msg.className = `msg ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  // Convert newlines to <br> for bot
  bubble.innerHTML = role === 'bot' ? text.replace(/\n/g, '<br>') : text;
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

function showTyping() {
  const typingMsg = document.createElement('div');
  typingMsg.className = 'msg bot typing';
  typingMsg.innerHTML = '<div class="msg-bubble"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(typingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingMsg;
}

function sendMessage(text) {
  if (!text.trim()) return;
  // Hide suggestions after first user message
  if (suggestions) suggestions.style.display = 'none';

  appendMessage(text, 'user');
  chatInput.value = '';

  const typing = showTyping();
  const delay = 600 + Math.random() * 600;

  setTimeout(() => {
    typing.remove();
    const response = getBotResponse(text);
    appendMessage(response, 'bot');
  }, delay);
}

chatSend.addEventListener('click', () => sendMessage(chatInput.value));
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage(chatInput.value);
});

// Quick suggestions
document.querySelectorAll('.suggestion').forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.getAttribute('data-q'));
  });
});

/* =========================================
   8. TAG hover stagger on load
========================================= */
document.querySelectorAll('.tag').forEach((tag, i) => {
  tag.style.animationDelay = `${i * 0.05}s`;
});
