import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CrossSvg from '@/assets/icons/cross.svg'
import BasicButton from '@/common/components/button/basic'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

import { useWrongQuestions } from './use-questions'
import { toParamQuestions } from './use-questions/utils'

export default function WrongBookView () {
  useNavigationNoHeader()
  const styles = useThemedStyles(stylesModel)
  const { t } = useI18n()
  const router = useRouter()

  const questions = useWrongQuestions()

  const handleBack = () => {
    router.back()
  }

  const handleGoToExercise = () => {
    router.push({
      pathname: '/exercise',
      params: {
        questions: toParamQuestions(questions),
      },
    })
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <Pressable onPress={handleBack}>
          <CrossSvg width={24} height={24} fill={styles.headerSvg.color} />
        </Pressable>
        <Text style={styles.tipText}>{t('wrongBook')}</Text>
      </View>
      <ScrollView
        style={styles.listContentContainer}
      >
        {questions.map((question, index) => (
          <View style={styles.listItemContainer} key={question.id}>
            <View style={styles.indexContainer}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
            <View style={styles.questionContainer}>
              {question.question.map((segment, index) => (
                <Text style={styles.questionText} key={index}>{segment.content}</Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.btnContainer}>
        <BasicButton
          type='primary'
          text={t('goToExercise')}
          onPress={handleGoToExercise}
        />
      </View>
    </SafeAreaView>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.textPrimary,
  },
  headerSvg: {
    color: palette.textExtraLight,
  },
  tipText: {
    marginLeft: 24,
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.textSecondary,
  },

  listContentContainer: {
    marginHorizontal: 16,
    marginTop: 32,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: palette.borderPrimary,
    maxHeight: 64 * 5,
  },
  listItemContainer: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },

  indexContainer: {
    width: 24,
  },
  indexText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: palette.textExtraLight,
  },

  questionContainer: {
    height: 64,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.textPrimary,
  },

  btnContainer: {
    position: 'absolute',
    bottom: 54,
    width: '100%',
    paddingHorizontal: 16,
  },
}))
