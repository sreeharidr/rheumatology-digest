---
title: "What Happens to Seronegative RA Over 10 Years?"
date: 2026-08-19T05:00:00+05:30
draft: false
slug: "seronegative-ra-ten-year-outcomes"
author: "Dr. Sree Hari Reddy MD"
tags: ["rheumatoid-arthritis", "diagnosis", "treatment", "remission", "spondyloarthritis"]
categories: ["research"]
summary: "Population-based data from Olmsted County finally give a usable number for how often a seronegative RA diagnosis turns out to be something else: about 13% over ten years, front-loaded into the first five, and most often spondyloarthritis. A quarter achieve sustained drug-free remission lasting a median of 6.3 years, one in five needs a biologic — and nothing measured at baseline predicts which."
description: "About 13% get reclassified within a decade — mostly early, mostly to spondyloarthritis — and a quarter come off all treatment for good."
cover:
  image: "infographic.png"
  relative: true
  alt: "Ten-year outcomes in seronegative rheumatoid arthritis: reclassification, drug-free remission and biologic use"
  hidden: false
source:
  authors: "Kimbrough BA, George RJ, Crowson CS, Achenbach SJ, Atkinson EJ, Kronzer VL, Davis JM 3rd, Myasoedova E"
  title: "Long-Term Outcomes in Seronegative Rheumatoid Arthritis"
  journal: "Arthritis Care & Research"
  year: 2026
  doi: "10.1002/acr.70011"
  url: ""
---

> **TL;DR:** In criteria-defined seronegative RA, about 13% are reclassified within a decade — three-quarters of those inside five years, most often to spondyloarthritis — while roughly a quarter reach durable drug-free remission, and nothing measured at baseline predicts who.

## The clinical problem

**Seronegative RA is a diagnosis of exclusion that we make with the confidence of a diagnosis of inclusion — and then we counsel patients about a future we have very little data on.**

Seronegative RA (RF-negative and ACPA-negative) is not simply seropositive RA without the antibodies. It differs in genetic risk architecture, pathobiology and prognostic features. It accounts for **20–50% of RA depending on the cohort**, and — importantly — its **incidence is rising while seropositive RA is falling**, a shift partly explained by population ageing.

**Three specific uncertainties motivate the study:**

1. **Is the diagnosis correct?** Without a confirmatory autoantibody, and with a long list of mimics, misdiagnosis is a live possibility. The published estimates are wildly discordant. A Finnish study of seronegative *inflammatory arthritis* found that **over 90%** were eventually classified as something other than RA. Other studies place the figure at **4–19%** for reclassification to spondyloarthritis or CPPD disease specifically. That is a range spanning nearly the entire probability space — clinically useless for counselling a patient sitting in front of you.
2. **How often does treatment escalate?** Need for a b/tsDMARD signals failure of substantially cheaper csDMARDs, and matters for health systems as well as patients.
3. **How often can treatment stop?** Sustained drug-free remission is largely unattainable in seropositive RA but not uncommon in seronegative disease — reported at around **40% in one Dutch cohort**.

**The literature's problem is not absence but incoherence.** Existing data are predominantly European, single-centre, and — critically — use heterogeneous entry criteria: some enrol on clinical diagnosis, some on classification criteria, some exclude erosive patients. These design choices largely determine the answer. What has been missing is a **population-based North American inception cohort with uniform, criteria-based entry and long follow-up**.

**A tension in the existing literature worth naming:** many studies describe seronegative RA as milder, less erosive, with fewer extra-articular manifestations. Others report a *higher* initial inflammatory burden, delayed diagnosis and treatment, and reduced likelihood of remission. Both characterisations cannot be uniformly true, which itself suggests we are describing a heterogeneous population under one label.

## The research question

In a population-based inception cohort of adults with incident seronegative RA meeting the 1987 and/or 2010 classification criteria, what is the **10-year cumulative incidence** of:

1. **Change in diagnosis** (and to what?)
2. **Sustained drug-free remission**
3. **Initiation of a b/tsDMARD**

