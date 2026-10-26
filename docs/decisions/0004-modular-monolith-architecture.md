# 0004. Modular monolith with feature slices

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

One product, one small team, one database, one delivery mechanism (HTTP/JSON).
The workload is CRUD, filtering, and search. Structure chosen now determines
whether that stays navigable.

## Decision

A modular monolith, sliced by feature.

Backend: `config/`, `lib/`, `db/`, `middleware/`, `modules/<feature>/`,
`contracts/`, and `routes/` as the only place a module is mounted.

A module owns its router, its zod schemas, and its data access. Modules do not
import each other's internals. Shared behaviour moves to `lib/` or the database.

Frontend: `components/ui/` for primitives, `features/<name>/` for a feature's
data layer, `pages/` for route composition, `styles/` for tokens.

## Alternatives considered

**Microservices.** Nothing here needs an independent deployable per feature,
and every one of them adds a component someone has to run.

**A layered architecture with one `controllers/` and one `services/` for the
whole API.** Feature code scatters, and the boundary between features
disappears.

## Consequences

Adding a feature is a folder, a mount line, and a contract file. Cross-feature
imports are a signal that a third thing wants to exist in `lib/`.
