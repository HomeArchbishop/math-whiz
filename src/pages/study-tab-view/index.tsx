import { Text, View } from 'react-native'

import { useApi } from '@/common/api'
import SafeHeader from '@/common/components/safe-header'
import { useI18n } from '@/common/i18n'
import { useNavigationNoHeader } from '@/core/interface/view'

export default function StudyTabView () {
  useNavigationNoHeader()
  const { t } = useI18n()

  const [live, error, refresh, clear] = useApi('getLive', [])
  // console.error(error)

  return (
    <View>
      <SafeHeader title={t('tabNameStudy')} />
      <Text>{t('tabNameStudy')}</Text>
    </View>
  )
}
