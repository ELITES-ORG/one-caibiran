import 'dotenv/config';
import { z } from 'zod';

/**
 * Environment is validated once, at boot. A missing or malformed variable
 * should crash the process immediately rather than surface as a confusing
 * runtime error three layers deep in a request handler.
 */
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),

  // A trailing newline from a dashboard textarea must not become part of the
  // value. Trim everything that arrives as free text.
  DATABASE_URL: z
    .string()
    .trim()
    .url({ message: 'DATABASE_URL must be a valid postgres:// connection string' }),

  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173')
    .transform((value) =>
      value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),

  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  SESSION_SECRET: z.string().trim().min(32, 'SESSION_SECRET must be at least 32 characters'),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().default(30),

  // Optional. Empty means unset, so a deploy without it keeps the API up and
  // simply reports nothing.
  SENTRY_DSN: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().url('SENTRY_DSN must be the DSN URL from the Sentry project').optional(),
  ),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  console.error(`Invalid environment configuration:\n${issues}\n`);
  process.exit(1);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
