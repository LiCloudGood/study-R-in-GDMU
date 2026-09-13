# study-R-in-GDMU

广东医科大学 R 语言课程学习资料与在线讲义。

🌐 在线阅读：<https://licloudgood.github.io/study-R-in-GDMU/>

## 仓库里有什么

| 目录 | 内容 | 说明 |
| --- | --- | --- |
| `原题/` | 各周 Word 文档、R 脚本、数据文件 | 学校下发的原始练习资料 |
| `答案/` | 各周写好的 R 脚本 | 与 `原题` 一一对应 |
| `汇总/` | 各周整理好的 HTML 与 PDF | 原题 + 答案的合集 |
| `intro-it/`、`Medical-Big-Data-Analysis/`、`Health-statistics/` | 在线讲义的 Markdown 源码 | 由上述资料二次整理而成 |
| `.vitepress/` | 站点配置与自定义主题 | VitePress |

> `原题`、`答案`、`汇总` 三个文件夹保存的是最初整理好的原始资料，内容不做任何改动。

## 本地开发

```bash
npm install       # 安装依赖
npm run docs:dev  # 本地预览，默认 http://localhost:5173/study-R-in-GDMU/
npm run docs:build   # 生成静态站点到 .vitepress/dist
npm run docs:preview # 预览构建结果
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

## 自定义组件

在任意 Markdown 页面中可以直接使用（无需 import）：

### 折叠解答 `<ClickAnswer>`

```md
<ClickAnswer>
这里是解答内容，支持 Markdown 和公式，例如 $\sqrt{2}$。
</ClickAnswer>
```

可用属性：`initially-open`、`show-text`、`hide-text`、`theme`、`animation`、`icon-position`。

### 参考答案卡片 `<AnswerBlock>`

```md
<script setup>
const code = `mean(1:10)`
</script>

<AnswerBlock title="实验一 · 参考答案" :code="code" />
```

答案**默认是收起的**，学生先自己动手试，想看了再点「👀 查看参考答案」展开，
这样不会一上来就被答案剧透。展开后右上角会出现「📋 复制」，方便直接粘到 RStudio 里跑。

可用属性：

| 属性 | 说明 |
| --- | --- |
| `code` | 答案的 R 代码（必填） |
| `title` | 卡片标题，如 `"实验一 · 参考答案"` |
| `description` | 补充说明，显示在代码上方 |
| `output` | 事先跑好的**文字输出**，原样显示并保留换行 |
| `images` | 事先跑好的**图**，`public/` 下的路径数组 |
| `defaultOpen` | 是否默认展开（默认收起） |

```md
<AnswerBlock
  title="实验题 1 · 参考答案"
  :code="code1101"
  :output="out1101"
  :images="['/figures/10-ggplot2/unnamed-chunk-7-1.png']"
