import { pinyin, customPinyin } from 'pinyin-pro'

// 纠正 pinyin-pro 对多音字的误判。关键词最长匹配优先。
customPinyin({
  // 数 shǔ (动词) — pinyin-pro 默认返回 shù
  我数: 'wǒ shǔ',
  左数: 'zuǒ shǔ',
  再数: 'zài shǔ',
  数到: 'shǔ dào',
  数数: 'shǔ shù',
  数一数: 'shǔ yī shǔ',
})

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
