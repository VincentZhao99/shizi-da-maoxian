import Taro from '@tarojs/taro'
import type { ChineseHanziItem, MathPhraseItem } from '../data/lexicons/types'

export type WrongWord =
  | { category: 'chinese'; item: ChineseHanziItem }
  | { category: 'math'; item: MathPhraseItem }

export function getWrongWordsKey() {
  return 'wrongWords'
}

export function loadWrongWords(): WrongWord[] {
  try {
    const raw = Taro.getStorageSync(getWrongWordsKey())
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

function saveWrongWords(words: WrongWord[]) {
  Taro.setStorageSync(getWrongWordsKey(), JSON.stringify(words))
}

export function addWrongWord(
  category: WrongWord['category'],
  item: ChineseHanziItem | MathPhraseItem
) {
  const words = loadWrongWords()
  const dup = words.find((w) => {
    if (w.category !== category) return false
    if (category === 'chinese') {
      return (w.item as ChineseHanziItem).hanzi === (item as ChineseHanziItem).hanzi
    }
    return (w.item as MathPhraseItem).phrase === (item as MathPhraseItem).phrase
  })
  if (!dup) {
    words.push({ category, item } as WrongWord)
    saveWrongWords(words)
  }
}

export function removeWrongWord(
  category: WrongWord['category'],
  item: ChineseHanziItem | MathPhraseItem
) {
  const words = loadWrongWords().filter((w) => {
    if (w.category !== category) return true
    if (category === 'chinese') {
      return (w.item as ChineseHanziItem).hanzi !== (item as ChineseHanziItem).hanzi
    }
    return (w.item as MathPhraseItem).phrase !== (item as MathPhraseItem).phrase
  })
  saveWrongWords(words)
}
