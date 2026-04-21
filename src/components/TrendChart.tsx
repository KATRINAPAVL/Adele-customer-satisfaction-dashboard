'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendDataPoint } from '@/lib/types';

interface TrendChartProps {
  data: TrendDataPoint[];
  color: string;
  title: string;
  subtitle?: string;
  yDomain?: [number | string, number | string];
}

interface TooltipPayload {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(103,95,107,0.15)',
          borderRadius: '6px',
          padding: '10px 14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <p className="font-bold text-sm" style={{ color: '#251F30' }}>{label}</p>
        <p className="text-sm" style={{ color: '#675F6B' }}>{payload[0].value.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
}

export default function TrendChart({ data, color, title, subtitle, yDomain }: TrendChartProps) {
  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
    >
      <div className="mb-4">
        <h3 className="font-semibold" style={{ color: '#251F30', fontFamily: "'Roboto', sans-serif" }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: '#675F6B' }}>{subtitle}</p>
        )}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(103,95,107,0.07)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#675F6B', fontFamily: 'Roboto, sans-serif' }}
            axisLine={{ stroke: '#E8E6E9' }}
            tickLine={false}
          />
          <YAxis
            domain={yDomain ?? ['auto', 'auto']}
            tick={{ fontSize: 10, fill: '#675F6B', fontFamily: 'Roboto, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: color, stroke: '#FFFFFF', strokeWidth: 2 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
