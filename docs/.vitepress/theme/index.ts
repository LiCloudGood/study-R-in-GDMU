// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'
import AnswerBlock from './components/AnswerBlock.vue'
import ChoiceFlow from './components/ChoiceFlow.vue'
import ClickAnswer from './components/ClickAnswer.vue'
import TrackList from './components/TrackList.vue'

/**
 * 说明：本站**不做在线执行 R**。
 * 参考答案、运行结果与输出图形都是事先准备好的静态内容，
 * 因此不需要 WebR，也不会受网络与浏览器兼容性影响。
 */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // 这些组件可以直接在任意 Markdown 页面里使用，不需要 import
    app.component('AnswerBlock', AnswerBlock)
    app.component('ChoiceFlow', ChoiceFlow)
    app.component('ClickAnswer', ClickAnswer)
    app.component('TrackList', TrackList)
  }
} satisfies Theme
