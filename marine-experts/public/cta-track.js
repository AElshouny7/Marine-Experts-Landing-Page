(function () {
  function handler(e) {
    var el = e.currentTarget;
    var label = el.getAttribute('data-label') || 'CTA';
    var variant = el.getAttribute('data-variant') || 'heroA';
    if (window.plausible) {
      window.plausible('CTA Click', { props: { label: label, variant: variant } });
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-track="cta"]').forEach(function (el) {
      el.addEventListener('click', handler);
    });
  });
})();
