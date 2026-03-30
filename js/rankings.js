// js/rankings.js
// Rankings list UI and Calculator panel UI logic.
// Depends on: window.AppData (data.js), window.Calculator (calculator.js)
// Exposes: window.initRankings()

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  var currentSortBy = 'roi';
  var currentFilters = { minROI: 0, maxPayback: Infinity, region: 'all' };
  var currentConfig = null;
  var calcDebounceTimer = null;

  // ── Public init ────────────────────────────────────────────────────────────
  window.initRankings = function () {
    currentConfig = Object.assign({}, window.AppData.defaultConfig);

    renderFilters();
    renderCalculatorPanel();
    renderRankings();
    bindFilterEvents();
    bindCalculatorEvents();
    updateCalculatorOutput();
  };

  // ── Render: filters ────────────────────────────────────────────────────────
  function renderFilters() {
    var mount = document.getElementById('rankings-controls-mount');
    if (!mount) return;

    var wrap = document.createElement('div');
    wrap.className = 'rankings-controls';

    // Sort
    var sortWrap = document.createElement('div');
    sortWrap.className = 'sort-controls';
    var sortLabel = document.createElement('label');
    sortLabel.setAttribute('for', 'sort-by');
    sortLabel.textContent = 'Sort by';
    var sortSelect = document.createElement('select');
    sortSelect.id = 'sort-by';
    [
      { value: 'roi',     text: 'ROI (Best First)' },
      { value: 'payback', text: 'Payback Period (Shortest First)' },
      { value: 'profit',  text: 'Annual Profit (Highest First)' }
    ].forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.text;
      sortSelect.appendChild(o);
    });
    sortWrap.appendChild(sortLabel);
    sortWrap.appendChild(sortSelect);
    wrap.appendChild(sortWrap);

    // Filters row
    var filterWrap = document.createElement('div');
    filterWrap.className = 'filter-controls';

    filterWrap.appendChild(createInputGroup('filter-min-roi', 'Min ROI %', 'number',
      { min: '0', max: '100', step: '1', value: '0', placeholder: '0' }));

    filterWrap.appendChild(createInputGroup('filter-max-payback', 'Max Payback (yrs)', 'number',
      { min: '0', max: '99', step: '1', value: '', placeholder: 'Any' }));

    var regionGroup = document.createElement('div');
    regionGroup.className = 'filter-group';
    var regionLabel = document.createElement('label');
    regionLabel.setAttribute('for', 'filter-region');
    regionLabel.textContent = 'Region';
    var regionSelect = document.createElement('select');
    regionSelect.id = 'filter-region';
    [
      { value: 'all',            text: 'All Regions' },
      { value: 'Southwest',      text: 'Southwest' },
      { value: 'West',           text: 'West' },
      { value: 'Mountain',       text: 'Mountain' },
      { value: 'South Central',  text: 'South Central' },
      { value: 'Southeast',      text: 'Southeast' },
      { value: 'Midwest',        text: 'Midwest' },
      { value: 'Northeast',      text: 'Northeast' }
    ].forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.text;
      regionSelect.appendChild(o);
    });
    regionGroup.appendChild(regionLabel);
    regionGroup.appendChild(regionSelect);
    filterWrap.appendChild(regionGroup);

    var resetBtn = document.createElement('button');
    resetBtn.id = 'filter-reset';
    resetBtn.className = 'btn-secondary';
    resetBtn.textContent = 'Reset Filters';
    filterWrap.appendChild(resetBtn);

    wrap.appendChild(filterWrap);

    var countWrap = document.createElement('div');
    countWrap.className = 'results-count';
    var countSpan = document.createElement('span');
    countSpan.id = 'results-count-text';
    countSpan.textContent = 'Showing ' + window.AppData.locations.length + ' locations';
    countWrap.appendChild(countSpan);
    wrap.appendChild(countWrap);

    mount.innerHTML = '';
    mount.appendChild(wrap);
  }

  // ── Render: calculator panel ───────────────────────────────────────────────
  function renderCalculatorPanel() {
    var mount = document.getElementById('calculator-mount');
    if (!mount) return;

    var panel = document.createElement('div');
    panel.className = 'calculator-panel';

    var title = document.createElement('h2');
    title.className = 'calculator-title';
    title.textContent = 'Farm Profitability Calculator';
    panel.appendChild(title);

    var sub = document.createElement('p');
    sub.className = 'calculator-subtitle';
    sub.textContent = 'Adjust farm parameters and apply to re-rank all locations.';
    panel.appendChild(sub);

    var inputsDiv = document.createElement('div');
    inputsDiv.className = 'calculator-inputs';

    var cfg = window.AppData.defaultConfig;
    inputsDiv.appendChild(createInputGroup('calc-panels',      'Number of Panels',     'number',
      { min: '100', max: '500000', step: '100', value: String(cfg.panels) }));
    inputsDiv.appendChild(createInputGroup('calc-panel-price', 'Panel Price ($/panel)', 'number',
      { min: '50',  max: '1000',   step: '10',  value: String(cfg.panel_price_usd) }));

    var effGroup = createInputGroup('calc-efficiency', 'Panel Efficiency (%)', 'number',
      { min: '5', max: '35', step: '0.5', value: String(cfg.panel_efficiency * 100) });
    var hint = document.createElement('span');
    hint.className = 'input-hint';
    hint.textContent = 'Standard panels: 18–22%';
    effGroup.appendChild(hint);
    inputsDiv.appendChild(effGroup);

    inputsDiv.appendChild(createInputGroup('calc-opex', 'Annual OpEx ($)', 'number',
      { min: '0', max: '10000000', step: '1000', value: String(cfg.annual_opex_usd) }));
    panel.appendChild(inputsDiv);

    var outputDiv = document.createElement('div');
    outputDiv.className = 'calculator-output';
    outputDiv.id = 'calc-output';

    var outputTitle = document.createElement('h3');
    outputTitle.className = 'output-title';
    outputTitle.textContent = 'Results for Top Location';
    outputDiv.appendChild(outputTitle);

    var grid = document.createElement('div');
    grid.className = 'output-grid';
    [
      { id: 'out-revenue', label: 'Annual Revenue', highlight: false },
      { id: 'out-capex',   label: 'Total CapEx',    highlight: false },
      { id: 'out-opex',    label: 'Annual OpEx',    highlight: false },
      { id: 'out-profit',  label: 'Annual Profit',  highlight: true  },
      { id: 'out-roi',     label: 'ROI',            highlight: true  },
      { id: 'out-payback', label: 'Payback Period', highlight: true  }
    ].forEach(function (item) {
      var cell = document.createElement('div');
      cell.className = 'output-item' + (item.highlight ? ' highlight' : '');
      var lbl = document.createElement('span');
      lbl.className = 'output-label';
      lbl.textContent = item.label;
      var val = document.createElement('span');
      val.className = 'output-value';
      val.id = item.id;
      val.textContent = '—';
      cell.appendChild(lbl);
      cell.appendChild(val);
      grid.appendChild(cell);
    });
    outputDiv.appendChild(grid);

    var note = document.createElement('p');
    note.className = 'output-note';
    note.appendChild(document.createTextNode('Showing metrics for '));
    var locStrong = document.createElement('strong');
    locStrong.id = 'out-location-name';
    locStrong.textContent = '—';
    note.appendChild(locStrong);
    note.appendChild(document.createTextNode(' — plot price estimated from land cost × required acreage'));
    outputDiv.appendChild(note);
    panel.appendChild(outputDiv);

    var actions = document.createElement('div');
    actions.className = 'calculator-actions';
    var applyBtn = document.createElement('button');
    applyBtn.id = 'calc-apply';
    applyBtn.className = 'btn-primary';
    applyBtn.textContent = 'Apply to Rankings';
    var resetBtn = document.createElement('button');
    resetBtn.id = 'calc-reset';
    resetBtn.className = 'btn-secondary';
    resetBtn.textContent = 'Reset to Defaults';
    actions.appendChild(applyBtn);
    actions.appendChild(resetBtn);
    panel.appendChild(actions);

    mount.innerHTML = '';
    mount.appendChild(panel);
  }

  // ── Render: rankings list ──────────────────────────────────────────────────
  function renderRankings() {
    var list = document.getElementById('rankings-list');
    if (!list) return;

    var ranked = window.Calculator.rankLocations(
      window.AppData.locations, currentConfig, currentSortBy);

    var filtered = ranked.filter(function (item) {
      var roiPct = item.metrics.roi * 100;
      if (roiPct < currentFilters.minROI) return false;
      if (currentFilters.maxPayback !== Infinity && item.metrics.paybackYears > currentFilters.maxPayback) return false;
      if (currentFilters.region !== 'all' && item.location.region !== currentFilters.region) return false;
      return true;
    });

    var countEl = document.getElementById('results-count-text');
    if (countEl) {
      countEl.textContent = 'Showing ' + filtered.length + ' of ' + window.AppData.locations.length + ' locations';
    }

    list.innerHTML = '';

    if (filtered.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'rankings-empty';
      empty.textContent = 'No locations match the current filters. Try relaxing the filter criteria.';
      list.appendChild(empty);
      return;
    }

    filtered.forEach(function (item, idx) {
      list.appendChild(renderLocationCard(item.location, item.metrics, idx + 1));
    });
  }

  function renderLocationCard(location, metrics, rank) {
    var article = document.createElement('article');
    article.className = 'location-card';
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-id', location.id);
    article.setAttribute('data-roi', String(metrics.roi));

    var rankDiv = document.createElement('div');
    rankDiv.className = 'card-rank' + (rank <= 3 ? ' card-rank--top' : '');
    rankDiv.textContent = '#' + rank;
    article.appendChild(rankDiv);

    var body = document.createElement('div');
    body.className = 'card-body';

    var headerRow = document.createElement('div');
    headerRow.className = 'card-header-row';
    var nameEl = document.createElement('h3');
    nameEl.className = 'card-name';
    nameEl.textContent = location.name;
    var regionEl = document.createElement('span');
    regionEl.className = 'card-region';
    regionEl.textContent = location.region;
    headerRow.appendChild(nameEl);
    headerRow.appendChild(regionEl);
    body.appendChild(headerRow);

    var metricsRow = document.createElement('div');
    metricsRow.className = 'card-metrics';
    var roiClass = getROIColorClass(metrics.roi);
    metricsRow.appendChild(createMetricBox('ROI', formatROI(metrics.roi), roiClass));
    metricsRow.appendChild(createMetricBox('Payback', formatPayback(metrics.paybackYears), ''));
    metricsRow.appendChild(createMetricBox('Annual Profit', formatCurrency(metrics.annualProfit), ''));
    body.appendChild(metricsRow);

    var chips = document.createElement('div');
    chips.className = 'card-key-metrics';
    var gridAvail = location.grid_connection_available ? 'Available' : 'Limited';
    [
      { label: 'Irradiance',   value: location.avg_irradiance_kwh_m2_day.toFixed(1) + ' kWh/m²/day' },
      { label: 'Energy Price', value: '$' + location.avg_energy_price_usd_kwh.toFixed(2) + '/kWh' },
      { label: 'Land Cost',    value: '$' + location.land_cost_usd_acre.toLocaleString() + '/acre' },
      { label: 'Grid',         value: gridAvail }
    ].forEach(function (chip, idx, arr) {
      var span = document.createElement('span');
      span.className = 'key-metric';
      var lbl = document.createElement('span');
      lbl.className = 'key-metric-label';
      lbl.textContent = chip.label + ':';
      var val = document.createElement('span');
      val.className = 'key-metric-value';
      val.textContent = chip.value;
      span.appendChild(lbl);
      span.appendChild(val);
      chips.appendChild(span);
      if (idx < arr.length - 1) {
        var sep = document.createElement('span');
        sep.className = 'key-metric-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '·';
        chips.appendChild(sep);
      }
    });
    body.appendChild(chips);

    // Action buttons
    var actions = document.createElement('div');
    actions.className = 'card-actions';
    var detailBtn = document.createElement('button');
    detailBtn.className = 'btn-secondary';
    detailBtn.textContent = 'Details';
    detailBtn.onclick = function () {
      if (window.AppEvents && window.AppEvents.showDetail) {
        window.AppEvents.showDetail(location.id);
      }
    };
    var compareBtn = document.createElement('button');
    compareBtn.className = 'btn-secondary';
    compareBtn.textContent = 'Compare';
    compareBtn.onclick = function () {
      if (window.AppEvents && window.AppEvents.addToCompare) {
        window.AppEvents.addToCompare(location.id);
      }
    };
    actions.appendChild(detailBtn);
    actions.appendChild(compareBtn);
    body.appendChild(actions);

    article.appendChild(body);
    return article;
  }

  // ── Calculator output ──────────────────────────────────────────────────────
  function updateCalculatorOutput() {
    var tempConfig = readCalcInputs();
    if (!tempConfig) return;

    var ranked = window.Calculator.rankLocations(
      window.AppData.locations, tempConfig, currentSortBy);
    if (!ranked.length) return;

    var top = ranked[0];
    var metrics = window.Calculator.calcROI(top.location, Object.assign({}, tempConfig, {
      plot_price_usd: window.Calculator.deriveDefaultPlotPrice(top.location, tempConfig)
    }));

    setText('out-revenue', formatCurrency(metrics.annualRevenue));
    setText('out-capex',   formatCurrency(metrics.totalCapex));
    setText('out-opex',    formatCurrency(metrics.annualOpex));
    setText('out-profit',  formatCurrency(metrics.annualProfit));
    setText('out-roi',     formatROI(metrics.roi));
    setText('out-payback', formatPayback(metrics.paybackYears));
    setText('out-location-name', top.location.name);
  }

  // ── Event binding ──────────────────────────────────────────────────────────
  function bindFilterEvents() {
    on('sort-by', 'change', function (e) {
      currentSortBy = e.target.value;
      renderRankings();
      updateCalculatorOutput();
    });

    on('filter-min-roi', 'change', function (e) {
      var v = parseFloat(e.target.value);
      currentFilters.minROI = isNaN(v) ? 0 : v;
      renderRankings();
    });

    on('filter-max-payback', 'change', function (e) {
      var v = parseFloat(e.target.value);
      currentFilters.maxPayback = (isNaN(v) || e.target.value === '') ? Infinity : v;
      renderRankings();
    });

    on('filter-region', 'change', function (e) {
      currentFilters.region = e.target.value;
      renderRankings();
    });

    on('filter-reset', 'click', function () {
      currentFilters = { minROI: 0, maxPayback: Infinity, region: 'all' };
      currentSortBy = 'roi';
      setVal('sort-by', 'roi');
      setVal('filter-min-roi', '0');
      setVal('filter-max-payback', '');
      setVal('filter-region', 'all');
      renderRankings();
    });
  }

  function bindCalculatorEvents() {
    ['calc-panels', 'calc-panel-price', 'calc-efficiency', 'calc-opex'].forEach(function (id) {
      on(id, 'input', function () {
        clearTimeout(calcDebounceTimer);
        calcDebounceTimer = setTimeout(updateCalculatorOutput, 200);
      });
    });

    on('calc-apply', 'click', function () {
      var inputs = readCalcInputs();
      if (!inputs) return;
      currentConfig = inputs;
      renderRankings();
      updateCalculatorOutput();
    });

    on('calc-reset', 'click', function () {
      var cfg = window.AppData.defaultConfig;
      setVal('calc-panels',      String(cfg.panels));
      setVal('calc-panel-price', String(cfg.panel_price_usd));
      setVal('calc-efficiency',  String(cfg.panel_efficiency * 100));
      setVal('calc-opex',        String(cfg.annual_opex_usd));
      currentConfig = Object.assign({}, cfg);
      renderRankings();
      updateCalculatorOutput();
    });
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function readCalcInputs() {
    var panels     = parseFloat(getVal('calc-panels'));
    var panelPrice = parseFloat(getVal('calc-panel-price'));
    var effPct     = parseFloat(getVal('calc-efficiency'));
    var opex       = parseFloat(getVal('calc-opex'));

    if (isNaN(panels) || isNaN(panelPrice) || isNaN(effPct) || isNaN(opex)) return null;
    if (panels <= 0 || panelPrice <= 0 || effPct <= 0) return null;

    return {
      panels:           Math.round(panels),
      panel_price_usd:  panelPrice,
      panel_efficiency: effPct / 100,
      panel_area_m2:    window.AppData.defaultConfig.panel_area_m2,
      annual_opex_usd:  opex
    };
  }

  function createInputGroup(id, labelText, type, attrs) {
    var group = document.createElement('div');
    group.className = 'input-group';
    var lbl = document.createElement('label');
    lbl.setAttribute('for', id);
    lbl.textContent = labelText;
    var input = document.createElement('input');
    input.type = type;
    input.id = id;
    Object.keys(attrs).forEach(function (k) { input.setAttribute(k, attrs[k]); });
    group.appendChild(lbl);
    group.appendChild(input);
    return group;
  }

  function createMetricBox(label, value, extraClass) {
    var div = document.createElement('div');
    div.className = 'metric' + (extraClass ? ' ' + extraClass : '');
    var lbl = document.createElement('span');
    lbl.className = 'metric-label';
    lbl.textContent = label;
    var val = document.createElement('span');
    val.className = 'metric-value';
    val.textContent = value;
    div.appendChild(lbl);
    div.appendChild(val);
    return div;
  }

  function formatCurrency(n) {
    if (isNaN(n) || n === null) return '—';
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', maximumFractionDigits: 0
      }).format(n);
    } catch (e) {
      return '$' + Math.round(n).toLocaleString();
    }
  }

  function formatROI(roi) {
    if (roi === null || roi === undefined || isNaN(roi)) return '—';
    return (roi * 100).toFixed(1) + '%';
  }

  function formatPayback(years) {
    if (years === Infinity || years > 99 || isNaN(years)) return 'Never';
    return years.toFixed(1) + ' yrs';
  }

  function getROIColorClass(roi) {
    if (roi >= 0.12) return 'roi-good';
    if (roi >= 0.07) return 'roi-medium';
    return 'roi-bad';
  }

  function on(id, event, handler) {
    var el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setVal(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val;
  }

})();
