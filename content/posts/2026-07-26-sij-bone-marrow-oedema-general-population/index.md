---
title: "Sacroiliac Bone Marrow Oedema in the General Population"
date: 2026-07-26T05:00:00+05:30
draft: false
slug: "sij-bone-marrow-oedema-general-population"
author: "Dr. Sree Hari Reddy MD"
tags: ["axial-spondyloarthritis", "imaging", "diagnosis", "sacroiliitis", "artificial-intelligence"]
categories: ["research"]
summary: "A population-based MRI study of 11,163 German adults found sacroiliac joint bone marrow oedema in about one in three people — roughly 50 times the prevalence of axial spondyloarthritis. The signal tracked with BMI, occupational loading, age and, in women, pregnancy, while chronic back pain barely moved the rate, providing the missing denominator for interpreting a positive SIJ MRI."
cover:
  image: "infographic.png"
  alt: "Prevalence and determinants of sacroiliac joint bone marrow oedema in the general population"
  hidden: false
source:
  authors: "Bressem K, Torgutalp M, et al. (Zhukov A, Poddubnyy D, joint last authors)"
  title: "Prevalence and determinants of sacroiliac joint bone marrow oedema in the general population in Germany: a population-based cross-sectional study"
  journal: "The Lancet Rheumatology"
  year: "2026"
  doi: "10.1016/S2665-9913(26)00071-8"
  url: ""
---

> **TL;DR:** Sacroiliac bone marrow oedema is present in roughly **one in three ordinary adults** — about 50 times the prevalence of axSpA — and tracks with BMI, occupational loading, age and (in women) pregnancy rather than with back pain, so a positive SIJ MRI has low positive predictive value on its own and must be read alongside lesion morphology, distribution and pretest probability.

## The Clinical Problem

Bone marrow oedema (BMO) in the sacroiliac joints (SIJ) is the linchpin imaging finding for diagnosing axial spondyloarthritis (axSpA). Under the ASAS classification criteria, MRI-detected SIJ BMO — if judged highly suggestive of axSpA — combined with at least one additional axSpA feature satisfies the imaging arm of the criteria, even without radiographic sacroiliitis. Because MRI can flag active inflammation years before structural damage appears on plain films, this pathway has become a major route to early diagnosis and early initiation of expensive, potentially risky advanced therapy.

**The problem: BMO is not specific.** Prior small studies had already shown it in recreational runners (~41% meeting ASAS MRI criteria) and postpartum women (up to ~57%), hinting that mechanical loading and hormonal change can generate signal indistinguishable from inflammation. But those studies were small (<200), used selected populations, and heterogeneous protocols. What was genuinely missing was a **background rate** — how common is SIJ BMO in an unselected general population? Without that denominator, a positive MRI cannot be properly interpreted, and **overdiagnosis is a real risk**.

## The Research Question

What is the prevalence of sacroiliac BMO in the general adult population (age 20–69), and which demographic, lifestyle and reproductive factors are independently associated with its presence and volume?

## How the Study Was Designed

**Source and sampling**

- Data drawn from the **German National Cohort (NAKO)**, a prospective cohort of 205,415 adults recruited from population registries with age- and sex-stratified sampling. This is a **general population sample**, not a back-pain or rheumatology clinic sample.
- MRI substudy: whole-body **3-Tesla MRI** (identical scanners, harmonised protocol) between May 2014 and Dec 2016.
- Starting point: 11,398 participants with complete MRI data → after exclusions for image quality/missing data → **998 expert-read and 10,165 AI-analysed** (final analytic sample 11,163).

**A dual-track (hybrid) design — the methodological signature of the paper**

