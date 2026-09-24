// `pnpm db:migrate` — migracje rolą migracji (DATABASE_MIGRATION_URL, awaryjnie DATABASE_URL).
import { migruj } from '../src/db/migracje.ts';

const url = process.env.DATABASE_MIGRATION_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error('Brak DATABASE_MIGRATION_URL / DATABASE_URL');
  process.exit(1);
}
await migruj(url);
console.log('Migracje: gotowe');
