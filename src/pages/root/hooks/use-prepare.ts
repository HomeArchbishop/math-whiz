import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

import { initI18n } from '@/common/i18n'

SplashScreen.preventAutoHideAsync()

export const usePrepare = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    Promise.all([
      initI18n(),
    ])
      .then(() => {
        setAppIsReady(true)
        SplashScreen.hide()
      })
  }, [])

  return appIsReady
}
