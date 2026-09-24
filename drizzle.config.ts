import { defineConfig } from 'drizzle-kit';

// Migracje SQL w repo (drizzle/), generowane z src/db/schema.ts: `pnpm db:generate`.
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_MIGRATION_URL ?? process.env.DATABASE_URL ?? '' },
});
