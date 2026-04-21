import { getStatusColor, getStatusBg } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const bg = getStatusBg(status);
  const px = size === 'sm' ? '8px' : '12px';
  const py = size === 'sm' ? '2px' : '4px';
  const fontSize = size === 'sm' ? '11px' : '13px';

  return (
    <span
      className="inline-flex items-center rounded-full font-semibold"
      style={{ backgroundColor: bg, color, paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py, fontSize }}
    >
      {status}
    </span>
  );
}
