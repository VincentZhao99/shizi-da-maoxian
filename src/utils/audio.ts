import Taro from '@tarojs/taro'

let audioCtx: Taro.InnerAudioContext | null = null
let playing = false
let listeners: Array<(v: boolean) => void> = []
let fallbackQueue: string[] = []

const YOUDAO = 'https://dict.youdao.com/dictvoice?le=zh&audio='
const BAIDU = 'https://fanyi.baidu.com/gettts?lan=zh&spd=3&text='

function setPlaying(v: boolean) {
  playing = v
  listeners.forEach((fn) => fn(v))
}

function destroyCtx() {
  if (audioCtx) {
    audioCtx.destroy()
    audioCtx = null
  }
}

function playUrl(url: string, onError?: () => void) {
  audioCtx = Taro.createInnerAudioContext()
  audioCtx.src = url
  audioCtx.autoplay = true
  audioCtx.onPlay(() => setPlaying(true))
  audioCtx.onEnded(() => {
    destroyCtx()
    setPlaying(false)
  })
  audioCtx.onStop(() => {
    destroyCtx()
    setPlaying(false)
  })
  audioCtx.onError(() => {
    destroyCtx()
    onError?.()
  })
}

function startFallback(text: string) {
  const cleaned = text.replace(/[，。！？、；：""''（）\s,.!?;:'"()]/g, '')
  fallbackQueue = cleaned.split('')
  setPlaying(true)
  playNextFallback()
}

function playNextFallback() {
  if (fallbackQueue.length === 0) {
    setPlaying(false)
    return
  }
  const ch = fallbackQueue.shift()!
  playUrl(YOUDAO + encodeURIComponent(ch), () => playNextFallback())
}

export function speak(text: string): void {
  if (!text) return
  stop()

  if (text.length <= 2) {
    playUrl(YOUDAO + encodeURIComponent(text))
    return
  }

  playUrl(BAIDU + encodeURIComponent(text), () => {
    startFallback(text)
  })
}

export function stop() {
  fallbackQueue = []
  if (audioCtx) {
    audioCtx.stop()
  }
  destroyCtx()
  setPlaying(false)
}

export function isPlaying() {
  return playing
}

export function onPlayStateChange(fn: (v: boolean) => void) {
  listeners.push(fn)
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}
