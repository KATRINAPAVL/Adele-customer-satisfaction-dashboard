import { HeatmapItem } from '@/lib/types';
import { formatNumber, formatPercent, getNegRateColors } from '@/lib/utils';

interface CategoryTableProps {
  data: HeatmapItem[];
}

function StatusCell({ status }: { status: string }) {
  switch (status) {
    case 'CRITICAL': return <span>🚨 CRITICAL</span>;
    case 'HIGH': return <span>⚠️ HIGH</span>;
    case 'MODERATE': return <span>🟡 MODERATE</span>;
    case 'OK': return <span>🟢 OK</span>;
    default: return <span>{status}</span>;
  }
}

export default function CategoryTable({ data }: CategoryTableProps) {
  const sorted = [...data].sort((a, b) => b.negRate - a.negRate);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Category Health Heatmap</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Negative sentiment rate by service category — sorted worst first
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Category
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Total Msgs
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Positive
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Neutral
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Negative
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Neg Rate
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, idx) => {
              const { bg, text } = getNegRateColors(item.negRate);
              return (
                <tr
                  key={item.category}
                  style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}
                >
                  <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-right tabular-nums">
                    {formatNumber(item.totalMsgs)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-right tabular-nums">
                    {formatNumber(item.positive)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-right tabular-nums">
                    {formatNumber(item.neutral)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-right tabular-nums">
                    {formatNumber(item.negative)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="inline-block px-2 py-0.5 rounded font-bold text-xs tabular-nums"
                      style={{ backgroundColor: bg, color: text }}
                    >
                      {formatPercent(item.negRate)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <StatusCell status={item.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
