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

### 一键运行 R 代码 `<AnswerBlock>`

```md
<script setup>
const code = `mean(1:10)`
</script>

<AnswerBlock title="实验一 · 运行答案" :code="code" />
```

点击按钮会弹出代码窗口；点「运行」会通过 [WebR](https://webr.r-wasm.org/) 在浏览器里真实执行这段 R 代码，**不需要安装 R**。

> 首次运行需要从 CDN 下载约 10 MB 的 WebR 运行环境，因此只有点击「运行」时才会加载。

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
- [ ] 第 3~13 讲（整理中）

## 说明

本站题目与背景来源于学校课程，内容与形式均为个人兴趣爱好，文档中所涉及的内容均为个人理解，如有错误欢迎指正。
