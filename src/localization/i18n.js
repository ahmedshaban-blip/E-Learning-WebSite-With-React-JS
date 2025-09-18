import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./en/translation.json";
import arTranslation from "./ar/translation.json";

i18n
    .use(LanguageDetector) // detect language from browser
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            ar: {
                translation: arTranslation,
            },
        },
        fallbackLng: "en", // default lan
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
