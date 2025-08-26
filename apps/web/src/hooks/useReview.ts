import { trpc } from "@/utils/trpc"
import { toast } from "sonner"

export const useReview = {
    addReview: () => {
        trpc.review.addReview.mutationOptions({
            onSuccess: (data, variables) => {
                toast.success("Review added successfully!");
            }
        })
    }
}