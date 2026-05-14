import { describe, expect, it } from 'vitest'
import { isCorrectOption } from './quiz'

describe('isCorrectOption', () => {
  it('returns true for correct option', () => {
    expect(isCorrectOption('加', '加')).toBe(true)
  })

  it('returns false for wrong option', () => {
    expect(isCorrectOption('减', '加')).toBe(false)
  })
})
