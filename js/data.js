// js/data.js
// All mocked location data and farm configuration defaults.
// Exposes window.AppData — consumed by calculator.js, rankings.js, map.js, detail.js

window.AppData = {

  locations: [

    // ── Alabama ────────────────────────────────────────────────────────────
    {
      id: 'AL-birmingham', name: 'Birmingham, AL', state: 'Alabama', state_abbr: 'AL', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.9, avg_energy_price_usd_kwh: 0.12, land_cost_usd_acre: 4000, grid_connection_available: true,
      monthly_irradiance:    [3.8, 4.3, 5.1, 5.7, 6.0, 5.8, 5.4, 5.5, 5.2, 4.8, 4.0, 3.5],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.12, 0.13, 0.14, 0.14, 0.14, 0.12, 0.11, 0.11, 0.11]
    },

    // ── Alaska ─────────────────────────────────────────────────────────────
    {
      id: 'AK-anchorage', name: 'Anchorage, AK', state: 'Alaska', state_abbr: 'AK', region: 'Pacific Northwest',
      avg_irradiance_kwh_m2_day: 2.8, avg_energy_price_usd_kwh: 0.24, land_cost_usd_acre: 3000, grid_connection_available: false,
      monthly_irradiance:    [0.7, 1.3, 2.6, 3.9, 4.8, 5.2, 5.0, 4.3, 3.0, 1.6, 0.8, 0.4],
      monthly_energy_prices: [0.25, 0.26, 0.24, 0.23, 0.22, 0.22, 0.23, 0.23, 0.23, 0.24, 0.25, 0.26]
    },

    // ── Arizona ────────────────────────────────────────────────────────────
    {
      id: 'AZ-phoenix', name: 'Phoenix, AZ', state: 'Arizona', state_abbr: 'AZ', region: 'Southwest',
      avg_irradiance_kwh_m2_day: 6.5, avg_energy_price_usd_kwh: 0.12, land_cost_usd_acre: 8000, grid_connection_available: true,
      monthly_irradiance:    [4.8, 5.5, 6.2, 7.1, 7.6, 8.0, 7.7, 7.5, 6.8, 5.9, 4.9, 4.4],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.12, 0.13, 0.15, 0.16, 0.15, 0.13, 0.11, 0.11, 0.11]
    },

    // ── Arkansas ───────────────────────────────────────────────────────────
    {
      id: 'AR-little-rock', name: 'Little Rock, AR', state: 'Arkansas', state_abbr: 'AR', region: 'South Central',
      avg_irradiance_kwh_m2_day: 4.8, avg_energy_price_usd_kwh: 0.09, land_cost_usd_acre: 3500, grid_connection_available: true,
      monthly_irradiance:    [3.7, 4.2, 5.0, 5.7, 6.1, 6.3, 6.1, 5.9, 5.4, 4.8, 3.8, 3.4],
      monthly_energy_prices: [0.09, 0.09, 0.09, 0.09, 0.09, 0.10, 0.10, 0.10, 0.09, 0.09, 0.09, 0.09]
    },

    // ── California ─────────────────────────────────────────────────────────
    {
      id: 'CA-fresno', name: 'Fresno, CA', state: 'California', state_abbr: 'CA', region: 'West',
      avg_irradiance_kwh_m2_day: 5.9, avg_energy_price_usd_kwh: 0.22, land_cost_usd_acre: 15000, grid_connection_available: true,
      monthly_irradiance:    [3.5, 4.2, 5.3, 6.4, 7.4, 8.1, 8.4, 7.9, 6.8, 5.3, 3.8, 3.1],
      monthly_energy_prices: [0.20, 0.20, 0.21, 0.22, 0.23, 0.25, 0.26, 0.25, 0.23, 0.21, 0.20, 0.20]
    },

    // ── Colorado ───────────────────────────────────────────────────────────
    {
      id: 'CO-denver', name: 'Denver, CO', state: 'Colorado', state_abbr: 'CO', region: 'Mountain',
      avg_irradiance_kwh_m2_day: 5.5, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 7000, grid_connection_available: true,
      monthly_irradiance:    [4.0, 4.7, 5.3, 5.9, 6.4, 7.0, 6.8, 6.5, 5.8, 5.0, 3.9, 3.7],
      monthly_energy_prices: [0.13, 0.13, 0.12, 0.12, 0.12, 0.13, 0.14, 0.14, 0.13, 0.12, 0.13, 0.14]
    },

    // ── Connecticut ────────────────────────────────────────────────────────
    {
      id: 'CT-hartford', name: 'Hartford, CT', state: 'Connecticut', state_abbr: 'CT', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.0, avg_energy_price_usd_kwh: 0.21, land_cost_usd_acre: 15000, grid_connection_available: true,
      monthly_irradiance:    [2.6, 3.3, 4.2, 5.1, 5.8, 6.3, 6.4, 5.9, 5.0, 3.9, 2.8, 2.3],
      monthly_energy_prices: [0.22, 0.23, 0.21, 0.20, 0.20, 0.21, 0.22, 0.22, 0.21, 0.20, 0.22, 0.23]
    },

    // ── Delaware ───────────────────────────────────────────────────────────
    {
      id: 'DE-dover', name: 'Dover, DE', state: 'Delaware', state_abbr: 'DE', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.4, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 10000, grid_connection_available: true,
      monthly_irradiance:    [3.0, 3.7, 4.6, 5.4, 6.0, 6.4, 6.3, 5.9, 5.2, 4.3, 3.2, 2.7],
      monthly_energy_prices: [0.13, 0.13, 0.13, 0.13, 0.13, 0.14, 0.14, 0.14, 0.13, 0.13, 0.13, 0.13]
    },

    // ── Florida ────────────────────────────────────────────────────────────
    {
      id: 'FL-orlando', name: 'Orlando, FL', state: 'Florida', state_abbr: 'FL', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 5.2, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 10000, grid_connection_available: true,
      monthly_irradiance:    [4.5, 5.0, 5.6, 6.0, 5.9, 5.4, 5.0, 5.1, 5.3, 5.5, 4.8, 4.3],
      monthly_energy_prices: [0.12, 0.12, 0.12, 0.12, 0.13, 0.15, 0.16, 0.15, 0.13, 0.12, 0.12, 0.12]
    },

    // ── Georgia ────────────────────────────────────────────────────────────
    {
      id: 'GA-savannah', name: 'Savannah, GA', state: 'Georgia', state_abbr: 'GA', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 5.0, avg_energy_price_usd_kwh: 0.12, land_cost_usd_acre: 6000, grid_connection_available: true,
      monthly_irradiance:    [4.2, 4.7, 5.3, 5.8, 5.9, 5.6, 5.3, 5.4, 5.2, 5.0, 4.4, 3.9],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.12, 0.13, 0.14, 0.14, 0.14, 0.12, 0.11, 0.11, 0.11]
    },

    // ── Hawaii ─────────────────────────────────────────────────────────────
    {
      id: 'HI-honolulu', name: 'Honolulu, HI', state: 'Hawaii', state_abbr: 'HI', region: 'Pacific',
      avg_irradiance_kwh_m2_day: 5.7, avg_energy_price_usd_kwh: 0.33, land_cost_usd_acre: 50000, grid_connection_available: true,
      monthly_irradiance:    [5.1, 5.4, 5.8, 6.1, 6.3, 6.2, 6.0, 6.1, 5.9, 5.6, 5.2, 4.9],
      monthly_energy_prices: [0.34, 0.34, 0.33, 0.32, 0.32, 0.33, 0.34, 0.34, 0.33, 0.32, 0.33, 0.34]
    },

    // ── Idaho ──────────────────────────────────────────────────────────────
    {
      id: 'ID-boise', name: 'Boise, ID', state: 'Idaho', state_abbr: 'ID', region: 'Mountain',
      avg_irradiance_kwh_m2_day: 5.0, avg_energy_price_usd_kwh: 0.10, land_cost_usd_acre: 4000, grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.7, 4.8, 5.9, 7.0, 7.9, 8.5, 7.8, 6.3, 4.6, 3.0, 2.5],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.11, 0.11, 0.10, 0.10, 0.10, 0.10]
    },

    // ── Illinois ───────────────────────────────────────────────────────────
    {
      id: 'IL-springfield', name: 'Springfield, IL', state: 'Illinois', state_abbr: 'IL', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.4, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 9000, grid_connection_available: true,
      monthly_irradiance:    [3.0, 3.7, 4.5, 5.3, 6.0, 6.6, 6.7, 6.2, 5.5, 4.5, 3.2, 2.8],
      monthly_energy_prices: [0.13, 0.14, 0.13, 0.12, 0.12, 0.13, 0.14, 0.14, 0.13, 0.12, 0.13, 0.14]
    },

    // ── Indiana ────────────────────────────────────────────────────────────
    {
      id: 'IN-indianapolis', name: 'Indianapolis, IN', state: 'Indiana', state_abbr: 'IN', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.3, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 7000, grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.5, 4.4, 5.2, 5.9, 6.5, 6.6, 6.1, 5.4, 4.4, 3.1, 2.6],
      monthly_energy_prices: [0.13, 0.13, 0.13, 0.12, 0.12, 0.13, 0.14, 0.14, 0.13, 0.12, 0.13, 0.14]
    },

    // ── Iowa ───────────────────────────────────────────────────────────────
    {
      id: 'IA-des-moines', name: 'Des Moines, IA', state: 'Iowa', state_abbr: 'IA', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.5, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 8000, grid_connection_available: true,
      monthly_irradiance:    [3.0, 3.7, 4.6, 5.4, 6.2, 6.8, 7.0, 6.5, 5.6, 4.5, 3.2, 2.7],
      monthly_energy_prices: [0.11, 0.12, 0.11, 0.11, 0.10, 0.10, 0.11, 0.11, 0.10, 0.11, 0.12, 0.12]
    },

    // ── Kansas ─────────────────────────────────────────────────────────────
    {
      id: 'KS-wichita', name: 'Wichita, KS', state: 'Kansas', state_abbr: 'KS', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.9, avg_energy_price_usd_kwh: 0.10, land_cost_usd_acre: 3500, grid_connection_available: true,
      monthly_irradiance:    [3.7, 4.3, 5.0, 5.7, 6.2, 6.8, 6.9, 6.5, 5.7, 4.9, 3.8, 3.4],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.11, 0.11, 0.10, 0.10, 0.10, 0.10]
    },

    // ── Kentucky ───────────────────────────────────────────────────────────
    {
      id: 'KY-louisville', name: 'Louisville, KY', state: 'Kentucky', state_abbr: 'KY', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.5, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 5500, grid_connection_available: true,
      monthly_irradiance:    [3.1, 3.7, 4.5, 5.3, 6.0, 6.5, 6.6, 6.2, 5.5, 4.6, 3.4, 2.9],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.11, 0.11, 0.12, 0.12, 0.12, 0.11, 0.11, 0.11, 0.11]
    },

    // ── Louisiana ──────────────────────────────────────────────────────────
    {
      id: 'LA-new-orleans', name: 'New Orleans, LA', state: 'Louisiana', state_abbr: 'LA', region: 'South Central',
      avg_irradiance_kwh_m2_day: 5.0, avg_energy_price_usd_kwh: 0.09, land_cost_usd_acre: 4500, grid_connection_available: true,
      monthly_irradiance:    [4.0, 4.6, 5.3, 6.0, 6.3, 6.0, 5.6, 5.7, 5.4, 5.2, 4.3, 3.8],
      monthly_energy_prices: [0.09, 0.09, 0.09, 0.09, 0.09, 0.10, 0.10, 0.10, 0.09, 0.09, 0.09, 0.09]
    },

    // ── Maine ──────────────────────────────────────────────────────────────
    {
      id: 'ME-portland', name: 'Portland, ME', state: 'Maine', state_abbr: 'ME', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 3.8, avg_energy_price_usd_kwh: 0.19, land_cost_usd_acre: 4000, grid_connection_available: true,
      monthly_irradiance:    [2.3, 3.0, 4.0, 5.0, 5.8, 6.4, 6.5, 5.9, 4.8, 3.6, 2.4, 2.0],
      monthly_energy_prices: [0.20, 0.21, 0.19, 0.18, 0.18, 0.18, 0.19, 0.19, 0.18, 0.18, 0.20, 0.21]
    },

    // ── Maryland ───────────────────────────────────────────────────────────
    {
      id: 'MD-baltimore', name: 'Baltimore, MD', state: 'Maryland', state_abbr: 'MD', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.5, avg_energy_price_usd_kwh: 0.14, land_cost_usd_acre: 12000, grid_connection_available: true,
      monthly_irradiance:    [3.1, 3.8, 4.7, 5.5, 6.1, 6.5, 6.4, 6.0, 5.3, 4.4, 3.3, 2.8],
      monthly_energy_prices: [0.14, 0.14, 0.14, 0.14, 0.14, 0.15, 0.16, 0.15, 0.14, 0.13, 0.14, 0.14]
    },

    // ── Massachusetts ──────────────────────────────────────────────────────
    {
      id: 'MA-springfield', name: 'Springfield, MA', state: 'Massachusetts', state_abbr: 'MA', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.0, avg_energy_price_usd_kwh: 0.22, land_cost_usd_acre: 12000, grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.5, 4.4, 5.2, 5.8, 6.3, 6.4, 5.9, 5.0, 3.9, 2.8, 2.5],
      monthly_energy_prices: [0.23, 0.24, 0.22, 0.21, 0.21, 0.22, 0.23, 0.23, 0.22, 0.21, 0.23, 0.24]
    },

    // ── Michigan ───────────────────────────────────────────────────────────
    {
      id: 'MI-detroit', name: 'Detroit, MI', state: 'Michigan', state_abbr: 'MI', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.0, avg_energy_price_usd_kwh: 0.17, land_cost_usd_acre: 5000, grid_connection_available: true,
      monthly_irradiance:    [2.4, 3.1, 4.1, 5.0, 5.9, 6.6, 6.7, 6.2, 5.3, 4.0, 2.7, 2.2],
      monthly_energy_prices: [0.17, 0.18, 0.17, 0.16, 0.16, 0.17, 0.18, 0.18, 0.17, 0.16, 0.17, 0.18]
    },

    // ── Minnesota ──────────────────────────────────────────────────────────
    {
      id: 'MN-rochester', name: 'Rochester, MN', state: 'Minnesota', state_abbr: 'MN', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.2, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 4500, grid_connection_available: true,
      monthly_irradiance:    [3.0, 3.7, 4.5, 5.2, 5.8, 6.4, 6.5, 6.0, 5.0, 4.0, 2.9, 2.6],
      monthly_energy_prices: [0.14, 0.14, 0.13, 0.12, 0.12, 0.12, 0.13, 0.13, 0.12, 0.13, 0.14, 0.15]
    },

    // ── Mississippi ────────────────────────────────────────────────────────
    {
      id: 'MS-jackson', name: 'Jackson, MS', state: 'Mississippi', state_abbr: 'MS', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 5.0, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 3500, grid_connection_available: true,
      monthly_irradiance:    [3.9, 4.5, 5.3, 6.0, 6.4, 6.3, 5.9, 6.0, 5.6, 5.2, 4.2, 3.7],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.11, 0.11, 0.12, 0.12, 0.12, 0.11, 0.11, 0.11, 0.11]
    },

    // ── Missouri ───────────────────────────────────────────────────────────
    {
      id: 'MO-kansas-city', name: 'Kansas City, MO', state: 'Missouri', state_abbr: 'MO', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.7, avg_energy_price_usd_kwh: 0.12, land_cost_usd_acre: 5000, grid_connection_available: true,
      monthly_irradiance:    [3.4, 4.0, 4.8, 5.6, 6.2, 6.8, 7.0, 6.6, 5.8, 4.8, 3.6, 3.1],
      monthly_energy_prices: [0.12, 0.12, 0.12, 0.11, 0.11, 0.12, 0.13, 0.13, 0.12, 0.11, 0.12, 0.12]
    },

    // ── Montana ────────────────────────────────────────────────────────────
    {
      id: 'MT-billings', name: 'Billings, MT', state: 'Montana', state_abbr: 'MT', region: 'Mountain',
      avg_irradiance_kwh_m2_day: 4.8, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 3000, grid_connection_available: true,
      monthly_irradiance:    [3.2, 4.0, 5.0, 5.8, 6.5, 7.2, 7.4, 7.0, 5.9, 4.6, 3.2, 2.8],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.10, 0.10, 0.11, 0.12, 0.12, 0.11, 0.10, 0.11, 0.11]
    },

    // ── Nebraska ───────────────────────────────────────────────────────────
    {
      id: 'NE-omaha', name: 'Omaha, NE', state: 'Nebraska', state_abbr: 'NE', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 5.0, avg_energy_price_usd_kwh: 0.10, land_cost_usd_acre: 4000, grid_connection_available: true,
      monthly_irradiance:    [3.5, 4.2, 5.0, 5.8, 6.5, 7.0, 7.3, 6.8, 5.9, 4.9, 3.7, 3.2],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.11, 0.11, 0.10, 0.10, 0.10, 0.10]
    },

    // ── Nevada ─────────────────────────────────────────────────────────────
    {
      id: 'NV-las-vegas', name: 'Las Vegas, NV', state: 'Nevada', state_abbr: 'NV', region: 'Southwest',
      avg_irradiance_kwh_m2_day: 6.3, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 9000, grid_connection_available: true,
      monthly_irradiance:    [4.7, 5.4, 6.2, 7.1, 7.8, 8.2, 8.0, 7.7, 6.9, 5.8, 4.7, 4.2],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.11, 0.12, 0.14, 0.15, 0.14, 0.12, 0.10, 0.10, 0.10]
    },

    // ── New Hampshire ──────────────────────────────────────────────────────
    {
      id: 'NH-manchester', name: 'Manchester, NH', state: 'New Hampshire', state_abbr: 'NH', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 3.9, avg_energy_price_usd_kwh: 0.20, land_cost_usd_acre: 8000, grid_connection_available: true,
      monthly_irradiance:    [2.5, 3.2, 4.2, 5.1, 5.8, 6.4, 6.5, 5.9, 4.9, 3.7, 2.6, 2.1],
      monthly_energy_prices: [0.21, 0.22, 0.20, 0.19, 0.19, 0.19, 0.20, 0.20, 0.19, 0.19, 0.21, 0.22]
    },

    // ── New Jersey ─────────────────────────────────────────────────────────
    {
      id: 'NJ-trenton', name: 'Trenton, NJ', state: 'New Jersey', state_abbr: 'NJ', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.3, avg_energy_price_usd_kwh: 0.17, land_cost_usd_acre: 14000, grid_connection_available: true,
      monthly_irradiance:    [2.9, 3.6, 4.5, 5.3, 6.0, 6.5, 6.5, 6.1, 5.3, 4.3, 3.2, 2.7],
      monthly_energy_prices: [0.17, 0.17, 0.17, 0.16, 0.16, 0.17, 0.18, 0.18, 0.17, 0.16, 0.17, 0.18]
    },

    // ── New Mexico ─────────────────────────────────────────────────────────
    {
      id: 'NM-albuquerque', name: 'Albuquerque, NM', state: 'New Mexico', state_abbr: 'NM', region: 'Southwest',
      avg_irradiance_kwh_m2_day: 6.2, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 5500, grid_connection_available: true,
      monthly_irradiance:    [4.5, 5.2, 6.0, 7.0, 7.5, 7.8, 7.2, 7.0, 6.4, 5.5, 4.6, 4.1],
      monthly_energy_prices: [0.12, 0.12, 0.12, 0.12, 0.13, 0.15, 0.16, 0.15, 0.13, 0.12, 0.12, 0.12]
    },

    // ── New York ───────────────────────────────────────────────────────────
    {
      id: 'NY-albany', name: 'Albany, NY', state: 'New York', state_abbr: 'NY', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.0, avg_energy_price_usd_kwh: 0.20, land_cost_usd_acre: 10000, grid_connection_available: true,
      monthly_irradiance:    [2.6, 3.3, 4.2, 5.1, 5.8, 6.4, 6.5, 5.9, 5.0, 3.9, 2.7, 2.2],
      monthly_energy_prices: [0.21, 0.22, 0.20, 0.19, 0.19, 0.20, 0.21, 0.21, 0.20, 0.19, 0.21, 0.22]
    },

    // ── North Carolina ─────────────────────────────────────────────────────
    {
      id: 'NC-raleigh', name: 'Raleigh, NC', state: 'North Carolina', state_abbr: 'NC', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.7, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 7500, grid_connection_available: true,
      monthly_irradiance:    [3.8, 4.3, 5.0, 5.5, 5.7, 5.8, 5.5, 5.4, 5.0, 4.6, 4.0, 3.5],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.11, 0.11, 0.12, 0.12, 0.12, 0.11, 0.11, 0.11, 0.11]
    },

    // ── North Dakota ───────────────────────────────────────────────────────
    {
      id: 'ND-bismarck', name: 'Bismarck, ND', state: 'North Dakota', state_abbr: 'ND', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.5, avg_energy_price_usd_kwh: 0.10, land_cost_usd_acre: 3000, grid_connection_available: true,
      monthly_irradiance:    [3.0, 3.8, 4.7, 5.5, 6.2, 6.8, 7.0, 6.5, 5.5, 4.3, 3.0, 2.6],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10]
    },

    // ── Ohio ───────────────────────────────────────────────────────────────
    {
      id: 'OH-columbus', name: 'Columbus, OH', state: 'Ohio', state_abbr: 'OH', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.0, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 7000, grid_connection_available: true,
      monthly_irradiance:    [2.6, 3.3, 4.2, 5.0, 5.8, 6.4, 6.5, 6.0, 5.2, 4.1, 2.9, 2.4],
      monthly_energy_prices: [0.13, 0.13, 0.13, 0.12, 0.12, 0.13, 0.14, 0.14, 0.13, 0.12, 0.13, 0.13]
    },

    // ── Oklahoma ───────────────────────────────────────────────────────────
    {
      id: 'OK-oklahoma-city', name: 'Oklahoma City, OK', state: 'Oklahoma', state_abbr: 'OK', region: 'South Central',
      avg_irradiance_kwh_m2_day: 5.2, avg_energy_price_usd_kwh: 0.09, land_cost_usd_acre: 3500, grid_connection_available: true,
      monthly_irradiance:    [4.0, 4.6, 5.3, 6.0, 6.5, 7.0, 7.1, 6.8, 6.0, 5.3, 4.2, 3.8],
      monthly_energy_prices: [0.09, 0.09, 0.09, 0.09, 0.09, 0.10, 0.10, 0.10, 0.09, 0.09, 0.09, 0.09]
    },

    // ── Oregon ─────────────────────────────────────────────────────────────
    {
      id: 'OR-portland', name: 'Portland, OR', state: 'Oregon', state_abbr: 'OR', region: 'Pacific Northwest',
      avg_irradiance_kwh_m2_day: 4.0, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 7000, grid_connection_available: true,
      monthly_irradiance:    [1.8, 2.6, 3.7, 4.8, 5.9, 6.7, 7.3, 6.7, 5.5, 3.8, 2.2, 1.7],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.10, 0.10, 0.10, 0.11, 0.11, 0.10, 0.11, 0.11, 0.11]
    },

    // ── Pennsylvania ───────────────────────────────────────────────────────
    {
      id: 'PA-philadelphia', name: 'Philadelphia, PA', state: 'Pennsylvania', state_abbr: 'PA', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.2, avg_energy_price_usd_kwh: 0.15, land_cost_usd_acre: 8000, grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.5, 4.4, 5.3, 6.0, 6.5, 6.5, 6.0, 5.2, 4.2, 3.0, 2.5],
      monthly_energy_prices: [0.15, 0.16, 0.15, 0.14, 0.14, 0.15, 0.16, 0.16, 0.15, 0.14, 0.15, 0.16]
    },

    // ── Rhode Island ───────────────────────────────────────────────────────
    {
      id: 'RI-providence', name: 'Providence, RI', state: 'Rhode Island', state_abbr: 'RI', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.1, avg_energy_price_usd_kwh: 0.20, land_cost_usd_acre: 16000, grid_connection_available: true,
      monthly_irradiance:    [2.7, 3.4, 4.3, 5.2, 5.9, 6.4, 6.5, 6.0, 5.1, 4.0, 2.8, 2.3],
      monthly_energy_prices: [0.21, 0.22, 0.20, 0.19, 0.19, 0.20, 0.21, 0.21, 0.20, 0.19, 0.21, 0.22]
    },

    // ── South Carolina ─────────────────────────────────────────────────────
    {
      id: 'SC-columbia', name: 'Columbia, SC', state: 'South Carolina', state_abbr: 'SC', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 5.0, avg_energy_price_usd_kwh: 0.12, land_cost_usd_acre: 5500, grid_connection_available: true,
      monthly_irradiance:    [4.0, 4.6, 5.3, 5.9, 6.1, 5.9, 5.5, 5.6, 5.3, 5.0, 4.3, 3.8],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.12, 0.13, 0.14, 0.14, 0.14, 0.12, 0.11, 0.11, 0.11]
    },

    // ── South Dakota ───────────────────────────────────────────────────────
    {
      id: 'SD-sioux-falls', name: 'Sioux Falls, SD', state: 'South Dakota', state_abbr: 'SD', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.8, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 2500, grid_connection_available: true,
      monthly_irradiance:    [3.2, 4.0, 4.8, 5.6, 6.3, 6.9, 7.2, 6.7, 5.7, 4.6, 3.3, 2.8],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11]
    },

    // ── Tennessee ──────────────────────────────────────────────────────────
    {
      id: 'TN-nashville', name: 'Nashville, TN', state: 'Tennessee', state_abbr: 'TN', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.8, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 6000, grid_connection_available: true,
      monthly_irradiance:    [3.6, 4.1, 5.0, 5.7, 6.2, 6.5, 6.4, 6.3, 5.7, 5.0, 3.9, 3.4],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.11, 0.11, 0.12, 0.12, 0.12, 0.11, 0.11, 0.11, 0.11]
    },

    // ── Texas ──────────────────────────────────────────────────────────────
    {
      id: 'TX-midland', name: 'Midland, TX', state: 'Texas', state_abbr: 'TX', region: 'South Central',
      avg_irradiance_kwh_m2_day: 5.8, avg_energy_price_usd_kwh: 0.09, land_cost_usd_acre: 4000, grid_connection_available: true,
      monthly_irradiance:    [4.5, 5.1, 5.8, 6.5, 7.0, 7.3, 7.1, 6.9, 6.2, 5.5, 4.6, 4.2],
      monthly_energy_prices: [0.08, 0.08, 0.09, 0.09, 0.10, 0.11, 0.11, 0.11, 0.09, 0.08, 0.08, 0.08]
    },

    // ── Utah ───────────────────────────────────────────────────────────────
    {
      id: 'UT-salt-lake-city', name: 'Salt Lake City, UT', state: 'Utah', state_abbr: 'UT', region: 'Mountain',
      avg_irradiance_kwh_m2_day: 5.8, avg_energy_price_usd_kwh: 0.11, land_cost_usd_acre: 5000, grid_connection_available: true,
      monthly_irradiance:    [3.9, 4.8, 5.8, 6.6, 7.3, 7.9, 7.8, 7.4, 6.5, 5.3, 3.9, 3.4],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.10, 0.10, 0.11, 0.12, 0.12, 0.11, 0.10, 0.11, 0.11]
    },

    // ── Vermont ────────────────────────────────────────────────────────────
    {
      id: 'VT-burlington', name: 'Burlington, VT', state: 'Vermont', state_abbr: 'VT', region: 'Northeast',
      avg_irradiance_kwh_m2_day: 3.8, avg_energy_price_usd_kwh: 0.20, land_cost_usd_acre: 7000, grid_connection_available: true,
      monthly_irradiance:    [2.4, 3.1, 4.1, 5.0, 5.7, 6.3, 6.4, 5.8, 4.8, 3.6, 2.4, 2.0],
      monthly_energy_prices: [0.21, 0.22, 0.20, 0.19, 0.19, 0.19, 0.20, 0.20, 0.19, 0.19, 0.21, 0.22]
    },

    // ── Virginia ───────────────────────────────────────────────────────────
    {
      id: 'VA-richmond', name: 'Richmond, VA', state: 'Virginia', state_abbr: 'VA', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.6, avg_energy_price_usd_kwh: 0.13, land_cost_usd_acre: 8000, grid_connection_available: true,
      monthly_irradiance:    [3.2, 3.9, 4.8, 5.5, 6.0, 6.4, 6.2, 5.9, 5.3, 4.5, 3.5, 3.0],
      monthly_energy_prices: [0.13, 0.13, 0.13, 0.12, 0.12, 0.13, 0.14, 0.14, 0.13, 0.12, 0.13, 0.14]
    },

    // ── Washington ─────────────────────────────────────────────────────────
    {
      id: 'WA-seattle', name: 'Seattle, WA', state: 'Washington', state_abbr: 'WA', region: 'Pacific Northwest',
      avg_irradiance_kwh_m2_day: 3.8, avg_energy_price_usd_kwh: 0.10, land_cost_usd_acre: 8000, grid_connection_available: true,
      monthly_irradiance:    [1.7, 2.4, 3.5, 4.6, 5.7, 6.4, 7.0, 6.4, 5.1, 3.3, 1.9, 1.5],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10]
    },

    // ── West Virginia ──────────────────────────────────────────────────────
    {
      id: 'WV-charleston', name: 'Charleston, WV', state: 'West Virginia', state_abbr: 'WV', region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.2, avg_energy_price_usd_kwh: 0.12, land_cost_usd_acre: 3500, grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.4, 4.2, 5.0, 5.7, 6.1, 6.2, 5.8, 5.1, 4.2, 3.0, 2.5],
      monthly_energy_prices: [0.12, 0.12, 0.12, 0.11, 0.11, 0.12, 0.13, 0.13, 0.12, 0.11, 0.12, 0.12]
    },

    // ── Wisconsin ──────────────────────────────────────────────────────────
    {
      id: 'WI-madison', name: 'Madison, WI', state: 'Wisconsin', state_abbr: 'WI', region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.2, avg_energy_price_usd_kwh: 0.14, land_cost_usd_acre: 5500, grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.5, 4.4, 5.3, 6.0, 6.7, 6.8, 6.2, 5.2, 4.1, 2.9, 2.4],
      monthly_energy_prices: [0.15, 0.15, 0.14, 0.13, 0.13, 0.13, 0.14, 0.14, 0.13, 0.13, 0.14, 0.15]
    },

    // ── Wyoming ────────────────────────────────────────────────────────────
    {
      id: 'WY-cheyenne', name: 'Cheyenne, WY', state: 'Wyoming', state_abbr: 'WY', region: 'Mountain',
      avg_irradiance_kwh_m2_day: 5.3, avg_energy_price_usd_kwh: 0.10, land_cost_usd_acre: 2500, grid_connection_available: true,
      monthly_irradiance:    [4.0, 4.8, 5.5, 6.0, 6.5, 7.2, 7.1, 6.8, 6.0, 5.1, 3.9, 3.6],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10]
    }

  ],

  defaultConfig: {
    panels: 10000,
    panel_price_usd: 250,
    panel_efficiency: 0.20,
    panel_area_m2: 1.7,
    annual_opex_usd: 50000
  }

};