And are any baseline or time-varying characteristics predictive of these outcomes?

**A priori hypothesis:** a minority would experience each outcome.

## How the study was designed

**Setting — why this cohort matters.** The **Rochester Epidemiology Project** is a medical records-linkage system capturing records from **all healthcare providers throughout Olmsted County, Minnesota, since 1966**. This permits near-complete geographic ascertainment — the study is not a referral-clinic sample, which is precisely the design weakness of most prior work on this question.

**Population:**

- Adult Olmsted County residents with **incident RA meeting 1987 ACR and/or 2010 ACR/EULAR criteria between 1 Jan 2005 and 31 Dec 2014**
- **RF-negative AND ACPA-negative at the time of meeting criteria**, by standardised assays
- Observed until death, migration from the region, or **31 December 2023**
- The 2010 criteria were not routinely assessed in patients with incident RA before 2010

**Data collection — manual chart review**, not ICD-code extraction. This is a genuine methodological strength: administrative coding is notoriously poor for capturing *when* and *whether* a diagnosis changed.

**Outcome definitions — read these carefully, because they drive the numbers:**

| Outcome | Definition |
|---|---|
| **Change in diagnosis** | A **persistent** change in clinical diagnosis with **at least two further clinic visits carrying the same new diagnosis**, made by a rheumatologist |
| **Drug-free remission** | **≥6 months** off all RA treatment (DMARDs *and* glucocorticoids) with **no synovitis** on evaluation by a rheumatologist or treating physician |
| **b/tsDMARD initiation** | First use of a bDMARD (TNFi or non-TNFi) or JAK inhibitor |

Drug-free remission was **not** based on a Boolean definition or validated composite index, because patient and physician global assessments were not available for all individuals. This is a real limitation and the authors say so.

**Statistical approach — competing risks handled properly, which is the analytic core of the paper:**

- **Aalen-Johansen methods** for 10-year cumulative incidence.
- Change in diagnosis: adjusted for the **competing risk of death**.
- Drug-free remission and b/tsDMARD initiation: adjusted for the competing risks of **death or change in diagnosis**.
- **Cox models** adjusted for age, sex and calendar year of RA incidence for predictor analyses; some covariates modelled time-dependently.
- **Subgroup analysis** of 2010–2014 incident cases comparing those meeting only 1987 criteria versus those ever meeting 2010 criteria, using **multistate models**.
- SAS 9.4 and R 4.3.2. STROBE-compliant.

**Why the competing-risk handling matters.** If you naively estimate the probability of drug-free remission using Kaplan-Meier, you treat patients who die or get reclassified as though they remain at risk of remission — which they are not. In a cohort with mean age 56 and a decade of follow-up, this inflates estimates. The Aalen-Johansen approach gives the *actual* probability of experiencing the event in the presence of competing events, which is the number a clinician needs for counselling.

## The cohort

**n = 176 (Table 1):** mean age **56.3 (SD 16.6)**, **68% female**. Never-smokers 57%, former 31%, current 12%. Obesity (BMI ≥30) 39%. **Periarticular erosions within the first year: 14%.** Median CRP **7.4 mg/L (IQR 2.9–17.5)**. First-year exposure: **methotrexate 57%, hydroxychloroquine 56%**.

**Two figures establish that these were genuinely inflammatory patients, not a soft-diagnosis cohort:** **169 of 176 (96%) had swelling of at least three joints at RA incidence**, and **169 (96%) had two or more visits with documented swollen joint counts** between incidence and last follow-up.

**Median follow-up: 11.8 years.**

## Change in diagnosis — 13%, and it happens early

| Timepoint | Cumulative incidence | 95% CI |
|---|---|---|
| 1 year | **4.5%** | 2.3–9.0 |
| 5 years | **9.7%** | 6.2–15.3 |
| **10 years** | **12.8%** | **8.7–18.9** |

**Twenty-seven individuals changed diagnosis. New diagnoses:**

