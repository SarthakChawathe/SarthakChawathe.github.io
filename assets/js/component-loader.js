(async function loadPageComponents() {
  'use strict';

  const components = [...document.querySelectorAll('[data-include]')];
  await Promise.all(components.map(async (component) => {
    const response = await fetch(component.dataset.include);
    if (!response.ok) {
      throw new Error(`Could not load ${component.dataset.include}: ${response.status}`);
    }
    component.outerHTML = await response.text();
  }));

  const scripts = [
    'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    'assets/vendor/php-email-form/validate.js',
    'assets/vendor/aos/aos.js',
    'assets/vendor/typed.js/typed.umd.js',
    'assets/vendor/purecounter/purecounter_vanilla.js',
    'assets/vendor/waypoints/noframework.waypoints.js',
    'assets/vendor/glightbox/js/glightbox.min.js',
    'assets/vendor/imagesloaded/imagesloaded.pkgd.min.js',
    'assets/vendor/isotope-layout/isotope.pkgd.min.js',
    'assets/vendor/swiper/swiper-bundle.min.js',
    'assets/js/main.js'
  ];

  for (const source of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = source;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Could not load ${source}`));
      document.body.appendChild(script);
    });
  }

  if (document.readyState === 'complete') {
    window.dispatchEvent(new Event('load'));
  }
})().catch((error) => {
  console.error('Page component loading failed:', error);
});
