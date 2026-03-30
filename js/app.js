// js/app.js
// Minimal initialization — wires together all modules.
// Must be loaded last (after data.js, calculator.js, rankings.js, map.js, detail.js).

document.addEventListener('DOMContentLoaded', function () {
  initRankings();
  if (typeof initMap    === 'function') initMap();
  if (typeof initDetail === 'function') initDetail();
});
