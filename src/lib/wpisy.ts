import { desc } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { wpisy } from '../db/schema.ts';

// Hello World z bazą: ostatnie wpisy i ich liczba (strona główna). Pierwsze wejście na pustą bazę dokłada wpis powitalny.
export async function wpisyNaStrone(db: PostgresJsDatabase<Record<string, unknown>>, limit = 5) {
  let lista = await db.select().from(wpisy).orderBy(desc(wpisy.id)).limit(limit);
  if (lista.length === 0) {
    await db.insert(wpisy).values({ tresc: 'Hello World z bazy danych' });
    lista = await db.select().from(wpisy).orderBy(desc(wpisy.id)).limit(limit);
  }
  return lista.map((w) => ({ id: w.id, tresc: w.tresc }));
}
