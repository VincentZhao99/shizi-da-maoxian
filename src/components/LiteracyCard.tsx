import { View, Text } from '@tarojs/components'
import { useMemo, useState } from 'react'
import { SpeakerIcon } from './SpeakerIcon'
import { StrokeAnimation } from './StrokeAnimation'
import { annotateSentence, getPinyin } from '../utils/pinyin'
import { getStrokeCount, getRadicalInfo } from '../utils/characterInfo'

export function LiteracyCard({
  hanzi,
  pinyin: pinyinProp,
  words,
  sentence,
  onSpeak,
  onSpeakSentence,
  onSpeakWords,
  speaking,
  category = 'chinese'
}: {
  hanzi: string
  pinyin?: string
  words: string[]
  sentence: string
  onSpeak: () => void
  onSpeakSentence: () => void
  onSpeakWords: () => void
  speaking: 'char' | 'sentence' | 'words' | null
  category?: 'chinese' | 'math'
}) {
  const [isFront, setIsFront] = useState(true)
  const wordsText = useMemo(() => words.join('、'), [words])
  const hanziPinyin = useMemo(
    () => pinyinProp || getPinyin(hanzi),
    [hanzi, pinyinProp]
  )
  const sentenceChars = useMemo(() => annotateSentence(sentence), [sentence])
  const strokeCount = useMemo(() => getStrokeCount(hanzi), [hanzi])
  const radicalInfo = useMemo(() => getRadicalInfo(hanzi), [hanzi])
  const isChinese = category === 'chinese'

  return (
    <View className="w-full rounded-[28px] bg-white px-6 py-6 shadow-sm">
      {isFront ? (
        isChinese ? (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
            <View style={{ flexShrink: 0 }}>
              <StrokeAnimation hanzi={hanzi} canvasSize={180} />
            </View>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px', minWidth: 0 }}>
              <View
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }}
                onClick={onSpeak}
              >
                <Text style={{ fontSize: '22px', fontWeight: 'bold', color: '#1E1E1E' }}>{hanziPinyin}</Text>
                <SpeakerIcon isPlaying={speaking === 'char'} size="text-xl" onClick={onSpeak} />
              </View>
              <View style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text style={{ fontSize: '14px', fontWeight: '600', color: '#5A5A5A' }}>笔画：{strokeCount}画</Text>
                {radicalInfo ? (
                  <>
                    <Text style={{ fontSize: '14px', fontWeight: '600', color: '#5A5A5A' }}>偏旁：{radicalInfo.radical}</Text>
                    <Text style={{ fontSize: '14px', fontWeight: '600', color: '#5A5A5A' }}>结构：{radicalInfo.struct}</Text>
                  </>
                ) : null}
              </View>
            </View>
          </View>
        ) : (
          <View style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <View
              onClick={onSpeak}
              style={{
                flexShrink: 0,
                width: '180px',
                height: '180px',
                borderRadius: '16px',
                backgroundColor: '#F5F0EB',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: '52px', fontWeight: 'bold', color: '#1E1E1E' }}>{hanzi}</Text>
              {hanziPinyin ? (
                <Text style={{ marginTop: '8px', fontSize: '18px', fontWeight: 'bold', color: '#5A5A5A' }}>{hanziPinyin}</Text>
              ) : null}
            </View>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', minWidth: 0 }}>
              <View onClick={onSpeak}>
                <SpeakerIcon isPlaying={speaking === 'char'} size="text-xl" onClick={onSpeak} />
              </View>
              <Text style={{ fontSize: '14px', fontWeight: '600', color: '#5A5A5A', lineHeight: '22px' }}>
                {sentence}
              </Text>
            </View>
          </View>
        )
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