1. **Expert reading (reference standard):** ~1,000 participants randomly selected. Three experienced readers (>10 years each), masked to all clinical data, applied **ASAS–OMERACT definitions** after a calibration session. BMO = hyperintense signal on fat-suppressed proton density in subchondral SIJ bone. A case was called positive if **≥2 of 3 readers agreed**. Consensus-positive cases underwent pixelwise volumetric annotation.
2. **Deep-learning (AI) analysis (scale):** The remaining ~10,000 participants were assessed by a validated AI pipeline (two models for pelvic anatomical segmentation + one for BMO segmentation/quantification), trained on the expert-read cases and internally validated by five-fold cross-validation. To convert continuous volume into a binary "present/absent," a **volume threshold of 0.91 cm³** was calibrated to reproduce the expert-derived prevalence.

**Sequences:** 3D fat-suppressed proton density (1.0 mm isotropic) for oedema; T1 VIBE two-point Dixon for anatomical context. **Outcomes:** primary = BMO presence (binary); secondary = BMO volume (cm³, continuous).

**Statistics**

- Logistic regression for presence (odds ratios), linear regression for volume (standardised β).
- A deliberate **causal-inference choice**: rather than throwing all covariates into one model, they used **prespecified adjustment sets** to control confounding while avoiding adjustment for mediators on the same causal pathway (e.g., BMI models adjusted for age, sex, SES; occupational activity models adjusted for age, sex, BMI, intensive activity).
- Sex-stratified analyses throughout, plus formal **sex × predictor interaction** terms as sensitivity analyses.
- Age scaled per 10-year increment; complete-case analysis (no imputation); multicollinearity checked by VIF.

## The Results

**The headline number**

- SIJ BMO was present in **28.9%** (95% CI 26.2–31.9) of the 998 expert-read participants and **30.8%** (29.9–31.7) of the 10,165 AI-analysed participants — concordant, and both **~30%**.
- This is roughly **50 times the self-reported axSpA prevalence** in the cohort (0.6%), which itself matches German epidemiological data for ankylosing spondylitis (~0.5%). **BMO was present in about one in three adults.**
- Expert-read and AI-analysed groups had near-identical mean oedema volume (0.9 cm³ each; p=0.26) and did not differ on baseline characteristics — supporting representativeness. BMO was **unilateral in about half** of cases, with a slight rightward predominance.

**Who has it — independent associations (overall cohort, multivariable ORs)**

- **Elevated BMI** (≥25 vs <25 kg/m²) — the strongest modifiable factor: **OR 1.62** (1.47–1.79). Stratified: BMO in 34.5% of overweight vs 24.4% of normal-weight participants.
- **Female sex:** OR 1.33 (1.23–1.45) by AI; 1.43 (1.09–1.89) expert-read.
- **Age:** OR ~1.21–1.28 per decade.
- **Physically demanding occupation:** OR 1.25 (1.14–1.36) overall.
- **Intensive recreational activity:** no association overall (OR 1.06, NS) — but this masks a sex difference (below).

**The sex-specific story — the most clinically interesting part**

- **Women:** pregnancy history was associated with BMO (**OR 1.43**, 1.21–1.70), and **recent pregnancy** (within the last 12 months) carried a much stronger effect: **OR 2.90** (1.67–5.06). Strikingly, **age had minimal effect in women**. Mean oedema volume peaked in the first year after delivery (1.42 cm³) and settled thereafter.
- **Men:** the drivers were **age** (OR 1.28–1.35 per decade) and **physical loading** — both occupational (OR 1.34) and intensive recreational activity (OR 1.24), the latter non-significant in women.
- Formal interaction testing confirmed significant **sex × predictor interactions for age, BMI and intensive activity**.
- Prevalence rose with age from **20.6%** (ages 20–30) to **38.9%** (≥70). Women had higher prevalence than men (33.9% vs 27.8%).

**Chronic back pain barely moved the needle**

- BMO in **34.1%** with chronic back pain vs **30.1%** without — a small difference, reinforcing that BMO is largely **not a pain/inflammation marker** in this population.

**AI performance (validation)**

- Segmentation: mean **Dice similarity coefficient 0.79** vs expert annotation; 95th-percentile Hausdorff distance 31.7 mm; consistent across folds.
- Lesion detection: 894 true positives, 78 false negatives, 209 false positives; aggregated **F1 0.81** (0.86 with noise reduction).
- Crucially, the AI **reproduced both the overall associations and the sex-specific patterns** found by human readers — validating automated assessment at population scale.

