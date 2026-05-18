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
│   └── posts/                      # One folder per post (page bundles)
│       ├── welcome.md              # Legacy single-file post
│       └── YYYY-MM-DD-<slug>/      # Date-prefixed convention for new posts
│           ├── index.md
│           └── infographic.png
├── layouts/
│   ├── partials/
│   │   ├── extend_head.html        # GoatCounter snippet (prod only) + site-wide CSS (WhatsApp CTA + share button)
│   │   └── share_icons.html        # Override of PaperMod's share row — WhatsApp channel CTA + single native-share button (Web Share API → clipboard fallback)
│   └── shortcodes/
│       └── source.html             # {{< source >}} — citation block from front matter
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

6. **Commit + push:**
   ```sh
   git add content/posts/YYYY-MM-DD-<topic-slug>
   git commit -m "Post: <topic title>"
   git push
   ```
   GitHub Actions deploys in ~30 seconds.

## Conventions

- **Folder naming:** `YYYY-MM-DD-<slug>/` for posts. Date prefix is for chronological sorting in Finder; the archetype strips it from the URL slug automatically.
- **Slug:** must be set via the `slug:` field for stability — never derived from title, since title changes would break URLs.
- **Tags — two-axis system** (see `memory/project_post_workflow.md` for the full taxonomy):
  - Disease: `sle`, `myositis`, `scleroderma`, `rheumatoid-arthritis`, `gout`, `axial-spondyloarthritis`, `vasculitis`, etc.
  - Theme: `treatment`, `diagnosis`, `pathophysiology`, `safety`, `guidelines`, `imaging`
  - Optional: drug name (`methotrexate`, `jak-inhibitors`, `car-t`), topic (`ana`, `liver-disease`)
- **Categories — `research` vs `reviews`:** every post must set `categories:` in front matter to one of:
  - `["research"]` — original studies (RCTs, observational, EMR analyses, case series, basic science with clinical relevance)
  - `["reviews"]` — review articles (narrative, systematic, Current Opinion-type, guidelines)
  Top nav splits these at `/categories/research/` and `/categories/reviews/` so visitors can browse by article type.
- **Image filename:** always `infographic.png` (or `.jpg`) for the hero image. Avoids re-editing `cover.image` per post.
- **Cover behavior:** hidden on list pages (`params.cover.hiddenInList = true`), shown at top of the post itself.
- **Permalinks:** `/posts/:slug/` — `:slug` comes from the explicit `slug` field set in front matter.

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
7. **Future content sections** — case-based learning (`content/cases/`), quizzes (`content/quizzes/`), and learning modules (`content/modules/`) will live in their own sibling sections to `content/posts/`. Each gets its own top-nav entry when launched. Different from the research/reviews split (which is a category within posts) — these are entirely separate content types with their own layouts.
8. **`www` TLS cert** — GitHub Pages' Let's Encrypt cert currently only covers the apex; `https://www.rheumatologydigest.org/` throws a cert warning. HTTP-www redirects fine to apex. Fix when convenient by removing/re-adding the custom domain in repo Settings → Pages, which forces a cert reissue covering both forms.
