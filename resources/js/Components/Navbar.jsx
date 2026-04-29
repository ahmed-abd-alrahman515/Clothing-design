import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Navbar({ user, branch, onMenuToggle }) {
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0 px-6 py-4 flex items-center justify-between animate__animated animate__fadeInDown">
            {/* Logo + Brand */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'}}>
                        ✦
                    </div>
                    <div>
                        <div className="font-black text-lg leading-none gradient-text">StyleAI</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-none">Kiosk</div>
                    </div>
                </div>
                {branch && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                            {branch.name_ar}
                        </span>
                    </div>
                )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
                {user && (
                    <div className="hidden md:flex items-center gap-2 ms-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{background: 'linear-gradient(135deg, #6366f1, #ec4899)'}}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden lg:block">
                            <div className="text-sm font-semibold leading-none">{user.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
