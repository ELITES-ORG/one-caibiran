import { execFileSync } from 'node:child_process';
import postgres from 'postgres';

/**
 * Runs once, before any test file. Creates the test database if it is missing,
 * then migrates it.
 *
 * It fails loudly rather than subtly: a contributor with the container stopped
 * should be told to start it, not handed failing assertions that look like
 * broken code.
 */
export default async function setup() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL was not set by vitest.config.ts.');

  const name = new URL(url).pathname.slice(1);

  if (name !== 'onekawayan_test') {
    throw new Error(
      `Refusing to run tests against "${name}". Tests truncate between cases, and only `
        + '"onekawayan_test" is expendable. Set TEST_DATABASE_URL to a database with that name.',
    );
  }

  const adminUrl = new URL(url);
  adminUrl.pathname = '/postgres';

  let admin: postgres.Sql;
  try {
    admin = postgres(adminUrl.toString(), { max: 1, onnotice: () => undefined });
    await admin`select 1`;
  } catch (error) {
    throw new Error(
      `Cannot reach Postgres at ${adminUrl.host}. Run "npm run db:up" and try again.\n`
        + `Original error: ${(error as Error).message}`,
    );
  }

  try {
    const existing = await admin`select 1 from pg_database where datname = ${name}`;
    if (existing.length === 0) {
      await admin.unsafe(`create database "${name}"`);
    }
  } finally {
    await admin.end();
  }

  const env = { ...process.env, DATABASE_URL: url, NODE_ENV: 'test' };
  try {
    execFileSync('npm', ['run', 'db:migrate'], {
      cwd: process.cwd(),
      env,
      stdio: 'pipe',
      shell: true,
    });
  } catch (error) {
    const stderr = (error as { stderr?: Buffer }).stderr?.toString() ?? '';
    throw new Error(`"npm run db:migrate" failed while preparing the test database.\n${stderr}`);
  }
}
