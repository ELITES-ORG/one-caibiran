# Issue N. Short title

- **Status:** Ready | In progress | Complete
- **Issue:** link
- **Ground truth checked against:** `main` at commit `<sha>`, on YYYY-MM-DD

## Ground truth

What you verified on `main` before writing this, so a later reader can tell
what has drifted. File paths, and the behaviour you observed.

## Do this

Numbered steps. Exact paths. Complete file contents where a file is created.
One action per step. The command that proves the step, and the output that
means it worked.

## Do not

What looks related and is out of scope, and where that work belongs instead.

## Stop and ask

The cases where guessing is worse than waiting.

## Checks

```bash
npm run typecheck
npm run lint
npm run docs:check
```

Plus the test files this issue touches.

## Pull request

The description, filled in against
[`.github/pull_request_template.md`](../../.github/pull_request_template.md).
No AI attribution.
