/* ============================================================
   script.js  —  Erastus Arthur Portfolio
   ============================================================ */

/* ─── NAVBAR: scroll shrink + active link ───────────────────── */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  /* shrink on scroll */
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  /* back-to-top visibility */
  document.getElementById('back-to-top')
    .classList.toggle('visible', window.scrollY > 400);

  /* active nav link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});


/* ─── HAMBURGER MENU ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

/* close on link click */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


/* ─── BACK TO TOP ───────────────────────────────────────────── */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── TYPED TEXT ANIMATION ──────────────────────────────────── */
const phrases = [
  'Embedded Systems Engineer.',
  'IoT Developer.',
  'Python Developer.',
  'Computer Engineer.',
];

const typedEl  = document.getElementById('typed-text');
const cursorEl = document.querySelector('.cursor');
let phraseIdx  = 0;
let charIdx    = 0;
let deleting   = false;

function type() {
  const phrase   = phrases[phraseIdx];
  const displayed = phrase.substring(0, charIdx);
  typedEl.textContent = displayed;

  let speed = deleting ? 60 : 120;

  if (!deleting && charIdx === phrase.length) {
    speed = 2200;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting   = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    speed      = 420;
  }

  charIdx += deleting ? -1 : 1;
  setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 800));


/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        /* stagger siblings slightly */
        const siblings = entry.target.parentElement
          .querySelectorAll('.reveal:not(.visible)');
        siblings.forEach((el, idx) => {
          setTimeout(() => el.classList.add('visible'), idx * 90);
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});


/* ─── CONTACT FORM ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
    btn.disabled = true;

    const data = new FormData(form);
    await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});

    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    btn.style.background = 'var(--green)';
    form.reset();

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      btn.style.background = '';
    }, 3500);
  });

});


/* ─── SMOOTH ANCHOR SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});


/* ─── CIRCUIT GRID PARALLAX (subtle) ───────────────────────── */
window.addEventListener('mousemove', (e) => {
  const grid = document.querySelector('.circuit-grid');
  if (!grid) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  grid.style.transform = `translate(${x}px, ${y}px)`;
});
