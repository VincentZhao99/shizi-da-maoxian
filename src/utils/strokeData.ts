import Taro from '@tarojs/taro'

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0'
const CACHE_PREFIX = 'stroke_data_'

export interface StrokeData {
  strokes: string[]
  medians: number[][][]
}

export type PathCommand =
  | { type: 'M'; x: number; y: number }
  | { type: 'L'; x: number; y: number }
  | { type: 'Q'; cx: number; cy: number; x: number; y: number }
  | { type: 'C'; cx1: number; cy1: number; cx2: number; cy2: number; x: number; y: number }
  | { type: 'Z' }

export async function getStrokeData(hanzi: string): Promise<StrokeData | null> {
  try {
    const cached = Taro.getStorageSync(CACHE_PREFIX + hanzi)
    if (cached) return JSON.parse(cached) as StrokeData
  } catch { /* not cached */ }

  try {
    const res = await Taro.request({
      url: `${CDN_BASE}/${encodeURIComponent(hanzi)}.json`,
      method: 'GET'
    })
    if (res.statusCode === 200 && res.data) {
      const data = res.data as StrokeData
      try {
        Taro.setStorageSync(CACHE_PREFIX + hanzi, JSON.stringify(data))
      } catch { /* storage full */ }
      return data
    }
  } catch (e) {
    console.warn('Failed to fetch stroke data for:', hanzi, e)
  }
  return null
}

const SVG_SIZE = 1024

function parseSvgPath(path: string): PathCommand[] {
  const commands: PathCommand[] = []
  const trimmed = path.trim()
  let i = 0

  while (i < trimmed.length) {
    const cmd = trimmed[i]
    i++
    while (i < trimmed.length && trimmed[i] === ' ') i++

    if (cmd === 'Z' || cmd === 'z') {
      commands.push({ type: 'Z' })
      continue
    }

    const numStr: string[] = []
    while (i < trimmed.length && !'MQLCZmlqcz'.includes(trimmed[i])) {
      numStr.push(trimmed[i])
      i++
    }
    const nums = numStr.join('').trim().split(/\s+/).map(Number)

    switch (cmd) {
      case 'M':
        for (let j = 0; j < nums.length; j += 2) {
          commands.push({ type: 'M', x: nums[j], y: nums[j + 1] })
        }
        break
      case 'L':
        for (let j = 0; j < nums.length; j += 2) {
          commands.push({ type: 'L', x: nums[j], y: nums[j + 1] })
        }
        break
      case 'Q':
        for (let j = 0; j < nums.length; j += 4) {
          commands.push({ type: 'Q', cx: nums[j], cy: nums[j + 1], x: nums[j + 2], y: nums[j + 3] })
        }
        break
      case 'C':
        for (let j = 0; j < nums.length; j += 6) {
          commands.push({ type: 'C', cx1: nums[j], cy1: nums[j + 1], cx2: nums[j + 2], cy2: nums[j + 3], x: nums[j + 4], y: nums[j + 5] })
        }
        break
    }
  }
  return commands
}

/** hanzi-writer-data uses Y-up coordinates; flip to Canvas Y-down */
function flipStrokesY(strokes: PathCommand[][]): PathCommand[][] {
  return strokes.map(stroke =>
    stroke.map((cmd) => {
      const c = { ...cmd } as any
      if ('y' in c) c.y = SVG_SIZE - c.y
      if ('cy' in c) c.cy = SVG_SIZE - c.cy
      if ('cy1' in c) { c.cy1 = SVG_SIZE - c.cy1; c.cy2 = SVG_SIZE - c.cy2 }
      return c
    })
  )
}

export interface BBox {
  minX: number; minY: number; maxX: number; maxY: number
}

function computeBbox(allStrokes: PathCommand[][]): BBox {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const stroke of allStrokes) {
    for (const cmd of stroke) {
      if ('x' in cmd) {
        minX = Math.min(minX, (cmd as any).x)
        maxX = Math.max(maxX, (cmd as any).x)
        minY = Math.min(minY, (cmd as any).y)
        maxY = Math.max(maxY, (cmd as any).y)
      }
    }
  }
  if (!isFinite(minX)) return { minX: 0, minY: 0, maxX: 1024, maxY: 1024 }
  return { minX, minY, maxX, maxY }
}

