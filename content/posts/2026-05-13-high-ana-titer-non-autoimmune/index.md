---
title: "Clinical conditions associated with a high ANA titer in non-autoimmune individuals"
date: 2026-05-13T10:00:00+05:30
draft: false
slug: "high-ana-titer-non-autoimmune"
author: "Dr. Sree Hari Reddy MD"
tags: ["general", "diagnosis", "ana", "liver-disease", "nafld"]
categories: ["research"]
summary: "In a 28,781-patient EMR phenome-wide study, a high ANA titer (≥1:640) without autoimmune disease was strongly enriched for non-AI liver disease (NAFLD/NASH, alcohol-related) and metabolic comorbidity — broadening the differential for an unexplained high-titer ANA beyond the usual autoimmune workup."
cover:
  image: "infographic.png"
  alt: "High ANA titer in non-autoimmune individuals — infographic"
  hidden: false
source:
  authors: "Chung M, Shelley JP, Karakoc G, et al."
  title: "Clinical Conditions Associated With a High ANA Titer in Individuals Without Autoimmune Disease"
  journal: "Arthritis Care & Research"
  year: 2026
  doi: "10.1002/acr.25682"
  url: ""
---

*Chung M, Shelley JP, Karakoc G, et al. Arthritis Care & Research. 2026;78(5):662–669.*

> **TL;DR:** In a 28,781-patient EMR phenome-wide study, a high ANA titer (≥1:640) without autoimmune disease was strongly enriched for non-AI liver disease (NAFLD/NASH, alcohol-related) and metabolic comorbidity — broadening the differential for an unexplained high-titer ANA beyond the usual autoimmune workup.

## The Clinical Problem

The antinuclear antibody (ANA) is one of the most frequently ordered rheumatologic tests, yet its interpretation outside the autoimmune (AI) context remains a perennial source of clinical anxiety. While a positive ANA is near-mandatory for SLE (>95% positivity) and is integral to the 2019 EULAR/ACR criteria (which require a titer ≥1:80), high titer ANAs (≥1:640) are found in approximately **2% of the general population** — many of whom never develop a classifiable autoimmune disease.

Several questions plague the bedside rheumatologist:

- Does a high ANA titer in a non-AI patient indicate occult immune dysregulation?
- Should such patients be followed indefinitely, reassured, or worked up further?
- Earlier follow-up studies have shown that even at 10 years, only ~6% (2/34) of high-titer ANA individuals without AI disease at baseline went on to develop one — meaning the **majority of high titers remain "unexplained."**

Prior literature has linked positive ANAs to cardiovascular events, cancer, infections, and all-cause mortality, but results have been inconsistent. The clinical meaning of a *high* titer (not just any positive) in a *non-autoimmune* individual has remained essentially uncharted territory.

## The Research Question

> *Do individuals without autoimmune disease who carry a high ANA titer (≥1:640) show a measurably different burden of clinical diagnoses compared to those with low-titer or negative ANA results?*

The authors hypothesized that high titers might reflect immune dysregulation that manifests phenotypically as increased risk for specific (non-AI) conditions — and used a **phenome-wide association study (PheWAS)** approach to let the data speak without an a priori bias toward any organ system.

## How the Study Was Designed

**Setting & Design:** Retrospective case-control study using Vanderbilt University Medical Center's (VUMC) de-identified EMR system (Synthetic Derivative/BioVU).

**Eligibility:**

1. Adults (≥18 years) with at least one clinician-ordered ANA test between January 2000 and October 2022.
2. ANA performed exclusively by **indirect immunofluorescence on HEp-2 cells** (per ACR Task Force protocols), using Immuno Concepts or Inova Diagnostics assays.
3. Highest titer was selected if multiple ANAs existed.
4. **Exclusion:** any documented ANA-related AI disorder (SLE, Sjögren, SSc, MCTD, AI hepatitis, PBC, idiopathic inflammatory myopathies, etc.) — at *any* time point in the EMR, not just before testing.

**Group Allocation:** Three mutually exclusive cohorts —

- **High titer (HT):** ANA ≥ 1:640
- **Low titer (LT):** ANA ≤ 1:80
- **Negative (NG):** Only negative ANA results
- *Intermediate titers (1:80 < titer < 1:640) were deliberately excluded* to sharpen the contrast.

