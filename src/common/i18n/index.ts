import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import en from '../../locales/en.json'
import zhCN from '../../locales/zh-cn.json'

const deviceLanguage = 'zh-CN'

export const defaultNS = 'translation'

const resources = {
  'zh-CN': { [defaultNS]: zhCN },
  en: { [defaultNS]: en },
}

export const initI18n = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      // debug: true,
      defaultNS,
      lng: deviceLanguage ?? 'zh-CN',
      fallbackLng: 'zh-CN',
      resources,
    })
}

export { useTranslation as useI18n }
