import { describe, expect, it } from 'vitest'
import { toBlankSentence } from './quizSentence'

describe('toBlankSentence', () => {
  it('replaces the first occurrence with blank', () => {
    expect(toBlankSentence('花园里有很多花。', '花')).toBe('___园里有很多花。')
  })

  it('keeps original when target not found', () => {
    expect(toBlankSentence('今天下雨了。', '花')).toBe('今天下雨了。')
  })
})