**Phenotyping Approach (the technical heart of the study):**

- ICD-9 and ICD-10 codes were mapped to **Phecodes** (v1.2) — these aggregate related ICD codes into clinically meaningful disease entities.
- **Cases** = ≥2 occurrences of a Phecode in the EMR; **Controls** = absence of that Phecode *or* any closely related Phecode.
- Only diagnoses **first recorded within ±90 days** of the ANA test were counted — a clever design choice meant to reduce contamination by long-standing prevalent disease.
- Phecodes with <100 cases were dropped to preserve statistical power.
- Adjustments: age at ANA testing, sex, median BMI (15–60 kg/m² range), and reported race.
- **Significance threshold:** P < 5 × 10⁻⁵ (a Bonferroni-style correction for the large number of Phecodes tested).

**Case Validation:** For the 10 most significant associations, 50 random charts were manually reviewed to compute the **positive predictive value (PPV)** of the Phecode-based phenotype.

## The Study Population

From an initial pool of 88,501 individuals with ANA tests:

- 45,624 were excluded for established AI disease
- 4,700 lacked BMI data
- 8,488 had intermediate titers (excluded by design)
- 908 had no diagnostic code within ±90 days

**Final cohort: 28,781 individuals**

| Group | n | % | Median Age (IQR) |
|-------|---|---|------------------|
| Negative (NG) | 24,354 | 84.6% | 45 (33–56) |
| Low titer (LT) | 3,544 | 12.3% | 48 (37–60) |
| High titer (HT) | 883 | 3.1% | 55 (42–66) |

Key observations on baseline characteristics:

- **HT patients were significantly older** (P = 3.9 × 10⁻⁷³), consistent with the known age-related rise in ANA prevalence.
- Female predominance across all groups (65–73%).
- **BMI did not differ** between groups (P = 0.345) — an important null finding that becomes interesting later.
- ANA patterns (available in 95.8% of HT vs only 23.4% of LT): **Homogeneous (~57%)** and **Speckled (~38%)** dominated. Nucleolar was ~3–5%. *No striking pattern enrichment differentiated HT from LT.*

## The Results

**Comparison 1 — HT vs LT (46 significant Phecode associations):**

The top hits were overwhelmingly **hepatic and metabolic**:

- **Chronic liver disease** (Phecode 571)
- **NAFLD / NASH** (Phecode 571.5)
- **Alcohol-related liver disease** (Phecode 317)
- Cirrhosis (non-alcoholic), alcoholic liver damage, portal hypertension, ascites, esophageal varices/bleeding, liver abscess
- Surrogates of severe liver disease: coagulation defects, thrombocytopenia, hyponatremia, acidosis, protein-calorie malnutrition, hepatic encephalopathy markers (altered mental status)
- Metabolic correlates: obesity, overweight, diabetes mellitus
- Behavioral/psychiatric: alcoholism, tobacco use disorder, anxiety, mood disorders
- An interesting finding: **Pain (Phecode 338)** was *more common* in HT (OR 4.1, P = 1.9 × 10⁻¹³), but **myalgia (Phecode 770)** was *less common* (OR 0.27, P = 1.3 × 10⁻⁵) — a likely reflection of referral and screening bias (myalgic patients with high ANA tend to get an AI label and would have been excluded).

**Comparison 2 — HT vs NG (67 significant associations):**

- 59 of the 67 overlapped with the HT vs LT findings.
- *New* associations: biliary tract disorders (cholelithiasis, cholecystitis), GI disorders (hemorrhoids, esophageal disease), bariatric surgery, insulin pump use, screening for skin malignancy, and **poisoning by antibiotics, anti-infectives, and analgesics/antipyretics/antirheumatics** (likely reflecting hepatotoxicity events in patients with underlying liver disease).

**Case Validation (the credibility check):**

- For Phecode 573 ("Other disorders of the liver"): **PPV = 88%** for non-AI liver disease.
   - Fatty liver disease was the most common etiology, followed by alcohol and hepatitis C.
   - Only 3/50 charts had possible undiagnosed AI liver disease (PBC or AIH) — i.e., the signal is *not* explained by missed autoimmune hepatitis.
- For alcohol-related Phecodes (317.1, 317.11): **PPV = 92%** for genuine alcohol-attributable disease.

