import { Text, View } from 'react-native'

import SafeHeader from '@/common/components/safe-header'
import { useNavigationNoHeader } from '@/common/core/interface/view'

export default function GameTabView () {
  useNavigationNoHeader()

  return (
    <View>
      <SafeHeader title='Game' />
      <Text>Game</Text>
    </View>
  )
}
