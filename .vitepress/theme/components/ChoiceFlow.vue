<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

/**
 * 统计方法选择器（StatMed Choice）。
 *
 * 交互式问答：按「研究阶段 → 具体场景 → …」逐步选择，
 * 最后给出推荐的统计方法。题目与结论来自 public/tree-*.json 三个题库文件。
 *
 * 全程不收集任何数据，选择过程只保存在当前页面内存里。
 */

interface Option {
  value: string
  text: string
  /** 下一个节点的 id；-1 表示到此为止 */
  next: number
  result?: Result
}

interface TreeNode {
  id: number
  question: string
  options: Option[]
}

interface Result {
  method: string
  description: string
  link: string
}

const props = withDefaults(
  defineProps<{
    /**
     * 是否显示「查看完整教程 →」链接。
     * 该链接指向 /method/<方法名> 页面，本仓库目前还没有这些页面，
     * 所以默认关闭；等你写好了统计方法教程再把页面级的开关打开即可。
     */
    showDetailLink?: boolean
  }>(),
  { showDetailLink: false }
)

const versions = [
  { key: 'med', label: '医学生版' },
  { key: 'normal', label: '普通版' },
  { key: 'expert', label: '专家版' }
]

const version = ref('normal')
const nodes = ref<TreeNode[]>([])
const decisionPaths = ref<Record<string, Result>>({})
const loading = ref(true)
const error = ref<string | null>(null)

/** 当前走到第几步；等于 nodes.length 表示已经出结果 */
const stepIndex = ref(0)
/** 每一步选了哪个选项（按顺序） */
const answers = ref<string[]>([])
/** 当前这一步选中的值 */
const selected = ref('')
const result = ref<Result>({ method: '', description: '', link: '' })

const current = computed<TreeNode>(
  () => nodes.value[stepIndex.value] || { id: 0, question: '', options: [] }
)

/** 步骤条上显示的短标题 */
function stepLabel(index: number) {
  const question = nodes.value[index]?.question || ''
  return question.length > 10 ? `${question.slice(0, 10)}…` : question
}

