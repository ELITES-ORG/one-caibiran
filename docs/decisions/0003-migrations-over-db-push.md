# 0003. Generated migrations over `db:push`

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

`drizzle-kit push` diffs the schema against the live database and applies the
difference directly. It needs a TTY to confirm destructive changes, so it fails
in CI. A column rename can be inferred as a drop plus an add, which deletes data.

`drizzle-kit generate` writes a SQL migration. `migrate` applies pending ones
in order.

## Decision

Generated migrations are the default. `db:generate`, then read the SQL, then
`db:migrate`, with the migration committed beside the schema change.

`db:push` stays in `package.json` for a throwaway local database. It is never
used against anything shared or deployed.

## Alternatives considered

**`push` everywhere.** No reviewable record, and it fails in CI.

**Hand-written SQL only.** Duplicates the schema, and the two drift.

## Consequences

Reviewing the generated SQL is mandatory. A migration that drops a column the
running code still reads does not ship.
