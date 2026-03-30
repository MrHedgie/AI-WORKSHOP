// js/calculator.js
// Pure profitability calculation functions. No DOM interaction.
// Exposes window.Calculator — consumed by rankings.js, map.js, detail.js

window.Calculator = (function () {

  /**
   * Derive default plot price for a location based on land cost and farm size.
   * acres_needed = (panels * panel_area_m2) / 4047 (m2 per acre)
   */
  function deriveDefaultPlotPrice(location, config) {
    var acresNeeded = (config.panels * config.panel_area_m2) / 4047;
    return location.land_cost_usd_acre * acresNeeded;
  }

  /**
   * Calculate all financial metrics for a location with a given config.
   *
   * @param {Object} location  - from window.AppData.locations
   * @param {Object} config    - farm configuration; may include plot_price_usd override
   * @returns {{
   *   annualRevenue: number,
   *   totalCapex: number,
   *   annualOpex: number,
   *   annualProfit: number,
   *   roi: number,         // decimal e.g. 0.15 = 15%
   *   paybackYears: number // Infinity if profit <= 0
   * }}
   */
  function calcROI(location, config) {
    // 1. Plot price
    var plotPrice = (config.plot_price_usd != null && !isNaN(config.plot_price_usd))
      ? config.plot_price_usd
      : deriveDefaultPlotPrice(location, config);

    // 2. Annual energy production and revenue
    var annualKwh = location.avg_irradiance_kwh_m2_day
      * config.panel_area_m2
      * config.panel_efficiency
      * config.panels
      * 365;
    var annualRevenue = annualKwh * location.avg_energy_price_usd_kwh;

    // 3. Capital expenditure
    var panelCost = config.panel_price_usd * config.panels;
    var hardwareCost = panelCost * 0.30;
    var totalCapex = panelCost + hardwareCost + plotPrice;

    // 4. Operating expenditure
    var annualOpex = config.annual_opex_usd;

    // 5. Annual profit
    var annualProfit = annualRevenue - annualOpex;

    // 6. ROI and payback (guard against zero/negative values)
    var roi = totalCapex > 0 ? annualProfit / totalCapex : 0;
    var paybackYears = annualProfit > 0 ? totalCapex / annualProfit : Infinity;

    return {
      annualRevenue: annualRevenue,
      totalCapex: totalCapex,
      annualOpex: annualOpex,
      annualProfit: annualProfit,
      roi: roi,
      paybackYears: paybackYears
    };
  }

  /**
   * Rank all locations by a given metric.
   *
   * @param {Object[]} locations - window.AppData.locations
   * @param {Object}   config    - farm config (plot_price_usd derived per-location if omitted)
   * @param {string}   sortBy    - 'roi' | 'payback' | 'profit'
   * @returns {Array<{ location: Object, metrics: Object }>}
   */
  function rankLocations(locations, config, sortBy) {
    sortBy = sortBy || 'roi';

    var ranked = locations.map(function (loc) {
      // Derive plot price per location (no global override when ranking)
      var mergedConfig = Object.assign({}, config, {
        plot_price_usd: deriveDefaultPlotPrice(loc, config)
      });
      return {
        location: loc,
        metrics: calcROI(loc, mergedConfig)
      };
    });

    ranked.sort(function (a, b) {
      if (sortBy === 'payback') {
        // Ascending; push Infinity to the end
        if (a.metrics.paybackYears === Infinity && b.metrics.paybackYears === Infinity) return 0;
        if (a.metrics.paybackYears === Infinity) return 1;
        if (b.metrics.paybackYears === Infinity) return -1;
        return a.metrics.paybackYears - b.metrics.paybackYears;
      }
      if (sortBy === 'profit') {
        return b.metrics.annualProfit - a.metrics.annualProfit;
      }
      // Default: roi descending
      return b.metrics.roi - a.metrics.roi;
    });

    return ranked;
  }

  /**
   * Generate a cumulative net cash-flow projection over N years.
   * Year 0 investment (CapEx) is already sunk; returns profit accumulation from year 1.
   *
   * @param {Object} metrics  - result from calcROI
   * @param {number} years    - default 10
   * @returns {number[]}  array of length `years`: cumulative profit relative to CapEx investment
   *                      negative values = still in payback period, positive = profitable
   */
  function projectProfits(metrics, years) {
    years = years || 10;
    var result = [];
    var cumulative = -metrics.totalCapex; // start from initial investment
    for (var i = 0; i < years; i++) {
      cumulative += metrics.annualProfit;
      result.push(Math.round(cumulative));
    }
    return result;
  }

  return {
    calcROI: calcROI,
    rankLocations: rankLocations,
    deriveDefaultPlotPrice: deriveDefaultPlotPrice,
    projectProfits: projectProfits
  };

})();
