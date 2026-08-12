---
title: "{{ .File.ContentBaseName | replaceRE `^[0-9]{4}-[0-9]{2}-[0-9]{2}-` `` | replaceRE `-` ` ` | title }}"
date: {{ .Date }}
draft: true
slug: "{{ .File.ContentBaseName | replaceRE `^[0-9]{4}-[0-9]{2}-[0-9]{2}-` `` }}"
author: "Dr. Sree Hari Reddy MD"
# Cases use tags ONLY. Do not add `categories:` — research/reviews/guidelines is a posts-only split.
# Keep "case" in the tag list; add disease + theme tags alongside it.
tags: ["case"]
summary: ""
# description: short page subtitle / SEO meta — MUST be <=155 chars.
description: ""
source:
  authors: ""
  title: ""
  journal: ""
  year: ""
  doi: ""
  url: ""
---

## 1. The Presentation

<!--
  Body = clinical narrative only: what the team has in front of them at THIS moment.
  Under ~80 words so it fits one mobile screen. Do NOT leak the answer into the body —
  the teaching lives in the per-option rationales below.
  No TL;DR or intro paragraph — cases drop the reader straight into Section 1.
-->

{{< case-mcq >}}
question: |
  Markdown question text.
options:
  - text: Distractor A
    rationale: |
      Why this specifically is wrong, and briefly what the right answer is.
  - text: Correct answer
    correct: true
    rationale: |
      The reasoning. Carry the teaching here.
  - text: Distractor C
    rationale: |
      ...
{{< /case-mcq >}}

<!--
  Repeat the pattern above for ~12-14 `## ` sections. Each H2 starts a new gated
  section, revealed when the previous MCQ's Continue is clicked. Keep the diagnosis
  hidden until roughly three-quarters through.
  The final section carries NO MCQ — it auto-reveals on the last Continue.
-->

## 2. Outcome and Take-Aways



{{< source >}}
