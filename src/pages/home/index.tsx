import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CategoryCard } from '../../components/CategoryCard'
import { mathLevels } from '../../data/lexicons'
import { DAILY_GOAL, getProgressKey, getStarsKey, getTotalStars, loadStreak, tryRecordStreak } from '../../domain/progress'
import { loadWrongWords } from '../../domain/wrongWords'
import { getChineseLevelsWithCustom } from '../../data/customLexicon'

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

const CONFETTI_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8E53', '#C084FC']

function Confetti() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.8,
      size: 5 + Math.random() * 6,
      duration: 1.5 + Math.random() * 1.5
    }))
  }, [])

  return (
    <View className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
      {particles.map((p) => (
        <View
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: '-12px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`
          }}
        />
      ))}
    </View>
  )
}

const GREETINGS = [
  '开始今天的探险吧！',
  '今天要收集好多星星哦！',
  '快来和汉字交朋友吧！',
  '冲冲冲，去闯关啦！',
]

function getGreeting(): string {
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
  const [totalStars, setTotalStars] = useState(() => getTotalStars())
  const [greeting] = useState(() => getGreeting())
  const streakRecorded = useRef(false)

  useDidShow(() => {
    const m = Number(Taro.getStorageSync(getStarsKey('math')) || 0)
    setMathProgress(Number.isFinite(m) ? Math.min(m, DAILY_GOAL) : 0)
    const c = Number(Taro.getStorageSync(getStarsKey('chinese')) || 0)
    setChineseProgress(Number.isFinite(c) ? Math.min(c, DAILY_GOAL) : 0)
    setMathPos(loadPosition('math'))
    setChinesePos(loadPosition('chinese'))
    setWrongCount(loadWrongWords().length)
    setTotalStars(getTotalStars())
    setStreak(loadStreak().count)
  })

  const bothDone = mathProgress >= DAILY_GOAL && chineseProgress >= DAILY_GOAL

  useEffect(() => {
    if (bothDone && !streakRecorded.current) {
      streakRecorded.current = true
      const count = tryRecordStreak()
      setStreak(count)
    }
  }, [bothDone])

  function handleStart() {
    if (mathProgress < DAILY_GOAL) {
      Taro.navigateTo({
        url: `/pages/level/index?category=math&level=${mathPos.level}&item=${mathPos.item}`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/level/index?category=chinese&level=${chinesePos.level}&item=${chinesePos.item}`
      })
    }
  }

  const chineseLevels = useMemo(() => getChineseLevelsWithCustom(), [])

  return (
    <View className="min-h-screen bg-[#FFF3D6] px-5 py-6 relative" style={{ paddingBottom: '100px' }}>
      {/* Header — stats only (nav bar already shows "识字大冒险") */}
      <View
        className="flex flex-row items-center justify-center gap-6"
        onLongPress={() => Taro.navigateTo({ url: '/pages/parent/index' })}
      >
        <View className="flex flex-row items-center gap-1">
          <Text className="text-xl text-[#FFB300]">★</Text>
          <Text className="text-lg font-extrabold text-[#FF8C00]">{totalStars}</Text>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text className="text-lg">🔥</Text>
          <Text className="text-lg font-extrabold text-[#FF6B6B]">连签 {streak} 天</Text>
        </View>
      </View>

      {/* Main Action Area */}
      <View className="mt-6 flex flex-col items-center">
        {bothDone ? (
          <View className="relative w-full rounded-2xl bg-[#FFD700] px-5 py-5 text-center overflow-hidden">
            <Confetti />
            <Text className="text-2xl font-extrabold text-[#1E1E1E] relative" style={{ zIndex: 11 }}>
              🎉 今日探险全部完成！ 🎉
            </Text>
          </View>
        ) : (
          <View
            className="rounded-full active:opacity-85 flex items-center justify-center"
            style={{
              width: '80%',
              background: 'linear-gradient(135deg, #FF8E53, #FF6B6B, #C084FC)',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}
            onClick={handleStart}
          >
            <Text className="text-xl font-extrabold text-white">🐾 {greeting}</Text>
          </View>
        )}
      </View>

      {/* Category Cards */}
      <View className="mt-5 flex flex-col gap-4">
        <CategoryCard
          title="数学探险"
          subtitle="功能字闯关"
          color="#5CC8FF"
          emoji="🔢"
          starCount={mathProgress}
          dailyGoal={DAILY_GOAL}
          currentLevel={mathPos.level + 1}
          totalLevels={mathLevels.length}
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
          starCount={chineseProgress}
          dailyGoal={DAILY_GOAL}
          currentLevel={chinesePos.level + 1}
          totalLevels={chineseLevels.length}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/level/index?category=chinese&level=${chinesePos.level}&item=${chinesePos.item}`
            })
          }
        />
      </View>

      {/* Wrong Words Banner */}
      {wrongCount > 0 ? (
        <View className="mt-4">
          <View
            className="w-full rounded-2xl px-5 py-4 active:opacity-80"
            style={{ backgroundColor: '#FF6B6B' }}
            onClick={() => Taro.switchTab({ url: '/pages/wrongWords/index' })}
          >
            <View className="flex flex-row items-center gap-2">
              <Text className="text-xl">👾</Text>
              <Text className="text-xl font-extrabold text-white">消灭错字怪</Text>
            </View>
            <Text className="mt-1 block text-sm font-semibold text-white opacity-90">
              还有 {wrongCount} 个错字怪等你消灭
            </Text>
          </View>
        </View>
      ) : null}

    </View>
  )
}
