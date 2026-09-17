---
layout: doc
title: '3. Experimental and Survey Design'
---

# Chapter 3. Experimental and Survey Design

::: info Translation status
Translated from the [Chinese original](/Health-statistics/03-study-design). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The first two chapters compute numbers you **already have**; this chapter deals with the time before
> the data exist — how people are chosen, how groups are formed, what is applied, and what is measured,
> so that the difference you eventually compute can really be attributed to the factor you set out to
> study.

## What this chapter is for

Data in medical research come from only two broad sources: **the researcher actively applies an
intervention** (whether to give a certain drug, whether to perform a certain operation) and **the
researcher merely observes objectively** (among smokers and non-smokers, who is more likely to get lung
cancer). The former is called an experimental study, the latter a survey study. The statistical methods
of the two overlap, but **the design checkpoints are completely different**: an experimental study can
randomize groups, a survey study cannot.

So there are two typical kinds of question:

- A drug company wants to evaluate the efficacy of a new drug and has recruited 100 patients. How
  should they be split into two groups? By order of admission? By severity of illness? — Neither works,
  because once the two groups differ in age, duration of illness, or severity, a final difference in
  blood glucose cannot be attributed clearly to the drug rather than to the people.
- You want to find out the prevalence of hypertension among adults in a city with a population of
  several million, and you can only examine part of it. How many people should be sampled? Which
  district, which neighborhoods, which households to knock on? On what grounds can the 5,000 people
  drawn represent the whole city?

Neither kind of question **can be rescued by analysis after the fact**. The statistician Fisher put it
harshly but accurately: to call in a statistician only after the experiment is over is to ask him to
perform an autopsy — all he can do is tell you what the experiment died of. **So this chapter has a
special place: it is the one step in the whole course that "has to be got right before you start".**

<TrackList :tasks="['State the three elements of experimental design and point out what they are in a specific study', 'Judge whether a way of forming groups is genuinely random', 'Pick the right one of the six forms of control', 'Explain the relation among sample size, power, and effect size', 'Distinguish the four probability sampling methods and give the order of their sampling errors', 'Spot the common faults in a questionnaire design']" />

## Core concepts

### The three broad categories of medical research

| Type | What the researcher does | Example |
| --- | --- | --- |
| **Survey research** | Applies no intervention at all; objectively observes and records the current state and its related characteristics | A cohort study of the relation between smoking and lung cancer |
| **Experimental study** | Artificially applies a study factor, controls confounding factors, observes and summarizes its effect | A randomized controlled trial of a new drug |
| **Literature research** | Summarizes the results of existing studies | Meta-analysis |

The definition of an **experimental study**: a research method in which the researcher, according to
the study purpose, artificially applies a **study factor** (an intervention) to the study subjects
(people or animals), controls confounding factors, and observes and summarizes the effect of the study
factor.

It stands on two foundations, which are also why it is "harder" than observational research:

1. **The researcher can set the study factor artificially.** The factor can be physical (acupuncture,
   radiation, physiotherapy), chemical (a drug, a poison), or biological (a bacterium, a virus), and it
   can also be a social factor.
2. **Which treatment a subject receives is decided by a random method**, not assigned subjectively by
   the researcher and not chosen by the patient. This one rule flattens out a large number of unknown,
   unmeasurable non-treatment factors as well.

An **experimental design** is the thorough plan made for the whole experimental study, covering the
ideas and arrangements for collecting, organizing, and analyzing the data from beginning to end. When
writing the design you must set out clearly: which experimental factors are examined, by what scheme
important non-experimental factors are controlled, who is chosen as the study subject, by what index
the effect is expressed, how the data are collected, and by what statistical method they will be
analyzed.

By research object, experimental studies fall into three kinds:

- **Animal experiment**: conditions can be controlled strictly (temperature, humidity, even a toxic
  environment), and it is the first choice for exploring mechanisms;
- **Clinical trial**: patients are the subjects, so they cannot be controlled at will the way animals
  can; people have psychological and social lives, so error control and ethical requirements must be
  considered at the same time;
- **Community intervention trial**: carried out in the general population of a community, with a long
  duration. Because individual random allocation is very hard to achieve in practice, it is often
  called a **quasi-experiment**.

By the number of study factors and levels, designs can also be divided into one-factor, two-factor,
and three-factor designs (Latin square, split-plot), multi-factor multi-level designs (factorial,
orthogonal, uniform), and so on.

### The three elements (1): the study factor

A **study factor** (also called a treatment) is a factor that the researcher, according to the study
purpose, applies to the study subjects and that causes a direct or indirect effect. It may be applied
actively (the kind of drug, the dose, the concentration, the duration of action), or it may exist
objectively (for example, observing the relation between the degree of contamination of a culture
medium in air and the season); sometimes the subjects' own characteristics (sex, age, occupation,
education, ethnicity, marital status) are also studied as the study factor.

- **Non-treatment factor**: a factor other than the study factor that affects or interferes with the
  result, but whose magnitude of effect the researcher does not intend to examine.
- **Level**: the different degrees of one and the same study factor in quantity or intensity. Different
  kinds of drug and different doses are different levels. Combining factors and levels gives four
  classes: one factor one level, one factor several levels, several factors one level, and several
  factors several levels.

A **confounding factor (confounder)** is a concept that has to be memorized on its own: it **is a
non-treatment factor that affects the experimental effect and that exists at the same time as the study
factor**. The trouble is that if it is not distributed evenly between the experimental group and the
control group, the link between the study factor and the experimental effect is distorted.

Here is a classic trap: comparing the response rates of two therapies for a disease, the
combination-drug group has 320 patients with a response rate of 89.4% and the general-therapy group has
132 patients with 90.9% — which makes the combination look worse. But break it down by severity, and
within the mild, moderate, and severe strata the combination group's response rate is **higher in every
one**; it is only that more severe patients were enrolled in that arm and more mild patients in the
control arm, which flipped the overall rate. Here **severity of illness is the confounding factor**.
There are three routes to controlling a confounding factor:

| Method | What it does |
| --- | --- |
| **Exclusion** | Enroll patients of only one severity level, keeping the confounding factor outside the door |
| **Balancing** | Stratify by severity first, then randomize into the groups within each stratum (stratified randomization) |
| **Standardization** | Compute as usual, but work out standardized rates first and then compare |

Setting the study factor also means keeping three more rules: **seize the main factors in the
experiment** (too many factors and both the number of groups and the number of cases balloon, making
the experiment hard to control; too few and you cannot dig deep), **tell study factors and non-treatment
factors apart** (find the important non-treatment factors and find a way to remove their interference),
and **standardize the study factor** (a drug must have a fixed manufacturer, batch number, and storage
method; an operation must have a standardized procedure, and the operating surgeon's level of skill
should be as close as possible).

### The three elements (2): the study subjects

**Study subjects** are the objects on which the study factor acts. They can be people, animals, or
plants, or an isolated specimen from the human body, serum, cells, or a particular organ.

Choosing the study subjects is the key to the success of the experiment, and the most important thing
is **homogeneity** — the species, biological characteristics, and other conditions of the research
objects must stay balanced. There are six basic requirements in the choice:

| Requirement | Meaning |
| --- | --- |
| **Sensitivity** | The subjects respond keenly to the study factor applied and show the effect easily |
| **Specificity** | The response is specific and can exclude interference from non-treatment factors |
| **Stability** | The response is fairly stable, which reduces error |
| **Homogeneity** | Species, biological characteristics, and other conditions stay balanced |
| **Compliance** | How cooperatively the subject accepts the study factor (especially in clinical trials) |
| **Economy** | Easy to find, low cost |

In practice this comes down to writing "who is chosen" as three layers of written criteria, none of
which may be missing:

1. **Diagnostic criteria**: use the accepted international classification of diseases or the standards
   laid down by a national academic conference wherever possible. These standards are authoritative and
   make the results comparable with those of similar studies. If a disease truly has no accepted
   standard, the researcher may draft one, but should **use objective indices as far as possible** —
   pathology, biochemistry, imaging, immunology, endoscopy, and so on.
2. **Inclusion criteria**: on the basis of the diagnostic criteria, further lay down the concrete
   conditions for entry (age, duration of illness, type of disease, informed consent, and so on).
3. **Exclusion criteria**: people who meet the diagnostic criteria are not necessarily suitable as
   subjects. Being too young, being too frail, having other complications, having another disease that
   might affect this experiment's results, reacting badly to the drug, pregnancy or breastfeeding — all
   of these must be excluded.

Both sets of criteria must be laid down in writing as explicit clauses, so that every clinician taking
part in the study knows them; they must also be stated clearly when the paper is written, so that
others can cite and compare.

**The number of study subjects** is the sample size (the number of cases). The more factors there are,
the more level combinations there are and hence the more subgroups, and **the number of cases in each
subgroup must not be too small**. How the sample size is estimated is described later in this section;
the complete method is **covered in Chapter 17**.

### The three elements (3): the experimental effect

The **experimental effect** is the response and outcome that appear after the study factor acts on the
study subjects. It is expressed through **the choice of indices** and **the observation of indices**.
Choose the wrong index and the whole experiment answers a question nobody asked.

**Five criteria for choosing an index:**

- **Objectivity**: an objective index is the result of a measurement or a test and generally belongs to
  quantitative data, and is far more reliable than a subjective index (which generally belongs to
  categorical data). To observe the efficacy of treatment for anemia you should choose the red blood
  cell count or the hemoglobin level, not subjective feelings such as dizziness or fatigue.
