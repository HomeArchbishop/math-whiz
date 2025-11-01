import { View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface SeperateLineProps {
  spaceHorizontal?: number
  spaceVertical?: number
}
export default function SeperateLine ({ spaceHorizontal = 0, spaceVertical = 0 }: SeperateLineProps) {
  const styles = useThemedStyles(stylesModel)

  const spacingStyles = {
    paddingHorizontal: spaceHorizontal,
    marginVertical: spaceVertical,
  }

  return (
    <View style={[styles.container, spacingStyles]}>
      <View style={styles.line} />
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    height: 2,
    width: '100%',
  },
  line: {
    height: '100%',
    width: '100%',
    backgroundColor: palette.borderPrimary,
  },
}))
