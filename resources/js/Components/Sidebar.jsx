import { useTranslation } from 'react-i18next';
import { Link, router } from '@inertiajs/react';

const NavItem = ({ icon, label, href, active, onClick }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`sidebar-item ${active ? 'active' : ''}`}
    >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
    </Link>
);

export default function Sidebar({ currentPage = 'kiosk', isOpen, onClose }) {
    const { t } = useTranslation();

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const items = [
        { id: 'kiosk', icon: '✦', label: t('new_session'), href: '/kiosk' },
        { id: 'sessions', icon: '🗂', label: t('previous_designs'), href: '/kiosk/sessions' },
        { id: 'branches', icon: '🏪', label: t('branches'), href: '/kiosk/branches' },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed lg:static inset-y-0 start-0 z-50 lg:z-auto
                w-64 h-full flex flex-col
                bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
                border-e border-gray-200 dark:border-gray-800
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                animate__animated animate__fadeInLeft
            `}>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'}}>
                                ✦
                            </div>
                            <div>
                                <div className="font-black text-xl gradient-text">StyleAI</div>
                                <div className="text-xs text-gray-400">Kiosk System</div>
                            </div>
                        </div>
                        <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
                    {items.map(item => (
                        <NavItem
                            key={item.id}
                            {...item}
                            active={currentPage === item.id}
                            onClick={onClose}
                        />
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                    <div className="px-4 py-2">
                        <div className="text-xs text-gray-400 text-center">
                            StyleAI Kiosk v1.0
                        </div>
                        <div className="text-xs text-gray-300 dark:text-gray-600 text-center mt-0.5">
                            Powered by Google Gemini
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="sidebar-item w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="text-sm font-medium">{t('logout')}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
