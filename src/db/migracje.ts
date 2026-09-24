import path from 'node:path';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { opcjeTls } from './tls.ts';

// Migracje z drizzle/ (SQL w repo). Wołane przy starcie serwera (instrumentation.ts), w testach integracyjnych
// i przez `pnpm db:migrate`.
export async function migruj(url: string, katalog = path.join(process.cwd(), 'drizzle')): Promise<void> {
  const sql = postgres(url, { max: 1, onnotice: () => {}, ...opcjeTls() });
  try {
    await migrate(drizzle(sql), { migrationsFolder: katalog });
  } finally {
    await sql.end();
  }
}
