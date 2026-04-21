import frameworkJson from '@/data/framework.json';
import { FrameworkData } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import PillarCard from '@/components/PillarCard';
import StatusBadge from '@/components/StatusBadge';
import Icon from '@/components/Icon';

const data = frameworkJson as FrameworkData;

export default function FrameworkPage() {
  const { title, subtitle, dataPeriod, totalMessages, totalSessions, compositeScore, pillars } = data;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* ── Header ── */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(128,79,145,0.10)', color: '#804F91' }}
          >
            {dataPeriod}
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(227,0,44,0.08)', color: '#E3002C' }}
          >
            {formatNumber(totalMessages)} messages
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(103,95,107,0.08)', color: '#675F6B' }}
          >
            {formatNumber(totalSessions)} sessions
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#251F30' }}>{title}</h1>
        <p className="mt-1" style={{ color: '#675F6B' }}>{subtitle}</p>
      </div>

      {/* ── Framework Overview Diagram ── */}
      <div
        className="bg-white rounded-xl p-6"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
      >
        <h2 className="text-lg font-bold mb-6" style={{ color: '#251F30' }}>Framework Overview</h2>
        <div className="flex flex-col items-center">
          {/* Pillar boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col items-center gap-2 p-4 rounded-xl"
                style={{
                  border: `2px solid ${pillar.color}`,
                  background: `rgba(${pillar.color === '#E3002C' ? '227,0,44' : pillar.color === '#804F91' ? '128,79,145' : pillar.color === '#B29CC2' ? '178,156,194' : '103,95,107'},0.06)`,
                }}
              >
                {/* Icon in purple-tinted container */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(128,79,145,0.10)' }}
                >
                  <Icon name={pillar.icon} size={18} color="#804F91" />
                </div>
                <span className="font-semibold text-sm text-center leading-tight" style={{ color: '#251F30' }}>
                  {pillar.name}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `rgba(${pillar.color === '#E3002C' ? '227,0,44' : pillar.color === '#804F91' ? '128,79,145' : pillar.color === '#B29CC2' ? '178,156,194' : '103,95,107'},0.15)`, color: pillar.color }}
                >
                  {(pillar.weight * 100).toFixed(0)}% weight
                </span>
                <span className="text-lg font-bold" style={{ color: pillar.color }}>
                  {pillar.score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Connector: vertical lines → horizontal bar → arrow → composite */}
          <div className="flex w-full justify-around mt-0">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="flex flex-col items-center" style={{ width: `${100 / pillars.length}%` }}>
                <div className="w-px h-6" style={{ backgroundColor: '#E8E6E9' }} />
              </div>
            ))}
          </div>
          <div className="h-px w-5/6" style={{ backgroundColor: '#E8E6E9' }} />
          <div className="w-px h-6" style={{ backgroundColor: '#E8E6E9' }} />
          <div className="text-lg leading-none mb-1" style={{ color: '#675F6B' }}>▼</div>

          {/* Composite Score box — Red as primary featured metric */}
          <div
            className="flex flex-col items-center gap-2 px-10 py-5 rounded-xl"
            style={{ border: '2px solid #E3002C', background: 'rgba(227,0,44,0.05)' }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#675F6B' }}>
              Composite Score
            </span>
            <span className="text-5xl font-bold" style={{ color: '#E3002C', fontFamily: "'Roboto', sans-serif" }}>
              {compositeScore.value.toFixed(1)}
            </span>
            <StatusBadge status={compositeScore.status} />
          </div>
        </div>
      </div>

      {/* ── Four Pillar Cards ── */}
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: '#251F30' }}>Four Pillar Explanation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>

      {/* ── Composite Score Calculation ── */}
      <div
        className="bg-white rounded-xl p-6"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
      >
        <h2 className="text-lg font-bold mb-2" style={{ color: '#251F30' }}>Composite Score Calculation</h2>
        <p className="text-sm mb-5" style={{ color: '#675F6B' }}>
          Formula:{' '}
          <code
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{ background: '#F9F9F9', border: '1px solid #E8E6E9', color: '#251F30' }}
          >
            {compositeScore.formula}
          </code>
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "'Roboto', sans-serif" }}>
            <thead>
              <tr style={{ background: '#F9F9F9' }}>
                {['Pillar', 'Weight', 'Score', 'Weighted'].map((h) => (
                  <th
                    key={h}
                    className={`py-3 font-semibold ${h === 'Pillar' ? 'text-left px-4' : 'text-center px-4'}`}
                    style={{ color: '#675F6B', borderBottom: '1px solid #E8E6E9' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pillars.map((pillar) => {
                const weighted = pillar.weight * pillar.score;
                return (
                  <tr key={pillar.id} style={{ borderBottom: '1px solid #F9F9F9' }}>
                    <td className="px-4 py-3 font-medium flex items-center gap-2" style={{ color: '#251F30' }}>
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(128,79,145,0.10)' }}
                      >
                        <Icon name={pillar.icon} size={13} color="#804F91" />
                      </div>
                      {pillar.name}
                    </td>
                    <td className="px-4 py-3 text-center tabular-nums" style={{ color: '#675F6B' }}>
                      {(pillar.weight * 100).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-center font-semibold tabular-nums" style={{ color: pillar.color }}>
                      {pillar.score.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 text-center font-mono tabular-nums" style={{ color: '#251F30' }}>
                      {weighted.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: 'rgba(227,0,44,0.05)', borderTop: '2px solid #E8E6E9' }}>
                <td className="px-4 py-3 font-bold" style={{ color: '#251F30' }}>Total</td>
                <td className="px-4 py-3 text-center font-bold" style={{ color: '#251F30' }}>100%</td>
                <td className="px-4 py-3 text-center" style={{ color: '#675F6B' }}>—</td>
                <td className="px-4 py-3 text-center font-bold text-xl tabular-nums" style={{ color: '#E3002C' }}>
                  {compositeScore.value.toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: '#675F6B' }}>
          The weighted contributions sum to {compositeScore.value.toFixed(1)}, giving a{' '}
          <span className="font-semibold" style={{ color: '#804F91' }}>
            {compositeScore.status}
          </span>{' '}
          overall status.
        </p>
      </div>

      {/* ── Methodology Notes ── */}
      <div
        className="bg-white rounded-xl p-6"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
      >
        <h2 className="text-lg font-bold mb-5" style={{ color: '#251F30' }}>Methodology Notes</h2>
        <div className="space-y-5">

          {/* Traffic Light Thresholds */}
          <div className="rounded-lg p-4" style={{ background: '#F9F9F9', border: '1px solid #E8E6E9' }}>
            <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#251F30' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(128,79,145,0.10)' }}>
                <Icon name="check-circle" size={14} color="#804F91" />
              </div>
              Traffic Light Thresholds
            </h3>
            <p className="text-sm mb-3" style={{ color: '#675F6B' }}>
              Each pillar has independent thresholds reflecting the signal type and realistic ranges:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="flex items-center gap-2 p-2 rounded text-xs"
                  style={{ background: 'rgba(128,79,145,0.06)', border: '1px solid rgba(128,79,145,0.12)' }}
                >
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(128,79,145,0.12)' }}>
                    <Icon name={pillar.icon} size={11} color="#804F91" />
                  </div>
                  <span className="font-semibold" style={{ color: '#251F30' }}>{pillar.name}:</span>
                  <span style={{ color: '#675F6B' }}>{pillar.thresholdLabels}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weight Rationale */}
          <div className="rounded-lg p-4" style={{ background: '#F9F9F9', border: '1px solid #E8E6E9' }}>
            <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#251F30' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(128,79,145,0.10)' }}>
                <Icon name="bar-chart" size={14} color="#804F91" />
              </div>
              Weight Rationale
            </h3>
            <p className="text-sm" style={{ color: '#675F6B' }}>
              Weights reflect signal quality, sample size, and directness. Resolution Rate carries the
              highest weight (30%) because it&apos;s the most direct per-message signal with the largest
              sample (41,908 reviews). Weights are adjustable — this allocation can be tuned as data
              volume grows or business priorities shift.
            </p>
          </div>

          {/* Sample Size Caveat */}
          <div
            className="rounded-lg p-4"
            style={{ background: 'rgba(255,179,179,0.12)', border: '1px solid rgba(255,179,179,0.5)' }}
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#251F30' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(128,79,145,0.10)' }}>
                <Icon name="alert-triangle" size={14} color="#804F91" />
              </div>
              Sample Size Caveat
            </h3>
            <p className="text-sm" style={{ color: '#675F6B' }}>
              <strong style={{ color: '#251F30' }}>Session Satisfaction (Pillar 3)</strong> is based on only{' '}
              <strong style={{ color: '#251F30' }}>0.48% of sessions</strong> that receive end-of-session
              star ratings. This is a high-quality signal but very low volume. The score of{' '}
              <strong style={{ color: '#251F30' }}>61.9</strong> should be interpreted with caution —
              increasing the rating capture rate is a priority action item.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
