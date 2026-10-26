import { describe, expect, it } from 'vitest';
import { envSchema } from './env.js';

const valid = {
  DATABASE_URL: 'postgres://onekawayan:onekawayan@localhost:5432/onekawayan_test',
  SESSION_SECRET: 'test-session-secret-at-least-32-characters-long',
};

describe('envSchema', () => {
  it('accepts the local development shape', () => {
    expect(envSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a session secret shorter than 32 characters', () => {
    const result = envSchema.safeParse({ ...valid, SESSION_SECRET: 'too-short' });
    expect(result.success).toBe(false);
  });

  it('treats a blank Sentry DSN as unset', () => {
    const result = envSchema.safeParse({ ...valid, SENTRY_DSN: '  ' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.SENTRY_DSN).toBeUndefined();
  });
});
