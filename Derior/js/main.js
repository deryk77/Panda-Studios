/* DERIOR — Main JS */

// ── Preloader — Ferrari-style logo on black ───────────────────
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const dismiss = () => {
    document.body.classList.remove('preloader-active');
    preloader.classList.add('out');
    setTimeout(() => { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 800);
  };

  if (document.readyState === 'complete') {
    setTimeout(dismiss, 900);
  } else {
    window.addEventListener('load', () => setTimeout(dismiss, 800));
  }
})();

// ── DOM refs ──────────────────────────────────────────────────
const nav            = document.getElementById('nav');
const megaMenu       = document.getElementById('megaMenu');
const hasMegaItem    = document.querySelector('.has-mega');
const searchToggle   = document.getElementById('searchToggle');
const searchOverlay  = document.getElementById('searchOverlay');
const searchClose    = document.getElementById('searchClose');
const searchInput    = document.getElementById('searchInput');
const searchResults  = document.getElementById('searchResults');

// ── Nav scroll state ──────────────────────────────────────────
function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}

if (!document.querySelector('.hero')) {
  nav.classList.add('scrolled');
} else {
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// ── Hero slider — Ferrari.com style ──────────────────────────
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots   = document.querySelectorAll('.hero-dot');
let   currentSlide = 0;
let   slideTimer   = null;

function goToSlide(idx) {
  heroSlides[currentSlide].classList.remove('active');
  heroDots[currentSlide].classList.remove('active');
  currentSlide = (idx + heroSlides.length) % heroSlides.length;
  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startSlider() {
  if (heroSlides.length < 2) return;
  slideTimer = setInterval(nextSlide, 6000);
}

function resetSlider() {
  clearInterval(slideTimer);
  startSlider();
}

if (heroSlides.length) {
  startSlider();
  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.idx));
      resetSlider();
    });
  });
}

// ── Mega menu (hover, with delay) ─────────────────────────────
if (hasMegaItem && megaMenu) {
  let closeTimer = null;

  const openMega  = () => { clearTimeout(closeTimer); megaMenu.classList.add('open'); };
  const closeMega = () => { closeTimer = setTimeout(() => megaMenu.classList.remove('open'), 160); };

  hasMegaItem.addEventListener('mouseenter', openMega);
  hasMegaItem.addEventListener('mouseleave', closeMega);
  megaMenu.addEventListener('mouseenter', openMega);
  megaMenu.addEventListener('mouseleave', closeMega);
}

// ── Search ────────────────────────────────────────────────────
function openSearch() {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput && searchInput.focus(), 380);
}

function closeSearch() {
  searchOverlay.classList.remove('active');
  if (searchInput)   searchInput.value = '';
  if (searchResults) searchResults.innerHTML = '';
}

if (searchToggle) searchToggle.addEventListener('click', openSearch);
if (searchClose)  searchClose.addEventListener('click', closeSearch);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
  }
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q || !searchResults) { searchResults.innerHTML = ''; return; }

    const catalog = window.DERIOR_PRODUCTS || [];
    const hits = catalog.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.subcategoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 8);

    searchResults.innerHTML = hits.length
      ? hits.map(p => `
          <button class="search-result-item" data-product-id="${p.id}">
            <div class="search-result-thumb">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            </div>
            <div>
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-cat">${p.subcategoryLabel} &middot; UGX ${p.price_ugx.toLocaleString()}</div>
            </div>
          </button>`).join('')
      : '<p class="search-no-results">No pieces found for that term.</p>';
  });
}

if (searchResults) {
  searchResults.addEventListener('click', e => {
    const item = e.target.closest('.search-result-item[data-product-id]');
    if (!item) return;
    closeSearch();
    if (window.DeriorGallery) DeriorGallery.open(item.dataset.productId);
  });
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ── Mobile menu toggle ────────────────────────────────
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = mobileNav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (nav && !nav.contains(e.target)) {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
    }
  });
}
