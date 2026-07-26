(function () {
  var carousel = document.querySelector(".hero-video-carousel");
  if (!carousel) return;
  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".hero-video-slide"));
  if (slides.length < 2) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    slides.forEach(function (slide) {
      var video = slide.querySelector("video");
      if (video) video.pause();
    });
    return;
  }

  var current = 0;
  var firstVideo = slides[current].querySelector("video");
  if (firstVideo) firstVideo.play().catch(function () {});

  setInterval(function () {
    var next = (current + 1) % slides.length;
    slides[current].classList.remove("is-active");
    slides[next].classList.add("is-active");

    var nextVideo = slides[next].querySelector("video");
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(function () {});
    }
    var curVideo = slides[current].querySelector("video");
    if (curVideo) curVideo.pause();

    current = next;
  }, 7000);
})();
