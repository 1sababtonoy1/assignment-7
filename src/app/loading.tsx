const LoadingPage = () => {
    return (
        <div
            className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4 py-16"
            role="status"
            aria-live="polite"
        >
            {/* ঘুরতে থাকা রিং + মাঝখানে কার্ট */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border-4 border-green-100" />
                <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-600 animate-spin" />
                <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center text-3xl animate-pulse">
                    🛒
                </div>
            </div>

            <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">লোড হচ্ছে...</p>
                <p className="text-sm text-base-content/60 mt-1">
                    আজকের বাজারদর আনা হচ্ছে, একটু অপেক্ষা করুন।
                </p>
            </div>

            <span className="sr-only">লোড হচ্ছে</span>
        </div>
    );
};

export default LoadingPage;