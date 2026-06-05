# Rheumatology Digest — Project Context

A Hugo + PaperMod static site by Dr. Sree Hari Reddy MD (consultant rheumatologist, Kurnool). Educational rheumatology content — daily clinical write-ups built around an infographic + concise summary, expanded over years into a permanent searchable archive. Currently distributed via WhatsApp; this site is the canonical web home.

## Stack

- **Generator:** Hugo extended **v0.161.1** (pinned in `.github/workflows/hugo.yml` via `HUGO_VERSION`)
- **Theme:** [PaperMod](https://github.com/adityatelange/hugo-PaperMod), installed as a **git submodule** at `themes/PaperMod`
- **Source:** [`sreeharidr/rheumatology-digest`](https://github.com/sreeharidr/rheumatology-digest) (public)
- **Build & host:** **GitHub Pages** via GitHub Actions workflow (`.github/workflows/hugo.yml`). Cloudflare Pages was tried first and abandoned due to build issues; migration back is trivial if needed.
- **DNS:** Cloudflare (DNS-only / gray cloud — not proxied). Four `A` records on the apex pointing at GitHub Pages IPs (`185.199.108–111.153`) + a `CNAME` for `www` → `sreeharidr.github.io`.
- **Live URL:** **https://rheumatologydigest.org/** (apex, HTTPS-enforced, Let's Encrypt cert via GitHub Pages). `www.` redirects to apex; old `sreeharidr.github.io/rheumatology-digest/` also redirects.
- **Search Console:** verified for `rheumatologydigest.org` (domain property) via Cloudflare↔Google OAuth integration. Sitemap submitted at `/sitemap.xml`.
- **Analytics:** GoatCounter (`rheumatology-digest.goatcounter.com`), JS pixel injected in `layouts/partials/extend_head.html`, **production builds only** (so `hugo server` doesn't pollute stats).

## Repo layout

```
.
├── .github/workflows/hugo.yml      # Build + deploy on push to main
├── archetypes/
│   ├── default.md                  # Default Hugo template
│   └── posts.md                    # IMPORTANT — used by every `hugo new content posts/...`
├── content/
│   ├── archives.md                 # Stub for PaperMod's archives layout
│   ├── search.md                   # Stub for PaperMod's search layout
│   ├── posts/                      # Daily clinical write-ups (page bundles)
│   │   ├── welcome.md              # Legacy single-file post
│   │   └── YYYY-MM-DD-<slug>/      # Date-prefixed convention for new posts
│   │       ├── index.md
│   │       └── infographic.png
│   └── cases/                      # Interactive case-based learning (page bundles)
│       ├── _index.md               # Section landing page front matter
│       └── YYYY-MM-DD-<slug>/      # One folder per case
│           └── index.md            # Markdown body with {{< case-mcq >}} shortcodes
├── layouts/
│   ├── cases/
│   │   └── single.html             # Custom layout for interactive cases — wraps each H2 in a gated <section>, hides all but the first, reveals next on MCQ Continue. Inlines the gating + MCQ JS.
│   ├── list.html                   # Override of PaperMod's list.html — single change: injects an "Interactive case" eyebrow badge for entries from the `cases` section. Used by homepage (mixed feed) and /cases/.
│   ├── partials/
│   │   ├── extend_head.html        # GoatCounter snippet (prod only) + ALL site-wide CSS (post-footer share row + case UI: section gating, MCQ option cards, rationale feedback, Continue button)
│   │   └── share_icons.html        # Override of PaperMod's share row — WhatsApp channel CTA + single native-share button (Web Share API → clipboard fallback). Used by posts AND cases.
│   └── shortcodes/
│       ├── source.html             # {{< source >}} — citation block from front matter
│       └── case-mcq.html           # {{< case-mcq >}} — interactive MCQ widget; parses YAML inner content (question + 3-4 options, each with optional `correct: true` + per-option rationale). On click, reveals ONLY the selected option's rationale; marks correct option with green border if user picked wrong.
├── static/
│   └── CNAME                       # Tells GitHub Pages the custom domain is rheumatologydigest.org
├── themes/PaperMod/                # Git submodule — do not edit directly
├── hugo.toml                       # Site config (baseURL is authoritative — workflow does NOT override it)
└── README.md
```

## Local development

```sh
hugo server -D                       # serve at http://localhost:1313 with drafts
```

The dev server hot-reloads on save (config + content + layouts). If `-D` is set, posts with `draft: true` are visible locally but excluded from the production build.

## Per-post workflow

User's existing offline workflow: select published paper → make a portrait HTML infographic → previously shared to WhatsApp. The site adds a permanent record; WhatsApp now shares the post URL (infographic appears as link preview).

**Per post:**

1. **Create the post folder + scaffold** (the archetype fills in slug + title from folder name):
   ```sh
   hugo new content posts/YYYY-MM-DD-<topic-slug>/index.md
   ```
   Use today's date and a URL-friendly slug. Example: `2026-05-13-jak-inhibitors-cv-risk`.
   **Date gotcha:** `buildFuture = false` in `hugo.toml`. The `date:` in front matter must be in the past relative to current local time, or the post will 404 in dev AND be excluded from the production build. Default safe pattern: set `date:` to a couple of hours BEFORE the current local clock time — e.g. if it's 08:24 IST, use `T06:00:00+05:30`. Don't fix it to `T10:00:00` blindly — that's bitten us before, when scaffolding in the morning.

2. **Edit front matter** — title (real clinical title), `summary`, `tags`, `categories` (`research` or `reviews`), `source` block (authors / journal / year / DOI). Leave `slug` alone — auto-derived from folder name minus date prefix. **DOI:** just put the bare DOI (e.g. `10.1056/NEJMra2415426`) into the `doi` field — the `source.html` shortcode auto-wraps it in a `https://doi.org/...` link. Leave `url` empty unless the article is open-access at a non-DOI URL.

3. **Drop the infographic** into the same folder as `infographic.png`. The archetype already references this filename in `cover.image`.

4. **Write the body** — TL;DR blockquote at top, then the user's clinical summary, ending with `{{< source >}}`. Voice rules:
   - **TL;DR:** Claude drafts this. One sentence (max two), capturing the paper's thesis. User reviews and tweaks if needed. (Earlier convention said "user writes their own" — the user has since asked Claude to draft going forward to save round-trips.)
   - **Body:** the user's clinical summary, in the user's voice. Do NOT pre-draft body commentary, interpretation, or "what this means" paragraphs unless the user explicitly asks.
   - **Front-matter `summary`:** Claude drafts a 1–2 sentence SEO-grade extract (feeds Google snippets + WhatsApp link previews). User can edit.

5. **Preview locally** at http://localhost:1313/posts/<slug>/. When ready, set `draft: false`.

6. **Pre-push checklist — verify these before committing:**
   - `draft: false` is set. Hugo silently excludes `draft: true` posts from production builds — the page 404s with no build error. This has burned us before.
   - The body is not empty. There must be actual content between the TL;DR blockquote and `{{< source >}}`. If the user says "done, push it", read the file first and confirm body content exists before proceeding. If the body is empty, ask the user to paste their summary rather than pushing an empty post.

7. **Commit + push:**
   ```sh
   git add content/posts/YYYY-MM-DD-<topic-slug>
   git commit -m "Post: <topic title>"
   git push
   ```
   GitHub Actions deploys in ~30 seconds.

## Per-case workflow

Interactive case-based learning lives under `content/cases/`. Each case is a single markdown file built around `{{< case-mcq >}}` shortcodes — the page renders as a series of **gated sections** revealed one MCQ at a time.

**Design philosophy (set with the first case, locked in for all future ones):**

- **Drip-feed reveal.** Each `## ` H2 starts a new section. Sections after the first are hidden by JS until the prior MCQ is answered and Continue is clicked. The diagnosis stays hidden until ~3/4 through the case.
- **Short body, MCQ-heavy.** Target ~12–14 sections per case. Each body block stays under ~80 words so it fits on one mobile screen. The teaching lives in the per-option rationales, NOT the body — keep the body just to "what does the reader have in front of them now".
- **Selected-option feedback only.** When a reader picks an option, only THAT option's rationale appears. If they picked wrong, the correct option still gets a subtle green border on its answer button so they learn what was right.
- **No scoring.** Purely educational; no tally, no test framing.
- **Categories not used.** Cases use `tags` only (no `categories` field — research/reviews are a posts-only split).

**Per case:**

1. **Create the folder + scaffold:**
   ```sh
   hugo new content cases/YYYY-MM-DD-<topic-slug>/index.md
   ```
   Same date-gotcha as posts: keep the `date:` in the past relative to local clock time.

2. **Edit front matter** — `title`, `summary` (SEO; Claude drafts), `description` (short page subtitle, optional), `tags`, `source` block (authors / journal / year / DOI). Set `slug:` explicitly. **Do NOT** set `categories:`.

3. **Source PDF** lives in `~/Documents/NEJM Case Records/` (separate from the repo, like the posts archive). User provides the PDF; Claude reads it with the Read tool (poppler installed).

4. **Write the body** as a sequence of `## ` sections, each ending with a `{{< case-mcq >}}` shortcode (except the final summary section, which has no MCQ — it auto-reveals when the last MCQ's Continue is clicked). End with `{{< source >}}`.

5. **MCQ shortcode YAML schema:**
   ```
   {{< case-mcq >}}
   question: |
     Markdown question text.
   options:
     - text: Distractor A
       rationale: |
         Explain why this is wrong. Markdown supported (bold, italics, links).
     - text: Correct answer
       correct: true
       rationale: |
         Explain why this is right. Carry the teaching here.
     - text: Distractor C
       rationale: |
         ...
     - text: Distractor D
       rationale: |
         ...
   {{< /case-mcq >}}
   ```
   3–4 options is typical (the letter labels A–F are auto-generated). Mark exactly one with `correct: true`.

6. **Voice rules for case content:**
   - Body of each section: clinical narrative only — what the team would have in front of them at that moment. **Don't leak the answer into the body** — that's the most common authoring mistake.
   - **TL;DR / intro paragraph: do NOT add one.** Cases drop the reader straight into Section 1.
   - **Rationales: Claude drafts these** in clinical-teacher voice; user edits if needed. Each rationale should be self-contained — the correct one explains the reasoning, distractors explain *why specifically that option is wrong* (and briefly point at the right answer).

7. **Preview locally** at `http://localhost:1313/cases/<slug>/`. Verify gating (each MCQ unlocks the next section), selected-only feedback (your option's rationale appears; correct option gets a green border if you picked wrong).

8. **Hugo dev-server gotcha:** when you change a shortcode or layout file, Hugo's Fast Render Mode can serve a stale render. If something looks broken (CSS missing, partial empty), kill the server and restart with `--disableFastRender`, or just restart it cleanly.

9. **Pre-push checklist — verify these before committing:**
   - `draft: false` is set. Same gotcha as posts — `draft: true` silently excludes the page from production.
   - The body contains at least one `## ` section and one `{{< case-mcq >}}` shortcode. If the file is only front matter + `{{< source >}}`, it is not ready to push.

10. **Commit + push:**
    ```sh
    git add content/cases/YYYY-MM-DD-<topic-slug>
    git commit -m "Case: <topic>"
    git push
    ```

## Conventions

- **Folder naming:** `YYYY-MM-DD-<slug>/` for posts. Date prefix is for chronological sorting in Finder; the archetype strips it from the URL slug automatically.
- **Slug:** must be set via the `slug:` field for stability — never derived from title, since title changes would break URLs.
- **Tags — two-axis system** (see `memory/project_post_workflow.md` for the full taxonomy):
  - Disease: `sle`, `myositis`, `scleroderma`, `rheumatoid-arthritis`, `gout`, `axial-spondyloarthritis`, `vasculitis`, etc.
  - Theme: `treatment`, `diagnosis`, `pathophysiology`, `safety`, `imaging` (note: **do not** use `guidelines` as a tag — it is a category now, and a term that exists in both taxonomies breaks PaperMod's nav with an "ambiguous page reference" build error)
  - Optional: drug name (`methotrexate`, `jak-inhibitors`, `car-t`), topic (`ana`, `liver-disease`)
- **Categories — `research` vs `reviews` vs `guidelines`:** every post must set `categories:` in front matter to one of:
  - `["research"]` — original studies (RCTs, observational, EMR analyses, case series, basic science with clinical relevance)
  - `["reviews"]` — review articles (narrative, systematic, Current Opinion-type)
  - `["guidelines"]` — formal society recommendations / consensus statements / management guidelines (e.g. EULAR/ACR recommendations). Durable reference material, distinct from one-off review articles.
  Top nav splits these at `/categories/research/`, `/categories/reviews/` and `/categories/guidelines/` so visitors can browse by article type.
- **Image filename:** always `infographic.png` (or `.jpg`) for the hero image. Avoids re-editing `cover.image` per post.
- **Cover behavior:** hidden on list pages (`params.cover.hiddenInList = true`), shown at top of the post itself.
- **Permalinks:** `/posts/:slug/` and `/cases/:slug/` — `:slug` comes from the explicit `slug` field set in front matter.
- **Homepage feed = `mainSections`.** `[params] mainSections = ['posts', 'cases']` in `hugo.toml` controls what the homepage list (and home RSS) pulls in. Add any new content section here when launching it (e.g. quizzes, modules). Section landing pages (`/posts/`, `/cases/`) stay filtered to their own section regardless.

## Working with this user

- **Code-aware but not a software engineer.** Comfortable with terminal, markdown, basic git. Treat unfamiliar tooling as new ground — explain what commands do, don't assume framework knowledge.
- **One step at a time.** After each change: state a verification action (URL to open, command to run), wait for confirmation before proceeding. Flag destructive actions before running.
- **Authentic voice is the point.** Clinical interpretation is the value of this site. Do NOT draft post commentary unless explicitly asked — the user writes their own summary, Claude provides scaffolding only (front matter, citation block, structural editing).
- **External archive:** `~/Documents/Rheumatology Digest/` (separate from this repo, NOT in git). Each paper lives in a dated subfolder containing the source PDF (+ eventually the infographic). User reads PDF + writes summary → posts go in this repo.

## Tooling notes

- **`gh` CLI** is installed and authenticated as `sreeharidr` with a credential helper for git over HTTPS. Future `git push` operations don't prompt for credentials.
- **`poppler`** is installed (for `pdftotext` / PDF reading via Read tool — needed when reading source PDFs from the archive folder).
- **Hugo extended** is installed via Homebrew (matches the version pinned in CI).

## Open follow-ups

Things flagged but not yet done — pick these up when relevant:

1. **Compress the 6 MB infographic** in `content/posts/2026-05-12-cellular-therapies-rheumatic-disease/` via TinyPNG. Hospital wifi load times + WhatsApp link previews.
2. **Fix `og:image` resolution.** Currently the OG/Twitter image meta tag resolves to `/infographic.png` (site root) instead of the post's own bundled image — so WhatsApp/Twitter link previews show a broken image. Likely needs a small layout override or correct use of the page-bundle image in the front-matter `cover` block.
3. **Tag-based vector icons** instead of cover images on list pages — visual differentiation, requires SVG design work.
4. **`rdpost` shell helper** — wraps `hugo new` + `open` to skip Finder navigation when creating posts. Defer until folder navigation actually feels slow.
5. **Bump GitHub Actions to Node 24** — `actions/checkout@v4`, `configure-pages@v5`, `upload-artifact@v4`, `deploy-pages@v4` are flagged for forced Node 24 from June 2, 2026. Update versions when convenient.
6. **Brand theming** — colors (navy `#1E3A5F`, off-white `#F5F3EE`), Inter font, flat SVG iconography. Step 7 of the original roadmap.
7. **Remaining content sections** — quizzes (`content/quizzes/`) and learning modules (`content/modules/`) will be sibling sections to `content/posts/` and `content/cases/`, each with its own top-nav entry and layout. Different from the research/reviews split (a category WITHIN posts) — these are entirely separate content types. *Cases (`content/cases/`) launched May 2026 — see the "Per-case workflow" section above.*
8. **`www` TLS cert** — GitHub Pages' Let's Encrypt cert currently only covers the apex; `https://www.rheumatologydigest.org/` throws a cert warning. HTTP-www redirects fine to apex. Fix when convenient by removing/re-adding the custom domain in repo Settings → Pages, which forces a cert reissue covering both forms.
