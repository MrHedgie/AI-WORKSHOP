// js/calculator.js
// Pure profitability calculation functions. No DOM interaction.
// Exposes window.Calculator — consumed by rankings.js, map.js, detail.js

window.Calculator = (function () {

  /**
   * Derive default plot price from land cost and farm size.
   * acres_needed = (panels * panel_area_m2) / 4047 m² per acre
   */
  function deriveDefaultPlotPrice(location, config) {
    var acresNeeded = (config.panels * config.panel_area_m2) / 4047;
    return location.land_cost_usd_acre * acresNeeded;
  }

  /**
   * Calculate all financial metrics for a location + config.
   * @returns {{ annualRevenue, totalCapex, annualOpex, annualProfit,
   *             roi (decimal 0–1), paybackYears }}
   */
  function calcROI(location, config) {
    var plotPrice = (config.plot_price_usd != null && !isNaN(config.plot_price_usd))
      ? config.plot_price_usd
      : deriveDefaultPlotPrice(location, config);

    var annualKwh = location.avg_irradiance_kwh_m2_day
      * config.panel_area_m2
      * config.panel_efficiency
      * config.panels
      * 365;
    var annualRevenue = annualKwh * location.avg_energy_price_usd_kwh;

    var panelCost   = config.panel_price_usd * config.panels;
    var totalCapex  = panelCost + panelCost * 0.30 + plotPrice;
    var annualOpex  = config.annual_opex_usd;
    var annualProfit = annualRevenue - annualOpex;

    var roi          = totalCapex > 0 ? annualProfit / totalCapex : 0;
    var paybackYears = annualProfit > 0 ? totalCapex / annualProfit : Infinity;

    return {
      annualRevenue: annualRevenue,
      totalCapex:    totalCapex,
      annualOpex:    annualOpex,
      annualProfit:  annualProfit,
      roi:           roi,           // decimal — 0.15 means 15%
      paybackYears:  paybackYears
    };
  }

  /**
   * Rank locations by a given metric.
   * @param {string} sortBy  'roi' | 'payback' | 'profit'
   */
  function rankLocations(locations, config, sortBy) {
    sortBy = sortBy || 'roi';

    var ranked = locations.map(function (loc) {
      var mergedConfig = Object.assign({}, config, {
        plot_price_usd: deriveDefaultPlotPrice(loc, config)
      });
      return { location: loc, metrics: calcROI(loc, mergedConfig) };
    });

    ranked.sort(function (a, b) {
      if (sortBy === 'payback') {
        if (a.metrics.paybackYears === Infinity && b.metrics.paybackYears === Infinity) return 0;
        if (a.metrics.paybackYears === Infinity) return 1;
        if (b.metrics.paybackYears === Infinity) return -1;
        return a.metrics.paybackYears - b.metrics.paybackYears;
      }
      if (sortBy === 'profit') return b.metrics.annualProfit - a.metrics.annualProfit;
      return b.metrics.roi - a.metrics.roi;
    });

    return ranked;
  }

  /**
   * Cumulative net P&L over N years (relative to initial CapEx investment).
   * Negative = still in payback; positive = profitable.
   */
  function projectProfits(metrics, years) {
    years = years || 10;
    var result = [];
    var cumulative = -metrics.totalCapex;
    for (var i = 0; i < years; i++) {
      cumulative += metrics.annualProfit;
      result.push(Math.round(cumulative));
    }
    return result;
  }

  // ── Display formatting helpers ────────────────────────────────────────────

  function fmtMoney(n) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', maximumFractionDigits: 0
      }).format(n);
    } catch (e) {
      return '$' + Math.round(n).toLocaleString();
    }
  }

  /** roi is a decimal (0.15 → "15.0%") */
  function fmtPct(roi) {
    if (roi === null || roi === undefined || isNaN(roi)) return '—';
    return (roi * 100).toFixed(1) + '%';
  }

  function fmtYrs(years) {
    if (years === Infinity || years > 99 || isNaN(years)) return 'Never';
    return years.toFixed(1) + ' yrs';
  }

  return {
    calcROI:                calcROI,
    rankLocations:          rankLocations,
    deriveDefaultPlotPrice: deriveDefaultPlotPrice,
    projectProfits:         projectProfits,
    fmtMoney:               fmtMoney,
    fmtPct:                 fmtPct,
    fmtYrs:                 fmtYrs
  };

})();