| Diagnosis | n |
|---|---|
| **Spondyloarthritis** | **11** |
| Osteoarthritis | 6 |
| Crystalline arthritis | 3 |
| Connective tissue disease | 3 |
| Infection-related arthropathy | 1 |
| Paraneoplastic arthropathy | 1 |
| RS3PE | 1 |
| Sarcoidosis | 1 |

10-year cumulative incidence of **spondyloarthritis specifically: 4.0% (95% CI 1.9–8.3)**.

**The temporal pattern is the clinically actionable finding.** Roughly **a third of all reclassifications occurred within the first year, and three-quarters within five years.** The diagnostic risk is front-loaded. A patient who has carried a seronegative RA label stably for five years is unlikely to be reclassified thereafter; a patient in the first year deserves an open mind.

**Seroconversion was rare:** only **6 individuals converted to seropositive RA — 10-year cumulative incidence 2%**. This is notably lower than the 6.2% reported over three years in ESPOIR, and argues against routine serial autoantibody testing in established seronegative disease.

**A quietly important detail running the other way:** **10 individuals (6%) had previously carried a diagnosis of polymyalgia rheumatica** before being reclassified *to* seronegative RA and entering this cohort. Diagnostic movement at the seronegative-inflammatory-arthritis boundary is **bidirectional**, and PMR is on both sides of it.

## Drug-free remission — a quarter, and durable

**53 individuals achieved drug-free remission; 49 did so before or without a change in diagnosis.**

**10-year cumulative incidence: 26.6% (95% CI 20.7–34.2)**, adjusted for competing risks of death and diagnosis change.

**Durability is the reassuring part:** **44 of 49 (90%) sustained remission for at least 12 months, with a median duration of 6.3 years.** This is not transient quiescence — it is meaningful, prolonged treatment-free disease control.

**Characterising the 49 who achieved it:**

- **48 (98%) had documented swelling of ≥3 joints at some point** — these were not marginal cases.
- **42 (86%) received a DMARD** and **30 (61%) received glucocorticoids** before remission.
- **7 (14%) used DMARDs and/or glucocorticoids for less than 12 months** — early responders achieving remission between 3 and 11 months.
- **3 (6%) used only NSAIDs or COX-2 inhibitors** and achieved symptom resolution — i.e. essentially spontaneous remission.

The authors explicitly reviewed the records of these last three and found **no alternative aetiology fully explanatory** of the inflammatory arthritis, so the seronegative RA label was retained. This is intellectually honest but also the point at which the reader should register some residual uncertainty: an inflammatory arthritis that resolves on NSAIDs alone sits uncomfortably close to the boundary of self-limiting undifferentiated arthritis, whatever criteria it met at baseline. Prior literature notes spontaneous remission is commoner in undifferentiated arthritis and occurs in **<10% of RA**.

## b/tsDMARD initiation — one in five

**42 individuals required a b/tsDMARD; 36 started before or without a change in diagnosis or remission.**

**10-year cumulative incidence: 19.9% (95% CI 14.7–26.9)**, competing-risk adjusted.

## The competing-outcomes picture — the most useful single paragraph for clinic

The 10-year cumulative incidence of the **first** of any outcome:

| Outcome | 10-year incidence |
|---|---|
| **Ongoing treatment, no b/tsDMARD** | **35.0%** |
| **Drug-free remission** | **26.2%** |
| **Ongoing treatment with b/tsDMARD** | **17.0%** |
| **Death** | **14.2%** |
| **Change in diagnosis** | **7.6%** |

This is the mutually exclusive partition, and it is the framing to use when counselling. Roughly: **one in four will come off all treatment; one in three will remain on csDMARDs alone; one in six will need a biologic; one in seven will die of something; one in thirteen turns out to have a different disease.**

Note the **14.2% mortality** over 10 years in a cohort with mean age 56 — a reminder that competing-risk adjustment is not a statistical nicety here but a substantive necessity.

## Predictors — essentially none

**Change in diagnosis:** the **only** statistically significant predictor was **age at baseline, HR 0.78 per 10-year increase (95% CI 0.61–0.99)** — older patients were *less* likely to be reclassified.

**Drug-free remission: no significant predictors at all.**

