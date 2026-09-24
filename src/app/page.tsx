import { baza } from '@/db/klient.ts';
import { powitanie } from '@/lib/powitanie.ts';
import { wpisyNaStrone } from '@/lib/wpisy.ts';

export const dynamic = 'force-dynamic';

export default async function Strona() {
  const lista = process.env.DATABASE_URL ? await wpisyNaStrone(baza()) : [];
  return (
    <main>
      <h1>{powitanie()}</h1>
      <p>Z bazy danych ({lista.length}):</p>
      <ul>{lista.map((w) => <li key={w.id}>{w.tresc}</li>)}</ul>
      <p>
        Stan: <a href="/api/health">/api/health</a>
      </p>
    </main>
  );
}
