import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useMemo, useState } from 'react'
import { FillBlankQuiz } from '../../components/FillBlankQuiz'
import { LiteracyCard } from '../../components/LiteracyCard'
import { ProgressStars } from '../../components/ProgressStars'
import { chineseLevels, mathLevels } from '../../data/lexicons'
import { awardStar } from '../../domain/progress'
import { toBlankSentence } from '../../domain/quizSentence'

const TOTAL_STARS = 5
const STORAGE_KEY = 'todayStars'

type LevelData = {
  title: string
  hanzi: string
  pinyin: string
  words: string[]
  sentence: string
  quizSentence: string
  options: string[]
  correct: string
}

function pickOptions(all: string[], correct: string, count: number) {
  const pool = all.filter((x) => x !== correct)
  const chosen: string[] = []
  for (let i = 0; i < pool.length && chosen.length < count - 1; i++) {
    chosen.push(pool[i])
  }
  const result = [correct, ...chosen].slice(0, count)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = result[i]
    result[i] = result[j]
    result[j] = t
  }
  return result
}

export default function Level() {
  const router = useRouter()
  const category = router.params.category || 'math'
  const levelIndex = Number(router.params.level || 0)
  const itemIndex = Number(router.params.item || 0)
  const [stars, setStars] = useState(0)

  const data = useMemo<LevelData>(() => {
    if (category === 'chinese') {
      const level = chineseLevels[levelIndex] || chineseLevels[0]
      const item = level.items[itemIndex] || level.items[0]
      const optionsAll = level.items.map((x) => x.hanzi)
      return {
        title: `语文宝库 · ${level.title}`,
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        words: item.words,
        sentence: item.sentence,
        quizSentence: toBlankSentence(item.sentence, item.hanzi),
        options: pickOptions(optionsAll, item.hanzi, 3),
        correct: item.hanzi
      }
    }
    const level = mathLevels[levelIndex] || mathLevels[0]
    const item = level.items[itemIndex] || level.items[0]
    const optionsAll = level.items.map((x) => x.phrase)
    return {
      title: `数学探险 · ${level.title}`,
      hanzi: item.phrase,
      pinyin: '',
      words: item.words,
      sentence: item.hint,
      quizSentence: toBlankSentence(item.example, item.phrase),
      options: pickOptions(optionsAll, item.phrase, 3),
      correct: item.phrase
    }
  }, [category, itemIndex, levelIndex])

  useDidShow(() => {
    const v = Number(Taro.getStorageSync(STORAGE_KEY) || 0)
    setStars(Number.isFinite(v) ? v : 0)
  })

  return (
    <View className="min-h-screen bg-[#E9F8FF] px-6 py-7">
      <Text className="block text-center text-2xl font-extrabold text-[#1E1E1E]">{data.title}</Text>

      <View className="mt-4 items-center">
        <ProgressStars total={TOTAL_STARS} value={stars} />
      </View>

      <View className="mt-6">
        <LiteracyCard
          hanzi={data.hanzi}
          pinyin={data.pinyin}
          words={data.words}
          sentence={data.sentence}
          onSpeak={() => {
            Taro.showToast({ title: data.pinyin ? `发音：${data.pinyin}` : `关键词：${data.hanzi}`, icon: 'none' })
          }}
        />
      </View>

      <View className="mt-5">
        <FillBlankQuiz
          sentence={data.quizSentence}
          options={data.options}
          correct={data.correct}
          onPass={() => {
            const next = awardStar(stars, TOTAL_STARS)
            setStars(next)
            Taro.setStorageSync(STORAGE_KEY, next)
          }}
        />
      </View>

      <View className="mt-6 flex flex-row justify-center">
        <View
          className="rounded-full bg-brand-peach px-7 py-4 active:opacity-80"
          onClick={() => Taro.navigateBack()}
        >
          <Text className="text-base font-extrabold text-[#1E1E1E]">回到首页</Text>
        </View>
      </View>
    </View>
  )
}
