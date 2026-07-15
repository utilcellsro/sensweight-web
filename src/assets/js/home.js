(function () {

  /* ── ROI CALCULATOR ───────────────────────────────────────── */
  var grid = document.querySelector('.roi-grid');
  if (grid) {
    var locale       = grid.dataset.locale       || 'en-US';
    var currency     = grid.dataset.currency     || 'EUR';
    var paybackUnit  = grid.dataset.paybackUnit  || 'mo.';

    function fmt(n) {
      return new Intl.NumberFormat(locale, {
        style: 'currency', currency: currency, maximumFractionDigits: 0
      }).format(n);
    }

    function val(id) { return parseFloat(document.getElementById(id).value) || 0; }

    function calc() {
      var fte       = val('r-fte');
      var wage      = val('r-wage');
      var failures  = val('r-failures');
      var downH     = val('r-down-h');
      var downCost  = val('r-down-cost');
      var sysCost   = val('r-syscost');

      var labourSaving   = fte * 2080 * wage * 0.40;
      var downtimeSaving = failures * downH * downCost * 0.55;
      var totalSaving    = labourSaving + downtimeSaving;
      var paybackMonths  = totalSaving > 0 ? (sysCost / (totalSaving / 12)) : 0;
      var roi1y          = sysCost > 0 ? ((totalSaving - sysCost) / sysCost * 100) : 0;

      function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
      set('res-labour',   fmt(labourSaving));
      set('res-downtime', fmt(downtimeSaving));
      set('res-total',    fmt(totalSaving));
      set('res-payback',  paybackMonths > 0 ? paybackMonths.toFixed(1) + ' ' + paybackUnit : '—');
      set('res-roi',      roi1y.toFixed(0) + ' %');

      var pb = document.getElementById('res-payback');
      if (pb) pb.style.color = (paybackMonths > 0 && paybackMonths <= 18) ? 'var(--teal)' : '';
    }

    document.querySelectorAll('.roi-input').forEach(function (el) {
      el.addEventListener('input', calc);
    });
    calc();
  }

  /* ── VIDEO LAZY LOADER ────────────────────────────────────── */
  document.querySelectorAll('[data-vid]').forEach(function (wrap) {
    var id = wrap.dataset.vid;
    if (!id || id.indexOf('YOUR_') === 0) return;

    var thumb = wrap.querySelector('.vid-thumb');
    if (thumb) {
      thumb.style.backgroundImage =
        'url(https://img.youtube.com/vi/' + id + '/maxresdefault.jpg)';
    }

    wrap.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:inherit';
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.style.cursor = 'default';
    });
  });

})();
