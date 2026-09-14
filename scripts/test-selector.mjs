/**
 * 选择器端到端点击测试：用真实浏览器把题库里**每一条路径**都点一遍。
 *
 * 为什么需要它：上一轮只验证了「页面能渲染出第一道题」就以为修好了，
 * 结果「一路点到底出不来答案」这种问题漏了过去，一直到作者自己用才发现。
 * 凡是「点下去才有反应」的东西，都得真的去点。
 *
 * 做法：Edge headless + CDP（Node 22 自带 WebSocket，不用装 puppeteer）。
 *   - 从 selector-data.ts 枚举所有「问题 → 结果」路径
 *   - 每条路径：刷新页面 → 依次点击对应选项 → 读 .sf-method
 *   - 核对方法名与题库一致、章节链接带 base 前缀、控制台无报错
 *
 * 用法（先在另一个窗口把预览跑起来）：
 *     node node_modules/vitepress/bin/vitepress.js preview docs --port 4173 --host 127.0.0.1
 *     node scripts/test-selector.mjs
 *
 * 需要本机装了 Edge，没装也能跑 —— 脚本会明确报错而不是假装通过。
 * 不接入 CI（构建产物 + 浏览器都在本地），改完选择器手动跑一次就行。
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const BASE = process.argv[2] || 'http://127.0.0.1:4173/study-R-in-GDMU'
const PAGE = `${BASE}/Health-statistics/choice.html`
const PORT = 9333

// 先确认预览是活的，省得一路点下去才发现全 404、还以为是选择器坏了
try {
  const r = await fetch(PAGE)
  if (!r.ok) throw new Error('HTTP ' + r.status)
} catch (e) {
  console.error(`打不开 ${PAGE}（${e.message}）`)
  console.error('请先把预览跑起来：')
  console.error('  node node_modules/vitepress/bin/vitepress.js preview docs --port 4173 --host 127.0.0.1')
  process.exit(2)
}

// ── 读题库（selector-data.ts 里的那个对象就是 JSON，直接切出来 parse）──
const src = fs.readFileSync(
  new URL('../docs/.vitepress/theme/selector-data.ts', import.meta.url),
  'utf8'
)
const jsonStart = src.indexOf('= {')
const tree = JSON.parse(src.slice(jsonStart + 2).replace(/;\s*$/, ''))
const nodes = tree.nodes
const byId = new Map(nodes.map((n) => [n.id, n]))

// 枚举所有路径
const paths = []
function walk(id, acc) {
  const n = byId.get(id)
  if (!n) return
  if (n.result) return paths.push({ acc, resultId: id, method: n.result.method })
  for (let i = 0; i < (n.options || []).length; i++) {
    walk(n.options[i].next, [...acc, { qid: id, idx: i, text: n.options[i].text }])
  }
}
const start = nodes.find((n) => n.question).id
walk(start, [])
console.log(`题库里共 ${paths.length} 条路径，开始逐条点击…\n`)

// ── 起 Edge ────────────────────────────────────────────
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'selclick-'))
const edge = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
].find((p) => fs.existsSync(p))
if (!edge) throw new Error('找不到 msedge.exe')

const child = spawn(
  edge,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmp}`,
    '--no-first-run',
    '--disable-gpu',
    '--window-size=1280,900',
    PAGE
  ],
  { stdio: 'ignore', detached: false }
)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const list = await r.json()
      const p = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
      if (p) return p
    } catch {}
    await sleep(500)
  }
  throw new Error('连不上 Edge 的调试端口')
}

const t = await target()
const ws = new WebSocket(t.webSocketDebuggerUrl)
await new Promise((res, rej) => {
  ws.onopen = res
  ws.onerror = rej
})

let msgId = 0
const pending = new Map()
const errors = []
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m)
    pending.delete(m.id)
  }
  if (m.method === 'Runtime.exceptionThrown') {
    errors.push('异常: ' + (m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text || '?'))
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    errors.push('console.error: ' + m.params.args.map((a) => a.value ?? a.description).join(' '))
  }
}
function send(method, params = {}) {
  const id = ++msgId
  ws.send(JSON.stringify({ id, method, params }))
  return new Promise((res) => pending.set(id, res))
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
  if (r.result?.exceptionDetails) {
    return { __err: r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text }
  }
  return r.result?.result?.value
}

await send('Runtime.enable')
await send('Page.enable')

// ── 逐条路径点击 ───────────────────────────────────────
let ok = 0
const bad = []
for (const p of paths) {
  errors.length = 0
  await send('Page.navigate', { url: PAGE + '?t=' + Date.now() })
  // 等选项出现
  for (let i = 0; i < 50; i++) {
    if (await ev(`!!document.querySelector('.sf-option')`)) break
    await sleep(100)
  }

  let clicked = true
  for (const step of p.acc) {
    const got = await ev(
      `(() => { const b = document.querySelectorAll('.sf-option')[${step.idx}];
         if (!b) return null; b.click(); return b.textContent.trim().slice(0, 30) })()`
    )
    if (!got) {
      clicked = false
      break
    }
    await sleep(60)
  }
  await sleep(120)

  const got = await ev(
    `(() => {
       const m = document.querySelector('.sf-method');
       const r = document.querySelector('.sf-result');
       const a = document.querySelector('.sf-chapter');
       return {
         method: m ? m.textContent.trim() : null,
         hasResult: !!r,
         fallback: !!document.body.innerText.includes('这一步没有找到对应的结论'),
         chapText: a ? a.textContent.trim() : null,
         chapHref: a ? a.getAttribute('href') : null,
         code: !!document.querySelector('.sf-code')
       }
     })()`
  )

  const label = p.acc.map((s) => s.text).join(' / ')
  if (!clicked) {
    bad.push(`✗ ${label}\n    点不到选项`)
    continue
  }
  if (got.__err) {
    bad.push(`✗ ${label}\n    页面报错: ${String(got.__err).split('\n')[0]}`)
    continue
  }
  if (!got.hasResult || !got.method) {
    bad.push(`✗ ${label}\n    没出结果 (hasResult=${got.hasResult}, method=${got.method}, 兜底提示=${got.fallback})`)
    continue
  }
  if (got.method !== p.method) {
    bad.push(`✗ ${label}\n    方法名对不上: 页面「${got.method}」 题库「${p.method}」`)
    continue
  }
  if (!got.chapHref || !got.chapHref.startsWith('/study-R-in-GDMU/Health-statistics/')) {
    bad.push(`✗ ${label}\n    章节链接不对: ${got.chapHref}`)
    continue
  }
  if (errors.length) {
    bad.push(`✗ ${label}\n    控制台报错: ${errors[0]}`)
    continue
  }
  ok++
}

console.log(`\n点完 ${paths.length} 条路径：成功 ${ok} 条，失败 ${bad.length} 条\n`)
if (bad.length) console.log(bad.join('\n\n'))
else console.log('✅ 每一条路径都点得出答案，方法名与题库一致，章节链接都带 base 前缀，控制台无报错')

// ── 入口按钮：卫生统计学首页上那个裸 HTML 的 <a> ────────
// 裸 HTML 的 href 不会被 VitePress 加 base、也不会被改写成页面路径，
// 这里之前出过一次 404（/intro-it/ 的课程卡片就是这么坏的），所以也点一遍。
{
  const idx = `${BASE}/Health-statistics/`
  await send('Page.navigate', { url: idx })
  for (let i = 0; i < 50; i++) {
    if (await ev(`document.readyState === 'complete'`)) break
    await sleep(100)
  }
  // 侧栏里也有指向选择器的链接，所以要精确匹配正文那个按钮
  const SEL = 'a[href="./choice"], a[href="./choice.html"]'
  const href = await ev(`document.querySelector('${SEL}')?.getAttribute('href') || null`)
  if (!href) {
    bad.push('✗ 首页上找不到「打开统计方法选择器」按钮')
  } else {
    await ev(`document.querySelector('${SEL}').click()`)
    await sleep(2000)
    const landed = await ev(`location.pathname`)
    const arrived = await ev(`!!document.querySelector('.sf-option')`)
    if (!arrived || !String(landed).endsWith('choice.html')) {
      bad.push(`✗ 点首页按钮没进选择器（停在 ${landed}）`)
    } else {
      console.log(`✅ 首页按钮（href="${href}"）能正常打开选择器`)
    }
  }
}

// 抽查一条路径的完整结果长什么样
await send('Page.navigate', { url: PAGE + '?t=' + Date.now() })
for (let i = 0; i < 50; i++) {
  if (await ev(`!!document.querySelector('.sf-option')`)) break
  await sleep(100)
}
const demo = paths.find((p) => p.acc.length >= 3) || paths[0]
for (const s of demo.acc) {
  await ev(`document.querySelectorAll('.sf-option')[${s.idx}].click()`)
  await sleep(80)
}
await sleep(150)
const text = await ev(`document.querySelector('.sf')?.innerText || '(空)'`)
console.log('\n── 抽查一条路径的渲染结果 ──')
console.log('路径: ' + demo.acc.map((s) => s.text).join(' → '))
console.log('─'.repeat(60))
console.log(String(text).split('\n').filter(Boolean).slice(0, 30).join('\n'))

ws.close()
child.kill()
try {
  fs.rmSync(tmp, { recursive: true, force: true })
} catch {}
process.exit(bad.length ? 1 : 0)
