import { View, Text } from '@tarojs/components'

export function CategoryCard({
  title,
  subtitle,
  color,
  emoji,
  onClick,
  starCount,
  dailyGoal,
  currentLevel,
  totalLevels
}: {
  title: string
  subtitle: string
  color: string
  emoji?: string
  onClick: () => void
  starCount: number
  dailyGoal: number
  currentLevel: number
  totalLevels: number
}) {
  const stars: string[] = []
  for (let i = 0; i < dailyGoal; i++) {
    stars.push(i < starCount ? '⭐' : '☆')
  }

  const levelPercent = totalLevels > 0 ? Math.round((currentLevel / totalLevels) * 100) : 0

  return (
    <View
      className="w-full rounded-3xl px-5 py-5 active:opacity-85"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <View className="flex flex-row items-center gap-3">
        <Text className="text-4xl">{emoji}</Text>
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-[#1E1E1E]">{title}</Text>
          <Text className="mt-0.5 block text-sm font-semibold text-[#1E1E1E] opacity-60">
            {subtitle}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex flex-row items-center gap-1">
        {stars.map((s, i) => (
          <Text key={i} className="text-lg">{s}</Text>
        ))}
        <Text className="ml-2 text-sm font-bold text-[#1E1E1E] opacity-60">
          今日 {starCount}/{dailyGoal}
        </Text>
      </View>

      <View className="mt-3 flex flex-row items-center gap-2">
        <View className="h-2 flex-1 rounded-full bg-white/60 overflow-hidden">
          <View
            className="h-full rounded-full bg-white"
            style={{ width: `${levelPercent}%` }}
          />
        </View>
        <Text className="text-sm font-bold text-[#1E1E1E] opacity-60">
          第 {currentLevel}/{totalLevels} 关
        </Text>
      </View>
    </View>
  )
}
