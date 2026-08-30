#!/usr/bin/env node
// Driver for the Rheumatology Digest Hugo site.
// Zero dependencies — Node 18+ (uses built-in fetch). Run from anywhere:
//   node .claude/skills/run-rheumatology-digest/driver.mjs <command>
//
// Commands: build | serve | stop | check | smoke | case | shot | all
// See SKILL.md next to this file.

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');          // <repo>/.claude/skills/run-*/ -> <repo>
const PORT = Number(process.env.RD_PORT || 1313);
const BASE = `http://localhost:${PORT}`;
const TMP = path.join(os.tmpdir(), 'rd-driver');
const PIDFILE = path.join(TMP, `server-${PORT}.pid`);
const SERVERLOG = path.join(TMP, `server-${PORT}.log`);
const SHOTDIR = process.env.RD_SHOTS || path.join(TMP, 'shots');

const CHROME_CANDIDATES = [
  process.env.RD_CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
].filter(Boolean);

fs.mkdirSync(TMP, { recursive: true });

// ---------------------------------------------------------------- utilities
const C = { red: s => `\x1b[31m${s}\x1b[0m`, grn: s => `\x1b[32m${s}\x1b[0m`,
            yel: s => `\x1b[33m${s}\x1b[0m`, dim: s => `\x1b[2m${s}\x1b[0m`,
            bold: s => `\x1b[1m${s}\x1b[0m` };
const problems = [];
const fail = (where, msg) => { problems.push({ level: 'FAIL', where, msg }); };
const warn = (where, msg) => { problems.push({ level: 'WARN', where, msg }); };
const ok = msg => console.log(`  ${C.grn('ok')}  ${msg}`);

