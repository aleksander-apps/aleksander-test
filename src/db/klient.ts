import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';
import { opcjeTls } from './tls.ts';

// Jedno połączenie na proces. DATABASE_URL = rola runtime (bez DDL); migracje robi rola migracji (instrumentation.ts).
let klient: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function baza() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Brak DATABASE_URL');
  klient ??= drizzle(postgres(url, { max: 5, ...opcjeTls() }), { schema });
  return klient;
}
