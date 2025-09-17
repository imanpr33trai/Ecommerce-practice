// packages/db-types/src/index.ts
// 👈 CRITICAL FIX: Import all necessary Prisma types from '@prisma/client'
// This includes the `Prisma` namespace itself and specific types like `ProductDefaultArgs`.
import { Prisma, UserRole } from '@generated/client';

// You do NOT need to import `ProductDefaultArgs` from `generated/models`.
// Prisma.validator automatically expects `Prisma.ProductDefaultArgs` (which comes from @prisma/client).
// DELETE THIS LINE: import type { ProductDefaultArgs } from 'generated/models';


// --------------------------------------------------------------------------------
// Shared Backend Types (Prisma.ModelNameGetPayload)
// These types exactly reflect the data shape returned by specific Prisma queries.
// Used by tRPC resolvers and other backend services.
// --------------------------------------------------------------------------------

/**
 * Represents a Product for display in a list or card, with primary image, category, and review count.
 */
const _productForList = Prisma.validator<Prisma.ProductDefaultArgs>()({ // Use Prisma.ProductDefaultArgs directly
    include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true,
        _count: { select: { reviews: true } },
    },
});
export type ProductForList = Prisma.ProductGetPayload<typeof _productForList>;


/**
 * Represents a single Product with all its relations for a detail page.
 */
const _productDetailed = Prisma.validator<Prisma.ProductDefaultArgs>()({
    include: {
        images: true,
        category: true,
        _count: { select: { reviews: true } },
        reviews: {
            orderBy: { createdAt: 'desc' },
            take: 5, // Or fetch all if needed
            include: { user: { select: { id: true, name: true, image: true } } },
        },
    },
});
export type ProductDetailed = Prisma.ProductGetPayload<typeof _productDetailed>;


/**
 * Represents a Review including the author's public information.
 */
const _reviewWithUser = Prisma.validator<Prisma.ReviewDefaultArgs>()({
    include: {
        user: { select: { id: true, name: true, image: true } },
    },
});
export type ReviewWithUser = Prisma.ReviewGetPayload<typeof _reviewWithUser>;


/**
 * Represents a Wishlist Item including product details.
 */
const _wishlistItem = Prisma.validator<Prisma.WishDefaultArgs>()({
    include: {
        product: {
            select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                discountPrice: true,
                images: { where: { isPrimary: true }, take: 1 },
            },
        },
    },
});
export type WishlistItem = Prisma.WishGetPayload<typeof _wishlistItem>;


/**
 * Represents a Category including its immediate children for hierarchical display.
 */
const _categoryWithChildren = Prisma.validator<Prisma.CategoryDefaultArgs>()({
    include: {
        children: {
            select: { id: true, name: true, slug: true, _count: { select: { products: true } } },
            orderBy: { name: 'asc' }
        },
        _count: { select: { products: true } }
    },
});
export type CategoryWithChildren = Prisma.CategoryGetPayload<typeof _categoryWithChildren>;


/**
 * Represents a simple Category for flat lists or dropdowns.
 */
const _simpleCategory = Prisma.validator<Prisma.CategoryDefaultArgs>()({
    select: {
        id: true,
        name: true,
        slug: true,
        parentId: true,
        _count: { select: { products: true, children: true } }
    }
});
export type SimpleCategory = Prisma.CategoryGetPayload<typeof _simpleCategory>;


/**
 * Represents a Category with its parent for hierarchy checks.
 */
const _categoryWithParent = Prisma.validator<Prisma.CategoryDefaultArgs>()({
    select: {
        id: true,
        name: true,
        slug: true,
        parentId: true,
        parent: {
            select: { id: true, slug: true }
        }
    }
});
export type CategoryWithParent = Prisma.CategoryGetPayload<typeof _categoryWithParent>;


/**
 * Represents a Cart with its items and product details.
 */
const _cartWithItems = Prisma.validator<Prisma.CartDefaultArgs>()({
    include: {
        items: {
            include: {
                product: {
                    select: {
                        id: true, name: true, slug: true, price: true, discountPrice: true,
                        images: { where: { isPrimary: true }, take: 1 },
                        category: { select: { name: true } },
                    },
                },
            },
            orderBy: { createdAt: 'asc' } // Order cart items
        },
    },
});
export type CartWithItems = Prisma.CartGetPayload<typeof _cartWithItems>;


/**
 * Represents an Order with its items and user details.
 */
const _orderWithItems = Prisma.validator<Prisma.OrderDefaultArgs>()({
    include: {
        items: { include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } },
        user: { select: { id: true, name: true, email: true } },

    },
});
export type OrderWithItems = Prisma.OrderGetPayload<typeof _orderWithItems>;


/**
 * Represents a User object for admin listings, including their role and counts.
 */
const _userForAdminList = Prisma.validator<Prisma.UserDefaultArgs>()({
    select: {
        id: true,
        name: true,
        email: true,
        role: true, // Assuming UserRole enum is available in Prisma client
        createdAt: true,
        _count: { select: { order: true, reviews: true, cart: true } }
    },
});
export type UserForAdminList = Prisma.UserGetPayload<typeof _userForAdminList>;


/**
 * Represents a single User with all associated data for detailed admin view.
 */
const _adminUserDetailed = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
        order: { include: { items: { include: { product: true } } } },
        reviews: { include: { product: true } },
        cart: { include: { items: { include: { product: true } } } }
    },
});
export type AdminUserDetailed = Prisma.UserGetPayload<typeof _adminUserDetailed>;


// Re-export UserRole directly from @prisma/client as it's a global enum
export { UserRole } from '@generated/client'; 