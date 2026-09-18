(function () {
  if (typeof gtag !== 'function') return;

  document.querySelectorAll('.js-apply-cta').forEach(function (link) {
    link.addEventListener('click', function () {
      gtag('event', 'apply_click', {
        cta_position: link.getAttribute('data-cta-position') || 'unknown'
      });
    });
  });
})();
