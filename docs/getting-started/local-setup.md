# Local setup

Clone to a running app. Budget 10 minutes, most of it waiting on `npm install`
and a Docker image pull.

If any step here fails or has drifted, fix it in the same PR as whatever you
came to do. This page rots faster than anything else in the docs.

---

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node | 20+ (24 in CI) | `node -v` |
| npm | 10+ | `npm -v` |
| Docker Desktop | any current | `docker info` |
| Git | any current | `git --version` |

`docker info` failing with a pipe error means Docker Desktop is installed but
the daemon is not running. Start the app and wait for the whale icon to settle.

You do not need Postgres installed locally — it runs in Docker.

Port **5432** is the database port. If another local Postgres already holds it,
stop that container before `npm run db:up`.

---

## 1. Install dependencies

From the repository root:

```bash
npm run setup
```

This creates missing `.env` files from `.env.example`, points git hooks at
`.githooks/`, and installs both services. It does not install anything at the
root — the root `package.json` exists only to hold cross-service scripts.

> **If npm blocks an install script:** npm 11 gates postinstall scripts. `tsx`
> and `drizzle-kit` both need esbuild's, which fetches the platform binary.
> Approve it with `npm --prefix backend install-scripts approve esbuild`.

---

## 2. Start Postgres

```bash
npm run db:up
```

First run pulls `postgres:17-alpine`. Confirm it is healthy before continuing:

```bash
docker compose ps
```

STATUS should read `Up (healthy)`.

---

## 3. Create the schema

```bash
npm run db:migrate
npm run db:seed
```

`db:migrate` applies the committed migrations. `db:seed` is idempotent. Today
it has no reference rows to insert; it still has to succeed.

`backend/.env` is created by `npm run setup` and points at the Docker database.

---

## 4. Run the app

Two terminals, from the repository root:

```bash
npm run dev:api    # http://localhost:4000
npm run dev:web    # http://localhost:5173
```

The web dev server proxies `/api` to the API, so the browser stays on one
origin and the session cookie behaves as it will in production.

Open http://localhost:5173. The home page calls `GET /api/v1/health` and says
the API is up.

Readiness, which also checks Postgres:

```bash
curl http://localhost:4000/api/v1/health/ready
```

Expected: `{"status":"ready","database":"connected"}`.

---

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run docs:check
```

`npm test` needs the Docker database. It creates `onekawayan_test` itself and
refuses to run against the development database.
