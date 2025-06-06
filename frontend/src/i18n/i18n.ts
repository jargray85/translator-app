import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import frTranslation from './locales/fr.json';
import deTranslation from './locales/de.json';
import thTranslation from './locales/th.json';
import zhTranslation from './locales/zh.json';
import koTranslation from './locales/ko.json';
import ruTranslation from './locales/ru.json';
import itTranslation from './locales/it.json';
import ptTranslation from './locales/pt.json';
import jaTranslation from './locales/ja.json';

// Configure i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      de: {
        translation: deTranslation,
      },
      th: {
        translation: thTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
      ko: {
        translation: koTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
      it: {
        translation: itTranslation,
      },
      pt: {
        translation: ptTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n; 