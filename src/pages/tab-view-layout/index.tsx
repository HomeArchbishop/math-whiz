import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Tab1Icon from '@/assets/icons/tab1.svg'
import Tab3Icon from '@/assets/icons/tab3.svg'
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
          tabBarIcon: () => <Tab1Icon width={32} height={32} />,
          tabBarActiveTintColor: '#FF9C39',
        }}
      />
      <Tabs.Screen
        name='me'
        options={{
          tabBarLabel: t('tabNameMe'),
          tabBarIcon: () => <Tab3Icon width={32} height={32} />,
          tabBarActiveTintColor: '#39BAFF',
        }}
      />
    </Tabs>
  )
}
