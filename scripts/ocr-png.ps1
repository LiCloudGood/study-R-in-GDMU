<#
.SYNOPSIS
  用 Windows 自带的 OCR 引擎（Windows.Media.Ocr）把 PNG 截图里的文字转成文本。

.DESCRIPTION
  本站有一部分图是从教师课件里抽出来的整屏截图（1920×1080 的 q-*.png）。
  换代码、核对数据时经常需要知道"这张图里到底写了什么"，而人和代理都没法直接看图。
  Windows 10/11 自带 OCR，中英文都能识别，不必装 tesseract。

  做法：先把图按 Scale 倍放大（放大能显著提高小字号识别率），再交给 OCR 引擎，
  按行输出。可以用 X0/Y0/X1/Y1 只截取图片的一部分（0~1 的比例），
  用来放大看某一块区域里的数字。

.PARAMETER Dir
  要处理的目录（处理该目录下所有 .png，按文件名排序）。

.PARAMETER OutFile
  输出文本文件（UTF-8 无 BOM）。每个文件一段，用 ==== 文件名 ==== 分隔。

.PARAMETER Scale
  放大倍数，默认 4。识别不清时可以调到 6~8。

.PARAMETER X0 / Y0 / X1 / Y1
  只截取图片的这块区域（0~1 的比例），默认整张图。

.EXAMPLE
  # 把第 7 周的全部截图转成文本
  powershell -NoProfile -File scripts\ocr-png.ps1 -Dir docs\public\figures\mbd\7 -OutFile _dev\mbd7-ocr.txt

.EXAMPLE
  # 只看某张图右下角那一块（表格区域）并放大 8 倍
  powershell -NoProfile -File scripts\ocr-png.ps1 -Dir _dev\crop -OutFile _dev\crop-ocr.txt -Scale 8 -X0 0.2 -Y0 0.4 -X1 1.0 -Y1 1.0

.NOTES
  Windows PowerShell 5.1 与 PowerShell 7 都可以跑（本机只有 5.1，用 powershell 调）。
  OCR 结果**不是逐字可信**的：数字 0/O、1/l、乘号与字母 x 等容易混，小数点可能丢。
  所以它只用来"看清图里有什么"，最后写进页面的数字仍必须与答案脚本 / 数据文件核对。
  本文件带 UTF-8 BOM：PowerShell 5.1 会把没有 BOM 的 .ps1 按 GBK 解析，
  中文注释会直接报 ParseError、脚本跑不起来，改动时别把 BOM 弄丢。
  认 R 代码时记得加 -Lang en-GB（默认中文语言包会把 RStudio 认成 RStudi0）。
#>
param(
  [Parameter(Mandatory = $true)][string]$Dir,
  [Parameter(Mandatory = $true)][string]$OutFile,
  [double]$Scale = 4.0,
  [double]$X0 = 0.0,
  [double]$Y0 = 0.0,
  [double]$X1 = 1.0,
  [double]$Y1 = 1.0,
  # 识别语言，默认跟随系统（中文系统是 zh-Hans-CN）。
  # 认 R 代码时中文语言包很差（RStudio 会认成 RStudi0、file 认成 flle），
  # 指定 en-GB / en-US 明显更准。
  [string]$Lang = ''
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null
Add-Type -AssemblyName System.Drawing | Out-Null

# WinRT 的异步调用要转成 .NET Task 才能同步等待
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
  })[0]

function Await($WinRtTask, $ResultType) {
  $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
  $netTask = $asTask.Invoke($null, @($WinRtTask))
  $netTask.Wait(-1) | Out-Null
  $netTask.Result
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null

if ($Lang) {
  $langObj = New-Object Windows.Globalization.Language $Lang
  $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($langObj)
  if (-not $engine) { throw ("系统里没有 " + $Lang + " 的 OCR 语言包。可用语言：" + (([Windows.Media.Ocr.OcrEngine]::AvailableRecognizerLanguages | ForEach-Object { $_.LanguageTag }) -join ', ')) }
}
else {
  $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
  if (-not $engine) { throw '系统没有可用的 OCR 语言包（Windows.Media.Ocr 返回 null）。' }
}
Write-Output ("OCR 语言: " + $engine.RecognizerLanguage.LanguageTag)

$lines = New-Object System.Collections.Generic.List[string]
$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("ocr_" + [guid]::NewGuid().ToString("N") + ".png")

foreach ($f in (Get-ChildItem -Path $Dir -Filter *.png | Sort-Object Name)) {
  $lines.Add('')
  $lines.Add('================ ' + $f.Name + ' ================')
  try {
    $src = [System.Drawing.Image]::FromFile($f.FullName)
    $cx = [int]($src.Width * $X0); $cy = [int]($src.Height * $Y0)
    $cw = [int]($src.Width * ($X1 - $X0)); $ch = [int]($src.Height * ($Y1 - $Y0))
    $rect = New-Object System.Drawing.Rectangle $cx, $cy, $cw, $ch
    $bmp = New-Object System.Drawing.Bitmap ([int]($cw * $Scale)), ([int]($ch * $Scale))
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $bmp.Width, $bmp.Height), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose(); $src.Dispose()

    $sf = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($tmp)) ([Windows.Storage.StorageFile])
    $stream = Await ($sf.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $res = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    foreach ($ln in $res.Lines) { $lines.Add($ln.Text) }
    $stream.Dispose()
  }
  catch {
    $lines.Add('!! OCR ERROR: ' + $_.Exception.Message)
  }
}
if (Test-Path $tmp) { Remove-Item $tmp -Force }

[System.IO.File]::WriteAllLines((Join-Path (Get-Location) $OutFile), $lines, (New-Object System.Text.UTF8Encoding($false)))
Write-Output ('wrote ' + $OutFile + ' (' + $lines.Count + ' lines)')
