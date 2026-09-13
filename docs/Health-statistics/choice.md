---
layout: doc
title: 统计方法选择器
---

# 统计方法选择器

手上有一份数据，不知道该用哪个统计方法？跟着下面走一遍三步问答，
它会告诉你**用什么方法、要满足什么条件、R 里怎么写、输出看哪几个数、容易踩什么坑**，
最后直接跳到《卫生统计学》对应那一章。

::: tip 它是怎么判断的
这个选择器**只问你能直接观察到的事实**（数据是怎么来的、指标长什么样、大概多少例），
**不问你"数据是不是正态分布"这种需要统计判断才能回答的问题** ——
那种判断正是要学的，不该当成前提。拿不准的地方，它会推荐**更稳妥的那条路**
（不依赖分布假设的方法），并告诉你怎么回头确认。
:::

## 三步

<div class="sf-flow">
  <div class="sf-step">
    <div class="sf-n">1</div>
    <div class="sf-t">数据是怎么来的</div>
    <div class="sf-d">同一批人测两次？两组不同的人？还是随访资料？<br>这一步定的是<b>研究设计</b>，选错了后面全错。</div>
  </div>
  <div class="sf-arrow">→</div>
  <div class="sf-step">
    <div class="sf-n">2</div>
    <div class="sf-t">指标长什么样</div>
    <div class="sf-d">具体数值？只有两类？三类以上有没有顺序？<br>这一步定的是<b>测量尺度</b>，决定用参数还是非参数。</div>
  </div>
  <div class="sf-arrow">→</div>
  <div class="sf-step">
    <div class="sf-n">3</div>
    <div class="sf-t">多少例、偏不偏</div>
    <div class="sf-d">每组 40 例以上、基本对称？还是不确定？<br>这一步只问<b>观察得到的特征</b>。</div>
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

## 开始选择

<ChoiceFlow />

## 决策速查表

不想一步步点、或者想直接对着表查，看下面这张。**它和上面的问答出自同一份规则**，
所以两边不会打架：

| 情况 | 用什么方法 | 对应章节 |
| --- | --- | --- |
| 描述定量资料 | 大致对称 → 均数 ± 标准差；偏态或有极端值 → 中位数（四分位数间距） | [第 4 章 定量资料的统计描述](/Health-statistics/04-describing-quantitative-data) |
| 描述分类资料 | 频数 + 率（二分类）或构成比（多分类） | [第 5 章 定性资料的统计描述](/Health-statistics/05-describing-qualitative-data) |
| 一组 vs 已知值（定量） | 近似正态 → 单样本 t 检验；不满足 → Wilcoxon 符号秩检验 | [第 8 章 t 检验](/Health-statistics/08-t-test) |
| 一组 vs 已知率（二分类） | 二项检验 | [第 6 章 总体均数与总体率的估计](/Health-statistics/06-estimation) |
| 一组多分类 vs 理论分布 | 拟合优度卡方检验 | [第 10 章 卡方检验](/Health-statistics/10-chi-square) |
| 配对（定量） | 差值近似正态 → 配对 t 检验；不满足 → Wilcoxon 符号秩检验 | [第 8 章 t 检验](/Health-statistics/08-t-test) |
| 配对（二分类） | McNemar 检验 | [第 10 章 卡方检验](/Health-statistics/10-chi-square) |
| 两独立组（定量） | 近似正态 → 两独立样本 t 检验（推荐用 Welch）；不满足 → Mann-Whitney U 检验 | [第 8 章 t 检验](/Health-statistics/08-t-test) |
| 两独立组（二分类） | 四格表卡方检验：n ≥ 40 且 T ≥ 5 不校正；1 ≤ T < 5 要校正；n < 40 或有 T < 1 用 Fisher | [第 10 章 卡方检验](/Health-statistics/10-chi-square) |
| 两组及以上（无序多分类） | 行 × 列表卡方检验（理论频数不足时合并类别或改确切概率法） | [第 10 章 卡方检验](/Health-statistics/10-chi-square) |
| 多独立组（定量） | 近似正态且方差齐 → 单因素方差分析 + 两两比较；方差不齐 → Welch 方差分析；不正态 → Kruskal-Wallis 检验 | [第 9 章 方差分析](/Health-statistics/09-anova) |
| 两组及以上（有序分类） | Mann-Whitney U 检验（两组）或 Kruskal-Wallis 检验（多组） | [第 11 章 非参数检验与秩和检验](/Health-statistics/11-nonparametric) |
| 重复测量（定量） | 重复测量方差分析（注意球形性） | [第 9 章 方差分析](/Health-statistics/09-anova) |
| 重复测量（有序） | Friedman 检验 | [第 11 章 非参数检验与秩和检验](/Health-statistics/11-nonparametric) |
| 随访：估计生存曲线 | Kaplan-Meier 法 | [第 14 章 生存分析](/Health-statistics/14-survival-analysis) |
| 随访：比较生存曲线 | Log-rank 检验 | [第 14 章 生存分析](/Health-statistics/14-survival-analysis) |
| 随访：多因素分析 | Cox 比例风险回归（看 HR，先检验比例风险假定） | [第 14 章 生存分析](/Health-statistics/14-survival-analysis) |
| 两个定量变量：看关系 | 直线关系 → Pearson 相关；单调非直线 → Spearman 秩相关 | [第 12 章 双变量关联性分析](/Health-statistics/12-bivariate-association) |
| 两个定量变量：做预测 | 直线回归（先画残差诊断图） | [第 13 章 直线回归](/Health-statistics/13-linear-regression) |
| 两个分类变量：看关联 | 卡方独立性检验 + 优势比 OR / 相对危险度 RR | [第 12 章 双变量关联性分析](/Health-statistics/12-bivariate-association) |

