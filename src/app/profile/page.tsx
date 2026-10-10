"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [updating, setUpdating] = useState(false);

    // লগইন করা না থাকলে সাইন ইন পেজে পাঠিয়ে দেয়
    useEffect(() => {
        if (!isPending && !user) {
            router.replace("/signin");
        }
    }, [isPending, user, router]);

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "").trim();

        if (!name) {
            toast.error("নাম লিখুন");
            return;
        }

        setUpdating(true);

        const { error } = await authClient.updateUser({ name });

        setUpdating(false);

        if (error) {
            console.log(error);
            toast.error(error.message || "আপডেট করা যায়নি, আবার চেষ্টা করুন");
            return;
        }

        toast.success("প্রোফাইল আপডেট হয়েছে");
        router.refresh();
    };

    // সেশন লোড হওয়ার সময় বা রিডাইরেক্টের আগে কিছু দেখাবে না
    if (isPending || !user) {
        return <div className="min-h-[60vh]" />;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
            {/* শিরোনাম */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">আমার প্রোফাইল</h1>
                <p className="text-base-content/60 mt-1">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            {/* ইউজার কার্ড */}
            <div className="bg-base-100 border border-base-200 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                    {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.image}
                            alt={user.name ?? "User"}
                            className="w-20 h-20 rounded-2xl object-cover bg-base-200"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-green-600 text-white flex items-center justify-center text-3xl font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <h2 className="text-2xl font-semibold">{user.name}</h2>
                        <p className="text-base-content/60 mt-1 break-all">{user.email}</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn bg-base-100 border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 rounded-xl shadow-none font-medium"
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

            {/* তথ্য আপডেট ফর্ম */}
            <div className="bg-base-100 border border-base-200 rounded-3xl p-6">
                <h2 className="text-lg font-bold mb-5">তথ্য</h2>

                {/* key: সেশন লোড হলে ইনপুটে বর্তমান নাম বসে যায় */}
                <form key={user.id} onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block font-medium">
                            নাম
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            defaultValue={user.name ?? ""}
                            placeholder="আপনার নাম"
                            className="input w-full rounded-xl bg-base-100 border-base-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="btn w-full rounded-xl bg-green-700 hover:bg-green-800 border-0 text-white shadow-md"
                    >
                        {updating ? "অপেক্ষা করুন..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;