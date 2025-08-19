import { PaymentStatus } from "@generated/client";
import z from "zod";

// Schema for Payment
export const paymentSchema = z.object({
    id: z.string().cuid(),
    orderId: z.string().cuid(),
    amount: z.number(), // Prisma Decimal
    provider: z.string(),
    transactionId: z.string().nullish(),
    status: z.nativeEnum(PaymentStatus).default('PENDING'),
    createdAt: z.date(),
    updatedAt: z.date(),
});
