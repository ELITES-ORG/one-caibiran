# 0005. Versioned API prefix from day one

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

The API has one consumer today, deployed from the same repository at the same
time. Versioning an API with a single lockstep consumer is usually premature.

That will not stay true once any other client exists — a wrapped mobile build,
a second app, an integration — because those update on their own schedule.

## Decision

Mount everything under `/api/v1`. Routers compose into `apiRouter` in
`src/routes/index.ts`, which is mounted once at that prefix.

## Alternatives considered

**Unversioned `/api`.** Adding a version later means moving every route, or
running two surfaces.

**Header-based versioning.** Harder to inspect, to curl, and to cache, for no
benefit at this size.

## Consequences

A breaking change is a new prefix, not a silent change to `/api/v1`. The web
app and the API can still change together in one pull request while they are
the only pair.
