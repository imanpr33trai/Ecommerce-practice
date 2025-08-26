// 1. Import the standard `useQuery` hook from TanStack Query
import { useMutation, useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Your tRPC client setup

/**
 * A collection of custom hooks for product-related data fetching.
 * This pattern groups related tRPC procedures for better organization.
 */
export const useProduct = {
    /**
     * Fetches a list of products tagged as "newDeal".
     */
    newDeals: () => {
        // 2. Generate the query options from your tRPC client
        const queryOptions = trpc.product.getNewDeal.queryOptions();

        // 3. Pass those options to the standard `useQuery` hook
        return useQuery(queryOptions);
    },

    /**
     * Fetches a list of products tagged as "exclusive".
     * This is a more concise way of writing the same logic as above.
     */
    exclusiveDeals: () => {
        return useQuery(trpc.product.getExclusiveDeal.queryOptions());
    },
    getAll: () => {
        return useQuery(trpc.product.getAll.queryOptions())
    },
    getBySlug: (slug: string) => {
        const queryOptions = useQuery(trpc.product.getProductBySlug.queryOptions({ slug }))
        return queryOptions;
    },
    reviewsByProductId: (productId: string | undefined) => {
        const queryOptions = trpc.review.productReview.queryOptions({
            productId: productId ?? ''
        });

        return useQuery({
            ...queryOptions,
            enabled: !!productId,
            retry: false,
            staleTime: 0,
        });
    }
};




