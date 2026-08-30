---
name: run-rheumatology-digest
description: Build, serve, screenshot, validate and pre-push-check the Rheumatology Digest Hugo site. Use when asked to run, start, build, preview, test, screenshot, smoke-test or verify the site, or to check whether a post or case is ready to publish/push.
---

# Run Rheumatology Digest

A Hugo + PaperMod static site (`hugo v0.161.1+extended`). There is no app
server and no test suite — the things that actually break here are
**content-level** (a post that silently 404s in production, a link preview
that resolves to nothing) and **runtime-JS-level** (interactive case gating).

Everything is driven by one zero-dependency Node script:

```
.claude/skills/run-rheumatology-digest/driver.mjs
```

All paths below are relative to the repo root.

## Prerequisites

Verified present on this machine. Check versions:

```bash
hugo version && node --version
```

Needs Hugo **extended** ≥ 0.161.1 (`brew install hugo`) and Node ≥ 18
(the driver uses built-in `fetch` and `AbortSignal.timeout`). Google
Chrome is optional — only `shot` and `case` use it; both degrade to a
warning if it is absent.

The PaperMod theme is a git submodule. On a fresh clone:

```bash
git submodule update --init --recursive
```

## Run (agent path)

**The one command that matters** — the pre-push gate. Checks changed
content against the publishing checklist, builds, verifies every page
serves with a resolving `og:image`, and asserts case gating still works:

```bash
node .claude/skills/run-rheumatology-digest/driver.mjs all
```

Exit 0 = safe to push. Exit 1 = do not push; failures are listed with the
consequence spelled out. Takes **~9 s** end to end (two headless Chrome
launches are most of it); `smoke` alone is under a second.

Individual commands:

```bash
node .claude/skills/run-rheumatology-digest/driver.mjs check iga-vasculitis
node .claude/skills/run-rheumatology-digest/driver.mjs check --staged
node .claude/skills/run-rheumatology-digest/driver.mjs build
node .claude/skills/run-rheumatology-digest/driver.mjs serve
node .claude/skills/run-rheumatology-digest/driver.mjs smoke
node .claude/skills/run-rheumatology-digest/driver.mjs case
node .claude/skills/run-rheumatology-digest/driver.mjs shot /cases/child-with-limp-case/
node .claude/skills/run-rheumatology-digest/driver.mjs stop
node .claude/skills/run-rheumatology-digest/driver.mjs audit
```

| Command | What it does |
|---|---|
| `all` | `check --staged` + `build` + `smoke` + `case`. The pre-push gate. |
| `check <match>` | Publishing checklist on content matching a path substring. No server needed. |
| `check --staged` | Same, but only content changed in the working tree. |
| `audit` | Checklist over the whole archive. **Never exits 0** — see Gotchas. |
| `build` | `hugo --gc --minify`; fails on errors *and* on meta-description length warnings. |
| `serve` / `stop` | Dev server on :1313 (`-D --disableFastRender`), pidfile-tracked. Idempotent. |
| `smoke` | Nav pages + every post + every case return 200, and each post's `og:image` actually fetches. |
| `case [slug]` | Headless-DOM assertion that MCQ gating locks all but section 1. |
| `shot <path> [name]` | Headless screenshot to `$TMPDIR/rd-driver/shots/`. |

Screenshots land in `$TMPDIR/rd-driver/shots/`; the server log is
`$TMPDIR/rd-driver/server-1313.log`. Override the port with `RD_PORT`,
the browser with `RD_CHROME`, the screenshot dir with `RD_SHOTS`.

### What `check` enforces

Each rule exists because it has silently broken the live site before.
Failures: `draft: true`; empty body; missing or >155-**rune** `description`;
missing `slug`; a future `date` (`buildFuture = false` makes it 404); a term
in both `tags` and `categories` (fatal *"ambiguous page reference"* build
error); `research`/`reviews`/`guidelines` used as a tag; a post without a
valid category; missing `cover.relative: true`; and a `cover.image` naming a
file that is not in the bundle. Warnings: title > 50 chars, empty `summary`.

## Run (human path)

```bash
hugo server -D
```

Then open <http://localhost:1313/>. Fine for eyeballing a draft; useless
for verification, since none of the failures above are visible by looking
at a page.

## Gotchas

Each of these cost real time in this session.

- **Case gating does not exist in Hugo's output.** The layout emits bare
  `<h2>`s; `layouts/cases/single.html` wraps them into
  `<section class="case-section">` in the browser at runtime. `curl` on a
  case page finds **6** mentions of `case-section` (inline CSS/JS), not 13
  sections. Never assert gating against `public/` — that is what
  `case` and its `--dump-dom` call are for.
- **Locking is `data-locked="true"`, not the `hidden` attribute.** Probing
  `hasAttribute('hidden')` returns a confidently wrong answer.
- **Three deprecation warnings are expected on every build** — `languageCode`
  (ours) plus `.Language.LanguageDirection` and `.Language.LanguageCode`
  (from the PaperMod submodule). `build` counts them and moves on. Don't
  chase them; see CLAUDE.md open follow-up #12.
- **`grep -c` lies about Hugo's minified HTML.** It counts matching *lines*,
  and minified output is one line — a page with 7 tables reports `1`.
  Count occurrences (`python3 … h.count('<table>')`), not lines.
- **Don't read reading-time with `grep -oE '[0-9]+ min' | head -1`.** It
  matched a stray `2` on a 17-minute post. Match the span:
  `<span[^>]*>\s*(\d+\s*min)`.
- **Headless Chrome renders the site in dark mode** (PaperMod
  `defaultTheme = 'auto'`). Expected, not a bug.
- **`audit` is never green and that is correct.** 28 posts predate the
  `description` convention and 28 titles exceed 50 chars — CLAUDE.md open
  follow-ups #1 and #3. Use `check --staged` as the gate; use `audit` to
  measure the backlog.
- **Chrome prints `Trying to load the allocator multiple times` to stderr.**
  Harmless; the screenshot still writes.
- **If you extend the driver: always drain or cancel a `fetch` response
  body.** An unconsumed body keeps its socket checked out of undici's
  connection pool and every later request queues behind it. That alone made
  `smoke` take **105 seconds**; adding `r.body?.cancel()` on the responses
  whose bodies aren't needed took it to **under 1 second**. It never
  errors — it just looks like the network got slow.
- **Node buffers stdout when piped**, so a `driver.mjs … | tail` shows
  nothing at all until the process exits. A run that looks hung may just be
  running. Redirect to a file and `tail` the file instead.
- **`timeout` does not exist on macOS.** Use `curl --max-time` (or install
  coreutils for `gtimeout`).
- **`hugo new content` stamps the correct date in front matter but cannot
  fix a wrong folder name.** Run `date` first — guessing the folder date
  wrong means the post sorts wrongly forever.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `server did not become ready in 30s` | Port already held by a hand-started server. `kill $(lsof -ti:1313)` then re-run `serve`. |
| `stop` says `no pidfile; nothing to stop` but :1313 answers | The server was started outside the driver. `kill $(lsof -ti:1313)`. |
| `no content matched "…"` (exit 2) | The substring matched nothing under `content/`. Pass part of the folder name, e.g. `iga-vasculitis`. |
| `og:image does not resolve` in `smoke` | `infographic.png` is missing from the post bundle, or `cover.relative: true` is absent. |
| `JS built no .case-section wrappers` | The inline gating script in `layouts/cases/single.html` threw. Open the page in a browser and read the console. |
| CSS or a partial appears to vanish in dev | Hugo's dev server goes stale. `stop` then `serve` (the driver always passes `--disableFastRender`). |
| Page 404s locally but front matter looks fine | `draft: true`, or a future `date`. `check <slug>` names which. |
