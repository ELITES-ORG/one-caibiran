# Commands

Root scripts delegate into the services. Where a root alias exists, prefer it.
Run them from the repository root.

| Command | Does |
|---|---|
| `npm run setup` | Creates missing `.env` files, installs git hooks, installs both services |
| `npm run setup:env` | Creates missing `.env` files. Never overwrites |
| `npm run hooks:install` | Points `core.hooksPath` at `.githooks/` |
| `npm run db:up` | Starts Postgres |
| `npm run db:down` | Stops it, keeps the volume |
| `npm run db:reset` | Destroys the volume and starts clean. Local data only |
| `npm run db:migrate` | Applies pending migrations |
| `npm run db:seed` | Loads reference data. Idempotent. Empty until there is some |
| `npm run dev:api` | API on :4000, watch mode |
| `npm run dev:web` | Web on :5173, watch mode |
| `npm run build` | Production build, both services |
| `npm run lint` | oxlint, both services |
| `npm run typecheck` | `tsc` over both services, no emit |
| `npm test` | Tooling tests, then backend, then frontend |
| `npm run docs:check` | Relative doc links, and plan status against the plan index |
| `npm run check:commits` | Rejects AI attribution in `origin/main..HEAD` |
| `npm run check:pr -- --body-file pr.md` | Runs the pull-request audit locally |
| `npm run check:bundle` | First page load against `frontend/bundle-budget.json`. Needs a frontend build |

## Backend

`npm --prefix backend run <script>`.

| Command | Does |
|---|---|
| `dev` | `tsx watch src/index.ts` |
| `build` | `tsc` to `dist/` |
| `start` | Runs the built output |
| `typecheck` | `tsc --noEmit` |
| `lint` | `oxlint src` |
| `test` | Vitest, against real Postgres |
| `db:generate` | Writes a migration from the schema diff. Review the SQL |
| `db:migrate` | Applies pending migrations |
| `db:push` | Syncs schema with no migration file. Local throwaway only. See [ADR 0003](../decisions/0003-migrations-over-db-push.md) |
| `db:studio` | Drizzle Studio |
| `db:seed` | Reference data |

One file of backend tests:

```bash
npm --prefix backend run test -- src/modules/health/health.routes.test.ts
```

One file of frontend tests:

```bash
npm --prefix frontend run test -- src/components/ui/button-styles.test.ts
```
