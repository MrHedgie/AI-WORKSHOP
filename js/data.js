// js/data.js
// All mocked location data and farm configuration defaults.
// Exposes window.AppData — consumed by calculator.js, rankings.js, map.js, detail.js

window.AppData = {

  locations: [
    {
      id: 'AZ-phoenix',
      name: 'Phoenix, AZ',
      state: 'Arizona',
      state_abbr: 'AZ',
      region: 'Southwest',
      avg_irradiance_kwh_m2_day: 6.5,
      avg_energy_price_usd_kwh: 0.12,
      land_cost_usd_acre: 8000,
      grid_connection_available: true,
      monthly_irradiance:    [4.8, 5.5, 6.2, 7.1, 7.6, 8.0, 7.7, 7.5, 6.8, 5.9, 4.9, 4.4],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.12, 0.13, 0.15, 0.16, 0.15, 0.13, 0.11, 0.11, 0.11]
    },
    {
      id: 'NM-albuquerque',
      name: 'Albuquerque, NM',
      state: 'New Mexico',
      state_abbr: 'NM',
      region: 'Southwest',
      avg_irradiance_kwh_m2_day: 6.2,
      avg_energy_price_usd_kwh: 0.13,
      land_cost_usd_acre: 5500,
      grid_connection_available: true,
      monthly_irradiance:    [4.5, 5.2, 6.0, 7.0, 7.5, 7.8, 7.2, 7.0, 6.4, 5.5, 4.6, 4.1],
      monthly_energy_prices: [0.12, 0.12, 0.12, 0.12, 0.13, 0.15, 0.16, 0.15, 0.13, 0.12, 0.12, 0.12]
    },
    {
      id: 'NV-las-vegas',
      name: 'Las Vegas, NV',
      state: 'Nevada',
      state_abbr: 'NV',
      region: 'Southwest',
      avg_irradiance_kwh_m2_day: 6.3,
      avg_energy_price_usd_kwh: 0.11,
      land_cost_usd_acre: 9000,
      grid_connection_available: true,
      monthly_irradiance:    [4.7, 5.4, 6.2, 7.1, 7.8, 8.2, 8.0, 7.7, 6.9, 5.8, 4.7, 4.2],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.11, 0.12, 0.14, 0.15, 0.14, 0.12, 0.10, 0.10, 0.10]
    },
    {
      id: 'TX-midland',
      name: 'Midland, TX',
      state: 'Texas',
      state_abbr: 'TX',
      region: 'South Central',
      avg_irradiance_kwh_m2_day: 5.8,
      avg_energy_price_usd_kwh: 0.09,
      land_cost_usd_acre: 4000,
      grid_connection_available: true,
      monthly_irradiance:    [4.5, 5.1, 5.8, 6.5, 7.0, 7.3, 7.1, 6.9, 6.2, 5.5, 4.6, 4.2],
      monthly_energy_prices: [0.08, 0.08, 0.09, 0.09, 0.10, 0.11, 0.11, 0.11, 0.09, 0.08, 0.08, 0.08]
    },
    {
      id: 'CA-fresno',
      name: 'Fresno, CA',
      state: 'California',
      state_abbr: 'CA',
      region: 'West',
      avg_irradiance_kwh_m2_day: 5.9,
      avg_energy_price_usd_kwh: 0.22,
      land_cost_usd_acre: 15000,
      grid_connection_available: true,
      monthly_irradiance:    [3.5, 4.2, 5.3, 6.4, 7.4, 8.1, 8.4, 7.9, 6.8, 5.3, 3.8, 3.1],
      monthly_energy_prices: [0.20, 0.20, 0.21, 0.22, 0.23, 0.25, 0.26, 0.25, 0.23, 0.21, 0.20, 0.20]
    },
    {
      id: 'CO-denver',
      name: 'Denver, CO',
      state: 'Colorado',
      state_abbr: 'CO',
      region: 'Mountain',
      avg_irradiance_kwh_m2_day: 5.5,
      avg_energy_price_usd_kwh: 0.13,
      land_cost_usd_acre: 7000,
      grid_connection_available: true,
      monthly_irradiance:    [4.0, 4.7, 5.3, 5.9, 6.4, 7.0, 6.8, 6.5, 5.8, 5.0, 3.9, 3.7],
      monthly_energy_prices: [0.13, 0.13, 0.12, 0.12, 0.12, 0.13, 0.14, 0.14, 0.13, 0.12, 0.13, 0.14]
    },
    {
      id: 'FL-orlando',
      name: 'Orlando, FL',
      state: 'Florida',
      state_abbr: 'FL',
      region: 'Southeast',
      avg_irradiance_kwh_m2_day: 5.2,
      avg_energy_price_usd_kwh: 0.13,
      land_cost_usd_acre: 10000,
      grid_connection_available: true,
      monthly_irradiance:    [4.5, 5.0, 5.6, 6.0, 5.9, 5.4, 5.0, 5.1, 5.3, 5.5, 4.8, 4.3],
      monthly_energy_prices: [0.12, 0.12, 0.12, 0.12, 0.13, 0.15, 0.16, 0.15, 0.13, 0.12, 0.12, 0.12]
    },
    {
      id: 'GA-savannah',
      name: 'Savannah, GA',
      state: 'Georgia',
      state_abbr: 'GA',
      region: 'Southeast',
      avg_irradiance_kwh_m2_day: 5.0,
      avg_energy_price_usd_kwh: 0.12,
      land_cost_usd_acre: 6000,
      grid_connection_available: true,
      monthly_irradiance:    [4.2, 4.7, 5.3, 5.8, 5.9, 5.6, 5.3, 5.4, 5.2, 5.0, 4.4, 3.9],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.12, 0.13, 0.14, 0.14, 0.14, 0.12, 0.11, 0.11, 0.11]
    },
    {
      id: 'NC-raleigh',
      name: 'Raleigh, NC',
      state: 'North Carolina',
      state_abbr: 'NC',
      region: 'Southeast',
      avg_irradiance_kwh_m2_day: 4.7,
      avg_energy_price_usd_kwh: 0.11,
      land_cost_usd_acre: 7500,
      grid_connection_available: true,
      monthly_irradiance:    [3.8, 4.3, 5.0, 5.5, 5.7, 5.8, 5.5, 5.4, 5.0, 4.6, 4.0, 3.5],
      monthly_energy_prices: [0.11, 0.11, 0.11, 0.11, 0.11, 0.12, 0.12, 0.12, 0.11, 0.11, 0.11, 0.11]
    },
    {
      id: 'KS-wichita',
      name: 'Wichita, KS',
      state: 'Kansas',
      state_abbr: 'KS',
      region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.9,
      avg_energy_price_usd_kwh: 0.10,
      land_cost_usd_acre: 3500,
      grid_connection_available: true,
      monthly_irradiance:    [3.7, 4.3, 5.0, 5.7, 6.2, 6.8, 6.9, 6.5, 5.7, 4.9, 3.8, 3.4],
      monthly_energy_prices: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.11, 0.11, 0.10, 0.10, 0.10, 0.10]
    },
    {
      id: 'MN-rochester',
      name: 'Rochester, MN',
      state: 'Minnesota',
      state_abbr: 'MN',
      region: 'Midwest',
      avg_irradiance_kwh_m2_day: 4.2,
      avg_energy_price_usd_kwh: 0.13,
      land_cost_usd_acre: 4500,
      grid_connection_available: true,
      monthly_irradiance:    [3.0, 3.7, 4.5, 5.2, 5.8, 6.4, 6.5, 6.0, 5.0, 4.0, 2.9, 2.6],
      monthly_energy_prices: [0.14, 0.14, 0.13, 0.12, 0.12, 0.12, 0.13, 0.13, 0.12, 0.13, 0.14, 0.15]
    },
    {
      id: 'MA-springfield',
      name: 'Springfield, MA',
      state: 'Massachusetts',
      state_abbr: 'MA',
      region: 'Northeast',
      avg_irradiance_kwh_m2_day: 4.0,
      avg_energy_price_usd_kwh: 0.22,
      land_cost_usd_acre: 12000,
      grid_connection_available: true,
      monthly_irradiance:    [2.8, 3.5, 4.4, 5.2, 5.8, 6.3, 6.4, 5.9, 5.0, 3.9, 2.8, 2.5],
      monthly_energy_prices: [0.23, 0.24, 0.22, 0.21, 0.21, 0.22, 0.23, 0.23, 0.22, 0.21, 0.23, 0.24]
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
