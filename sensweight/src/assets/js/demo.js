(function () {
  const KEY = document.body.dataset.demoKey;
  const CFG = window.DEMO_CONFIGS && window.DEMO_CONFIGS[KEY];
  if (!CFG) return;

  const mixed = Array.isArray(CFG.units);

  function jitterAt(i)   { return mixed ? CFG.jitter[i]   : CFG.jitter; }
  function decimalsAt(i) { return mixed ? CFG.decimals[i] : CFG.decimals; }
  function unitAt(i)     { return mixed ? CFG.units[i]    : CFG.unit; }

  function getReadings() {
    return CFG.base.map((base, i) => {
      const j = jitterAt(i);
      return +(base + (Math.random() - 0.5) * 2 * j).toFixed(decimalsAt(i));
    });
  }

  function normalize(readings) {
    if (!CFG.normalize) return readings;
    return readings.map((val, i) => {
      const lo = CFG.comfortMin[i], hi = CFG.comfortMax[i];
      return Math.max(0, Math.min(100, ((val - lo) / (hi - lo)) * 100));
    });
  }

  function renderTable(readings) {
    const tbody = document.getElementById('sensor-tbody');
    if (!tbody) return;
    tbody.innerHTML = readings.map((val, i) => {
      const j = jitterAt(i);
      const d = decimalsAt(i);
      const u = unitAt(i);
      const lo = +(val - j * 2.5 - Math.random() * j).toFixed(d);
      const hi = +(val + j * 2.2 + Math.random() * j).toFixed(d);
      const suffix = u ? ' ' + u : '';
      return `<tr>
        <td>${CFG.sensors[i]}</td>
        <td class="cur-val">${val}${suffix}</td>
        <td>${lo}${suffix}</td>
        <td>${hi}${suffix}</td>
        <td><span class="s-ok">OK</span></td>
      </tr>`;
    }).join('');
  }

  function updateSummary(readings) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const mode = CFG.summaryMode || 'sum';

    if (mode === 'atmo') {
      const co2Index = CFG.sensors.indexOf('CO2');
      const norm = normalize(readings);
      const avg = norm.reduce((a, b) => a + b, 0) / norm.length;
      const dev = Math.max(...norm) - Math.min(...norm);
      set('total-load', readings[co2Index] + ' ' + CFG.units[co2Index]);
      set('avg-load', avg.toFixed(0) + '%');
      set('max-dev', dev.toFixed(0) + '%');
    } else if (mode === 'geo') {
      const maxAbs = readings.reduce((a, b) => Math.abs(b) > Math.abs(a) ? b : a, 0);
      const avg = readings.reduce((a, b) => a + b, 0) / readings.length;
      const dev = Math.max(...readings) - Math.min(...readings);
      set('total-load', (maxAbs > 0 ? '+' : '') + maxAbs.toFixed(1) + '°');
      set('avg-load', avg.toFixed(1) + '°');
      set('max-dev', dev.toFixed(1) + '°');
    } else {
      const total = readings.reduce((a, b) => a + b, 0);
      const avg = total / readings.length;
      const lo = Math.min(...readings), hi = Math.max(...readings);
      const dev = CFG.devMode === 'absolute'
        ? (hi - lo).toFixed(CFG.decimals) + (CFG.unit || '')
        : (avg ? (((hi - lo) / avg) * 100).toFixed(1) + '%' : '0%');
      const suffix = CFG.unit ? ' ' + CFG.unit : '';
      set('total-load', total.toFixed(CFG.decimals) + suffix);
      set('avg-load', avg.toFixed(CFG.decimals) + suffix);
      set('max-dev', dev);
    }
    set('update-time', new Date().toLocaleTimeString());
  }

  let chart;

  function initChart(readings) {
    const canvas = document.getElementById('radar-chart');
    if (!canvas) return;
    chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: CFG.sensors,
        datasets: [{
          data: normalize(readings),
          backgroundColor: CFG.color + '24',
          borderColor: CFG.color,
          borderWidth: 2.5,
          pointBackgroundColor: CFG.pointColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => mixed
                ? ` ${ctx.raw.toFixed(0)}% comfort`
                : ` ${ctx.raw}${CFG.unit ? ' ' + CFG.unit : ''}`,
            },
          },
        },
        scales: {
          r: {
            min: CFG.axisMin, max: CFG.axisMax,
            ticks: {
              stepSize: CFG.axisStep,
              font: { family: "'IBM Plex Mono','Cascadia Code',monospace", size: 10 },
              color: '#6F6F6E',
              backdropColor: 'transparent',
            },
            grid:        { color: 'rgba(47,47,46,.07)' },
            angleLines:  { color: 'rgba(47,47,46,.07)' },
            pointLabels: {
              font: { family: "'Chakra Petch',sans-serif", size: 11, weight: '700' },
              color: '#2F2F2E',
            },
          },
        },
      },
    });
  }

  function updateChart(readings) {
    if (!chart) return;
    chart.data.datasets[0].data = normalize(readings);
    chart.update('none');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const r = getReadings();
    renderTable(r);
    updateSummary(r);
    initChart(r);

    setInterval(() => {
      const next = getReadings();
      renderTable(next);
      updateSummary(next);
      updateChart(next);
    }, 3000);
  });
})();
