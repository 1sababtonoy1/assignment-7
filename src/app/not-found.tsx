import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 px-4 py-12">
            <div className="text-center max-w-lg">
                {/* বড় ৪০৪ লেখা, গ্লো ইফেক্টসহ */}
                <h1 className="text-[8rem] sm:text-[12rem] font-black leading-none bg-gradient-to-b from-green-500 to-green-800 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(22,163,74,0.4)] select-none">
                    404
                </h1>

                {/* মাঝের ডিভাইডার */}
                <div className="flex items-center justify-center gap-3 my-4">
                    <span className="h-px w-16 bg-green-400"></span>
                    <span className="text-xl">🛒</span>
                    <span className="h-px w-16 bg-green-400"></span>
                </div>

                {/* বার্তা */}
                <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3">
                    পেজটি খুঁজে পাওয়া যায়নি
                </h2>
                <p className="text-green-800/80 mb-8 leading-relaxed">
                    দুঃখিত! আপনি যে পেজ বা পণ্যটি খুঁজছেন সেটি হয়তো সরানো হয়েছে,
                    অথবা লিংকটি ভুল। চলুন, আজকের বাজারদরে ফিরে যাই।
                </p>

                {/* বাটন */}
                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-full font-semibold text-white
                               bg-gradient-to-r from-green-600 to-emerald-700
                               shadow-lg shadow-green-600/40
                               hover:from-green-700 hover:to-emerald-800
                               hover:shadow-xl hover:shadow-green-700/50
                               hover:-translate-y-0.5
                               active:translate-y-0
                               transition-all duration-300 ease-out"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default NotFound;