---
title: "{{ .File.ContentBaseName | replaceRE `^[0-9]{4}-[0-9]{2}-[0-9]{2}-` `` | replaceRE `-` ` ` | title }}"
date: {{ .Date }}
draft: true
slug: "{{ .File.ContentBaseName | replaceRE `^[0-9]{4}-[0-9]{2}-[0-9]{2}-` `` }}"
author: "Dr. Sree Hari Reddy MD"
# Videos use tags ONLY. Do not add `categories:` — research/reviews/guidelines is a posts-only split.
tags: []
summary: ""
# description: SEO meta description — MUST be <=155 chars. Keep the title <=50 chars.
description: ""
# thumbnail.jpg (or .png — change cover.image to match) goes in this folder: the user's own YouTube thumbnail. It is the
# facade image on the page AND the og:image for link previews. relative: true is required.
cover:
  image: "thumbnail.jpg"
  relative: true
  alt: ""
  hidden: true
video:
  id: ""            # the 11-character YouTube ID (youtu.be/<id>)
  series: ""
  episode: 1
  seconds: 0        # runtime in seconds, e.g. 4:42 = 282
  uploaded: ""      # real YouTube upload time, ISO 8601 with offset — used for VideoObject uploadDate
---

{{< video >}}

> **TL;DR:** _One-sentence takeaway of the episode._

<!--
  Write the page from the episode's TRANSCRIPT, in the same order, using ## headings.
  Do not paste the transcript. Do not include the spoken sign-on/sign-off (no visible byline).
  End with a one-line "Based on ..." note if the episode draws on a named source.
-->
