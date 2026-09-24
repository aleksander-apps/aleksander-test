// Next.js uruchamia register() raz przy starcie serwera: migracje bazy rolą migracji (DATABASE_MIGRATION_URL).
// Bez tej zmiennej (dev, testy) — nic nie robi.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || !process.env.DATABASE_MIGRATION_URL) return;
  const { migruj } = await import('./db/migracje.ts');
  await migruj(process.env.DATABASE_MIGRATION_URL);
}