Non-significant across the board: sex, calendar year, smoking (current or ever), BMI, obesity, delay >1 year between first swelling and baseline, baseline ESR, baseline CRP, morning stiffness, swelling of three joints (fixed or time-dependent), rheumatoid nodule, erosions (baseline or time-dependent), and radiographic decalcification.

**Read the confidence intervals, not the P values.** Several point estimates are large but hopelessly imprecise: rheumatoid nodule HR **3.62 (0.80–16.32)**, swelling of 3 joints HR **1.75 (0.23–13.44)**, erosion before/at baseline HR **0.19 (0.03–1.46)**. With only 27 diagnosis-change events and 49 remission events across ~18 tested covariates, this analysis is **profoundly underpowered**. The correct conclusion is *"no predictors were identified"*, not *"no predictors exist"*. Even the significant age finding has an upper CI bound of 0.99 — it touches unity, and given the number of comparisons made without correction, it is fragile.

The age finding is nonetheless biologically interpretable in two opposing ways: older patients may genuinely have more stable disease, or clinicians may be less inclined to revisit the diagnosis in an elderly patient with an established label. The data cannot distinguish these.

## 1987 versus 2010 criteria — no difference

Of **90 individuals** meeting criteria between 2010 and 2014: **57 (63%)** fulfilled the 2010 criteria (with or without also meeting 1987), while **33 (37%)** met **only** the 1987 criteria.

| Outcome | Met 2010 criteria | Did not meet 2010 criteria |
|---|---|---|
| Change in diagnosis (10-yr) | **11.0%** (5.2–23.4) | **9.3%** (3.2–27.4) |
| Drug-free remission (10-yr) | **21.5%** (13.0–35.5) | **31.5%** (18.2–54.5) |

No evidence of difference in drug-free remission (age- and sex-adjusted **HR 0.83, 95% CI 0.36–1.88**).

This is worth pausing on. Fulfilling the 2010 criteria while seronegative requires **>10 involved joints** — a high inflammatory bar. One might reasonably expect this group to behave differently. They did not, at least not detectably in a sample of 90 with confidence intervals spanning 13% to 55%. The honest reading is that the study **cannot exclude a meaningful difference**; the intervals are far too wide.

## How this sits against prior work

| Study | Population | Reclassification | Drug-free remission |
|---|---|---|---|
| **This study** | Population-based, criteria-defined seronegative RA | **12.8% at 10 yr** | **26.6% at 10 yr** (6-month definition) |
| Finland (Paalanen) | Seronegative **inflammatory arthritis**, not criteria-defined RA | **>90%** reclassified; PMR 16%, PsA 10%, SpA 3.4%, unclassified 32% | — |
| Karolinska | **Clinically diagnosed** seronegative RA, non-erosive, ≥2 yr follow-up | **~33%**; cancer-associated arthritis 7.4%, crystalline 6.6%, PMR 6.5%, SpA 4.4% | — |
| Finland nationwide | Clinical diagnosis | **6.2%** to spondyloarthritis by year 10 | — |
| ESPOIR | Early RA, 47.6% ACPA-positive | 8.6% over 3 yr; +6.2% seroconverted | 14.1% |
| Leiden EAC | Seronegative RA, 1987 criteria | — | **~40% at 10 yr** (12-month definition) |

**The apparent contradictions dissolve once you attend to entry criteria — and this is the key methodological lesson of the paper.** The Finnish >90% figure comes from *seronegative inflammatory arthritis*, a far broader and less specific population than criteria-defined RA. The Karolinska one-third comes from *clinically diagnosed* seronegative RA with erosive patients excluded — deliberately enriching for diagnostic ambiguity. This study's 12.8% comes from patients who met formal classification criteria and 96% of whom had ≥3 swollen joints. **The stricter your entry, the more stable your diagnosis.** These studies are not in conflict; they are describing different populations.