**Sensitivity analyses:**

- Excluding BMI as a covariate did not alter the conclusions.
- Among HT individuals, ANA patterns did **not** differ between those with and without liver disease — so no single immunofluorescent pattern is acting as a "tag" for hepatic disease.

## Study Limitations

The authors are commendably forthcoming. The key caveats:

1. **Phenotype misclassification** — Phecodes derived from ICD codes can over- or under-call diagnoses; mitigated (but not eliminated) by the 88–92% PPVs.
2. **Future AI disease** — some HT individuals may develop AI disease later; excluding ever-diagnosed AI patients reduces but does not eliminate this.
3. **Incident vs prevalent disease** — the ±90 day window helps, but patients newly enrolled at VUMC may have brought chronic diagnoses with them.
4. **Single-center, tertiary referral cohort** — generalizability to community settings is uncertain.
5. **Pre-ICAP era testing** — most ANAs predate the International Consensus on ANA Patterns (ICAP, 2019) recommendations, so pattern reporting was less standardized.
6. **DFS70 not assessed** — these antibodies (dense fine speckled pattern) are notoriously difficult to detect by HEp-2 IIF alone and require solid-phase confirmation. They are associated with the *absence* of systemic AI disease, and whether DFS70 positivity drives some of the signal here remains unknown.
7. **Causality cannot be inferred** — does the high ANA reflect underlying liver disease, or does the immune dysregulation drive both? PheWAS cannot disentangle this.

## How This Study Adds to Practice

This is the **first large-scale, hypothesis-free** evaluation of what a high ANA titer *means* in patients without autoimmune disease. The clinical implications:

1. **Non-autoimmune liver disease deserves a formal place in the differential of an unexplained high-titer ANA.** Currently, most algorithms emphasize AI hepatitis or PBC; this study shows NAFLD/NASH and alcoholic liver disease are quantitatively more important explanations.
2. **The mechanism likely involves oxidative stress** — chronic alcohol, tobacco, and lipotoxicity all generate reactive species and neoantigens (e.g., malondialdehyde-acetaldehyde adducts) that can drive autoantibody production without triggering full-blown AI disease.
3. **The signal extends beyond liver involvement itself** to its complications — cirrhosis, portal hypertension, varices, ascites, coagulopathy. This raises the question of whether high ANA titers might be a marker of *progression* in NAFLD, although the cross-sectional design cannot confirm this.
4. **Metabolic comorbidity matters** — despite similar median BMI across groups, the *distribution* skewed toward obesity in HT patients (twice the proportion in overweight/obese categories), and bariatric surgery and insulin pump use were enriched. The "inverse BMI-ANA association" seen in some prior epidemiologic studies may be confounded by NAFLD-driven cases.
5. **For the rheumatologist:** when you encounter a referral for a "high ANA without symptoms," consider checking LFTs, asking about alcohol use, and screening for metabolic syndrome / NAFLD risk factors **before** committing to indefinite serial autoimmune workups.

## Final Takeaways

1. A high ANA titer (≥1:640) in a person without autoimmune disease is **not biologically silent** — it is statistically enriched for liver disease (NAFLD/NASH, ALD) and its sequelae.
2. The Phecode-based PheWAS approach offers a powerful, hypothesis-free way to interrogate large EMR datasets, and the manual chart validation (PPV 88–92%) lends credibility to the top associations.
3. The mechanistic thread is plausibly **oxidative stress → autoantibody generation** in the setting of chronic hepatic and metabolic injury.
4. Rheumatologists should **broaden the differential** for an unexplained high-titer ANA to include hepatic and metabolic disorders. Reflexively repeating ANAs or pursuing exhaustive AI workups in such patients may be lower-yield than a focused hepatology evaluation.
5. **Open questions for the field:**
   - Does the high ANA *predict progression* of NAFLD to fibrosis?
   - What is the role of DFS70 in this population?
   - Is there value in serial ANA monitoring in liver disease patients?
   - Can the immunologic phenotype of these patients be reversed by treating the metabolic/hepatic driver?

> **A useful one-liner for clinic:** *An ANA of 1:640 in a healthy-looking patient may be a quiet flag for an unhealthy liver — check the LFTs before you check the dsDNA.*

{{< source >}}
