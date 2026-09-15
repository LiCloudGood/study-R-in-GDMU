/**
 * 统计方法选择器：规则表 → 生成产物（中英双语）
 *
 *   1. docs/.vitepress/theme/selector-data.ts      交互问答的题库（中文，组件直接 import）
 *   2. docs/.vitepress/theme/selector-data-en.ts   交互问答的题库（英文，同一个组件 import）
 *   3. _dev/selector-tree.json                     同一份数据的副本，方便查看（不入库）
 *   4. _dev/selector-tree-en.json                  同上，英文版
 *   5. _dev/selector-table.md                      决策速查表（中文，贴进 choice.md，不入库）
 *   6. _dev/selector-table-en.md                   决策速查表（英文，贴进 en/choice.md，不入库）
 *
 * 用法：在仓库根目录跑
 *     node scripts/generate-selector.mjs
 *
 * 这样做的好处：交互流程和速查表出自**同一份规则**，
 * 不可能出现「图里说的和实际逻辑不一致」这种学术性问题。
 * 所以 selector-data.ts 标了「请勿手改」，要改就改这里的规则表再重跑。
 *
 * ── 双语约定（加英文版时立的）──────────────────────────
 *   - **逻辑只有一份**：分支结构、跳转编号 `next`、条件数组的长度、方法归属，
 *     中英文共用同一份结构 —— 整个题库由 buildTree(lang) 用同一个函数跑两遍，
 *     唯一的语言分支在 pick() 里。所以绝不可能出现
 *     「中文规则里有的分支英文规则里没有」。
 *   - **文案按语言分开**：所有面向读者的文字都用 T(中文, 英文) 包起来，两句一一对应。
 *     T() 少给一个语言、或者两边的数组长度对不上，**直接抛错退出** ——
 *     不静默拿中文兜底：兜底会让英文页里悄悄混进中文，比报错难查得多。
 *   - 术语一律照 scripts/术语对照表.md，表里没有的先补进表再翻。
 *   - R 代码本身不改，只把中文注释译成英文注释；数值、阈值、例数一个都不许动。
 *     代码里给读者看的字符串字面量（xlab、levels 这类）按术语表 §1.2 也译成英文，
 *     函数名、参数名、变量名一律不译。
 *   - 英文结论底部的章节链接按**翻译进度自动选**（见 chapterTarget()）：
 *     那一章的英文页翻好了就指 /en/，还没翻就仍指中文页、并在章名后加 (Chinese)。
 *     判断是生成时读文件系统做的，翻译好一批重跑一次就自动跟过去，不用手工维护表。
 *
 * ⚠️ 学术约定（写规则时必须守住）：
 *   - 只推荐本课程 17 章覆盖到的方法，超出范围的明确写「本课程未覆盖」
 *   - 不写「A 或 B」这种把选择推回给用户的结论
 *   - 「分布」不作为必须回答的问题，只作为「不确定就用更稳的那条路」的分支
 *
 * ⚠️ 数据结构约定：规则表里为了写起来短，用 `m` 表示方法名、`c` 表示
 * [章名, 链接] 数组；但写进 TS 模块的 interface 用的是 `method` 和
 * `c: {text, link}`，组件按 interface 取值。两侧由下面的 normalizeResult()
 * 在唯一出口处对齐 —— 之前那次「选完不出答案」就是这里没对齐：
 * 组件取 result.c.link 拿到 undefined，传给 withBase() 抛 TypeError，
 * 整块结果渲染失败，页面上只剩空白。
 */
import fs from 'node:fs'
import path from 'node:path'

// ── 双语文案的基本工具 ─────────────────────────────────
/**
 * 把「中文原文 + 英文译文」配成一对。
 *
 * 这里故意做得比需要的严格：缺英文、英文是空串、或者两边的数组长度对不上，
 * 都当场抛错。规则表是给读者看的**医学统计**结论，英文版少一条条件、
 * 少一个坑，读者就少一层保护 —— 这种事必须让生成器停下来，不能糊过去。
 */
function T(zh, en) {
  checkPair(zh, en)
  return { zh, en }
}

function checkPair(zh, en, where = '') {
  if (Array.isArray(zh) || Array.isArray(en)) {
    if (!Array.isArray(zh) || !Array.isArray(en)) {
      throw new Error(`双语结构不一致${where}：一边是数组另一边不是`)
    }
    if (zh.length !== en.length) {
      throw new Error(`双语文案条数不一致${where}：中文 ${zh.length} 条，英文 ${en.length} 条`)
    }
    zh.forEach((v, i) => checkPair(v, en[i], `${where}[${i}]`))
    return
  }
  if (typeof zh !== 'string' || typeof en !== 'string') {
    throw new Error(`双语文案必须是字符串${where}：zh=${JSON.stringify(zh)} en=${JSON.stringify(en)}`)
  }
  // 两边都空是允许的（有些结果是故意留空的，比如「本课程没覆盖」没有 R 代码）；
  // 但只要中文有内容而英文空着，就当缺译文处理 —— 这正是要卡住的那种情况。
  if (zh.trim() && !en.trim()) {
    throw new Error(
      `双语文案缺少英文${where}（英文版不许静默用中文兜底）：${JSON.stringify(zh)}`
    )
  }
  if (!zh.trim() && en.trim()) {
    throw new Error(`双语文案只有英文没有中文${where}：${JSON.stringify(en)}`)
  }
}

/** 取出某一种语言的文案（递归，数组和嵌套结构都照做） */
function pick(v, lang) {
  if (Array.isArray(v)) return v.map((x) => pick(x, lang))
  if (v && typeof v === 'object' && 'zh' in v && 'en' in v) {
    return pick(v[lang], lang)
  }
  return v
}

// ── 章节链接（17 章 + 2 个补充专题）────────────────────
// slug 同时对应 docs/Health-statistics/<slug>.md 和 docs/en/Health-statistics/<slug>.md
const CH = {
  desc: { slug: '04-describing-quantitative-data', zh: '第 4 章 定量资料的统计描述', en: 'Chapter 4. Describing Quantitative Data' },
  descQ: { slug: '05-describing-qualitative-data', zh: '第 5 章 定性资料的统计描述', en: 'Chapter 5. Describing Qualitative Data' },
  est: { slug: '06-estimation', zh: '第 6 章 总体均数与总体率的估计', en: 'Chapter 6. Estimating Population Means and Rates' },
  test: { slug: '07-hypothesis-testing', zh: '第 7 章 假设检验', en: 'Chapter 7. Hypothesis Testing' },
  t: { slug: '08-t-test', zh: '第 8 章 t 检验', en: 'Chapter 8. t Tests' },
  anova: { slug: '09-anova', zh: '第 9 章 方差分析', en: 'Chapter 9. Analysis of Variance' },
  chi: { slug: '10-chi-square', zh: '第 10 章 卡方检验', en: 'Chapter 10. Chi-Square Tests' },
  np: { slug: '11-nonparametric', zh: '第 11 章 非参数检验与秩和检验', en: 'Chapter 11. Nonparametric and Rank-Based Tests' },
  biv: { slug: '12-bivariate-association', zh: '第 12 章 双变量关联性分析', en: 'Chapter 12. Bivariate Association' },
  reg: { slug: '13-linear-regression', zh: '第 13 章 直线回归', en: 'Chapter 13. Simple Linear Regression' },
  surv: { slug: '14-survival-analysis', zh: '第 14 章 生存分析', en: 'Chapter 14. Survival Analysis' },
  size: { slug: '17-sample-size', zh: '第 17 章 样本含量估计', en: 'Chapter 17. Sample Size Estimation' },
  chart: { slug: '19-tables-and-charts', zh: '第 19 章 常用统计图表', en: 'Chapter 19. Statistical Tables and Charts' },
  design: { slug: '03-study-design', zh: '第 3 章 实验设计与调查设计', en: 'Chapter 3. Experimental and Survey Design' },
  // 补充专题（不在课本 19 章里，是本站补的）
  diag: { slug: 'diagnostic-test', zh: '诊断试验评价（ROC 与 AUC）', en: 'Diagnostic Test Evaluation (ROC and AUC)' },
  agree: { slug: 'agreement-reliability', zh: '一致性信度（Kappa 与 ICC）', en: 'Agreement and Reliability (Kappa and ICC)' }
}
const ch = ([text, link]) => ({ text, link })

/**
 * 英文页翻译好了没有 —— 直接看文件系统：
 * `docs/en/Health-statistics/<slug>.md` 存在、而且里面不含 "not translated yet"。
 *
 * 为什么要自动判断而不是手工维护一张表：英文翻译是一批一批推进的，
 * 手工表一定会忘。翻译好一章、重跑一次生成脚本，链接就自动过去了。
 */
function enPageTranslated(slug) {
  const p = path.join('docs', 'en', 'Health-statistics', `${slug}.md`)
  try {
    return !fs.readFileSync(p, 'utf8').includes('not translated yet')
  } catch {
    return false // 英文页还没有 → 仍然指中文页
  }
}

/**
 * 章节链接目标：按该章英文页的翻译进度自动选。
 *   - 翻好了 → /en/Health-statistics/<slug>，章名用英文章名
 *   - 没翻好 → 仍指 /Health-statistics/<slug>，章名后加 " (Chinese)"，
 *              让读者知道点过去是中文，而不是干脆断链（照术语表 §15.4）
 */
function chapterTarget(key) {
  const c = CH[key]
  const zhLink = `/Health-statistics/${c.slug}`
  if (enPageTranslated(c.slug)) {
    return T([c.zh, zhLink], [c.en, `/en/Health-statistics/${c.slug}`])
  }
  return T([c.zh, zhLink], [`${c.en} (Chinese)`, zhLink])
}

/** 描述性统计（不需要假设检验） */
const DESCRIPTIVE = {
  quantitative: {
    m: T('均数 ± 标准差，或 中位数（四分位数间距）', 'Mean ± SD, or median (IQR)'),
    why: T(
      '描述一批定量数据的**平均水平**和**离散程度**。',
      'Describes the **average level** and the **spread** of a batch of quantitative data.'
    ),
    cond: T(
      ['指标是定量变量', '没有分组比较的打算，只是描述'],
      ['The variable is quantitative', 'No group comparison is intended — you only want to describe']
    ),
    note: T(
      '**选哪个看分布**：大致对称、没有极端值 → 均数 ± 标准差；明显偏态或有极端值 → 中位数（四分位数间距）。两个都报也可以。',
      '**Which one to use depends on the distribution**: roughly symmetric with no extreme values → mean ± SD; clearly skewed or with extreme values → median (IQR). Reporting both is also acceptable.'
    ),
    code: T(
      `mean(x); sd(x)                  # 均数 ± 标准差
median(x); IQR(x)               # 中位数（四分位数间距）
quantile(x, c(0.25, 0.5, 0.75)) # 三个四分位数`,
      `mean(x); sd(x)                  # mean ± SD
median(x); IQR(x)               # median (interquartile range)
quantile(x, c(0.25, 0.5, 0.75)) # the three quartiles`
    ),
    read: T(
      ['均数与中位数差得远 → 分布偏态，优先报中位数', '标准差比均数还大 → 数据很散，或存在极端值'],
      [
        'If the mean and the median are far apart → the distribution is skewed, so report the median first',
        'If the SD is larger than the mean → the data are very spread out, or extreme values are present'
      ]
    ),
    pit: T(
      ['用均数 ± 标准差描述明显偏态的资料 —— 会掩盖真实分布', '只报平均数不报离散程度'],
      [
        'Using mean ± SD to describe clearly skewed data — this hides the real distribution',
        'Reporting only the average and not the spread'
      ]
    ),
    c: chapterTarget('desc')
  },
  binary: {
    m: T('频数 + 率（构成比）', 'Frequency + rate (proportion)'),
    why: T('描述一个二分类指标的**发生频率**。', 'Describes the **frequency of occurrence** of a binary variable.'),
    cond: T(
      ['指标只有两类', '分母是「有可能发生」的观察单位总数'],
      [
        'The variable has only two categories',
        'The denominator is the total number of observational units in which the event could occur'
      ]
    ),
    note: T(
      '分子是发生例数，分母是**全部**观察单位 —— 不是"没发生的例数"。',
      'The numerator is the number of cases in which the event occurred, and the denominator is **all** observational units — not “the number of cases in which it did not occur”.'
    ),
    code: T(
      `table(d$outcome)
prop.table(table(d$outcome)) * 100   # 百分比`,
      `table(d$outcome)
prop.table(table(d$outcome)) * 100   # percentage`
    ),
    read: T(
      ['检查分母对不对 —— 率的分母必须是可能发生该事件的人数'],
      ['Check that the denominator is right — the denominator of a rate must be the number of people in whom the event could occur']
    ),
    pit: T(
      ['把构成比当率用 —— 见第 5 章那张「率与构成比」对照表'],
      ['Using a proportion as if it were a rate — see the “rate versus proportion” comparison table in Chapter 5']
    ),
    c: chapterTarget('descQ')
  },
  categorical: {
    m: T('频数 + 构成比', 'Frequency + proportion'),
    why: T('描述一个多分类指标的**各部分占比**。', 'Describes the **share of each part** of a multi-category variable.'),
    cond: T(['指标是分类变量（无序或有序）'], ['The variable is categorical (nominal or ordinal)']),
    note: T(
      '**构成比之和必定是 100%**，各部分是此消彼长的关系，不能拿它当"发生率"用。',
      '**The proportions must add up to 100%**, and the parts trade off against one another, so a proportion cannot be used as an “occurrence rate”.'
    ),
    code: T(
      `table(d$type)
prop.table(table(d$type)) * 100`,
      `table(d$type)
prop.table(table(d$type)) * 100`
    ),
    read: T(
      ['各部分加起来应是 100%，对不上说明分母搞错了'],
      ['The parts should add up to 100%; if they do not, the denominator is wrong']
    ),
    pit: T(
      ['有序分类还应该**按顺序**排列水平，不然看不出轻重趋势'],
      ['For ordinal data the levels should also be arranged **in order**, otherwise the trend from mild to severe is invisible']
    ),
    c: chapterTarget('descQ')
  }
}

