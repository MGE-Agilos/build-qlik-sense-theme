# Qlik Sense Theme Builder

A web application for designing and exporting custom Qlik Sense themes. The interface shows a live dashboard preview that updates in real-time as you adjust colors, typography, and layout settings.

**Live app:** https://mge-agilos.github.io/build-qlik-sense-theme/

## Features

- Live dashboard preview with KPI cards, bar chart, and donut chart
- Controls for colors, typography (font family, sizes), layout (border radius, padding), and chart color palette
- Export theme as a Qlik Sense-compatible JSON file or copy to clipboard
- Reset to default theme in one click

## Loading & Resilience

- **10-second timeout** — loading never hangs; a timeout screen appears with a clear message
- **Exponential backoff retry** — up to 3 automatic retry attempts (1s → 2s → 4s delays) on transient failures
- **Cancel button** — users can abort loading at any time and trigger a manual retry
- **Console logging** — load start, success, failure, and timing are logged under `[ThemeBuilder]` prefix

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
