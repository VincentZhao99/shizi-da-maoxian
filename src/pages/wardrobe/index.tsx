import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import {
  getAllSkins,
  getOwnedSkinIds,
  getActiveSkinId,
  switchSkin,
} from '../../domain/skins'

export default function Wardrobe() {
  const [ownedIds, setOwnedIds] = useState<string[]>(() => getOwnedSkinIds())
  const [activeSkinId, setActiveSkinId] = useState<string | null>(() => getActiveSkinId())

  useDidShow(() => {
    setOwnedIds(getOwnedSkinIds())
    setActiveSkinId(getActiveSkinId())
  })

  const ownedSkins = getAllSkins().filter((s) => ownedIds.includes(s.id))

  function handleSwitch(skinId: string) {
    switchSkin(skinId)
    setActiveSkinId(skinId)
    Taro.showToast({ title: '已切换', icon: 'success' })
  }

  function handleUseDefault() {
    switchSkin('')
    setActiveSkinId(null)
    Taro.showToast({ title: '已恢复默认', icon: 'success' })
  }

  return (
    <View className="min-h-screen bg-[#FFF3D6] px-5 py-6">
      <Text className="block text-center text-2xl font-extrabold text-[#1E1E1E]">我的装扮</Text>

      {ownedSkins.length === 0 ? (
        <View className="mt-20 flex flex-col items-center gap-4">
          <Text className="text-4xl">🎨</Text>
          <Text className="text-lg font-semibold text-[#9A9A9A]">
            还没有装扮，去星星商城兑换吧！
          </Text>
          <View
            className="rounded-full bg-[#FFD93D] px-8 py-4 active:opacity-80"
            onClick={() => Taro.navigateTo({ url: '/pages/shop/index' })}
          >
            <Text className="text-base font-extrabold text-[#1E1E1E]">去商城</Text>
          </View>
        </View>
      ) : (
        <>
          <View className="mt-4 mb-2">
            <View
              className="rounded-2xl px-5 py-4 active:opacity-85"
              style={{
                backgroundColor: '#FFFFFF',
                border: !activeSkinId ? '3px solid #FFB300' : '2px solid transparent'
              }}
              onClick={handleUseDefault}
            >
              <View className="flex flex-row items-center gap-4">
                <View className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D6]">
                  <Text className="text-3xl">🚂</Text>
                </View>
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-lg font-extrabold text-[#1E1E1E]">经典小火车</Text>
                    {!activeSkinId ? (
                      <Text className="rounded-full bg-[#FFB300] px-2 py-0.5 text-xs font-bold text-white">
                        使用中
                      </Text>
                    ) : null}
                  </View>
                  <Text className="mt-0.5 text-sm font-semibold text-[#9A9A9A]">
                    默认皮肤
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-3">
            {ownedSkins.map((skin) => {
              const active = activeSkinId === skin.id
              return (
                <View
                  key={skin.id}
                  className="rounded-2xl bg-white px-5 py-4 active:opacity-85"
                  style={{ border: active ? '3px solid #FFB300' : '2px solid transparent' }}
                  onClick={() => handleSwitch(skin.id)}
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
                        ) : null}
                      </View>
                      <View className="mt-1 flex flex-row gap-1">
                        <View
                          className="rounded-full px-3 py-0.5"
                          style={{ backgroundColor: skin.primaryColor + '30' }}
                        >
                          <Text className="text-xs font-bold" style={{ color: skin.primaryColor }}>
                            主色
                          </Text>
                        </View>
                        <View
                          className="rounded-full px-3 py-0.5"
                          style={{ backgroundColor: skin.secondaryColor + '30' }}
                        >
                          <Text
                            className="text-xs font-bold"
                            style={{ color: skin.secondaryColor }}
                          >
                            辅色
                          </Text>
                        </View>
                      </View>
                    </View>
                    {active ? null : (
                      <View className="rounded-full bg-[#FFD93D] px-4 py-2">
                        <Text className="text-sm font-extrabold text-[#1E1E1E]">使用</Text>
                      </View>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        </>
      )}

      <View className="mt-8 flex flex-row justify-center gap-4">
        <View
          className="rounded-full bg-[#FFD66E] px-8 py-4 active:opacity-80"
          onClick={() => Taro.navigateTo({ url: '/pages/shop/index' })}
        >
          <Text className="text-base font-extrabold text-[#1E1E1E]">去商城兑换更多</Text>
        </View>
        <View
          className="rounded-full bg-[#E8E8E8] px-8 py-4 active:opacity-80"
          onClick={() => Taro.navigateBack()}
        >
          <Text className="text-base font-extrabold text-[#5A5A5A]">返回</Text>
        </View>
      </View>
    </View>
  )
}
