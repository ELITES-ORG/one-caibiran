# Change the database schema

Schema lives in `backend/src/db/schema/`, one file per area, re-exported from
`index.ts`. Migrations are generated from it and committed.

Copy [`backend/src/db/schema/sessions.ts`](../../backend/src/db/schema/sessions.ts).

---

## The loop

```bash
# 1. edit backend/src/db/schema/<area>.ts

# 2. generate a migration from the diff
npm --prefix backend run db:generate

# 3. review the generated SQL — always

# 4. apply it
npm --prefix backend run db:migrate
```

Step 3 is not optional. Drizzle infers intent from a diff and cannot always tell
a rename from a drop-and-add. A column rename it reads as a drop will delete
data.

## Why not `db:push`

`db:push` syncs the schema directly with no migration file. It needs a TTY to
confirm destructive changes, which CI does not have, and it leaves no reviewable
record. Generated migrations are the default. See
[ADR 0003](../decisions/0003-migrations-over-db-push.md).

`db:push` stays available for a throwaway local database. Never use it against
anything shared or deployed.

## Conventions

**Tables** `snake_case`, plural.

**Columns** `snake_case` in SQL, `camelCase` on the Drizzle object:
`expiresAt: timestamp('expires_at')`.

**Primary keys** `uuid().primaryKey().defaultRandom()` for rows the public can
count. A serial integer publishes how many rows exist.

**Timestamps** always `withTimezone: true`.

**Slugs** every publicly addressable row carries a `slug` with a unique index.

Update [the data model](../reference/data-model.md) in the same change.
