import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PaymentApprovalModal({ isOpen, onClose, onConfirm, loading, error, prompt }) {
    const { t } = useTranslation();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    if (!isOpen) return null;

    const handleConfirm = (e) => {
        e.preventDefault();
        if (!adminEmail || !adminPassword || loading) return;
        onConfirm({ adminEmail, adminPassword });
    };

    const handleClose = () => {
        if (loading) return;
        setAdminEmail('');
        setAdminPassword('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate__animated animate__fadeIn"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md animate__animated animate__zoomIn">
                <div className="glass-card p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg animate__animated animate__pulse animate__infinite" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', animationDuration: '2s'}}>
                            💎
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                            {t('payment_required')}
                        </h2>
                        <div className="text-3xl font-black gradient-text mb-2">
                            {t('payment_price')}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('payment_desc')}
                        </p>
                    </div>

                    {/* Prompt preview */}
                    {prompt && (
                        <div className="mb-5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">التصميم المطلوب:</div>
                            <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{prompt}</div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate__animated animate__shakeX">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <span>⚠️</span>
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleConfirm} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {t('admin_email')}
                            </label>
                            <input
                                type="email"
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                placeholder="admin@styleai.test"
                                className="input-field"
                                disabled={loading}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {t('admin_password')}
                            </label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input-field"
                                disabled={loading}
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="btn-secondary flex-1 py-3 text-sm"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                type="submit"
                                disabled={!adminEmail || !adminPassword || loading}
                                className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        جاري التحقق...
                                    </>
                                ) : (
                                    <>
                                        <span>💳</span>
                                        {t('confirm_payment')}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
