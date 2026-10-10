"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const { name, email, password, confirmPassword } = Object.fromEntries(
            formData.entries()
        ) as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        if (password !== confirmPassword) {
            setError("পাসওয়ার্ড দুটি মিলছে না");
            return;
        }

        setLoading(true);

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
        });

        setLoading(false);

        if (error) {
            console.log(error);
            setError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন");
            return;
        }

        if (data) {
            router.push("/");
            router.refresh();
        }
    };

    // Google / GitHub দিয়ে সাইন আপ (নতুন ইউজার হলে অ্যাকাউন্ট নিজে থেকেই তৈরি হয়)
    // সফল হলে ব্রাউজার প্রোভাইডারের পেজে চলে যায়, তারপর callbackURL ("/")-এ ফিরে আসে
    const handleSocial = async (provider: "google" | "github") => {
        setError("");
        setSocialLoading(provider);

        const { error } = await authClient.signIn.social({
            provider,
            callbackURL: "/",
        });

        // এরর না হলে পেজ রিডাইরেক্ট হয়ে যায়, তাই লোডিং শুধু এররের ক্ষেত্রে বন্ধ করছি
        if (error) {
            console.log(error);
            toast.error(error.message || "সাইন আপ করা যায়নি, আবার চেষ্টা করুন");
            setSocialLoading(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-12">
            {/* শিরোনাম */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-base-content/60 mt-2">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            {/* ফর্ম কার্ড */}
            <div className="w-full max-w-lg bg-base-100 border border-base-200 rounded-3xl p-7 shadow-sm">
                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium">
                            নাম
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="input w-full rounded-xl bg-base-100 border-base-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="input w-full rounded-xl bg-base-100 border-base-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block font-medium">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="input w-full rounded-xl bg-base-100 border-base-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block font-medium">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={8}
                            placeholder="আবার লিখুন"
                            className="input w-full rounded-xl bg-base-100 border-base-300"
                        />
                    </div>

                    {error && <p className="text-sm text-error">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full rounded-xl bg-green-700 hover:bg-green-800 border-0 text-white shadow-md"
                    >
                        {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>
                </form>

                {/* অথবা */}
                <div className="flex items-center gap-4 my-5">
                    <div className="flex-1 h-px bg-base-300" />
                    <span className="text-sm text-base-content/70">অথবা</span>
                    <div className="flex-1 h-px bg-base-300" />
                </div>

                {/* সোশ্যাল সাইন আপ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocial("google")}
                        disabled={socialLoading !== null}
                        className="btn bg-base-100 border border-base-300 rounded-xl font-semibold shadow-none"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 48 48" aria-hidden="true">
                            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
                            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
                        </svg>
                        {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocial("github")}
                        disabled={socialLoading !== null}
                        className="btn bg-base-100 border border-base-300 rounded-xl font-semibold shadow-none"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
                    </button>
                </div>

                {/* সাইন ইন লিংক */}
                <p className="text-center mt-5">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signin" className="text-green-700 hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>

            {/* হোমে ফিরে যান */}
            <Link
                href="/"
                className="mt-8 text-base-content/60 hover:text-base-content transition-colors"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignUpPage;