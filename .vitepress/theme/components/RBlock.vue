<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { describeError, drawImages, getWebR, isWebRReady, runR } from '../webr'

/**
 * 交互式 R 代码块：在浏览器里真实运行 R（基于 WebR），不需要装 R。
 *
 * ```md
 * <RBlock />
 * ```
 *
 * 首次点「一键运行 R」会下载约 10 MB 的 WebR 运行环境，之后就能反复使用。
 */
const DEFAULT_CODE = 'plot(rnorm(100))'
const DEFAULT_OUTPUT = '// WebR 是一个在浏览器中运行 R 的工具，点击上方按钮开始安装'

const code = ref(DEFAULT_CODE)
const output = ref(DEFAULT_OUTPUT)

const isInstalling = ref(false)
const isReady = ref(false)
const isRunning = ref(false)
const showPopup = ref(false)
const progress = ref(0)
const message = ref('正在安装 WebR')
const errorText = ref('')
const hasError = ref(false)
const copyText = ref('复制代码')
const copyIcon = ref('📋')
const plotContainer = ref<HTMLElement | null>(null)

let timer: ReturnType<typeof setInterval> | null = null

const rows = computed(() => Math.max(4, Math.min(10, code.value.split('\n').length)))

function stopProgress() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

/** 下载并初始化 WebR 运行时 */
async function install() {
  isInstalling.value = true
  showPopup.value = true
  progress.value = 0
  message.value = '正在安装 WebR'
  errorText.value = ''
  hasError.value = false
  stopProgress()

  try {
    timer = setInterval(() => {
      progress.value = Math.min(progress.value + 2, 90)
    }, 200)

    await getWebR()
    progress.value = 95

    stopProgress()
    progress.value = 100
    setTimeout(() => (showPopup.value = false), 500)
    isReady.value = true
    output.value = '// WebR 已就绪，输入代码后点击“运行代码”或按 Ctrl+Enter 执行'
  } catch (e) {
    stopProgress()
    isInstalling.value = false
    hasError.value = true
    message.value = '安装失败'
    const detail = e instanceof Error ? e.message : String(e)
    if (detail.includes('Failed to fetch') || detail.includes('fetch')) {
      errorText.value = `网络连接失败，请检查网络设置后重试。\n\n可能原因：\n- 网络连接不稳定\n- 运行环境托管在境外 CDN，必要时请开启代理`
    } else {
      errorText.value = `安装过程中发生错误：${detail}\n\n请尝试刷新页面后重试。`
    }
    output.value = `// 安装失败：${detail}`
  } finally {
    if (!hasError.value) isInstalling.value = false
  }
}

/** 执行编辑器里的代码 */
async function run() {
  if (!isWebRReady() || isRunning.value) return
  isRunning.value = true
  output.value = '// 正在执行代码...'
  if (plotContainer.value) plotContainer.value.innerHTML = ''
  try {
    const result = await runR(code.value)
    output.value = result.text || '// 代码执行成功，但没有输出内容'
    if (result.images.length && plotContainer.value) drawImages(plotContainer.value, result.images)
  } catch (e) {
    output.value = `// ${describeError(e).replace(/\n/g, '\n// ')}`
  } finally {
    isRunning.value = false
  }
}

/** 清空 R 环境里的所有变量 */
async function reset() {
  if (!isWebRReady()) return
  isRunning.value = true
  output.value = '// 正在重置 WebR 环境...'
  if (plotContainer.value) plotContainer.value.innerHTML = ''
  try {
    await runR('rm(list = ls(all = TRUE))')
    output.value = '// WebR 环境已重置，所有变量已清除'
  } catch (e) {
    output.value = `// 重置环境失败：${describeError(e)}`
  } finally {
    isRunning.value = false
  }
}

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = code.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copyText.value = '已复制！'
  copyIcon.value = '✅'
  setTimeout(() => {
    copyText.value = '复制代码'
    copyIcon.value = '📋'
  }, 2000)
}

function clearCode() {
  code.value = ''
}

function clearOutput() {
  output.value = ''
  if (plotContainer.value) plotContainer.value.innerHTML = ''
}

onUnmounted(() => {
  stopProgress()
})
</script>

