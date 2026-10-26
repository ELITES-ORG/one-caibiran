# API

Prefix: `/api/v1`.

Errors, every route: `{ error: { code, message, details } }`.

A feature route answers `{ data }`. A list answers `{ data, meta }` with `meta`
typed as `ListMeta` from `backend/src/contracts/pagination.ts`.

| Method | Path | Auth | Response |
|---|---|---|---|
| GET | `/api/v1/health` | none | `HealthResponse` — process is up |
| GET | `/api/v1/health/ready` | none | `{ status, database }` — Postgres is reachable |

Shapes live in `backend/src/contracts/`. Add a row here in the same change as
the route.
