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
| 评价一个诊断指标（有金标准） | ROC 曲线 + AUC；阈值按临床代价定，报告该阈值下的灵敏度与特异度 | [诊断试验评价（ROC 与 AUC）](/Health-statistics/diagnostic-test) |
| 重复判断：没有顺序的类别 | Kappa 系数（两人用 Cohen，多人用 Fleiss）；和观察一致率一起报 | [一致性信度（Kappa 与 ICC）](/Health-statistics/agreement-reliability) |
| 重复判断：有等级顺序 | 加权 Kappa（必须注明线性还是平方权重） | [一致性信度（Kappa 与 ICC）](/Health-statistics/agreement-reliability) |
| 重复测量：具体数值 | ICC（写清模型/类型/定义，并报可信区间）；想知道差多少再加 Bland-Altman | [一致性信度（Kappa 与 ICC）](/Health-statistics/agreement-reliability) |

## 前辈做的同类工具

下面这些前辈做得比我们早、也比我们全，
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
:::

## 和前辈的工具比

前辈们做的选择器比我们厉害很多，方法和深度上都差得远。

我们的长处是跟课程连在一起。每个结论都能点回对应的知识点章节，章节里又把
《信息技术基础》和《医学大数据分析与决策》那边的讲义和练习连了起来，
所以适合边上课边查，学到哪一章就查哪一章。

要写论文、做课题的同学，直接用 [ChooseMyStat](https://choose-my-stat.vercel.app) 更合适。

::: warning 最后提醒一句
推荐出来的方法只是个起点。请回去把**适用条件**仔细核对一遍，
特别是研究设计对不对、指标类型对不对这两条。
:::

祝各位学习、科研都顺利。
