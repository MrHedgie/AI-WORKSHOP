# Solar Farm Location Decision Tool

## Project Overview

A front-end application to help a US solar farm company decide where to build new farms, maximizing profitability based on energy prices, weather data, and construction costs.

**Stack:** Vanilla JS + HTML + CSS (no frameworks). All data is mocked.

---

## Business Context

- Company builds a few solar farms per year across the US
- Revenue: electricity sold on the energy market
- Current process: manual research — search for high energy prices, then check weather manually
- Goal: replace manual process with a structured decision-support tool

---

## Profitability Model

### Revenue
- Energy produced (kWh) × local energy price ($/kWh)
- Energy produced = solar irradiance × number of panels × panel efficiency

### Costs
- **Panel cost:** price per panel × number of panels
- **Hardware cost:** 30% of total panel cost (inverters, wiring, mounting, etc.)
- **Plot cost:** land purchase/lease price for the location
- **Operating costs:** annual maintenance, grid connection fees

### Profit Formula
```
Annual Revenue = solar_irradiance_score × panels × efficiency × energy_price
Total CapEx = (panel_price × panels) + (panel_price × panels × 0.30) + plot_price
Annual OpEx = operating_cost_per_year
ROI = (Annual Revenue - Annual OpEx) / Total CapEx
Payback Period = Total CapEx / (Annual Revenue - Annual OpEx)
```

---

## Application Structure

```
/
├── index.html              # Main entry point — skeleton agreed upfront, then frozen
├── css/
│   └── styles.css          # Styles — split into clearly labelled blocks per developer
├── js/
│   ├── data.js             # Mocked data (locations, prices, weather)       [Dev A]
│   ├── calculator.js       # Profitability calculation logic                 [Dev A]
│   ├── rankings.js         # Rankings list + Calculator panel UI logic       [Dev A]
│   ├── map.js              # SVG US map rendering and interaction            [Dev B]
│   ├── detail.js           # Location Detail view + Comparison view logic   [Dev B]
│   └── app.js              # Thin init only — calls initRankings(), initMap() [shared, written last]
└── CLAUDE.md
```

---

## Features

### 1. Location Browser
- Display candidate US locations (states/regions) as cards or on a US map
- Each location shows: state, avg solar irradiance, avg energy price, land cost tier

### 2. Profitability Calculator (per location)
- Input: number of panels, panel price, plot price
- Output: estimated annual revenue, CapEx, OpEx, ROI %, payback period in years
- Highlight best locations based on ROI

### 3. Comparison View
- Side-by-side comparison of up to 3 selected locations
- Key metrics: ROI, payback period, annual profit, risk score

### 4. Rankings / Recommendations
- Ranked list of all locations sorted by ROI or payback period
- Filter by: min ROI threshold, max payback years, region

### 5. Location Detail View
- Expanded view with charts: monthly energy price trend, monthly irradiance
- Simulated 10-year profit projection chart

---

## Mocked Data

### Locations (approx. 10–15 US states/regions)
```js
{
  id: "AZ-phoenix",
  name: "Phoenix, AZ",
  state: "Arizona",
  region: "Southwest",
  avg_irradiance_kwh_m2_day: 6.5,       // peak sun hours
  avg_energy_price_usd_kwh: 0.12,
  land_cost_usd_acre: 8000,
  grid_connection_available: true,
  monthly_irradiance: [...],             // 12 values
  monthly_energy_prices: [...]           // 12 values
}
```

### Farm Configuration Defaults
```js
{
  panels: 10000,
  panel_price_usd: 250,
  panel_efficiency: 0.20,               // 20%
  panel_area_m2: 1.7,
  annual_opex_usd: 50000
}
```

---

## UI / UX Guidelines

