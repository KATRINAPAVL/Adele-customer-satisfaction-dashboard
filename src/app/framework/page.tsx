import frameworkJson from '@/data/framework.json';
import { FrameworkData } from '@/lib/types';
import { formatNumber, getPillarEmoji } from '@/lib/utils';
import PillarCard from '@/components/PillarCard';
import StatusBadge from '@/components/StatusBadge';

const data = frameworkJson as FrameworkData;

export default function FrameworkPage() {
  const { title, subtitle, dataPeriod, totalMessages, totalSessions, compositeScore, pillars } = data;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* ── Header ── */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#EBF5FB', color: '#1A5276' }}
          >
            📅 {dataPeriod}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#EAF4F0', color: '#1E8449' }}
          >
            💬 {formatNumber(totalMessages)} messages
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#FEF9E7', color: '#9A7D0A' }}
          >
            🗂️ {formatNumber(totalSessions)} sessions
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>

      {/* ── Framework Overview Diagram ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Framework Overview</h2>
        <div className="flex flex-col items-center gap-0">
          {/* Pillar boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2"
                style={{ borderColor: pillar.color, backgroundColor: `${pillar.color}08` }}
              >
                <span className="text-2xl">{getPillarEmoji(pillar.icon)}</span>
                <span className="font-semibold text-gray-800 text-sm text-center leading-tight">
                  {pillar.name}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                >
                  {(pillar.weight * 100).toFixed(0)}% weight
                </span>
                <span className="text-lg font-bold" style={{ color: pillar.color }}>
                  {pillar.score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Connector lines */}
          <div className="flex w-full justify-around my-0">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="flex flex-col items-center" style={{ width: `${100 / pillars.length}%` }}>
                <div className="w-px h-6" style={{ backgroundColor: pillar.color, opacity: 0.5 }} />
              </div>
            ))}
          </div>
          <div
            className="h-px"
            style={{
              width: `${(pillars.length - 1) / pillars.length * 100}%`,
              backgroundColor: '#CBD5E1',
            }}
          />
          <div className="w-px h-6 bg-gray-300" />
          <div className="text-gray-400 text-xl leading-none mb-1">▼</div>

          {/* Composite score box */}
          <div
            className="flex flex-col items-center gap-2 px-8 py-5 rounded-xl border-2"
            style={{ borderColor: '#27AE60', backgroundColor: '#EAF8F0' }}
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Composite Score
            </span>
            <span className="text-5xl font-bold" style={{ color: '#1E8449' }}>
              {compositeScore.value.toFixed(1)}
            </span>
            <StatusBadge status={compositeScore.status} />
          </div>
        </div>
      </div>

      {/* ── Four Pillar Cards ── */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Four Pillar Explanation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>

      {/* ── Composite Score Calculation ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Composite Score Calculation</h2>
        <p className="text-sm text-gray-500 mb-5">
          Formula:{' '}
          <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono text-gray-700">
            {compositeScore.formula}
          </code>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">
                  Pillar
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">
                  Weight
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">
                  Score
                </th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">
                  Weighted
                </th>
              </tr>
            </thead>
            <tbody>
              {pillars.map((pillar) => {
                const weighted = pillar.weight * pillar.score;
                return (
                  <tr key={pillar.id} className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                      <span>{getPillarEmoji(pillar.icon)}</span>
                      <span>{pillar.name}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600 tabular-nums">
                      {(pillar.weight * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-center font-semibold tabular-nums" style={{ color: pillar.color }}>
                      {pillar.score.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700 font-mono tabular-nums">
                      {weighted.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#EAF8F0' }}>
                <td className="px-4 py-3 font-bold text-gray-800">Total</td>
                <td className="px-4 py-3 text-center font-bold text-gray-800">100%</td>
                <td className="px-4 py-3 text-center text-gray-400">—</td>
                <td
                  className="px-4 py-3 text-center font-bold text-xl tabular-nums"
                  style={{ color: '#1E8449' }}
                >
                  {compositeScore.value.toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          The weighted contributions sum to {compositeScore.value.toFixed(1)}, giving a{' '}
          <span className="font-semibold" style={{ color: '#27AE60' }}>
            {compositeScore.status}
          </span>{' '}
          overall status.
        </p>
      </div>

      {/* ── Methodology Notes ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5">Methodology Notes</h2>
        <div className="space-y-5">
          <div className="rounded-lg p-4 border border-gray-100" style={{ backgroundColor: '#FAFBFC' }}>
            <h3 className="font-semibold text-gray-800 mb-2">🚦 Traffic Light Thresholds</h3>
            <p className="text-sm text-gray-600 mb-3">
              Each pillar has independent thresholds reflecting the signal type and realistic ranges:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="flex items-center gap-2 p-2 rounded text-xs"
                  style={{ backgroundColor: `${pillar.color}10` }}
                >
                  <span style={{ color: pillar.color }}>{getPillarEmoji(pillar.icon)}</span>
                  <span className="font-semibold text-gray-700">{pillar.name}:</span>
                  <span className="text-gray-600">{pillar.thresholdLabels}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-4 border border-gray-100" style={{ backgroundColor: '#FAFBFC' }}>
            <h3 className="font-semibold text-gray-800 mb-2">⚖️ Weight Rationale</h3>
            <p className="text-sm text-gray-600">
              Weights reflect signal quality, sample size, and directness. Resolution Rate carries the
              highest weight (30%) because it&apos;s the most direct per-message signal with the largest
              sample (41,908 reviews). Weights are adjustable — this allocation can be tuned as data
              volume grows or business priorities shift.
            </p>
          </div>

          <div
            className="rounded-lg p-4 border"
            style={{ backgroundColor: '#FEF9E7', borderColor: '#F9E79F' }}
          >
            <h3 className="font-semibold text-gray-800 mb-2">⚠️ Sample Size Caveat</h3>
            <p className="text-sm text-gray-600">
              <strong>Session Satisfaction (Pillar 3)</strong> is based on only{' '}
              <strong>0.48% of sessions</strong> that receive end-of-session star ratings. This is a
              high-quality signal but very low volume. The score of <strong>61.9</strong> should be
              interpreted with caution — increasing the rating capture rate is a priority action item.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
