export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

// Positive → Purple; caution → Purple text on pink bg; negative → Grey. NEVER Red for negative.
export function getStatusColor(status: string): string {
  const s = status.toUpperCase();
  if (['HEALTHY', 'GOOD', 'OK'].includes(s)) return '#804F91';
  if (['WATCH', 'MODERATE'].includes(s)) return '#804F91';
  if (s === 'HIGH') return '#675F6B';
  if (s === 'CRITICAL') return '#4A4357';
  return '#675F6B';
}

export function getStatusBg(status: string): string {
  const s = status.toUpperCase();
  if (['HEALTHY', 'GOOD', 'OK'].includes(s)) return 'rgba(128,79,145,0.12)';
  if (['WATCH', 'MODERATE'].includes(s)) return 'rgba(255,179,179,0.40)';
  if (s === 'HIGH') return 'rgba(103,95,107,0.15)';
  if (s === 'CRITICAL') return 'rgba(103,95,107,0.22)';
  return 'rgba(103,95,107,0.10)';
}

// Neg rate: NEVER red. Critical/High → grey; Moderate → pink; OK → purple.
export function getNegRateColors(negRate: number): { bg: string; text: string } {
  if (negRate > 40) return { bg: 'rgba(103,95,107,0.22)', text: '#4A4357' };
  if (negRate >= 20) return { bg: 'rgba(103,95,107,0.13)', text: '#675F6B' };
  if (negRate >= 15) return { bg: 'rgba(255,179,179,0.35)', text: '#804F91' };
  return { bg: 'rgba(128,79,145,0.12)', text: '#804F91' };
}

// Returns icon identifier (rendering handled by <Icon> component)
export function getPillarEmoji(icon: string): string {
  return icon;
}

// Priority 1–2: grey (critical, never red); 3–4: purple-50; 5: purple (growth)
export function getActionAccent(priority: number): { border: string; bg: string; text: string } {
  if (priority <= 2) return { border: '#675F6B', bg: 'rgba(103,95,107,0.08)', text: '#4A4357' };
  if (priority <= 4) return { border: '#B29CC2', bg: 'rgba(178,156,194,0.12)', text: '#804F91' };
  return { border: '#804F91', bg: 'rgba(128,79,145,0.08)', text: '#804F91' };
}
