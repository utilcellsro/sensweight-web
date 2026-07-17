(function () {

  /* ── ROI CALCULATOR ───────────────────────────────────────── */
  var grid = document.querySelector('.roi-grid');
  if (grid) {
    var locale       = grid.dataset.locale       || 'en-US';
    var currency     = grid.dataset.currency     || 'EUR';
    var paybackUnit  = grid.dataset.paybackUnit  || 'mo.';

    // Per-category savings rates — from the "Truck Scale Digitization" reference quote
    // (roi_calculation.jpg): each category is a fixed €-rate multiplied by the visitor's
    // own quantity. The quote's two identical "Downtime" line items were merged into one.
    var RATE_CATEGORIES = ['downtime', 'efficiency', 'weighing_errors', 'fraud', 'calibration', 'structural', 'audit', 'multisite'];
    var rates = {};
    RATE_CATEGORIES.forEach(function (key) {
      rates[key] = parseFloat(grid.dataset['rate' + key.charAt(0).toUpperCase() + key.slice(1)]) || 0;
    });

    function fmt(n) {
      return new Intl.NumberFormat(locale, {
        style: 'currency', currency: currency, maximumFractionDigits: 0
      }).format(n);
    }

    function val(id) { return parseFloat(document.getElementById(id).value) || 0; }

    function calc() {
      var totalSaving = 0;
      RATE_CATEGORIES.forEach(function (key) {
        totalSaving += val('r-' + key) * rates[key];
      });
      var sysCost       = val('r-syscost');
      var netBenefit    = totalSaving - sysCost;
      var paybackMonths = totalSaving > 0 ? (sysCost / (totalSaving / 12)) : 0;
      var roi1y         = sysCost > 0 ? (netBenefit / sysCost * 100) : 0;

      function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
      set('res-total',      fmt(totalSaving));
      set('res-investment', fmt(sysCost));
      set('res-net',        fmt(netBenefit));
      set('res-payback',    paybackMonths > 0 ? paybackMonths.toFixed(1) + ' ' + paybackUnit : '—');
      set('res-roi',        roi1y.toFixed(0) + ' %');

      var net = document.getElementById('res-net');
      if (net) net.style.color = netBenefit > 0 ? 'var(--ok)' : '';
      var pb = document.getElementById('res-payback');
      if (pb) pb.style.color = (paybackMonths > 0 && paybackMonths <= 18) ? 'var(--ok)' : '';
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
