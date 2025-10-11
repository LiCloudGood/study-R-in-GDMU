import { defineConfig } from 'vitepress'
export default defineConfig({
    themeConfig: {
      // 顶部导航
    nav: [
        { text: '首页', link: '/' },
        { text: '项目文档', link: '/project/' }
    ],

        // 侧边栏
    sidebar: {
        '/project/': [
        {
            text: '开始',
            items: [
            { text: '介绍', link: '/project/' },
            { text: '快速开始', link: '/project/quick-start' }
            ]
        },
        {
            text: 'API',
            items: [
            { text: '概览', link: '/project/api/intro' },
            { text: '核心模块', link: '/project/api/core' }
            ]
        },
        {
            text: '进阶',
            items: [
            { text: '插件开发', link: '/project/advanced/plugin' }
            ]
        }
        ]
    }
    }
})