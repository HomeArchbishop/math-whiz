/**
 * Tabs 路由 Index，须重定向到 StudyTab
 */

import { Redirect } from 'expo-router'

export default function IndexTab () {
  return <Redirect href='/(tabs)/study' />
}
