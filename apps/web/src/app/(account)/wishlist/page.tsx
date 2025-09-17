
'use client';

import { Heart, SearchX, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Import shadcn/ui and custom types/hooks
import { Button } from '@comp/button';
import { Card, CardContent } from '@comp/card';
import { Skeleton } from '@comp/skeleton';
import { useCart } from '@/hooks/useCart';
import { useWish } from '@/hooks/useWish';
import { type WishlistItem } from '@/utils/typesClient';
import { toast } from 'sonner';
import { IconHeartFilled } from '@tabler/icons-react';

// =================================================================================
// Section 1: Individual Wishlist Item Card (Arrow Function Component)
// =================================================================================
const WishlistItemCard = ({ item }: { item: WishlistItem }) => {



  const { mutate: removeProduct, isPending: isRemoving } = useWish.removeWish()
  const { mutate: addToCart, isPending: isAddingToCart } = useCart.addToCart()
  const { mutate: addOrRemove } = useWish.addOrRemove()

  const handleAddOrRemove = async () => {
    try {
      await addOrRemove({ productId: item.productId })
    } catch (error) {
      toast.error("Error WishList", { description: (error as Error).message })
    }
  }
  const handleRemove = () => {
    removeProduct({ id: item.id });
  };

  const handleAddToCart = () => {
    addToCart({ productId: item.product.id, quantity: 1 });
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-2xl">
      <CardContent className="p-0">
        <Link href={`/${item.product.slug}`} className="block">
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={item.product.images[0]?.url ?? '/placeholder.png'}
              alt={item.product.name}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{item.product.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">${item.product.price.toString()}</p>
          <div className="mt-4 flex items-center gap-2">
            <Button className="w-full" onClick={handleAddToCart} disabled={isAddingToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleAddOrRemove}
          disabled={isRemoving}
          aria-label="Remove from wishlist"
        >

          <IconHeartFilled className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};


// =================================================================================
// Section 2: Grid for Displaying Wishlist Cards (Arrow Function Component)
// =================================================================================
const WishlistGrid = ({ items }: { items: WishlistItem[] }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {items.map((item) => (
      <WishlistItemCard key={item.id} item={item} />
    ))}
  </div>
);

// =================================================================================
// Section 3: Loading State with Skeletons (Arrow Function Component)
// =================================================================================
const WishlistLoadingState = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="rounded-xl">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
      </Card>
    ))}
  </div>
);


// =================================================================================
// Section 4: Empty State for When Wishlist is Empty (Arrow Function Component)
// =================================================================================
const WishlistEmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
    <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
      <SearchX className="h-12 w-12 text-gray-500" />
    </div>
    <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      Looks like you haven&apos;t added anything yet.
    </p>
    <Button asChild className="mt-6">
      <Link href="/">Start Shopping</Link>
    </Button>
  </div>
);


// =================================================================================
// Main Page Component
// =================================================================================
export default function WishlistPage() {
  // TODO: Replace with your actual tRPC query
  const { data: wishlistItems, isLoading, isError } = useWish.getAll()
  // const { data: wishlistItems, isLoading, isError } = useWish.getAll();

  const hasItems = wishlistItems && wishlistItems.length > 0;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">My Wishlist</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Your saved items for later. Don&apos;t let them get away!
        </p>
      </div>

      {isLoading && <WishlistLoadingState />}

      {isError && <p className="text-center text-red-500">Failed to load your wishlist. Please try again.</p>}

      {!isLoading && !isError && (
        hasItems ? <WishlistGrid items={wishlistItems} /> : <WishlistEmptyState />
      )}
    </div>
  );
}