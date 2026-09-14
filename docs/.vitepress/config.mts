import { defineConfig } from 'vitepress'

/**
 * 《信息技术基础》的课程目录。
 * link 为空表示该讲尚未整理，先只占位（VitePress 会渲染成不可点击的标题）。
 * 顺序与「汇总」文件夹里各周资料的顺序一致。
 */
const lectures: { text: string; link?: string }[] = [
  { text: '1-软件及其软件包安装和脚本编写', link: '/intro-it/1-software-install' },
  { text: '2-向量与矩阵', link: '/intro-it/2-vectors-and-matrices' },
  { text: '3-数组与数据框', link: '/intro-it/3-arrays-and-data-frames' },
  { text: '4-列表与因子', link: '/intro-it/4-lists-and-factors' },
  { text: '5-日期、字符与特殊值处理', link: '/intro-it/5-dates-strings-and-special-values' },
  { text: '6-输入、输出', link: '/intro-it/6-input-output' },
  { text: '7-分支与循环', link: '/intro-it/7-branches-and-loops' },
  { text: '8-自定义函数', link: '/intro-it/8-custom-functions' },
  { text: '9-高级绘图', link: '/intro-it/9-base-graphics' },
  { text: '10-初级绘图函数', link: '/intro-it/10-plot-functions' },
  { text: '11-ggplot2包', link: '/intro-it/11-ggplot2' },
  { text: '12-参数估计', link: '/intro-it/12-parameter-estimation' },
  { text: '13-参数假设检验', link: '/intro-it/13-hypothesis-testing' },
  { text: '14-同分布检验与列联表检验', link: '/intro-it/14-goodness-of-fit-and-contingency' }
]

/** 《医学大数据分析与决策》的课程目录（32 学时，8 周实验）。 */
const mbdLectures: { text: string; link?: string }[] = [
  { text: '1-R的使用及数据获取', link: '/Medical-Big-Data-Analysis/1-r-basics-and-data' },
  { text: '2-数据预处理', link: '/Medical-Big-Data-Analysis/2-data-preprocessing' },
  { text: '3-回归分析', link: '/Medical-Big-Data-Analysis/3-regression' },
  { text: '4-关联规则', link: '/Medical-Big-Data-Analysis/4-association-rules' },
  { text: '5-分类（一）', link: '/Medical-Big-Data-Analysis/5-classification-1' },
  { text: '6-分类（二）', link: '/Medical-Big-Data-Analysis/6-classification-2' },
  { text: '7-聚类', link: '/Medical-Big-Data-Analysis/7-clustering' },
  { text: '8-神经网络', link: '/Medical-Big-Data-Analysis/8-neural-networks' }
]

/** 《卫生统计学》的课程目录（按章）。 */
const healthLectures: { text: string; link?: string }[] = [
  { text: '1-绪论', link: '/Health-statistics/01-introduction' },
  { text: '3-实验设计与调查设计', link: '/Health-statistics/03-study-design' },
  { text: '4-定量资料的统计描述', link: '/Health-statistics/04-describing-quantitative-data' },
  { text: '5-定性资料的统计描述', link: '/Health-statistics/05-describing-qualitative-data' },
  { text: '6-总体均数与总体率的估计', link: '/Health-statistics/06-estimation' },
  { text: '7-假设检验', link: '/Health-statistics/07-hypothesis-testing' },
  { text: '8-t 检验', link: '/Health-statistics/08-t-test' },
  { text: '9-方差分析', link: '/Health-statistics/09-anova' },
  { text: '10-卡方检验', link: '/Health-statistics/10-chi-square' },
  { text: '11-非参数检验与秩和检验', link: '/Health-statistics/11-nonparametric' },
  { text: '12-双变量关联性分析', link: '/Health-statistics/12-bivariate-association' },
  { text: '13-直线回归', link: '/Health-statistics/13-linear-regression' },
  { text: '14-生存分析', link: '/Health-statistics/14-survival-analysis' },
  { text: '16-Meta 分析', link: '/Health-statistics/16-meta-analysis' },
  { text: '17-样本含量估计', link: '/Health-statistics/17-sample-size' },
  { text: '18-生命统计的常用指标', link: '/Health-statistics/18-vital-statistics' },
  { text: '19-常用统计图表', link: '/Health-statistics/19-tables-and-charts' }
]

/** 三个板块共用的「入口」分组，方便在各板块之间跳转。 */
const entryGroup = {
  text: '入口',
  collapsed: false,
  items: [
    { text: '介绍', link: '/' },
    { text: '信息技术基础', link: '/intro-it/' },
    { text: '医学大数据分析与决策', link: '/Medical-Big-Data-Analysis/' },
    { text: '卫生统计学', link: '/Health-statistics/' },
    { text: 'R 下载', link: 'https://www.r-project.org/' },
    { text: 'RStudio 下载', link: 'https://posit.co/download/rstudio-desktop/' }
  ]
}

/* ------------------------------------------------------------------ */
/* 英文版（/en/）                                                       */
/* ------------------------------------------------------------------ */

/**
 * 英文版目录：**只给已经翻好的页加 link**，没翻的只写标题、不给链接。
 * VitePress 会把没有 link 的条目渲染成不可点击的一行 —— 正好当翻译进度表，
 * 而且绝不会产生 404。翻好一页就把 link 补上。
 *
 * 所有页面标题的中英对照见 `scripts/术语对照表.md` 最后一节。
 */
