import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Przykładowa tabela — zamień na model aplikacji, potem `pnpm db:generate` (nowa migracja w drizzle/).
export const wpisy = pgTable('wpisy', {
  id: serial('id').primaryKey(),
  tresc: text('tresc').notNull(),
  utworzono: timestamp('utworzono', { withTimezone: true }).notNull().defaultNow(),
});

export type Wpis = typeof wpisy.$inferSelect;
