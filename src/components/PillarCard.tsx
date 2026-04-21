import { Pillar } from '@/lib/types';
import { getPillarEmoji } from '@/lib/utils';
import StatusBadge from './StatusBadge';

interface PillarCardProps {
  pillar: Pillar;
}

export default function PillarCard({ pillar }: PillarCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
      style={{ borderLeft: `4px solid ${pillar.color}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: `${pillar.color}20` }}
          >
            {getPillarEmoji(pillar.icon)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{pillar.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">Weight: {(pillar.weight * 100).toFixed(0)}%</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-2xl font-bold" style={{ color: pillar.color }}>
            {pillar.score.toFixed(1)}
          </div>
          <div className="mt-1">
            <StatusBadge status={pillar.status} size="sm" />
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <span className="font-semibold text-gray-700">Measures:</span>
          <p className="text-gray-600 mt-0.5">{pillar.measures}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Data Source:</span>
          <p className="text-gray-600 mt-0.5">{pillar.dataSource}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Formula:</span>
          <code
            className="inline-block mt-0.5 px-2 py-1 rounded text-xs font-mono bg-gray-50 border border-gray-200 text-gray-700"
          >
            {pillar.formula}
          </code>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Thresholds:</span>
          <p className="text-gray-600 mt-0.5">{pillar.thresholdLabels}</p>
        </div>
        <div
          className="rounded-lg p-3 text-xs"
          style={{ backgroundColor: `${pillar.color}10`, borderLeft: `3px solid ${pillar.color}` }}
        >
          <span className="font-semibold text-gray-700">Why this weight: </span>
          <span className="text-gray-600">{pillar.weightRationale}</span>
        </div>
      </div>
    </div>
  );
}
