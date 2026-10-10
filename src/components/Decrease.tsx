import PriceCard, { type Product } from "./PriceCard";

const Decrease = ({ products = [] }: { products: Product[] }) => {
  // pct ঋণাত্মক (যেমন -12.8), তাই সবচেয়ে ছোট সংখ্যা = সবচেয়ে বেশি কমেছে
  const topDecreased = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (topDecreased.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-6">
        <span className="text-success text-xl">▼</span>
        আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topDecreased.map((product) => (
          <PriceCard key={product.id} product={product} trend="down" />
        ))}
      </div>
    </section>
  );
};

export default Decrease;