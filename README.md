# Qlik Sense Theme Builder

A web application for designing and exporting custom Qlik Sense themes. The interface shows a live dashboard preview that updates in real-time as you adjust colors, typography, and layout settings.

## Features

- Live dashboard preview with KPI cards, bar chart, and donut chart
- Controls for colors, typography (font family, sizes), layout (border radius, padding), and chart color palette
- Export theme as a Qlik Sense-compatible JSON file or copy to clipboard
- Reset to default theme in one click

## Loading & Resilience

The app initializes with a robust loading flow:

- **30-second timeout** — loading never hangs indefinitely; a timeout screen appears with a clear message
- **Exponential backoff retry** — up to 3 automatic retry attempts (1s → 2s → 4s delays) on transient failures
- **Cancel button** — users can abort loading at any time and trigger a manual retry
- **Console logging** — load start, success, failure, and timing are logged to the browser console (`[ThemeBuilder]` prefix) for debugging

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
NODE_ENV=production npm run build
```

Output is a static export in `out/`, deployed under the `/build-qlik-sense-theme` base path.
