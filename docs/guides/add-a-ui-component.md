# Add a UI component

The rules — when to use which variant, colour, motion — are in
[`frontend/DESIGN.md`](../../frontend/DESIGN.md). Read that first.

Copy [`frontend/src/components/ui/Button.tsx`](../../frontend/src/components/ui/Button.tsx)
and [`button-styles.ts`](../../frontend/src/components/ui/button-styles.ts).

---

## Where it goes

| Location | For |
|---|---|
| `src/components/ui/` | Primitives with no domain knowledge |
| `src/features/<feature>/` | Components that know a feature's types |
| `src/pages/` | Route composition only |

A component in `ui/` that imports a domain type belongs in `features/`.

## The shape

- Extend the native props interface so callers get `id`, `aria-*`, and `data-*`.
- Pass `className` through `cn` last. `tailwind-merge` lets a caller override
  one utility without a specificity fight.
- Variants are a `Record<Union, string>`, not string concatenation. The
  compiler then catches a missing variant.
- Spread `...props`.
- Export the primitive from `src/components/ui/index.ts`.

## Never interpolate a class name

`` `bg-${color}-500` `` generates nothing. Tailwind only sees complete literals.
Read a token with `var(--color-…)` or write the full class in the source.

## Data

Server state belongs to TanStack Query, not `useState`. A feature's queries live
in `src/features/<feature>/api.ts`, with a key factory, and the response type
comes from `@contracts/<feature>`. Copy
[`frontend/src/features/health/api.ts`](../../frontend/src/features/health/api.ts).

Normalise caught errors with `toApiError` from `src/lib/api-client.ts` so a
screen renders `error.message` without knowing whether the failure was a
timeout, an offline device, or a 500.
