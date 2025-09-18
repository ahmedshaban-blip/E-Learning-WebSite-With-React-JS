import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector) // detect language from browser
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: "Welcome to our platform",
                    view_pricing: "View Pricing",
                },
            },
            ar: {
                translation: {
                    welcome: "مرحباً بك في منصتنا",
                    view_pricing: "عرض الأسعار",
                },
            },
        },
        fallbackLng: "en", // default lan
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
