# 0020. Seal crimson, and keep the gold

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

One Caibiran uses the same product shell as One Kawayan. The Caibiran seal
is a deep crimson (`#810000`) with a gold ring. [ADR 0016](./0016-forest-green-and-gold.md)
had set the primary to Kawayan's forest green. The gold on the banner
wordmark, the active tab, and a gold button was already doing the job of a
second colour, and it is the same gold as the ring on this seal.

## Decision

Primary is the seal crimson. The utility ramp stays named `green`, so existing
screens keep their classes; the hue is no longer a green. Step 700 and
`--color-primary` are `#810000`.

Gold is unchanged (`#FAC247` at step 500). It remains a fill: the banner
wordmark, the active tab, and `accent` buttons. Text on that fill is a dark
crimson (`--color-on-accent`).

The manifest `background_color` is the seal (`#810000`), because that is the
launch splash. `theme_color` is the dark page (`#201210`), for the same reason
as [ADR 0019](./0019-colour-the-navigation-bar-from-the-manifest.md): the
Android navigation bar should stay dark. Danger moves off the seal's hue so an
error is not the brand.

## Alternatives considered

**Retint the gold to the ring's `#FFC108`.** It is a step yellower and a step
more saturated. The gold already in the product passes as the ring, and
changing it would repaint every place the accent is used.

**Rename the primary ramp from `green` to `crimson`.** Honest, and a sweep of
every utility for a name the screen never shows.

## Consequences

Tokens live in `frontend/src/styles/theme.css`. A class that says `green` is
the seal crimson. The typeface decisions in ADR 0016 and
[0017](./0017-roboto-on-the-public-home.md) stand.
