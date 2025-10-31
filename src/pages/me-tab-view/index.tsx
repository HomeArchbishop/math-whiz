import { Text, View } from 'react-native'

import SafeHeader from '@/common/components/safe-header'
import { useI18n } from '@/common/i18n'
import { useNavigationNoHeader } from '@/common/interface/view'

export default function MeTabView () {
  useNavigationNoHeader()
  const { t } = useI18n()

  return (
    <View>
      <SafeHeader title={t('tabNameMe')} />
      <Text>{t('tabNameMe')}</Text>
    </View>
  )
}
