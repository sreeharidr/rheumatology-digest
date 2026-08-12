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
│   ├── default.md                  # Default Hugo template — only used for content outside posts/ and cases/
│   ├── posts.md                    # IMPORTANT — used by every `hugo new content posts/...`
│   └── cases.md                    # IMPORTANT — used by every `hugo new content cases/...`. Case schema: tags only (NO categories), no cover block, + a first gated section with a filled-in {{< case-mcq >}} skeleton.
├── content/
│   ├── about.md                    # About & Disclaimer — educational/non-commercial framing, copyright statement, medical disclaimer, takedown contact. Linked from nav + every page footer.
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
│   │   ├── extend_head.html        # Meta-description length guard + GoatCounter (prod only) + ALL site-wide CSS (share row, case UI, home hero/cards, mobile WhatsApp bar)
│   │   ├── extend_footer.html      # Site-wide disclaimer line + includes whatsapp-bar.html
│   │   ├── home_info.html          # Override — homepage hero (eyebrow, title, tagline) + 4 colour-coded section cards (Reviews/Guidelines/Cases/Research). Tagline text still comes from [params.homeInfoParams] in hugo.toml.
│   │   ├── whatsapp-bar.html       # Mobile-only sticky WhatsApp bar (posts/cases only). See "Theme & layout gotchas" — the page gate is in JS, not Hugo, and that is deliberate.
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

## Theme & layout gotchas

Hard-won during the Aug 2026 work. Each of these looks like it works and then doesn't.

- **`footer.html` is `partialCached`, so you cannot make `extend_footer.html` page-conditional.** PaperMod calls it as `partialCached "footer.html" . .Layout .Kind ...` — the cache key has **no page identity**, so *every* `kind=page` page (all posts, all cases, `/about/`, `/archives/`, `/search/`) shares **one** cached footer render. A `{{ if .Type }}` guard inside silently bakes in whichever page rendered first. This is why `whatsapp-bar.html` gates on `location.pathname` in JS. Same trap applies to anything else added to the footer.
- **Dark mode is `:root[data-theme="dark"]`, not a `.dark` class.** `defaultTheme = 'auto'`, so `.dark` selectors never match and your styles will silently render light-on-dark. Prefer PaperMod's CSS variables (`--entry`, `--primary`, `--border`, `--secondary`) — they follow the theme for free.
- **`.Type` on a single page is `page`, not the section.** Use `.Section` if you need "posts"/"cases" (but see the caching trap above).
- **Hugo's `len` on a string counts bytes, not characters.** Em-dashes are 3 bytes, so a 155-character description reports as ~158+. Use `strings.RuneCount` — the meta-description guard in `extend_head.html` does.
- **`requestAnimationFrame` is throttled to zero in hidden/background tabs.** Don't gate anything user-visible on it — a forced reflow (`void el.offsetHeight`) achieves the same transition kick reliably.
- **The dev server goes stale.** If CSS or a partial appears to vanish, kill and restart `hugo server` before debugging the code — this cost time twice. Always confirm against a real `hugo --gc --minify` build, which is the source of truth.
- **In archetypes, `replace` cannot be piped into — use `replaceRE`.** Hugo's two string-substitution functions take their arguments in *opposite* orders: `replace INPUT OLD NEW` (input **first**) vs `replaceRE PATTERN REPLACEMENT INPUT` (input **last**). A Go-template pipe appends the piped value as the *last* argument, so `... | replace "-" " "` silently evaluates as `replace "-" " " <piped>` — it substitutes into the literal string `"-"` and returns `-`. This is why `archetypes/posts.md` emitted `title: "-"` on every post from launch until Aug 2026, while the `slug:` line beside it worked fine (it uses `replaceRE`). Fixed in both archetypes by switching the dash→space step to `replaceRE`. The failure is invisible unless you look at the generated title, because step 2 of the workflow overwrites it by hand anyway.

## Per-post workflow

User's existing offline workflow: select published paper → make a portrait HTML infographic → previously shared to WhatsApp. The site adds a permanent record; WhatsApp now shares the post URL (infographic appears as link preview).

**Per post:**

