import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: string;
  image: string;
  nameBn: string;
  today: number;
  yesterday: number;
  change: {
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-[#f9fbf9]">
      <MarqueeText direction="right" duration={10}>
        {data.map((item) => {
          const isIncreasing = item.today > item.yesterday;
          const isDecreasing = item.today < item.yesterday;

          return (
            <div
              key={item.id}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-gray-200 px-5 py-3 text-sm"
            >
              {/* Product Image and Name */}
              <span className="text-base">{item.image}</span>

              <span className="font-medium text-gray-800">
                {item.nameBn}
              </span>

              {/* Current Price */}
              <span className="text-gray-800">
                {item.today} টাকা/কেজি
              </span>

              {/* Price Change */}
              {isIncreasing ? (
                <span className="font-semibold text-red-600">
                  ▲ {item.change.pct}%
                </span>
              ) : isDecreasing ? (
                <span className="font-semibold text-green-600">
                  ▼ {Math.abs(item.change.pct)}%
                </span>
              ) : (
                <span className="font-semibold text-gray-500">
                  ━ ০%
                </span>
              )}
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;