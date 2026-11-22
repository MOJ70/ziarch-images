(function () {
  // mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    var open = function (on) {
      menu.classList.toggle('open', on);
      document.body.classList.toggle('menu-open', on);
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    };
    burger.addEventListener('click', function () { open(!menu.classList.contains('open')); });
    menu.querySelectorAll('.close').forEach(function (b) { b.addEventListener('click', function () { open(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });
  }

  // lightbox for artworks / photography
  var box = document.getElementById('lightbox');
  if (box) {
    var items = Array.prototype.slice.call(document.querySelectorAll('.masonry .item'));
    var img = box.querySelector('img');
    var cap = box.querySelector('.cap');
    var meta = box.querySelector('.meta-line');
    var at = -1;
    var show = function (i) {
      if (!items.length) return;
      at = (i + items.length) % items.length;
      var it = items[at];
      img.src = it.getAttribute('href');
      img.alt = it.dataset.title || '';
      cap.textContent = it.dataset.title || '';
      meta.textContent = it.dataset.meta || '';
      box.classList.add('open');
      document.body.classList.add('menu-open');
    };
    var hide = function () { box.classList.remove('open'); document.body.classList.remove('menu-open'); img.removeAttribute('src'); };
    items.forEach(function (it, i) { it.addEventListener('click', function (e) { e.preventDefault(); show(i); }); });
    box.querySelector('.close').addEventListener('click', hide);
    box.querySelector('.prev').addEventListener('click', function () { show(at - 1); });
    box.querySelector('.next').addEventListener('click', function () { show(at + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('stage')) hide(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
  }

  // home: keep the header readable over light images by sampling nothing — just a subtle gradient; fade slides in as they arrive
  var slides = document.querySelectorAll('.slide img');
  if (slides.length && 'IntersectionObserver' in window) {
    slides.forEach(function (im) {
      if (!im.complete) { im.style.opacity = '0'; im.style.transition = 'opacity .6s ease'; im.addEventListener('load', function () { im.style.opacity = '1'; }); }
    });
  }
})();
