import { describe, expect, it, vi } from 'vitest'

vi.mock('@tarojs/taro', () => {
  const store: Record<string, any> = {}
  return {
    default: {
      getStorageSync(key: string) {
        return store[key] ?? null
      },
      setStorageSync(key: string, value: any) {
        store[key] = value
      },
      removeStorageSync(key: string) {
        delete store[key]
      },
      showToast() {},
      navigateTo() {},
      navigateBack() {},
      switchTab() {},
      setNavigationBarTitle() {},
      request() {},
      useRouter() {
        return { params: {} }
      },
      useDidShow() {},
    },
  }
})

import { getAllSkins, getSkinById, isSkinOwned, canExchange, getTrainIcon } from './skins'

describe('getAllSkins', () => {
  it('returns at least 5 skins', () => {
    const skins = getAllSkins()
    expect(skins.length).toBeGreaterThanOrEqual(5)
  })

  it('each skin has required fields', () => {
    for (const skin of getAllSkins()) {
      expect(typeof skin.id).toBe('string')
      expect(skin.id.length).toBeGreaterThan(0)
      expect(typeof skin.name).toBe('string')
      expect(skin.name.length).toBeGreaterThan(0)
      expect(['stars', 'achievement']).toContain(skin.type)
      expect(typeof skin.price).toBe('number')
      expect(skin.price).toBeGreaterThanOrEqual(0)
      expect(typeof skin.trainIcon).toBe('string')
      expect(typeof skin.primaryColor).toBe('string')
      expect(typeof skin.secondaryColor).toBe('string')
    }
  })

  it('contains all core skin ids', () => {
    const ids = new Set(getAllSkins().map((s) => s.id))
    expect(ids.has('mecha-warrior')).toBe(true)
    expect(ids.has('ice-princess')).toBe(true)
    expect(ids.has('space-explorer')).toBe(true)
    expect(ids.has('ultraman')).toBe(true)
    expect(ids.has('transformers')).toBe(true)
  })

  it('stars-type skins have positive price', () => {
    const starSkins = getAllSkins().filter((s) => s.type === 'stars')
    for (const skin of starSkins) {
      expect(skin.price).toBeGreaterThan(0)
    }
  })

  it('every skin id is unique', () => {
    const ids = getAllSkins().map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('getSkinById', () => {
  it('returns skin by id', () => {
    const skin = getSkinById('mecha-warrior')
    expect(skin).toBeDefined()
    expect(skin!.name).toBe('机甲勇士')
  })

  it('returns ultraman skin', () => {
    const skin = getSkinById('ultraman')
    expect(skin).toBeDefined()
    expect(skin!.name).toBe('奥特曼')
    expect(skin!.trainIcon).toBe('\u{1F9B8}')
    expect(skin!.type).toBe('stars')
  })

  it('returns transformers skin', () => {
    const skin = getSkinById('transformers')
    expect(skin).toBeDefined()
    expect(skin!.name).toBe('变形金刚')
    expect(skin!.trainIcon).toBe('\u{1F69B}')
    expect(skin!.type).toBe('stars')
  })

  it('returns undefined for unknown id', () => {
    expect(getSkinById('nonexistent')).toBeUndefined()
  })
})

describe('isSkinOwned', () => {
  it('returns true when skin id is in owned list', () => {
    expect(isSkinOwned('mecha-warrior', ['mecha-warrior', 'ice-princess'])).toBe(true)
  })

  it('returns false when skin id is not in owned list', () => {
    expect(isSkinOwned('mecha-warrior', ['ice-princess'])).toBe(false)
  })

  it('returns false for empty owned list', () => {
    expect(isSkinOwned('mecha-warrior', [])).toBe(false)
  })
})

describe('canExchange', () => {
  it('allows exchange when stars sufficient and not owned', () => {
    const result = canExchange('mecha-warrior', 50, [])
    expect(result.ok).toBe(true)
  })

  it('rejects when stars insufficient', () => {
    const result = canExchange('mecha-warrior', 10, [])
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('insufficient_stars')
  })

  it('rejects when already owned', () => {
    const result = canExchange('mecha-warrior', 100, ['mecha-warrior'])
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('already_owned')
  })

  it('rejects when skin id not found', () => {
    const result = canExchange('nonexistent', 100, [])
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('not_found')
  })

  it('allows exchange when stars exactly match price', () => {
    const skin = getSkinById('mecha-warrior')!
    const result = canExchange(skin.id, skin.price, [])
    expect(result.ok).toBe(true)
  })

  it('rejects when stars one short', () => {
    const skin = getSkinById('mecha-warrior')!
    const result = canExchange(skin.id, skin.price - 1, [])
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('insufficient_stars')
  })

  it('allows achievement skin when not owned', () => {
    const result = canExchange('streak-30', 0, [])
    expect(result.ok).toBe(true)
  })

  it('rejects achievement skin when already owned', () => {
    const result = canExchange('streak-30', 0, ['streak-30'])
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('already_owned')
  })
})

describe('getTrainIcon', () => {
  it('returns default train icon when skin is null', () => {
    expect(getTrainIcon(null)).toBe('\u{1F682}')
  })

  it('returns skin trainIcon for mecha-warrior', () => {
    const skin = getSkinById('mecha-warrior')!
    expect(getTrainIcon(skin)).toBe('\u{1F916}')
  })

  it('returns skin trainIcon for ultraman', () => {
    const skin = getSkinById('ultraman')!
    expect(getTrainIcon(skin)).toBe('\u{1F9B8}')
  })

  it('returns skin trainIcon for transformers', () => {
    const skin = getSkinById('transformers')!
    expect(getTrainIcon(skin)).toBe('\u{1F69B}')
  })
})
