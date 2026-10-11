import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Marquee from "@/components/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম, বাজারভিত্তিক বিস্তারিত এবং দামের পরিবর্তন এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${notoSerifBengali.className} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" />
        <Header />

        {/* Marquee ডেটা ফেচ করে, তাই Suspense দিয়ে মোড়ানো (blocking route error ঠিক করে) */}
        <Suspense
          fallback={<div className="h-12 border-y border-gray-200 bg-[#f9fbf9]" />}
        >
          <Marquee />
        </Suspense>

        {children}
        <Footer />
      </body>
    </html>
  );
}