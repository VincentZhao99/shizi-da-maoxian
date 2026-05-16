import { Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import {
  getStrokeData,
  prepareStrokeData,
  drawStrokes,
  nextCanvasId,
  type PreparedStrokeData
} from '../utils/strokeData'

export function StrokeAnimation({
  hanzi,
  canvasSize = 180
}: {
  hanzi: string
  canvasSize?: number
}) {
  const [prepared, setPrepared] = useState<PreparedStrokeData | null>(null)
  const [hasError, setHasError] = useState(false)
  const canvasId = useRef(nextCanvasId()).current
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false
    setPrepared(null)
    setHasError(false)

    async function load() {
      const data = await getStrokeData(hanzi)
      if (cancelledRef.current) return
      if (!data) { setHasError(true); return }
      const p = prepareStrokeData(data, canvasSize)
      if (cancelledRef.current) return
      setPrepared(p)
    }
    load()

    return () => {
      cancelledRef.current = true
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
    }
  }, [hanzi, canvasSize])

  useEffect(() => {
    if (!prepared) return

    const strokes = prepared.strokes
    let step = 0
    const STROKE_DELAY = 420
    const INITIAL_DELAY = 700
    const END_PAUSE = 1500

    function animate() {
      if (cancelledRef.current) return
      const ctx = Taro.createCanvasContext(canvasId)

      if (step === 0) {
        // gray outline only
        drawStrokes(ctx, prepared!, canvasSize, -1)
        ctx.draw()
        step++
        timerRef.current = setTimeout(animate, INITIAL_DELAY)
      } else if (step <= strokes.length) {
        // strokes 0..step-1 in red over gray
        drawStrokes(ctx, prepared!, canvasSize, step - 1)
        ctx.draw()
        step++
        timerRef.current = setTimeout(animate, STROKE_DELAY)
      } else {
        // all strokes done, pause then loop
        step = 0
        timerRef.current = setTimeout(animate, END_PAUSE)
      }
    }

    timerRef.current = setTimeout(animate, 200)

    return () => {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
    }
  }, [prepared, canvasId, canvasSize])

  if (hasError) return null

  return (
    <Canvas
      canvasId={canvasId}
      style={{ width: canvasSize, height: canvasSize }}
    />
  )
}
