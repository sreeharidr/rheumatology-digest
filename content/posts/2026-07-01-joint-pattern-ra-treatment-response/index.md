---
title: "Joint Involvement Pattern Predicts Treatment Response in Early RA"
date: 2026-07-01T05:00:00+05:30
draft: false
slug: "joint-pattern-ra-treatment-response"
author: "Dr. Sree Hari Reddy MD"
tags: ["rheumatoid-arthritis", "treatment", "prognosis", "acpa", "methotrexate"]
categories: ["research"]
summary: "A combined individual-patient-data analysis of the NORD-STAR and BeSt trials shows that where early RA is distributed carries prognostic signal: hand-dominant disease (JIP-Hand) predicts better treatment response and polyarthritis (JIP-Poly) worse — independent of sex and serology, and equally across csDMARDs and bDMARDs, with ACPA/RF showing no association with short-term activity response."
cover:
  image: "infographic.png"
  alt: "Joint involvement pattern and treatment response in early rheumatoid arthritis"
  hidden: false
source:
  authors: "Nagafuchi Y, Maarseveen TD, Lend K, et al. (Knevel R, senior author; NORD-STAR and BeSt networks)"
  title: "Hand-dominant joint involvement pattern associates with favourable, and polyarthritis with unfavourable, treatment response to both csDMARDs and bDMARDs in early rheumatoid arthritis: a combined analysis of NORD-STAR and BeSt trials"
  journal: "Annals of the Rheumatic Diseases"
  year: "2026"
  doi: "10.1016/j.ard.2026.02.005"
  url: ""
---

> **TL;DR:** In early RA, *where* the arthritis is distributed predicts treatment response — hand-dominant disease (JIP-Hand) does better and polyarthritis (JIP-Poly) worse, independent of sex and serology and equally across csDMARDs and bDMARDs — while ACPA/RF (damage markers) show no association with short-term disease-activity response and female sex outperforms them as a predictor.

## The Clinical Problem

Rheumatoid arthritis is **heterogeneous** — in phenotype and, more frustratingly, in **treatment response**. Clinicians want to know at baseline who will do well on standard therapy and who will not, but the tools available are weak:

- **ACPA and RF** predict long-term **radiographic damage**, but are only **weakly** (if at all) predictive of **short-term disease-activity response** to treatment.
- Worse, ACPA, RF, and high disease activity are all baked into the **2010 ACR/EULAR classification criteria**, so **most** early RA patients carry at least one "poor-prognostic" marker — which makes them useless for **separating** patients.

So there is a real need for a **novel, routinely available** predictor of treatment response.

The authors' prior work used **deep learning + clustering** on baseline joint distribution (66/68 joint scheme) to derive **four reproducible "joint involvement pattern" (JIP) subgroups**: **JIP-Foot, JIP-Oligo, JIP-Hand, JIP-Poly**. In their original cohort, JIP-Hand had better MTX retention and remission. This study asks whether that signal holds up in independent trial data.

## The Research Question

In treatment-naïve early RA, do the four JIP subgroups predict **disease-activity response** to treatment — and does the effect differ between **csDMARDs and bDMARDs**? Secondarily, how does JIP compare against **conventional predictors** (age, sex, RF, ACPA, symptom duration)?

## How the Study Was Designed

**Design:** One-stage **IPD meta-analysis** pooling two RCTs of treatment-naïve early RA — **NORD-STAR** (n=812, Nordic + Netherlands, 2010 criteria) and **BeSt** (n=508, Netherlands, older 1987-criteria trial). Combined **1250 patients**.

**The two trials differ usefully:**

- **NORD-STAR:** all arms MTX-based; arm 1 active conventional (± prednisolone or SSZ+HCQ), arm 2 certolizumab, arm 3 abatacept, arm 4 tocilizumab.
- **BeSt:** four **treat-to-target** strategies (sequential mono, step-up combo, initial combo + prednisone, initial infliximab + MTX), titrated to DAS44 ≤2.4.

**JIP assignment:** Patients were **projected into the pre-existing four-cluster model** (using the POODLE tool) from baseline clinical variables — age, sex, RF, ACPA, joint location (66/68 swollen + tender), ESR/CRP. Successfully classified **804/812 (99%)** of NORD-STAR and **446/508 (88%)** of BeSt.

**Outcome — a deliberate methodological choice:** Primary outcome was **CDAI through week 48**. CDAI was chosen specifically **because it excludes acute-phase reactants** (ESR/CRP) — which matters because **tocilizumab artificially suppresses CRP/ESR**, which would distort any index that includes them. Secondary: DAS28-CRP, HAQ, CDAI remission, CDAI50 (≥50% improvement), and (in BeSt) DAS44 and MTX-monotherapy retention.

**Statistics:** Mixed-effects models with each JIP subgroup tested **against the other three combined**, adjusted for **baseline CDAI, time**, and random effects for **patient and treatment arm/strategy**. Effects were then re-tested after adding age, sex, RF, ACPA, and symptom duration as covariates. A prespecified **JIP × biologic-treatment interaction** term tested whether csDMARDs vs bDMARDs behaved differently across subgroups.

**The four subgroups (baseline profile):**

- **JIP-Foot:** younger, foot small-joint dominant.
- **JIP-Oligo:** few involved joints, lowest activity.
- **JIP-Hand:** **older**, hand-dominant (note: hand-only polyarthritis was classified here), **lower** CDAI than Poly.
- **JIP-Poly:** **highest disease activity** — widespread hand + foot + large joints (median CDAI 38, TJC 28, SJC 17).

**Notable serology gradient across groups:** ACPA positivity fell from **83–84%** (Foot/Oligo) to **66–68%** (Hand/Poly) — i.e., the hand and poly groups were **less** seropositive, not more.

## The Results

