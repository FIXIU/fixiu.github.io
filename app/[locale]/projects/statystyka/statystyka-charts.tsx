"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  ComposedChart,
  Customized,
} from "recharts";

const AMBER = "#d97706";
const AMBER_SOFT = "rgba(217, 119, 6, 0.25)";
const AXIS_STROKE = "var(--stat-axis)";
export const INITIAL_DATA: number[] = [
  12, 18, 21, 22, 24, 25, 26, 28, 30, 31, 33, 35, 36, 38, 40, 42, 44, 46,
  47, 49, 50, 52, 54, 55, 57, 59, 62, 65, 68, 72,
];

const tooltipStyles = {
  contentStyle: {
    background: "var(--stat-tooltip-bg)",
    border: "1px solid var(--stat-border)",
    borderRadius: "12px",
    color: "var(--stat-tooltip-text)",
  },
  labelStyle: { color: "var(--stat-tooltip-text)", fontWeight: 700 },
  itemStyle: { color: "var(--stat-tooltip-text)" },
};

type ChartCardProps = {
  title: string;
  description: string;
  footer?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

type ChartProps = {
  data: number[];
  onRandomize?: () => void;
};

type BoxplotMetrics = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type ViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const randomNormal = (mean: number, deviation: number) => {
  const u = 1 - Math.random();
  const v = Math.random();
  const value =
    Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * deviation +
    mean;
  return value;
};

export const randomizeData = (count = INITIAL_DATA.length) => {
  return Array.from({ length: count }, () =>
    Math.round(clamp(randomNormal(45, 12), 8, 82)),
  );
};

const median = (sorted: number[]) => {
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

const quartiles = (values: number[]): BoxplotMetrics => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const lower = sorted.slice(0, mid);
  const upper = sorted.slice(sorted.length % 2 === 0 ? mid : mid + 1);
  return {
    min: sorted[0],
    q1: median(lower),
    median: median(sorted),
    q3: median(upper),
    max: sorted[sorted.length - 1],
  };
};

const buildHistogram = (values: number[], binCount = 7) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const step = Math.max(1, Math.ceil(range / binCount));
  const bucketCount = Math.max(1, Math.ceil(range / step));
  const buckets = Array.from({ length: bucketCount }, (_, index) => {
    const from = min + index * step;
    const to = index === bucketCount - 1 ? max : from + step;
    return {
      label: `${from}-${to}`,
      count: 0,
      from,
      to,
    };
  });
  values.forEach((value) => {
    const index = Math.min(bucketCount - 1, Math.floor((value - min) / step));
    buckets[index].count += 1;
  });
  return buckets;
};

const ChartCard = ({ title, description, footer, action, children }: ChartCardProps) => (
  <div className="my-6 rounded-2xl border border-[var(--stat-border)] bg-[var(--stat-card)] px-4 py-5 shadow-inner md:px-6">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h4 className="text-xl font-black text-[var(--stat-text)]">{title}</h4>
        <p className="text-sm text-[var(--stat-muted)]">{description}</p>
      </div>
      {action}
    </div>
    <div className="mt-4 h-72 w-full">{children}</div>
    {footer ? <p className="mt-3 text-xs text-[var(--stat-muted)]">{footer}</p> : null}
  </div>
);

const RandomizeButton = ({ onClick }: { onClick?: () => void }) =>
  onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-amber-500/70 px-4 py-2 text-sm text-amber-700 dark:text-amber-200 transition hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-100"
      aria-label="Wylosuj nowe dane do wykresów"
    >
      Wylosuj nowe dane
    </button>
  ) : null;