## 前辈做的同类工具

统计方法选择器**不是我们想出来的**。下面这些前辈做得比我们早、也比我们全，
建议对照着一起用：

| 工具 | 语言 | 说明 |
| --- | --- | --- |
| **[ChooseMyStat](https://choose-my-stat.vercel.app)** ⚠️ | 英文 | 目前最接近本页的工具：覆盖 18 个检验 + 诊断准确性 + 一致性信度，每个推荐还给统计分析计划段落、结果报告示例、操作指引和 R 代码，并用 105 篇论文验证过 |
| **[UCLA IDRE：该用哪个统计检验](https://stats.oarc.ucla.edu/other/mult-pkg/whatstat/)** | 英文 | 最经典的决策表，条目最全 |
| **[StatsToDo](https://www.statstodo.com)** · **[GraphPad 的检验选择器](https://www.graphpad.com/quickcalcs/)** | 英文 | 交互式引导，能很快定位检验名 |
| **[MUSI](https://zenodo.org/records/10653965)** | 英文 | 以学术论文形式描述的选择工具 |
| **[ChooseMyStat 的论文](https://www.medrxiv.org/content/10.64898/2026.06.02.26354730v1.full)** | 英文 | 讲这类工具怎么设计、怎么验证，想了解思路可以读 |

::: warning ⚠️ 关于访问
上面前四个是**国外网站**，**国内可能打不开，需要科学上网工具**。
打不开也没关系 —— 本页的内容是独立的，不依赖它们。
:::

## 我们的位置

**我们做的是同一件事，只是换了个场景**：前辈们的工具面向写论文的研究生，
我们的读者是上实验课的本科生，所以按本站的课程内容做了点调整。

设计上**主要参考了 ChooseMyStat** 的两点做法：

1. **决策顺序** —— 先按变量类型分，再看组数与配对、分布假设；
2. **把「正态性」当作使用者自己提供的参数** —— 而不是让工具去替他做检验。

要说我们有什么不一样，大概只有这么三点，而且都不大：

- **中文，按国内教材的讲法**：四格表三种写法的判据、两两比较要校正检验水准、
  率的标准化等等，都是照着国内《卫生统计学》的习惯写的；
- **和本站讲义连在一起**：每个结论都能点到对应章节，讲义那边也会链回来；
- **图和表出自同一份规则**：下面的决策速查表和上面的问答是同一套数据生成的，
  改一处两边一起变，不会出现"表里写的和实际推荐不一致"。

::: tip 我们比前辈差在哪（如实说）
- **覆盖面小得多** —— 只覆盖本站 17 章讲到的方法；
  **诊断准确性（灵敏度/特异度/ROC）**和**一致性信度（Kappa、ICC）**
  这两块临床很常用的内容，ChooseMyStat 有、我们还没有；
- **没有结果报告示例** —— 它会给一段「结果该怎么写」的范文，我们没有；
- **只有中文**，也没有 JASP 这类图形界面的操作指引。

> 要写论文、做课题的同学，建议直接用 [ChooseMyStat](https://choose-my-stat.vercel.app)；
> 我们这份更适合配合课程边学边用。
:::

## 这个选择器不做什么

说清楚边界，免得误用：

- **它不给样本量**。算样本量是研究**开始前**该做的事，见《卫生统计学》第 17 章；
  这里的"多少例"只是用来判断能不能用参数方法。
- **它不处理多因素模型**。多变量建模（多元回归、logistic、Cox）要先看因变量类型、
  样本量够不够、自变量之间有没有共线，不是几道选择题能定的 ——
  上面只在"随访 + 多因素"和"用一个变量预测另一个"这两个入口给了一个起点。
- **它替代不了对研究设计的理解**。第一步如果选错了（比如把配对设计当成两组独立的人），
  后面算得再对也是错的。**设计上的事没人能替你判断。**
- **它只覆盖本站 17 章讲到的内容**。超出范围的情况会明确说"本课程未覆盖"，
  而不是硬凑一个方法给你。

::: warning 最后一件事
选择器给的是**起点，不是结论**。拿到推荐之后，请务必回到对应章节把**适用条件**
读一遍 —— 尤其是研究设计对不对、指标类型对不对。这两条错了，方法再对也没用。
:::
