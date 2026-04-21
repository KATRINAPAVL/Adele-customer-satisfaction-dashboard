import frameworkJson from '@/data/framework.json';
import trendsJson from '@/data/monthly-trends.json';
import categoriesJson from '@/data/categories.json';
import ratingsJson from '@/data/ratings.json';

import { FrameworkData, MonthlyTrendsData, CategoriesData, RatingsData } from '@/lib/types';
import { formatNumber, formatPercent, getActionAccent } from '@/lib/utils';

import ScoreCard from '@/components/ScoreCard';
import StatusBadge from '@/components/StatusBadge';
import TrendChart from '@/components/TrendChart';
import CategoryTable from '@/components/CategoryTable';
import Icon from '@/components/Icon';

const framework = frameworkJson as FrameworkData;
const trends = trendsJson as MonthlyTrendsData;
const categories = categoriesJson as CategoriesData;
const ratings = ratingsJson as RatingsData;

// Positive ratings → Purple; middling → Purple-50; negative → Grey (NEVER red)
function ratingColor(avg: number): string {
  if (avg >= 3.5) return '#804F91';
  if (avg >= 3.0) return '#B29CC2';
  return '#675F6B';
}

function ratingBg(avg: number): string {
  if (avg >= 3.5) return 'rgba(128,79,145,0.12)';
  if (avg >= 3.0) return 'rgba(178,156,194,0.18)';
  return 'rgba(103,95,107,0.12)';
}

function getActionIconName(priority: number): string {
  if (priority <= 2) return 'alert-octagon';
  if (priority <= 4) return 'alert-triangle';
  return 'trending-up';
}

function getStarBarColor(stars: number): string {
  if (stars >= 4) return '#804F91';        // Purple — positive
  if (stars === 3) return '#B29CC2';       // Purple-50 — neutral
  return '#675F6B';                        // Grey — negative, NEVER red
}