/** 检验类结果 */
const R = {
  oneT: {
    m: T('单样本 t 检验', 'One-sample t test'),
    why: T(
      '一组定量数据，和**一个已知的标准值**比平均水平。',
      'One set of quantitative measurements, compared with **a known standard value**.'
    ),
    cond: T(
      ['只有一组对象', '指标是定量变量', '数据近似正态；样本量小（n < 40）时必须较严格地满足'],
      [
        'There is only one group of subjects',
        'The variable is quantitative',
        'The data are approximately normal; with a small sample (n < 40) this must hold fairly strictly'
      ]
    ),
    code: T(
      `t.test(x, mu = 170)      # 170 换成你要比较的标准值`,
      `t.test(x, mu = 170)      # replace 170 with the standard value you are comparing against`
    ),
    read: T(
      ['`t` 与 `df`（自由度 = n − 1）', '`p-value`：与检验水准 α 比', '`conf.int`：均数与标准值之差的 95% 可信区间'],
      [
        '`t` and `df` (degrees of freedom = n − 1)',
        '`p-value`: compare it with the significance level α',
        '`conf.int`: the 95% confidence interval for the difference between the mean and the standard value'
      ]
    ),
    pit: T(
      ['把「不拒绝 H₀」说成「证明总体均数等于该标准值」—— 只能说没找到差别', '大样本时 p 值很小可能只是样本量大，要看均数差的实际大小'],
      [
        'Saying “the population mean equals the standard value” when you only failed to reject H₀ — you can only say that no difference was found',
        'With a large sample a small p value may only reflect the sample size, so look at the actual size of the mean difference'
      ]
    ),
    c: chapterTarget('t')
  },
  oneW: {
    m: T('Wilcoxon 符号秩检验（单样本）', 'Wilcoxon signed-rank test (one sample)'),
    why: T(
      '一组定量数据与已知标准值比较，但数据**偏离正态、或有极端值、或样本量很小**。',
      'One set of quantitative measurements compared with a known standard value, but the data **depart from normality, or contain extreme values, or come from a very small sample**.'
    ),
    cond: T(
      ['只有一组对象', '指标是定量变量，但正态性不成立'],
      ['There is only one group of subjects', 'The variable is quantitative, but normality does not hold']
    ),
    note: T(
      '不要求正态分布，代价是**检验效能略低**（同样的差别，需要更多样本才能发现）。',
      'Normality is not required; the price is **slightly lower power** (the same difference needs a larger sample to be detected).'
    ),
    code: T(
      `wilcox.test(x, mu = 170)   # 170 换成你要比较的标准值`,
      `wilcox.test(x, mu = 170)   # replace 170 with the standard value you are comparing against`
    ),
    read: T(
      ['`V` 是正差值的秩和', '`p-value`：与 α 比', '看 `median(x)` 而不是均数，和非参数方法更配套'],
      [
        '`V` is the sum of ranks of the positive differences',
        '`p-value`: compare it with α',
        'Look at `median(x)` rather than the mean — it goes better with a nonparametric method'
      ]
    ),
    pit: T(
      ['数据其实接近正态时也用它 —— 白白损失效能', '有大量相同数值（结）时 R 会提示，不要当报错'],
      [
        'Using it even when the data are in fact close to normal — power is lost for nothing',
        'When there are many tied values R prints a warning; do not read it as an error'
      ]
    ),
    c: chapterTarget('np')
  },
  oneBin: {
    m: T('二项检验', 'Binomial test'),
    why: T('一个二分类指标，和**一个已知的发生率**比。', 'One binary variable compared with **a known rate**.'),
    cond: T(
      ['指标只有两类', '要检验的是「发生率是否等于某个值」'],
      ['The variable has only two categories', 'The question is whether the rate equals a particular value']
    ),
    code: T(
      `binom.test(45, 200, p = 0.30)   # 45/200 换成你的例数，0.30 换成已知率`,
      `binom.test(45, 200, p = 0.30)   # replace 45/200 with your counts and 0.30 with the known rate`
    ),
    read: T(
      ['`p-value` 是精确法的结果，比正态近似的更可靠', '`conf.int` 是率的可信区间 —— 样本量小的时候区间会很宽，这正是重点'],
      [
        '`p-value` comes from the exact method and is more reliable than the normal approximation',
        '`conf.int` is the confidence interval for the rate — with a small sample it is wide, and that is exactly the point'
      ]
    ),
    pit: T(
      ['样本量小时用正态近似算率的可信区间，可能算出负数下限 —— 应该用精确法'],
      [
        'Using the normal approximation for the confidence interval of a rate with a small sample can give a negative lower limit — the exact method should be used'
      ]
    ),
    c: chapterTarget('est')
  },
  oneChi: {
    m: T('拟合优度卡方检验', 'Goodness-of-fit chi-square test'),
    why: T(
      '一个多分类指标，看各类的**实际频数**是否偏离某个理论分布。',
      'One multi-category variable: whether the **observed frequencies** depart from a theoretical distribution.'
    ),
    cond: T(
      ['指标是多分类变量', '每一类的理论频数 T ≥ 5（否则要合并类别）'],
      [
        'The variable has several categories',
        'The expected frequency T is ≥ 5 in every category (otherwise categories must be combined)'
      ]
    ),
    code: T(
      `chisq.test(table(d$type), p = c(0.5, 0.3, 0.2))   # 换成你假设的构成比，个数要等于类别数`,
      `chisq.test(table(d$type), p = c(0.5, 0.3, 0.2))   # replace with your hypothesized proportions; their number must equal the number of categories`
    ),
    read: T(
      ['`X-squared` 与 `df`（自由度 = 类别数 − 1）', '`p-value`：与 α 比'],
      [
        '`X-squared` and `df` (degrees of freedom = number of categories − 1)',
        '`p-value`: compare it with α'
      ]
    ),
    pit: T(
      ['理论频数太小还硬算 —— R 会警告，这时要合并类别'],
      ['Forcing the calculation when the expected frequencies are too small — R warns, and the categories then have to be combined']
    ),
    c: chapterTarget('chi')
  },
  pairT: {
    m: T('配对样本 t 检验', 'Paired t test'),
    why: T(
      '同一批对象测了两次（或配对的两个部位），比较两次的**差值**是否为 0。',
      'The same subjects measured twice (or two paired sites), to test whether the **difference** between the two measurements is 0.'
    ),
    cond: T(
      ['两组数据一一配对', '**差值**近似正态（不是两次测量各自正态）'],
      [
        'The two sets of measurements are paired one to one',
        'The **differences** are approximately normal (not each of the two measurements separately)'
      ]
    ),
    note: T(
      '本质是「把差值当成一组数据做单样本 t 检验」，所以自由度是**对子数 − 1**，不是总测量次数 − 2。',
      'In essence the differences are treated as one set of data and a one-sample t test is run on them, so the degrees of freedom are **the number of pairs − 1**, not the total number of measurements − 2.'
    ),
    code: T(
      `t.test(x, y, paired = TRUE)      # 两个等长向量
# 注意：t.test(y ~ g, data = d, paired = TRUE) 会直接报错
#      公式写法只按两独立样本解释，配对必须传两个向量`,
      `t.test(x, y, paired = TRUE)      # two vectors of equal length
# Note: t.test(y ~ g, data = d, paired = TRUE) returns an error
#      the formula interface is only interpreted as two independent samples,
#      so paired data must be passed as two vectors`
    ),
    read: T(
      ['`df` = 对子数 − 1', '`mean of the differences` 是平均差值 —— 比 p 值更该看', '`conf.int` 是平均差值的 95% 可信区间'],
      [
        '`df` = number of pairs − 1',
        '`mean of the differences` is the mean difference — more worth looking at than the p value',
        '`conf.int` is the 95% confidence interval for the mean difference'
      ]
    ),
    pit: T(
      ['**把配对设计当成组检验** —— 最常见也最伤，p 值会偏大、结论可能反转', '用配对 t 检验却没有配对关系'],
      [
        '**Treating a paired design as an independent-groups comparison** — the most common and the most damaging mistake; the p value comes out too large and the conclusion may reverse',
        'Using a paired t test when there is no pairing'
      ]
    ),
    c: chapterTarget('t')
  },
  pairW: {
    m: T('Wilcoxon 符号秩检验（配对）', 'Wilcoxon signed-rank test (paired)'),
    why: T(
      '配对数据，但**差值的分布明显不正态**。',
      'Paired data, but **the distribution of the differences is clearly non-normal**.'
    ),
    cond: T(
      ['两组数据一一配对', '差值不满足正态性'],
      ['The two sets of measurements are paired one to one', 'The differences are not normal']
    ),
    code: T(
      `wilcox.test(x, y, paired = TRUE)`,
      `wilcox.test(x, y, paired = TRUE)`
    ),
    read: T(
      ['`V` 是正差值的秩和（不是效应量，别当大小用）', '`p-value` 与 α 比'],
      [
        '`V` is the sum of ranks of the positive differences (it is not an effect size, so do not read it as a magnitude)',
        '`p-value`: compare it with α'
      ]
    ),
    pit: T(
      ['和配对 t 检验比，报告时要说明用的是哪一种，别混着写'],
      ['When it is compared with the paired t test, the write-up must say which of the two was used rather than mixing them']
    ),
    c: chapterTarget('np')
  },
  mcNemar: {
    m: T('McNemar 检验（配对四格表）', "McNemar's test (paired 2×2 table)"),
    why: T(
      '同一批对象测两次，**每次的结果都是「是/否」两类**，比较两次的阳性率有没有变化。',
      'The same subjects measured twice, **with a yes/no result each time**; tests whether the positive rate changed between the two measurements.'
    ),
    cond: T(
      ['配对设计', '指标是二分类', '**只比较不一致的两格**（b 与 c）'],
      ['Paired design', 'The variable is binary', '**Only the two discordant cells are compared** (b and c)']
    ),
    note: T(
      '这与「两组人比较阳性率」是**两个不同的问题** —— 那种用普通四格表卡方，不能混用。',
      'This is **a different question** from comparing positive rates between two groups of people — that one uses an ordinary 2×2 chi-square test, and the two must not be mixed up.'
    ),
    code: T(
      `m <- table(before, after)   # before / after 是同一批人两次的「是/否」结果
mcnemar.test(m)`,
      `m <- table(before, after)   # before / after are the same people's yes/no results on the two occasions
mcnemar.test(m)`
    ),
    read: T(
      ['只看对角之外的 b、c 两格', 'b + c ≥ 40 用不校正公式，< 40 用校正公式（R 会自动选）'],
      [
        'Look only at the off-diagonal cells b and c',
        'For b + c ≥ 40 the uncorrected formula is used and for b + c < 40 the corrected one (R chooses automatically)'
      ]
    ),
    pit: T(
      ['配对资料用普通卡方检验 —— 忽略了配对关系，结论可能完全反掉'],
      ['Using an ordinary chi-square test on paired data — this ignores the pairing and the conclusion may come out completely reversed']
    ),
    c: chapterTarget('chi')
  },
  twoT: {
    m: T('两独立样本 t 检验（Welch）', "Two-sample t test (Welch's)"),
    why: T(
      '两组**互不相干**的对象，比较某定量指标的平均水平。',
      'Two **independent** groups of subjects, comparing the average level of a quantitative variable.'
    ),
    cond: T(
      ['两组对象相互独立（不是同一批人）', '指标是定量变量', '数据近似正态，**或**每组样本量较大（n ≥ 40 左右，中心极限定理）'],
      [
        'The two groups of subjects are independent (not the same people)',
        'The variable is quantitative',
        'The data are approximately normal, **or** each group has a fairly large sample (n ≥ 40 or so, by the central limit theorem)'
      ]
    ),
    note: T(
      '**建议直接用 R 的默认写法（Welch）**：它不要求两组方差相等，结果更稳。只有当方差齐性检验明确支持、且两组样本量相近时，合并方差的写法才略有优势。',
      '**Using the R default (Welch) directly is recommended**: it does not require equal variances between the two groups and gives a more stable result. Only when a test for homogeneity of variance clearly supports it and the two sample sizes are similar does the pooled-variance version have a slight advantage.'
    ),
    code: T(
      `t.test(value ~ group, data = d)                 # Welch，推荐
t.test(value ~ group, data = d, var.equal = TRUE) # 合并方差，需方差齐`,
      `t.test(value ~ group, data = d)                 # Welch, recommended
t.test(value ~ group, data = d, var.equal = TRUE) # pooled variance, requires equal variances`
    ),
    read: T(
      ['`df` 不是整数是**正常的** —— Welch 的自由度是算出来的', '`p-value` 与 α 比', '`estimate` 是两组均数，报告时连它一起给'],
      [
        'It is **normal** for `df` not to be a whole number — Welch’s degrees of freedom are computed',
        '`p-value`: compare it with α',
        '`estimate` gives the two group means; report them together with the p value'
      ]
    ),
    pit: T(
      ['**把配对设计误做成组检验**', '先做方差齐性检验、不齐就放弃 t 检验 —— 直接用 Welch 更简单也更稳'],
      [
        '**Mistaking a paired design for an independent-groups comparison**',
        'Testing homogeneity of variance first and abandoning the t test when it fails — using Welch directly is simpler and more stable'
      ]
    ),
    c: chapterTarget('t')
  },
  twoW: {
    m: T('Mann-Whitney U 检验（Wilcoxon 秩和检验）', 'Mann–Whitney U test (Wilcoxon rank-sum test)'),
    why: T(
      '两组独立对象，比较某定量或**有序分类**指标，但数据不正态、有极端值、或样本量很小。',
      'Two independent groups, comparing a quantitative or **ordinal** variable, but the data are non-normal, contain extreme values, or come from a very small sample.'
    ),
    cond: T(
      ['两组对象相互独立', '定量变量（不正态）或**有序分类变量**'],
      ['The two groups of subjects are independent', 'A quantitative variable (non-normal) or an **ordinal variable**']
    ),
    note: T(
      '比较的是「一组的数值是否倾向于比另一组大」，而不是均数之差。',
      'What is compared is whether the values in one group tend to be larger than those in the other, not the difference between the means.'
    ),
    code: T(
      `wilcox.test(value ~ group, data = d)`,
      `wilcox.test(value ~ group, data = d)`
    ),
    read: T(
      ['`W` 是秩和统计量，**不是效应量**', '`p-value` 与 α 比', '配合两组的中位数一起报告'],
      [
        '`W` is the rank-sum statistic, **not an effect size**',
        '`p-value`: compare it with α',
        'Report it together with the medians of the two groups'
      ]
    ),
    pit: T(
      ['把 `W` 当成"差别有多大"来报', '数据其实接近正态还用它 —— 效能白丢'],
      [
        'Reporting `W` as “how big the difference is”',
        'Using it when the data are in fact close to normal — power is lost for nothing'
      ]
    ),
    c: chapterTarget('np')
  },
  anova: {
    m: T('单因素方差分析 + 两两比较', 'One-way ANOVA + multiple comparisons'),
    why: T(
      '三组及以上**互不相干**的对象，比较某定量指标的平均水平。',
      'Three or more **independent** groups of subjects, comparing the average level of a quantitative variable.'
    ),
    cond: T(
      ['各组相互独立', '指标是定量变量', '各组近似正态', '**各组方差齐**'],
      [
        'The groups are independent',
        'The variable is quantitative',
        'Each group is approximately normal',
        '**The variances are equal across groups**'
      ]
    ),
    note: T(
      '**三组以上不能反复用 t 检验** —— 比 3 次会让 I 类错误从 5% 涨到约 14%。方差分析显著之后，再做两两比较（Tukey / SNK / Bonferroni）。',
      '**With three or more groups the t test must not be repeated** — three comparisons push the Type I error rate from 5% to about 14%. Only after ANOVA is significant do you run multiple comparisons (Tukey / SNK / Bonferroni).'
    ),
    code: T(
      `fit <- aov(value ~ group, data = d)
summary(fit)        # 先看整体有没有差别
TukeyHSD(fit)       # 再看具体哪两组之间`,
      `fit <- aov(value ~ group, data = d)
summary(fit)        # first see whether there is an overall difference
TukeyHSD(fit)       # then see which particular pairs differ`
    ),
    read: T(
      ['`Pr(>F)` 是整个模型的 p 值 —— 它显著只说明「不全相同」', '`TukeyHSD` 的 `p adj` 才是两两比较的结果'],
      [
        '`Pr(>F)` is the p value for the whole model — its being significant only says that the groups are not all the same',
        'The `p adj` of `TukeyHSD` is what gives the pairwise comparisons'
      ]
    ),
    pit: T(
      ['整体不显著还去做两两比较', '把「不全相同」说成「各组都不同」'],
      [
        'Running multiple comparisons when the overall test is not significant',
        'Saying “all the groups differ” when the result only says they are not all the same'
      ]
    ),
    c: chapterTarget('anova')
  },
  anovaW: {
    m: T('Welch 方差分析（方差不齐时）', "Welch's ANOVA (when variances are unequal)"),
    why: T(
      '三组及以上独立对象，比较定量指标，但**各组方差明显不等**。',
      'Three or more independent groups, comparing a quantitative variable, but **the group variances are clearly unequal**.'
    ),
    cond: T(
      ['各组相互独立', '指标是定量变量', '**方差不齐**'],
      ['The groups are independent', 'The variable is quantitative', '**The variances are unequal**']
    ),
    code: T(
      `oneway.test(value ~ group, data = d)   # 默认就是 Welch`,
      `oneway.test(value ~ group, data = d)   # Welch by default`
    ),
    read: T(
      ['看 `Pr(>F)`', '两两比较要用支持方差不齐的方法（如 Games-Howell）'],
      [
        'Look at `Pr(>F)`',
        'Multiple comparisons must use a method that allows unequal variances (such as Games-Howell)'
      ]
    ),
    pit: T(
      ['方差明显不齐还用普通 `aov()` —— 结果偏乐观'],
      ['Using ordinary `aov()` when the variances are clearly unequal — the result is too optimistic']
    ),
    c: chapterTarget('anova')
  },
  kw: {
    m: T('Kruskal-Wallis H 检验', 'Kruskal–Wallis H test'),
    why: T(
      '三组及以上独立对象，比较某定量（不正态）或**有序分类**指标。',
      'Three or more independent groups, comparing a quantitative (non-normal) or **ordinal** variable.'
    ),
    cond: T(
      ['各组相互独立', '定量但正态性不成立，或本身是**有序分类**变量'],
      ['The groups are independent', 'Quantitative but not normal, or **ordinal** to begin with']
    ),
    code: T(
      `kruskal.test(value ~ group, data = d)`,
      `kruskal.test(value ~ group, data = d)`
    ),
    read: T(
      ['`Kruskal-Wallis chi-squared` 与 `df`（组数 − 1）', '`p-value`：与 α 比'],
      [
        '`Kruskal-Wallis chi-squared` and `df` (number of groups − 1)',
        '`p-value`: compare it with α'
      ]
    ),
    pit: T(
      ['显著之后直接下结论说哪两组不同 —— 还要做两两比较并校正水准'],
      ['Concluding straight after a significant result which two groups differ — multiple comparisons with an adjusted level are still needed']
    ),
    c: chapterTarget('np')
  },
  chi2x2: {
    m: T('四格表卡方检验（按条件选写法）', '2×2 chi-square test (the version depends on the conditions)'),
    why: T(
      '两组独立对象，比较一个**二分类**指标的发生率。',
      'Two independent groups, comparing the rate of a **binary** variable.'
    ),
    cond: T(
      ['两组对象相互独立', '指标是二分类', '总例数 n 与最小理论频数 T_min 决定用哪种写法'],
      [
        'The two groups of subjects are independent',
        'The variable is binary',
        'The total number of cases n and the smallest expected frequency T_min determine which version is used'
      ]
    ),
    note: T(
      '三种写法怎么选 —— 这是最容易出错的地方：',
      'How to choose among the three versions — this is where mistakes are most common:'
    ),
    criteria: T(
      [
        ['n ≥ 40，且每个格子的理论频数 T ≥ 5', '用专用公式，不做校正'],
        ['n ≥ 40，但存在 1 ≤ T < 5 的格子', '用连续性校正'],
        ['n < 40，或存在 T < 1 的格子', '改用 Fisher 确切概率法']
      ],
      [
        ['n ≥ 40 and the expected frequency T ≥ 5 in every cell', 'Use the dedicated formula without correction'],
        ['n ≥ 40 but some cell has 1 ≤ T < 5', 'Use the continuity correction'],
        ['n < 40, or some cell has T < 1', "Switch to Fisher's exact test"]
      ]
    ),
    code: T(
      `tab <- table(d$group, d$outcome)
chisq.test(tab)                  # R 默认带连续性校正
chisq.test(tab, correct = FALSE) # 不校正
fisher.test(tab)                 # 确切概率法`,
      `tab <- table(d$group, d$outcome)
chisq.test(tab)                  # R applies the continuity correction by default
chisq.test(tab, correct = FALSE) # no correction
fisher.test(tab)                 # exact test`
    ),
    read: T(
      ['`X-squared` 与 `df`（四格表恒为 1）', '`p-value`：与 α 比', 'R 提示 `Chi-squared approximation may be incorrect` 时，**要改用 Fisher**'],
      [
        '`X-squared` and `df` (always 1 for a 2×2 table)',
        '`p-value`: compare it with α',
        'When R warns that `Chi-squared approximation may be incorrect`, **switch to Fisher**'
      ]
    ),
    pit: T(
      ['看到 R 的近似警告还照用卡方', '把率（横向）和构成比（纵向）的百分比算反'],
      [
        'Ignoring R’s warning about the approximation and using chi-square anyway',
        'Working out the percentages the wrong way round — rates (across rows) and proportions (down columns)'
      ]
    ),
    c: chapterTarget('chi')
  },
  chiRC: {
    m: T('行 × 列表卡方检验', 'R×C contingency-table chi-square test'),
    why: T(
      '两组或多组独立对象，比较一个**无序多分类**指标，或行/列超过 2 的列联表。',
      'Two or more independent groups, comparing a **nominal multi-category** variable, or any contingency table with more than 2 rows or columns.'
    ),
    cond: T(
      ['各组相互独立', '指标是无序分类', '**理论频数 < 5 的格子不超过 1/5**，且不能有 T < 1'],
      [
        'The groups are independent',
        'The variable is nominal',
        '**No more than 1/5 of the cells have an expected frequency < 5**, and no cell may have T < 1'
      ]
    ),
    note: T(
      'H₁ 只能写「**各组的构成不全相同**」，不能写「各组都不同」。理论频数太小就合并类别，或改用确切概率法。',
      'H₁ can only be stated as “**the group proportions are not all the same**”, never as “all the groups differ”. If the expected frequencies are too small, combine categories or switch to an exact test.'
    ),
    code: T(
      `chisq.test(table(d$group, d$type))`,
      `chisq.test(table(d$group, d$type))`
    ),
    read: T(
      ['`df` = （行数 − 1）×（列数 − 1）', '`p-value`：与 α 比'],
      [
        '`df` = (number of rows − 1) × (number of columns − 1)',
        '`p-value`: compare it with α'
      ]
    ),
    pit: T(
      ['显著之后说「各组都不同」—— 只能说不全相同，要具体比较需做两两比较并校正 α'],
      ['Saying “all the groups differ” after a significant result — the result only says they are not all the same; specific comparisons need multiple comparisons with an adjusted α']
    ),
    c: chapterTarget('chi')
  },
  repAnova: {
    m: T('重复测量方差分析', 'Repeated-measures ANOVA'),
    why: T(
      '**同一批对象**在不同时间点（或不同条件下）测了三次及以上，比较各次的定量指标。',
      '**The same subjects** measured three times or more at different time points (or under different conditions), comparing the quantitative variable across occasions.'
    ),
    cond: T(
      ['同一批对象的多次测量', '指标是定量变量', '满足**球形性**（各次测量之间的相关性结构）'],
      [
        'Repeated measurements on the same subjects',
        'The variable is quantitative',
        '**Sphericity** holds (the correlation structure among the occasions)'
      ]
    ),
    note: T(
      '和随机区组设计形似但不同：重复测量是**同一个体**被反复测，要考虑个体内的相关性；不满足球形性时要做 Greenhouse-Geisser 校正。',
      'It looks like a randomized block design but is not the same: in repeated measures **the same individual** is measured over and over, so the within-subject correlation has to be taken into account; when sphericity does not hold, a Greenhouse-Geisser correction is needed.'
    ),
    code: T(
      `fit <- aov(value ~ factor(time) + Error(id/time), data = d)
summary(fit)`,
      `fit <- aov(value ~ factor(time) + Error(id/time), data = d)
summary(fit)`
    ),
    read: T(
      ['看 `Error: id:time` 那一层的 p 值 —— 那才是时间效应的检验'],
      ['Look at the p value in the `Error: id:time` stratum — that is the test of the time effect']
    ),
    pit: T(
      ['把重复测量数据当独立组分析 —— 忽略了相关性，p 值严重偏小'],
      ['Analyzing repeated-measures data as independent groups — this ignores the correlation and makes the p value far too small']
    ),
    c: chapterTarget('anova')
  },
  friedman: {
    m: T('Friedman 检验（随机区组秩检验）', 'Friedman test (rank test for a randomized block design)'),
    why: T(
      '同一批对象测了三次及以上，但指标是**有序分类**，或定量数据明显不正态。',
      'The same subjects measured three times or more, but the variable is **ordinal**, or the quantitative data are clearly non-normal.'
    ),
    cond: T(
      ['同一批对象的多次测量', '有序分类变量，或正态性不成立'],
      ['Repeated measurements on the same subjects', 'An ordinal variable, or normality does not hold']
    ),
    code: T(
      `friedman.test(y ~ time | id, data = d)`,
      `friedman.test(y ~ time | id, data = d)`
    ),
    read: T(
      ['`Friedman chi-squared` 与 `df`', '`p-value`：与 α 比'],
      ['`Friedman chi-squared` and `df`', '`p-value`: compare it with α']
    ),
    pit: T(
      ['区组（个体）因素没写对 —— 区组变量必须正确标识同一个体'],
      ['Getting the block (individual) factor wrong — the block variable must correctly identify the same individual']
    ),
    c: chapterTarget('np')
  },
  km: {
    m: T('Kaplan-Meier 法估计生存曲线', 'Kaplan–Meier estimate of the survival curve'),
    why: T(
      '随访资料，要**估计**生存率随时间的变化（并给出中位生存时间）。',
      'Follow-up data: **estimating** how the survival rate changes over time (and giving the median survival time).'
    ),
    cond: T(
      ['有「随访时间」和「是否发生结局」两列', '存在**删失**（失访、研究结束时仍存活）'],
      [
        'There are two columns: the follow-up time and whether the outcome occurred',
        '**Censoring** is present (loss to follow-up, or still alive when the study ends)'
      ]
    ),
    note: T(
      '**删失不等于缺失**：删失者在那之前是确确实实活着的，这些信息必须用上，不能当缺失值丢掉。',
      '**Censoring is not missingness**: a censored subject was genuinely alive up to that point, and that information must be used rather than discarded as a missing value.'
    ),
    code: T(
      `library(survival)
fit <- survfit(Surv(time, status) ~ group, data = d)
plot(fit, col = 1:2)
summary(fit)`,
      `library(survival)
fit <- survfit(Surv(time, status) ~ group, data = d)
plot(fit, col = 1:2)
summary(fit)`
    ),
    read: T(
      ['曲线上的**阶梯下跳**对应有事件发生的时点', '中位生存时间 = 曲线降到 0.5 的那个时间', '删失处会打「+」号'],
      [
        'Each **step down** on the curve marks a time at which an event occurred',
        'The median survival time is the time at which the curve drops to 0.5',
        'Censored observations are marked with “+”'
      ]
    ),
    pit: T(
      ['把删失当缺失丢掉 —— 会高估死亡率', '两组的随访时间范围差很多时直接比曲线'],
      [
        'Discarding censored observations as if they were missing — this overestimates the death rate',
        'Comparing the curves directly when the two groups have very different follow-up ranges'
      ]
    ),
    c: chapterTarget('surv')
  },
  logrank: {
    m: T('Log-rank 检验', 'Log-rank test'),
    why: T(
      '随访资料，比较**两组（或多组）的生存曲线**有没有差别。',
      'Follow-up data: whether **the survival curves of two (or more) groups** differ.'
    ),
    cond: T(
      ['两组或多组随访资料', '各组生存曲线**大致成比例**（不成比例时 Log-rank 效能低）'],
      [
        'Follow-up data for two or more groups',
        'The survival curves are **roughly proportional** (when they are not, the log-rank test has low power)'
      ]
    ),
    code: T(
      `survdiff(Surv(time, status) ~ group, data = d)`,
      `survdiff(Surv(time, status) ~ group, data = d)`
    ),
    read: T(
      ['`Chisq` 与 `df`', '`p`：与 α 比'],
      ['`Chisq` and `df`', '`p`: compare it with α']
    ),
    pit: T(
      ['曲线明显交叉时用 Log-rank —— 这时它可能查不出差别，要考虑分段或用其它检验'],
      ['Using the log-rank test when the curves clearly cross — it may fail to detect a difference, so consider splitting the time axis or using another test']
    ),
    c: chapterTarget('surv')
  },
  cox: {
    m: T('Cox 比例风险回归', 'Cox proportional hazards regression'),
    why: T(
      '随访资料，要看**多个因素一起**对生存时间的影响。',
      'Follow-up data: the effect of **several factors together** on survival time.'
    ),
    cond: T(
      ['有随访时间与结局', '满足**比例风险假定**（各因素的效应不随时间变）'],
      [
        'Follow-up time and outcome are available',
        'The **proportional hazards assumption** holds (each factor’s effect does not change over time)'
      ]
    ),
    code: T(
      `fit <- coxph(Surv(time, status) ~ age + sex, data = d)
summary(fit)      # exp(coef) 就是 HR
cox.zph(fit)      # 检验比例风险假定`,
      `fit <- coxph(Surv(time, status) ~ age + sex, data = d)
summary(fit)      # exp(coef) is the HR
cox.zph(fit)      # test the proportional hazards assumption`
    ),
    read: T(
      ['`exp(coef)` 就是 **HR（风险比）**', 'HR = 1.5 表示风险是参照组的 1.5 倍', '`cox.zph` 的 p < 0.05 → 比例风险假定不成立，要改模型'],
      [
        '`exp(coef)` is the **HR (hazard ratio)**',
        'HR = 1.5 means the hazard is 1.5 times that of the reference group',
        '`cox.zph` with p < 0.05 → the proportional hazards assumption fails and the model must be changed'
      ]
    ),
    pit: T(
      ['把 HR 当成「生存率之比」—— 它是**风险率**之比', '不做比例风险假定检验就直接下结论'],
      [
        'Treating the HR as a ratio of survival rates — it is a ratio of **hazard rates**',
        'Drawing conclusions without testing the proportional hazards assumption'
      ]
    ),
    c: chapterTarget('surv')
  },
  pearson: {
    m: T('Pearson 相关分析', 'Pearson correlation analysis'),
    why: T(
      '两个定量变量，看它们之间有没有**线性**关系、有多强。',
      'Two quantitative variables: whether there is a **linear** relationship between them and how strong it is.'
    ),
    cond: T(
      ['两个变量都是定量', '**双变量正态**（两个变量的联合分布近似正态）', '关系大致是直线'],
      [
        'Both variables are quantitative',
        '**Bivariate normality** (the joint distribution of the two variables is approximately normal)',
        'The relationship is roughly a straight line'
      ]
    ),
    code: T(
      `cor(x, y)
cor.test(x, y)          # 带检验与可信区间
plot(x, y)              # 一定要先画散点图`,
      `cor(x, y)
cor.test(x, y)          # with a test and a confidence interval
plot(x, y)              # always draw the scatterplot first`
    ),
    read: T(
      ['`r` 在 −1 到 1 之间，符号看方向、绝对值看强度', '`p-value` 只说明"不等于 0"，不代表关系强', '**一定要先画散点图** —— r 可能被个别点带偏'],
      [
        '`r` lies between −1 and 1; the sign gives the direction and the absolute value the strength',
        '`p-value` only says that r is not 0; it does not mean the relationship is strong',
        '**Always draw the scatterplot first** — r can be pulled off course by a few points'
      ]
    ),
    pit: T(
      ['不画散点图只看 r —— 安斯库姆四重奏就是反例：四组完全不同的数据 r 都是 0.816', '把 r 的绝对值大小直接当"相关性很强"的依据'],
      [
        'Looking only at r without a scatterplot — Anscombe’s quartet is the counterexample: four completely different data sets all give r = 0.816',
        'Taking a large absolute value of r as proof that the correlation is “very strong”'
      ]
    ),
    c: chapterTarget('biv')
  },
  spearman: {
    m: T('Spearman 秩相关', "Spearman's rank correlation"),
    why: T(
      '两个**至少一个是定量且不正态**、或**有序分类**的变量，看它们有没有**单调**关系。',
      'Two variables of which **at least one is quantitative and non-normal**, or **ordinal**: whether there is a **monotone** relationship between them.'
    ),
    cond: T(
      ['两个变量是定量（不正态）或有序分类', '关系是单调的（一个增大另一个也增大/减小，不必是直线）'],
      [
        'The two variables are quantitative (non-normal) or ordinal',
        'The relationship is monotone (as one increases the other increases or decreases; it need not be a straight line)'
      ]
    ),
    code: T(
      `cor(x, y, method = "spearman")
cor.test(x, y, method = "spearman")`,
      `cor(x, y, method = "spearman")
cor.test(x, y, method = "spearman")`
    ),
    read: T(
      ['`rho` 就是 r_s，同样在 −1 到 1 之间', '对极端值不敏感 —— 这是它的优点'],
      ['`rho` is r_s, also between −1 and 1', 'It is not sensitive to extreme values — that is its advantage']
    ),
    pit: T(
      ['把 r_s 和 Pearson r 混着报告 —— 两者度量的东西不同（一个单调、一个线性）'],
      ['Reporting r_s and the Pearson r interchangeably — they measure different things (one monotone, one linear)']
    ),
    c: chapterTarget('biv')
  },
  linreg: {
    m: T('直线回归', 'Simple linear regression'),
    why: T(
      '一个定量变量要**用另一个定量变量去预测或解释**。',
      'One quantitative variable is to be **predicted or explained by another quantitative variable**.'
    ),
    cond: T(
      ['因变量是定量变量', '自变量与因变量的关系大致线性', '残差大致正态、方差齐（要靠残差图检查）'],
      [
        'The dependent variable is quantitative',
        'The relationship between the independent and the dependent variable is roughly linear',
        'The residuals are roughly normal with equal variance (checked with residual plots)'
      ]
    ),
    note: T(
      '**相关和回归问的是两件事**：相关看"有没有关系、多强"（两个变量不分主次）；回归看"能不能用 x 预测 y"（要分清谁是自变量）。',
      '**Correlation and regression ask two different things**: correlation asks whether there is a relationship and how strong it is (neither variable is primary); regression asks whether x can be used to predict y (which one is the independent variable matters).'
    ),
    code: T(
      `fit <- lm(y ~ x, data = d)
summary(fit)     # 系数、t 检验、R²
plot(fit)        # 四张诊断图 —— 必须看`,
      `fit <- lm(y ~ x, data = d)
summary(fit)     # coefficients, t tests, R²
plot(fit)        # the four diagnostic plots — you must look at them`
    ),
    read: T(
      ['`Estimate` 里 `(Intercept)` 是截距、`x` 是斜率', '`R²` 是模型解释了多少变异', '`plot(fit)` 第 1、3 张图看线性和方差齐，第 2 张看正态性'],
      [
        'In `Estimate`, `(Intercept)` is the intercept and `x` is the slope',
        '`R²` is how much of the variation the model explains',
        'In `plot(fit)` the 1st and 3rd plots check linearity and equal variance, and the 2nd checks normality'
      ]
    ),
    pit: T(
      ['不画诊断图就报结果', '把 R² 大当成"预测一定准"', '超出数据范围外推'],
      [
        'Reporting results without drawing the diagnostic plots',
        'Taking a large R² to mean the predictions must be accurate',
        'Extrapolating beyond the range of the data'
      ]
    ),
    c: chapterTarget('reg')
  },
  odds: {
    m: T('卡方独立性检验 + 优势比 OR / 相对危险度 RR', 'Chi-square test of independence + odds ratio (OR) / relative risk (RR)'),
    why: T(
      '两个分类变量，判断它们**有没有关联**，以及关联**有多强**。',
      'Two categorical variables: whether they are **associated**, and **how strong** the association is.'
    ),
    cond: T(
      ['两个变量都是分类变量', '卡方检验的理论频数条件（同四格表判据）'],
      [
        'Both variables are categorical',
        'The expected-frequency conditions for the chi-square test (the same criteria as the 2×2 table)'
      ]
    ),
    note: T(
      '**卡方给 P 值（有没有关联），OR/RR 给强度（关联多强）** —— 两个都要报。队列研究可以算 RR；病例对照研究只能算 OR。',
      '**The chi-square test gives the P value (whether there is an association) and the OR/RR gives the strength (how strong it is)** — both must be reported. A cohort study allows the RR; a case-control study allows only the OR.'
    ),
    code: T(
      `tab <- table(d$exposure, d$outcome)   # 两个分类变量
chisq.test(tab)
# 四格表按 (a*d)/(b*c) 手算 OR，或用 epitools::oddsratio()`,
      `tab <- table(d$exposure, d$outcome)   # two categorical variables
chisq.test(tab)
# For a 2×2 table work out the OR by hand as (a*d)/(b*c), or use epitools::oddsratio()`
    ),
    read: T(
      ['`p-value`：与 α 比，判断有没有关联', 'OR = 1 表示没有关联；> 1 正相关，< 1 负相关', 'OR 总是比 RR 离 1 更远 —— 发生率不低时两者差别很明显'],
      [
        '`p-value`: compare it with α to judge whether there is an association',
        'OR = 1 means no association; > 1 positive, < 1 negative',
        'The OR is always farther from 1 than the RR — when the rate is not low the two differ markedly'
      ]
    ),
    pit: T(
      ['把 OR 当 RR 解释', '只看 P 值不看 OR —— 样本量大时很小的 OR 也能"显著"'],
      [
        'Interpreting the OR as if it were the RR',
        'Looking only at the P value and not at the OR — with a large sample even a very small OR can be “significant”'
      ]
    ),
    c: chapterTarget('biv')
  },
  none: {
    m: T('本课程没有覆盖到这种情况', 'Not covered in this course'),
    why: T('你选的组合超出了本站 17 章的范围。', 'The combination you selected falls outside the 17 chapters covered on this site.'),
    cond: T([], []),
    note: T(
      '不是没有方法，而是这几种情况在本课程里没展开。**建议先回去把前面的设计类型重新确认一遍**（很多时候是第一步选错了），仍然对不上的话，请咨询任课老师或统计专业人士。',
      'It is not that no method exists, but that these situations are not developed in this course. **Go back and re-check the study design you selected** (often the first step was the wrong one); if it still does not match, ask the course instructor or a statistician.'
    ),
    code: T('', ''),
    read: T([], []),
    pit: T(
      ['硬套一个自己熟悉的方法 —— 这是数据分析里最危险的错误'],
      ['Forcing the data into a method you happen to know — the most dangerous mistake in data analysis']
    ),
    c: chapterTarget('design')
  },

  // ── 补充专题：诊断试验评价 ─────────────────────────────
  diagRoc: {
    m: T('ROC 曲线与 AUC', 'ROC curve and AUC'),
    why: T(
      '有「金标准」的诊断结论，也有一个待评价指标的测量值，要看这个指标**把病人和非病人分开的能力**。',
      'A gold-standard diagnosis and a measured value of an index being evaluated: how well that index **separates patients from non-patients**.'
    ),
    cond: T(
      ['每个人都有一个金标准的诊断结论（有病 / 无病）', '同一个人身上还测了待评价的那个指标'],
      [
        'Every subject has a gold-standard diagnosis (diseased / not diseased)',
        'The index under evaluation was also measured on the same subject'
      ]
    ),
    note: T(
      '**AUC 的准确含义**：随机抽一个病人和一个非病人，病人那个指标值更高的概率。所以它跟指标的量纲、单位、是否偏态都无关。\n\n**阈值该由临床代价决定，不是由算法决定**：漏诊后果重的病（宫外孕、艾滋病筛查），先把灵敏度钉死再挑阈值。',
      '**What the AUC really means**: the probability that, if one patient and one non-patient are drawn at random, the patient has the higher value of the index. It is therefore independent of the index’s scale, units, and skewness.\n\n**The threshold should be decided by clinical cost, not by an algorithm**: for conditions where a missed diagnosis is serious (ectopic pregnancy, HIV screening), fix the sensitivity first and then choose the threshold.'
    ),
    code: T(
      `library(pROC)
r <- roc(金标准, 指标值, levels = c("无病", "有病"))
auc(r)          # 判别能力
ci.auc(r)       # 一定要带可信区间

# 按约登指数选阈值（灵敏度 + 特异度 - 1 最大）
coords(r, "best", best.method = "youden",
       ret = c("threshold", "sensitivity", "specificity"))
plot(r, print.auc = TRUE, print.thres = "best")`,
      `library(pROC)
r <- roc(金标准, 指标值, levels = c("disease-free", "diseased"))
auc(r)          # discrimination
ci.auc(r)       # always report the confidence interval

# Choose the threshold by the Youden index (largest sensitivity + specificity - 1)
coords(r, "best", best.method = "youden",
       ret = c("threshold", "sensitivity", "specificity"))
plot(r, print.auc = TRUE, print.thres = "best")`
    ),
    read: T(
      ['`AUC` 与它的 95% 可信区间', '选定阈值下的**灵敏度**和**特异度**', '有条件再报 LR+ / LR-（它们两端可比）'],
      [
        'The `AUC` and its 95% confidence interval',
        'The **sensitivity** and **specificity** at the chosen threshold',
        'Report LR+ / LR− as well when you can (they are comparable at both ends)'
      ]
    ),
    pit: T(
      [
        '**用阳性预测值比较两个试验** —— 它随患病率变，两个人群之间根本不能比',
        '只报 AUC 不报阈值 —— AUC 是把所有阈值平均了，临床上落不了地',
        '**在同一批数据上选阈值又报性能** —— 乐观偏倚，阈值要另拿一批数据验证',
        '把「AUC 0.73」直接说成「判别能力一般」就完事 —— 该说清临床上能不能用'
      ],
      [
        '**Using the positive predictive value to compare two tests** — it changes with prevalence, so it can simply not be compared across two populations',
        'Reporting only the AUC and not the threshold — the AUC averages over all thresholds and cannot be put to clinical use',
        '**Choosing the threshold on the same data that are then used to report performance** — optimistic bias; the threshold must be validated on a separate set of data',
        'Dismissing an “AUC of 0.73” as merely “fair discrimination” and leaving it at that — you should say clearly whether it is usable in practice'
      ]
    ),
    c: chapterTarget('diag')
  },

  // ── 补充专题：一致性信度 ───────────────────────────────
  kappa: {
    m: T('Kappa 系数（分类资料的一致性）', 'Kappa coefficient (agreement for categorical data)'),
    why: T(
      '同一批对象被**重复判断**（两次、或两位评定者），判断结果是**没有顺序的类别**，问两次结果一不一致。',
      'The same subjects **judged repeatedly** (twice, or by two raters), where the judgment is a **nominal category**: do the two judgments agree?'
    ),
    cond: T(
      ['每个对象都被判断了两次或以上', '判断结果是分类变量，且类别之间**没有大小顺序**'],
      [
        'Every subject was judged twice or more',
        'The judgment is a categorical variable and the categories **have no order**'
      ]
    ),
    note: T(
      '**Kappa 已经扣掉了「碰巧一致」的部分**，所以它比「一致率」严格得多：观察一致率 90% 时 Kappa 可能只有 0.44。\n\n**报 Kappa 时要连着报观察一致率和边际分布**，否则读者分不清 Kappa 低是真的不一致、还是类别分布太偏斜造成的。',
      '**Kappa has already removed the part that agrees by chance**, so it is much stricter than the agreement rate: with an observed agreement of 90% the kappa may be only 0.44.\n\n**When you report kappa, report the observed agreement and the marginal distributions with it**, otherwise the reader cannot tell whether a low kappa means genuine disagreement or is caused by very skewed category distributions.'
    ),
    code: T(
      `library(irr)
# 两人之间
kappa2(d[, c("评定者1", "评定者2")])
# 多人之间
kappam.fleiss(d)

# 想看一致率是多少（Kappa 要跟它一起报）
mean(d$评定者1 == d$评定者2)`,
      `library(irr)
# Between two raters
kappa2(d[, c("评定者1", "评定者2")])
# Among several raters
kappam.fleiss(d)

# To see the agreement rate (kappa has to be reported together with it)
mean(d$评定者1 == d$评定者2)`
    ),
    read: T(
      ['`Kappa`：扣掉碰巧一致之后的一致性', '`z` 与 `p-value`：Kappa 是不是显著大于 0（**不等于 Kappa 够高**）', '观察一致率 $P_o$'],
      [
        '`Kappa`: the agreement after chance agreement has been removed',
        '`z` and `p-value`: whether kappa is significantly greater than 0 (**this does not mean kappa is high enough**)',
        'The observed agreement $P_o$'
      ]
    ),
    pit: T(
      [
        '**给无序类别算加权 Kappa** —— 血型、诊断类别没有顺序，强行编号是在制造不存在的信息',
        '把 Kappa 的分档当成及格线（0.61 以上才算好）—— 原文说得很清楚那只是描述性标签',
        '只报 Kappa 不报 $P_o$ —— 边际分布很偏时 Kappa 会天然偏低（Kappa 悖论）',
        '评定者数量不同却直接比 Kappa —— 两人之间和全体之间的 Kappa 不是一回事'
      ],
      [
        '**Computing a weighted kappa for nominal categories** — blood group and diagnostic category have no order, and numbering them invents information that does not exist',
        'Treating the kappa bands as a pass mark (0.61 or above counts as good) — the source says clearly that they are only descriptive labels',
        'Reporting kappa without $P_o$ — when the marginal distributions are very skewed the kappa is naturally low (the kappa paradox)',
        'Comparing kappas computed with different numbers of raters — a kappa between two raters and one among all raters are not the same thing'
      ]
    ),
    c: chapterTarget('agree')
  },
  wkappa: {
    m: T('加权 Kappa（有序资料的一致性）', 'Weighted kappa (agreement for ordinal data)'),
    why: T(
      '重复判断的结果**有等级顺序**（1~5 级、轻/中/重），这时「差 1 级」和「差 4 级」不该同等看待。',
      'The repeated judgments **have a graded order** (grades 1–5, mild/moderate/severe), and “off by 1 grade” and “off by 4 grades” should not be treated alike.'
    ),
    cond: T(
      ['每个对象被判断两次或以上', '判断结果是有序分类变量'],
      ['Every subject was judged twice or more', 'The judgment is an ordinal variable']
    ),
    note: T(
      '加权 Kappa 给不同程度的偏离赋不同权重：**线性权重**按等级差线性递减，**平方权重**对大偏差惩罚更狠、算出来的数通常更大。\n\n**必须写明用了哪种权重** —— 同一批数据线性 0.19、平方 0.30，不说权重就没法比较。',
      'Weighted kappa gives different weights to different degrees of disagreement: with **linear weights** the weight decreases linearly with the difference in grades, while **quadratic weights** penalize large disagreements harder and usually give a larger value.\n\n**The type of weight must be stated** — the same data give 0.19 with linear weights and 0.30 with quadratic weights, and without saying which was used the values cannot be compared.'
    ),
    code: T(
      `library(irr)
# irr 里线性权重叫 "equal"，平方权重叫 "squared"
kappa2(d[, c("评定者1", "评定者2")], weight = "equal")    # 线性
kappa2(d[, c("评定者1", "评定者2")], weight = "squared")  # 平方`,
      `library(irr)
# In irr the linear weights are called "equal" and the quadratic weights "squared"
kappa2(d[, c("评定者1", "评定者2")], weight = "equal")    # linear
kappa2(d[, c("评定者1", "评定者2")], weight = "squared")  # quadratic`
    ),
    read: T(
      ['加权 `Kappa`（**务必注明是线性还是平方**）', '不加权的 Kappa 一起报，能看出「把等级当无序处理」会低多少', '观察一致率'],
      [
        'The weighted `Kappa` (**always state whether it is linear or quadratic**)',
        'Report the unweighted kappa as well, which shows how much is lost by treating the grades as nominal',
        'The observed agreement'
      ]
    ),
    pit: T(
      ['不写权重种类 —— 线性与平方能差出一倍', '把有序资料当成无序处理 —— Kappa 会被严重低估', '反过来给**无序**类别加权 —— 更严重的错误'],
      [
        'Not stating the type of weight — linear and quadratic weights can differ by a factor of two',
        'Treating ordinal data as nominal — the kappa is then seriously underestimated',
        'Conversely, weighting **nominal** categories — an even more serious error'
      ]
    ),
    c: chapterTarget('agree')
  },
  icc: {
    m: T('ICC 组内相关系数（定量资料的一致性）', 'ICC, the intraclass correlation coefficient (agreement for quantitative data)'),
    why: T(
      '同一批对象**重复测量**，测出来的是**具体数值**（两台仪器、两位医生量的同一个量），问测得一不一致。',
      'The same subjects measured repeatedly, where the result is **a number** (two instruments, or two doctors, measuring the same quantity): do the measurements agree?'
    ),
    cond: T(
      ['每个对象被测量两次或以上', '测量结果是定量变量'],
      ['Every subject was measured twice or more', 'The measurement is a quantitative variable']
    ),
    note: T(
      '**ICC 是一族指标，不是一个**。要按三件事选形态并写清楚：**模型**（双向随机 / 双向混合）、**类型**（单次测量 / $k$ 次均值）、**定义**（绝对一致 / 一致性）。\n\n**要判断两台仪器能不能互换，必须用「绝对一致」**：只关心排序的「一致性」定义允许评定者之间有恒定系统偏移（甲永远比乙高 3 分，ICC 仍等于 1）。',
      '**The ICC is a family of measures, not a single one.** Its form has to be chosen according to three things, and stated: the **model** (two-way random / two-way mixed), the **type** (single measurement / mean of $k$ measurements), and the **definition** (absolute agreement / consistency).\n\n**To decide whether two instruments can be interchanged, absolute agreement must be used**: the consistency definition, which cares only about the ordering, allows a constant systematic offset between raters (if A always scores 3 points higher than B, the ICC is still 1).'
    ),
    code: T(
      `library(psych)
ICC(d)$results[, c("type", "ICC", "lower bound", "upper bound")]

# 或
library(irr)
icc(d, model = "twoway", type = "agreement", unit = "single")  # ICC(2,1)
icc(d, model = "twoway", type = "agreement", unit = "average") # ICC(2,k)`,
      `library(psych)
ICC(d)$results[, c("type", "ICC", "lower bound", "upper bound")]

# or
library(irr)
icc(d, model = "twoway", type = "agreement", unit = "single")  # ICC(2,1)
icc(d, model = "twoway", type = "agreement", unit = "average") # ICC(2,k)`
    ),
    read: T(
      ['`ICC` 点估计**和它的 95% 可信区间**（按区间定档，不是按点估计）', '同一批数据的 ICC(2,1) 与 ICC(2,k) 差多少', '均方 MSR / MSC / MSE —— MSC 比 MSR 大说明「谁在评」比「评的是谁」影响更大'],
      [
        'The `ICC` point estimate **and its 95% confidence interval** (grade it by the interval, not by the point estimate)',
        'How far apart ICC(2,1) and ICC(2,k) are for the same data',
        'The mean squares MSR / MSC / MSE — MSC larger than MSR means who is rating matters more than who is being rated'
      ]
    ),
    pit: T(
      [
        '**用 Pearson 相关系数评价一致性** —— 一组数整体加个常数，相关系数纹丝不动，一致性已经没了',
        '报 ICC 不说清模型/类型/定义 —— 同一批数据能差出好几倍',
        '只看点估计不看可信区间 —— 点估计 0.93 但区间 0.88~0.97 时只能说「好到很好之间」',
        '样本小于 30 例、评定者少于 3 位就下结论 —— 这时可信区间宽得没法用'
      ],
      [
        '**Using the Pearson correlation coefficient to assess agreement** — add a constant to one whole set of values and the correlation does not move at all, even though the agreement is already gone',
        'Reporting an ICC without stating the model/type/definition — the same data can differ severalfold',
        'Looking at the point estimate and not the confidence interval — with a point estimate of 0.93 but an interval of 0.88–0.97 you can only say “somewhere between good and very good”',
        'Drawing conclusions from fewer than 30 subjects or fewer than 3 raters — the confidence interval is then too wide to be of any use'
      ]
    ),
    c: chapterTarget('agree')
  },
  bland: {
    m: T('Bland-Altman 一致性分析', 'Bland–Altman agreement analysis'),
    why: T(
      '想知道两种测量方法**差多少、差得稳不稳**——ICC 只给一个概括的数，看不出偏倚的大小和形态。',
      'You want to know **how much two measurement methods differ and how consistently** — the ICC gives only a summary number and hides the size and shape of the bias.'
    ),
    cond: T(
      ['同一批对象用两种方法（或两次）测量', '测量结果是定量变量'],
      ['The same subjects measured by two methods (or on two occasions)', 'The measurement is a quantitative variable']
    ),
    note: T(
      '横轴画两法均值、纵轴画两法差值：**差值均数**就是系统偏倚，**差值均数 ± 1.96×差值标准差**是一致性界限。\n\n**它和 ICC 互补**：ICC 回答「能不能区分对象」，Bland-Altman 回答「差多少、差得稳定吗」。两个一起报最清楚。',
      'Plot the mean of the two methods on the horizontal axis and their difference on the vertical axis: the **mean difference** is the systematic bias, and **mean difference ± 1.96 × SD of the differences** gives the limits of agreement.\n\n**It complements the ICC**: the ICC answers whether subjects can be distinguished, while Bland–Altman answers how much the methods differ and whether that difference is stable. Reporting both is clearest.'
    ),
    code: T(
      `m <- (d$方法1 + d$方法2) / 2      # 横轴：两法均值
diff <- d$方法1 - d$方法2          # 纵轴：两法差值
plot(m, diff, ylim = c(-1, 1) * max(abs(diff)) * 1.5,
     xlab = "两法均值", ylab = "两法差值")
abline(h = mean(diff), col = "blue")             # 偏倚
abline(h = mean(diff) + c(-1, 1) * 1.96 * sd(diff), col = "red", lty = 2)`,
      `m <- (d$方法1 + d$方法2) / 2      # horizontal axis: mean of the two methods
diff <- d$方法1 - d$方法2          # vertical axis: difference between the two methods
plot(m, diff, ylim = c(-1, 1) * max(abs(diff)) * 1.5,
     xlab = "Mean of the two methods", ylab = "Difference between the two methods")
abline(h = mean(diff), col = "blue")             # bias
abline(h = mean(diff) + c(-1, 1) * 1.96 * sd(diff), col = "red", lty = 2)`
    ),
    read: T(
      ['`mean(diff)`：系统偏倚（理想情况接近 0）', '一致性界限：偏倚 ± 1.96×差值标准差', '散点的形状：有没有随均值变化的趋势（比例偏倚）'],
      [
        '`mean(diff)`: the systematic bias (close to 0 in the ideal case)',
        'The limits of agreement: bias ± 1.96 × SD of the differences',
        'The shape of the scatter: whether there is a trend with the mean (proportional bias)'
      ]
    ),
    pit: T(
      [
        '只看偏倚是否为 0，不看界限宽不宽 —— 偏倚为 0 但界限很宽，两法照样不能互换',
        '差值明显不服从正态时硬套 ±1.96×SD —— 界限的覆盖率就不准了',
        '用相关系数代替它 —— 相关完全看不出系统偏倚'
      ],
      [
        'Looking only at whether the bias is 0 and not at how wide the limits are — a bias of 0 with very wide limits still means the two methods cannot be interchanged',
        'Applying ±1.96 × SD when the differences are clearly non-normal — the coverage of the limits is then wrong',
        'Using a correlation coefficient instead — a correlation shows nothing at all about systematic bias'
      ]
    ),
    c: chapterTarget('agree')
  }
}

