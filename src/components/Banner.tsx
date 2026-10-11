import { Suspense } from "react";
import Image from "next/image";
import CurrentDate from "./CurrentDate";

const Banner = () => {
  return (
    <section className="container mx-auto px-4 py-5 md:px-6">
      <div className="flex min-h-[400px] flex-col items-center justify-between gap-8 rounded-[32px] border border-[#DFE7E0] bg-[#FCFDFC] px-6 py-10 md:min-h-[540px] md:flex-row md:px-12 lg:px-16">
        {/* Left Content */}
        <div className="flex-1">
          {/* Date */}
          <Suspense
            fallback={
              <span className="inline-block h-10 w-64 animate-pulse rounded-full bg-[#E5F1E7] md:h-12" />
            }
          >
            <span className="inline-block rounded-full bg-[#E5F1E7] px-4 py-2 text-base font-medium text-[#07813B] md:text-xl">
              <CurrentDate />
            </span>
          </Suspense>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-[#1F2922] md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6B746D] md:text-lg lg:text-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button: নিচের সব পণ্য সেকশনে (id="সব-পণ্য") নিয়ে যায় */}
          <a
            href="#সব-পণ্য"
            className="mt-7 inline-block rounded-xl bg-[#07813B] px-6 py-4 text-lg font-bold text-white shadow-md transition-all duration-200 hover:bg-[#066B32] hover:shadow-lg"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Illustration */}
        <div className="flex w-full flex-1 items-center justify-center md:w-auto">
          <Image
            src="/bazar-hero.png"
            alt="ফল ও সবজির ঝুড়ি"
            width={400}
            height={400}
            priority
            className="h-auto w-64 object-contain md:w-80 lg:w-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;