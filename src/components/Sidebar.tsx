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
      style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #E8E6E9' }}
    >
      {/* Logo */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid #E8E6E9' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-citadele-text.svg" alt="Citadele" style={{ height: '34px' }} />
        <div className="text-xs mt-2 font-medium" style={{ color: '#675F6B' }}>
          Customer Satisfaction
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p
          className="text-xs font-semibold uppercase tracking-widest px-3 pb-3"
          style={{ color: '#B29CC2' }}
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
                backgroundColor: active ? 'rgba(227,0,44,0.06)' : 'transparent',
                borderLeft: active ? '3px solid #E3002C' : '3px solid transparent',
              }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: active ? '#E3002C' : '#251F30' }}
              >
                {link.label}
              </span>
              <span
                className="text-xs mt-0.5"
                style={{ color: active ? '#804F91' : '#675F6B' }}
              >
                {link.desc}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-6 py-4 text-xs"
        style={{ borderTop: '1px solid #E8E6E9', color: '#675F6B' }}
      >
        Aug 2025 – Apr 2026
      </div>
    </aside>
  );
}
