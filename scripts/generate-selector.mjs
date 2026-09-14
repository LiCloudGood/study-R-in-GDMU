/**
 * 统计方法选择器：规则表 → 生成产物
 *
 *   1. docs/.vitepress/theme/selector-data.ts   交互问答的题库（组件直接 import）
 *   2. _dev/selector-tree.json                  同一份数据的副本，方便查看（不入库）
 *   3. _dev/selector-table.md                   决策速查表（贴进 choice.md，不入库）
 *
 * 用法：在仓库根目录跑
 *     node scripts/generate-selector.mjs
 *
 * 这样做的好处：交互流程和速查表出自**同一份规则**，
 * 不可能出现「图里说的和实际逻辑不一致」这种学术性问题。
 * 所以 selector-data.ts 标了「请勿手改」，要改就改这里的规则表再重跑。
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

// ── 章节链接（17 章）────────────────────────────────────
const CH = {
  desc: ['第 4 章 定量资料的统计描述', '/Health-statistics/04-describing-quantitative-data'],
  descQ: ['第 5 章 定性资料的统计描述', '/Health-statistics/05-describing-qualitative-data'],
  est: ['第 6 章 总体均数与总体率的估计', '/Health-statistics/06-estimation'],
  test: ['第 7 章 假设检验', '/Health-statistics/07-hypothesis-testing'],
  t: ['第 8 章 t 检验', '/Health-statistics/08-t-test'],
  anova: ['第 9 章 方差分析', '/Health-statistics/09-anova'],
  chi: ['第 10 章 卡方检验', '/Health-statistics/10-chi-square'],
  np: ['第 11 章 非参数检验与秩和检验', '/Health-statistics/11-nonparametric'],
  biv: ['第 12 章 双变量关联性分析', '/Health-statistics/12-bivariate-association'],
  reg: ['第 13 章 直线回归', '/Health-statistics/13-linear-regression'],
  surv: ['第 14 章 生存分析', '/Health-statistics/14-survival-analysis'],
  size: ['第 17 章 样本含量估计', '/Health-statistics/17-sample-size'],
  chart: ['第 19 章 常用统计图表', '/Health-statistics/19-tables-and-charts'],
  design: ['第 3 章 实验设计与调查设计', '/Health-statistics/03-study-design'],
  // 补充专题（不在课本 19 章里，是本站补的）
  diag: ['诊断试验评价（ROC 与 AUC）', '/Health-statistics/diagnostic-test'],
  agree: ['一致性信度（Kappa 与 ICC）', '/Health-statistics/agreement-reliability']
}
const ch = ([text, link]) => ({ text, link })

/** 描述性统计（不需要假设检验） */
const DESCRIPTIVE = {
  quantitative: {
    m: '均数 ± 标准差，或 中位数（四分位数间距）',
    why: '描述一批定量数据的**平均水平**和**离散程度**。',
    cond: ['指标是定量变量', '没有分组比较的打算，只是描述'],
    note: '**选哪个看分布**：大致对称、没有极端值 → 均数 ± 标准差；明显偏态或有极端值 → 中位数（四分位数间距）。两个都报也可以。',
    code: `mean(x); sd(x)                  # 均数 ± 标准差
median(x); IQR(x)               # 中位数（四分位数间距）
quantile(x, c(0.25, 0.5, 0.75)) # 三个四分位数`,
    read: ['均数与中位数差得远 → 分布偏态，优先报中位数', '标准差比均数还大 → 数据很散，或存在极端值'],
    pit: ['用均数 ± 标准差描述明显偏态的资料 —— 会掩盖真实分布', '只报平均数不报离散程度'],
    c: CH.desc
  },
  binary: {
    m: '频数 + 率（构成比）',
    why: '描述一个二分类指标的**发生频率**。',
    cond: ['指标只有两类', '分母是「有可能发生」的观察单位总数'],
    note: '分子是发生例数，分母是**全部**观察单位 —— 不是"没发生的例数"。',
    code: `table(d$outcome)
prop.table(table(d$outcome)) * 100   # 百分比`,
    read: ['检查分母对不对 —— 率的分母必须是可能发生该事件的人数'],
    pit: ['把构成比当率用 —— 见第 5 章那张「率与构成比」对照表'],
    c: CH.descQ
  },
  categorical: {
    m: '频数 + 构成比',
    why: '描述一个多分类指标的**各部分占比**。',
    cond: ['指标是分类变量（无序或有序）'],
    note: '**构成比之和必定是 100%**，各部分是此消彼长的关系，不能拿它当"发生率"用。',
    code: `table(d$type)
prop.table(table(d$type)) * 100`,
    read: ['各部分加起来应是 100%，对不上说明分母搞错了'],
    pit: ['有序分类还应该**按顺序**排列水平，不然看不出轻重趋势'],
    c: CH.descQ
  }
}