The Leiden 40% versus this study's 26.6% for drug-free remission also has explanations the authors offer: Leiden used a **12-month** remission definition versus **6 months** here (which should push Leiden's estimate *down*, not up), and had **lower bDMARD use (11.8% vs 19.3%)** — differences the authors attribute to healthcare-system variation in access to rheumatologists and biologics. Higher biologic use might plausibly reduce documented drug-free remission if patients are maintained on effective therapy rather than tapered.

**On CPPD** — reported in **3.9–18.9%** of seronegative RA cohorts, rising with age, and with chondrocalcinosis roughly **twice as prevalent in seronegative as seropositive RA (32.3% vs 16.6%)**. Only 3 crystalline arthritis reclassifications occurred here, notably fewer than some European series.

**On the "seronegative" label itself** — the review section raises a genuinely destabilising point: **55% of seronegative RA patients in a Belgian early arthritis cohort were positive for an anti-carbamylated protein antibody**. But **13.6% of healthy controls** also had at least one such antibody, so specificity is a live concern. Whether novel autoantibodies redefine this population or merely add noise remains unresolved.

## Study limitations

**Acknowledged by the authors:**

1. **Retrospective and observational with no protocolised DMARD tapering.** Not all patients in prolonged clinical remission were trialled off DMARDs — so the **26.6% figure is likely an underestimate** of achievable drug-free remission. This is arguably the most important caveat, and it cuts in a helpful direction.
2. **Loss to follow-up biases against detecting remission**, since patients doing well are least likely to return.
3. **Follow-up was limited** (median 11.8 years); outcomes almost certainly continue to accrue beyond this window.
4. **Drug-free remission was not Boolean or index-based** — it relied on clinical assessment of synovitis, in rare instances by a non-rheumatologist. Mitigated by the fact that 96% had ≥2 visits with documented joint counts.
5. **Generalisability is uncertain.** Access to rheumatology care and to biologics varies substantially between systems, and every outcome here is access-sensitive.
6. **Other autoantibodies (anti-CarP, anti-modified protein antibodies) were not assessed.**

**A limitation the authors reframe as a strength — worth examining critically.** Diagnosis change was defined by rheumatologist clinical judgement rather than fulfilment of alternative classification criteria. The authors argue this offers appropriate flexibility, allows for clinically meaningful reclassification where full criteria data are unavailable, and accommodates situations where two processes coexist (e.g. gout plus seronegative RA). They note it **may artificially increase** their reclassification rate relative to criteria-based studies. That framing is defensible, but the flip side deserves stating: clinical-judgement endpoints are unblinded and non-reproducible, and the same chart reviewed at a different institution might yield a different count.

**Additional considerations:**

7. **Small event counts for predictor analysis.** 27 diagnosis changes and 49 remissions against ~18 covariates, with no multiplicity correction. The null findings are uninformative rather than reassuring.
8. **Olmsted County is demographically narrow** — predominantly White, with unusually good and unusually well-documented healthcare access. Race and ethnicity are not reported in Table 1, which limits assessment of applicability to other populations, including South Asian cohorts.
9. **Calendar-period effects.** Incidence spans 2005–2014; treat-to-target adoption, biologic availability and tapering practice all evolved substantially across and after this window. A cohort accruing today might behave differently.
10. **The three NSAID-only remitters and, more broadly, the patients who remitted quickly** sit at the definitional boundary between RA and self-limiting undifferentiated arthritis. The authors handled this transparently, but it is a residual source of misclassification in the *opposite* direction from the reclassification outcome.
11. **Small absolute numbers behind headline sub-figures.** Spondyloarthritis reclassification rests on 11 patients; the 4.0% cumulative incidence carries a CI of 1.9–8.3%.

**Strengths deserve equal weight:** near-complete population ascertainment in a defined geography; **manual chart review** rather than ICD codes, permitting accurate timing of diagnosis change; uniform criteria-based entry; long follow-up; and — genuinely uncommon in this literature — **correct competing-risk methodology**.

## How this study adds to practice

**It converts an unusable range into a usable number.** Prior estimates of misdiagnosis in seronegative RA spanned 4% to >90%. This study provides a defensible figure for the population most rheumatologists actually mean when they say "seronegative RA" — criteria-fulfilling, polyarticular, inflammatory — of **roughly 13% over a decade**. That is a number you can say out loud to a patient.