- **Sensitivity**: when the study factor changes slightly, the index changes with it. Only an index of
  high sensitivity can bring the effect out fully.
- **Exactness**: this contains two different things —
  - **Accuracy**: how close the observed value is to the **true value**; it reflects **systematic
    error**;
  - **Precision**: how close repeated observed values are to **their own mean**; it reflects **random
    error**.

  Both have to be present, but the first thing is to be accurate.
- **Specificity**: the index reflects specifically the thing being studied. In diagnosing diabetes,
  measuring blood glucose is more specific than measuring urine glucose.
- **Relevance**: the index has to be chosen to fit the study purpose. To evaluate a drug for treating
  fractures, choosing "bone density" or "osteocalcin" is wrong — those indices reflect the state of
  osteoporosis; to reflect fracture healing you should choose bone morphology, X-ray films,
  pathological findings, and functional recovery.

**Subjective indices are not unusable — they have to be quantified.** In research on mental health or
satisfaction there are only subjective indices, so set the answers as 5 to 7 grades: do not offer the
two options "satisfied / dissatisfied" (which give only binary categorical data), but the five grades
"1. very dissatisfied 2. dissatisfied 3. neutral 4. satisfied 5. very satisfied"; what you get then is
ordinal data, and it can be scored 1 to 5 by the Likert five-point scale and handled as quantitative
data.

**Observing the indices has to be guarded against bias.** In a clinical trial, if the researcher or the
clinical staff know the grouping and the treatment, subjective preconceptions or unconscious partiality
may influence the results; and subjects who know their own group assignment are subject to all kinds of
psychological effects, which produce non-specific responses. The remedy is **blinding** — before the
experiment ends, the people involved and the subjects are not told who is in which group or what
treatment they are receiving.

| Form of blinding | Who does not know |
| --- | --- |
| **Single blind** | Only the subjects do not know |
| **Double blind** | Neither the subjects nor the experimenters know |
| **Triple blind** | Neither the subjects, the experimenters, nor the statisticians know |

When the main variable is subjectively rated (pain, a cognitive-impairment score) and the content of
the rating scale can very easily produce bias from subjective factors, double blinding **must** be used.
At present double and triple blinding are the most common practice in clinical trials.

**Standardizing the index** means fixing the method, site, and time of collection, the storage,
transport, time of assay, assay method, and assay conditions, and so on, entirely. Without
standardization these factors either interfere with the course of the study or turn directly into
confounding factors, which makes the measurement unstable and leads to wrong conclusions.

### The four principles (1): control

**Setting up a control** means that besides the experimental group, one or more further groups are run
**concurrently** so that the experimental group's effect can be compared. The reasoning is plain: **no
control, no comparison; no comparison, no discrimination**. Without a control, the effect of no study
factor can be demonstrated.

The point of a control is to give the difference made by study factors and non-treatment factors a
scientific reference point for comparison. The crux is that the subjects in the experimental and
control groups **should be as nearly identical or similar as possible in every other factor that
affects the result, apart from the difference in the study factor**.

Six forms of control are in common use, and exams love to make you tell them apart:

| Form | What the control group receives | Typical setting |
| --- | --- | --- |
| **Blank control** | Nothing at all | Animal experiments and laboratory method studies, used to evaluate the accuracy of a measurement method and to determine background values |
| **Placebo control** | A "dummy drug" with the same appearance, color, and taste as the trial drug but no pharmacological action | Clinical trials, used to remove the difference in psychological effect between control patients and experimental patients |
| **Standard control** | A recognized effective drug, an existing standard method, or a routine method | Whether a new test method can replace a traditional one; a new-drug trial using a known effective drug as the control |
| **Experimental control** | No study factor, but the experimental factors related to the study factor are applied | In a study of iron-fortified soy sauce, the control group eats ordinary soy sauce (the same amount in both groups) |
| **Self-control** | Control and experiment are carried out on different parts or at different stages of the same subject | Comparing blood pressure before and after medication; left ear against right ear |
| **Mutual control** | No separate control group is set up; several experimental groups serve as each other's control | Three cough medicines compared against one another for the strength of their efficacy |

A few details that are easily overlooked:

- A blank control is simple and easy to carry out, but **it raises ethical problems in clinical
  trials** and easily creates a psychological difference between the trial group and the control group,
  so it is used relatively rarely. It is appropriate only when the study factor is very strong and the
  non-treatment factors are very weak.
- With a standard control it is **not advisable to substitute an existing standard value or reference
  value for a control group**: the time, place, and environment of the experimental group may differ
  from the background in which the standard value was produced.
- Self-control is simple and easy, but in studies where "different treatments are given at different
  stages" it is **hard to rule out the effect of time**. A weight loss from before to after medication
  may be the drug's doing, or it may be that diet, exercise, or psychological state changed over that
  period. Self-control therefore usually still needs a **parallel external control**.

Three common errors in setting up a control:

1. **No control**: only a trial group, so the effect of the study factor cannot be demonstrated.
2. **Insufficient control**: there is a control, but some necessary group or factor is missing, so
   comparability is poor. A typical example is a study of "a hormone + a Chinese herbal medicine" for
   preventing and treating osteoporosis which sets up only three groups — a normal control, a hormone
   group, and a "herbal medicine plus hormone" group — and **leaves out the herbal-medicine-alone
   group**. Then, when the two factors interact, the effect in the third group mixes the hormone, the
   herb, and their joint action, and cannot be taken apart.
3. **Excess control**: if both the old and the new drug in the study have been repeatedly shown to be
   effective, adding a placebo control group is superfluous and also violates ethical principles —
   comparing the old and new drugs directly is enough.

### The four principles (2): randomization

**Randomization** involves two things, neither of which may be missing:

- **Random sampling**: in choosing the sample, ensure that every individual in the population has an
  equal chance of being drawn into it → this guarantees the sample's **representativeness**;
- **Random allocation**: in allocating the sample, ensure that every individual in it has an equal
  chance of being assigned to the experimental group or the control group → this guarantees the
  **balance** of the groups.

Strictly speaking there is a third: **randomization of the experimental order** — every subject has an
equal chance of receiving the treatment earlier or later, which balances out the effect of the order of
the experiment.

**What exactly is randomization guarding against?** Against the presence of large numbers of unknown or
uncontrollable non-treatment factors, by using statistical means to keep the groups balanced. It avoids
the partiality caused by objective and subjective factors, reduces systematic error, and channels the
various effects into the overall experimental random error. Randomization is also the **precondition**
for drawing statistical inferences from data — only data that satisfy the randomization principle can
genuinely be analyzed by the various statistical methods.

The design described below is a cautionary tale: 40 patients with knee osteoarthritis are divided into
two groups **by order of consultation**, the first 20 into the control group and the next 20 into the
experimental group, and the experimental group turns out to have the better efficacy. The problem is
that patients coming for consultation are not necessarily balanced in severity or duration of illness,
and may carry a degree of **clustering** — mostly severe patients during one period, mostly mild
patients during another. In the end the two groups differ widely in some important non-treatment
factors, comparability is poor, and the conclusion is unreliable.

Commonly used methods of random allocation:

1. **Simple randomization**: randomize the study subjects directly; after allocation the groups do not
   necessarily have the same number of cases. You can toss a coin, draw lots, draw balls, consult a
   table of random numbers, or simply have software generate pseudo-random numbers.
2. **Block randomization**: following the order in which subjects enter the study, divide them into
   several blocks **containing an equal number of cases**, and then randomize within each block. The
   advantage is that at any moment the groups have roughly equal numbers of cases, so an interim
   analysis will not come out lopsided.
3. **Stratified randomization**: simple randomization raises the balance of the groups but cannot
   **guarantee** that good balance is reached. When there is a confounding factor with a large effect
   on the result, stratify by that factor first and then carry out complete randomization within each
   stratum.

<ClickAnswer>

**Think about it**: a study divides 40 patients "at random" into two groups — the first 20 go to the
control group, the next 20 to the experimental group — and in the end the experimental group has the
better efficacy.

Does this count as random allocation? Is the conclusion reliable?

---

It does not. This is not random allocation, only **allocation by order of entry**. Random allocation is
defined as "every subject has an equal chance of being assigned to either group", whereas here who gets
into the experimental group is decided entirely by the time of consultation, and the researcher (or
even the patient) can influence it indirectly.

Why does this order cause a problem of partiality? Because patients coming for consultation are
themselves **clustered**: those arriving during one period may be mostly severe patients (a spell when
referrals from primary hospitals concentrate, say), and mostly mild patients during another. The two
groups are then unbalanced in important non-treatment factors such as severity and duration of illness,
and the final difference in efficacy may perfectly well be caused by "the experimental group being less
ill".

There is another hidden risk in "the first ones into the control group, the later ones into the
experimental group": as the trial goes on, the clinical staff's skill, their understanding of the
protocol, and even the season and environment all change, and **these "time effects" are completely
entangled with the group effect and can never be separated**. Genuine randomization (even just a coin
toss) is precisely what can spread these unknown factors out across the two groups.

**The point**: randomization is not about "looking fair"; it is about making **all the non-treatment
factors you thought of and all the ones you did not** tend toward balance.

</ClickAnswer>

### The four principles (3): replication

**Replication** means that the study sample must have a certain size, that is, under the condition that
the study results are reliable to a certain degree, determining the **smallest** number of cases.

Why is it necessary? Because the indices observed in medical research generally carry **variability** —
normal people differ in blood pressure. To reveal the pattern of variation of a random variable, the
same experimental conditions must be repeated independently many times. The role of the replication
principle is precisely **to let the statistical regularity of the random variable come fully into
view**.

