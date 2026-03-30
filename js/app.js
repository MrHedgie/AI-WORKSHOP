// js/app.js
// Minimal initialization — wires together all modules.
// Must be loaded last (after data.js, calculator.js, rankings.js, map.js, detail.js).

document.addEventListener('DOMContentLoaded', function () {

  // ── Init modules ─────────────────────────────────────────────────────────
  initRankings();
  if (typeof initMap    === 'function') initMap();
  if (typeof initDetail === 'function') initDetail();

  // ── Section navigation (SPA-style show/hide) ─────────────────────────────
  var sections = {
    rankings:   document.getElementById('section-rankings'),
    calculator: document.getElementById('section-calculator'),
    map:        document.getElementById('section-map'),
    detail:     document.getElementById('section-detail'),
    comparison: document.getElementById('section-comparison'),
  };

  function showSection(name) {
    Object.keys(sections).forEach(function (key) {
      var el = sections[key];
      if (el) el.classList.toggle('active', key === name);
    });

    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.section === name);
    });
  }

  // Expose for use by map.js, detail.js, rankings.js
  window.AppEvents = window.AppEvents || {};
  window.AppEvents.showSection = showSection;

  // Wire up nav buttons
  document.querySelectorAll('.nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showSection(btn.dataset.section);
    });
  });

  // Start on rankings
  showSection('rankings');

});