**Concrete implications for clinic:**

1. **Counsel with the competing-outcomes table, not with vague reassurance.** At ten years: ~26% off all treatment, ~35% on csDMARDs alone, ~17% on a biologic, ~13% reclassified. Patients newly given a seronegative RA label frequently ask "will I be on drugs forever?" The answer, honestly, is that **about a quarter will not be**.
2. **Keep the diagnostic question open for the first five years, then let it close.** Reclassification risk is concentrated early — 4.5% at one year, 9.7% by five, only 3 further percentage points over the next five.
3. **Look hardest for spondyloarthritis.** It was the single commonest alternative (11 of 27 reclassifications). Practically: ask about inflammatory back pain, enthesitis, dactylitis, psoriasis, uveitis, IBD and family history at diagnosis and at review — the features that separate SpA from seronegative RA are historical and examinable, not serological.
4. **Do not repeat autoantibodies routinely.** Only 2% seroconverted over 10 years.
5. **Consider a taper conversation earlier than instinct suggests.** Given a 26.6% drug-free remission rate that the authors believe is an *underestimate* because tapering was not protocolised, and a median remission duration of 6.3 years once achieved, sustained DMARD-free remission is a legitimate discussion point in seronegative disease in a way it is not in ACPA-positive RA.
6. **Do not use baseline features to predict trajectory.** Nothing predicted drug-free remission. Erosions, CRP, ESR, nodules, joint counts and smoking were all uninformative. Resist the temptation to prognosticate from the first visit.
7. **Remember the PMR boundary is two-way.** Six percent of this cohort arrived *from* a PMR diagnosis, and PMR was the commonest reclassification in the Finnish seronegative-arthritis series (16%). The older patient with proximal symptoms and peripheral synovitis genuinely sits between two labels.

**For research design:** the study supplies the event rates needed to power future observational and interventional work in seronegative RA — and demonstrates that **entry criteria are the dominant determinant of reported reclassification rates**, which should be a standing consideration when comparing studies in this field.

## Final takeaways

1. **~13% of patients with criteria-defined seronegative RA are reclassified within 10 years** (12.8%, 95% CI 8.7–18.9), with risk **front-loaded**: 4.5% at one year, 9.7% at five.
2. **Spondyloarthritis is the commonest alternative diagnosis** (11 of 27 changes; 4.0% cumulative incidence), followed by osteoarthritis, crystalline arthritis and connective tissue disease.
3. **Seroconversion to seropositive RA is rare — 2% over 10 years.** Routine repeat serology is not supported.
4. **Sustained drug-free remission is achieved by roughly a quarter (26.6%)**, and it is durable: 90% sustained ≥12 months, **median duration 6.3 years**. The true figure is probably higher, since tapering was not protocolised.
5. **About one in five (19.9%) require a b/tsDMARD** within 10 years.
6. **The mutually exclusive 10-year partition:** ongoing csDMARD treatment 35.0%, drug-free remission 26.2%, treatment with b/tsDMARD 17.0%, death 14.2%, change in diagnosis 7.6%.
7. **Nothing predicts trajectory.** Only age predicted reclassification (HR 0.78 per decade, CI 0.61–0.99, touching unity); **no baseline or time-varying feature predicted drug-free remission** — though the analysis is markedly underpowered, so "no predictor found" is not "no predictor exists".
8. **1987-only versus 2010 criteria fulfilment made no detectable difference** to either outcome, though confidence intervals were wide enough to hide a substantial effect.
9. **The apparent conflict with prior literature is a design artefact.** Reclassification rates track directly with how loosely the cohort was defined: >90% for seronegative *inflammatory arthritis*, ~33% for *clinically diagnosed* non-erosive seronegative RA, 13% for *criteria-fulfilling* seronegative RA.
10. **The seronegative label itself may be provisional in a deeper sense** — 55% of seronegative RA patients in one cohort carried anti-carbamylated protein antibodies, though 13.6% of healthy controls did too.

{{< source >}}