/** 检验类结果 */
const R = {
  oneT: {
    m: '单样本 t 检验',
    why: '一组定量数据，和**一个已知的标准值**比平均水平。',
    cond: ['只有一组对象', '指标是定量变量', '数据近似正态；样本量小（n < 40）时必须较严格地满足'],
    code: `t.test(x, mu = 170)      # 170 换成你要比较的标准值`,
    read: ['`t` 与 `df`（自由度 = n − 1）', '`p-value`：与检验水准 α 比', '`conf.int`：均数与标准值之差的 95% 可信区间'],
    pit: ['把「不拒绝 H₀」说成「证明两组相等」—— 只能说没找到差别', '大样本时 p 值很小可能只是样本量大，要看均数差的实际大小'],
    c: CH.t
  },
  oneW: {
    m: 'Wilcoxon 符号秩检验（单样本）',
    why: '一组定量数据与已知标准值比较，但数据**偏离正态、或有极端值、或样本量很小**。',
    cond: ['只有一组对象', '指标是定量变量，但正态性不成立'],
    note: '不要求正态分布，代价是**检验效能略低**（同样的差别，需要更多样本才能发现）。',
    code: `wilcox.test(x, mu = 170)   # 170 换成你要比较的标准值`,
    read: ['`V` 是正差值的秩和', '`p-value`：与 α 比', '看 `median(x)` 而不是均数，和非参数方法更配套'],
    pit: ['数据其实接近正态时也用它 —— 白白损失效能', '有大量相同数值（结）时 R 会提示，不要当报错'],
    c: CH.np
  },
  oneBin: {
    m: '二项检验',
    why: '一个二分类指标，和**一个已知的发生率**比。',
    cond: ['指标只有两类', '要检验的是「发生率是否等于某个值」'],
    code: `binom.test(45, 200, p = 0.30)   # 45/200 换成你的例数，0.30 换成已知率`,
    read: ['`p-value` 是精确法的结果，比正态近似的更可靠', '`conf.int` 是率的可信区间 —— 样本量小的时候区间会很宽，这正是重点'],
    pit: ['样本量小时用正态近似算率的可信区间，可能算出负数下限 —— 应该用精确法'],
    c: CH.est
  },
  oneChi: {
    m: '拟合优度卡方检验',
    why: '一个多分类指标，看各类的**实际频数**是否偏离某个理论分布。',
    cond: ['指标是多分类变量', '每一类的理论频数 T ≥ 5（否则要合并类别）'],
    code: `chisq.test(table(d$type), p = c(0.5, 0.3, 0.2))   # 换成你假设的构成比，个数要等于类别数`,
    read: ['`X-squared` 与 `df`（自由度 = 类别数 − 1）', '`p-value`：与 α 比'],
    pit: ['理论频数太小还硬算 —— R 会警告，这时要合并类别'],
    c: CH.chi
  },
  pairT: {
    m: '配对样本 t 检验',
    why: '同一批对象测了两次（或配对的两个部位），比较两次的**差值**是否为 0。',
    cond: ['两组数据一一配对', '**差值**近似正态（不是两次测量各自正态）'],
    note: '本质是「把差值当成一组数据做单样本 t 检验」，所以自由度是**对子数 − 1**，不是总测量次数 − 2。',
    code: `t.test(x, y, paired = TRUE)      # 两个等长向量
# 注意：t.test(y ~ g, data = d, paired = TRUE) 会直接报错
#      公式写法只按两独立样本解释，配对必须传两个向量`,
    read: ['`df` = 对子数 − 1', '`mean of the differences` 是平均差值 —— 比 p 值更该看', '`conf.int` 是平均差值的 95% 可信区间'],
    pit: ['**把配对设计当成组检验** —— 最常见也最伤，p 值会偏大、结论可能反转', '用配对 t 检验却没有配对关系'],
    c: CH.t
  },
  pairW: {
    m: 'Wilcoxon 符号秩检验（配对）',
    why: '配对数据，但**差值的分布明显不正态**。',
    cond: ['两组数据一一配对', '差值不满足正态性'],
    code: `wilcox.test(x, y, paired = TRUE)`,
    read: ['`V` 是正差值的秩和（不是效应量，别当大小用）', '`p-value` 与 α 比'],
    pit: ['和配对 t 检验比，报告时要说明用的是哪一种，别混着写'],
    c: CH.np
  },
  mcNemar: {
    m: 'McNemar 检验（配对四格表）',
    why: '同一批对象测两次，**每次的结果都是「是/否」两类**，比较两次的阳性率有没有变化。',
    cond: ['配对设计', '指标是二分类', '**只比较不一致的两格**（b 与 c）'],
    note: '这与「两组人比较阳性率」是**两个不同的问题** —— 那种用普通四格表卡方，不能混用。',
    code: `m <- table(before, after)   # before / after 是同一批人两次的「是/否」结果
mcnemar.test(m)`,
    read: ['只看对角之外的 b、c 两格', 'b + c ≥ 40 用不校正公式，< 40 用校正公式（R 会自动选）'],
    pit: ['配对资料用普通卡方检验 —— 忽略了配对关系，结论可能完全反掉'],
    c: CH.chi
  },
  twoT: {
    m: '两独立样本 t 检验（Welch）',
    why: '两组**互不相干**的对象，比较某定量指标的平均水平。',
    cond: ['两组对象相互独立（不是同一批人）', '指标是定量变量', '数据近似正态，**或**每组样本量较大（n ≥ 40 左右，中心极限定理）'],
    note: '**建议直接用 R 的默认写法（Welch）**：它不要求两组方差相等，结果更稳。只有当方差齐性检验明确支持、且两组样本量相近时，合并方差的写法才略有优势。',
    code: `t.test(value ~ group, data = d)                 # Welch，推荐
t.test(value ~ group, data = d, var.equal = TRUE) # 合并方差，需方差齐`,
    read: ['`df` 不是整数是**正常的** —— Welch 的自由度是算出来的', '`p-value` 与 α 比', '`estimate` 是两组均数，报告时连它一起给'],
    pit: ['**把配对设计误做成组检验**', '先做方差齐性检验、不齐就放弃 t 检验 —— 直接用 Welch 更简单也更稳'],
    c: CH.t
  },
  twoW: {
    m: 'Mann-Whitney U 检验（Wilcoxon 秩和检验）',
    why: '两组独立对象，比较某定量或**有序分类**指标，但数据不正态、有极端值、或样本量很小。',
    cond: ['两组对象相互独立', '定量变量（不正态）或**有序分类变量**'],
    note: '比较的是「一组的数值是否倾向于比另一组大」，而不是均数之差。',
    code: `wilcox.test(value ~ group, data = d)`,
    read: ['`W` 是秩和统计量，**不是效应量**', '`p-value` 与 α 比', '配合两组的中位数一起报告'],
    pit: ['把 `W` 当成"差别有多大"来报', '数据其实接近正态还用它 —— 效能白丢'],
    c: CH.np
  },
  anova: {
    m: '单因素方差分析 + 两两比较',
    why: '三组及以上**互不相干**的对象，比较某定量指标的平均水平。',
    cond: ['各组相互独立', '指标是定量变量', '各组近似正态', '**各组方差齐**'],
    note: '**三组以上不能反复用 t 检验** —— 比 3 次会让 I 类错误从 5% 涨到约 14%。方差分析显著之后，再做两两比较（Tukey / SNK / Bonferroni）。',
    code: `fit <- aov(value ~ group, data = d)
summary(fit)        # 先看整体有没有差别
TukeyHSD(fit)       # 再看具体哪两组之间`,
    read: ['`Pr(>F)` 是整个模型的 p 值 —— 它显著只说明「不全相同」', '`TukeyHSD` 的 `p adj` 才是两两比较的结果'],
    pit: ['整体不显著还去做两两比较', '把「不全相同」说成「各组都不同」'],
    c: CH.anova
  },
  anovaW: {
    m: 'Welch 方差分析（方差不齐时）',
    why: '三组及以上独立对象，比较定量指标，但**各组方差明显不等**。',
    cond: ['各组相互独立', '指标是定量变量', '**方差不齐**'],
    code: `oneway.test(value ~ group, data = d)   # 默认就是 Welch`,
    read: ['看 `Pr(>F)`', '两两比较要用支持方差不齐的方法（如 Games-Howell）'],
    pit: ['方差明显不齐还用普通 `aov()` —— 结果偏乐观'],
    c: CH.anova
  },
  kw: {
    m: 'Kruskal-Wallis H 检验',
    why: '三组及以上独立对象，比较某定量（不正态）或**有序分类**指标。',
    cond: ['各组相互独立', '定量但正态性不成立，或本身是**有序分类**变量'],
    code: `kruskal.test(value ~ group, data = d)`,
    read: ['`Kruskal-Wallis chi-squared` 与 `df`（组数 − 1）', '`p-value`：与 α 比'],
    pit: ['显著之后直接下结论说哪两组不同 —— 还要做两两比较并校正水准'],
    c: CH.np
  },
  chi2x2: {
    m: '四格表卡方检验（按条件选写法）',
    why: '两组独立对象，比较一个**二分类**指标的发生率。',
    cond: ['两组对象相互独立', '指标是二分类', '总例数 n 与最小理论频数 T_min 决定用哪种写法'],
    note: '三种写法怎么选 —— 这是最容易出错的地方：',
    criteria: [
      ['n ≥ 40，且每个格子的理论频数 T ≥ 5', '用专用公式，不做校正'],
      ['n ≥ 40，但存在 1 ≤ T < 5 的格子', '用连续性校正'],
      ['n < 40，或存在 T < 1 的格子', '改用 Fisher 确切概率法']
    ],
    code: `tab <- table(d$group, d$outcome)
chisq.test(tab)                  # R 默认带连续性校正
chisq.test(tab, correct = FALSE) # 不校正
fisher.test(tab)                 # 确切概率法`,
    read: ['`X-squared` 与 `df`（四格表恒为 1）', '`p-value`：与 α 比', 'R 提示 `Chi-squared approximation may be incorrect` 时，**要改用 Fisher**'],
    pit: ['看到 R 的近似警告还照用卡方', '把率（横向）和构成比（纵向）的百分比算反'],
    c: CH.chi
  },
  chiRC: {
    m: '行 × 列表卡方检验',
    why: '两组或多组独立对象，比较一个**无序多分类**指标，或行/列超过 2 的列联表。',
    cond: ['各组相互独立', '指标是无序分类', '**理论频数 < 5 的格子不超过 1/5**，且不能有 T < 1'],
    note: 'H₁ 只能写「**各组的构成不全相同**」，不能写「各组都不同」。理论频数太小就合并类别，或改用确切概率法。',
    code: `chisq.test(table(d$group, d$type))`,
    read: ['`df` = （行数 − 1）×（列数 − 1）', '`p-value`：与 α 比'],
    pit: ['显著之后说「各组都不同」—— 只能说不全相同，要具体比较需做两两比较并校正 α'],
    c: CH.chi
  },
  repAnova: {
    m: '重复测量方差分析',
    why: '**同一批对象**在不同时间点（或不同条件下）测了三次及以上，比较各次的定量指标。',
    cond: ['同一批对象的多次测量', '指标是定量变量', '满足**球形性**（各次测量之间的相关性结构）'],
    note: '和随机区组设计形似但不同：重复测量是**同一个体**被反复测，要考虑个体内的相关性；不满足球形性时要做 Greenhouse-Geisser 校正。',
    code: `fit <- aov(value ~ factor(time) + Error(id/time), data = d)
summary(fit)`,
    read: ['看 `Error: id:time` 那一层的 p 值 —— 那才是时间效应的检验'],
    pit: ['把重复测量数据当独立组分析 —— 忽略了相关性，p 值严重偏小'],
    c: CH.anova
  },
  friedman: {
    m: 'Friedman 检验（随机区组秩检验）',
    why: '同一批对象测了三次及以上，但指标是**有序分类**，或定量数据明显不正态。',
    cond: ['同一批对象的多次测量', '有序分类变量，或正态性不成立'],
    code: `friedman.test(y ~ time | id, data = d)`,
    read: ['`Friedman chi-squared` 与 `df`', '`p-value`：与 α 比'],
    pit: ['区组（个体）因素没写对 —— 区组变量必须正确标识同一个体'],
    c: CH.np
  },
  km: {
    m: 'Kaplan-Meier 法估计生存曲线',
    why: '随访资料，要**估计**生存率随时间的变化（并给出中位生存时间）。',
    cond: ['有「随访时间」和「是否发生结局」两列', '存在**删失**（失访、研究结束时仍存活）'],
    note: '**删失不等于缺失**：删失者在那之前是确确实实活着的，这些信息必须用上，不能当缺失值丢掉。',
    code: `library(survival)
fit <- survfit(Surv(time, status) ~ group, data = d)
plot(fit, col = 1:2)
summary(fit)`,
    read: ['曲线上的**阶梯下跳**对应有事件发生的时点', '中位生存时间 = 曲线降到 0.5 的那个时间', '删失处会打「+」号'],
    pit: ['把删失当缺失丢掉 —— 会高估死亡率', '两组的随访时间范围差很多时直接比曲线'],
    c: CH.surv
  },
  logrank: {
    m: 'Log-rank 检验',
    why: '随访资料，比较**两组（或多组）的生存曲线**有没有差别。',
    cond: ['两组或多组随访资料', '各组生存曲线**大致成比例**（不成比例时 Log-rank 效能低）'],
    code: `survdiff(Surv(time, status) ~ group, data = d)`,
    read: ['`Chisq` 与 `df`', '`p`：与 α 比'],
    pit: ['曲线明显交叉时用 Log-rank —— 这时它可能查不出差别，要考虑分段或用其它检验'],
    c: CH.surv
  },
  cox: {
    m: 'Cox 比例风险回归',
    why: '随访资料，要看**多个因素一起**对生存时间的影响。',
    cond: ['有随访时间与结局', '满足**比例风险假定**（各因素的效应不随时间变）'],
    code: `fit <- coxph(Surv(time, status) ~ age + sex, data = d)
summary(fit)      # exp(coef) 就是 HR
cox.zph(fit)      # 检验比例风险假定`,
    read: ['`exp(coef)` 就是 **HR（风险比）**', 'HR = 1.5 表示风险是参照组的 1.5 倍', '`cox.zph` 的 p < 0.05 → 比例风险假定不成立，要改模型'],
    pit: ['把 HR 当成「生存率之比」—— 它是**风险率**之比', '不做比例风险假定检验就直接下结论'],
    c: CH.surv
  },
  pearson: {
    m: 'Pearson 相关分析',
    why: '两个定量变量，看它们之间有没有**线性**关系、有多强。',
    cond: ['两个变量都是定量', '**双变量正态**（两个变量的联合分布近似正态）', '关系大致是直线'],
    code: `cor(x, y)
cor.test(x, y)          # 带检验与可信区间
plot(x, y)              # 一定要先画散点图`,
    read: ['`r` 在 −1 到 1 之间，符号看方向、绝对值看强度', '`p-value` 只说明"不等于 0"，不代表关系强', '**一定要先画散点图** —— r 可能被个别点带偏'],
    pit: ['不画散点图只看 r —— 安斯库姆四重奏就是反例：四组完全不同的数据 r 都是 0.816', '把 r 的绝对值大小直接当"相关性很强"的依据'],
    c: CH.biv
  },
  spearman: {
    m: 'Spearman 秩相关',
    why: '两个**至少一个是定量且不正态**、或**有序分类**的变量，看它们有没有**单调**关系。',
    cond: ['两个变量是定量（不正态）或有序分类', '关系是单调的（一个增大另一个也增大/减小，不必是直线）'],
    code: `cor(x, y, method = "spearman")
cor.test(x, y, method = "spearman")`,
    read: ['`rho` 就是 r_s，同样在 −1 到 1 之间', '对极端值不敏感 —— 这是它的优点'],
    pit: ['把 r_s 和 Pearson r 混着报告 —— 两者度量的东西不同（一个单调、一个线性）'],
    c: CH.biv
  },
  linreg: {
    m: '直线回归',
    why: '一个定量变量要**用另一个定量变量去预测或解释**。',
    cond: ['因变量是定量变量', '自变量与因变量的关系大致线性', '残差大致正态、方差齐（要靠残差图检查）'],
    note: '**相关和回归问的是两件事**：相关看"有没有关系、多强"（两个变量不分主次）；回归看"能不能用 x 预测 y"（要分清谁是自变量）。',
    code: `fit <- lm(y ~ x, data = d)
summary(fit)     # 系数、t 检验、R²
plot(fit)        # 四张诊断图 —— 必须看`,
    read: ['`Estimate` 里 `(Intercept)` 是截距、`x` 是斜率', '`R²` 是模型解释了多少变异', '`plot(fit)` 第 1、3 张图看线性和方差齐，第 2 张看正态性'],
    pit: ['不画诊断图就报结果', '把 R² 大当成"预测一定准"', '超出数据范围外推'],
    c: CH.reg
  },
  odds: {
    m: '卡方独立性检验 + 优势比 OR / 相对危险度 RR',
    why: '两个分类变量，判断它们**有没有关联**，以及关联**有多强**。',
    cond: ['两个变量都是分类变量', '卡方检验的理论频数条件（同四格表判据）'],
    note: '**卡方给 P 值（有没有关联），OR/RR 给强度（关联多强）** —— 两个都要报。队列研究可以算 RR；病例对照研究只能算 OR。',
    code: `tab <- table(d$exposure, d$outcome)   # 两个分类变量
chisq.test(tab)
# 四格表按 (a*d)/(b*c) 手算 OR，或用 epitools::oddsratio()`,
    read: ['`p-value`：与 α 比，判断有没有关联', 'OR = 1 表示没有关联；> 1 正相关，< 1 负相关', 'OR 总是比 RR 离 1 更远 —— 发生率不低时两者差别很明显'],
    pit: ['把 OR 当 RR 解释', '只看 P 值不看 OR —— 样本量大时很小的 OR 也能"显著"'],
    c: CH.biv
  },
  none: {
    m: '本课程没有覆盖到这种情况',
    why: '你选的组合超出了本站 17 章的范围。',
    cond: [],
    note: '不是没有方法，而是这几种情况在本课程里没展开。**建议先回去把前面的设计类型重新确认一遍**（很多时候是第一步选错了），仍然对不上的话，请咨询任课老师或统计专业人士。',
    code: '',
    read: [],
    pit: ['硬套一个自己熟悉的方法 —— 这是数据分析里最危险的错误'],
    c: CH.design
  },

  // ── 补充专题：诊断试验评价 ─────────────────────────────
  diagRoc: {
    m: 'ROC 曲线与 AUC',
    why: '有「金标准」的诊断结论，也有一个待评价指标的测量值，要看这个指标**把病人和非病人分开的能力**。',
    cond: ['每个人都有一个金标准的诊断结论（有病 / 无病）', '同一个人身上还测了待评价的那个指标'],
    note: '**AUC 的准确含义**：随机抽一个病人和一个非病人，病人那个指标值更高的概率。所以它跟指标的量纲、单位、是否偏态都无关。\n\n**阈值该由临床代价决定，不是由算法决定**：漏诊后果重的病（宫外孕、艾滋病筛查），先把灵敏度钉死再挑阈值。',
    code: `library(pROC)
r <- roc(金标准, 指标值, levels = c("无病", "有病"))
auc(r)          # 判别能力
ci.auc(r)       # 一定要带可信区间

# 按约登指数选阈值（灵敏度 + 特异度 - 1 最大）
coords(r, "best", best.method = "youden",
       ret = c("threshold", "sensitivity", "specificity"))
plot(r, print.auc = TRUE, print.thres = "best")`,
    read: ['`AUC` 与它的 95% 可信区间', '选定阈值下的**灵敏度**和**特异度**', '有条件再报 LR+ / LR-（它们两端可比）'],
    pit: [
      '**用阳性预测值比较两个试验** —— 它随患病率变，两个人群之间根本不能比',
      '只报 AUC 不报阈值 —— AUC 是把所有阈值平均了，临床上落不了地',
      '**在同一批数据上选阈值又报性能** —— 乐观偏倚，阈值要另拿一批数据验证',
      '把「AUC 0.73」直接说成「判别能力一般」就完事 —— 该说清临床上能不能用'
    ],
    c: CH.diag
  },

  // ── 补充专题：一致性信度 ───────────────────────────────
  kappa: {
    m: 'Kappa 系数（分类资料的一致性）',
    why: '同一批对象被**重复判断**（两次、或两位评定者），判断结果是**没有顺序的类别**，问两次结果一不一致。',
    cond: ['每个对象都被判断了两次或以上', '判断结果是分类变量，且类别之间**没有大小顺序**'],
    note: '**Kappa 已经扣掉了「碰巧一致」的部分**，所以它比「一致率」严格得多：观察一致率 90% 时 Kappa 可能只有 0.44。\n\n**报 Kappa 时要连着报观察一致率和边际分布**，否则读者分不清 Kappa 低是真的不一致、还是类别分布太偏斜造成的。',
    code: `library(irr)
# 两人之间
kappa2(d[, c("评定者1", "评定者2")])
# 多人之间
kappam.fleiss(d)

# 想看一致率是多少（Kappa 要跟它一起报）
mean(d$评定者1 == d$评定者2)`,
    read: ['`Kappa`：扣掉碰巧一致之后的一致性', '`z` 与 `p-value`：Kappa 是不是显著大于 0（**不等于 Kappa 够高**）', '观察一致率 $P_o$'],
    pit: [
      '**给无序类别算加权 Kappa** —— 血型、诊断类别没有顺序，强行编号是在制造不存在的信息',
      '把 Kappa 的分档当成及格线（0.61 以上才算好）—— 原文说得很清楚那只是描述性标签',
      '只报 Kappa 不报 $P_o$ —— 边际分布很偏时 Kappa 会天然偏低（Kappa 悖论）',
      '评定者数量不同却直接比 Kappa —— 两人之间和全体之间的 Kappa 不是一回事'
    ],
    c: CH.agree
  },
  wkappa: {
    m: '加权 Kappa（有序资料的一致性）',
    why: '重复判断的结果**有等级顺序**（1~5 级、轻/中/重），这时「差 1 级」和「差 4 级」不该同等看待。',
    cond: ['每个对象被判断两次或以上', '判断结果是有序分类变量'],
    note: '加权 Kappa 给不同程度的偏离赋不同权重：**线性权重**按等级差线性递减，**平方权重**对大偏差惩罚更狠、算出来的数通常更大。\n\n**必须写明用了哪种权重** —— 同一批数据线性 0.19、平方 0.30，不说权重就没法比较。',
    code: `library(irr)
# irr 里线性权重叫 "equal"，平方权重叫 "squared"
kappa2(d[, c("评定者1", "评定者2")], weight = "equal")    # 线性
kappa2(d[, c("评定者1", "评定者2")], weight = "squared")  # 平方`,
    read: ['加权 `Kappa`（**务必注明是线性还是平方**）', '不加权的 Kappa 一起报，能看出「把等级当无序处理」会低多少', '观察一致率'],
    pit: [
      '不写权重种类 —— 线性与平方能差出一倍',
      '把有序资料当成无序处理 —— Kappa 会被严重低估',
      '反过来给**无序**类别加权 —— 更严重的错误'
    ],
    c: CH.agree
  },
  icc: {
    m: 'ICC 组内相关系数（定量资料的一致性）',
    why: '同一批对象**重复测量**，测出来的是**具体数值**（两台仪器、两位医生量的同一个量），问测得一不一致。',
    cond: ['每个对象被测量两次或以上', '测量结果是定量变量'],
    note: '**ICC 是一族指标，不是一个**。要按三件事选形态并写清楚：**模型**（双向随机 / 双向混合）、**类型**（单次测量 / $k$ 次均值）、**定义**（绝对一致 / 一致性）。\n\n**要判断两台仪器能不能互换，必须用「绝对一致」**：只关心排序的「一致性」定义允许评定者之间有恒定系统偏移（甲永远比乙高 3 分，ICC 仍等于 1）。',
    code: `library(psych)
ICC(d)$results[, c("type", "ICC", "lower bound", "upper bound")]

# 或
library(irr)
icc(d, model = "twoway", type = "agreement", unit = "single")  # ICC(2,1)
icc(d, model = "twoway", type = "agreement", unit = "average") # ICC(2,k)`,
    read: ['`ICC` 点估计**和它的 95% 可信区间**（按区间定档，不是按点估计）', '同一批数据的 ICC(2,1) 与 ICC(2,k) 差多少', '均方 MSR / MSC / MSE —— MSC 比 MSR 大说明「谁在评」比「评的是谁」影响更大'],
    pit: [
      '**用 Pearson 相关系数评价一致性** —— 一组数整体加个常数，相关系数纹丝不动，一致性已经没了',
      '报 ICC 不说清模型/类型/定义 —— 同一批数据能差出好几倍',
      '只看点估计不看可信区间 —— 点估计 0.93 但区间 0.88~0.97 时只能说「好到很好之间」',
      '样本小于 30 例、评定者少于 3 位就下结论 —— 这时可信区间宽得没法用'
    ],
    c: CH.agree
  },
  bland: {
    m: 'Bland-Altman 一致性分析',
    why: '想知道两种测量方法**差多少、差得稳不稳**——ICC 只给一个概括的数，看不出偏倚的大小和形态。',
    cond: ['同一批对象用两种方法（或两次）测量', '测量结果是定量变量'],
    note: '横轴画两法均值、纵轴画两法差值：**差值均数**就是系统偏倚，**差值均数 ± 1.96×差值标准差**是一致性界限。\n\n**它和 ICC 互补**：ICC 回答「能不能区分对象」，Bland-Altman 回答「差多少、差得稳定吗」。两个一起报最清楚。',
    code: `m <- (d$方法1 + d$方法2) / 2      # 横轴：两法均值
diff <- d$方法1 - d$方法2          # 纵轴：两法差值
plot(m, diff, ylim = c(-1, 1) * max(abs(diff)) * 1.5,
     xlab = "两法均值", ylab = "两法差值")
abline(h = mean(diff), col = "blue")             # 偏倚
abline(h = mean(diff) + c(-1, 1) * 1.96 * sd(diff), col = "red", lty = 2)`,
    read: ['`mean(diff)`：系统偏倚（理想情况接近 0）', '一致性界限：偏倚 ± 1.96×差值标准差', '散点的形状：有没有随均值变化的趋势（比例偏倚）'],
    pit: [
      '只看偏倚是否为 0，不看界限宽不宽 —— 偏倚为 0 但界限很宽，两法照样不能互换',
      '差值明显不服从正态时硬套 ±1.96×SD —— 界限的覆盖率就不准了',
      '用相关系数代替它 —— 相关完全看不出系统偏倚'
    ],
    c: CH.agree
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
 */
function normalizeResult(r) {
  const out = { method: r.m, why: r.why }
  if (r.cond) out.cond = r.cond
  if (r.note) out.note = r.note
  if (r.criteria) out.criteria = r.criteria
  if (r.code) out.code = r.code
  if (r.read) out.read = r.read
  if (r.pit) out.pit = r.pit
  out.c = Array.isArray(r.c) ? ch(r.c) : r.c // 数组 → {text, link}
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
  { key: 'quantitative', text: '具体数值', detail: '身高、血压、白细胞计数、量表总分……' },
  { key: 'binary', text: '只有两类', detail: '男/女、存活/死亡、阳性/阴性……' },
  { key: 'categorical', text: '三类以上', detail: 'A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级' }
]

const DIST_OPTS = [
  {
    key: 'unknown',
    text: '不确定 / 每组不到 40 例 / 图上有明显偏态或极端值',
    detail: '选这一项最安全 —— 会推荐不依赖分布假设的方法',
    maps: 'abnormal'
  },
  { key: 'normal', text: '每组 40 例以上，直方图基本对称、没有离群点', detail: '', maps: 'normal' },
  { key: 'abnormal', text: '每组 40 例以上，但分布明显偏态', detail: '', maps: 'abnormal' }
]

/** 生成「尺度 → （分布 →）结果」这一段 */
function buildScaleBranch(designKey, rule, idOfScaleQuestion) {
  const opts = []
  for (const so of SCALE_OPTS) {
    const target = rule.scale[so.key]
    if (!target) {
      opts.push({ text: so.text, detail: so.detail, next: pushResult('none-' + designKey + so.key, R.none) })
      continue
    }
    if (!rule.askDist) {
      // 直接出结果，或者内部还要再问一层（生存分析/关联已单独处理）
      const res = typeof target === 'object' && target.m ? target : R.none
      opts.push({ text: so.text, detail: so.detail, next: pushResult(designKey + '-' + so.key, res) })
      continue
    }
    // 定量才有分布分支
    if (so.key !== 'quantitative') {
      const res = typeof target === 'object' && target.m ? target : R.none
      opts.push({ text: so.text, detail: so.detail, next: pushResult(designKey + '-' + so.key, res) })
      continue
    }
    const distId = nextId++
    const distOpts = DIST_OPTS.map((d) => ({
      text: d.text,
      detail: d.detail,
      next: pushResult(designKey + '-quantitative-' + d.maps, target[d.maps])
    }))
    nodes.push({
      id: distId,
      question: '这批数据的样本量和外形大概是什么样？',
      hint: '拿不准就选第一项 —— 会给你不依赖分布假设的稳妥方法',
      options: distOpts
    })
    opts.push({ text: so.text, detail: so.detail, next: distId })
  }
  return opts
}

// Q1 设计
const designId = 1
const designQ = {
  id: designId,
  question: '你手上的数据是怎么来的？',
  hint: '选最贴近的一项。拿不准就先选「只是想描述一下」—— 描述性分析不会出错。',
  options: []
}
nodes.push(designQ)

const designs = [
  ['descriptive', '只是想看看这批数据长什么样', '还没打算做检验，先做描述性统计'],
  ['oneSample', '一组对象，要和某个已知标准比', '比如 120 名男生的平均身高 vs 全国平均水平'],
  ['paired', '同一批对象测了两次', '用药前后、左右眼、同一份标本两种方法测'],
  ['twoIndependent', '两组不同的对象', '试验组 vs 对照组，两组互不相干'],
  ['multiIndependent', '三组及以上不同的对象', '三种剂量组比较'],
  ['repeated', '同一批对象测了三次及以上', '术后 1 个月、3 个月、6 个月各测一次'],
  ['survival', '随访资料', '有「随访多久」和「有没有发生结局」两列'],
  ['association', '想看两个变量之间的关系', '不分组，就看两个指标之间有没有关系'],
  ['diagnostic', '手上有个诊断指标，想评价它准不准', '有金标准的诊断结论 + 该指标的测量值，比如 s100b 能不能判断脑损伤'],
  ['agreement', '同一批对象重复测/重复判，想看看一不一致', '两位医生看同一批片子、两台仪器测同一批样本']
]

for (const [key, text, detail] of designs) {
  const rule = RULES[key]
  if (key === 'survival') {
    const id = nextId++
    nodes.push({
      id,
      question: '生存分析想解决哪个问题？',
      hint: '',
      options: [
        { text: '估计生存率、看生存曲线', detail: '画出随时间变化的生存曲线，求中位生存时间', next: pushResult('surv-curve', R.km) },
        { text: '比较两组的生存曲线', detail: '比如两种治疗方案谁的生存率更高', next: pushResult('surv-cmp', R.logrank) },
        { text: '看多个因素对生存的影响', detail: '年龄、分期、治疗方式一起分析', next: pushResult('surv-model', R.cox) }
      ]
    })
    designQ.options.push({ text, detail, next: id })
    continue
  }
  if (key === 'association') {
    const id = nextId++
    nodes.push({
      id,
      question: '这两个变量分别是什么类型？',
      hint: '',
      options: [
        { text: '都是具体数值', detail: '比如身高与体重、年龄与血压', next: associationQQ() },
        { text: '至少一个是分类变量', detail: '比如血型与疾病、性别与疗效', next: pushResult('assoc-cc', R.odds) }
      ]
    })
    designQ.options.push({ text, detail, next: id })
    continue
  }
  if (key === 'diagnostic') {
    const id = nextId++
    nodes.push({
      id,
      question: '这个指标是拿来干什么的？',
      hint: '同一个指标，用在不同位置，评价的指标也不一样',
      options: [
        {
          text: '把病人和非病人分开',
          detail: '有金标准的诊断结论，要看这个指标判别得准不准',
          next: pushResult('diag-roc', R.diagRoc)
        },
        {
          text: '判断两次测量的结果一不一致',
          detail: '不是比较差别，而是问重复得好不好 —— 可以选下面这个分支',
          next: pushResult('diag-agree-hint', R.icc)
        }
      ]
    })
    designQ.options.push({ text, detail, next: id })
    continue
  }
  if (key === 'agreement') {
    const id = nextId++
    nodes.push({
      id,
      question: '重复测量/重复判断的结果是什么类型？',
      hint: '',
      options: [
        {
          text: '没有顺序的类别',
          detail: '阳性/阴性、几种诊断类别、血型',
          next: pushResult('agree-nominal', R.kappa)
        },
        {
          text: '有等级顺序',
          detail: '1~5 级评分、轻/中/重',
          next: pushResult('agree-ordinal', R.wkappa)
        },
        {
          text: '具体数值',
          detail: '血压、量表总分、仪器读数',
          next: pushResult('agree-quant', R.icc)
        },
        {
          text: '具体数值，而且想知道两法差多少、差得稳不稳',
          detail: '除了概括的一致性，还想看系统偏倚有多大',
          next: pushResult('agree-bland', R.bland)
        }
      ]
    })
    designQ.options.push({ text, detail, next: id })
    continue
  }
  const scaleId = nextId++
  nodes.push({
    id: scaleId,
    question: '要分析的那个指标长什么样？',
    hint: '说的是你要比较/描述的那一个指标，不是全部变量',
    options: buildScaleBranch(key, rule, scaleId)
  })
  designQ.options.push({ text, detail, next: scaleId })
}

function associationQQ() {
  const id = nextId++
  nodes.push({
    id,
    question: '这两个数值变量之间是什么关系？',
    hint: '',
    options: [
      { text: '看起来大致是直线', detail: '散点图上的点沿着一条直线走', next: pushResult('assoc-qq-linear', R.pearson) },
      { text: '只是一起增大或减小，不是直线', detail: '', next: pushResult('assoc-qq-monotone', R.spearman) },
      { text: '想用一个去预测另一个', detail: '比如用身高预测肺活量', next: pushResult('assoc-qq-predict', R.linreg) }
    ]
  })
  return id
}

// 排序：问卷节点按 id，结果节点在后
const qNodes = nodes.filter((n) => !n.result).sort((a, b) => a.id - b.id)
const rNodes = nodes.filter((n) => n.result).sort((a, b) => a.id - b.id)

const tree = { nodes: [...qNodes, ...rNodes] }
// 写成 TS 模块直接 import —— 不走 fetch，避免异步加载失败导致组件卡在"正在加载"
/** 写文件：顺手把目录建出来，_dev/ 不入库，干净clone 里可能不存在 */
function writeOut(p, s) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, s, 'utf8')
}

