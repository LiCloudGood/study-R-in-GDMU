<script setup lang="ts">
import { ref } from 'vue'
import { describeError, drawImages, ensurePackages, isWebRReady, runR } from '../webr'

/**
 * 参考答案卡片。
 *
 * 答案代码**直接显示在页面上**，不依赖任何网络；
 * 想动手试试时再点「▶ 运行」，会通过 WebR 在浏览器里真实执行这段 R 代码。
 *
 * 用法：在 Markdown 页面顶部的 script setup 块里定义一个装着 R 代码的字符串常量，
 * 再用 `:code="常量名"` 传给本组件即可。
 */
const props = withDefaults(
  defineProps<{
    /** 答案的 R 代码 */
    code?: string
    /** 运行前需要安装的 R 包 */
    packages?: string[]
    /** 卡片标题 */
    title?: string
    /** 补充说明 */
    description?: string
    /** 只展示代码，不提供运行按钮 */
    readOnly?: boolean
  }>(),
  {
    code: '',
    packages: () => [],
    title: '参考答案',
    description: '',
    readOnly: false
  }
)

const copied = ref(false)
const isRunning = ref(false)
const status = ref('')
const output = ref('')
const error = ref('')
const hasOutput = ref(false)
const plotContainer = ref<HTMLElement | null>(null)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

async function run() {
  if (isRunning.value) return
  error.value = ''
  output.value = ''
  hasOutput.value = false
  if (plotContainer.value) plotContainer.value.innerHTML = ''

  isRunning.value = true
  try {
    status.value = isWebRReady() ? '正在运行…' : '正在下载 WebR 运行环境（首次约 10 MB）…'
    await ensurePackages(props.packages, (text) => (status.value = text))

    status.value = '正在运行…'
    const startedAt = Date.now()
    const result = await runR(props.code)

    output.value = `${result.text || '（代码执行成功，没有输出内容）'}\n\n[执行用时 ${Date.now() - startedAt} ms]`
    if (result.images.length && plotContainer.value) drawImages(plotContainer.value, result.images)
    hasOutput.value = true
  } catch (e) {
    error.value = describeError(e)
  } finally {
    status.value = ''
    isRunning.value = false
  }
}

function clearOutput() {
  output.value = ''
  error.value = ''
  hasOutput.value = false
  if (plotContainer.value) plotContainer.value.innerHTML = ''
}
</script>

<template>
  <div class="answer-block">
    <div class="answer-header">
      <div class="answer-title">
        <span class="answer-icon">📘</span>
        <span class="answer-title-text">{{ title }}</span>
      </div>
      <div class="answer-actions">
        <button type="button" class="action-btn" @click="copyCode">
          {{ copied ? '✅ 已复制' : '📋 复制' }}
        </button>
        <button
          v-if="!readOnly"
          type="button"
          class="action-btn action-btn-primary"
          :disabled="isRunning"
          @click="run"
        >
          {{ isRunning ? '⏳ 运行中…' : '▶ 运行' }}
        </button>
        <button
          v-if="hasOutput && !readOnly"
          type="button"
          class="action-btn"
          title="清空输出"
          @click="clearOutput"
        >
          🧹
        </button>
      </div>
    </div>

    <p v-if="description" class="answer-desc">{{ description }}</p>

    <pre class="answer-code"><code>{{ code }}</code></pre>

    <div v-if="status" class="answer-status">
      <span class="spinner" />
      {{ status }}
    </div>

    <div v-if="error" class="answer-error">{{ error }}</div>

    <div v-if="hasOutput" class="answer-output">
      <div class="output-header">输出结果</div>
      <pre v-if="output" class="output-text">{{ output }}</pre>
      <div ref="plotContainer" class="plot-container" />
    </div>
  </div>
</template>

<style scoped>
.answer-block {
  margin: 1.25rem 0;
  border: 1px solid var(--ra-border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--ra-bg-panel);
}

.answer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 10px 16px;
  background: var(--ra-bg);
  border-bottom: 1px solid var(--ra-border);
}

.answer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
  color: var(--ra-text);
  min-width: 0;
}

.answer-icon {
  font-size: 16px;
  line-height: 1;
}

.answer-title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 按钮必须保持在同一行，不能被标题挤成两行 */
.answer-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.action-btn {
  appearance: none;
  border: 1px solid var(--ra-border);
  background: var(--ra-bg);
  color: var(--ra-text);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  background: var(--ra-bg-panel);
  border-color: var(--ra-primary);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn-primary {
  background: var(--ra-primary);
  border-color: var(--ra-primary);
  color: var(--ra-text-light);
}

.action-btn-primary:hover:not(:disabled) {
  background: var(--ra-primary-dark);
  border-color: var(--ra-primary-dark);
}

.answer-desc {
  margin: 0;
  padding: 10px 16px 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ra-text);
  opacity: 0.85;
}

.answer-code {
  margin: 0;
  padding: 14px 16px;
  background: var(--ra-bg);
  color: var(--ra-text);
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

.answer-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  color: var(--ra-text);
  background: var(--ra-bg);
  border-top: 1px solid var(--ra-border);
}

.spinner {
  width: 12px;
  height: 12px;
  border: 2px solid var(--ra-border);
  border-top-color: var(--ra-primary);
  border-radius: 50%;
  animation: ans-spin 0.8s linear infinite;
}

@keyframes ans-spin {
  to {
    transform: rotate(360deg);
  }
}

.answer-error {
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-line;
  color: var(--ra-error);
  background: var(--ra-error-bg);
  border-top: 1px solid var(--ra-border);
}

.answer-output {
  border-top: 1px solid var(--ra-border);
  background: var(--ra-bg);
}

.output-header {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ra-text);
  opacity: 0.7;
  border-bottom: 1px solid var(--ra-border);
}

.output-text {
  margin: 0;
  padding: 12px 16px;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ra-text);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 40vh;
  overflow-y: auto;
}

.plot-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
}

.plot-container :deep(canvas) {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--ra-border);
  border-radius: 6px;
  background: #fff;
}

@media (max-width: 768px) {
  .answer-header {
    align-items: flex-start;
  }

  .answer-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .answer-code,
  .output-text {
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
}
</style>
