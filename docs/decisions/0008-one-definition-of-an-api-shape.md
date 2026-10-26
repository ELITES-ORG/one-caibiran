# 0008. One definition of an API shape

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

The frontend hand-writing its own interfaces for every response compiles
cleanly when the server sends a different field. The value is computed and
thrown away, or a property is read on `undefined` and the page goes blank.
Optional fields make "the server did not send it" and "there is nothing to
show" look the same.

## Decision

A response shape is declared once, in `backend/src/contracts/`, and imported by
both sides. The backend annotates what it returns. The frontend imports the
type. The folder holds types only: no runtime code, no Drizzle types, no zod.

A list is `Paginated<T>`: `{ data, meta }`, and the meta variable is annotated,
because `res.json()` does not check an unannotated object.

## Alternatives considered

**Generating a client from an OpenAPI document.** A second build, and a
document that drifts unless something fails the build when it does. The
contract files are the document.

**Sharing zod schemas.** Pulls runtime code and the validation library into the
browser bundle, and tempts the contract folder to grow helpers.

## Consequences

A new route adds a contract file in the same change, or it extends one that
exists. The rules are in `backend/src/contracts/README.md`.