<template>
  <div class="r-block">
    <div class="r-block-header">
      <div class="r-block-title">
        <span class="r-icon">R</span>
        <span>交互式 R 代码块</span>
      </div>
      <div class="r-block-actions">
        <button
          class="r-btn r-btn-primary"
          :class="{ 'r-btn-disabled': isInstalling || isReady }"
          :disabled="isInstalling || isReady"
          aria-label="安装 WebR"
          @click="install"
        >
          <span v-if="isInstalling" class="loading-spinner" />
          {{ isInstalling ? '安装中…' : isReady ? 'WebR 已就绪' : '一键运行 R（首次约 10 MB）' }}
        </button>
      </div>
    </div>

    <Transition name="popup-fade">
      <div v-if="showPopup" class="install-popup">
        <div class="popup-header">
          <span>{{ message }}</span>
          <button class="popup-close" aria-label="关闭" @click="showPopup = false">✕</button>
        </div>
        <div class="popup-body">
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress" :style="{ width: `${progress}%` }" />
            </div>
            <div class="progress-text">{{ progress }}%</div>
          </div>
          <div v-if="errorText" class="popup-message">{{ errorText }}</div>
          <div v-if="hasError" class="popup-actions">
            <button class="r-btn r-btn-primary" @click="install">重试</button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="code-editor-container">
      <div class="code-editor-header">
        <span class="editor-title">R 代码</span>
        <div class="editor-actions">
          <button class="action-btn" :title="copyText" @click="copy">{{ copyIcon }}</button>
          <button class="action-btn" title="清空代码" @click="clearCode">🗑️</button>
        </div>
      </div>
      <div class="code-editor">
        <textarea
          v-model="code"
          :rows="rows"
          spellcheck="false"
          placeholder="在这里输入 R 代码…"
          @keydown.ctrl.enter="run"
          @keydown.meta.enter="run"
        />
      </div>
      <div class="editor-footer">
        <button
          class="r-btn r-btn-primary run-btn"
          :class="{ 'r-btn-disabled': !isReady || isRunning }"
          :disabled="!isReady || isRunning"
          @click="run"
        >
          <span v-if="isRunning" class="loading-spinner small" />
          {{ isRunning ? '运行中…' : '▶ 运行代码' }}
        </button>
        <button
          class="r-btn reset-btn"
          :class="{ 'r-btn-disabled': !isReady || isRunning }"
          :disabled="!isReady || isRunning"
          @click="reset"
        >
          🔄 重置环境
        </button>
      </div>
    </div>

    <div class="output-container">
      <div class="output-header">
        <span class="output-title">输出结果</span>
        <div class="output-actions">
          <button class="action-btn" title="清空输出" @click="clearOutput">🧹</button>
        </div>
      </div>
      <pre class="r-out" aria-live="polite">{{ output }}</pre>
      <div ref="plotContainer" class="plot-container" />
    </div>
  </div>
</template>

<style scoped>
.r-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1.5rem 0;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.2s ease;
}

.r-block:hover {
  border-color: var(--vp-c-brand);
}

.r-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.r-block-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.r-icon {
  background-color: var(--vp-c-brand);
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.r-btn {
  appearance: none;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.25rem;
  user-select: none;
}

.r-btn:hover:not(.r-btn-disabled) {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-border-hover);
  transform: translateY(-1px);
}

.r-btn-primary {
  background: var(--vp-c-brand);
  color: #fff;
  border-color: var(--vp-c-brand);
}

.r-btn-primary:hover:not(.r-btn-disabled) {
  background: var(--vp-c-brand-hover);
  border-color: var(--vp-c-brand-hover);
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.3);
}

.r-btn-disabled {
  opacity: 0.6;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
}

.install-popup {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  width: 280px;
  background: #fff;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px #00000026;
  z-index: 9999;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
}

.popup-header {
  background: var(--vp-c-brand);
  color: #fff;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.popup-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.popup-close:hover {
  background-color: #fff3;
}

.popup-body {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.progress-bar {
  height: 8px;
  background: #f1f1f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--vp-c-brand);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: right;
  color: var(--vp-c-text-2);
}

.popup-message {
  white-space: pre-wrap;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.popup-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.code-editor-container {
  padding: 1rem 1.25rem 0.25rem;
}

.code-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.editor-title,
.output-title {
  font-weight: 500;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
}

.editor-actions,
.output-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.action-btn:hover {
  background-color: var(--vp-c-bg-mute);
}

.code-editor {
  margin: 0 0 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.code-editor textarea {
  width: 100%;
  min-height: 80px;
  border: none;
  background: transparent;
  padding: 0.75rem;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  resize: vertical;
  outline: none;
}

.code-editor textarea::placeholder {
  color: var(--vp-c-text-3);
}

.editor-footer {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.run-btn {
  flex: 0 0 auto;
}

.reset-btn {
  flex: 0 0 auto;
  background: var(--vp-c-bg-mute);
}

.reset-btn:hover:not(.r-btn-disabled) {
  background: var(--vp-c-bg-mute-hover);
}

.output-container {
  padding: 0.25rem 1.25rem 1rem;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.r-out {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 0.75rem;
  font-family: Consolas, Monaco, 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  min-height: 2.5rem;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-x: auto;
  margin: 0;
}

.plot-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.plot-container :deep(canvas) {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: #fff;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

.loading-spinner.small {
  width: 12px;
  height: 12px;
  border-width: 1.5px;
}

.r-btn-disabled .loading-spinner {
  border-top-color: #fff9;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .r-block {
    margin: 1rem 0;
  }

  .r-block-header {
    padding: 0.75rem 1rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .r-block-actions {
    display: flex;
    justify-content: center;
  }

  .r-btn {
    font-size: 0.8125rem;
    padding: 0.4375rem 0.875rem;
    min-height: 2rem;
  }

  .install-popup {
    width: calc(100vw - 2rem);
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }

  .code-editor-container,
  .output-container {
    padding: 0.75rem 1rem 0.25rem;
  }

  .code-editor textarea,
  .r-out {
    font-size: 0.8125rem;
    padding: 0.625rem;
  }

  .editor-footer {
    flex-direction: column;
    gap: 0.5rem;
  }

  .run-btn,
  .reset-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .r-block,
  .r-btn,
  .progress,
  .popup-close,
  .action-btn,
  .reset-btn {
    transition: none;
  }

  .loading-spinner,
  .install-popup {
    animation: none;
  }

  .popup-fade-enter-active,
  .popup-fade-leave-active {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .r-block,
  .code-editor,
  .r-out,
  .r-btn,
  .install-popup {
    border-width: 2px;
  }
}
</style>
