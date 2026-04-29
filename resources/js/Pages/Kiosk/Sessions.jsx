import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../Layouts/AppLayout';
import EmptyState from '../../Components/EmptyState';

function SessionCard({ session }) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    const totalDesigns = session.design_requests?.reduce(
        (sum, req) => sum + (req.generated_designs?.length || 0),
        0
    ) || 0;

    const totalPaid = session.design_requests?.reduce(
        (sum, req) => sum + (parseFloat(req.price) || 0),
        0
    ) || 0;

    const date = new Date(session.created_at).toLocaleDateString('ar-EG', {
        year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <div className="glass-card overflow-hidden animate__animated animate__fadeInUp">
            <div
                className="p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
                            🗂
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                                {session.customer_name || 'عميل بدون اسم'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{date}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-end">
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{totalDesigns} تصميم</div>
                            {totalPaid > 0 && (
                                <div className="text-xs text-purple-600 dark:text-purple-400">{totalPaid} جنيه</div>
                            )}
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            session.status === 'active'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                            {session.status === 'active' ? t('status_active') : t('status_closed')}
                        </span>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-800/20 animate__animated animate__fadeIn">
                    {session.design_requests?.length === 0 ? (
                        <div className="text-center py-4 text-gray-400 text-sm">لا توجد تصاميم</div>
                    ) : (
                        <div className="space-y-4">
                            {session.design_requests?.map(req => (
                                <div key={req.id}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${req.type === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                                            {req.type === 'free' ? t('free_design') : t('paid_design')}
                                        </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{req.prompt}</span>
                                    </div>
                                    {req.generated_designs?.length > 0 && (
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                            {req.generated_designs.map(d => (
                                                <div key={d.id} className="aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                                                    <img
                                                        src={d.image_src || d.image_url}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Sessions({ sessions }) {
    const { t } = useTranslation();
    const items = sessions?.data || sessions || [];

    return (
        <AppLayout currentPage="sessions">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 animate__animated animate__fadeInDown">
                    <h1 className="text-2xl font-black gradient-text">{t('sessions_title')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        جميع جلسات التصميم السابقة
                    </p>
                </div>

                {items.length === 0 ? (
                    <EmptyState icon="🗂" title={t('no_sessions')} />
                ) : (
                    <div className="space-y-4">
                        {items.map(session => (
                            <SessionCard key={session.id} session={session} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
