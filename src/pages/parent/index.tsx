import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { useMemo, useState } from 'react'
import { addCustomItem, loadCustomItems, removeCustomItem } from '../../data/customLexicon'
import { getPinyin } from '../../utils/pinyin'

export default function Parent() {
  const [hanzi, setHanzi] = useState('')
  const [sentence, setSentence] = useState('')
  const [items, setItems] = useState(() => loadCustomItems())

  useDidShow(() => {
    setItems(loadCustomItems())
  })

  const autoPinyin = useMemo(() => {
    if (!hanzi.trim()) return ''
    return getPinyin(hanzi.trim())
  }, [hanzi])

  const previewWords = useMemo(() => {
    if (!hanzi.trim()) return ''
    return hanzi.trim()
  }, [hanzi])

  const canSubmit = hanzi.trim() && sentence.trim() && sentence.includes(hanzi.trim())

  function handleSubmit() {
    if (!hanzi.trim()) {
      Taro.showToast({ title: '请输入生字', icon: 'none' })
      return
    }
    if (!sentence.trim()) {
      Taro.showToast({ title: '请输入造句', icon: 'none' })
      return
    }
    if (!sentence.includes(hanzi.trim())) {
      Taro.showToast({ title: '造句中必须包含该生字', icon: 'none' })
      return
    }
    addCustomItem({
      hanzi: hanzi.trim(),
      pinyin: autoPinyin,
      words: [previewWords],
      sentence: sentence.trim()
    })
    setHanzi('')
    setSentence('')
    setItems(loadCustomItems())
    Taro.showToast({ title: '添加成功', icon: 'success' })
  }

  function handleDelete(h: string) {
    removeCustomItem(h)
    setItems(loadCustomItems())
  }

  return (
    <View className="min-h-screen bg-[#F5F5F5] px-6 py-7">
      <Text className="block text-center text-2xl font-extrabold text-[#1E1E1E]">家长管理</Text>
      <Text className="mt-1 block text-center text-sm font-semibold text-[#9A9A9A]">
        只需输入生字和造句，拼音自动生成
      </Text>

      <View className="mt-6 rounded-2xl bg-white px-5 py-5">
        <View className="mb-4">
          <Text className="block text-sm font-extrabold text-[#5A5A5A] mb-1">生字</Text>
          <Input
            className="w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-base"
            value={hanzi}
            onInput={(e) => setHanzi(e.detail.value)}
            placeholder="输入一个汉字，如：龙"
            maxlength={5}
          />
        </View>

        <View className="mb-4">
          <Text className="block text-sm font-extrabold text-[#5A5A5A] mb-1">造句</Text>
          <Input
            className="w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-base"
            value={sentence}
            onInput={(e) => setSentence(e.detail.value)}
            placeholder="包含该生字的一句话，如：端午节我们一起划龙舟。"
          />
        </View>

        {hanzi.trim() ? (
          <View className="mb-5 rounded-xl bg-[#F0F8FF] px-4 py-3">
            <Text className="block text-xs font-extrabold text-[#9A9A9A] mb-1">预览</Text>
            <View className="flex flex-row items-baseline gap-2">
              <Text className="text-2xl font-extrabold text-[#1E1E1E]">{hanzi.trim()}</Text>
              <Text className="text-lg font-bold text-[#5A5A5A]">{autoPinyin}</Text>
            </View>
            {sentence.trim() && hanzi.trim() && !sentence.includes(hanzi.trim()) ? (
              <Text className="mt-1 block text-xs font-semibold text-[#FF6B6B]">
                造句中未包含生字「{hanzi.trim()}」
              </Text>
            ) : null}
          </View>
        ) : null}

        <View
          className={`rounded-full px-6 py-3 active:opacity-80 ${
            canSubmit ? 'bg-brand-blue' : 'bg-[#CCC]'
          }`}
          onClick={canSubmit ? handleSubmit : undefined}
        >
          <Text className="block text-center text-base font-extrabold text-white">添加生字</Text>
        </View>
      </View>

      {items.length > 0 ? (
        <View className="mt-6 rounded-2xl bg-white px-5 py-5">
          <Text className="block text-base font-extrabold text-[#1E1E1E] mb-3">
            已添加（{items.length} 个）
          </Text>
          {items.map((item) => (
            <View
              key={item.hanzi}
              className="flex flex-row items-center justify-between border-b border-[#E8E8E8] py-3"
            >
              <View className="flex flex-col gap-1">
                <Text className="text-lg font-extrabold text-[#1E1E1E]">
                  {item.hanzi}
                  <Text className="ml-2 text-sm font-semibold text-[#9A9A9A]">{item.pinyin}</Text>
                </Text>
                <Text className="text-sm font-semibold text-[#5A5A5A]">
                  {item.words.join('、')}
                </Text>
                <Text className="text-xs text-[#9A9A9A]">{item.sentence}</Text>
              </View>
              <View
                className="rounded-full bg-[#FFE1E1] px-4 py-2 active:opacity-80"
                onClick={() => handleDelete(item.hanzi)}
              >
                <Text className="text-sm font-extrabold text-[#A61B1B]">删除</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="mt-6 rounded-2xl bg-white px-5 py-5">
          <Text className="block text-center text-sm font-semibold text-[#9A9A9A]">
            暂无自定义生字
          </Text>
        </View>
      )}

      <View className="mt-6 flex justify-center">
        <View
          className="rounded-full bg-brand-peach px-8 py-4 active:opacity-80"
          onClick={() => Taro.navigateBack()}
        >
          <Text className="text-base font-extrabold text-[#1E1E1E]">返回</Text>
        </View>
      </View>
    </View>
  )
}
