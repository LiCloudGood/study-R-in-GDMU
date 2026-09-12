<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

/**
 * 「运行答案」按钮：弹出一个窗口，用 WebR 在浏览器里真实跑一遍这份 R 代码。
 *
 * ```md
 * <AnswerBlock :code="`...R 代码...`" :packages="['ISwR']" />
 * ```
 *
 * WebR 体积约 10 MB，只有用户点开「运行答案」时才会去 CDN 下载。
 */
const props = withDefaults(
  defineProps<{
    /** 要运行的 R 代码 */
    code?: string
    /** 运行前需要安装的 R 包 */
    packages?: string[]
    /** 弹窗标题 */
    title?: string
    /** 弹窗副标题 */
    description?: string
    /** 只读模式：只展示代码，不提供运行按钮 */
    readOnly?: boolean
    /** 弹窗最大高度 */
    height?: string
    /** 弹窗最大宽度 */
    width?: string
  }>(),
  {
    code: '',
    packages: () => [],
    title: '答案 & 实时运行',
    description: '',
    readOnly: false,
    height: '80vh',
    width: '700px'
  }
)

const isOpen = ref(false)
const isLoadingWebR = ref(false)
const isRunning = ref(false)
const progress = ref(0)
const copied = ref(false)
const hasError = ref(false)

const output = ref('// 点击“运行”后查看结果')
const error = ref('')

let webr: any = null
let webrReady = false
const installedPackages = new Set<string>()

/** 动态加载 WebR 运行时（只在第一次点开时执行） */
async function loadWebR(): Promise<boolean> {
  if (webrReady || isLoadingWebR.value) return true
  isLoadingWebR.value = true
  output.value = '正在加载 WebR 环境...'
  hasError.value = false
  try {
    if ((window as any).webr) {
      webr = (window as any).webr
    } else {
      const script = document.createElement('script')
      script.src = 'https://webr.r-wasm.org/latest/webr.js'
      script.type = 'text/javascript'
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('WebR 脚本加载失败'))
        document.head.appendChild(script)
      })
      await new Promise<void>((resolve) => {
        const check = () => ((window as any).webr ? resolve() : setTimeout(check, 100))
        check()
      })
      webr = (window as any).webr
      await webr.init({ homedir: '/home/web_user' })
    }
    webrReady = true
    return true
  } catch (e) {
    const message = e instanceof Error ? e.message.trim() : '初始化失败'
    error.value = `WebR 加载失败: ${message}`
    console.error('WebR 初始化错误:', e)
    hasError.value = true
    return false
  } finally {
    isLoadingWebR.value = false
  }
}

async function open() {
  if (isOpen.value) return
  output.value = '// 点击“运行”后查看结果'
  error.value = ''
  hasError.value = false
  isOpen.value = true
  // 这里刻意不预加载 WebR：只想看看代码的同学不必白白下载约 10 MB 的运行环境，
  // 真正点「运行」时再按需加载。
  await nextTick()
}

async function run() {
  if (!isOpen.value || isRunning.value) return
  const code = (props.code || '').trim()
  if (!code) {
    error.value = '代码不能为空'
    return
  }
  if (!webrReady && !(await loadWebR())) return

  isRunning.value = true
  error.value = ''
  output.value = '准备运行...'
  progress.value = 0
  hasError.value = false

  try {
    const pending = (props.packages || []).filter((pkg) => !installedPackages.has(pkg))
    if (pending.length) {
      output.value = `需要安装 ${pending.length} 个包...`
      await nextTick()
      for (let i = 0; i < pending.length; i++) {
        const pkg = pending[i]
        progress.value = Math.round(((i + 1) / pending.length) * 100)
        output.value = `安装 ${pkg} (${i + 1}/${pending.length})`
        await webr.installPackages([pkg])
        installedPackages.add(pkg)
      }
    }

    output.value = '运行中...'
    const chunks: string[] = []
    webr.io.stdout.on('data', (data: string) => chunks.push(data))
    const startedAt = Date.now()
    await webr.evalR(code)
    const elapsed = Date.now() - startedAt
    const text = chunks.join('').trim()
    output.value = `${text || '代码执行成功 (无输出)'}\n\n[执行时间: ${elapsed}ms]`
  } catch (e) {
    error.value = e instanceof Error ? e.message.trim() : '运行出错'
    hasError.value = true
  } finally {
    webr?.io?.stdout?.removeAllListeners('data')
    isRunning.value = false
    progress.value = 0
  }
}

async function copyCode() {
  const text = props.code || ''
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function close() {
  isOpen.value = false
}

function clearOutput() {
  output.value = '// 点击“运行”后查看结果'
  error.value = ''
  hasError.value = false
}

function retry() {
  hasError.value = false
  loadWebR()
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && !isRunning.value && !isLoadingWebR.value) {
    event.preventDefault()
    run()
  }
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  webr?.close?.()
})
</script>

