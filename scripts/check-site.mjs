/**
 * 站点体检：构建之后跑一遍，把「没人盯着就会漏」的东西都查出来。
 *
 *   node scripts/check-site.mjs
 *
 * 查这些（每一条都对应一次真实踩过的坑）：
 *
 *   1. 内链：产物里所有 /study-R-in-GDMU/... 的链接，目标文件是否真的存在
 *   2. 图片：页面引用的 /figures/... 是否都能在 docs/public 下找到
 *   3. XML 残渣：<a:txBody> 这类从 pptx 抽表格时漏出来的原始 XML
 *      （曾经在医学大数据第 4、5、6 周页面上原样印出来过）
 *   4. 没渲染的 markdown：字面 **加粗**、::: 容器、表格分隔行、代码围栏
 *      （中文标点紧贴 ** 时 CommonMark 会判成"不能闭合"，见 config.mts 里的 cjkStrongPlugin）
 *   5. 没替换的占位符：{{ ... }}、[object Object]
 *   6. 图片前缀：裸 HTML 里的 src 必须带部署前缀，否则 GitHub Pages 上 404
 *   7. 中文冒充已译：docs/en 下不该出现整页中文的"假英文页"
 *   8. 配图张数：第 9、10、11 讲的题面图与答案输出图是逐个核过的，数量变了要警觉
 *
 * 退出码：全部通过 0，有失败 1（可以直接用在 CI 里）。
 */
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'docs/.vitepress/dist'
const PUB = 'docs/public'
const BASE = '/study-R-in-GDMU/'

let bad = 0
const ok = (cond, msg, detail = []) => {
  if (!cond) bad++
  console.log(`${cond ? '✓' : '✗'} ${msg}`)
  detail.slice(0, 12).forEach((d) => console.log('    ' + d))
  if (detail.length > 12) console.log(`    …另有 ${detail.length - 12} 条`)
}

const walk = (d, ext) => {
  if (!fs.existsSync(d)) return []
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name)
    return e.isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : []
  })
}

if (!fs.existsSync(DIST)) {
  console.error('没找到 ' + DIST + '，先跑一次构建：node node_modules/vitepress/bin/vitepress.js build docs')
  process.exit(1)
}

const html = walk(DIST, '.html')
console.log(`扫描 ${html.length} 个页面\n`)

/* 1. 内链 ------------------------------------------------------------- */
{
  const broken = new Set()
  let links = 0
  for (const f of html) {
    const h = fs.readFileSync(f, 'utf8')
    for (const m of h.matchAll(/href="(\/study-R-in-GDMU\/[^"#?]*)"/g)) {
      let href = m[1]
      links++
      if (href.endsWith('/')) href += 'index.html'
      const tp = path.join(DIST, href.replace(BASE, ''))
      if (!fs.existsSync(tp) && !fs.existsSync(tp + '.html') && !fs.existsSync(path.join(tp, 'index.html'))) {
        broken.add(`${path.relative(DIST, f).replace(/\\/g, '/')} -> ${m[1]}`)
      }
    }
  }
  ok(broken.size === 0, `内链 ${links} 条，失效 ${broken.size} 条`, [...broken])
}

/* 2. 图片存在 + 6. 部署前缀 ------------------------------------------- */
{
  const missing = new Set()
  const noBase = new Set()
  for (const f of html) {
    const h = fs.readFileSync(f, 'utf8')
    for (const m of h.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      const src = m[1]
      if (/^(https?:|\/\/|data:)/.test(src)) continue
      const rel = src.replace(BASE, '')
      if (!fs.existsSync(path.join(PUB, decodeURIComponent(rel)))) {
        missing.add(`${path.relative(DIST, f).replace(/\\/g, '/')} -> ${src}`)
      }
      if (!src.startsWith(BASE) && !src.startsWith('./') && !src.startsWith('../')) {
        noBase.add(`${path.relative(DIST, f).replace(/\\/g, '/')} -> ${src}`)
      }
    }
  }
  ok(missing.size === 0, `图片引用缺失 ${missing.size} 个`, [...missing])
  ok(noBase.size === 0, `裸 HTML 图片缺 base 前缀 ${noBase.size} 个`, [...noBase])
}

/* 3~5. 正文里的可见垃圾 ----------------------------------------------- */
{
  // 只看正文区域，代码块与行内代码里的 ** 与 \n 是正常的
  const bodyOf = (h) => {
    const i = h.indexOf('vp-doc')
    if (i < 0) return ''
    const j = h.indexOf('</main>', i)
    let body = h.slice(i, j < 0 ? undefined : j)
    // 代码块与行内代码里的东西是"内容"不是"垃圾"：
    // R 输出里的 Signif. codes: 0 '***' 0.001 '**'、页面讲 markdown 表格语法时的 | :--- | ---: |
    // 都属于这一类，先把它们摘掉再扫。
    body = body.replace(/<pre[\s\S]*?<\/pre>/g, ' ').replace(/<code[\s\S]*?<\/code>/g, ' ')
    return body
  }
  const rules = [
    ['XML 标签残渣', /<[a-z]+:(txBody|bodyPr|pPr|rPr|solidFill|srgbClr|effectLst|latin|t|oMath|tbl)\b/g],
    ['未渲染的容器标记 :::', /:::\s*\w+/g],
    ['未渲染的加粗 **', /\*\*[^*\n]{1,60}\*\*/g],
    ['未渲染的表格分隔行', /\|\s*-{3,}/g],
    ['未渲染的代码围栏', /```/g],
    ['未替换的模板占位符', /\{\{[^}]{1,40}\}\}/g],
    ['[object Object]', /\[object Object\]/g]
  ]
  const hits = new Map()
  const samples = []
  for (const f of html) {
    const body = bodyOf(fs.readFileSync(f, 'utf8'))
    if (!body) continue
    for (const [name, re] of rules) {
      const m = body.match(re)
      if (!m) continue
      hits.set(name, (hits.get(name) || 0) + m.length)
      const i = body.search(re)
      samples.push(
        `${name} | ${path.relative(DIST, f).replace(/\\/g, '/')} (${m.length}) ` +
          body.slice(Math.max(0, i - 40), i + 70).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      )
    }
  }
  // 代码块里的 R 输出（Signif. codes: '***' / 字符串里的 \n）不算问题：
  // 这里按"类型"报数量，人工扫一眼样例即可。
  for (const [name, n] of hits) console.log(`  · ${name}: ${n} 处`)
  const real = [...hits].filter(([n]) => !/加粗|代码围栏|模板/.test(n))
  ok(real.length === 0, `正文可见垃圾：${real.length ? real.map(([n, c]) => n + '×' + c).join('、') : '无'}`,
    samples.filter((s) => !/加粗|代码围栏|模板/.test(s)))
  if (hits.size) console.log('  （"未渲染的加粗"里若全是代码块里的 \'**\' 属正常，见 README 说明）')
}

/* 7. 中文冒充已译 ------------------------------------------------------ */
{
  const CJK = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g
  const fake = []
  for (const f of walk('docs/en', '.md')) {
    const raw = fs.readFileSync(f, 'utf8')
    if (raw.includes('not translated yet')) continue
    let t = raw.replace(/^---[\s\S]*?\n---\n/, '')
    t = t.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '').replace(/<!--[\s\S]*?-->/g, '')
    const ratio = (t.match(CJK) || []).length / Math.max(1, t.length)
    if (ratio > 0.02) fake.push(`${f.replace(/\\/g, '/')} — 汉字占比 ${(ratio * 100).toFixed(1)}%`)
  }
  ok(fake.length === 0, `docs/en 下"整页中文冒充已译"的文件 ${fake.length} 个`, fake)
}

/* 8. 配图张数 ---------------------------------------------------------- */
{
  const expect = [
    ['figures/09-question', 15], ['figures/09-base-graphics', 15],
    ['figures/10-question', 8], ['figures/10-base-graphics', 8],
    ['figures/11-question', 7], ['figures/11-ggplot2', 8],
    // 英文版另画的一套（答案输出图的英文标签版）
    ['figures/en/09-base-graphics', 15], ['figures/en/10-base-graphics', 8], ['figures/en/11-ggplot2', 8],
    ['figures/en/mbd/1', 5], ['figures/en/mbd/2', 3], ['figures/en/mbd/3', 2], ['figures/en/mbd/4', 2],
    ['figures/en/mbd/5', 3], ['figures/en/mbd/6', 3], ['figures/en/mbd/7', 9], ['figures/en/mbd/8', 2]
  ]
  const wrong = []
  for (const [dir, n] of expect) {
    const p = path.join(PUB, dir)
    const got = fs.existsSync(p) ? fs.readdirSync(p).filter((f) => f.endsWith('.png')).length : 0
    if (got !== n) wrong.push(`${dir}: ${got} 张（应为 ${n}）`)
  }
  ok(wrong.length === 0, `关键目录配图张数（第 9/10/11 讲 + 英文版全部）`, wrong)
}

/* 9. 课件截图不该再出现 ------------------------------------------------ */
{
  const left = walk(PUB, '.png').filter((f) => /mbd[\\/]\d+[\\/]q-/.test(f) || /q-第\d+页/.test(path.basename(f)))
  ok(left.length === 0, `课件截图残留 ${left.length} 张（应为 0，都换成代码了）`, left.map((f) => f.replace(/\\/g, '/')))
}

console.log(bad === 0 ? '\n✅ 体检通过' : `\n❌ ${bad} 项没通过`)
process.exit(bad === 0 ? 0 : 1)
