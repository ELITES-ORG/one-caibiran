# 0007. Tests run against a real database

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

The bugs this shape actually ships live in generated SQL, in constraints, and
in the JSON that crosses the API boundary. A mocked database does not parse
SQL. An assertion against a mock passes while Postgres rejects the query.

Page rendering is a different question. A headless render does not catch a
contrast failure, a 320px overflow, or a dark-mode token that inverted the
wrong way. Those are checked by looking at the screen.

## Decision

Backend tests run against Postgres, in a database named `onekawayan_test`.
The suite creates it, migrates it, truncates between cases, and refuses any
other database name so the development database cannot be wiped by accident.

Frontend tests are pure functions. No jsdom, no Testing Library. Screens are
checked in a browser. See
[Check a screen in a browser](../guides/check-a-screen-in-a-browser.md).

## Alternatives considered

**Mocked repositories.** Fast, and aimed away from where this code breaks.

**A browser test for every page.** Slow, brittle, and still not a phone.

## Consequences

`npm test` needs Docker. CI runs the same database. A test file that only
imports the app still pays for the database, because the pool is created at
import.
