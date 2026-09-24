import { readFileSync } from 'node:fs';

// TLS do PostgreSQL: DATABASE_CA = ścieżka do pliku CA serwera → weryfikacja certyfikatu i nazwy hosta z DATABASE_URL.
// Bez zmiennej zwraca {} — wtedy decyduje sam adres (np. ?sslmode=require na Vercelu/Neonie). Uwaga: postgres.js traktuje
// samo pole `ssl` (nawet `undefined`) jako ustawienie i pomija sslmode z adresu — dlatego pole tylko, gdy jest CA (24.09).
export function opcjeTls(sciezkaCa = process.env.DATABASE_CA): { ssl?: { ca: string } } {
  return sciezkaCa ? { ssl: { ca: readFileSync(sciezkaCa, 'utf8') } } : {};
}
