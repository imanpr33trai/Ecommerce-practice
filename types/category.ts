import z from "zod";

// Schema for Category
export const categorySchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    description: z.string().nullish(),
    createdAt: z.date(),
    updatedAt: z.date(),
    slug: z.string().nullish(),
    parentId: z.string().nullish(),
});