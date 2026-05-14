export type LexiconLevel<TItem> = {
  id: string
  title: string
  items: TItem[]
}

export type ChineseHanziItem = {
  hanzi: string
  pinyin: string
  words: string[]
  sentence: string
}

export type MathPhraseItem = {
  phrase: string
  words: string[]
  example: string
  hint: string
  tags: string[]
}

