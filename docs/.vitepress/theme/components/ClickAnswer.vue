<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * 可折叠的「显示解答」按钮。
 *
 * ```md
 * <ClickAnswer>
 * 这里写解答内容，支持 Markdown 与公式。
 * </ClickAnswer>
 * ```
 */
const props = withDefaults(
  defineProps<{
    /** 初始是否展开 */
    initiallyOpen?: boolean
    /** 收起时按钮上的文字 */
    showText?: string
    /** 展开时按钮上的文字 */
    hideText?: string
    /** 图标位置 */
    iconPosition?: 'left' | 'right'
    /** 收起时显示的图标 */
    showIcon?: string
    /** 展开时显示的图标 */
    hideIcon?: string
    /** 展开动画：fade / slide / scale / none */
    animation?: 'fade' | 'slide' | 'scale' | 'none'
    /** 配色：default / info / warning / error / success */
    theme?: 'default' | 'info' | 'warning' | 'error' | 'success'
    disabled?: boolean
    /** 点击组件外部时自动收起 */
    closeOnClickOutside?: boolean
    id?: string
  }>(),
  {
    initiallyOpen: false,
    showText: '▼ 显示解答',
    hideText: '▲ 隐藏解答',
    iconPosition: 'left',
    showIcon: '💡',
    hideIcon: '📋',
    animation: 'fade',
    theme: 'default',
    disabled: false,
    closeOnClickOutside: true,
    id: undefined
  }
)

const uid = props.id ?? `click-answer-${Math.random().toString(36).slice(2, 11)}`
const contentId = `${uid}-content`

const isOpen = ref(props.initiallyOpen)
const isMounted = ref(false)

const buttonText = computed(() => (isOpen.value ? props.hideText : props.showText))
const buttonIcon = computed(() => (isOpen.value ? props.hideIcon : props.showIcon))
const themeClass = computed(() => `theme-${props.theme}`)
const animationClass = computed(() => (props.animation === 'none' ? '' : `transition-${props.animation}`))
const transitionName = computed(() => (props.animation === 'none' ? '' : props.animation))

function toggle() {
  if (!props.disabled) isOpen.value = !isOpen.value
}

function onClickOutside(event: MouseEvent) {
  if (!props.closeOnClickOutside || !isOpen.value) return
  const root = document.getElementById(uid)
  if (root && !root.contains(event.target as Node)) isOpen.value = false
}

onMounted(() => {
  isMounted.value = true
  if (props.closeOnClickOutside) document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  if (props.closeOnClickOutside) document.removeEventListener('click', onClickOutside)
})

watch(
  () => props.initiallyOpen,
  (value) => {
    if (isMounted.value) isOpen.value = value
  }
)
</script>

<template>
  <div :id="uid" class="click-answer">
    <button
      type="button"
      class="ans-btn"
      :class="{ 'ans-btn-disabled': disabled, 'ans-btn-active': isOpen }"
      :disabled="disabled"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      @click="toggle"
    >
      <span v-if="iconPosition === 'left' && (showIcon || hideIcon)" class="ans-btn-icon ans-btn-icon-left">
        {{ buttonIcon }}
      </span>
      <span class="ans-btn-text">{{ buttonText }}</span>
      <span v-if="iconPosition === 'right' && (showIcon || hideIcon)" class="ans-btn-icon ans-btn-icon-right">
        {{ buttonIcon }}
      </span>
    </button>

    <Transition :name="transitionName" mode="out-in">
      <div
        v-show="isOpen"
        :id="contentId"
        class="ans-box"
        :class="[themeClass, animationClass]"
        role="region"
        :aria-labelledby="uid"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.click-answer {
  margin: 16px 0;
  position: relative;
}

.ans-btn {
  appearance: none;
  border: 1px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  user-select: none;
}

.ans-btn:hover:not(:disabled) {
  background: var(--ans-btn-hover-bg);
  color: var(--ans-btn-hover-text);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px #1a73e840;
}

.ans-btn-active,
.ans-btn:active:not(:disabled) {
  background: var(--ans-btn-hover-bg);
  color: var(--ans-btn-hover-text);
}

.ans-btn:disabled,
.ans-btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.ans-btn-icon {
  font-size: 16px;
  line-height: 1;
}

.ans-btn-text {
  white-space: nowrap;
}

.ans-box {
  margin-top: 12px;
  padding: 16px 20px;
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  border-radius: 0 6px 6px 0;
  line-height: 1.6;
  font-size: 14px;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.ans-box.theme-default {
  border-left-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.ans-box.theme-info {
  border-left-color: var(--vp-c-info);
  background: rgba(var(--vp-c-info-rgb), 0.1);
}

.ans-box.theme-warning {
  border-left-color: var(--vp-c-warning);
  background: rgba(var(--vp-c-warning-rgb), 0.1);
}

.ans-box.theme-error {
  border-left-color: var(--vp-c-danger);
  background: rgba(var(--vp-c-danger-rgb), 0.1);
}

.ans-box.theme-success {
  border-left-color: var(--vp-c-success);
  background: rgba(var(--vp-c-success-rgb), 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease, margin 0.4s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top left;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

@media (max-width: 768px) {
  .ans-btn {
    padding: 6px 12px;
    font-size: 13px;
    min-height: 32px;
  }

  .ans-btn-icon {
    font-size: 14px;
  }

  .ans-box {
    padding: 12px 16px;
    font-size: 13px;
    margin-top: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ans-btn,
  .ans-box,
  .fade-enter-active,
  .fade-leave-active,
  .slide-enter-active,
  .slide-leave-active,
  .scale-enter-active,
  .scale-leave-active {
    transition: none;
  }

  .fade-enter-from,
  .fade-leave-to,
  .slide-enter-from,
  .slide-leave-to,
  .scale-enter-from,
  .scale-leave-to {
    opacity: 1;
    transform: none;
    max-height: none;
    padding: inherit;
    margin: inherit;
  }
}

@media (prefers-contrast: high) {
  .ans-btn,
  .ans-box {
    border-width: 2px;
  }
}
</style>
