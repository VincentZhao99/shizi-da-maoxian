import { View, Text } from '@tarojs/components'
import { useMemo, useRef, useState } from 'react'
import { isCorrectOption } from '../domain/quiz'
import { SpeakerIcon } from './SpeakerIcon'
import { annotateSentence } from '../utils/pinyin'

type Status = 'idle' | 'correct' | 'wrong'

export function FillBlankQuiz({
  sentence,
  options,
  correct,
  onPass,
  onNext,
  nextLabel = '下一题',
  onSpeakSentence,
  isSpeaking = false,
  onWrong
}: {
  sentence: string
  options: string[]
  correct: string
  onPass: () => void
  onNext?: () => void
  nextLabel?: string
  onSpeakSentence?: () => void
  isSpeaking?: boolean
  onWrong?: () => void
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [passed, setPassed] = useState(false)
  const wrongReported = useRef(false)
  const chars = useMemo(() => annotateSentence(sentence), [sentence])

  return (
    <View className="w-full rounded-[28px] bg-white px-6 py-6 shadow-sm">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-base font-extrabold text-[#1E1E1E]">选字填空</Text>
        {onSpeakSentence ? (
          <SpeakerIcon isPlaying={isSpeaking} size="text-lg" onClick={onSpeakSentence} />
        ) : null}
      </View>

      <View className="mt-3 flex flex-row flex-wrap gap-x-2">
        {chars.map((item, i) => (
          <View key={i} className="items-center">
            <Text
              className={`text-xl font-extrabold ${
                isSpeaking ? 'text-[#3B82F6]' : item.char === '___' ? 'text-[#FF6B6B]' : 'text-[#2B2B2B]'
              }`}
            >
              {item.char}
            </Text>
            {item.char !== '___' ? (
              <Text className="block mt-0.5 leading-relaxed text-xs font-semibold text-[#9A9A9A]">
                {item.pinyin}
              </Text>
            ) : (
              <View className="block h-4" />
            )}
          </View>
        ))}
      </View>

      <View className="mt-5 flex flex-col gap-3">
        {options.map((opt) => (
          <View
            key={opt}
            className="rounded-2xl bg-brand-yellow px-5 py-4 active:opacity-80"
            onClick={() => {
              const ok = isCorrectOption(opt, correct)
              setStatus(ok ? 'correct' : 'wrong')
              if (ok && !passed) {
                setPassed(true)
                onPass()
              }
              if (!ok && !wrongReported.current) {
                wrongReported.current = true
                onWrong?.()
              }
            }}
          >
            <Text className="text-xl font-extrabold text-[#1E1E1E]">{opt}</Text>
          </View>
        ))}
      </View>

      {status === 'correct' ? (
        <View className="mt-5 rounded-2xl bg-[#D7FFE3] px-4 py-3">
          <Text className="text-base font-extrabold text-[#167A3A]">答对啦！拿到一颗星星</Text>
        </View>
      ) : null}

      {status === 'wrong' ? (
        <View className="mt-5 rounded-2xl bg-[#FFE1E1] px-4 py-3">
          <Text className="text-base font-extrabold text-[#A61B1B]">再试一次～</Text>
        </View>
      ) : null}

      {status === 'correct' && onNext ? (
        <View
          className="mt-4 rounded-2xl bg-brand-blue px-5 py-3 active:opacity-80"
          onClick={onNext}
        >
          <Text className="text-base font-extrabold text-white">{nextLabel}</Text>
        </View>
      ) : null}
    </View>
  )
}
