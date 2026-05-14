import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import { FillBlankQuiz } from '../../components/FillBlankQuiz'
import { LiteracyCard } from '../../components/LiteracyCard'
import { ProgressStars } from '../../components/ProgressStars'
import { chineseLevels, mathLevels } from '../../data/lexicons'
import type { ChineseHanziItem, LexiconLevel, MathPhraseItem } from '../../data/lexicons/types'
import { advanceProgress, awardStar, getProgressKey, getStarsKey } from '../../domain/progress'
import { toBlankSentence } from '../../domain/quizSentence'

const TOTAL_STARS = 5

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

function loadSavedPosition(category: string, fallbackLevel: number, fallbackItem: number) {
  try {
    const raw = Taro.getStorageSync(getProgressKey(category))
    if (raw) {
      const p = JSON.parse(raw)
      if (typeof p.levelIndex === 'number' && typeof p.itemIndex === 'number') {
        return { level: p.levelIndex, item: p.itemIndex }
      }
    }
  } catch { /* ignore */ }
  return { level: fallbackLevel, item: fallbackItem }
}

function buildLevelData(
  category: string,
  levelIndex: number,
  itemIndex: number
): { data: LevelData; level: LexiconLevel<ChineseHanziItem | MathPhraseItem> } {
  if (category === 'chinese') {
    const level = chineseLevels[levelIndex] || chineseLevels[0]
    const item = level.items[itemIndex] || level.items[0]
    const optionsAll = level.items.map((x) => (x as ChineseHanziItem).hanzi)
    return {
      level,
      data: {
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
  }
  const level = mathLevels[levelIndex] || mathLevels[0]
  const item = level.items[itemIndex] || level.items[0]
  const optionsAll = level.items.map((x) => (x as MathPhraseItem).phrase)
  return {
    level,
    data: {
      title: `数学探险 · ${level.title}`,
      hanzi: item.phrase,
      pinyin: '',
      words: item.words,
      sentence: item.hint,
      quizSentence: toBlankSentence(item.example, item.phrase),
      options: pickOptions(optionsAll, item.phrase, 3),
      correct: item.phrase
    }
  }
}

export default function Level() {
  const router = useRouter()
  const category = (router.params.category || 'math') as 'math' | 'chinese'
  const paramLevel = Number(router.params.level || 0)
  const paramItem = Number(router.params.item || 0)

  const levels = category === 'chinese' ? chineseLevels : mathLevels

  const [currentLevel, setCurrentLevel] = useState(() => {
    const saved = loadSavedPosition(category, paramLevel, paramItem)
    return saved.level
  })
  const [currentItem, setCurrentItem] = useState(() => {
    const saved = loadSavedPosition(category, paramLevel, paramItem)
    return saved.item
  })
  const [stars, setStars] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [allDone, setAllDone] = useState(false)

  const { data, level: currentLevelData } = useMemo(
    () => buildLevelData(category, currentLevel, currentItem),
    [category, currentLevel, currentItem]
  )

  const isLastItem =
    currentItem >= (currentLevelData?.items.length ?? 0) - 1
  const isLastLevel = currentLevel >= levels.length - 1

  function saveProgress(level: number, item: number) {
    Taro.setStorageSync(
      getProgressKey(category),
      JSON.stringify({ levelIndex: level, itemIndex: item })
    )
  }

  function goNext() {
    const next = advanceProgress(
      currentLevel,
      currentItem,
      currentLevelData?.items.length ?? 0,
      levels.length
    )
    if (next.completed) {
      saveProgress(currentLevel, currentItem)
      setAllDone(true)
      return
    }
    setCurrentLevel(next.levelIndex)
    setCurrentItem(next.itemIndex)
    saveProgress(next.levelIndex, next.itemIndex)
    setQuizPassed(false)
  }

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: `第 ${currentLevel + 1} 关` })
  }, [currentLevel])

  useDidShow(() => {
    const v = Number(Taro.getStorageSync(getStarsKey()) || 0)
    setStars(Number.isFinite(v) ? v : 0)
  })

  function nextLabel() {
    if (isLastItem && isLastLevel) return '全部通关！'
    if (isLastItem) return '下一关'
    return '下一题'
  }

  return (
    <View className="min-h-screen bg-[#E9F8FF] px-6 py-7">
      <Text className="block text-center text-2xl font-extrabold text-[#1E1E1E]">{data.title}</Text>

      <View className="mt-4 items-center">
        <ProgressStars total={TOTAL_STARS} value={stars} />
      </View>

      {allDone ? (
        <View className="mt-12 flex flex-col items-center gap-5">
          <Text className="text-3xl font-extrabold text-[#1E1E1E]">全部通关！</Text>
          <Text className="text-lg font-semibold text-[#5A5A5A]">
            你已完成{category === 'chinese' ? '语文宝库' : '数学探险'}的所有关卡！
          </Text>
          <View
            className="mt-4 rounded-full bg-brand-peach px-8 py-4 active:opacity-80"
            onClick={() => Taro.navigateBack()}
          >
            <Text className="text-base font-extrabold text-[#1E1E1E]">回到首页</Text>
          </View>
        </View>
      ) : (
        <>
          <View className="mt-6" key={`${currentLevel}-${currentItem}`}>
            <LiteracyCard
              hanzi={data.hanzi}
              pinyin={data.pinyin}
              words={data.words}
              sentence={data.sentence}
              onSpeak={() => {
                Taro.showToast({
                  title: data.pinyin ? `发音：${data.pinyin}` : `关键词：${data.hanzi}`,
                  icon: 'none'
                })
              }}
            />
          </View>

          <View className="mt-5" key={`quiz-${currentLevel}-${currentItem}`}>
            <FillBlankQuiz
              sentence={data.quizSentence}
              options={data.options}
              correct={data.correct}
              onPass={() => {
                const next = awardStar(stars, TOTAL_STARS)
                setStars(next)
                Taro.setStorageSync(getStarsKey(), next)
                setQuizPassed(true)
              }}
              onNext={quizPassed ? goNext : undefined}
              nextLabel={nextLabel()}
            />
          </View>

          {quizPassed ? null : (
            <View className="mt-6 flex flex-row justify-center gap-4">
              <View
                className="rounded-full bg-brand-peach px-7 py-4 active:opacity-80"
                onClick={() => Taro.navigateBack()}
              >
                <Text className="text-base font-extrabold text-[#1E1E1E]">回到首页</Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  )
}
