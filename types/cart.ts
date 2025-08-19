import z from "zod";
import { productSchema } from "./product";

// Schema for CartItem
export const cartItemSchema = z.object({
    id: z.string().cuid(),
    quantity: z.number().int().min(1).default(1),
    cartId: z.string().cuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    productId: z.string().cuid(),
    product: z.lazy(() => productSchema),
});
// Schema for Cart
export const cartSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.lazy(() => cartItemSchema)),
});