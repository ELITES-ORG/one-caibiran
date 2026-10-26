# 0011. Only reyxdz merges and releases

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

Every change is audited before it merges. The person who approves, declines,
merges, and releases is reyxdz.

GitHub cannot stop a pull request being opened. The enforceable point is the
merge. A ruleset that requires reyxdz's approval, applied to everyone including
reyxdz, makes reyxdz's own pull requests unmergeable. A ruleset's bypass list
names roles. reyxdz is the organisation admin, so "organisation admin" means
reyxdz for as long as that stays true.

## Decision

On `main`: a pull request is required, review threads are resolved, and the
`check` and `pr-audit` checks must pass. Nobody bypasses that. A second ruleset
lets an organisation admin merge, which is how reyxdz's own pull requests land.
Only reyxdz pushes `production`.

CODEOWNERS is `* @reyxdz`.

## Alternatives considered

**Anyone with write access merges after one review.** The audit is then
optional in practice.

**A required approving review from reyxdz with no bypass.** reyxdz cannot merge
their own work.

## Consequences

The GitHub rulesets are created by hand on the repository. The files in
`.github/` are the checks those rulesets require. They do not create the
rulesets themselves.
