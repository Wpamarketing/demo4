/* ============================================================
   SCRIPT.JS – Manisha Roy Kawaii Portfolio
   ============================================================ */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  threshold: 0.4,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* ---- Sidebar active button on scroll ---- */
const sidebarBtns = document.querySelectorAll('.sidebar-btn');

function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- Skill bars animation via IntersectionObserver ---- */
const skillSection = document.querySelector('#skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.animation = 'none';
        bar.style.width = '0';
        requestAnimationFrame(() => {
          bar.style.animation = 'fillBar 1.5s ease forwards';
        });
      });
    }
  });
}, { threshold: 0.3 });

if (skillSection) skillObserver.observe(skillSection);

/* ---- Card hover sparkle effect ---- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', (e) => {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✦';
    sparkle.style.cssText = `
      position: absolute;
      pointer-events: none;
      font-size: .9rem;
      color: #a855f7;
      opacity: 0;
      animation: sparkleAnim 0.6s ease forwards;
      top: ${e.offsetY}px;
      left: ${e.offsetX}px;
      z-index: 99;
    `;
    card.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 700);
  });
});

/* ---- Inject sparkle keyframes ---- */
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkleAnim {
    0%   { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: translate(10px, -25px) scale(0.5); }
  }
`;
document.head.appendChild(style);

/* ---- Contact form submit ---- */
function handleSubmit(e) {
  e.preventDefault();
  showToast();
  e.target.reset();
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ---- Let's Connect button ---- */
document.getElementById('connectBtn').addEventListener('click', () => {
  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

/* ---- Floating particles in hero ---- */
(function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const symbols = ['✦', '✧', '⭐', '🌟', '💫', '✨'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = 0.6 + Math.random() * 1.2;
    p.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${size}rem;
      opacity: ${0.08 + Math.random() * 0.18};
      pointer-events: none;
      animation: particleFloat ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite alternate;
      z-index: 1;
    `;
    hero.appendChild(p);
  }
  const pStyle = document.createElement('style');
  pStyle.textContent = `
    @keyframes particleFloat {
      from { transform: translateY(0px) rotate(0deg); }
      to   { transform: translateY(-30px) rotate(20deg); }
    }
  `;
  document.head.appendChild(pStyle);
})();

/* ---- Scroll reveal for sections ---- */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .blog-card, .card, .about-stats .stat'
  );

  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-hidden {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity .6s ease, transform .6s ease;
    }
    .reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(revealStyle);

  revealEls.forEach((el, i) => {
    el.classList.add('reveal-hidden');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-hidden');
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
})();

/* ---- Cursor glow effect ---- */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: left .08s, top .08s;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

/* ---- Hero character tilt on mousemove ---- */
const heroChar = document.getElementById('heroChar');
if (heroChar) {
  document.querySelector('.hero-image-wrap')?.addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    heroChar.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(0px)`;
  });
  document.querySelector('.hero-image-wrap')?.addEventListener('mouseleave', () => {
    heroChar.style.transform = '';
  });
}
