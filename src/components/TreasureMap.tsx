import { View, Text } from '@tarojs/components'

export function TreasureMap({
  totalNodes,
  currentNode,
  nodeLabels
}: {
  totalNodes: number
  currentNode: number
  nodeLabels: string[]
}) {
  const safeCurrent = Math.min(currentNode, totalNodes - 1)

  return (
    <View style={{ paddingTop: '8px', paddingBottom: '8px' }}>
      {/* Route line container */}
      <View style={{ position: 'relative', paddingLeft: '24px', paddingRight: '24px' }}>
        {/* Background line */}
        <View
          style={{
            position: 'absolute',
            left: '48px',
            right: '48px',
            top: '28px',
            height: '4px',
            backgroundColor: '#E0E0E0',
            borderRadius: '2px'
          }}
        />

        {/* Golden trail (completed segment) */}
        {safeCurrent > 0 ? (
          <View
            style={{
              position: 'absolute',
              left: '48px',
              top: '28px',
              height: '4px',
              width: `${(safeCurrent / (totalNodes - 1)) * 100}%`,
              maxWidth: `calc(100% - 96px)`,
              backgroundColor: '#FFB300',
              borderRadius: '2px'
            }}
          />
        ) : null}

        {/* Nodes */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          {Array.from({ length: totalNodes }).map((_, i) => {
            const done = i < safeCurrent
            const current = i === safeCurrent
            return (
              <View
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '40px'
                }}
              >
                {/* Train emoji above current node */}
                {current ? (
                  <Text style={{ fontSize: '24px', marginBottom: '2px' }}>🚂</Text>
                ) : (
                  <View style={{ height: '30px' }} />
                )}

                {/* Node circle */}
                <View
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: done ? '#FFB300' : current ? '#FFD66E' : '#E8E8E8',
                    border: current ? '3px solid #FFB300' : '2px solid #D0D0D0'
                  }}
                >
                  <Text
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: done ? '#FFFFFF' : current ? '#1E1E1E' : '#B0B0B0'
                    }}
                  >
                    {done ? '✓' : i + 1}
                  </Text>
                </View>

                {/* Node label */}
                <Text
                  style={{
                    marginTop: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: done ? '#FFB300' : current ? '#1E1E1E' : '#B0B0B0',
                    textAlign: 'center'
                  }}
                >
                  {nodeLabels[i] || ''}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
