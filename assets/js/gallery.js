(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery-photo-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      openLightbox(btn.getAttribute('data-full'), img ? img.alt : '');
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();
