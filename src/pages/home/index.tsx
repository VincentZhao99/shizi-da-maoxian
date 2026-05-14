import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { CategoryCard } from '../../components/CategoryCard'
import { ProgressStars } from '../../components/ProgressStars'

const TOTAL_STARS = 5
const STORAGE_KEY = 'todayStars'

export default function Home() {
  const [stars, setStars] = useState(0)

  useDidShow(() => {
    const v = Number(Taro.getStorageSync(STORAGE_KEY) || 0)
    setStars(Number.isFinite(v) ? v : 0)
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
          onClick={() => Taro.navigateTo({ url: '/pages/level/index?category=math&level=0&item=0' })}
        />
        <CategoryCard
          title="语文宝库"
          subtitle="生字闯关"
          color="#B79CFF"
          onClick={() => Taro.navigateTo({ url: '/pages/level/index?category=chinese&level=0&item=0' })}
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
