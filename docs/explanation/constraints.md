# Constraints

The realities that make the usual way of building wrong here. Read this before
changing anything structural.

## 1. The first visit is on a slow, metered phone

**The reality:** the design system, the query stale times, and the bundle
ceiling (`frontend/bundle-budget.json`: 500 kB of JavaScript, 200 kB of CSS,
gzip) were chosen for budget Android phones on prepaid data.

**So here we:** keep the first load inside that ceiling, keep stale times long,
and do not refetch when the window regains focus.

**Instead of:** code-splitting nothing and shipping every page in the entry
bundle, or refetching on focus because a desktop on wifi would not notice.

**Confirmed by:** the engineering standard this repository was set up from,
2026-10-26. Correct this section if One Kawayan's audience is different.

## 2. Secrets cannot be un-published

**The reality:** a pushed branch is already exposed. GitHub does not forget a
commit that was force-pushed away, and it does not forget a co-author it has
already credited.

**So here we:** keep secrets in `.env` and in host dashboards, reject a staged
`.env` in the pre-commit hook and again in CI, and reject AI attribution in
commit messages the same way.

**Instead of:** a rule that lives only in a markdown file.

## 3. Tests that mock the database miss the bugs

**The reality:** the failures this stack is built to catch live in generated
SQL, in constraints, and in the shape returned across the API boundary. A mock
does not parse SQL.

**So here we:** run backend tests against a real Postgres, in a database named
`onekawayan_test`, and truncate between cases. The suite refuses any other
database name.

**Instead of:** a wide base of unit tests over mocked repositories.

## 4. One team, one database, one release owner

**The reality:** one product and one person who merges and releases (reyxdz).
`main` is staging. Production is a branch it is promoted to, by fast-forward,
and only when asked.

**So here we:** keep a modular monolith, squash-merge into `main`, and not open
pull requests into `production`.

**Instead of:** microservices, a merge commit that preserves the review, or a
push of an un-audited branch to production.
