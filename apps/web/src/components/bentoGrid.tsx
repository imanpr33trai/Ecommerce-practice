/* eslint-disable @next/next/no-img-element */
"use client"
import {
  IconAdjustmentsHorizontal,

} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { mockProducts } from "@/lib/mock-data";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import type { Product} from '../../../../types'

const BentoGrid = () => {

      const {data:product,isLoading,isError,error} = useQuery(trpc.product.getAll.queryOptions());
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
      </div>
    );
  }
  if (isError || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  const productDeal = product.filter((p)=>p.createdAt)

  
  const newDeal = mockProducts.find((p) => p.deal === "New");
  const greatValueDeal = mockProducts.find((p) => p.deal === "Great Value");
  const exclusiveProduct = mockProducts.find((p) => p.exclusive);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <Filters />
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-2 flex flex-col h-full space-y-6">
            {newDeal && <NewDealsCard product={productDeal} />}
          </div>
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {greatValueDeal && <GreatValueDealsCard product={greatValueDeal} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exclusiveProduct && <ExclusiveCard product={exclusiveProduct} />}
              <div className="space-y-6 grid">
                <TeamCard />
                <BonusCard />
              </div>
            </div>
          </div>
        
        </main>
      </div>
    </div>
  );
};

const Filters = () => {
  const filters = ["Table", "Dressers", "Sofa", "Chair", "Bed", "Lamps"];
  return (
    <div className="flex items-center space-x-4 gap-3 mt-3">
      <Button className=" text-wheat hover:text-black dark:bg-zinc-800 rounded-full shadow-sm">
        <IconAdjustmentsHorizontal className="w-6 h-4" />
      </Button>
      <div className="flex items-center space-x-2 overflow-x-auto ">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={"secondary"}
            className="px-4 py-2 hover:bg-amber-50 hover:text-black dark:bg-zinc-800 rounded-full shadow-sm whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
};

const NewDealsCard = ({ product }: { product:Product }) => (
  <div className="h-full">
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg h-full flex flex-col cursor-pointer">
      <h2 className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
        New Deals
      </h2>
      <div className="flex-grow flex flex-col justify-center items-center mt-4">
        <div className="relative w-full h-full">
          <img
            src={product.images.}
            alt=
            className="bg-zinc-200 dark:bg-zinc-700 h-full w-full rounded-2xl object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-lg p-4 rounded-2xl">
            <p className="text-2xl font-bold">${product.price}</p>
            <p className="text-zinc-600 dark:text-zinc-400">{product.name}</p>
          </div>
          <div className="absolute top-4 right-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-lg p-2 rounded-full">
            <span className="text-yellow-500">⭐</span> {product.}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 bg-zinc-100 dark:bg-zinc-700 p-2 rounded-full">
        <button className="p-2 bg-white dark:bg-zinc-800 rounded-full">
          {"<"}
        </button>
        <span>Slide left and right</span>
        <button className="p-2 bg-white dark:bg-zinc-800 rounded-full">
          {">"}
        </button>
      </div>
    </div>
  </div>
);

const GreatValueDealsCard = ({ product }: { product: any }) => (
  <Link href={`/${product.id}`}>
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg flex items-center cursor-pointer">
      <div className="w-1/2">
        <h2 className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
          Great Value Deals
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          {product.description}
        </p>
        <div className="mt-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-lg p-2 rounded-full inline-flex items-center">
          <span className="text-yellow-500">⭐</span> {product.rating}
        </div>
      </div>
      <div className="w-1/2 h-64 bg-zinc-200 dark:bg-zinc-700 rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  </Link>
);

const ExclusiveCard = ({ product }: { product: any }) => (
  <Link href={`/${product.id}`}>
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg cursor-pointer">
      <span className="text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-full">
        EXCLUSIVE
      </span>
      <h3 className="text-xl font-bold mt-4">{product.name}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 mt-1">
        {product.description}
      </p>
      <div className="mt-4 h-40 bg-zinc-200 dark:bg-zinc-700 rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  </Link>
);

const TeamCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-3xl shadow-lg">
    <h4 className="font-bold">OUR TEAM</h4>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      Our Team designs luxurious minimalist furniture.
    </p>
    <div className="flex -space-x-2 mt-2">
      <div className="w-8 h-8 bg-zinc-300 rounded-full border-2 border-white dark:border-zinc-800" />
      <div className="w-8 h-8 bg-zinc-400 rounded-full border-2 border-white dark:border-zinc-800" />
      <div className="w-8 h-8 bg-zinc-500 rounded-full border-2 border-white dark:border-zinc-800" />
    </div>
  </div>
);

const BonusCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-3xl shadow-lg">
    <h4 className="font-bold">GET A BONUS</h4>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      Discover our latest exclusive deals.
    </p>
    <div className="flex mt-2">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 rounded-l-full focus:outline-none"
      />
      <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-r-full">
        Subscribe
      </button>
    </div>
  </div>
);


export default BentoGrid;
