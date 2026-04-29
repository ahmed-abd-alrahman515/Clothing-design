import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChatInput({ onGenerate, disabled, loading }) {
    const { t } = useTranslation();
    const [prompt, setPrompt] = useState('');
    const maxLength = 1200;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim().length < 5 || disabled || loading) return;
        onGenerate(prompt.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card p-4">
            <div className="relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('prompt_placeholder')}
                    disabled={disabled || loading}
                    maxLength={maxLength}
                    rows={3}
                    className="input-field resize-none pe-16 text-sm leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="absolute bottom-3 end-3 flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400">
                        {prompt.length}/{maxLength}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Enter ↵ {t('generate')}
                </p>
                <button
                    type="submit"
                    disabled={prompt.trim().length < 5 || disabled || loading}
                    className={`
                        btn-primary flex items-center gap-2 py-2.5 px-5 text-sm
                        animate__animated animate__pulse animate__infinite
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                        ${loading ? 'animate-none' : ''}
                    `}
                    style={{ animationDuration: '2s' }}
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {t('generating')}
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            {t('generate')}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
