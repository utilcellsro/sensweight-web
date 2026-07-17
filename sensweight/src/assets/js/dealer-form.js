document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('dealer-form');
  if (!form) return;

  var LABELS = {
    name: 'Name', company: 'Company', email: 'Email', phone: 'Phone',
    country: 'Country / Region', interest: 'Product interest', message: 'Message',
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var lines = Object.keys(LABELS)
      .map(function (key) { return [LABELS[key], (data.get(key) || '').toString().trim()]; })
      .filter(function (pair) { return pair[1]; })
      .map(function (pair) { return pair[0] + ': ' + pair[1]; });

    var subject = encodeURIComponent('UCS Dealer Request — ' + (data.get('company') || data.get('name') || ''));
    var body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:sales@unifiedcloudsensors.com?subject=' + subject + '&body=' + body;
  });
});