// ── 规则表：设计 × 尺度 → 结论 ─────────────────────────
// dist: 'normal' | 'abnormal' | null（不需要问分布）
const RULES = {
  descriptive: { scale: { quantitative: DESCRIPTIVE.quantitative, binary: DESCRIPTIVE.binary, categorical: DESCRIPTIVE.categorical } },
  oneSample: {
    askDist: true,
    scale: { quantitative: { normal: R.oneT, abnormal: R.oneW }, binary: R.oneBin, categorical: R.oneChi }
  },
  paired: {
    askDist: true,
    scale: { quantitative: { normal: R.pairT, abnormal: R.pairW }, binary: R.mcNemar, categorical: R.none }
  },
  twoIndependent: {
    askDist: true,
    scale: { quantitative: { normal: R.twoT, abnormal: R.twoW }, binary: R.chi2x2, categorical: R.chiRC }
  },
  multiIndependent: {
    askDist: true,
    scale: { quantitative: { normal: R.anova, abnormal: R.kw }, binary: R.chiRC, categorical: R.chiRC }
  },
  repeated: {
    scale: { quantitative: R.repAnova, binary: R.none, categorical: R.friedman }
  },
  survival: { goals: { curve: R.km, compare: R.logrank, model: R.cox } },
  association: { pairs: { qq: { linear: R.pearson, monotone: R.spearman, predict: R.linreg }, cc: R.odds } }
}

