/* ============================================================
   Wild Luna Africa — main.js
   The Unscripted Journey
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. NAV SCROLL BEHAVIOUR
     ---------------------------------------------------------- */
  const nav = document.querySelector('.wl-nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ----------------------------------------------------------
     2. HAMBURGER / MENU OVERLAY TOGGLE
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.wl-hamburger');
  const overlay   = document.querySelector('.wl-menu-overlay');

  function openMenu() {
    if (!hamburger || !overlay) return;
    hamburger.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!hamburger || !overlay) return;
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    if (!hamburger) return;
    if (hamburger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);

  // Close on overlay backdrop click (outside the inner content)
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMenu();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----------------------------------------------------------
     3. SUB-MENU TOGGLE (inside overlay)
     ---------------------------------------------------------- */
  const subToggles = document.querySelectorAll('.wl-menu-toggle-sub');

  subToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const sub = toggle.nextElementSibling;
      if (!sub) return;
      if (sub.classList.contains('open')) {
        sub.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        // close any other open sub-menus
        document.querySelectorAll('.wl-menu-sub.open').forEach(function (s) {
          s.classList.remove('open');
        });
        sub.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------------------------
     4. SCROLL REVEAL — IntersectionObserver
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.wl-reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------
     5. HERO BG ZOOM — remove scale(1.05) after load
     ---------------------------------------------------------- */
  const heroBg = document.querySelector('.wl-hero-bg');

  function initHeroZoom() {
    if (!heroBg) return;
    // Small rAF delay to ensure CSS transition fires
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroBg.classList.add('loaded');
      });
    });
  }

  if (document.readyState === 'complete') {
    initHeroZoom();
  } else {
    window.addEventListener('load', initHeroZoom);
  }

  /* ----------------------------------------------------------
     6. JOURNAL FILTER BUTTONS
     ---------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.wl-filter-btn');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Optional: filter cards by data-category
      const cat = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.wl-journal-card[data-category]');

      if (cat === 'all' || !cat) {
        cards.forEach(function (c) { c.closest('.wl-journal-card-wrap') ? c.closest('.wl-journal-card-wrap').style.display = '' : c.style.display = ''; });
      } else {
        cards.forEach(function (c) {
          const cardCat = c.getAttribute('data-category');
          const wrap = c.closest('.wl-journal-card-wrap') || c;
          wrap.style.display = (cardCat === cat) ? '' : 'none';
        });
      }
    });
  });

  /* ----------------------------------------------------------
     7. MULTI-STEP JOURNEY FORM
     ---------------------------------------------------------- */
  const journeyForm   = document.querySelector('.wl-journey-form');
  const steps         = document.querySelectorAll('.wl-journey-step');
  const stepDotItems  = document.querySelectorAll('.wl-step-item');
  const nextBtns      = document.querySelectorAll('.wl-btn-next');
  const backBtns      = document.querySelectorAll('.wl-btn-back');
  const formSection   = document.querySelector('.wl-journey-section');
  const successMsg    = document.querySelector('.wl-form-success');
  const submitBtn     = document.querySelector('.wl-btn-submit');

  let currentStep = 0;

  function showStep(index) {
    steps.forEach(function (step, i) {
      step.classList.toggle('active', i === index);
    });

    stepDotItems.forEach(function (item, i) {
      item.classList.remove('active', 'done');
      if (i < index) item.classList.add('done');
      if (i === index) item.classList.add('active');
    });

    // Scroll to form section
    if (formSection) {
      const offset = formSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  nextBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  backBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // Submit
  if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (journeyForm) journeyForm.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('active');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Initialise on load
  if (steps.length > 0) {
    showStep(0);
  }

  /* ----------------------------------------------------------
     8. DESTINATION OPTION CARDS — toggle .selected
     ---------------------------------------------------------- */
  const destOptions = document.querySelectorAll('.wl-destination-option');

  destOptions.forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('selected');
    });
  });

  /* ----------------------------------------------------------
     9. EXPERIENCE OPTION TILES — toggle .selected
     ---------------------------------------------------------- */
  const expOptions = document.querySelectorAll('.wl-experience-option');

  expOptions.forEach(function (tile) {
    tile.addEventListener('click', function () {
      tile.classList.toggle('selected');
    });
  });

  /* ----------------------------------------------------------
     10. NEWSLETTER FORM — prevent default + feedback
     ---------------------------------------------------------- */
  const newsletterForm = document.querySelector('.wl-newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('.wl-newsletter-input');
      const btn   = newsletterForm.querySelector('.wl-newsletter-btn');
      if (input) input.value = '';
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Subscribed';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      }
    });
  }


  /* ----------------------------------------------------------
     11. PAGE ENTRY LINE
     ---------------------------------------------------------- */
  var pageLine = document.createElement('div');
  pageLine.id = 'wl-page-line';
  document.body.insertBefore(pageLine, document.body.firstChild);

  setTimeout(function () {
    if (pageLine.parentNode) pageLine.parentNode.removeChild(pageLine);
  }, 1100);

  /* ----------------------------------------------------------
     12. CUSTOM CURSOR
     ---------------------------------------------------------- */
  var isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    document.body.classList.add('has-cursor');

    var cursor = document.createElement('div');
    cursor.id = 'wl-cursor';
    document.body.appendChild(cursor);

    var cursorX = -100;
    var cursorY = -100;
    var rafPending = false;

    document.addEventListener('mousemove', function (e) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(function () {
          cursor.style.left = cursorX + 'px';
          cursor.style.top  = cursorY + 'px';
          rafPending = false;
        });
      }
    });

    var hoverTargets = document.querySelectorAll('a, button, .wl-destination-option, .wl-experience-option, .wl-filter-btn');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('cursor-hover'); });
    });
  }

  /* ----------------------------------------------------------
     13. HERO PARALLAX
     ---------------------------------------------------------- */
  var heroBgParallax = document.querySelector('.wl-hero-bg');

  if (heroBgParallax && !isTouchDevice) {
    window.addEventListener('scroll', function () {
      var sy = window.scrollY;
      heroBgParallax.style.transform = 'translateY(' + (sy * 0.3) + 'px) scale(1.05)';
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     14. CARD MOUSE-TILT
     ---------------------------------------------------------- */
  var tiltCards = document.querySelectorAll('.wl-card');

  if (!isTouchDevice) {
    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = (e.clientX - cx) / (rect.width / 2);
        var dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = 'perspective(800px) rotateY(' + (dx * 6) + 'deg) rotateX(' + (-dy * 6) + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     15. JOURNAL FILTER — animated hide/show
     ---------------------------------------------------------- */
  var filterBtnsAnimated = document.querySelectorAll('.wl-filter-btn');

  filterBtnsAnimated.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      var cards = document.querySelectorAll('.wl-journal-card[data-category]');

      cards.forEach(function (c) {
        if (cat === 'all' || !cat || c.getAttribute('data-category') === cat) {
          c.style.opacity    = '0';
          c.style.transform  = 'scale(0.97)';
          c.style.display    = '';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              c.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              c.style.opacity    = '1';
              c.style.transform  = '';
            });
          });
        } else {
          c.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          c.style.opacity    = '0';
          c.style.transform  = 'scale(0.96)';
          setTimeout(function () { c.style.display = 'none'; }, 260);
        }
      });
    });
  });

  /* ----------------------------------------------------------
     INQUIRY PORTAL — select colour state + form feedback
     ---------------------------------------------------------- */
  var inqSelect = document.getElementById('inq-region');
  if (inqSelect) {
    inqSelect.addEventListener('change', function () {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  }

  var inqForm = document.querySelector('.wl-inquiry-form');
  if (inqForm) {
    inqForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = inqForm.querySelector('.wl-inquiry-btn');
      btn.textContent = 'Request received ✓';
      btn.style.opacity = '0.6';
      btn.style.pointerEvents = 'none';
    });
  }

})();
