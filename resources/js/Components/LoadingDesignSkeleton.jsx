export default function LoadingDesignSkeleton({ count = 3 }) {
    return (
        <div className="animate__animated animate__fadeIn">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                <div>
                    <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400">جاري توليد التصاميم...</div>
                    <div className="text-xs text-gray-400">قد يستغرق الأمر بضع ثوانٍ</div>
                </div>
            </div>
            <div className={`grid gap-4 ${count === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="skeleton aspect-square w-full"></div>
                        <div className="p-4 bg-white dark:bg-gray-900 space-y-2">
                            <div className="skeleton h-4 w-3/4 rounded"></div>
                            <div className="skeleton h-3 w-1/2 rounded"></div>
                            <div className="flex gap-2 pt-1">
                                <div className="skeleton h-8 flex-1 rounded-lg"></div>
                                <div className="skeleton h-8 w-16 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
