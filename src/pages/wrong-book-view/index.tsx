import { View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

export default function WrongBookView () {
  const styles = useThemedStyles(stylesModel)

  return (
    <View style={styles.container} />
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    backgroundColor: palette.backgroundPrimary,
  },
}))