function transformStroke(
  commands: PathCommand[],
  bbox: BBox,
  canvasSize: number,
  padding: number
): PathCommand[] {
  const charW = bbox.maxX - bbox.minX || 1
  const charH = bbox.maxY - bbox.minY || 1
  const scale = (canvasSize - padding * 2) / Math.max(charW, charH)
  const offsetX = (canvasSize - charW * scale) / 2 - bbox.minX * scale
  const offsetY = (canvasSize - charH * scale) / 2 - bbox.minY * scale

  return commands.map((cmd) => {
    const c = { ...cmd } as any
    if ('x' in c) { c.x = c.x * scale + offsetX; c.y = c.y * scale + offsetY }
    if ('cx' in c) { c.cx = c.cx * scale + offsetX; c.cy = c.cy * scale + offsetY }
    if ('cx1' in c) { c.cx1 = c.cx1 * scale + offsetX; c.cy1 = c.cy1 * scale + offsetY; c.cx2 = c.cx2 * scale + offsetX; c.cy2 = c.cy2 * scale + offsetY }
    return c
  })
}

function drawPath(ctx: any, commands: PathCommand[]) {
  for (const cmd of commands) {
    switch (cmd.type) {
      case 'M': ctx.moveTo(cmd.x, cmd.y); break
      case 'L': ctx.lineTo(cmd.x, cmd.y); break
      case 'Q': ctx.quadraticCurveTo(cmd.cx, cmd.cy, cmd.x, cmd.y); break
      case 'C': ctx.bezierCurveTo(cmd.cx1, cmd.cy1, cmd.cx2, cmd.cy2, cmd.x, cmd.y); break
      case 'Z': ctx.closePath(); break
    }
  }
}

export interface PreparedStrokeData {
  strokes: PathCommand[][]
}

let idCounter = 0

export function prepareStrokeData(data: StrokeData, canvasSize: number): PreparedStrokeData {
  const allStrokes = data.strokes.map(parseSvgPath)
  const flipped = flipStrokesY(allStrokes)
  const bbox = computeBbox(flipped)
  const padding = canvasSize * 0.12
  const transformed = flipped.map(s => transformStroke(s, bbox, canvasSize, padding))
  return { strokes: transformed }
}

export function drawTianZiGe(ctx: any, canvasSize: number) {
  const mid = canvasSize / 2
  const dashLen = 6

  // Outer square
  ctx.setStrokeStyle('#D0D0D0')
  ctx.setLineWidth(1)
  ctx.beginPath()
  ctx.rect(0, 0, canvasSize, canvasSize)
  ctx.stroke()

  // Dashed horizontal midline
  ctx.beginPath()
  for (let x = 0; x < canvasSize; x += dashLen * 2) {
    ctx.moveTo(x, mid); ctx.lineTo(Math.min(x + dashLen, canvasSize), mid)
  }
  ctx.stroke()

  // Dashed vertical midline
  ctx.beginPath()
  for (let y = 0; y < canvasSize; y += dashLen * 2) {
    ctx.moveTo(mid, y); ctx.lineTo(mid, Math.min(y + dashLen, canvasSize))
  }
  ctx.stroke()
}

export function drawStrokes(
  ctx: any,
  prepared: PreparedStrokeData,
  canvasSize: number,
  currentStrokeIndex: number
) {
  ctx.clearRect(0, 0, canvasSize, canvasSize)
  drawTianZiGe(ctx, canvasSize)

  // Full character ghost in light gray (filled)
  ctx.setFillStyle('#E8E8E8')
  for (const stroke of prepared.strokes) {
    ctx.beginPath()
    drawPath(ctx, stroke)
    ctx.fill()
  }

  // Animated strokes in red (solid fill 描红)
  if (currentStrokeIndex >= 0) {
    ctx.setFillStyle('#E53935')
    ctx.setStrokeStyle('#C62828')
    ctx.setLineWidth(0.5)
    for (let i = 0; i <= currentStrokeIndex && i < prepared.strokes.length; i++) {
      ctx.beginPath()
      drawPath(ctx, prepared.strokes[i])
      ctx.fill()
      ctx.stroke()
    }
  }
}

export function nextCanvasId(): string {
  return 'stroke-canvas-' + (++idCounter)
}
