export function toBlankSentence(sentence: string, target: string) {
  if (!target) return sentence
  const idx = sentence.indexOf(target)
  if (idx < 0) return sentence
  return sentence.slice(0, idx) + '___' + sentence.slice(idx + target.length)
}