function findChrome() { return CHROME_CANDIDATES.find(p => { try { fs.accessSync(p, fs.constants.X_OK); return true; } catch { return false; } }); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

// -------------------------------------------------------- front-matter read
// Deliberately NOT a full YAML parser. These files follow one house shape
// (archetypes/posts.md, archetypes/cases.md); we read the fields the
// pre-push checklist cares about and nothing else.
function parseContent(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { error: 'no YAML front matter delimited by ---' };
  const [, fm, body] = m;
  const scalar = k => { const r = fm.match(new RegExp(`^${k}:\\s*(?:"([^"]*)"|'([^']*)'|(.*?))\\s*$`, 'm')); return r ? (r[1] ?? r[2] ?? r[3] ?? '').trim() : null; };
  const list = k => { const r = fm.match(new RegExp(`^${k}:\\s*\\[(.*)\\]\\s*$`, 'm')); return r ? [...r[1].matchAll(/"([^"]*)"|'([^']*)'/g)].map(x => x[1] ?? x[2]) : (fm.match(new RegExp(`^${k}:\\s*$`, 'm')) ? [] : null); };
  return {
    fm, body,
    title: scalar('title'), date: scalar('date'), draft: scalar('draft'),
    slug: scalar('slug'), description: scalar('description'), summary: scalar('summary'),
    tags: list('tags'), categories: list('categories'),
    hasCoverBlock: /^cover:\s*$/m.test(fm),
    coverRelative: /^\s+relative:\s*true\s*$/m.test(fm),
    coverImage: (fm.match(/^\s+image:\s*"([^"]*)"/m) || [])[1] || null,
    doi: (fm.match(/^\s+doi:\s*"([^"]*)"/m) || [])[1] || null,
  };
}

const runes = s => [...(s || '')].length;

// ------------------------------------------------------------ content check
// Encodes the pre-push checklist from CLAUDE.md. Exit 1 on any FAIL.
const VALID_CATEGORIES = ['research', 'reviews', 'guidelines'];

function checkOne(file) {
  const rel = path.relative(ROOT, file);
  const kind = rel.includes(`${path.sep}cases${path.sep}`) ? 'case' : 'post';
  const dir = path.dirname(file);
  const at = (msg) => `${rel}: ${msg}`;
  const p = parseContent(file);
  if (p.error) { fail(rel, p.error); return; }

  // 1. draft — Hugo silently drops draft:true from production builds
  if (p.draft !== 'false') fail(rel, `draft is "${p.draft}" — must be false or the page 404s in production`);

  // 2. body must not be empty
  const bodyNoSource = p.body.replace(/\{\{<\s*\/?\s*source\s*>\}\}/g, '')
                             .replace(/^>\s*\*\*TL;DR.*$/gm, '').trim();
  if (bodyNoSource.length < 200) fail(rel, `body is essentially empty (${bodyNoSource.length} chars outside TL;DR + source shortcode)`);

  // 3. description present and <=155 runes (RuneCount, not bytes — em dashes are 3 bytes)
  if (!p.description) fail(rel, 'description is empty — meta description silently falls back to the long summary');
  else if (runes(p.description) > 155) fail(rel, `description is ${runes(p.description)} runes (max 155)`);

  // 4. slug
  if (!p.slug) fail(rel, 'slug is empty — URLs must be stable and explicit');

  // 5. date must be in the past (buildFuture = false)
  if (p.date) {
    const d = new Date(p.date);
    if (isNaN(d)) fail(rel, `date "${p.date}" is unparseable`);
    else if (d > new Date()) fail(rel, `date ${p.date} is in the future — buildFuture=false means this 404s`);
  } else fail(rel, 'date is missing');

  // 6. taxonomy collisions break PaperMod nav with "page reference is ambiguous"
  const tags = p.tags || [], cats = p.categories || [];
  const overlap = tags.filter(t => cats.includes(t));
  if (overlap.length) fail(rel, `term(s) in BOTH tags and categories: ${overlap.join(', ')} — fatal "ambiguous page reference" build error`);
  for (const reserved of VALID_CATEGORIES) {
    if (tags.includes(reserved)) fail(rel, `"${reserved}" is a category, never a tag`);
  }

  if (kind === 'post') {
    // 7. categories: exactly one of research/reviews/guidelines
    if (!cats.length) fail(rel, 'categories is empty — must be research, reviews or guidelines');
    else for (const c of cats) if (!VALID_CATEGORIES.includes(c)) fail(rel, `category "${c}" is not one of ${VALID_CATEGORIES.join('/')}`);

    // 8. cover.relative — without it og:image 404s and every link preview breaks
    if (!p.hasCoverBlock) fail(rel, 'no cover block — og:image will be missing');
    else if (!p.coverRelative) fail(rel, 'cover.relative: true is missing — og:image resolves to site root and 404s');

    // 9. the infographic must actually exist on disk
    if (p.coverImage) {
      if (!fs.existsSync(path.join(dir, p.coverImage))) fail(rel, `cover image "${p.coverImage}" not found in the bundle — link previews will break`);
    }
  } else {
    // cases: tags only, no categories, no cover
    if (cats.length) fail(rel, 'cases must NOT set categories (research/reviews is a posts-only split)');
    if (p.hasCoverBlock) warn(rel, 'cases have no infographic — a cover block is unexpected');
    if (!/\{\{<\s*case-mcq\s*>\}\}/.test(p.body)) fail(rel, 'no {{< case-mcq >}} shortcode — case is not ready');
    if (!/^##\s+/m.test(p.body)) fail(rel, 'no "## " section headings — gating has nothing to wrap');
  }

  // 10. advisory: SERP title truncation
  if (p.title && p.title.length > 50) warn(rel, `title is ${p.title.length} chars — the " | Rheumatology Digest" suffix gets truncated in Google (aim <=50)`);
  if (!p.summary) warn(rel, 'summary is empty — homepage/list card will fall back to auto-extract');
}

function collectContent(target) {
  const roots = [path.join(ROOT, 'content/posts'), path.join(ROOT, 'content/cases')];
  let files = [];
  for (const r of roots) {
    if (!fs.existsSync(r)) continue;
    for (const e of fs.readdirSync(r, { withFileTypes: true })) {
      if (e.isDirectory()) { const f = path.join(r, e.name, 'index.md'); if (fs.existsSync(f)) files.push(f); }
      else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) files.push(path.join(r, e.name));
    }
  }
  if (!target) return files;
  // --staged: only content touched in the working tree. This is the real
  // pre-push gate — the whole-archive audit still trips on the known
  // description backlog (CLAUDE.md open follow-up #1) and would never be green.
  if (target === '--staged') {
    const g = spawnSync('git', ['status', '--porcelain', '--', 'content'], { cwd: ROOT, encoding: 'utf8' });
    const touched = (g.stdout || '').split('\n').map(l => l.slice(3).trim()).filter(Boolean)
      .map(p => path.join(ROOT, p));
    return files.filter(f => touched.some(t => f.startsWith(t) || f === t));
  }
  const hit = files.filter(f => f.includes(target));
  if (!hit.length) { console.error(C.red(`no content matched "${target}"`)); process.exit(2); }
  return hit;
}

// ------------------------------------------------------------------ actions
function cmdBuild() {
  console.log(C.bold('\n== build =='));
  const r = spawnSync('hugo', ['--gc', '--minify'], { cwd: ROOT, encoding: 'utf8' });
  if (r.error) { console.error(C.red(`hugo not on PATH: ${r.error.message}`)); process.exit(2); }
  const out = (r.stdout || '') + (r.stderr || '');
  const metaWarn = out.split('\n').filter(l => /meta description/i.test(l));
  const errors = out.split('\n').filter(l => /^ERROR|Error:/.test(l));
  // Three deprecation WARNs are expected (one ours, two from the PaperMod submodule).
  const depr = out.split('\n').filter(l => /deprecated/i.test(l)).length;
  const pages = (out.match(/Pages\s+│\s+(\d+)/) || [])[1];
  if (r.status !== 0 || errors.length) { console.log(out); fail('build', `hugo exited ${r.status}`); return; }
  ok(`hugo build clean — ${pages} pages, ${depr} known deprecation warnings`);
  if (metaWarn.length) metaWarn.forEach(l => fail('build', l.trim()));
  else ok('no meta-description length warnings');
}

function serverUp() {
  return fetch(`${BASE}/`, { signal: AbortSignal.timeout(1500) }).then(r => r.ok).catch(() => false);
}

async function cmdServe({ quiet } = {}) {
  if (await serverUp()) { if (!quiet) ok(`dev server already up at ${BASE}`); return; }
  const log = fs.openSync(SERVERLOG, 'w');
  const child = spawn('hugo', ['server', '-D', '--disableFastRender', '--port', String(PORT)],
    { cwd: ROOT, detached: true, stdio: ['ignore', log, log] });
  child.unref();
  fs.writeFileSync(PIDFILE, String(child.pid));
  for (let i = 0; i < 60; i++) { if (await serverUp()) { ok(`dev server up at ${BASE} (pid ${child.pid}), log: ${SERVERLOG}`); return; } await sleep(500); }
  console.error(C.red('server did not become ready in 30s. Log:'));
  console.error(fs.readFileSync(SERVERLOG, 'utf8').slice(-2000));
  process.exit(2);
}

function cmdStop() {
  if (!fs.existsSync(PIDFILE)) { console.log(C.dim('no pidfile; nothing to stop')); return; }
  const pid = Number(fs.readFileSync(PIDFILE, 'utf8'));
  try { process.kill(pid, 'SIGTERM'); ok(`stopped dev server (pid ${pid})`); }
  catch (e) { console.log(C.dim(`pid ${pid} not running (${e.code})`)); }
  fs.unlinkSync(PIDFILE);
}

// IMPORTANT: always drain or cancel the response body. An unconsumed body
// keeps its socket checked out of undici's pool, and later requests queue
// behind it — that turned this function into a 105-second crawl before the
// `.body?.cancel()` calls below were added. Same reason every fetch carries
// an explicit timeout: one stalled socket must not hang the whole run.
const HTTP_TIMEOUT = 10_000;
async function head(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(HTTP_TIMEOUT) });
    r.body?.cancel();
    return r;
  } catch { return null; }
}
async function get(url, wantBody = false) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(HTTP_TIMEOUT) });
    const body = wantBody ? await r.text() : (r.body?.cancel(), '');
    return { ok: r.ok, status: r.status, body };
  } catch (e) { return { ok: false, status: e.name, body: '' }; }
}
// Bounded parallelism — the dev server is local, but 42 unbounded requests
// still thrash the pool.
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const i = next++; out[i] = await fn(items[i]); }
  }));
  return out;
}

