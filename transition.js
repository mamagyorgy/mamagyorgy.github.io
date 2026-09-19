// Smoother navigation across the whole site.
// 1. Pages you are about to visit are fetched in advance (on hover / touch).
// 2. Browsers without cross-document View Transitions fade the page out before
//    leaving; the cross-fade itself lives in transition.css.
(function () {
  'use strict';

  // 1. Prefetch internal HTML pages only (never the large PDFs)
  if (window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
    const rules = document.createElement('script');
    rules.type = 'speculationrules';
    rules.textContent = JSON.stringify({
      prefetch: [{ where: { href_matches: '/*.html' }, eagerness: 'moderate' }],
    });
    document.head.appendChild(rules);
  }

  // The homepage's power-on flash is kept for a first visit, but skipped when
  // arriving from another page of the site so it doesn't stack with the transition
  try {
    if (document.referrer && new URL(document.referrer).origin === location.origin) {
      const flash = document.querySelector('.boot-flash');
      if (flash) flash.remove();
    }
  } catch (e) { /* ignore */ }

  // 2. Fallback fade-out
  if (typeof CSSViewTransitionRule !== 'undefined') return;

  const root = document.documentElement;
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (!/\.html$|\/$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    root.classList.add('is-leaving');
    setTimeout(function () { location.href = url.href; }, 230);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) root.classList.remove('is-leaving');
  });
})();
