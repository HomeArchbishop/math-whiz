import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CrossSvg from '@/assets/icons/cross.svg'
import BasicButton from '@/common/components/button/basic'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

import MockKeyboard from './keyboard'
import { QuestionSegment, useQuestions } from './use-questions'

const QuestionSegmentText = ({ segment }: { segment: QuestionSegment }) => {
  const styles = useThemedStyles(stylesModel)

  const typedStyles = {
    number: styles.questionSegmentNumber,
    operator: styles.questionSegmentOperator,
  }[segment.type]

  return (
    <Text style={[styles.questionText, typedStyles]}>{segment.content}</Text>
  )
}

export default function ExerciseView () {
  useNavigationNoHeader()
  const router = useRouter()
  const styles = useThemedStyles(stylesModel)
  const { t } = useI18n()

  const { questions, current, comfirmed, setAnswer, comfirmThis, toNext } = useQuestions()

  const displayProgress = comfirmed / questions.length * 0.98 + 0.02
  const displayQuestion = questions[current]

  const isCheckAnswerDisabled = !displayQuestion.answer

  const [correctState, setCorrectState] = useState<'correct' | 'incorrect' | 'none'>('none')

  const handleBack = () => {
    router.back()
  }

  const handleKeyboardPress = (text: string) => {
    if (correctState !== 'none') return
    if (text === 'backspace') {
      setAnswer((answer) => answer.slice(0, -1))
    } else {
      setAnswer((answer) => (answer + text).slice(0, 3))
    }
  }

  const handleCheckAnswer = () => {
    if (correctState !== 'none') return
    comfirmThis()
    const isCorrect = displayQuestion.answer === displayQuestion.correctAnswer
    setCorrectState(isCorrect ? 'correct' : 'incorrect')
    setTimeout(() => {
      setCorrectState('none')
      if (!toNext()) {
        router.push('/')
      }
    }, 800)
  }

  const questionRender = () => {
    const addtionalContainerStyle = correctState === 'correct'
      ? styles.questionInputContainerCorrect
      : correctState === 'incorrect'
        ? styles.questionInputContainerIncorrect
        : null
    return (
      <View style={[styles.questionContainer]}>
        {displayQuestion.question.map((segment, index) => (
          <QuestionSegmentText key={index} segment={segment} />
        ))}
        <QuestionSegmentText segment={{ type: 'operator', content: '=' }} />
        <View style={[styles.questionInputContainer, addtionalContainerStyle]}>
          <Text style={[styles.questionInputText, addtionalContainerStyle && { color: addtionalContainerStyle.color }]}>{displayQuestion.answer}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={handleBack}>
          <CrossSvg width={24} height={24} fill={styles.headerSvg.color} />
        </Pressable>
        <View style={styles.headerProgressContainer}>
          <View style={[styles.headerProgressBar, { width: `${displayProgress * 100}%` }]} />
        </View>
      </View>
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>{t('enterTheAnswer')}</Text>
      </View>
      {questionRender()}
      <View style={styles.buttonContainer}>
        <BasicButton
          type={isCheckAnswerDisabled ? 'disabled' : 'primary'}
          text={t('checkAnswer')}
          onPress={handleCheckAnswer}
        />
      </View>
      <MockKeyboard onPress={handleKeyboardPress} />
    </SafeAreaView>
  )
}

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSvg: {
    color: palette.textExtraLight,
  },
  headerProgressContainer: {
    marginHorizontal: 16,
    height: 16,
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: palette.backgroundInvertedExtraLight,
  },
  headerProgressBar: {
    height: 16,
    borderRadius: 12,
    backgroundColor: palette.themeOrangePrimary,
  },
  tipContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tipText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.textSecondary,
  },

  questionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  questionText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  questionSegmentOperator: {
    color: palette.themeOrangePrimary,
  },
  questionSegmentNumber: {
    color: palette.textSecondary,
  },
  questionInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    minWidth: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: palette.borderPrimary,
  },
  questionInputContainerCorrect: {
    borderColor: palette.themeGreenDarker,
    backgroundColor: palette.themeGreenPrimary,
    color: palette.themeGreenDarker,
  },
  questionInputContainerIncorrect: {
    borderColor: palette.themeRedDarker,
    backgroundColor: palette.themeRedPrimary,
    color: palette.themeRedDarker,
  },
  questionInputText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: palette.textSecondary,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  keyboardContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  keyboardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  keyboardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: palette.textSecondary,
  },
}))