// ── 生成交互树 ─────────────────────────────────────────
/**
 * 规则表里为了写起来短，用的是 `m`（方法名）和 `c`（[章名, 链接] 数组）。
 * 但下面写进 TS 模块的 interface 用的是 `method` 和 `c: {text, link}` ——
 * 组件是按 interface 取值的。
 *
 * 以前这里直接把规则表原样 JSON.stringify 出去，于是**数据和 interface 对不上**：
 * 组件取 `result.method` 拿到 undefined，取 `result.c.link` 拿到 undefined，
 * 再传给 withBase() 就抛 TypeError（undefined.startsWith），
 * 整个结果块渲染失败 —— 表现就是「选完了不出答案」。
 *
 * 所以在唯一的出口 pushResult 这里统一转成对外约定的长名字，
 * 数据和 interface 从此不会各说各话。改规则表不用管这个。
 *
 * 中英文各跑一遍这个函数：**结构只有这一份代码**，两边的节点编号、
 * 分支、跳转必然一一对应，翻不了车。
 */
function buildTree(lang) {
  const P = (v) => pick(v, lang)

  function normalizeResult(r) {
    // 注意：判断「有没有这一项」要拿**取出来之后**的值来判，
    // 不能拿 T() 包着的对象判 —— 空字符串包起来也是真值，
    // 会把原来是省略的字段变成 `"code": ""`，产物就不是逐字节相同了。
    const out = { method: P(r.m), why: P(r.why) }
    const cond = P(r.cond)
    if (cond) out.cond = cond
    const note = P(r.note)
    if (note) out.note = note
    const criteria = P(r.criteria)
    if (criteria) out.criteria = criteria
    const code = P(r.code)
    if (code) out.code = code
    const read = P(r.read)
    if (read) out.read = read
    const pit = P(r.pit)
    if (pit) out.pit = pit
    out.c = ch(Array.isArray(r.c) ? r.c : P(r.c)) // 数组 → {text, link}
    return out
  }

  let nextId = 100
  const nodes = []
  const resultNodes = new Map()
  function pushResult(key, res) {
    if (resultNodes.has(key)) return resultNodes.get(key)
    const id = nextId++
    nodes.push({ id, result: normalizeResult(res) })
    resultNodes.set(key, id)
    return id
  }

  const SCALE_OPTS = [
    {
      key: 'quantitative',
      text: T('具体数值', 'A specific number'),
      detail: T('身高、血压、白细胞计数、量表总分……', 'Height, blood pressure, white blood cell count, total scale score …')
    },
    {
      key: 'binary',
      text: T('只有两类', 'Only two categories'),
      detail: T('男/女、存活/死亡、阳性/阴性……', 'Male/female, alive/dead, positive/negative …')
    },
    {
      key: 'categorical',
      text: T('三类以上', 'Three or more categories'),
      detail: T(
        'A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级',
        'ABO blood group, department, or ordered grades such as mild/moderate/severe'
      )
    }
  ]

  const DIST_OPTS = [
    {
      key: 'unknown',
      text: T('不确定 / 每组不到 40 例 / 图上有明显偏态或极端值', 'Not sure / fewer than 40 per group / the plot shows clear skewness or extreme values'),
      detail: T('选这一项最安全 —— 会推荐不依赖分布假设的方法', 'This is the safest choice — it recommends methods that do not rely on distributional assumptions'),
      maps: 'abnormal'
    },
    {
      key: 'normal',
      text: T('每组 40 例以上，直方图基本对称、没有离群点', 'More than 40 per group, histogram roughly symmetric with no outliers'),
      detail: T('', ''),
      maps: 'normal'
    },
    {
      key: 'abnormal',
      text: T('每组 40 例以上，但分布明显偏态', 'More than 40 per group, but the distribution is clearly skewed'),
      detail: T('', ''),
      maps: 'abnormal'
    }
  ]

  /** 生成「尺度 → （分布 →）结果」这一段 */
  function buildScaleBranch(designKey, rule, idOfScaleQuestion) {
    const opts = []
    for (const so of SCALE_OPTS) {
      const target = rule.scale[so.key]
      if (!target) {
        opts.push({ text: P(so.text), detail: P(so.detail), next: pushResult('none-' + designKey + so.key, R.none) })
        continue
      }
      if (!rule.askDist) {
        // 直接出结果，或者内部还要再问一层（生存分析/关联已单独处理）
        const res = typeof target === 'object' && target.m ? target : R.none
        opts.push({ text: P(so.text), detail: P(so.detail), next: pushResult(designKey + '-' + so.key, res) })
        continue
      }
      // 定量才有分布分支
      if (so.key !== 'quantitative') {
        const res = typeof target === 'object' && target.m ? target : R.none
        opts.push({ text: P(so.text), detail: P(so.detail), next: pushResult(designKey + '-' + so.key, res) })
        continue
      }
      const distId = nextId++
      const distOpts = DIST_OPTS.map((d) => ({
        text: P(d.text),
        detail: P(d.detail),
        next: pushResult(designKey + '-quantitative-' + d.maps, target[d.maps])
      }))
      nodes.push({
        id: distId,
        question: P(T('这批数据的样本量和外形大概是什么样？', 'Roughly what are the sample size and the shape of these data?')),
        hint: P(T('拿不准就选第一项 —— 会给你不依赖分布假设的稳妥方法', 'If you are unsure, choose the first option — it gives you a safe method that does not rely on distributional assumptions')),
        options: distOpts
      })
      opts.push({ text: P(so.text), detail: P(so.detail), next: distId })
    }
    return opts
  }

  // Q1 设计
  const designId = 1
  const designQ = {
    id: designId,
    question: P(T('你手上的数据是怎么来的？', 'How did the data you have come about?')),
    hint: P(T('选最贴近的一项。拿不准就先选「只是想描述一下」—— 描述性分析不会出错。', 'Choose the closest option. If you are unsure, start with “just want to describe it” — descriptive analysis cannot go wrong.')),
    options: []
  }
  nodes.push(designQ)

  const designs = [
    ['descriptive', T('只是想看看这批数据长什么样', 'Just want to see what these data look like'), T('还没打算做检验，先做描述性统计', 'No test intended yet — descriptive statistics first')],
    ['oneSample', T('一组对象，要和某个已知标准比', 'One group of subjects, to be compared with a known standard'), T('比如 120 名男生的平均身高 vs 全国平均水平', 'For example the mean height of 120 male students vs the national average')],
    ['paired', T('同一批对象测了两次', 'The same subjects measured twice'), T('用药前后、左右眼、同一份标本两种方法测', 'Before and after treatment, left and right eye, one specimen measured by two methods')],
    ['twoIndependent', T('两组不同的对象', 'Two different groups of subjects'), T('试验组 vs 对照组，两组互不相干', 'Treatment group vs control group, with the two groups independent')],
    ['multiIndependent', T('三组及以上不同的对象', 'Three or more different groups of subjects'), T('三种剂量组比较', 'Comparing three dose groups')],
    ['repeated', T('同一批对象测了三次及以上', 'The same subjects measured three times or more'), T('术后 1 个月、3 个月、6 个月各测一次', 'Measured once each at 1 month, 3 months, and 6 months after surgery')],
    ['survival', T('随访资料', 'Follow-up data'), T('有「随访多久」和「有没有发生结局」两列', 'Two columns: how long the follow-up lasted and whether the outcome occurred')],
    ['association', T('想看两个变量之间的关系', 'Want to look at the relationship between two variables'), T('不分组，就看两个指标之间有没有关系', 'No grouping — just whether two measurements are related')],
    ['diagnostic', T('手上有个诊断指标，想评价它准不准', 'You have a diagnostic index and want to judge how accurate it is'), T('有金标准的诊断结论 + 该指标的测量值，比如 s100b 能不能判断脑损伤', 'A gold-standard diagnosis plus a measured value of that index, for example whether s100b can identify brain injury')],
    ['agreement', T('同一批对象重复测/重复判，想看看一不一致', 'The same subjects measured or judged repeatedly — do the results agree?'), T('两位医生看同一批片子、两台仪器测同一批样本', 'Two doctors reading the same set of images, or two instruments measuring the same set of samples')]
  ]

  for (const [key, text, detail] of designs) {
    const rule = RULES[key]
    if (key === 'survival') {
      const id = nextId++
      nodes.push({
        id,
        question: P(T('生存分析想解决哪个问题？', 'Which question should the survival analysis answer?')),
        hint: P(T('', '')),
        options: [
          { text: P(T('估计生存率、看生存曲线', 'Estimate survival rates and look at the survival curve')), detail: P(T('画出随时间变化的生存曲线，求中位生存时间', 'Draw the survival curve over time and find the median survival time')), next: pushResult('surv-curve', R.km) },
          { text: P(T('比较两组的生存曲线', 'Compare the survival curves of two groups')), detail: P(T('比如两种治疗方案谁的生存率更高', 'For example which of two treatments gives the higher survival rate')), next: pushResult('surv-cmp', R.logrank) },
          { text: P(T('看多个因素对生存的影响', 'Look at the effect of several factors on survival')), detail: P(T('年龄、分期、治疗方式一起分析', 'Analyze age, stage, and treatment together')), next: pushResult('surv-model', R.cox) }
        ]
      })
      designQ.options.push({ text: P(text), detail: P(detail), next: id })
      continue
    }
    if (key === 'association') {
      const id = nextId++
      nodes.push({
        id,
        question: P(T('这两个变量分别是什么类型？', 'What type is each of these two variables?')),
        hint: P(T('', '')),
        options: [
          { text: P(T('都是具体数值', 'Both are specific numbers')), detail: P(T('比如身高与体重、年龄与血压', 'For example height and weight, age and blood pressure')), next: associationQQ() },
          { text: P(T('至少一个是分类变量', 'At least one is a categorical variable')), detail: P(T('比如血型与疾病、性别与疗效', 'For example blood group and disease, sex and treatment effect')), next: pushResult('assoc-cc', R.odds) }
        ]
      })
      designQ.options.push({ text: P(text), detail: P(detail), next: id })
      continue
    }
    if (key === 'diagnostic') {
      const id = nextId++
      nodes.push({
        id,
        question: P(T('这个指标是拿来干什么的？', 'What is this index used for?')),
        hint: P(T('同一个指标，用在不同位置，评价的指标也不一样', 'The same index used in different roles is evaluated with different measures')),
        options: [
          {
            text: P(T('把病人和非病人分开', 'Separating patients from non-patients')),
            detail: P(T('有金标准的诊断结论，要看这个指标判别得准不准', 'A gold-standard diagnosis is available and you want to know how well the index discriminates')),
            next: pushResult('diag-roc', R.diagRoc)
          },
          {
            text: P(T('判断两次测量的结果一不一致', 'Judging whether two measurements agree')),
            detail: P(T('不是比较差别，而是问重复得好不好 —— 可以选下面这个分支', 'Not comparing differences but asking how well the measurement repeats — you can take the branch below')),
            next: pushResult('diag-agree-hint', R.icc)
          }
        ]
      })
      designQ.options.push({ text: P(text), detail: P(detail), next: id })
      continue
    }
    if (key === 'agreement') {
      const id = nextId++
      nodes.push({
        id,
        question: P(T('重复测量/重复判断的结果是什么类型？', 'What type are the results of the repeated measurements or judgments?')),
        hint: P(T('', '')),
        options: [
          {
            text: P(T('没有顺序的类别', 'Categories with no order')),
            detail: P(T('阳性/阴性、几种诊断类别、血型', 'Positive/negative, several diagnostic categories, blood group')),
            next: pushResult('agree-nominal', R.kappa)
          },
          {
            text: P(T('有等级顺序', 'Graded in order')),
            detail: P(T('1~5 级评分、轻/中/重', 'Scores from 1 to 5, mild/moderate/severe')),
            next: pushResult('agree-ordinal', R.wkappa)
          },
          {
            text: P(T('具体数值', 'Specific numbers')),
            detail: P(T('血压、量表总分、仪器读数', 'Blood pressure, total scale score, instrument reading')),
            next: pushResult('agree-quant', R.icc)
          },
          {
            text: P(T('具体数值，而且想知道两法差多少、差得稳不稳', 'Specific numbers, and you want to know how much the two methods differ and how consistently')),
            detail: P(T('除了概括的一致性，还想看系统偏倚有多大', 'Besides the summary agreement measure, you want to see how large the systematic bias is')),
            next: pushResult('agree-bland', R.bland)
          }
        ]
      })
      designQ.options.push({ text: P(text), detail: P(detail), next: id })
      continue
    }
    const scaleId = nextId++
    nodes.push({
      id: scaleId,
      question: P(T('要分析的那个指标长什么样？', 'What does the variable you want to analyze look like?')),
      hint: P(T('说的是你要比较/描述的那一个指标，不是全部变量', 'This means the one variable you want to compare or describe, not every variable')),
      options: buildScaleBranch(key, rule, scaleId)
    })
    designQ.options.push({ text: P(text), detail: P(detail), next: scaleId })
  }

  function associationQQ() {
    const id = nextId++
    nodes.push({
      id,
      question: P(T('这两个数值变量之间是什么关系？', 'What is the relationship between these two numeric variables?')),
      hint: P(T('', '')),
      options: [
        { text: P(T('看起来大致是直线', 'It looks roughly like a straight line')), detail: P(T('散点图上的点沿着一条直线走', 'The points on the scatterplot follow a straight line')), next: pushResult('assoc-qq-linear', R.pearson) },
        { text: P(T('只是一起增大或减小，不是直线', 'They only increase or decrease together; it is not a straight line')), detail: P(T('', '')), next: pushResult('assoc-qq-monotone', R.spearman) },
        { text: P(T('想用一个去预测另一个', 'You want to use one to predict the other')), detail: P(T('比如用身高预测肺活量', 'For example using height to predict vital capacity')), next: pushResult('assoc-qq-predict', R.linreg) }
      ]
    })
    return id
  }

  // 排序：问卷节点按 id，结果节点在后
  const qNodes = nodes.filter((n) => !n.result).sort((a, b) => a.id - b.id)
  const rNodes = nodes.filter((n) => n.result).sort((a, b) => a.id - b.id)

  const tree = { nodes: [...qNodes, ...rNodes] }
  return { tree, qNodes, rNodes, nodes, resultNodes }
}

