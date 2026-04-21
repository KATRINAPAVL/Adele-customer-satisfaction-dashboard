import frameworkJson from '@/data/framework.json';
import trendsJson from '@/data/monthly-trends.json';
import categoriesJson from '@/data/categories.json';
import ratingsJson from '@/data/ratings.json';

import { FrameworkData, MonthlyTrendsData, CategoriesData, RatingsData } from '@/lib/types';
import { formatNumber, formatPercent, getPillarEmoji, getActionAccent } from '@/lib/utils';

import ScoreCard from '@/components/ScoreCard';
import StatusBadge from '@/components/StatusBadge';
import TrendChart from '@/components/TrendChart';
import CategoryTable from '@/components/CategoryTable';

const framework = frameworkJson as FrameworkData;
const trends = trendsJson as MonthlyTrendsData;
const categories = categoriesJson as CategoriesData;
const ratings = ratingsJson as RatingsData;

function ratingColor(avg: number): string {
  if (avg >= 3.5) return '#1E8449';
  if (avg >= 3.0) return '#D4860B';
  return '#C0392B';
}

function ratingBg(avg: number): string {
  if (avg >= 3.5) return '#D5F5E3';
  if (avg >= 3.0) return '#FEF3C7';
  return '#FADBD8';
}

export default function DashboardPage() {
  const { compositeScore, pillars } = framework;

  const resolutionData = trends.resolution.map((d) => ({ month: d.month, value: d.rate }));
  const sentimentData = trends.sentiment.map((d) => ({ month: d.month, value: d.negRate }));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* ── Page header ── */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-0.5 text-sm">Operational performance · {framework.dataPeriod}</p>
      </div>

      {/* ── Row 1: Composite Health Score ── */}
      <div
        className="rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ backgroundColor: '#FFFFFF', borderTop: '4px solid #27AE60' }}
      >
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Composite Health Score
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-bold" style={{ color: '#1E8449' }}>
              {compositeScore.value.toFixed(1)}
            </span>
            <span className="text-gray-400 text-lg">/ 100</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Weighted composite of 4 satisfaction pillars
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <StatusBadge status={compositeScore.status} />
          <span className="text-xs text-gray-400">
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
            emoji={getPillarEmoji(pillar.icon)}
          />
        ))}
      </div>

      {/* ── Row 3: Monthly Trends ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TrendChart
          data={resolutionData}
          color="#27AE60"
          title="Resolution Rate Trend"
          subtitle="Monthly thumbs-up rate (per-message feedback)"
          yDomain={[60, 85]}
        />
        <TrendChart
          data={sentimentData}
          color="#C0392B"
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-1">Star Rating Distribution</h3>
          <p className="text-xs text-gray-400 mb-5">End-of-session ratings · {formatNumber(ratings.totalRated)} rated</p>

          <div className="space-y-2.5 mb-5">
            {ratings.starDistribution.map((item) => {
              const barColor =
                item.stars >= 4 ? '#27AE60' : item.stars === 3 ? '#F39C12' : '#C0392B';
              return (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-6 text-right tabular-nums">
                    {item.stars}★
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ width: `${item.share}%`, backgroundColor: barColor }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 tabular-nums w-10 text-right">
                    {item.share.toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-400 tabular-nums w-10 text-right">
                    ({item.count})
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {ratings.averageStars.toFixed(2)}★
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#E67E22' }}>
                {ratings.polarizationIndex.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Polarization Index</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {formatNumber(ratings.totalRated)}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Total Rated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {ratings.captureRate.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-400 mt-0.5">Capture Rate</div>
            </div>
          </div>
        </div>

        {/* Country Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-1">Country Performance</h3>
          <p className="text-xs text-gray-400 mb-5">Star ratings by market</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Responses
                  </th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Avg Rating
                  </th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Neg Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ratings.country.map((c) => (
                  <tr key={c.code}>
                    <td className="px-3 py-3 font-medium text-gray-800">
                      <span className="mr-2">{c.flag}</span>
                      {c.name}
                    </td>
                    <td className="px-3 py-3 text-right text-gray-600 tabular-nums">
                      {formatNumber(c.responses)}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs font-bold tabular-nums"
                        style={{
                          backgroundColor: ratingBg(c.avgRating),
                          color: ratingColor(c.avgRating),
                        }}
                      >
                        {c.avgRating.toFixed(2)}★
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-gray-600 tabular-nums">
                      {formatPercent(c.negativeRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 p-3 rounded-lg text-xs" style={{ backgroundColor: '#FEF9E7', borderLeft: '3px solid #F39C12' }}>
            <strong className="text-gray-700">Note:</strong>{' '}
            <span className="text-gray-600">
              Lithuania scores 2.99★ vs Latvia 3.69★ — a significant localization gap (50% vs 29% negative rate).
            </span>
          </div>
        </div>
      </div>

      {/* ── Row 6: Key Issues & Actions ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-1">Key Issues &amp; Actions</h3>
        <p className="text-xs text-gray-400 mb-5">Prioritized action items based on data analysis</p>
        <div className="space-y-3">
          {ratings.actionItems.map((item) => {
            const accent = getActionAccent(item.priority);
            return (
              <div
                key={item.priority}
                className="flex items-start gap-4 p-4 rounded-lg border-l-4"
                style={{
                  borderLeftColor: accent.border,
                  backgroundColor: accent.bg,
                }}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: accent.border, color: '#FFFFFF' }}
                    >
                      #{item.priority}
                    </span>
                    <p className="font-semibold text-gray-900 text-sm leading-tight">{item.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
