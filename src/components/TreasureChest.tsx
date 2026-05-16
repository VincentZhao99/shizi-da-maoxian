import { View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'

export function TreasureChest({
  visible,
  starsEarned,
  isLastLevel,
  onNext
}: {
  visible: boolean
  starsEarned: number
  isLastLevel: boolean
  onNext: () => void
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShow(true), 300)
      return () => clearTimeout(t)
    }
    setShow(false)
  }, [visible])

  if (!visible) return null

  return (
    <View
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
      }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: show ? 1 : 0,
          transform: show ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 0.3s ease'
        }}
      >
        <Text style={{ fontSize: '64px' }}>💎</Text>
        <Text
          style={{
            marginTop: '12px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1E1E1E'
          }}
        >
          宝箱开启！
        </Text>
        <Text
          style={{
            marginTop: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#FFB300'
          }}
        >
          获得 {starsEarned} 颗星星 ⭐
        </Text>
        <View
          style={{
            marginTop: '24px',
            borderRadius: '999px',
            backgroundColor: '#FFD66E',
            paddingLeft: '32px',
            paddingRight: '32px',
            paddingTop: '12px',
            paddingBottom: '12px'
          }}
          onClick={onNext}
        >
          <Text
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1E1E1E'
            }}
          >
            {isLastLevel ? '全部通关！' : '下一关'}
          </Text>
        </View>
      </View>
    </View>
  )
}