const enHealthLectures: { text: string; link?: string }[] = [
  { text: '1 Introduction', link: '/en/Health-statistics/01-introduction' },
  { text: '3 Experimental and Survey Design' },
  { text: '4 Describing Quantitative Data' },
  { text: '5 Describing Qualitative Data' },
  { text: '6 Estimating Population Means and Rates' },
  { text: '7 Hypothesis Testing' },
  { text: '8 t Tests', link: '/en/Health-statistics/08-t-test' },
  { text: '9 Analysis of Variance' },
  { text: '10 Chi-Square Tests' },
  { text: '11 Nonparametric and Rank-Based Tests' },
  { text: '12 Bivariate Association' },
  { text: '13 Simple Linear Regression' },
  { text: '14 Survival Analysis' },
  { text: '16 Meta-Analysis' },
  { text: '17 Sample Size Estimation' },
  { text: '18 Vital Statistics' },
  { text: '19 Statistical Tables and Charts' }
]

const enEntryGroup = {
  text: 'Start here',
  collapsed: false,
  items: [
    { text: 'Home', link: '/en/' },
    { text: 'Health Statistics', link: '/en/Health-statistics/' },
    { text: 'Download R', link: 'https://www.r-project.org/' },
    { text: 'Download RStudio', link: 'https://posit.co/download/rstudio-desktop/' }
  ]
}

export default defineConfig({
  base: '/study-R-in-GDMU/',

  lastUpdated: true,

  // 站点源码全在 docs/ 下（srcDir = docs），仓库说明、工具与原始资料都在 docs/ 之外。
  //
  markdown: {
    // 公式交给 VitePress 内置的 math（markdown-it-mathjax3）处理
    math: true,
    // R 代码块显示行号，方便课堂上按行讲解
    lineNumbers: true
  },

  /**
   * 中英双语：中文是 root（内容在 docs/ 下），英文在 docs/en/。
   * 用 locales 而不是复制一份站点，是为了：
   *   - 自动获得右上角的语言切换器；
   *   - 英文页可以只翻一部分，没翻的在侧栏留标题不给链接，不会 404；
   *   - 两份内容各自独立，中文永远是原文（source of truth）。
   */
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'study R in GDMU',
      description: 'gdmu R 语言课程学习站点：原题、答案与知识点汇总',

      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '信息技术基础', link: '/intro-it/' },
          { text: '医学大数据分析与决策', link: '/Medical-Big-Data-Analysis/' },
          { text: '卫生统计学', link: '/Health-statistics/' }
        ],

        sidebar: {
          '/': [],
          '/intro-it/': [entryGroup, { text: '信息技术基础', items: lectures }],
          '/Medical-Big-Data-Analysis/': [
            entryGroup,
            { text: '医学大数据分析与决策', items: mbdLectures }
          ],
          '/Health-statistics/': [
            entryGroup,
            // 原来这里是个分组「先选方法」，里面只放一条「统计方法选择器」，
            // 两层名字几乎重复、还多一次折叠。改成平铺的一条，点名字直接进。
            { text: '方法选择器', link: '/Health-statistics/choice' },
            { text: '卫生统计学', items: healthLectures },
            // 课本 19 章里没有、但临床上常用的两块，本站补成专题
            {
              text: '补充专题',
              collapsed: false,
              items: [
                { text: '诊断试验评价（ROC 与 AUC）', link: '/Health-statistics/diagnostic-test' },
                { text: '一致性信度（Kappa 与 ICC）', link: '/Health-statistics/agreement-reliability' }
              ]
            }
          ]
        },

        outline: { level: [2, 3], label: '本页目录' },
        search: { provider: 'local' },
        lastUpdated: { text: '最后更新' },
        docFooter: { prev: '上一讲', next: '下一讲' },

        socialLinks: [{ icon: 'github', link: 'https://github.com/LiCloudGood' }],

        footer: {
          message: '内容来源于学校课程练习，仅供学习交流使用',
          copyright: 'Licensed under CC BY-NC-SA 4.0'
        }
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      title: 'study R in GDMU',
      description:
        'R and medical statistics course notes from GDMU: exercises, answers, and worked knowledge summaries',

      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Health Statistics', link: '/en/Health-statistics/' }
        ],

        sidebar: {
          '/en/': [],
          '/en/Health-statistics/': [
            enEntryGroup,
            { text: 'Health Statistics', items: enHealthLectures },
            {
              text: 'Supplementary topics',
              collapsed: false,
              items: [
                { text: 'Diagnostic Test Evaluation (ROC and AUC)', link: '/en/Health-statistics/diagnostic-test' },
                { text: 'Agreement and Reliability (Kappa and ICC)', link: '/en/Health-statistics/agreement-reliability' }
              ]
            }
          ]
        },

        outline: { level: [2, 3], label: 'On this page' },
        search: { provider: 'local' },
        lastUpdated: { text: 'Last updated' },
        docFooter: { prev: 'Previous', next: 'Next' },

        socialLinks: [{ icon: 'github', link: 'https://github.com/LiCloudGood' }],

        footer: {
          message: 'Course exercises and notes, shared for study purposes only',
          copyright: 'Licensed under CC BY-NC-SA 4.0'
        }
      }
    }
  }
})
