(function () {
  'use strict';

  /* Sticky ATC bar — show after user scrolls past the main ATC button */
  var sticky = document.querySelector('[data-gpi-product-sticky]');
  var mainAtc = document.querySelector('.gpi-product__atc');
  if (sticky && mainAtc) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) sticky.classList.remove('is-visible');
        else sticky.classList.add('is-visible');
      });
    }, { rootMargin: '0px 0px -80% 0px' });
    io.observe(mainAtc);
  }

  /* Quantity stepper */
  document.querySelectorAll('[data-gpi-product]').forEach(function (root) {
    var qtyInput = root.querySelector('.gpi-product__qty-input');
    root.querySelectorAll('[data-gpi-qty]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!qtyInput) return;
        var current = parseInt(qtyInput.value, 10) || 1;
        var op = btn.dataset.gpiQty;
        var next = op === '+' ? current + 1 : Math.max(1, current - 1);
        qtyInput.value = next;
        qtyInput.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    /* Gallery: thumb click -> swap main */
    var thumbs = root.querySelectorAll('[data-gpi-thumb]');
    var frames = root.querySelectorAll('[data-gpi-image-index]');
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var idx = thumb.dataset.gpiThumb;
        thumbs.forEach(function (t) { t.classList.toggle('is-active', t.dataset.gpiThumb === idx); });
        frames.forEach(function (f) { f.classList.toggle('is-active', f.dataset.gpiImageIndex === idx); });
      });
    });

    /* Variant picker: update selected value display + swap image to variant image */
    root.querySelectorAll('input[type="radio"].gpi-variant-picker__input').forEach(function (r) {
      r.addEventListener('change', function () {
        var legend = r.closest('fieldset').querySelector('.gpi-variant-picker__selected-value');
        if (legend) legend.textContent = r.value;
        /* let halo theme JS handle price/variant update via its own listener; we also expose an event */
        document.dispatchEvent(new CustomEvent('gpi:variant:change', { detail: { input: r } }));
      });
    });
  });

  /* Tabs */
  document.querySelectorAll('[data-gpi-tabs]').forEach(function (tabRoot) {
    var triggers = tabRoot.querySelectorAll('[data-gpi-tab]');
    var panels   = tabRoot.querySelectorAll('[data-gpi-tab-panel]');
    triggers.forEach(function (trig) {
      trig.addEventListener('click', function () {
        var id = trig.dataset.gpiTab;
        triggers.forEach(function (t) {
          var active = t.dataset.gpiTab === id;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          p.classList.toggle('is-active', p.dataset.gpiTabPanel === id);
        });
      });
    });
  });

  /* ATC fetch (progressive enhancement on top of native form submit) */
  document.querySelectorAll('.gpi-product__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return; /* fall back to native */
      var submitBtn = e.submitter || form.querySelector('button[type="submit"]');
      if (submitBtn && submitBtn.name === 'checkout') return; /* let Buy It Now go through native */
      e.preventDefault();
      var fd = new FormData(form);
      var atc = form.querySelector('.gpi-product__atc');
      if (atc) { atc.disabled = true; atc.querySelector('span').textContent = 'Adding...'; }
      fetch('/cart/add.js', { method: 'POST', body: fd })
        .then(function (r) { return r.json(); })
        .then(function (item) {
          if (item && item.id) {
            /* Dispatch cart-change event so header badge updates */
            fetch('/cart.js').then(function (r) { return r.json(); }).then(function (cart) {
              document.dispatchEvent(new CustomEvent('cart:change', { detail: { count: cart.item_count } }));
              if (atc) {
                atc.querySelector('span').textContent = 'Added to bag ✓';
                setTimeout(function () { atc.disabled = false; atc.querySelector('span').textContent = 'Add to bag'; }, 1800);
              }
            });
          } else if (atc) {
            atc.disabled = false; atc.querySelector('span').textContent = 'Try again';
          }
        })
        .catch(function () { if (atc) { atc.disabled = false; atc.querySelector('span').textContent = 'Try again'; } });
    });
  });
})();