// 写成 TS 模块直接 import —— 不走 fetch，避免异步加载失败导致组件卡在"正在加载"
/** 写文件：顺手把目录建出来，_dev/ 不入库，干净clone 里可能不存在 */
function writeOut(p, s) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, s, 'utf8')
}

// ── TS 模块模板（两种语言共用同一段 interface）──────────
const TS_HEAD = {
  zh: `/**
 * 统计方法选择器题库 —— 由 scripts/generate-selector.mjs 从规则表生成，请勿手改。
 * 改规则请改生成脚本，然后重跑它。
 */`,
  en: `/**
 * Statistical Method Selector question bank (English) —— generated by scripts/generate-selector.mjs
 * from the very same rule table as the Chinese bank. Do not edit by hand.
 * To change the rules, edit the generator and run it again.
 */`
}
const TS_BODY = `export interface SelectorOption { text: string; detail?: string; next: number }
export interface SelectorResult {
  method: string
  why: string
  cond?: string[]
  note?: string
  criteria?: string[][]
  code?: string
  read?: string[]
  pit?: string[]
  c: { text: string; link: string }
}
export interface SelectorNode {
  id: number
  question?: string
  hint?: string
  options?: SelectorOption[]
  result?: SelectorResult
}
export const selectorTree: { nodes: SelectorNode[] } = `

