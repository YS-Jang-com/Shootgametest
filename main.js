/* ============================================
   FORMA STUDIO — main.js
   ============================================ */

// ── LOADER ──────────────────────────────────
const loader    = document.getElementById('loader');
const loaderFill = document.getElementById('loader-fill');
const loaderNum  = document.getElementById('loader-num');

let progress = 0;
const loadInterval = setInterval(() => {
  progress += Math.random() * 12 + 3;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadInterval);
    loaderFill.style.width = '100%';
    loaderNum.textContent  = '100';
    setTimeout(() => {
      loader.classList.add('done');
      initReveal();
      animateCounters();
    }, 400);
  } else {
    loaderFill.style.width = progress + '%';
    loaderNum.textContent  = Math.floor(progress);
  }
}, 60);

// ── CUSTOM CURSOR ────────────────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let fx = 0, fy = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', (e) => {
  cx = e.clientX; cy = e.clientY;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
});

(function animFollower() {
  fx += (cx - fx) * 0.12;
  fy += (cy - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animFollower);
})();

document.querySelectorAll('a, button, .work-item, .service-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

// ── NAV SCROLL ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE MENU ──────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── SCROLL REVEAL ────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

// ── COUNTER ANIMATION ────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + (el.dataset.target === '98' ? '' : '+');
    }, 20);
  });
}

// ── PARTICLES ────────────────────────────────
const canvas  = document.getElementById('particles');
const ctx     = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : H + 10;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -(Math.random() * 0.4 + 0.1);
    this.r  = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.decay  = Math.random() * 0.002 + 0.001;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,75,26,${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

(function animParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
})();

// ── MAGNETIC BUTTONS ─────────────────────────
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width  / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

// ── CONTACT FORM ─────────────────────────────
const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Message sent ✓';
    submitBtn.style.background     = '#1a7a3a';
    submitBtn.style.borderColor    = '#1a7a3a';
    submitBtn.style.pointerEvents  = 'none';
    setTimeout(() => {
      btnText.textContent            = 'Send message';
      submitBtn.style.background     = '';
      submitBtn.style.borderColor    = '';
      submitBtn.style.pointerEvents  = '';
    }, 3000);
  });
}

// ── MARQUEE DUPLICATE (ensure seamless loop) ──
const m = document.getElementById('marquee1');
if (m) {
  const clone = m.cloneNode(true);
  m.parentNode.appendChild(clone);
}
