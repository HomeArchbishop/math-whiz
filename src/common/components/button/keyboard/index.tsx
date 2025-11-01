import { Dimensions, Pressable, Text, View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface KeyboardButtonProps {
  text: string
  onPress: () => void
}

export default function KeyboardButton ({ text, onPress }: KeyboardButtonProps) {
  const styles = useThemedStyles(stylesModel)

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.btnBody,
          pressed && styles.btnBodyPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
}

const { width } = Dimensions.get('screen')
const btnSize = (width - 12 * 5) / 3

const stylesModel = createStylesModel((palette) => ({
  container: {
    width: btnSize,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnBody: {
    height: 48,
    width: btnSize,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 6,
    elevation: 5,
    backgroundColor: palette.backgroundSecondary,
    borderColor: palette.borderPrimary,
    borderBottomColor: palette.borderPrimary,
  },
  btnBodyPressed: {
    borderBottomWidth: 2,
    height: 48 - 2,
    transform: [{ translateY: 2 }],
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: palette.textTertiary,
  },
}))
