import { ReactNode } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface SquareButtonProps {
  text: string
  icon: ReactNode
  type?: 'primary' | 'secondary' | 'disabled'
  onPress: () => void
}

export default function SquareButton ({ text, icon, type = 'primary', onPress }: SquareButtonProps) {
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
        {icon}
      </Pressable>
      <Text style={[styles.text, typedStyles.text]}>{text}</Text>
    </View>
  )
}

const { width } = Dimensions.get('screen')

const btnSize = (width - 16 * 3) / 2

const stylesModel = createStylesModel((palette) => ({
  container: {
    width: btnSize,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnBody: {
    height: btnSize,
    width: btnSize,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 4,
    elevation: 5,
  },
  btnBodyPressed: {
    borderBottomWidth: 2,
    height: btnSize - 2,
    transform: [{ translateY: 2 }],
  },
  primary: {
    backgroundColor: palette.themeOrangePrimary,
    borderColor: palette.themeOrangePrimary,
    borderBottomColor: palette.themeOrangeDarker,
  },
  secondary: {
    backgroundColor: palette.backgroundPrimary,
    borderColor: palette.borderPrimary,
    borderBottomColor: palette.borderPrimary,
  },
  disabled: {
    backgroundColor: palette.borderPrimary,
    borderColor: palette.borderPrimary,
    borderBottomColor: palette.borderPrimary,
  },
  text: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: palette.textInverted,
  },
  textSecondary: {
    color: palette.textTertiary,
  },
  textDisabled: {
    color: palette.textExtraLight,
  },
}))
