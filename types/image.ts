// Schema for Image

import z from "zod";

export const imageSchema = z.object({
    id: z.string().cuid(),
    url: z.string().url(),
    altText: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
    productId: z.string().cuid().nullish(),
    isPrimary: z.boolean().default(false),
    width: z.number().int().nullish(),
    height: z.number().int().nullish(),
    fileSize: z.number().int().nullish(),
});