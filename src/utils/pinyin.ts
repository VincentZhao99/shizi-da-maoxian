import { pinyin } from 'pinyin-pro'

export function getPinyin(text: string): string {
  return pinyin(text, { toneType: 'symbol' })
}

export type CharPinyin = { char: string; pinyin: string }

export function annotateSentence(sentence: string): CharPinyin[] {
  if (!sentence) return []

  const segments = sentence.split(/(___)/g)

  return segments.flatMap((seg) => {
    if (seg === '___') {
      return [{ char: '___', pinyin: '' }]
    }
    const chars = seg.split('')
    const pinyins = pinyin(seg, { toneType: 'symbol', type: 'array' })
    return chars.map((ch, i) => ({ char: ch, pinyin: pinyins[i] || '' }))
  })
}
