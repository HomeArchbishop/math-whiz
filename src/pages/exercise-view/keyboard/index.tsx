import { Dimensions, Pressable, View } from 'react-native'

import BackspaceSvg from '@/assets/icons/backspace.svg'
import KeyboardButton from '@/common/components/button/keyboard'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

interface KeyboardProps {
  onPress: (text: string) => void
}

const { width } = Dimensions.get('screen')
const btnSize = (width - 12 * 5) / 3

export default function MockKeyboard ({ onPress }: KeyboardProps) {
  const styles = useThemedStyles(stylesModel)

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.keyboardRow}>
        <KeyboardButton text='1' onPress={() => onPress('1')} />
        <KeyboardButton text='2' onPress={() => onPress('2')} />
        <KeyboardButton text='3' onPress={() => onPress('3')} />
      </View>
      <View style={styles.keyboardRow}>
        <KeyboardButton text='4' onPress={() => onPress('4')} />
        <KeyboardButton text='5' onPress={() => onPress('5')} />
        <KeyboardButton text='6' onPress={() => onPress('6')} />
      </View>
      <View style={styles.keyboardRow}>
        <KeyboardButton text='7' onPress={() => onPress('7')} />
        <KeyboardButton text='8' onPress={() => onPress('8')} />
        <KeyboardButton text='9' onPress={() => onPress('9')} />
      </View>
      <View style={styles.keyboardRow}>
        <View style={styles.keyboardSpacer} />
        <KeyboardButton text='0' onPress={() => onPress('0')} />
        <Pressable style={styles.keyboardBackspace} onPress={() => onPress('backspace')}>
          <BackspaceSvg width={44} height={44} fill={styles.keyboardBackspace.color} />
        </Pressable>
      </View>
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  keyboardContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 8,
    backgroundColor: palette.backgroundInvertedExtremelyLight,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  keyboardSpacer: {
    width: btnSize,
  },
  keyboardBackspace: {
    width: btnSize,
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.textTertiary,
  },
}))
