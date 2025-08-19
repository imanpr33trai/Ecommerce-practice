import { z, ZodTypeAny } from 'zod';
// This import assumes your client is generated and available
import { categorySchema } from './category';
import { imageSchema } from './image';
import { reviewSchema } from './review';
import { wishSchema } from './wish';


// Forward-declaration for lazy schemas to handle circular dependencies
// We declare the types here so TypeScript doesn't complain


// Schema for Product - uses z.lazy for relations that might be circular
export const productSchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    description: z.string().nullish(),
    price: z.number(), // Prisma Decimal is represented as number in Zod
    discountPrice: z.number().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
    sku: z.string().nullish(),
    stock: z.number().int().default(0),
    isActive: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    subCategory: z.string().nullish(),
    slug: z.string().nullish(),
    categoryId: z.string().cuid().nullish(),
    category: z.lazy(() => categorySchema.optional()),
    images: z.array(z.lazy((): ZodTypeAny => imageSchema)),
    reviews: z.array(z.lazy((): ZodTypeAny => reviewSchema)),
    wishes: z.array(z.lazy((): ZodTypeAny => wishSchema)),
});