Too few cases cannot reflect the underlying regularity and may produce seriously wrong results; too
many make the experimental error hard to control and also waste manpower, materials, and money.

"Replication" has three different meanings in statistics; do not mix them up:

| Term | What it means | Purpose |
| --- | --- | --- |
| **Repeated experiment** | Carrying out several **independent** experiments under the same experimental conditions (using different individuals or samples, not several runs on the same individual) | To see the reproducibility of the result |
| **Repeated sampling** | Taking several specimens from the same subject or the same sample at one time point | To see whether the values of an index are evenly distributed across the specimens and whether the assay method is reproducible |
| **Repeated measurement** | After the subjects receive the treatment, observing repeatedly at different time points or at symmetric different sites | To see how the index changes over time |

But the "replication principle" in experimental design **mainly means that the number of independent
repetitions under the same experimental conditions must be large enough**. Putting it into practice has
two parts: define the nature and scope of the research objects strictly according to the study purpose,
and guarantee a sufficient sample size.

While we are at it, let us correct a common misreading: 8 of 10 gastritis patients are cured, a cure
rate of 80%, while the recognized effective drug has a cure rate of 60% — you **cannot** conclude from
this that the new drug is better. With 10 cases the fluctuation is too large, and the 80% may not be
reproducible or stable; what is violated here is the replication principle. Besides, this is a sampling
study with sampling error, so the conclusion must be drawn from a hypothesis test and its $P$ value.

### The four principles (4): balance

The **balance principle**, also called the principle of like-with-like comparison: between the
experimental group and the control group, or among the experimental groups, **everything except the
study factor should be as identical or consistent as possible**.

What exactly does "everything else" mean? Take a clinical study: the composition of illness severity
(the proportions of mild, moderate, and severe), the mean duration of illness and its distribution, the
mean age and its distribution, the sex composition, and so on — every aspect that might affect the
evaluation of efficacy should be as consistent as possible. Statistically these are called **important
non-treatment factors**.

The balance principle is **the one most easily overlooked and at the same time the most important** of
the four. Many a design has its conclusions easily overturned simply because balance was not thought
through. Take this cautionary example: three therapies for induration after gluteal injection are
compared, 117 cases are enrolled, ages run from 18 months to 68 years, duration of illness from 1 week
to 15 years, and the induration from $1\text{cm}\times1\text{cm}$ to $5\text{cm}\times7\text{cm}$, and
the three groups are compared directly. But the prognosis of the induration is strongly related to age,
duration of illness, and the size of the induration (younger, shorter duration, smaller induration —
relatively better prognosis). Here **age, duration of illness, and size of induration are confounding
factors**; without controlling them, the conclusion is not very reliable and may even be completely
wrong.

The balance principle runs through randomization, replication, and control — implement those three well
and you are implementing balance. It also has two dedicated methods:

1. **Cross-balancing**: within each trial group, set up both a test and a control, so that the
   non-treatment factors of the two groups are balanced and consistent.
2. **Stratified balancing**: divide the non-treatment factor into several unit groups (strata) by
   level, and then arrange the study factor within each stratum.

### Sample size and power

This is the part of experimental design that most needs to be "computed". **Sample size is the question
of how many animals or people the experiment uses.**

Too small, and **the power is low, so no statistical conclusion can be drawn** — a difference that
really exists cannot be detected, and the work is wasted; too large, and the study is hard to run,
wastes resources, and may even introduce more confounding factors. So what has to be found is "the
smallest number of cases that still keeps the results reliable".

First, be clear about **power（检验效能）**. A hypothesis test has two kinds of error:

| | $H_0$ really true | $H_0$ really false |
| --- | --- | --- |
| Fail to reject $H_0$ | Correct ($1-\alpha$) | **Type II error** ($\beta$) |
| Reject $H_0$ | **Type I error** ($\alpha$) | Correct ($1-\beta$) |

$$\text{power} = 1 - \beta$$

It means: **the probability that this experiment detects the difference when the two groups really do
differ.** By convention the power is required to be no lower than 0.80, that is, an 80% chance of
detecting a difference that genuinely exists.

The relation between sample size and the various factors can be seen very clearly from the formula for
comparing two sample means:

$$n = \frac{2\left(z_{\alpha/2} + z_{\beta}\right)^2 \sigma^2}{\delta^2}$$

where $n$ is the number of cases needed per group, $\sigma$ is the standard deviation of the individual
observations, $\delta$ is the difference between the two group means that the researcher wants to
detect ($\mu_1-\mu_2$), and $z_{\alpha/2}$ and $z_\beta$ are quantiles of the standard normal
distribution. By comparison, for a one-sample or paired design

$$n = \frac{\left(z_{\alpha/2} + z_{\beta}\right)^2 \sigma^2}{\delta^2}$$

(In a paired design $\sigma$ is the standard deviation of the **differences**, $\sigma_d$.)

Four conclusions can be read off at a glance:

- **$n$ is proportional to $\sigma^2$**: the greater the individual variation, the more people are
  needed. This is why "strictly limiting the inclusion criteria and raising homogeneity" saves sample
  size.
- **$n$ is inversely proportional to $\delta^2$**: to detect only a large difference, a few dozen cases
  suffice; to detect a subtle difference, the number of cases grows with the square. Here $\delta/\sigma$
  is the **effect size（效应量）**.
- **The higher the power required, the larger $n$**: raising $1-\beta$ from 0.80 to 0.90 clearly
  increases the number of cases.
- **The smaller $\alpha$ is set, the larger $n$**: tightening 0.05 to 0.01 costs more cases. A two-sided
  test also needs more cases than a one-sided one.

One reverse inference that must be remembered: **when $P \gt 0.05$, if the power is insufficient you
may only say "no difference was detected", not "there is no difference between the two groups".** Many
a conclusion that "a drug is ineffective" is in fact the result of too few cases.

Sample size also depends on the design type: a completely random design needs more cases, whereas a
paired design and a randomized block design need fewer, because the variation due to pairing or to
blocking has been subtracted out; a factorial design multiplies the number of cases by the number of
factor-level combinations. The complete estimation formulas, the specific calculations for each design
type, and sample size calculation for comparing rates and other settings are **covered in Chapter 17**
(factorial designs, survival analysis, and similar settings are not covered in this course and need
other sources); here we only need to build the idea that "sample size is not decided on a whim, but
jointly determined by $\alpha$, $\beta$, $\sigma$, $\delta$, and the design type".

### Common design types (1): completely random design and paired design

**Completely random design**

Also called a **randomized controlled trial (RCT)**, it is a **one-factor** study design: the study
subjects are allocated to the experimental group and the control group by the randomization principle,
receive different treatments, the effects in each group are observed over the same period, and finally
the observed indices are compared for a difference.

- When it applies: there is only one study factor, and the study subjects either do not need to be
  matched or cannot be.
- **Advantages**: both the design and the statistical analysis are simple, and missing values still
  allow statistical analysis.
- **Disadvantages**: only one factor can be studied at a time, and the sample size needed is fairly
  large; with a small sample the balance may be poor and the sampling error large.

Allocation is its most important step. The standard procedure is to number the animals in order by some
characteristic (body weight, say), consult a table of random numbers and copy the random numbers down,
sort the random numbers from smallest to largest, and lay down that the numbers coming first go to the
first group, the middle ones to the second group, and the last ones to the third group. **The key here
is the step "number by body weight"** — it makes body weight, a non-treatment factor, randomized along
with everything else at allocation, instead of allocating first and then looking at how much the two
groups' weights differ.

A common failed design: 360 patients with facial paralysis are divided into three groups of 120 each —
equal numbers, but the three groups differ markedly in where the patients came from (outpatient /
inpatient / community). **Equal numbers do not mean balance.** The right approach is to divide the
patients into three classes by source first, then randomly allocate the patients in each class among the
three therapy groups, so that every treatment group contains cases from every source.

**Paired design**

The study subjects are paired up on certain conditions, and then the two subjects in each pair are
randomly allocated to different treatment groups.

Two situations must be distinguished:

1. **Self-control design**: comparing the change in the variable value of the same subject before and
   after the experiment, or the results of the same sample under two different assay methods. It suits
   acute, short-term trials, or observing the effect of short-term symptomatic treatment in a chronic
   disease whose condition is stable. **Trials that run for a long time are usually unsuitable** — over
   a long period other confounding factors are much more likely to enter, and comparability before and
   after is lost.
2. **Matched-pairs design across individuals**: individuals with the same conditions are paired up, and
   assignment is then randomized within the pair. It is easiest to carry out in animal experiments,
   where species, strain, sex, body weight, litter, and days of growth are usually the basic pairing
   conditions.

- **Advantages**: it raises the balance between groups, reduces experimental error, and raises
  statistical efficiency.
- **Disadvantages**: too many pairing conditions make pairing difficult.

One pitfall deserves a mention of its own: someone claims to have done a paired design, pairing 70
pairs by sex, age, duration, and severity, but look at the baseline table — mean age 45.0 in the trial
group and 50.0 in the control group; 25 severe cases in one group and 30 in the other. **If you claim
to have paired, you have to have actually balanced these conditions within each pair**; otherwise it
only looks like a paired design, while in reality the age and severity distributions are still
unbalanced and the efficiency of pairing is not obtained.

### Common design types (2): randomized block, cross-over, factorial, repeated measures

**Randomized block design**

