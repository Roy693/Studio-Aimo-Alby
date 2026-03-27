/* ═══════════════════════════════════════════════════
   STUDIO AIMO — HOME PAGE JAVASCRIPT
   Custom cursor · Reveal · Parallax · Magnetic
   Inspired by @STUDIO_AIMO — dark, sorcery, premium
═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CUSTOM CURSOR ─────────────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let lerpFactor = 0.13;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * lerpFactor;
      ry += (my - ry) * lerpFactor;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    // Expand ring on interactive elements
    const hoverEls = document.querySelectorAll(
      'a, button, .work-card, .service-card, input, select, textarea, .btn-primary, .btn-ghost'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('expand');
        lerpFactor = 0.10; // slightly slower on hover for magnetic feel
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('expand');
        lerpFactor = 0.13;
      });
    });
  }

  /* ── HEADER SCROLL STATE ───────────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = y;
    }, { passive: true });
  }

  /* ── INTERSECTION OBSERVER — REVEAL ───────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-fade');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger based on data-delay attribute
          const delay = entry.target.dataset.delay;
          if (delay) {
            entry.target.style.transitionDelay = (parseFloat(delay) * 0.13) + 's';
          }
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── HERO ILLUSTRATION PARALLAX ──────────────── */
  const heroIllus = document.querySelector('.hero-illustration');
  if (heroIllus) {
    let hx = window.innerWidth / 2, hy = window.innerHeight / 2;
    let chx = hx, chy = hy;
    let isHeroVisible = true;

    // Only parallax when hero is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObs = new IntersectionObserver(entries => {
        isHeroVisible = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      heroObs.observe(heroSection);
    }

    document.addEventListener('mousemove', e => {
      if (isHeroVisible) {
        hx = e.clientX; hy = e.clientY;
      }
    });

    (function animParallax() {
      if (isHeroVisible) {
        chx += (hx - chx) * 0.028;
        chy += (hy - chy) * 0.022;
        const ox = (chx - window.innerWidth / 2) * 0.012;
        const oy = (chy - window.innerHeight / 2) * 0.009;
        heroIllus.style.transform = 'translate(' + ox.toFixed(2) + 'px,' + oy.toFixed(2) + 'px)';
      }
      requestAnimationFrame(animParallax);
    })();
  }

  /* ── MOBILE MENU TOGGLE ─────────────────────── */
  const menuBtn = document.getElementById('menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuBtn && mainNav) {
    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mainNav.style.display     = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.position    = 'fixed';
        mainNav.style.top         = '70px';
        mainNav.style.left        = '0';
        mainNav.style.right       = '0';
        mainNav.style.bottom      = '0';
        mainNav.style.background  = 'rgba(13,12,10,0.98)';
        mainNav.style.padding     = '48px 32px';
        mainNav.style.gap         = '28px';
        mainNav.style.zIndex      = '99';
        mainNav.style.borderTop   = '1px solid rgba(237,234,222,0.06)';
        mainNav.style.fontSize    = '1.1rem';
        mainNav.style.backdropFilter = 'blur(20px)';
        // Freeze body scroll
        document.body.style.overflow = 'hidden';
        // Animate hamburger to X
        const spans = menuBtn.querySelectorAll('span');
        if (spans[0]) spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        if (spans[1]) spans[1].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        mainNav.style.display = '';
        document.body.style.overflow = '';
        const spans = menuBtn.querySelectorAll('span');
        if (spans[0]) spans[0].style.transform = '';
        if (spans[1]) spans[1].style.transform = '';
      }
    });

    // Close menu on nav link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuOpen) {
          menuOpen = false;
          mainNav.style.display = '';
          document.body.style.overflow = '';
          const spans = menuBtn.querySelectorAll('span');
          if (spans[0]) spans[0].style.transform = '';
          if (spans[1]) spans[1].style.transform = '';
        }
      });
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
        setTimeout(() => { btn.textContent = orig; }, 3200);
      }
    });
  }

  /* ── WORK CARD HOVER TILT — magnetic 3D effect ── */
  const cards = document.querySelectorAll('.work-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      card.style.transform = 'translateY(-4px) rotateY(' + (dx * 3.5).toFixed(2) + 'deg) rotateX(' + (-dy * 2.5).toFixed(2) + 'deg)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.65s cubic-bezier(0.22,1,0.36,1)';
      setTimeout(() => { card.style.transition = ''; }, 650);
    });
  });

  /* ── SERVICE CARD — subtle glow on hover ─── */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(201,170,111,0.04) 0%, var(--surface) 60%)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  /* ── SMOOTH SECTION NAV ACTIVE STATE ─────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.main-nav a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + id;
            link.style.color = isActive ? 'var(--chalk)' : '';
          });
        }
      });
    }, { threshold: 0.30 });
    sections.forEach(s => sectionObs.observe(s));
  }

  /* ── SCROLL-BASED PARALLAX FOR MANIFESTO ── */
  const manifesto = document.querySelector('.manifesto-band');
  if (manifesto && 'IntersectionObserver' in window) {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = manifesto.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const viewCenter = window.innerHeight / 2;
          const offset = ((centerY - viewCenter) / window.innerHeight) * 18;
          const text = manifesto.querySelector('.manifesto-text');
          if (text) {
            text.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    let manifestoVisible = false;
    const mObs = new IntersectionObserver(entries => {
      manifestoVisible = entries[0].isIntersecting;
      if (manifestoVisible) {
        window.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    }, { threshold: 0.01 });
    mObs.observe(manifesto);
  }

  /* ── FOOTER LINK HOVER RIPPLE ─────────────── */
  const footerLinks = document.querySelectorAll('.footer-social a');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.letterSpacing = '0.32em';
    });
    link.addEventListener('mouseleave', () => {
      link.style.letterSpacing = '';
    });
  });

})();
