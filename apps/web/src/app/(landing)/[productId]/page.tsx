/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { mockProducts, type Product } from "@/lib/mock-data";
import {
  IconHeart,
  IconShoppingBag,
  IconAdjustmentsHorizontal,
  IconRuler,
  IconTruck,
  IconMessageCircle,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Product not found.</p>
        <Link href="/">Go back to homepage</Link>
      </div>
    );
  }

  const relatedProduct = mockProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen max-w-7xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-2 sm:p-4 lg:p-6 mx-auto">
      <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          {/* Main Product Display */}
          <div className="lg:col-span-3">
            <ProductDisplayCard product={product} />
          </div>

          {/* Sidebar with Details and Actions */}
          <div className="lg:col-span-2 flex  flex-col space-y-6">
            <ProductDetailsCard product={product} />
            <div className="grid grid-cols-2 gap-6">
              <ColorOptionsCard />
              <SizeSelectorCard />
            </div>
            <QuantitySelectorCard />
          </div>

          {/* Additional Info Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecificationsCard />
            <ShippingInfoCard />
            <CustomerReviewsCard />
          </div>

          {/* Related Products and Team/Bonus Cards */}
          <div className="lg:col-span-5 grid grid-cols-1  lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {relatedProduct.length > 0 ? (
                relatedProduct.map((p) => (
                  <div className="lg:col-span-1 " key={p.id}>
                    <RelatedProductCard product={p} />
                  </div>
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
            <div className="lg:col-span-1 grid grid-cols-1 lg:grid-cols-1 gap-6 ">
              <TeamCard />
              <BonusCard />
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ReviewCard product={product} />
          </div></div>
        </div>
      </div>
    </div>
  );
};

const ProductDisplayCard = ({ product }: { product: Product }) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg h-full flex flex-col">
    <h2 className="text-3xl font-bold text-zinc-400 dark:text-zinc-500">
      {product.category}
    </h2>
    <div className="flex-grow flex justify-center items-center mt-4">
      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name}
          className="bg-zinc-200 dark:bg-zinc-700 h-[500px] w-full rounded-2xl object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-lg p-2 rounded-full">
          <span className="text-yellow-500">⭐</span> {product.rating}
        </div>
      </div>
    </div>
  </div>
);

const ProductDetailsCard = ({ product }: { product: Product }) => (
  <div className="bg-white w-full h-full dark:bg-zinc-800 p-6 rounded-3xl shadow-lg flex flex-col">
    <h1 className="text-4xl font-bold">{product.name}</h1>
    <p className="text-2xl font-semibold mt-2">${product.price}</p>
    <p className="text-zinc-500 dark:text-zinc-400 mt-4 flex-grow">
      {product.description}
    </p>

    <div className="mt-6 flex gap-2 ">
      <Button className="flex-1 w-full" size="lg">
        <IconShoppingBag />
        Add to Cart
      </Button>
      <Button className="w-[20%] " variant="outline" size="lg">
        <IconHeart />
      </Button>
    </div>

    <Button href="Buy-Now" className="mt-3" variant="outline" size="lg">
      Buy Now
    </Button>
  </div>
);

const ColorOptionsCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-3xl shadow-lg">
    <h4 className="font-bold text-lg mb-2">Color</h4>
    <div className="flex space-x-2">
      <div className="w-8 h-8 rounded-full bg-black border-2 border-zinc-300 cursor-pointer" />
      <div className="w-8 h-8 rounded-full bg-white border-2 border-zinc-300 cursor-pointer" />
      <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-zinc-300 cursor-pointer" />
      <div className="w-8 h-8 rounded-full bg-amber-800 border-2 border-zinc-300 cursor-pointer" />
    </div>
  </div>
);

