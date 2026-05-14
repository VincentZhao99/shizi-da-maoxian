import { View, Text } from '@tarojs/components'
import { useMemo, useState } from 'react'

export function LiteracyCard({
  hanzi,
  pinyin,
  words,
  sentence,
  onSpeak
}: {
  hanzi: string
  pinyin?: string
  words: string[]
  sentence: string
  onSpeak: () => void
}) {
  const [isFront, setIsFront] = useState(true)
  const wordsText = useMemo(() => words.join('、'), [words])

  return (
    <View className="w-full rounded-[28px] bg-white px-6 py-6 shadow-sm">
      {isFront ? (
        <View className="items-center" onClick={onSpeak}>
          <Text className="block text-[72px] font-extrabold text-[#1E1E1E]">{hanzi}</Text>
          {pinyin ? (
            <Text className="mt-2 block text-2xl font-bold text-[#5A5A5A]">{pinyin}</Text>
          ) : null}
          <Text className="mt-3 block text-sm font-semibold text-[#7A7A7A]">
            点一下提示
          </Text>
        </View>
      ) : (
        <View>
          <Text className="block text-base font-extrabold text-[#1E1E1E]">组词</Text>
          <Text className="mt-2 block text-lg font-bold text-[#5A5A5A]">{wordsText}</Text>
          <Text className="mt-5 block text-base font-extrabold text-[#1E1E1E]">造句</Text>
          <Text className="mt-2 block text-lg font-bold text-[#5A5A5A]">{sentence}</Text>
        </View>
      )}

      <View className="mt-6 flex flex-row justify-center">
        <View
          className="rounded-full bg-brand-blue px-6 py-3 active:opacity-80"
          onClick={() => setIsFront((v) => !v)}
        >
          <Text className="text-base font-extrabold text-white">{isFront ? '翻到背面' : '翻到正面'}</Text>
        </View>
      </View>
    </View>
  )
}
