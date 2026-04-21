'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/framework', label: 'Framework', desc: 'Measurement Model' },
    { href: '/dashboard', label: 'Dashboard', desc: 'Operational View' },
  ];

  return (
    <aside
      className="w-60 min-h-screen flex-shrink-0 flex flex-col"
      style={{ backgroundColor: '#1F3864' }}
    >
      <div className="p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="text-white font-bold text-xl tracking-tight">Adele</div>
        <div className="text-sm mt-0.5" style={{ color: '#93C5FD' }}>
          Customer Satisfaction
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p
          className="text-xs font-semibold uppercase tracking-widest px-3 pb-3"
          style={{ color: '#60A5FA' }}
        >
          Navigation
        </p>
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col px-3 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: active ? '#FFFFFF' : '#93C5FD',
              }}
            >
              <span className="font-semibold text-sm">{link.label}</span>
              <span className="text-xs mt-0.5" style={{ opacity: 0.7 }}>
                {link.desc}
              </span>
            </Link>
          );
        })}
      </nav>

      <div
        className="p-4 text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#60A5FA' }}
      >
        Aug 2025 – Apr 2026
      </div>
    </aside>
  );
}
