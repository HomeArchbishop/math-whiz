import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useNavigationNoHeader } from '@/common/core/interface/view'
import { useI18n } from '@/common/i18n'

/**
 * 主页面布局
 * @returns 主页面布局组件
 */
export default function HomeViewLayout () {
  useNavigationNoHeader()
  const insets = useSafeAreaInsets()
  const { t } = useI18n()

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 56 + insets.bottom,
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
        name='game'
        options={{
          tabBarLabel: t('tabNameGame'),
          tabBarActiveTintColor: '#586CFF',
        }}
      />
      <Tabs.Screen
        name='achievement'
        options={{
          tabBarLabel: t('tabNameAchievement'),
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
