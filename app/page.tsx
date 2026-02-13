"use client";
import Image from "next/image";
import * as React from "react";
import ServiceCard from "./services/ServiceCard";
import { servicesData } from "./services/servicesData";
import BlankCard from "./components/BlankCard";
import ProductCard from "./components/CardImages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


export default function Home() {
  const [products, setProducts] = React.useState([]);
  const [category,setCategory]=React.useState([]);
  const groceriesProduct=products.filter(
    (product: any) => product.category === 'groceries'
  );
  

      React.useEffect(() => {
          fetch("https://dummyjson.com/products")
              .then((res) => res.json())
              .then((data) => setProducts(data.products))
              .catch((err) => console.error(err));
      }, []);
      React.useEffect(()=>{
        fetch("https://dummyjson.com/products/categories")
        .then((res)=>res.json())
        .then((data)=>setCategory(data))
        .catch((err)=>console.error(err));
      }, [])
    const uniqueCategories = Array.from(
        new Set(products.map((product: any) => product.category))
    );

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              To get started, edit the page.tsx file.
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Deploy Now
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </main>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center underline">
          Our Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesData.slice(0,8).map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    mode="page"
                    slug={service.slug}
                   
                  />
                ))}
              </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center underline">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0,8).map((item:any) => (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    icon={item.thumbnail}
                    mode="page"
                    slug={item.slug}
                    redirectUrl={`/product/${item.id}`}
                   
                  />
                ))}
              </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center underline">
          Our Category
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {/* Here we show category only */}
                {category.map((item: any) => (
                  <BlankCard
                    key={item.name}
                    title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    description={''}
                    icon={''}
                    mode="page"
                    slug={item.slug}
                    redirectUrl={`product/category/${item.slug}`}
                  
                  />
                ))}
              </div>
      </section>
     <section className="max-w-7xl mx-auto px-6 py-12">
  <h1 className="text-3xl font-bold mb-10 text-center underline">
    Our Groceries Product
  </h1>

  <Swiper
    modules={[Navigation, Autoplay]}
    spaceBetween={25}
    slidesPerView={4}
    navigation
    autoplay={{ delay: 3000 }}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    }}
    className="pb-10"
  >
    {groceriesProduct.map((item: any) => (
      <SwiperSlide key={item.id}>
        <ProductCard
          title={item.title}
          description={item.description}
          icon={item.thumbnail}
          mode="page"
          slug={item.slug}
          redirectUrl={`/product/${item.id}`}
        />
      </SwiperSlide>
    ))}
  </Swiper>
</section>

    </>

  );
}
