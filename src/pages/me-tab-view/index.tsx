import { Text, View } from 'react-native'

import SafeHeader from '@/common/components/safe-header'
import { useNavigationNoHeader } from '@/common/core/interface/view'

export default function MeTabView () {
  useNavigationNoHeader()

  return (
    <View>
      <SafeHeader title='Me' />
      <Text>Me</Text>
    </View>
  )
}
