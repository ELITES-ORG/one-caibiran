# 0009. AI attribution is blocked by a check, not by a rule

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

`CLAUDE.md` forbids a `Co-authored-by` trailer that names an AI tool, and
forbids a "Generated with" footer. An agent's own instructions often add the
trailer anyway.

A rule in a markdown file only binds the tools that read it. GitHub credits a
co-author when it first receives the commit, and does not retract that credit
when the commit is later amended or force-pushed away.

## Decision

A `commit-msg` hook rejects the trailer locally. CI runs the same check on
every push, because a clone that never ran `npm run setup` has no hook. The
script is `scripts/check-commit-msg.mjs`.

## Alternatives considered

**The markdown rule alone.** It did not hold in repositories that relied on it.

**Stripping the trailer in a later amend.** GitHub has already credited the
co-author.

## Consequences

Commits are the human contributor's. The hook is installed by `npm run setup`.
CI is the backstop.
