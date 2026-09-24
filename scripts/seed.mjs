// `pnpm db:seed` — dane demo (lokalnie i w wersji publicznej; AP-11). Idempotentne.
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('Brak DATABASE_URL');
  process.exit(1);
}
const sql = postgres(url, { max: 1 });
const [{ ile }] = await sql`select count(*)::int as ile from wpisy`;
if (ile === 0) await sql`insert into wpisy (tresc) values ('Pierwszy wpis demo'), ('Drugi wpis demo')`;
console.log(`Seed: wpisów przed ${ile}`);
await sql.end();
