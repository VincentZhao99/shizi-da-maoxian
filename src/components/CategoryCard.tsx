import { View, Text } from '@tarojs/components'

export function CategoryCard({
  title,
  subtitle,
  color,
  progress,
  onClick
}: {
  title: string
  subtitle: string
  color: string
  progress?: string
  onClick: () => void
}) {
  return (
    <View
      className="w-full rounded-3xl px-6 py-5 active:opacity-80"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <Text className="block text-2xl font-extrabold text-[#1E1E1E]">{title}</Text>
      <Text className="mt-2 block text-base font-semibold text-[#1E1E1E] opacity-80">
        {subtitle}
      </Text>
      {progress ? (
        <Text className="mt-2 block text-sm font-bold text-[#1E1E1E] opacity-70">
          {progress}
        </Text>
      ) : null}
    </View>
  )
}

