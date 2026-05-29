/* DERIOR — Cart UI (drawer, badge, add-to-cart buttons, toast) */

(function () {

  // ── Inject drawer + overlay HTML into body ──────────────────
  function injectCartHTML() {
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.id = 'cartOverlay';

    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.innerHTML =
      '<div class="cart-drawer-header">' +
        '<span class="cart-drawer-title">Your Cart</span>' +
        '<button class="cart-close-btn" id="cartCloseBtn" aria-label="Close cart">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="cart-items" id="cartItems"></div>' +
      '<div class="cart-drawer-footer" id="cartFooter">' +
        '<div class="cart-subtotal">' +
          '<span class="cart-subtotal-label">Subtotal</span>' +
          '<span class="cart-subtotal-value" id="cartSubtotal">$0</span>' +
        '</div>' +
        '<a href="cart.html" class="cart-checkout-btn">View Full Cart</a>' +
        '<a href="contact.html" class="cart-view-full">Contact us to order</a>' +
      '</div>';

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'cartToast';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.body.appendChild(toast);
  }

  // ── Badge ───────────────────────────────────────────────────
  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const count = CartAPI.getCartCount();
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }

  // ── Toast ───────────────────────────────────────────────────
  let _toastTimer = null;
  function showToast(productName) {
    const toast = document.getElementById('cartToast');
    if (!toast) return;
    toast.textContent = '“' + productName + '” added to cart';
    toast.classList.add('visible');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { toast.classList.remove('visible'); }, 2200);
  }

  // ── Render drawer items ─────────────────────────────────────
  function renderCart() {
    const cartItemsEl  = document.getElementById('cartItems');
    const cartFooterEl = document.getElementById('cartFooter');
    const subtotalEl   = document.getElementById('cartSubtotal');
    if (!cartItemsEl) return;

    const cart = CartAPI.getCart();

    if (cart.length === 0) {
      cartItemsEl.innerHTML =
        '<div class="cart-empty">' +
          '<p class="cart-empty-text">Your cart is empty.</p>' +
          '<a href="shop.html" class="cart-empty-link">Continue shopping</a>' +
        '</div>';
      if (cartFooterEl) cartFooterEl.style.display = 'none';
      return;
    }

    if (cartFooterEl) cartFooterEl.style.display = 'block';

    cartItemsEl.innerHTML = cart.map(function (item) {
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
            '<p class="cart-item-line">$' + (item.price * item.quantity).toLocaleString() + '</p>' +
            '<button class="cart-item-remove" data-id="' + item.id + '">Remove</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    if (subtotalEl) subtotalEl.textContent = '$' + CartAPI.getCartTotal().toLocaleString();

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

  // ── Wire Add-to-Cart buttons onto product cards ─────────────
  function initProductCards() {
    if (!window.PRODUCTS) return;

    // Standard .product-card elements (category pages + shop)
    document.querySelectorAll('.product-card').forEach(function (card) {
      var nameEl = card.querySelector('.product-info h4');
      if (!nameEl) return;
      var product = PRODUCTS.find(function (p) { return p.name === nameEl.textContent.trim(); });
      if (!product) return;
      _attachAddBtn(card.querySelector('.product-info'), product);
    });

    // Homepage Selected Pieces (.piece-large / .piece-small)
    document.querySelectorAll('.piece-large, .piece-small').forEach(function (card) {
      var nameEl = card.querySelector('.piece-info .piece-name');
      if (!nameEl) return;
      var product = PRODUCTS.find(function (p) { return p.name === nameEl.textContent.trim(); });
      if (!product) return;
      _attachAddBtn(card.querySelector('.piece-info'), product);
    });
  }

  function _attachAddBtn(container, product) {
    if (!container || container.querySelector('.add-to-cart-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'add-to-cart-btn';
    btn.textContent = 'Add to Cart';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      CartAPI.addToCart(product);
      updateBadge();
      showToast(product.name);
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(function () {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
      }, 2000);
    });
    container.appendChild(btn);
  }

  // ── Init on DOMContentLoaded ────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    injectCartHTML();
    updateBadge();
    initProductCards();

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

  window.CartUI = { openCart: openCart, closeCart: closeCart, renderCart: renderCart, updateBadge: updateBadge };

})();
