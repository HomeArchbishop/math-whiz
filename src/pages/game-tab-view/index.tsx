import { Text, View } from 'react-native'

import SafeHeader from '@/common/components/safe-header'
import { useI18n } from '@/common/i18n'
import { useNavigationNoHeader } from '@/core/interface/view'

export default function GameTabView () {
  useNavigationNoHeader()
  const { t } = useI18n()

  return (
    <View>
      <SafeHeader title={t('tabNameGame')} />
      <Text>{t('tabNameGame')}</Text>
    </View>
  )
}
