/**
 * 给还没翻译的中文页，在 `docs/en/` 下生成一个「尚未翻译」占位页。
 *
 * 为什么需要它：
 *   VitePress 的语言切换器是**按路径前缀**跳的 —— 在 `/Health-statistics/04-xxx` 点
 *   「English」，它会跳到 `/en/Health-statistics/04-xxx`。英文版还没翻到那一页时，
 *   这个地址不存在，读者直接撞 404（实测 47 条）。既不能把切换器关掉（那英文版就等于藏起来了），
 *   也不想让读者点过去看到 404，所以用占位页兜住：明确说「这页还没翻，中文原文在那边」。
 *
 * 自清理：**已经翻好的页不会被覆盖**（脚本会跳过 docs/en/ 下已存在的文件），
 * 所以每翻完一页重跑一次本脚本，对应的占位就自动消失。
 *
 * 用法（在仓库根目录）：
 *     node scripts/generate-en-stubs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const DOCS = 'docs'
const EN = path.join(DOCS, 'en')

/** 收集中文页（排除英文树本身） */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (path.resolve(p) === path.resolve(EN)) continue // 英文树不算中文页
      if (e.name === '.vitepress' || e.name === 'public') continue
      walk(p, out)
    } else if (e.name.endsWith('.md')) {
      out.push(p)
    }
  }
  return out
}

const zhPages = walk(DOCS)
let created = 0
let skipped = 0
const made = []

for (const zh of zhPages) {
  const rel = path.relative(DOCS, zh) // 如 Health-statistics\04-xxx.md
  const enFile = path.join(EN, rel)

  if (fs.existsSync(enFile)) {
    skipped++
    continue
  }

  // 中文页的站内地址（不带 .html，VitePress 自己会补）
  const zhUrl = '/' + rel.replace(/\\/g, '/').replace(/\.md$/, '').replace(/\/index$/, '/')
  const zhTitle = (fs.readFileSync(zh, 'utf8').match(/^title:\s*['"]?(.+?)['"]?\s*$/m) || [])[1] || rel

  const body = `---
layout: doc
title: 'Not translated yet — ${zhTitle}'
head:
  - - meta
    - name: robots
      content: noindex
---

# This page is not translated yet

The English edition is being translated page by page, and this page has not been reached yet.

**The Chinese original is complete and is the authoritative version** — numbers, formulas, and R code
there are what everything else is based on:

[→ Read this page in Chinese](${zhUrl})

Section overview: [Health Statistics in English](/en/Health-statistics/) ·
[About the translation](/en/)
`

  fs.mkdirSync(path.dirname(enFile), { recursive: true })
  fs.writeFileSync(enFile, body, 'utf8')
  created++
  made.push(rel.replace(/\\/g, '/'))
}

console.log(`中文页 ${zhPages.length} 个：已翻译 ${skipped} 个，新建占位 ${created} 个`)
if (created) {
  console.log('\n新建的占位页：')
  for (const m of made) console.log('  ' + m)
}
