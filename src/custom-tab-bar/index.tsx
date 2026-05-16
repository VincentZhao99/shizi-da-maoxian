import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

const TABS = [
  { path: '/pages/home/index', label: '首页', emoji: '🏠' },
  { path: '/pages/wrongWords/index', label: '错题本', emoji: '📝' },
  { path: '/pages/profile/index', label: '我的', emoji: '👤' }
]

export default function CustomTabBar() {
  const current = '/' + (Taro.getCurrentPages().pop()?.route ?? 'pages/home/index')

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingTop: '8px',
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom))'
      }}
    >
      {TABS.map((tab) => {
        const active = current === tab.path
        return (
          <View
            key={tab.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '4px',
              paddingBottom: '4px'
            }}
            onClick={() => Taro.switchTab({ url: tab.path })}
          >
            <Text style={{ fontSize: '24px', opacity: active ? 1 : 0.4 }}>{tab.emoji}</Text>
            <Text
              style={{
                marginTop: '2px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: active ? '#1E1E1E' : '#B0B0B0'
              }}
            >
              {tab.label}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
