import { useNavigation } from 'expo-router'
import { useEffect } from 'react'

export function useNavigationNoHeader () {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])
}
