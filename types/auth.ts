import z from "zod";
import { wishSchema } from "./wish";
import { cartSchema } from "./cart";
import { reviewSchema } from "./review";
import { orderSchema } from "./order";
type User = z.infer<typeof userSchema>;

// Schema for User - the most interconnected model
export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    image: z.string().url().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
    reviews: z.array(z.lazy(() => reviewSchema)),
    cart: z.array(z.lazy(() => cartSchema)),
    order: z.array(z.lazy(() => orderSchema)),
    wishList: z.array(z.lazy(() => wishSchema)),
});

// Auth-related schemas
export const sessionSchema = z.object({
    id: z.string(),
    expiresAt: z.date(),
    token: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    ipAddress: z.string().nullish(),
    userAgent: z.string().nullish(),
    userId: z.string(),
});

export const accountSchema = z.object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().nullish(),
    refreshToken: z.string().nullish(),
    idToken: z.string().nullish(),
    accessTokenExpiresAt: z.date().nullish(),
    refreshTokenExpiresAt: z.date().nullish(),
    scope: z.string().nullish(),
    password: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const verificationSchema = z.object({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.date(),
    createdAt: z.date().nullish(),
    updatedAt: z.date().nullish(),
});