# Implementation plans

Step-by-step build plans with live checklists. Each plan tracks what is done and
what remains.

| | Purpose | Lifespan |
|---|---|---|
| [Guides](../guides/add-an-api-endpoint.md) | How to do a recurring task | Permanent |
| [Decisions](../decisions/README.md) | Why we chose something | Permanent |
| **Plans** | How to build one specific thing, once | Until shipped |

A plan is written to be executed, including by someone with no prior context.
When it is fully shipped, mark it **Complete** and leave it.

---

## Writing a plan

Copy [`_template.md`](./_template.md). Number sequentially; never renumber.

**Commits made while executing a plan carry no AI attribution.** See
[`CLAUDE.md`](../../CLAUDE.md).

**A plan must be executable without asking questions.** That means:

- **Exact file paths.**
- **Complete file contents**, not fragments, wherever a file is created.
- **Exact commands**, with the directory to run them from.
- **Expected output** after each step.
- **One action per step.** If a step contains "and", it is probably two steps.
- **A checkbox on every step.**

Write the verification before the implementation where you can.

**State assumptions explicitly.** If a step depends on something that does not
exist yet, say so and mark the plan blocked rather than inventing it.

---

## Status values

| Status | Means |
|---|---|
| **Draft** | Being written. Do not execute |
| **Ready** | Executable now |
| **Blocked** | Cannot proceed. The blocker is named at the top |
| **In progress** | Partially executed. Checkboxes are current |
| **Complete** | Shipped and verified |

---

## Plans

| # | Plan | Status |
|---|---|---|
| — | None yet | — |
