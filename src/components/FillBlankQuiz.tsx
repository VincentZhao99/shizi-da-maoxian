import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import { isCorrectOption } from '../domain/quiz'

type Status = 'idle' | 'correct' | 'wrong'

export function FillBlankQuiz({
  sentence,
  options,
  correct,
  onPass,
  onNext,
  nextLabel = '下一题'
}: {
  sentence: string
  options: string[]
  correct: string
  onPass: () => void
  onNext?: () => void
  nextLabel?: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [passed, setPassed] = useState(false)

  return (
    <View className="w-full rounded-[28px] bg-white px-6 py-6 shadow-sm">
      <Text className="block text-base font-extrabold text-[#1E1E1E]">选字填空</Text>
      <Text className="mt-3 block text-xl font-extrabold text-[#2B2B2B]">{sentence}</Text>

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
