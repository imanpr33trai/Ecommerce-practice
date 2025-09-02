'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { ProductForCategoryGrid } from '@/utils/types';
import { useProduct } from '@/hooks/useProduct';
import { useParams } from 'next/navigation';

// =================================================================================
// Reusable Product Card Component
// =================================================================================
const ProductCard = ({ product }: { product: ProductForCategoryGrid }) => (<>
    <Card className="group relative overflow-hidden rounded-2xl border-none shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <Link href={`/${product.slug}`} className="block">
            <div className="aspect-square overflow-hidden">
                <Image
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
        </Link>
        <div className="p-4">
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-muted-foreground mt-1"></p>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                <Heart className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                <ShoppingBag className="h-5 w-5" />
            </Button>
        </div>
    </Card></>
);

// =================================================================================
// Filter Sidebar Component
// =================================================================================
const FilterSidebar = () => (
    <aside className="hidden lg:block">
        <div className="space-y-6">
            <div>
                <h3 className="font-bold mb-4">Material</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2"><Checkbox id="wood" /><Label htmlFor="wood">Wood</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="metal" /><Label htmlFor="metal">Metal</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="fabric" /><Label htmlFor="fabric">Fabric</Label></div>
                </div>
            </div>
            <div>
                <h3 className="font-bold mb-4">Color</h3>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-neutral-800" />
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-white border" />
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-amber-800" />
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-gray-300" />
                </div>
            </div>
            <Button className="w-full">Apply Filters</Button>
        </div>
    </aside>
);

// =================================================================================
// Header and Breadcrumbs Component
// =================================================================================
const CategoryHeader = ({ slug }: { slug: string[] }) => {
    // Simple title case function for display
    const toTitleCase = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="mx-2 h-4 w-4" />
                <Link href="/category" className="hover:text-primary">Categories</Link>
                {slug.map(part => (
                    <div key={part} className="flex items-center">
                        <ChevronRight className="mx-2 h-4 w-4" />
                        <span className="capitalize">{toTitleCase(part)}</span>
                    </div>
                ))}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mt-4">
                {toTitleCase(slug[slug.length - 1] ?? 'All Products')} Collection
            </h1>
        </div>
    );
};

// =================================================================================
// Main Page Component
// =================================================================================
export function CategoryPage({ categorySlug }: { categorySlug: string[] }) {
    // MOCK DATA: In a real app, you would fetch this using tRPC based on params.slug

    const params = useParams<{ slug: string[] }>();


    const slugPath = params.slug

    const { data: product, isLoading, isError } = useProduct.byCategory(slugPath)
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error loading products</div>
    }

    if (!product) {
        return <div>Products are not loaded</div>
    }
    return (
        <MaxWidthWrapper className="py-8">
            <CategoryHeader slug={slugPath} />
            {/* code c
            IGNORE_WHEN_COPYING_START
            IGNORE_WHEN_COPYING_END
 */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <FilterSidebar />

                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-muted-foreground">Showing {product?.length} products</p>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by: Newest" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {product.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-2">
                            <Button variant="outline">Previous</Button>
                            <span className="text-sm">Page 1 of 5</span>
                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>



    );
}