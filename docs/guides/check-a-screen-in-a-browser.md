# Check a screen in a browser

Page rendering is not what the test suite covers
([ADR 0007](../decisions/0007-testing-strategy.md)). A screen is checked by
looking at it.

`scripts/screenshot.mjs` drives the Chrome already on the machine. It has no
extra dependency.

```bash
node scripts/screenshot.mjs "{\"url\":\"http://localhost:5173/\",\"out\":\"shot.png\",\"w\":375,\"h\":812,\"scheme\":\"dark\"}"
```

On PowerShell, pass the JSON as a single quoted string. The script prints its
own usage at the top of the file.

What to look at, every time the UI changes:

- Empty, loading, and error.
- Very long text, and a missing optional field.
- Signed out, and signed in once accounts exist.
- Phone width, 375px, and a short landscape height (`short:`).
- Light and dark. The palette follows `prefers-color-scheme`. Do not add a
  Tailwind `dark:` variant — fix the token.

This is desktop Chrome emulating a viewport. It does not replace a real phone.
