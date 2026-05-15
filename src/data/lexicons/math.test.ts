import { describe, expect, it } from 'vitest'
import { mathLevels } from './math'

describe('mathLevels', () => {
  it('has at least 10 levels and non-empty items', () => {
    expect(mathLevels.length).toBeGreaterThanOrEqual(10)
    for (const level of mathLevels) {
      expect(level.items.length).toBeGreaterThan(0)
    }
  })

  it('contains core phrases', () => {
    const phrases = new Set(mathLevels.flatMap((l) => l.items.map((x) => x.phrase)))
    expect(phrases.has('一共')).toBe(true)
    expect(phrases.has('还剩')).toBe(true)
    expect(phrases.has('比')).toBe(true)
    expect(phrases.has('第几')).toBe(true)
    expect(phrases.has('最')).toBe(true)
    expect(phrases.has('上面')).toBe(true)
    expect(phrases.has('原来')).toBe(true)
    expect(phrases.has('不够')).toBe(true)
  })
})

