export interface QlikTheme {
  id: string;
  name: string;
  primaryColor: string;
  backgroundColor: string;
  panelColor: string;
  headerColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  fontFamily: string;
  fontSize: number;
  headerFontSize: number;
  borderRadius: number;
  padding: number;
  chartColors: string[];
}

export const DEFAULT_THEME: QlikTheme = {
  id: "custom-theme",
  name: "My Custom Theme",
  primaryColor: "#0066CC",
  backgroundColor: "#F0F4F8",
  panelColor: "#FFFFFF",
  headerColor: "#003366",
  textColor: "#333333",
  accentColor: "#FF6B35",
  borderColor: "#DDDDDD",
  fontFamily: "Arial, sans-serif",
  fontSize: 13,
  headerFontSize: 16,
  borderRadius: 6,
  padding: 16,
  chartColors: ["#0066CC", "#FF6B35", "#28A745", "#DC3545", "#FFC107", "#17A2B8"],
};

export interface ThemePreset {
  key: string;
  label: string;
  swatch: string;
  theme: QlikTheme;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    key: "corporate",
    label: "Corporate",
    swatch: "#003366",
    theme: { ...DEFAULT_THEME },
  },
  {
    key: "dark",
    label: "Dark",
    swatch: "#1E1E2E",
    theme: {
      id: "dark-theme",
      name: "Dark Theme",
      primaryColor: "#7C3AED",
      backgroundColor: "#0F0F1A",
      panelColor: "#1E1E2E",
      headerColor: "#7C3AED",
      textColor: "#E2E8F0",
      accentColor: "#F472B6",
      borderColor: "#334155",
      fontFamily: "Inter, sans-serif",
      fontSize: 13,
      headerFontSize: 16,
      borderRadius: 8,
      padding: 16,
      chartColors: ["#7C3AED", "#F472B6", "#34D399", "#FBBF24", "#60A5FA", "#F87171"],
    },
  },
  {
    key: "emerald",
    label: "Emerald",
    swatch: "#059669",
    theme: {
      id: "emerald-theme",
      name: "Emerald Theme",
      primaryColor: "#059669",
      backgroundColor: "#F0FDF4",
      panelColor: "#FFFFFF",
      headerColor: "#065F46",
      textColor: "#1C1C1C",
      accentColor: "#F59E0B",
      borderColor: "#D1FAE5",
      fontFamily: "Arial, sans-serif",
      fontSize: 13,
      headerFontSize: 16,
      borderRadius: 10,
      padding: 16,
      chartColors: ["#059669", "#F59E0B", "#3B82F6", "#EF4444", "#8B5CF6", "#06B6D4"],
    },
  },
  {
    key: "sunset",
    label: "Sunset",
    swatch: "#DC2626",
    theme: {
      id: "sunset-theme",
      name: "Sunset Theme",
      primaryColor: "#DC2626",
      backgroundColor: "#FFF7ED",
      panelColor: "#FFFFFF",
      headerColor: "#9A3412",
      textColor: "#1C1917",
      accentColor: "#D97706",
      borderColor: "#FED7AA",
      fontFamily: "Georgia, serif",
      fontSize: 13,
      headerFontSize: 16,
      borderRadius: 4,
      padding: 14,
      chartColors: ["#DC2626", "#D97706", "#65A30D", "#0891B2", "#7C3AED", "#DB2777"],
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    swatch: "#18181B",
    theme: {
      id: "minimal-theme",
      name: "Minimal Theme",
      primaryColor: "#18181B",
      backgroundColor: "#FAFAFA",
      panelColor: "#FFFFFF",
      headerColor: "#27272A",
      textColor: "#18181B",
      accentColor: "#3B82F6",
      borderColor: "#E4E4E7",
      fontFamily: "Inter, sans-serif",
      fontSize: 12,
      headerFontSize: 14,
      borderRadius: 2,
      padding: 12,
      chartColors: ["#18181B", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    },
  },
];

export function themeToQlikJson(theme: QlikTheme): Record<string, unknown> {
  return {
    id: theme.id,
    name: theme.name,
    type: "other",
    themes: [
      {
        baseId: "sense",
        input: {
          text: {
            fontFamily: theme.fontFamily,
            fontSize: `${theme.fontSize}px`,
            color: theme.textColor,
          },
          header: {
            fontSize: `${theme.headerFontSize}px`,
            fontFamily: theme.fontFamily,
          },
        },
      },
    ],
    properties: {
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,
      fontFamily: theme.fontFamily,
      fontSize: `${theme.fontSize}px`,
      primaryColor: theme.primaryColor,
      accentColor: theme.accentColor,
      selections: {
        activeSelectionColor: theme.primaryColor,
        alternativeColor: theme.accentColor,
      },
      object: {
        backgroundColor: theme.panelColor,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: `${theme.borderRadius}px`,
        padding: `${theme.padding}px`,
        header: {
          backgroundColor: theme.headerColor,
          color: "#FFFFFF",
          fontSize: `${theme.headerFontSize}px`,
        },
      },
      dataColors: {
        primaryColor: theme.primaryColor,
        others: theme.chartColors,
      },
    },
  };
}

export function themeToCSS(theme: QlikTheme): string {
  const chartColorVars = theme.chartColors
    .map((c, i) => `  --qs-chart-${i + 1}: ${c};`)
    .join("\n");

  const chartSeriesRules = theme.chartColors
    .map(
      (c, i) =>
        `.qv-series-color-${i},\n.qv-pie-slice-${i} { color: ${c}; fill: ${c}; stroke: ${c}; }`
    )
    .join("\n");

  return `/* =====================================================
 * Qlik Sense Theme: ${theme.name}
 * ID: ${theme.id}
 * Generated by Qlik Sense Theme Builder
 * ===================================================== */

/* ── CSS Custom Properties ─────────────────────────── */
:root {
  --qs-primary:         ${theme.primaryColor};
  --qs-background:      ${theme.backgroundColor};
  --qs-panel:           ${theme.panelColor};
  --qs-header:          ${theme.headerColor};
  --qs-text:            ${theme.textColor};
  --qs-accent:          ${theme.accentColor};
  --qs-border:          ${theme.borderColor};
  --qs-font:            ${theme.fontFamily};
  --qs-font-size:       ${theme.fontSize}px;
  --qs-header-font-size:${theme.headerFontSize}px;
  --qs-border-radius:   ${theme.borderRadius}px;
  --qs-padding:         ${theme.padding}px;
${chartColorVars}
}

/* ── Global / Client ───────────────────────────────── */
.qv-client {
  font-family: var(--qs-font);
  font-size:   var(--qs-font-size);
  color:       var(--qs-text);
  background-color: var(--qs-background);
}

/* ── Toolbar / App header ──────────────────────────── */
.qv-toolbar,
.qv-app-header,
.qv-header-bar {
  background-color: var(--qs-header);
  color: #ffffff;
  font-size: var(--qs-header-font-size);
  font-family: var(--qs-font);
}

/* ── Sheet tabs / Navigation ───────────────────────── */
.qv-sheet-tab {
  font-family: var(--qs-font);
  font-size:   var(--qs-font-size);
  color:       var(--qs-text);
}
.qv-sheet-tab.active,
.qv-sheet-tab:focus {
  color:        var(--qs-primary);
  border-bottom: 2px solid var(--qs-primary);
}

/* ── Filter / Toolbar bar ──────────────────────────── */
.qv-filterpane,
.qv-toolbar-filter-bar {
  background-color: var(--qs-panel);
  border-bottom: 1px solid var(--qs-border);
}
.qv-field-title,
.qv-filterpane-title {
  color: var(--qs-primary);
  font-size: var(--qs-font-size);
}

/* ── Panels / Objects ──────────────────────────────── */
.qv-object-wrapper,
.qv-inner-object,
.qv-object {
  background-color: var(--qs-panel);
  border: 1px solid var(--qs-border);
  border-radius: var(--qs-border-radius);
  padding: var(--qs-padding);
}

/* ── Object headers ────────────────────────────────── */
.qv-object-title,
.qv-object .qv-title {
  font-family: var(--qs-font);
  font-size:   var(--qs-header-font-size);
  color:       var(--qs-text);
}

/* ── Selections / Listboxes ────────────────────────── */
.qv-listbox-value.qv-listbox-selected,
.qv-listbox-value[aria-selected="true"] {
  background-color: var(--qs-primary);
  color: #ffffff;
}
.qv-listbox-value.qv-listbox-alternative {
  background-color: var(--qs-accent);
  color: #ffffff;
}
.qv-listbox-value.qv-listbox-excluded {
  opacity: 0.4;
}

/* ── Buttons / Actions ─────────────────────────────── */
.qv-button,
.qv-action-button {
  background-color: var(--qs-primary);
  color: #ffffff;
  border-radius: var(--qs-border-radius);
  font-family: var(--qs-font);
  font-size: var(--qs-font-size);
  border: none;
  padding: 6px 14px;
  cursor: pointer;
}
.qv-button:hover,
.qv-action-button:hover {
  filter: brightness(1.1);
}

/* ── KPI / Text objects ────────────────────────────── */
.qv-object-kpi .kpi-value,
.qv-object-kpi .actual-label {
  color: var(--qs-text);
  font-size: var(--qs-header-font-size);
  font-family: var(--qs-font);
}

/* ── Data / Chart colors ───────────────────────────── */
${chartSeriesRules}

/* ── Scrollbars ────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--qs-background); }
::-webkit-scrollbar-thumb {
  background: var(--qs-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover { background: var(--qs-primary); }
`;
}
