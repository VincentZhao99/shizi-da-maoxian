import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import {
  getAllSkins,
  getOwnedSkinIds,
  canExchange,
  exchangeSkin,
  getActiveSkinId,
} from '../../domain/skins'
import { getTotalStars } from '../../domain/progress'

export default function Shop() {
  const [totalStars, setTotalStars] = useState(() => getTotalStars())
  const [ownedIds, setOwnedIds] = useState<string[]>(() => getOwnedSkinIds())
  const [activeSkinId, setActiveSkinId] = useState<string | null>(() => getActiveSkinId())
  const [confirmId, setConfirmId] = useState<string | null>(null)

  useDidShow(() => {
    setTotalStars(getTotalStars())
    setOwnedIds(getOwnedSkinIds())
    setActiveSkinId(getActiveSkinId())
  })

  const skins = getAllSkins()

  function handleClick(skinId: string) {
    const owned = getOwnedSkinIds()
    if (owned.includes(skinId)) {
      Taro.showToast({ title: '已拥有', icon: 'none' })
      return
    }
    setConfirmId(skinId)
  }

  function handleCancel() {
    setConfirmId(null)
  }

  function handleConfirm() {
    if (!confirmId) return
    const result = exchangeSkin(confirmId)
    if (!result.ok) {
      if (result.reason === 'insufficient_stars') {
        Taro.showToast({ title: '星星不足，快去闯关吧！', icon: 'none' })
      } else {
        Taro.showToast({ title: '兑换失败', icon: 'none' })
      }
    } else {
      Taro.showToast({ title: '兑换成功！', icon: 'success' })
      setTotalStars(getTotalStars())
      setOwnedIds(getOwnedSkinIds())
      setActiveSkinId(getActiveSkinId())
    }
    setConfirmId(null)
  }

  function getStarNeeded(skinId: string): number {
    const skin = skins.find((s) => s.id === skinId)
    if (!skin) return 0
    const result = canExchange(skinId, totalStars, getOwnedSkinIds())
    if (result.ok) return 0
    return Math.max(0, skin.price - totalStars)
  }

  return (
    <View className="min-h-screen bg-[#FFF3D6] px-5 py-6">
      <View className="mb-4 flex flex-row items-center justify-between">
        <Text className="text-2xl font-extrabold text-[#1E1E1E]">星星商城</Text>
        <View className="flex flex-row items-center gap-1">
          <Text className="text-xl text-[#FFB300]">★</Text>
          <Text className="text-lg font-extrabold text-[#FF8C00]">{totalStars}</Text>
        </View>
      </View>

      <View className="flex flex-col gap-4">
        {skins.map((skin) => {
          const owned = ownedIds.includes(skin.id)
          const active = activeSkinId === skin.id
          const result = canExchange(skin.id, totalStars, ownedIds)
          const affordable = result.ok

          return (
            <View
              key={skin.id}
              className="rounded-2xl bg-white px-5 py-4 active:opacity-85"
              style={{ border: active ? '3px solid #FFB300' : '2px solid transparent' }}
              onClick={() => handleClick(skin.id)}
            >
              <View className="flex flex-row items-center gap-4">
                <View
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: skin.primaryColor + '20' }}
                >
                  <Text className="text-3xl">{skin.trainIcon}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-lg font-extrabold text-[#1E1E1E]">{skin.name}</Text>
                    {active ? (
                      <Text className="rounded-full bg-[#FFB300] px-2 py-0.5 text-xs font-bold text-white">
                        使用中
                      </Text>
                    ) : owned ? (
                      <Text className="rounded-full bg-[#E8E8E8] px-2 py-0.5 text-xs font-bold text-[#9A9A9A]">
                        已拥有
                      </Text>
                    ) : null}
                  </View>
                  <Text className="mt-0.5 text-sm font-semibold text-[#9A9A9A]">
                    {skin.type === 'achievement' ? '成就解锁' : '火车皮肤'}
                  </Text>
                  <View className="mt-2 flex flex-row items-center gap-2">
                    <Text className="text-xl text-[#FFB300]">★</Text>
                    <Text
                      className={`text-lg font-extrabold ${
                        affordable && !owned ? 'text-[#FF8C00]' : 'text-[#CCC]'
                      }`}
                    >
                      {skin.price}
                    </Text>
                  </View>
                </View>
                {owned ? (
                  <View className="rounded-full bg-[#E8F5E9] px-4 py-2">
                    <Text className="text-sm font-extrabold text-[#4CAF50]">✓</Text>
                  </View>
                ) : affordable ? (
                  <View className="rounded-full bg-[#FFD93D] px-4 py-2">
                    <Text className="text-sm font-extrabold text-[#1E1E1E]">兑换</Text>
                  </View>
                ) : (
                  <View className="rounded-full bg-[#E8E8E8] px-4 py-2">
                    <Text className="text-sm font-extrabold text-[#9A9A9A]">
                      差 {getStarNeeded(skin.id)} ★
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )
        })}
      </View>

      {confirmId ? (
        <View
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '300px'
            }}
          >
            <Text className="text-5xl mb-3">
              {skins.find((s) => s.id === confirmId)?.trainIcon ?? '🎨'}
            </Text>
            <Text className="text-xl font-extrabold text-[#1E1E1E]">
              确认兑换「{skins.find((s) => s.id === confirmId)?.name ?? ''}」？
            </Text>
            <Text className="mt-2 text-sm font-semibold text-[#9A9A9A]">
              将消耗 {skins.find((s) => s.id === confirmId)?.price ?? 0} 颗星星
            </Text>
            <View className="mt-6 flex flex-row gap-4 w-full">
              <View
                className="flex-1 rounded-full bg-[#E8E8E8] py-3 active:opacity-80"
                onClick={handleCancel}
              >
                <Text className="block text-center text-base font-extrabold text-[#5A5A5A]">
                  取消
                </Text>
              </View>
              <View
                className="flex-1 rounded-full py-3 active:opacity-80"
                style={{ backgroundColor: '#FFD93D' }}
                onClick={handleConfirm}
              >
                <Text className="block text-center text-base font-extrabold text-[#1E1E1E]">
                  确认兑换
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}

      <View className="mt-8 flex justify-center">
        <View
          className="rounded-full bg-[#FFD66E] px-8 py-4 active:opacity-80"
          onClick={() => Taro.navigateBack()}
        >
          <Text className="text-base font-extrabold text-[#1E1E1E]">返回</Text>
        </View>
      </View>
    </View>
  )
}