Also called a matched design, it is an extension of the paired design — the paired design is its
simplest form (block size $k=2$). The procedure is: several study subjects with the same conditions are
marked off as one **block**, the number of observation units in a block equals the number of comparison
groups; and then the subjects within the block are randomly allocated to the comparison groups.

- It is a **two-factor design**: **the first factor is the study factor and the second is the blocking
  condition**. So it can analyze both the difference between treatment groups and the difference
  between blocks.
- **Advantages**: good balance between groups, small sampling error, high experimental efficiency.
- **Disadvantages**: if an animal dies by accident and leaves a gap, the results generally have to be
  handled by the methods of a completely random design instead.

Three things to watch:

1. Distinguish the first factor (the study factor) from the second (the blocking condition).
2. **The matching conditions must not be too many**, or blocks become hard to delimit; in particular
   the **study factor** must never be used as a matching condition — that is over-matching.
3. It is easiest to carry out in animal experiments, where breed, litter, sex, body weight, and days of
   growth are commonly used as the blocking conditions.

A real lesson: a study divided 30 rats into 10 blocks by litter and body weight to compare three drugs'
blood-pressure-lowering effects, and only after the experiment was over discovered that the rats were
not of one breed. Different breeds may metabolize a drug differently, so **this buried an uncontrolled
systematic difference inside each block**, and the results are not trustworthy.

**Cross-over design**

A **special kind of self-control design**: according to a pre-designed sequence, several treatments are
applied one after another to the same research object in different periods, so that the effects of the
treatment groups can be compared. The most widely used in medicine is the **two-period cross-over
design** — subjects with similar conditions are paired and then randomly split into two groups, one
receiving A then B and the other B then A, the two treatments crossing over, with a washout period in
between.

- **Advantages**: it economizes on sample size; it can control the influence of individual differences
  and of time on the study factor, so its efficiency is fairly high; and every subject receives both
  the study factor and the control factor, which makes it easier to accept in clinical trials.
- **Disadvantages**: the time for each treatment cannot be too long; if a subject's state changes
  (death, cure) the later period cannot be carried out; and once a subject drops out in one period, the
  data for that period and after are missing, which makes analysis harder.
- **Where it applies**: chronic diseases with a long course. **It is unsuitable for short-course
  diseases such as the common cold, acute bronchitis, or pneumonia** — one course of treatment cures
  them, so the crossed-over medication in the second period simply cannot be given.

**Factorial design**

A **multi-factor crossed grouping design**: the levels of two or more factors are laid out and combined
crosswise, and the experiment is likewise run in crossed groups. It studies both **the main effect of
each factor** and **the interactions between factors**, with the aim of finding the best combination.
The simplest and most common is the $2\times2$ factorial — two factors with two levels each, 4
combinations in all:

| | $B_1$ | $B_2$ |
| --- | --- | --- |
| $A_1$ | $A_1B_1$ | $A_1B_2$ |
| $A_2$ | $A_2B_1$ | $A_2B_2$ |

- **Advantages**: comprehensive and efficient, it can observe the effects of several factors at several
  levels at once; it can analyze several kinds of interaction, so the conclusions are rich; and it
  expresses the results directly and helps find the best combination.
- **Disadvantages**: the statistical analysis is fairly complex; in clinical research it is not easy to
  obtain data suitable for analyzing interactions; and neither the number of factors nor the number of
  levels should be too large, or both the computation and the sample size explode.

A factorial design likewise **must randomize the groups**. Some researchers comparing two anesthetic
methods and two anesthetic doses took 40 patients in order of surgery, put them into groups of 10, and
assigned the four combinations in turn — that is deliberate arrangement, not random allocation, and the
observation of the anesthetic effect is bound to be biased. The right way is to number the order of
surgery and use random numbers to split it into 4 groups, which then receive the four combinations.

**Repeated-measures design**

**Repeated-measurement data** are data obtained by measuring the same observed index **repeatedly at
different time points** (number of measurements $m \ge 3$) on the same study subject, and are commonly
used to analyze how the index changes over time. All the results are written $x_{ijk}$, where $i$ is
the time point, $j$ the study subject, and $k$ the study factor.

Its total variation splits into two parts: variation **between subjects** and variation **within
subjects**. The between-subject variation can be split further into the variation of the study factor
and the between-individual error; the within-subject variation can be split further into the variation
of the time factor, the **interaction** of the study factor with time, and the within-individual error.

Five characteristics:

1. The same index is measured $m$ times ($m \ge 3$) on the same study subject;
2. **Repeated measurements at different time points are autocorrelated**;
3. The measurement times may be equally spaced or unequally spaced;
4. Sometimes some subjects have missing data at the last few time points;
5. The observed index may be quantitative or qualitative.

**The difference from a randomized block design (the comparison most often asked about for this design
type):**

| | Randomized block design | Repeated-measures design |
| --- | --- | --- |
| The "treatment" within a block | **Randomly allocated** among the subjects in the block | The "treatment" is randomly allocated among subjects, but **the time points within a block are fixed and cannot be randomly allocated** |
| The subjects within a block | **Independent** of one another; each receives only one treatment | **Not independent** of one another (the same individual is measured several times) |
| Prerequisite for analysis | Ordinary analysis of variance | To compare treatment groups by a randomized block analysis of variance, the **sphericity** assumption must hold |

**The most common mistake** is to compare the two groups at each time point with a $t$ test. That is
wrong: the $t$ test applies to quantitative data from two groups in a random design and requires the
data to be **independent**, whereas repeated-measurement data are precisely not independent across time
points. Such an analysis looks at each time point in isolation and does not use the internal links
between time points in the same subject, which lowers the power; and it does not answer at all the
question "does time affect the result?" that a repeated-measures design exists to answer. The right
method is **analysis of variance for repeated-measurement data**.

### Survey research: complete survey and sampling survey

**Survey research**, also called **observational research**, means objectively observing and recording
the current state of the research objects and their related characteristics under **no intervention at
all**.

It has two characteristics, exactly opposite to those of an experimental study:

1. No intervention is applied artificially to the research objects; the current state and its related
   characteristics are simply observed and recorded objectively;
2. **Random allocation cannot be used to balance or remove the influence of non-study factors on the
   results.**

Point 2 is the root of every difficulty in survey research: you cannot randomly assign "smoking" to
half the people, so you can only rely on design (matching, stratification, multivariable analysis) to
control confounding as far as possible, and it can never be as clean as an RCT.

By the proportion sampled, there are two kinds:

| | **Complete survey (census)** | **Sampling survey** |
| --- | --- | --- |
| Procedure | Every individual in the study population is investigated | A certain number of observational units are drawn from the population to form a sample, and the sample information is used to study the population |
| When it applies | To learn about a particular "point in time" in the population, such as the point prevalence | The vast majority of situations |
| Advantages | **No sampling error; the parameters can be obtained** | Saves resources and makes non-sampling error easier to control |
| Disadvantages | Consumes resources and may introduce non-sampling error | **Sampling error is present**; the design, the fieldwork, and the analysis are more complex |

Note the counterintuitive point here: **a complete survey has no sampling error, but may still be
biased** (people missed, people counted twice, inaccurate measurement), and this kind of non-sampling
error is often harder to control than sampling error. "A census is bound to be accurate" is wrong.

Depending on whether sampling relies on probability, sampling surveys divide further into:

- **Probability sampling**: the **probability** that each individual in the population is drawn **is
  known or can be calculated**. It rests on statistical theory, **the sampling error can be computed,
  and the sample can be used to infer the population** — this is the precondition for statistical
  analysis.
- **Non-probability sampling**: the probability that each individual is drawn is unknown or cannot be
  calculated, so in general the sampling error cannot be computed and statistical inference cannot be
  made. Convenience sampling (meeting people in the street) and snowball sampling belong here. It **does
  have some value in practice** (exploratory research, or when a sampling frame is hard to construct),
  but the conclusions cannot be extrapolated to the population.

### The four probability sampling methods

| Method | Procedure | Advantages | Disadvantages |
| --- | --- | --- | --- |
| **Simple random sampling** | Number every observational unit in the population uniformly, then draw $n$ numbers at random with a random number table, statistical software, or lots | Simple to carry out and the statistics are easy to compute | When the population is very large, numbering every unit one by one is tedious |
| **Systematic sampling** | Divide the population at equal intervals by some serial number into $n$ parts, each containing $k$ units; draw the $i$th number at random from the first part, then take the remaining units mechanically at the equal interval $k$ | Easy to understand and simple to carry out, and **the sampling error is generally smaller than for simple random sampling** | If the population has a monotone or periodic trend the sample is biased; there is no dedicated formula for computing the sampling error |
| **Stratified sampling** | First divide the population into several strata by one or more characteristics that strongly affect the observed index (age, sex, and so on), then draw a certain number of units at random from each stratum | **Small sampling error**; each stratum can be analyzed on its own | The population has to be stratified in advance, which is troublesome |
| **Cluster sampling** | Divide the population into **clusters** (primary observational units, each made up of secondary observational units), draw a part of the clusters at random, and **take every secondary unit in the drawn clusters** into the sample | Suits large-scale surveys, is easy to organize and carry out, and saves manpower and money | **Large sampling error** |

**The order of the four sampling errors has to be memorized:**

$$\text{stratified sampling} \lt \text{systematic sampling} \lt \text{simple random sampling} \lt \text{cluster sampling}$$

The trick to understanding this order is to ask "how much structural information am I using within the
same population?":

- Stratified sampling **actively uses** the structure "homogeneous within a stratum, heterogeneous
  between strata" and subtracts out the between-stratum variation, so it is the most precise;
