import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

export default function WrongBookView () {
  useNavigationNoHeader()
  const styles = useThemedStyles(stylesModel)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} />
    </SafeAreaView>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
  },
}))
