(function () {
  'use strict';

  /* ============================================================
     BCN-Wild — Cinematic Deck Engine
     Scroll-driven stacked panel reveal.

     Architecture:
       · .bcn-deck-scroll-space  — 6 × 100vh tall, provides scroll travel
       · .bcn-deck-stage         — position:sticky, stays pinned while
                                   the scroll-space is in the viewport
       · .bcn-deck-card          — all 5 cards at the same position,
                                   z-indexed so card 1 is on top
       · .bcn-deck--out          — dismissed state: scale(0.92) + opacity:0

     How steps work:
       travel = scrollSpace.height − viewport.height = 5 × 100vh
       progress = scrolled / travel  (0 → 1)
       step     = floor(progress × 5), clamped 0–4
       Each step change triggers a CSS transition on the current card.
  ============================================================ */

  var scrollSpace = document.getElementById('bcn-deck-scroll-space');
  if (!scrollSpace) return;

  var stage   = document.getElementById('bcn-deck-stage');
  var cards   = Array.from(stage.querySelectorAll('.bcn-deck-card'));
  var dotEls  = Array.from(stage.querySelectorAll('.bcn-deck-dot'));
  var curEl   = document.getElementById('bcn-deck-cur');
  var TOTAL   = cards.length; // 6

  var current = -1; // -1 forces first render to always apply

  /* ── updateDeck: apply state to all cards and UI ─────────── */
  function updateDeck(index) {
    if (index === current) return;
    current = index;

    cards.forEach(function (card, i) {
      if (i < index) {
        // Already scrolled past — dismissed
        card.classList.add('bcn-deck--out');
      } else {
        // Current or waiting below — visible
        card.classList.remove('bcn-deck--out');
      }
    });

    dotEls.forEach(function (dot, i) {
      dot.classList.toggle('bcn-deck-dot--active', i === index);
    });

    if (curEl) {
      curEl.textContent = String(index + 1).padStart(2, '0');
    }
  }

  /* ── onScroll: calculate which card should be active ─────── */
  function onScroll() {
    var rect   = scrollSpace.getBoundingClientRect();
    var travel = scrollSpace.offsetHeight - window.innerHeight;

    // Not yet in view, or section too short
    if (travel <= 0) return;

    // How far the scroll-space top has moved above the viewport top
    // rect.top is 0 when section top is at viewport top, negative as we scroll in
    var scrolled = -rect.top;

    var progress = scrolled / travel;
    progress = Math.max(0, Math.min(1, progress));

    // Each of the 6 cards occupies 1/6 of the total travel
    var step = Math.floor(progress * TOTAL);
    step = Math.min(TOTAL - 1, step); // clamp to last card

    updateDeck(step);
  }

  /* ── Init ───────────────────────────────────────────────── */
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll,  { passive: true });

  // Run once immediately so initial state is correct
  // (handles case where page loads mid-scroll, e.g. back-navigation)
  onScroll();

}());

/* ── FLOATING GALLERY LIGHTBOX ──────────────────────────────── */
(function () {
  var items   = document.querySelectorAll('.bcn-float-item');
  var lb      = document.getElementById('bcn-float-lightbox');
  var lbImg   = document.getElementById('bcn-float-lb-img');
  var lbClose = document.getElementById('bcn-float-lb-close');

  if (!lb) return;

  function openLb(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function closeLb() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      openLb(this.dataset.src, this.dataset.alt);
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLb(this.dataset.src, this.dataset.alt);
      }
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLb();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb();
  });
}());
