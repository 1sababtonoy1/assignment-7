import Link from "next/link";
import { notFound } from "next/navigation";
import { toBn } from "@/components/PriceCard";

type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

type ProductData = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: { dir: "up" | "down" | "flat"; pct: number };
    markets: Market[];
};

// unit -> বাংলা নাম (নতুন unit এলে এখানে যোগ করুন)
const unitName: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    hali: "হালি",
};

// ৬৩.৫ -> ৬৩.৫০, ৬২ -> ৬২, ১২৯০ -> ১,২৯০
const fmt = (n: number) =>
    toBn(
        n.toLocaleString("en-US", {
            minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
            maximumFractionDigits: 2,
        })
    );

const trendStyle = {
    up: { text: "text-error", icon: "▲", word: "বেড়েছে" },
    down: { text: "text-success", icon: "▼", word: "কমেছে" },
    flat: { text: "text-base-content/70", icon: "—", word: "অপরিবর্তিত" },
};

const ProductDetails = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${productId}`
    );

    if (!res.ok) notFound();

    const data: ProductData = await res.json();

    const unit = unitName[data.unit] ?? data.unit;
    const trend = trendStyle[data.change.dir];
    const diff = Math.abs(data.today - data.yesterday);

    // বাজারভিত্তিক গড় = (সর্বনিম্ন + সর্বাধিক) / ২, গড় অনুযায়ী কম থেকে বেশি সাজানো
    const markets = data.markets ?? [];
    const rows = markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const lowest = markets.length ? Math.min(...markets.map((m) => m.min)) : 0;
    const highest = markets.length ? Math.max(...markets.map((m) => m.max)) : 0;
    const average = rows.length
        ? Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length)
        : 0;

    if(!data){
        notFound()
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-5">
            {/* ব্রেডক্রাম্ব */}
            <nav className="flex items-center gap-2 text-sm text-base-content/70">
                <Link href="/" className="hover:text-base-content">
                    হোম
                </Link>
                <span>›</span>
                <Link
                    href={`/category/${data.category}`}
                    className="hover:text-base-content"
                >
                    {data.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-base-content">{data.nameBn}</span>
            </nav>

            {/* পণ্যের হেডার কার্ড */}
            <div className="bg-base-100 border border-base-200 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-base-200 flex items-center justify-center text-5xl">
                        {data.image}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{data.nameBn}</h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            প্রতি {unit} · {data.categoryNameBn}
                        </p>
                        <p className="text-sm mt-2">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span className="font-bold">{trend.word}</span>
                            {diff > 0 && <> · {fmt(diff)} টাকা</>}
                        </p>
                    </div>
                </div>

                <div className="bg-base-200 rounded-2xl px-8 py-4 text-center">
                    <p className="text-xs text-base-content/60">আজকের দাম</p>
                    <p className="text-4xl font-bold my-1">{fmt(data.today)}</p>
                    <p className="text-xs text-base-content/60">টাকা / {unit}</p>
                    <p className={`text-sm font-semibold mt-1 ${trend.text}`}>
                        {trend.icon} {toBn(Math.abs(data.change.pct).toFixed(1))}%
                    </p>
                </div>
            </div>

            {/* দাম ও বাজারের তথ্য */}
            {rows.length > 0 && (
                <div className="bg-base-100 border border-base-200 rounded-3xl p-5 md:p-6 space-y-8">
                    {/* দামের সারসংক্ষেপ */}
                    <section>
                        <h2 className="text-lg font-bold mb-4">দামের সারসংক্ষেপ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-base-200 rounded-2xl p-5">
                                <p className="text-xs text-base-content/60">সর্বনিম্ন দাম</p>
                                <p className="text-success font-bold mt-1">
                                    <span className="text-2xl">{fmt(lowest)}</span>{" "}
                                    <span className="text-sm">টাকা</span>
                                </p>
                                <p className="text-xs text-base-content/60 mt-1">
                                    সবচেয়ে কম দামের বাজার
                                </p>
                            </div>

                            <div className="border border-base-200 rounded-2xl p-5">
                                <p className="text-xs text-base-content/60">সর্বাধিক দাম</p>
                                <p className="text-error font-bold mt-1">
                                    <span className="text-2xl">{fmt(highest)}</span>{" "}
                                    <span className="text-sm">টাকা</span>
                                </p>
                                <p className="text-xs text-base-content/60 mt-1">
                                    সবচেয়ে বেশি দামের বাজার
                                </p>
                            </div>

                            <div className="border border-base-200 rounded-2xl p-5">
                                <p className="text-xs text-base-content/60">গড় দাম</p>
                                <p className="text-success font-bold mt-1">
                                    <span className="text-2xl">{fmt(average)}</span>{" "}
                                    <span className="text-sm">টাকা</span>
                                </p>
                                <p className="text-xs text-base-content/60 mt-1">
                                    প্রতি {unit}-এর হিসাব
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* বাজারভিত্তিক আজকের দাম */}
                    <section>
                        <h2 className="text-lg font-bold mb-4">
                            বাজারভিত্তিক আজকের দাম
                        </h2>
                        <div className="border border-base-200 rounded-2xl overflow-x-auto">
                            <table className="w-full min-w-[560px] text-sm">
                                <thead>
                                    <tr className="text-base-content/60">
                                        <th className="text-left font-medium px-4 py-3">বাজার</th>
                                        <th className="text-left font-medium px-4 py-3">বিভাগ</th>
                                        <th className="text-right font-medium px-4 py-3">সর্বনিম্ন</th>
                                        <th className="text-right font-medium px-4 py-3">সর্বাধিক</th>
                                        <th className="text-right font-medium px-4 py-3">গড়</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr
                                            key={`${row.market}-${row.division}`}
                                            className="border-t border-base-300 even:bg-base-200/60"
                                        >
                                            <td className="px-4 py-3">{row.market}</td>
                                            <td className="px-4 py-3">{row.division}</td>
                                            <td className="px-4 py-3 text-right">
                                                {fmt(row.min)} টাকা
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {fmt(row.max)} টাকা
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold">
                                                {fmt(row.avg)} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;