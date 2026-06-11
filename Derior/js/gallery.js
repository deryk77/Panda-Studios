/* DERIOR — Gallery / lightbox with paper slide (Phase 3) */

(function () {
  'use strict';

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function init() {
    var overlay   = document.getElementById('galleryOverlay');
    if (!overlay) return;

    var backdrop  = document.getElementById('galleryBackdrop');
    var closeBtn  = document.getElementById('galleryClose');
    var prevBtn   = document.getElementById('galleryPrev');
    var nextBtn   = document.getElementById('galleryNext');
    var track     = document.getElementById('galleryTrack');
    var trackWrap = document.getElementById('galleryTrackWrap');
    var dotsWrap  = document.getElementById('galleryDots');
    var counterEl = document.getElementById('galleryCounter');
    var nameEl    = document.getElementById('galleryName');
    var catEl     = document.getElementById('galleryCat');
    var priceEl   = document.getElementById('galleryPrice');
    var atcBtn    = document.getElementById('galleryAtcBtn');

    var current        = 0;
    var totalSlides    = 0;
    var savedScroll    = 0;
    var currentProduct = null;

    function scrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    function updateBadge() {
      var badge = document.getElementById('cartBadge');
      if (!badge || !window.CartAPI) return;
      var count = CartAPI.getCartCount();
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
    }

    // ── Build paper slide (slide 0) ────────────────────────────
    function buildPaperSlide(product) {
      var slide = document.createElement('div');
      slide.className = 'gallery-slide';
      var wrap = document.createElement('div');
      wrap.className = 'gallery-paper-slide';
      wrap.innerHTML =
        '<div class="gallery-paper-inner">' +
          '<img src="img/logo2.svg" alt="Derior" class="gallery-paper-logo">' +
          '<h2 class="gallery-paper-name">' + esc(product.name) + '</h2>' +
          '<span class="gallery-paper-sub">' + esc(product.subcategoryLabel) + '</span>' +
          '<p class="gallery-paper-price">UGX ' + product.price_ugx.toLocaleString() + '</p>' +
          '<hr class="gallery-paper-rule">' +
          '<p class="gallery-paper-desc">' + esc(product.description) + '</p>' +
          '<p class="gallery-paper-dims">Dimensions and finish options available on request.</p>' +
        '</div>';
      slide.appendChild(wrap);
      return slide;
    }

    // ── Open lightbox ──────────────────────────────────────────
    function open(productId) {
      var product = (window.DERIOR_PRODUCTS || []).find(function (p) { return p.id === productId; });
      if (!product) return;

      currentProduct = product;
      totalSlides    = product.images.length + 1; // paper + images

      // Footer meta
      nameEl.textContent  = product.name;
      catEl.textContent   = product.subcategoryLabel;
      priceEl.textContent = 'UGX ' + product.price_ugx.toLocaleString();

      // ATC button state
      if (atcBtn) {
        atcBtn.dataset.productId = product.id;
        var inCart = window.CartAPI && CartAPI.getCart().some(function (i) { return i.id === product.id; });
        atcBtn.textContent = inCart ? 'Added' : 'Add to Cart';
        atcBtn.classList.toggle('added', !!inCart);
      }

      // Build slides
      track.innerHTML   = '';
      dotsWrap.innerHTML = '';

      track.appendChild(buildPaperSlide(product));
      addDot(0, 'Details');

      product.images.forEach(function (src, i) {
        var slide = document.createElement('div');
        slide.className = 'gallery-slide';
        var img = document.createElement('img');
        img.src = src;
        img.alt = product.name;
        img.draggable = false;
        slide.appendChild(img);
        track.appendChild(slide);
        addDot(i + 1, 'Image ' + (i + 1));
      });

      goTo(0, false);
      updateArrows();

      savedScroll = window.scrollY;
      var sbw = scrollbarWidth();
      document.body.style.overflow   = 'hidden';
      if (sbw > 0) document.body.style.paddingRight = sbw + 'px';
      overlay.classList.add('is-open');
      closeBtn.focus();
    }

    function addDot(idx, label) {
      var dot = document.createElement('button');
      dot.className = 'gallery-dot' + (idx === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', label);
      dot.addEventListener('click', (function (i) {
        return function (e) { e.stopPropagation(); goTo(i); };
      }(idx)));
      dotsWrap.appendChild(dot);
    }

    // ── Close ──────────────────────────────────────────────────
    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow     = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, savedScroll);
    }

    // ── Navigate ───────────────────────────────────────────────
    function goTo(index, animate) {
      if (animate === undefined) animate = true;
      current = ((index % totalSlides) + totalSlides) % totalSlides;
      var slideW = trackWrap.offsetWidth;

      if (!animate) {
        track.style.transition = 'none';
        track.style.transform  = 'translateX(' + (-current * slideW) + 'px)';
        track.offsetHeight;
        track.style.transition = '';
      } else {
        track.style.transform = 'translateX(' + (-current * slideW) + 'px)';
      }

      dotsWrap.querySelectorAll('.gallery-dot').forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
      });

      if (counterEl) counterEl.textContent = (current + 1) + ' / ' + totalSlides;
    }

    function updateArrows() {
      var show = totalSlides > 1;
      [prevBtn, nextBtn].forEach(function (btn) {
        btn.style.opacity       = show ? '1' : '0';
        btn.style.pointerEvents = show ? ''  : 'none';
      });
    }

    // ── Touch swipe ────────────────────────────────────────────
    var touchX  = 0;
    var touchDx = 0;

    track.addEventListener('touchstart', function (e) {
      touchX  = e.touches[0].clientX;
      touchDx = 0;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      touchDx = e.touches[0].clientX - touchX;
      var slideW = trackWrap.offsetWidth;
      track.style.transition = 'none';
      track.style.transform  = 'translateX(' + (-current * slideW + touchDx) + 'px)';
    }, { passive: true });

    track.addEventListener('touchend', function () {
      if (Math.abs(touchDx) > 50) {
        goTo(touchDx < 0 ? current + 1 : current - 1);
      } else {
        goTo(current);
      }
    });

    // Click on dark stage area closes overlay
    track.addEventListener('click', function (e) {
      if (!e.target.closest('.gallery-paper-inner') && e.target.tagName !== 'IMG') close();
    });

    document.getElementById('galleryStage').addEventListener('click', function (e) {
      if (!e.target.closest('.gallery-arrow') && !e.target.closest('.gallery-track-wrap')) close();
    });

    // ── Add to Cart — gallery footer ───────────────────────────
    if (atcBtn) {
      atcBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!currentProduct || !window.CartAPI) return;
        CartAPI.addToCart({
          id:           currentProduct.id,
          name:         currentProduct.name,
          price:        Math.round(currentProduct.price_ugx / 3700),
          priceDisplay: 'UGX ' + currentProduct.price_ugx.toLocaleString(),
          image:        currentProduct.images[0],
          category:     currentProduct.categoryLabel,
          quantity:     1
        });
        atcBtn.textContent = 'Added';
        atcBtn.classList.add('added');
        // Sync any card-level button
        document.querySelectorAll('.card-atc[data-product-id="' + currentProduct.id + '"]').forEach(function (btn) {
          btn.textContent = 'Added';
          btn.classList.add('added');
        });
        updateBadge();
      });
    }

    // ── Buttons & keyboard ─────────────────────────────────────
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(current - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(current + 1); });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    window.addEventListener('resize', function () {
      if (overlay.classList.contains('is-open')) goTo(current, false);
    });

    // ── Event delegation ───────────────────────────────────────

    // Preload images on hover
    document.addEventListener('mouseenter', function (e) {
      var card = e.target.closest('.product-card[data-product-id]');
      if (!card) return;
      var prod = (window.DERIOR_PRODUCTS || []).find(function (p) { return p.id === card.dataset.productId; });
      if (prod) prod.images.forEach(function (src) { new Image().src = src; });
    }, true);

    document.addEventListener('click', function (e) {
      // Card-level Add to Cart (must check before card click)
      var cardAtc = e.target.closest('.card-atc');
      if (cardAtc) {
        e.preventDefault();
        e.stopPropagation();
        var pid  = cardAtc.dataset.productId;
        var prod = (window.DERIOR_PRODUCTS || []).find(function (p) { return p.id === pid; });
        if (!prod || !window.CartAPI) return;
        CartAPI.addToCart({
          id:           prod.id,
          name:         prod.name,
          price:        Math.round(prod.price_ugx / 3700),
          priceDisplay: 'UGX ' + prod.price_ugx.toLocaleString(),
          image:        prod.images[0],
          category:     prod.categoryLabel,
          quantity:     1
        });
        cardAtc.textContent = 'Added';
        cardAtc.classList.add('added');
        updateBadge();
        return;
      }

      // Product card — open lightbox
      var card = e.target.closest('.product-card[data-product-id]');
      if (card) { e.preventDefault(); open(card.dataset.productId); return; }

      // Homepage featured pieces (piece-large / piece-small)
      var piece = e.target.closest('[data-product-id]');
      if (piece && !piece.classList.contains('product-card')) {
        e.preventDefault();
        open(piece.dataset.productId);
      }
    });
  }

  // Defer until render.js has injected the overlay (DOMContentLoaded order: render.js first, gallery.js second)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
