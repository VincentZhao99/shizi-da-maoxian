import { View, Text } from '@tarojs/components'
import { useMemo, useState } from 'react'
import { SpeakerIcon } from './SpeakerIcon'
import { annotateSentence, getPinyin } from '../utils/pinyin'

export function LiteracyCard({
  hanzi,
  pinyin: pinyinProp,
  words,
  sentence,
  onSpeak,
  onSpeakSentence,
  onSpeakWords,
  speaking
}: {
  hanzi: string
  pinyin?: string
  words: string[]
  sentence: string
  onSpeak: () => void
  onSpeakSentence: () => void
  onSpeakWords: () => void
  speaking: 'char' | 'sentence' | 'words' | null
}) {
  const [isFront, setIsFront] = useState(true)
  const wordsText = useMemo(() => words.join('、'), [words])
  const hanziPinyin = useMemo(
    () => pinyinProp || getPinyin(hanzi),
    [hanzi, pinyinProp]
  )
  const sentenceChars = useMemo(() => annotateSentence(sentence), [sentence])

  return (
    <View className="w-full rounded-[28px] bg-white px-6 py-6 shadow-sm">
      {isFront ? (
        <View className="flex flex-col items-center">
          <View className="items-center" onClick={onSpeak}>
            <Text className="block text-[72px] font-extrabold text-[#1E1E1E]">{hanzi}</Text>
            <Text className="mt-2 block text-2xl font-bold text-[#5A5A5A]">{hanziPinyin}</Text>
          </View>
          <View className="mt-3 flex flex-row items-center justify-center gap-2" onClick={onSpeak}>
            <SpeakerIcon
              isPlaying={speaking === 'char'}
              size="text-3xl"
              onClick={onSpeak}
            />
            <Text className="text-sm font-semibold text-[#7A7A7A]">
              点一下听发音
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-base font-extrabold text-[#1E1E1E]">组词</Text>
            <SpeakerIcon
              isPlaying={speaking === 'words'}
              size="text-lg"
              onClick={onSpeakWords}
            />
          </View>
          <Text
            className={`mt-2 inline-block text-lg font-bold active:opacity-80 ${
              speaking === 'words' ? 'text-[#3B82F6]' : 'text-[#5A5A5A]'
            }`}
            onClick={onSpeakWords}
          >
            {wordsText}
          </Text>
          <View className="mt-5 flex flex-row items-center gap-2">
            <Text className="text-base font-extrabold text-[#1E1E1E]">造句</Text>
            <SpeakerIcon
              isPlaying={speaking === 'sentence'}
              size="text-lg"
              onClick={onSpeakSentence}
            />
          </View>
          <View
            className={`mt-2 inline-block rounded-lg px-2 py-1 active:opacity-80 ${
              speaking === 'sentence' ? 'bg-[#E0EEFF]' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation()
              onSpeakSentence()
            }}
          >
            <View className="flex flex-row flex-wrap gap-x-2">
              {sentenceChars.map((item, i) => (
                <View key={i} className="items-center">
                  <Text
                    className={`text-lg font-bold ${
                      speaking === 'sentence' ? 'text-[#3B82F6]' : 'text-[#5A5A5A]'
                    }`}
                  >
                    {item.char}
                  </Text>
                  <Text className="block text-xs font-semibold text-[#9A9A9A]">
                    {item.pinyin}
                  </Text>
                </View>
              ))}
            </View>
          </View>
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