function tsModule(tree, lang) {
  return `${TS_HEAD[lang]}\n${TS_BODY}${JSON.stringify(tree, null, 2)}\n`
}

// ── 决策速查表 ─────────────────────────────────────────
function row(m, cond, chp) {
  return `| ${m} | ${cond} | [${chp[0]}](${chp[1]}) |`
}

// [情况, 用什么方法, 章节 key]；中英文各一套，行数和顺序同这一份
const TABLE_ROWS = [
  [T('描述定量资料', 'Describing quantitative data'), T('大致对称 → 均数 ± 标准差；偏态或有极端值 → 中位数（四分位数间距）', 'Roughly symmetric → mean ± SD; skewed or with extreme values → median (IQR)'), 'desc'],
  [T('描述分类资料', 'Describing categorical data'), T('频数 + 率（二分类）或构成比（多分类）', 'Frequency + rate (binary) or proportion (multi-category)'), 'descQ'],
  [T('一组 vs 已知值（定量）', 'One group vs a known value (quantitative)'), T('近似正态 → 单样本 t 检验；不满足 → Wilcoxon 符号秩检验', 'Approximately normal → one-sample t test; otherwise → Wilcoxon signed-rank test'), 't'],
  [T('一组 vs 已知率（二分类）', 'One group vs a known rate (binary)'), T('二项检验', 'Binomial test'), 'est'],
  [T('一组多分类 vs 理论分布', 'One multi-category group vs a theoretical distribution'), T('拟合优度卡方检验', 'Goodness-of-fit chi-square test'), 'chi'],
  [T('配对（定量）', 'Paired (quantitative)'), T('差值近似正态 → 配对 t 检验；不满足 → Wilcoxon 符号秩检验', 'Differences approximately normal → paired t test; otherwise → Wilcoxon signed-rank test'), 't'],
  [T('配对（二分类）', 'Paired (binary)'), T('McNemar 检验', "McNemar's test"), 'chi'],
  [T('两独立组（定量）', 'Two independent groups (quantitative)'), T('近似正态 → 两独立样本 t 检验（推荐用 Welch）；不满足 → Mann-Whitney U 检验', "Approximately normal → two-sample t test (Welch's recommended); otherwise → Mann–Whitney U test"), 't'],
  [T('两独立组（二分类）', 'Two independent groups (binary)'), T('四格表卡方检验：n ≥ 40 且 T ≥ 5 不校正；1 ≤ T < 5 要校正；n < 40 或有 T < 1 用 Fisher', '2×2 chi-square test: n ≥ 40 and T ≥ 5 uncorrected; 1 ≤ T < 5 corrected; n < 40 or T < 1 use Fisher'), 'chi'],
  [T('两组及以上（无序多分类）', 'Two or more groups (nominal multi-category)'), T('行 × 列表卡方检验（理论频数不足时合并类别或改确切概率法）', 'R×C contingency-table chi-square test (combine categories or use an exact test if the expected frequencies are too small)'), 'chi'],
  [T('多独立组（定量）', 'Multiple independent groups (quantitative)'), T('近似正态且方差齐 → 单因素方差分析 + 两两比较；方差不齐 → Welch 方差分析；不正态 → Kruskal-Wallis 检验', "Approximately normal with equal variances → one-way ANOVA + multiple comparisons; unequal variances → Welch's ANOVA; non-normal → Kruskal–Wallis test"), 'anova'],
  [T('两组及以上（有序分类）', 'Two or more groups (ordinal)'), T('Mann-Whitney U 检验（两组）或 Kruskal-Wallis 检验（多组）', 'Mann–Whitney U test (two groups) or Kruskal–Wallis test (more than two)'), 'np'],
  [T('重复测量（定量）', 'Repeated measures (quantitative)'), T('重复测量方差分析（注意球形性）', 'Repeated-measures ANOVA (watch sphericity)'), 'anova'],
  [T('重复测量（有序）', 'Repeated measures (ordinal)'), T('Friedman 检验', 'Friedman test'), 'np'],
  [T('随访：估计生存曲线', 'Follow-up: estimating the survival curve'), T('Kaplan-Meier 法', 'Kaplan–Meier method'), 'surv'],
  [T('随访：比较生存曲线', 'Follow-up: comparing survival curves'), T('Log-rank 检验', 'Log-rank test'), 'surv'],
  [T('随访：多因素分析', 'Follow-up: multivariable analysis'), T('Cox 比例风险回归（看 HR，先检验比例风险假定）', 'Cox proportional hazards regression (look at the HR; test the proportional hazards assumption first)'), 'surv'],
  [T('两个定量变量：看关系', 'Two quantitative variables: looking at the relationship'), T('直线关系 → Pearson 相关；单调非直线 → Spearman 秩相关', "Linear relationship → Pearson correlation; monotone but not linear → Spearman's rank correlation"), 'biv'],
  [T('两个定量变量：做预测', 'Two quantitative variables: making predictions'), T('直线回归（先画残差诊断图）', 'Simple linear regression (draw the residual diagnostic plots first)'), 'reg'],
  [T('两个分类变量：看关联', 'Two categorical variables: looking at association'), T('卡方独立性检验 + 优势比 OR / 相对危险度 RR', 'Chi-square test of independence + odds ratio (OR) / relative risk (RR)'), 'biv'],
  [T('评价一个诊断指标（有金标准）', 'Evaluating a diagnostic index (with a gold standard)'), T('ROC 曲线 + AUC；阈值按临床代价定，报告该阈值下的灵敏度与特异度', 'ROC curve + AUC; set the threshold by clinical cost and report the sensitivity and specificity at that threshold'), 'diag'],
  [T('重复判断：没有顺序的类别', 'Repeated judgments: nominal categories'), T('Kappa 系数（两人用 Cohen，多人用 Fleiss）；和观察一致率一起报', "Kappa coefficient (Cohen's for two raters, Fleiss' for several); report it together with the observed agreement"), 'agree'],
  [T('重复判断：有等级顺序', 'Repeated judgments: ordered grades'), T('加权 Kappa（必须注明线性还是平方权重）', 'Weighted kappa (always state whether the weights are linear or quadratic)'), 'agree'],
  [T('重复测量：具体数值', 'Repeated measurement: specific numbers'), T('ICC（写清模型/类型/定义，并报可信区间）；想知道差多少再加 Bland-Altman', 'ICC (state the model/type/definition and report the confidence interval); add Bland–Altman if you want to know how much the methods differ'), 'agree']
]

