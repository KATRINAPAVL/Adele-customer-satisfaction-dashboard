import { Pillar } from '@/lib/types';
import StatusBadge from './StatusBadge';
import Icon from './Icon';

interface PillarCardProps {
  pillar: Pillar;
}

export default function PillarCard({ pillar }: PillarCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-6 flex flex-col gap-4"
      style={{
        borderLeft: `4px solid ${pillar.color}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #E8E6E9',
        borderLeftColor: pillar.color,
        borderLeftWidth: '4px',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon container: always purple-tinted square per brand guidelines */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(128,79,145,0.10)' }}
          >
            <Icon name={pillar.icon} size={18} color="#804F91" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight" style={{ color: '#251F30' }}>
              {pillar.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#675F6B' }}>
              Weight: {(pillar.weight * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-2xl font-bold" style={{ color: pillar.color, fontFamily: "'Roboto', sans-serif" }}>
            {pillar.score.toFixed(1)}
          </div>
          <div className="mt-1">
            <StatusBadge status={pillar.status} size="sm" />
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <span className="font-semibold" style={{ color: '#251F30' }}>Measures:</span>
          <p className="mt-0.5" style={{ color: '#675F6B' }}>{pillar.measures}</p>
        </div>
        <div>
          <span className="font-semibold" style={{ color: '#251F30' }}>Data Source:</span>
          <p className="mt-0.5" style={{ color: '#675F6B' }}>{pillar.dataSource}</p>
        </div>
        <div>
          <span className="font-semibold" style={{ color: '#251F30' }}>Formula:</span>
          <code
            className="inline-block mt-0.5 px-2 py-1 rounded text-xs font-mono"
            style={{ background: '#F9F9F9', border: '1px solid #E8E6E9', color: '#251F30' }}
          >
            {pillar.formula}
          </code>
        </div>
        <div>
          <span className="font-semibold" style={{ color: '#251F30' }}>Thresholds:</span>
          <p className="mt-0.5" style={{ color: '#675F6B' }}>{pillar.thresholdLabels}</p>
        </div>
        <div
          className="rounded-lg p-3 text-xs"
          style={{
            background: 'rgba(128,79,145,0.06)',
            borderLeft: `3px solid ${pillar.color}`,
          }}
        >
          <span className="font-semibold" style={{ color: '#251F30' }}>Why this weight: </span>
          <span style={{ color: '#675F6B' }}>{pillar.weightRationale}</span>
        </div>
      </div>
    </div>
  );
}
