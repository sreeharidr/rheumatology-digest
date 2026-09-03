---
title: "Does BMI Blunt JAK Inhibitor Response in RA?"
date: 2026-09-03T05:00:00+05:30
draft: false
slug: "bmi-jak-inhibitor-response-ra"
author: "Dr. Sree Hari Reddy MD"
tags: ["rheumatoid-arthritis", "jak-inhibitors", "obesity", "treatment"]
categories: ["research"]
summary: "An individual patient data meta-analysis of 16 phase 3 trials and 11,883 patients shows JAK inhibitor response falls in a graded way as BMI rises — roughly 18 fewer ACR20 responders per 100 treated at class 3 obesity. Crucially, no such gradient appears in the placebo arms, and within-trial interaction analyses confirm obesity modifies the treatment effect rather than simply marking worse disease."
description: "Obesity is a true effect modifier, not just a poor-prognosis marker — 18 fewer ACR20 responders per 100 treated at class 3 obesity."
cover:
  image: "infographic.png"
  relative: true
  alt: "BMI and JAK inhibitor response in rheumatoid arthritis: graded reduction in ACR20 across BMI categories"
  hidden: false
source:
  authors: "Bechman K, Russell MD, Biddle K, Gibson M, Brown J, Rutherford AI, Nikiphorou E, Perucha E, Cope AP, Norton S, Galloway J"
  title: "Impact of BMI on response to Janus kinase inhibitors in rheumatoid arthritis: an individual patient data meta-analysis of randomised controlled trials"
  journal: "The Lancet Rheumatology"
  year: 2026
  doi: "10.1016/S2665-9913(26)00151-7"
  url: ""
---

> **TL;DR:** Across 16 phase 3 trials and 11,883 patients, JAK inhibitor response falls steadily as BMI rises — about 18 fewer ACR20 responders per 100 treated at class 3 obesity — and because no such gradient exists in the placebo arms, obesity is modifying the drug effect rather than just marking worse disease.

## The question this actually answers

Obesity affects 20–45% of patients with RA depending on the cohort, and it is already established that response and remission rates are lower in obesity with methotrexate, TNF inhibitors, and some but not all non-TNF biologics. That much is not new.

What has been genuinely unresolved is **whether obesity specifically blunts the drug, or simply marks a patient who does worse regardless of what you give them.** Most previous studies examined BMI–outcome associations *within* treatment groups without formally testing whether those associations also appear in control groups. That distinction matters enormously: a prognostic factor tells you what to expect, while an effect modifier tells you the drug itself is working less well — and only the second justifies changing the drug.

There is also a specific pharmacological reason to ask this about JAK inhibitors rather than assume the biologic answer transfers. JAK inhibitors are **small lipophilic molecules given at fixed doses irrespective of bodyweight**. In obesity, the expanded adipose compartment increases volume of distribution and might reduce circulating concentrations, and obesity-associated hepatic steatosis and inflammation might alter cytochrome P450 activity — an important metabolic pathway for JAK inhibitor clearance. Yet evidence on the effect of obesity on JAK inhibitor response has remained scarce, and the pooled analyses that do exist generally suggest efficacy is maintained across standard BMI categories.

## How it was done

An individual patient data meta-analysis — ClinicalTrials.gov searched from inception to 13 January 2025 for phase 3 randomised controlled trials of tofacitinib, baricitinib, upadacitinib or filgotinib in adult RA, with a placebo or active comparator. Individual data were obtained through the Vivli data-sharing platform. Registered on PROSPERO (CRD420251180005), reported per PRISMA-IPD, and — worth noting — **funded by nobody**.

The search yielded 1,407 records, narrowing to 20 eligible studies, of which **16 provided usable individual patient data** covering 11,883 participants. One upadacitinib study remains active (estimated completion September 2027) and three filgotinib studies were excluded because the anonymisation provider permitted access to only a restricted set of variables. Trials compared JAK inhibitors with placebo (n=9), methotrexate (n=5) or biologics (adalimumab n=5, abatacept n=1), with durations from 12 to 104 weeks. Risk of bias, assessed with the Cochrane RoB 2 tool, was **low** in individual studies.

