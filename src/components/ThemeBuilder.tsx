"use client";

import { useState, useCallback } from "react";
import { DEFAULT_THEME, QlikTheme, themeToQlikJson } from "@/types/theme";

// ── Controls ─────────────────────────────────────────────────

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5">
      <label className="text-sm text-gray-600 flex-1 truncate">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 text-xs text-center border border-gray-300 rounded px-1 py-1 font-mono"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="py-1.5">
      <div className="flex justify-between mb-1">
        <label className="text-sm text-gray-600">{label}</label>
        <span className="text-sm font-medium text-gray-800">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}

// ── SVG Charts ────────────────────────────────────────────────

function BarChart({
  values,
  labels,
  color,
}: {
  values: number[];
  labels: string[];
  color: string;
}) {
  const max = Math.max(...values, 1);
  const barW = 28;
  const gap = 10;
  const chartH = 100;
  const pad = 4;
  const totalW = values.length * (barW + gap) - gap + pad * 2;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${chartH + 28}`}
      className="w-full"
      style={{ maxHeight: 150 }}
    >
      {values.map((v, i) => {
        const h = Math.max(4, (v / max) * chartH);
        const x = pad + i * (barW + gap);
        const y = chartH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} fill={color} rx={2} opacity={0.85} />
            <text
              x={x + barW / 2}
              y={chartH + 16}
              textAnchor="middle"
              fontSize={9}
              fill="currentColor"
              opacity={0.6}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({
  data,
  labels,
  colors,
}: {
  data: number[];
  labels: string[];
  colors: string[];
}) {
  const total = data.reduce((a, b) => a + b, 0);
  const r = 52;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 140 140" style={{ width: 110, height: 110, flexShrink: 0 }}>
        {data.map((v, i) => {
          const pct = v / total;
          const dashlen = Math.max(0, pct * circumference - 2);
          const rotation = -90 + (acc / total) * 360;
          acc += v;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth={24}
              strokeDasharray={`${dashlen} ${circumference}`}
              transform={`rotate(${rotation} ${cx} ${cy})`}
            />
          );
        })}
        <text
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill="currentColor"
        >
          {total}%
        </text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {labels.map((l, i) => (
          <div key={l} className="flex items-center gap-1.5 text-xs">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="opacity-75">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard Preview ─────────────────────────────────────────

function DashboardPreview({ theme }: { theme: QlikTheme }) {
  const kpis = [
    { title: "Total Revenue", value: "€2.4M", change: "+12.4%", positive: true },
    { title: "Active Users", value: "12,847", change: "+5.2%", positive: true },
    { title: "Conversion Rate", value: "3.2%", change: "-0.8%", positive: false },
    { title: "Avg. Order Value", value: "€186", change: "+8.1%", positive: true },
  ];

  const barValues = [65, 82, 57, 91, 74, 88, 53, 79];
  const barLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const donutData = [40, 25, 20, 15];
  const donutLabels = ["Products", "Services", "Licensing", "Other"];

  const panelStyle = {
    backgroundColor: theme.panelColor,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: `${theme.borderRadius}px`,
    padding: `${Math.min(theme.padding, 20)}px`,
  };

  return (
    <div
      className="rounded-xl overflow-hidden shadow-md border border-gray-200"
      style={{
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {/* App header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: theme.headerColor, color: "#FFFFFF" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs font-bold">
            Q
          </div>
          <span className="font-semibold" style={{ fontSize: theme.headerFontSize }}>
            Sales Analytics Dashboard
          </span>
        </div>
        <div className="flex gap-2 text-xs opacity-80">
          <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">Edit</button>
          <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">Share</button>
        </div>
      </div>

      {/* Sheet tabs */}
      <div
        className="flex border-b"
        style={{ backgroundColor: theme.panelColor, borderColor: theme.borderColor }}
      >
        {["Overview", "Sales", "Inventory", "Customers"].map((tab, i) => (
          <div
            key={tab}
            className="px-4 py-2 text-xs cursor-pointer"
            style={{
              borderBottom: i === 0 ? `2px solid ${theme.primaryColor}` : "2px solid transparent",
              color: i === 0 ? theme.primaryColor : theme.textColor,
              opacity: i === 0 ? 1 : 0.6,
              fontSize: theme.fontSize,
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div
        className="flex gap-2 px-3 py-2 items-center border-b"
        style={{ backgroundColor: theme.panelColor, borderColor: theme.borderColor }}
      >
        <span className="text-xs opacity-50" style={{ color: theme.textColor }}>
          Filters:
        </span>
        {["Region: All", "Year: 2024", "Status: Active"].map((f) => (
          <span
            key={f}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${theme.primaryColor}20`,
              color: theme.primaryColor,
              border: `1px solid ${theme.primaryColor}40`,
              fontSize: theme.fontSize - 1,
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Dashboard content */}
      <div className="p-3 flex flex-col gap-3">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((kpi) => (
            <div key={kpi.title} style={panelStyle} className="min-w-0">
              <div
                className="mb-1"
                style={{ fontSize: theme.fontSize - 2, color: theme.textColor, opacity: 0.6 }}
              >
                {kpi.title}
              </div>
              <div
                className="font-bold"
                style={{ fontSize: theme.headerFontSize + 4, color: theme.textColor }}
              >
                {kpi.value}
              </div>
              <div
                className="mt-0.5"
                style={{
                  fontSize: theme.fontSize - 2,
                  color: kpi.positive ? "#28A745" : "#DC3545",
                }}
              >
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-2">
          <div style={panelStyle} className="col-span-2">
            <div
              className="font-medium mb-2"
              style={{ fontSize: theme.fontSize - 1, color: theme.textColor, opacity: 0.7 }}
            >
              Monthly Revenue
            </div>
            <BarChart values={barValues} labels={barLabels} color={theme.chartColors[0]} />
          </div>

          <div style={panelStyle}>
            <div
              className="font-medium mb-2"
              style={{ fontSize: theme.fontSize - 1, color: theme.textColor, opacity: 0.7 }}
            >
              Revenue Mix
            </div>
            <DonutChart data={donutData} labels={donutLabels} colors={theme.chartColors} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ThemeBuilder ─────────────────────────────────────────

export default function ThemeBuilder() {
  const [theme, setTheme] = useState<QlikTheme>(DEFAULT_THEME);
  const [copied, setCopied] = useState(false);

  const update = useCallback((updates: Partial<QlikTheme>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateChartColor = useCallback((index: number, color: string) => {
    setTheme((prev) => {
      const chartColors = [...prev.chartColors];
      chartColors[index] = color;
      return { ...prev, chartColors };
    });
  }, []);

  const exportTheme = useCallback(() => {
    const json = JSON.stringify(themeToQlikJson(theme), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [theme]);

  const copyToClipboard = useCallback(async () => {
    const json = JSON.stringify(themeToQlikJson(theme), null, 2);
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = json;
      textarea.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [theme]);

  const fontOptions = [
    "Arial, sans-serif",
    "Inter, sans-serif",
    "Roboto, sans-serif",
    "'Open Sans', sans-serif",
    "Lato, sans-serif",
    "Georgia, serif",
    "'Times New Roman', serif",
    "'Courier New', monospace",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              Q
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-base leading-tight">
                Qlik Sense Theme Builder
              </h1>
              <p className="text-xs text-gray-400">Design and export custom Qlik Sense themes</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme(DEFAULT_THEME)}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[90px]"
            >
              {copied ? "Copied!" : "Copy JSON"}
            </button>
            <button
              onClick={exportTheme}
              className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Export Theme
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">
          {/* Controls panel */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-4">
            {/* Theme identity */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Theme Identity</h2>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Theme Name</label>
                  <input
                    type="text"
                    value={theme.name}
                    onChange={(e) => update({ name: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Theme ID</label>
                  <input
                    type="text"
                    value={theme.id}
                    onChange={(e) => update({ id: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 font-mono"
                  />
                </div>
              </div>
            </section>

            {/* Colors */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Colors</h2>
              <div className="divide-y divide-gray-100">
                <ColorControl label="Primary" value={theme.primaryColor} onChange={(v) => update({ primaryColor: v })} />
                <ColorControl label="Background" value={theme.backgroundColor} onChange={(v) => update({ backgroundColor: v })} />
                <ColorControl label="Panel" value={theme.panelColor} onChange={(v) => update({ panelColor: v })} />
                <ColorControl label="Header" value={theme.headerColor} onChange={(v) => update({ headerColor: v })} />
                <ColorControl label="Text" value={theme.textColor} onChange={(v) => update({ textColor: v })} />
                <ColorControl label="Accent" value={theme.accentColor} onChange={(v) => update({ accentColor: v })} />
                <ColorControl label="Border" value={theme.borderColor} onChange={(v) => update({ borderColor: v })} />
              </div>
            </section>

            {/* Typography */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Typography</h2>
              <div className="mb-3">
                <label className="text-xs text-gray-500 block mb-1">Font Family</label>
                <select
                  value={theme.fontFamily}
                  onChange={(e) => update({ fontFamily: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white"
                  style={{ fontFamily: theme.fontFamily }}
                >
                  {fontOptions.map((f) => (
                    <option key={f} value={f} style={{ fontFamily: f }}>
                      {f.split(",")[0].replace(/'/g, "")}
                    </option>
                  ))}
                </select>
              </div>
              <SliderControl
                label="Body Font Size"
                value={theme.fontSize}
                min={10}
                max={20}
                unit="px"
                onChange={(v) => update({ fontSize: v })}
              />
              <SliderControl
                label="Header Font Size"
                value={theme.headerFontSize}
                min={12}
                max={32}
                unit="px"
                onChange={(v) => update({ headerFontSize: v })}
              />
            </section>

            {/* Layout */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Layout</h2>
              <SliderControl
                label="Border Radius"
                value={theme.borderRadius}
                min={0}
                max={24}
                unit="px"
                onChange={(v) => update({ borderRadius: v })}
              />
              <SliderControl
                label="Padding"
                value={theme.padding}
                min={4}
                max={32}
                unit="px"
                onChange={(v) => update({ padding: v })}
              />
            </section>

            {/* Chart colors */}
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800 text-sm mb-3">Chart Colors</h2>
              <div className="grid grid-cols-3 gap-2">
                {theme.chartColors.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateChartColor(i, e.target.value)}
                      className="w-full h-9 rounded border border-gray-300 cursor-pointer p-0.5"
                    />
                    <span className="text-xs text-gray-400 font-mono text-center truncate w-full">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Preview + JSON panel */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800 text-sm">Live Preview</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  Qlik Sense Dashboard
                </span>
              </div>
              <DashboardPreview theme={theme} />
            </section>

            <section className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800 text-sm">Theme JSON</h2>
                <button
                  onClick={copyToClipboard}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto max-h-72 font-mono text-gray-700 border border-gray-200">
                {JSON.stringify(themeToQlikJson(theme), null, 2)}
              </pre>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
