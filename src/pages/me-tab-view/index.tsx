import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import PicCSvg from '@/assets/icons/pic-c.svg'
import BasicButton from '@/common/components/button/basic'
import RatioGroup from '@/common/components/form/ratio'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'
import { setLoginInfo, useLogin } from '@/common/login'

const formatDate = (date?: string) => {
  if (!date) {
    return ['2024', '1']
  }
  const year = date.split('-')[0]
  const month = date.split('-')[1]
  return [year, month]
}

export default function StudyTabView () {
  useNavigationNoHeader()
  const { t, i18n } = useI18n()
  const styles = useThemedStyles(stylesModel)
  const loginInfo = useLogin()
  const router = useRouter()

  const [year, month] = formatDate(loginInfo?.createdAt)

  const handleLogout = () => {
    setLoginInfo(null)
    router.push('/auth')
  }

  const [language, setLanguage] = useState(i18n.language)

  const handleSetLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLanguage(language)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top']}>
        <PicCSvg width={120} height={120} />
        <View style={styles.leftContent}>
          <Text style={styles.title}>
            {t('todayAlsoGood')}
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>
          {loginInfo?.childName}
        </Text>
        <Text style={styles.infoSubtitle}>
          {t('joinedAt', { year, month })}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <RatioGroup
          options={[{ label: 'English', value: 'en' }, { label: '中文', value: 'zh-CN' }]}
          value={language}
          onValueChange={handleSetLanguage}
        />
        <BasicButton
          text={t('logout')}
          onPress={handleLogout}
        />
      </View>
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
  },
  safeAreaContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: palette.themeOrangePrimary,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.textInverted,
  },

  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 80,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.textSecondary,
  },
  infoSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: palette.textTertiary,
  },

  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 32,
    gap: 12,
  },
}))