/>
```

#### 为什么不做「在线运行」

早期版本用过 [WebR](https://webr.r-wasm.org/) 在浏览器里现场执行 R，最后**放弃了**，原因是：

1. **入口不稳定**：官方下架了旧的 `latest/webr.js`（返回 **403**），
   换成 ES Module 的 `latest/webr.mjs` 才通；这类地址随上游变动，页面随时会挂。
2. **报错处理麻烦**：新版删掉了 `webR.io`，必须改用 `Shelter.captureR()`；
   而且它返回的 `error` 项里 `data` 是 `RObject` 而不是字符串，要额外降级处理。
3. **执行会中断**：本课程很多题目**故意会报错**（那是考点），
   但 WebR 里一旦报错，后面的代码就不再执行，反而把教学效果搞坏了。
4. **首屏负担**：首次点击要下载约 10 MB 的运行时。

现在改成**预先生成好结果**：答案代码、文字输出、输出图形都是**静态内容**，
打开就能看到、离线可用、不受网络和浏览器兼容性影响，页面也不再引入任何在线执行逻辑。

> ⚠️ 因此**不要**再往 `AnswerBlock` 上传 `:packages` / `:files` 之类的在线运行属性，
> 它们已经不生效了。答案代码用到的包，在讲义正文里已经交代过。

### 输出图与题面配图的存放位置

预先跑好的图放在 `public/figures/` 下，按讲次分目录：

```text
public/figures/
├── 09-question/          # 第 9 讲的题面配图 图1~图15
├── 09-base-graphics/     # 第 9 讲的答案输出图 15 张
├── 10-question/          # 第 10 讲的题面配图 图1~图7
└── 10-ggplot2/           # 第 10 讲的答案输出图 8 张
```

图片直接来自 `汇总/*_files/figure-html/`，**不是重新跑一遍的结果**，
所以和 汇总 HTML/PDF 里的图完全一致。那里有两套图，别搞混：

| 文件名 | 是什么 | 从哪来 |
| --- | --- | --- |
| `图N-1.png` | **题面配图**，原题正文里「如图 N 所示」指的就是它 | 原题部分里 `echo = FALSE` 的 chunk（标签为 `图N`）|
| `unnamed-chunk-N-M.png` | **答案输出图**，答案代码跑出来的实际图形 | 答案部分里没起名字的 chunk |

> 题面配图用 `<div class="q-figures">` 排版（样式在 `.vitepress/theme/style.css`），
> 插在每道题的题目后面、参考答案卡片之前；答案输出图用 `<AnswerBlock>` 的 `:images`。

**题号 ↔ 图号不是猜的**，有两份独立证据对得上：

- 原题 docx 正文：第 9 讲写着「效果如图1所示」「绘制图3所示的柱状图」「按图5的样式」…
  第 10 讲写着「绘制如下图1所示的图形」「绘制如图2所示的图形」…
- 汇总 HTML 里每张图所处的分节标题（第 9 讲是「题目一:」…「题目九:」，
  第 10 讲是「题目一:」…「题目六:」）

两边的张数也完全吻合。第 9 讲对应的输出图是 chunk 3~11（答案分组），
`unnamed-chunk-2-*`、`-7-2`、`-9-2` 这 4 张在 HTML 里没有任何引用，
是早先渲染残留的孤儿文件，已删掉。

> `AnswerBlock` 会自动给 `/figures/...` 补上部署前缀，
> 但在 Markdown 里手写 `<img>` 时**必须**用 `:src="withBase('...')"`，
> 并记得在该页的 `<script setup>` 里 `import { withBase } from 'vitepress'`，
> 否则部署到子路径下会 404。

### 关于「运行结果」的覆盖率

目前的状态：

| 内容 | 覆盖情况 |
| --- | --- |
| 答案代码 | 85 张卡片，全部都有 |
| 题面配图 | 第 9 讲 15 张（图1~图15）、第 10 讲 7 张（图1~图7）|
| 输出图形 | 第 9 讲 15 张、第 10 讲 8 张，都放进对应题目的答案卡片 |
| 文字输出 | 11 张卡片 |

文字输出覆盖得少，**是刻意的**，不是漏做：

- 讲义里的部分答案代码是**重新写的解法**（加了讲解、换了写法），
  和 汇总 HTML 里的源码不是同一段。这种情况下如果把 汇总 的输出贴过来，
  **显示的结果和显示出来的代码对不上**，是严重的误导，所以宁可不贴。
- 有几道题用的是 `rnorm()` / `runif()` 之类的**随机数据**，
  本来就每次结果都不同，贴固定输出没有意义。
- 还有些答案只定义函数、不打印任何东西，跑完确实没有输出可贴。

校验办法：把讲义代码和 汇总 源码去掉所有空白后比对，
只有**逐句实质相同**（差异仅在注释和空白）的才接上输出。

> 完整的运行结果请看仓库根目录的 `汇总/*.html`（或同目录的 PDF），
> 那里是把 原题 的参考答案**从头到尾完整跑一遍**的结果。

### 学习进度清单 `<TrackList>`

```md
<TrackList :tasks="['安装 R', '安装 RStudio', '跑通第一段代码']" />
```

勾选状态保存在浏览器 localStorage 里，按页面路径分开存。

### 统计方法选择器 `<ChoiceFlow>`

```md
<ChoiceFlow />
```

交互式问答，最后给出推荐的统计方法。题库放在 `public/tree-normal.json`、
`public/tree-med.json`、`public/tree-expert.json`，分别对应普通版 / 医学生版 / 专家版。

> 可选属性 `show-detail-link`（默认 `false`）：打开后会显示「查看完整教程 →」链接，
> 指向 `/method/<方法名>` 页面。本仓库还没有这些页面，等你写好后在各页面把它打开即可。

## 数学公式

站点已开启 VitePress 内置的 math 支持（`markdown-it-mathjax3`），直接使用 `$...$` 与 `$$...$$`：

```md
行内公式 $\dfrac{-b+\sqrt{b^2-4ac}}{2a}$

$$
\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}
$$
```

## 进度

- [x] 第 1 讲 软件及其软件包安装和脚本编写
- [x] 第 2 讲 向量与矩阵
- [x] 第 3 讲 数组与数据框
- [x] 第 4 讲 列表与因子
- [x] 第 5 讲 日期、字符与特殊值处理
- [x] 第 6 讲 输入、输出
- [x] 第 7 讲 分支与循环
- [x] 第 8 讲 自定义函数
- [x] 第 9 讲 高级绘图
- [x] 第 10 讲 ggplot2包
- [x] 第 11 讲 参数估计
- [x] 第 12 讲 参数假设检验
- [x] 第 13 讲 同分布检验与列联表检验

全部 13 讲已整理完成 ✅

## 整理新一讲的流程

`原题` 里的 Word 文档用 MathType 写了很多公式，直接复制会丢内容，所以本仓库自带一个提取脚本：

```bash
node scripts/extract-docx.mjs "原题/第三周原题/数组与数据框.docx"
```

它会打印正文，并且：

- 把文档里的公式替换成 `[[公式N:media/imageN.wmf]]` 占位符，一眼就能看到「这里有张公式图」；
- 解码每个公式图里实际画了哪些字符（按行输出），矩阵、分式这类二维结构就能照着还原成 LaTeX。

然后按这个顺序整理一讲：

1. 用上面的脚本取出题目；
2. 从 `答案/第N周答案/test*.R` 取答案代码；
3. 仿照 `intro-it/2-vectors-and-matrices.md` 的结构写页面：
   题目用有序列表，答案用 `<AnswerBlock :code="..." />`，
   关键知识点用 `::: tip` / `::: warning` 补充；
4. 同时更新 `.vitepress/config.mts` 里 `lectures` 数组的 `link`；
5. 用 `npm run docs:dev` 预览确认公式和组件都正常。

## 说明

本站题目与背景来源于学校课程，内容与形式均为个人兴趣爱好，文档中所涉及的内容均为个人理解，如有错误欢迎指正。

## 关于制作

- **课程资料**（`原题` / `答案` / `汇总`）：由 [Li_CloudGood](https://github.com/LiCloudGood) 整理提供。
- **网页实现**：站点基于 [VitePress](https://vitepress.dev/) 构建。页面结构、自定义主题组件、
  网页讲义排版与公式还原，由 Li_CloudGood 提出设想与需求，与 DeepSeek Harness 驱动的 AI 助手协作完成——
  其中也包括从 docx 的 MathType 二进制里把丢失的公式「挖」回来。
