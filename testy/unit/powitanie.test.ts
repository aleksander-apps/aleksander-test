import assert from 'node:assert/strict';
import { test } from 'node:test';
import { powitanie, stanZdrowia } from '../../src/lib/powitanie.ts';

test('powitanie bez imienia', () => {
  assert.match(powitanie(), /^Cześć! To jest /);
});

test('powitanie z imieniem (spacje obcięte)', () => {
  assert.match(powitanie('  Ala '), /^Cześć, Ala! /);
});

test('stan zdrowia: błąd bazy = błąd, brak bazy = ok', () => {
  assert.deepEqual(stanZdrowia('blad'), { status: 'blad', baza: 'blad' });
  assert.deepEqual(stanZdrowia('brak'), { status: 'ok', baza: 'brak' });
  assert.deepEqual(stanZdrowia('ok'), { status: 'ok', baza: 'ok' });
});
