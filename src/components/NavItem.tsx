"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  slug: string;
  nameBn: string;
  icon: string;
};

const NavItem = ({ slug, nameBn, icon }: NavItemProps) => {
  const pathname = usePathname();
  const href = `/category/${slug}`;

  // বর্তমান URL এই ক্যাটাগরির হলে অ্যাক্টিভ
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition md:text-base ${
        isActive
          ? "bg-green-700 text-white shadow-md"
          : "text-gray-800 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      <span>{icon}</span>
      <span>{nameBn}</span>
    </Link>
  );
};

export default NavItem;