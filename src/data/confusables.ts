import { chineseLevels } from './lexicons'

const VISUAL_GROUPS: string[][] = [
  ['大', '太', '天'],
  ['目', '日', '口'],
  ['牛', '午', '年'],
  ['千', '十'],
  ['白', '百'],
  ['四', '西'],
  ['小', '少'],
  ['手', '毛'],
  ['鸟', '马'],
  ['水', '冰'],
  ['问', '间', '门'],
  ['外', '处'],
  ['草', '花'],
  ['狗', '猫', '猪'],
  ['吃', '喝'],
  ['跑', '跳', '走'],
  ['河', '湖', '海'],
  ['红', '绿'],
  ['人', '八'],
  ['土', '尘'],
  ['木', '林'],
  ['快', '慢'],
  ['坐', '站'],
  ['桌', '椅'],
  ['盘', '碗'],
  ['前', '南'],
  ['里', '黑'],
  ['笔', '画'],
  ['灯', '火'],
  ['指', '手'],
  ['高', '长'],
  ['新', '旧'],
  ['雷', '雪'],
  ['叶', '花'],
  ['鱼', '龟'],
  ['风', '凤'],
  ['雨', '两'],
  ['姐', '妹'],
  ['哥', '弟'],
  ['东', '车'],
  ['金', '全'],
  ['钟', '灯'],
  ['床', '桌'],
  ['进', '近'],
]

function toneToBase(py: string): string {
  const map: Record<string, string> = {
    ā: 'a', á: 'a', ǎ: 'a', à: 'a',
    ē: 'e', é: 'e', ě: 'e', è: 'e',
    ī: 'i', í: 'i', ǐ: 'i', ì: 'i',
    ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
    ū: 'u', ú: 'u', ǔ: 'u', ù: 'u',
    ǖ: 'v', ǘ: 'v', ǚ: 'v', ǜ: 'v',
  }
  return py.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, (c) => map[c] || c)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]; a[i] = a[j]; a[j] = t
  }
  return a
}

const ALL_CHARS: string[] = []
const PINYIN_GROUPS = new Map<string, string[]>()
const VISUAL_MAP = new Map<string, string[]>()

function init() {
  if (ALL_CHARS.length > 0) return

  const charSet = new Set<string>()
  for (const level of chineseLevels) {
    for (const item of level.items) {
      charSet.add(item.hanzi)
      const base = toneToBase(item.pinyin)
      const group = PINYIN_GROUPS.get(base) || []
      group.push(item.hanzi)
      PINYIN_GROUPS.set(base, group)
    }
  }
  for (const ch of charSet) ALL_CHARS.push(ch)

  for (const group of VISUAL_GROUPS) {
    const valid = group.filter((ch) => charSet.has(ch))
    if (valid.length < 2) continue
    for (const ch of valid) {
      const others = valid.filter((c) => c !== ch)
      const existing = VISUAL_MAP.get(ch) || []
      VISUAL_MAP.set(ch, [...new Set([...existing, ...others])])
    }
  }
}

export function getDistractors(hanzi: string, pinyin: string, count: number): string[] {
  init()

  const candidates: string[] = []

  // Priority 1: visual similars (形近字)
  const visuals = VISUAL_MAP.get(hanzi) || []
  candidates.push(...shuffle(visuals).slice(0, count))

  // Priority 2: phonetic similars (音近字)
  if (candidates.length < count) {
    const base = toneToBase(pinyin)
    const phonetics = (PINYIN_GROUPS.get(base) || []).filter(
      (c) => c !== hanzi && !candidates.includes(c)
    )
    candidates.push(...shuffle(phonetics).slice(0, count - candidates.length))
  }

  // Priority 3: random fill from global character pool
  if (candidates.length < count) {
    const remaining = ALL_CHARS.filter(
      (c) => c !== hanzi && !candidates.includes(c)
    )
    candidates.push(...shuffle(remaining).slice(0, count - candidates.length))
  }

  return shuffle(candidates).slice(0, count)
}
