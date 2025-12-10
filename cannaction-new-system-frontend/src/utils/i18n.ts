import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import english from './translate/english.json';
import italian from './translate/italian.json';
import german from './translate/german.json';
import polish from './translate/polish.json';
import slovenian from './translate/slovenian.json';
import finnish from './translate/finnish.json';

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: 'i18nextLng',
			caches: ['localStorage'],
		},
		resources: {
			en: {
				translation: { ...english },
			},
			it: {
				translation: { ...italian },
			},
			de: {
				translation: { ...german },
			},
			pl: {
				translation: { ...polish },
			},
			sl: {
				translation: { ...slovenian },
			},
			fi: {
				translation: { ...finnish },
			},
		},
	});

// Função para atualizar o idioma quando o usuário fizer login
export const updateLanguage = (languageCode: string) => {
	i18n.changeLanguage(languageCode);
	localStorage.setItem('i18nextLng', languageCode);
};

export default i18n;
