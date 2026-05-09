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

// ── Product data for search ──────────────────────────────────
const PRODUCTS = [
  { name: 'Linen Cloud Sofa',        category: 'Living Room',  href: 'living-room.html',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&q=60' },
  { name: 'Solid Oak Coffee Table',  category: 'Living Room',  href: 'living-room.html',  img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=80&q=60' },
  { name: 'Marble Console Table',    category: 'Living Room',  href: 'living-room.html',  img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=80&q=60' },
  { name: 'Teak Side Table',         category: 'Living Room',  href: 'living-room.html',  img: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=80&q=60' },
  { name: 'Walnut Sideboard',        category: 'Living Room',  href: 'living-room.html',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&q=60' },
  { name: 'Ebony TV Unit',           category: 'Living Room',  href: 'living-room.html',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&q=60' },
  { name: 'Round Oak Dining Table',  category: 'Dining Room',  href: 'dining-room.html',  img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=80&q=60' },
  { name: 'Leather Dining Chair',    category: 'Dining Room',  href: 'dining-room.html',  img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=80&q=60' },
  { name: 'Rattan Bar Stool',        category: 'Dining Room',  href: 'dining-room.html',  img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&q=60' },
  { name: 'Upholstered Bench',       category: 'Dining Room',  href: 'dining-room.html',  img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&q=60' },
  { name: 'Walnut Drinks Cabinet',   category: 'Dining Room',  href: 'dining-room.html',  img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=80&q=60' },
  { name: 'Ceramic Sideboard',       category: 'Dining Room',  href: 'dining-room.html',  img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=80&q=60' },
  { name: 'Solid Walnut Desk',       category: 'Home Office',  href: 'home-office.html',  img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=80&q=60' },
  { name: 'Floating Shelf Unit',     category: 'Home Office',  href: 'home-office.html',  img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=80&q=60' },
  { name: 'Brass Desk Lamp',         category: 'Home Office',  href: 'home-office.html',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=60' },
  { name: 'Platform Bed Frame',      category: 'Bedroom',      href: 'bedroom.html',       img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80&q=60' },
  { name: 'Oak Bedside Table',       category: 'Bedroom',      href: 'bedroom.html',       img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80&q=60' },
  { name: 'Chest of Drawers',        category: 'Bedroom',      href: 'bedroom.html',       img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80&q=60' },
  { name: 'Oak Wardrobe',            category: 'Bedroom',      href: 'bedroom.html',       img: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=80&q=60' },
  { name: 'Linen Dressing Table',    category: 'Bedroom',      href: 'bedroom.html',       img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80&q=60' },
];

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
  if (e.key === 'Escape') closeSearch();
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q || !searchResults) { searchResults.innerHTML = ''; return; }

    const hits = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 10);

    searchResults.innerHTML = hits.length
      ? hits.map(p => `
          <a href="${p.href}" class="search-result-item">
            <div class="search-result-thumb">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div>
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-cat">${p.category}</div>
            </div>
          </a>`).join('')
      : '<p class="search-no-results">No results found</p>';
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
