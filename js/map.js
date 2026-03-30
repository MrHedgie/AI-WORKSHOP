// js/map.js — Dev B
// SVG tile-grid US map. States with data are color-coded by ROI.

function initMap() {
  var locations   = window.AppData.locations;
  var defaultConfig = window.AppData.defaultConfig;
  var calcROI     = window.Calculator.calcROI;
  var fmtMoney    = window.Calculator.fmtMoney;
  var fmtPct      = window.Calculator.fmtPct;   // formats decimal roi → "15.0%"
  var fmtYrs      = window.Calculator.fmtYrs;

  var container = document.getElementById('map-container');
  var legendEl  = document.querySelector('.legend-scale');

  // ── Tile grid layout ──────────────────────────────────────────────────────
  var TILES = [
    ['WA', 0, 0], ['MT', 2, 0], ['ND', 3, 0], ['MN', 4, 0], ['WI', 5, 0], ['MI', 6, 0], ['NY', 7, 0],
    ['ME', 10, 0],
    ['OR', 0, 1], ['ID', 1, 1], ['WY', 2, 1], ['SD', 3, 1], ['IA', 4, 1], ['IL', 5, 1], ['IN', 6, 1],
    ['OH', 7, 1], ['PA', 8, 1], ['NJ', 9, 1], ['VT', 10, 1], ['NH', 11, 1],
    ['CA', 0, 2], ['NV', 1, 2], ['UT', 2, 2], ['CO', 3, 2], ['NE', 4, 2], ['MO', 5, 2], ['KY', 6, 2],
    ['WV', 7, 2], ['VA', 8, 2], ['MD', 9, 2], ['DE', 10, 2], ['MA', 11, 2],
    ['AZ', 1, 3], ['NM', 2, 3], ['KS', 3, 3], ['AR', 4, 3], ['TN', 5, 3], ['NC', 6, 3], ['SC', 7, 3],
    ['DC', 9, 3], ['CT', 10, 3], ['RI', 11, 3],
    ['OK', 3, 4], ['LA', 4, 4], ['MS', 5, 4], ['AL', 6, 4], ['GA', 7, 4],
    ['TX', 3, 5], ['FL', 7, 5],
    ['HI', 0, 6], ['AK', 1, 6],
  ];

  var TILE_SIZE = 46;
  var TILE_GAP  = 4;
  var STEP      = TILE_SIZE + TILE_GAP;
  var PADDING   = 16;

  var maxCol = 0, maxRow = 0;
  TILES.forEach(function (t) {
    if (t[1] > maxCol) maxCol = t[1];
    if (t[2] > maxRow) maxRow = t[2];
  });
  var svgW = (maxCol + 1) * STEP + PADDING * 2;
  var svgH = (maxRow + 1) * STEP + PADDING * 2;

  // ── ROI color scale (roi is decimal: 0.15 = 15%) ─────────────────────────
  var roiMap = {};
  locations.forEach(function (loc) {
    var m = calcROI(loc, Object.assign({}, defaultConfig, {
      plot_price_usd: window.Calculator.deriveDefaultPlotPrice(loc, defaultConfig)
    }));
    roiMap[loc.state_abbr] = m.roi;  // decimal
  });

  var roiValues = Object.keys(roiMap).map(function (k) { return roiMap[k]; });
  var roiMin = Math.min.apply(null, roiValues);
  var roiMax = Math.max.apply(null, roiValues);

  function roiToColor(roi) {
    var t = Math.max(0, Math.min(1, (roi - roiMin) / (roiMax - roiMin)));
    if (t < 0.5) return lerpColor('#e74c3c', '#f39c12', t * 2);
    return lerpColor('#f39c12', '#2ecc71', (t - 0.5) * 2);
  }

  function lerpColor(hex1, hex2, t) {
    var r1 = parseInt(hex1.slice(1,3),16), g1 = parseInt(hex1.slice(3,5),16), b1 = parseInt(hex1.slice(5,7),16);
    var r2 = parseInt(hex2.slice(1,3),16), g2 = parseInt(hex2.slice(3,5),16), b2 = parseInt(hex2.slice(5,7),16);
    return 'rgb(' + Math.round(r1+(r2-r1)*t) + ',' + Math.round(g1+(g2-g1)*t) + ',' + Math.round(b1+(b2-b1)*t) + ')';
  }

  // ── Build SVG ─────────────────────────────────────────────────────────────
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 ' + svgW + ' ' + svgH);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'US Solar ROI Map');

  var selectedAbbr = null;

  TILES.forEach(function (tile) {
    var abbr = tile[0], col = tile[1], row = tile[2];
    var x = PADDING + col * STEP;
    var y = PADDING + row * STEP;
    var hasData = abbr in roiMap;
    var fill = hasData ? roiToColor(roiMap[abbr]) : '#dde1e8';

    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'state-tile' + (hasData ? ' has-data' : ''));
    g.dataset.abbr = abbr;

    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', TILE_SIZE);
    rect.setAttribute('height', TILE_SIZE);
    rect.setAttribute('rx', 5);
    rect.setAttribute('fill', fill);
    rect.setAttribute('stroke', '#fff');
    rect.setAttribute('stroke-width', '2');

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + TILE_SIZE / 2);
    text.setAttribute('y', y + TILE_SIZE / 2 + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '11');
    text.setAttribute('font-weight', '700');
    text.setAttribute('font-family', 'sans-serif');
    text.setAttribute('fill', hasData ? '#fff' : '#aaa');
    text.setAttribute('pointer-events', 'none');
    text.textContent = abbr;

    g.appendChild(rect);
    g.appendChild(text);
    svg.appendChild(g);

    if (hasData) {
      g.addEventListener('mouseenter', function () { showHover(abbr); });
      g.addEventListener('mouseleave', hideHover);
      g.addEventListener('click', function () { selectState(abbr, g); });
    }
  });

  if (container) container.appendChild(svg);

  // ── Legend labels ─────────────────────────────────────────────────────────
  if (legendEl) {
    var labelsDiv = document.createElement('div');
    labelsDiv.className = 'legend-labels';
    labelsDiv.innerHTML =
      '<span>' + fmtPct(roiMin) + '</span>' +
      '<span>' + fmtPct((roiMin + roiMax) / 2) + '</span>' +
      '<span>' + fmtPct(roiMax) + '</span>';
    legendEl.parentElement.appendChild(labelsDiv);
  }

  // ── Hover info panel ──────────────────────────────────────────────────────
  var hoverPanel    = document.getElementById('map-hover-info');
  var hoverName     = document.getElementById('map-hover-name');
  var hoverStats    = document.getElementById('map-hover-stats');
  var viewDetailBtn = document.getElementById('map-view-detail');

  function showHover(abbr) {
    var loc = null;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].state_abbr === abbr) { loc = locations[i]; break; }
    }
    if (!loc) return;

    var m = calcROI(loc, Object.assign({}, defaultConfig, {
      plot_price_usd: window.Calculator.deriveDefaultPlotPrice(loc, defaultConfig)
    }));

    hoverName.textContent = loc.name;
    hoverStats.innerHTML = [
      ['ROI',            fmtPct(m.roi)],
      ['Payback',        fmtYrs(m.paybackYears)],
      ['Annual Revenue', fmtMoney(m.annualRevenue)],
      ['Irradiance',     loc.avg_irradiance_kwh_m2_day + ' kWh/m²/day'],
      ['Energy Price',   '$' + loc.avg_energy_price_usd_kwh.toFixed(3) + '/kWh'],
    ].map(function (pair) {
      return '<div class="hover-stat"><span class="hover-stat-label">' + pair[0] +
             '</span><span class="hover-stat-value">' + pair[1] + '</span></div>';
    }).join('');

    if (viewDetailBtn) {
      viewDetailBtn.onclick = function () {
        if (window.AppEvents && window.AppEvents.showDetail) {
          window.AppEvents.showDetail(loc.id);
        }
      };
    }
    if (hoverPanel) hoverPanel.style.display = 'block';
  }

  function hideHover() {
    if (!selectedAbbr && hoverPanel) hoverPanel.style.display = 'none';
  }

  function selectState(abbr, groupEl) {
    svg.querySelectorAll('.state-tile.selected').forEach(function (el) {
      el.classList.remove('selected');
    });
    if (selectedAbbr === abbr) {
      selectedAbbr = null;
      if (hoverPanel) hoverPanel.style.display = 'none';
      return;
    }
    selectedAbbr = abbr;
    groupEl.classList.add('selected');
    showHover(abbr);
  }

  // ── Public API ────────────────────────────────────────────────────────────
  window.AppEvents = window.AppEvents || {};
  window.AppEvents.highlightState = function (abbr) {
    var g = svg.querySelector('[data-abbr="' + abbr + '"]');
    if (g && g.classList.contains('has-data')) {
      svg.querySelectorAll('.state-tile.selected').forEach(function (el) {
        el.classList.remove('selected');
      });
      selectedAbbr = abbr;
      g.classList.add('selected');
      showHover(abbr);
    }
  };
}
