import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';               // 👈 1. Import toast directly from sonner
import { trpc } from '@/utils/trpc';        // Your tRPC client

/**
 * A custom hook to manage all wishlist-related mutations (add, remove).
 * This centralizes logic for cache invalidation and user feedback.
 */
export const useWish = {
    //   const utils = trpc.useUtils();

    // Renamed from `removeWish` to `removeItem` for clarity, as it's the mutation object
    removeWish: () => useMutation(
        // 2. Call `createMutationOptions` and pass your configuration object to it
        trpc.wish.removeWish.mutationOptions({
            // `onSuccess` and `onError` are now properties of this options object
            onSuccess: (data, variables) => {
                // `data` is the return value from your backend mutation
                // `variables` is the input you passed to `.mutate()`

                // Invalidate the query to refetch the user's wishlist
                // utils.wishlist.get.invalidate();

                toast.success("Removed from Wishlist", {
                    // The backend returns the full product, so we can use its name
                    description: `${data.product.name} has been removed.`,
                });
            },
            onError: (error) => {
                toast.error("Error", {
                    description: error.message,
                });
            },
        })
    ),
    getAll: () => {
        return useQuery(trpc.wish.getAll.queryOptions())
    }



    // You could add another mutation for adding an item here
    // const addWish = useMutation({ ... });


};

// import { trpc } from "@/utils/trpc"
// import { useMutation, useQuery } from "@tanstack/react-query"

// export const useWish = {
//     createWish: () => {
//         return useMutation(trpc.wish.createWish.mutationOptions())
//     },

//     removeWish: () => {
//         return useMutation(trpc.wish.removeWish.mutationOptions({
//             onSuccess: () => {
//                 console.log({ title: "Removed from Wishlist", description: `${item.product.name} has been removed.` });
//                 // Invalidate the wishlist query to refetch and update the UI

//             },
//             onError: (error) => {
//                 console.log({ title: "Error", description: error.message, variant: "destructive" });
//             }
//         }))
//     },
//     getAll: () => {
//         return useQuery(trpc.wish.getAll.queryOptions())
//     }
// }


// TODO: Replace with your actual tRPC mutations
// const { mutate: removeItem, isLoading: isRemoving } = api.wishlist.remove.useMutation({
//   onSuccess: () => {
//     toast({ title: "Removed from Wishlist", description: `${item.product.name} has been removed.` });
//     // Invalidate the wishlist query to refetch and update the UI
//     utils.wishlist.get.invalidate();
//   },
//   onError: (error) => {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//   }
// });

// const { mutate: addToCart, isLoading: isAddingToCart } = api.cart.addItem.useMutation({
//   onSuccess: () => {
//       toast({ title: "Added to Cart!", description: `${item.product.name} is now in your cart.` });
//       utils.cart.get.invalidate(); // Also update the cart count in the header
//   }
// });