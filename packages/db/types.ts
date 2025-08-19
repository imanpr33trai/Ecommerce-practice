import { Prisma } from '@generated/client';

/**
 * =================================================================================================
 *  BACKEND TYPES (Prisma.ModelNameGetPayload)
 * =================================================================================================
 *  These types are generated using Prisma's `GetPayload` utility.
 *  They are perfect for use within your tRPC resolvers and other backend services.
 *  They represent the exact shape of data returned from a complex Prisma query.
 * =================================================================================================
 */

// ------------------------------ Product ------------------------------

/** Includes Product's images, category, and a count of its reviews. */
const _productWithDetails = Prisma.validator<Prisma.ProductDefaultArgs>()({
    include: {
        images: true,
        category: true,
        reviews: true,
        _count: {
            select: {
                reviews: true
            }
        }
    },
});
export type ProductWithDetails = Prisma.ProductGetPayload<typeof _productWithDetails>;


// ------------------------------ Category ------------------------------

/** Includes a Category and all of its associated Products, each with their primary image. */
const _categoryWithProducts = Prisma.validator<Prisma.CategoryDefaultArgs>()({
    include: {
        products: {
            include: {
                images: {
                    where: { isPrimary: true },
                    take: 1,
                },
            },
        },
    },
});
export type CategoryWithProducts = Prisma.CategoryGetPayload<typeof _categoryWithProducts>;


// ------------------------------ Order ------------------------------

/** Includes an Order, its items, and for each item, the related Product details. */
const _orderWithItems = Prisma.validator<Prisma.OrderDefaultArgs>()({
    include: {
        items: {
            include: {
                product: {
                    include: {
                        images: {
                            where: { isPrimary: true },
                            take: 1,
                        },
                    },
                },
            },
        },
        user: {
            select: {
                id: true,
                name: true,
                email: true,
            },
        },
    },
});
export type OrderWithItems = Prisma.OrderGetPayload<typeof _orderWithItems>;


// ------------------------------ Cart ------------------------------

/** Includes a Cart, its items, and for each item, the related Product details. */
const _cartWithItems = Prisma.validator<Prisma.CartDefaultArgs>()({
    include: {
        items: {
            include: {
                product: {
                    include: {
                        images: {
                            where: { isPrimary: true },
                            take: 1,
                        },
                        category: {
                            select: { name: true },
                        },
                    },
                },
            },
        },
    },
});
export type CartWithItems = Prisma.CartGetPayload<typeof _cartWithItems>;


// ------------------------------ Review ------------------------------

/** Includes a Review and the User who wrote it. */
const _reviewWithUser = Prisma.validator<Prisma.ReviewDefaultArgs>()({
    include: {
        user: {
            select: {
                id: true,
                name: true,
                image: true,
            },
        },
    },
});
export type ReviewWithUser = Prisma.ReviewGetPayload<typeof _reviewWithUser>;