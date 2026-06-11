/* DERIOR — Render engine: all pages read from DERIOR_PRODUCTS */

(function () {
  'use strict';

  // ── Helpers ───────────────────────────────────────────────────
  function ugx(n) {
    return 'UGX ' + n.toLocaleString();
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ── Product card ──────────────────────────────────────────────
  function buildProductCard(product, delayClass) {
    var galleryJSON = JSON.stringify(product.images);
    return (
      '<div class="product-card reveal' + (delayClass ? ' ' + delayClass : '') + '"' +
      ' data-product-id="' + esc(product.id) + '"' +
      ' data-gallery=\'' + galleryJSON.replace(/'/g, '&#39;') + '\'>' +
      '<a href="#" class="product-img-wrap">' +
        '<img src="' + esc(product.images[0]) + '" alt="' + esc(product.name) + '" loading="lazy">' +
      '</a>' +
      '<div class="product-info">' +
        '<h4>' + esc(product.name) + '</h4>' +
        '<span class="product-cat">' + esc(product.subcategoryLabel) + '</span>' +
        '<p class="product-price">' + ugx(product.price_ugx) + '</p>' +
      '</div>' +
      '</div>'
    );
  }

  // ── Reveal observer ───────────────────────────────────────────
  function observeReveal(container) {
    var els = (container || document).querySelectorAll('.reveal:not(.visible)');
    if (!els.length) return;
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
      els.forEach(function (el) { obs.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  // ── Gallery overlay injection ─────────────────────────────────
  // Injects the lightbox DOM if absent; gallery.js uses event delegation so it
  // will pick up any card added to the page dynamically.
  function ensureGalleryOverlay() {
    if (document.getElementById('galleryOverlay')) return;
    var div = document.createElement('div');
    div.innerHTML = [
      '<div class="gallery-overlay" id="galleryOverlay" role="dialog" aria-modal="true" aria-label="Product images">',
      '  <div class="gallery-backdrop" id="galleryBackdrop"></div>',
      '  <button class="gallery-close" id="galleryClose" aria-label="Close gallery">',
      '    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      '  </button>',
      '  <div class="gallery-stage" id="galleryStage">',
      '    <button class="gallery-arrow gallery-prev" id="galleryPrev" aria-label="Previous image">',
      '      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
      '    </button>',
      '    <div class="gallery-track-wrap" id="galleryTrackWrap">',
      '      <div class="gallery-track" id="galleryTrack"></div>',
      '    </div>',
      '    <button class="gallery-arrow gallery-next" id="galleryNext" aria-label="Next image">',
      '      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
      '    </button>',
      '  </div>',
      '  <div class="gallery-footer" id="galleryFooter">',
      '    <div class="gallery-meta">',
      '      <h3 class="gallery-name" id="galleryName"></h3>',
      '      <div class="gallery-sub">',
      '        <span class="gallery-cat" id="galleryCat"></span>',
      '        <span class="gallery-price" id="galleryPrice"></span>',
      '      </div>',
      '    </div>',
      '    <div class="gallery-actions" id="galleryActions">',
      '      <div class="gallery-dots" id="galleryDots"></div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(div.firstElementChild);
  }

  // ── Category page ─────────────────────────────────────────────
  function renderCategoryPage(categorySlug) {
    var products = (window.DERIOR_PRODUCTS || []).filter(function (p) {
      return p.category === categorySlug;
    });
    if (!products.length) return;

    var countEl = document.querySelector('.product-count');
    if (countEl) countEl.textContent = products.length + ' pieces';

    // ordered unique subcategories
    var subcats = [], seen = {};
    products.forEach(function (p) {
      if (!seen[p.subcategory]) {
        seen[p.subcategory] = true;
        subcats.push({ id: p.subcategory, label: p.subcategoryLabel });
      }
    });

    // filter pills
    var filterNav = document.querySelector('.cat-filter-grid');
    if (filterNav) {
      filterNav.innerHTML = subcats.map(function (sc) {
        return '<a href="#' + sc.id + '"><span class="cat-dot"></span>' + esc(sc.label) + '</a>';
      }).join('');
    }

    // product sections — replace hard-coded cards but keep the .shop-main-header
    var catMain = document.querySelector('.cat-main');
    if (!catMain) return;
    var header = catMain.querySelector('.shop-main-header');
    catMain.innerHTML = '';
    if (header) catMain.appendChild(header);

    var delays = ['', 'reveal-d1', 'reveal-d2', 'reveal-d3'];
    subcats.forEach(function (sc) {
      var prods = products.filter(function (p) { return p.subcategory === sc.id; });
      var section = document.createElement('div');
      section.className = 'subcat-section';
      section.id = sc.id;
      section.innerHTML =
        '<h3 class="subcat-heading">' + esc(sc.label) + '</h3>' +
        '<div class="shop-grid">' +
        prods.map(function (p, i) { return buildProductCard(p, delays[i % 4]); }).join('') +
        '</div>';
      catMain.appendChild(section);
    });

    observeReveal(catMain);
  }

  // ── Shop page ─────────────────────────────────────────────────
  function renderShopPage() {
    var products = window.DERIOR_PRODUCTS || [];
    var main = document.querySelector('.shop-layout main');
    if (!main) return;

    var countEl = main.querySelector('.product-count');
    if (countEl) countEl.textContent = products.length + ' pieces';

    // Remove old hard-coded grid, keep header
    var oldGrid = main.querySelector('.shop-grid');
    if (oldGrid) oldGrid.remove();

    var delays = ['', 'reveal-d1', 'reveal-d2'];
    var grid = document.createElement('div');
    grid.className = 'shop-grid';
    grid.innerHTML = products.map(function (p, i) {
      return buildProductCard(p, delays[i % 3]);
    }).join('');
    main.appendChild(grid);

    observeReveal(grid);
  }

  // ── Homepage featured pieces ──────────────────────────────────
  function renderFeaturedPieces() {
    var featured = (window.DERIOR_PRODUCTS || []).filter(function (p) { return p.featured; });
    var grid = document.querySelector('.pieces-grid');
    if (!grid || !featured.length) return;

    var markup = featured.map(function (p, i) {
      var cls = i === 0 ? 'piece-large' : 'piece-small';
      var delay = i === 0 ? '' : (i === 1 ? ' reveal-d1' : ' reveal-d2');
      return (
        '<div class="' + cls + ' reveal' + delay + '" data-product-id="' + esc(p.id) + '">' +
        '<a href="#" class="piece-img-wrap">' +
          '<img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" loading="lazy">' +
        '</a>' +
        '<div class="piece-info">' +
          '<span class="piece-cat">' + esc(p.categoryLabel) + '</span>' +
          '<h3 class="piece-name">' + esc(p.name) + '</h3>' +
          '<span class="piece-price">' + ugx(p.price_ugx) + '</span>' +
        '</div>' +
        '</div>'
      );
    }).join('');

    grid.innerHTML = markup;
    observeReveal(grid);
  }

  // ── Homepage category tile counts ─────────────────────────────
  function updateCategoryCounts() {
    var products = window.DERIOR_PRODUCTS || [];
    var counts = {};
    products.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
    var map = {
      'living-room.html': 'living-room',
      'dining-room.html': 'dining-room',
      'home-office.html': 'home-office',
      'bedroom.html':     'bedroom'
    };
    document.querySelectorAll('.cat-tile').forEach(function (tile) {
      var href = (tile.getAttribute('href') || '').replace(/^.*\//, '');
      var slug = map[href];
      var el = tile.querySelector('.cat-tile-count');
      if (el && slug) el.textContent = (counts[slug] || 0) + ' pieces';
    });
  }

  // ── Mega menu (generated from subcategories in data) ──────────
  // Fixes: missing Drinks Cabinets link in Dining, dead #bookshelves in Home Office
  function generateMegaMenu() {
    var megaInner = document.querySelector('.mega-inner');
    if (!megaInner || !window.DERIOR_PRODUCTS) return;

    var catDefs = [
      { slug: 'living-room', label: 'Living Room', page: 'living-room.html' },
      { slug: 'dining-room', label: 'Dining Room', page: 'dining-room.html' },
      { slug: 'home-office', label: 'Home Office', page: 'home-office.html' },
      { slug: 'bedroom',     label: 'Bedroom',     page: 'bedroom.html'     }
    ];

    megaInner.innerHTML = catDefs.map(function (cat) {
      var subcats = [], seen = {};
      DERIOR_PRODUCTS.forEach(function (p) {
        if (p.category === cat.slug && !seen[p.subcategory]) {
          seen[p.subcategory] = true;
          subcats.push({ id: p.subcategory, label: p.subcategoryLabel });
        }
      });
      return (
        '<div class="mega-col">' +
        '<a href="' + cat.page + '" class="mega-heading">' + esc(cat.label) + '</a>' +
        '<ul>' +
        subcats.map(function (sc) {
          return '<li><a href="' + cat.page + '#' + sc.id + '">' + esc(sc.label) + '</a></li>';
        }).join('') +
        '</ul>' +
        '</div>'
      );
    }).join('');
  }

  // ── Auto-init on every page ───────────────────────────────────
  function autoInit() {
    ensureGalleryOverlay();
    generateMegaMenu();
    updateCategoryCounts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  window.DeriorRender = {
    renderCategoryPage:   renderCategoryPage,
    renderShopPage:       renderShopPage,
    renderFeaturedPieces: renderFeaturedPieces,
    updateCategoryCounts: updateCategoryCounts,
    generateMegaMenu:     generateMegaMenu,
    buildProductCard:     buildProductCard,
    ugx:                  ugx
  };

}());
