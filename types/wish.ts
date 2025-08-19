import z from "zod";
import { productSchema } from "./product";

// Schema for Wish
export const wishSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    productId: z.string().cuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    product: z.lazy(() => productSchema),
});