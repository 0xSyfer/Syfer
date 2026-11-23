// syfer.fun/ai — animations for the "Learn AI" page.
// Loaded in <head> (not deferred) so the reveal class is set before first paint.
(function () {
  var root = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (!reduce && 'IntersectionObserver' in window) root.classList.add('rv');

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  // Fade/slide sections in as they scroll into view, staggered among siblings.
  function reveal() {
    if (!root.classList.contains('rv')) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    els.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
      el.style.setProperty('--d', (sibs.indexOf(el) * 90) + 'ms');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Rotate the hero's second line: "Start using it." -> "Start building." -> ...
  function typewriter() {
    var el = document.querySelector('[data-words]');
    if (!el || reduce) return;
    var words = el.getAttribute('data-words').split('|');
    var i = 0, text = words[0], deleting = false;
    function tick() {
      var target = words[i];
      if (!deleting) {
        if (text.length < target.length) {
          text = target.slice(0, text.length + 1);
          el.textContent = text;
          return setTimeout(tick, 65);
        }
        deleting = true;
        return setTimeout(tick, 2400);
      }
      var next = words[(i + 1) % words.length];
      var keep = 0;
      while (keep < text.length && text[keep] === next[keep]) keep++;
      if (text.length > keep) {
        text = text.slice(0, -1);
        el.textContent = text;
        return setTimeout(tick, 32);
      }
      deleting = false;
      i = (i + 1) % words.length;
      return setTimeout(tick, 200);
    }
    setTimeout(tick, 2600);
  }

  // Soft light that follows the cursor on cards.
  function spotlight() {
    Array.prototype.forEach.call(document.querySelectorAll('.spot'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // The 3D e-book leans toward the cursor (mouse/trackpad only).
  function tilt() {
    var book = document.querySelector('.book-3d');
    var hero = document.querySelector('.ai-hero');
    if (!book || !hero || reduce || !window.matchMedia('(hover: hover)').matches) return;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      book.style.setProperty('--ry', (-26 + x * 30).toFixed(1) + 'deg');
      book.style.setProperty('--rx', (7 - y * 16).toFixed(1) + 'deg');
    });
    hero.addEventListener('pointerleave', function () {
      book.style.removeProperty('--ry');
      book.style.removeProperty('--rx');
    });
  }

  // Mobile sticky "Get access" bar: shown once the hero button scrolls away, hidden at the final CTA.
  function dock() {
    var bar = document.getElementById('dock');
    var heroCta = document.getElementById('hero-cta');
    var join = document.getElementById('join');
    if (!bar || !heroCta || !join || !('IntersectionObserver' in window)) return;
    var heroVisible = true, joinVisible = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.target === heroCta) heroVisible = e.isIntersecting || e.boundingClientRect.top > 0;
        else joinVisible = e.isIntersecting;
      });
      bar.classList.toggle('show', !heroVisible && !joinVisible);
    });
    io.observe(heroCta);
    io.observe(join);
  }

  onReady(function () {
    reveal();
    typewriter();
    spotlight();
    tilt();
    dock();
  });
})();
