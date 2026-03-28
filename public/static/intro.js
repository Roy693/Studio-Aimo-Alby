/* ═══════════════════════════════════════════════════
   STUDIO AIMO — INTRO SCREEN JAVASCRIPT
   Chalk Sequencer · Particles · Parallax · Arrow
   One object drawn at a time, then dissolves — infinite loop
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
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.018 + 0.008;
    this.life = 0;
    this.max  = Math.random() * 480 + 200;
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

  /* ══════════════════════════════════════════════════════
     CHALK DRAW SEQUENCER
     Draws one furniture item at a time — stroke by stroke —
     like a hand tracing chalk on a blackboard.
     When complete, the piece holds for a moment then dissolves.
     Next object fades in from a different zone. Infinite loop.
  ════════════════════════════════════════════════════════ */

  const scene = document.getElementById('main-scene');
  if (!scene) return;

  // Ordered sequence: mix of zones so the eye travels across canvas
  // Each entry: [id, label, drawDuration(ms), holdDuration(ms), fadeDuration(ms)]
  const SEQUENCE = [
    ['sofa-tl',       'Sectional Sofa',        3200, 1800, 1200],
    ['kitchen-tc',    'Kitchen Island',         3400, 1800, 1200],
    ['bookcase-tr',   'Library Wall',           3000, 1600, 1100],
    ['bathtub-bl',    'Freestanding Bath',      3200, 2000, 1300],
    ['reception-mc',  'Reception Desk',         3600, 2200, 1400],
    ['dining-ml',     'Dining Table',           3000, 1800, 1200],
    ['bed-br',        'Luxury Bedroom',         3400, 2000, 1300],
    ['ct-tl',         'Coffee Table',           2400, 1400, 1000],
    ['wardrobe-mr',   'Walk-in Wardrobe',       3200, 1800, 1200],
    ['draft-table',   'Architect Studio',       3000, 1800, 1200],
    ['chaise-mr',     'Chaise Longue',          2600, 1600, 1100],
    ['chandelier-ml', 'Statement Chandelier',   2800, 1600, 1100],
    ['armchair-tr',   'Reading Chair',          2400, 1400, 1000],
    ['pendant-mc',    'Pendant Cluster',        2600, 1600, 1100],
    ['sidetable-bl',  'Marble Side Table',      2000, 1200, 900 ],
    ['pendants-tl',   'Pendant Trio',           2400, 1400, 1000],
    ['pendants-br',   'Bedside Pendants',       2200, 1400, 1000],
    ['lamp-tr',       'Arc Floor Lamp',         2400, 1400, 1000],
    ['sample-board',  'Material Samples',       2800, 1600, 1100],
    ['pod-l',         'Pod Chair',              2400, 1400, 1000],
    ['sconces-bl',    'Wall Sconces',           2000, 1200, 900 ],
    ['stool-bc',      'Architect Stool',        1800, 1200, 900 ],
    ['pod-r',         'Lounge Pod',             2400, 1400, 1000],
  ];

  // Hide all .fi elements initially
  const allItems = Array.from(scene.querySelectorAll('.fi'));
  allItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'none';
  });

  // Also hide conn/annot lines initially
  scene.querySelectorAll('.conn, .annot').forEach(el => {
    el.style.opacity = '0';
  });

  /* ── Per-stroke draw utility ── */
  function getStrokes(group) {
    return Array.from(group.querySelectorAll(
      'line, path, polygon, polyline, ellipse, circle, rect'
    ));
  }

  function measureStroke(el) {
    try {
      if (el.getTotalLength) return el.getTotalLength();
    } catch (e) {}
    // Fallback estimates for elements without getTotalLength
    const tag = el.tagName.toLowerCase();
    if (tag === 'line') {
      const dx = (el.getAttribute('x2') || 0) - (el.getAttribute('x1') || 0);
      const dy = (el.getAttribute('y2') || 0) - (el.getAttribute('y1') || 0);
      return Math.sqrt(dx * dx + dy * dy);
    }
    if (tag === 'ellipse') {
      const rx = parseFloat(el.getAttribute('rx') || 0);
      const ry = parseFloat(el.getAttribute('ry') || 0);
      return 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
    }
    if (tag === 'circle') {
      return 2 * Math.PI * parseFloat(el.getAttribute('r') || 10);
    }
    if (tag === 'rect') {
      const w = parseFloat(el.getAttribute('width') || 0);
      const h = parseFloat(el.getAttribute('height') || 0);
      return 2 * (w + h);
    }
    return 200; // safe default
  }

  /* ── Animate a single group: draw then hold then fade ── */
  function animateItem(entry) {
    return new Promise(resolve => {
      const [id, , drawDur, holdDur, fadeDur] = entry;
      const group = scene.getElementById ? scene.getElementById(id) : document.getElementById(id);
      if (!group) { resolve(); return; }

      const strokes = getStrokes(group);
      if (strokes.length === 0) { resolve(); return; }

      // Prepare strokes: set dash arrays
      strokes.forEach(el => {
        const len = Math.max(measureStroke(el), 10);
        el.style.strokeDasharray  = len + 'px';
        el.style.strokeDashoffset = len + 'px';
        el.style.transition = 'none';
        el.style.opacity = '1';
      });

      // Reveal the group instantly (strokes are still invisible)
      group.style.transition = 'none';
      group.style.opacity = '1';

      // ── PHASE 1: Draw strokes staggered ──
      // Total draw budget split across strokes in a natural stagger
      const perStrokeDelay = drawDur / (strokes.length + 1);
      const strokeDuration = drawDur * 0.85; // each stroke draws in this window

      strokes.forEach((el, i) => {
        const delay = i * perStrokeDelay;
        const dur   = strokeDuration + Math.random() * 300; // slight variation
        setTimeout(() => {
          el.style.transition = 'stroke-dashoffset ' + dur + 'ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          el.style.strokeDashoffset = '0px';
        }, delay);
      });

      // ── PHASE 2: Hold ──
      const holdStart = drawDur;
      setTimeout(() => {
        // subtle float during hold
        group.style.transition = 'transform ' + holdDur + 'ms ease-in-out';
        group.style.transform  = 'translateY(-6px)';
      }, holdStart);

      // ── PHASE 3: Fade out ──
      const fadeStart = holdStart + holdDur;
      setTimeout(() => {
        group.style.transition = 'opacity ' + fadeDur + 'ms cubic-bezier(0.55, 0, 1, 0.45), transform ' + fadeDur + 'ms ease-in';
        group.style.opacity    = '0';
        group.style.transform  = 'translateY(-18px) scale(0.97)';
      }, fadeStart);

      // ── DONE: reset and resolve ──
      const totalDur = fadeStart + fadeDur + 80;
      setTimeout(() => {
        // Reset for next time this item appears
        group.style.transition = 'none';
        group.style.opacity    = '0';
        group.style.transform  = 'none';
        strokes.forEach(el => {
          el.style.transition        = 'none';
          el.style.strokeDashoffset  = measureStroke(el) + 'px';
        });
        resolve();
      }, totalDur);
    });
  }

  /* ── Show connection lines after first draw ── */
  let connShown = false;
  function showConnLines() {
    if (connShown) return;
    connShown = true;
    scene.querySelectorAll('.conn').forEach(el => {
      el.style.transition = 'opacity 3s ease';
      el.style.opacity    = '0.6';
    });
  }

  /* ── Label overlay — shows item name while drawing ── */
  const labelEl = (function () {
    const d = document.createElement('div');
    d.id = 'chalk-label';
    d.style.cssText = [
      'position:fixed',
      'bottom:130px',
      'left:50%',
      'transform:translateX(-50%)',
      'font-family:"Cormorant Garamond",Cormorant,Georgia,serif',
      'font-size:13px',
      'letter-spacing:0.30em',
      'text-transform:uppercase',
      'color:rgba(238,235,220,0.38)',
      'pointer-events:none',
      'z-index:10',
      'transition:opacity 0.8s ease',
      'opacity:0',
      'white-space:nowrap',
    ].join(';');
    document.getElementById('intro-screen').appendChild(d);
    return d;
  }());

  function showLabel(text, drawDur, holdDur, fadeDur) {
    labelEl.textContent = text;
    // Fade in quickly
    labelEl.style.transition = 'opacity 0.6s ease';
    labelEl.style.opacity = '1';
    // Fade out during the fade phase
    const fadeOutAt = drawDur + holdDur;
    setTimeout(() => {
      labelEl.style.transition = 'opacity ' + fadeDur + 'ms ease';
      labelEl.style.opacity = '0';
    }, fadeOutAt);
  }

  /* ── Main sequencer loop ── */
  let seqIndex = 0;
  let running  = true;

  async function runSequencer() {
    // Small initial pause to let CSS and fonts settle
    await delay(1200);

    while (running) {
      const entry = SEQUENCE[seqIndex % SEQUENCE.length];
      seqIndex++;

      // Show connection lines after third item
      if (seqIndex === 3) showConnLines();

      const [id, label, drawDur, holdDur, fadeDur] = entry;

      // Show label
      showLabel(label, drawDur, holdDur, fadeDur);

      // Animate the item (draw → hold → fade)
      await animateItem(entry);

      // Brief gap between objects
      await delay(320);
    }
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  runSequencer();

  /* ── Mouse parallax — subtle scene depth ────── */
  let mx = W / 2, my = H / 2;
  let cpx = W / 2, cpy = H / 2;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Use the SVG element itself for a gentle overall parallax instead
  // of per-element (since items appear/disappear dynamically)
  (function parallaxScene() {
    cpx += (mx - cpx) * 0.028;
    cpy += (my - cpy) * 0.028;
    const ox = (cpx - W / 2) * 0.006;
    const oy = (cpy - H / 2) * 0.006;
    if (scene) {
      scene.style.transform = 'translate(' + ox.toFixed(2) + 'px,' + oy.toFixed(2) + 'px)';
    }
    requestAnimationFrame(parallaxScene);
  }());

  /* ── HOME PREVIEW CARD ──────────────────────── */
  const preview = document.getElementById('home-preview');
  if (preview) {
    setTimeout(() => {
      preview.classList.add('preview-visible');
    }, 5800);
  }

  /* ── ENTER ARROW ────────────────────────────── */
  const arrow = document.getElementById('enter-arrow');

  if (arrow) {
    setTimeout(() => arrow.classList.add('pulsing'), 6000);

    arrow.addEventListener('click', function (e) {
      e.preventDefault();
      const dest = this.getAttribute('href');
      running = false; // stop sequencer
      arrow.classList.remove('pulsing');
      if (preview) {
        preview.classList.remove('preview-visible');
        preview.classList.add('preview-exit');
      }
      cancelAnimationFrame(raf);
      labelEl.style.opacity = '0';
      const screen = document.getElementById('intro-screen');
      if (screen) screen.classList.add('exit');
      setTimeout(() => { window.location.href = dest; }, 900);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        arrow.click();
      }
    });
  }

  /* ── TOUCH SUPPORT ──────────────────────────── */
  let touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (dy > 60 && arrow) arrow.click();
  }, { passive: true });

})();
