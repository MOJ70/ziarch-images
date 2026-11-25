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

  // lightbox: artworks, photography and project images (always shows the whole image)
  var anchors = Array.prototype.slice.call(document.querySelectorAll('.masonry .item, .album.item'));
  var figImgs = Array.prototype.slice.call(document.querySelectorAll('.figs figure img, figure.hero img'));
  var box = document.getElementById('lightbox');
  if (!box && (anchors.length || figImgs.length)) {
    box = document.createElement('div');
    box.className = 'lightbox'; box.id = 'lightbox';
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML = '<button class="close" type="button">Close</button><div class="stage"><img alt=""></div><div class="bar"><span><b class="cap"></b> <span class="meta-line"></span></span><span class="arrows"><button class="prev" type="button">\u2190 Prev</button><button class="next" type="button">Next \u2192</button></span></div>';
    document.body.appendChild(box);
  }
  if (box) {
    var items = anchors.map(function (a) {
      return { el: a, src: a.getAttribute('href'), title: a.dataset.title || '', meta: a.dataset.meta || '' };
    }).concat(figImgs.map(function (im) {
      var fc = im.closest('figure').querySelector('figcaption');
      var t = fc ? fc.textContent.replace(/^\s*\d+\s*/, '') : (im.alt || '');
      im.classList.add('zoomable');
      return { el: im, src: im.currentSrc || im.getAttribute('src'), title: t, meta: '' };
    }));
    var img = box.querySelector('img');
    var cap = box.querySelector('.cap');
    var meta = box.querySelector('.meta-line');
    var nav = box.querySelector('.arrows');
    var at = -1;
    var show = function (i) {
      if (!items.length) return;
      at = (i + items.length) % items.length;
      var it = items[at];
      img.src = it.src;
      img.alt = it.title;
      cap.textContent = it.title;
      meta.textContent = it.meta;
      nav.style.visibility = items.length > 1 ? 'visible' : 'hidden';
      box.classList.add('open');
      document.body.classList.add('menu-open');
    };
    var hide = function () { box.classList.remove('open'); document.body.classList.remove('menu-open'); img.removeAttribute('src'); };
    items.forEach(function (it, i) { it.el.addEventListener('click', function (e) { e.preventDefault(); show(i); }); });
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
    var sx = null;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50 && items.length > 1) show(at + (dx < 0 ? 1 : -1));
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
