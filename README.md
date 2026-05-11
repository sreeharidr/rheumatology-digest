# Rheumatology Digest

Source for [digest.rheumatology.center](https://digest.rheumatology.center) — a Hugo-based educational rheumatology site by Dr. Sree Hari Reddy MD.

## Local development

```sh
git clone --recurse-submodules <repo-url>
cd rheumatology-digest
hugo server -D
```

Open http://localhost:1313.

If you cloned without `--recurse-submodules`, fetch the theme separately:

```sh
git submodule update --init --recursive
```

## Stack

- [Hugo](https://gohugo.io/) (extended)
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme (Git submodule)
- Hosted on Cloudflare Pages
