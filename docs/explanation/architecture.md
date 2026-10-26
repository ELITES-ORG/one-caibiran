# Architecture

Why the system is shaped this way. For how to change it, see the
[guides](../guides/add-an-api-endpoint.md). For exact names, see the
[reference](../reference/api.md).

---

## Two services, one repository

```
          browser
             │
   ┌─────────┴──────────┐
   │  React SPA (Vite)  │   :5173 dev
   └─────────┬──────────┘
             │  /api/v1  (Vite proxies in dev; same origin in prod)
   ┌─────────┴──────────┐
   │  Express 5 API     │   :4000
   └─────────┬──────────┘
             │  Drizzle
   ┌─────────┴──────────┐
   │  PostgreSQL 17     │
   └────────────────────┘
```

They are deployed and scaled independently but versioned together. At this size
a monorepo with two `package.json` files beats either a single bundled service
or separate repositories: one PR can change an endpoint and its consumer, and
there is no package to publish between them.

The frontend never talks to Postgres. The backend serves no HTML.

Recorded as [ADR 0002](../decisions/0002-pern-with-client-rendered-spa.md).

---

## Request lifecycle

A request to `GET /api/v1/health`:

1. **`app.ts` middleware**, in order — `helmet`, `cors`, `compression`, JSON
   body parsing, the cookie session, `pino-http`
2. **`routes/index.ts`** matches the `/health` prefix
3. **`modules/health/health.routes.ts`** runs the handler
4. **Response.** Liveness returns the health shape. A feature route returns
   `{ data }`
5. **No match, or a throw** → `notFoundHandler` / `errorHandler`, producing
   `{ error: { code, message, details } }`

Express 5 forwards rejected promises from `async` handlers to the error handler
by itself. There is no `asyncHandler` wrapper. Do not add one.

---

## Backend layering

```
src/
├── config/     environment, validated once at boot
├── lib/        logger, AppError, session store
├── db/         client, schema, seed
├── middleware/ cross-cutting request handling
├── modules/    features — router, validation, data access
├── contracts/  response shapes, imported by both sides
└── routes/     composition; the only place modules are mounted
```

**Environment is validated at boot, not at use.** A bad `DATABASE_URL` crashes
at startup with a message naming the field.

**Errors are thrown, never hand-written.** `AppError` carries a status and a
code. Anything else is a bug, logged at error level, and reported as a generic
500.

**Modules do not import each other's internals.** Shared behaviour moves to
`lib/` or the database layer.

**Sessions are rows in Postgres**, through one driver (`postgres.js`) and one
pool. A second driver for the session store is not added.

---

## Frontend layering

```
src/
├── components/ui/      primitives with no domain knowledge
├── features/<name>/    query hooks per feature
├── lib/                api client, query client, cn
├── pages/              route composition only
└── styles/             tokens, base, motion
```

**Server state is TanStack Query's, not React's.** Anything fetched lives in
the query cache with a key from that feature's key factory.

**Stale times are long on purpose.** Reference data uses `Infinity`. The
default is five minutes. See [constraints](./constraints.md).

**All errors normalise through `toApiError`.**

**Styling is tokens only.** See [`frontend/DESIGN.md`](../../frontend/DESIGN.md).

---

## What is deliberately absent

| Not here | Why |
|---|---|
| PostGIS, Elasticsearch, Redis, GraphQL, microservices | One product, one team, one database, one HTTP/JSON surface. Postgres full-text and Postgres-backed sessions cover the load this shape is built for |
| A second Postgres driver for sessions | The session store is written on Drizzle so there is one pool |
| Server-rendered HTML | Accepted debt. See ADR 0002. Link previews for public pages are a crawler-only HTML endpoint, added when there is a public page to share |
