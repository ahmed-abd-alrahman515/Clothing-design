import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language || 'ar');

    const toggle = () => {
        const next = lang === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(next);
        setLang(next);
        localStorage.setItem('styleai_lang', next);

        const root = document.documentElement;
        root.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', next);
        if (next === 'ar') {
            root.classList.remove('lang-en');
        } else {
            root.classList.add('lang-en');
        }
    };

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', lang);
        if (lang !== 'ar') {
            root.classList.add('lang-en');
        }
    }, []);

    return { lang, toggle, isRtl: lang === 'ar' };
}
