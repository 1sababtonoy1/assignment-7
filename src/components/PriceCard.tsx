import Link from "next/link";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

type PriceCardProps = {
  product: Product;
  // না দিলে product.change.dir থেকেই নেবে
  trend?: "up" | "down" | "flat";
};

// ইংরেজি সংখ্যা -> বাংলা সংখ্যা
export const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

// ১২৯০ -> ১,২৯০
const formatPrice = (n: number) => toBn(n.toLocaleString("en-US"));

// API-র unit -> বাংলা লেবেল (নতুন unit এলে এখানে যোগ করুন)
const unitLabel: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  hali: "প্রতি হালি",
};

const badgeStyle = {
  up: { cls: "bg-error/10 text-error", icon: "▲" },
  down: { cls: "bg-success/10 text-success", icon: "▼" },
  flat: { cls: "bg-base-200 text-base-content/70", icon: "—" },
};

const PriceCard = ({ product, trend }: PriceCardProps) => {
  const type = trend ?? product.change.dir;
  const { cls, icon } = badgeStyle[type];

  return (
    <Link href={`/products/${product.id}`}>
    <div className="card bg-base-100 border border-base-200 rounded-3xl shadow-sm">
      <div className="card-body p-6 gap-4">
        {/* উপরের অংশ: আইকন + নাম + ইউনিট */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-3xl">
            {product.image}
          </div>
          <div>
            <h3 className="text-xl font-semibold leading-tight">
              {product.nameBn}
            </h3>
            <p className="text-sm text-base-content/60">
              {unitLabel[product.unit] ?? `প্রতি ${product.unit}`}
            </p>
          </div>
        </div>

        {/* নিচের অংশ: আজকের দাম + শতাংশ */}
        <div>
          <p className="text-sm text-base-content/60">আজকের দাম</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-2xl font-bold">
              {formatPrice(product.today)}{" "}
              <span className="text-lg font-semibold">টাকা</span>
            </p>
            <span
              className={`badge badge-lg border-0 font-semibold ${cls}`}
            >
              {icon} {toBn(Math.abs(product.change.pct).toFixed(1))}%
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default PriceCard;