- Cluster sampling takes whole clusters, and individuals within a cluster are often similar (the
  students of one class, the people of one village), so the information inside the cluster is wasted —
  hence it is the least precise; **the price is that you must draw more clusters to reach the same
  precision**;
- Simple random sampling uses neither and sits in the middle; systematic sampling is slightly better
  than simple random sampling when the population has no clear trend.

Each of the four has its own sphere of application, and in real large-scale surveys they are often
combined, which is **multistage sampling**. A typical procedure is stratify → draw primary units → draw
secondary units within the drawn primary units → … → finally take whole households as a cluster within
the smallest unit. For example, the national nutrition and health survey used multistage stratified
cluster random sampling: first stratify by large cities, medium and small cities, and various kinds of
rural area; then draw counties (urban districts), townships (streets), and villages (neighborhood
committees) level by level; and finally take whole households as clusters for the investigation. **The
observational unit at every stage has to be stated clearly in the design**, and it is not necessarily a
"person" — a county, a township, a village, or a farm household can each be the observational unit at
some stage.

### The basic content and steps of survey design

The complete process of survey design has eight steps:

1. **Fix the survey purpose and indices** — the purpose is of only two kinds: to learn about parameters
   in order to describe the population's characteristics, or to study the relation between variables
   for prediction or control (exploring causes of disease, for example). The purpose is expressed
   through **survey indices**, which must be concrete, well chosen, and objective, with high exactness,
   specificity, and sensitivity.
2. **Determine the survey objects and observational units** — the survey objects mean fixing the
   **homogeneous scope** of the survey population (for example, "all rural residents aged 18 to 70 in a
   certain place in a certain year"), and this step matters especially when estimating parameters; the
   observational unit is an individual, but it can also be an organ, a household, or a sampling point.
3. **Determine the survey method** — a complete survey or a sampling survey; for a sampling survey,
   also state which sampling method is used and how many stages there are.
4. **Estimate the sample size** — taking into account the variability of the indices surveyed and the
   precision and confidence level of the parameter estimates; the general principle is to determine the
   smallest number of cases that still keeps the results reliable (**see Chapter 17**).
5. **Draw up the questionnaire.**
6. **Draw up the data collection plan** — train the interviewers and set out the training scheme;
   decide the mode of collection: direct measurement, interview, telephone survey, postal survey, or
   group-administered survey.
7. **Draw up the plan for organizing and analyzing the data** — receiving and checking questionnaires,
   data entry, grouping the data (qualitative grouping and quantitative grouping), statistical
   analysis, and subject-matter analysis.
8. **Draw up the organizational measures for the survey** — division of labor, timetable, publicity and
   mobilization, and training management.

### Questionnaire design

The structure of a questionnaire has four parts:

| Part | Content |
| --- | --- |
| **Explanation** | The purpose, importance, and necessity of the study (written for the respondent to read, to win cooperation) |
| **Completion instructions** | Uniform standards for how to fill the form in |
| **Check items** | Quality-control items used for checking (serial number, interviewer's signature, reviewer's signature, and so on) |
| **Survey items** | **Basic information** (background: name, workplace, contact details), **demographic characteristics** (age, sex, marital status, and so on), and **study items** (the main observed indices, the core content) |

**Question format** divides into open and closed:

- **Open-ended**: no restriction at all is placed on the answer. The advantage is that it draws on the
  respondent's initiative and yields rich information; the disadvantages are that answers easily wander
  off the point, it takes longer, it is hard to organize and analyze, and the refusal rate is high.
- **Closed-ended**: two or more options are offered, based on the possible answers to the question. The
  advantages are that the answers are standardized, easy to give, quick, easy to record and summarize,
  and have a low refusal rate; the disadvantages are that respondents easily tick something at random
  and lose accuracy, and it is hard to get information beyond the listed answers.

**Four principles that questions must follow** (these are what separates a good questionnaire from a
bad one):

1. **Simple and clear, avoid jargon, pitch it low rather than high** — when asking about education,
   give concrete levels such as "illiterate / primary school / junior high / senior high or technical
   secondary / university", not a phrase like "years of education" that makes the respondent do the
   arithmetic.
2. **Avoid confusing and vague words** — how long is "often"? It has to be quantified or defined.
   Asking "do you often smoke?" yields nothing usable; asking "in the past 30 days, did you smoke every
   day?" does.
3. **Avoid double-barreled questions** — cramming two things into one question leaves the respondent
   awkward whichever way they answer. For example, if "what is your parents' education?" allows only
   one box to be ticked, someone whose parents differ in education cannot answer.
4. **Avoid leading or coercive questions** — "your sleep has been poor lately, hasn't it?" has already
   fed the answer to the respondent; "how has your sleep been lately?" is neutral.

**The order of the items on the questionnaire** matters too: first it must follow a logical order;
general questions before special ones; easy questions before difficult ones; and **sensitive questions
last**.

**Three techniques for handling sensitive questions**:

- **Shifting the object**: turn "how many times a week do you have sex?" into "some people think a
  normal adult man should have sex 3 times a week, others think once a day; which view do you agree
  with?";
- **The hypothetical approach**: turn "do you agree with the family planning policy?" into "supposing
  population policy placed no limit on childbearing, how many children would you like to have?";
- **The randomized response technique**: a probability device lets the respondent answer without
  revealing their own answer, and it is used for the most sensitive items.

A questionnaire also has to be assessed for **reliability and validity**:

- **Reliability**: when the same measuring instrument is used to measure the same object repeatedly,
  how close the measurements are to their mean. It measures **whether it is steady**.
- **Validity**: how close the observed result is to the goal one is trying to reach; it is a test of
  the effectiveness of the measuring instrument. It measures **whether it is right**.

A good questionnaire requires **both high validity and high reliability**. Note that the two are not
symmetric: high validity generally means high reliability, but high reliability does not imply high
validity — measuring the same wrong thing steadily every time is also a kind of "reliability".

Any survey involving people also has to deal with **medical ethics**: the approval documents of the
ethics committee and the subjects' **informed consent forms** must be provided. Informed consent has
two interconnected parts: the **informed consent document** (setting out the purpose, procedure, and
plan of the study, the potential risks and benefits, and the rights of participants) and the **informed
consent process** (explaining, describing, and communicating, so that the respondent can decide whether
to take part). When a subject lacks legal capacity, consent should be given "by proxy" by a guardian
who has no conflict of interest or emotional conflict with them.

### Bias in surveys and its control

Error in survey research also divides into two kinds: **random error** (unavoidable) and **systematic
error** (that is, **bias**). Bias can arise at every stage of a survey — design, data collection, and
organization and analysis. By stage there are three kinds:

**(1) Selection bias**

Arises because the method of including observational objects is wrong: the objects selected into the
experimental group and the control group differ widely in illness, age, and sex. Inclusion and
exclusion criteria that are laid down unclearly or incorrectly can both cause selection bias. In
descriptive research it shows up mainly as a problem with **the representativeness of the sample** —
the randomization principle is not followed, and particular groups such as volunteers or healthy people
are used instead.

Control measures: draw up the inclusion and exclusion criteria correctly; use stratified sampling —
stratify by characteristics such as illness, immune status, age, and sex, and then allocate the objects
in each stratum to the groups at random in proportion (**only factors that affect the study factor need
stratification; adding strata unreasonably will itself cause bias**); set up the control correctly so
that every object has an equal chance of being selected into either group; and carry out the
randomization principle.

In community trials, to make observation and management easier, **stratified cluster random
allocation** is often used: several local populations with broadly similar conditions are chosen as the
study groups, stratified by some characteristic (such as how heavy the infection rate is), allocated at
random in proportion within each stratum, and one natural village is taken as one experimental or
control group. Here the group is the basic sampling unit, which **requires a larger sample size**.

**(2) Measurement bias**

Bias caused by observing or measuring the research objects during the experiment. Five kinds are common
in experimental studies (especially community trials):

| Name | Mechanism | Consequence |
| --- | --- | --- |
| **Contamination** | Control-group subjects receive the experimental group's treatment | The control group's response rate is raised, which **narrows the difference between groups** |
| **Co-intervention** | The experimental group receives a drug or measure effective for the study factor from outside the experiment | The experimental group's response rate is raised, which **widens the difference between groups** |
| **Compliance / noncompliance** | The subjects do not follow the intervention and the experimental procedure well enough | The effect cannot show fully |
| **Loss to follow-up** | Subjects withdraw from the experiment partway through for various reasons | May **overestimate the efficacy**; the loss-to-follow-up rate should generally not exceed 20% |
| **Interference from psychological factors** | Both clinicians and patients know what the treatment is, which creates a psychological effect | Symptoms such as pain and cough are very easily influenced by subjective factors |

Control measures: **blinding** (the single most important measure against every kind of bias); signing
an experimental contract that makes each side's obligations clear; checking compliance (computing the
ratio of the amount of drug actually taken to the amount that should have been taken, watching for side
effects, or measuring the drug concentration in blood, urine, or saliva); attending to medical ethics —
explaining to patients the pros and cons of taking part and how side effects will be handled, with the
protocol approved by the medical ethics committee; and checking the study records regularly to keep
them complete and accurate.

**(3) Confounding bias**

At the stage of summarizing and analyzing, bias caused by certain non-treatment factors existing at the
same time as the experimental factor and affecting the observed result. The classic example is the
relation between serum triglycerides and coronary heart disease: taken on its own, the data do say "the
higher the triglycerides, the greater the risk of coronary heart disease", but coronary heart disease
is also related to high LDL cholesterol and low HDL cholesterol; once these factors are balanced out by
statistical methods, the association between triglycerides and coronary heart disease disappears. **It
is not sound to conclude from this that triglycerides cause coronary heart disease.**

