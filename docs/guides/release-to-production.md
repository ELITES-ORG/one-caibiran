# Release to production

Only when reyxdz asks
([ADR 0011](../decisions/0011-only-reyxdz-merges-and-releases.md)).

`main` deploys to staging. Production is the `production` branch, updated by
fast-forwarding it to `main`
([ADR 0010](../decisions/0010-main-is-staging-production-is-a-branch.md)).

```bash
git fetch origin
git push origin origin/main:production
```

That is the whole release command. Do not open a pull request into
`production`. Do not force. Do not push any other ref.

Before the push:

1. Show what will ship: `git log --oneline origin/production..origin/main`.
2. Confirm CI is green on `main`.

After the push, the release guard fails if the released commit is not on
`main`. Confirm that run, the production frontend build, and the API health
check.

Hosts are not wired yet. The procedure above is the one to use once they are.
See [deployments](../reference/deployments.md).
