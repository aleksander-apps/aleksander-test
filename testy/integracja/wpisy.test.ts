import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migruj } from '../../src/db/migracje.ts';
import { wpisy } from '../../src/db/schema.ts';
import { wpisyNaStrone } from '../../src/lib/wpisy.ts';

const url = process.env.DATABASE_URL;
const sql = url ? postgres(url, { max: 1, onnotice: () => {} }) : undefined;

before(async () => {
  if (url) await migruj(url);
});
after(async () => {
  await sql?.end();
});

test('pusta baza dostaje wpis powitalny, potem lista bez dublowania', { skip: !url && 'brak DATABASE_URL' }, async () => {
  const db = drizzle(sql!);
  await db.delete(wpisy);
  const pierwsze = await wpisyNaStrone(db);
  assert.equal(pierwsze.length, 1);
  assert.equal(pierwsze[0]?.tresc, 'Hello World z bazy danych');
  const drugie = await wpisyNaStrone(db);
  assert.equal(drugie.length, 1);
});

test('limit i kolejność od najnowszego', { skip: !url && 'brak DATABASE_URL' }, async () => {
  const db = drizzle(sql!);
  await db.insert(wpisy).values([{ tresc: 'a' }, { tresc: 'b' }]);
  const lista = await wpisyNaStrone(db, 2);
  assert.deepEqual(lista.map((w) => w.tresc), ['b', 'a']);
});
