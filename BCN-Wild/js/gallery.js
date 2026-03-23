(function () {
  'use strict';

  /* ============================================================
     BCN-Wild — Gallery JS
     List view hover preview · Grid horizontal scroll
     Lens magnifier (ykproduce style) · Filter · View toggle
     ============================================================ */

  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  /* ── 1. ITEMS DATA ──────────────────────────────────────────── */
  var items = [
    {
      n: '01', title: 'Wildebeest Migration',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Serengeti, Tanzania', year: '2025',
      img: 'img/wildebeest-splashing-through-water-while-others-gr-2025-03-25-12-52-42-utc.webp'
    },
    {
      n: '02', title: 'Mountain Gorilla',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Bwindi, Uganda', year: '2025',
      img: 'img/SVNP_WILDLIFE_Gorilla_Sabyinyo_Family_Ross_Couper-5.webp'
    },
    {
      n: '03', title: 'Leopard Portrait',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Sabi Sands, South Africa', year: '2025',
      img: 'img/closeup-of-leopard-looking-up-in-sabi-sands-by-rhino-africa-02~-~media--3f079e97--query.c80b53b9.webp'
    },
    {
      n: '04', title: 'White Rhino',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Matobo, Zimbabwe', year: '2025',
      img: 'img/Rhino.webp'
    },
    {
      n: '05', title: 'African Elephant',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Amboseli, Kenya', year: '2025',
      img: 'img/elphant.webp'
    },
    {
      n: '06', title: 'Shoebill',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Murchison Falls, Uganda', year: '2024',
      img: 'img/Copy of Shoebill, Balaeniceps rex, portrait of big beaked bird, Uganda.jpg'
    },
    {
      n: '07', title: 'Zimbabwe Wildlife',
      cat: 'wildlife', catLabel: 'Wildlife',
      loc: 'Matobo, Zimbabwe', year: '2025',
      img: 'img/a-magical-zimbabwe-wildlife-pictures-2025-02-20-00-10-35-utc.jpg'
    },
    {
      n: '08', title: 'Garden Route Forest',
      cat: 'landscapes', catLabel: 'Landscapes',
      loc: 'Western Cape, South Africa', year: '2024',
      img: 'img/garden-route-natures-valley-forest-drive-aerial-view~-~media--3f079e97--query.cda66551.webp'
    },
    {
      n: '09', title: 'Safari Aerial',
      cat: 'landscapes', catLabel: 'Landscapes',
      loc: 'Kwandwe, South Africa', year: '2024',
      img: 'img/safari-vehicle-game-drive-drone-kwandwee-south-africa-copyright-rhino-africa-01.216d2515.webp'
    },
    {
      n: '10', title: 'Uganda Highlands',
      cat: 'landscapes', catLabel: 'Landscapes',
      loc: 'Uganda', year: '2024',
      img: 'img/landscape Uganda 103.jpg'
    },
    {
      n: '11', title: 'Miss Helena',
      cat: 'cultural', catLabel: 'Cultural & People',
      loc: 'Kampala, Uganda', year: '2024',
      img: 'img/Miss Helena 67.jpg'
    },
    {
      n: '12', title: 'Shidah Katono',
      cat: 'cultural', catLabel: 'Cultural & People',
      loc: 'Uganda', year: '2024',
      img: 'img/DSC_0263_optimised_Shidah_Katono (1).jpg'
    }
  ];

  /* ── 2. ELEMENTS ────────────────────────────────────────────── */
  var listView         = document.getElementById('bcn-list-view');
  var gridView         = document.getElementById('bcn-grid-view');
  var gridTrack        = document.getElementById('bcn-grid-track');
  var gridScrollSect   = document.getElementById('bcn-grid-scroll');
  var gridHint         = document.getElementById('bcn-grid-hint');
  var galCount         = document.getElementById('bcn-gal-count');
  var preview          = document.getElementById('bcn-preview');
  var lens             = document.getElementById('bcn-lens');
  var btnList          = document.getElementById('bcn-btn-list');
  var btnGrid          = document.getElementById('bcn-btn-grid');

  /* ── 3. RENDER LIST ROWS ────────────────────────────────────── */
  items.forEach(function (item) {
    var row = document.createElement('div');
    row.className = 'bcn-row';
    row.setAttribute('data-cat', item.cat);
    row.setAttribute('data-img', item.img);
    row.innerHTML =
      '<span class="bcn-row-num">' + item.n + '</span>' +
      '<span class="bcn-row-title">' + item.title + '</span>' +
      '<span class="bcn-row-cat">' + item.catLabel + '</span>' +
      '<span class="bcn-row-loc">' + item.loc + '</span>' +
      '<span class="bcn-row-year">' + item.year + '</span>' +
      '<span class="bcn-row-arrow">&#8594;</span>';
    listView.appendChild(row);
  });

  /* ── 4. RENDER GRID ITEMS ───────────────────────────────────── */
  items.forEach(function (item) {
    var el = document.createElement('div');
    el.className = 'bcn-grid-item';
    el.setAttribute('data-cat', item.cat);
    el.setAttribute('data-img', item.img);
    el.innerHTML =
      '<div class="bcn-grid-img" style="background-image:url(\'' + item.img + '\')"></div>' +
      '<div class="bcn-grid-info">' +
        '<span class="bcn-grid-num">' + item.n + '</span>' +
        '<span class="bcn-grid-title">' + item.title + '</span>' +
        '<span class="bcn-grid-loc">' + item.loc + '</span>' +
      '</div>';
    gridTrack.appendChild(el);
  });

  /* ── 5. VIEW TOGGLE ─────────────────────────────────────────── */
  var currentView = 'list';

  function showList() {
    currentView = 'list';
    listView.style.display = 'block';
    gridView.style.display = 'none';
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
    btnList.setAttribute('aria-pressed', 'true');
    btnGrid.setAttribute('aria-pressed', 'false');
    document.body.classList.remove('bcn-grid-active');
  }

  function showGrid() {
    currentView = 'grid';
    listView.style.display = 'none';
    gridView.style.display = 'block';
    btnList.classList.remove('active');
    btnGrid.classList.add('active');
    btnList.setAttribute('aria-pressed', 'false');
    btnGrid.setAttribute('aria-pressed', 'true');
    document.body.classList.add('bcn-grid-active');
    updateGridHeight();
    updateGridScroll();
  }

  btnList.addEventListener('click', showList);
  btnGrid.addEventListener('click', showGrid);

  /* ── 6. FILTER ──────────────────────────────────────────────── */
  var filterBtns  = document.querySelectorAll('.bcn-filter');
  var activeFilter = 'all';

  // Check URL params for initial filter (from menu links like gallery.html?filter=wildlife)
  (function () {
    var params = new URLSearchParams(window.location.search);
    var f = params.get('filter');
    if (f) { activeFilter = f; }
  }());

  function applyFilter() {
    var visibleCount = 0;

    // List
    var rows = listView.querySelectorAll('.bcn-row');
    rows.forEach(function (row) {
      var show = (activeFilter === 'all' || row.getAttribute('data-cat') === activeFilter);
      if (show) {
        row.removeAttribute('data-hidden');
        visibleCount++;
      } else {
        row.setAttribute('data-hidden', '');
      }
    });

    // Grid
    var gridItems = gridTrack.querySelectorAll('.bcn-grid-item');
    gridItems.forEach(function (item) {
      var show = (activeFilter === 'all' || item.getAttribute('data-cat') === activeFilter);
      item.style.display = show ? '' : 'none';
      if (show) { item.removeAttribute('data-hidden'); }
      else       { item.setAttribute('data-hidden', ''); }
    });

    // Update count
    if (galCount) { galCount.textContent = '— ' + visibleCount; }

    // Update filter button states
    filterBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-filter') === activeFilter;
      btn.classList.toggle('active', active);
    });

    if (currentView === 'grid') {
      updateGridHeight();
      updateGridScroll();
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeFilter = btn.getAttribute('data-filter');
      applyFilter();
    });
  });

  // Apply initial filter
  applyFilter();

  /* ── 7. GRID — HORIZONTAL SCROLL (ykproduce.co.jp style) ───── */
  function getVisibleGridItems() {
    return Array.from(gridTrack.querySelectorAll('.bcn-grid-item:not([data-hidden])'));
  }

  function calcGridWidth() {
    var visible = getVisibleGridItems();
    var itemW   = 0.42 * window.innerWidth;
    var gapW    = 0.03 * window.innerWidth;
    var padW    = 0.16 * window.innerWidth; // 8vw each side
    return visible.length * itemW + Math.max(0, visible.length - 1) * gapW + padW;
  }

  function updateGridHeight() {
    var totalW  = calcGridWidth();
    // Scroll travel = total horizontal distance to traverse
    // Section height = travel + viewport height
    var travel  = window.innerWidth + (totalW - window.innerWidth);
    gridScrollSect.style.height = (travel + window.innerHeight) + 'px';
  }

  function updateGridScroll() {
    if (currentView !== 'grid') return;
    var rect       = gridScrollSect.getBoundingClientRect();
    var scrollable = gridScrollSect.offsetHeight - window.innerHeight;
    var panelTop   = window.scrollY + rect.top;
    var p          = Math.max(0, Math.min(1, (window.scrollY - panelTop) / scrollable));

    var totalW     = calcGridWidth();
    var startX     = window.innerWidth;
    var endX       = window.innerWidth - totalW;
    var tx         = startX + p * (endX - startX);

    gridTrack.style.transform = 'translateX(' + tx + 'px)';

    // Hide scroll hint once scrolled
    if (gridHint) {
      if (p > 0.05) {
        gridHint.classList.add('hidden');
      } else {
        gridHint.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('scroll', updateGridScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (currentView === 'grid') {
      updateGridHeight();
      updateGridScroll();
    }
  }, { passive: true });

  /* ── 8. LIST — HOVER PREVIEW (siemprericc.com style) ───────── */
  if (!isTouchDevice && preview) {
    var previewClientX = window.innerWidth / 2;
    var previewClientY = window.innerHeight / 2;
    var previewRenderX = previewClientX;
    var previewRenderY = previewClientY;

    // Smooth follow
    (function animPreview() {
      previewRenderX += (previewClientX - previewRenderX) * 0.10;
      previewRenderY += (previewClientY - previewRenderY) * 0.10;

      // Offset so preview doesn't cover cursor
      var ox = 48;
      var oy = -120;
      var px = previewRenderX + ox;
      var py = previewRenderY + oy;

      // Clamp to viewport
      px = Math.max(12, Math.min(px, window.innerWidth  - 380));
      py = Math.max(12, Math.min(py, window.innerHeight - 260));

      preview.style.left = px + 'px';
      preview.style.top  = py + 'px';

      requestAnimationFrame(animPreview);
    }());

    document.addEventListener('mousemove', function (e) {
      previewClientX = e.clientX;
      previewClientY = e.clientY;
    });

    // Show/hide on row hover
    listView.addEventListener('mouseover', function (e) {
      var row = e.target.closest('.bcn-row');
      if (row && !row.hasAttribute('data-hidden')) {
        var img = row.getAttribute('data-img');
        preview.style.backgroundImage = 'url("' + img + '")';
        preview.classList.add('visible');
      }
    });

    listView.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget || !e.relatedTarget.closest('.bcn-row')) {
        preview.classList.remove('visible');
      }
    });
  }

  /* ── 9. LENS MAGNIFIER (grid mode, ykproduce style) ─────────── */
  if (!isTouchDevice && lens) {
    var lensClientX  = -400;
    var lensClientY  = -400;
    var lensRenderX  = -400;
    var lensRenderY  = -400;

    // Smooth lens follow (slower lerp = more lag = more dreamy)
    (function animLens() {
      lensRenderX += (lensClientX - lensRenderX) * 0.07;
      lensRenderY += (lensClientY - lensRenderY) * 0.07;
      lens.style.left = lensRenderX + 'px';
      lens.style.top  = lensRenderY + 'px';
      requestAnimationFrame(animLens);
    }());

    document.addEventListener('mousemove', function (e) {
      lensClientX = e.clientX;
      lensClientY = e.clientY;
    });

    // Expand lens when hovering a grid image
    gridTrack.addEventListener('mouseover', function (e) {
      if (e.target.closest('.bcn-grid-item')) {
        document.body.classList.add('bcn-lens-expand');
      }
    });

    gridTrack.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget || !e.relatedTarget.closest('.bcn-grid-item')) {
        document.body.classList.remove('bcn-lens-expand');
      }
    });
  }

  /* ── 10. NAV SCROLL STATE ───────────────────────────────────── */
  // nav scroll detection already handled by main.js — no duplication needed

  /* ── 11. INITIAL STATE ──────────────────────────────────────── */
  // Start in list view (default)
  showList();

})();
