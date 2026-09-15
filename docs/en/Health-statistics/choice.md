---
layout: doc
title: 'Method Selector'
---

# Method Selector

::: info Translation status
Translated from the [Chinese original](/Health-statistics/choice). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

You have a set of data in hand and do not know which statistical method to use? Walk through the
three-step questionnaire below and it will tell you **which method to use, what conditions it
requires, how to write it in R, which numbers to read in the output, and what mistakes are easy to
make**, and then take you straight to the matching chapter of *Health Statistics*.

::: tip How it decides
This selector **asks only about facts you can observe directly** (how the data came about, what the
variable looks like, roughly how many cases there are), and **does not ask you questions such as
“are the data normally distributed?”** — questions that can only be answered by a statistical
judgment, which is precisely what you are here to learn and should not be treated as a precondition.
Where it cannot be sure, it recommends **the safer route** (a method that does not depend on
distributional assumptions) and tells you how to check back.
:::

## Three steps

<div class="sf-flow">
  <div class="sf-step">
    <div class="sf-n">1</div>
    <div class="sf-t">How the data came about</div>
    <div class="sf-d">The same people measured twice? Two different groups of people? Or follow-up data?<br>This step fixes the <b>study design</b>; get it wrong and everything after it is wrong.</div>
  </div>
  <div class="sf-arrow">→</div>
  <div class="sf-step">
    <div class="sf-n">2</div>
    <div class="sf-t">What the variable looks like</div>
    <div class="sf-d">A specific number? Only two categories? Three or more, and are they ordered?<br>This step fixes the <b>measurement scale</b>, which decides between a parametric and a nonparametric method.</div>
  </div>
  <div class="sf-arrow">→</div>
  <div class="sf-step">
    <div class="sf-n">3</div>
    <div class="sf-t">How many cases, and how skewed</div>
    <div class="sf-d">More than 40 per group and roughly symmetric? Or not sure?<br>This step asks only about <b>features you can observe</b>.</div>
  </div>
</div>

<style>
.sf-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
  margin: 20px 0;
}
.sf-flow .sf-step {
  flex: 1 1 200px;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 14px 16px;
  background: var(--vp-c-bg-soft);
}
.sf-flow .sf-n {
  display: inline-block;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
}
.sf-flow .sf-t {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 4px;
}
.sf-flow .sf-d {
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}
.sf-flow .sf-arrow {
  align-self: center;
  font-size: 20px;
  color: var(--vp-c-text-3);
}
@media (max-width: 640px) {
  .sf-flow .sf-arrow { display: none; }
}
</style>

## Start here

<ChoiceFlow />

## Quick-reference decision table

