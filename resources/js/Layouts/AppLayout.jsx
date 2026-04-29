import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

export default function AppLayout({ children, currentPage = 'kiosk' }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isDark } = useTheme();
    const { lang } = useLanguage();

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', lang);
    }, [lang]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
            <Sidebar
                currentPage={currentPage}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar
                    user={auth?.user}
                    branch={auth?.user?.branch_id ? { name_ar: 'الفرع الرئيسي' } : null}
                    onMenuToggle={() => setSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
