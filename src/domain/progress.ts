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

export function getStarsKey() {
  return `stars_${getTodayKey()}`
}

export function getProgressKey(category: string) {
  return `progress_${category}`
}
