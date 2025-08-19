import z from "zod";

// Schema for Review
export const reviewSchema = z.object({
    id: z.string().cuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
    productId: z.string().cuid(),
    userId: z.string(),
});