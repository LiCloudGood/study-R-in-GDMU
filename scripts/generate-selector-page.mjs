/**
 * 生成 `docs/Health-statistics/choice.md`：
 * 页面正文是固定的，只有决策速查表从 _dev/selector-table.md 注入，
 * 保证速查表和交互流程永远出自同一份规则。
 *
 * 用法（先跑生成规则的那个，它会写出速查表）：
 *     node scripts/generate-selector.mjs
 *     node scripts/generate-selector-page.mjs
 *
 * 注意：这个脚本会**整个覆盖** choice.md，改动请改这里再重跑，
 * 不要直接改 choice.md —— 否则下次一跑就没了。
 */
import fs from 'node:fs'

const table = fs
  .readFileSync(new URL('../_dev/selector-table.md', import.meta.url), 'utf8')
  .trim()

const page = `---
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

${table}

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
`

fs.writeFileSync('docs/Health-statistics/choice.md', page, 'utf8')
console.log('✓ docs/Health-statistics/choice.md 已生成（含流程图 + 决策速查表）')
