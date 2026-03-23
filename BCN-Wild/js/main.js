(function () {
  'use strict';

  /* ============================================================
     BCN-Wild — Main JS
     Z-Axis Zoom Engine · Custom Cursor · Nav · Menu · Form
     ============================================================ */

  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  /* ── 1. PAGE LOAD — Hero Ken Burns ─────────────────────────── */
  window.addEventListener('load', function () {
    var heroBg = document.getElementById('bcn-hero-bg');
    if (heroBg) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          heroBg.classList.add('loaded');
        });
      });
    }
    // Fade in scroll cue after delay
    var cue = document.getElementById('bcn-scroll-cue');
    if (cue) {
      setTimeout(function () {
        cue.style.opacity = '1';
        cue.style.transition = 'opacity 1s ease';
      }, 1800);
    }
  });

  /* ── 2. CUSTOM CURSOR ───────────────────────────────────────── */
  if (!isTouchDevice) {
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
    var hoverEls = document.querySelectorAll('a, button, select, input, textarea, .bcn-panel');
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

  /* ── 5. HERO PARALLAX (desktop only) ───────────────────────── */
  if (!isTouchDevice) {
    var heroBg = document.getElementById('bcn-hero-bg');
    window.addEventListener('scroll', function () {
      if (!heroBg) return;
      var scrollY = window.scrollY;
      // On desktop the intro spacer pushes the hero down 1800px
      var introOffset = (window.innerWidth > 768) ? 1800 : 0;
      var relScroll = scrollY - introOffset;
      if (relScroll >= 0 && relScroll < window.innerHeight) {
        heroBg.style.transform = 'scale(1) translateY(' + (relScroll * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  /* ── 6. ENDLESS ZOOM ENGINE ─────────────────────────────────── */
  /*
    Each .bcn-panel is height: 220vh
    The inner .bcn-panel-sticky is position: sticky, height: 100vh
    As we scroll through the panel's "extra" 120vh of travel,
    the image scales from 1.0 → 1.22 (Z-axis zoom)
    This creates the endless flying-through effect
  */
  var panels = document.querySelectorAll('.bcn-panel');
  var vh = window.innerHeight;

  function updateZoom() {
    var scrollY = window.scrollY;
    vh = window.innerHeight;

    panels.forEach(function (panel) {
      var img = panel.querySelector('.bcn-panel-img');
      if (!img) return;

      var rect      = panel.getBoundingClientRect();
      var panelH    = panel.offsetHeight;
      var stickyH   = vh;
      var scrollable = panelH - stickyH; // = 120vh

      // progress: 0 at panel entry, 1 at panel exit
      var panelTop  = scrollY + rect.top;
      var progress  = (scrollY - panelTop) / scrollable;
      var clamped   = Math.max(0, Math.min(1, progress));

      // Scale: 1.0 → 1.22 as we scroll through
      var scale = 1 + (clamped * 0.22);
      img.style.transform = 'scale(' + scale + ')';

      // Meta text: fade in after 20% progress, fade out after 80%
      var meta = panel.querySelector('.bcn-panel-meta');
      if (meta) {
        var metaOpacity;
        if (clamped < 0.15) {
          metaOpacity = clamped / 0.15;
        } else if (clamped > 0.8) {
          metaOpacity = 1 - ((clamped - 0.8) / 0.2);
        } else {
          metaOpacity = 1;
        }
        meta.style.opacity = Math.max(0, Math.min(1, metaOpacity));
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

  /* ── 10. SMOOTH ANCHOR SCROLL ───────────────────────────────── */
  // NOTE: anchor scroll-into-view must account for the 1800px spacer on desktop.
  // The existing smooth-scroll handler uses scrollIntoView which handles this natively.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── 11. CINEMATIC INTRO SEQUENCE (desktop only) ──────────── */
  (function () {
    if (window.innerWidth <= 768) return;

    var introEl = document.getElementById('bcn-intro');
    var zoomImg = document.getElementById('bcn-intro-zoom-img');
    var strip   = document.getElementById('bcn-intro-strip');

    if (!introEl || !zoomImg || !strip) return;

    var PHASE1_END = 300;
    var PHASE2_END = 1800;
    var introDone  = false;

    // The scale that makes the 38vw×22vw thumbnail cover 100vw×100vh
    function getTargetScale() {
      var imgW = 0.38 * window.innerWidth;
      var imgH = 0.22 * window.innerWidth;
      return Math.max(window.innerWidth / imgW, window.innerHeight / imgH);
    }

    function updateIntro() {
      if (introDone) return;

      var scrollY = window.scrollY;

      if (scrollY > PHASE2_END) {
        // Phase complete — fade whole intro out
        introDone = true;
        introEl.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        introEl.style.opacity    = '0';
        introEl.style.pointerEvents = 'none';
        return;
      }

      introEl.style.opacity    = '1';
      introEl.style.transition = 'none';
      introEl.style.pointerEvents = 'none';

      if (scrollY <= PHASE1_END) {
        // ── Phase 1: thumbnail zooms to fullscreen ──
        var p1 = scrollY / PHASE1_END;
        var targetScale = getTargetScale();
        var scale  = 1 + p1 * (targetScale - 1);
        var radius = 12 * (1 - p1);

        zoomImg.style.transform    = 'translate(-50%, -50%) scale(' + scale + ')';
        zoomImg.style.borderRadius = radius + 'px';
        zoomImg.style.opacity      = '1';

        strip.style.transform = 'translateX(' + window.innerWidth + 'px)';
        strip.style.opacity   = '0';

      } else {
        // ── Phase 2: horizontal strip pans right → left ──
        var p2 = (scrollY - PHASE1_END) / (PHASE2_END - PHASE1_END);
        var ts = getTargetScale();

        // Zoom image stays fullscreen and fades out over the first 30% of phase 2
        zoomImg.style.transform    = 'translate(-50%, -50%) scale(' + ts + ')';
        zoomImg.style.borderRadius = '0px';
        zoomImg.style.opacity      = p2 < 0.3 ? String(1 - p2 / 0.3) : '0';

        // Strip: starts fully off-screen right, pans until last image's right edge hits x=0
        var stripW  = strip.offsetWidth;
        var startX  = window.innerWidth;
        var endX    = -stripW;
        var tx      = startX + p2 * (endX - startX);

        strip.style.transform = 'translateX(' + tx + 'px)';
        strip.style.opacity   = '1';
      }
    }

    window.addEventListener('scroll', updateIntro, { passive: true });
    updateIntro(); // initialise on load
  }());

})();