1. **Create the post folder + scaffold** (the archetype fills in slug + title from folder name):
   ```sh
   hugo new content posts/YYYY-MM-DD-<topic-slug>/index.md
   ```
   Use today's date and a URL-friendly slug. Example: `2026-05-13-jak-inhibitors-cv-risk`.
   **Date gotcha:** `buildFuture = false` in `hugo.toml`. The `date:` in front matter must be in the past relative to current local time, or the post will 404 in dev AND be excluded from the production build. Default safe pattern: set `date:` to a couple of hours BEFORE the current local clock time — e.g. if it's 08:24 IST, use `T06:00:00+05:30`. Don't fix it to `T10:00:00` blindly — that's bitten us before, when scaffolding in the morning.

2. **Edit front matter** — title (real clinical title), `summary`, `description` (≤155 chars — see voice rules in step 4), `tags`, `categories` (`research` or `reviews`), `source` block (authors / journal / year / DOI). Leave `slug` alone — auto-derived from folder name minus date prefix. **DOI:** just put the bare DOI (e.g. `10.1056/NEJMra2415426`) into the `doi` field — the `source.html` shortcode auto-wraps it in a `https://doi.org/...` link. Leave `url` empty unless the article is open-access at a non-DOI URL.

3. **Drop the infographic** into the same folder as `infographic.png`. The archetype already references this filename in `cover.image`. Since Aug 2026 the user's infographic template burns a **`rheumatologydigest.org` footer strip** into every image, so a forwarded WhatsApp image still points back to the site — don't crop or regenerate images in a way that loses it.

