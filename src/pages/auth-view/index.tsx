import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'

import BasicButton from '@/common/components/button/basic'
import SeperateLine from '@/common/components/seperate-line'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

export default function AuthView () {
  useNavigationNoHeader()
  const { t } = useI18n()
  const styles = useThemedStyles(stylesModel)
  const router = useRouter()

  const navigateToLogin = () => {
    router.push('/auth/login')
  }

  const navigateToSignUp = () => {
    router.push('/auth/signup')
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{t('alreadyHaveAccount')}</Text>
        <BasicButton text={t('login')} onPress={navigateToLogin} />
      </View>
      <SeperateLine spaceVertical={40} />
      <View style={styles.subContainer}>
        <Text style={styles.text}>{t('firstTimeUser')}</Text>
        <BasicButton type='secondary' text={t('signUp')} onPress={navigateToSignUp} />
      </View>
    </View>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.backgroundPrimary,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.textPrimary,
  },
}))
