"use client";

import { useState } from "react";
import PriceCard, { toBn, type Product } from "./PriceCard"

type SortKey = "default" | "low-high" | "high-low";

const sortOptions: { key: SortKey; label: string }[] = [
    { key: "default", label: "ডিফল্ট" },
    { key: "low-high", label: "দাম: কম থেকে বেশি" },
    { key: "high-low", label: "দাম: বেশি থেকে কম" },
];

const CategoryProductList = ({ products = [] }: { products: Product[] }) => {
    const [sortBy, setSortBy] = useState<SortKey>("default");

    const sortedProducts = [...products];
    if (sortBy === "low-high") sortedProducts.sort((a, b) => a.today - b.today);
    if (sortBy === "high-low") sortedProducts.sort((a, b) => b.today - a.today);

    const currentLabel = sortOptions.find((o) => o.key === sortBy)?.label;

    const handleSelect = (key: SortKey) => {
        setSortBy(key);
        // সিলেক্ট করার পর ড্রপডাউন বন্ধ করে দেয়
        (document.activeElement as HTMLElement | null)?.blur();
    };

    return (
        <div>
            {/* মোট পণ্য + সাজান ড্রপডাউন */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <p className="text-base-content/60">
                    মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-base-content/60">সাজান</span>

                    <div className="dropdown dropdown-end group">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn bg-base-100 border border-base-300 rounded-xl font-normal shadow-none
                                hover:bg-base-100 hover:border-base-300
                                group-focus-within:border-neutral
                                group-focus-within:outline group-focus-within:outline-2
                                group-focus-within:outline-offset-2 group-focus-within:outline-neutral"
                        >
                            {currentLabel}
                            <span className="text-[10px] group-focus-within:hidden">▼</span>
                            <span className="text-[10px] hidden group-focus-within:inline">▲</span>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="dropdown-content menu bg-base-100 rounded-2xl z-10 w-56 p-2 mt-3 shadow-md"
                        >
                            {sortOptions.map((option) => (
                                <li key={option.key}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(option.key)}
                                        className={`rounded-xl ${
                                            sortBy === option.key ? "bg-base-300/70" : ""
                                        }`}
                                    >
                                        <span className="w-4">
                                            {sortBy === option.key ? "✓" : ""}
                                        </span>
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map((product) => (
                    <PriceCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProductList;