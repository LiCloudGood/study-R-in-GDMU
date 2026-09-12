#!/usr/bin/env node
/**
 * 把「原题」里的 .docx 转成方便整理成网页的文本。
 *
 * 用法：
 *   node scripts/extract-docx.mjs "原题/第三周原题/数组与数据框.docx"
 *
 * 它会做三件事：
 *   1. 打印正文（每段一行）；
 *   2. 把文档里的 MathType 公式替换成 [[公式N:media/imageN.wmf]] 占位符，
 *      这样一眼就能看出「这里有张公式图」，而不会像直接复制那样丢失；
 *   3. 解码每个公式图里画了哪些字符，按行输出，
 *      矩阵、分式这类二维结构就能照着还原成 LaTeX。
 *
 * 说明：公式在原 Word 文件里是 MathType(OLE) 对象，文字提取必然拿不到内容，
 * 所以只能从它的 WMF 预览图里「读」回来。脚本用 zlib 自己解压 docx，
 * 不依赖任何第三方包。
 */
import fs from 'node:fs'
import zlib from 'node:zlib'

/* ------------------------------------------------------------------ */
/* 极简 ZIP 读取（docx 本质就是一个 zip）                                */
/* ------------------------------------------------------------------ */

function readZip(buf) {
  // 从末尾找 End Of Central Directory
  let eocd = -1
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66000; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i
      break
    }
  }
  if (eocd < 0) throw new Error('不是有效的 zip/docx 文件')

  const count = buf.readUInt16LE(eocd + 10)
  let p = buf.readUInt32LE(eocd + 16)
  const files = new Map()

  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break
    const method = buf.readUInt16LE(p + 10)
    const compressedSize = buf.readUInt32LE(p + 20)
    const nameLen = buf.readUInt16LE(p + 28)
    const extraLen = buf.readUInt16LE(p + 30)
    const commentLen = buf.readUInt16LE(p + 32)
    const localOffset = buf.readUInt32LE(p + 42)
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen)

    // 真正读取数据要去 local header 再看一次文件名长度
    const lNameLen = buf.readUInt16LE(localOffset + 26)
    const lExtraLen = buf.readUInt16LE(localOffset + 28)
    const dataStart = localOffset + 30 + lNameLen + lExtraLen
    const raw = buf.subarray(dataStart, dataStart + compressedSize)
    files.set(name, method === 0 ? raw : zlib.inflateRawSync(raw))

    p += 46 + nameLen + extraLen + commentLen
  }
  return files
}

/* ------------------------------------------------------------------ */
/* WMF 里读文字                                                         */
/* ------------------------------------------------------------------ */

/** 解析 WMF 的 META_EXTTEXTOUT / META_TEXTOUT，取出画了哪些字符 */
function wmfTextRuns(buf) {
  let off = buf.length >= 4 && buf.readUInt32LE(0) === 0x9ac6cdd7 ? 22 : 0
  off += buf.readUInt16LE(off + 2) * 2 // METAHEADER 的 HeaderSize 在第 2 个 word

  const runs = []
  while (off + 6 <= buf.length) {
    const sizeWords = buf.readUInt32LE(off)
    if (sizeWords === 0) break
    const func = buf.readUInt16LE(off + 4)
    const recEnd = off + sizeWords * 2

    try {
      if (func === 0x0a32) {
        const y = buf.readInt16LE(off + 6)
        const x = buf.readInt16LE(off + 8)
        const n = buf.readInt16LE(off + 10)
        const options = buf.readUInt16LE(off + 12)
        const start = off + 14 + (options & 0x0006 ? 8 : 0)
        if (n > 0 && start + n <= buf.length) {
          runs.push({ x, y, text: buf.subarray(start, start + n).toString('latin1') })
        }
      } else if (func === 0x0521) {
        const n = buf.readInt16LE(off + 6)
        if (n > 0) {
          const text = buf.subarray(off + 8, off + 8 + n).toString('latin1')
          const pad = n % 2
          runs.push({
            y: buf.readInt16LE(off + 8 + n + pad),
            x: buf.readInt16LE(off + 10 + n + pad),
            text
          })
        }
      }
    } catch {
      /* 记录畸形就跳过 */
    }

    if (recEnd <= off) break
    off = recEnd
  }
  return runs
}

/** 把 WMF 的文字按 y 分行输出，便于还原矩阵之类的二维结构 */
function describeWmf(buf) {
  const runs = wmfTextRuns(buf)
  if (!runs.length) return ['(这个公式图里没有可读文字，可能整个公式都是矢量轮廓)']
  const rows = new Map()
  for (const r of runs) {
    if (!rows.has(r.y)) rows.set(r.y, [])
    rows.get(r.y).push(r)
  }
  return [...rows.keys()]
    .sort((a, b) => a - b)
    .map((y) => {
      const cells = rows
        .get(y)
        .sort((a, b) => a.x - b.x)
        .map((r) => JSON.stringify(r.text))
        .join('  ')
      return `y=${y}  ${cells}`
    })
}

/* ------------------------------------------------------------------ */
/* 主流程                                                              */
/* ------------------------------------------------------------------ */

const docxPath = process.argv[2]
if (!docxPath) {
  console.error('用法: node scripts/extract-docx.mjs <文件.docx>')
  process.exit(1)
}

const zip = readZip(fs.readFileSync(docxPath))
const documentXml = zip.get('word/document.xml').toString('utf8')
const relsXml = zip.get('word/_rels/document.xml.rels').toString('utf8')

// rId -> media/imageN.wmf
const relMap = {}
for (const m of relsXml.matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)) relMap[m[1]] = m[2]

const usedEquations = []
const withPlaceholders = documentXml.replace(/<w:object[^>]*>[\s\S]*?<\/w:object>/g, (block) => {
  const rid = (block.match(/r:id="([^"]+)"/) || [])[1]
  const target = relMap[rid] || rid
  usedEquations.push(target)
  return `[[公式${usedEquations.length}:${target}]]`
})

const text = withPlaceholders
  .replace(/<\/w:p>/g, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')

console.log(`########## 正文：${docxPath} ##########`)
console.log(text.split('\n').filter((l) => l.trim()).join('\n'))

if (usedEquations.length) {
  console.log('\n########## 公式图解码 ##########')
  for (let i = 0; i < usedEquations.length; i++) {
    const target = usedEquations[i]
    const entry = [...zip.keys()].find((k) => k.endsWith(target.replace(/^media\//, 'media/')))
    console.log(`\n--- 公式${i + 1}  (${target}) ---`)
    if (!entry) {
      console.log('  找不到对应的图片文件')
      continue
    }
    for (const line of describeWmf(zip.get(entry))) console.log('  ' + line)
  }
}
