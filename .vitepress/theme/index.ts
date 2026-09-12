// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './style.css'
import AnswerBlock from './components/AnswerBlock.vue'
import ChoiceFlow from './components/ChoiceFlow.vue'
import ClickAnswer from './components/ClickAnswer.vue'
import RBlock from './components/RBlock.vue'
import TrackList from './components/TrackList.vue'

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
    app.component('RBlock', RBlock)
    app.component('TrackList', TrackList)
  }
} satisfies Theme