const SizeSelectorCard = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["S", "M", "L"];
  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-3xl shadow-lg">
      <h4 className="font-bold text-lg mb-2">Size</h4>
      <div className="flex space-x-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={"outline"}
            className={`rounded-full ${
              selectedSize === size
                ? "dark:bg-white bg-black text-black dark:hover:bg-white/90 dark:hover:text-black"
                : ""
            } `}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};

const QuantitySelectorCard = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-3xl shadow-lg flex items-center justify-between">
      <h4 className="font-bold text-lg">Quantity</h4>
      <div className="flex items-center space-x-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <IconMinus />
        </Button>
        <span className="text-xl font-semibold">{quantity}</span>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setQuantity(quantity + 1)}
        >
          <IconPlus />
        </Button>
      </div>
    </div>
  );
};

const SpecificationsCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg">
    <h4 className="font-bold text-xl mb-3 flex items-center">
      <IconRuler className="mr-2" /> Specifications
    </h4>
    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
      <li>
        <strong>Material:</strong> Oak Wood, Linen
      </li>
      <li>
        <strong>Dimensions:</strong> 85"W x 35"D x 30"H
      </li>
      <li>
        <strong>Weight:</strong> 150 lbs
      </li>
    </ul>
  </div>
);

const ShippingInfoCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg">
    <h4 className="font-bold text-xl mb-3 flex items-center">
      <IconTruck className="mr-2" /> Shipping
    </h4>
    <p className="text-zinc-600 dark:text-zinc-400">
      Free nationwide shipping. Arrives in 5-7 business days. White glove
      delivery available.
    </p>
  </div>
);

const CustomerReviewsCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg">
    <h4 className="font-bold text-xl mb-3 flex items-center">
      <IconMessageCircle className="mr-2" /> Reviews (3)
    </h4>
    <div className="space-y-3">
      <p className="text-zinc-600 dark:text-zinc-400">
        "Absolutely stunning and comfortable." - Alex D.
      </p>
      <p className="text-zinc-600 dark:text-zinc-400">
        "The centerpiece of our living room." - Sarah P.
      </p>
    </div>
  </div>
);

const RelatedProductCard = ({ product }: { product: Product }) => (
  
    <div className="block h-full">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg cursor-pointer h-full ">
        <span className="text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-full self-start">
          RELATED
        </span>
        <h3 className="text-xl font-bold mt-4">{product.name}</h3>
        <div className="mt-4 h-48 bg-zinc-200 dark:bg-zinc-700 rounded-2xl flex-grow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      
    </div>
  </div>
);

const TeamCard = () => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-3xl block  shadow-lg">
    <h4 className="font-bold">OUR TEAM</h4>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      Designers of luxurious minimalist furniture.
    </p>
    <div className="flex -space-x-2 mt-2">
      <div className="w-8 h-8 bg-zinc-300 rounded-full border-2 border-white dark:border-zinc-800" />
      <div className="w-8 h-8 bg-zinc-400 rounded-full border-2 border-white dark:border-zinc-800" />
      <div className="w-8 h-8 bg-zinc-500 rounded-full border-2 border-white dark:border-zinc-800" />
    </div>
  </div>
);

const BonusCard = () => (
  <div className="bg-white dark:bg-zinc-800 block  p-4 rounded-3xl shadow-lg">
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

const ReviewCard = ({product}:{product:Product}) => (
  <div className="lg:col-span-5 gap-6 flex flex-row">
            
              {product.review.map((review: string, index: number) => (
                <div key={index} className="bg-white dark:bg-zinc-800 p-4 lg rounded-3xl shadow-lg mb-4">
                  <div>
                    {product.user?.map((u,idx)=>(
                      <div key={idx} className="flex items-center space-x-2 mb-2 ">
                        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-2xl">
                        <img
                          src={u.image}
                          alt={u.name}
                          className="w-8 h-8 rounded-full"
                        /></div>
                        <span className="font-semibold">{u.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">{review}</p>
                </div>
              ))}
            
          </div>
)
export default ProductPage;
function setPressed(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
