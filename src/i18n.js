import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationHU from './locales/hu/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  hu: {
    translation: translationHU
  }
};

const userLanguage = typeof window !== 'undefined' 
  ? (window.navigator.language || window.navigator.userLanguage) 
  : 'en';
const defaultLang = userLanguage.toLowerCase().startsWith('hu') ? 'hu' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLang, // dynamic browser detection
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
