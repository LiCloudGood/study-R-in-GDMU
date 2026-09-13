# study R in GDMU

广东医 R 语言课程的在线讲义。

🌐 在线阅读：**<https://licloudgood.github.io/study-R-in-GDMU/>**

## 怎么用

1. 打开上面的网址，从「**信息技术基础**」第 1 讲开始按顺序看；
2. 每讲末尾都有实验题，**先自己做**，做不出来再点「👀 查看参考答案」；
3. 答案里的代码点「📋 复制」，直接粘贴到 RStudio 里就能跑；
4. 不会装 R 的先看第 1 讲，装好 R 和 RStudio 再往下。

> 答案默认是收起来的，点开才看得到，这样不会一上来就被剧透。

## 进度

13 讲全部整理完成 ✅

- [x] 1 软件及其软件包安装和脚本编写
- [x] 2 向量与矩阵
- [x] 3 数组与数据框
- [x] 4 列表与因子
- [x] 5 日期、字符与特殊值处理
- [x] 6 输入、输出
- [x] 7 分支与循环
- [x] 8 自定义函数
- [x] 9 高级绘图
- [x] 10 ggplot2 包
- [x] 11 参数估计
- [x] 12 参数假设检验
- [x] 13 同分布检验与列联表检验

## 仓库里有什么

| 目录 | 内容 |
| --- | --- |
| `原题/` | 学校下发的原始练习（Word 文档、R 脚本、数据） |
| `答案/` | 各周写好的 R 脚本 |
| `汇总/` | 原题 + 答案的 HTML 与 PDF 合订本 |
| `intro-it/` 等 | 在线讲义的源码（Markdown） |
| `.vitepress/` | 站点配置与自定义主题 |

> `原题`、`答案`、`汇总` 保存的是最初整理好的原始资料，**内容不做改动**。

## 自己跑起来

```bash
npm install
npm run docs:dev      # 本地预览 http://localhost:5173/study-R-in-GDMU/
npm run docs:build    # 构建静态站点到 .vitepress/dist
npm run docs:preview  # 预览构建结果
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

## 说明

本站题目与背景来源于学校课程，内容与形式均为个人兴趣爱好，
文档中所涉及的内容均为个人理解，如有错误欢迎指正。

## 关于制作

- **课程资料**（`原题` / `答案` / `汇总`）：由 [Li_CloudGood](https://github.com/LiCloudGood) 整理提供。
- **网页实现**：站点基于 [VitePress](https://vitepress.dev/) 构建。网页讲义排版、
  自定义主题组件与公式还原，由 Li_CloudGood 提出设想与需求，
  与 DeepSeek Harness 驱动的 AI 助手协作完成。

---

## 给维护者

改代码、改讲义之前，先看这两份：

- [`scripts/项目状态.md`](scripts/项目状态.md) —— 仓库地图、自定义组件速查、
  图片怎么接、已知坑、给下一个会话的建议
- [`scripts/原题修正记录.md`](scripts/原题修正记录.md) —— `原题`/`答案`/`汇总`
  的每一处改动及理由
