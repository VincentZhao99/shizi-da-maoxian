import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import { CategoryCard } from '../../components/CategoryCard'
import { mathLevels } from '../../data/lexicons'
import { DAILY_GOAL, getProgressKey, getStarsKey, loadStreak, tryRecordStreak } from '../../domain/progress'
import { loadWrongWords } from '../../domain/wrongWords'
import { getChineseLevelsWithCustom } from '../../data/customLexicon'

const GREETINGS = [
  '开始今天的探险吧！',
  '今天要收集好多星星哦！',
  '快来和汉字交朋友吧！',
  '冲冲冲，去闯关啦！',
]

function loadPosition(category: string) {
  try {
    const raw = Taro.getStorageSync(getProgressKey(category))
    if (raw) {
      const p = JSON.parse(raw)
      if (typeof p.levelIndex === 'number' && typeof p.itemIndex === 'number') {
        return { level: p.levelIndex, item: p.itemIndex }
      }
    }
  } catch { /* ignore */ }
  return { level: 0, item: 0 }
}

function getWelcomeMessage(): string {
  try {
    const name = Taro.getStorageSync('childName')
    if (name && typeof name === 'string' && name.trim()) {
      const g = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
      return `${name.trim()}，${g}`
    }
  } catch { /* ignore */ }
  return '开始今天的探险吧！'
}

export default function Home() {
  const [mathProgress, setMathProgress] = useState(0)
  const [chineseProgress, setChineseProgress] = useState(0)
  const [mathPos, setMathPos] = useState(() => loadPosition('math'))
  const [chinesePos, setChinesePos] = useState(() => loadPosition('chinese'))
  const [wrongCount, setWrongCount] = useState(0)
  const [streak, setStreak] = useState(() => loadStreak().count)
  const [welcome] = useState(() => getWelcomeMessage())
  const streakRecorded = useRef(false)

  useDidShow(() => {
    const m = Number(Taro.getStorageSync(getStarsKey('math')) || 0)
    setMathProgress(Number.isFinite(m) ? Math.min(m, DAILY_GOAL) : 0)
    const c = Number(Taro.getStorageSync(getStarsKey('chinese')) || 0)
    setChineseProgress(Number.isFinite(c) ? Math.min(c, DAILY_GOAL) : 0)
    setMathPos(loadPosition('math'))
    setChinesePos(loadPosition('chinese'))
    setWrongCount(loadWrongWords().length)
  })

  const bothDone = mathProgress >= DAILY_GOAL && chineseProgress >= DAILY_GOAL

  useEffect(() => {
    if (bothDone && !streakRecorded.current) {
      streakRecorded.current = true
      const count = tryRecordStreak()
      setStreak(count)
    }
  }, [bothDone])

  return (
    <View className="min-h-screen bg-[#FFF3D6] px-6 py-8">
      <View
        className="flex flex-row items-center justify-center"
        onLongPress={() => Taro.navigateTo({ url: '/pages/parent/index' })}
      >
        <Text className="text-[36px] mr-2">🚂</Text>
        <Text className="text-[28px] font-extrabold text-[#1E1E1E]">
          {welcome}
        </Text>
      </View>

      {bothDone ? (
        <View className="mt-4 rounded-2xl bg-[#FFD700] px-5 py-4 text-center">
          <Text className="text-2xl font-extrabold text-[#1E1E1E]">
            太棒了，今日探险全部完成！
          </Text>
          {streak > 0 ? (
            <Text className="mt-1 block text-base font-bold text-[#5A5A5A]">
              已连续打卡 {streak} 天
            </Text>
          ) : null}
        </View>
      ) : null}

      <View className="mt-5 flex flex-col gap-4">
        <CategoryCard
          title="数学探险"
          subtitle="功能字闯关"
          color="#5CC8FF"
          emoji="🧮"
          progress={`今日数学：${mathProgress}/${DAILY_GOAL} 关 · 第 ${mathPos.level + 1}/${mathLevels.length} 关`}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/level/index?category=math&level=${mathPos.level}&item=${mathPos.item}`
            })
          }
        />
        <CategoryCard
          title="语文宝库"
          subtitle="生字闯关"
          color="#B79CFF"
          emoji="📖"
          progress={`今日语文：${chineseProgress}/${DAILY_GOAL} 关 · 第 ${chinesePos.level + 1}/${getChineseLevelsWithCustom().length} 关`}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/level/index?category=chinese&level=${chinesePos.level}&item=${chinesePos.item}`
            })
          }
        />
      </View>

      {wrongCount > 0 ? (
        <View className="mt-5">
          <View
            className="w-full rounded-3xl px-6 py-5 active:opacity-80"
            style={{ backgroundColor: '#FF6B6B' }}
            onClick={() => Taro.switchTab({ url: '/pages/wrongWords/index' })}
          >
            <View className="flex flex-row items-center gap-2">
              <Text className="text-2xl">👾</Text>
              <Text className="text-2xl font-extrabold text-white">消灭错字怪</Text>
            </View>
            <Text className="mt-2 block text-base font-semibold text-white opacity-90">
              还有 {wrongCount} 个错字怪等你消灭
            </Text>
          </View>
        </View>
      ) : null}

      <View className="mt-8 rounded-3xl bg-white px-6 py-5">
        <Text className="block text-base font-extrabold text-[#1E1E1E]">玩法</Text>
        <Text className="mt-2 block text-sm font-semibold text-[#5A5A5A]">
          先看识字卡片，再做一个小填空，答对就点亮一颗星星。
        </Text>
      </View>
    </View>
  )
}
