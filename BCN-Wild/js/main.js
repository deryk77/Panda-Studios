(function () {
  'use strict';

  /* ============================================================
     BCN-Wild — Main JS
     Z-Axis Zoom Engine · Custom Cursor · Nav · Menu · Form
     ============================================================ */

  var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

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
      // Content fades out over the first 40% of hero scroll travel
      var fade = heroProgress < 0.4 ? (1 - heroProgress / 0.4) : 0;
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

  /* ── 11. REVEAL — cream page, small image zooms to fullscreen ─ */
  (function () {
    var revealSection = document.getElementById('bcn-reveal');
    var revealImg     = document.getElementById('bcn-reveal-img');
    var revealGhost   = document.getElementById('bcn-reveal-ghost');
    if (!revealSection || !revealImg) return;

    function getRevealScale() {
      var imgW = 0.36 * window.innerWidth;
      var imgH = 0.22 * window.innerWidth;
      return Math.max(window.innerWidth / imgW, window.innerHeight / imgH);
    }

    function updateReveal() {
      var rect       = revealSection.getBoundingClientRect();
      var scrollable = revealSection.offsetHeight - window.innerHeight;
      var panelTop   = window.scrollY + rect.top;
      var p          = Math.max(0, Math.min(1, (window.scrollY - panelTop) / scrollable));

      var ts     = getRevealScale();
      var scale  = 1 + p * (ts - 1);
      var radius = 6 * (1 - p);

      revealImg.style.transform    = 'translate(-50%, -50%) scale(' + scale + ')';
      revealImg.style.borderRadius = radius + 'px';
      revealImg.style.boxShadow    = 'none'; // remove box-shadow once zooming begins

      if (revealGhost) {
        // Ghost text fades out quickly as image starts zooming
        revealGhost.style.opacity = Math.max(0, 1 - p * 4).toFixed(3);
      }
    }

    window.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('resize', updateReveal, { passive: true });
    updateReveal();
  }());

  /* ── 12. STRIP — 5 images pan right → left ──────────────────── */
  (function () {
    var stripSection = document.getElementById('bcn-strip-section');
    var strip        = document.getElementById('bcn-strip');
    if (!stripSection || !strip) return;

    function updateStrip() {
      var rect       = stripSection.getBoundingClientRect();
      var scrollable = stripSection.offsetHeight - window.innerHeight;
      var panelTop   = window.scrollY + rect.top;
      var p          = Math.max(0, Math.min(1, (window.scrollY - panelTop) / scrollable));

      var stripW  = strip.offsetWidth;
      var vw      = window.innerWidth;
      // Strip starts fully off-screen right; ends when last image fills viewport right
      var startX  = vw;
      var endX    = -(stripW - vw);
      var tx      = startX + p * (endX - startX);

      strip.style.transform = 'translateX(' + tx + 'px)';
    }

    window.addEventListener('scroll', updateStrip, { passive: true });
    window.addEventListener('resize', updateStrip, { passive: true });
    updateStrip();
  }());

  /* ── 13. ABOUT — clip-path wipe from bottom ─────────────────── */
  (function () {
    var aboutSection = document.getElementById('bcn-about');
    var aboutWipe    = document.getElementById('bcn-about-wipe');
    if (!aboutSection || !aboutWipe) return;

    function updateAbout() {
      var rect       = aboutSection.getBoundingClientRect();
      var scrollable = aboutSection.offsetHeight - window.innerHeight;
      var panelTop   = window.scrollY + rect.top;
      var p          = Math.max(0, Math.min(1, (window.scrollY - panelTop) / scrollable));

      // inset(T 0 0 0): as T goes 100%→0%, bottom of element appears first → wipe from below
      var topInset = ((1 - p) * 100).toFixed(2);
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

  /* ── 11. LENS — ykproduce.co.jp style ──────────────────────── */
  /*
    A large white circle with mix-blend-mode: difference follows the
    mouse with a slow lag. Over dark backgrounds it appears as a white
    circle; over light text/content it inverts the colours beneath it.
    This creates the distinctive lens effect seen on ykproduce.co.jp.
  */
  if (!isTouchDevice) {
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
