(function () {
  'use strict';
  var KEY = 'gpiCurrency';
  var DEFAULT = 'INR';
  var FLAG_BY_CODE = { INR: 'IN', USD: 'US', GBP: 'GB', AED: 'AE', EUR: 'EU' };
  var SYM_BY_CODE  = { INR: '₹', USD: '$', GBP: '£', AED: 'د.إ', EUR: '€' };

  function getURLCurrency() {
    var params = new URLSearchParams(window.location.search);
    var c = params.get('currency');
    return c ? c.toUpperCase() : null;
  }
  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function current() {
    return getURLCurrency() || getStored() || DEFAULT;
  }

  function applyToTrigger(scope) {
    var code = current();
    scope.querySelectorAll('[data-gpi-currency-code]').forEach(function (el) {
      el.textContent = code;
    });
    scope.querySelectorAll('[data-gpi-currency-flag]').forEach(function (el) {
      el.textContent = FLAG_BY_CODE[code] || 'IN';
    });
  }

  function switchTo(code) {
    setStored(code);
    var url = new URL(window.location.href);
    url.searchParams.set('currency', code);
    window.location.href = url.toString();
  }

  document.querySelectorAll('[data-gpi-currency]').forEach(function (root) {
    applyToTrigger(root);
    var trigger = root.querySelector('[data-gpi-currency-trigger]');
    var menu    = root.querySelector('[data-gpi-currency-menu]');
    if (!trigger || !menu) return;

    function toggle(open) {
      var isOpen = !menu.hidden;
      var willOpen = (typeof open === 'boolean') ? open : !isOpen;
      menu.hidden = !willOpen;
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    }
    trigger.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) toggle(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    menu.querySelectorAll('[data-gpi-currency-option]').forEach(function (opt) {
      opt.addEventListener('click', function () { switchTo(opt.dataset.currency); });
      opt.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTo(opt.dataset.currency); }
      });
    });
  });

  window.gpiCurrency = { current: current, switchTo: switchTo };
})();