const BoxplotOverlay = ({
  viewBox,
  width,
  height,
  offset,
  metrics,
}: {
  viewBox?: ViewBox;
  width?: number;
  height?: number;
  offset?: { left: number; top: number; width: number; height: number };
  metrics: BoxplotMetrics;
}) => {
  const box =
    viewBox ??
    (offset
      ? { x: offset.left, y: offset.top, width: offset.width, height: offset.height }
      : {
          x: 0,
          y: 0,
          width: width ?? 0,
          height: height ?? 0,
        });
  if (!box.width || !box.height) {
    return null;
  }
  const range = metrics.max - metrics.min || 1;
  const scaleY = (value: number) =>
    box.y + (1 - (value - metrics.min) / range) * box.height;

  const centerX = box.x + box.width / 2;
  const boxWidth = Math.min(140, box.width * 0.6);
  const left = centerX - boxWidth / 2;
  const right = centerX + boxWidth / 2;
  const top = scaleY(metrics.q3);
  const bottom = scaleY(metrics.q1);
  const boxHeight = Math.max(2, bottom - top);
  const minY = scaleY(metrics.min);
  const maxY = scaleY(metrics.max);
  const medianY = scaleY(metrics.median);

  return (
    <g>
      <line x1={centerX} x2={centerX} y1={maxY} y2={minY} stroke={AXIS_STROKE} />
      <line x1={left} x2={right} y1={maxY} y2={maxY} stroke={AXIS_STROKE} />
      <line x1={left} x2={right} y1={minY} y2={minY} stroke={AXIS_STROKE} />
      <rect
        x={left}
        y={top}
        width={boxWidth}
        height={boxHeight}
        fill={AMBER_SOFT}
        stroke={AMBER}
        strokeWidth={1.5}
        rx={6}
      />
      <line
        x1={left}
        x2={right}
        y1={medianY}
        y2={medianY}
        stroke="#fbbf24"
        strokeWidth={2}
      />
    </g>
  );
};

export const HistogramCard = ({ data, onRandomize }: ChartProps) => {
  const histogram = useMemo(() => buildHistogram(data), [data]);
  return (
    <ChartCard
      title="Histogram liczebności"
      description="Rozkład danych w przedziałach, by zobaczyć, gdzie skupiają się wartości."
      footer={`Próba N = ${data.length}.`}
      action={<RandomizeButton onClick={onRandomize} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={histogram} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <CartesianGrid stroke="var(--stat-grid)" strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <YAxis
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <Tooltip {...tooltipStyles} />
          <Bar dataKey="count" fill={AMBER} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const ScatterCard = ({ data, onRandomize }: ChartProps) => {
  const scatter = useMemo(
    () => data.map((value, index) => ({ index: index + 1, value })),
    [data],
  );
  return (
    <ChartCard
      title="Wykres punktowy rozrzutu"
      description="Każda obserwacja jako punkt, by łatwiej ocenić rozproszenie."
      footer={`Zakres wartości: ${Math.min(...data)}–${Math.max(...data)}.`}
      action={<RandomizeButton onClick={onRandomize} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <CartesianGrid stroke="var(--stat-grid)" strokeDasharray="3 3" />
          <XAxis
            dataKey="index"
            name="Obserwacja"
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <YAxis
            dataKey="value"
            name="Wartość"
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <Tooltip
            {...tooltipStyles}
            formatter={(value: number) => [`${value}`, "Wartość"]}
            labelFormatter={(label) => `Obserwacja ${label}`}
          />
          <Scatter data={scatter} fill={AMBER} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const BoxplotCard = ({ data, onRandomize }: ChartProps) => {
  const metrics = useMemo(() => quartiles(data), [data]);
  return (
    <ChartCard
      title="Boxplot i kwartyle"
      description="Min, kwartyle i mediana pokazują, gdzie mieści się środek danych."
      footer={`Min ${metrics.min} · Q1 ${metrics.q1} · Mediana ${metrics.median} · Q3 ${metrics.q3} · Max ${metrics.max}`}
      action={<RandomizeButton onClick={onRandomize} />}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={[{ name: "box" }]}
          margin={{ top: 12, right: 12, left: 12, bottom: 12 }}
        >
          <CartesianGrid stroke="var(--stat-grid)" strokeDasharray="3 3" />
          <XAxis hide />
          <YAxis
            type="number"
            domain={[metrics.min, metrics.max]}
            tick={{ fill: "var(--stat-axis)", fontSize: 12 }}
            axisLine={{ stroke: "var(--stat-axis)" }}
            tickLine={{ stroke: "var(--stat-axis)" }}
          />
          <Customized component={<BoxplotOverlay metrics={metrics} />} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
