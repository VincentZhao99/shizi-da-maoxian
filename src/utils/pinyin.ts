import { pinyin } from 'pinyin-pro'

export function getPinyin(text: string): string {
  return pinyin(text, { toneType: 'symbol' })
}

export type CharPinyin = { char: string; pinyin: string }

/**
 * Get the pinyin of a character in the context of a full sentence.
 * pinyin-pro uses the sentence to disambiguate polyphones (多音字).
 */
export function getPinyinInContext(sentence: string, char: string): string {
  if (!sentence || !char) return getPinyin(char)
  const chars = sentence.split('')
  const index = chars.findIndex((c) => c === char)
  if (index < 0) return getPinyin(char)
  const pinyins = pinyin(sentence, { toneType: 'symbol', type: 'array' })
  return pinyins[index] || getPinyin(char)
}

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
