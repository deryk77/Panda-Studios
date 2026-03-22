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
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = 'scale(1) translateY(' + (scrollY * 0.3) + 'px)';
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
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
