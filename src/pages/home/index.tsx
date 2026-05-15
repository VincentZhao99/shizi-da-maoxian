import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { CategoryCard } from '../../components/CategoryCard'
import { ProgressStars } from '../../components/ProgressStars'
import { mathLevels } from '../../data/lexicons'
import { getProgressKey, getStarsKey } from '../../domain/progress'
import { loadWrongWords } from '../../domain/wrongWords'
import { getChineseLevelsWithCustom } from '../../data/customLexicon'

const TOTAL_STARS = 5

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
  const [stars, setStars] = useState(0)
  const [mathPos, setMathPos] = useState(() => loadPosition('math'))
  const [chinesePos, setChinesePos] = useState(() => loadPosition('chinese'))
  const [wrongCount, setWrongCount] = useState(0)
  const [welcome] = useState(() => getWelcomeMessage())

  useDidShow(() => {
    const v = Number(Taro.getStorageSync(getStarsKey()) || 0)
    setStars(Number.isFinite(v) ? v : 0)
    setMathPos(loadPosition('math'))
    setChinesePos(loadPosition('chinese'))
    setWrongCount(loadWrongWords().length)
  })

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

      <View className="mt-4 items-center">
        <ProgressStars total={TOTAL_STARS} value={stars} />
        <Text className="mt-2 block text-sm font-bold text-[#5A5A5A]">
          今日进度：{stars}/{TOTAL_STARS}
        </Text>
      </View>

      <View className="mt-7 flex flex-col gap-4">
        <CategoryCard
          title="数学探险"
          subtitle="功能字闯关"
          color="#5CC8FF"
          emoji="🧮"
          progress={`第 ${mathPos.level + 1}/${mathLevels.length} 关`}
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
          progress={`第 ${chinesePos.level + 1}/${getChineseLevelsWithCustom().length} 关`}
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
            onClick={() => Taro.navigateTo({ url: '/pages/wrongWords/index' })}
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
