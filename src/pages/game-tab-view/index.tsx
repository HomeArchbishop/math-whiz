import { Text, View } from 'react-native'

import SafeHeader from '@/common/components/safe-header'
import { useNavigationNoHeader } from '@/common/core/interface/view'
import { useI18n } from '@/common/i18n'

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
