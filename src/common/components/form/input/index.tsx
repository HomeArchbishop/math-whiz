import { TextInput, TextInputProps, View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

export default function FormInput ({ style, ...props }: TextInputProps) {
  const styles = useThemedStyles(stylesModel)

  return (
    <View style={[styles.container]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={styles.placeholder.color}
          underlineColorAndroid='transparent'
          {...props}
        />
      </View>
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: palette.backgroundPrimary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: palette.textPrimary,
    paddingVertical: 0,
    minHeight: 24,
    outlineWidth: 0,
  },
  placeholder: {
    color: palette.textExtraLight,
  },
}))
