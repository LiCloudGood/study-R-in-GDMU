<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { selectorTree as selectorTreeZh, type SelectorNode } from '../selector-data'
import { selectorTree as selectorTreeEn } from '../selector-data-en'

/**
 * 统计方法选择器（StatMed Choice）。
 *
 * 交互式问答：按「研究设计 → 测量尺度 → 样本量与分布」逐步选择，
 * 最后给出推荐的方法、适用条件、R 代码、该看哪些输出、常见误用，
 * 并跳到《卫生统计学》对应章节。
 *
 * 题库直接 import 进来（`theme/selector-data.ts` 与 `theme/selector-data-en.ts`，
 * 由 scripts/generate-selector.mjs 从**同一份规则表**生成）—— **不走 fetch**，
 * 避免异步加载失败时组件卡在「正在加载」。两份题库的分支结构、跳转编号、
 * 条件条数完全一一对应（生成脚本里有机器校验），所以不会出现
 * 「中文这么判、英文那么判」。用哪一份看站点当前语言：中文站 'zh-CN'、英文站 'en-US'。
 * 页面上的「决策速查表」也出自同一份规则，两者不会打架。
 *
 * 全程不收集任何数据，选择过程只保存在当前页面内存里。
 */

const { lang } = useData()

/** 是不是英文站：'en'、'en-US'、'en-GB' 都算 */
const isEn = computed(() => /^en\b/i.test(String(lang.value ?? '')))

type TreeNode = SelectorNode

const tree = computed<{ nodes: TreeNode[] } | undefined>(() =>
  isEn.value ? selectorTreeEn : selectorTreeZh
)
const ALL = computed<TreeNode[]>(() => tree.value?.nodes ?? [])
const byId = computed(() => new Map<number, TreeNode>(ALL.value.map((n) => [n.id, n])))

/** 起始节点：第一个「问题」节点，兜底取列表里第一个 */
function firstId(list: TreeNode[]): number {
  return list.find((n) => n.question)?.id ?? list[0]?.id ?? 0
}

/**
 * 界面上那几行固定的字（不是题库里的内容）。
 *
 * 中文那一套就是原来写在模板里的原话，一个字都没改；英文那一套照
 * scripts/术语对照表.md 的页面固定用语译。不这么做的话，英文页面上会出现
 * 「推荐方法 / Recommended method」这种半截中文。
 *
 * 注意 missingHint 中间那个空格：模板里那句中文原文在源码里分成两行写，
 * Vue 会把换行折成一个空格，所以这里也得留着 —— 换掉就和中文本来的显示不一样了。
 */
const LABELS = {
  zh: {
    badge: '推荐方法',
    cond: '适用条件',
    thCond: '条件',
    thHow: '用哪种写法',
    code: '在 R 里怎么做',
    read: '输出看这几个数',
    pit: '容易踩的坑',
    chapterPrefix: '想弄懂原理 → ',
    chapterFallback: '《卫生统计学》对应章节',
    restart: '↺ 换一组条件重选',
    restartTop: '↺ 重新开始',
    missingQ: '这一步没有找到对应的结论',
    missingHint:
      '题库里缺了这一条。请点「重新开始」再选一次；如果每次都停在这里，说明是题库的问题， 麻烦通过首页的 GitHub 告诉我一声。'
  },
  en: {
    badge: 'Recommended method',
    cond: 'Applicable conditions',
    thCond: 'Condition',
    thHow: 'Which version to use',
    code: 'Doing it in R',
    read: 'What to read in the output',
    pit: 'Common pitfalls',
    chapterPrefix: 'Want the statistics behind it? → ',
    chapterFallback: 'the corresponding chapter in Health Statistics',
    restart: '↺ Start over with different conditions',
    restartTop: '↺ Start over',
    missingQ: 'No matching conclusion was found for this step',
    missingHint:
      'This entry is missing from the question bank. Click “Start over” and choose again; if it always stops here, the question bank is at fault — please tell me through the GitHub link on the home page.'
  }
}
const L = computed(() => (isEn.value ? LABELS.en : LABELS.zh))

/** 已经回答过的步骤：{问题, 选了什么} */
const history = ref<{ question: string; answer: string }[]>([])
const currentId = ref(firstId(ALL.value))