Primary outcomes were **ACR20** and **DAS28-CRP** at each trial's own primary efficacy timepoint — most commonly 12 weeks. BMI was analysed both continuously and categorically (underweight <18.5; healthy weight 18.5 to <25; overweight 25 to <30; obesity class 1 30 to <35; class 2 35 to <40; class 3 ≥40 kg/m²), with healthy weight as reference. Models adjusted for age, sex, ethnicity, country, smoking, baseline HAQ-DI and baseline pain.

Two methodological choices deserve credit. First, **underweight patients were analysed separately** rather than folded in, because combining them can attenuate and obscure true BMI-related effects. Second, DAS28-CRP was handled as a **baseline-adjusted endpoint rather than a change score**, which is statistically more efficient and reduces regression-to-the-mean bias.

## Who was studied

11,883 participants: 9,588 (80.7%) women, mean age 52.9 years, with baseline BMI available for 99.8%. Median BMI was **26.8 kg/m² (IQR 23.2–31.3)**, and **3,676 (30.9%) had class 1–3 obesity**. Mean baseline DAS28-CRP was 5.7.

| BMI category | n | % |
|---|---|---|
| Underweight (<18.5) | 420 | 3.5% |
| Healthy weight (18.5 to <25) | 4,071 | 34.3% |
| Overweight (25 to <30) | 3,698 | 31.2% |
| Obesity class 1 (30 to <35) | 2,060 | 17.4% |
| Obesity class 2 (35 to <40) | 950 | 8.0% |
| Obesity class 3 (≥40) | 666 | 5.6% |

7,765 (65.3%) received a JAK inhibitor, 1,963 (16.5%) placebo, 1,229 (10.3%) a biologic and 926 (7.8%) methotrexate. Recruitment was global — Europe 37.2%, North America 24.1%, Latin America 18.6%, Asia 16.7% — with higher obesity levels in North America and lower in Asia. There were no significant differences in BMI across treatment groups.

## The gradient

Modelled continuously within the JAK inhibitor group, each 1-unit increase in BMI was associated with a lower likelihood of ACR20 (RR 0.99, 95% CI 0.99–0.99; p<0.0001) and a 0.02-unit higher DAS28-CRP (95% CI 0.01–0.03; p<0.0001). Comparison of linear, quadratic and spline specifications showed no improvement in fit from more flexible forms, so BMI was modelled linearly. Models allowing a study-level random slope did not improve on the random-intercept model, indicating **minimal between-study variation and a common BMI effect across trials**.

Categorically, the reduction is graded and consistent:

| vs healthy weight | ACR20, adjusted RR (95% CI) | DAS28-CRP, adjusted mean difference (95% CI) |
|---|---|---|
| Underweight | 0.96 (0.87–1.07) — not significant | — |
| Overweight | 0.94 (0.91–0.98) | 0.14 (0.06–0.22) |
| Obesity class 1 | 0.92 (0.89–0.96) | 0.21 (0.12–0.31) |
| Obesity class 2 | 0.88 (0.81–0.96) | 0.30 (0.16–0.44) |
| Obesity class 3 | 0.78 (0.71–0.85) | 0.54 (0.37–0.70) |

All DAS28-CRP differences were significant at p<0.0001. The same pattern held for ACR50 and ACR70, becoming **more pronounced with increasing obesity class and at more stringent response thresholds**.

**In absolute terms** — the number that translates to clinic — predicted ACR20 response was **74% (95% CI 70–76) at healthy weight versus 56% (50–64) in class 3 obesity**, corresponding to roughly **18 fewer responders per 100 treated patients**. Mean predicted DAS28-CRP was 3.45 (3.15–3.85) versus 4.03 (3.55–4.40), a difference of about 0.60 units, which the authors judge clinically meaningful.

