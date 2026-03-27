/* ═══════════════════════════════════════════════════
   STUDIO AIMO — HOME PAGE JAVASCRIPT
   Cursor · Reveal · Header · Magnetic effects
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CUSTOM CURSOR ─────────────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    // Expand ring on interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, .work-card, .service-card, input, select, textarea'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expand'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
    });
  }

  /* ── HEADER SCROLL STATE ───────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── INTERSECTION OBSERVER — REVEAL ───────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-scale');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => obs.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── HERO ILLUSTRATION PARALLAX ──────────────── */
  const heroIllus = document.querySelector('.hero-illustration');
  if (heroIllus) {
    let hx = window.innerWidth / 2, hy = window.innerHeight / 2;
    let chx = hx, chy = hy;

    document.addEventListener('mousemove', e => {
      hx = e.clientX; hy = e.clientY;
    });

    (function animParallax() {
      chx += (hx - chx) * 0.035;
      chy += (hy - chy) * 0.035;
      const ox = (chx - window.innerWidth / 2) * 0.015;
      const oy = (chy - window.innerHeight / 2) * 0.012;
      heroIllus.style.transform = 'translate(' + ox.toFixed(2) + 'px,' + oy.toFixed(2) + 'px)';
      requestAnimationFrame(animParallax);
    })();
  }

  /* ── MOBILE MENU TOGGLE ─────────────────────── */
  const menuBtn = document.getElementById('menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const open = mainNav.style.display === 'flex';
      mainNav.style.display = open ? 'none' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '80px';
      mainNav.style.left = '0';
      mainNav.style.right = '0';
      mainNav.style.background = 'rgba(15,14,13,0.98)';
      mainNav.style.padding = '24px 30px';
      mainNav.style.gap = '20px';
      mainNav.style.borderBottom = '1px solid rgba(237,233,223,0.08)';
    });
  }

  /* ── CONTACT FORM FEEDBACK ─────────────────── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.cf-submit span');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Sent ✓';
        setTimeout(() => { btn.textContent = orig; }, 3000);
      }
    });
  }

  /* ── WORK CARD HOVER TILT ──────────────────── */
  const cards = document.querySelectorAll('.work-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      card.style.transform = 'translateY(-3px) rotateY(' + (dx * 3).toFixed(2) + 'deg) rotateX(' + (-dy * 2).toFixed(2) + 'deg)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });

  /* ── SMOOTH SECTION NAV ACTIVE STATE ─────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  if (sections.length && navLinks.length) {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--chalk)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => sectionObs.observe(s));
  }

})();
