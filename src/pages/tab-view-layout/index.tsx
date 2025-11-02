import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useI18n } from '@/common/i18n'
import { usePalette } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

/**
 * 主页面布局
 * @returns 主页面布局组件
 */
export default function HomeViewLayout () {
  useNavigationNoHeader()
  const insets = useSafeAreaInsets()

  const { t } = useI18n()
  const palette = usePalette()

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 56 + insets.bottom,
          borderTopWidth: 2,
          borderTopColor: palette.borderPrimary,
          backgroundColor: palette.backgroundPrimary,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Tabs.Screen
        name='study'
        options={{
          tabBarLabel: t('tabNameStudy'),
          tabBarActiveTintColor: '#FF9C39',
        }}
      />
      <Tabs.Screen
        name='report'
        options={{
          tabBarLabel: t('tabNameReport'),
          tabBarActiveTintColor: '#3FE9D2',
        }}
      />
      <Tabs.Screen
        name='me'
        options={{
          tabBarLabel: t('tabNameMe'),
          tabBarActiveTintColor: '#39BAFF',
        }}
      />
    </Tabs>
  )
}
