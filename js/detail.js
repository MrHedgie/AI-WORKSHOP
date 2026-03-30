// js/detail.js — Dev B
// Location Detail view (monthly charts + 10-yr projection) and Comparison view.
// Uses Dev A's calculator interface: roi (decimal), paybackYears, annualRevenue, totalCapex, annualOpex

function initDetail() {
  var locations     = window.AppData.locations;
  var defaultConfig = window.AppData.defaultConfig;
  var calcROI       = window.Calculator.calcROI;
  var projectProfits = window.Calculator.projectProfits;
  var fmtMoney      = window.Calculator.fmtMoney;
  var fmtPct        = window.Calculator.fmtPct;   // decimal → "15.0%"
  var fmtYrs        = window.Calculator.fmtYrs;

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // ── Canvas chart helpers ──────────────────────────────────────────────────

  function drawBarChart(canvasId, labels, values, color) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var W = canvas.offsetWidth || 500;
    var H = 200;
    canvas.width  = W;
    canvas.height = H;

    var pad = { top: 20, right: 16, bottom: 36, left: 52 };
    var chartW = W - pad.left - pad.right;
    var chartH = H - pad.top  - pad.bottom;

    var maxVal = Math.max.apply(null, values) * 1.1;
    var minVal = Math.min.apply(null, values) * 0.9;
    var range  = maxVal - minVal || 1;

    ctx.clearRect(0, 0, W, H);

    // Grid lines + Y labels
    ctx.strokeStyle = '#eee';
    ctx.lineWidth   = 1;
    var gridLines = 4;
    for (var i = 0; i <= gridLines; i++) {
      var val  = minVal + (range / gridLines) * i;
      var yPos = pad.top + chartH - (val - minVal) / range * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, yPos);
      ctx.lineTo(pad.left + chartW, yPos);
      ctx.stroke();
      ctx.fillStyle   = '#888';
      ctx.font        = '10px sans-serif';
      ctx.textAlign   = 'right';
      ctx.fillText(val.toFixed(2), pad.left - 4, yPos + 4);
    }

    // Bars
    var barW = (chartW / labels.length) * 0.65;
    var gap  = (chartW / labels.length) * 0.35;

    for (var j = 0; j < labels.length; j++) {
      var v    = values[j];
      var barH = ((v - minVal) / range) * chartH;
      var x    = pad.left + j * (barW + gap) + gap / 2;
      var y    = pad.top + chartH - barH;

      ctx.fillStyle = color;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
      } else {
        ctx.rect(x, y, barW, barH);
      }
      ctx.fill();

      ctx.fillStyle = '#666';
      ctx.font      = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[j], x + barW / 2, H - pad.bottom + 14);
    }

    ctx.strokeStyle = '#ccc';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.stroke();
  }

  function drawLineChart(canvasId, labels, datasets) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var W = canvas.offsetWidth || 500;
    var H = 200;
    canvas.width  = W;
    canvas.height = H;

    var pad = { top: 20, right: 16, bottom: 36, left: 72 };
    var chartW = W - pad.left - pad.right;
    var chartH = H - pad.top  - pad.bottom;

    var allVals = [];
    datasets.forEach(function (d) { allVals = allVals.concat(d.values); });
    var maxVal = Math.max.apply(null, allVals) * 1.1;
    var minVal = Math.min.apply(null, [0].concat(allVals));
    var range  = maxVal - minVal || 1;

    ctx.clearRect(0, 0, W, H);

    // Grid + Y labels
    var gridLines = 4;
    for (var i = 0; i <= gridLines; i++) {
      var val  = minVal + (range / gridLines) * i;
      var yPos = pad.top + chartH - (val - minVal) / range * chartH;
      ctx.beginPath();
      ctx.strokeStyle = (Math.abs(val) < range * 0.02) ? '#aaa' : '#eee';
      ctx.lineWidth   = 1;
      ctx.moveTo(pad.left, yPos);
      ctx.lineTo(pad.left + chartW, yPos);
      ctx.stroke();
      ctx.fillStyle = '#888';
      ctx.font      = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('$' + (val / 1000).toFixed(0) + 'K', pad.left - 4, yPos + 4);
    }

    // Lines + dots
    datasets.forEach(function (dataset) {
      var vals  = dataset.values;
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth   = 2.5;
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      for (var k = 0; k < labels.length; k++) {
        var px = pad.left + (k / (labels.length - 1)) * chartW;
        var py = pad.top  + chartH - (vals[k] - minVal) / range * chartH;
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.fillStyle = dataset.color;
      for (var m = 0; m < labels.length; m++) {
        var dpx = pad.left + (m / (labels.length - 1)) * chartW;
        var dpy = pad.top  + chartH - (vals[m] - minVal) / range * chartH;
        ctx.beginPath();
        ctx.arc(dpx, dpy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // X labels
    ctx.fillStyle = '#666';
    ctx.font      = '9px sans-serif';
    ctx.textAlign = 'center';
    for (var n = 0; n < labels.length; n++) {
      var lx = pad.left + (n / (labels.length - 1)) * chartW;
      ctx.fillText(labels[n], lx, H - pad.bottom + 14);
    }

    ctx.strokeStyle = '#ccc';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.stroke();
  }

  // ── Detail view ───────────────────────────────────────────────────────────

  function getConfig(loc) {
    return Object.assign({}, defaultConfig, {
      plot_price_usd: window.Calculator.deriveDefaultPlotPrice(loc, defaultConfig)
    });
  }

  function showDetail(locationId) {
    var loc = null;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].id === locationId) { loc = locations[i]; break; }
    }
    if (!loc) return;

    var m = calcROI(loc, getConfig(loc));

    // Title
    var titleEl = document.getElementById('detail-title');
    if (titleEl) titleEl.textContent = loc.name;

    // KPIs — roi is decimal so use fmtPct for display
    var roiCls = m.roi >= 0.12 ? 'good' : m.roi < 0.07 ? 'bad' : 'accent';
    var kpiEl = document.getElementById('detail-kpis');
    if (kpiEl) {
      kpiEl.innerHTML = [
        ['ROI',            fmtPct(m.roi),           roiCls],
        ['Payback',        fmtYrs(m.paybackYears),  ''],
        ['Annual Revenue', fmtMoney(m.annualRevenue), 'accent'],
        ['Annual Profit',  fmtMoney(m.annualProfit),  roiCls],
        ['Total CapEx',    fmtMoney(m.totalCapex),    ''],
        ['Annual OpEx',    fmtMoney(m.annualOpex),    ''],
        ['Irradiance',     loc.avg_irradiance_kwh_m2_day + ' kWh/m²/d', ''],
        ['Region',         loc.region,               ''],
      ].map(function (row) {
        return '<div class="kpi-item"><div class="kpi-label">' + row[0] +
               '</div><div class="kpi-value ' + row[2] + '">' + row[1] + '</div></div>';
      }).join('');
    }

    // Charts (after DOM paint)
    setTimeout(function () {
      drawBarChart('chart-irradiance', MONTHS, loc.monthly_irradiance, '#F5A623');
      drawBarChart('chart-prices',     MONTHS, loc.monthly_energy_prices, '#3498db');

      // 10-year cumulative P&L (negative = still paying back, positive = profitable)
      var projection = projectProfits(m, 10);
      var yearLabels = ['Yr 1','Yr 2','Yr 3','Yr 4','Yr 5','Yr 6','Yr 7','Yr 8','Yr 9','Yr 10'];
      drawLineChart('chart-projection', yearLabels, [
        { values: projection, color: '#2ecc71' }
      ]);
    }, 0);

    if (window.AppEvents && window.AppEvents.showSection) {
      window.AppEvents.showSection('detail');
    }
  }

  var backBtn = document.getElementById('detail-back');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      if (window.AppEvents && window.AppEvents.showSection) {
        window.AppEvents.showSection('rankings');
      }
    });
  }

  // ── Comparison view ───────────────────────────────────────────────────────

  var compareSelects = document.querySelectorAll('.compare-select');

  var COMPARE_ROWS = [
    { key: 'name',          label: 'Location' },
    { key: 'region',        label: 'Region' },
    { key: 'roi',           label: 'ROI',           fmt: fmtPct,    best: 'max' },
    { key: 'paybackYears',  label: 'Payback',        fmt: fmtYrs,    best: 'min' },
    { key: 'annualRevenue', label: 'Annual Revenue', fmt: fmtMoney,  best: 'max' },
    { key: 'annualProfit',  label: 'Annual Profit',  fmt: fmtMoney,  best: 'max' },
    { key: 'totalCapex',    label: 'Total CapEx',    fmt: fmtMoney,  best: 'min' },
    { key: 'annualOpex',    label: 'Annual OpEx',    fmt: fmtMoney },
    { key: 'irradiance',    label: 'Irradiance (kWh/m²/d)',
      fmt: function (v) { return v.toFixed(1); }, best: 'max' },
    { key: 'energy_price',  label: 'Energy Price ($/kWh)',
      fmt: function (v) { return '$' + v.toFixed(3); }, best: 'max' },
    { key: 'land_cost',     label: 'Land Cost ($/acre)',
      fmt: function (v) { return '$' + v.toLocaleString(); }, best: 'min' },
  ];

  // Populate comparison dropdowns
  compareSelects.forEach(function (sel) {
    locations.forEach(function (loc) {
      var opt = document.createElement('option');
      opt.value = loc.id;
      opt.textContent = loc.name;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', renderComparison);
  });

  function renderComparison() {
    var selected = [];
    compareSelects.forEach(function (sel) {
      if (sel.value) {
        for (var i = 0; i < locations.length; i++) {
          if (locations[i].id === sel.value) { selected.push(locations[i]); break; }
        }
      }
    });

    var thead = document.getElementById('comparison-header');
    var tbody = document.getElementById('comparison-body');
    if (!thead || !tbody) return;

    if (selected.length === 0) {
      thead.innerHTML = '';
      tbody.innerHTML = '<tr><td colspan="4" class="no-data-msg">Select locations above to compare</td></tr>';
      return;
    }

    var data = selected.map(function (loc) {
      var m = calcROI(loc, getConfig(loc));
      return {
        name:          loc.name,
        region:        loc.region,
        roi:           m.roi,
        paybackYears:  m.paybackYears,
        annualRevenue: m.annualRevenue,
        annualProfit:  m.annualProfit,
        totalCapex:    m.totalCapex,
        annualOpex:    m.annualOpex,
        irradiance:    loc.avg_irradiance_kwh_m2_day,
        energy_price:  loc.avg_energy_price_usd_kwh,
        land_cost:     loc.land_cost_usd_acre,
      };
    });

    thead.innerHTML = '<th>Metric</th>' + selected.map(function (loc) {
      return '<th><span class="cmp-header-location">' + loc.name +
             '</span><span class="cmp-header-sub">' + loc.region + '</span></th>';
    }).join('');

    tbody.innerHTML = COMPARE_ROWS.map(function (row) {
      var vals = data.map(function (d) { return d[row.key]; });

      var bestIdx = -1, worstIdx = -1;
      if (row.best && vals.length > 1) {
        var numVals = vals.map(function (v) { return typeof v === 'number' ? v : NaN; });
        var validNums = numVals.filter(function (v) { return !isNaN(v); });
        if (validNums.length > 1) {
          if (row.best === 'max') {
            bestIdx  = numVals.indexOf(Math.max.apply(null, validNums));
            worstIdx = numVals.indexOf(Math.min.apply(null, validNums));
          } else {
            bestIdx  = numVals.indexOf(Math.min.apply(null, validNums));
            worstIdx = numVals.indexOf(Math.max.apply(null, validNums));
          }
        }
      }

      var cells = vals.map(function (val, i) {
        var formatted = row.fmt ? row.fmt(val) : val;
        var cls = i === bestIdx ? 'best-value' : i === worstIdx ? 'worst-value' : '';
        return '<td class="' + cls + '">' + formatted + '</td>';
      });

      return '<tr><td>' + row.label + '</td>' + cells.join('') + '</tr>';
    }).join('');
  }

  renderComparison();

  // ── Public API ────────────────────────────────────────────────────────────
  window.AppEvents = window.AppEvents || {};
  window.AppEvents.showDetail = showDetail;

  window.AppEvents.addToCompare = function (locationId) {
    // Fill first empty slot; if all full, replace last
    var filled = false;
    compareSelects.forEach(function (sel) {
      if (!filled && !sel.value) {
        sel.value = locationId;
        filled = true;
      }
    });
    if (!filled) {
      compareSelects[compareSelects.length - 1].value = locationId;
    }
    if (window.AppEvents.showSection) window.AppEvents.showSection('comparison');
    renderComparison();
  };
}
