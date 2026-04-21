import { HeatmapItem } from '@/lib/types';
import { formatNumber, formatPercent, getNegRateColors } from '@/lib/utils';

interface CategoryTableProps {
  data: HeatmapItem[];
}

function StatusCell({ status }: { status: string }) {
  switch (status) {
    // NEVER red for negatives — use grey for critical/high per brand guidelines
    case 'CRITICAL': return <span style={{ color: '#4A4357' }}>&#9888; CRITICAL</span>;
    case 'HIGH':     return <span style={{ color: '#675F6B' }}>&#9651; HIGH</span>;
    case 'MODERATE': return <span style={{ color: '#804F91' }}>&#9679; MODERATE</span>;
    case 'OK':       return <span style={{ color: '#804F91' }}>&#10003; OK</span>;
    default:         return <span style={{ color: '#675F6B' }}>{status}</span>;
  }
}

export default function CategoryTable({ data }: CategoryTableProps) {
  const sorted = [...data].sort((a, b) => b.negRate - a.negRate);

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8E6E9' }}
    >
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #E8E6E9' }}>
        <h3 className="font-semibold" style={{ color: '#251F30' }}>Category Health Heatmap</h3>
        <p className="text-xs mt-0.5" style={{ color: '#675F6B' }}>
          Negative sentiment rate by service category — sorted worst first
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <thead>
            <tr style={{ backgroundColor: '#F9F9F9' }}>
              {['Category', 'Total Msgs', 'Positive', 'Neutral', 'Negative', 'Neg Rate', 'Status'].map((h, i) => (
                <th
                  key={h}
                  className={`py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${i === 0 ? 'text-left px-6' : i === 6 ? 'text-left px-4' : 'text-right px-4'}`}
                  style={{ color: '#675F6B', borderBottom: '1px solid #E8E6E9' }}
                >
                  {h}
                </th>
              ))}
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
                  <td className="px-6 py-3 font-medium whitespace-nowrap" style={{ color: '#251F30' }}>
                    {item.category}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: '#675F6B' }}>
                    {formatNumber(item.totalMsgs)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: '#675F6B' }}>
                    {formatNumber(item.positive)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: '#675F6B' }}>
                    {formatNumber(item.neutral)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: '#675F6B' }}>
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
                  <td className="px-4 py-3 text-sm whitespace-nowrap font-medium">
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
