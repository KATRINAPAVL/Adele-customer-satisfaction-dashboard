import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Citadele Customer Satisfaction Dashboard',
  description: 'Customer satisfaction measurement and monitoring for Citadele chatbot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='18' fill='%23E3002C'/><text x='50' y='72' font-family='Arial,sans-serif' font-size='68' font-weight='bold' fill='white' text-anchor='middle'>C</text></svg>"
        />
      </head>
      <body className="flex min-h-screen" style={{ backgroundColor: '#F9F9F9', fontFamily: "'Roboto', sans-serif" }}>
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
