import { describe, expect, it } from 'vitest'
import { annotateSentence, getPinyin } from './pinyin'

describe('getPinyin', () => {
  it('returns pinyin for single char', () => {
    expect(getPinyin('天')).toBe('tiān')
  })

  it('returns pinyin for multi-char phrase', () => {
    const result = getPinyin('一共')
    expect(result).toMatch(/y[ií].*gòng/)
  })
})

describe('annotateSentence', () => {
  it('returns empty array for empty string', () => {
    expect(annotateSentence('')).toEqual([])
  })

  it('annotates each char with pinyin', () => {
    const result = annotateSentence('你好')
    expect(result).toHaveLength(2)
    expect(result[0].char).toBe('你')
    expect(result[0].pinyin).toBeTruthy()
    expect(result[1].char).toBe('好')
    expect(result[1].pinyin).toBeTruthy()
  })

  it('handles blank markers', () => {
    const result = annotateSentence('今天___好')
    const chars = result.map((r) => r.char)
    expect(chars).toEqual(['今', '天', '___', '好'])
    // blank marker has empty pinyin
    expect(result[2].pinyin).toBe('')
    // non-blank chars have pinyin
    expect(result[0].pinyin).toBeTruthy()
    expect(result[3].pinyin).toBeTruthy()
  })
})
