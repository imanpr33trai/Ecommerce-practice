'use client';

import { ArrowRight, Award, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Import shadcn/ui and custom types/hooks
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/useCart';
import { useProduct } from '@/hooks/useProduct';
import { type ProductListItem } from '@/utils/types'; // Your frontend type for a product

// =================================================================================
// Section 1: Hero Section (Arrow Function Component)
// =================================================================================
const HeroSection = () => (
  <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
    <MaxWidthWrapper className="py-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Discover Your Next Favorite Thing
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
        Explore our curated collection of high-quality products, designed to bring joy and utility into your life.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/products">
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/categories">
            Browse Categories
          </Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  </section>
);

// =================================================================================
// Section 2: Product Card (Arrow Function Component)
// =================================================================================
const ProductCard = ({ product }: { product: ProductListItem }) => {
  // TODO: Add your `useCartMutations` hook here
  if (!product) {
    return (
      <div>Product not FOund</div>
    )
  }
  const { mutate: addToCart, isPending: isAddingToCart } = useCart.addToCart()
  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 });
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <Link href={`/${product.slug}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.images?.[0]?.url ?? '/placeholder.png'}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="p-4 border-t">
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
          <p className="text-muted-foreground mt-1">${product.price.toString()}</p>
          <Button className="w-full mt-4" variant="outline" onClick={handleAddToCart} disabled={isAddingToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// =================================================================================
// Section 3: New Arrivals Section (Arrow Function Component)
// =================================================================================
const NewArrivalsSection = () => {
  // TODO: Replace with your actual tRPC query for new products
  const { data: products, isLoading } = useProduct.getAll();

  return (
    <section className="py-16">
      <MaxWidthWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Check out the latest additions to our collection. Fresh, modern, and ready for you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))
            : products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

// =================================================================================
// Section 4: "Why Choose Us" Section (Arrow Function Component)
// =================================================================================
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free & Fast Shipping',
      description: 'Get your favorite items delivered to your doorstep without any extra cost.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Your transactions are safe with our industry-standard encryption.',
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'We stand by the quality of our products. Love it or get a refund.',
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

// =================================================================================
// Main Page Component
// =================================================================================
export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <NewArrivalsSection />
      <WhyChooseUsSection />
      {/* You can add more sections like FeaturedCategories or a final CTA here */}
    </div>
  );
}

// import BentoGrid from "@/components/bentoGrid";

// export default function Page() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen ">
//       <BentoGrid />
//     </div>
//   );
// }
