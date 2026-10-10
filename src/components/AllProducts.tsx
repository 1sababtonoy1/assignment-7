"use client";

import { useState } from "react";
import PriceCard, { toBn, type Product } from "./PriceCard";

type SortKey = "default" | "low-high" | "high-low";

const AllProducts = ({ products = [] }: { products: Product[] }) => {
    const [sortBy, setSortBy] = useState<SortKey>("default");

    const sortedProducts = [...products];
    if (sortBy === "low-high") sortedProducts.sort((a, b) => a.today - b.today);
    if (sortBy === "high-low") sortedProducts.sort((a, b) => b.today - a.today);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">সব পণ্য</h2>
                    <p className="text-sm text-base-content/60 mt-1">
                        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>

                {/* সাজান ড্রপডাউন */}
                <div className="flex items-center gap-3">
                    <span className="text-base-content/60 text-sm font-medium">
                        সাজান
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                        className="bg-base-100 border border-base-300 text-sm font-medium rounded-xl px-4 py-2 focus:outline-none focus:border-base-content/40 cursor-pointer"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-high">দাম: কম থেকে বেশি</option>
                        <option value="high-low">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map((product) => (
                    <PriceCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;