| Situation | Method to use | Chapter |
| --- | --- | --- |
| Describing quantitative data | Roughly symmetric → mean ± SD; skewed or with extreme values → median (IQR) | [Chapter 4. Describing Quantitative Data](/en/Health-statistics/04-describing-quantitative-data) |
| Describing categorical data | Frequency + rate (binary) or proportion (multi-category) | [Chapter 5. Describing Qualitative Data (Chinese)](/Health-statistics/05-describing-qualitative-data) |
| One group vs a known value (quantitative) | Approximately normal → one-sample t test; otherwise → Wilcoxon signed-rank test | [Chapter 8. t Tests](/en/Health-statistics/08-t-test) |
| One group vs a known rate (binary) | Binomial test | [Chapter 6. Estimating Population Means and Rates (Chinese)](/Health-statistics/06-estimation) |
| One multi-category group vs a theoretical distribution | Goodness-of-fit chi-square test | [Chapter 10. Chi-Square Tests (Chinese)](/Health-statistics/10-chi-square) |
| Paired (quantitative) | Differences approximately normal → paired t test; otherwise → Wilcoxon signed-rank test | [Chapter 8. t Tests](/en/Health-statistics/08-t-test) |
| Paired (binary) | McNemar's test | [Chapter 10. Chi-Square Tests (Chinese)](/Health-statistics/10-chi-square) |
| Two independent groups (quantitative) | Approximately normal → two-sample t test (Welch's recommended); otherwise → Mann–Whitney U test | [Chapter 8. t Tests](/en/Health-statistics/08-t-test) |
| Two independent groups (binary) | 2×2 chi-square test: n ≥ 40 and T ≥ 5 uncorrected; 1 ≤ T < 5 corrected; n < 40 or T < 1 use Fisher | [Chapter 10. Chi-Square Tests (Chinese)](/Health-statistics/10-chi-square) |
| Two or more groups (nominal multi-category) | R×C contingency-table chi-square test (combine categories or use an exact test if the expected frequencies are too small) | [Chapter 10. Chi-Square Tests (Chinese)](/Health-statistics/10-chi-square) |
| Multiple independent groups (quantitative) | Approximately normal with equal variances → one-way ANOVA + multiple comparisons; unequal variances → Welch's ANOVA; non-normal → Kruskal–Wallis test | [Chapter 9. Analysis of Variance (Chinese)](/Health-statistics/09-anova) |
| Two or more groups (ordinal) | Mann–Whitney U test (two groups) or Kruskal–Wallis test (more than two) | [Chapter 11. Nonparametric and Rank-Based Tests (Chinese)](/Health-statistics/11-nonparametric) |
| Repeated measures (quantitative) | Repeated-measures ANOVA (watch sphericity) | [Chapter 9. Analysis of Variance (Chinese)](/Health-statistics/09-anova) |
| Repeated measures (ordinal) | Friedman test | [Chapter 11. Nonparametric and Rank-Based Tests (Chinese)](/Health-statistics/11-nonparametric) |
| Follow-up: estimating the survival curve | Kaplan–Meier method | [Chapter 14. Survival Analysis (Chinese)](/Health-statistics/14-survival-analysis) |
| Follow-up: comparing survival curves | Log-rank test | [Chapter 14. Survival Analysis (Chinese)](/Health-statistics/14-survival-analysis) |
| Follow-up: multivariable analysis | Cox proportional hazards regression (look at the HR; test the proportional hazards assumption first) | [Chapter 14. Survival Analysis (Chinese)](/Health-statistics/14-survival-analysis) |
| Two quantitative variables: looking at the relationship | Linear relationship → Pearson correlation; monotone but not linear → Spearman's rank correlation | [Chapter 12. Bivariate Association (Chinese)](/Health-statistics/12-bivariate-association) |
| Two quantitative variables: making predictions | Simple linear regression (draw the residual diagnostic plots first) | [Chapter 13. Simple Linear Regression](/en/Health-statistics/13-linear-regression) |
| Two categorical variables: looking at association | Chi-square test of independence + odds ratio (OR) / relative risk (RR) | [Chapter 12. Bivariate Association (Chinese)](/Health-statistics/12-bivariate-association) |
| Evaluating a diagnostic index (with a gold standard) | ROC curve + AUC; set the threshold by clinical cost and report the sensitivity and specificity at that threshold | [Diagnostic Test Evaluation (ROC and AUC)](/en/Health-statistics/diagnostic-test) |
| Repeated judgments: nominal categories | Kappa coefficient (Cohen's for two raters, Fleiss' for several); report it together with the observed agreement | [Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability) |
| Repeated judgments: ordered grades | Weighted kappa (always state whether the weights are linear or quadratic) | [Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability) |
| Repeated measurement: specific numbers | ICC (state the model/type/definition and report the confidence interval); add Bland–Altman if you want to know how much the methods differ | [Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability) |

## Similar tools built by others

The tools below were built earlier than ours and cover more ground; we suggest using them side by
side for reference:

| Tool | Language | Notes |
| --- | --- | --- |
| **[ChooseMyStat](https://choose-my-stat.vercel.app)** ⚠️ | English | Currently the closest tool to this page: it covers 18 tests plus diagnostic accuracy and agreement and reliability, and for every recommendation it gives a statistical analysis plan paragraph, an example of how to report the result, operating guidance, and R code, validated against 105 papers |
| **[UCLA IDRE: What statistical test should I use?](https://stats.oarc.ucla.edu/other/mult-pkg/whatstat/)** | English | The classic decision table, with the most complete list of entries |
| **[StatsToDo](https://www.statstodo.com)** · **[GraphPad's test selector](https://www.graphpad.com/quickcalcs/)** | English | Interactive guidance that quickly pins down the name of the test |
| **[MUSI](https://zenodo.org/records/10653965)** | English | A selection tool described in the form of an academic paper |
| **[The ChooseMyStat paper](https://www.medrxiv.org/content/10.64898/2026.06.02.26354730v1.full)** | English | On how such tools are designed and validated — worth reading if you want to see the thinking behind them |

::: warning ⚠️ About access
The first four of these are **overseas sites**, and **they may not open from mainland China, where a
VPN is needed**.
:::

## How ours compares with theirs

The selectors built by others are a great deal better than ours, and we are far behind in both
methods and depth.

Our strength is being tied to the course. Every conclusion links back to the corresponding chapter
of knowledge, and the chapters in turn link the lecture notes and exercises from
*Introduction to Information Technology* and *Medical Big Data Analysis and Decision Making*, so this
suits looking things up as you follow the course — look up whichever chapter you have reached.

Students writing a paper or working on a research project are better served by going straight to
[ChooseMyStat](https://choose-my-stat.vercel.app).

::: warning One last reminder
The recommended method is only a starting point. Please go back and check the **applicable
conditions** carefully, especially these two: whether the study design is right and whether the
variable type is right.
:::

Wishing you all the best with your studies and your research.
