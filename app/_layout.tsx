import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import FlashMessage from 'react-native-flash-message'

import { withErrorBoundary } from '@/common/components/error-boundary'
import { usePrepare } from '@/pages/root/hooks/use-prepare'

function RootLayout () {
  const appIsReady = usePrepare()

  if (!appIsReady) {
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Stack>
        <Stack.Screen name='auth/index' options={{ headerShown: false }} />
        <Stack.Screen name='auth/login' options={{ headerShown: false }} />
        <Stack.Screen name='auth/signup' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='result' options={{ headerShown: false }} />
        <Stack.Screen name='exercise' options={{ headerShown: false }} />
        <Stack.Screen name='wrong-book' options={{ headerShown: false }} />
      </Stack>
      <FlashMessage position='center' duration={1200} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withErrorBoundary(RootLayout)
