import { trpc } from "@/utils/trpc"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCart = {
    addToCart: () => {
        return useMutation(trpc.cart.addToCart.mutationOptions())
    },
    removeItem: () => useMutation(
        trpc.cart.removeFromCart.mutationOptions({
            onSuccess: (data, variables) => {

                toast.success(`Removed from cart.`);
            },
            onError: (error) => toast.error(error.message),
        })
    ),
    getAll: () => {
        return useQuery(trpc.cart.getAll.queryOptions())
    },
    updateQuantity: () => useMutation(
        trpc.cart.updateQuantity.mutationOptions({ // Assumes you have this procedure
            onSuccess: (data, variables) => {
                toast.success(`Updated quantity for ${variables.productId}.`);
            },
            onError: (error) => toast.error(error.message),
        })
    )


}