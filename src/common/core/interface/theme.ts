import { StyleSheet, useColorScheme } from 'react-native'

import { palette } from '@/theme'

export const useTheme = <T extends keyof typeof palette, K>(stylesCreator: (scheme: T) => K) => {
  const scheme = useColorScheme() as T
  return stylesCreator(scheme)
}

export const createStylesModel = <T extends StyleSheet.NamedStyles<T>>(
  functionCreator: (scheme: 'dark' | 'light') => T,
) => {
  return (scheme: 'dark' | 'light') => StyleSheet.create(functionCreator(scheme))
}