const TABLE_HEAD = {
  zh: ['| 情况 | 用什么方法 | 对应章节 |', '| --- | --- | --- |'],
  en: ['| Situation | Method to use | Chapter |', '| --- | --- | --- |']
}

function buildTable(lang) {
  const table = [...TABLE_HEAD[lang]]
  for (const [m, cond, chKey] of TABLE_ROWS) {
    table.push(row(pick(m, lang), pick(cond, lang), pick(chapterTarget(chKey), lang)))
  }
  return table
}

// ── 自检：所有 next 指向存在的节点 ─────────────────────
function selfCheck({ nodes, resultNodes }, lang) {
  const ids = new Set(nodes.map((n) => n.id))
  let bad = 0
  for (const n of nodes) {
    for (const o of n.options || []) {
      if (o.next !== undefined && !ids.has(o.next)) {
        console.log(`✗ [${lang}] #${n.id} 的选项「${o.text}」指向不存在的 #${o.next}`)
        bad++
      }
    }
  }
  const reachable = new Set()
  const walkFrom = (id) => {
    if (reachable.has(id)) return
    reachable.add(id)
    const n = nodes.find((x) => x.id === id)
    for (const o of n?.options || []) if (o.next !== undefined) walkFrom(o.next)
  }
  walkFrom(1)
  const unreachable = nodes.filter((n) => !reachable.has(n.id))
  console.log(bad ? `✗ [${lang}] ${bad} 处坏指向` : `✓ [${lang}] 所有跳转都指向存在的节点`)
  console.log(unreachable.length ? `✗ [${lang}] 有 ${unreachable.length} 个节点无法到达` : `✓ [${lang}] 所有节点都可达`)
  console.log(`[${lang}] 结论里用到的方法共 ${resultNodes.size} 种`)
  return bad + unreachable.length
}

