"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // ড্রপডাউন বন্ধ করার জন্য
    const closeDropdown = () => {
        (document.activeElement as HTMLElement | null)?.blur();
    };

    const handleSignOut = async () => {
        closeDropdown();
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    // সেশন লোড হওয়ার সময় বাটন ঝলকানি এড়াতে
    if (isPending) {
        return <div className="h-10 w-32" />;
    }

    // লগইন করা না থাকলে
    if (!user) {
        return (
            <div className="flex items-center gap-4 md:gap-8">
                <Link
                    href="/signin"
                    className="text-sm font-semibold text-gray-800 transition hover:text-green-700 md:text-base"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 md:px-6 md:text-base"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    // লগইন করা থাকলে
    const firstName = user.name?.split(" ")[0] ?? "";

    return (
        <div className="dropdown dropdown-end">
            {/* অ্যাভাটার + নাম + তীর */}
            <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 cursor-pointer select-none"
            >
                {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.image}
                        alt={user.name ?? "User"}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                        {firstName.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="text-sm font-medium text-gray-800 md:text-base">
                    {firstName}
                </span>
                <span className="text-[10px] text-gray-500">▼</span>
            </div>

            {/* ড্রপডাউন মেনু */}
            <div
                tabIndex={0}
                className="dropdown-content z-20 mt-3 w-64 rounded-2xl bg-base-100 p-4 shadow-lg border border-base-200"
            >
                <div className="pb-3 border-b border-base-200">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 break-all">{user.email}</p>
                </div>

                <div className="pt-3 space-y-3">
                    <Link
                        href="/profile"
                        onClick={closeDropdown}
                        className="flex items-center gap-2 text-sm text-gray-800 hover:text-green-700 transition"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        আমার প্রোফাইল
                    </Link>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12l4-4m-4 4l4 4m-4-4h13m0-7v3m0 8v3"
                            />
                        </svg>
                        সাইন আউট
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;