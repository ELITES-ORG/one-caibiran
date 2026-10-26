# Add an API endpoint

The backend groups routes by feature under `src/modules/`. A module owns its
router, its validation, and its data access. It does not reach into another
module's internals.

Copy [`backend/src/modules/health/health.routes.ts`](../../backend/src/modules/health/health.routes.ts).

---

## 1. Create the module

```
backend/src/modules/<feature>/
├── <feature>.routes.ts      route definitions
├── <feature>.schema.ts      zod schemas, once inputs exist
└── <feature>.service.ts     data access, once the router stops being readable
```

Start with just `.routes.ts`. Split out a service when the router is no longer
readable — not before.

## 2. Write the router

Three things to copy from health:

- **Relative imports end in `.js`.** The build is ESM with `NodeNext`.
  TypeScript resolves `./foo.js` to `foo.ts`. Omitting the extension still runs
  under the dev server and the tests, so it looks fine until `npm run typecheck`
  rejects it.
- **Throw `AppError`. Do not hand-write error JSON.** The central handler gives
  every error one shape: `{ error: { code, message, details } }`.
- **`async` handlers need no wrapper.** Express 5 forwards rejected promises to
  the error handler on its own. Do not add an `asyncHandler`.

A feature route answers `{ data }` (or `{ data, meta }` for a list). Annotate
the payload with a type from `backend/src/contracts/`. See
[ADR 0008](../decisions/0008-one-definition-of-an-api-shape.md).

## 3. Mount it

In `backend/src/routes/index.ts`, and only there:

```ts
import { featureRouter } from '../modules/<feature>/<feature>.routes.js';

apiRouter.use('/<feature>', featureRouter);
```

Everything hangs off `/api/v1` ([ADR 0005](../decisions/0005-versioned-api-prefix.md)).

## 4. Validate input

Anything from the client — body, query, or params — is parsed with zod before
use. A `ZodError` reaching the error handler becomes a 400 with per-field
messages. Do not catch it.

## 5. Share the response type

Add the shape to `backend/src/contracts/<feature>.ts`. No runtime code in that
folder. The frontend imports it as `@contracts/<feature>`.

Update [the API reference](../reference/api.md) in the same change.
