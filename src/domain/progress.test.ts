import { describe, expect, it } from 'vitest'
import { awardStar, clampStars } from './progress'

describe('clampStars', () => {
  it('clamps negative to 0', () => {
    expect(clampStars(-1, 5)).toBe(0)
  })

  it('clamps above total to total', () => {
    expect(clampStars(6, 5)).toBe(5)
  })

  it('keeps value inside range', () => {
    expect(clampStars(3, 5)).toBe(3)
  })
})

describe('awardStar', () => {
  it('increments by 1', () => {
    expect(awardStar(0, 5)).toBe(1)
  })

  it('does not exceed total', () => {
    expect(awardStar(5, 5)).toBe(5)
  })
})
