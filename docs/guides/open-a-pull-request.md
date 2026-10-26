# Open a pull request

Every pull request into `main` is audited before it merges, and only reyxdz
merges ([ADR 0011](../decisions/0011-only-reyxdz-merges-and-releases.md)).
Merging is squash-only
([ADR 0012](../decisions/0012-pull-requests-merge-by-squash-only.md)), so the
branch starts fresh from `origin/main`.

The description is the template in
[`.github/pull_request_template.md`](../../.github/pull_request_template.md).
`pr-audit` fails the pull request until the required sections say something:

- What and why
- Acceptance criteria
- What changed
- How to verify
- Rollout
- Known gaps and risks
- Checklist

Check it locally, with the description saved to a file that is not committed:

```bash
npm run check:pr -- --body-file pr.md
```

No AI attribution in the commits or the description
([ADR 0009](../decisions/0009-ai-attribution-is-blocked-by-a-hook-not-a-rule.md)).

A schema change ships its migration. A new environment variable ships in
`.env.example`, `env.ts`, and
[environment.md](../reference/environment.md) — the name, never a value. A new
route updates [api.md](../reference/api.md). An expensive-to-reverse choice
gets a decision record.

`States checked` and screenshots are required when the UI changes. See
[Check a screen in a browser](./check-a-screen-in-a-browser.md).
