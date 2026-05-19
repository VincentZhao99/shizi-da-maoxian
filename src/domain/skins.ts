import Taro from '@tarojs/taro'
import { allSkins } from '../data/skins'
import type { Skin } from '../data/skins/types'

export function getAllSkins(): Skin[] {
  return allSkins
}

export function getSkinById(id: string): Skin | undefined {
  return allSkins.find((s) => s.id === id)
}

export function isSkinOwned(skinId: string, ownedIds: string[]): boolean {
  return ownedIds.includes(skinId)
}

export type ExchangeResult =
  | { ok: true }
  | { ok: false; reason: 'insufficient_stars' | 'already_owned' | 'not_found' }

export function canExchange(
  skinId: string,
  totalStars: number,
  ownedIds: string[]
): ExchangeResult {
  const skin = getSkinById(skinId)
  if (!skin) return { ok: false, reason: 'not_found' }
  if (isSkinOwned(skinId, ownedIds)) return { ok: false, reason: 'already_owned' }
  if (totalStars < skin.price) return { ok: false, reason: 'insufficient_stars' }
  return { ok: true }
}

const OWNED_SKINS_KEY = 'ownedSkins'
const ACTIVE_SKIN_KEY = 'activeSkin'
const TOTAL_STARS_KEY = 'totalStars'

export function getOwnedSkinIds(): string[] {
  try {
    const raw = Taro.getStorageSync(OWNED_SKINS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return []
}

function saveOwnedSkinIds(ids: string[]) {
  Taro.setStorageSync(OWNED_SKINS_KEY, JSON.stringify(ids))
}

export function getActiveSkinId(): string | null {
  try {
    const raw = Taro.getStorageSync(ACTIVE_SKIN_KEY)
    if (raw) return raw
  } catch { /* ignore */ }
  return null
}

export function getActiveSkin(): Skin | null {
  const activeId = getActiveSkinId()
  if (!activeId) return null
  return getSkinById(activeId) ?? null
}

export function addOwnedSkin(skinId: string) {
  const owned = getOwnedSkinIds()
  if (!owned.includes(skinId)) {
    owned.push(skinId)
    saveOwnedSkinIds(owned)
  }
}

function getTotalStarsFromStorage(): number {
  try {
    const v = Number(Taro.getStorageSync(TOTAL_STARS_KEY) || 0)
    return Number.isFinite(v) ? v : 0
  } catch { return 0 }
}

function deductStarsFromStorage(amount: number) {
  const current = getTotalStarsFromStorage()
  Taro.setStorageSync(TOTAL_STARS_KEY, Math.max(0, current - amount))
}

export function exchangeSkin(skinId: string): ExchangeResult {
  const totalStars = getTotalStarsFromStorage()
  const owned = getOwnedSkinIds()

  const result = canExchange(skinId, totalStars, owned)
  if (!result.ok) return result

  const skin = getSkinById(skinId)!
  if (skin.type === 'stars') {
    deductStarsFromStorage(skin.price)
  }

  addOwnedSkin(skinId)
  switchSkin(skinId)
  return { ok: true }
}

export function switchSkin(skinId: string) {
  Taro.setStorageSync(ACTIVE_SKIN_KEY, skinId)
}

export function getTrainIcon(skin: Skin | null): string {
  if (!skin) return '🚂'
  return skin.trainIcon
}
