/**
 * layout.js — shared nav + footer
 * To update nav for all pages, edit the NAV string below.
 * To add a page to the nav, add a line in the nav-links div.
 */

const NAV_HTML = `
<nav>
  <div class="wrap nav-in">
    <a class="logo" href="index.html">
      <div class="logo-mark">UCS</div>
      <div class="logo-name">Unified Cloud Sensors</div>
    </a>
    <div class="nav-links">
      <a class="nl" href="index.html#produkty">Produkty</a>
      <a class="nl" href="index.html#reseni">Řešení</a>
      <a class="nl" href="index.html#roi">Návratnost</a>
      <a class="nl" href="index.html#video">Video</a>
      <a class="nl" href="index.html#demo">Demo</a>
      <a class="nl" href="index.html#akce">Akce</a>
      <a class="nl" href="#">Kontakt</a>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <p>Unified Cloud Sensors, s.r.o. · Ostrovačice, Česká republika · © 2025</p>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', function () {
  // Inject nav
  const navMount = document.getElementById('site-nav');
  if (navMount) navMount.outerHTML = NAV_HTML;

  // Inject footer
  const footerMount = document.getElementById('site-footer');
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;

  // Activate promo bar close button
  const closeBtn = document.getElementById('promo-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      const bar = document.getElementById('promo-bar');
      if (bar) bar.style.display = 'none';
    });
  }

  // YouTube video embed: replace placeholders with iframes
  document.querySelectorAll('.vid-wrap[data-video-id]').forEach(function (el) {
    const id = el.dataset.videoId;
    if (id && id !== 'YOUR_VIDEO_ID') {
      el.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${id}?rel=0&modestbranding=1"
        title="UCS video" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    }
  });
});
