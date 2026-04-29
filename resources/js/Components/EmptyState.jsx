import { useTranslation } from 'react-i18next';

export default function EmptyState({ icon = '✦', title, subtitle }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center py-20 animate__animated animate__fadeIn">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 opacity-20 dark:opacity-10"
                 style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'}}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">
                {title || t('no_designs_yet')}
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
                {subtitle || t('no_designs_hint')}
            </p>
        </div>
    );
}
