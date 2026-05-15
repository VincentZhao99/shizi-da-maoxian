import { describe, expect, it } from 'vitest'
import { getDistractors } from './confusables'

describe('getDistractors', () => {
  it('returns exactly count distractors', () => {
    const result = getDistractors('天', 'tiān', 2)
    expect(result).toHaveLength(2)
    expect(result).not.toContain('天')
  })

  it('returns different distractors each call (shuffled)', () => {
    const sets = new Set<string>()
    for (let i = 0; i < 10; i++) {
      sets.add(getDistractors('天', 'tiān', 2).join(','))
    }
    // Should have at least some variation (not always the same order)
    expect(sets.size).toBeGreaterThan(1)
  })

  it('distractors are from the global lexicon', () => {
    // '一' has few visual/phonetic similars, should still return valid chars
    const result = getDistractors('一', 'yī', 2)
    expect(result).toHaveLength(2)
    expect(result.every((c) => c.length === 1)).toBe(true)
    expect(result).not.toContain('一')
  })

  it('returns requested count of 3', () => {
    const result = getDistractors('大', 'dà', 3)
    expect(result).toHaveLength(3)
    expect(result).not.toContain('大')
  })
})