<template>
  <div class="run-answer">
    <button
      class="open-btn"
      :class="{ disabled: readOnly }"
      :disabled="isLoadingWebR && !isOpen"
      @click="open"
    >
      <span v-if="isLoadingWebR && !isOpen">加载中…</span>
      <span v-else-if="readOnly">查看代码</span>
      <span v-else>运行答案</span>
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="modal-overlay" :class="{ 'overlay-visible': isOpen }" @click.self="close">
          <div class="modal-panel" :style="{ maxWidth: width, maxHeight: height }" role="dialog" aria-modal="true">
            <header>
              <div class="header-content">
                <h3>{{ title }}</h3>
                <p v-if="description" class="description">{{ description }}</p>
              </div>
              <div class="header-actions">
                <button
                  v-if="!readOnly"
                  class="copy-btn"
                  :aria-label="copied ? '已复制代码' : '复制代码'"
                  @click="copyCode"
                >
                  {{ copied ? '✓ 已复制' : '📋 复制' }}
                </button>
                <button class="close" aria-label="关闭" @click="close">✕</button>
              </div>
            </header>

            <div class="code-container">
              <pre class="code"><code class="language-r">{{ code }}</code></pre>
            </div>

            <div v-if="!readOnly" class="action">
              <button class="run" :disabled="isRunning" :aria-busy="isRunning" @click="run">
                {{ isRunning ? '运行中…' : '▶ 运行' }}
              </button>
              <button class="clear" :disabled="isRunning" @click="clearOutput">🗑️ 清空</button>
              <small v-if="isRunning" class="pct">{{ progress }}%</small>
            </div>

            <div class="output-container">
              <div v-if="!readOnly" class="output-header">输出结果</div>
              <pre v-if="error" class="output error">{{ error }}</pre>
              <pre v-else class="output">{{ output }}</pre>

              <div v-if="hasError" class="error-overlay">
                <div class="error-card">
                  <h4>运行出错</h4>
                  <p>{{ error }}</p>
                  <button class="retry-btn" @click="retry">重试</button>
                  <button class="close-error" @click="close">关闭</button>
                </div>
              </div>
            </div>

            <div v-if="isLoadingWebR || isRunning" class="progress">
              <div class="bar" :style="{ width: `${progress}%` }" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.run-answer {
  display: inline-block;
}

.open-btn {
  margin: 16px 0;
  background: var(--ra-primary);
  color: var(--ra-text-light) !important;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.open-btn:hover:not(:disabled) {
  background: var(--ra-primary-dark);
}

.open-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.open-btn.disabled {
  background: #f59e0b;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--ra-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.modal-overlay.overlay-visible {
  opacity: 1;
  pointer-events: auto;
}

.modal-panel {
  background: var(--ra-bg-panel);
  border: 1px solid var(--ra-border);
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000000d;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.modal-overlay.overlay-visible .modal-panel {
  transform: translateY(0);
}

header {
  padding: 16px;
  border-bottom: 1px solid var(--ra-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-content h3 {
  margin: 0 0 8px;
  color: var(--ra-text);
  font-size: 18px;
}

.description {
  margin: 0;
  color: var(--ra-text);
  opacity: 0.8;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.copy-btn,
.run,
.retry-btn {
  color: var(--ra-text-light) !important;
  background: var(--ra-primary);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.copy-btn:hover,
.run:hover:not(:disabled),
.retry-btn:hover {
  background: var(--ra-primary-dark);
}

.run:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.clear,
.close-error {
  color: var(--ra-text) !important;
  background: var(--ra-bg);
  border: 1px solid var(--ra-border);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.clear:hover:not(:disabled),
.close-error:hover {
  background: var(--ra-bg-panel);
}

.clear:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.close {
  color: var(--ra-text) !important;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.close:hover {
  background: #0000001a;
}

.code-container {
  background: var(--ra-bg);
  overflow: auto;
  max-height: 40vh;
  border-bottom: 1px solid var(--ra-border);
}

.code {
  margin: 0;
  padding: 16px;
  font-family: monospace;
  font-size: 14px;
  white-space: pre-wrap;
  color: var(--ra-text);
}

.action {
  padding: 12px 16px;
  border-bottom: 1px solid var(--ra-border);
  display: flex;
  gap: 8px;
  align-items: center;
}

.pct {
  margin-left: auto;
  color: var(--ra-text);
  opacity: 0.8;
}

.output-container {
  flex: 1;
  min-height: 120px;
  position: relative;
  background: var(--ra-bg);
}

.output-header {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--ra-text);
  background: var(--ra-bg-panel);
  border-bottom: 1px solid var(--ra-border);
}

.output {
  margin: 0;
  padding: 16px;
  font-family: monospace;
  font-size: 14px;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 30vh;
  color: var(--ra-text);
}

.error {
  background: var(--ra-error-bg);
  color: var(--ra-error);
}

.progress {
  height: 4px;
  background: var(--ra-border);
}

.bar {
  height: 100%;
  background: var(--ra-primary);
  transition: width 0.3s ease;
}

.error-overlay {
  position: absolute;
  inset: 0;
  background: #000000b3;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.error-card {
  background: var(--ra-bg-panel);
  border: 1px solid var(--ra-error);
  border-radius: 8px;
  padding: 20px;
  max-width: 80%;
  text-align: center;
}

.error-card h4 {
  margin: 0 0 12px;
  color: var(--ra-error);
}

.error-card p {
  margin: 0 0 16px;
  color: var(--ra-text);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-panel {
    max-height: 95vh;
    width: 95%;
  }

  header {
    flex-direction: column;
    gap: 12px;
  }

  .header-actions {
    align-self: flex-end;
  }
}
</style>
