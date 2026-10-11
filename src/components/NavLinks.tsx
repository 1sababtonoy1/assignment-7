import NavItem from "./NavItem";

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
      <div className="flex items-center gap-2 overflow-x-auto py-3 md:gap-3">
        {data.map((n) => (
          <NavItem key={n.id} slug={n.slug} nameBn={n.nameBn} icon={n.icon} />
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;