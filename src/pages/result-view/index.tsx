import { router, useLocalSearchParams } from 'expo-router'
import { Dimensions, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import PicBSvg from '@/assets/icons/pic-b.svg'
import BasicButton from '@/common/components/button/basic'
import { useI18n } from '@/common/i18n'
import { createStylesModel, useThemedStyles } from '@/common/interface/theme'
import { useNavigationNoHeader } from '@/common/interface/view'

export default function ResultView () {
  useNavigationNoHeader()
  const styles = useThemedStyles(stylesModel)
  const { t } = useI18n()

  const { time, total, correct } = useLocalSearchParams<{ time: string, total: string, correct: string }>()
  const accuracy = ~~((Number(correct) / Number(total)) * 100)

  const isPerfect = accuracy === 100

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pictureContainer}>
        <PicBSvg width={200} height={200} />
      </View>
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>{isPerfect ? t('perfect') : t('keepGoing')}</Text>
        <Text style={styles.tipTextSmall}>{isPerfect ? t('perfectTip') : t('keepGoingTip')}</Text>
      </View>
      <View style={styles.resultContainer}>
        <View style={[styles.resultItem, { backgroundColor: '#f0d43a' }]}>
          <Text style={styles.resultItemText}>{t('time')}</Text>
          <View style={styles.resultItemValueContainer}>
            <Text style={[styles.resultItemValue, { color: '#f0d43a' }]}>{time}秒</Text>
          </View>
        </View>
        <View style={[styles.resultItem, { backgroundColor: '#22b2da' }]}>
          <Text style={styles.resultItemText}>{t('correctCount')}</Text>
          <View style={styles.resultItemValueContainer}>
            <Text style={[styles.resultItemValue, { color: '#22b2da' }]}>{correct}/{total}</Text>
          </View>
        </View>
        <View style={[styles.resultItem, { backgroundColor: '#b8cd58' }]}>
          <Text style={styles.resultItemText}>{t('accuracy')}</Text>
          <View style={styles.resultItemValueContainer}>
            <Text style={[styles.resultItemValue, { color: '#b8cd58' }]}>{accuracy}%</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton text={t('backToHome')} onPress={handleBackToHome} />
      </View>
    </SafeAreaView>
  )
}

const width = Dimensions.get('window').width
const resultItemWidth = (width - 16 * 5) / 3
const resultItemHeight = resultItemWidth * 0.84

const stylesModel = createStylesModel((palette) => ({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundPrimary,
    paddingTop: 84,
  },

  pictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  tipContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 4,
    alignItems: 'center',
    marginTop: 28,
  },
  tipText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: palette.themeGreenPure,
  },
  tipTextSmall: {
    fontSize: 20,
    color: palette.textQuaternary,
  },

  resultContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  resultItem: {
    borderRadius: 12,
    width: resultItemWidth,
    height: resultItemHeight,
    alignItems: 'center',
  },
  resultItemText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  resultItemValueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: resultItemHeight - 24 - 2,
    width: resultItemWidth - 4,
    borderRadius: 10,
    backgroundColor: palette.backgroundPrimary,
  },
  resultItemValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 54,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
}))