Control measures: matching and standardization at the design stage; stratified analysis or multivariable
analysis (entering the important confounding factors as covariates) at the analysis stage.

One last piece of advice worth remembering: **the various biases often act at the same time and must be
dealt with together; and even a very complete experimental design can hardly guarantee that the results
are untouched by bias.** So reading the literature and writing conclusions both call for a cautious
attitude, never an absolute one.

### What is special about clinical trials

A **clinical trial** takes patients or healthy people as its research objects, applies certain
interventions (a new drug, a new therapy, and so on), and observes their effects and adverse reactions
in the human body, in order to establish the efficacy and safety of the treatment or drug. Compared
with animal experiments, it has five characteristics:

1. **A prospective study** — the treatment is given first, then efficacy and safety are observed;
2. **Human beings are the research objects** — it must comply with moral principles such as the
   *Declaration of Helsinki*, requires approval from the drug regulatory authority and the medical
   ethics committee, and requires the informed consent of the study subjects or of their family members
   or guardians;
3. **Social factors matter** — people are social beings, and social factors can affect subjects'
   psychological and mental state and bias the results;
4. **Subjective factors matter** — the observers' level of skill, the patients' compliance, and any lack
   of standardization in the treatment all affect the study;
5. **One treatment protocol for all** — clinical care is tailored to the individual, whereas a clinical
   trial uses the same protocol for every research object and must not vary it from person to person.

The basic principles of a clinical trial are **randomization, control, balance, replication, plus
blinding**. The governing standard is **Good Clinical Practice (GCP)**, which lays down explicit
requirements for the trial protocol, the protection of subjects' rights, the responsibilities of
investigators, the recording and reporting of results, statistical analysis and data handling, the
management of the trial drug, quality assurance, and multicenter trials.

A new-drug clinical trial has four phases, and each phase has hard requirements for the number of cases
(for example, at least 100 cases in the treatment arm in phase II, at least 300 in phase III, and at
least 2000 in phase IV). These are regulatory requirements, to be followed as the authorities lay down,
and cannot be arrived at with a statistical formula alone. At the analysis stage, **intention-to-treat
analysis (ITT)** is emphasized — every case that was randomized is analyzed **in the group it was
originally assigned to**, regardless of whether the patient later kept to the treatment, switched
drugs, or dropped out partway: "once randomized, always in the original group", and the data of those
who drop out stay in the analysis just the same. Its counterpart is **per-protocol analysis (PP)** —
only the cases that actually completed treatment according to the original protocol are included, and
anyone who dropped out or switched drugs is removed. ITT is the first choice for the primary analysis
of a clinical trial; PP can only serve as a supporting and sensitivity analysis. The reason is that old
saying of this chapter again: once randomization is complete, the cases that drop out still carry the
information of their random allocation, and removing them at will destroys the balance that
randomization produced.

## Doing it in R

Random allocation and sample size estimation are the only parts of this chapter that really require
hands-on work. One line of R's `sample()` does the random allocation, while `power.t.test()` and
`power.anova.test()` compute the relation among sample size, power, and effect size straight out for
you.

### Random grouping: `set.seed()` + `sample()`

```r
set.seed(2024)                      # fix the random seed: same seed + same code = same grouping

n     <- 30                                              # 30 animals
group <- rep(c("Drug A", "Drug B", "Control"), each = 10)  # three groups of 10, 30 labels in all

id    <- sample(1:n)                                     # shuffle ids 1~30 to get a random order
d     <- data.frame(id = id, group = group)              # attach a label to each shuffled id in turn
d     <- d[order(d$id), ]                                # sort back by id, ready for labeling

head(d, 6)
table(d$group)                       # Drug A / Drug B / Control, 10 each
```

How to read the output:

- `sample(1:n)` returns a **permutation** of `1:30` (it does not sample with replacement, so each id
  appears once and only once). That is the whole substance of random allocation — **shuffle the order
  first, then hand out the labels in that order**.
- `head(d, 6)` gives an allocation table you can execute directly: "id 1 is Drug B, id 2 is Drug A,
  id 4 is Control, …".
- `table(d$group)` confirms that all three groups have 10 cases. Once allocation is done, **do not
  forget to go back and check whether the important non-treatment factors are balanced between the
  groups** (body weight, sex, illness, and so on) — randomization guarantees "equal opportunity", not
  "certain balance", especially in small samples.

`set.seed()` is not decoration. Without a seed, every run of `sample()` gives a different allocation,
the experiment cannot be reproduced, and nobody else can check it. **The value of the seed itself does
not matter; what matters is writing it into the script and into the record.**

### Block randomization: putting "random" into little boxes

```r
set.seed(7)
k   <- 3                              # 3 treatment groups
b   <- 8                              # 8 blocks, each a block of 3 comparable animals

blk <- rep(1:b, each = k)
trt <- as.vector(replicate(b, sample(c("A", "B", "C"))))   # shuffle separately inside each block

d2  <- data.frame(block = blk, treatment = trt)
head(d2, 6)
table(d2$block, d2$treatment)               # exactly one A/B/C in each block
```

The key is `replicate(b, sample(...))`: **each block is shuffled independently**, rather than shuffling
all 24 animals together. The gain is that at any moment the groups have roughly equal numbers of cases,
so an interim analysis or an early stop will not land you in the embarrassing position of "12 in group
A, 4 in group C".

### Paired design: one coin flip inside each pair

```r
set.seed(11)
n_pair <- 10
x1 <- sample(c("Test", "Control"), n_pair, replace = TRUE)   # group of the first in each pair is random
x2 <- ifelse(x1 == "Test", "Control", "Test")                # the second is automatically the opposite

data.frame(pair = 1:n_pair, first = x1, second = x2)
```

Here `sample(..., replace = TRUE)` samples **with replacement** — the decision for each pair is
independent of the others, which is exactly what we want. The second animal in a pair does not need
randomizing again, because if one of a pair goes into the test group, the other must go into the control
group.

### Stratified randomization: stratify first, then randomize within each stratum

```r
set.seed(42)
n   <- 40
sex <- rep(c("Male", "Female"), each = 20)
bw  <- round(rnorm(n, 22, 2), 1)      # body weight: the most common balancing variable in animal work

grp <- character(n)
for (s in c("Male", "Female")) {              # one stratum at a time
  idx      <- which(sex == s)
  idx      <- idx[order(bw[idx])]             # line up by weight inside the stratum
  grp[idx] <- sample(rep(c("Test", "Control"), length.out = length(idx)))
}

d3 <- data.frame(sex = sex, weight = bw, group = grp)
table(d3$sex, d3$group)                       # 10 animals per group in each stratum
tapply(d3$weight, d3$group, mean)             # the two groups' mean weights are almost the same
```

The `for` loop is not superfluous here: **the essence of stratification is "repeat the randomization
once per stratum"**. Lining up by weight inside the stratum and then attaching random labels amounts to
doing the weight-based pairing again within the stratum — this is what stratified balancing looks like
in code.

### Running through the four probability sampling methods

First build a "sampling frame" in code — 1200 students in 24 classes. A real sampling frame is of course
much longer, but the structure is the same.

```r
set.seed(2025)
frame <- data.frame(
  id  = 1:1200,
  cls = rep(1:24, each = 50),                        # 24 classes, 50 students each
  sex = sample(rep(c("Male", "Female"), each = 600)) # half each, shuffled into random order
)

# (1) simple random sampling: draw 100 of the 1200 at random
srs <- frame[sample(nrow(frame), 100), ]

# (2) systematic sampling: interval k = 1200/100 = 12, pick a random start and take every 12th
kk    <- nrow(frame) / 100
start <- sample(kk, 1)
sys   <- frame[seq(start, nrow(frame), by = kk), ]

# (3) stratified sampling: two strata by sex, 50 drawn from each
strat <- frame[unlist(lapply(split(seq_len(nrow(frame)), frame$sex),
                             function(i) sample(i, 50))), ]

# (4) cluster sampling: draw 4 classes at random, every student in them is in the sample
cl <- frame[frame$cls %in% sample(unique(frame$cls), 4), ]

c(simple = nrow(srs), systematic = nrow(sys), stratified = nrow(strat), cluster = nrow(cl))

table(strat$sex)    # stratified sampling: 50 Male, 50 Female -- the sex ratio is "locked in"
table(cl$cls)       # cluster sampling: 4 classes of 50 -- the count is right, but only 4 classes
```

How to read the output:

- The first three methods all give 100 people, while cluster sampling gives **200**. This is exactly
  what "the sample size of cluster sampling has to be scaled up" means in practice: you say "draw 100
  people", and cluster sampling hands you an integer multiple of the cluster size — you do not control
  the number of cases precisely.
- `table(strat$sex)` shows 50 of each sex, which means stratified sampling **actively guarantees** that
  the sex composition matches the population. This is the intuitive source of its smallest sampling
  error.
- `table(cl$cls)` has only 4 classes. Although the total headcount is not small, **the people within
  those 4 classes resemble one another** (classmates have similar family backgrounds and live in
  similar areas), so the information content is far below that of 100 people drawn at random and
  scattered — this is why cluster sampling is the least precise.

While we are here, let the code show you the pitfall of systematic sampling: if the population is
arranged with a **periodic** pattern, drawing at equal intervals is systematically biased.

