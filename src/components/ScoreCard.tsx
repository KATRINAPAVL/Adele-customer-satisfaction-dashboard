import StatusBadge from './StatusBadge';
import Icon from './Icon';

interface ScoreCardProps {
  name: string;
  score: number;
  status: string;
  weight: number;
  color: string;
  icon: string;
}

export default function ScoreCard({ name, score, status, weight, color, icon }: ScoreCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-5 flex flex-col gap-3"
      style={{
        borderTop: `3px solid ${color}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #E8E6E9',
        borderTopColor: color,
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(128,79,145,0.10)' }}
        >
          <Icon name={icon} size={16} color="#804F91" />
        </div>
        <span className="text-sm font-medium leading-tight" style={{ color: '#675F6B' }}>{name}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold" style={{ color, fontFamily: "'Roboto', sans-serif" }}>
          {score.toFixed(1)}
        </span>
        <span className="text-sm" style={{ color: '#675F6B' }}>/ 100</span>
      </div>
      <div className="flex items-center justify-between">
        <StatusBadge status={status} size="sm" />
        <span className="text-xs font-medium" style={{ color: '#675F6B' }}>
          Weight: {(weight * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
