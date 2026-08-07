/**
 * Teampass.net — site behaviour.
 *
 * Vanilla JS, no dependency. Replaces the jQuery + Owl Carousel + scrollax
 * bundle the previous template loaded on every page.
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
   * Mobile navigation
   * ------------------------------------------------------------------ */
  var nav = document.getElementById('site-nav');
  var toggle = nav && nav.querySelector('.tp-nav__toggle');

  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu when a link inside it is followed
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
   * Dropdowns: open on Enter/Space so they are reachable without a mouse.
   * Hover and focus-within are handled in CSS.
   * ------------------------------------------------------------------ */
  Array.prototype.forEach.call(
    document.querySelectorAll('.tp-nav__link[role="button"]'),
    function (trigger) {
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          var firstLink = trigger.parentNode.querySelector('.tp-nav__dropdown a');
          if (firstLink) { firstLink.focus(); }
        }
      });
    }
  );

  /* ---------------------------------------------------------------------
   * Back-to-top button
   * ------------------------------------------------------------------ */
  var toTop = document.querySelector('.tp-to-top');

  if (toTop) {
    var updateToTop = function () {
      toTop.classList.toggle('is-visible', window.scrollY > 600);
    };

    updateToTop();
    window.addEventListener('scroll', updateToTop, { passive: true });
  }

  /* ---------------------------------------------------------------------
   * Cookie consent banner
   *
   * The banner only exists when an analytics tag is configured, and
   * window.tpConsent is defined by _includes/analytics.html. Both are
   * optional, so everything here is guarded.
   * ------------------------------------------------------------------ */
  var consent = document.getElementById('tp-consent');

  if (consent && window.tpConsent) {
    var lastFocus = null;

    var openConsent = function (trigger) {
      lastFocus = trigger || null;
      consent.hidden = false;
      // Let the element paint before the transition starts.
      requestAnimationFrame(function () { consent.classList.add('is-open'); });

      // Only move focus when the banner was asked for. Focusing it on page
      // load would scroll a first-time visitor straight to the bottom.
      if (trigger) {
        var first = consent.querySelector('[data-tp-consent]');
        if (first) { first.focus(); }
      }
    };

    var closeConsent = function () {
      consent.classList.remove('is-open');
      window.setTimeout(function () { consent.hidden = true; }, 300);
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };

    consent.addEventListener('click', function (event) {
      var button = event.target.closest('[data-tp-consent]');
      if (!button) { return; }

      if (button.getAttribute('data-tp-consent') === 'accept') {
        window.tpConsent.accept();
      } else {
        window.tpConsent.decline();
      }

      closeConsent();
    });

    // Escape declines: dismissing a consent prompt is never an opt-in.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && consent.classList.contains('is-open')) {
        window.tpConsent.decline();
        closeConsent();
      }
    });

    // Footer entry point, so a choice can be changed at any time.
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-tp-consent-reopen]'),
      function (trigger) {
        trigger.addEventListener('click', function () {
          if (consent.classList.contains('is-open')) {
            closeConsent();
          } else {
            openConsent(trigger);
          }
        });
      }
    );

    if (!window.tpConsent.state()) { openConsent(); }
  }
})();