```r
f2 <- data.frame(id = 1:1200, sex = rep(c("Male", "Female"), times = 600))   # alternating sexes
table(f2$sex[seq(6, 1200, by = 12)])     # even-numbered interval: only one sex is ever drawn
```

If the population roster happens to alternate "Male, Female, Male, Female", an even-numbered interval
will pick only one sex forever. **Before systematic sampling you must look at the sampling frame for a
regular ordering.**

### Sample size: `power.t.test()`

`power.t.test()` has four arguments: `n`, `delta`, `sd`, and `power`. **Give it three and it computes
the fourth** — that is the entire trick to using it.

```r
# Known: the mean difference we want to detect is delta = 0.5, the individual SD is sd = 1,
# two-sided alpha = 0.05
# Asked: how many cases are needed for a power of 0.80
power.t.test(delta = 0.5, sd = 1, sig.level = 0.05, power = 0.80,
             type = "two.sample", alternative = "two.sided")
```

```text
     Two-sample t test power calculation

              n = 63.76576
          delta = 0.5
             sd = 1
      sig.level = 0.05
          power = 0.8
    alternative = two.sided

NOTE: n is number in *each* group
```

**The `NOTE` on the last line must be read**: `n` is the number of cases **per group**, so the two
groups together need 128 cases. This is the easiest thing in this chapter to get wrong — read it as
"64 cases in total" and you have halved your study.

Work it out by hand with the approximation formula from earlier: $n = 2(1.96 + 0.8416)^2 \times 1 /
0.5^2 = 62.8$, rounding to 63 cases. R gives 63.77, because it uses the $t$ distribution rather than
the normal approximation, which comes out slightly larger. **Use the hand calculation to get the order
of magnitude; use software when you write the real protocol.**

For a paired design, just change `type`; here `sd` is the standard deviation of the **differences**:

```r
power.t.test(delta = 0.5, sd = 1, power = 0.80, type = "paired")
# n = 33.37 -- about 34 pairs, far fewer than the 64 per group of a two-sample design
```

This is what "a paired design raises statistical efficiency" looks like in numbers: **for the same
effect size and the same variation, pairing requires far fewer cases**, because pairing subtracts out
the differences between individuals.

### How effect size affects sample size

Pull `delta` all the way from 0.2 to 1.0 and watch how the number of cases per group changes:

```r
delta <- c(0.2, 0.3, 0.5, 0.8, 1.0)
ceiling(sapply(delta, function(d) power.t.test(delta = d, sd = 1, power = 0.8)$n))
# [1] 394 176  64  26  17
```

The right way to read this string of numbers:

- To detect a "small" effect ($\delta/\sigma = 0.2$) you need **nearly 400 cases per group** — which is
  why many small clinical studies are doomed to detect nothing at all;
- The effect size rises only a little and the number of cases falls fast: raising $\delta$ from 0.2 to
  0.5 (2.5 times) drops the number of cases from 394 to 64, about one sixth. Because $n$ is inversely
  proportional to $\delta^2$, multiplying $\delta$ by $k$ divides $n$ by $1/k^2$;
- Conversely, **"shrinking $\sigma$" and "raising $\delta$" are far better value than "recruiting more
  patients"**. Strictly limiting the inclusion criteria so the population is more homogeneous ($\sigma$
  smaller), or designing a stronger intervention ($\delta$ larger), both save a great many cases.

### Power: the relation between $n$ and power

Turn the question around: given a number of cases, how confident can I be?

```r
n_seq <- c(10, 20, 30, 50, 64, 100)
round(sapply(n_seq, function(ni)
  power.t.test(n = ni, delta = 0.5, sd = 1)$power), 3)
# [1] 0.184 0.338 0.478 0.697 0.801 0.940
```

This string of numbers makes two points:

1. **Power rises with the number of cases, but the rise is "fast at first and slow later"**: from 20 to
   30 cases the power gains 0.14, while from 64 to 100 cases it gains the same 0.14 for 36 extra cases.
   Piling on cases beyond a point is not good value.
2. **At n = 10 the power is only 0.18**: meaning that when a difference really exists, this experiment
   has an **82% probability of failing to detect it**. A small-sample study like this concluding "not
   statistically significant" carries almost no information at all — **it can neither prove the
   treatment works nor prove it does not.**

### Replacing σ in the formula with your own data

The $\sigma$ in the formula does not fall from the sky; it has to be estimated from a pilot study or
from existing data. R's built-in datasets are enough to practice the workflow:

```r
sd(mtcars$mpg)      # 6.03 -- suppose some index has roughly this standard deviation between individuals

# To detect a between-group difference of 5 units, how many cases are needed per group?
power.t.test(delta = 5, sd = sd(mtcars$mpg), power = 0.80)
# n = 23.81 -- 24 per group, 48 in the two groups together
```

In real work, $\sigma$ should come from a pilot study or the literature on **the same index and the same
kind of population**, not from some dataset picked at random. This only demonstrates the workflow:
**fix $\delta$ → estimate $\sigma$ → fix $\alpha$ and power → solve for $n$**.

### Comparing several groups: `power.anova.test()`

More than two groups calls for analysis of variance, and the corresponding function is
`power.anova.test()`. Its arguments are not called `delta`/`sd` but `between.var` (the **between-group**
variance, that is, the variance of the group means) and `within.var` (the **within-group** variance,
that is, the variance of individual variation).

```r
# 3 treatment groups, expected population means 0 / 0.5 / 1.0, individual SD sigma = 1
mu <- c(0, 0.5, 1.0)

# With 25 cases per group, what is the power?
power.anova.test(groups = 3, n = 25, between.var = var(mu),
                 within.var = 1, sig.level = 0.05)
# power = 0.883

# The other way round: for a power of 0.80, how many cases per group?
power.anova.test(groups = 3, power = 0.80, between.var = var(mu),
                 within.var = 1, sig.level = 0.05)
# n = 20.30 -- 21 per group, 63 in the three groups together
```

Now sweep through the relation between the number of cases and power once more:

```r
n_a <- c(10, 20, 30, 40, 60)
round(sapply(n_a, function(ni) power.anova.test(groups = 3, n = ni,
        between.var = var(mu), within.var = 1)$power), 3)
# [1] 0.458 0.793 0.936 0.983 0.999
```

Two practical points:

- What is passed to `between.var` is **the variance of the means**, `var(mu)`, not the range of the
  means or the largest difference between them. This is the argument people get wrong most often.
- `power.anova.test()` only handles **balanced designs with equal numbers in each group**. If your
  design has unequal numbers, **you must never take the largest group's number of cases as a
  "conservative estimate" — that overestimates the power**, because substituting the largest group's
  $n$ into the formula amounts to pretending every group is that large. Take three groups with 10, 20,
  and 30 cases, $\mu = (0,\,0.5,\,1)$, and $\sigma = 1$ (that is, `between.var = 0.25`,
  `within.var = 1`): a simulation repeated 20000 times gives an observed power of about 0.71 (run
  20000 times with each of 5 different random seeds, and the results all lie between 0.709 and 0.713);
  whereas `power.anova.test(n = 30)` gives 0.936, overestimating by about 0.22; taking the smallest,
  10, is on the conservative side instead (0.458); and taking the harmonic mean, 16.36, comes closest
  to what is observed (0.698). So there are three correct approaches: take **the smallest group** (on
  the conservative side), take **the harmonic mean** (closer to reality), or use a tool that accepts
  unequal numbers directly (such as `pwr.t2n.test()` from the `pwr` package when comparing two groups);
  you can also estimate power directly by simulation (run `replicate()` + `aov()` many times and count
  how often $P \lt 0.05$).

The complete methods of sample size estimation — including the formulas and software implementations
for comparing rates, paired designs, randomized blocks, and the various other settings — are **covered
in Chapter 17**; factorial designs, survival analysis, and similar settings are not covered in this
course and need other sources. The goal of this section is only to build the idea that "sample size can
be computed, and it is tied to $\alpha$, $\beta$, $\sigma$, $\delta$, and the design type".

## Common pitfalls

- **Mistaking "allocating in order" for "allocating at random".** Allocation by order of consultation,
  order of admission, or the odd/even of a hospital number is not random allocation. The time at which
  patients come for consultation is itself clustered — the people who come during one period may be on
  the whole more severely ill and those who come during another on the whole less so, so the two groups
  end up unbalanced in important non-treatment factors. Likewise, "letting the doctor decide from
  experience" and "letting the patient choose" are not random either. **There is only one definition of
  random: every object has an equal chance of being assigned to either group, and that chance is
  determined by a probability mechanism.**
- **A control chosen that does not match the aim of the experiment.** If the question is "is the
  combination of drug A + drug B better than drug A alone?" and the control is set to "an unrelated drug
  C", then no matter how good the control is, it cannot answer the research question — the right
  control is "drug A + placebo". Another three things must be kept apart: **no control** (only a trial
  group, which demonstrates nothing), **insufficient control** (studying two factors without a
  single-factor group, so the interaction cannot be taken apart), and **excess control** (comparing two
  drugs both already shown to be effective while still adding a placebo group, which is superfluous and
  violates ethics).
