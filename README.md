# study R in GDMU

GDMU 课程的在线讲义，三门课 + 一个统计方法选择器：

| 板块 | 内容 |
| --- | --- |
| **信息技术基础** | 14 讲，从装机到统计检验的 R 语言入门 |
| **医学大数据分析与决策** | 8 周实验，R 在医学数据分析中的应用（回归、关联规则、分类、聚类、神经网络） |
| **卫生统计学** | 17 章知识点归纳，从统计描述到生存分析；另配**统计方法选择器**（三步问答挑方法）与**诊断试验评价**、**一致性信度**两个补充专题 |

🌐 中文版（权威）：**<https://licloudgood.github.io/study-R-in-GDMU/>**
🇬🇧 英文版：**<https://licloudgood.github.io/study-R-in-GDMU/en/>**

英文版的 **50 个页面已全部译完**，右上角有语言切换器可以随时对照。

> **两份若有不一致，以中文版为准** —— 每页英文版顶部都写明了这一点。
> 术语按 [`scripts/术语对照表.md`](scripts/术语对照表.md) 统一；公式、数值、R 代码与原页逐字一致；
> 每页的 R 代码都抽出来重跑核对过，确认贴出的输出与真实结果一致。

## 怎么用

1. 挑一门课，从第 1 讲按顺序看；
2. 每讲都有实验题，**先自己做**，做不出来再点「👀 查看参考答案」；
3. 答案里的代码点「📋 复制」，粘到 RStudio 里就能跑；
4. 不会装 R 的先看《信息技术基础》第 1 讲；
5. 手上有一份数据、不知道用哪个统计方法，去**卫生统计学**里的**方法选择器**走一遍三步问答
   （那一页还有一张完整的决策速查表）。

> - 答案默认收起来，点开才看得到，不会被剧透。
> - 《医学大数据分析与决策》每一讲开头都列了**当讲要用的 R 包和装法**，跑之前先装好，
>   否则脚本会在 `library()` 那一步直接报错。
> - 《卫生统计学》是按章整理的**知识点归纳**，不是课程资料的搬运：每章讲清
>   「解决什么问题、核心概念是什么、在 R 里怎么做、容易踩什么坑」，并链到前两门课对应的练习。

## 仓库里有什么

| 目录 | 内容 |
| --- | --- |
| `docs/` | **网站源码**（VitePress）：三门课的讲义 Markdown、主题、配图 |
| `docs/en/` | **英文版**，与 `docs/` 同构（英文版配图在 `docs/public/figures/en/`） |
| `docs/intro-it/` | 《信息技术基础》14 讲 |
| `docs/Medical-Big-Data-Analysis/` | 《医学大数据分析与决策》8 周 |
| `docs/Health-statistics/` | 《卫生统计学》17 章 + 两个补充专题 + 方法选择器 |
| `资料/` | 整理好的课程资料：原题、答案脚本、汇总 |
| `scripts/` | 生成与自检用的小工具，以及维护文档 |

> `资料/` 里保存的是整理好的课程资料，**内容不做改动**。
> 体积大的原始文件（课件 `.pptx`、R 包安装包、大 PDF）没有放进仓库。
> 课件截图（老师桌面/课件的整屏图）**已全部从页面上移除**，换成等价的 R 代码。

## 自己跑起来

```bash
npm install
npm run docs:dev      # 开发预览 http://localhost:5173/study-R-in-GDMU/
npm run docs:build    # 构建到 docs/.vitepress/dist
npm run docs:preview  # 预览构建结果（http://localhost:4173/study-R-in-GDMU/）
```

推送到 `main` 后 GitHub Actions 自动构建并发布到 GitHub Pages。

### 改完记得自检

```bash
node node_modules/vitepress/bin/vitepress.js build docs   # 先构建
node scripts/check-site.mjs                               # 再体检
```

`check-site.mjs` 一次查完这些（每一条都对应一次真实踩过的坑）：

- 内链是否失效、图片文件是否存在、裸 HTML 图片有没有带部署前缀；
- 正文里有没有漏出来的垃圾：**原始 XML 残渣**（`<a:txBody>` 这种从 pptx 抽表格漏出来的）、
  没渲染的 `**加粗**` / `::: 容器` / ``` 围栏、没替换的模板占位符；
- `docs/en/` 下有没有"整页中文冒充已译"的文件；
- 关键目录的配图张数（第 9/10/11 讲、英文版全部）；
- 课件截图有没有残留（应为 0）。

> ⚠️ `vitepress preview` 是直接读 `docs/.vitepress/dist` 的：**每次重新构建后，
> 正在跑的预览会因为旧资源文件名被换掉而崩**，重启一下预览进程即可。

## 关于制作

- **课程资料**（`资料/` 下的全部内容）：由 [Li_CloudGood](https://github.com/LiCloudGood) 整理提供。
- **网页实现**：站点基于 [VitePress](https://vitepress.dev/)。讲义排版、自定义主题组件
  （可折叠答案卡、点开看解答、学习进度清单、统计方法选择器）与公式还原，
  由 Li_CloudGood 提出设想与需求，与 DeepSeek Harness 驱动的 AI 助手协作完成。
- **英文版**（`docs/en/`）：由 DeepSeek Harness 驱动的 AI 助手逐页翻译并撰写。
  翻译前先立好术语对照表，术语、页面标题、跨页用词都按它统一；页面里的 R 代码与
  界面组件文字（按钮、图注）也一并按语言切换。每翻完一批都把 R 代码抽出来重跑核对、
  构建、跑 `check-site.mjs`，再提交。
- **英文版配图**：答案输出图为英文版另画了一套（`docs/public/figures/en/`，60 张，
  尺寸与中文原图逐个一致）；题面素材图的图内文字是原题中文、重画等于换图，
  所以改成在图下写**英文图注**说明这张图画的是什么。中文版的图一张未动。

## 说明

本站题目与背景来源于学校课程，内容与形式均为个人兴趣爱好，文档中所涉及的内容均为个人理解，
如有错误欢迎指正。

---

## 给维护者

动代码或讲义之前先看这两份：

- [`scripts/项目状态.md`](scripts/项目状态.md) —— 仓库地图、自定义组件速查、配图怎么接、
  运行/生成流程、已知坑、给下一个会话的建议
- [`scripts/原题修正记录.md`](scripts/原题修正记录.md) —— `资料/` 里每一处改动及理由
- [`scripts/术语对照表.md`](scripts/术语对照表.md) —— 英文版的**强制**术语标准（含页面标题、
  跨页一致性裁决、踩过的坑）

**生成物不要直接改**，改源头再重跑：

```bash
# 统计方法选择器：一份规则表 → 中英两套题库 + 两张决策速查表 + 两个页面
node scripts/generate-selector.mjs        # 规则表 → 题库 + 速查表
node scripts/generate-selector-page.mjs   # 页面正文 + 速查表 → choice.md
node scripts/test-selector.mjs            # 真浏览器把 39 条路径点一遍（需先起预览）

# 英文版占位页：中文页有、英文页没有时会补一个 "not translated yet" 页
# （现在 50 页已全部译完，正常情况下它会报告"无需新建"）
node scripts/generate-en-stubs.mjs

# 把课件截图里的文字转出来（Windows 自带 OCR，不用装 tesseract）
powershell -NoProfile -File scripts/ocr-png.ps1 -Dir docs/public/figures -OutFile _dev/ocr.txt -Lang en-GB
```

改英文版时的两条硬规矩：**公式、数值、R 代码、结论一字不改**；
**每页 R 代码改完必须重跑**，确认贴出的输出与真实结果一致。