function slug(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

const NEED_EXPERT: Result = {
  method: '（请咨询统计专家）',
  description: '当前选择组合暂无自动推荐方法，请尝试其他选择或咨询统计专家',
  link: ''
}

async function loadTree() {
  loading.value = true
  error.value = null
  try {
    stepIndex.value = 0
    answers.value = []
    selected.value = ''
    result.value = { method: '', description: '', link: '' }

    // 题库文件放在 public/ 下，用 BASE_URL 保证换了部署路径也能取到
    const url = `${import.meta.env.BASE_URL}tree-${version.value}.json`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`题库文件不存在: ${response.status} ${response.statusText}`)

    const data = await response.json()
    if (!data || typeof data !== 'object' || !Array.isArray(data.nodes)) {
      throw new Error('数据结构不完整，缺少 nodes')
    }

    nodes.value = data.nodes
    decisionPaths.value = data.decisionPaths || {}

    // 题库里没有 decisionPaths 时，把每个「终点选项」自带的 result 收拢成路径表
    if (!data.decisionPaths) {
      for (const node of data.nodes as TreeNode[]) {
        for (const option of node.options || []) {
          if (option.next === -1 && option.result) {
            decisionPaths.value[`${node.id}-${option.value}`] = option.result
          }
        }
      }
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    loading.value = false
  }
}

function next() {
  if (!selected.value) return
  const option = current.value.options?.find((o) => o.value === selected.value)
  if (!option) {
    error.value = '未找到匹配的选项'
    return
  }
  answers.value.push(selected.value)

  // 走到终点：先查精确路径，再退回使用选项自带的结论
  if (option.next === -1) {
    const key = `${current.value.id || 1}-${selected.value}`
    result.value = decisionPaths.value[key] || option.result || { ...NEED_EXPERT }
    stepIndex.value = nodes.value.length
    return
  }

  selected.value = ''
  if (option.next > 0) {
    const target = nodes.value.findIndex((n) => n.id === option.next)
    if (target >= 0) {
      stepIndex.value = target
      return
    }
  }

  if (stepIndex.value < nodes.value.length - 1) stepIndex.value++
  else resolveResult()
}

/** 没有显式终点时，用「最长前缀匹配」从决策表里推断结论 */
function resolveResult() {
  try {
    let withIds = ''
    answers.value.forEach((value, index) => {
      const id = nodes.value[index]?.id ?? index + 1
      withIds += withIds ? `,${id}-${value}` : `${id}-${value}`
    })
    const valuesOnly = answers.value.join(',')

    for (const candidate of [withIds, valuesOnly]) {
      if (decisionPaths.value[candidate]) {
        result.value = decisionPaths.value[candidate]
        stepIndex.value = nodes.value.length
        return
      }
    }

    let best: Result | null = null
    let bestScore = 0
    for (const [key, value] of Object.entries(decisionPaths.value)) {
      const keyParts = key.split(',')
      for (const candidate of [withIds, valuesOnly]) {
        const candidateParts = candidate.split(',')
        const limit = Math.min(keyParts.length, candidateParts.length)
        let matched = 0
        while (matched < limit && keyParts[matched] === candidateParts[matched]) matched++
        // 必须是完整命中某条已知路径，且命中的最长
        if (matched > bestScore && matched === keyParts.length) {
          bestScore = matched
          best = value
        }
      }
    }

    result.value = best || { ...NEED_EXPERT }
    stepIndex.value = nodes.value.length
  } catch (e) {
    result.value = {
      method: '（计算错误）',
      description: `计算结果时出现错误: ${e instanceof Error ? e.message : '未知错误'}`,
      link: ''
    }
    stepIndex.value = nodes.value.length
  }
}

function prev() {
  if (stepIndex.value <= 0) return
  stepIndex.value--
  if (answers.value.length > stepIndex.value) {
    selected.value = answers.value[stepIndex.value]
    answers.value = answers.value.slice(0, stepIndex.value)
  } else {
    selected.value = ''
  }
}

function restart() {
  stepIndex.value = 0
  answers.value = []
  selected.value = ''
  result.value = { method: '', description: '', link: '' }
}

function switchVersion(key: string) {
  version.value = key
  loadTree()
}

onMounted(loadTree)
</script>

<template>
  <div class="statistical-guide">
    <div class="ver-bar">
      <button
        v-for="v in versions"
        :key="v.key"
        class="ver-btn"
        :class="{ active: version === v.key }"
        @click="switchVersion(v.key)"
      >
        {{ v.label }}
      </button>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <div v-else-if="error" class="error">
      {{ error }}
      <button class="btn-retry" @click="loadTree">重试</button>
    </div>

    <div v-else>
      <div v-if="nodes.length" class="steps">
        <div
          v-for="(node, index) in nodes"
          :key="node.id"
          class="step"
          :class="{ active: stepIndex === index, completed: stepIndex > index }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-label">{{ stepLabel(index) }}</div>
        </div>
      </div>

      <div class="step-content">
        <div v-if="stepIndex < nodes.length" class="question-section">
          <h3 class="q-title">{{ current.question }}</h3>
          <div class="options">
            <label v-for="option in current.options" :key="option.value">
              <input v-model="selected" type="radio" class="radio-input" :value="option.value" />
              <span class="radio-custom" />
              <span class="option-text">{{ option.text }}</span>
            </label>
          </div>
        </div>

        <div v-else class="method-recommendation">
          <h3>统计分析建议</h3>
          <div class="recommendation-result">
            <div class="primary-method">
              <h4>推荐方法：{{ result.method }}</h4>
              <p v-if="result.description" class="method-description">{{ result.description }}</p>
            </div>
            <div class="result-actions">
              <a v-if="result.link" class="calc-link" :href="result.link" target="_blank">
                查精确 P 值 ↗
              </a>
              <button class="btn btn-secondary" @click="restart">重新开始</button>
            </div>
            <a
              v-if="showDetailLink && result.method && result.method !== NEED_EXPERT.method && result.method !== '（计算错误）'"
              class="detail-link"
              :href="`/method/${slug(result.method)}`"
            >
              查看完整教程 →
            </a>
          </div>
        </div>
      </div>

      <div class="navigation">
        <button v-if="stepIndex > 0" class="btn btn-secondary" @click="prev">上一步</button>
        <button
          v-if="stepIndex < nodes.length"
          class="btn btn-primary"
          :disabled="!selected"
          @click="next"
        >
          {{ stepIndex === nodes.length - 1 ? '查看结果' : '下一步' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistical-guide {
  max-width: 800px;
  margin: 0 auto;
}

.ver-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.ver-btn {
  padding: 8px 20px;
  border: 2px solid #409eff;
  color: #409eff;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.ver-btn:hover {
  background: #f5f9ff;
}

.ver-btn.active {
  background: #409eff;
  color: #fff;
}

.loading,
.error {
  text-align: center;
  padding: 60px 20px;
  font-size: 16px;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
}

.btn-retry {
  margin-left: 12px;
  padding: 6px 16px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-retry:hover {
  background: #e0e0e0;
}

.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;
  padding: 0 8px;
}

.steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 16px;
  right: 16px;
  height: 3px;
  background: #e0e0e0;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #666;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #409eff;
  color: #fff;
  transform: scale(1.1);
}

.step.completed .step-number {
  background: #67c23a;
  color: #fff;
}

.step.completed .step-number::after {
  content: '✓';
  font-size: 16px;
}

.step-label {
  font-size: 12px;
  color: #666;
  text-align: center;
  line-height: 1.2;
  max-width: 100%;
  word-break: break-word;
}

.step.active .step-label {
  color: #409eff;
  font-weight: 700;
}

.step-content {
  min-height: 300px;
  margin-bottom: 32px;
}

.question-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid #409eff;
}

.q-title {
  margin-bottom: 24px;
  font-size: 20px;
  color: #333;
  line-height: 1.4;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.options label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #fff;
}

.options label:hover {
  border-color: #409eff;
  background: #f5f9ff;
}

.radio-input {
  display: none;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.3s ease;
}

.radio-input:checked + .radio-custom {
  border-color: #409eff;
  background: #409eff;
}

.radio-input:checked + .radio-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.option-text {
  flex: 1;
  font-size: 15px;
  line-height: 1.5;
  color: #333;
}

.method-recommendation h3 {
  margin-bottom: 24px;
  color: #333;
  font-size: 22px;
}

.recommendation-result {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid #67c23a;
}

.primary-method h4 {
  color: #67c23a;
  margin-bottom: 16px;
  font-size: 18px;
}

.method-description {
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.result-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.calc-link {
  display: inline-block;
  padding: 10px 20px;
  color: #409eff;
  text-decoration: none;
  border: 2px solid #409eff;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.calc-link:hover {
  background: #409eff;
  color: #fff;
  transform: translateY(-1px);
}

.detail-link {
  display: inline-block;
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  margin-top: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.detail-link:hover {
  background: #f5f9ff;
  text-decoration: underline;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
}

.btn {
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background: #409eff;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #337ecc;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .steps {
    padding: 0;
  }

  .steps::before {
    left: 0;
    right: 0;
  }

  .step-label {
    font-size: 11px;
  }

  .question-section,
  .recommendation-result {
    padding: 20px 16px;
  }

  .q-title {
    font-size: 18px;
  }

  .options label {
    padding: 14px;
  }

  .navigation {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .ver-bar {
    flex-direction: column;
    align-items: center;
  }

  .ver-btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .steps {
    margin-bottom: 24px;
  }

  .step-content {
    min-height: 250px;
  }
}
</style>
