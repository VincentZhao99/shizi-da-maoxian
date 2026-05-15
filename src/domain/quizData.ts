import { mathLevels } from '../data/lexicons'
import { getDistractors } from '../data/confusables'
import { toBlankSentence } from './quizSentence'
import type { ChineseHanziItem, MathPhraseItem } from '../data/lexicons/types'

export const MATH_CHAR_POOL: string[] = (() => {
  const seen = new Set<string>()
  for (const lvl of mathLevels) {
    for (const x of lvl.items) {
      for (const ch of (x as MathPhraseItem).phrase.split('')) {
        seen.add(ch)
      }
    }
  }
  return [...seen]
})()

export function pickCharToBlank(phrase: string): string {
  const idx = Math.floor(Math.random() * phrase.length)
  return phrase[idx]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]; a[i] = a[j]; a[j] = t
  }
  return a
}

function pickOptions(all: string[], correct: string, count: number) {
  const pool = shuffle(all.filter((x) => x !== correct))
  const chosen = pool.slice(0, count - 1)
  return shuffle([correct, ...chosen])
}

export type QuizOptions = {
  quizSentence: string
  options: string[]
  correct: string
}

export function buildQuizOptions(
  category: 'chinese' | 'math',
  item: ChineseHanziItem | MathPhraseItem
): QuizOptions {
  if (category === 'chinese') {
    const ci = item as ChineseHanziItem
    const distractors = getDistractors(ci.hanzi, ci.pinyin, 2)
    return {
      quizSentence: toBlankSentence(ci.sentence, ci.hanzi),
      options: shuffle([ci.hanzi, ...distractors]),
      correct: ci.hanzi
    }
  }
  const mi = item as MathPhraseItem
  const charToBlank = pickCharToBlank(mi.phrase)
  return {
    quizSentence: toBlankSentence(mi.example, charToBlank),
    options: pickOptions(MATH_CHAR_POOL, charToBlank, 3),
    correct: charToBlank
  }
}
