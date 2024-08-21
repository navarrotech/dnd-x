// Copyright © 2024 Navarrotech

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

// Edit the default language here:
export const defaultLanguage = 'en' as const

// The core i18next instance that will be used throughout the app to manage language
export const i18Instance = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ns: [ 'translation', ],
    defaultNS: 'translation',
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
  })

// Add more languages here as you support them
export const supportedLanguages = [
  'en',
] as const

export const languageToFlag: Record<LanguageKey, string> = {
  'en': 'US',
  'es': 'ES',
  'fr': 'FR',
  'ja': 'JP',
} as const

// Add/remove from this list if needed
// It serves as a base of all standard languages
export const languageLocalizedRecord: Record<string, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ar: 'العربية',
  hi: 'हिन्दी',
  fr: 'Français',
  ru: 'Русский',
  pt: 'Português',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  vi: 'Tiếng Việt',
  it: 'Italiano',
  tr: 'Türkçe',
  pl: 'Polski',
  uk: 'Українська',
  nl: 'Nederlands',
  th: 'ไทย',
  sv: 'Svenska',
  da: 'Dansk',
  fi: 'Suomi',
  no: 'Norsk',
  he: 'עברית',
  el: 'Ελληνικά',
  hu: 'Magyar',
  cs: 'Čeština',
  ro: 'Română',
  bg: 'Български',
  sk: 'Slovenčina',
  lt: 'Lietuvių',
  lv: 'Latviešu',
  et: 'Eesti',
  hr: 'Hrvatski',
  sl: 'Slovenščina',
  sr: 'Српски',
  mk: 'Македонски',
  bs: 'Bosanski',
  mt: 'Malti',
  is: 'Íslenska',
  ga: 'Gaeilge',
  cy: 'Cymraeg',
  be: 'Беларуская',
  hy: 'Հայերեն',
  ka: 'ქართული',
  az: 'Azərbaycan',
  eu: 'Euskara',
  ca: 'Català',
  gl: 'Galego',
  sq: 'Shqip',
  mn: 'Монгол',
  ur: 'اردو',
  fa: 'فارسی',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  ml: 'മലയാളം',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  pa: 'ਪੰਜਾਬੀ',
  bn: 'বাংলা',
  my: 'မြန်မာဘာသာ',
  km: 'ខ្មែរ',
  lo: 'ລາວ',
  si: 'සිංහල',
} as const

// Usable types
export type SupportedLanguages = typeof supportedLanguages[number]
export type LanguageKey = keyof typeof languageLocalizedRecord
