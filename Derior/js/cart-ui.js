/* DERIOR — Cart UI (drawer, badge, toast) */

(function () {
  'use strict';

  var WA_NUMBER = '256772233050';

  // ── Inject drawer HTML ──────────────────────────────────────
  function injectCartHTML() {
    if (document.getElementById('cartDrawer')) return;

    var overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';

    var drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.innerHTML =
      '<div class="cart-drawer-header">' +
        '<span class="cart-drawer-title">Your Enquiry</span>' +
        '<button class="cart-close-btn" id="cartCloseBtn" aria-label="Close cart">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="cart-items" id="cartItems"></div>' +
      '<div class="cart-drawer-footer" id="cartFooter" style="display:none">' +
        '<div class="cart-subtotal">' +
          '<span class="cart-subtotal-label">Subtotal</span>' +
          '<span class="cart-subtotal-value" id="cartSubtotal">UGX 0</span>' +
        '</div>' +
        '<a id="cartWaBtn" class="cart-wa-btn" href="https://wa.me/' + WA_NUMBER + '" target="_blank" rel="noopener noreferrer">Checkout via WhatsApp</a>' +
        '<p class="cart-delivery-note">Delivery estimates available for Kampala and surroundings.</p>' +
      '</div>';

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'cartToast';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.body.appendChild(toast);
  }

  // ── Badge ───────────────────────────────────────────────────
  function updateBadge(animate) {
    var badge = document.getElementById('cartBadge');
    if (!badge || !window.CartAPI) return;
    var count = CartAPI.getCartCount();
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
    if (animate && count > 0) {
      badge.classList.remove('pop');
      void badge.offsetWidth; // force reflow to restart animation
      badge.classList.add('pop');
      badge.addEventListener('animationend', function () { badge.classList.remove('pop'); }, { once: true });
    }
  }

  // ── Toast ───────────────────────────────────────────────────
  var _toastTimer = null;
  function showToast(productName) {
    var toast = document.getElementById('cartToast');
    if (!toast) return;
    toast.textContent = '“' + productName + '” added to enquiry';
    toast.classList.add('visible');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { toast.classList.remove('visible'); }, 2200);
  }

  // ── Build WhatsApp href ─────────────────────────────────────
  function buildWaHref() {
    var cart = CartAPI.getCart();
    if (!cart.length) return 'https://wa.me/' + WA_NUMBER;
    var lines = cart.map(function (item, i) {
      var lineTotal = item.price_ugx
        ? 'UGX ' + (item.price_ugx * item.quantity).toLocaleString()
        : 'UGX ' + (item.price * 3700 * item.quantity).toLocaleString();
      return (i + 1) + '. ' + item.name + ' × ' + item.quantity + ' — ' + lineTotal;
    });
    var subtotal = 'UGX ' + CartAPI.getCartTotal().toLocaleString();
    var msg =
      'Hello, I’d like to enquire about ordering the following from Derior:\n\n' +
      lines.join('\n') + '\n\n' +
      'Subtotal: ' + subtotal + '\n\n' +
      'Please let me know how to proceed. Thank you.';
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  // ── Render drawer items ─────────────────────────────────────
  function renderCart() {
    var cartItemsEl  = document.getElementById('cartItems');
    var cartFooterEl = document.getElementById('cartFooter');
    var subtotalEl   = document.getElementById('cartSubtotal');
    var waBtn        = document.getElementById('cartWaBtn');
    if (!cartItemsEl) return;

    var cart = CartAPI.getCart();

    if (!cart.length) {
      cartItemsEl.innerHTML =
        '<div class="cart-empty">' +
          '<p class="cart-empty-text">Your enquiry list is empty.</p>' +
          '<a href="shop.html" class="cart-empty-link">Browse our collection</a>' +
        '</div>';
      if (cartFooterEl) cartFooterEl.style.display = 'none';
      return;
    }

    if (cartFooterEl) cartFooterEl.style.display = 'block';

    cartItemsEl.innerHTML = cart.map(function (item) {
      var lineDisplay = item.priceDisplay
        ? item.priceDisplay
        : 'UGX ' + (item.price * 3700).toLocaleString();
      return (
        '<div class="cart-item" data-id="' + item.id + '">' +
          '<img class="cart-item-img" src="' + item.image + '" alt="' + item.name + '" loading="lazy">' +
          '<div class="cart-item-body">' +
            '<p class="cart-item-name">' + item.name + '</p>' +
            '<p class="cart-item-cat">' + item.category + '</p>' +
            '<div class="cart-item-qty">' +
              '<button class="cart-qty-btn" data-action="dec" data-id="' + item.id + '" aria-label="Decrease">−</button>' +
              '<span class="cart-qty-num">' + item.quantity + '</span>' +
              '<button class="cart-qty-btn" data-action="inc" data-id="' + item.id + '" aria-label="Increase">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-item-right">' +
            '<p class="cart-item-line">' + lineDisplay + '</p>' +
            '<button class="cart-item-remove" data-id="' + item.id + '">Remove</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    if (subtotalEl) subtotalEl.textContent = 'UGX ' + CartAPI.getCartTotal().toLocaleString();
    if (waBtn)      waBtn.href = buildWaHref();

    // Qty handlers
    cartItemsEl.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id   = btn.dataset.id;
        var item = CartAPI.getCart().find(function (i) { return i.id === id; });
        if (!item) return;
        CartAPI.updateQuantity(id, item.quantity + (btn.dataset.action === 'inc' ? 1 : -1));
        renderCart();
        updateBadge();
      });
    });

    // Remove handlers
    cartItemsEl.querySelectorAll('.cart-item-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        CartAPI.removeFromCart(btn.dataset.id);
        renderCart();
        updateBadge();
        // Sync card/gallery ATC buttons
        document.querySelectorAll('.card-atc[data-product-id="' + btn.dataset.id + '"], .gallery-atc-btn.added').forEach(function (b) {
          if (b.dataset.productId === btn.dataset.id || (b.id === 'galleryAtcBtn' && b.dataset.productId === btn.dataset.id)) {
            b.textContent = 'Add to Cart';
            b.classList.remove('added');
          }
        });
      });
    });
  }

  // ── Open / close ────────────────────────────────────────────
  function openCart() {
    renderCart();
    var drawer  = document.getElementById('cartDrawer');
    var overlay = document.getElementById('cartOverlay');
    if (drawer)  drawer.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    var drawer  = document.getElementById('cartDrawer');
    var overlay = document.getElementById('cartOverlay');
    if (drawer)  drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    injectCartHTML();
    updateBadge();

    var cartBtn      = document.getElementById('cartBtn');
    var cartCloseBtn = document.getElementById('cartCloseBtn');
    var cartOverlay  = document.getElementById('cartOverlay');

    if (cartBtn)      cartBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCart();
    });
  });

  window.CartUI = {
    openCart:    openCart,
    closeCart:   closeCart,
    renderCart:  renderCart,
    updateBadge: updateBadge,
    showToast:   showToast
  };

})();
