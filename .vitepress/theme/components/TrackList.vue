<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * 带勾选的学习清单，进度保存在浏览器 localStorage 里（按页面路径分开存）。
 *
 * ```md
 * <TrackList :tasks="['安装 R', '安装 RStudio', '跑通第一段代码']" />
 * ```
 */
const props = defineProps<{ tasks?: string[] }>()

interface Item {
  text: string
  done: boolean
}

const items = ref<Item[]>([])
let storageKey = ''

function persist() {
  if (!storageKey) return
  try {
    localStorage.setItem(storageKey, JSON.stringify(items.value))
  } catch {
    /* 隐私模式下 localStorage 可能不可用，忽略即可 */
  }
}

onMounted(() => {
  const tasks = props.tasks ?? []
  storageKey = `track_${location.pathname}`
  let saved: Item[] = []
  try {
    saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
  } catch {
    saved = []
  }
  // 清单长度变了（内容更新过）就重置，否则沿用上次的进度
  items.value =
    saved.length === tasks.length ? saved : tasks.map((text) => ({ text, done: false }))
})
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <label>
        <input v-model="item.done" type="checkbox" @change="persist" />
        <span :class="{ done: item.done }">{{ item.text }}</span>
      </label>
    </li>
  </ul>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  color: #999;
}
</style>
