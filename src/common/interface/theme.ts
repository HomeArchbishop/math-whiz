import { StyleSheet, useColorScheme } from 'react-native'

import { palettes } from '@/theme'

export const useThemedStyles = <T extends keyof typeof palettes, K>(stylesCreator: (palette: typeof palettes[T], scheme: T) => K) => {
  const scheme = useColorScheme() as T
  return stylesCreator(palettes[scheme], scheme)
}

export const usePalette = () => {
  const scheme = useColorScheme() ?? 'light'
  return palettes[scheme]
}

export const createStylesModel = <T extends keyof typeof palettes, K extends StyleSheet.NamedStyles<K>>(
  functionCreator: (palette: typeof palettes[T], scheme: T) => K,
) => {
  return (palette: typeof palettes[T], scheme: T) => StyleSheet.create(functionCreator(palette, scheme))
}
