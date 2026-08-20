/* ============================================================
   THE FASTNET — main.js
   Nav, mobile menu, menu tabs, scroll reveals, Lenis + parallax,
   cookie consent, back-to-top.

   IMPORTANT: Lenis is the single source of truth for scroll
   position. Hero parallax and nav/back-to-top scroll state all
   read from lenis.on('scroll', ...) — never a second rAF loop.
   ============================================================ */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     LOADING SCREEN — first visit only
     ============================================================ */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;
    if (sessionStorage.getItem('fastnet_visited')) {
      loader.style.display = 'none';
      return;
    }
    sessionStorage.setItem('fastnet_visited', '1');
    setTimeout(() => loader.classList.add('hidden'), 500);
  });

  /* ============================================================
     MOBILE NAV — focus trap, aria-hidden toggle (not display:none)
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  let lastFocused = null;

  function openMenu() {
    if (!mobileNav || !hamburger) return;
    lastFocused = document.activeElement;
    mobileNav.dataset.open = 'true';
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (mobileClose) mobileClose.focus();
  }

  function closeMenu() {
    if (!mobileNav || !hamburger) return;
    mobileNav.dataset.open = 'false';
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (mobileNav.dataset.open !== 'true') return;
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key === 'Tab') {
        const focusables = mobileNav.querySelectorAll('a, button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ============================================================
     MENU TABS — role="tablist", keyboard Arrow/Home/End
     ============================================================ */
  const tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    function activateTab(tab, focusIt) {
      tabs.forEach((t) => {
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.setAttribute('tabindex', active ? '0' : '-1');
        t.classList.toggle('menu__tab--active', active);
        if (panel) panel.classList.toggle('menu__panel--active', active);
      });
      if (focusIt) tab.focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activateTab(tab, false));
      tab.addEventListener('keydown', (e) => {
        let idx = null;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = tabs.length - 1;
        if (idx !== null) {
          e.preventDefault();
          activateTab(tabs[idx], true);
        }
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL — IntersectionObserver, fires once
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal, .reveal--fade, .reveal--heading, .reveal--scale');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     LENIS + SINGLE SCROLL SOURCE
     Nav scrolled state, back-to-top visibility, and hero parallax
     all read from the same scroll position — no competing rAF loops.
     ============================================================ */
  const navEl = document.getElementById('nav');
  const backTop = document.getElementById('back-to-top');
  const heroImg = document.getElementById('hero-img');

  function onScrollPosition(y) {
    if (navEl) navEl.classList.toggle('nav--scrolled', y > 40);
    if (backTop) backTop.classList.toggle('visible', y > 400);
    if (heroImg && !prefersReducedMotion) {
      heroImg.style.transform = `translateY(${y * 0.4}px)`;
    }
  }

  let lenis = null;

  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenis.on('scroll', ({ scroll }) => onScrollPosition(scroll));
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    onScrollPosition(window.scrollY);
  } else {
    onScrollPosition(window.scrollY);
    window.addEventListener('scroll', () => onScrollPosition(window.scrollY), { passive: true });
  }

  if (backTop) {
    backTop.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  }

  /* ============================================================
     MENU PANEL HEIGHT — avoid layout jump on tab switch
     ============================================================ */
  function setMenuHeight() {
    const panels = document.querySelectorAll('.menu__panel');
    const container = document.querySelector('.menu__panels');
    if (!panels.length || !container) return;
    let max = 0;
    panels.forEach((p) => {
      p.style.display = 'block';
      max = Math.max(max, p.scrollHeight);
      p.style.display = '';
    });
    container.style.minHeight = max + 'px';
  }
  document.addEventListener('DOMContentLoaded', setMenuHeight);
  window.addEventListener('resize', setMenuHeight);

  /* ============================================================
     COOKIE CONSENT (GDPR)
     ============================================================ */
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('cookie-accept');
  const btnDecline = document.getElementById('cookie-decline');

  function loadGA4() {
    const GA_ID = 'G-XXXXXXXXXX'; // placeholder — replace before launch
    if (GA_ID.includes('XXXX')) return;
    const s = document.createElement('script');
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  if (cookieBanner) {
    const consent = localStorage.getItem('fastnet_cookie_consent');
    if (!consent) {
      requestAnimationFrame(() => {
        cookieBanner.dataset.visible = 'true';
        if (btnAccept) btnAccept.focus();
      });
    } else if (consent === 'accepted') {
      loadGA4();
    }

    function setConsent(value) {
      localStorage.setItem('fastnet_cookie_consent', value);
      cookieBanner.dataset.visible = 'false';
      if (value === 'accepted') loadGA4();
    }
    if (btnAccept) btnAccept.addEventListener('click', () => setConsent('accepted'));
    if (btnDecline) btnDecline.addEventListener('click', () => setConsent('declined'));
  }
})();
