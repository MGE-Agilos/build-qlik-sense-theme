# Qlik Sense Theme Builder

A web application for designing and exporting custom Qlik Sense themes. The interface shows a live dashboard preview that updates in real-time as you adjust colors, typography, and layout settings.

**Live app:** https://mge-agilos.github.io/build-qlik-sense-theme/

## Features

- **Live dashboard preview** — changes to colors, fonts, and layout are reflected instantly
- **Clickable dashboard tabs** — Overview, Sales, Inventory, and Customers tabs each show different KPIs and charts
- **Multiple chart types** — bar charts, donut charts, and line charts respond to your theme colors
- **ZIP export** — download a `.zip` containing both `<theme-id>.json` (Qlik Sense theme config) and `<theme-id>.css` (ready-to-use CSS overrides for embedded Qlik Sense apps)
- **JSON export** — download the Qlik Sense-compatible JSON separately
- **Copy JSON** — copy theme config to clipboard
- **Reset** — revert to default theme in one click
- Controls for colors (7 color pickers), typography (font family, body & header size), layout (border radius, padding), and 6 chart data colors

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & Deploy

The app is deployed automatically to GitHub Pages on every push to `main` via the workflow at `.github/workflows/deploy.yml`.

To trigger a manual deployment, go to **Actions → Deploy to GitHub Pages → Run workflow** in the GitHub repository.

To build locally:

```bash
npm run build    # outputs static files to out/
```

The static export is deployed under the `/build-qlik-sense-theme` base path.
