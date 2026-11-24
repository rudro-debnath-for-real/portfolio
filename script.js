/* ==========================================================================
   Rudro Debnath — combined portfolio interactions
   ========================================================================== */
(function () {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  const yearEl = $('#current-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeToggle = $('#theme-toggle');
  const themeMeta = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0a0f1a' : '#f8fafc');
    if (themeToggle) {
      const toLight = theme === 'dark';
      themeToggle.setAttribute('aria-label', toLight ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.setAttribute('aria-pressed', String(!toLight));
    }
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('rudro_theme') || 'dark'; } catch (e) { /* storage blocked */ }
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('rudro_theme', next); } catch (e) { /* storage blocked */ }
      showToast('Theme updated', 'Switched to ' + next + ' mode.', 'success');
    });
  }

  /* ---------- Mobile navigation ---------- */
  const menuToggle = $('#menu-toggle');
  const nav = $('#nav');
  const backdrop = $('#nav-backdrop');

  function setMenu(open) {
    if (!menuToggle || !nav || !backdrop) return;
    menuToggle.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  if (menuToggle) menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  if (backdrop) backdrop.addEventListener('click', () => setMenu(false));
  $$('.nav__link').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });

  /* ---------- Typing greeting ---------- */
  const typingEl = $('#typing-text');
  if (typingEl) {
    const phrases = ["Hello, I'm Rudro.", 'Building with C++ & Java.', 'Solving algorithms daily.', 'Welcome to my portfolio.'];
    if (reduceMotion) {
      typingEl.textContent = phrases[0];
    } else {
      let phrase = 0, char = 0, deleting = false;
      function tick() {
        const current = phrases[phrase];
        char += deleting ? -1 : 1;
        typingEl.textContent = current.slice(0, char);
        let delay = deleting ? 55 : 95;
        if (!deleting && char === current.length) { deleting = true; delay = 1900; }
        else if (deleting && char === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 420; }
        window.setTimeout(tick, delay);
      }
      window.setTimeout(tick, 600);
    }
  }

  /* ---------- Scroll-triggered reveals, counters and skill bars ---------- */
  const pendingReveals = new Set($$('.reveal'));
  const pendingCounts = new Set($$('[data-count]'));
  const pendingBars = new Set($$('.skill-bar > span'));

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const raw = el.getAttribute('data-count') || '';
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) { el.textContent = raw; return; }
    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1400;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* Runs on every scroll frame: reliable even after fast jumps or restored scroll positions. */
  function checkInView() {
    const limit = window.innerHeight - 24;
    pendingReveals.forEach(el => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add('is-visible'); pendingReveals.delete(el); }
    });
    pendingCounts.forEach(el => {
      if (el.getBoundingClientRect().top < limit) { animateCount(el); pendingCounts.delete(el); }
    });
    pendingBars.forEach(el => {
      if (el.getBoundingClientRect().top < limit) {
        el.style.width = (el.getAttribute('data-progress') || '0') + '%';
        pendingBars.delete(el);
      }
    });
  }

  /* ---------- Scroll progress, scroll spy, header & back-to-top ---------- */
  const progress = $('#scroll-progress');
  const header = $('#header');
  const backToTop = $('#back-to-top');
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  let ticking = false;

  function onScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;

    if (progress) {
      progress.style.setProperty('--progress', pct.toFixed(4));
      progress.setAttribute('aria-valuenow', String(Math.round(pct * 100)));
    }
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 500);

    let currentId = '';
    const offset = y + 140;
    sections.forEach(section => { if (section.offsetTop <= offset) currentId = section.id; });
    navLinks.forEach(link => {
      const active = currentId !== '' && link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    checkInView();
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  }

  /* ---------- Toast notifications ---------- */
  const toastContainer = $('#toast-container');

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function showToast(title, message, type = 'success') {
    if (!toastContainer) return;
    const isError = type === 'error';
    const toast = document.createElement('div');
    toast.className = 'toast' + (isError ? ' toast--error' : '');
    toast.setAttribute('role', isError ? 'alert' : 'status');
    const icon = isError
      ? '<path d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path>'
      : '<path d="M20 6L9 17l-5-5"></path>';
    toast.innerHTML =
      '<span class="toast__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon + '</svg></span>' +
      '<span><span class="toast__title">' + escapeHTML(title) + '</span><br><span class="toast__message">' + escapeHTML(message) + '</span></span>';
    toastContainer.appendChild(toast);
    window.setTimeout(() => {
      toast.classList.add('is-leaving');
      window.setTimeout(() => toast.remove(), 320);
    }, 4500);
  }

  /* ---------- Contact form: validation + Google Forms submission ----------
     Google Forms does not send CORS headers, so a fetch() cannot confirm the
     result. The form posts normally into a hidden iframe; its load event tells
     us Google answered, and the page stays exactly where the visitor is. */
  const form = $('#contact-form');
  if (form) {
    const submitBtn = $('#submit-btn');
    const btnText = $('.btn-text', submitBtn);
    const responseFrame = $('#gform-response');
    const originalLabel = btnText ? btnText.textContent : 'Send Message';
    const fields = {
      name: $('#name', form),
      email: $('#email', form),
      subject: $('#subject', form),
      message: $('#message', form)
    };
    let submitting = false;

    function setError(input, message) {
      const group = input.closest('.form-field');
      const errorEl = $('#' + input.id + '-error', form);
      if (group) group.classList.toggle('has-error', Boolean(message));
      if (errorEl) errorEl.textContent = message || '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function setLoading(loading) {
      if (submitBtn) submitBtn.disabled = loading;
      if (btnText) btnText.textContent = loading ? 'Sending…' : originalLabel;
    }

    Object.values(fields).forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => setError(input, ''));
      input.addEventListener('change', () => setError(input, ''));
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (submitting) return;
      let firstInvalid = null;

      if (!fields.name.value.trim()) { setError(fields.name, 'Please enter your name.'); firstInvalid = firstInvalid || fields.name; }
      else setError(fields.name, '');

      const email = fields.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(fields.email, 'Please enter a valid email address.'); firstInvalid = firstInvalid || fields.email; }
      else setError(fields.email, '');

      if (!fields.subject.value) { setError(fields.subject, 'Please select a subject.'); firstInvalid = firstInvalid || fields.subject; }
      else setError(fields.subject, '');

      if (fields.message.value.trim().length < 10) { setError(fields.message, 'Please enter a message of at least 10 characters.'); firstInvalid = firstInvalid || fields.message; }
      else setError(fields.message, '');

      if (firstInvalid) {
        firstInvalid.focus();
        showToast('Check the form', 'Please correct the highlighted fields.', 'error');
        return;
      }

      submitting = true;
      setLoading(true);
      let settled = false;

      const finish = (ok) => {
        if (settled) return;
        settled = true;
        submitting = false;
        setLoading(false);
        if (ok) {
          form.reset();
          Object.values(fields).forEach(input => setError(input, ''));
          showToast('Message sent!', 'Saved to my Google Form — check your inbox for a confirmation.', 'success');
        } else {
          showToast('Could not send message', 'Please email serenufa.ciba@ugv.edu.bd directly.', 'error');
        }
      };

      // Google's confirmation page loading in the hidden iframe means the POST arrived.
      if (responseFrame) {
        responseFrame.addEventListener('load', () => finish(true), { once: true });
      } else {
        finish(true);
      }

      window.setTimeout(() => finish(false), 12000);

      // Native submit is required here: form.submit() skips this submit handler.
      form.submit();
    });
  }
})();
