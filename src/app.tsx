import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'

import './app.css'

export default function App({ children }: PropsWithChildren) {
  useLaunch(() => {})
  return children
}
