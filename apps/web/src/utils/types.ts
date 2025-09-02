import { type RouterOutputs } from './trpc'; // Your main tRPC types import

/**
 * =================================================================================================
 *  FRONTEND TYPES (Inferred from tRPC RouterOutputs)
 * =================================================================================================
 *  SOURCE OF TRUTH: Your tRPC AppRouter.
 *  USAGE: Imported by React components, hooks, and pages.
 *  PURPOSE: To provide strictly-typed data shapes for the UI, ensuring it always
 *           matches the API's contract. This file follows a consistent naming convention.
 * =================================================================================================
 */

// ------------------------------ Product ------------------------------

/**
 * Type for a single product object in a list, from the paginated `product.getAll` endpoint.
 * Represents the data needed for a `ProductCard`.
 */
export type ProductListItem = RouterOutputs['product']['getAll'][number];

/**
 * Type for the detailed product object returned by the `product.getBySlug` endpoint.
 * This is the primary type for the dynamic product detail page.
 */
export type ProductDetailed = RouterOutputs['product']['getProductBySlug'];

/**
 * Type for a single product object returned by the `product.getByCategorySlug` endpoint.
 * This is the specific shape needed for category and search result grids.
 * Note the inclusion of the `_count` property for reviews.
 */
export type ProductForCategoryGrid = RouterOutputs['product']['getByCategorySlug'][number];

export type PRoductFromHierarchy = RouterOutputs['product']['getByCategorySlug'][number]
// ------------------------------ Category ------------------------------

/**
 * Type for a single category object, from the `category.getAll` endpoint.
 */
// export type CategoryListItem = RouterOutputs['category']['getAll'][number];


// ------------------------------ Cart ------------------------------

/**
 * Type for the entire user cart object, returned by `cart.get`.
 * This type can be the full cart object or null/an empty object representation.
 */
export type UserCart = RouterOutputs['cart']['getAll'];

/**
 * Type for a single item within the cart's `items` array.
 * Uses `NonNullable` to safely access the `items` property from the potentially null `UserCart`.
 */
export type CartItem = NonNullable<UserCart>['items'][number];

/**
 * Type for the data returned after adding an item to the cart.
 */
export type CartAddItemResult = RouterOutputs['cart']['addToCart'];

/**
 * Type for the data returned after updating an item's quantity in the cart.
 */
export type CartUpdateQuantityResult = RouterOutputs['cart']['updateQuantity'];

/**
 * Type for the data returned after removing an item from the cart.
 */
export type CartRemoveItemResult = RouterOutputs['cart']['removeFromCart'];


// ------------------------------ Wishlist ------------------------------

/**
 * Type for the array of wishlist items returned by `wishlist.get`.
 */
export type Wishlist = RouterOutputs['wish']['getAll'];

/**
 * Type for a single item within the wishlist array.
 */
export type WishlistItem = RouterOutputs['wish']['getAll'][number];

/**
 * Type for the data returned after adding an item to the wishlist.
 */
export type WishlistAddItemResult = RouterOutputs['wish']['createWish'];

/**
 * Type for the data returned after removing an item from the wishlist.
 */
export type WishlistRemoveItemResult = RouterOutputs['wish']['removeWish'];


// ------------------------------ Order ------------------------------

/**
 * Type for the array of a user's past orders, returned by `order.getAllForUser`.
 */
// export type OrderHistory = RouterOutputs['order']['getAllForUser'];

/**
 * Type for a single order object within the user's order history list.
 */
// export type OrderHistoryItem = RouterOutputs['order']['getAllForUser'][number];

/**
 * Type for the data returned after creating a new order from the cart.
 */
// export type OrderCreateResult = RouterOutputs['order']['createFromCart'];


// ------------------------------ Review ------------------------------

/**
 * Type for the array of reviews for a product, returned by `product.getReviewsByProductId`.
 */
export type ProductReviews = RouterOutputs['review']['productReview'];

/**
 * Type for a single review object within a product's review list.
 */
export type ProductReview = RouterOutputs['review']['productReview'][number];

/**
 * Type for the data returned after successfully adding a new review.
 */
export type ReviewAddResult = RouterOutputs['review']['addReview'];