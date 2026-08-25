---
title: "Serologically Active, Clinically Quiet SLE"
date: 2026-08-25T06:00:00+05:30
draft: false
slug: "sacq-lupus-anti-dsdna-c3"
author: "Dr. Sree Hari Reddy MD"
tags: ["sle", "diagnosis", "pathophysiology", "anti-dsdna"]
categories: ["research"]
summary: "In a UCL cohort of prolonged SACQ lupus patients — elevated anti-dsDNA and/or low C3 for 6+ months with no clinical activity — 63% flared over a mean 3.3 years. Rising IgG anti-dsDNA and falling C3 at one visit independently predicted flare and sustained activity at the next, including moderate-to-severe disease, in a visit-by-visit longitudinal model. The risk from low C3 rose sharply below 0.9 g/L and flattened above it."
description: "Two-thirds of 'quiet but serology-positive' lupus patients flared, and the serology moved before the flare did — not just tracked it."
cover:
  image: "infographic.png"
  relative: true
  alt: "Prolonged SACQ lupus: rising anti-dsDNA and falling C3 predict flare in a longitudinal GEE model"
  hidden: false
source:
  authors: "Piunno S, Ortolan A, Zolio L, Rahman A, Isenberg DA"
  title: "Prolonged serologically active clinically quiescent systemic lupus erythematosus: a longitudinal study on the role of IgG anti-dsDNA and C3"
  journal: "Rheumatology"
  year: 2026
  doi: "10.1093/rheumatology/keag382"
  url: ""
---

> **TL;DR:** In patients with prolonged SACQ lupus — positive serology, quiet clinic — 63% flared over 3.3 years, and rising anti-dsDNA or falling C3 at one visit independently predicted flare or sustained activity at the next, so the "watch and wait" instinct in this group needs a tighter watch.

## The clinical problem

SACQ — serologically active, clinically quiescent — describes lupus patients who sit in an uncomfortable middle ground: anti-dsDNA stays up, or C3 stays down, or both, for months on end, while the clinical picture stays flat. No arthritis, no rash, no renal signal, nothing that scores on BILAG. It was first described in 1979, and it is not rare — it accounts for roughly 6–25% of SLE patients depending on the series.

The question that has never had a clean answer is what to do with these patients. Anti-dsDNA and hypocomplementaemia are both established correlates of disease activity, but whether their fluctuation *predicts* an actual flare in a population that is, by definition, not currently flaring has been argued both ways in small studies. Some found no correlation at all between rising antibody titres and subsequent flare. That inconsistency is precisely why a clinician's response to a stable patient with a persistently positive dsDNA is so often just a shrug and the next routine visit.

## The study

A UCL Hospital Lupus Cohort analysis, November 2020 to April 2025. Prolonged SACQ was defined strictly: IgG anti-dsDNA >10 IU/ml and/or C3 <0.9 g/L, sustained for **at least 6 months across a minimum of two consecutive visits**, with BILAG-2004 grade D or E — clinically quiescent — in every organ domain throughout. 60 patients met this, contributing 531 visits over a mean follow-up of 3.3 years.

The analytic approach is the part worth understanding before the results. Rather than comparing SACQ patients who flared against those who didn't as two fixed groups, the authors ran **generalised estimating equations** visit by visit: each patient's anti-dsDNA and C3 at one visit were used to predict their disease state at the *next* visit, with the predictor deliberately lagged to avoid reverse causation. That is a meaningfully different question from "do flarers have worse serology overall" — it asks whether a rising titre or a falling complement is followed by trouble.

## Most SACQ patients flared

38 of 60 patients (63.3%) had at least one flare during follow-up — a total of 117 flares, including 31 moderate-to-severe. Median time to first flare was 476 days; to first moderate-to-severe flare, 504 days. Flares were commonest in the haematological domain (41.7%), then musculoskeletal (33.3%), mucocutaneous (25%) and renal (13.3%).

Baseline characteristics gave almost no warning of who would flare. Sex, age, ethnicity, disease duration, comorbidity burden and organ involvement at diagnosis were all statistically indistinguishable between the two groups. The only differences were a longer follow-up duration among flarers (an artefact of more time at risk, not a real signal) and a higher rate of anti-Ro positivity (58% vs 23%, P = 0.018) — a genuinely interesting but unconfirmed association.