// ── 跑：两种语言各生成一套产物 ─────────────────────────
const LANGS = [
  { lang: 'zh', label: '中文', data: 'docs/.vitepress/theme/selector-data.ts', tree: '_dev/selector-tree.json', table: '_dev/selector-table.md' },
  { lang: 'en', label: '英文', data: 'docs/.vitepress/theme/selector-data-en.ts', tree: '_dev/selector-tree-en.json', table: '_dev/selector-table-en.md' }
]

const built = {}
let problems = 0
for (const L of LANGS) {
  const b = buildTree(L.lang)
  built[L.lang] = b
  fs.writeFileSync(L.data, tsModule(b.tree, L.lang), 'utf8')
  writeOut(L.tree, JSON.stringify(b.tree, null, 2))
  console.log(`✓ ${L.data}（${L.label}）：${b.qNodes.length} 个问题节点 + ${b.rNodes.length} 个结论节点`)

  const table = buildTable(L.lang)
  writeOut(L.table, table.join('\n') + '\n')
  console.log(`✓ ${L.table}（${L.label}）：${table.length - 2} 行决策速查表`)
}

for (const L of LANGS) problems += selfCheck(built[L.lang], L.lang)

// 两套题库的结构必须**一一对应**：节点数、每个节点的类型、跳转编号全等。
// 这是「逻辑只有一份」的机器校验 —— 光靠读代码看不住。
{
  const a = built.zh.tree.nodes
  const b = built.en.tree.nodes
  const same =
    a.length === b.length &&
    a.every((n, i) => {
      const m = b[i]
      const opts = (x) => (x.options || []).map((o) => o.next).join(',')
      if (n.id !== m.id || !!n.result !== !!m.result) return false
      if (!!n.question !== !!m.question || !!n.hint !== !!m.hint) return false
      if (opts(n) !== opts(m)) return false
      if (n.result && m.result) {
        const shape = (r) => [r.cond?.length, r.read?.length, r.pit?.length, r.criteria?.length, !!r.note, !!r.code].join('|')
        if (shape(n.result) !== shape(m.result)) return false
      }
      return true
    })
  if (same) {
    console.log('✓ 中英文题库结构完全一一对应（节点数、跳转、条件/要点条数全部相同）')
  } else {
    console.log('✗ 中英文题库结构对不上 —— 这是「一份规则两种语言」被破坏的信号')
    problems++
  }
}

if (problems) process.exit(1)
