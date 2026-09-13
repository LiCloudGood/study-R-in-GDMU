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
  { text: '10-ggplot2包', link: '/intro-it/10-ggplot2' },
  { text: '11-参数估计', link: '/intro-it/11-parameter-estimation' },
  { text: '12-参数假设检验', link: '/intro-it/12-hypothesis-testing' },
  { text: '13-同分布检验与列联表检验', link: '/intro-it/13-goodness-of-fit-and-contingency' }
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

export default defineConfig({
  lang: 'zh-CN',
  base: '/study-R-in-GDMU/',
  title: 'study R in GDMU',
  description: 'gdmu R 语言课程学习站点：原题、答案与知识点汇总',

  lastUpdated: true,

  // 站点源码全在 docs/ 下（srcDir = docs），仓库说明、工具与原始资料都在 docs/ 之外。
  //
  // 这里额外排除「统计方法选择器」：它的推荐流程还不够严谨，先下线（不构建、侧栏也不挂），
  // 文件与组件都保留着，想恢复时删掉下面这一行、再把侧栏条目加回去即可。
  srcExclude: ['Health-statistics/choice.md'],

  markdown: {
    // 公式交给 VitePress 内置的 math（markdown-it-mathjax3）处理
    math: true,
    // R 代码块显示行号，方便课堂上按行讲解
    lineNumbers: true
  },

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
      // 统计方法选择器已暂时下线（见 srcExclude 的说明）
      '/Health-statistics/': [
        entryGroup,
        { text: '卫生统计学', items: healthLectures }
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
})