const current = computed<TreeNode | null>(() => byId.value.get(currentId.value) ?? null)
const result = computed(() => current.value?.result ?? null)

/**
 * 结果页底部那个「想弄懂原理 → 第 X 章」的链接。
 *
 * 这里必须兜底：withBase() 内部是 `path.startsWith('/')`，
 * 传进去 undefined 会直接抛 TypeError；而模板里抛错会把**整块结果**渲染掉，
 * 页面上就什么也不剩了（之前正是这么"不出答案"的）。
 */
const chap = computed(() => ({
  text: result.value?.c?.text || L.value.chapterFallback,
  href: withBase(
    result.value?.c?.link || (isEn.value ? '/en/Health-statistics/' : '/Health-statistics/')
  )
}))

function choose(opt: { text: string; next: number }) {
  history.value = [...history.value, { question: current.value?.question || '', answer: opt.text }]
  currentId.value = opt.next
}

function restart() {
  currentId.value = firstId(ALL.value)
  history.value = []
}

/** 只支持 **粗体** 和 `代码` 两种行内标记，内容是我们自己写的，安全 */
function md(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}
</script>

<template>
  <!--
    用 ClientOnly 包起来：选择器完全在浏览器里渲染。
    题库是静态数据，没必要参与服务端渲染 —— 而 SSR 与客户端状态一旦不一致，
    水合（hydration）会把正确的内容覆盖掉，反而显示成空白。
  -->
  <ClientOnly>
    <div class="sf">
      <!-- 已经走过的步骤 -->
      <ol v-if="history.length" class="sf-history">
        <li v-for="(h, i) in history" :key="i">
          <span class="sf-q">{{ h.question }}</span>
          <span class="sf-a">{{ h.answer }}</span>
        </li>
      </ol>

      <!-- 出结果 -->
      <div v-if="result" class="sf-result">
        <div class="sf-badge">{{ L.badge }}</div>
        <h3 class="sf-method">{{ result.method }}</h3>
        <p class="sf-why" v-html="md(result.why)" />

        <div v-if="result.cond && result.cond.length" class="sf-block">
          <div class="sf-label">{{ L.cond }}</div>
          <ul>
            <li v-for="(c, i) in result.cond" :key="i" v-html="md(c)" />
          </ul>
        </div>

        <p v-if="result.note" class="sf-note" v-html="md(result.note)" />

        <table v-if="result.criteria" class="sf-criteria">
          <thead>
            <tr><th>{{ L.thCond }}</th><th>{{ L.thHow }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in result.criteria" :key="i">
              <td v-html="md(row[0])" />
              <td v-html="md(row[1])" />
            </tr>
          </tbody>
        </table>

        <div v-if="result.code" class="sf-block">
          <div class="sf-label">{{ L.code }}</div>
          <pre class="sf-code"><code>{{ result.code }}</code></pre>
        </div>

        <div v-if="result.read && result.read.length" class="sf-block">
          <div class="sf-label">{{ L.read }}</div>
          <ul>
            <li v-for="(r, i) in result.read" :key="i" v-html="md(r)" />
          </ul>
        </div>

        <div v-if="result.pit && result.pit.length" class="sf-block sf-pit">
          <div class="sf-label">{{ L.pit }}</div>
          <ul>
            <li v-for="(p, i) in result.pit" :key="i" v-html="md(p)" />
          </ul>
        </div>

        <div class="sf-foot">
          <a class="sf-chapter" :href="chap.href">
            {{ L.chapterPrefix }}{{ chap.text }}
          </a>
          <button type="button" class="sf-again" @click="restart">{{ L.restart }}</button>
        </div>
      </div>

      <!-- 继续提问 -->
      <div v-else-if="current" class="sf-ask">
        <div class="sf-question">{{ current.question }}</div>
        <p v-if="current.hint" class="sf-hint">{{ current.hint }}</p>
        <div class="sf-options">
          <button
            v-for="(o, i) in current.options"
            :key="i"
            type="button"
            class="sf-option"
            @click="choose(o)"
          >
            <span class="sf-opt-text">{{ o.text }}</span>
            <span v-if="o.detail" class="sf-opt-detail">{{ o.detail }}</span>
          </button>
        </div>
        <button v-if="history.length" type="button" class="sf-again sf-again-top" @click="restart">
          {{ L.restartTop }}
        </button>
      </div>

      <!--
        兜底：万一某个选项的 next 指向了不存在的节点（题库改坏了、或者数据没跟上），
        以前这里是**一片空白**，看着就像坏了又说不出哪坏了。
        现在至少把话说明白，并把「重新开始」摆出来。
      -->
      <div v-else class="sf-ask">
        <div class="sf-question">{{ L.missingQ }}</div>
        <p class="sf-hint">
          {{ L.missingHint }}
        </p>
        <button type="button" class="sf-again sf-again-top" @click="restart">{{ L.restartTop }}</button>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.sf {
  border: 1px solid var(--ra-border);
  border-radius: 12px;
  background: var(--ra-bg-panel);
  padding: 18px 20px;
  margin: 18px 0;
}
.sf-status {
  color: var(--ra-text);
  opacity: 0.75;
  font-size: 14px;
}
.sf-error {
  color: var(--ra-error);
}

/* 已走过的步骤 */
.sf-history {
  margin: 0 0 16px;
  padding-left: 20px;
  font-size: 13px;
  color: var(--ra-text);
  opacity: 0.8;
}
.sf-history li {
  margin: 2px 0;
}
.sf-q::after {
  content: ' → ';
  opacity: 0.6;
}
.sf-a {
  font-weight: 600;
}

/* 提问 */
.sf-question {
  font-size: 16px;
  font-weight: 600;
  color: var(--ra-text);
  margin-bottom: 6px;
}
.sf-hint {
  margin: 0 0 14px;
  font-size: 13px;
  color: var(--ra-text);
  opacity: 0.7;
}
.sf-options {
  display: grid;
  gap: 8px;
}
.sf-option {
  display: block;
  width: 100%;
  text-align: left;
  appearance: none;
  border: 1px solid var(--ra-border);
  border-radius: 8px;
  background: var(--ra-bg);
  color: var(--ra-text);
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.sf-option:hover {
  border-color: var(--ra-primary);
  background: var(--ra-bg-panel);
}
.sf-opt-text {
  display: block;
  font-weight: 600;
}
.sf-opt-detail {
  display: block;
  font-size: 12px;
  opacity: 0.65;
  margin-top: 2px;
}

/* 结果 */
.sf-badge {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--ra-primary);
  color: var(--ra-primary);
  margin-bottom: 8px;
}
.sf-method {
  margin: 0 0 6px;
  font-size: 19px;
  color: var(--ra-text);
}
.sf-why {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--ra-text);
}
.sf-block {
  margin: 14px 0;
}
.sf-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--ra-text);
  opacity: 0.7;
  margin-bottom: 6px;
}
.sf-result ul {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--ra-text);
}
.sf-result li {
  margin: 3px 0;
}
.sf-note {
  margin: 12px 0;
  padding: 10px 14px;
  border-left: 3px solid var(--ra-primary);
  background: var(--ra-bg);
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--ra-text);
}
.sf-criteria {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
  margin: 12px 0;
}
.sf-criteria th,
.sf-criteria td {
  border: 1px solid var(--ra-border);
  padding: 7px 10px;
  text-align: left;
  color: var(--ra-text);
}
.sf-criteria th {
  background: var(--ra-bg);
  font-weight: 600;
}
.sf-code {
  margin: 0;
  padding: 12px 14px;
  background: var(--ra-bg);
  border: 1px solid var(--ra-border);
  border-radius: 8px;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  color: var(--ra-text);
  white-space: pre;
}
.sf-pit {
  border-left: 3px solid var(--ra-error);
  padding-left: 12px;
}
.sf-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--ra-border);
}
.sf-chapter {
  font-size: 14px;
  font-weight: 600;
  color: var(--ra-primary);
  text-decoration: none;
}
.sf-chapter:hover {
  text-decoration: underline;
}
.sf-again {
  appearance: none;
  border: 1px solid var(--ra-border);
  background: var(--ra-bg);
  color: var(--ra-text);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  margin-left: auto;
}
.sf-again:hover {
  border-color: var(--ra-primary);
  color: var(--ra-primary);
}
.sf-again-top {
  margin: 14px 0 0;
}
:deep(code) {
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 0.92em;
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--ra-bg);
}
</style>
