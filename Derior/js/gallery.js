(function () {
  'use strict';

  var overlay   = document.getElementById('galleryOverlay');
  if (!overlay) return;

  var backdrop  = document.getElementById('galleryBackdrop');
  var closeBtn  = document.getElementById('galleryClose');
  var prevBtn   = document.getElementById('galleryPrev');
  var nextBtn   = document.getElementById('galleryNext');
  var track     = document.getElementById('galleryTrack');
  var trackWrap = document.getElementById('galleryTrackWrap');
  var dotsWrap  = document.getElementById('galleryDots');
  var nameEl    = document.getElementById('galleryName');
  var catEl     = document.getElementById('galleryCat');
  var priceEl   = document.getElementById('galleryPrice');

  var images = [];
  var current = 0;
  var savedScroll = 0;

  function scrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // ── open ──────────────────────────────────────────────────
  function open(card) {
    var raw;
    try { raw = JSON.parse(card.dataset.gallery || 'null'); } catch (e) { return; }
    if (!raw || !raw.length) return;

    images  = raw;
    current = 0;

    nameEl.textContent  = (card.querySelector('h4') || {}).textContent || '';
    catEl.textContent   = (card.querySelector('.product-cat') || {}).textContent || '';
    priceEl.textContent = (card.querySelector('.product-price') || {}).textContent || '';

    track.innerHTML  = '';
    dotsWrap.innerHTML = '';

    images.forEach(function (src, i) {
      var slide = document.createElement('div');
      slide.className = 'gallery-slide';
      var img = document.createElement('img');
      img.src = src;
      img.alt = nameEl.textContent;
      img.draggable = false;
      slide.appendChild(img);
      track.appendChild(slide);

      var dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Image ' + (i + 1));
      dot.addEventListener('click', (function (idx) {
        return function (e) { e.stopPropagation(); goTo(idx); };
      }(i)));
      dotsWrap.appendChild(dot);
    });

    updateArrows();
    goTo(0, false);

    savedScroll = window.scrollY;
    var sbw = scrollbarWidth();
    document.body.style.overflow = 'hidden';
    if (sbw > 0) document.body.style.paddingRight = sbw + 'px';
    overlay.classList.add('is-open');
    closeBtn.focus();
  }

  // ── close ─────────────────────────────────────────────────
  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, savedScroll);
  }

  // ── navigate ──────────────────────────────────────────────
  function goTo(index, animate) {
    if (animate === undefined) animate = true;
    current = ((index % images.length) + images.length) % images.length;

    var slideW = trackWrap.offsetWidth;

    if (!animate) {
      track.style.transition = 'none';
      track.style.transform = 'translateX(' + (-current * slideW) + 'px)';
      track.offsetHeight; // force reflow
      track.style.transition = '';
    } else {
      track.style.transform = 'translateX(' + (-current * slideW) + 'px)';
    }

    dotsWrap.querySelectorAll('.gallery-dot').forEach(function (d, i) {
      d.classList.toggle('is-active', i === current);
    });
  }

  function updateArrows() {
    var show = images.length > 1;
    prevBtn.style.opacity = show ? '1' : '0';
    prevBtn.style.pointerEvents = show ? '' : 'none';
    nextBtn.style.opacity = show ? '1' : '0';
    nextBtn.style.pointerEvents = show ? '' : 'none';
  }

  // ── touch swipe ───────────────────────────────────────────
  var touchX = 0;
  var touchDx = 0;

  track.addEventListener('touchstart', function (e) {
    touchX  = e.touches[0].clientX;
    touchDx = 0;
  }, { passive: true });

  track.addEventListener('touchmove', function (e) {
    touchDx = e.touches[0].clientX - touchX;
  }, { passive: true });

  track.addEventListener('touchend', function () {
    if (Math.abs(touchDx) > 50) {
      touchDx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  });

  // ── close when clicking slide background (not image) ──────
  track.addEventListener('click', function (e) {
    if (e.target.tagName !== 'IMG') close();
  });

  // ── button & keyboard bindings ────────────────────────────
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(current - 1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(current + 1); });

  document.getElementById('galleryStage').addEventListener('click', function (e) {
    if (!e.target.closest('.gallery-arrow') && !e.target.closest('.gallery-track-wrap')) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   goTo(current - 1);
    if (e.key === 'ArrowRight')  goTo(current + 1);
  });

  window.addEventListener('resize', function () {
    if (overlay.classList.contains('is-open')) goTo(current, false);
  });

  // ── wire up product cards ─────────────────────────────────
  document.querySelectorAll('.product-card[data-gallery]').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      var imgs = [];
      try { imgs = JSON.parse(card.dataset.gallery || '[]'); } catch (e) {}
      imgs.forEach(function (src) {
        var img = new Image();
        img.src = src;
      });
    });

    card.addEventListener('click', function (e) {
      e.preventDefault();
      open(card);
    });
  });

}());
