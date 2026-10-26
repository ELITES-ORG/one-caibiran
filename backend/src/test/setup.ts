import { afterAll, beforeEach } from 'vitest';
import { closeDatabase, sql } from '../db/index.js';

let truncatable: string[] | null = null;

async function tablesToTruncate(): Promise<string[]> {
  if (truncatable) return truncatable;

  const rows = await sql<{ tablename: string }[]>`
    select tablename from pg_tables where schemaname = 'public'
  `;

  truncatable = rows
    .map((row) => row.tablename)
    .filter((name) => !name.startsWith('__drizzle'));

  return truncatable;
}

beforeEach(async () => {
  const tables = await tablesToTruncate();
  if (tables.length === 0) return;

  const list = tables.map((name) => `"public"."${name}"`).join(', ');
  await sql.unsafe(`truncate table ${list} restart identity cascade`);
});

afterAll(async () => {
  await closeDatabase();
});
