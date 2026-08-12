---
title: "{{ .File.ContentBaseName | replaceRE `^[0-9]{4}-[0-9]{2}-[0-9]{2}-` `` | replaceRE `-` ` ` | title }}"
date: {{ .Date }}
draft: true
slug: "{{ .File.ContentBaseName | replaceRE `^[0-9]{4}-[0-9]{2}-[0-9]{2}-` `` }}"
author: "Dr. Sree Hari Reddy MD"
tags: []
categories: []
summary: ""
# description: SEO meta description — MUST be <=155 chars. Judgement first, numbers stay in the post.
# Pattern: what changed / what the catch is. Not the trial name.
description: ""
cover:
  image: "infographic.png"
  relative: true
  alt: ""
  hidden: false
source:
  authors: ""
  title: ""
  journal: ""
  year: ""
  doi: ""
  url: ""
---

> **TL;DR:** _One-line clinical takeaway._

<!--
  Commentary: 2–4 short paragraphs.
  What's new in this paper? What changes (or doesn't) in clinical practice?
  Important caveats, limitations, or contrasts with prior evidence.
-->



{{< source >}}
