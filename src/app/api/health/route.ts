import { sql } from 'drizzle-orm';
import { baza } from '@/db/klient.ts';
import { stanZdrowia } from '@/lib/powitanie.ts';

export const dynamic = 'force-dynamic';

// Test „czy wstało” toru wydań (adresZdrowia): 200 = aplikacja i baza (jeśli skonfigurowana) odpowiadają.
export async function GET() {
  let stan: 'ok' | 'blad' | 'brak' = 'brak';
  if (process.env.DATABASE_URL) {
    try {
      await baza().execute(sql`select 1`);
      stan = 'ok';
    } catch {
      stan = 'blad';
    }
  }
  const wynik = stanZdrowia(stan);
  return Response.json(wynik, { status: wynik.status === 'ok' ? 200 : 503 });
}
