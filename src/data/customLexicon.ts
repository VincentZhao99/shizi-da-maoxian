import Taro from '@tarojs/taro'
import { chineseLevels } from './lexicons'
import type { ChineseHanziItem, LexiconLevel } from './lexicons/types'

const CUSTOM_KEY = 'customLexicon'
const ITEMS_PER_LEVEL = 5

export function loadCustomItems(): ChineseHanziItem[] {
  try {
    const raw = Taro.getStorageSync(CUSTOM_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

function saveCustomItems(items: ChineseHanziItem[]) {
  Taro.setStorageSync(CUSTOM_KEY, JSON.stringify(items))
}

export function addCustomItem(item: ChineseHanziItem) {
  const items = loadCustomItems()
  items.push(item)
  saveCustomItems(items)
}

export function removeCustomItem(hanzi: string) {
  const items = loadCustomItems().filter((i) => i.hanzi !== hanzi)
  saveCustomItems(items)
}

export function buildCustomLevels(): Array<LexiconLevel<ChineseHanziItem>> {
  const items = loadCustomItems()
  if (items.length === 0) return []

  const levels: Array<LexiconLevel<ChineseHanziItem>> = []
  for (let i = 0; i < items.length; i += ITEMS_PER_LEVEL) {
    const num = levels.length + 1
    levels.push({
      id: `custom-${String(num).padStart(2, '0')}`,
      title: `自定义第${num}关`,
      items: items.slice(i, i + ITEMS_PER_LEVEL)
    })
  }
  return levels
}

export function getChineseLevelsWithCustom(): Array<LexiconLevel<ChineseHanziItem>> {
  return [...chineseLevels, ...buildCustomLevels()]
}