## What predicted flare: the serology itself, moving

| Predictor (per-visit, lagged) | Any flare | Sustained activity | Moderate–severe flare | Moderate–severe activity |
|---|---|---|---|---|
| IgG anti-dsDNA, per +10 IU/ml | OR 1.04 (1.01–1.08) | OR 1.08 (1.04–1.13) | OR 1.07 (1.03–1.12) | OR 1.08 (1.04–1.13) |
| C3, per −0.1 g/L | OR 1.26 (1.11–1.43) | OR 1.23 (1.12–1.37) | OR 1.37 (1.11–1.69) | OR 1.59 (1.33–1.89) |

Both associations held after adjusting for sex and age, and again after additionally adjusting for treatment de-escalation — so a patient having their prednisolone, hydroxychloroquine or immunosuppressant tapered does not explain the signal away. C3 mattered more than the antibody titre at every outcome, and its effect on moderate-to-severe *sustained* activity was the strongest relationship in the paper.

**C3's relationship with risk was not a straight line.** A restricted cubic spline showed a sharp rise in event probability as C3 fell below roughly 0.9 g/L, flattening out above that — in other words, the threshold used to define SACQ in the first place sits close to where the real inflection in risk occurs, rather than being an arbitrary cut. Female sex was independently associated with sustained disease activity (OR 2.36–2.45) but not with flare itself.

## How this compares with what came before

This is where the paper earns its place, because the literature on this exact question has been genuinely contradictory:

| Study | Design | Predictive of flare? |
|---|---|---|
| **This study** | 60 patients, 531 visits, BILAG-2004, GEE per-visit | **Yes** |
| Steiman et al. | 56 patients, SLEDAI-2K, pre-flare vs persistent SACQ comparison | No |
| Steiman et al. (isotype study) | 23 patients, mostly qualitative | No |
| Ng et al. | 21 patients, baseline serology only, time-to-event | No (though very high baseline dsDNA gave earlier flares) |

The authors' explanation for the discrepancy is methodological rather than biological, and it's a fair one. The two Steiman studies used SLEDAI-2K, a less sensitive activity index than BILAG-2004, and all three prior studies compared timepoints selected arbitrarily around a flare rather than modelling the whole trajectory — one worked from only 5 patients with paired SACQ-and-flare samples, and Ng et al. used a single baseline serology measurement rather than longitudinal values. This study used BILAG-2004 throughout, captured 531 visits across 60 patients, and modelled every timepoint's relationship to the next rather than picking out two moments to compare. The message is that the biology was probably detectable all along; smaller designs working from fewer, cruder timepoints simply couldn't see it.

## Limitations

This is observational data from one specialist centre, so the flare rate and the strength of association may not travel unchanged to a different population or a different lab's assay. The definition of "prolonged" SACQ required 6 months of abnormal serology to even enter the cohort — a shorter threshold might behave differently, and a longer one might sharpen prediction further at the cost of excluding more patients. C4 was not analysed, for a defensible reason: it is often chronically low for genetic reasons unrelated to disease activity, but that also means a real complement signal specific to C4 could have been missed. Three patients died of non-lupus causes during follow-up (contributing nine, seven and six visits respectively before then), with their data used up to the last available visit — the paper doesn't specify any additional handling for this beyond that.

## What this changes in clinic

- **A stable SACQ patient is not a low-risk patient.** Nearly two in three flared, including over half with moderate-to-severe disease. The label describes serology and current clinical state, not future trajectory.
- **Trend the numbers, not just the threshold.** A rising anti-dsDNA or a falling C3 in a patient who still looks clinically fine at today's visit is itself the actionable finding — it predicted the *next* visit's flare in this model, independent of where the values sit relative to the diagnostic cutoffs.
- **Take C3 below 0.9 g/L seriously.** That is roughly where the spline shows risk accelerating rather than climbing gradually, which lends some prospective support to the number already used to define SACQ.
- **Anti-Ro positivity in this group is worth a mental flag**, though it needs confirmation in a larger cohort before it changes anything concrete.
- **Do not read a stable low-dose steroid taper as reassurance about serology.** The predictive value of anti-dsDNA and C3 survived adjustment for treatment de-escalation — the biomarkers were not simply proxying for medication changes.

{{< source >}}
