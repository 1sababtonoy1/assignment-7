import CategoryProductList from "@/components/CategoryProductList";
import { toBn, type Product } from "@/components/PriceCard";
import { notFound } from "next/navigation";

type CategoryProduct = Product & {
    categoryNameBn: string;
    categoryIcon: string;
};

const CategoryProducts = async ({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) => {
    const { categoryId } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
    );

    // API ব্যর্থ হলে not-found পেজ দেখাবে
    if (!res.ok) notFound();

    const data = await res.json();

    // API সরাসরি অ্যারে দিলেও, বা { products: [...] } দিলেও কাজ করবে
    const products: CategoryProduct[] = Array.isArray(data)
        ? data
        : data?.products ?? [];

    // কোনো ডেটা না থাকলে (ভুল ক্যাটাগরি) not-found পেজ দেখাবে
    if (products.length === 0) notFound();

    // ক্যাটাগরির নাম ও আইকন: প্রথম পণ্য থেকে (না থাকলে data থেকে)
    const categoryNameBn = products[0]?.categoryNameBn ?? data?.categoryNameBn ?? "";
    const categoryIcon = products[0]?.categoryIcon ?? data?.categoryIcon ?? "";

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {/* ক্যাটাগরি হেডার কার্ড */}
            <div className="bg-base-100 border border-base-200 rounded-3xl p-6 md:p-8 flex items-center gap-5">
                <span className="text-5xl md:text-6xl">{categoryIcon}</span>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">{categoryNameBn}</h1>
                    <p className="text-base-content/60 mt-1">
                        {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            <CategoryProductList products={products} />
        </div>
    );
};

export default CategoryProducts;