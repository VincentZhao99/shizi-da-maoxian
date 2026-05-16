import Taro from '@tarojs/taro'

export function clampStars(value: number, total: number) {
  if (total <= 0) return 0
  return Math.max(0, Math.min(value, total))
}

export function awardStar(current: number, total: number) {
  return clampStars(current + 1, total)
}

// ---- Level progression ----

export type CategoryProgress = {
  levelIndex: number
  itemIndex: number
  completed: boolean
}

export function advanceProgress(
  levelIndex: number,
  itemIndex: number,
  totalItemsInLevel: number,
  totalLevels: number
): CategoryProgress {
  if (levelIndex >= totalLevels) {
    return { levelIndex, itemIndex, completed: true }
  }
  if (itemIndex + 1 < totalItemsInLevel) {
    return { levelIndex, itemIndex: itemIndex + 1, completed: false }
  }
  if (levelIndex + 1 < totalLevels) {
    return { levelIndex: levelIndex + 1, itemIndex: 0, completed: false }
  }
  return { levelIndex, itemIndex, completed: true }
}

// ---- Storage keys ----

export function getTodayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getStarsKey(category: string) {
  return `stars_${category}_${getTodayKey()}`
}

export function getProgressKey(category: string) {
  return `progress_${category}`
}

export const DAILY_GOAL = 3

// ---- Total stars (persistent) ----

const TOTAL_STARS_KEY = 'totalStars'

export function getTotalStars(): number {
  try {
    const v = Number(Taro.getStorageSync(TOTAL_STARS_KEY) || 0)
    return Number.isFinite(v) ? v : 0
  } catch { return 0 }
}

export function incrementTotalStars(): number {
  const next = getTotalStars() + 1
  Taro.setStorageSync(TOTAL_STARS_KEY, next)
  return next
}

// ---- Streak ----

const STREAK_KEY = 'streak'

export function loadStreak(): { lastDate: string; count: number } {
  try {
    const raw = Taro.getStorageSync(STREAK_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s.lastDate && typeof s.count === 'number') return s
    }
  } catch { /* ignore */ }
  return { lastDate: '', count: 0 }
}

export function tryRecordStreak(): number {
  const today = getTodayKey()
  const streak = loadStreak()

  if (streak.lastDate === today) return streak.count

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`

  const count = streak.lastDate === yKey ? streak.count + 1 : 1
  Taro.setStorageSync(STREAK_KEY, JSON.stringify({ lastDate: today, count }))
  return count
}
