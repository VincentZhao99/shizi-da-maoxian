import { describe, expect, it } from 'vitest'
import { chineseLevels } from './chinese'

function flattenHanzi() {
  return chineseLevels.flatMap((l) => l.items.map((x) => x.hanzi))
}

describe('chineseLevels', () => {
  it('has exactly 200 unique hanzi', () => {
    const all = flattenHanzi()
    expect(all.length).toBe(200)
    expect(new Set(all).size).toBe(200)
  })

  it('contains the provided first three levels (sample)', () => {
    expect(chineseLevels[0].title).toContain('自然')
    expect(chineseLevels[0].items.map((x) => x.hanzi)).toEqual(['天', '地', '人', '你', '我', '他'])

    expect(chineseLevels[1].title).toContain('数字')
    expect(chineseLevels[1].items.map((x) => x.hanzi)).toEqual(['一', '二', '三', '上', '下'])

    expect(chineseLevels[2].title).toContain('人体')
    expect(chineseLevels[2].items.map((x) => x.hanzi)).toEqual(['口', '耳', '目', '手', '足'])
  })

  it('contains added levels 9 and 10 (sample)', () => {
    expect(chineseLevels[8].title).toContain('更多数字')
    expect(chineseLevels[8].items.map((x) => x.hanzi)).toEqual([
      '四', '五', '六', '七', '八', '九', '十', '百', '千', '半', '多', '少'
    ])

    expect(chineseLevels[9].title).toContain('颜色')
    expect(chineseLevels[9].items.map((x) => x.hanzi)).toEqual([
      '红', '黄', '蓝', '绿', '白', '黑', '金', '紫', '粉', '灰', '彩', '色'
    ])
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

