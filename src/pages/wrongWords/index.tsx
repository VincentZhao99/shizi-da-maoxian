import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import { FillBlankQuiz } from '../../components/FillBlankQuiz'
import { LiteracyCard } from '../../components/LiteracyCard'
import { ProgressStars } from '../../components/ProgressStars'
import { loadWrongWords, removeWrongWord, type WrongWord } from '../../domain/wrongWords'
import { buildQuizOptions } from '../../domain/quizData'
import { awardStar, DAILY_GOAL, getStarsKey, incrementTotalStars } from '../../domain/progress'
import { speak, onPlayStateChange } from '../../utils/audio'
import { getPinyinInContext } from '../../utils/pinyin'
import type { ChineseHanziItem, MathPhraseItem } from '../../data/lexicons/types'

const TOTAL_STARS = DAILY_GOAL

type SpeakingTarget = 'char' | 'cardSentence' | 'cardWords' | 'quizSentence' | null

function buildDisplayData(w: WrongWord) {
  if (w.category === 'chinese') {
    const item = w.item as ChineseHanziItem
    return {
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      words: item.words,
      sentence: item.sentence,
      quizSource: item.sentence
    }
  }
  const item = w.item as MathPhraseItem
  return {
    hanzi: item.phrase,
    pinyin: '',
    words: item.words,
    sentence: item.hint,
    quizSource: item.example
  }
}

export default function WrongWords() {
  const [words, setWords] = useState<WrongWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quizPassed, setQuizPassed] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [stars, setStars] = useState(0)
  const [speaking, setSpeaking] = useState<SpeakingTarget>(null)

  useEffect(() => {
    return onPlayStateChange((playing) => {
      if (!playing) setSpeaking(null)
    })
  }, [])

  useDidShow(() => {
    const loaded = loadWrongWords()
    setWords(loaded)
    setCurrentIndex(0)
    setQuizPassed(false)
    setAllDone(false)
    const v = Number(Taro.getStorageSync(getStarsKey('wrong')) || 0)
    setStars(Number.isFinite(v) ? v : 0)
  })

  const current = words[currentIndex]
  const display = useMemo(() => (current ? buildDisplayData(current) : null), [current])
  const quiz = useMemo(() => {
    if (!current) return null
    return buildQuizOptions(current.category, current.item)
  }, [current])

  function handleSpeak(target: SpeakingTarget, text: string) {
    setSpeaking(target)
    speak(text)
  }

  function handleCorrect() {
    if (!current) return
    removeWrongWord(current.category, current.item)
    const next = awardStar(stars, TOTAL_STARS)
    setStars(next)
    Taro.setStorageSync(getStarsKey('wrong'), next)
    incrementTotalStars()
    setQuizPassed(true)
  }

  function goNext() {
    const remaining = words.filter((_, i) => i !== currentIndex)
    if (remaining.length === 0) {
      setWords([])
      setAllDone(true)
      return
    }
    const removed = words.filter((_, i) => i !== currentIndex)
    setWords(removed)
    setCurrentIndex(0)
    setQuizPassed(false)
  }

  return (
    <View className="min-h-screen bg-[#E9F8FF] px-6 py-7" style={{ paddingBottom: '100px' }}>
      <Text className="block text-center text-2xl font-extrabold text-[#1E1E1E]">
        错题本
      </Text>

      <View className="mt-4 items-center">
        <ProgressStars total={TOTAL_STARS} value={stars} />
      </View>

      {!current && !allDone ? (
        <View className="mt-12 flex flex-col items-center gap-5">
          <Text className="text-3xl font-extrabold text-[#1E1E1E]">没有错字怪啦！</Text>
          <Text className="text-lg font-semibold text-[#5A5A5A]">
            你还没有收集到错字怪，去闯关吧！
          </Text>
          <View
            className="mt-4 rounded-full bg-brand-peach px-8 py-4 active:opacity-80"
            onClick={() => Taro.switchTab({ url: '/pages/home/index' })}
          >
            <Text className="text-base font-extrabold text-[#1E1E1E]">回到首页</Text>
          </View>
        </View>
      ) : allDone ? (
        <View className="mt-12 flex flex-col items-center gap-5">
          <Text className="text-3xl font-extrabold text-[#1E1E1E]">全部消灭！</Text>
          <Text className="text-lg font-semibold text-[#5A5A5A]">
            错字怪都被你打败啦！
          </Text>
          <View
            className="mt-4 rounded-full bg-brand-peach px-8 py-4 active:opacity-80"
            onClick={() => Taro.switchTab({ url: '/pages/home/index' })}
          >
            <Text className="text-base font-extrabold text-[#1E1E1E]">回到首页</Text>
          </View>
        </View>
      ) : display && quiz ? (
        <>
          <Text className="mt-3 block text-center text-sm font-semibold text-[#FF6B6B]">
            还有 {words.length} 个错字怪
          </Text>

          <View className="mt-4" key={`card-${currentIndex}`}>
            <LiteracyCard
              hanzi={display.hanzi}
              pinyin={display.pinyin}
              words={display.words}
              sentence={display.sentence}
              speaking={
                speaking === 'char' ? 'char'
                : speaking === 'cardSentence' ? 'sentence'
                : speaking === 'cardWords' ? 'words'
                : null
              }
              onSpeak={() => handleSpeak('char', display.hanzi)}
              onSpeakSentence={() => handleSpeak('cardSentence', display.sentence)}
              onSpeakWords={() => handleSpeak('cardWords', display.words.join('、'))}
            />
          </View>

          <View className="mt-5" key={`quiz-${currentIndex}-${quiz.correct}`}>
            <FillBlankQuiz
              sentence={quiz.quizSentence}
              options={quiz.options}
              correct={quiz.correct}
              onPass={handleCorrect}
              onNext={quizPassed ? goNext : undefined}
              nextLabel={words.length <= 1 ? '全部消灭！' : '下一个错字怪'}
              onSpeakSentence={() => handleSpeak('quizSentence', display.quizSource)}
              isSpeaking={speaking === 'quizSentence'}
              blankPinyin={getPinyinInContext(display.quizSource, quiz.correct)}
            />
          </View>

          {quizPassed ? null : (
            <View className="mt-6 flex flex-row justify-center">
              <View
                className="rounded-full bg-brand-peach px-7 py-4 active:opacity-80"
                onClick={() => Taro.switchTab({ url: '/pages/home/index' })}
              >
                <Text className="text-base font-extrabold text-[#1E1E1E]">回到首页</Text>
              </View>
            </View>
          )}
        </>
      ) : null}
    </View>
  )
}
