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
这样不会一上来就被答案剧透。

展开后右上角会出现「📋 复制」和「▶ 运行」：点「▶ 运行」才会通过
[WebR](https://webr.r-wasm.org/) 在浏览器里真实执行这段 R 代码，**不需要安装 R**，
画出来的图也会显示在输出区。

> 首次运行需要从 CDN 下载约 10 MB 的 WebR 运行环境，因此只有点击「运行」时才加载。
>
> 想默认展开（比如放在讲义末尾当附录），加上 `default-open` 即可：
> `<AnswerBlock :code="code" default-open />`

#### ⚠️ 两个必须记住的 WebR 坑

1. **入口地址**：官方已下架旧的 `latest/webr.js`（现在返回 **403**），
   现行入口是 ES Module 形式的 `latest/webr.mjs`，**不要把地址改回去**。
2. **输出捕获**：新版已经**删掉了 `webR.io`**，老写法
   `webR.io.stdout.on('data', ...)` 会直接抛
   `Cannot read properties of undefined (reading 'stdout')`。
   正确做法是用 `Shelter.captureR()`，它一次性返回文本输出、报错和图片。

这两点都封装在 `.vitepress/theme/webr.ts` 里了，新组件请直接复用：

```ts
import { runR, getWebR, drawImages, describeError } from '../webr'
```

详见 [官方文档](https://docs.r-wasm.org/webr/latest/evaluating.html)。

### 交互式 R 代码块 `<RBlock>`

```md
<RBlock />
```

读者可以自己在框里改代码、反复运行，还能「重置环境」清空所有变量。适合放演示性质的例子。

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
- [ ] 第 5~13 讲（整理中）

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
  讲义排版与公式还原，由 Li_CloudGood 提出设想与需求，与 DeepSeek Harness 驱动的 AI 助手协作完成——
  其中也包括从 docx 的 MathType 二进制里把丢失的公式「挖」回来。