## Effect modifier, not prognostic marker — and how they showed it

This is the part that distinguishes the paper from what came before, and it rests on two pieces of evidence.

**First, the placebo arms.** No corresponding BMI-related trend was observed in the placebo group. If higher BMI simply marked patients with a worse disease trajectory, you would expect the gradient to appear regardless of treatment. It does not — which supports the interpretation that what is being observed is a **reduced pharmacological response** rather than a difference in underlying prognosis.

**Second, within-trial interaction analyses** — the formal inferential test of effect modification, expressed as ratios of risk ratios (RoR), where values below 1 indicate reduced treatment benefit relative to healthy weight:

| ACR20, within-trial interaction | RoR (95% CI) | Heterogeneity |
|---|---|---|
| Overweight | 0.89 (0.81–0.99) | I²=0.00% |
| Obesity class 1 | 0.95 (0.80–1.12) | I²=34.70% |
| Obesity class 2 | 0.81 (0.68–0.95) | I²=0.00% |
| Obesity class 3 | 0.81 (0.65–1.00) | I²=0.00% |

Treatment effects were significantly attenuated in class 2 and class 3 obesity, with no clear effect modification at class 1. For DAS28-CRP the attenuation was progressive across all categories: 0.19 (0.05–0.34) overweight, 0.25 (0.08–0.42) class 1, 0.35 (0.14–0.56) class 2, and 0.49 (0.19–0.78) class 3.

Read the class 3 ACR20 interaction carefully — **RoR 0.81 with an upper bound of exactly 1.00**. It is significant by the narrowest possible margin, and the effect-modification claim rests more comfortably on class 2, on the DAS28-CRP results, and on the consistency of the overall pattern than on that single borderline interval.

A two-stage sensitivity analysis reproduced the graded reduction — pooled adjusted RRs of 0.94 (0.90–0.97) overweight, 0.92 (0.88–0.96) class 1, 0.90 (0.84–0.96) class 2 and 0.81 (0.75–0.88) class 3 — with low to moderate heterogeneity (I²=0–33.62%), though effect sizes were smaller than in the one-stage model.

## Is this specific to JAK inhibitors?

The authors examined biologic comparators within the same trials. A **similar trend appeared, but only for ACR50 and ACR70 in class 2 or 3 obesity** — not the more consistent effect seen across endpoints with JAK inhibitors.

Two readings are offered and neither can be settled here: the biologic strata at high BMI had smaller samples and therefore less precision, or BMI-related attenuation of biologic response genuinely only becomes visible at more stringent response thresholds. Baseline BMI distribution and covariate profiles did not differ between the JAK inhibitor and biologic groups.

For context, obesity is a recognised factor in reduced response to TNF inhibitors, an effect less evident with tocilizumab and rituximab and **not observed with abatacept**.

## Why — and the sensitivity analysis that reframes the mechanism

The pharmacokinetic explanation is the intuitive one, and this paper argues against it being the whole story.

For subcutaneously administered biologics, absorption, distribution volume, lipophilicity and altered clearance plausibly contribute. But JAK inhibitors are small molecules whose pharmacokinetics depend mainly on absorption, hepatic metabolism and renal clearance, and **no convincing pharmacokinetic evidence shows that obesity lowers exposure to them, as it can for monoclonal antibodies**.

The neat piece of evidence is a sensitivity analysis modelling **height and weight as separate continuous predictors** instead of BMI. Increasing weight showed a progressive association with lower predicted probability of ACR20; **height showed a minimal effect, with a flatter curve**. If the mechanism were simply dilution across a larger distribution volume, height should matter comparably. It does not — which argues against a purely pharmacokinetic explanation and instead supports **adiposity-related inflammatory or metabolic mechanisms**: adipokine-driven increases in IL-6, TNF and IL-1β, and obesity-related alterations in hepatic CYP activity linked to fatty liver, which could reduce effective drug concentrations.

