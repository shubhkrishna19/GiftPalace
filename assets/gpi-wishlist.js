(function () {
  'use strict';
  var KEY = 'gpiWishlist';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  function has(id) {
    return read().some(function (entry) { return String(entry.id) === String(id); });
  }
  function add(id, handle) {
    if (has(id)) return;
    var list = read();
    list.push({ id: String(id), handle: handle, added_at: new Date().toISOString() });
    write(list);
    dispatch('add', id);
  }
  function remove(id) {
    var list = read().filter(function (entry) { return String(entry.id) !== String(id); });
    write(list);
    dispatch('remove', id);
  }
  function toggle(id, handle) {
    if (has(id)) remove(id); else add(id, handle);
  }
  function count() { return read().length; }
  function list()  { return read(); }
  function dispatch(action, id) {
    document.dispatchEvent(new CustomEvent('gpi:wishlist:change', {
      detail: { action: action, id: id, count: count() }
    }));
  }

  function paintToggle(btn) {
    var pressed = has(btn.dataset.productId);
    btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }
  function paintAllToggles() {
    document.querySelectorAll('[data-gpi-wishlist-toggle]').forEach(paintToggle);
  }
  function paintCount() {
    var c = count();
    document.querySelectorAll('[data-gpi-wishlist-count]').forEach(function (el) {
      el.textContent = c;
      if (c > 0) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-gpi-wishlist-toggle]');
    if (!btn) return;
    e.preventDefault();
    toggle(btn.dataset.productId, btn.dataset.productHandle);
    paintToggle(btn);
  });

  document.addEventListener('gpi:wishlist:change', paintCount);

  document.addEventListener('DOMContentLoaded', function () {
    paintAllToggles();
    paintCount();
  });

  window.gpiWishlist = {
    add: add, remove: remove, toggle: toggle, has: has, count: count, list: list,
    renderList: function (container) {
      if (!container) return;
      var items = list();
      if (!items.length) { container.innerHTML = ''; return; }
      Promise.all(items.map(function (entry) {
        return fetch('/products/' + entry.handle + '.js', { credentials: 'same-origin' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .catch(function () { return null; });
      })).then(function (products) {
        container.innerHTML = products.filter(Boolean).map(function (p) {
          var price = (p.price / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
          var img = p.featured_image || (p.images && p.images[0]) || '';
          return '<article class="gpi-product-card" data-product-id="' + p.id + '">' +
                 '<a href="/products/' + p.handle + '" class="gpi-product-card__link">' +
                 '<div class="gpi-product-card__media"><img src="' + img + '" alt="' + p.title.replace(/"/g,'&quot;') + '" loading="lazy"></div>' +
                 '<div class="gpi-product-card__info">' +
                 '<h3 class="gpi-product-card__title">' + p.title + '</h3>' +
                 '<div class="gpi-price"><span class="gpi-price__current">' + price + '</span></div>' +
                 '</div></a>' +
                 '<button class="gpi-wishlist-heart gpi-wishlist-heart--sm" data-gpi-wishlist-toggle data-product-id="' + p.id + '" data-product-handle="' + p.handle + '" aria-pressed="true">' +
                 '<svg class="gpi-wishlist-heart__icon" viewBox="0 0 24 24"><path d="M12 21s-7-4.35-7-10a4.5 4.5 0 018-2.83A4.5 4.5 0 0119 11c0 5.65-7 10-7 10z" fill="currentColor" stroke="currentColor" stroke-width="1.6"/></svg>' +
                 '<span class="visually-hidden">Remove from wishlist</span></button>' +
                 '</article>';
        }).join('');
        paintAllToggles();
      });
    }
  };
})();
