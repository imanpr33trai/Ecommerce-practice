import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root"; // Adjust path as needed

/**
 * =================================================================================================
 *  FRONTEND TYPES (RouterOutputs)
 * =================================================================================================
 *  These types are inferred from your tRPC router.
 *  They are the "public API" of your backend and should be used for props, state, and hooks.
 *  They guarantee that your frontend components are always in sync with what the API actually returns.
 * =================================================================================================
 */

// Type for a single product from the `getAll` endpoint's array
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type ProductListItem = RouterOutputs['product']['getAll'][number];

// Type for the detailed product object from the `getBySlug` endpoint
export type ProductDetailed = RouterOutputs['product']['getBySlug'];

// Example for another router, e.g., `orderRouter`
export type OrderHistoryItem = RouterOutputs['order']['getAllForUser'][number];
