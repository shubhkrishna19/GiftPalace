(function () {
  'use strict';
  var header = document.querySelector('[data-gpi-header]');
  if (!header) return;

  /* Sticky / scrolled state */
  var SCROLLED = 'gpi-header--scrolled';
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (y > 80) header.classList.add(SCROLLED);
    else header.classList.remove(SCROLLED);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var menuToggle = header.querySelector('[data-gpi-menu-toggle]');
  var menuClose  = header.querySelector('[data-gpi-menu-close]');
  var mobileNav  = header.querySelector('[data-gpi-mobile-nav]');
  function openMenu()  { if (!mobileNav) return; mobileNav.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeMenu() { if (!mobileNav) return; mobileNav.hidden = true;  document.body.style.overflow = ''; }
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (menuClose)  menuClose.addEventListener('click',  closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* Search drawer */
  var searchToggle = header.querySelector('[data-gpi-search-toggle]');
  var searchClose  = header.querySelector('[data-gpi-search-close]');
  var searchPanel  = header.querySelector('[data-gpi-search]');
  function openSearch() {
    if (!searchPanel) return;
    searchPanel.hidden = false;
    var input = searchPanel.querySelector('input[type="search"]');
    if (input) setTimeout(function () { input.focus(); }, 50);
  }
  function closeSearch() { if (searchPanel) searchPanel.hidden = true; }
  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose)  searchClose.addEventListener('click',  closeSearch);

  /* Mega menu keyboard support */
  header.querySelectorAll('.gpi-header__nav-item--has-mega').forEach(function (item) {
    var link = item.querySelector('.gpi-header__nav-link');
    if (!link) return;
    link.addEventListener('focus', function () { link.setAttribute('aria-expanded', 'true'); });
    item.addEventListener('mouseleave', function () { link.setAttribute('aria-expanded', 'false'); });
  });

  /* Listen for cart count updates */
  document.addEventListener('cart:change', function (e) {
    var count = (e.detail && e.detail.count) || 0;
    var badge = header.querySelector('[data-gpi-cart-count]');
    if (!badge) return;
    badge.textContent = count;
    if (count > 0) badge.removeAttribute('hidden'); else badge.setAttribute('hidden', '');
  });
})();
