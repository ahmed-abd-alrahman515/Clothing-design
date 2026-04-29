import { useLanguage } from '../hooks/useLanguage';

export default function LanguageToggle() {
    const { lang, toggle } = useLanguage();

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all duration-200 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
            <span className="text-base">{lang === 'ar' ? '🇸🇦' : '🇬🇧'}</span>
            <span>{lang === 'ar' ? 'EN' : 'ع'}</span>
        </button>
    );
}