4. **Write the body** — TL;DR blockquote at top, then the user's clinical summary, ending with `{{< source >}}`. Voice rules:
   - **Cut boring, not long** (standing instruction, Aug 2026). There is **no word-count or reading-time target**. Do not trim worthwhile material to hit a number, and do not spend time optimising the reading-time figure — if something is important, let the post run long. The test for each paragraph is whether it earns its place, never what it does to the total.
     - **Cut:** exhaustive methods detail, statistical machinery, baseline/demographic tables, trial-by-trial history, subgroup-by-subgroup breakdowns, and prose that merely restates a table sitting next to it.
     - **Keep:** the TL;DR, the headline numbers, the caveats and limitations (the honest reading is the site's differentiator), the practical points, and any argument that answers an objection a reader would actually raise.
     - **The compression technique that works when you do cut: convert enumerations into a markdown table** — one table replaced ~6 paragraphs in the Aug 2026 cutaneous-lupus post.
     - History, so it isn't re-litigated: posts up to Aug 2026 ran 2,500–3,000 words (14 min), which the user judged too long; the guidance then became "~800–1000 words / 4–5 min". That got over-applied — trimming substance to protect the number — and the user replaced it with the rule above. Long is fine; boring is not.
   - **TL;DR:** Claude drafts this. One sentence (max two), capturing the paper's thesis. User reviews and tweaks if needed. (Earlier convention said "user writes their own" — the user has since asked Claude to draft going forward to save round-trips.)
   - **Body:** the user's clinical summary, in the user's voice. Do NOT pre-draft body commentary, interpretation, or "what this means" paragraphs unless the user explicitly asks.
   - **Meta-commentary in pasted summaries: leave it out.** The user's pasted summaries sometimes end with material addressed to *the user* rather than to readers — "teaching notes", "ask your fellows to…", "discussion prompts", offers to build flowcharts/decks, or references to "this series" (meaning the Claude conversation). **Omit these silently; do not adapt them into reader-facing prose.** Adding one to the ADVANCE OUTCOMES/ralinepag post was wrong and had to be removed. If a section looks genuinely valuable but is second-person, flag it and ask rather than including it.
   - **Front-matter `summary`:** Claude drafts a 1–2 sentence extract. This is the **homepage/list card text** and can be long (~300–400 chars) — that's fine and intended.
   - **Front-matter `description`:** Claude drafts this too — a **separate, ≤155-character** meta description. This is what Google shows in search results and what WhatsApp/LinkedIn show in link previews. Write it as *what changed / what the catch is*, judgement in the first 150 characters, numbers left in the post. Not "TRIALNAME was a phase 3 study of…". A build-time warning fires if it exceeds 155 runes (see `extend_head.html`).

5. **Preview locally** at http://localhost:1313/posts/<slug>/. When ready, set `draft: false`.

6. **Pre-push checklist — verify these before committing:**
   - `draft: false` is set. Hugo silently excludes `draft: true` posts from production builds — the page 404s with no build error. This has burned us before.
   - The body is not empty. There must be actual content between the TL;DR blockquote and `{{< source >}}`. If the user says "done, push it", read the file first and confirm body content exists before proceeding. If the body is empty, ask the user to paste their summary rather than pushing an empty post.
   - **`description` is set and ≤155 characters.** Without it the meta description silently falls back to the long `summary`, which Google truncates mid-sentence. `hugo --gc --minify` prints a `WARN meta description is N chars` line if any page is over — check the build output is clean.
   - **`cover.relative: true` is present.** Without it `og:image`/`twitter:image` resolve to `/infographic.png` at the site root — a 404 — and every WhatsApp/LinkedIn link preview breaks. The archetype includes it; only an issue if the cover block is hand-written.
   - **No taxonomy-term collisions.** A term must NOT appear in both `tags` and `categories`. In particular `guidelines` is a **category only** — never put it in `tags`. A term in two taxonomies breaks PaperMod's nav with a fatal `page reference "<term>" is ambiguous` build error (happened with `guidelines` once). Same rule applies to `research`/`reviews` — keep them out of tags.

7. **Commit + push:**
   ```sh
   git add content/posts/YYYY-MM-DD-<topic-slug>
   git commit -m "Post: <topic title>"
   git push
   ```
   GitHub Actions deploys in ~30 seconds. **Push and stop — do not wait for the deploy** (see "Working with this user").

## Per-case workflow

Interactive case-based learning lives under `content/cases/`. Each case is a single markdown file built around `{{< case-mcq >}}` shortcodes — the page renders as a series of **gated sections** revealed one MCQ at a time.

**Design philosophy (set with the first case, locked in for all future ones):**

- **Drip-feed reveal.** Each `## ` H2 starts a new section. Sections after the first are hidden by JS until the prior MCQ is answered and Continue is clicked. The diagnosis stays hidden until ~3/4 through the case.
- **Short body, MCQ-heavy.** Target ~12–14 sections per case. Each body block stays under ~80 words so it fits on one mobile screen. The teaching lives in the per-option rationales, NOT the body — keep the body just to "what does the reader have in front of them now".
- **Selected-option feedback only.** When a reader picks an option, only THAT option's rationale appears. If they picked wrong, the correct option still gets a subtle green border on its answer button so they learn what was right.
- **No scoring.** Purely educational; no tally, no test framing.
- **Categories not used.** Cases use `tags` only (no `categories` field — research/reviews are a posts-only split).

**Per case:**

1. **Create the folder + scaffold** (`archetypes/cases.md` fills in slug + title from the folder name, and lays down a first gated section with a `{{< case-mcq >}}` skeleton):
   ```sh
   hugo new content cases/YYYY-MM-DD-<topic-slug>/index.md
   ```
   Same date-gotcha as posts: keep the `date:` in the past relative to local clock time.

2. **Edit front matter** — `title` (real clinical title, e.g. "A 7-Year-Old Girl with a Limp and Leg Pain"), `summary` (SEO; Claude drafts), `description` (short page subtitle, optional), `tags`, `source` block (authors / journal / year / DOI). Leave `slug` alone — the archetype derives it from the folder name minus the date prefix. **Do NOT** set `categories:`, and **do not** add a `cover:` block — cases have no infographic.

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
- **`summary` vs `description` — two different fields, deliberately.** PaperMod's list template renders `.Summary` on homepage/section cards, while `head.html` uses `.Description` for `<meta name="description">`, falling back to `.Summary` only if `description` is unset. `og:description` and `twitter:description` follow the same `or .Description .Summary` rule. So: **long `summary` = good cards; short `description` = good Google snippets and link previews.** Setting both is what keeps them from fighting. No template override is needed — this is stock PaperMod behaviour that was simply going unused.
- **Image filename:** always `infographic.png` (or `.jpg`) for the hero image. Avoids re-editing `cover.image` per post.
- **Cover behavior:** hidden on list pages (`params.cover.hiddenInList = true`), shown at top of the post itself. **`cover.relative: true` is required** — see the pre-push checklist for why.
- **Permalinks:** `/posts/:slug/` and `/cases/:slug/` — `:slug` comes from the explicit `slug` field set in front matter.
- **Copyright posture (reviewed Aug 2026).** The model is: **own-words summaries of facts** (findings, numbers and recommendations are facts and aren't copyrightable) + **our own infographics** + citation with DOI + **non-commercial**. Three rules follow. (1) **Never reproduce figures, tables, images or radiology from the source** — and don't build an infographic by tracing one. (2) **Never copy sentences**; citing a source is not permission to quote it. Several sources are CC BY-NC-ND, and paywalled ones (NEJM, Nature Rev Rheumatol) are all-rights-reserved. (3) **The non-commercial status is load-bearing** — NC licences and fair-use arguments both weaken the moment the site earns revenue, so **revisit licensing before adding ads, sponsorship or paid tiers**. `content/about.md` carries the public statement and a takedown contact.
- **No visible byline anywhere.** `hideAuthor = true` is set site-wide (the user asked for their name off the homepage; a per-post byline was the main "blogger" tell). Authorship is preserved in `content/about.md`, the `<meta name="author">` tag and the `Person` node in PaperMod's `schema_json.html`. **Don't reintroduce a byline without asking** — an E-E-A-T byline scoped to post pages only is an open follow-up, not a settled decision.
- **Homepage is a custom hero, not the stock PaperMod blurb.** `layouts/partials/home_info.html` renders an eyebrow, large title, tagline and four colour-coded cards (Reviews blue / Guidelines green / Cases violet / Research amber), then a "Latest" label above the normal feed. Tagline wording still lives in `[params.homeInfoParams]` in `hugo.toml`.
- **Mobile WhatsApp bar** (`whatsapp-bar.html`): always visible on posts/cases at ≤767px, ~57px tall, appears 800ms after load, dismissible. Memory is an **expiry timestamp** in `localStorage` (`rd-wa-bar-until`), not a boolean — **30 days** after a dismiss, **180 days** after a Follow tap. It is deliberately a bar and not a modal: Google penalises intrusive mobile interstitials, but exempts small dismissible banners. **That exemption lapses if it grows much taller or loses the dismiss button.**
- **Homepage feed = `mainSections`.** `[params] mainSections = ['posts', 'cases']` in `hugo.toml` controls what the homepage list (and home RSS) pulls in. Add any new content section here when launching it (e.g. quizzes, modules). Section landing pages (`/posts/`, `/cases/`) stay filtered to their own section regardless.

## Working with this user

- **Keep this file current — update `CLAUDE.md` as part of every important task** (standing instruction, Aug 2026). Treat the doc update as part of the task, not a follow-up: if the task is not finished until the code works, it is not finished until the doc matches. What counts as important: anything that changes the workflow, the file layout, a convention, or the site's behaviour; any gotcha discovered the hard way (add it to "Theme & layout gotchas" with *why* it bit us, not just the fix); anything that closes or opens an item under "Open follow-ups". What does *not* count: routine content posts and cases — those follow the documented workflow and need no doc change. Edit the section that already owns the topic rather than appending a changelog; this file is a current-state reference, not a history.
- **Push and stop — do not babysit the deploy** (standing instruction, Aug 2026). After `git push`, say it's pushed and move on. Do **not** poll `gh run list`, wait on the GitHub Action, or fetch the live URL to confirm. The deploy takes ~30 seconds and effectively always succeeds; the user will say if something is broken. Waiting on it just burns a turn. (This is the one exception to the "state a verification action" habit below — the verification here happens *before* the push, via the pre-push checklist.)
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

1. **Backfill `description` on the remaining posts.** Aug 2026: the 10 highest-impression pages have short meta descriptions; the other **27 of 37** still fall back to the long `summary` and truncate in Google. Add them as posts are revisited, or in a batch. To list the ones still missing it:
   ```sh
   for f in content/posts/*/index.md; do grep -qE '^description: *"[^"]+"' "$f" || echo "$f"; done
   ```
2. **Desktop QR block — the next build.** The mobile bar is done, but **89% of traffic is desktop**, where a bare `whatsapp.com/channel/...` link is functionally dead (it demands a WhatsApp Web session or a phone handoff nobody performs mid-article). Needs an inline block after the TL;DR with a **static QR** (generate the SVG into `static/` or commit it — do *not* call an external QR API at page load), shown only on wide viewports via CSS. Style it as a quiet resource note, not a subscribe banner.
3. **Remaining SEO items** (Aug 2026 Search Console review): **title tags** — 28 of 38 titles exceed 50 chars, so the `| Rheumatology Digest` suffix is truncated out of every SERP (fix by shortening titles — slugs are explicit, so retitling breaks no URLs); author byline + credentials on post pages for E-E-A-T (see the no-byline convention above — this is a *decision to revisit*, not a settled task; also needs the user's Google Scholar URL); citation/DOI block moved near the top of the post; `isBasedOn` in the Article schema (`schema_json.html` already emits a `Person` author, so enrich rather than duplicate).
4. **Distribution is the real constraint, not CTR.** ~9 impressions/day means CTR fixes alone cannot move WhatsApp numbers — a realistic follower target needs roughly a **200× increase in impressions**, not a 3× in CTR. Key diagnosis: the content is **niche by construction** — a trial-acronym post can rank #1 worldwide and still get 30 impressions/month, whereas fibromyalgia (a clinical *question*) outperformed everything in a fraction of the time. So:
   - **Add evergreen clinical-question posts** alongside the trial write-ups (e.g. "Interpreting a high ANA titre", "Sacroiliac MRI: inflammation vs mechanical change"). These can be **repackaged from existing posts** — Claude drafts, user reviews, so it costs no new writing time.
   - **Own the DOI / trial-acronym search space** — that pathway already produces ~⅓ of all clicks. Keep the acronym in the title and the DOI in visible text near the top, and publish within ~72h of a paper landing (the search spike decays fast).
   - **Automated syndication:** RSS → Buffer/Make. Priority **Instagram → Facebook → LinkedIn** (the 9:16 infographic is Instagram's native format, and those platforms match the WhatsApp-native target markets). **Skip X** — API is paid, organic reach was poor unpaid, and it needs daily engagement the user doesn't have time for. Adding an image `<enclosure>` to the RSS feed would let those tools attach the infographic directly (Instagram needs a real image; it has no link previews).
   - *(Done Aug 2026: infographic template now burns a `rheumatologydigest.org` footer strip into every image. A WhatsApp-channel QR in that strip remains an optional upgrade — the domain alone requires retyping.)*
5. **Paid ads — assessed and declined (Aug 2026).** **Google Ads is the wrong tool here:** healthcare CPCs are $2–8, there's no revenue to pay it back (~$65 per WhatsApp follower), keyword targeting buys *patients* rather than rheumatologists, and prescription-drug content invites policy disapprovals. **If money is ever spent, use Meta** — it has a purpose-built *Click to WhatsApp* objective, far cheaper CPCs, precise targeting of WhatsApp-native markets, and the existing 9:16 infographic as native creative. A one-off ~$100 Meta test is defensible as **measurement** (what *is* the site→WhatsApp conversion rate?), not as a growth channel.
6. **Tag-based vector icons** instead of cover images on list pages — visual differentiation, requires SVG design work.
7. **`rdpost` shell helper** — wraps `hugo new` + `open` to skip Finder navigation when creating posts. Defer until folder navigation actually feels slow.
8. **Bump GitHub Actions to Node 24** — `actions/checkout@v4`, `configure-pages@v5`, `upload-artifact@v4`, `deploy-pages@v4` are flagged for forced Node 24 from June 2, 2026. Update versions when convenient.
9. **Brand theming** — colors (navy `#1E3A5F`, off-white `#F5F3EE`), Inter font, flat SVG iconography. Step 7 of the original roadmap.
10. **Remaining content sections** — quizzes (`content/quizzes/`) and learning modules (`content/modules/`) will be sibling sections to `content/posts/` and `content/cases/`, each with its own top-nav entry and layout. Different from the research/reviews split (a category WITHIN posts) — these are entirely separate content types. *Cases (`content/cases/`) launched May 2026 — see the "Per-case workflow" section above.*
11. **`www` TLS cert** — GitHub Pages' Let's Encrypt cert currently only covers the apex; `https://www.rheumatologydigest.org/` throws a cert warning. HTTP-www redirects fine to apex. Fix when convenient by removing/re-adding the custom domain in repo Settings → Pages, which forces a cert reissue covering both forms.
12. **Hugo v0.158 deprecation warnings** — every build prints three. One is ours: `languageCode = 'en-us'` in `hugo.toml` should become `locale = 'en-us'`. The other two (`.Language.LanguageDirection`, `.Language.LanguageCode`) come from **PaperMod's own templates** — a submodule, so the fix is a theme update, not an edit. Don't rename our key in isolation without checking the RSS `<language>` tag still renders, since the theme still calls the deprecated accessors. Harmless until Hugo actually removes them.
