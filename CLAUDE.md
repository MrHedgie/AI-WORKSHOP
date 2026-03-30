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
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── data.js         # Mocked data (locations, prices, weather)
│   ├── calculator.js   # Profitability calculation logic
│   ├── map.js          # US map rendering / location visualization
│   └── app.js          # Main app logic, UI interactions
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

## Key Files to Build (in order)

1. `js/data.js` — mock data for all locations
2. `js/calculator.js` — profitability formulas
3. `index.html` — layout skeleton with all sections
4. `css/styles.css` — full styles
5. `js/map.js` — SVG map interaction
6. `js/app.js` — tie everything together

---

## Out of Scope (for now)

- Real API integrations (weather, energy prices, land prices)
- User authentication
- Saving/persisting user scenarios
- Mobile app
