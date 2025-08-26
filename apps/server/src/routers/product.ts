import { publicProcedure, router } from "@/lib/trpc";
import prisma from "../../prisma";
import z from "zod";
import { TRPCError } from "@trpc/server";
export const productRouter = router({
    getNewDeal: publicProcedure.query(async () => {
        return await prisma.product.findFirst({
            where: {
                tags: {
                    has: "newDeal"
                }
            },
            include: {
                reviews: {
                    select: {
                        rating: true,
                    }
                },

                category: {
                    select: {
                        name: true
                    }
                },
                images: {
                    select: {
                        altText: true,
                        url: true

                    }
                }
            }
        })
    }),
    getExclusiveDeal: publicProcedure.query(async () => {
        return await prisma.product.findFirst({
            where:
            {
                tags: { has: "exclusive" }
            },
            include: {
                reviews: {
                    select: {
                        rating: true,
                    }
                },

                category: {
                    select: {
                        name: true
                    }
                },
                images: {
                    select: {
                        altText: true,
                        url: true

                    }
                }
            }
        })
    }),
    getAll: publicProcedure.query(async () => {
        return await prisma.product.findMany({
            include: {
                images: true,
                category: true,
                reviews: true
            }
        })
    }),
    getProductBySlug: publicProcedure.input(z.object({
        slug: z.string().min(1, { message: "Slug cannot be empty" }),

    })).query(async ({ input }) => {
        const product = await prisma.product.findUnique({
            where: { slug: input.slug }
            , include: {
                images: true,
                category: true,
                reviews: true
            }
        })
        if (!product) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `No product found with slug ${input.slug}`,
            });

        }
        return product;
    })
})