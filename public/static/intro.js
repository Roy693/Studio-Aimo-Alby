/* ===================================================
   INTRO SCREEN — INTERACTIVE JAVASCRIPT
   Particle system + cursor parallax + arrow logic
   =================================================== */

(function () {
  'use strict';

  /* ─── PARTICLE SYSTEM ──────────────────────── */
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], animFrame;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : H + 6;
      this.size = Math.random() * 1.4 + 0.3;
      this.vy   = -(Math.random() * 0.3 + 0.1);
      this.vx   = (Math.random() - 0.5) * 0.15;
      this.alpha = Math.random() * 0.28 + 0.06;
      this.life  = 0;
      this.maxLife = Math.random() * 400 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.y < -10 || this.life > this.maxLife) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,240,225,${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((W * H) / 9000), 90);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function tickParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrame = requestAnimationFrame(tickParticles);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  tickParticles();

  /* ─── CURSOR PARALLAX ──────────────────────── */
  const scene  = document.getElementById('main-scene');
  const items  = scene ? Array.from(scene.querySelectorAll('.furniture-item')) : [];
  let mouseX   = window.innerWidth  / 2;
  let mouseY   = window.innerHeight / 2;
  let targetX  = mouseX;
  let targetY  = mouseY;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Parallax depths — different for each piece
  const depths = [0.008, 0.012, 0.006, 0.010, 0.009, 0.007, 0.011, 0.013,
                  0.005, 0.014, 0.008, 0.010, 0.007, 0.006, 0.009, 0.012,
                  0.010, 0.008, 0.011];

  function animateParallax() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = currentX - cx;
    const dy = currentY - cy;

    items.forEach((item, i) => {
      const d   = depths[i % depths.length];
      const tx  = dx * d;
      const ty  = dy * d;
      // preserve existing transform (rotate etc.) via CSS var trick
      const base = item.dataset.baseTransform || item.getAttribute('transform') || '';
      if (!item.dataset.baseTransform) item.dataset.baseTransform = base;
      item.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    requestAnimationFrame(animateParallax);
  }
  animateParallax();

  /* ─── ARROW PULSE ACTIVATION ───────────────── */
  const arrow = document.getElementById('enter-arrow');
  if (arrow) {
    setTimeout(() => {
      arrow.classList.add('pulse-active');
    }, 4500);

    /* ─── PAGE TRANSITION ON CLICK ─────────── */
    arrow.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const intro = document.getElementById('intro-screen');
      cancelAnimationFrame(animFrame);

      intro.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 880);
    });
  }

  /* ─── KEYBOARD ENTER ────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      if (arrow) arrow.click();
    }
  });

  /* ─── SVG PATH LENGTH CORRECTION ───────────── */
  // After elements become visible, reset stroke-dasharray to actual length
  // so the drawing effect is smooth even for short paths
  function normaliseStrokes() {
    const strokes = scene.querySelectorAll(
      'line, path, polygon, polyline, ellipse, circle, rect'
    );
    strokes.forEach(el => {
      try {
        const len = el.getTotalLength ? el.getTotalLength() : 0;
        if (len > 0) {
          el.style.strokeDasharray  = len;
          el.style.strokeDashoffset = len;
        }
      } catch (_) { /* non-renderable elements */ }
    });
  }
  // Run once DOM is fully painted
  requestAnimationFrame(() => requestAnimationFrame(normaliseStrokes));

})();
