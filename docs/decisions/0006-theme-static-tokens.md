# 0006. `@theme static` for design tokens

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

Tailwind 4 defines tokens in CSS via `@theme`, and by default tree-shakes them:
only variables backing a utility it finds in source are emitted.

That is wrong for a design system. A swatch, a canvas, or an inline style that
reads `var(--color-slate-950)` resolves to nothing when no class happens to use
that step. No build error.

## Decision

Tokens are declared with `@theme static` in `frontend/src/styles/theme.css`, so
every token is emitted to `:root`.

Components use the utilities or `var(--token)`. They do not carry raw hex,
arbitrary pixel sizes, or one-off shadows.

## Alternatives considered

**Default `@theme`.** Smaller CSS, and a silent blank wherever a token is read
by name.

**A JavaScript theme object.** A second source of truth next to the CSS.

## Consequences

Dropping `static` silently breaks anything that reads a token variable. The
design-system rules are in `frontend/DESIGN.md`.
