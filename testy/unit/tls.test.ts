import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { opcjeTls } from '../../src/db/tls.ts';

test('bez DATABASE_CA — brak pola ssl (decyduje sslmode z adresu)', () => {
  assert.deepEqual(opcjeTls(''), {});
  assert.equal('ssl' in opcjeTls(''), false);
});

test('z plikiem CA — TLS z weryfikacją tym CA', () => {
  const plik = path.join(mkdtempSync(path.join(tmpdir(), 'ca-')), 'ca.crt');
  writeFileSync(plik, 'CERT');
  assert.deepEqual(opcjeTls(plik), { ssl: { ca: 'CERT' } });
});
