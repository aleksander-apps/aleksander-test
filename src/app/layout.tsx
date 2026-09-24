import type { ReactNode } from 'react';

export const metadata = { title: 'aleksander-test', description: 'Hello' };

export default function Uklad({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: '2rem' }}>{children}</body>
    </html>
  );
}
