import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Backing store for express-session. Lives in our schema and migrations rather
 * than being created by a session-store library, so it is visible, indexed, and
 * versioned like every other table.
 *
 * `userId` is lifted out of the session blob so "every session for this
 * account" is a query rather than a scan of serialised JSON. Nullable: a
 * session exists before anyone signs in. The foreign key to accounts is added
 * with the accounts table.
 */
export const sessions = pgTable(
  'sessions',
  {
    sid: text('sid').primaryKey(),
    data: text('data').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    userId: uuid('user_id'),
  },
  (table) => [
    index('sessions_expires_at_idx').on(table.expiresAt),
    index('sessions_user_id_idx').on(table.userId),
  ],
);
