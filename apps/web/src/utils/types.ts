// apps/web/src/utils/types.ts
import { type RouterOutputs } from './trpc'; // 👈 Import RouterOutputs from THIS app's trpc.ts
import { type ProductForList, type ProductDetailed, type ReviewWithUser, type WishlistItem, type CartWithItems, type OrderWithItems, type SimpleCategory, type CategoryWithChildren, type UserForAdminList, type AdminUserDetailed } from 'db-types'; // 👈 Import all backend types from your new package

// --------------------------------------------------------------------------------
// Frontend-specific derived types
// --------------------------------------------------------------------------------

// Products
export type ProductListItem = RouterOutputs['product']['getAll'][number];
export type ProductDetailedFrontend = ProductDetailed; // You can just re-export or use the backend type directly
export type RelatedProduct = RouterOutputs['product']['getRelatedProducts'][number];
export type ProductForCategoryGrid = RouterOutputs['product']['getByCategoryHierarchy'][number];

// Categories
export type TopLevelCategory = RouterOutputs['category']['getTopLevelCategories'][number];
export type CategoryWithChildrenData = RouterOutputs['category']['getCategoryWithChildrenBySlug'];

// Cart
export type UserCartFrontend = CartWithItems; // Reuse backend type
export type CartItemFrontend = NonNullable<UserCartFrontend>['items'][number];
export type CartAddItemResult = RouterOutputs['cart']['addToCart'];
export type CartUpdateQuantityResult = RouterOutputs['cart']['updateQuantity'];
export type CartRemoveItemResult = RouterOutputs['cart']['removeFromCart'];

// Wishlist
export type WishlistFrontend = WishlistItem[]; // WishlistItem is from db-types
export type WishlistItemFrontend = WishlistItem; // WishlistItem is from db-types
export type WishlistToggleResult = RouterOutputs['wish']['toggle'];

// Reviews
export type ProductReviewFrontend = ReviewWithUser; // Reuse backend type for review with user
export type ReviewAddResult = RouterOutputs['review']['addReview'];
export type ReviewDeleteResult = RouterOutputs['review']['deleteReview'];

// Orders
export type OrderHistoryItemFrontend = OrderWithItems; // Reuse backend type for order with items
// export type OrderCreateResult = RouterOutputs['order']['createFromCart'];

// Admin (Frontend-specific view of admin data)
// export type AdminProductListItemFrontend = AdminProductListItem; // Reuse backend type
// export type AdminCategoryListItemFrontend = AdminCategoryListItem; // Reuse backend type
// export type AdminUserListItemFrontend = UserForAdminList; // Reuse backend type
// export type AdminUserDetailedFrontend = AdminUserDetailed; // Reuse backend type

// Admin Form Inputs (often directly use backend types or subsets/modified versions)
// export type AdminCreateProductInput = Parameters<RouterOutputs['admin']['createProduct']>[0];
// export type AdminUpdateProductInput = Parameters<RouterOutputs['admin']['updateProduct']>[0];
// export type AdminCreateCategoryInput = Parameters<RouterOutputs['admin']['createCategory']>[0];
// export type AdminUpdateCategoryInput = Parameters<RouterOutputs['admin']['updateCategory']>[0];
// export type AdminUpdateUserInput = Parameters<RouterOutputs['admin']['updateUser']>[0];