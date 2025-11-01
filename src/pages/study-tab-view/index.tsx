import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import MathOpsSvg from '@/assets/icons/math-ops.svg'
import PicASvg from '@/assets/icons/pic-a.svg'
import WrongBookSvg from '@/assets/icons/wrong-book.svg'
import SquareButton from '@/common/components/button/square'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'
import { useLogin } from '@/common/login'

const MathOpsIcon = () => {
  return (
    <MathOpsSvg width={96} height={96} />
  )
}

const WrongBookIcon = () => {
  return (
    <WrongBookSvg width={96} height={96} />
  )
}

export default function StudyTabView () {
  useNavigationNoHeader()
  const { t } = useI18n()
  const styles = useThemedStyles(stylesModel)
  const loginInfo = useLogin()

  const router = useRouter()

  const handleStartExercise = () => {
    router.push('/exercise')
  }

  const handleStartWrongBook = () => {
    router.push('/wrong-book')
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer} edges={['top']}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>
            {t('areYouReady', { name: loginInfo?.childName })}
          </Text>
          <Text style={styles.description}>
            {t('remainTip', { remain: 10, time: 30 })}
          </Text>
        </View>
        <PicASvg width={120} height={120} />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <SquareButton
          type='secondary'
          text={t('startExercise')}
          icon={<MathOpsIcon />}
          onPress={handleStartExercise}
        />
        <SquareButton
          type='secondary'
          text={t('wrongExercise')}
          icon={<WrongBookIcon />}
          onPress={handleStartWrongBook}
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.textInverted,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: palette.textInvertedSecondary,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 32,
  },
}))
