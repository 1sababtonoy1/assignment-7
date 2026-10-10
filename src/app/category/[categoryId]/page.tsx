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
    const data = await res.json();

    // API সরাসরি অ্যারে দিলেও, বা { products: [...] } দিলেও কাজ করবে
    const products: CategoryProduct[] = Array.isArray(data)
        ? data
        : data.products ?? [];

    // ক্যাটাগরির নাম ও আইকন: প্রথম পণ্য থেকে (না থাকলে data থেকে)
    const categoryNameBn = products[0]?.categoryNameBn ?? data.categoryNameBn ?? "";
    const categoryIcon = products[0]?.categoryIcon ?? data.categoryIcon ?? "";

    if(!data){
            notFound()
        }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {/* ক্যাটাগরি হেডার কার্ড */}
            <div className="bg-base-100 border border-base-200 rounded-3xl p-8 flex items-center gap-5">
                <span className="text-6xl">{categoryIcon}</span>
                <div>
                    <h1 className="text-4xl font-bold">{categoryNameBn}</h1>
                    <p className="text-base-content/60 mt-1">
                        {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            {products.length > 0 ? (
                <CategoryProductList products={products} />
            ) : (
                <p className="text-center text-base-content/60 py-20">
                    এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
                </p>
            )}
        </div>
    );
};

export default CategoryProducts;