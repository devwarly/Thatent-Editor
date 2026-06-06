import { createI18n } from 'vue-i18n'

import en_US from './locales/en-US.json'
import zh_CN from './locales/zh-CN.json'
import ptBR from './locales/pt-BR.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  defaultLocale: 'pt-BR',
  warnHtmlMessage: false,
  messages: {
    'en-US': en_US,
    'zh-CN': zh_CN,
    'pt-BR': ptBR,
  },
})
