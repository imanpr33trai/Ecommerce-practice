import z from "zod";
import { productSchema } from "./product";
import { OrderStatus, PaymentStatus } from "@generated/client";
import { paymentSchema } from "./payment";
type Order = z.infer<typeof orderSchema>;
// Schema for OrderItem
export const orderItemSchema = z.object({
    id: z.string().cuid(),
    quantity: z.number().int().min(1).default(1),
    orderId: z.string().cuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    productId: z.string().cuid(),
    product: z.lazy(() => productSchema),
});


// Schema for Order
export const orderSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    totalAmount: z.number(),
    status: z.nativeEnum(OrderStatus).default('PENDING'),
    paymentStatus: z.nativeEnum(PaymentStatus).default('PENDING'),
    createdAt: z.date(),
    updatedAt: z.date(),
    items: z.array(z.lazy(() => orderItemSchema)),
    payment: z.array(z.lazy(() => paymentSchema)),
});