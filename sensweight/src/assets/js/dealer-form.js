document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('dealer-form');
  if (!form) return;

  var FIELDS = ['name', 'company', 'email', 'phone', 'country', 'interest', 'message'];
  var statusEl = form.querySelector('.dealer-form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle('is-error', !!isError);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var payload = {};
    FIELDS.forEach(function (key) { payload[key] = (data.get(key) || '').toString().trim(); });

    if (submitBtn) submitBtn.disabled = true;
    setStatus('Sending…', false);

    fetch('/api/dealer-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
      .then(function (result) {
        if (!result.ok) throw new Error(result.body && result.body.error || 'Request failed');
        setStatus("Thanks — we've received your request and will be in touch shortly.", false);
        form.reset();
      })
      .catch(function () {
        setStatus('Something went wrong sending your request — please email sales@unifiedcloudsensors.com directly.', true);
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});