- **Replacing a parallel control with self-control and mistaking a time trend for efficacy.** The
  argument "blood pressure fell after the medication, so the drug works" ignores the fact that blood
  pressure may change with time, diet, mood, or season anyway. Self-control is simple and easy, but
  where different treatments are given at different stages **the time factor cannot be ruled out**, so a
  parallel external control usually has to be added as well (or the design changed to a cross-over,
  using the other group's reversed sequence to cancel the time effect).
- **Running a $t$ test at every time point on repeated-measurement data.** This is the classic wrong
  choice of analysis method. The same people are measured at 5 time points, and the data at the 5 time
  points are **not independent of one another** (one person's values are naturally correlated over
  time), whereas the $t$ test assumes exactly independence. Testing point by point also inflates false
  positives through multiple comparisons, and it answers neither "does time have an effect?" nor "is
  there an interaction between treatment and time?" — the two questions a repeated-measures design
  exists to answer. The right method is **analysis of variance for repeated-measurement data** (mind
  the sphericity assumption).
- **Reading $P \gt 0.05$ as "there is no difference between the two groups".** $P \gt 0.05$ only says
  that "with this batch of data, there is not enough evidence to consider the two groups different".
  If the power is only 0.18, that "no evidence" amounts to almost nothing having been done. When
  writing conclusions you should report **the effect size with its confidence interval** and **the
  power** together; the answer to "how many cases are enough?" should come from `power.t.test()`, not
  from "recruiting more can't hurt" — too many cases waste resources and can even turn a tiny
  difference with no clinical meaning into a "statistically significant" one.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 7 of *Introduction to Information Technology*, Branches and Loops](/en/intro-it/7-branches-and-loops)**
  — the randomization in this section is, in code, simply the combination **"a loop + `sample()`"**.
  That lecture covers how to write a `for` loop and how to branch with `if/else`, and this page's
  stratified randomization, `for (s in c("Male", "Female")) { ... }`, is using exactly that: **the loop
  handles "repeat the same randomization once per stratum", and `sample()` handles "produce that random
  result"**. The `replicate(b, sample(...))` in block randomization is another way of writing a loop
  (implicit repetition $b$ times), with exactly the same effect. Get comfortable with the loops in that
  lecture first, and the code here is nothing but statistical concepts translated into it.
- **[Lecture 8 of *Introduction to Information Technology*, User-Defined Functions](/en/intro-it/8-custom-functions)**
  — this page says "$\sigma$ has to come from a pilot study" and "when power is insufficient the
  conclusion is weak", and the most direct way to test those claims is to **write a simulation
  function**: use `rnorm()` to generate two groups of data, randomize the groups, run `t.test()`, repeat
  a few thousand times, and count whether the proportion detected as significant equals the power
  `power.t.test()` gives. The function definition, arguments, and return values covered in that lecture
  are the entire prerequisite for writing that simulator.
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)**
  — for the relation among $\alpha$, $\beta$, power, and sample size on this page, that lecture offers
  the other side of the view: there the work is computing a $t$ statistic in R, looking up the $P$
  value, and drawing a conclusion; here the subject is **whether the test is capable of drawing a
  conclusion at all before you draw one**. The difference between $\alpha$ and $\beta$ and the choice
  between one- and two-sided tests are two sides of one and the same thing.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)**
  — "the basic content and steps of survey design" on this page includes the "plan for organizing and
  analyzing the data", and that week is where this step is carried out by hand: how attribute columns
  are handled (dropping columns with `subset`, converting variable types), how numeric variables are
  binned (equal width / equal frequency), and how min-max and Z-score standardization are computed. The
  correspondence is: **this page lays down which organizing actions are performed once the
  questionnaires come back, and that week writes those actions as code**. Finding and removing missing
  values belongs to Week 1 instead
  ([Week 1, Using R and Getting Data](/en/Medical-Big-Data-Analysis/1-r-basics-and-data)). Conversely,
  the quality ceiling of every dataset that week handles is set by the design stage of this chapter.
- **[Week 8 of *Medical Big Data Analysis and Decision Making*, Neural Networks](/en/Medical-Big-Data-Analysis/8-neural-networks)**
  — that week splits the data into a **training set and a validation set** (sometimes with a test set as
  well), which is essentially **one random allocation**, and a direct application of this chapter's
  randomization principle: the split must be random, or the training and validation sets will not be
  comparable in data distribution and the performance estimated from them is meaningless. You also meet
  the "fix the random seed" problem there — `set.seed()` does the same job here as in machine learning:
  **it makes one random split reproducible and checkable**. There is a shared pitfall too: when the
  classes are imbalanced you have to split by stratified sampling, which is this chapter's "stratified
  randomization".
- **[Week 5 of *Medical Big Data Analysis and Decision Making*, Classification (Part 1)](/en/Medical-Big-Data-Analysis/5-classification-1)**
  — the cross-validation of that week can be seen as the efficiency version of this chapter's
  "replication" principle: taking turns to use each part of the data as the validation set amounts to
  carrying out several independent validations on the same batch of data, which brings down the
  variation in the performance estimate (corresponding to this chapter's sampling error). Understand
  "replication is there to let the statistical regularity come into view" and you understand why
  cross-validation has folds.
:::

<!-- Back-link suggestions
It is suggested that these pages link back here (all pointing at
/Health-statistics/03-study-design, or at /en/Health-statistics/03-study-design once translated):
- /intro-it/7-branches-and-loops, where "doing repetitive work with loops" or the general exercises are
  discussed: add a sentence "for randomization by a loop + sample(), and what it means statistically,
  see Health Statistics, Chapter 3".
- /intro-it/8-custom-functions, where "wrapping repeated logic in a function" is discussed: add a
  sentence "for writing a simulation as a function to verify power, see Health Statistics, Chapter 3".
- /intro-it/13-hypothesis-testing, in "Summary of this lecture": add a sentence "for the relation of
  alpha and beta to power and sample size, see Health Statistics, Chapter 3".
- /Medical-Big-Data-Analysis/2-data-preprocessing, at the places about organizing/preprocessing data:
  add a sentence "why the split has to be random and why the random seed is fixed, see Health
  Statistics, Chapter 3".
- /Medical-Big-Data-Analysis/8-neural-networks, where the training/validation split is discussed: add a
  sentence "for the statistical basis of a random split (the randomization principle, stratified
  randomization), see Health Statistics, Chapter 3".
- /Medical-Big-Data-Analysis/5-classification-1, where cross-validation is discussed: add a sentence
  "for the relation between the replication principle and cross-validation, see Health Statistics,
  Chapter 3".
-->

## Summary

1. **Experimental design is the one step that "must be got right in advance".** Medical research divides
   into survey research (observational), experimental research, and literature research. Two features
   distinguish an experimental study: the researcher can set the study factor artificially, and which
   treatment a subject receives is decided at random; survey research has neither, and can only control
   confounding through design.
2. **The three elements are the study factor, the study subjects, and the experimental effect.** The
   study factor calls for seizing the main factors, telling study factors from non-treatment factors,
   and standardizing, while watching out for **confounding factors** (controlled by exclusion,
   balancing, or standardization); the study subjects are defined by three layers of written criteria —
   **diagnostic criteria → inclusion criteria → exclusion criteria** — and must satisfy sensitivity,
   specificity, stability, homogeneity, compliance, and economy; the experimental effect is expressed
   through indices, and the indices must be **objective, sensitive, exact (accuracy + precision),
   specific, and relevant**, with **blinding** used against bias in observation.
3. **The four principles are control, randomization, replication, and balance.** Control has six forms —
   blank, placebo, standard, experimental, self, and mutual — and the common errors are no control,
   insufficient control, and excess control; randomization includes random sampling, random allocation,
   and randomization of the experimental order, and is carried out by simple, block, or stratified
   randomization; replication mainly means that the number of independent repetitions must be
   sufficient; and balance, that is like-with-like comparison, is the most easily overlooked and the
   most important of the four.
4. **Sample size is jointly determined by $\alpha$, $\beta$, $\sigma$, $\delta$, and the design type.**
   $n$ is proportional to $\sigma^2$ and inversely proportional to $\delta^2$, and the higher the power
   required and the smaller $\alpha$, the larger $n$. Power $= 1-\beta$, conventionally required to be
   no lower than 0.80. **$P \gt 0.05$ only supports "no difference was detected"; when the power is
   insufficient it does not support "there is no difference".** The complete method is in Chapter 17.
5. **The logic for choosing a common design type:** one factor only and matching impossible → completely
   random design; subjects can be paired into pairs of similar condition → paired design; blocks can be
   delimited by condition and there are $\ge 3$ comparison groups → randomized block design; a chronic
   disease where the influence of individual differences must be reduced → cross-over design; the
   interactions of several factors must be analyzed → factorial design; the same object observed at
   several time points → repeated-measures design (do not compare time points with a $t$ test).
6. **The two main threads of survey design are sampling and controlling bias.** For sampling, remember
   the procedure, advantages, and disadvantages of the four probability sampling methods, and **the
   order of sampling error: stratified $\lt$ systematic $\lt$ simple random $\lt$ cluster** (cluster
   sampling therefore needs a larger sample size, and multistage sampling is a combination of them).
   Bias divides into selection bias, measurement bias (contamination, co-intervention, noncompliance,
   loss to follow-up), and confounding bias, controlled respectively by clear inclusion and exclusion
   criteria with randomization, by blinding and compliance checks, and by matching and
   stratified/multivariable analysis. Questionnaire design keeps to the four principles of questioning
   (simple, unambiguous, not double-barreled, not leading) and to "sensitive questions last".
7. **In R, this chapter comes down to four things**: reproducible random allocation with `set.seed()` +
   `sample()` (along with the block, paired, and stratified variants); the four probability sampling
   methods implemented by subsetting with indices; `power.t.test()` to "give three and solve for the
   fourth" among `n`/`delta`/`sd`/`power`; and `power.anova.test()` for comparing several groups (note
   that `between.var` takes **the variance of the means**).
