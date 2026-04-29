import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';
import AppLayout from '../../Layouts/AppLayout';
import ChatInput from '../../Components/ChatInput';
import DesignGrid from '../../Components/DesignGrid';
import LoadingDesignSkeleton from '../../Components/LoadingDesignSkeleton';
import PaymentApprovalModal from '../../Components/PaymentApprovalModal';
import EmptyState from '../../Components/EmptyState';
import 'animate.css';

export default function KioskIndex({ activeSession: initialSession, branches }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;

    const [session, setSession] = useState(initialSession);
    const [messages, setMessages] = useState(() => {
        if (!initialSession) return [];
        return initialSession.design_requests?.map(req => ({
            id: req.id,
            prompt: req.prompt,
            type: req.type,
            status: req.status,
            designs: req.generated_designs || [],
        })) || [];
    });

    const [loading, setLoading] = useState(false);
    const [pendingPrompt, setPendingPrompt] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [showNewSession, setShowNewSession] = useState(!initialSession);
    const [customerName, setCustomerName] = useState('');
    const [creatingSession, setCreatingSession] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const createSession = async () => {
        setCreatingSession(true);
        try {
            const res = await axios.post('/api/design-sessions', {
                customer_name: customerName || null,
                branch_id: auth.user?.branch_id || null,
            });
            setSession(res.data);
            setMessages([]);
            setShowNewSession(false);
        } catch (e) {
            console.error(e);
        } finally {
            setCreatingSession(false);
        }
    };

    const handleGenerate = async (prompt) => {
        if (!session) {
            setShowNewSession(true);
            setPendingPrompt(prompt);
            return;
        }

        if (session.free_generation_used) {
            setPendingPrompt(prompt);
            setShowPaymentModal(true);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`/api/design-sessions/${session.id}/generate`, { prompt });
            const { design_request, designs } = res.data;

            setMessages(prev => [...prev, {
                id: design_request.id,
                prompt,
                type: 'free',
                status: 'completed',
                designs,
            }]);

            setSession(prev => ({ ...prev, free_generation_used: true }));
        } catch (err) {
            if (err.response?.status === 402) {
                setPendingPrompt(prompt);
                setShowPaymentModal(true);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    prompt,
                    type: 'error',
                    status: 'failed',
                    designs: [],
                    error: err.response?.data?.message || t('error_generate'),
                }]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePaidGenerate = async ({ adminEmail, adminPassword }) => {
        setPaymentLoading(true);
        setPaymentError('');
        try {
            const res = await axios.post(`/api/design-sessions/${session.id}/generate-paid`, {
                prompt: pendingPrompt,
                admin_email: adminEmail,
                admin_password: adminPassword,
            });

            const { design_request, designs } = res.data;
            setMessages(prev => [...prev, {
                id: design_request.id,
                prompt: pendingPrompt,
                type: 'paid',
                status: 'completed',
                designs,
            }]);

            setSession(prev => ({
                ...prev,
                paid_generations_count: (prev.paid_generations_count || 0) + 1,
            }));

            setShowPaymentModal(false);
            setPendingPrompt('');
        } catch (err) {
            setPaymentError(err.response?.data?.message || t('wrong_credentials'));
        } finally {
            setPaymentLoading(false);
        }
    };

    const startNewSession = async () => {
        setCustomerName('');
        setShowNewSession(true);
    };

    return (
        <AppLayout currentPage="kiosk">
            <div className="max-w-4xl mx-auto h-full flex flex-col">

                {/* New Session Setup */}
                {showNewSession && (
                    <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="w-full max-w-md glass-card p-8 animate__animated animate__zoomIn">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
                                    ✨
                                </div>
                                <h2 className="text-xl font-black text-gray-900 dark:text-white">{t('new_session_title')}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('kiosk_subtitle')}</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        {t('customer_name')}
                                    </label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={e => setCustomerName(e.target.value)}
                                        className="input-field"
                                        placeholder={t('customer_name')}
                                        onKeyDown={e => e.key === 'Enter' && createSession()}
                                    />
                                </div>
                                <button
                                    onClick={createSession}
                                    disabled={creatingSession}
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    {creatingSession ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                    ) : '✦'}
                                    {t('start_session')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Chat Header */}
                <div className="flex items-center justify-between mb-6 animate__animated animate__fadeInDown">
                    <div>
                        <h1 className="text-2xl font-black gradient-text">{t('kiosk_welcome')}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('kiosk_subtitle')}</p>
                    </div>
                    {session && (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                    {t('session_active')}
                                </span>
                            </div>
                            <button
                                onClick={startNewSession}
                                className="btn-secondary text-sm py-2 px-4"
                            >
                                + {t('new_session')}
                            </button>
                        </div>
                    )}
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto scrollbar-thin space-y-8 mb-6 min-h-0">
                    {messages.length === 0 && !loading && (
                        <EmptyState
                            icon="🎨"
                            title={t('no_designs_yet')}
                            subtitle={t('no_designs_hint')}
                        />
                    )}

                    {messages.map((msg) => (
                        <div key={msg.id} className="space-y-4 animate__animated animate__fadeInUp">
                            {/* User prompt bubble */}
                            <div className="flex justify-end">
                                <div className="max-w-lg px-5 py-3 rounded-2xl rounded-te-sm text-white text-sm leading-relaxed shadow-lg" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
                                    {msg.prompt}
                                </div>
                            </div>

                            {/* Designs or Error */}
                            {msg.status === 'failed' ? (
                                <div className="flex justify-start">
                                    <div className="glass-card px-5 py-4 max-w-sm">
                                        <div className="flex items-center gap-2 text-red-500">
                                            <span>⚠️</span>
                                            <span className="text-sm font-medium">{msg.error || t('error_generate')}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : msg.designs?.length > 0 ? (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{background: 'linear-gradient(135deg, #6366f1, #ec4899)'}}>
                                            ✦
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            {t('generated_designs')} ({msg.designs.length})
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${msg.type === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                                            {msg.type === 'free' ? t('free_design') : t('paid_design')}
                                        </span>
                                    </div>
                                    <DesignGrid designs={msg.designs} type={msg.type} />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    {loading && (
                        <LoadingDesignSkeleton count={session?.free_generation_used ? 5 : 3} />
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Chat Input */}
                <div className="sticky bottom-0 animate__animated animate__fadeInUp">
                    <ChatInput
                        onGenerate={handleGenerate}
                        disabled={!session || session.status === 'closed'}
                        loading={loading}
                    />
                    {session?.free_generation_used && (
                        <div className="mt-2 text-center">
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                💎 التصاميم التالية مدفوعة - 50 جنيه لكل مجموعة
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentApprovalModal
                isOpen={showPaymentModal}
                onClose={() => {
                    setShowPaymentModal(false);
                    setPaymentError('');
                }}
                onConfirm={handlePaidGenerate}
                loading={paymentLoading}
                error={paymentError}
                prompt={pendingPrompt}
            />
        </AppLayout>
    );
}