async function cmdSmoke() {
  console.log(C.bold('\n== smoke (HTTP) =='));
  await cmdServe({ quiet: true });
  const all = collectContent();
  const posts = all.filter(f => f.includes(`${path.sep}posts${path.sep}`));
  const cases = all.filter(f => f.includes(`${path.sep}cases${path.sep}`));
  const urls = ['/', '/posts/', '/cases/', '/about/', '/archives/', '/search/', '/index.json',
                '/categories/research/', '/categories/reviews/', '/categories/guidelines/', '/tags/'];
  await mapLimit(urls, 8, async u => {
    const r = await get(BASE + u);
    if (!r.ok) fail('smoke', `${u} -> ${r.status}`); else ok(`${u} -> 200`);
  });

  // Every post page must load AND its og:image must actually resolve —
  // a missing infographic breaks every WhatsApp/LinkedIn link preview.
  const live = posts.map(parseContent).filter(p => !p.error && p.draft === 'false' && p.slug);
  let ogFails = 0;
  await mapLimit(live, 8, async p => {
    const u = `/posts/${p.slug}/`;
    const r = await get(BASE + u, true);
    if (!r.ok) { fail('smoke', `${u} -> ${r.status}`); return; }
    const og = (r.body.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
    if (!og) { fail('smoke', `${u} has no og:image`); ogFails++; return; }
    const img = await head(og.replace('https://rheumatologydigest.org', BASE));
    if (!img || !img.ok) { fail('smoke', `${u} og:image does not resolve: ${og}`); ogFails++; }
  });
  ok(`${live.length - ogFails} post pages served with a resolving og:image${ogFails ? ` (${ogFails} bad)` : ''}`);

  const liveCases = cases.map(parseContent).filter(p => !p.error && p.draft === 'false' && p.slug);
  await mapLimit(liveCases, 4, async p => {
    const r = await get(`${BASE}/cases/${p.slug}/`);
    if (!r.ok) fail('smoke', `/cases/${p.slug}/ -> ${r.status}`);
    else ok(`/cases/${p.slug}/ -> 200`);
  });
}

// Case gating lives entirely in runtime JS: Hugo emits bare <h2>s and the
// layout's script wraps them in <section class="case-section"> and locks all
// but the first with data-locked="true". You CANNOT assert this against
// Hugo's output — you need a real browser. Hence --dump-dom.
async function cmdCase(slug) {
  console.log(C.bold('\n== case gating (headless DOM) =='));
  const chrome = findChrome();
  if (!chrome) { warn('case', 'no Chrome/Chromium found — skipping gating assertions (set RD_CHROME)'); return; }
  await cmdServe({ quiet: true });
  const targets = slug ? [slug] : collectContent().filter(f => f.includes(`${path.sep}cases${path.sep}`))
    .map(f => parseContent(f)).filter(p => !p.error && p.draft === 'false').map(p => p.slug);
  for (const s of targets) {
    const r = spawnSync(chrome, ['--headless', '--disable-gpu', '--virtual-time-budget=5000',
      '--dump-dom', `${BASE}/cases/${s}/`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const dom = r.stdout || '';
    const sections = [...dom.matchAll(/<section class="case-section"([^>]*)>/g)].map(m => m[1]);
    const locked = sections.filter(a => a.includes('data-locked')).length;
    const mcqs = (dom.match(/class="case-mcq"/g) || []).length;
    if (!sections.length) { fail('case', `/cases/${s}/ — JS built no .case-section wrappers (gating broken)`); continue; }
    if (locked !== sections.length - 1) fail('case', `/cases/${s}/ — ${locked} locked of ${sections.length}; expected exactly ${sections.length - 1} (only section 1 open)`);
    else ok(`/cases/${s}/ — ${sections.length} sections, ${locked} locked, ${mcqs} MCQs`);
  }
}

async function cmdShot(urlPath = '/', out) {
  const chrome = findChrome();
  if (!chrome) { console.error(C.red('no Chrome/Chromium found; set RD_CHROME')); process.exit(2); }
  await cmdServe({ quiet: true });
  fs.mkdirSync(SHOTDIR, { recursive: true });
  const name = out || (urlPath.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home') + '.png';
  const dest = path.isAbsolute(name) ? name : path.join(SHOTDIR, name);
  const r = spawnSync(chrome, ['--headless', '--disable-gpu', '--virtual-time-budget=5000',
    '--window-size=900,1400', `--screenshot=${dest}`, BASE + urlPath], { encoding: 'utf8' });
  if (!fs.existsSync(dest)) { console.error(C.red(`screenshot failed: ${r.stderr}`)); process.exit(2); }
  ok(`screenshot ${urlPath} -> ${dest} (${fs.statSync(dest).size} bytes)`);
  console.log(C.dim('  headless Chrome renders in DARK mode by default (PaperMod defaultTheme=auto).'));
}

function cmdCheck(target) {
  console.log(C.bold('\n== content check (pre-push checklist) =='));
  const files = collectContent(target);
  if (!files.length) { console.log(C.dim('  no changed content under content/ — nothing to gate')); return; }
  const before = problems.length;
  files.forEach(checkOne);
  if (problems.length === before) ok(`${files.length} content file(s) pass every pre-push rule`);
  else ok(`${files.length} content file(s) checked`);
}

// --------------------------------------------------------------------- main
const [, , cmd = 'all', ...rest] = process.argv;
const run = async () => {
  switch (cmd) {
    case 'build': cmdBuild(); break;
    case 'serve': await cmdServe(); break;
    case 'stop': cmdStop(); return;
    case 'check': cmdCheck(rest[0]); break;
    case 'smoke': await cmdSmoke(); break;
    case 'case': await cmdCase(rest[0]); break;
    case 'shot': await cmdShot(rest[0], rest[1]); break;
    // "am I ready to push?" — gates only CHANGED content, because a
    // whole-archive audit still trips on the known description backlog.
    case 'all': cmdCheck(rest[0] || '--staged'); cmdBuild(); await cmdSmoke(); await cmdCase(); break;
    case 'audit': cmdCheck(); break;
    default:
      console.log(`usage: driver.mjs <all|check|audit|build|serve|stop|smoke|case|shot> [arg]

  all            THE pre-push gate: check --staged + build + smoke + case
  check <match>  pre-push checklist on matching content (no server needed)
  check --staged same, but only content changed in the working tree
  audit          run the checklist over the whole archive (trips the known
                 description/title backlog — CLAUDE.md open follow-ups 1 & 3)
  build          hugo --gc --minify; fails on errors + meta-description warnings
  serve | stop   dev server lifecycle on :${PORT}
  smoke          every page 200s and every post's og:image actually resolves
  case [slug]    headless-DOM assertion that MCQ gating locks all but section 1
  shot <path>    headless screenshot, e.g. shot /cases/child-with-limp-case/
`);
      process.exit(0);
  }
  // Group identical rule violations so a whole-archive audit is readable
  // instead of 27 copies of the same line.
  const report = (list, label, colour) => {
    if (!list.length) return;
    const tag = colour(label.slice(0, 4).toUpperCase());
    const groups = new Map();
    for (const p of list) {
      const key = p.msg.replace(/"[^"]*"/g, '"…"').replace(/\d+/g, 'N');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }
    console.log(C.bold(`\n${list.length} ${label}:`));
    for (const g of groups.values()) {
      // Collapse only when one rule spans several FILES. Several hits of the
      // same rule within ONE file are different terms and must stay legible.
      const files = new Set(g.map(p => p.where));
      if (files.size === 1) { g.forEach(p => console.log(`  ${tag} ${p.where}: ${p.msg}`)); continue; }
      console.log(`  ${tag} ${C.bold(`x${g.length}`)} ${g[0].msg.replace(/"[^"]*"/g, '"…"')}`);
      [...files].slice(0, 3).forEach(w => console.log(`         ${C.dim(w)}`));
      if (files.size > 3) console.log(`         ${C.dim(`… and ${files.size - 3} more`)}`);
    }
  };
  const fails = problems.filter(p => p.level === 'FAIL');
  const warns = problems.filter(p => p.level === 'WARN');
  report(warns, 'warnings', C.yel);
  report(fails, 'failures', C.red);
  if (fails.length) { console.log(C.red('\nNOT ready to push.\n')); process.exit(1); }
  console.log(C.grn('\nAll checks passed.\n'));
};
run().catch(e => { console.error(C.red(e.stack || String(e))); process.exit(2); });
