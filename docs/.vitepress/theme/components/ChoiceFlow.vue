<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

/**
 * 统计方法选择器（StatMed Choice）。
 *
 * 交互式问答：按「研究设计 → 测量尺度 → 样本量与分布」逐步选择，
 * 最后给出推荐的方法、适用条件、R 代码、该看哪些输出、常见误用，
 * 并跳到《卫生统计学》对应章节。
 *
 * 题库来自 public/selector-tree.json —— 那份文件由规则表生成，
 * 页面上的「决策速查表」出自同一份规则，两者不会打架。
 *
 * 全程不收集任何数据，选择过程只保存在当前页面内存里。
 */

interface Option {
  text: string
  detail?: string
  next: number
}

interface TreeNode {
  id: number
  question?: string
  hint?: string
  options?: Option[]
  result?: Result
}

interface Result {
  method: string
  why: string
  cond?: string[]
  note?: string
  criteria?: string[][]
  code?: string
  read?: string[]
  pit?: string[]
  c: { text: string; link: string }
}

const nodes = ref<TreeNode[]>([])
const byId = ref<Map<number, TreeNode>>(new Map())
const loading = ref(true)
const error = ref<string | null>(null)

/** 已经回答过的步骤：{问题, 选了什么} */
const history = ref<{ question: string; answer: string }[]>([])
const currentId = ref(1)

const current = computed<TreeNode | null>(() => byId.value.get(currentId.value) || null)
const result = computed<Result | null>(() => (current.value?.result ? current.value.result : null))

async function loadTree() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}selector-tree.json`)
    if (!res.ok) throw new Error(`题库加载失败：${res.status}`)
    const data = (await res.json()) as { nodes: TreeNode[] }
    nodes.value = data.nodes
    byId.value = new Map(data.nodes.map((n) => [n.id, n]))
    currentId.value = nodes.value.find((n) => n.question)?.id ?? 1
    history.value = []
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}

function choose(opt: Option) {
  history.value = [...history.value, { question: current.value?.question || '', answer: opt.text }]
  currentId.value = opt.next
}

function restart() {
  currentId.value = nodes.value.find((n) => n.question)?.id ?? 1
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

onMounted(loadTree)
</script>

<template>
  <div class="sf">
    <div v-if="loading" class="sf-status">正在加载题库…</div>
    <div v-else-if="error" class="sf-status sf-error">{{ error }}</div>

    <template v-else>
      <!-- 已经走过的步骤 -->
      <ol v-if="history.length" class="sf-history">
        <li v-for="(h, i) in history" :key="i">
          <span class="sf-q">{{ h.question }}</span>
          <span class="sf-a">{{ h.answer }}</span>
        </li>
      </ol>

      <!-- 出结果 -->
      <div v-if="result" class="sf-result">
        <div class="sf-badge">推荐方法</div>
        <h3 class="sf-method">{{ result.method }}</h3>
        <p class="sf-why" v-html="md(result.why)" />

        <div v-if="result.cond && result.cond.length" class="sf-block">
          <div class="sf-label">适用条件</div>
          <ul>
            <li v-for="(c, i) in result.cond" :key="i" v-html="md(c)" />
          </ul>
        </div>

        <p v-if="result.note" class="sf-note" v-html="md(result.note)" />

        <table v-if="result.criteria" class="sf-criteria">
          <thead>
            <tr><th>条件</th><th>用哪种写法</th></tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in result.criteria" :key="i">
              <td v-html="md(row[0])" />
              <td v-html="md(row[1])" />
            </tr>
          </tbody>
        </table>

        <div v-if="result.code" class="sf-block">
          <div class="sf-label">在 R 里怎么做</div>
          <pre class="sf-code"><code>{{ result.code }}</code></pre>
        </div>

        <div v-if="result.read && result.read.length" class="sf-block">
          <div class="sf-label">输出看这几个数</div>
          <ul>
            <li v-for="(r, i) in result.read" :key="i" v-html="md(r)" />
          </ul>
        </div>

        <div v-if="result.pit && result.pit.length" class="sf-block sf-pit">
          <div class="sf-label">容易踩的坑</div>
          <ul>
            <li v-for="(p, i) in result.pit" :key="i" v-html="md(p)" />
          </ul>
        </div>

        <div class="sf-foot">
          <a class="sf-chapter" :href="withBase(result.c.link)">
            想弄懂原理 → {{ result.c.text }}
          </a>
          <button type="button" class="sf-again" @click="restart">↺ 换一组条件重选</button>
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
          ↺ 重新开始
        </button>
      </div>
    </template>
  </div>
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
