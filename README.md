# One Kawayan

React, Express, and Postgres, laid out as two services in one repository.

The product this application is for is not written down yet. The engineering
shape is: a client-rendered React SPA, an Express 5 API under `/api/v1`, and
PostgreSQL 17, with Drizzle migrations, cookie sessions, and a token-only
design system.

## Quick start

Requires Node 20+, Docker Desktop, and npm.

```bash
npm run setup        # env files, git hooks, dependencies for both services
npm run db:up        # Postgres in Docker
npm run db:migrate
npm run db:seed

npm run dev:api      # http://localhost:4000
npm run dev:web      # http://localhost:5173   (second terminal)
```

Full walkthrough: [docs/getting-started/local-setup.md](docs/getting-started/local-setup.md).

## Stack

| Layer | Choice |
|---|---|
| Database | PostgreSQL 17 |
| API | Express 5 + TypeScript, Drizzle ORM |
| Web | React 19 + TypeScript, Vite, Tailwind CSS 4 |
| Data fetching | TanStack Query + Axios |
| Routing | React Router |
| Logging | Pino |

Backend and frontend are separate services, deployable independently and
versioned together. Both are strict TypeScript.

## Layout

```
one-kawayan/
├── docs/              Developer documentation — start here
├── backend/           Express API
├── frontend/          React SPA  (see frontend/DESIGN.md)
├── scripts/           Repo tooling
└── docker-compose.yml Local Postgres
```

## Documentation

Organised by purpose — see [docs/README.md](docs/README.md).

| | |
|---|---|
| [Getting started](docs/getting-started/local-setup.md) | Get it running |
| [Guides](docs/guides/add-an-api-endpoint.md) | How to do a specific task |
| [Reference](docs/reference/commands.md) | API, data model, environment, commands |
| [Explanation](docs/explanation/architecture.md) | Architecture, and the constraints that shape it |
| [Decisions](docs/decisions/README.md) | Why we chose what we chose |
| [Plans](docs/plans/README.md) | Step-by-step build plans |
| [Design system](frontend/DESIGN.md) | Tokens, primitives, and UI rules |

New to the project? Read [operating constraints](docs/explanation/constraints.md)
before changing anything structural.
