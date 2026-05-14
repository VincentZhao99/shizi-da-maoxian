import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { CategoryCard } from '../../components/CategoryCard'
import { ProgressStars } from '../../components/ProgressStars'
import { chineseLevels, mathLevels } from '../../data/lexicons'
import { getProgressKey, getStarsKey } from '../../domain/progress'

const TOTAL_STARS = 5

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

export default function Home() {
  const [stars, setStars] = useState(0)
  const [mathPos, setMathPos] = useState(() => loadPosition('math'))
  const [chinesePos, setChinesePos] = useState(() => loadPosition('chinese'))

  useDidShow(() => {
    const v = Number(Taro.getStorageSync(getStarsKey()) || 0)
    setStars(Number.isFinite(v) ? v : 0)
    setMathPos(loadPosition('math'))
    setChinesePos(loadPosition('chinese'))
  })

  return (
    <View className="min-h-screen bg-[#FFF3D6] px-6 py-8">
      <Text className="block text-center text-[40px] font-extrabold text-[#1E1E1E]">
        识字大冒险
      </Text>

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
          progress={`第 ${chinesePos.level + 1}/${chineseLevels.length} 关`}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/level/index?category=chinese&level=${chinesePos.level}&item=${chinesePos.item}`
            })
          }
        />
      </View>

      <View className="mt-8 rounded-3xl bg-white px-6 py-5">
        <Text className="block text-base font-extrabold text-[#1E1E1E]">玩法</Text>
        <Text className="mt-2 block text-sm font-semibold text-[#5A5A5A]">
          先看识字卡片，再做一个小填空，答对就点亮一颗星星。
        </Text>
      </View>
    </View>
  )
}
