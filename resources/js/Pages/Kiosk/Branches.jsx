import { useTranslation } from 'react-i18next';
import AppLayout from '../../Layouts/AppLayout';
import EmptyState from '../../Components/EmptyState';

function BranchCard({ branch, index }) {
    const { t } = useTranslation();
    const colors = [
        'from-indigo-500 to-purple-600',
        'from-pink-500 to-rose-600',
        'from-cyan-500 to-blue-600',
    ];
    const gradient = colors[index % colors.length];

    return (
        <div
            className="glass-card overflow-hidden animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg bg-gradient-to-br ${gradient}`}>
                        🏪
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        branch.is_active
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
                    }`}>
                        {branch.is_active ? t('branch_active') : t('branch_inactive')}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{branch.name_ar}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{branch.name_en}</p>

                {branch.address && (
                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="mt-0.5 flex-shrink-0">📍</span>
                        <span>{branch.address}</span>
                    </div>
                )}

                {branch.tablets?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                            أجهزة الكيوسك ({branch.tablets.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {branch.tablets.map(tablet => (
                                <span key={tablet.id} className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                                    {tablet.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Branches({ branches }) {
    const { t } = useTranslation();

    return (
        <AppLayout currentPage="branches">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 animate__animated animate__fadeInDown">
                    <h1 className="text-2xl font-black gradient-text">{t('branches_title')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        فروع متجر StyleAI
                    </p>
                </div>

                {!branches?.length ? (
                    <EmptyState icon="🏪" title={t('no_branches')} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {branches.map((branch, i) => (
                            <BranchCard key={branch.id} branch={branch} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
