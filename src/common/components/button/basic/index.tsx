import { Pressable, Text, View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface BasicButtonProps {
  text: string
  type?: 'primary' | 'secondary' | 'disabled'
  onPress: () => void
}

export default function BasicButton ({ text, type = 'primary', onPress }: BasicButtonProps) {
  const styles = useThemedStyles(stylesModel)

  const typedStyles = {
    primary: {
      btnBody: styles.primary,
      text: styles.textPrimary,
    },
    secondary: {
      btnBody: styles.secondary,
      text: styles.textSecondary,
    },
    disabled: {
      btnBody: styles.disabled,
      text: styles.textDisabled,
    },
  }[type]

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.btnBody,
          typedStyles.btnBody,
          pressed && styles.btnBodyPressed,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.text, typedStyles.text]}>{text}</Text>
      </Pressable>
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    height: 48,
    width: '100%',
  },
  btnBody: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 4,
    elevation: 5,
  },
  btnBodyPressed: {
    borderBottomWidth: 2,
    height: 46,
    transform: [{ translateY: 2 }],
  },
  primary: {
    backgroundColor: palette.themeOrangePrimary,
    borderColor: palette.themeOrangePrimary,
    borderBottomColor: palette.themeOrangeDarker,
  },
  secondary: {
    backgroundColor: palette.backgroundSecondary,
    borderColor: palette.borderPrimary,
    borderBottomColor: palette.borderPrimary,
  },
  disabled: {
    backgroundColor: palette.borderPrimary,
    borderColor: palette.borderPrimary,
    borderBottomColor: palette.borderPrimary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: palette.textInverted,
  },
  textSecondary: {
    color: palette.textSecondary,
  },
  textDisabled: {
    color: palette.textExtraLight,
  },
}))
