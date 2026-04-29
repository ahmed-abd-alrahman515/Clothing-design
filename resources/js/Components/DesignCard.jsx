import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function DesignCard({ design, type = 'free', index = 0 }) {
    const { t } = useTranslation();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = design.image_src;
        link.download = `styleai-design-${design.id}.png`;
        link.click();
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div
            className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate__animated animate__zoomIn"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 skeleton animate-pulse"></div>
                )}
                <img
                    src={design.image_src}
                    alt={design.prompt_used}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Badge */}
                <div className="absolute top-3 start-3">
                    <span className={`
                        px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm
                        ${type === 'free'
                            ? 'bg-green-500/90'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'}
                    `}>
                        {type === 'free' ? t('free_design') : t('paid_design')}
                    </span>
                </div>

                {/* Position badge */}
                <div className="absolute top-3 end-3">
                    <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                        {design.position + 1}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {design.prompt_used}
                </p>

                <div className="flex gap-2">
                    <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-200 hover:scale-105"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                        {t('download')}
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 ${
                            saved
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        {saved ? '✓' : t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