export default function DashboardPage() {
  const { compositeScore, pillars } = framework;

  // Resolution Rate → Purple (positive metric); Neg Sentiment → Grey (negative metric, NEVER red)
  const resolutionData = trends.resolution.map((d) => ({ month: d.month, value: d.rate }));
  const sentimentData = trends.sentiment.map((d) => ({ month: d.month, value: d.negRate }));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* ── Page header ── */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#251F30' }}>Dashboard</h1>
        <p className="mt-0.5 text-sm" style={{ color: '#675F6B' }}>
          Operational performance · {framework.dataPeriod}
        </p>
      </div>

      {/* ── Row 1: Composite Health Score — Red as featured/primary metric ── */}
      <div
        className="bg-white rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          borderTop: '4px solid #E3002C',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E8E6E9',
          borderTopColor: '#E3002C',
          borderTopWidth: '4px',
        }}
      >
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#675F6B' }}>
            Composite Health Score
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold" style={{ color: '#E3002C', fontFamily: "'Roboto', sans-serif" }}>
              {compositeScore.value.toFixed(1)}
            </span>
            <span className="text-lg" style={{ color: '#675F6B' }}>/ 100</span>
          </div>
          <p className="text-sm mt-2" style={{ color: '#675F6B' }}>
            Weighted composite of 4 satisfaction pillars
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <StatusBadge status={compositeScore.status} />
          <span className="text-xs" style={{ color: '#675F6B' }}>
            {formatNumber(framework.totalMessages)} messages · {formatNumber(framework.totalSessions)} sessions
          </span>
        </div>
      </div>

      {/* ── Row 2: Four Pillar Score Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((pillar) => (
          <ScoreCard
            key={pillar.id}
            name={pillar.name}
            score={pillar.score}
            status={pillar.status}
            weight={pillar.weight}
            color={pillar.color}
            icon={pillar.icon}
          />
        ))}
      </div>

      {/* ── Row 3: Monthly Trends ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Positive metric → Purple */}
        <TrendChart
          data={resolutionData}
          color="#804F91"
          title="Resolution Rate Trend"
          subtitle="Monthly thumbs-up rate (per-message feedback)"
          yDomain={[60, 85]}
        />
        {/* Negative metric → Grey (NEVER red) */}
        <TrendChart
          data={sentimentData}
          color="#675F6B"
          title="Negative Sentiment Rate Trend"
          subtitle="Monthly NLP negative sentiment rate"
          yDomain={[15, 40]}
        />
      </div>

      {/* ── Row 4: Category Heatmap ── */}
      <CategoryTable data={categories.heatmap} />

      {/* ── Row 5: Star Rating + Country ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Star Rating Distribution */}
        <div
          className="bg-white rounded-xl p-6"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
        >
          <h3 className="font-semibold mb-1" style={{ color: '#251F30' }}>Star Rating Distribution</h3>
          <p className="text-xs mb-5" style={{ color: '#675F6B' }}>
            End-of-session ratings · {formatNumber(ratings.totalRated)} rated
          </p>

          <div className="space-y-2.5 mb-5">
            {ratings.starDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm w-6 text-right tabular-nums" style={{ color: '#675F6B' }}>
                  {item.stars}★
                </span>
                <div className="flex-1 rounded-full h-3 overflow-hidden" style={{ background: '#F9F9F9', border: '1px solid #E8E6E9' }}>
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{ width: `${item.share}%`, backgroundColor: getStarBarColor(item.stars) }}
                  />
                </div>
                <span className="text-xs tabular-nums w-10 text-right" style={{ color: '#675F6B' }}>
                  {item.share.toFixed(1)}%
                </span>
                <span className="text-xs tabular-nums w-10 text-right" style={{ color: '#B29CC2' }}>
                  ({item.count})
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4" style={{ borderTop: '1px solid #E8E6E9' }}>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#251F30' }}>
                {ratings.averageStars.toFixed(2)}★
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#675F6B' }}>Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#B29CC2' }}>
                {ratings.polarizationIndex.toFixed(1)}%
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#675F6B' }}>Polarization Index</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#251F30' }}>
                {formatNumber(ratings.totalRated)}
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#675F6B' }}>Total Rated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#251F30' }}>
                {ratings.captureRate.toFixed(2)}%
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#675F6B' }}>Capture Rate</div>
            </div>
          </div>
        </div>

        {/* Country Performance */}
        <div
          className="bg-white rounded-xl p-6"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
        >
          <h3 className="font-semibold mb-1" style={{ color: '#251F30' }}>Country Performance</h3>
          <p className="text-xs mb-5" style={{ color: '#675F6B' }}>Star ratings by market</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: "'Roboto', sans-serif" }}>
              <thead>
                <tr style={{ background: '#F9F9F9' }}>
                  {['Country', 'Responses', 'Avg Rating', 'Neg Rate'].map((h, i) => (
                    <th
                      key={h}
                      className={`py-2 text-xs font-semibold uppercase tracking-wider ${i === 0 ? 'text-left px-3' : 'text-right px-3'}`}
                      style={{ color: '#675F6B', borderBottom: '1px solid #E8E6E9' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #E8E6E9' }}>
                {ratings.country.map((c) => (
                  <tr key={c.code} style={{ borderBottom: '1px solid #F9F9F9' }}>
                    <td className="px-3 py-3 font-medium" style={{ color: '#251F30' }}>
                      <span className="mr-2">{c.flag}</span>
                      {c.name}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums" style={{ color: '#675F6B' }}>
                      {formatNumber(c.responses)}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-bold tabular-nums"
                        style={{ background: ratingBg(c.avgRating), color: ratingColor(c.avgRating) }}
                      >
                        {c.avgRating.toFixed(2)}★
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums" style={{ color: '#675F6B' }}>
                      {formatPercent(c.negativeRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="mt-5 p-3 rounded-lg text-xs"
            style={{
              background: 'rgba(178,156,194,0.12)',
              borderLeft: '3px solid #B29CC2',
            }}
          >
            <strong style={{ color: '#251F30' }}>Note:</strong>{' '}
            <span style={{ color: '#675F6B' }}>
              Lithuania scores 2.99★ vs Latvia 3.69★ — a significant localization gap (50% vs 29% negative rate).
            </span>
          </div>
        </div>
      </div>

      {/* ── Row 6: Key Issues & Actions ── */}
      <div
        className="bg-white rounded-xl p-6"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
      >
        <h3 className="font-semibold mb-1" style={{ color: '#251F30' }}>Key Issues &amp; Actions</h3>
        <p className="text-xs mb-5" style={{ color: '#675F6B' }}>Prioritized action items based on data analysis</p>
        <div className="space-y-3">
          {ratings.actionItems.map((item) => {
            const accent = getActionAccent(item.priority);
            return (
              <div
                key={item.priority}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{
                  borderLeft: `4px solid ${accent.border}`,
                  background: accent.bg,
                }}
              >
                {/* SVG icon in purple-tinted square — NEVER emoji, NEVER red circle */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(128,79,145,0.10)' }}
                >
                  <Icon name={getActionIconName(item.priority)} size={18} color="#804F91" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ background: accent.border, color: '#FFFFFF', fontFamily: "'Roboto', sans-serif" }}
                    >
                      #{item.priority}
                    </span>
                    <p className="font-semibold text-sm leading-tight" style={{ color: '#251F30' }}>
                      {item.title}
                    </p>
                  </div>
                  <p className="text-sm" style={{ color: '#675F6B' }}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        className="text-center text-xs py-4"
        style={{ borderTop: '1px solid #E8E6E9', color: '#675F6B', fontFamily: "'Roboto', sans-serif" }}
      >
        © 2026 Citadele · Powered by Citadele Technology
      </footer>
    </div>
  );
}
