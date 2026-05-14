export function clampStars(value: number, total: number) {
  if (total <= 0) return 0
  return Math.max(0, Math.min(value, total))
}

export function awardStar(current: number, total: number) {
  return clampStars(current + 1, total)
}
