import { Suspense } from "react";
import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import CurrentDate from "./CurrentDate";

const Header = () => {
  return (
    <header className="w-full border-x border-b border-gray-200 bg-[#f9fbf9]">
      {/* Top Section */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo and Website Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600">
            <Image
              src="/Stack.png"
              alt="বাজার দর লোগো"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-700 md:text-sm min-h-4 md:min-h-5">
              {/* তারিখ রিকোয়েস্টের সময় লোড হয়, ততক্ষণ ফাঁকা জায়গা ধরে রাখে */}
              <Suspense fallback={null}>
                <CurrentDate />
              </Suspense>
            </p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <UserInfo />
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-100">
        <Suspense fallback={<div className="h-[58px]" />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;