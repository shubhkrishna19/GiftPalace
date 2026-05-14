(function () {
  'use strict';

  /* Quick-add: POSTs the first variant to cart without leaving the page */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-gpi-quick-add]');
    if (!btn) return;
    e.preventDefault();
    var variantId = btn.getAttribute('data-gpi-quick-add');
    var originalText = btn.textContent;
    btn.textContent = 'Adding...';
    btn.disabled = true;
    var body = new FormData();
    body.append('id', variantId);
    body.append('quantity', '1');
    fetch('/cart/add.js', { method: 'POST', body: body })
      .then(function (r) { return r.json(); })
      .then(function () { return fetch('/cart.js'); })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        document.dispatchEvent(new CustomEvent('cart:change', { detail: { count: cart.item_count } }));
        btn.textContent = 'Added ✓';
        setTimeout(function () { btn.textContent = originalText; btn.disabled = false; }, 1600);
      })
      .catch(function () { btn.textContent = 'Try again'; btn.disabled = false; });
  });

  /* View toggle (4-col / 3-col / list) — persists in localStorage */
  var grid = document.querySelector('[data-gpi-grid]');
  document.querySelectorAll('[data-gpi-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var view = btn.getAttribute('data-gpi-view');
      if (!grid) return;
      grid.setAttribute('data-view', view);
      try { localStorage.setItem('gpiCollectionView', view); } catch (e) {}
      document.querySelectorAll('[data-gpi-view]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
    });
  });
  if (grid) {
    try {
      var saved = localStorage.getItem('gpiCollectionView');
      if (saved) {
        grid.setAttribute('data-view', saved);
        var b = document.querySelector('[data-gpi-view="' + saved + '"]');
        if (b) b.classList.add('is-active');
      }
    } catch (e) {}
  }

  /* Sort dropdown change → reload with ?sort_by= */
  document.querySelectorAll('[data-gpi-sort]').forEach(function (sel) {
    sel.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', sel.value);
      window.location.href = url.toString();
    });
  });

  /* Load more — Shopify section_rendering style: fetch the next URL, parse, append cards */
  var loadBtn = document.querySelector('[data-gpi-loadmore]');
  var grid = document.querySelector('[data-gpi-grid]');
  if (loadBtn && grid) {
    loadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var nextUrl = loadBtn.getAttribute('href');
      if (!nextUrl) return;
      loadBtn.classList.add('is-loading');
      loadBtn.textContent = 'Loading...';
      fetch(nextUrl, { credentials: 'same-origin' })
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var dom = new DOMParser().parseFromString(html, 'text/html');
          var newCards = dom.querySelectorAll('[data-gpi-grid] > li');
          newCards.forEach(function (li) { grid.appendChild(li); });
          var newLoadMore = dom.querySelector('[data-gpi-loadmore]');
          if (newLoadMore) {
            loadBtn.setAttribute('href', newLoadMore.getAttribute('href'));
            loadBtn.classList.remove('is-loading');
            loadBtn.textContent = 'Load more pieces';
            var progress = document.querySelector('.gpi-collection-loadmore__progress');
            var newProgress = dom.querySelector('.gpi-collection-loadmore__progress');
            if (progress && newProgress) progress.textContent = newProgress.textContent;
          } else {
            loadBtn.remove();
          }
          /* Paint wishlist hearts on new cards */
          if (window.gpiWishlist && window.gpiWishlist.list) {
            document.querySelectorAll('[data-gpi-wishlist-toggle]').forEach(function (btn) {
              btn.setAttribute('aria-pressed', window.gpiWishlist.has(btn.dataset.productId) ? 'true' : 'false');
            });
          }
        })
        .catch(function () {
          loadBtn.classList.remove('is-loading');
          loadBtn.textContent = 'Try again';
        });
    });
  }
})();
