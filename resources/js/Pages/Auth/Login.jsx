import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import ThemeToggle from '../../Components/ThemeToggle';
import LanguageToggle from '../../Components/LanguageToggle';
import 'animate.css';

export default function Login({ errors: serverErrors }) {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const { lang } = useLanguage();

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -start-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, #6366f1, #8b5cf6)'}}></div>
                <div className="absolute -bottom-40 -end-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, #ec4899, #8b5cf6)', animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, #6366f1, transparent)', animationDelay: '0.5s'}}></div>
            </div>

            {/* Top controls */}
            <div className="absolute top-6 end-6 flex items-center gap-2 z-10 animate__animated animate__fadeIn">
                <LanguageToggle />
                <ThemeToggle />
            </div>

            {/* Left panel - Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center flex-1 p-12 relative">
                <div className="text-center animate__animated animate__fadeInLeft">
                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-5xl font-black mx-auto mb-8 shadow-2xl" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'}}>
                        ✦
                    </div>
                    <h1 className="text-5xl font-black gradient-text mb-4">StyleAI</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-12">{t('tagline')}</p>

                    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                        {[
                            { icon: '🎨', label: 'AI Design' },
                            { icon: '⚡', label: 'Instant' },
                            { icon: '💎', label: 'Premium' },
                        ].map(item => (
                            <div key={item.label} className="glass-card p-4 text-center">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative design previews */}
                    <div className="mt-12 flex gap-3 justify-center opacity-60">
                        {['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-orange-500 to-red-500'].map((g, i) => (
                            <div key={i} className={`w-16 h-16 rounded-xl bg-gradient-to-br ${g} shadow-lg flex items-center justify-center text-white text-xl`} style={{animationDelay: `${i * 0.2}s`}}>
                                👕
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel - Login form */}
            <div className="flex-1 lg:max-w-md flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm animate__animated animate__fadeInRight">
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-4 shadow-xl" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'}}>
                            ✦
                        </div>
                        <h1 className="text-3xl font-black gradient-text">StyleAI</h1>
                    </div>

                    <div className="glass-card p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{t('login_title')}</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{t('login_subtitle')}</p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    {t('email')}
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className={`input-field ${errors.email ? 'border-red-400 dark:border-red-600' : ''}`}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-500 animate__animated animate__shakeX">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    {t('password')}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={`input-field ${errors.password ? 'border-red-400 dark:border-red-600' : ''}`}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded text-indigo-600 border-gray-300"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                                    {t('remember_me')}
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3.5"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        جاري الدخول...
                                    </>
                                ) : (
                                    <>
                                        <span>🔐</span>
                                        {t('login')}
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <div className="text-xs text-gray-400 text-center space-y-1">
                                <div>Admin: admin@styleai.test</div>
                                <div>Staff: staff@styleai.test</div>
                                <div className="text-gray-300 dark:text-gray-600">Password: password</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
