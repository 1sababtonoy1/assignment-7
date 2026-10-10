
import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Decrease from "@/components/Decrease";
import Increase from "@/components/Increase";
import Marquee from "@/components/Marquee";


export default async function Home() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
  const data = await res.json()
  return (
   <div>
    <Marquee></Marquee>
    <Banner></Banner>
    <Increase products={data}></Increase>
    <Decrease products={data}></Decrease>
    <AllProducts products={data}></AllProducts>
   </div>
  );
}
