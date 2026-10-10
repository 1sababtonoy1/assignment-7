import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="w-full max-w-lg bg-base-100 border border-base-200 rounded-3xl p-10 shadow-sm">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-base-200 flex items-center justify-center text-5xl">
                    🛒
                </div>

                <p className="text-6xl md:text-7xl font-bold text-green-700 mt-6">
                    ৪০৪
                </p>

                <h1 className="text-2xl md:text-3xl font-bold mt-3">
                    পেজটি খুঁজে পাওয়া যায়নি
                </h1>

                <p className="text-base-content/60 mt-2">
                    আপনি যে পণ্য বা পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, অথবা লিংকটি ভুল।
                </p>

                <Link
                    href="/"
                    className="btn mt-7 rounded-xl bg-green-700 hover:bg-green-800 border-0 text-white shadow-md px-8"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default NotFound;