const ts = `/**
 * 统计方法选择器题库 —— 由 scripts/generate-selector.mjs 从规则表生成，请勿手改。
 * 改规则请改生成脚本，然后重跑它。
 */
export interface SelectorOption { text: string; detail?: string; next: number }
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
export const selectorTree: { nodes: SelectorNode[] } = ${JSON.stringify(tree, null, 2)}
`
fs.writeFileSync('docs/.vitepress/theme/selector-data.ts', ts, 'utf8')
writeOut('_dev/selector-tree.json', JSON.stringify(tree, null, 2))
console.log(`✓ theme/selector-data.ts：${qNodes.length} 个问题节点 + ${rNodes.length} 个结论节点`)

// ── 生成决策速查表 ─────────────────────────────────────
function row(m, cond, chp) {
  return `| ${m} | ${cond} | [${chp[0]}](${chp[1]}) |`
}

const table = []
table.push('| 情况 | 用什么方法 | 对应章节 |')
table.push('| --- | --- | --- |')
table.push(row('描述定量资料', '大致对称 → 均数 ± 标准差；偏态或有极端值 → 中位数（四分位数间距）', CH.desc))
table.push(row('描述分类资料', '频数 + 率（二分类）或构成比（多分类）', CH.descQ))
table.push(row('一组 vs 已知值（定量）', '近似正态 → 单样本 t 检验；不满足 → Wilcoxon 符号秩检验', CH.t))
table.push(row('一组 vs 已知率（二分类）', '二项检验', CH.est))
table.push(row('一组多分类 vs 理论分布', '拟合优度卡方检验', CH.chi))
table.push(row('配对（定量）', '差值近似正态 → 配对 t 检验；不满足 → Wilcoxon 符号秩检验', CH.t))
table.push(row('配对（二分类）', 'McNemar 检验', CH.chi))
table.push(row('两独立组（定量）', '近似正态 → 两独立样本 t 检验（推荐用 Welch）；不满足 → Mann-Whitney U 检验', CH.t))
table.push(row('两独立组（二分类）', '四格表卡方检验：n ≥ 40 且 T ≥ 5 不校正；1 ≤ T < 5 要校正；n < 40 或有 T < 1 用 Fisher', CH.chi))
table.push(row('两组及以上（无序多分类）', '行 × 列表卡方检验（理论频数不足时合并类别或改确切概率法）', CH.chi))
table.push(row('多独立组（定量）', '近似正态且方差齐 → 单因素方差分析 + 两两比较；方差不齐 → Welch 方差分析；不正态 → Kruskal-Wallis 检验', CH.anova))
table.push(row('两组及以上（有序分类）', 'Mann-Whitney U 检验（两组）或 Kruskal-Wallis 检验（多组）', CH.np))
table.push(row('重复测量（定量）', '重复测量方差分析（注意球形性）', CH.anova))
table.push(row('重复测量（有序）', 'Friedman 检验', CH.np))
table.push(row('随访：估计生存曲线', 'Kaplan-Meier 法', CH.surv))
table.push(row('随访：比较生存曲线', 'Log-rank 检验', CH.surv))
table.push(row('随访：多因素分析', 'Cox 比例风险回归（看 HR，先检验比例风险假定）', CH.surv))
table.push(row('两个定量变量：看关系', '直线关系 → Pearson 相关；单调非直线 → Spearman 秩相关', CH.biv))
table.push(row('两个定量变量：做预测', '直线回归（先画残差诊断图）', CH.reg))
table.push(row('两个分类变量：看关联', '卡方独立性检验 + 优势比 OR / 相对危险度 RR', CH.biv))
table.push(row('评价一个诊断指标（有金标准）', 'ROC 曲线 + AUC；阈值按临床代价定，报告该阈值下的灵敏度与特异度', CH.diag))
table.push(row('重复判断：没有顺序的类别', 'Kappa 系数（两人用 Cohen，多人用 Fleiss）；和观察一致率一起报', CH.agree))
table.push(row('重复判断：有等级顺序', '加权 Kappa（必须注明线性还是平方权重）', CH.agree))
table.push(row('重复测量：具体数值', 'ICC（写清模型/类型/定义，并报可信区间）；想知道差多少再加 Bland-Altman', CH.agree))

writeOut('_dev/selector-table.md', table.join('\n') + '\n')
console.log(`✓ _dev/selector-table.md：${table.length - 2} 行决策速查表`)

// ── 自检：所有 next 指向存在的节点 ─────────────────────
const ids = new Set(nodes.map((n) => n.id))
let bad = 0
for (const n of nodes) {
  for (const o of n.options || []) {
    if (o.next !== undefined && !ids.has(o.next)) {
      console.log(`✗ #${n.id} 的选项「${o.text}」指向不存在的 #${o.next}`)
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
console.log(bad ? `✗ ${bad} 处坏指向` : '✓ 所有跳转都指向存在的节点')
console.log(unreachable.length ? `✗ 有 ${unreachable.length} 个节点无法到达` : '✓ 所有节点都可达')
console.log(`结论里用到的方法共 ${resultNodes.size} 种`)
