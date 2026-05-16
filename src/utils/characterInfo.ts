import cnchar from 'cnchar'
import radical from 'cnchar-radical'

cnchar.use(radical)

export interface RadicalInfo {
  radical: string
  radicalCount: number
  struct: string
}

export function getStrokeCount(hanzi: string): number {
  try {
    const n = cnchar.stroke(hanzi)
    return typeof n === 'number' ? n : 0
  } catch {
    return 0
  }
}

export function getRadicalInfo(hanzi: string): RadicalInfo | null {
  try {
    const result = (cnchar as any).radical(hanzi)
    if (result && result.length > 0) {
      return {
        radical: result[0].radical,
        radicalCount: result[0].radicalCount,
        struct: result[0].struct
      }
    }
  } catch { /* ignore */ }
  return null
}
