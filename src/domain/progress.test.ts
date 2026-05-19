import { describe, expect, it, vi } from 'vitest'

vi.mock('@tarojs/taro', () => {
  const store: Record<string, any> = {}
  return {
    default: {
      getStorageSync(key: string) {
        return store[key] ?? null
      },
      setStorageSync(key: string, value: any) {
        store[key] = value
      },
      removeStorageSync(key: string) {
        delete store[key]
      },
      showToast() {},
      navigateTo() {},
      navigateBack() {},
      switchTab() {},
      setNavigationBarTitle() {},
      request() {},
      useRouter() {
        return { params: {} }
      },
      useDidShow() {},
    },
  }
})

import { advanceProgress, awardStar, clampStars, getProgressKey, getStarsKey } from './progress'

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

describe('advanceProgress', () => {
  it('advances to next item within same level', () => {
    expect(advanceProgress(0, 0, 6, 8)).toEqual({
      levelIndex: 0,
      itemIndex: 1,
      completed: false
    })
  })

  it('advances to next level when current level done', () => {
    expect(advanceProgress(0, 5, 6, 8)).toEqual({
      levelIndex: 1,
      itemIndex: 0,
      completed: false
    })
  })

  it('marks completed when all levels done', () => {
    expect(advanceProgress(7, 5, 6, 8)).toEqual({
      levelIndex: 7,
      itemIndex: 5,
      completed: true
    })
  })

  it('marks completed when levelIndex out of bounds', () => {
    expect(advanceProgress(10, 0, 5, 8)).toEqual({
      levelIndex: 10,
      itemIndex: 0,
      completed: true
    })
  })
})

describe('getStarsKey', () => {
  it('includes category and date prefix', () => {
    const key = getStarsKey('math')
    expect(key).toMatch(/^stars_math_\d{4}-\d{2}-\d{2}$/)
  })
})

describe('getProgressKey', () => {
  it('includes category name', () => {
    expect(getProgressKey('math')).toBe('progress_math')
    expect(getProgressKey('chinese')).toBe('progress_chinese')
  })
})