**Primary outcome (CDAI):**

- **JIP-Hand → better response:** Beta **−1.4** (95% CI −2.3 to −0.55; **p=0.0016**) — i.e., ~1.4 CDAI points **lower** (better) than the other three groups, averaged across time.
- **JIP-Poly → worse response:** Beta **+0.95** (95% CI 0.064–1.8; p=0.035).
- JIP-Foot and JIP-Oligo: no significant effect.
- Model fit was good (conditional R² ≈ 0.66–0.67).
- The JIP-Hand effect was **directionally consistent in both trials**, numerically larger in **BeSt** (−1.7) than NORD-STAR (−1.2) — plausibly because BeSt's **less aggressive** older regimens let subgroup differences show through more.

**Secondary outcomes reinforced JIP-Hand:**

- Better **DAS28-CRP** (Beta −0.18, p=0.0028).
- Higher odds of **CDAI remission** (OR **1.7**, 1.2–2.4).
- Higher odds of **CDAI50** (OR **1.6**, 1.1–2.2).
- **No difference in HAQ** (function) — Beta ≈ 0, p=0.86.
- CDAI- and DAS44-based analyses correlated tightly (r=0.95), arguing the effect is **not just an artefact** of 28-joint indices ignoring the feet.

**JIP vs conventional predictors — the striking comparison:**

- **Female sex** was the strongest conventional predictor of **worse** CDAI (Beta **+1.2**, p=0.0031).
- **ACPA had NO significant effect** on disease-activity response (Beta 0.19, p=0.67) — nor did RF.
- **JIP-Hand remained independently protective** even after adjusting for age, sex, RF, ACPA, and symptom duration (Beta −1.3, p=0.0039); JIP-Poly remained independently unfavourable. So the JIP effect is **not** just re-expressing sex or serology.

**csDMARD vs bDMARD — no heterogeneity:**

- The **JIP × biologic interaction was non-significant** for every subgroup (Hand p=0.58, Poly p=0.94, etc.).
- Translation: **csDMARDs and bDMARDs were similarly effective (or ineffective) within each JIP subgroup**. Adding a biologic did **not** selectively rescue the poor-prognosis Poly group.

**MTX-monotherapy retention (BeSt treat-to-target):**

- **JIP-Hand** trended toward higher retention on MTX monotherapy at week 24 (OR **1.5**, 0.95–2.4, p=0.08) — consistent with the idea that hand-pattern patients respond adequately to **standard MTX** and need less escalation.

**Clinical-relevance framing:** Using published CDAI MCID thresholds (low-activity MCID = 1), the ~1.4-point JIP-Hand advantage **clears the bar** for low-disease-activity patients — modest but real. Overall, 77% (NORD-STAR) and 53% (BeSt) reached low activity/remission during follow-up.

## Study Limitations

1. **Post hoc, non-randomised by JIP.** Treatment wasn't randomised **within** JIP subgroups (though randomisation was roughly balanced across them).
2. **Modest effect sizes.** A 1.4-CDAI-point average difference is small; the authors repeatedly caution against over-reading it. This is **risk refinement, not a treatment-selection rule**.
3. **Partial circularity risk.** JIP is derived from joint counts, and CDAI **contains** joint counts — so despite baseline-CDAI adjustment, **residual confounding can't be fully excluded**. (They mitigate this with DAS44 replication.)
4. **Requires baseline joint mapping** — limits point-of-care applicability, and subgroups sit on a **continuum**, so border cases get forced into one label.
5. **Underpowered for drug-specific effects.** Only csDMARD-vs-bDMARD (lumped) was tested; specific-agent × JIP interactions may have been missed.
6. **ACPA analysed as positive/negative only** (no titres); **foot exams are noisier** than hand exams, which may attenuate subgroup contrasts.
7. **Mechanism unknown** — why hand-pattern does better and poly worse is unexplained (a **synovial pathotype** hypothesis is raised but untested here).

## How This Study Adds to Practice

- Provides **independent, cross-trial replication** that a **simple, routinely obtainable** feature — **where the arthritis is distributed** — carries prognostic signal comparable to or larger than classical predictors.
- Delivers a **provocative reframing**: for **short-term disease-activity response**, **joint distribution and sex outperform ACPA/RF**, which are really **radiographic-damage** markers, not **activity-response** markers. A useful teaching correction to the reflex "seropositive = worse everything."
- Suggests **JIP-Poly patients are under-served by current strategies** — and, importantly, that **simply adding a biologic upfront does not preferentially fix them** — flagging them as a target for future **stratified trial** designs.
- Positions JIP as an **adjunct** to existing prognostic factors for **risk stratification and monitoring intensity**, explicitly **not** (yet) a reason to change first-line therapy.

## Final Takeaways

1. In early RA, **hand-dominant disease (JIP-Hand) predicts better** treatment response (CDAI −1.4; remission OR 1.7; CDAI50 OR 1.6), while **polyarthritis (JIP-Poly) predicts worse** — **independent** of baseline activity, sex, and serology.
2. The effect held **across csDMARDs and bDMARDs** with **no interaction** — early biologics did **not** selectively benefit any subgroup, including the poor-prognosis one.
3. **Sex beat serology:** **female sex** was the strongest conventional predictor of higher disease activity; **ACPA and RF showed no significant association** with disease-activity response — a key conceptual point (they predict **damage**, not short-term **activity**).
4. **JIP-Hand patients** were more likely to **stay on MTX monotherapy** — clinically, the group most likely to do well on standard first-line treatment.
5. **Effects are modest and hypothesis-generating.** JIP subgrouping is a **risk-stratification adjunct pending prospective validation**, not a treatment-selection tool — and the **biology behind the patterns remains unexplained** (possibly distinct synovial pathotypes).

{{< source >}}
