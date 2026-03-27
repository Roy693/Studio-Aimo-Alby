/* ═══════════════════════════════════════════════════
   STUDIO AIMO — INTRO SCREEN JAVASCRIPT
   Particles · Parallax · Stroke normalisation · Arrow
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── PARTICLE DUST SYSTEM ───────────────────── */
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, pts = [], raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() { this.init(true); }
  Particle.prototype.init = function (rand) {
    this.x    = Math.random() * W;
    this.y    = rand ? Math.random() * H : H + 4;
    this.r    = Math.random() * 1.2 + 0.25;
    this.vy   = -(Math.random() * 0.22 + 0.08);
    this.vx   = (Math.random() - 0.5) * 0.12;
    this.life = 0;
    this.max  = Math.random() * 500 + 250;
    this.a    = Math.random() * 0.22 + 0.05;
  };
  Particle.prototype.tick = function () {
    this.x += this.vx; this.y += this.vy; this.life++;
    if (this.y < -6 || this.life > this.max) this.init(false);
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(238,234,218,' + this.a + ')';
    ctx.fill();
  };

  function initPts() {
    pts = [];
    const n = Math.min(Math.floor((W * H) / 8500), 100);
    for (let i = 0; i < n; i++) pts.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.tick(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initPts(); });
  resize(); initPts(); loop();

  /* ── MOUSE PARALLAX ─────────────────────────── */
  const scene     = document.getElementById('main-scene');
  const items     = scene ? Array.from(scene.querySelectorAll('.fi')) : [];
  let mx = W / 2, my = H / 2;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Varying parallax strength per element index
  const strengths = items.map((_, i) => {
    const base = [0.007, 0.012, 0.005, 0.010, 0.009, 0.013, 0.006, 0.011,
                  0.008, 0.014, 0.007, 0.010, 0.006, 0.009, 0.012, 0.008];
    return base[i % base.length];
  });

  function parallax() {
    cx += (mx - cx) * 0.045;
    cy += (my - cy) * 0.045;
    const ox = cx - W / 2;
    const oy = cy - H / 2;
    items.forEach((el, i) => {
      const s = strengths[i];
      el.style.transform = 'translate(' + (ox * s).toFixed(2) + 'px,' + (oy * s).toFixed(2) + 'px)';
    });
    requestAnimationFrame(parallax);
  }
  parallax();

  /* ── SVG STROKE PATH-LENGTH NORMALISATION ───── */
  // Run after first paint so getTotalLength is accurate
  function normaliseStrokes() {
    const els = scene ? scene.querySelectorAll('line,path,polygon,polyline,ellipse,circle,rect') : [];
    els.forEach(el => {
      try {
        const len = el.getTotalLength ? el.getTotalLength() : 0;
        if (len > 2) {
          el.style.strokeDasharray  = len;
          el.style.strokeDashoffset = len;
        }
      } catch (e) { /* skip */ }
    });
  }
  requestAnimationFrame(() => requestAnimationFrame(normaliseStrokes));

  /* ── ARROW ──────────────────────────────────── */
  const arrow = document.getElementById('enter-arrow');

  if (arrow) {
    // Start pulsing 1.8s after it appears (~5.4s from load)
    setTimeout(() => arrow.classList.add('pulsing'), 5500);

    // Click → fade out page, then navigate
    arrow.addEventListener('click', function (e) {
      e.preventDefault();
      const dest = this.getAttribute('href');
      cancelAnimationFrame(raf);
      document.getElementById('intro-screen').classList.add('exit');
      setTimeout(() => { window.location.href = dest; }, 820);
    });

    // Keyboard shortcut
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') arrow.click();
    });
  }
})();
