# 0001. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

Early choices in a stack like this look wrong without the context that produced
them: no PostGIS, a client-rendered SPA, a real database in the test suite.
Without a record, the predictable outcome is someone later asking "why didn't we
just use Next.js?" and quietly reversing a deliberate choice because it looked
like an oversight.

## Decision

Keep lightweight architecture decision records in `docs/decisions/`, numbered
sequentially, following `_template.md`.

Write one when a choice would be expensive to reverse, when a reasonable
alternative was rejected, or when the decision will look wrong without context.
Not for choices with an obvious default.

## Alternatives considered

**A single architecture document.** Mixes settled decisions with current-state
description, and gives no way to mark something superseded while keeping its
reasoning.

**A wiki.** Drifts from the code and does not appear in code review.

## Consequences

Decisions are reviewed in the same pull request as the code that implements
them. A superseded record stays. Numbers are never reused.