This is worth setting against the [dosing-biologics-in-obesity](/posts/dosing-biologics-obesity/) argument, where weight-driven clearance genuinely does underdose fixed-dose subcutaneous biologics. For JAK inhibitors, the same clinical observation appears to have a different underlying cause — which is precisely why simply raising the dose is not the answer.

## The regional finding, which has trial-design consequences

Participants from Latin America and Asia had higher odds of ACR20 than those from Europe, while participants from North America had lower odds — a well-recognised phenomenon in RA trials. Adjusting for BMI **modestly attenuated these regional differences, reducing the regional effect estimates by 23.1% in North America and 35.0% in Asia**, with minimal attenuation elsewhere.

In other words, a meaningful slice of what looks like geographic variation in trial efficacy may simply be population-level differences in adiposity. The authors argue future trials should ensure balanced representation across the BMI spectrum within each region, prespecify BMI as a stratification factor at randomisation, or at minimum routinely report BMI-stratified efficacy estimates — and that formal transportability analyses reweighting trial populations to match regional BMI distributions would give regulators firmer ground. The point generalises to any therapy where body composition might influence pharmacokinetics or pharmacodynamics.

## How much to believe

**Strengths** are real: a large sample across three JAK inhibitor programmes, individual-level data permitting consistent covariate adjustment and harmonised outcome definitions, BMI evaluated both categorically and continuously, and concordance between one-stage and two-stage approaches.

The limitations the authors acknowledge:

- **Restriction to phase 3 trials** may limit generalisability and introduce selection bias, though it was a deliberate choice to minimise heterogeneity.
- **Filgotinib data were unavailable**, and for other agents the confidentiality-driven data release meant not all variables of interest could be adjusted for — **leaving scope for residual confounding**.
- **Background and rescue therapy could not be accounted for**, though randomisation makes imbalance unlikely.
- **BMI was measured only at baseline**, with no data on weight change during follow-up, so nothing can be said about dynamic associations.
- **Outcome timing varied across trials** and required approximations that might have influenced estimates.
- **The underweight group** should be interpreted cautiously given small numbers, baseline differences and potential residual confounding.
- Missing data and between-trial heterogeneity remain challenges given differences in design, measurement schedules and inclusion criteria.

One further caution the authors raise themselves: **funnel plots for the interaction analyses suggested asymmetry, supported by Egger's test (p=0.0001)** — though they interpret this cautiously given the modest number of trials.

And the framing caveat that matters most in clinic: **JAK inhibitors remained effective across all BMI categories.** This is attenuation, not failure. The magnitude is modest at overweight and class 1, and becomes clinically interesting mainly at class 2 and above.

## What this changes

- **Set expectations honestly at the point of prescribing.** A patient with class 3 obesity has roughly an 18-percentage-point lower chance of ACR20 than a patient at healthy weight on the same drug. That belongs in a shared decision-making conversation, not as a reason to withhold the drug.
- **Do not escalate the dose to compensate.** The authors are explicit that this is unlikely to be viable given the established dose-dependent safety concerns highlighted in regulatory guidance for this class.
- **Consider an alternative mechanism of action in a non-responder with high BMI** — though note the evidence here does not identify which alternative performs better, and obesity blunts TNF inhibitors too.
- **Weight management is now a plausible part of the treatment plan, not an adjacent lifestyle conversation.** Whether GLP-1 receptor agonists improve treatment responsiveness — and whether any immunomodulatory effect is independent of weight loss — is explicitly a testable hypothesis rather than an established one.
- **Note the confounder in the other direction:** JAK inhibitors have themselves been associated with weight gain, which may reflect improved inflammatory burden and reversal of rheumatoid cachexia.
- **When reading any RA trial, ask about BMI representation.** If a third of real-world patients have obesity and trial populations differ regionally in adiposity, efficacy estimates may not transport to the patient in front of you.

{{< source >}}
