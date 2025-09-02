'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type ProductForCategoryGrid } from '@/utils/types'; // Your frontend type for a product
import { useCart } from '@/hooks/useCart'; // Assuming you have these hooks
import { useWish } from '@/hooks/useWish';



/**
 * A reusable card component to display product information.
 * It's designed to be used in grids on the landing page, category pages, etc.
 */
export const ProductCard = ({ item }: { item: ProductForCategoryGrid }) => {
    // Assuming your hooks provide mutation functions and loading states
    const { mutate: addItem, isPending: isAddingCart } = useCart.addToCart();
    const { mutate: addWish, isPending: isAddingWish } = useWish.addWish();

    if (!item) return <div>error</div>;



    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation when clicking the button
        addItem({ productId: item.id, quantity: 1 });
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        addWish({ productId: item.id });
    };

    const primaryImage = item.images?.[0]?.url;

    return (
        <Card className="group relative w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg">
            {/* Wishlist button appears on hover */}
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                onClick={handleAddToWishlist}
                disabled={isAddingWish}
                aria-label="Add to wishlist"
            >
                <Heart className="h-5 w-5" />
            </Button>

            <Link href={`/${item.slug}`} className="block">
                <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="aspect-square overflow-hidden">
                        <Image
                            src={primaryImage ?? '/placeholder.png'}
                            alt={item.name}
                            width={400}
                            height={400}
                            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="p-4 border-t">
                        <h3 className="font-semibold text-lg truncate" title={item.name}>
                            {item.name}
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                            ${item.price.toString()}
                        </p>
                        <Button
                            className="w-full mt-4"
                            variant="outline"
                            onClick={handleAddToCart}
                            disabled={isAddingCart}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {isAddingCart ? 'Adding...' : 'Add to Cart'}
                        </Button>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

/**
 * A skeleton component that mimics the layout of the ProductCard.
 * Use this to prevent layout shifts while data is loading.
 */
export const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/4" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
};