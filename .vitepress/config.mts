import { defineConfig } from 'vitepress'

/**
 * 《信息技术基础》的课程目录。
 * link 为空表示该讲尚未整理，先只占位（VitePress 会渲染成不可点击的标题）。
 * 顺序与「汇总」文件夹里各周资料的顺序一致。
 */
const lectures: { text: string; link?: string }[] = [
  { text: '1-软件及其软件包安装和脚本编写', link: '/intro-it/1-software-install' },
  { text: '2-向量与矩阵', link: '/intro-it/2-vectors-and-matrices' },
  { text: '3-数组与数据框' },
  { text: '4-列表与因子' },
  { text: '5-日期、字符与特殊值处理' },
  { text: '6-输入、输出' },
  { text: '7-分支与循环' },
  { text: '8-自定义函数' },
  { text: '9-高级绘图' },
  { text: '10-ggplot2包' },
  { text: '11-参数估计' },
  { text: '12-参数假设检验' },
  { text: '13-同分布检验与列联表检验' }
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
  description: '广东医科大学 R 语言课程学习站点：原题、答案与知识点汇总',

  lastUpdated: true,

  // README.md 是仓库说明，不作为网站页面参与构建
  srcExclude: ['README.md'],

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
      '/Medical-Big-Data-Analysis/': [entryGroup],
      '/Health-statistics/': [
        entryGroup,
        {
          text: '卫生统计学',
          items: [{ text: '统计方法选择器', link: '/Health-statistics/choice' }]
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
})
