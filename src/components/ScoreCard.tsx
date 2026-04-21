import StatusBadge from './StatusBadge';

interface ScoreCardProps {
  name: string;
  score: number;
  status: string;
  weight: number;
  color: string;
  emoji: string;
}

export default function ScoreCard({ name, score, status, weight, color, emoji }: ScoreCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        <span className="text-sm font-medium text-gray-500 leading-tight">{name}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold" style={{ color }}>
          {score.toFixed(1)}
        </span>
        <span className="text-gray-400 text-sm">/ 100</span>
      </div>
      <div className="flex items-center justify-between">
        <StatusBadge status={status} size="sm" />
        <span className="text-xs font-medium text-gray-400">
          Weight: {(weight * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
