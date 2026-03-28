/* ═══════════════════════════════════════════════════
   STUDIO AIMO — INTRO SCREEN JAVASCRIPT
   Particles · Parallax · Stroke animation · Arrow
   Dark sorcery · Chalk drawings come to life
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── PARTICLE CHALK DUST SYSTEM ─────────────── */
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
    this.r    = Math.random() * 1.4 + 0.20;
    this.vy   = -(Math.random() * 0.28 + 0.06);
    this.vx   = (Math.random() - 0.5) * 0.16;
    this.wobble = Math.random() * Math.PI * 2; // sine wobble offset
    this.wobbleSpeed = Math.random() * 0.018 + 0.008;
    this.life = 0;
    this.max  = Math.random() * 480 + 200;
    // Mix of chalk white and very slight warm tones
    const warm = Math.random() > 0.7;
    this.color = warm
      ? 'rgba(220,195,155,' + (Math.random() * 0.14 + 0.04) + ')'
      : 'rgba(238,234,218,' + (Math.random() * 0.18 + 0.04) + ')';
  };
  Particle.prototype.tick = function () {
    this.wobble += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobble) * 0.08;
    this.y += this.vy;
    this.life++;
    if (this.y < -6 || this.life > this.max) this.init(false);
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function initPts() {
    pts = [];
    const n = Math.min(Math.floor((W * H) / 7000), 120);
    for (let i = 0; i < n; i++) pts.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.tick(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initPts(); });
  resize(); initPts(); loop();

  /* ── MOUSE PARALLAX — depth layers ──────────── */
  const scene  = document.getElementById('main-scene');
  const items  = scene ? Array.from(scene.querySelectorAll('.fi')) : [];
  let mx = W / 2, my = H / 2;
  let cx = W / 2, cy = H / 2;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Varying parallax depth per furniture item — further items move less
  const strengths = items.map((_, i) => {
    const depthMap = [
      0.008, 0.013, 0.005, 0.011, 0.009, 0.014,
      0.007, 0.012, 0.008, 0.015, 0.006, 0.010,
      0.007, 0.009, 0.013, 0.008, 0.011, 0.006,
      0.010, 0.007, 0.012, 0.005, 0.009, 0.013,
      0.007, 0.010, 0.006, 0.011, 0.008, 0.014
    ];
    return depthMap[i % depthMap.length];
  });

  // Central pieces get a special, very slight hover response
  const centralIds = ['central-sofa', 'central-armchair', 'central-ct', 'central-chandelier', 'central-rug', 'central-room'];

  function parallax() {
    cx += (mx - cx) * 0.038;
    cy += (my - cy) * 0.038;
    const ox = cx - W / 2;
    const oy = cy - H / 2;
    items.forEach((el, i) => {
      const isCentral = centralIds.some(id => el.id === id);
      const s = isCentral ? 0.004 : strengths[i];
      el.style.transform = 'translate(' + (ox * s).toFixed(2) + 'px,' + (oy * s).toFixed(2) + 'px)';
    });
    requestAnimationFrame(parallax);
  }
  parallax();

  /* ── SVG STROKE PATH-LENGTH NORMALISATION ───── */
  // Ensures stroke animations look precise for all element types
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
  // Run after first two paint frames for accuracy
  requestAnimationFrame(() => requestAnimationFrame(normaliseStrokes));

  /* ── HOME PREVIEW CARD ──────────────────────── */
  const preview = document.getElementById('home-preview');

  if (preview) {
    // After preview fades in (CSS anim at 5.2s), switch to idle float
    setTimeout(() => {
      preview.classList.add('preview-visible');
    }, 6600); // 5.2s delay + 1.2s anim duration + buffer
  }

  /* ── ENTER ARROW ────────────────────────────── */
  const arrow = document.getElementById('enter-arrow');

  if (arrow) {
    // Start pulsing 1.8s after it appears (~5.8s from load)
    setTimeout(() => arrow.classList.add('pulsing'), 6000);

    // Click → dramatic exit, then navigate
    arrow.addEventListener('click', function (e) {
      e.preventDefault();
      const dest = this.getAttribute('href');
      arrow.classList.remove('pulsing');
      // Fade out preview card
      if (preview) {
        preview.classList.remove('preview-visible');
        preview.classList.add('preview-exit');
      }
      cancelAnimationFrame(raf);
      const screen = document.getElementById('intro-screen');
      if (screen) screen.classList.add('exit');
      setTimeout(() => { window.location.href = dest; }, 900);
    });

    // Keyboard: Enter / ArrowRight / Space navigates
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        arrow.click();
      }
    });
  }

  /* ── TOUCH SUPPORT — tap anywhere to enter ── */
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    // Swipe up > 60px triggers enter
    if (dy > 60 && arrow) {
      arrow.click();
    }
  }, { passive: true });

})();
