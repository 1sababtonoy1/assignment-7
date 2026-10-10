import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Navs[] = await res.json();

  return (
    <nav className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex items-center gap-6 overflow-x-auto py-4 md:gap-8">
        {data.map((n) => (
          <Link
            key={n.id}
            href={`/category/${n.slug}`}
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-800 transition hover:text-green-600 md:text-base"
          >
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;