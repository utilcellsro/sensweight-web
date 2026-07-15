/**
 * roi.js — ROI calculator
 *
 * PLACEHOLDER FORMULA — upřesnit po dodání podkladů od zákazníka.
 *
 * Předpoklady:
 *   - UCS eliminuje 40 % manuálního monitoringu
 *   - UCS předejde 55 % neplánovaných poruch
 */

function fmtCZK(n) {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency', currency: 'CZK', maximumFractionDigits: 0
  }).format(n);
}

function calcROI() {
  const fte        = parseFloat(document.getElementById('r-fte').value)        || 0;
  const wage       = parseFloat(document.getElementById('r-wage').value)       || 0;
  const failures   = parseFloat(document.getElementById('r-failures').value)   || 0;
  const downHours  = parseFloat(document.getElementById('r-down-h').value)     || 0;
  const downCost   = parseFloat(document.getElementById('r-down-cost').value)  || 0;
  const sysCost    = parseFloat(document.getElementById('r-syscost').value)    || 0;

  // Annual working hours per FTE (52 weeks × 40 h)
  const annualH = fte * 2080;

  // Savings
  const labourSaving   = annualH * wage * 0.40;
  const downtimeSaving = failures * downHours * downCost * 0.55;
  const totalSaving    = labourSaving + downtimeSaving;

  // Payback in months
  const paybackMonths = totalSaving > 0 ? (sysCost / (totalSaving / 12)) : 0;

  // ROI % after 1 year
  const roi1y = sysCost > 0 ? ((totalSaving - sysCost) / sysCost * 100) : 0;

  // Update DOM
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('res-labour',   fmtCZK(labourSaving));
  set('res-downtime', fmtCZK(downtimeSaving));
  set('res-total',    fmtCZK(totalSaving));
  set('res-payback',  paybackMonths > 0 ? paybackMonths.toFixed(1) + ' měs.' : '—');
  set('res-roi',      roi1y.toFixed(0) + ' %');

  // Colour payback result
  const pb = document.getElementById('res-payback');
  if (pb) pb.style.color = paybackMonths > 0 && paybackMonths <= 18 ? 'var(--teal)' : '#fff';
}

document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('.roi-input');
  inputs.forEach(el => el.addEventListener('input', calcROI));
  calcROI(); // run once on load with default values
});
