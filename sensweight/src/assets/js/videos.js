/* Click-to-play YouTube: shows a locally served poster, swaps in the iframe only on click.
   Nothing reaches a third party until the visitor presses play - the posters used to come
   from img.youtube.com on page load, which sent every visitor's IP to Google. Regenerate
   them with scripts/vendor-video-thumbs.js after changing a video id. */
(function () {
  if (window.__ucsVideos) return;
  window.__ucsVideos = true;

  function init() {
    document.querySelectorAll('[data-vid]').forEach(function (wrap) {
      var id = wrap.dataset.vid;
      if (!id || id.indexOf('YOUR_') === 0) return;

      var thumb = wrap.querySelector('.vid-thumb');
      if (thumb) {
        // Served from this origin. The maxres/hqdefault choice is made once, when
        // the poster is downloaded, so there is no probe request here any more.
        thumb.style.backgroundImage = "url('/assets/images/video-thumbs/" + id + ".jpg')";
      }

      function play() {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:inherit';
        wrap.innerHTML = '';
        wrap.appendChild(iframe);
        wrap.style.cursor = 'default';
        wrap.removeEventListener('click', play);
        wrap.removeEventListener('keydown', onKey);
      }
      function onKey(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }
      wrap.addEventListener('click', play);
      wrap.addEventListener('keydown', onKey);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
