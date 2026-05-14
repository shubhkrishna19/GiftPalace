(function () {
  'use strict';

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
