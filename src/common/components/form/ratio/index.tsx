import { Pressable, Text, View } from 'react-native'

import { createStylesModel, useThemedStyles } from '@/common/interface/theme'

export interface RatioOption {
  label: string
  value: string
}

interface RatioGroupProps {
  options: RatioOption[]
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export default function RatioGroup ({ options, value, onValueChange, disabled = false }: RatioGroupProps) {
  const styles = useThemedStyles(stylesModel)

  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = value === option.value
        const isLast = index === options.length - 1

        return (
          <View
            key={option.value}
            style={[
              { width: `${100 / options.length}%` },
              styles.item,
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.btnBody,
                isSelected ? styles.btnBodySelected : styles.btnBodyUnselected,
                pressed && !disabled && styles.btnBodyPressed,
              ]}
              disabled={disabled}
              onPress={() => !disabled && onValueChange(option.value)}
            >
              <Text
                style={[
                  styles.text,
                  isSelected ? styles.textSelected : styles.textUnselected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    borderRadius: 8,
    backgroundColor: palette.backgroundSecondary,
    borderWidth: 2,
    borderColor: palette.borderPrimary,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  item: {
    width: '50%',
  },
  btnBody: {
    height: 48,
    width: '100%',
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    elevation: 0,
  },
  btnBodySelected: {
    backgroundColor: palette.themeOrangePrimary,
  },
  btnBodyUnselected: {
    backgroundColor: palette.backgroundSecondary,
  },
  btnBodyPressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textSelected: {
    color: palette.textInverted,
  },
  textUnselected: {
    color: palette.textSecondary,
  },
}))
