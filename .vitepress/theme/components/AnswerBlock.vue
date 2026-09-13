<script setup lang="ts">
import { computed, ref } from 'vue'

/**
 * 参考答案卡片（静态版）。
 *
 * 答案代码、运行结果、输出图形都是**事先准备好**的静态内容，
 * 页面不做任何在线执行 —— 打开就能看到结果，离线可用，也不受
 * 网络与浏览器兼容性影响。
 *
 * 可用属性：
 *   code        答案的 R 代码（必填）
 *   title       卡片标题，如「实验一 · 参考答案」
 *   description 补充说明
 *   output      事先跑出来的文字输出（原样显示，保留换行）
 *   images      事先跑出来的图，public/ 下的路径，如 ['/figures/09/a.png']
 *   defaultOpen 是否默认展开（默认收起，让学生先自己做）
 */
const props = withDefaults(
  defineProps<{
    code?: string
    title?: string
    description?: string
    output?: string
    images?: string[]
    defaultOpen?: boolean
  }>(),
  {
    code: '',
    title: '参考答案',
    description: '',
    output: '',
    images: () => [],
    defaultOpen: false
  }
)

const isOpen = ref(props.defaultOpen)
const copied = ref(false)

/** 图片路径要补上部署前缀（本站是 /study-R-in-GDMU/） */
const BASE = import.meta.env.BASE_URL || '/'
const imageUrls = computed(() =>
  (props.images ?? []).map((src) =>
    /^(https?:|data:|\/\/)/.test(src) ? src : BASE.replace(/\/$/, '') + src
  )
)

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
</script>

<template>
  <div class="answer-block">
    <div class="answer-header">
      <div class="answer-title">
        <span class="answer-icon">📘</span>
        <span class="answer-title-text">{{ title }}</span>
      </div>
      <div class="answer-actions">
        <button
          type="button"
          class="action-btn action-btn-toggle"
          :aria-expanded="isOpen"
          @click="isOpen = !isOpen"
        >
          {{ isOpen ? '🙈 收起答案' : '👀 查看参考答案' }}
        </button>
        <button v-if="isOpen" type="button" class="action-btn" @click="copyCode">
          {{ copied ? '✅ 已复制' : '📋 复制' }}
        </button>
      </div>
    </div>

    <div v-show="isOpen" class="answer-body">
      <p v-if="description" class="answer-desc">{{ description }}</p>

      <pre class="answer-code"><code>{{ code }}</code></pre>

      <div v-if="output" class="answer-output">
        <div class="output-header">运行结果</div>
        <pre class="output-text">{{ output }}</pre>
      </div>

      <div v-if="imageUrls.length" class="answer-figures">
        <div class="output-header">输出图形</div>
        <figure v-for="(src, i) in imageUrls" :key="src + i">
          <img :src="src" :alt="`输出图 ${i + 1}`" loading="lazy" />
        </figure>
      </div>
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
}

.answer-body {
  border-top: 1px solid var(--ra-border);
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

.action-btn:hover {
  background: var(--ra-bg-panel);
  border-color: var(--ra-primary);
}

.action-btn-toggle {
  border-color: var(--ra-primary);
  color: var(--ra-primary);
  font-weight: 600;
}

.action-btn-toggle:hover {
  background: var(--ra-primary);
  border-color: var(--ra-primary);
  color: var(--ra-text-light);
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

.answer-output,
.answer-figures {
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

.answer-figures figure {
  margin: 0;
  padding: 12px 16px;
}

.answer-figures figure + figure {
  border-top: 1px dashed var(--ra-border);
}

.answer-figures img {
  display: block;
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
</style>
