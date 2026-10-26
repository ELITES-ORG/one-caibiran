# 0002. PERN with a client-rendered SPA

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

The application needs a relational store and a web client. Two facts pull in
opposite directions:

1. A client-rendered SPA serves an empty `<div id="root">` to anything that
   does not execute JavaScript. Facebook's scraper does not. Shared links
   render as a blank card until a public page has its own HTML.
2. The chosen stack is Postgres, Express, React, and Node, as two separately
   deployable services.

## Decision

Build an Express 5 API and a Vite-built React SPA, deployed as separate
services, versioned in one repository. The gap for crawlers is accepted as
known debt, solved later with a small HTML response for preview crawlers on
the public routes that need it — not by rendering the SPA on the server.

## Alternatives considered

**Next.js.** SSR comes free and solves previews. Rejected because the stack is
two services, and a pull request must be able to change an endpoint and its
consumer together without a published package.

**One bundled service that serves HTML and JSON.** Couples the release of the
UI to the release of the API.

## Consequences

The frontend never talks to Postgres. The backend serves no HTML. Link previews
are a follow-up, not a reason to change the stack. Search-engine indexing of
public pages stays open until there is a public page worth indexing.
