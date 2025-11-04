import { useRouter } from 'expo-router'
import { useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { SafeAreaView } from 'react-native-safe-area-context'

import BackSvg from '@/assets/icons/back.svg'
import { signup } from '@/common/api/login'
import BasicButton from '@/common/components/button/basic'
import FormGroup from '@/common/components/form/from-group'
import FormInput from '@/common/components/form/input'
import { useInput } from '@/common/components/form/input/use-input'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

import { gradeValidator, usernameValidator, validatePipeline } from '../utils/validate'

export default function SignupView () {
  useNavigationNoHeader()
  const styles = useThemedStyles(stylesModel)
  const { t } = useI18n()
  const router = useRouter()

  const [username, onChangeUsername] = useInput()
  const [password, onChangePassword] = useInput()
  const [childName, onChangeChildName] = useInput()
  const [grade, onChangeGrade] = useInput()

  const isDisabled = !username || !password || !childName || !grade

  const isSigninning = useRef(false)
  const handleSignUp = async () => {
    if (isSigninning.current) return
    try {
      isSigninning.current = true
      const [isValid, errorMessage] = validatePipeline(username, [
        () => usernameValidator(username),
        () => gradeValidator(grade),
      ])
      if (!isValid) {
        throw new Error(errorMessage)
      }
      const gradeNumber = Number(grade) as 1 | 2 | 3
      await signup(username, password, childName, gradeNumber)
      showMessage({
        message: t('signupSuccess'),
      })
      router.replace('/auth/login')
    } catch (error) {
      showMessage({
        message: (error as Error).message,
      })
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
          <FormInput placeholder={t('childName')} onChangeText={onChangeChildName} />
          <FormInput placeholder={t('grade')} onChangeText={onChangeGrade} keyboardType='numeric' />
        </FormGroup>
      </View>
      <BasicButton type={isDisabled ? 'disabled' : 'primary'} text={t('signUp')} onPress={handleSignUp} />
      <Text style={styles.agreementTips}>{t('agreementTips', { action: t('signingUp') })}</Text>
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
