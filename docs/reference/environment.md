# Environment variables

Names only. Values live in `.env` locally and in the host dashboard when
deployed. `.env.example` carries a safe placeholder.

## Backend (`backend/.env`)

| Name | Required | Purpose |
|---|---|---|
| `NODE_ENV` | no | `development`, `test`, or `production`. Default `development` |
| `PORT` | no | Default `4000` |
| `DATABASE_URL` | yes | Postgres connection string |
| `CORS_ORIGINS` | no | Comma-separated browser origins. Default `http://localhost:5173` |
| `LOG_LEVEL` | no | Pino level. Default `info` |
| `SESSION_SECRET` | yes | At least 32 characters. Cookie signing key |
| `SESSION_TTL_DAYS` | no | Default `30` |
| `SENTRY_DSN` | no | Empty means errors are logged and not reported |

Validated once at boot in `backend/src/config/env.ts`. A bad value exits the
process before it listens.

## Frontend (`frontend/.env`)

| Name | Required | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | no | Default `/api/v1`. In dev the Vite proxy makes that the API |

`VITE_` variables are baked into the browser bundle. Never put a secret in one.
