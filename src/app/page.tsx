import { Suspense } from "react";
import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Decrease from "@/components/Decrease";
import Increase from "@/components/Increase";
import Marquee from "@/components/Marquee";

// ডেটা আনার অংশ আলাদা করা হয়েছে, যাতে Suspense দিয়ে মুড়ে দেওয়া যায়
const ProductSections = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  const data = await res.json();

  return (
    <>
      <Increase products={data} />
      <Decrease products={data} />
      <AllProducts products={data} />
    </>
  );
};

export default function Home() {
  return (
    <div>
  
      <Banner />
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProductSections />
      </Suspense>
    </div>
  );
}