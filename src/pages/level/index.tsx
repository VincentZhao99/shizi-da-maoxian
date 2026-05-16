import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import { FillBlankQuiz } from '../../components/FillBlankQuiz'
import { LiteracyCard } from '../../components/LiteracyCard'
import { ProgressStars } from '../../components/ProgressStars'
import { mathLevels } from '../../data/lexicons'
import type { ChineseHanziItem, LexiconLevel, MathPhraseItem } from '../../data/lexicons/types'
import { advanceProgress, awardStar, DAILY_GOAL, getProgressKey, getStarsKey, incrementTotalStars } from '../../domain/progress'
import { speak, onPlayStateChange } from '../../utils/audio'
import { getPinyinInContext } from '../../utils/pinyin'
import { buildQuizOptions } from '../../domain/quizData'
import { addWrongWord } from '../../domain/wrongWords'
import { getChineseLevelsWithCustom } from '../../data/customLexicon'

const TOTAL_STARS = DAILY_GOAL

type LevelData = {
  title: string
  hanzi: string
  pinyin: string
  words: string[]
  sentence: string
  quizSentence: string
  quizSourceSentence: string
  options: string[]
  correct: string
}

type SpeakingTarget = 'char' | 'cardSentence' | 'cardWords' | 'quizSentence' | null

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
    const allChinese = getChineseLevelsWithCustom()
    const level = allChinese[levelIndex] || allChinese[0]
    const item = level.items[itemIndex] || level.items[0]
    const quiz = buildQuizOptions('chinese', item)
    return {
      level,
      data: {
        title: `语文宝库 · ${level.title}`,
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        words: item.words,
        sentence: item.sentence,
        quizSentence: quiz.quizSentence,
        quizSourceSentence: item.sentence,
        options: quiz.options,
        correct: quiz.correct
      }
    }
  }
  const level = mathLevels[levelIndex] || mathLevels[0]
  const item = level.items[itemIndex] || level.items[0]
  const quiz = buildQuizOptions('math', item)
  return {
    level,
    data: {
      title: `数学探险 · ${level.title}`,
      hanzi: item.phrase,
      pinyin: '',
      words: item.words,
      sentence: item.hint,
      quizSentence: quiz.quizSentence,
      quizSourceSentence: item.example,
      options: quiz.options,
      correct: quiz.correct
    }
  }
}

export default function Level() {
  const router = useRouter()
  const category = (router.params.category || 'math') as 'math' | 'chinese'
  const paramLevel = Number(router.params.level || 0)
  const paramItem = Number(router.params.item || 0)

  const levels = category === 'chinese' ? getChineseLevelsWithCustom() : mathLevels

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
  const [speaking, setSpeaking] = useState<SpeakingTarget>(null)

  const { data, level: currentLevelData } = useMemo(
    () => buildLevelData(category, currentLevel, currentItem),
    [category, currentLevel, currentItem]
  )

  useEffect(() => {
    return onPlayStateChange((playing) => {
      if (!playing) setSpeaking(null)
    })
  }, [])

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

  function handleSpeak(target: SpeakingTarget, text: string) {
    setSpeaking(target)
    speak(text)
  }

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: `第 ${currentLevel + 1} 关` })
  }, [currentLevel])

  useDidShow(() => {
    const v = Number(Taro.getStorageSync(getStarsKey(category)) || 0)
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
              speaking={
                speaking === 'char' ? 'char'
                : speaking === 'cardSentence' ? 'sentence'
                : speaking === 'cardWords' ? 'words'
                : null
              }
              onSpeak={() => handleSpeak('char', data.hanzi)}
              onSpeakSentence={() => handleSpeak('cardSentence', data.sentence)}
              onSpeakWords={() => handleSpeak('cardWords', data.words.join('、'))}
            />
          </View>

          <View className="mt-5" key={`quiz-${currentLevel}-${currentItem}`}>
            <FillBlankQuiz
              sentence={data.quizSentence}
              options={data.options}
              correct={data.correct}
              onWrong={() => {
                const item = currentLevelData.items[currentItem]
                addWrongWord(category as 'chinese' | 'math', item)
              }}
              onPass={() => {
                const next = awardStar(stars, TOTAL_STARS)
                setStars(next)
                Taro.setStorageSync(getStarsKey(category), next)
                incrementTotalStars()
                setQuizPassed(true)
              }}
              onNext={quizPassed ? goNext : undefined}
              nextLabel={nextLabel()}
              onSpeakSentence={() => handleSpeak('quizSentence', data.quizSourceSentence)}
              isSpeaking={speaking === 'quizSentence'}
              blankPinyin={getPinyinInContext(data.quizSourceSentence, data.correct)}
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
