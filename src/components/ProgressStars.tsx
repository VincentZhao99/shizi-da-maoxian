import { View, Text } from '@tarojs/components'
import { clampStars } from '../domain/progress'

export function ProgressStars({ total, value }: { total: number; value: number }) {
  const v = clampStars(value, total)

  return (
    <View className="flex flex-row items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <Text
          key={i}
          className={i < v ? 'text-2xl text-[#FFB300]' : 'text-2xl text-[#B0B0B0]'}
        >
          ★
        </Text>
      ))}
    </View>
  )
}

