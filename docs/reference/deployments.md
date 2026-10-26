# Deployments

Not wired yet. The intended shape, recorded in
[ADR 0010](../decisions/0010-main-is-staging-production-is-a-branch.md):

| | Staging | Production |
|---|---|---|
| Branch | `main` | `production`, fast-forwarded from `main` |
| Web | Vercel | Vercel |
| API | Render | Render |
| Database | hosted Postgres | hosted Postgres |

The browser and the API share one origin in production: the frontend host
proxies `/api` to the API, so the session cookie stays first-party. Locally,
Vite does that proxy.

`main` deploys to staging on push. Production moves only when reyxdz runs the
command in [Release to production](../guides/release-to-production.md).

## Free-tier hours

A free API instance that is pinged around the clock burns the monthly hour
cap and can suspend every free service in the workspace. When a keep-awake
workflow is added, it pings during waking hours in Philippine time only
(06:00–22:50, UTC+8, no daylight saving), and staging at most once a day so a
free database does not pause after a week idle.

Do not point that workflow at another project's hosts.

## What CI already checks

On every push and pull request: commit messages, typecheck, lint, tests
against Postgres 17, both builds, the first-load bundle ceiling, and the docs
checks. `pr-audit` runs from `main`'s copy of the script, so a pull request
cannot edit the audit to pass itself.
