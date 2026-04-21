export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function getStatusColor(status: string): string {
  const s = status.toUpperCase();
  if (['HEALTHY', 'GOOD', 'OK'].includes(s)) return '#27AE60';
  if (['WATCH', 'MODERATE'].includes(s)) return '#D4860B';
  if (s === 'HIGH') return '#E67E22';
  if (s === 'CRITICAL') return '#C0392B';
  return '#6B7280';
}

export function getStatusBg(status: string): string {
  const s = status.toUpperCase();
  if (['HEALTHY', 'GOOD', 'OK'].includes(s)) return '#D5F5E3';
  if (['WATCH', 'MODERATE'].includes(s)) return '#FEF3C7';
  if (s === 'HIGH') return '#FDEBD0';
  if (s === 'CRITICAL') return '#FADBD8';
  return '#F3F4F6';
}

export function getNegRateColors(negRate: number): { bg: string; text: string } {
  if (negRate > 40) return { bg: '#FADBD8', text: '#C0392B' };
  if (negRate >= 20) return { bg: '#FDEBD0', text: '#A04000' };
  if (negRate >= 15) return { bg: '#FEF9E7', text: '#9A7D0A' };
  return { bg: '#D5F5E3', text: '#1E8449' };
}

export function getPillarEmoji(icon: string): string {
  switch (icon) {
    case 'thumbs-up': return '👍';
    case 'bar-chart': return '📊';
    case 'star': return '⭐';
    case 'alert-triangle': return '⚠️';
    default: return '📌';
  }
}

export function getActionAccent(priority: number): { border: string; bg: string; text: string } {
  if (priority <= 2) return { border: '#C0392B', bg: '#FDF2F2', text: '#C0392B' };
  if (priority <= 4) return { border: '#E67E22', bg: '#FDF6EC', text: '#A04000' };
  return { border: '#2980B9', bg: '#EBF5FB', text: '#1A5276' };
}
