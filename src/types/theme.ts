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
