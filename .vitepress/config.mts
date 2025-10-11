import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/study-R-in-GDMU/',
  title: "study R in GDMU",
  description: "GDMU R course site ",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction to information technology', link: '/Introduction to information technology/index.md' },
      { text: 'Fundamentals of Medical Big Data Analysis', link:'/Fundamentals of Medical Big Data Analysis in GDMU/index.md'},
      { text: 'Health statistics',link:''}
    ],


    sidebar: {
      '/': [],                              // 主页侧边栏已清空
      '/Introduction to information technology/': [                        // 内部文档侧栏
        {
          text: '入口',
          collapsed:true,
          items: [
            { text: '介绍', link: '/' },
            { text: '信息技术基础', link: '/Introduction to information technology' },
            { text: '医学大数据分析与决策',link:'/Fundamentals of Medical Big Data Analysis in GDMU'},
            { text: '卫生统计学'},
            { text: 'R下载',link:'https://www.r-project.org/'},
            { text: 'R studio下载',link:'https://posit.co/download/rstudio-desktop/'}
          ]
        },
        {
          text: '信息技术基础',
          items: [
            { text: '0-介绍', link: '/Introduction to information technology/index.md' },
            { text: '1-软件及其软件包安装和脚本编写', link: '' },
            { text: '2-向量与矩阵', link: '' },
            { text: '3-数组与数据框', link: '' },
            { text: '4-列表与因子', link: '' },
            { text: '5-日期、字符与特殊值处理', link: '' },
            { text: '6-输入、输出', link: '' },
            { text: '7-分支与循环', link: '' },
            { text: '8-自定义函数', link: '' },
            { text: '9-高级绘图', link: '' },
            { text: '10-ggplot2包', link: '' },
            { text: '11-参数估计', link: '' },
            { text: '12-参数假设检验', link: '' },
            { text: '13-同分布检验与列联表检验', link: '' }
          ]
        }
      ]
    },
    
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/LiCloudGood' }
    ]
  }
})

