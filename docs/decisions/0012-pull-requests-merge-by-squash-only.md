# 0012. Pull requests merge by squash only

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

A merge commit keeps the contributor's commits, the audit's fix commits, and
the merges of `main` in between. That history says more about how the pull
request was reviewed than about what changed.

## Decision

`main` accepts squash merges only. Each pull request lands as one commit,
titled from the pull request. The pull request's branch is deleted on merge.

Start every branch fresh from `origin/main`. Never reuse a merged branch, and
never branch from another open pull request's branch — a squash leaves that
second branch without the commits it was based on.

## Alternatives considered

**Merge commits.** Honest about the sequence of the review, and noisy on
`main`.

**Rebase and merge.** Keeps every commit, including the ones the audit rewrote,
and invites force-pushes of branches other people have checked out.

## Consequences

`git log` on `main` is one line per pull request. Fixups belong in the branch,
not as a follow-up commit on `main`.
