import { describe, expect, it } from 'vitest'
import { chineseLevels } from './chinese'

function flattenHanzi() {
  return chineseLevels.flatMap((l) => l.items.map((x) => x.hanzi))
}

describe('chineseLevels', () => {
  it('has exactly 50 unique hanzi', () => {
    const all = flattenHanzi()
    expect(all.length).toBe(50)
    expect(new Set(all).size).toBe(50)
  })

  it('contains the provided first three levels (sample)', () => {
    expect(chineseLevels[0].title).toContain('自然')
    expect(chineseLevels[0].items.map((x) => x.hanzi)).toEqual(['天', '地', '人', '你', '我', '他'])

    expect(chineseLevels[1].title).toContain('数字')
    expect(chineseLevels[1].items.map((x) => x.hanzi)).toEqual(['一', '二', '三', '上', '下'])

    expect(chineseLevels[2].title).toContain('人体')
    expect(chineseLevels[2].items.map((x) => x.hanzi)).toEqual(['口', '耳', '目', '手', '足'])
  })

  it('every item has required fields', () => {
    for (const level of chineseLevels) {
      for (const item of level.items) {
        expect(item.hanzi.length).toBeGreaterThan(0)
        expect(item.pinyin.length).toBeGreaterThan(0)
        expect(item.words.length).toBeGreaterThanOrEqual(2)
        expect(item.sentence.length).toBeGreaterThan(0)
      }
    }
  })
})

