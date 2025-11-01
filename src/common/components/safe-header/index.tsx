import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface SafeHeaderProps {
  title?: string,
  style?: StyleProp<ViewStyle>
}

export default function SafeHeader ({ title, style }: SafeHeaderProps) {
  const insets = useSafeAreaInsets()
  const styles = useThemedStyles(stylesModel)

  const flattenedStyle = StyleSheet.flatten([
    styles.container,
    { paddingTop: insets.top },
    style,
  ])

  return (
    <View style={flattenedStyle}>
      {title && <Text>{title}</Text>}
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    backgroundColor: palette.backgroundPrimary,
  },
}))
