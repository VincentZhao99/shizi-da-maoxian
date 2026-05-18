import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { DAILY_GOAL, getStarsKey, getTotalStars, loadStreak } from '../../domain/progress'

export default function Profile() {
  const [totalStars, setTotalStars] = useState(() => getTotalStars())
  const [streak, setStreak] = useState(() => loadStreak().count)
  const [todayMath, setTodayMath] = useState(0)
  const [todayChinese, setTodayChinese] = useState(0)

  useDidShow(() => {
    setTotalStars(getTotalStars())
    setStreak(loadStreak().count)
    const m = Number(Taro.getStorageSync(getStarsKey('math')) || 0)
    setTodayMath(Number.isFinite(m) ? Math.min(m, DAILY_GOAL) : 0)
    const c = Number(Taro.getStorageSync(getStarsKey('chinese')) || 0)
    setTodayChinese(Number.isFinite(c) ? Math.min(c, DAILY_GOAL) : 0)
  })

  return (
    <View className="min-h-screen bg-[#F5F5F5] px-6 py-7" style={{ paddingBottom: '100px' }}>
      <Text className="block text-center text-2xl font-extrabold text-[#1E1E1E]">我的</Text>

      <View className="mt-6 flex flex-col gap-4">
        <View className="rounded-2xl bg-white px-6 py-5">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-bold text-[#9A9A9A]">累计星星</Text>
              <Text className="mt-1 text-4xl font-extrabold text-[#FFB300]">{totalStars}</Text>
            </View>
            <Text className="text-5xl">⭐</Text>
          </View>
        </View>

        <View className="rounded-2xl bg-white px-6 py-5">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-bold text-[#9A9A9A]">连续打卡</Text>
              <Text className="mt-1 text-4xl font-extrabold text-[#1E1E1E]">{streak} 天</Text>
            </View>
            <Text className="text-5xl">🔥</Text>
          </View>
        </View>

        <View className="rounded-2xl bg-white px-6 py-5">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-bold text-[#9A9A9A]">今日进度</Text>
              <View className="mt-1 flex flex-row gap-4">
                <Text className="text-lg font-extrabold text-[#5CC8FF]">数学 {todayMath}/{DAILY_GOAL}</Text>
                <Text className="text-lg font-extrabold text-[#B79CFF]">语文 {todayChinese}/{DAILY_GOAL}</Text>
              </View>
            </View>
            <Text className="text-5xl">🏆</Text>
          </View>
        </View>
      </View>

      <View className="mt-8 flex justify-center">
        <View
          className="rounded-full px-8 py-3 active:opacity-80"
          style={{ backgroundColor: '#FFD66E' }}
          onLongPress={() => Taro.navigateTo({ url: '/pages/parent/index' })}
        >
          <Text className="text-base font-extrabold text-[#1E1E1E]">家长管理</Text>
          <Text className="mt-0.5 block text-xs font-semibold text-[#5A5A5A]">长按进入</Text>
        </View>
      </View>
    </View>
  )
}
