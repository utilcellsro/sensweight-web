/* Click-to-play YouTube: shows the thumbnail, swaps in the iframe only on click (no YouTube load until then). */
(function () {
  if (window.__ucsVideos) return;
  window.__ucsVideos = true;

  function init() {
    document.querySelectorAll('[data-vid]').forEach(function (wrap) {
      var id = wrap.dataset.vid;
      if (!id || id.indexOf('YOUR_') === 0) return;

      var thumb = wrap.querySelector('.vid-thumb');
      if (thumb) {
        // maxresdefault doesn't exist for every video — YouTube then serves a 120px grey stub, so fall back to hqdefault
        var img = new Image();
        img.onload = function () {
          var q = img.naturalWidth > 120 ? 'maxresdefault' : 'hqdefault';
          thumb.style.backgroundImage = 'url(https://img.youtube.com/vi/' + id + '/' + q + '.jpg)';
        };
        img.src = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
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
