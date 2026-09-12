/**
 * WebR（在浏览器里真实运行 R）的加载与执行封装。
 *
 * ⚠️ 重要：WebR 官方已经删掉了旧版的 `webR.io` 接口，所以
 * `webR.io.stdout.on('data', ...)` 这种老写法会抛
 * `Cannot read properties of undefined (reading 'stdout')`。
 *
 * 现行正确用法是 `Shelter.captureR()`：它一次性把标准输出、报错和图片都返回。
 * 文档：https://docs.r-wasm.org/webr/latest/evaluating.html
 */

/**
 * WebR 的官方 CDN 入口。
 * 不要再改回 `.../latest/webr.js`——那个旧入口已被官方下架，访问会返回 403。
 */
const WEBR_MODULE_URL = 'https://webr.r-wasm.org/latest/webr.mjs'

export interface RunResult {
  /** 标准输出 + 报错/警告文本 */
  text: string
  /** 代码里画的图（WebR 的画布设备捕获） */
  images: ImageBitmap[]
  /** 是否执行出错 */
  failed: boolean
}

let webRInstance: any = null
let loadingPromise: Promise<any> | null = null

/** WebR 是否已经加载完成 */
export function isWebRReady() {
  return webRInstance !== null
}

/**
 * 加载并初始化 WebR（全局只初始化一次，多个组件共用同一个实例）。
 * 首次调用需要从 CDN 下载约 10 MB 的运行环境。
 */
export function getWebR(): Promise<any> {
  if (webRInstance) return Promise.resolve(webRInstance)
  if (!loadingPromise) {
    loadingPromise = (async () => {
      const { WebR } = await import(/* @vite-ignore */ WEBR_MODULE_URL)
      const webR = new WebR()
      await webR.init()
      // 指定图形设备，这样 plot() 画的图才能被 captureR 捕获到
      try {
        await webR.evalRVoid('options(device = webr::canvas)')
      } catch {
        /* 某些版本没有 webr 包，绘图功能降级，不影响运行代码 */
      }
      webRInstance = webR
      return webR
    })().catch((e) => {
      loadingPromise = null
      throw e
    })
  }
  return loadingPromise
}

/** 安装 R 包（已经装过的会跳过） */
const installed = new Set<string>()

export async function ensurePackages(packages: string[], onStatus?: (text: string) => void) {
  const pending = packages.filter((pkg) => !installed.has(pkg))
  if (!pending.length) return
  const webR = await getWebR()
  for (let i = 0; i < pending.length; i++) {
    const pkg = pending[i]
    onStatus?.(`正在安装 R 包 ${pkg}（${i + 1}/${pending.length}）…`)
    await webR.installPackages([pkg])
    installed.add(pkg)
  }
}

/**
 * 把数据文件写进 WebR 的虚拟文件系统。
 *
 * 讲义里很多实验要读 `scores.csv` 之类的文件，而浏览器里的 R 环境默认是空的，
 * 用这个函数先把数据准备好，示例代码就能原样跑通。
 */
const writtenFiles = new Set<string>()

export async function writeFiles(files: Record<string, string>) {
  const entries = Object.entries(files ?? {})
  if (!entries.length) return
  const webR = await getWebR()
  for (const [name, content] of entries) {
    // 不带路径的文件名写到 R 的默认工作目录，read.csv('xxx.csv') 就能直接读到
    const path = name.startsWith('/') ? name : `/home/web_user/${name}`
    if (writtenFiles.has(path)) continue
    await webR.FS.writeFile(path, content)
    writtenFiles.add(path)
  }
}

/**
 * 执行一段 R 代码，返回输出文本与图片。
 *
 * `withAutoprint` 让顶层表达式的值自动打印出来（和 R 控制台一样），
 * `captureStream` 让 print() 之类的内容被捕获而不是丢进浏览器控制台。
 */
export async function runR(code: string): Promise<RunResult> {
  const webR = await getWebR()

  // Shelter 负责统一回收这次执行产生的 R 对象
  const shelter = await new webR.Shelter()
  try {
    const capture = await shelter.captureR(code, {
      withAutoprint: true,
      captureStream: true
    })

    const chunks: string[] = []
    let failed = false
    for (const item of capture.output ?? []) {
      const text = typeof item.data === 'string' ? item.data : String(item.data)
      if (item.type === 'error') failed = true
      chunks.push(text)
    }

    return {
      text: chunks.join('').trim(),
      images: (capture.images ?? []) as ImageBitmap[],
      failed
    }
  } finally {
    await shelter.purge()
  }
}

/** 把捕获到的图片画到容器里 */
export function drawImages(container: HTMLElement, images: ImageBitmap[]) {
  container.innerHTML = ''
  for (const bitmap of images) {
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    canvas.className = 'webr-plot'
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0)
    container.appendChild(canvas)
  }
}

/** 把加载/运行时的异常翻译成对用户有用的提示 */
export function describeError(e: unknown): string {
  const detail = e instanceof Error ? e.message.trim() : String(e)
  if (/Failed to fetch|NetworkError|fetch/i.test(detail)) {
    return (
      `无法下载 WebR 运行环境：${detail}\n\n` +
      '可能的原因：\n' +
      '· 网络连接不稳定；\n' +
      '· 该运行环境托管在境外 CDN，必要时请开启代理后重试；\n' +
      '· 也可以直接复制上面的代码，在本机的 R / RStudio 里运行。'
    )
  }
  return `运行出错：${detail}`
}
