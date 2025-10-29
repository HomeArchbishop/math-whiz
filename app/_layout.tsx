import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

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
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withErrorBoundary(RootLayout)