- Clean, professional look — dark header, white cards, accent color: solar orange (#F5A623)
- Responsive layout (desktop-first, mobile-friendly)
- No external dependencies — pure HTML/CSS/JS only
- Charts: use Canvas API or simple CSS bar charts
- Map: SVG-based US state map (inline SVG, clickable states)

---

## Development Notes

- All data lives in `js/data.js` — easy to swap for real API later
- Calculator logic is pure functions in `js/calculator.js` — unit-testable
- `app.js` wires together UI events and rendering
- Use `data-*` attributes on HTML elements for state management (no framework needed)
- Avoid `innerHTML` with user-provided strings to prevent XSS

---

## Developer Task Split

The split is file-based to avoid merge conflicts. Each developer owns distinct files. The only shared files are `index.html` (skeleton agreed upfront and frozen) and `app.js` (written last, tiny).

---

### Developer A — Data, Logic & Rankings

**Owns these files entirely:**
- `js/data.js` — all mock location data and farm config defaults
- `js/calculator.js` — all profitability formulas (pure functions, no DOM)
- `js/rankings.js` — Rankings list UI, filters, Calculator panel UI logic
- `css/styles.css` lines under `/* === DEV A: Rankings & Calculator === */`

**HTML sections to populate (IDs agreed upfront):**
- `#section-rankings` — ranked location cards with sort/filter controls
- `#section-calculator` — input form (panels, price, plot) + output metrics

**Build order:**
1. `js/data.js` — define location data shape and populate 10–15 locations
2. `js/calculator.js` — implement all formulas, export via `window.Calculator`
3. `js/rankings.js` — render ranked list, wire up filters, call Calculator
4. CSS block for rankings and calculator components

**Public API to expose** (so Dev B can reuse):
```js
window.Calculator.calcROI(location, config)      // returns { revenue, capex, opex, roi, payback }
window.Calculator.rankLocations(locations, config) // returns sorted array
window.AppData.locations                           // the mocked location array
window.AppData.defaultConfig                       // default farm configuration
```

---

### Developer B — Map, Detail & Comparison Views

**Owns these files entirely:**
- `js/map.js` — inline SVG US map, state hover/click, color-coding by ROI
- `js/detail.js` — Location Detail view (charts), Comparison view (side-by-side)
- `css/styles.css` lines under `/* === DEV B: Map, Detail & Comparison === */`

**HTML sections to populate (IDs agreed upfront):**
- `#section-map` — SVG map container + legend
- `#section-detail` — detail panel with monthly charts and 10-year projection
- `#section-comparison` — side-by-side comparison table for up to 3 locations

**Build order:**
1. `js/map.js` — embed SVG map, color states by `window.Calculator.calcROI()` once Dev A's data/calculator is ready (or stub it)
2. `js/detail.js` — detail view with Canvas bar charts for monthly irradiance and prices
3. Comparison view within `detail.js`
4. CSS block for map, detail, and comparison components

**Depends on Dev A's public API:**
```js
window.Calculator.calcROI(location, config)   // call to get metrics per location
window.AppData.locations                       // iterate to color the map
```

---

### Shared Contracts (agree before coding, then freeze)

These must be settled on day one so both devs can work independently:

#### HTML skeleton (`index.html`)
Dev A writes the full skeleton with all section IDs and script tags. Dev B does not touch `index.html`.

```html
<header>…</header>
<main>
  <section id="section-rankings"><!-- Dev A --></section>
  <section id="section-calculator"><!-- Dev A --></section>
  <section id="section-map"><!-- Dev B --></section>
  <section id="section-detail"><!-- Dev B --></section>
  <section id="section-comparison"><!-- Dev B --></section>
</main>
<script src="js/data.js"></script>
<script src="js/calculator.js"></script>
<script src="js/rankings.js"></script>
<script src="js/map.js"></script>
<script src="js/detail.js"></script>
<script src="js/app.js"></script>
```

#### CSS file structure (`styles.css`)
One file, split into clearly labelled blocks — each dev only edits their block:
```css
/* === SHARED: Reset, variables, layout, header === */
/* === DEV A: Rankings & Calculator === */
/* === DEV B: Map, Detail & Comparison === */
```

#### CSS custom properties (shared variables — Dev A defines, Dev B uses)
```css
--color-accent: #F5A623;
--color-bg: #f4f4f4;
--color-header: #1a1a2e;
--color-card: #ffffff;
--color-good-roi: #2ecc71;
--color-bad-roi: #e74c3c;
```

#### Location data shape (defined in `data.js` by Dev A)
Dev B writes `map.js` and `detail.js` against this shape — do not change field names after agreement.

---

### `app.js` — Written Last, By Both Together

Kept intentionally minimal — just wires the two modules together:
```js
document.addEventListener('DOMContentLoaded', () => {
  initRankings();   // defined in rankings.js
  initMap();        // defined in map.js
  initDetail();     // defined in detail.js
});
```

---

## Key Files to Build (in order)

**Phase 1 — Parallel (no dependencies between devs):**
- Dev A: `js/data.js`, `js/calculator.js`
- Dev B: `js/map.js` stub with hardcoded test data

**Phase 2 — Dev A unblocks Dev B:**
- Dev A: `js/rankings.js` + CSS block
- Dev B: integrates `window.Calculator` and `window.AppData` into `js/map.js`, builds `js/detail.js`

**Phase 3 — Integration:**
- Both: CSS review pass, `js/app.js`, final `index.html` wiring

---

## Out of Scope (for now)

- Real API integrations (weather, energy prices, land prices)
- User authentication
- Saving/persisting user scenarios
- Mobile app
