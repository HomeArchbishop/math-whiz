import { useRouter } from 'expo-router'
import { useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import BackSvg from '@/assets/icons/back.svg'
import BasicButton from '@/common/components/button/basic'
import FormGroup from '@/common/components/form/from-group'
import FormInput from '@/common/components/form/input'
import { useInput } from '@/common/components/form/input/use-input'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

export default function LoginView () {
  useNavigationNoHeader()
  const styles = useThemedStyles(stylesModel)
  const { t } = useI18n()
  const router = useRouter()

  const [username, onChangeUsername] = useInput()
  const [password, onChangePassword] = useInput()

  const isDisabled = !username || !password

  const isSigninning = useRef(false)
  const handleSignIn = async () => {
    if (isSigninning.current) return
    try {
      isSigninning.current = true
      // const result = await signin(username, password)
      // setLoginInfo(new LoginInfo(result))
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      isSigninning.current = false
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={handleBack}>
          <BackSvg width={24} height={24} fill={styles.headerText.color} />
        </Pressable>
        <Text style={styles.headerText}>{t('enterYourInformation')}</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.formContainer}>
        <FormGroup>
          <FormInput placeholder={t('username')} onChangeText={onChangeUsername} />
          <FormInput placeholder={t('password')} onChangeText={onChangePassword} />
        </FormGroup>
      </View>
      <BasicButton type={isDisabled ? 'disabled' : 'primary'} text={t('signIn')} onPress={handleSignIn} />
      <Text style={styles.agreementTips}>{t('agreementTips', { action: t('signingIn') })}</Text>
    </SafeAreaView>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: palette.backgroundPrimary,
    gap: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.textExtraLight,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  agreementTips: {
    fontSize: 12,
    color: palette.textExtraLight,
  },
}))
