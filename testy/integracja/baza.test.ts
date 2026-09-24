import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migruj } from '../../src/db/migracje.ts';
import { wpisy } from '../../src/db/schema.ts';

// Prawdziwy PostgreSQL (docker-compose.test.yml → testdb). Bez DATABASE_URL test się nie uruchamia.
const url = process.env.DATABASE_URL;
const sql = url ? postgres(url, { max: 1, onnotice: () => {} }) : undefined;

before(async () => {
  if (url) await migruj(url);
});
after(async () => {
  await sql?.end();
});

test('migracje zakładają tabelę, zapis i odczyt przez Drizzle', { skip: !url && 'brak DATABASE_URL' }, async () => {
  const db = drizzle(sql!);
  const [nowy] = await db.insert(wpisy).values({ tresc: 'z testu integracyjnego' }).returning();
  assert.ok(nowy?.id);
  const [ostatni] = await db.select().from(wpisy).orderBy(desc(wpisy.id)).limit(1);
  assert.equal(ostatni?.tresc, 'z testu integracyjnego');
});

test('migracje są idempotentne', { skip: !url && 'brak DATABASE_URL' }, async () => {
  await migruj(url!);
});
