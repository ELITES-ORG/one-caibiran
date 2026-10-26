# 0010. `main` is staging; production is a branch

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

One environment means every push to `main` reaches the people using the
product, including a bad migration. A second environment needs a decision about
which branch deploys where, before the hosts exist.

## Decision

`main` deploys to staging. Production is the `production` branch. A release is
`git push origin origin/main:production` — a fast-forward of a commit already
on `main`. No pull request into `production`. No force. No other ref.

The release guard workflow fails when a commit lands on `production` that is
not contained in `main`.

## Alternatives considered

**`main` is production, and staging is a long-lived branch.** Staging then
drifts, and the branch people forget to update is the one they think is safe.

**A pull request from `main` into `production`.** A second review of commits
that were already audited, and a place for a merge commit the release command
is designed to avoid.

## Consequences

Hosts are not wired yet. The branch rule is in place so the first deploy does
not invent a different one. See
[deployments](../reference/deployments.md).
