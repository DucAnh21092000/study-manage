import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import TRANSLATION_EN from './locales/en/translation.json';
import TRANSLATION_VI from './locales/vi/translation.json';

const resources = {
   en: {
      translation: TRANSLATION_EN,
   },
   vi: {
      translation: TRANSLATION_VI,
   },
};

i18n.use(initReactI18next).init({
   resources,
   lng: 'vi',
   interpolation: {
      escapeValue: false,
   },
});

export default i18n;
