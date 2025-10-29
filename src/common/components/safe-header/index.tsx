import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { createStylesModel, useTheme } from '@/common/core/interface/theme'
import { palette } from '@/theme'

interface SafeHeaderProps {
  title: string,
  style?: StyleProp<ViewStyle>
}

export default function SafeHeader ({ title, style }: SafeHeaderProps) {
  const insets = useSafeAreaInsets()
  const styles = useTheme(stylesModel)

  const flattenedStyle = StyleSheet.flatten([
    styles.container,
    { paddingTop: insets.top },
    style,
  ])

  return (
    <View style={flattenedStyle}>
      <Text>{title}</Text>
    </View>
  )
}

const stylesModel = createStylesModel((scheme) => ({
  container: {
    backgroundColor: palette[scheme].backgroundPrimary,
  },
}))
