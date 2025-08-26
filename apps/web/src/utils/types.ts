import { type RouterOutputs } from './trpc'

/**
 * =================================================================================================
 *  SHARED FRONTEND TYPES (RouterOutputs)
 * =================================================================================================
 *  SOURCE OF TRUTH: tRPC AppRouter
 *  USAGE: Imported by React components, hooks, and pages.
 *  PURPOSE: To provide strictly-typed data for the UI, ensuring it matches the API's contract.
 * =================================================================================================
 */

// Type for a single product in a list (from `product.getAll`)
// export type ProductListItem = RouterOutputs['product']['getAll'][number];
export type DealProduct = RouterOutputs['product']['getNewDeal'];
export type ExclusiveProduct = RouterOutputs['product']['getExclusiveDeal'];
export type ProductListItem = DealProduct | ExclusiveProduct;
// Type for the detailed product object from the `getBySlug` endpoint
// export type ProductDetailed = RouterOutputs['product']['getBySlug'];

export type WishCreate = RouterOutputs['wish']['createWish'];
export type WishAddCart = RouterOutputs['cart']['addToCart'];
export type WishItem = NonNullable<RouterOutputs['wish']['getAll']>[number];
// // Type for the entire user cart object
export type UserCart = RouterOutputs['cart']['getAll'];

// A single item within the cart's items array
export type CartItem = NonNullable<UserCart>['items'][number];
// // Type for a single item within the user's cart
// export type CartItem = NonNullable<RouterOutputs['cart']['getAll']>['items'][number]; 

export type ProductDetailed = RouterOutputs['product']['getProductBySlug'];

export type ReviewProduct = NonNullable<RouterOutputs['review']['productReview']>[number];