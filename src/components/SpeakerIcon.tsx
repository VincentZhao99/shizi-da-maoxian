import { View, Text } from '@tarojs/components'

export function SpeakerIcon({
  isPlaying,
  size = 'text-2xl',
  onClick
}: {
  isPlaying: boolean
  size?: string
  onClick: () => void
}) {
  return (
    <View
      className={`inline-flex items-center justify-center active:opacity-70 ${isPlaying ? 'animate-speaker' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <Text className={size}>{isPlaying ? '🔊' : '🔈'}</Text>
    </View>
  )
}
