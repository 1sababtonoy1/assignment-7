import PriceCard, { type Product } from "./PriceCard";

const Increase = ({ products = [] }: { products: Product[] }) => {
  const topIncreased = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  if (topIncreased.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-6">
        <span className="text-error text-xl">▲</span>
        আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topIncreased.map((product) => (
          <PriceCard key={product.id} product={product} trend="up" />
        ))}
      </div>
    </section>
  );
};

export default Increase;