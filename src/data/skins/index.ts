import type { Skin } from './types'

export const allSkins: Skin[] = [
  {
    id: 'mecha-warrior',
    name: '机甲勇士',
    type: 'stars',
    price: 30,
    trainIcon: '🤖',
    primaryColor: '#FF4444',
    secondaryColor: '#1A1A2E'
  },
  {
    id: 'ice-princess',
    name: '冰雪公主',
    type: 'stars',
    price: 30,
    trainIcon: '👸',
    primaryColor: '#89CFF0',
    secondaryColor: '#FFFFFF'
  },
  {
    id: 'space-explorer',
    name: '星际探索',
    type: 'stars',
    price: 50,
    trainIcon: '🚀',
    primaryColor: '#7B2FBE',
    secondaryColor: '#0A0A2E'
  },
  {
    id: 'ultraman',
    name: '奥特曼',
    type: 'stars',
    price: 40,
    trainIcon: '🦸',
    primaryColor: '#E60012',
    secondaryColor: '#C0C0C0'
  },
  {
    id: 'transformers',
    name: '变形金刚',
    type: 'stars',
    price: 40,
    trainIcon: '🚛',
    primaryColor: '#1E3A8A',
    secondaryColor: '#DC2626'
  },
  {
    id: 'streak-30',
    name: '坚持达人',
    type: 'achievement',
    price: 0,
    trainIcon: '🏆',
    primaryColor: '#FFD700',
    secondaryColor: '#1E1E1E'
  }
]
