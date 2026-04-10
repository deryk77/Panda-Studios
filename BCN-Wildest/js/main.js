(function () {
  'use strict';

  /* ============================================================
     BCN-Wild — Main JS
     Z-Axis Zoom Engine · Custom Cursor · Nav · Menu · Form
     ============================================================ */

  var canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── 1. PAGE LOAD ───────────────────────────────────────────── */
  window.addEventListener('load', function () {
    // Scroll cue fades in after a short delay
    var cue = document.getElementById('bcn-scroll-cue');
    if (cue) {
      cue.style.opacity = '0';
      setTimeout(function () {
        cue.style.opacity = '1';
        cue.style.transition = 'opacity 1s ease';
      }, 1200);
    }
  });

  /* ── 2. CUSTOM CURSOR ───────────────────────────────────────── */
  if (canUseCustomCursor) {
    var cursor    = document.getElementById('bcn-cursor');
    var cursorDot = document.getElementById('bcn-cursor-dot');
    var mouseX = -100, mouseY = -100;
    var cursorX = -100, cursorY = -100;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows exactly
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
      }
    });

    // Large ring follows with lerp
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    var hoverEls = document.querySelectorAll(
      'a, button, select, input, textarea, .bcn-panel, #bcn-iris-prev, #bcn-iris-next, .bcn-iris-dot'
    );
    hoverEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  /* ── 3. NAVIGATION — scroll detection ──────────────────────── */
  var nav = document.getElementById('bcn-nav');

  window.addEventListener('scroll', function () {
    if (!nav) return;
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── 4. HAMBURGER MENU ──────────────────────────────────────── */
  var hamburger = document.getElementById('bcn-hamburger');
  var menu      = document.getElementById('bcn-menu');

  function openMenu() {
    if (!hamburger || !menu) return;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger || !menu) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (menu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu on nav link click
  var menuLinks = document.querySelectorAll('[data-close-menu]');
  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── 5. HERO PARALLAX — removed; hero zoom is now handled by    */
  /*    the Z-axis zoom engine in section 6 below, same as panels  */

  /* ── 6. Z-AXIS ZOOM ENGINE ──────────────────────────────────── */
  /*
    Both the hero and every .bcn-panel share the same mechanic:
      · Container height: 220vh
      · Sticky inner:     100vh
      · Scroll travel:    120vh  →  image scales 1.0 → 1.22
    The hero is the FIRST frame — zoom starts at scrollY = 0.
    Gallery panels continue the same effect seamlessly.
  */
  var hero        = document.querySelector('.bcn-hero');
  var heroBg      = document.getElementById('bcn-hero-bg');
  var heroContent = document.getElementById('bcn-hero-content');
  var panels      = document.querySelectorAll('.bcn-panel');
  var vh          = window.innerHeight;

  function zoomElement(container, img) {
    if (!container || !img) return;
    var rect       = container.getBoundingClientRect();
    var scrollable = container.offsetHeight - vh; // 120vh
    var panelTop   = window.scrollY + rect.top;
    var clamped    = Math.max(0, Math.min(1, (window.scrollY - panelTop) / scrollable));
    img.style.transform = 'scale(' + (1 + clamped * 0.22) + ')';
    return clamped;
  }

  function updateZoom() {
    vh = window.innerHeight;

    // ── Hero: zoom + fade content out as image zooms in ──────
    var heroProgress = zoomElement(hero, heroBg);
    if (heroContent && heroProgress !== undefined) {
      // Content fades out later so the hero text stays readable longer
      var fade = heroProgress < 0.75 ? (1 - heroProgress / 0.75) : 0;
      heroContent.style.opacity = Math.max(0, Math.min(1, fade));
    }

    // ── Gallery panels ────────────────────────────────────────
    panels.forEach(function (panel) {
      var img      = panel.querySelector('.bcn-panel-img');
      var clamped  = zoomElement(panel, img);
      if (clamped === undefined) return;

      // Meta text: fade in 0→15%, hold 15→80%, fade out 80→100%
      var meta = panel.querySelector('.bcn-panel-meta');
      if (meta) {
        var op;
        if (clamped < 0.15)      op = clamped / 0.15;
        else if (clamped > 0.8)  op = 1 - ((clamped - 0.8) / 0.2);
        else                     op = 1;
        meta.style.opacity = Math.max(0, Math.min(1, op));
      }
    });
  }

  window.addEventListener('scroll', updateZoom, { passive: true });
  window.addEventListener('resize', updateZoom, { passive: true });
  updateZoom();

  /* ── 7. SCROLL REVEAL ───────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.bcn-reveal');

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── 8. SELECT — colour state ───────────────────────────────── */
  var select = document.getElementById('bcn-interest');
  if (select) {
    select.addEventListener('change', function () {
      if (this.value) {
        this.classList.add('filled');
        this.classList.remove('empty');
      } else {
        this.classList.remove('filled');
        this.classList.add('empty');
      }
    });
    select.classList.add('empty');
  }

  /* ── 9. CONTACT FORM SUBMISSION ─────────────────────────────── */
  var form   = document.getElementById('bcn-form');
  var status = document.getElementById('bcn-form-status');
  var submitBtn = document.getElementById('bcn-submit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('bcn-name').value.trim();
      var email   = document.getElementById('bcn-email').value.trim();
      var interest = document.getElementById('bcn-interest').value;
      var message = document.getElementById('bcn-message').value.trim();

      // Basic validation
      if (!name || !email || !interest || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Submit via Web3Forms (update access_key when available)
      var submitText = submitBtn.querySelector('.bcn-submit-text');
      submitText.textContent = 'Sending...';
      submitBtn.disabled = true;

      var data = {
        access_key: 'YOUR_WEB3FORMS_KEY', // replace with actual key
        name: name,
        email: email,
        subject: 'BCN-Wild Inquiry — ' + interest,
        message: 'Area of Interest: ' + interest + '\n\n' + message
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          showStatus('Your inquiry has been received. We\'ll be in touch.', 'success');
          form.reset();
          if (select) { select.classList.remove('filled'); select.classList.add('empty'); }
        } else {
          showStatus('Something went wrong. Please try again.', 'error');
        }
        submitText.textContent = 'Submit';
        submitBtn.disabled = false;
      })
      .catch(function () {
        showStatus('Something went wrong. Please try again.', 'error');
        submitText.textContent = 'Submit';
        submitBtn.disabled = false;
      });
    });
  }

  function showStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'bcn-form-status ' + (type || '');
    setTimeout(function () {
      status.textContent = '';
      status.className = 'bcn-form-status';
    }, 6000);
  }

  /* ── 11. ABOUT — clip-path wipe from bottom ─────────────────── */
  (function () {
    var aboutSection = document.getElementById('bcn-about');
    var aboutWipe    = document.getElementById('bcn-about-wipe');
    if (!aboutSection || !aboutWipe) return;

    function updateAbout() {
      var rect       = aboutSection.getBoundingClientRect();
      var scrollable = aboutSection.offsetHeight - window.innerHeight;
      var panelTop   = window.scrollY + rect.top;
      var p          = Math.max(0, Math.min(1, (window.scrollY - panelTop) / scrollable));

      // inset(T 0 0 0): as T goes 100%→0%, bottom appears first → wipe from below.
      // Reveal early, then keep it open while the reader scrolls.
      var revealEnd = 0.25; // reach fully open by 25% of this section's scroll travel
      var reveal = p / revealEnd;
      reveal = Math.max(0, Math.min(1, reveal));
      var topInset = ((1 - reveal) * 100).toFixed(2);
      aboutWipe.style.clipPath = 'inset(' + topInset + '% 0 0 0)';
    }

    window.addEventListener('scroll', updateAbout, { passive: true });
    updateAbout();
  }());

  /* ── 10. SMOOTH ANCHOR SCROLL ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── 11. PAGE LOADER ────────────────────────────────────────── */
  function initLoader() {
    // Skip on mobile
    if (window.innerWidth < 768) return;

    var loader   = document.getElementById('bcn-loader');
    if (!loader) return;

    // Only play once — skip on every subsequent visit/refresh
    if (localStorage.getItem('bcn-loader-seen')) {
      loader.style.display = 'none';
      loader.style.pointerEvents = 'none';
      document.body.style.overflow = '';
      return;
    }

    var textBack = document.getElementById('bcn-loader-text-back');
    var wipe     = document.getElementById('bcn-loader-wipe');
    var imgWrap  = document.getElementById('bcn-loader-img-wrap');
    var img      = document.getElementById('bcn-loader-img');

    // Prevent page scroll during loader
    document.body.style.overflow = 'hidden';

    /* ── Step 2 (200ms): cream wipe slides L→R over the text ── */
    setTimeout(function () {
      var textW = textBack.offsetWidth + 20;
      wipe.style.transition = 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      wipe.style.width = textW + 'px';
    }, 200);

    /* ── Step 3 (900ms): bg turns cream · image expands in from centre ── */
    setTimeout(function () {
      // Black → cream background
      loader.style.transition = 'background-color 0.5s ease';
      loader.style.backgroundColor = '#f9f8f5';

      // Image grows from width 0 → 38vw (flex item, stays centred with text)
      imgWrap.style.transition =
        'width 0.55s cubic-bezier(0.16, 1, 0.3, 1),' +
        'opacity 0.4s ease';
      imgWrap.style.width   = '38vw';
      imgWrap.style.opacity = '1';
    }, 900);

    /* ── Step 4a (1600ms): image subtly scales ──────────────── */
    setTimeout(function () {
      img.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      img.style.transform  = 'scale(1.08)';
    }, 1600);

    /* ── Step 4b (1820ms): image expands to fill viewport ───── */
    setTimeout(function () {
      // Snapshot position, move element to body so it isn't clipped by loader
      var rect = imgWrap.getBoundingClientRect();
      imgWrap.style.transition = 'none';
      document.body.appendChild(imgWrap);
      imgWrap.style.position = 'fixed';
      imgWrap.style.top      = rect.top    + 'px';
      imgWrap.style.left     = rect.left   + 'px';
      imgWrap.style.right    = 'auto';
      imgWrap.style.bottom   = 'auto';
      imgWrap.style.width    = rect.width  + 'px';
      imgWrap.style.height   = rect.height + 'px';
      imgWrap.style.zIndex   = '99999';

      // Two rAF frames to force layout before animating
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          imgWrap.style.transition =
            'top 0.5s cubic-bezier(0.16, 1, 0.3, 1),' +
            'left 0.5s cubic-bezier(0.16, 1, 0.3, 1),' +
            'width 0.5s cubic-bezier(0.16, 1, 0.3, 1),' +
            'height 0.5s cubic-bezier(0.16, 1, 0.3, 1),' +
            'border-radius 0.5s ease';
          imgWrap.style.top          = '0';
          imgWrap.style.left         = '0';
          imgWrap.style.width        = '100vw';
          imgWrap.style.height       = '100vh';
          imgWrap.style.borderRadius = '0';
        });
      });
    }, 1820);

    /* ── Step 4c (2350ms): fade out loader + image ────────────── */
    setTimeout(function () {
      loader.style.transition  = 'opacity 0.35s ease';
      loader.style.opacity     = '0';
      imgWrap.style.transition = 'opacity 0.35s ease';
      imgWrap.style.opacity    = '0';
    }, 2350);

    /* ── Step 4d (2720ms): remove loader, restore scroll ─────── */
    setTimeout(function () {
      loader.style.display         = 'none';
      loader.style.pointerEvents   = 'none';
      imgWrap.style.display        = 'none';
      document.body.style.overflow = '';
      localStorage.setItem('bcn-loader-seen', '1');
    }, 2720);
  }

  /* ── 12. IRIS SLIDER — camera aperture transition ───────────── */
  function initIrisSlider() {
    var slider = document.getElementById('bcn-iris-slider');
    if (!slider) return;

    var slidesAll = Array.from(document.querySelectorAll('.bcn-iris-slide'));
    // Hard cap: maximum of 5 iris images
    var slides = slidesAll.slice(0, 5);
    slidesAll.forEach(function (s) { s.classList.remove('active'); });
    if (slides[0]) slides[0].classList.add('active');
    var dotsContainer = document.getElementById('bcn-iris-dots');
    if (!dotsContainer) return;
    var prevBtn      = document.getElementById('bcn-iris-prev');
    var nextBtn      = document.getElementById('bcn-iris-next');
    var currentEl    = document.getElementById('bcn-iris-current');
    var totalEl      = document.getElementById('bcn-iris-total');

    var current     = 0;
    var isAnimating = false;
    var total       = slides.length;
    // Slower automatic advance for the fade
    var AUTO_INTERVAL = 9000;
    var autoTimer;

    // Build dots
    if (totalEl) totalEl.textContent = String(total).padStart(2, '0');
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'bcn-iris-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', function () { goTo(i); });
      dotsContainer.appendChild(dot);
    });

    function getDots() {
      return Array.from(dotsContainer.querySelectorAll('.bcn-iris-dot'));
    }

    function updateUI(index) {
      getDots().forEach(function (d, i) { d.classList.toggle('active', i === index); });
      if (currentEl) currentEl.textContent = String(index + 1).padStart(2, '0');
    }

    function goTo(index) {
      if (isAnimating || index === current) return;
      isAnimating = true;
      var next = index;
      // Crossfade is driven purely by CSS transitions on opacity/blur/scale
      slides[current].classList.remove('active');
      slides[next].classList.add('active');
      current = next;
      updateUI(current);

      setTimeout(function () {
        isAnimating = false;
      }, 2300);
  }

    function nextSlide() { goTo((current + 1) % total); }
    function prevSlide() { goTo((current - 1 + total) % total); }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(nextSlide, AUTO_INTERVAL);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        clearInterval(autoTimer);
        nextSlide();
        startAuto();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        clearInterval(autoTimer);
        prevSlide();
        startAuto();
      });
    }

    // Keyboard support
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { clearInterval(autoTimer); nextSlide(); startAuto(); }
      if (e.key === 'ArrowLeft')  { clearInterval(autoTimer); prevSlide(); startAuto(); }
    });

    startAuto();
    updateUI(0);
  }

  /* ── 13. CTA FOOTER — scroll-in + stroke draw-on animation ──── */
  function initCTA() {
    var cta = document.getElementById('bcn-cta');
    if (!cta) return;

    if (!('IntersectionObserver' in window)) {
      cta.classList.add('is-active');
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cta.classList.add('is-active');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

    obs.observe(cta);
  }

  /* ── 15. FOCUS RING SCROLL INDICATOR (sticky-aware mechanical progress) ─ */
  function initFocusRing() {
    var track = document.getElementById('bcn-focus-track');
    var ring = document.getElementById('bcn-scroll-focus-ring');
    if (!track || !ring) return;

    var lineCount = 80;
    for (var i = 0; i < lineCount; i += 1) {
      var line = document.createElement('div');
      line.className = 'bcn-focus-line';
      if (i % 5 === 0) line.classList.add('major');
      track.appendChild(line);
    }

    var markerCenter = 175; /* half of #bcn-scroll-focus-ring height (350px) */
    var sectionSelectors = [
      '#hero',
      '#bcn-iris-slider',
      '#bcn-about',
      '.bcn-panel',
      '#contact',
      '.bcn-partners',
      '#bcn-cta',
      '.bcn-footer'
    ];

    var segments = [];
    var targetY = markerCenter;
    var currentY = markerCenter;
    var rafId = null;

    function readPageY(el) {
      var rect = el.getBoundingClientRect();
      return rect.top + window.scrollY;
    }

    function buildSegments() {
      segments = [];
      sectionSelectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
          var start = readPageY(el);
          var isStickyTravel = (
            el.id === 'hero' ||
            el.id === 'bcn-about' ||
            el.classList.contains('bcn-panel')
          );
          var span = isStickyTravel
            ? Math.max(1, el.offsetHeight - window.innerHeight)
            : Math.max(1, el.offsetHeight);

          segments.push({ start: start, end: start + span, span: span });
        });
      });
      segments.sort(function (a, b) { return a.start - b.start; });
    }

    function getMechanicalProgress() {
      if (!segments.length) return 0;
      var y = window.scrollY;
      var totalSpan = 0;
      var passed = 0;
      segments.forEach(function (seg) { totalSpan += seg.span; });
      if (totalSpan <= 0) return 0;

      for (var i = 0; i < segments.length; i += 1) {
        var seg = segments[i];
        if (y >= seg.end) {
          passed += seg.span;
        } else if (y > seg.start) {
          passed += (y - seg.start);
          break;
        } else {
          break;
        }
      }
      return Math.max(0, Math.min(1, passed / totalSpan));
    }

    function highlightLinesNearMarker() {
      var lines = track.querySelectorAll('.bcn-focus-line');
      var containerTop = ring.getBoundingClientRect().top;

      lines.forEach(function (ln) {
        var lineRect = ln.getBoundingClientRect();
        var relativeLinePos = (lineRect.top + lineRect.height / 2) - containerTop;
        var distanceToCenter = Math.abs(relativeLinePos - markerCenter);

        if (distanceToCenter < 15) {
          ln.style.opacity = '1';
          ln.style.width = ln.classList.contains('major') ? '32px' : '20px';
        } else {
          ln.style.opacity = '0.3';
          ln.style.width = ln.classList.contains('major') ? '22px' : '12px';
        }
      });
    }

    function updateTargetFromScroll() {
      var progress = getMechanicalProgress();
      var trackHeight = track.offsetHeight;
      var maxTravel = Math.max(0, trackHeight - markerCenter);
      targetY = markerCenter - (progress * maxTravel);
      if (!rafId) rafId = requestAnimationFrame(animateTrack);
    }

    function animateTrack() {
      currentY += (targetY - currentY) * 0.18;
      track.style.transform = 'translateY(' + currentY.toFixed(2) + 'px)';
      highlightLinesNearMarker();

      if (Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(animateTrack);
      } else {
        currentY = targetY;
        track.style.transform = 'translateY(' + currentY.toFixed(2) + 'px)';
        highlightLinesNearMarker();
        rafId = null;
      }
    }

    buildSegments();
    updateTargetFromScroll();

    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    window.addEventListener('resize', function () {
      buildSegments();
      updateTargetFromScroll();
    }, { passive: true });
    window.addEventListener('load', function () {
      buildSegments();
      updateTargetFromScroll();
    });
  }

  // Initialise effects on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initIrisSlider();
    initCTA();
    initFocusRing();
  });

  /* ── 16. LENS — ykproduce.co.jp style ──────────────────────── */
  /*
    A large white circle with mix-blend-mode: difference follows the
    mouse with a slow lag. Over dark backgrounds it appears as a white
    circle; over light text/content it inverts the colours beneath it.
    This creates the distinctive lens effect seen on ykproduce.co.jp.
  */
  if (canUseCustomCursor) {
    var lensHome   = document.getElementById('bcn-lens-home');
    var lensHomeX  = -300;
    var lensHomeY  = -300;
    var lensTargX  = -300;
    var lensTargY  = -300;
    var lensReady  = false;

    document.addEventListener('mousemove', function (e) {
      lensTargX = e.clientX;
      lensTargY = e.clientY;
      if (!lensReady) {
        lensReady = true;
        document.body.classList.add('bcn-lens-ready');
      }
    });

    function animateLensHome() {
      // Gentle lag (0.09) — dreamy, not jittery
      lensHomeX += (lensTargX - lensHomeX) * 0.09;
      lensHomeY += (lensTargY - lensHomeY) * 0.09;
      if (lensHome) {
        lensHome.style.left = lensHomeX + 'px';
        lensHome.style.top  = lensHomeY + 'px';
      }
      requestAnimationFrame(animateLensHome);
    }
    animateLensHome();
  }

})();