## Study Limitations

1. **Cross-sectional design.** Cannot say whether BMO persists, resolves, or predicts future axSpA — no longitudinal follow-up.
2. **No HLA-B27 and no detailed symptom data.** axSpA status could not be definitively confirmed or excluded. This cuts both ways: some BMO cases could be subclinical/undiagnosed axSpA (especially women, who face longer diagnostic delays), while most are presumably non-inflammatory.
3. **No lesion localisation or structural-lesion assessment.** The study measured presence and volume but not *where* in the joint (ventral vs middle) or accompanying erosions/sclerosis — precisely the features that discriminate inflammatory from mechanical BMO.
4. **AI imperfect concordance** (Dice 0.79) introduces potential misclassification, though expert/AI concordance suggests minimal effect on conclusions. External validation in other populations is still needed.
5. **No pregnancy-timing data relative to scan** — cannot fully exclude that some women were imaged in the immediate postpartum window; however, given mean age ~52, most parous women were years post-delivery, arguing for a long-term rather than transient effect.
6. **No radiographs** — osteitis condensans ilii (which mimics BMO, favours multiparous women, and localises anteriorly) could not be formally identified, though its epidemiology fits the observed pregnancy signal.
7. Ethnicity data unavailable; self-reported sex and axSpA status.

## How This Study Adds to Practice

- It provides, for the first time, a **population reference denominator**: SIJ BMO is a background finding in ~30% of ordinary adults. Isolated BMO therefore has **low positive predictive value** for axSpA. Prior estimates (11–17%) were underestimates driven by selected subgroups.
- It shows that the **specificity of the ASAS MRI definition depends heavily on the control group used**. The original ASAS validation set showed only 2.6% BMO in chronic back pain controls; against a 30% general-population background, applying purely quantitative criteria without clinical context risks **overdiagnosis and inappropriate biologic initiation**.
- It reframes BMO as behaving in the SIJ the same way it does elsewhere in the skeleton — a **non-specific response to mechanical stress, degeneration and metabolic factors** (analogous to knee OA lesions, athletic stress reactions, transient osteoporosis of the hip).
- It strengthens the case for **morphology- and context-based interpretation** over presence/absence: lesion depth (>5–10 mm), extension into the posterior ligamentous portion and middle-joint (vs ventral) localisation favour inflammation, while pretest probability and demographics should modulate interpretation. It cites the Pastor sex-specific algorithm that lifted specificity to **95%** (vs 88% for standard ASAS) in women.
- It validates **deep learning as a scalable, reliable tool** for BMO quantification across whole populations.

## Final Take-Aways

1. **SIJ bone marrow oedema is normal-ish.** About one in three adults in the general population has it — roughly 50× the prevalence of axSpA. **Presence alone means little.**
2. **Mechanics and physiology, not inflammation, dominate.** The signal tracks with BMI, occupational loading, ageing, and — in women — pregnancy, particularly the recent postpartum period (OR ~2.9). Chronic back pain barely changes the rate.
3. **Sex matters, and differently.** In men, think **age and physical loading** (occupational and recreational). In women, think **pregnancy history and BMI**, with age contributing little. This should shape how a rheumatologist weighs a positive SIJ MRI.
4. **Interpret BMO in context, not in isolation.** Volume, depth, distribution, joint localisation and accompanying structural lesions — combined with pretest probability — separate pathological from physiological findings. This supports evolving ASAS discussions about requiring structural lesions and lesion morphology rather than BMO alone.
5. **The double-edged clinical message:** the data warn primarily against **overdiagnosis** (calling mechanical BMO "sacroiliitis"), but also flag **underdiagnosis in women** whose true inflammatory disease may be dismissed as pregnancy-related change.
6. **AI is ready for population-scale BMO assessment** — a validated deep-learning pipeline reproduced expert findings, including the nuanced sex-specific associations.

{{< source >}}
